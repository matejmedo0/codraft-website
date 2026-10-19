# Scaffold toolchain facts (2026-10-19)

> **Input for the phase 1 scaffold.** These facts were checked while writing the approved [scaffold plan](../plans/2026-10-19-scaffold-plan.md), so the session that executes the plan doesn't have to research them again. Decisions stay in ADR 0008–0013.
>
> **How it was collected.** A Plan agent checked the npm registry (`dist-tags.latest`, `peerDependencies`, `engines`), the official docs and the Astro source on 2026-10-19. It installed and ran nothing. The main session checked the local Node installation.
>
> **Confidence:** **High** = read on the official page or registry today; **Medium** = read in source code or a secondary source, not run; **Low** = unverified.

## 1. Local machine

| Fact | Detail | Source | Confidence |
|---|---|---|---|
| Installed tools | Node 24.11.0 (installed with winget, package id `OpenJS.NodeJS.22`, at `C:\Program Files\nodejs`); npm 11.6.1; git 2.52; gh 2.102, logged in as `matejmedo0` with the `repo` and `workflow` scopes. | `node --version`, `winget list`, `gh auth status` | High |
| Node must be upgraded | `eslint-plugin-astro` and `astro-eslint-parser` require Node `^24.16.0`. The latest Node 24 LTS is 24.22.0. The upgrade (`winget install --id OpenJS.NodeJS.LTS -e`, with a UAC prompt, or the MSI from nodejs.org) is point 0 of the approved plan. | npm registry `engines` ; https://nodejs.org/dist/index.json | High |
| Shells | Windows PowerShell 5.1 is the main shell, and Git Bash is also available. PowerShell 5.1 mangles `git commit -m` messages that contain double quotes, so use `git commit -F <file>` or Git Bash. | Observed 2026-10-19 | High |

## 2. Package set (npm `latest` on 2026-10-19)

| Package | Version | Peer and engine notes |
|---|---|---|
| astro | 7.4.0 | Node ≥ 22.22.0; ships vite ^8.3.4 and zod ^4 |
| @astrojs/node | 11.1.8 | — |
| @astrojs/react | 7.1.0 | React 17–19 |
| react, react-dom | 19.3.1 | — |
| @types/react, @types/react-dom | 19.3.0 | — |
| @types/node | 24.19.2 | Keep on major 24 |
| typescript | **6.0.3** (last 6.0.x; `latest` is 7.0.2) | `@astrojs/check` accepts ^5 or ^6; typescript-eslint needs < 6.1.0 |
| @astrojs/check | 0.9.10 | — |
| eslint | **10.13.0** | — |
| @eslint/js | 10.0.1 | — |
| typescript-eslint | 8.71.2 | Accepts ESLint 10 |
| eslint-plugin-astro | 3.2.1 | Requires ESLint 10 (from 2.0) and Node ^24.16.0. From 3.1 it takes the TS parser from typescript-eslint, so no separate `@typescript-eslint/parser` is needed. |
| eslint-plugin-jsx-a11y-x | 0.2.0 | Fork that accepts ESLint 9 or 10. `eslint-plugin-astro` ≥ 3.2.0 loads it for its a11y configs. Rules are prefixed `jsx-a11y-x/`; its configs don't set `files`, so set them. |
| eslint-plugin-react-hooks | 7.1.1 | — |
| globals | 17.13.0 | — |
| prettier | 3.9.10 | — |
| prettier-plugin-astro | 1.1.1 | — |
| vitest | 5.0.5 | Needs `vite` as a peer, provided by Astro. Use with Astro not verified (see 4). |
| @playwright/test | 1.64.1 | — |
| @axe-core/playwright | 4.14.0 | — |

Source: https://registry.npmjs.org/ (each package's JSON). Confidence: High.

**Peer conflict.** `eslint-plugin-jsx-a11y@6.10.2` is still the latest release and accepts ESLint only up to 9. npm should refuse to install it next to ESLint 10 (ERESOLVE; expected from the peer ranges, not run). Hence the `-x` fork. Confidence: High (peer ranges) / Medium (the ERESOLVE outcome).

**Why not ESLint 9.** `eslint-plugin-astro` 2.0 and later require ESLint 10. On ESLint 9, the last usable version is 1.7.0, whose parser uses the old `@astrojs/compiler`, while Astro 7.4 uses `@astrojs/compiler-rs`. Sources: https://ota-meshi.github.io/eslint-plugin-astro/user-guide/ ; https://github.com/ota-meshi/eslint-plugin-astro/blob/main/src/a11y/load.ts. Confidence: High.

**TypeScript 6** no longer adds `@types` packages by default (`types` defaults to `[]`). Add `"types": ["node"]` and extend `astro/tsconfigs/strictest`. Source: https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/. Confidence: High.

## 3. Astro 7 configuration

| Fact | Detail | Source | Confidence |
|---|---|---|---|
| `security.csp` shape | `algorithm` (default `'SHA-256'`). `directives: string[]` holds everything except `script-src` and `style-src`. `scriptDirective { resources, hashes, strictDynamic }` and `styleDirective { resources, hashes }`. Since 7.1, entries can be objects with `kind: 'element' \| 'attribute'`, e.g. `styleDirective.resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }]` if inline style attributes are ever needed. | https://docs.astro.build/en/reference/configuration-reference/ | High |
| i18n | `{ locales: ['hr', 'en'], defaultLocale: 'hr', routing: { prefixDefaultLocale: false } }` | https://docs.astro.build/en/guides/internationalization/ | High |
| URLs without a trailing slash | Use `trailingSlash: 'never'` with `build.format: 'directory'` (the default). With the Node adapter, `/usluge` serves `usluge/index.html`, and `/usluge/` gets a 301 to `/usluge`. With `build.format: 'file'`, `/en` breaks: `en.html` sits next to the `en/` folder, the handler looks for `/en/index.html` and returns 404. In directory builds `Astro.url` carries a trailing slash, so canonicals must come from the route map. | https://github.com/withastro/astro/blob/main/packages/integrations/node/src/serve-static.ts (read in source, not run) | Medium |
| `astro preview` | With `@astrojs/node`, it starts the same server as `node ./dist/server/entry.mjs`. | https://docs.astro.build/en/guides/integrations-guide/node/ | High |
| **Localised 404 gap** | Since 7.0.3 Astro chooses `/en/404` for missing `/en/*` paths, but `@astrojs/node` 11.1.8 always reads the root `404.html`, so `/en/x` returns the HR page with status 404. Production is unaffected once Caddy maps `/en/*` errors to `en/404/index.html` (phase 7). | https://github.com/withastro/astro/blob/main/packages/integrations/node/src/serve-app.ts ; https://github.com/withastro/astro/pull/17087 (read in source, not run) | Medium |
| Catch-all route | In `[...slug].astro`, `getStaticPaths` returning `{ params: { slug: undefined } }` produces `/`; `'en'` produces `/en`. Static routes (`404.astro`, `en/404.astro`, `api/health.ts`) take priority over the catch-all. | https://docs.astro.build/en/guides/routing/ | High |
| `astro:env` | Fields: `envField.string` / `number` / `boolean` / `enum`, with `context: 'server' \| 'client'`, `access: 'secret' \| 'public'`, plus `optional` or `default`. A client secret is not allowed. `validateSecrets: true` checks secrets when dev or build starts. Not usable in the config file or in `scripts/`. | https://docs.astro.build/en/guides/environment-variables/ | High |
| Node adapter options | `node({ mode: 'standalone', bodySizeLimit: 32 * 1024 })`; the default body limit is 1 GB. | https://docs.astro.build/en/guides/integrations-guide/node/ | High |

## 4. Testing

| Fact | Detail | Source | Confidence |
|---|---|---|---|
| Vitest config | `vitest.config.ts` with `/// <reference types="vitest/config" />`, exporting `getViteConfig({ test: { environment: 'node' } })` from `astro/config`. Astro's own repository still tests with `vitest ^4.1.11`, so Vitest 5 with `getViteConfig` is unverified. Fallback: `vitest@4.1.12`; record the switch in the phase log. | https://docs.astro.build/en/guides/testing/ ; https://vitest.dev/guide/migration | High (config) / Low (Vitest 5) |
| Playwright web server | `webServer: { command: 'node ./dist/server/entry.mjs', env: { HOST: '127.0.0.1', PORT: '4321' }, url: 'http://127.0.0.1:4321/api/health', reuseExistingServer: !process.env.CI }`. Build first; this is the same server systemd will run. | https://playwright.dev/docs/test-webserver | High |
| Chromium in CI | `npx playwright install --with-deps --only-shell chromium` | https://playwright.dev/docs/browsers | High |

## 5. Claude Code hooks and permissions

| Fact | Detail | Source | Confidence |
|---|---|---|---|
| Hook shape | In `.claude/settings.json`: `"PreToolUse": [{ "matcher": "Write\|Edit", "hooks": [{ "type": "command", "command": "node", "args": ["${CLAUDE_PROJECT_DIR}/.claude/hooks/guard-env.mjs"], "timeout": 10 }] }]`. `PostToolUse` has the same shape (e.g. `format-lint.mjs`, `timeout: 60`). `MultiEdit` is a legacy tool and doesn't need to be in the matcher. | https://code.claude.com/docs/en/hooks | High |
| Input | JSON on stdin with `tool_name` and `tool_input.file_path`; `PostToolUse` also gets `tool_response`. On Windows the path is absolute with backslashes, so use `path.basename`. | Same | High |
| Blocking (PreToolUse) | Exit code 2 with a message on stderr, or exit 0 with `hookSpecificOutput.permissionDecision: "deny"` plus `permissionDecisionReason`. **Exit 1 does not block** (fails open). | Same | High |
| Reporting (PostToolUse) | Always exit 0. With findings, print `{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"…"}}`. | Same | High |
| Windows | Hooks given an `args` list run without a shell. Otherwise the command runs in Git Bash, or PowerShell if Git Bash is missing; the `"shell"` field overrides this. npm's `.cmd` shims can't be started without a shell, so call `node_modules/eslint/bin/eslint.js` and `node_modules/prettier/bin/prettier.cjs` with `node`, or use their Node APIs. | Same | High |
| Allow rules | `Bash(npm run build)` matches only that exact command; `Bash(npm run test *)` matches it with or without arguments. The older form `Bash(git status:*)` is still accepted. **Bash rules don't cover the PowerShell tool**, so repeat the rules as `PowerShell(…)`. Limit pushes to `git push origin *` so other remotes still ask. | https://code.claude.com/docs/en/permissions | High |
| Deny rules | The Plan agent suggested `deny: ["Edit(.env*)", "Edit(!.env.example)"]` to also cover Bash `>` redirects. The negation syntax is not confirmed; check it with the `update-config` skill before relying on it. The PreToolUse hook is the required mechanism. | Same | Low |

## 6. GitHub Actions and Dependabot

| Fact | Detail | Source | Confidence |
|---|---|---|---|
| Action SHAs | `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1`; `actions/setup-node@949feb2413d6458794dcd2491c4babbbce0c15c1 # v7.1.0`; `actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9 # v7.0.2`. Re-check them with `gh api repos/<owner>/<repo>/git/ref/tags/<tag>` before committing. | https://github.com/actions/setup-node ; GitHub tags | Medium |
| Workflow settings | `permissions: { contents: read }`; `persist-credentials: false` on checkout; `setup-node` with `node-version-file: .nvmrc` and `cache: npm`; `concurrency: { group: "${{ github.workflow }}-${{ github.event.pull_request.number \|\| github.ref }}", cancel-in-progress: true }`; upload the Playwright report only on failure with `retention-days: 7`. | GitHub Actions docs | High |
| Dependabot | `npm` and `github-actions`, weekly on Monday, with `groups` for minor and patch. `ignore`: `typescript` versions `>=6.1.0`, and `@types/node` major updates (`version-update:semver-major`). GitHub reportedly applies a 3-day cooldown to version updates by default. Dependabot updating both the pinned SHA and its `# vX` comment is reported by secondary sources only. | https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference | High / Medium (cooldown, SHA comments) |

## 7. Risks and open points

- **Guardrail regex.** JavaScript's `\w` matches ASCII only. Copied verbatim from [compliance.md](../compliance.md#copy-guardrails), the regex misses "snimka postojećeg stanja" (tested in Node). In `scripts/check-guardrails.mjs`, use `[\p{L}\p{N}_]` with the `u` flag, and cover the compliance examples with unit tests.
- **View registry.** Only `home` gets a view in phase 1, so the registry is `Partial<Record<PageId, View>>` until phase 3.
- **Lockfile.** It is created on Windows and installed with `npm ci` on Linux in CI. The npm bug with platform-specific optional binaries ([npm/cli#4828](https://github.com/npm/cli/issues/4828)) was closed in April 2025. Watch the first CI run anyway.
- **Prettier.** `.prettierignore` must list `docs/`, `Assets/` and the root `*.md` files, so the hook and `format:check` never reformat the documentation or the plan snapshots.
- **`site` URL.** `https://codraft.hr` is the recommended domain, not bought yet. Change it if the client picks another domain.
- **Not run, only read in source:** the `/en` break with `build.format: 'file'`, the HR 404 for `/en/*` on the Node adapter, and the ERESOLVE failure. Confirm all three during the scaffold.
