# Phase 2: Design (Dizajn)

- **Status:** In progress (started 2026-10-19).
  - **Round 1 (steps 1–2) is done** and was reviewed by the client on 2026-10-19: three prototypes, described in [2-design-directions.md](2-design-directions.md). None is taken as is.
  - **Round 2 is next, in a new session:** hybrid prototypes with more motion, briefed in [2-design-round-2.md](2-design-round-2.md).
- **Branch:** `phase/2-design`

## Goal

Find a distinctive, professional visual direction built from the brand, and turn it into a design system: tokens, motion and base components, all in code. The client chooses the direction.

## Inputs

| Input | Status | Where |
|---|---|---|
| Brand marks, colours, contrast findings | Final / verified | [brand.md](../brand.md) |
| Motion concept | Agreed | [motion.md](../motion.md) |
| Review method | Agreed: coded prototypes | [ADR 0005](../decisions/0005-design-review-with-coded-prototypes.md) |
| Croatian copy for the prototypes | HR draft of the existing copy (approval pending) | [content.md](../content.md) |
| **Logo entrance animation** | Decided 2026-10-19: approved, home hero only, once per page load | [ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md) |
| **C2PA metadata in web copies** | Decided 2026-10-19: stripped from every web copy; the masters keep it | Same |
| **Private preview of the prototypes** | Decided 2026-10-19: not needed; review on localhost and screenshots | Same |
| Working stack | Decided and scaffolded: Astro 7 with React islands | [architecture.md](../architecture.md), [ADR 0008](../decisions/0008-stack-astro-with-react-islands.md) |
| Phase 1 findings that shape this phase | The CSP blocks inline `style` attributes; Astro ignores routes that start with `_`; the favicon is a placeholder | [research/2026-10-19-scaffold-verification.md](../research/2026-10-19-scaffold-verification.md) |

## Stack notes from phase 1

- **Skills:** besides the ones in each step, load `vite-patterns` (Astro runs on Vite) and `react-patterns` for islands.
- **No React for the always-present UI** ([ADR 0008](../decisions/0008-stack-astro-with-react-islands.md)). The header, mobile menu and language switcher (and later the consent banner) are Astro components with small scripts. React and `motion/react` appear only inside islands; simpler motion is CSS.
- **No `<ClientRouter />`.** It is incompatible with the hash CSP, so page transitions use CSS cross-document view transitions.
- **The CSP blocks inline `style` attributes.** Check every library that renders them, such as `motion/react`'s initial styles in an island, on a production build: the CSP is off in `astro dev`. Astro can allow style attributes alone (`styleDirective.resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }]`); doing so is a decision that needs an ADR.
- **Tests:** the first React island brings Testing Library and jsdom (approved in the scaffold plan). The non-React UI is tested with `@testing-library/dom` and Playwright (ADR 0008).
- **Budget:** content pages may load at most 15 KB of gzip JavaScript (`npm run check:budget`); one minimal React island alone is about 70 KB.

## Steps

**1. Directions.** Load `frontend-design:frontend-design` and build 2–3 directions from the logo: navy wordmark, blue CAD-handle accent, warm off-white ground. Starting candidates:

| Direction | Character | Risk |
|---|---|---|
| **A "Nacrt"** (drawing sheet) | Off-white paper ground, navy ink, hairline rules, a visible modular grid with margin ticks, monospace dimension labels. The footer is a drawing title block holding the legally required data (Naziv, OIB, MBS, Sjedište, "List 1/1", Zadnja izmjena). Strongest link to both halves of the name. | Can feel cold |
| **B "Noćni nacrt"** (navy-first) | Navy hero and key sections with blue lines; light sections for reading. Premium feel. | Dark-SaaS cliché |
| **C "Studio"** (warm editorial) | Large type and photography; the drafting line appears once per section; the CAD vocabulary lives mostly in interactions. The most human. | Generic minimal agency |

Claude's recommendation is A, borrowing C's photographic warmth. **The client chooses.**

**2. Build each direction as a live prototype** on a local, noindex route. Astro ignores route files that start with `_`, so use a normal folder such as `src/pages/lab/` (`/lab/a`, `/lab/b`, `/lab/c`). Each prototype has:
- real Croatian copy, real fonts, real motion
- the hero
- one services section
- a card with grips
- button states
- one signature motion

Take Playwright screenshots at 375, 768 and 1440 px, and let the client click through on localhost.
- Playwright MCP writes files only inside the project. Save to `.playwright-mcp/` (gitignored), then copy the screenshots for the report to `docs/phases/screenshots/phase-2/`.
- If an MCP call goes quiet, check that its server process is alive, and ask the client to reconnect it with `/mcp`. A Node upgrade stops it.

With the VPS chosen in phase 1 ([ADR 0009](../decisions/0009-hosting-ovhcloud-vps-eu.md)), a private preview for other team members needs the domain and the server. Ordering them and deploying are "ask first" items; without them, the client reviews on localhost and the screenshots.

The `/lab/*` routes and the style page are noindex and stay out of production builds. For example, they are generated only when a build flag is set. Check them on a build with the flag, because the CSP is only active in builds.

**3. Tokens** as CSS custom properties:
- **Colour:** brand plus the accessible text tokens from [brand.md](../brand.md#colour), with blue for graphics only.
- **Type scale:** fluid.
- **Spacing, radius** (0–2 px, echoing the grips) and **motion** (from [motion.md](../motion.md)).
- **Fonts:** two families at most, self-hosted WOFF2 with latin-ext, preload one weight, a size-adjusted fallback.

**4. Motion.** Load `motion-foundations` for the tokens, spring presets, `prefers-reduced-motion` and SSR safety.

**5. Brand assets in code:**
- optimised SVG copies of the marks (masters untouched)
- the wordmark's accent split into three paths (c-arc, line, grip)
- a wordmark component that themes `.cd-ink` and `.cd-accent` with `currentColor`
- the `web/` favicon set copied to the public root, with the head snippet added. It replaces the empty `data:,` icon placeholder in `src/layouts/BaseLayout.astro`.

**6. Base components**, as Astro components (React only where a component needs to be an island):
- header with mobile menu
- footer (title-block style in direction A)
- button, section, card
- grip-focus utility
- dimension annotation
- language switcher (same page, other language)
- skip link

Load `frontend-a11y` for the menu, focus states and skip link.

**7. Style page** showing the tokens and components, with screenshots at three widths.

**8. Figma, only if the client asks:**
- `figma:figma-generate-library` to mirror the chosen system as a Figma library
- always `figma:figma-use` before any `use_figma` call

## Deliverables

- 2–3 prototype routes and screenshots
- ADR for the chosen direction
- Tokens, fonts and motion tokens
- Base components and the style page

## Exit criteria

- [ ] A style page exists with the tokens and base components; screenshots at 375, 768 and 1440 px.
- [ ] The client approves a direction (recorded as an ADR).
- [ ] Contrast meets AA for all text pairs. Blue is never used for body text, and there is no white text on brand blue.
- [ ] Reduced motion is respected; keyboard focus shows the grips plus a visible outline.

## Log

- **2026-10-19:**
  - **Start.** Phase 1 was approved and merged into `main` (PR #1). Work continues on `phase/2-design`, created from `main` after the merge.
  - **Skills loaded:** `frontend-design:frontend-design`, `motion-foundations`, `frontend-a11y`, `vite-patterns`, `react-patterns`.
  - **The client's three answers**, recorded as [ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md):
    - The logo entrance is approved, on the home hero only.
    - C2PA metadata is stripped from every web copy. Inspecting it showed that the manifest is signed by Anthropic and binds to the exact file bytes, so an optimised copy could not keep a valid signature anyway.
    - No private online preview: the client builds the site with one colleague, so review stays on localhost and the screenshots. Nothing is ordered.
  - **Font tooling.** fonttools and brotli run from a throwaway virtual environment outside the repository. They subset the web fonts and check their Croatian coverage; nothing is added to the project's dependencies.
  - **Fonts (step 1).** Nine OFL variable families were inspected and compared in a Croatian specimen. Mona Sans and Hubot Sans were dropped: their Reserved Font Names forbid a subset under the original name. Picked for the prototypes:
    - A: Archivo
    - B: Schibsted Grotesk
    - C: Literata with Hanken Grotesk
    - Details: [research/2026-10-19-design-lab.md](../research/2026-10-19-design-lab.md).
  - **The design lab (step 2).**
    - `src/lab/` holds the prototypes. An integration in `astro.config.ts` injects `/lab`, `/lab/a`, `/lab/b` and `/lab/c` in `astro dev`, and in production builds only with `CODRAFT_LAB=1` (`npm run build:lab`). A normal build has no lab.
    - The lab adds a `js` class before first paint through a head-inline script, which Astro hashes for the CSP.
    - `BaseLayout` gained a `head` slot for font preloads.
  - **Three directions (steps 1–2):** A "Nacrt", B "Noćni nacrt", C "Studio", as described in [2-design-directions.md](2-design-directions.md).
    - The same HR copy in all three; the derived lines are listed in [content.md](../content.md) under "Prototype copy".
    - The wordmark is inlined with its accent split into three paths. The entrance runs in CSS: it needs no JavaScript and plays even if scripts fail. A small script replays it when the mark starts below the fold.
    - The springs from `motion-foundations` run as CSS `linear()` curves.
    - Grips and the focus outline are shared by all three.
    - Each page loads 0.7 KB of JavaScript.
  - **Self-review along the way:**
    - B's hero split the CTAs from the headline, so it became one column.
    - C's headline was set smaller.
    - Scoped wordmark styles beat the sizing classes, so the mark is now sized with `--wordmark-width`.
    - A's drafting grid takes a 16:9 box below 1024 px.
  - **Checks on the lab build:**
    - no console errors or CSP violations at 375, 768 and 1440 px
    - axe: no findings at any level, after two fixes:
      - The visible "EN" is now part of the link's accessible name (WCAG 2.5.3).
      - The skip link comes first on the page.
    - no horizontal overflow
    - reduced motion shows the complete mark
    - menu: Escape closes it and returns focus
  - **Normal build:** `npm run verify` passes (87 unit tests, including 4 new contrast tests). `npm run test:e2e` passes (18). A first E2E run hit the dev server on port 4321 and 9 tests failed for lack of a CSP. The trap is now documented.
  - **Screenshots** of all three at 375, 768 and 1440 px are in [screenshots/phase-2/](screenshots/phase-2/). The client reviews on localhost; no online preview (ADR 0014).
  - **Presented** to the client in Croatian, with the draft PR [#2](https://github.com/matejmedo0/codraft-website/pull/2) open so CI checks every push. CI is green: verify on Node 24 and 26, and E2E.
  - **Client review of round 1.** None of the three is taken as is. Recorded sorted and verbatim in [2-design-directions.md](2-design-directions.md#client-review-round-1-2026-10-19).
    - Liked:
      - A's drawing sheet and its CAD section on graph paper
      - B's navy and its premium feel
      - C's ideas of a large headline and team photos, and its more visible "Što radimo"
    - Not liked:
      - A's small "Što radimo" and short page
      - B's large wordmark in front of the hero, and its unbalanced "Što radimo"
      - C's oversized headline and the wordmark above the CTAs
    - The client is unsure whether team photos belong on Home.
    - Asked for:
      - hybrid options
      - more motion in a professional tone, such as section transitions
      - the logo animating
      - the CAD drawing drawing itself in steps when its section scrolls into view
  - **Handover.** This session's context was full, so the client asked for documentation only. No other work was done.
    - [2-design-round-2.md](2-design-round-2.md) is the brief for the next session. It covers:
      - the feedback as keep and change
      - the constraints, including a new ADR if the logo animates outside the home hero or the team strip leaves Home (ADR 0007)
      - eight questions to discuss with the client first
      - initial notes for the hybrid
      - the plan
    - `PROGRESS.md` is updated, and the client has a prompt for the new session.
