# Scaffold verification (2026-10-19)

> **What this is.** Facts observed while executing the [scaffold plan](../plans/2026-10-19-scaffold-plan.md), mostly by running the tools on this machine and in CI. They confirm or extend the [scaffold toolchain note](2026-10-19-scaffold-toolchain.md), which stays unchanged.
>
> **Confidence:** **High** = observed today; **Medium** = read in official docs, not run.

## 1. Items the toolchain note asked to confirm

| Item | Result | How | Confidence |
|---|---|---|---|
| `/en` breaks with `build.format: 'file'` | Confirmed. The build wrote `en.html` next to the `en/` folder, and the Node server answered `/en` with 404. With `'directory'`, `/en` returns 200 and `/en/` gets a 301 to `/en`. | A temporary build into a separate folder, then curl | High |
| The Node adapter serves the Croatian 404 for unknown `/en/*` | Confirmed. `/en/x` returns status 404 with the Croatian page (`lang="hr"`); `/en/404` serves the English page with 200. `astro dev` serves the English page for `/en/x`. | curl against `dist/server/entry.mjs`; the dev server | High |
| `eslint-plugin-jsx-a11y` refuses ESLint 10 | Confirmed: `npm install --dry-run eslint-plugin-jsx-a11y@6.10.2` fails with ERESOLVE (peer `eslint ^3 … ^9`). | npm 11.19.1 | High |
| Vitest 5 with Astro's `getViteConfig` | Works with Astro 7.4; both use Vite 8.3.4. No fallback to Vitest 4.1 needed. | `npm run test` | High |
| The guardrail regex and `\w` | The verbatim regex from `compliance.md` misses "snimka postojećeg stanja"; the version with `[\p{L}\p{N}_]` and the `u` flag catches it. | Node; unit tests | High |

## 2. Local machine and tooling

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| winget lags behind Node releases | After `winget source update`, `OpenJS.NodeJS.LTS` offered at most 24.20.0, while nodejs.org listed 24.22.0 (released 2026-10-14). The official MSI was used instead: SHA-256 matched `SHASUMS256.txt`, and the Authenticode signature (OpenJS Foundation) was valid. | `winget show --versions`; https://nodejs.org/dist/index.json | High |
| A Node MSI upgrade stops running Node processes | In `/passive` mode, the Windows Installer Restart Manager shut down every process holding Node files, including the Playwright MCP servers started with `npx`. Their `cmd` wrappers stayed alive, so Claude Code waited on a dead server until its 30-minute tool timeout. After a Node upgrade, reconnect MCP servers (`/mcp` → Reconnect). | The MSI verbose log; the process list | High |
| Node type stripping | Node 24.22 imports `.ts` files written in erasable syntax with `.ts` import extensions, without a warning. The JS budget script reads the route map this way. | node | High |
| Playwright MCP output | It may write only inside the project root or `.playwright-mcp/` (gitignored). | The MCP's error message | High |
| Favicon requests | Chromium's headless shell (E2E) never requests `/favicon.ico`; headed Chrome (Playwright MCP) does, and logs a 404 when the page declares no icon. | Playwright MCP compared with the E2E run | High |

## 3. Astro, ESLint and the build

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| Types of `.astro` imports | Astro declares no `*.astro` module type for plain TypeScript; only Astro's language tools (`astro check`, the editor plugin) resolve `.astro` imports. typescript-eslint therefore sees an imported `.astro` component as an error type. | `node_modules/astro/client.d.ts`; an ESLint run | High |
| astro-eslint-parser | It doesn't support `projectService` and falls back to `project: true`, with a warning. | ESLint output | High |
| eslint-plugin-jsx-a11y-x 0.2.0 | `configs.recommended` uses the legacy eslintrc format (`plugins` is an array), so flat config registers the plugin object and spreads the rules. eslint-plugin-astro 3.2.1 exposes its a11y rules for `.astro` files as `astro/jsx-a11y/*`. | Package inspection | High |
| eslint-plugin-react-hooks 7.1.1 | The flat config is `configs.flat.recommended`; it includes the React Compiler rules. | Package inspection | High |
| Build output | Prerendered pages land in `dist/client` (`index.html`, `en/index.html`, `404.html`, `en/404/index.html`); the server in `dist/server/entry.mjs`. | The build log | High |
| Build warnings | Astro warns that Shiki's inline styles conflict with the CSP; `markdown.syntaxHighlight: false` removes the warning. The Node adapter logs "Enabling sessions with filesystem storage"; sessions start only if code uses `Astro.session`. | The build log | High |
| CSP in the build | One `<meta http-equiv="content-security-policy">` per page: the four configured directives, then `script-src 'self'` with 7 hashes (Astro's island and client-directive scripts, present even on pages without islands) and `style-src 'self'` with 2 hashes. A probe confirmed that it blocks inline `style` attributes and images from other origins, and that each violation is a console error. | `dist/client/*.html`; a Playwright probe | High |
| JavaScript weight of an island | A page with one minimal React island (`client:load`) loads 69.5 KB of gzip JS; pages without islands load 0 KB. | A `check-js-budget.mjs` probe | High |
| Routes starting with `_` | Files and folders in `src/pages` whose names start with `_` are not routes. The phase 2 design lab needs a normal folder name (e.g. `lab/`) and has to be kept out of production builds. | https://docs.astro.build/en/guides/routing/#excluding-pages | Medium |

## 4. Node 26 and CI

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| `node:sqlite` stability | Stability 1.2 (release candidate) in both the Node 24 and the Node 26 docs. A smoke test (create, insert, select) runs without warnings on 24.22.0 and 26.12.0 (Windows). | https://nodejs.org/docs/latest-v24.x/api/sqlite.json ; https://nodejs.org/docs/latest-v26.x/api/sqlite.json ; node | High |
| Astro 7.4 on Node 26 | The CI verify job passes on Node 26.12.0 (Linux): lint, format, typecheck, unit tests, build, budget, guardrails. | CI run 39188600547 | High |
| CI's Node 24 | `setup-node` with `.nvmrc` = `24` used the runner's cached 24.21.0. Add `check-latest: true` if CI must always use the newest 24.x. | The CI log | High |
| Lockfile made on Windows | `npm ci` on the Linux runners installed the Windows-generated `package-lock.json` without errors. | CI | High |
| Timing | Verify took 38 s on Node 24 and 45 s on Node 26; E2E took 1 min 3 s. | CI | High |
