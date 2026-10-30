/**
 * JavaScript budget per page (ADR 0008): the gzip size of all JavaScript a
 * built page loads must stay within the budget for its page type.
 *
 * Counted: inline scripts, external scripts, modulepreload links, the
 * component and renderer URLs of Astro islands, and every static import they
 * pull in. Dynamic `import()` loads on demand and is not counted.
 *
 * Usage: npm run build && node scripts/check-js-budget.mjs
 */
import { existsSync, statSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

import { LOCALES } from "../src/config/site.ts";
import { PAGE_IDS } from "../src/features/i18n/route-map.ts";
import { pathFor } from "../src/features/i18n/urls.ts";

const KB = 1024;

/** Content pages, the 404 pages and anything not listed below. */
const CONTENT_BUDGET = 15 * KB;

/**
 * Pages with a form or the layer viewer. The AI assistants page joins the
 * route map later, with a budget of 120 KB.
 * @type {Partial<Record<string, number>>}
 */
const PAGE_BUDGETS = {
  audit: 100 * KB,
  contact: 100 * KB,
  drafting: 100 * KB,
};

const CLIENT_DIR = fileURLToPath(new URL("../dist/client/", import.meta.url));

const SCRIPT_TAG = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
const MODULEPRELOAD_TAG = /<link\b[^>]*\brel=["']?modulepreload["']?[^>]*>/gi;
const ISLAND_URL = /\b(?:component-url|renderer-url)=["']([^"']+)["']/gi;
const HREF = /\bhref=["']([^"']+)["']/i;
const SRC = /\bsrc=["']([^"']+)["']/i;
const TYPE = /\btype=["']([^"']+)["']/i;
const JS_TYPES = new Set([
  "module",
  "text/javascript",
  "application/javascript",
]);
// Static `import ... from "x"`, `import "x"` and `export ... from "x"`, as
// Vite and Rolldown emit them. `import("x")` doesn't match.
const STATIC_IMPORT =
  /\b(?:import|export)\s*(?:[\w$*{}\s,]+?\s*from\s*)?["']([^"']+)["']/g;

/** @type {Map<string, number>} */
const gzipSizes = new Map();

/** @param {string | Buffer} content */
function gzipSize(content) {
  return gzipSync(content).length;
}

/**
 * The file in dist/client for a URL path, or undefined if it's not there.
 * @param {string} urlPath
 */
function clientFile(urlPath) {
  const file = path.join(CLIENT_DIR, ...urlPath.split("/").filter(Boolean));
  if (!file.startsWith(CLIENT_DIR) || !existsSync(file)) return undefined;
  return statSync(file).isFile() ? file : undefined;
}

/**
 * Adds a JS file and its static imports to `seen` (URL path -> gzip bytes).
 * @param {string} reference A script URL as written in the page or module.
 * @param {Map<string, number>} seen
 * @param {string} [from] URL path of the importing module.
 */
async function addModule(reference, seen, from = "/") {
  const url = new URL(reference, `http://local${from}`);
  if (url.host !== "local") {
    console.warn(`  not counted (another origin): ${reference}`);
    return;
  }
  const urlPath = url.pathname;
  if (seen.has(urlPath)) return;
  const file = clientFile(urlPath);
  if (!file) return;
  const content = await readFile(file);
  let size = gzipSizes.get(file);
  if (size === undefined) {
    size = gzipSize(content);
    gzipSizes.set(file, size);
  }
  seen.set(urlPath, size);

  for (const [, specifier] of content
    .toString("utf8")
    .matchAll(STATIC_IMPORT)) {
    // Bare specifiers ("react") don't exist in a built bundle.
    if (!specifier?.startsWith(".") && !specifier?.startsWith("/")) continue;
    await addModule(specifier, seen, urlPath);
  }
}

/**
 * Gzip bytes of all JavaScript a page loads.
 * @param {string} html
 */
async function pageJsBytes(html) {
  /** @type {Map<string, number>} */
  const modules = new Map();
  let inlineBytes = 0;

  for (const [, attributes = "", body = ""] of html.matchAll(SCRIPT_TAG)) {
    const type = TYPE.exec(attributes)?.[1]?.toLowerCase();
    if (type !== undefined && !JS_TYPES.has(type)) continue;
    const src = SRC.exec(attributes)?.[1];
    if (src) await addModule(src, modules);
    else if (body.trim()) inlineBytes += gzipSize(body);
  }
  for (const [tag] of html.matchAll(MODULEPRELOAD_TAG)) {
    const href = HREF.exec(tag)?.[1];
    if (href) await addModule(href, modules);
  }
  for (const [, url] of html.matchAll(ISLAND_URL)) {
    if (url) await addModule(url, modules);
  }

  let total = inlineBytes;
  for (const size of modules.values()) total += size;
  return total;
}

/**
 * URL path of a built HTML file: `index.html` -> `/`, `en/index.html` -> `/en`.
 * @param {string} file
 */
function urlPathOf(file) {
  const relative = path.relative(CLIENT_DIR, file).split(path.sep).join("/");
  const withoutFile = relative
    .replace(/(^|\/)index\.html$/, "")
    .replace(/\.html$/, "");
  return `/${withoutFile}`;
}

async function main() {
  if (!existsSync(CLIENT_DIR)) {
    console.error("dist/client not found. Run `npm run build` first.");
    process.exitCode = 1;
    return;
  }

  /** @type {Map<string, number>} URL path -> budget */
  const budgets = new Map();
  for (const page of PAGE_IDS) {
    for (const locale of LOCALES) {
      budgets.set(pathFor(page, locale), PAGE_BUDGETS[page] ?? CONTENT_BUDGET);
    }
  }

  const entries = await readdir(CLIENT_DIR, {
    recursive: true,
    withFileTypes: true,
  });
  const htmlFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .sort();

  let failures = 0;
  for (const file of htmlFiles) {
    const urlPath = urlPathOf(file);
    const budget = budgets.get(urlPath) ?? CONTENT_BUDGET;
    const bytes = await pageJsBytes(await readFile(file, "utf8"));
    const over = bytes > budget;
    if (over) failures += 1;
    console.log(
      `${over ? "FAIL" : "ok  "}  ${urlPath.padEnd(32)} ${(bytes / KB).toFixed(1).padStart(6)} KB / ${budget / KB} KB`,
    );
  }

  if (failures > 0) {
    console.error(
      `\n${failures} page(s) over the JavaScript budget (ADR 0008).`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `\nJavaScript budget: ${htmlFiles.length} page(s) within budget.`,
  );
}

await main();
