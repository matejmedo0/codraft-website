# CLAUDE.md

The website of Codraft, a small studio that plans, builds and looks after websites, software and AI tools for businesses, with architectural drafting (CAD) as a separate offering. Market: Croatia.

## Docs

- `docs/content.md`: site copy, the source of truth (EN verbatim, HR draft, glossary, gaps). Copy goes there before it goes into the site.
- `docs/information-architecture.md`: sitemap, URLs, page outlines.
- `docs/architecture.md`: stack, code structure, quality gates, integrations.
- `docs/brand.md`, `docs/motion.md`, `docs/compliance.md`: the brand marks, the motion foundation, Croatian and EU requirements.
- `docs/decisions/`: ADRs. A lasting decision gets a new ADR; accepted ones are not rewritten.
- `Assets/codraft-brand/`: brand masters, read-only. The site uses the copies that `scripts/brand-web-copies.mjs` writes.

## Direction

A new, scroll-based look built for the wow ([ADR 0035](docs/decisions/0035-a-scroll-based-site-built-for-the-wow.md)). Pages are rebuilt one at a time on the user's instructions, Home first; the CAD language comes back only where the user asks for it. Pages not yet rebuilt keep the old design. Colours: the Obsidian Copper palette ([ADR 0036](docs/decisions/0036-obsidian-copper-palette.md)), as tokens in `src/styles/tokens.css`. Type: Clash Display (`src/styles/fonts.css`); its licence forbids sharing the file through a public repository, so `public/fonts/` and `Assets/codraft-fonts/` stay out of git (`.gitignore`); never commit them. Looks first: the JavaScript budget, reduced motion and other optimisation wait for a later phase.

## Languages and pages

Croatian is the default at `/`, English under `/en`, each with localised ASCII slugs (ADR 0002).

| Page (HR) | HR | EN |
|---|---|---|
| Početna | `/` | `/en` |
| Usluge | `/usluge` | `/en/services` |
| Tehničko crtanje | `/tehnicko-crtanje` | `/en/architectural-drafting` |
| O nama | `/o-nama` | `/en/about` |
| Besplatna procjena | `/besplatna-procjena` | `/en/free-audit` |
| Kontakt | `/kontakt` | `/en/contact` |

Also at launch: Privatnost, Kolačići, Impresum, Izjava o pristupačnosti and a localised 404. Later: AI asistenti (`/usluge/ai-asistenti`), Radovi, Blog. After launch slugs never change without a 301.

## Rules that matter

- **Drafting is not projektiranje.** Never call Codraft's drafting projektiranje or any related term, in any inflected form; that work is regulated in Croatia. The banned list and regex are in `docs/compliance.md`; `npm run check:guardrails` runs it over `src/`.
- **No invented proof:** no made-up clients, testimonials, logos or metrics (ADR 0004).

## Git

- `main` is Matej's working branch: small changes go straight to `main`, bigger features on a `feat/<name>` branch merged into `main` with a PR.
- `dev` belongs to a colleague. Don't commit or push to it.
- Conventional Commits in English. Run `npm run verify` before pushing.

## Stack and commands

Astro 7 with static output and React 19 islands; only `/api/*` runs on the `@astrojs/node` server (ADR 0008). TypeScript pinned to 6.0.x. Node 24 LTS (at least 24.16, `.nvmrc`) and npm. Hosting: an OVHcloud VPS with Caddy (ADR 0009).

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:4321 (CSP off in dev). |
| `npm run build` | Static pages in `dist/client`, the Node server in `dist/server/entry.mjs`. |
| `npm run preview` | Runs the built Node server. |
| `npm run verify` | What CI runs, in order: lint, format check, typecheck (`astro check`), unit tests, build, copy guardrails. |
| `npm run test:e2e` | Playwright on the built server at 375, 768 and 1440 px. Build first and stop the dev server (Playwright reuses port 4321). Once: `npx playwright install chromium`. |
| `npm run format` | Prettier on everything except `docs/`, `Assets/` and the root Markdown files. |

- One unit test: `npm run test -- src/features/i18n/urls.test.ts` or `npm run test -- -t "pathFor"`.
- One E2E test at one width: `npm run test:e2e -- -g "English 404" --project=mobile-375`.

## Architecture

- **One route map drives every URL.** `src/features/i18n/route-map.ts` holds each page's `{ hr, en }` slug; `urls.ts` builds paths (no trailing slash), absolute URLs and hreflang (`x-default` is English). Never hard-code a URL, and never build a canonical from `Astro.url` (the directory build format keeps a trailing slash there).
- **One catch-all route renders every page.** `src/pages/[...slug].astro` generates a route-map page in both languages once it has a view in `src/views/`; the view registry is in its `getStaticPaths`. The 404 pages and `/api/*` are static routes and take precedence.
- **UI strings** live in `src/locales/{hr,en}.json`, read with `t(locale, key)`. Both files must have the same keys (a type check plus a unit test).
- **CSP.** Astro adds a hash-based CSP `<meta>` to every built page: no inline `style` attributes, nothing from another origin. It's off in `astro dev`, so test CSP-sensitive changes on the build; the E2E tests fail on any console error, CSP violations included.
- **Layers, enforced by ESLint:** client code (`.tsx`, client scripts in `.astro`) never imports `**/server/**`; `src/components/ui/` never imports features, views, layouts or pages; `src/components/site/` never imports views, layouts or pages. `src/config/` is the bottom layer.
- **Styles:** tokens are CSS custom properties in `src/styles/`, inside cascade layers so component styles win. Design-system components in `src/components/ui/`; header, footer and language switcher in `src/components/site/`; views render their zones inside `SiteLayout`.
- **Motion:** GSAP (ScrollTrigger, SplitText) and Lenis, set up once in `src/lib/scroll.ts`; components import from it in their own `<script>` (`docs/motion.md`). React islands only for stateful UI.
- **Astro renders a component's `<script>` in place**, not hoisted: keep scripts out of components that render inside links or SVG.
- **Type-aware lint covers `.ts` and `.tsx` only.** `.astro` files are type-checked by `astro check`. A `.ts` file can't see the types of an imported `.astro` file, so keep `.astro` imports inside `.astro` files.
- **`scripts/check-js-budget.mjs`** imports the route map through Node's type stripping, so `route-map.ts`, `urls.ts` and `site.ts` use erasable syntax only and import each other with `.ts` extensions. The budget check is out of `verify` and CI until the optimisation phase (ADR 0035); run it on demand with `npm run check:budget`.
- **Environment variables** are declared in the `env.schema` of `astro.config.ts` and documented in `.env.example`.
- **Claude Code hooks** (`.claude/settings.json`): edits to `.env*` other than `.env.example` are blocked; after every Write or Edit, Prettier and ESLint run on the file.
- **Known limitation:** the Node server answers unknown `/en/*` paths with the Croatian 404. In production Caddy maps them to `en/404`.
