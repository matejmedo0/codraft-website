/**
 * Claude Code PostToolUse hook (Write|Edit): formats the changed file with
 * Prettier, then lints it with ESLint. Findings go back to Claude as
 * context; the hook never blocks.
 *
 * Both tools are started with `node` directly, because npm's .cmd shims
 * can't be started without a shell on Windows. Prettier honours
 * .prettierignore, so the docs and brand masters are never reformatted.
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const PRETTIER_EXTENSIONS = new Set([
  ".astro",
  ".cjs",
  ".css",
  ".js",
  ".json",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
  ".yaml",
  ".yml",
]);
const ESLINT_EXTENSIONS = new Set([
  ".astro",
  ".cjs",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const prettierBin = path.join(
  projectDir,
  "node_modules",
  "prettier",
  "bin",
  "prettier.cjs",
);
const eslintBin = path.join(
  projectDir,
  "node_modules",
  "eslint",
  "bin",
  "eslint.js",
);

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

/**
 * Hands the findings to Claude as context and ends the hook.
 * @param {string} context
 * @returns {never}
 */
function reportAndExit(context) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PostToolUse",
        additionalContext: context,
      },
    }),
  );
  process.exit(0);
}

/**
 * Runs a Node CLI from node_modules.
 * @param {string} bin
 * @param {string[]} args
 * @param {number} timeout milliseconds
 */
function runNodeCli(bin, args, timeout) {
  return spawnSync(process.execPath, [bin, ...args], {
    cwd: projectDir,
    encoding: "utf8",
    timeout,
  });
}

/** @param {import("node:child_process").SpawnSyncReturns<string>} result */
function output(result) {
  return (result.stdout || result.stderr || result.error?.message || "").trim();
}

/** @type {unknown} */
let filePath;
try {
  filePath = JSON.parse(await readStdin())?.tool_input?.file_path;
} catch {
  reportAndExit(
    "format-lint hook: the hook input could not be read, so the file was neither formatted nor linted.",
  );
}
if (typeof filePath !== "string") process.exit(0);

const absolute = path.resolve(projectDir, filePath);
const relative = path.relative(projectDir, absolute);
const outsideProject =
  relative.startsWith("..") ||
  path.isAbsolute(relative) ||
  relative.split(path.sep).includes("node_modules");
const extension = path.extname(absolute).toLowerCase();
if (outsideProject || !PRETTIER_EXTENSIONS.has(extension)) process.exit(0);

if (!existsSync(prettierBin) || !existsSync(eslintBin)) {
  reportAndExit(
    "format-lint hook: Prettier or ESLint is not installed. Run `npm ci`.",
  );
}

const findings = [];

const prettier = runNodeCli(
  prettierBin,
  ["--write", "--log-level", "warn", absolute],
  20_000,
);
if (prettier.error || prettier.status !== 0) {
  findings.push(`Prettier failed on ${relative}:\n${output(prettier)}`);
}

if (ESLINT_EXTENSIONS.has(extension)) {
  const eslint = runNodeCli(
    eslintBin,
    ["--no-warn-ignored", "--max-warnings", "0", absolute],
    35_000,
  );
  if (eslint.status === 1) {
    findings.push(`ESLint found problems in ${relative}:\n${output(eslint)}`);
  } else if (eslint.error || eslint.status !== 0) {
    findings.push(`ESLint failed on ${relative}:\n${output(eslint)}`);
  }
}

if (findings.length > 0) reportAndExit(findings.join("\n\n"));
