# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The website of Codraft, a small team studio that plans, builds and looks after websites, software and AI tools for businesses, with engineering drafting (CAD) as a separate offering.

## Where things are

- **Live status** (Croatian): `PROGRESS.md`. Current phase, next step, decisions, open questions, and what we need from the client.
- **How Claude works:** `.claude/rules/codraft-workflow.md`. Phases, gates, authority, and the skills and agents for each phase.
- **Documentation:** start at `docs/README.md`.
  - The plan by phase is in `docs/phases/`, one document per phase. Read the current phase's document at session start.
  - Decisions (ADRs) are in `docs/decisions/`; dated research notes with sources are in `docs/research/`.
- **Site copy, source of truth:** `docs/content.md`. EN verbatim, HR draft, glossary, suggestions, gaps.
- **Sitemap, URLs and page outlines:** `docs/information-architecture.md`.
- **Brand assets:** `Assets/codraft-brand/`.
  - This is the final package. The masters are read-only; the site uses optimised copies.
  - See the package README and `docs/brand.md`.

## Languages and market

- Croatian is the default language at `/`; English is under `/en`.
- Each language has localised ASCII slugs (ADR 0002).
- Market: Croatia.

## Site structure (launch)

| Page (HR) | HR | EN |
|---|---|---|
| Početna | `/` | `/en` |
| Usluge | `/usluge` | `/en/services` |
| CAD crtanje | `/cad-crtanje` | `/en/engineering-drafting` |
| O nama | `/o-nama` | `/en/about` |
| Besplatna analiza | `/besplatna-analiza` | `/en/free-audit` |
| Kontakt | `/kontakt` | `/en/contact` |

- **Usluge** has three anchored stages: 01 Planiranje, 02 Izrada, 03 Održavanje i rast.
- **Also at launch:** Privatnost, Kolačići, Impresum, Izjava o pristupačnosti, and a localised 404.
- **Phase 4:** AI asistenti (`/usluge/ai-asistenti`).
- **Later:** Radovi, Blog.
- The slugs are confirmed when the client approves the Croatian terminology. After launch they never change (any change needs a 301). Details: `docs/information-architecture.md`.

## Brand

The wordmark is a geometric sans in navy `#0F1B2D`, on an off-white `#F6F5F1` ground. The blue `#2F6BFF` accent has three parts:
- an arc segment on the "c"
- a drafting line that forms the "f"/"t" crossbars
- the hollow CAD grip square at the end of that line

**Blue is for graphics and large text only.** It measures 4.12:1 on off-white, which fails AA for body text. Primary buttons are navy. See `docs/brand.md`.

## Copy guardrails

- **Drafting is not projektiranje.** Never describe Codraft's drafting as projektiranje or any related term, in any inflected form; that work is regulated in Croatia. Say "crtamo prema vašim skicama, oznakama i standardima". The full list and the check regex are in `docs/compliance.md`; `npm run check:guardrails` runs the regex over `src/`.
- **No invented proof:** no invented clients, testimonials, logos or metrics (ADR 0004).
- **The English copy changes only through suggestions the client approves** (`docs/content.md`).

## Git

- Repository: `matejmedo0/codraft-website` on GitHub (private).
- One branch and PR per phase. Merge to `main` only on the client's word.
- Conventional Commits. See `CONTRIBUTING.md`.

## Stack and commands

Astro 7 with static output and React 19 islands; only `/api/*` runs on the `@astrojs/node` server (ADR 0008). TypeScript is pinned to 6.0.x. Node 24 LTS (at least 24.16, `.nvmrc`) and npm. Hosting is an OVHcloud VPS with Caddy (ADR 0009). Structure and code conventions: `docs/architecture.md`.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:4321. The CSP is off in dev. The design lab (phase 2 prototypes) is at `/lab`. |
| `npm run build` | Production build: static pages in `dist/client`, the Node server in `dist/server/entry.mjs`. |
| `npm run build:lab` | The production build plus the design lab, for checking it under the CSP. Never deploy it. |
| `npm run preview` | Runs the built Node server. |
| `npm run verify` | What CI's verify job runs, in order: lint, format check, typecheck (`astro check`), unit tests, build, JavaScript budget, copy guardrails. |
| `npm run test:e2e` | Playwright on the built server at 375, 768 and 1440 px. Build first, and stop the dev server: locally Playwright reuses whatever listens on port 4321. Install the browser once with `npx playwright install chromium`. |
| `npm run format` | Prettier on everything except `docs/`, `Assets/` and the root Markdown files. |

- One unit test file or name: `npm run test -- src/features/i18n/urls.test.ts`, or `npm run test -- -t "pathFor"`.
- One E2E test at one width: `npm run test:e2e -- -g "English 404" --project=mobile-375`.

## Architecture

- **One route map drives every URL.** `src/features/i18n/route-map.ts` holds each launch page's `{ hr, en }` slug, and `urls.ts` builds the paths (no trailing slash), absolute URLs and hreflang links (`x-default` points to English). Never hard-code a URL, and never build a canonical from `Astro.url`: the directory build format keeps a trailing slash there.
- **One catch-all route renders every page.** `src/pages/[...slug].astro` generates a route-map page in both languages once the page has a view in `src/views/`; the view registry is inside its `getStaticPaths`. Until phase 3 only `home` has a view. The 404 pages and `/api/*` are static routes and take precedence.
- **The design lab** (`src/lab/`, phase 2 prototypes and the style page) is injected by an integration in `astro.config.ts` only in `astro dev` and `npm run build:lab`. Site code never imports from `src/lab/`.
- **UI strings** live in `src/locales/{hr,en}.json` and are read with `t(locale, key)`. Both files must have the same keys (a type check plus a unit test). Copy goes into `docs/content.md` before it goes into the site.
- **CSP.** Astro adds a hash-based CSP `<meta>` to every built page. It blocks inline `style` attributes and anything from another origin. It is off in `astro dev`, so test CSP-sensitive changes on the build; the E2E tests fail on any console error, CSP violations included.
- **Layers, enforced by ESLint:** client code (`.tsx`, client scripts in `.astro`) never imports `**/server/**`; `src/components/ui/` never imports features, views, layouts or pages; `src/components/site/` never imports views, layouts or pages. `src/config/` is the bottom layer.
- **Design system (ADR 0015):** tokens are CSS custom properties in `src/styles/`, inside cascade layers so component styles always win. Components use role tokens (`--ink`, `--surface`, `--line`, …), never the `--color-*` palette; `.surface-navy` switches to the navy surface, used once per page. Design-system components are in `src/components/ui/`, the header, title-block footer and language switcher in `src/components/site/`, and views render their zones inside `SiteLayout`. The style page is `/lab/style`; the Figma library mirrors the code (ADR 0016), which stays the source of truth.
- **Astro renders a component's `<script>` in place**, not hoisted: keep scripts out of components that render inside links or SVG. Without JavaScript, or with reduced motion, every part must show its final state.
- **Type-aware lint covers `.ts` and `.tsx` only.** `.astro` files are linted without types and type-checked by `astro check`. A `.ts` file can't see the types of an imported `.astro` file, so keep `.astro` imports inside `.astro` files.
- **`scripts/check-js-budget.mjs`** imports the route map through Node's TypeScript type stripping, so `route-map.ts`, `urls.ts` and `site.ts` must use erasable syntax only and import each other with `.ts` extensions. Budgets (gzip, per page): 15 KB for content pages, 100 KB for pages with a form or the layer viewer, 120 KB for the AI page.
- **Environment variables** are declared in the `env.schema` of `astro.config.ts` and documented in `.env.example`.
- **Claude Code hooks** (`.claude/settings.json`): edits to `.env*` files other than `.env.example` are blocked, and after every Write or Edit, Prettier and then ESLint run on the changed file and report their findings.
- **Known limitation:** the Node server answers unknown `/en/*` paths with the Croatian 404 page. In production Caddy maps them to `en/404` (phase 7).
