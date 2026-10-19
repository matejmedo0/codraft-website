# Phase 2: Design (Dizajn)

- **Status:** Done, waiting for the client's review at the phase gate (2026-10-19). PR #2 is the phase report.
  - **Round 1 (steps 1–2) is done** and was reviewed by the client on 2026-10-19: three prototypes, described in [2-design-directions.md](2-design-directions.md). None is taken as is.
  - **Round 2 is done:** two hybrids with more motion, D „Model i list“ and E „Nacrt s pojasom“, described in [2-design-round-2.md](2-design-round-2.md).
  - **The client chose** D with a paper header and hero ([ADR 0015](../decisions/0015-design-direction-model-i-list.md)) and Figma for quick iterations ([ADR 0016](../decisions/0016-figma-for-design-iterations.md)); the answers are in [2-design-system.md](2-design-system.md).
  - **Steps 3–8 are done:** tokens, fonts, motion, brand assets in code, base components, the style page (`/lab/style`) and the Figma library.
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

- [x] A style page exists with the tokens and base components; screenshots at 375, 768 and 1440 px (`/lab/style`; [screenshots/phase-2/system/](screenshots/phase-2/system/)).
- [x] The client approves a direction (recorded as an ADR): [ADR 0015](../decisions/0015-design-direction-model-i-list.md).
- [x] Contrast meets AA for all text pairs. Blue is never used for body text, and there is no white text on brand blue (`src/styles/tokens.test.ts`; the style page's table).
- [x] Reduced motion is respected; keyboard focus shows the grips plus a visible outline (the lab check script and the E2E tests).

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
- **2026-10-19, round 2 session:**
  - **Skills loaded:** `frontend-design:frontend-design`, `motion-foundations`, `motion-patterns`, `frontend-a11y`, `vite-patterns`, `react-patterns`. `motion-advanced` wasn't needed: the drawing in steps is CSS.
  - **The eight questions, discussed in Croatian.** The client took every recommendation and asked to see both "Što radimo" treatments. The answers are recorded in [2-design-round-2.md](2-design-round-2.md#the-clients-answers-2026-10-19):
    - two hybrids
    - navy in the hero (D) and as a band (E)
    - the headline with a drawing that holds the mark
    - a large headline in 3–4 lines
    - chapters (D) and columns (E)
    - the team strip on Home
    - the full Home outline
    - all four kinds of motion
  - **No new ADR.** The logo entrance stays in the home hero (ADR 0014), and the team strip stays on Home (ADR 0007).
  - **Copy first.** The new lines went into [content.md](../content.md) ("Prototype copy", round 2) before the code. All are derived from existing blocks or are lab placeholders.
  - **Built:** the hybrids D „Model i list“ and E „Nacrt s pojasom“ (`/lab/d`, `/lab/e`), from shared parts in `src/lab/hybrid/`. They include the CAD drawing that builds layer by layer, the section transitions, the process lines and the audit steps.
    - The lab script gained the draw triggers, the replay button and an end-of-page fallback.
    - The fallback also fixes a round 1 trap: a part close to the end of a page stayed hidden.
  - **Self-review:**
    - E's stage 01 panel no longer stretches into a hollow card.
    - The hero mark stays mid-size on narrow screens.
    - The title block has no empty cells.
    - The audit steps are aligned.
    - The CAD wipes start at each layer's edge.
  - **Playwright MCP** couldn't open its browser: a Chrome from an earlier session held the profile. With the client's OK, that Chrome was closed, and the MCP worked again.
  - **Checks:**
    - On the lab build under the CSP, at 375, 768 and 1440 px, on every lab page:
      - no axe findings
      - no console errors
      - no overflow
      - every part draws
      - reduced motion and no JavaScript show the final states
    - `npm run verify` passes (87 unit tests), and `npm run test:e2e` passes (18 tests).
    - The lab pages load 0.9 KB of gzip JavaScript.
  - **Screenshots** for the report are in [screenshots/phase-2/round-2/](screenshots/phase-2/round-2/).
  - **Presented** to the client in Croatian. The choice between D and E (or a mix) is the client's.
  - **Handover.** The client asked for documentation only, because the session's context was full: "Dobro pripremi dokumentaciju zbog punog konteksta u ovoj sesiji, nastavljamo u novom chatu s finalnim odlukama. I daj mi prompt za novi session".
    - [2-design-system.md](2-design-system.md) is the brief for the next session. It covers:
      - where things stand
      - the decisions for the client, with Claude's recommendations
      - the plan for steps 3–7 and the phase gate
      - the constraints and the working notes
    - `PROGRESS.md` and the PR #2 description are updated.
    - The Playwright MCP browser is closed, so the next session can open its own.
    - The client has a prompt for the new session.
- **2026-10-19, design system session:**
  - **Skills loaded:** `frontend-design:frontend-design`, `motion-foundations`, `frontend-a11y`, `vite-patterns`, `react-patterns`; for Figma, `figma:figma-create-new-file`, `figma:figma-use` and `figma:figma-generate-library`.
  - **The client's final decisions,** asked in Croatian because the opening message left them as a template. Recorded in [2-design-system.md](2-design-system.md#the-clients-answers-2026-10-19):
    - **Direction:** D „Model i list“ with a paper header and hero. A follow-up question settled which navy turns to paper: the header and hero do, the closing call to action stays navy. Recorded as [ADR 0015](../decisions/0015-design-direction-model-i-list.md).
    - **Motion:** all four moments, as built. The client sees none of them: Windows "Animation effects" is off on their machine (checked with `SystemParametersInfo`), so Chrome reports reduced motion. The client was told how to switch it on or emulate it, and deferred the review ("kasnije razrješimo").
    - **Team strip:** two people.
    - **Font:** Archivo only.
    - **Corners:** 2 px.
    - **Lab:** keep A–E.
    - **Figma:** yes, for quick and cheap prototypes and refinements: [ADR 0016](../decisions/0016-figma-for-design-iterations.md).
  - **Step 5, brand assets in code** (no new dependency). `scripts/brand-web-copies.mjs` writes the web copies from the masters: the favicon set to `public/`, the marks to `src/assets/brand/`. SVGs lose the `<metadata>` block; PNGs lose their `caBX` chunk byte for byte. A unit test checks every copy against its master. BaseLayout carries the package's head snippet.
  - **Step 3, tokens and fonts** (`src/styles/`, in cascade layers):
    - colour roles for paper and `.surface-navy`
    - the fluid type scale, weights and widths
    - space, the sheet, and the 2 px radius
    - grips and focus
    - Archivo split by `unicode-range` from the lab subset with fonttools outside the repository: the preloaded core file is 36.5 KB, against the lab's 71 KB. Size-adjusted Arial and Arial Narrow Bold fallbacks keep the swap still.
    - The disabled button moved to the sunk paper, because its old grey ground measured 4.26:1.
  - **Step 4, motion:** `motion.css` (tokens, springs as `linear()`, keyframes) and `motion.ts` for islands. `motion.test.ts` keeps them in step and checks the springs against their equation.
  - **Step 6, base components:**
    - `src/components/ui/`: Sheet, Zone, ZoneMark, Button, Grips, Item, Steps, Dimension, SkipLink, Wordmark, and `draw.ts`
    - `src/components/site/`: Header with a disclosure menu, Footer as the title block, LanguageSwitcher
    - `SiteLayout`
    - The UI strings went into `content.md` first, then into both locales.
    - Home and the 404 pages now sit on the sheet, so 33 new E2E tests cover the components under the CSP at three widths.
  - **Step 7, the style page** `/lab/style`: the hero composition, colours with contrast read from the tokens, type, space and shape, motion with a replay, components, and the navy surface.
  - **Step 8, Figma:** the library "Codraft sustav dizajna" in the client's account (https://www.figma.com/design/pWypJUUuwNZv9iTSDVFBV0):
    - 58 variables (palette, roles with the modes Papir and Tamnoplava, layout with three widths, shape), each with its CSS name and a scope
    - 24 text styles in Archivo at the site's exact widths
    - components: Znak, Grip, Gumb (16 variants), Stavka, Korak, Kota, Milimetarski papir, Zaglavlje, Zaglavlje nacrta
    - pages: a cover with instructions, the foundations, and the home page composed from instances
  - **Self-review along the way:**
    - The wordmark's script rendered inside the header link, because Astro renders component scripts in place, so the wordmark has no script now.
    - Zone letters became a CSS counter, so no props are needed.
    - Two spaces collapsed by Astro's whitespace handling were restored.
    - The title block's cells now wrap and fill every row, so no cell is ever empty.
    - In Figma, the dimension's arrowheads were redrawn as vectors, and the process line through the chapters was made continuous.
  - **Checks:**
    - On the lab build under the CSP, at 375, 768 and 1440 px, on every lab page:
      - no axe findings
      - no console errors
      - no overflow
      - every part draws after a slow scroll
      - the replay works
      - keyboard: the skip link comes first, the menu opens, Escape closes it and returns focus, and focus shows the outline and the grips
      - reduced motion and no JavaScript show the final states
    - The prototypes A–E look as in their round screenshots.
    - `npm run verify` passes (138 unit tests, 1.0 KB of JavaScript per page), and `npm run test:e2e` passes (51 tests).
    - The first CI run failed in lint: the `?raw` import had no type before `astro sync`. `src/env.d.ts` fixed it.
  - **Screenshots** for the report are in [screenshots/phase-2/system/](screenshots/phase-2/system/), with frames of motion in progress for the client, who can't see it on their machine.
