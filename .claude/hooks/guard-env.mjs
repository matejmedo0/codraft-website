/**
 * Claude Code PreToolUse hook (Write|Edit): blocks writes to .env files,
 * which may hold secrets. `.env.example` documents the variables and stays
 * editable.
 *
 * Exit code 2 blocks the tool call and shows the message to Claude. If the
 * hook input can't be read, the write is blocked too: a guard that fails
 * open is no guard.
 */

const ALLOWED = ".env.example";

/**
 * The file name of a path, for Windows and POSIX separators alike.
 * @param {string} filePath
 */
function fileName(filePath) {
  return filePath.split(/[\\/]/).pop() ?? "";
}

/**
 * `.env` and `.env.*`, except `.env.example`. Case-insensitive, because
 * Windows file names are.
 * @param {string} filePath
 */
function isProtectedEnvFile(filePath) {
  const name = fileName(filePath).toLowerCase();
  if (name === ALLOWED) return false;
  return name === ".env" || name.startsWith(".env.");
}

async function readStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

/** @param {string} message */
function block(message) {
  process.stderr.write(`${message}\n`);
  process.exit(2);
}

/** @type {unknown} */
let filePath;
try {
  const input = JSON.parse(await readStdin());
  filePath = input?.tool_input?.file_path;
} catch {
  block(
    "guard-env hook: the hook input could not be read, so the write is blocked to be safe.",
  );
}

if (typeof filePath === "string" && isProtectedEnvFile(filePath)) {
  block(
    `Blocked: ${fileName(filePath)} may hold secrets, so Claude never edits it. Document variables in .env.example instead.`,
  );
}
