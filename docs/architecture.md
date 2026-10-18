# Architecture

> **Status (2026-10-18):** the repository foundation is in place (phase 0). The stack and hosting are chosen in [phase 1](phases/1-architecture.md); this file is completed then, with the real folder structure and links to the stack ADRs (0007 and later). The principles below apply whatever stack is chosen.

## Repository layout (now)

```
codraft-website/
├── .claude/rules/          How Claude works on this project (phases, gates, authority)
├── .github/                PR template, issue forms, CODEOWNERS; CI and Dependabot from phase 1
├── Assets/codraft-brand/   Brand masters: final, read-only (the site uses optimised copies)
├── docs/                   All project documentation; the plan by phase (see docs/README.md)
├── .editorconfig           UTF-8, LF, 2 spaces, final newline
├── .gitattributes          LF everywhere; binaries marked; Assets/** stored byte for byte
├── .gitignore
├── CLAUDE.md               Entry point for Claude: short, pointers only
├── CONTRIBUTING.md         Phases, branches, commits, PRs, definition of done
├── PROGRESS.md             Live status, in Croatian
└── README.md               Project overview and documentation index
```

## Principles for the application code (from phase 1)

### Structure

- **Organise by feature, not by file type.** For example, the audit form keeps its component, schema, server handler and tests together.
- **Clear layers:** routes/pages → page sections and features → UI components → `lib` (pure helpers) → config and tokens. Dependencies point downwards only. UI components never import from features or routes.
- **Small, focused files:** 200–400 lines is typical, 800 is a soft ceiling. Use early returns, avoid nesting deeper than four levels, and give meaningful numbers named constants.

### Content, i18n and design tokens

- **Content and translations live outside components.**
  - Copy flows from [content.md](content.md) into locale files, one key per content block ID.
  - UI strings go in JSON locale files; long copy goes in per-locale content files.
- **One route map** (page id → `{ hr, en }` slug) drives the navigation, the language switcher, hreflang, `sitemap.xml` and canonicals ([ADR 0002](decisions/0002-croatian-default-english-secondary.md)).
- **Design tokens in one place.** Colour, type scale, spacing, radius and motion are CSS custom properties. No raw palette values in components.

### TypeScript

- strict mode
- no `any` (use `unknown` and narrow it)
- explicit types on exported functions
- `interface` for object shapes, string-literal unions instead of `enum`
- no `React.FC`
- no `console.log` in production code

### Validation and security

- **Validate at the boundaries with Zod:** form input, API input, env vars and external responses. Infer the types from the schemas.
- **Validate env vars at startup.**
- **Secrets:** never put a secret in a client-exposed variable (`NEXT_PUBLIC_*`, `VITE_*`, `PUBLIC_*`), and never commit a `.env` file. `.env.example` documents every variable.
- **HTML:** no `innerHTML` or `dangerouslySetInnerHTML` without a sanitiser.
- **Links:** validate URL schemes before rendering a user-provided `href` or `src`, and add `rel="noopener noreferrer"` to `target="_blank"` links.
- **Headers:** CSP, HSTS, nosniff, Referrer-Policy and frame protection, set in the hosting config (phase 7).

### Styling and motion

- Animate only `transform` and `opacity` (`clip-path` sparingly). Never animate layout properties. Respect `prefers-reduced-motion` ([motion.md](motion.md)).

### Performance

- **Targets:** LCP < 2.5 s, INP < 200 ms, CLS < 0.1. The JavaScript budget is set in phase 1.
- **Images:**
  - explicit `width` and `height`
  - AVIF or WebP
  - `loading="lazy"` below the fold
  - `fetchpriority="high"` only on the hero image
- **Fonts:** at most two families, self-hosted, `font-display: swap`, subset with latin-ext, preload only the critical weight.
- **Third-party scripts:** load async or deferred, and only after consent where required. Dynamically import heavy libraries.

### Accessibility and quality gates

- **Accessibility:** target WCAG 2.2 AA. Use semantic HTML first, keyboard support, visible focus (grips plus an outline) and labelled forms.
- **Quality gates, locally (scripts and hooks) and in CI on every PR:**
  - format (Prettier)
  - lint (ESLint)
  - typecheck
  - unit and component tests (Vitest/Testing Library or the stack's equivalent)
  - E2E tests (Playwright)
  - build

## Integrations (planned; decided in phases 1 and 4)

| Integration | Shape |
|---|---|
| Free audit | 2-step flow. A validated form stores the lead durably, then sends a team notification and a localised confirmation. A booking embed loads on click, prefilled. |
| Contact | The same pipeline, with a topic field and extra CAD fields |
| Email | A transactional email API (EU), with SPF, DKIM and DMARC on the domain |
| Consent | A first-party consent manager. Analytics and booking load only after consent or a click. |
| Analytics | A privacy-friendly option chosen in phase 1, loaded only after consent |
| AI assistant | A server endpoint with streaming and a server-side key, rate-limited, answering from approved content only; AI disclosure (phase 4) |

**Out of scope at launch:**
- a CMS
- authentication
- a newsletter
- file uploads
- a database, unless lead storage needs one (decided in phase 1)

## Target structure (finalised in phase 1)

The exact tree depends on the framework. This sketch only shows the intended separation:

```
src/
├── routes or app/   Pages and layouts per locale (framework convention)
├── features/        audit-form/, contact-form/, consent/, chatbot/, language-switcher/
├── components/ui/   Design-system components (button, card, section, grip focus, dimension)
├── content/         Locale files generated from docs/content.md block IDs
├── lib/             Route map, i18n helpers, validation schemas, utilities
├── styles/          Tokens (CSS custom properties) and global styles
└── config/          Site config, env validation
public/              Favicons (from Assets/codraft-brand/web), optimised brand copies, fonts
tests/ · e2e/        Unit/component tests (or colocated) · Playwright journeys
```
