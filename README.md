# Codraft website

The website of **Codraft**, a small studio that plans, builds and looks after websites, software and AI tools for businesses. Engineering drafting (CAD) is a separate offering.

- **Languages:** Croatian (default, at `/`) and English (`/en`)
- **Market:** Croatia
- **Stack:** Astro 7 with React islands and a small Node API, TypeScript, on an EU VPS ([ADR 0008](docs/decisions/0008-stack-astro-with-react-islands.md), [ADR 0009](docs/decisions/0009-hosting-ovhcloud-vps-eu.md))
- **Status:** phase 2 (Design) is done and in review: the chosen direction ([ADR 0015](docs/decisions/0015-design-direction-model-i-list.md)) is built as a design system, shown on the style page at `/lab/style` (dev server or `npm run build:lab`). Live status: [PROGRESS.md](PROGRESS.md) (Croatian).

## Getting started

**Requirements:** Node.js 24 LTS, at least 24.16 (see `.nvmrc`), and npm 11.

```sh
npm ci                            # install the exact versions from package-lock.json
npm run dev                       # dev server on http://localhost:4321
npx playwright install chromium   # once, for the E2E tests
```

There are no environment variables yet; `.env.example` documents them when they arrive (phase 4).

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Dev server. The Content-Security-Policy is active only in the build. The design lab is at http://localhost:4321/lab, and the style page of the design system at http://localhost:4321/lab/style. |
| `npm run build` | Production build: static pages in `dist/client`, the Node server in `dist/server/entry.mjs` |
| `npm run build:lab` | The same build plus the design lab (`/lab/*`), to check the prototypes under the real CSP. Never deploy it. |
| `npm run preview` | Runs the built Node server |
| `npm run verify` | Lint, format check, typecheck, unit tests, build, JavaScript budget and copy guardrails, in the same order as CI |
| `npm run test` | Unit tests (Vitest) |
| `npm run test:e2e` | E2E tests (Playwright) on the built server at 375, 768 and 1440 px; run `npm run build` first, and stop `npm run dev` (Playwright reuses port 4321) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `astro check` |
| `npm run format` / `npm run format:check` | Prettier |
| `npm run check:budget` | JavaScript budget per built page (ADR 0008) |
| `npm run check:guardrails` | Banned drafting terms in `src/` ([compliance.md](docs/compliance.md#copy-guardrails)) |
| `node scripts/brand-web-copies.mjs` | Rewrites the web copies of the brand marks and the favicon set from `Assets/codraft-brand/`, without C2PA (ADR 0014) |

## Repository structure

```
.claude/                Claude Code: workflow rules, hooks, permissions
.github/                CI, Dependabot, PR template, issue forms, CODEOWNERS
Assets/codraft-brand/   Final brand package: read-only masters
public/                 The favicon set (web copies of the brand package)
docs/                   Project documentation and the plan by phase
scripts/                Build checks (JavaScript budget, copy guardrails) and the brand web copies
src/                    The site: pages, layouts, views, components, features, styles, locales, config
tests/e2e/              Playwright tests
CLAUDE.md               Entry point for Claude Code
CONTRIBUTING.md         How we work: phases, branches, commits, PRs, definition of done
PROGRESS.md             Live status (Croatian)
```

The code structure and its rules are described in [docs/architecture.md](docs/architecture.md).

## Documentation

Start with [docs/README.md](docs/README.md). Key documents:

| Document | Contents |
|---|---|
| [docs/phases/](docs/phases/README.md) | Roadmap and one document per phase (0–8) |
| [docs/architecture.md](docs/architecture.md) | Stack, code structure, quality gates, integrations |
| [docs/information-architecture.md](docs/information-architecture.md) | Sitemap, URLs, page outlines |
| [docs/content.md](docs/content.md) | Site copy (source of truth), HR drafts, suggestions, gaps |
| [docs/brand.md](docs/brand.md) | Brand marks, colours, contrast, typography |
| [docs/motion.md](docs/motion.md) | Motion concept |
| [docs/compliance.md](docs/compliance.md) | Croatian and EU requirements |
| [docs/decisions/](docs/decisions/README.md) | Architecture Decision Records |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

Proprietary. © 2026 Codraft. All rights reserved. The brand marks in `Assets/` may not be used outside Codraft's own materials.
