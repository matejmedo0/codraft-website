/**
 * Web copies of the brand marks (ADR 0014, docs/brand.md). The masters in
 * Assets/codraft-brand/ are final and read-only; the site serves copies
 * without their C2PA metadata:
 * - SVG: the <metadata> block and the c2pa namespace are removed; the
 *   geometry is untouched.
 * - PNG: every chunk that doesn't affect the image is dropped (the C2PA
 *   manifest is a `caBX` chunk). The pixel data is copied as is.
 *
 * The favicon set goes to public/ (served at the site root, as the package's
 * head snippet expects); the marks for components and generated images go to
 * src/assets/brand/.
 *
 * Usage: node scripts/brand-web-copies.mjs
 */
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const MASTERS = path.join(ROOT, "Assets", "codraft-brand");

/**
 * Every web copy: the master's path inside the brand package, and the copy's
 * path in the repository.
 * @type {{ master: string, copy: string }[]}
 */
export const WEB_COPIES = [
  { master: "web/favicon.ico", copy: "public/favicon.ico" },
  { master: "web/icon.svg", copy: "public/icon.svg" },
  { master: "web/apple-touch-icon.png", copy: "public/apple-touch-icon.png" },
  { master: "web/icon-192.png", copy: "public/icon-192.png" },
  { master: "web/icon-512.png", copy: "public/icon-512.png" },
  { master: "web/site.webmanifest", copy: "public/site.webmanifest" },
  ...[
    "wordmark/codraft-wordmark-primary.svg",
    "wordmark/codraft-wordmark-reverse.svg",
    "wordmark/codraft-wordmark-mono-navy.svg",
    "wordmark/codraft-wordmark-mono-white.svg",
    "icon-main/codraft-icon-main-primary.svg",
    "icon-main/codraft-icon-main-reverse.svg",
    "icon-small/codraft-icon-small-primary.svg",
    "icon-small/codraft-icon-small-reverse.svg",
  ].map((master) => ({
    master,
    copy: `src/assets/brand/${path.posix.basename(master)}`,
  })),
];

const SVG_METADATA = /<metadata>[\s\S]*?<\/metadata>/g;
const C2PA_NAMESPACE = /\s+xmlns:c2pa="[^"]*"/g;

/**
 * An SVG without its <metadata> blocks and the c2pa namespace declaration.
 * @param {string} svg
 * @returns {string}
 */
export function stripSvgMetadata(svg) {
  return svg.replace(SVG_METADATA, "").replace(C2PA_NAMESPACE, "");
}

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

/**
 * The chunks a PNG keeps: the critical ones, transparency, and the ones
 * that change how colours are shown. Everything else is metadata.
 */
const KEPT_PNG_CHUNKS = new Set([
  "IHDR",
  "PLTE",
  "IDAT",
  "IEND",
  "tRNS",
  "gAMA",
  "cHRM",
  "sRGB",
  "iCCP",
  "sBIT",
]);

/**
 * A PNG with only the chunks in KEPT_PNG_CHUNKS, each copied byte for byte
 * (length, type, data and CRC), so the image itself is unchanged.
 * @param {Buffer} png
 * @returns {Buffer}
 */
export function stripPngMetadata(png) {
  if (!png.subarray(0, 8).equals(PNG_SIGNATURE)) {
    throw new Error("Not a PNG file");
  }
  /** @type {Buffer[]} */
  const kept = [PNG_SIGNATURE];
  let offset = 8;
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("latin1", offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > png.length) throw new Error(`Truncated PNG chunk ${type}`);
    if (KEPT_PNG_CHUNKS.has(type)) kept.push(png.subarray(offset, end));
    offset = end;
  }
  return Buffer.concat(kept);
}

/**
 * The web copy of one master's bytes.
 * @param {string} master The master's path inside the brand package.
 * @param {Buffer} bytes
 * @returns {Buffer}
 */
export function webCopyOf(master, bytes) {
  if (master.endsWith(".svg")) {
    return Buffer.from(stripSvgMetadata(bytes.toString("utf8")), "utf8");
  }
  if (master.endsWith(".png")) return stripPngMetadata(bytes);
  return bytes;
}

async function main() {
  for (const { master, copy } of WEB_COPIES) {
    const source = path.join(MASTERS, master);
    const target = path.join(ROOT, copy);
    await mkdir(path.dirname(target), { recursive: true });
    if (master.endsWith(".svg") || master.endsWith(".png")) {
      await writeFile(target, webCopyOf(master, await readFile(source)));
    } else {
      await copyFile(source, target);
    }
    console.log(`${master} → ${copy}`);
  }
}

// Run only when executed directly, not when imported by the unit tests.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
