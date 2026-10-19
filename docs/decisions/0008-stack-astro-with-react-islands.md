# 0008. Stack: Astro with React islands, static-first

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The site has about 11 mostly static pages in Croatian and English with localised slugs ([ADR 0002](0002-croatian-default-english-secondary.md), [ADR 0003](0003-launch-sitemap.md)). The interactive parts are:
- the mobile menu, language switcher and consent banner
- the audit and contact forms
- the CAD layer viewer
- the chatbot (phase 4)

The requirements that decide the stack:
- a strict Content-Security-Policy
- Core Web Vitals targets and a small JavaScript budget
- no third-party request before consent
- custom forms with a small server API
- React-compatible tooling, because the team's skills are React-based

Three options were compared in [phases/1-architecture-options.md](../phases/1-architecture-options.md), using the facts in [research/2026-10-19-hosting.md](../research/2026-10-19-hosting.md):
- **Next.js** works against the requirements:
  - A strict CSP needs nonces, which makes every page render dynamically.
  - It ships about 174 KB gzip of framework JS even on a page without client components (measured).
  - Localised pathnames in next-intl need the runtime proxy.
  - Two critical RCEs were fixed on 2026-10-14.
- **Astro** fits them:
  - Its stable, hash-based CSP keeps pages static.
  - Pages without islands ship 0 KB of JS.
  - React runs only in islands.
  - Its adapters for Node and Cloudflare keep the build portable.

## Decision

The client chose Option 1 on 2026-10-19.

**Framework and rendering**
- Astro 7 (7.4.0 at the time) with static output. Only the API routes (`/api/*`) render on demand, through `@astrojs/node` in standalone mode.
- React 19 islands (`@astrojs/react`) only for the forms, the layer viewer and the chatbot.
- The always-present UI is built without React: the header, mobile menu, language switcher and consent banner.
- `motion/react` only inside islands; CSS for simpler motion.

**i18n**
- Astro's i18n routing with `hr` as the unprefixed default locale and `en` under `/en`.
- A hand-written route map (page id → `{ hr, en }`) drives the navigation, the language switcher, hreflang, `sitemap.xml` and canonicals.

**Security, forms and data**
- **CSP:** Astro's `security.csp` (hashes). The host sends the header-only directives.
- **Forms:** plain API endpoints with Zod validation and framework-neutral handlers.
- **Leads:** stored in SQLite (Node's built-in `node:sqlite`, with `better-sqlite3` as the fallback), with an outbox so that no email is sent before the lead is saved.

**Tooling**
- TypeScript 6.0.x, pinned, because Astro's tooling and typescript-eslint need a version below 6.1.
- ESLint 10, Prettier 3, Vitest 5 with Testing Library, Playwright with axe.
- npm 11.
- Node 24 LTS, moving to Node 26 LTS once Astro supports it.

**CSS**
- Plain CSS with design tokens as custom properties. Tailwind only if the team asks for it in phase 2.

**JavaScript budget (gzip, all JS a page loads)**

| Pages | Budget |
|---|---|
| Content pages | ≤ 15 KB |
| Pages with a form or the layer viewer | ≤ 100 KB |
| The AI assistants page | ≤ 120 KB |

A build-time check in CI enforces it from phase 1; Lighthouse CI is added in phase 6.

## Consequences

- **Pages stay static and cacheable under a strict CSP,** and most pages load almost no JavaScript.
- **Localised slugs need our own code:** the route map and a custom sitemap.
- **No `<ClientRouter />`.** It is incompatible with the hash CSP, so page transitions use CSS cross-document view transitions.
- **CSP is not active in `astro dev`,** so CSP and E2E tests run against the production build.
- **The non-React UI parts** are tested with `@testing-library/dom` and Playwright rather than React Testing Library.
- **Vendor risk:** Cloudflare has owned Astro since 2026-01-16. Astro stays MIT-licensed and platform-neutral, as promised. Host-specific code stays at the edges, so the Node and Cloudflare adapters remain interchangeable.
- **To verify during the scaffold:**
  - how stable `node:sqlite` is on Node 24 and 26
  - whether motion/react renders inline `style` attributes that the CSP must allow
  - how to name the phase 2 design-lab routes, because Astro ignores `_`-prefixed route files
