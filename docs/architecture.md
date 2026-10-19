# Architecture

> **Status (2026-10-19):** the phase 1 scaffold is in place. The stack and services are decided in ADR 0008–0013, and this file describes the real structure. Update it whenever the structure changes.

## Stack

| Part | Choice | Record |
|---|---|---|
| Framework | Astro 7 (7.4.0) with static output; React 19 only in islands; `@astrojs/node` in standalone mode runs only the `/api/*` routes | [ADR 0008](decisions/0008-stack-astro-with-react-islands.md) |
| Language and runtime | TypeScript 6.0.x (pinned below 6.1), Node 24 LTS (at least 24.16, `.nvmrc`), npm 11 | [ADR 0008](decisions/0008-stack-astro-with-react-islands.md) |
| Tooling | ESLint 10, Prettier 3, Vitest 5, Playwright with axe | [ADR 0008](decisions/0008-stack-astro-with-react-islands.md) |
| Hosting | OVHcloud VPS-1 in the EU: Caddy in front, the Node server under systemd, deploys from GitHub Actions | [ADR 0009](decisions/0009-hosting-ovhcloud-vps-eu.md) |
| Transactional email | Scaleway, behind an `EmailSender` interface (phase 4) | [ADR 0010](decisions/0010-transactional-email-scaleway.md) |
| Analytics | Self-hosted GoatCounter, loaded only after consent; Search Console and Bing | [ADR 0011](decisions/0011-analytics-goatcounter-after-consent.md) |
| Booking | Self-hosted Easy!Appointments on a subdomain | [ADR 0012](decisions/0012-booking-easy-appointments.md) |
| Mailboxes | Zoho Mail Lite (phase 7) | [ADR 0013](decisions/0013-mailboxes-zoho-mail-lite.md) |

Verified versions, settings and findings: [research/2026-10-19-scaffold-toolchain.md](research/2026-10-19-scaffold-toolchain.md) and [research/2026-10-19-scaffold-verification.md](research/2026-10-19-scaffold-verification.md).

## Repository layout

```
codraft-website/
├── .claude/
│   ├── hooks/             guard-env.mjs (blocks .env edits), format-lint.mjs (Prettier and ESLint after each edit)
│   ├── rules/             How Claude works on this project: phases, gates, authority
│   └── settings.json      The hooks and the permission allowlist
├── .github/               CI (workflows/ci.yml), Dependabot, PR template, issue forms, CODEOWNERS
├── Assets/codraft-brand/  Brand masters: final, read-only (the site uses optimised copies)
├── docs/                  Project documentation; start at docs/README.md
├── scripts/               check-js-budget.mjs, check-guardrails.mjs, and the guardrail tests
├── src/
│   ├── config/site.ts     Site URL and locales: the bottom layer, also read by astro.config.ts
│   ├── features/i18n/     Route map, URL helpers, UI-string lookup, with their tests
│   ├── layouts/           BaseLayout: <html lang>, head, canonical and hreflang
│   ├── locales/           UI strings: hr.json and en.json
│   ├── pages/             [...slug].astro (every route-map page), 404.astro, en/404.astro, api/health.ts
│   ├── styles/global.css  Global styles; the design tokens arrive in phase 2
│   └── views/             One view per page: HomeView, NotFoundView
├── tests/e2e/             Playwright tests
├── astro.config.ts · tsconfig.json · eslint.config.js · prettier.config.mjs · vitest.config.ts · playwright.config.ts
└── CLAUDE.md · CONTRIBUTING.md · PROGRESS.md · README.md
```

**Planned additions, when a phase needs them:**
- `public/`: favicons, optimised brand copies and self-hosted fonts (phase 2)
- `src/components/ui/`: design-system components: button, card, section, grip focus (phase 2)
- `src/features/<feature>/`: `audit-form/`, `contact-form/`, `consent/`, `chatbot/` (phase 4). Server-only code goes in a `server/` folder inside the feature.
- Long copy per locale, generated from the block IDs in `content.md` (phase 3)

## How a page is built

1. **The route map** (`src/features/i18n/route-map.ts`) lists every launch page with its slug in each language. Slugs stay provisional until the client approves the Croatian terminology.
2. **The catch-all route** (`src/pages/[...slug].astro`) holds the view registry in its `getStaticPaths`. Every page that has a view is generated in both languages: `/`, `/en`, `/usluge`, `/en/services`, … Pages without a view exist only in the route map. Until phase 3 only `home` has a view.
3. **BaseLayout** sets `<html lang>`, the title, the canonical link and the reciprocal hreflang links (`x-default` points to English), all from the route map. The 404 pages have no route-map entry and are marked noindex.
4. **The build** writes static HTML to `dist/client`. Every page carries Astro's hash-based CSP in a `<meta>` tag. The `/api/*` routes (`export const prerender = false`) go into the Node server, `dist/server/entry.mjs`.
5. **In production** (phase 7), Caddy serves `dist/client`, sends the security headers and proxies `/api/*` to the Node server.

## Principles for the application code

### Structure

- **Organise by feature, not by file type.** For example, the audit form keeps its component, schema, server handler and tests together.
- **Clear layers:** pages → layouts and views → features → UI components → config and tokens (with `lib/` for pure helpers when they appear). Dependencies point downwards only. ESLint enforces two boundaries:
  - client code (`.tsx` islands and client scripts in `.astro` files) never imports `**/server/**`
  - `src/components/ui/` never imports features, views, layouts or pages
- **Small, focused files:** 200–400 lines is typical, 800 is a soft ceiling. Use early returns, avoid nesting deeper than four levels, and give meaningful numbers named constants.
- **`.astro` imports stay in `.astro` files.** TypeScript can't see the type of an imported `.astro` component outside Astro's own tools, so a `.ts` module that imports one fails type-aware linting.

### Content, i18n and design tokens

- **Content and translations live outside components.**
  - Copy flows from [content.md](content.md) into locale files, one key per content block ID.
  - UI strings go in `src/locales/{hr,en}.json` and are read with `t(locale, key)`. Both files must have the same keys: a type check catches missing English keys, and a unit test catches extra ones.
  - The phase 1 strings (the 404 title and link) are placeholders; the real copy (gap G27) comes in phase 3.
- **One route map** drives the navigation, the language switcher, hreflang, `sitemap.xml` and canonicals ([ADR 0002](decisions/0002-croatian-default-english-secondary.md)). Never hard-code a URL, and never build a canonical from `Astro.url`, which keeps a trailing slash in directory builds.
- **The route map and URL helpers stay plain TypeScript.** `scripts/check-js-budget.mjs` imports them through Node's type stripping, so they use erasable syntax only and import each other with `.ts` extensions.
- **Design tokens in one place.** Colour, type scale, spacing, radius and motion are CSS custom properties. No raw palette values in components.

### TypeScript

- strict mode (`astro/tsconfigs/strictest`)
- no `any` (use `unknown` and narrow it)
- explicit types on exported functions (enforced by ESLint in `src/`)
- `interface` for object shapes, string-literal unions instead of `enum`
- no `React.FC`
- no `console` in production code (ESLint; allowed in `scripts/`)

### Validation and security

- **Validate at the boundaries with Zod** (`astro/zod`): form input, API input, env vars and external responses. Infer the types from the schemas.
- **Environment variables** are declared in the `env.schema` of `astro.config.ts` (`astro:env`), which validates them when the dev server or the build starts, and are documented in `.env.example`. Phase 1 has none.
- **Secrets:** never put a secret in a client-exposed variable, and never commit a `.env` file. A Claude Code hook blocks edits to `.env` files.
- **HTML:** no `innerHTML` or `dangerouslySetInnerHTML` without a sanitiser.
- **Links:** validate URL schemes before rendering a user-provided `href` or `src`, and add `rel="noopener noreferrer"` to `target="_blank"` links.
- **CSP:** Astro's hash-based CSP, with `default-src 'self'`, `img-src 'self' data:`, `font-src 'self'` and `connect-src 'self'`. It blocks inline `style` attributes, so check any library that renders them (React islands, `motion/react`) in phase 2. It is not active in `astro dev`; test on the build.
- **Headers:** CSP header-only directives, HSTS, nosniff, Referrer-Policy and frame protection are set in the Caddy config (phase 7).

### Styling and motion

- Animate only `transform` and `opacity` (`clip-path` sparingly). Never animate layout properties. Respect `prefers-reduced-motion` ([motion.md](motion.md)).

### Performance

- **Targets:** LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- **JavaScript budget** (gzip, all JS a page loads, [ADR 0008](decisions/0008-stack-astro-with-react-islands.md)): 15 KB for content pages, 100 KB for pages with a form or the layer viewer, 120 KB for the AI assistants page. `npm run check:budget` enforces it on every build in CI. For scale: one minimal React island costs about 70 KB.
- **Images:**
  - explicit `width` and `height`
  - AVIF or WebP
  - `loading="lazy"` below the fold
  - `fetchpriority="high"` only on the hero image
- **Fonts:** at most two families, self-hosted, `font-display: swap`, subset with latin-ext, preload only the critical weight.
- **Third-party scripts:** load async or deferred, and only after consent where required. Dynamically import heavy libraries.

### Accessibility

- Target WCAG 2.2 AA. Use semantic HTML first, keyboard support, visible focus (grips plus an outline) and labelled forms.
- ESLint runs the jsx-a11y rules on `.astro` and `.tsx`; the E2E tests fail on serious or critical axe findings.

## Quality gates

| Gate | Tool | Where it runs |
|---|---|---|
| Format | Prettier 3 with `prettier-plugin-astro`; `docs/`, `Assets/` and the root Markdown files are never reformatted | Hook after each edit, `npm run format:check`, CI |
| Lint | ESLint 10: typescript-eslint strict and stylistic with type information for `.ts`/`.tsx` (`.astro` without it), Astro and a11y rules, React hooks, layer boundaries | Hook, `npm run lint`, CI |
| Types | `astro check` (the build doesn't type-check) | `npm run typecheck`, CI |
| Unit tests | Vitest 5 on Astro's Vite config; tests sit next to the code as `*.test.ts` | `npm run test`, CI |
| E2E | Playwright on the production build at 375, 768 and 1440 px: status, `lang`, H1, canonical, hreflang, CSP, console errors, axe | `npm run test:e2e`, CI (Node 24) |
| JavaScript budget | `scripts/check-js-budget.mjs` over `dist/client` | `npm run check:budget`, CI |
| Copy guardrails | `scripts/check-guardrails.mjs`: the [compliance.md](compliance.md#copy-guardrails) regex over `src/`, Unicode-aware | `npm run check:guardrails`, CI |

`npm run verify` runs every gate except E2E, in the CI order. CI runs it on Node 24 and Node 26, and E2E on Node 24. Dependabot proposes npm and Actions updates every Monday.

## Integrations

| Integration | Shape | Phase |
|---|---|---|
| Free audit | 2-step flow. A validated form stores the lead in SQLite (`node:sqlite`) with an outbox, then sends a team notification and a localised confirmation. The booking view loads on click, prefilled. | 4 |
| Contact | The same pipeline, with a topic field and extra CAD fields | 4 |
| Email | Scaleway over HTTPS, behind an `EmailSender` interface; SPF and DKIM on the domain, DMARC in phase 7 ([ADR 0010](decisions/0010-transactional-email-scaleway.md)) | 4, 7 |
| Consent | A first-party consent manager without React. Analytics and booking load only after consent or a click. | 4 |
| Analytics | Self-hosted GoatCounter after consent ([ADR 0011](decisions/0011-analytics-goatcounter-after-consent.md)) | 4 |
| Booking | Self-hosted Easy!Appointments on a subdomain; `frame-src` allows only that subdomain ([ADR 0012](decisions/0012-booking-easy-appointments.md)) | 4 |
| AI assistant | A server endpoint with streaming and a server-side key, rate-limited, answering from approved content only; AI disclosure | 4 |

**Out of scope at launch:**
- a CMS
- authentication
- a newsletter
- file uploads

## Known limitations

- **The Croatian 404 on unknown `/en/*` paths.** `@astrojs/node` 11.1.8 always serves the root `404.html`, so `/en/x` returns status 404 with the Croatian page; `/en/404` itself is English. In production, Caddy maps `/en/*` errors to `en/404/index.html` (phase 7).
- **The favicon** is an empty placeholder (`data:,`) until the favicon set from the brand package arrives in phase 2.
