/* global document, window, MutationObserver */
/**
 * Captures what the design critic looks at (.claude/agents/design-critic.md,
 * docs/design-critique.md), so that a critique rests on what a visitor sees
 * and on measured numbers, never on numbers guessed from a picture:
 * - every page at several widths in its final state (reduced motion): one
 *   screen at a time, the whole page, and each part of the sheet
 * - the states a visitor triggers: the open menu, keyboard focus, hover
 * - frames of the motion: the first screen held at set moments, and the
 *   page scrolled at a reading pace
 * - measurements of the rendered text and controls (measure.mjs), with the
 *   leads they give (report.mjs), axe, console errors and overflow
 *
 * Usage: npm run design:capture -- [options] [page ...]
 *
 *   page             A path on the running site without the leading slash,
 *                    so Git Bash doesn't rewrite it (default: lab/pocetna).
 *   --base <url>     The running site (default: http://localhost:4321, the
 *                    dev server).
 *   --out <dir>      Where to write (default: .playwright-mcp/design-review/
 *                    <date>-<time>, which git ignores).
 *   --widths <list>  Viewport widths (default: 375,768,1024,1440,1707,1920).
 *   --motion <list>  Widths for the motion frames, or "none" (default: 1440).
 *
 * The output folder starts with index.md; each width's full measurements
 * are in metrics.json beside its screenshots.
 */
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

import AxeBuilder from "@axe-core/playwright";
import { chromium } from "@playwright/test";

import { holdAt, measurePage } from "./measure.mjs";
import { indexMarkdown } from "./report.mjs";

const DEFAULT_WIDTHS = [375, 768, 1024, 1440, 1707, 1920];

/**
 * Viewport heights: a phone, a tablet upright, a small laptop, a laptop, and
 * the client's two screens less the browser's bars (the laptop at 2560 × 1600
 * and 150 %, the monitor with the browser about 1920 px wide).
 */
const HEIGHTS = new Map([
  [375, 812],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1707, 940],
  [1920, 960],
]);

/** Chrome that is not part of the site: the lab's bar, Astro's dev toolbar. */
const NOT_THE_SITE = ".lab-bar, astro-dev-toolbar";

/**
 * The dev toolbar arrives after load and slides in, so it is removed the
 * moment it appears. The lab's bar goes after load (tidy), once its own
 * script has run.
 */
const DEV_TOOLBAR = "astro-dev-toolbar";

/** Keyboard focus is captured at these widths only; it looks alike at others. */
const FOCUS_WIDTHS = [375, 1440];
const FOCUS_STOPS = 6;

/** Hover is captured from this width up (touch screens have no hover). */
const HOVER_FROM = 1024;

/** The first screen is held at these moments after its animations start. */
const ENTRANCE_MS = [0, 300, 600, 900, 1200, 1600, 2400];

/** While scrolling, each screen is captured this long after the scroll. */
const SCROLL_SAMPLES_MS = [250, 1000];

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    base: { type: "string", default: "http://localhost:4321" },
    out: { type: "string" },
    widths: { type: "string" },
    motion: { type: "string", default: "1440" },
  },
});

/** A page argument as a site path: "lab/pocetna" → "/lab/pocetna". */
function toPath(page) {
  const trimmed = page.replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "/";
}

function parseWidths(list) {
  return list
    .split(",")
    .map(Number)
    .filter((width) => Number.isInteger(width) && width >= 320);
}

function stamp() {
  const now = new Date();
  const two = (n) => String(n).padStart(2, "0");
  return `${String(now.getFullYear())}-${two(now.getMonth() + 1)}-${two(now.getDate())}-${two(now.getHours())}${two(now.getMinutes())}`;
}

function git(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

const base = values.base.replace(/\/+$/, "");
const pages = (positionals.length > 0 ? positionals : ["lab/pocetna"]).map(
  toPath,
);
const widths = values.widths ? parseWidths(values.widths) : DEFAULT_WIDTHS;
const motionWidths = values.motion === "none" ? [] : parseWidths(values.motion);
const out =
  values.out ?? path.join(".playwright-mcp", "design-review", stamp());

const heightFor = (width) => HEIGHTS.get(width) ?? (width < 768 ? 812 : 900);
const slugOf = (page) =>
  page === "/" ? "home" : page.slice(1).replaceAll("/", "-");
const pad = (n, size = 2) => String(n).padStart(size, "0");

if (widths.length === 0) {
  console.error("No usable width in --widths (each must be 320 or more).");
  process.exit(1);
}

try {
  const response = await fetch(base + pages[0], {
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`HTTP ${String(response.status)}`);
} catch (error) {
  console.error(
    `Can't open ${base}${pages[0]} (${error instanceof Error ? error.message : String(error)}).\n` +
      "Start the dev server (npm run dev), or a lab build as docs/design-critique.md describes, and pass --base if it isn't on port 4321.",
  );
  process.exit(1);
}

/** Every file written, with what it shows. */
const files = [];
/** Each page and width's measurements. */
const summaries = [];

function record(page, width, kind, file, note) {
  files.push({ page, width, kind, file, note });
}

async function shot(target, file, options = {}) {
  const absolute = path.join(out, file);
  await mkdir(path.dirname(absolute), { recursive: true });
  await target.screenshot({ path: absolute, ...options });
}

/** Removes what isn't the site and waits for the fonts. */
async function newContext(options) {
  const context = await browser.newContext(options);
  await context.addInitScript((selector) => {
    const sweep = () => {
      for (const element of document.querySelectorAll(selector)) {
        element.remove();
      }
    };
    new MutationObserver(sweep).observe(document, {
      childList: true,
      subtree: true,
    });
  }, DEV_TOOLBAR);
  return context;
}

async function tidy(page) {
  await page.evaluate(async (selector) => {
    for (const element of document.querySelectorAll(selector)) {
      element.remove();
    }
    await document.fonts.ready;
  }, NOT_THE_SITE);
}

async function openPage(context, pagePath) {
  const page = await context.newPage();
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto(base + pagePath, { waitUntil: "load" });
  await tidy(page);
  return { page, errors };
}

async function scrollTo(page, top) {
  await page.evaluate((y) => {
    window.scrollTo({ top: y, behavior: "instant" });
  }, top);
}

/** Walks down the page, so that anything revealed on scroll has run. */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const step = Math.round(window.innerHeight * 0.5);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await pause(60);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    await pause(200);
  });
}

/** A clip around a box, kept inside the viewport. */
function around(box, margin, viewport) {
  const x = Math.max(0, Math.floor(box.x - margin));
  const y = Math.max(0, Math.floor(box.y - margin));
  return {
    x,
    y,
    width: Math.max(
      1,
      Math.min(viewport.width - x, Math.ceil(box.width + 2 * margin)),
    ),
    height: Math.max(
      1,
      Math.min(viewport.height - y, Math.ceil(box.height + 2 * margin)),
    ),
  };
}

/** A file name from a part's label: "Što radimo" → "sto-radimo". */
function fileName(label) {
  return (
    label
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[đĐ]/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 32) || "zone"
  );
}

async function captureFinal(pagePath, width) {
  const viewport = { width, height: heightFor(width) };
  const dir = `${slugOf(pagePath)}/${String(width)}`;
  const context = await newContext({
    viewport,
    reducedMotion: "reduce",
  });
  try {
    const { page, errors } = await openPage(context, pagePath);
    await scrollThrough(page);

    const metrics = await page.evaluate(measurePage, NOT_THE_SITE);
    const documentHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const overflowX = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );

    // One screen at a time, with a tenth of overlap, as a visitor reads it.
    const step = Math.round(viewport.height * 0.9);
    const last = Math.max(0, documentHeight - viewport.height);
    for (let index = 1, y = 0; ; index += 1, y += step) {
      const top = Math.min(y, last);
      await scrollTo(page, top);
      await page.waitForTimeout(80);
      const file = `${dir}/frame-${pad(index)}.png`;
      await shot(page, file);
      record(
        pagePath,
        width,
        "screen",
        file,
        `screen ${String(index)}, scrolled to ${String(top)} px`,
      );
      if (top >= last) break;
    }

    await scrollTo(page, 0);
    await shot(page, `${dir}/full.png`, { fullPage: true });
    record(
      pagePath,
      width,
      "whole page",
      `${dir}/full.png`,
      `${String(documentHeight)} px tall; it shrinks when read, so use it for rhythm and proportion only`,
    );

    for (const [index, zone] of metrics.zones.entries()) {
      const file = `${dir}/part-${pad(index + 1)}-${fileName(zone.label)}.png`;
      await shot(page, file, {
        fullPage: true,
        clip: { x: 0, y: zone.top, width, height: Math.max(1, zone.height) },
      });
      record(
        pagePath,
        width,
        "part",
        file,
        `${zone.label}, at ${String(zone.top)} px, ${String(zone.height)} px tall`,
      );
    }

    const axe = await new AxeBuilder({ page }).analyze();
    await captureStates(page, pagePath, viewport, dir);

    const report = {
      page: pagePath,
      width,
      height: viewport.height,
      documentHeight,
      overflowX,
      consoleErrors: errors,
      axe: axe.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        nodes: violation.nodes.map((node) => node.target.join(" ")),
      })),
      ...metrics,
    };
    await writeFile(
      path.join(out, dir, "metrics.json"),
      `${JSON.stringify(report, null, 2)}\n`,
    );
    summaries.push({ report });
  } finally {
    await context.close();
  }
}

async function captureStates(page, pagePath, viewport, dir) {
  // The menu, where it has a button.
  const toggle = page.locator("[data-menu-toggle]").first();
  if ((await toggle.count()) > 0 && (await toggle.isVisible())) {
    await scrollTo(page, 0);
    await toggle.click();
    await page.waitForTimeout(250);
    await shot(page, `${dir}/state-menu-open.png`);
    record(
      pagePath,
      viewport.width,
      "state",
      `${dir}/state-menu-open.png`,
      "the menu opened from its button",
    );
    await page.keyboard.press("Escape");
  }

  // Selected text: the first paragraph of the content on paper and, where
  // the page has one, the first on the navy surface.
  if (FOCUS_WIDTHS.includes(viewport.width)) {
    for (const [name, selector] of [
      ["paper", "main p"],
      ["navy", "main .surface-navy p"],
    ]) {
      const box = await page.evaluate((css) => {
        const element = document.querySelector(css);
        if (!element) return null;
        element.scrollIntoView({ block: "center", behavior: "instant" });
        const rect = element.getBoundingClientRect();
        if (rect.width <= 1 || rect.height <= 1) return null;
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
      }, selector);
      if (!box) continue;
      await page.waitForTimeout(100);
      const file = `${dir}/state-selection-${name}.png`;
      await shot(page, file, { clip: around(box, 24, viewport) });
      record(
        pagePath,
        viewport.width,
        "state",
        file,
        `text selected in the first paragraph on ${name === "navy" ? "the navy surface" : "paper"}`,
      );
    }
    await page.evaluate(() => window.getSelection()?.removeAllRanges());
  }

  // Keyboard focus: the first stops from the top of a fresh page.
  if (FOCUS_WIDTHS.includes(viewport.width)) {
    await page.goto(base + pagePath, { waitUntil: "load" });
    await tidy(page);
    for (let stop = 1; stop <= FOCUS_STOPS; stop += 1) {
      await page.keyboard.press("Tab");
      const target = await page.evaluate(() => {
        const element = document.activeElement;
        if (!element || element === document.body) return null;
        element.scrollIntoView({ block: "center", behavior: "instant" });
        const rect = element.getBoundingClientRect();
        const name =
          element.getAttribute("aria-label") ??
          element.textContent ??
          element.tagName;
        return {
          box: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
          name: name.trim().replace(/\s+/g, " ").slice(0, 60),
        };
      });
      if (!target) break;
      await page.waitForTimeout(200);
      const file = `${dir}/state-focus-${pad(stop)}.png`;
      await shot(page, file, { clip: around(target.box, 40, viewport) });
      record(
        pagePath,
        viewport.width,
        "state",
        file,
        `keyboard focus, stop ${String(stop)}: "${target.name}"`,
      );
    }
  }

  // Hover on a header link and on the first button in the content.
  if (viewport.width < HOVER_FROM) return;
  for (const [name, selector] of [
    ["header-link", ".site-header__nav a"],
    ["button", "main .button"],
  ]) {
    const target = page.locator(selector).first();
    if ((await target.count()) === 0 || !(await target.isVisible())) continue;
    await target.scrollIntoViewIfNeeded();
    await target.hover();
    await page.waitForTimeout(300);
    const box = await target.boundingBox();
    if (!box) continue;
    const file = `${dir}/state-hover-${name}.png`;
    await shot(page, file, { clip: around(box, 40, viewport) });
    record(
      pagePath,
      viewport.width,
      "state",
      file,
      `hover on the first ${name.replace("-", " ")}`,
    );
    await page.mouse.move(0, 0);
  }
}

async function captureMotion(pagePath, width) {
  const viewport = { width, height: heightFor(width) };
  const dir = `${slugOf(pagePath)}/${String(width)}/motion`;
  const context = await newContext({
    viewport,
    reducedMotion: "no-preference",
  });
  try {
    // The first screen, every animation held at the same moment.
    const { page } = await openPage(context, pagePath);
    for (const ms of ENTRANCE_MS) {
      await page.evaluate(holdAt, ms);
      const file = `${dir}/entrance-${pad(ms, 4)}ms.png`;
      await shot(page, file);
      record(
        pagePath,
        width,
        "motion",
        file,
        `first screen, every animation held at ${String(ms)} ms from its start`,
      );
    }

    // A fresh load, then the page scrolled at a reading pace in real time.
    await page.reload({ waitUntil: "load" });
    await tidy(page);
    await page.waitForTimeout(2500);
    const documentHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    const step = Math.round(viewport.height * 0.6);
    const last = Math.max(0, documentHeight - viewport.height);
    for (let index = 1, y = step; ; index += 1, y += step) {
      const top = Math.min(y, last);
      await scrollTo(page, top);
      const start = Date.now();
      for (const [sample, ms] of SCROLL_SAMPLES_MS.entries()) {
        const wait = ms - (Date.now() - start);
        if (wait > 0) await page.waitForTimeout(wait);
        const elapsed = Date.now() - start;
        const file = `${dir}/scroll-${pad(index)}${String.fromCharCode(97 + sample)}.png`;
        await shot(page, file);
        record(
          pagePath,
          width,
          "motion",
          file,
          `scrolled to ${String(top)} px, ${String(elapsed)} ms after the scroll`,
        );
      }
      if (top >= last) break;
    }
    await page.waitForTimeout(5000);
    await shot(page, `${dir}/scroll-end.png`);
    record(
      pagePath,
      width,
      "motion",
      `${dir}/scroll-end.png`,
      "5 s after the last scroll: every part should be complete",
    );
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
try {
  for (const pagePath of pages) {
    for (const width of widths) {
      console.log(`${pagePath} at ${String(width)} px`);
      await captureFinal(pagePath, width);
    }
    for (const width of motionWidths) {
      console.log(`${pagePath} at ${String(width)} px: motion`);
      await captureMotion(pagePath, width);
    }
  }
} finally {
  await browser.close();
}

const commit = git(["rev-parse", "--short", "HEAD"]);
const dirty = git(["status", "--porcelain"])
  ? ", with uncommitted changes"
  : "";
await mkdir(out, { recursive: true });
await writeFile(
  path.join(out, "index.md"),
  indexMarkdown({
    base,
    commit: commit ? `commit ${commit}${dirty}` : "commit unknown",
    pages,
    viewports: widths.map((width) => ({ width, height: heightFor(width) })),
    motionWidths,
    summaries,
    files,
  }),
);
console.log(
  `Wrote ${String(files.length)} screenshots and the index: ${path.join(out, "index.md")}`,
);
