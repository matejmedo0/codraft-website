/**
 * Copy guardrail check (docs/compliance.md, copy guardrail 1). The site's
 * source and locale files must never present Codraft's drafting as
 * projektiranje or as design of record, in any inflected form.
 *
 * It scans src/, not docs/, which quotes the banned terms on purpose.
 * Exits with code 1 if anything matches.
 *
 * Usage: node scripts/check-guardrails.mjs
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * The regex from docs/compliance.md, with `\w` widened to `[\p{L}\p{N}_]`:
 * JavaScript's `\w` matches ASCII only and would miss "postojećeg".
 * Case-insensitive; the plain word "projekt" is allowed.
 */
export const GUARDRAIL_PATTERN =
  /projektir[\p{L}\p{N}_]*|projektant[\p{L}\p{N}_]*|projektn[\p{L}\p{N}_]*\s+dokumentacij[\p{L}\p{N}_]*|snimk[\p{L}\p{N}_]*\s+postoje[\p{L}\p{N}_]*\s+stanja|(designer|engineer|design)\s+of\s+record|we\s+design\s+(buildings|structures)/giu;

const SCANNED_DIRS = ["src"];

const TEXT_EXTENSIONS = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mdx",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
]);

/**
 * @typedef {object} GuardrailMatch
 * @property {string} text   The matched words.
 * @property {number} line   1-based line number.
 * @property {number} column 1-based column number.
 */

/**
 * Every guardrail match in a text.
 * @param {string} text
 * @returns {GuardrailMatch[]}
 */
export function findGuardrailMatches(text) {
  return [...text.matchAll(GUARDRAIL_PATTERN)].map((match) => {
    const lines = text.slice(0, match.index).split("\n");
    return {
      text: match[0],
      line: lines.length,
      column: (lines.at(-1)?.length ?? 0) + 1,
    };
  });
}

/**
 * Text files under a directory, recursively.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function listTextFiles(dir) {
  const entries = await readdir(dir, { recursive: true, withFileTypes: true });
  return entries
    .filter(
      (entry) =>
        entry.isFile() &&
        TEXT_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => path.join(entry.parentPath, entry.name));
}

async function main() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  let count = 0;

  for (const dir of SCANNED_DIRS) {
    for (const file of await listTextFiles(path.join(root, dir))) {
      const content = await readFile(file, "utf8");
      for (const { text, line, column } of findGuardrailMatches(content)) {
        count += 1;
        console.error(
          `${path.relative(root, file)}:${line}:${column}  "${text}"`,
        );
      }
    }
  }

  if (count > 0) {
    console.error(
      `\n${count} banned term(s) found. Drafting is not projektiranje: use the approved phrasing in docs/compliance.md (copy guardrail 1).`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `Copy guardrails: no banned terms in ${SCANNED_DIRS.join(", ")}.`,
  );
}

// Run only when executed directly, not when imported by the unit tests.
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
