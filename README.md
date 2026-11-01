# Codraft website

The website of **Codraft**, a small studio that plans, builds and looks after websites, software and AI tools for businesses. Architectural drafting (CAD) is a separate offering.

- **Languages:** Croatian (default, at `/`) and English (`/en`)
- **Stack:** Astro 7 with React islands and a small Node API, TypeScript, on an EU VPS ([ADR 0008](docs/decisions/0008-stack-astro-with-react-islands.md), [ADR 0009](docs/decisions/0009-hosting-ovhcloud-vps-eu.md))

## Getting started

Node.js 24 LTS, at least 24.16 (`.nvmrc`), and npm 11.

```sh
nvm use                           # Node from .nvmrc
npm ci                            # exact versions from package-lock.json
npm run dev                       # http://localhost:4321
npx playwright install chromium   # once, for the E2E tests
```

No environment variables yet; `.env.example` documents them when they arrive.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. The Content-Security-Policy is active only in the build. |
| `npm run build` | Production build: static pages in `dist/client`, the Node server in `dist/server/entry.mjs` |
| `npm run preview` | Runs the built Node server |
| `npm run verify` | Lint, format check, typecheck, unit tests, build and copy guardrails, in CI order |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright) on the built server at 375, 768 and 1440 px; build first and stop `npm run dev` |
| `npm run lint` / `npm run typecheck` | ESLint / `astro check` |
| `npm run format` / `npm run format:check` | Prettier |
| `npm run check:budget` | JavaScript budget per built page (on demand until the optimisation phase, ADR 0035) |
| `npm run check:guardrails` | Banned drafting terms in `src/` ([compliance.md](docs/compliance.md#copy-guardrails)) |
| `node scripts/brand-web-copies.mjs` | Rewrites the web copies of the brand marks and favicons from `Assets/codraft-brand/` |

## Repository structure

```
.claude/                Claude Code hooks and permissions
.github/                CI, Dependabot, PR template, issue forms
Assets/codraft-brand/   Brand masters (read-only)
docs/                   Copy, sitemap, brand, motion, compliance, architecture, ADRs
public/                 Favicons and manifest (web copies of the brand package)
scripts/                Build checks and the brand web copies
src/                    Pages, layouts, views, components, features, styles, locales, config
tests/e2e/              Playwright tests
```

Code structure and conventions: [docs/architecture.md](docs/architecture.md).

## Branches and commits

- `main`: the main line. Bigger features go on `feat/<name>` and merge into `main` with a PR.
- `dev`: a colleague's working branch.
- [Conventional Commits](https://www.conventionalcommits.org/) in English. CI runs `npm run verify` and the E2E tests on every PR.

## Licence

Proprietary. © 2026 Codraft. All rights reserved. The brand marks in `Assets/` may not be used outside Codraft's own materials.
