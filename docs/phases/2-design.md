# Phase 2: Design (Dizajn)

- **Status:** Done, with the review refinements (2026-10-19 to 21), at the phase gate. PR #2 is the phase report, with a „Review refinements“ section. Five sessions, batches 1–39 (refinements 1–132), the design critique and its re-check, the Figma sync and the final checks; [2-design-review.md](2-design-review.md) has every refinement. Waiting for the client's „idemo dalje“.
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
  - **The client's first reaction:** "Dobro sviđa mi se". The client asked what phase 3 holds (summarised in Croatian), then asked for a handover: "imam par dorada koje bih htio rješiti prije finalne faze 3". [2-design-review.md](2-design-review.md) is the brief for the refinements session. `PROGRESS.md` and PR #2 point to it, and the client has a prompt for the new session.
  - **The dev server** was restarted on port 4321 so the client could open `/lab/style`. The next session checks the port before E2E.
- **2026-10-19, first review refinements session** ([2-design-review.md](2-design-review.md) has every refinement, verbatim and sorted):
  - **Skills loaded:** `frontend-design:frontend-design`, `frontend-a11y`, `motion-foundations`. Figma skills weren't loaded: the library isn't synced yet.
  - **The client's batches** (refinements 1–20, each recorded before the change):
    1. "mali" out of the studio's description; the free-audit button once per page, where the audit is explained, with no button in the header and "Pošaljite upit" in the closing call to action ([ADR 0017](../decisions/0017-one-audit-call-to-action-per-page.md)); the paper hero confirmed.
    2. The H1 in two lines, as A showed it on a wide screen; no "žargon" in the Croatian copy (a new hero lead, `services.intro`, "Jasno objašnjeno"); „Tehničko crtanje“ instead of „CAD crtanje“, for architecture and construction only, slug `/tehnicko-crtanje` ([ADR 0018](../decisions/0018-drafting-for-architecture-and-construction.md)).
    3. "Što radimo": larger, darker service lines and three layouts to compare; the process line drawn as one stroke (`data-draw-wait` in draw.ts).
    4. The client chose option 3 „Središnja os“, with one short line per service; offered custom icons (specification in brand.md).
    5. A floor plan drawn as a timelapse instead of the machined plate; the prompt for the icons; the English aligned at the end. The H1 across the sheet was tried for laptops.
    6. The hero back as before; no room names on the plan; 3D models in the drafting offer ([ADR 0019](../decisions/0019-drafting-adds-3d-models.md)); three layouts for "Tehničko crtanje".
    7. The hero already matched the client's screenshot; option C for drafting is likely; handover.
  - **Built:** `/lab/pocetna` (Home in the chosen direction on the production components, where the refinements are shown), `/lab/sto-radimo` and `/lab/crtanje` (the comparisons), and the parts in `src/lab/home/`.
  - **Self-review along the way:**
    - A script between two zones hid the rule above the next zone, so the scripts moved inside the zones.
    - The process line first took 0.7 s on a desktop, too fast to follow; it was slowed to about 1.3–1.7 s.
    - With one line per service, the stages of the central axis sat too far apart, so they moved closer.
  - **Lesson:** batch 5 changed the hero's composition when the client had asked only for line breaks, and the client rejected it ("Počeo si raditi gluposti"). From now on a change goes only as far as the request; anything more is shown as options first.
  - **Checks after each batch:** lint, `astro check`, 138 unit tests, format and the copy guardrails passed; on the dev server, no console errors and no horizontal overflow at 375, 768 and 1440 px on every new lab page; CI green on every push. The checks on the lab build, E2E, the Figma sync and PR #2 wait for the end of the review.
  - **Handover** at the client's request; the open items were in the brief's first handover (git `64854d2`).
- **2026-10-19 to 20, second review refinements session** ([2-design-review.md](2-design-review.md), refinements 21–45, verbatim and sorted):
  - **Skills loaded:** `frontend-design:frontend-design`, `motion-foundations`, `frontend-a11y`. Figma skills weren't loaded: the library is synced at the end of the review.
  - **The client's batches** (each recorded before the change):
    8. Option C „Legenda“ for "Tehničko crtanje", with the client's layout and text.
    9. The drafting zone at the full width of the sheet, its heading back, the services as rows like "Kako radimo", "Pošaljite skicu".
    10. "Kako radimo" with the client's three commitments, and a darker paper grey (`#4A5362`, 7.11:1). Files come by email ([ADR 0020](../decisions/0020-drawings-arrive-by-email.md)); the customer owns the work ([ADR 0021](../decisions/0021-the-customer-owns-the-work.md)); the client proofreads every text before launch.
    11. The closing call to action with the client's question and lead, at a zone heading's size. The client's nine icons arrived, cleared for use and free of metadata, and are committed as sources.
    12. The closing call to action centred.
    13. Two placements of the icons on `/lab/ikone`, drawn by the process line.
    14. Option B on Home ([ADR 0022](../decisions/0022-service-icons-on-home.md)); the line and the icons follow the scroll row by row, from the client's specification.
    15. The line follows the screen continuously instead of jumping from row to row ([ADR 0023](../decisions/0023-process-line-follows-the-screen.md)).
  - **Built:** the refinements on `/lab/pocetna`; the icons in code (`src/lab/home/icons/`); `axis-line.ts` for the line and the icons; the comparison page `/lab/ikone`; the motion token `--motion-follow`; the style page follows the closing call to action and the tokens.
  - **Found and left for the client:** at a 1920 px viewport the sheet loses its side margins, so its frame touches the screen and the zone rules' grips overflow by 4 px (#23). The fix would move the hero in by 24 px at that width, so it waits for the client, who will look at it later.
  - **Self-review along the way:**
    - The services in option B stretched with a taller neighbour, so their line sat apart from the title; `align-content: start` fixed it.
    - The first scroll animation moved the line only when a row started, so it looked jerky to the client (batch 15). The line now eases towards the screen every frame: at most 11 px per frame in a wheel-scroll test, never backwards.
  - **Checks after each batch:**
    - lint, `astro check`, the unit tests (139, with the motion token sync), format and the copy guardrails passed
    - on the dev server: no console errors, the layouts measured at 375–1920 px, the motion with reduced motion, without JavaScript, on a reload mid-page and on a jump past the section
    - CI was green on every push
  - **Handover** at the client's request ("Za sad je super … u drugoj sesiji nastavljamo rad"); the open items are in [2-design-review.md](2-design-review.md#handover-2026-10-21).
- **2026-10-20, the design critic** ([ADR 0024](../decisions/0024-independent-design-critique.md)):
  - **The client's question:** are there skills or agents that critique design? The answer was that none of the installed agents judges visual design, and that `/check` skips CSS and copy.
  - **Two outside skills evaluated** at the client's request: Microsoft's `frontend-design-review` and Anthropic's `frontend-design` ([research/2026-10-20-design-critique-skills.md](../research/2026-10-20-design-critique-skills.md)). Neither is an independent critic.
  - **The client asked for our own:** "Napravi ga prvo detaljno i kvalitetno", and to hear how it works before it runs.
  - **Built:**
    - the project agent `.claude/agents/design-critic.md`: eleven criteria, five lenses, six phases from a blind first look, three severities, and client decisions as questions
    - the capture `scripts/design-capture/` (`npm run design:capture`): screenshots at six widths, states, motion frames and measurements, with unit tests for its findings
    - the guide [design-critique.md](../design-critique.md), the permission for the capture, and the workflow's phase 2 list
  - **Self-review along the way:**
    - Astro's dev toolbar showed in the screenshots; the capture now removes it the moment it appears.
    - The hidden skip link was being measured; text and controls off the page are left out.
    - The script was split into three modules (capture, measurement, findings).
  - **Checks:**
    - a capture of `/lab/pocetna` at six widths with motion: 150 screenshots in 48 s; no axe findings, no console errors and no overflow at any width (reduced motion)
    - the motion frames hold the logo's entrance mid-draw
    - lint, format and the 7 new unit tests pass
  - **Not run yet:** the critique itself waits for the client's word.
- **2026-10-20, the Impeccable skill** ([ADR 0025](../decisions/0025-browser-details-and-critique-re-check.md)):
  - **The client's question:** a detailed, critical evaluation of the outside skill `pbakaus/impeccable` before adding it, then whether it is useful in general.
  - **Read:**
    - in full: the skill's text (`SKILL.md`, 44 references, four agents, the launchers)
    - in part: its Rust engine, for network calls, telemetry and the detector rules that touch this design
    
    The findings are in [research/2026-10-20-impeccable-skill.md](../research/2026-10-20-impeccable-skill.md).
  - **Not installed.** Four of its ideas were adopted on the client's word ("implementiraj točke 1-4"), as review batch 16 ([2-design-review.md](2-design-review.md#refinements)):
    - selected text and the text cursor in brand colours
    - three more critic checks: what the browser draws, the space around headings, reduced motion that keeps meaning
    - a re-check of findings after approved changes
  - **Checks:**
    - the selection colours read per surface in Chromium 156: `#C4D3F5` with navy text on paper, `#1D3F8C` with off-white text on navy
    - a capture at 375 and 1440 px wrote the new selection states and the blocks' heights
    - `npm run verify` passed
  - **Kept outside the repository:** the client's general notes on the skill, for later projects.
- **2026-10-20, Taste Skill** ([ADR 0027](../decisions/0027-taste-skill-ideas-in-the-setup.md)):
  - **The client's question:** a critical evaluation of the outside skill `Leonxlnx/taste-skill`, under the client's five standing rules (don't touch the site; check the overlap; only what is useful here; merge partial overlaps; general ideas to the notes).
  - **Read:** in full, the skill's text and every script; the JSON library in part, through a script of our own. The findings are in [research/2026-10-20-taste-skill.md](../research/2026-10-20-taste-skill.md).
  - **Measured:** its `lint.mjs` over `src/`, read-only: 40 FAILs, 35 of them in the lab, the rest the graph paper and a false positive in the title block. Its browser inspector was not run: the permission system blocked outside code launching a browser, and the client asked what it does before deciding.
  - **Not installed.** On the client's word („Odobravam“), review batch 18 ([2-design-review.md](2-design-review.md#refinements)):
    - five checks in `design-critic`
    - scroll-driven motion, page transitions and measured values in the global `animate` skill
    - the page's argument as the first step of every page in phase 3
    - an argument for the paper `theme-color`, recorded only
  - **Checked:** the `overflow: hidden` trap against MDN; browser support for scroll-driven animations and cross-document view transitions (Firefox lacked both in stable); the `animate` skill's front matter still loads after the edit.
  - **Kept outside the repository:** the client's general notes on the skill, for later projects.
- **2026-10-20, third review refinements session** ([2-design-review.md](2-design-review.md), batch 19, refinements 57–60):
  - **Start:** the documentation read and the open items put to the client in Croatian. The client answered them in order, and set the order of the rest of the review: the fixes first, then the critic on the client's word, the Kowalski proposals and `theme-color` later, the client's own refinements at the end.
  - **Skills loaded:** `animate` for the 3D view.
  - **The sheet at 1920 px** (#57, approved): `Sheet.astro` keeps its margin at every width, so at 1920 px the frame no longer touches the screen and the page no longer scrolls 4 px sideways; the hero's H1 stays in two lines (71.9 px).
  - **The floor plan's 3D view** (#58, approved): after the timelapse the plan switches off its axes and dimensions, turns and tilts into an axonometric view, and its walls rise into a 3D model with sills, glass, lintels and door leaves; "3D model stana" in the title block. The model is built at build time from the plan's own data (`plan-model.ts`, `plan-projection.ts`, with 8 unit tests). Three views were compared first; the one from the south-west with full-height walls was kept.
  - **The inspector's options** (#59): all as they are; the two local type sizes go to phase 3 ([3-pages.md](3-pages.md#content-specifics)).
  - **Self-review along the way:**
    - The shade of the sides facing along x lost to the base face rule on specificity; the selector was raised.
    - The model sat right of centre; it was moved so it sits centred above the title block, and a unit test keeps it inside the sheet and above the title block.
    - The lab check now covers the review's pages. On `/lab/crtanje` axe found the services of options A and B as `h4` right under the zone's `h2` (heading-order, moderate), from batch 6; they are `h3` now, as in option C, with no change in look.
  - **Batch 20** (refinements 61–63): no "Pošaljite skicu" on Home (#61, as ADR 0020 allowed); the critic stays later (#62); the 3D view in three options on a new comparison page, `/lab/tlocrt-3d` (#63): 1 stays in 3D (Home), 2 goes back to the plan, 3 sets a 35° pitched roof on the model, which makes the drawing a house. The roof is built at build time from its faces' normals; 4 more unit tests. Checked on the lab build under the CSP: no console errors, the final states with reduced motion, every option's sequence.
- **2026-10-21, the same session, batch 21** (refinements 64–65): the client chose the roof (option 3 of #63), now on Home; the house in three palettes from the brand's colours on a new comparison page, `/lab/kuca-boje`: a paper facade under a navy roof, a navy facade under a pale roof, and blue tones. The colours are variables mixed from the drawing's roles, and the model marks the walls' outer sides for the facade. The first blue roof was too bright and was toned down.
- **2026-10-21, batch 22** (refinement 66): the client chose palette 1, a paper facade under a navy roof; it is the drafting zone's default, so Home shows it.
- **2026-10-21, batch 23 and handover** (refinements 67–74): the client has no further refinements. The rest of phase 2, in the client's order: the critic's first run in a fresh session (the client's word for it), then the Figma sync, then the final checks and the report. Moved to phase 3: the English copy, the Kowalski proposals, the browser bar's colour, the hero's line count on laptops and the client's proofreading at the end of phase 3 ([3-pages.md](3-pages.md#carried-over-from-phase-2)). The brief's [Handover](2-design-review.md#handover-2026-10-21) is rewritten for the next session.
- **2026-10-21, fourth review refinements session** (batches 24–30, refinements 75–104; [2-design-review.md](2-design-review.md#refinements)):
  - **The independent critique** of Home ([ADR 0024](../decisions/0024-independent-design-critique.md)): four `design-critic` agents on one capture, all "Ready after fixes"; 22 verified findings and questions in [research/2026-10-21-design-critique-home.md](../research/2026-10-21-design-critique-home.md), put to the client as options. The client approved them group by group: 1, 2, 4 and 7 (batch 24), then 8–11 and 15 (batch 25), all done. The rest (A 16–18, B, C, the re-check) moves to the next session (#92).
  - **"Što radimo"** (critique 7): the client compared fourteen layouts on `/lab/sto-radimo-2`. The axis variations came first (#79, #90), then trees after the client's sketch with three technical crowns (#94–99). Last came three new kinds of layout (#101): a building schedule, a circle and tabs, made with `frontend-design` and critiqued by four `design-critic` agents ([research/2026-10-21-design-critique-sto-radimo-options.md](../research/2026-10-21-design-critique-sto-radimo-options.md)). The client kept the central axis, with the services' type a step larger (#102). The other layouts were deleted with the client's OK, and the tabs went to `src/lab/archive/` (#104).
  - **Checks after each batch:** axe and overflow at 375–1920 px, console errors, motion frames with motion on, `npm run verify`; CI green on every push.
  - **Handover** at the client's request; the next session starts at the brief's [Handover](2-design-review.md#handover-2026-10-21).
- **2026-10-21, fifth review refinements session** (batches 31–39, refinements 105–132; [2-design-review.md](2-design-review.md#refinements)):
  - **The older comparison** `/lab/sto-radimo` (batch 3's options) deleted on the client's „da“ (#108).
  - **The rest of the critique:** group A 16–18 (a readable title block under narrow drawings, the menu's fade, grips on the header's links; #109–114); group B 3, 5, 12, 13 as recommended (the layer list as line samples, the icon beside the title on phones with [ADR 0028](../decisions/0028-service-icons-on-phones-beside-the-title.md), a plan/3D switch with reduced motion, the drafting zone on the 12-column grid; #115–122); group C to phase 3 (#123).
  - **The critic's re-check** (ADR 0025): all four lenses "Ready"; four regressions verified and fixed on the client's word (the footer's edge, the queue's reading order, the steady plan, a one-letter line end to the proofreading; #125–131). The footer fix wrapped placeholder values on wide screens, which the session's own check found; on the client's answer the cells keep 24 px only below 64rem (#131).
  - **The Figma sync** (#132): variables, text styles, the header, the title block, Stavka, the nine icons, Usluga, Oznaka faze, the example page rebuilt as in the code with the house as vectors.
  - **Final checks:** the lab build under the CSP on every lab page at 375, 768 and 1440 px (axe, console, overflow, drawing after a slow scroll, keyboard, reduced motion, no JavaScript); `npm run verify` (161 unit tests, 1.7 KB of JavaScript per page); `npm run test:e2e` (51); CI green. Report screenshots: `screenshots/phase-2/review/final-pocetna-{375,768,1440,1920}.png`. PR #2's description has the „Review refinements“ section.
