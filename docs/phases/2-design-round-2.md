# Phase 2, round 2: brief for the hybrid prototypes

> **Status (2026-10-19): the hybrid prototypes D and E are built and checked, and wait for the client's choice.** This brief was written at the end of the session that built round 1, because that session's context was full.
> - The client answered the eight questions on 2026-10-19: see [The client's answers](#the-clients-answers-2026-10-19). No answer changes an accepted ADR.
> - The two hybrids follow the [plan as agreed](#round-2-as-agreed); [The hybrids as built](#the-hybrids-as-built-2026-10-19) describes them, with screenshots and checks.
>
> Nothing here is decided unless it is marked as decided.

## Where things stand

- **Round 1** built three directions as live prototypes: A "Nacrt", B "Noćni nacrt" and C "Studio" (`/lab/a`, `/lab/b`, `/lab/c`). [2-design-directions.md](2-design-directions.md) describes them, with screenshots.
- **The client reviewed them on 2026-10-19** and takes none as is. [Client review, round 1](2-design-directions.md#client-review-round-1-2026-10-19) records the feedback, sorted and verbatim.
- **What the client wants now:**
  - hybrid options that mix elements of the three, to choose a direction from
  - more motion, in a professional tone
- **Still decided and valid:**
  - [ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md): the logo entrance on the home hero only, no C2PA in web copies, review on localhost
  - the brand rules in [brand.md](../brand.md): blue for graphics only, AA contrast, navy primary buttons
  - the motion principles in [motion.md](../motion.md)
  - the JavaScript budget and the CSP ([ADR 0008](../decisions/0008-stack-astro-with-react-islands.md))

## The feedback as keep and change

**Keep**
- **From A:**
  - the page as a drawing sheet: precision, and a straight link to drafting
  - the CAD section with the drawing on graph paper ("milimetarski papir"), which the client prefers to B's and C's
- **From B:**
  - navy, for a premium feel
  - a solid hero
- **From C:**
  - a large, emphasised headline (as an idea)
  - team photos (as an idea)
  - a "Što radimo" that is more visible than A's

**Change**
- **"Što radimo":**
  - A's is too small and not emphasised enough.
  - B's is unbalanced: stage 01 Planiranje has one paragraph, while stages 02 and 03 have three or four services each.
  - C's is the closest, but not finished.
- **Hero:**
  - B's feels like something is missing.
  - The large wordmark in front of B's hero isn't liked.
  - C's headline is too big and out of balance, and the wordmark "signature" just above the CTA buttons isn't liked.
- **Page length:** A feels short.
- **Team photos:** the client is unsure whether they belong on the home page, since About exists.

**New**
- Animated transitions between sections, in a professional tone.
- The logo animates.
- The CAD drawing draws itself in steps when the visitor scrolls to its section.

## Constraints that shape round 2

- **Motion principles** ([motion.md](../motion.md)):
  - One moving thing per viewport.
  - Never take over the scroll: no scroll-jacking, and no pinned or scroll-scrubbed sequences.
  - One-shot reveals use IntersectionObserver. CSS scroll-driven animations are progressive enhancement only.
  - The H1 is visible at first paint.
  - Animate `transform` and `opacity`; use `clip-path` only for line reveals.
  - Reduced motion shows the final states.
  - **"Generic fade-up on every block" is ruled out.** Section transitions must use the drafting vocabulary instead: lines that draw, dimensions, layers, grips.
- **The CAD drawing in steps already fits a motion.md idea.** The "Layers" action reveals once, in order: grid → outlines → hatches → dimensions → title block. For the home page's drawing, centre lines and labels would slot in, and the sequence would play once when the section enters the view; with reduced motion the drawing appears complete. [src/lab/components/PartDrawing.astro](../../src/lab/components/PartDrawing.astro) already draws each part with its own class (`pd-body`/`pd-outline`, `pd-center`, `pd-section`, `pd-ext`/`pd-dim`, `pd-text`), so the parts can be grouped and revealed in that order.
- **The logo.** ADR 0014 approves one entrance, on the home hero, ending on the exact mark; every other placement stays static. Animating the logo anywhere else needs a new ADR: the header, on scroll, or as a loop.
- **The team photos.** [ADR 0007](../decisions/0007-launch-scope-and-constraints.md) decided a team strip on Home and the full team on About, and the Home outline in [information-architecture.md](../information-architecture.md) has it as section 7. Moving the photos to About only would need a new ADR that supersedes that part of ADR 0007. The photos themselves arrive in phase 3; the lab uses honest placeholders.
- **Copy.** The H1 is still a prototype draft for gap G1 ([content.md](../content.md), "Prototype copy"). New lab copy goes into `content.md` first. The free audit's scope (G4) and the team (G3, G15) are client gaps, so the prototypes show their structure, not invented content (ADR 0004).
- **Technical constraints:**
  - no inline `style` attributes (the CSP blocks them)
  - at most 15 KB of gzip JavaScript on content pages
  - at most two font families per direction
  - AA contrast for every text pair

## Questions for the client (discuss first)

1. **Base.** Is A's drawing sheet the base of the hybrid? Which parts of B and C join it? For example, where does B's navy go:
   - the hero
   - a band such as the CAD section
   - the header
   - the footer
2. **Hero.** What is missing in B's hero? What should carry the hero instead of a large wordmark? For example:
   - the headline with a drafting composition
   - a CAD drawing
   - the mark smaller, inside a drawing
   Where should the logo entrance play? If it moves to the header logo on the home page, that needs a new ADR.
3. **Headline.** Emphasised as in C, but how much smaller? The headline copy stays a draft until phase 3.
4. **"Što radimo".** Which treatment to develop: C's chapters with large titles, cards, or something else? How to balance stage 01? For example, the free audit's three steps (form → time slot → confirmation, already in the plan) could fill it.
5. **Team photos.** A team strip on Home (as ADR 0007 decided), or photos only on About?
6. **Page length.** Should round 2 show the full Home outline from information-architecture.md? That adds the free audit teaser with its three steps, "Kako radimo", the team strip and a closing CTA. A longer page also gives the section transitions something to connect.
7. **Motion.** Which signature moments, and how many? For example:
   - the logo entrance
   - the CAD drawing in steps
   - section transitions as drawing lines or dimensions
   - the three audit steps joined by a line that grows between grips (already in motion.md)
8. **How many hybrids.** One refined hybrid, or two to compare?

## The client's answers (2026-10-19)

Discussed in Croatian at the start of the round 2 session. Claude read the feedback back as keep, change and new (as above) and recommended an answer to each question. The client took every recommendation, except for "Što radimo", where they asked to see both treatments.

| # | Question | Answer | What follows |
|---|---|---|---|
| 8 | How many hybrids | **Two, to compare.** | Hybrids D and E share the copy and the motion system. They differ in where navy goes, in "Što radimo" and in the hero ground. |
| 1 | Base and navy | **A's drawing sheet is the base of both. Navy goes in both places, one per hybrid.** | D: a navy hero (the first screen); the rest of the sheet is paper, and navy returns once in the closing call to action. E: a paper hero and a navy band for the free audit and its three steps. |
| 2 | Hero | **The headline and a drawing with the mark.** | The headline on the left, a drawing on a grid on the right (a blueprint on navy in D, graph paper in E). The mark is mid-size inside the drawing and plays its entrance there. The entrance stays in the home hero, so [ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md) stands. |
| 3 | Headline | **Large, in 3–4 lines.** | Up to about 72 px on desktop and about 40 px on phones. A heavier Archivo weight (about 680) with tighter leading, over about 7 of the 12 columns, so it stays in balance with the drawing. |
| 4 | "Što radimo" | **Both treatments, to compare.** The client's words: "Želim obje opcije za usporedbu". | D: chapters on the sheet's grid. Each stage is a row with its number in a grid bubble and a large title, and a process line joins 01 → 02 → 03. E: three balanced columns. In both, stage 01 lists two items taken from its own text (the free audit; a fixed scope, timeline and price), so the stages hold 2, 4 and 3 items. |
| 5 | Team photos | **A team strip on Home.** | [ADR 0007](../decisions/0007-launch-scope-and-constraints.md) stands. The strip shows honest placeholders until the photos arrive in phase 3. |
| 6 | Page length | **The full Home outline.** | Hero, "Što radimo", the free audit with its three steps, CAD drafting, "Kako radimo", the team strip, the closing call to action and the title block. The AI assistant teaser joins in phase 4, when the demo exists. New lines are derived from the existing copy only (content.md, "Prototype copy"). |
| 7 | Motion | **All four.** | 1. The logo entrance in the hero. 2. The CAD drawing in layers. 3. Section transitions. 4. Lines through the steps. Each plays once, in its own section. |

**No new ADR.** The logo entrance stays in the home hero (ADR 0014), and the team strip stays on Home (ADR 0007). The chosen direction gets its ADR after the client picks between D and E.

## Round 2 as agreed

Both hybrids are built on A's sheet, with Archivo as the only family.

| | D „Model i list“ | E „Nacrt s pojasom“ |
|---|---|---|
| Idea | Navy is the model space where the drawing happens, and paper is the sheet where it is read. | The whole page is a paper sheet, with one navy band where the visitor acts. |
| Header and hero | Navy, with a blueprint grid in the drawing | Paper, with graph paper in the drawing |
| "Što radimo" | Chapters, with a process line through 01 → 02 → 03 | Three columns, with one line through the three bubbles |
| Free audit | On paper | The navy band |
| Closing call to action | Navy | Paper |
| Shared | The CAD drawing in layers, "Kako radimo", the team strip, the title block, and the section transitions | Same |

**Motion, in drafting terms** ([motion.md](../motion.md)):
- **Logo entrance.** The line draws, then the grip snaps in. It plays once, on load, in the hero drawing (ADR 0014).
- **Section transition.** When a zone's top edge comes into view, a blue drafting line draws across the sheet, its grip snaps in at the frame, and the selection releases: the line and the grip fade, leaving the plain zone rule. The zone letter in the margin snaps in with it. The boundary is always there; only the selection moves.
- **CAD drawing in layers.** When most of the drawing is in view, it builds in order: outlines → centre lines → section → dimensions → labels → title block. Each layer is revealed like a pen stroke, with `clip-path`. A layer list beside the drawing switches on in step, and "Iscrtaj ponovno" replays it.
- **Lines through the steps.** In D, the process line draws down through each stage as it arrives. In E, one line draws through the three bubbles. In the free audit, the line grows from grip to grip (form → time slot → confirmation).
- **Page change.** A 200 ms crossfade between the two hybrids, using cross-document view transitions where the browser supports them.
- **Rules.** Text is never hidden, and nothing is pinned or scrubbed. Elements already on screen at load stay complete. Without JavaScript, or with reduced motion, everything is complete at once.

## The hybrids as built (2026-10-19)

**How to review**
1. Run `npm run dev` and open http://localhost:4321/lab/d and http://localhost:4321/lab/e. The lab bar switches between them and round 1.
2. Things to try:
   - Scroll slowly from the top: each zone rule is selected as it arrives, the process line draws through "Što radimo", the audit's line grows from grip to grip, and the CAD drawing builds layer by layer.
   - Press "Iscrtaj ponovno" under the drawing to watch it again.
   - Reload to replay the logo entrance in the hero.
   - Press Tab: every link and button shows the outline and its grips.
   - Narrow the window and open "Izbornik".
   - Turn on "reduce motion" in the operating system: everything appears complete at once.

**What both share** (`src/lab/hybrid/`)
- A's sheet: the frame, zone numbers along the top, zone letters A–H in the margin, and the title block as the footer.
- Archivo as the only family (71 KB). Headings use the semi-condensed width. The H1 is weight 680 and reaches about 70 px at 1440 px, in 3 lines; on phones it is 40 px.
- The full Home outline in eight zones:
  - A hero
  - B "Što radimo"
  - C free audit
  - D CAD drafting
  - E "Kako radimo"
  - F team
  - G closing call to action
  - H title block
- The hero drawing: the mark sits mid-size on a grid and plays the entrance. On narrow screens the drawing becomes a low strip, so the mark never grows into B's large wordmark.
- The CAD drawing: A's part on graph paper, plus a title block that says "Ilustracija". A layer list (Konture, Osi, Presjek, Kote, Oznake, Zaglavlje) switches on in step with the drawing.
- 0.9 KB of gzip JavaScript per page, against a budget of 15 KB: the menu, the draws, the replay button and the end-of-page fallback. Round 1 loaded 0.7 KB, and all lab pages share the same script.

**D „Model i list“**
- **Navy as the model space at both ends.** The header and hero are navy, with the mark on a blueprint grid; the sheet in between is paper; the closing call to action is navy again.
- **"Što radimo" as chapters.** Each stage is a row: a grid bubble on a blue process line, a large title (up to 36 px) and its tagline. The services sit beside it in two columns. Each chapter draws its stretch of the line as it arrives.
- **Free audit on paper.** The text sits on the left; the three steps run on the right, as grips joined by a line.

Screenshots: [1440](screenshots/phase-2/round-2/d-model-i-list-1440.png) · [768](screenshots/phase-2/round-2/d-model-i-list-768.png) · [375](screenshots/phase-2/round-2/d-model-i-list-375.png) · full page [1440](screenshots/phase-2/round-2/d-model-i-list-1440-full.jpg) · [768](screenshots/phase-2/round-2/d-model-i-list-768-full.jpg) · [375](screenshots/phase-2/round-2/d-model-i-list-375-full.jpg) · ["Što radimo"](screenshots/phase-2/round-2/d-model-i-list-1440-services.png) · [menu at 375](screenshots/phase-2/round-2/d-model-i-list-375-menu.png) · [keyboard focus](screenshots/phase-2/round-2/d-model-i-list-focus-item.png)

**E „Nacrt s pojasom“**
- **The whole page is a paper sheet.** The hero holds the mark on graph paper.
- **"Što radimo" in three columns.** One blue line runs through the three bubbles and ends in a grip, like the line in the wordmark; the columns draw their stretches in turn.
  - Stage 01 holds its two items and the "Rezervirajte besplatnu analizu" button in a panel: the place to start.
  - A first version stretched the panel to the height of the tallest column and left a hollow middle, so the panel now wraps its content.
- **The free audit is the one navy band,** with its three steps on navy.

Screenshots: [1440](screenshots/phase-2/round-2/e-nacrt-s-pojasom-1440.png) · [768](screenshots/phase-2/round-2/e-nacrt-s-pojasom-768.png) · [375](screenshots/phase-2/round-2/e-nacrt-s-pojasom-375.png) · full page [1440](screenshots/phase-2/round-2/e-nacrt-s-pojasom-1440-full.jpg) · [768](screenshots/phase-2/round-2/e-nacrt-s-pojasom-768-full.jpg) · [375](screenshots/phase-2/round-2/e-nacrt-s-pojasom-375-full.jpg) · ["Što radimo"](screenshots/phase-2/round-2/e-nacrt-s-pojasom-1440-services.png) · [the navy audit band](screenshots/phase-2/round-2/e-nacrt-s-pojasom-1440-audit.png)

**The CAD drawing in steps** (1440 px): [outlines](screenshots/phase-2/round-2/cad-layers-1.png) → [centre lines and the section](screenshots/phase-2/round-2/cad-layers-2.png) → [dimensions](screenshots/phase-2/round-2/cad-layers-3.png) → [labels and title block, complete](screenshots/phase-2/round-2/cad-layers-4.png)

**Motion as built** (springs and durations from `styles/lab-base.css`)

| Moment | Trigger | Sequence |
|---|---|---|
| Logo entrance | Page load | After 250 ms the line draws (700 ms, pen curve), then the grip snaps in (320 ms, snap spring) |
| Section transition | The zone's top edge reaches 70 % of the viewport height | The blue line draws across the zone (700 ms), its grip snaps in at the frame, and both fade 1 s later (480 ms); the zone letter snaps in with the grip |
| Process line (D) | Each chapter at 70 % | Its stretch draws downward (700 ms) |
| Line through the bubbles (E) | The columns at 70 % | Three stretches in turn (700 ms each), then the end grip snaps in; on phones each column draws on its own |
| Audit steps | The list at 70 % | Grip, line (600 ms), grip, line, grip: 1.8 s in all |
| CAD drawing | Half of the drawing in view | Outlines 0–0.9 s, centre lines from 0.8 s, section from 1.25 s (top down), dimensions from 1.75 s, labels at 2.5 s, title block at 2.7 s: 3.2 s in all |

**Self-review along the way**
- The audit's first step sat 8 px lower than the others, because the steps stretched to equal height. Fixed.
- At 768 px the hero drawing spanned the full width, and the mark grew to 470 px, close to B's large wordmark. Below 64rem the drawing is now a 21:9 strip with the mark at about half its width.
- The title block left an empty cell at 2 and 3 columns, and the grid's navy showed through. Cells now span so that every row is full.
- In the pending state, a section arrow peeked out of its clipped layer. Each wipe now starts at the layer's own edge.
- A part close to the end of a page could never reach its trigger and stayed hidden (the specimen's dimension at 375 px, also in round 1). At the bottom of the page, every part still waiting in view now draws.

**Checks** (2026-10-19)
- **On the lab build, under the CSP,** with `.playwright-mcp/check-lab-r2.mjs` (local, not in git), on every lab page (`/lab`, A–E) at 375, 768 and 1440 px:
  - no axe findings at any level
  - no console errors, CSP violations included
  - no horizontal overflow
  - on D and E, after a slow scroll to the bottom, no part left waiting; the replay runs without errors
  - reduced motion: the complete mark, every layer on, no part waiting, no replay button
  - no JavaScript: the navigation open, every layer on, no replay button
- **Keyboard:** focus shows the outline and the grips, and the menu opens and closes on the navy header.
- **`npm run verify` passes:** lint, format, types, 87 unit tests, the normal build (without the lab), the JavaScript budget and the copy guardrails.
- **`npm run test:e2e` passes,** with the dev server stopped (18 tests).

**Next: the client chooses** D, E, or a mix (for example D's hero with E's columns). Then come an ADR for the direction and steps 3–7 of [2-design.md](2-design.md). D and E stay in the lab as the round 2 record, as A–C do for round 1.

## Initial notes for the hybrid (Claude; to discuss, not decided)

- **Frame from A:** the sheet, the zones, the title-block footer, technical lettering, and the CAD section on graph paper.
- **Navy from B as one premium element, not the whole page.** Two candidates:
  - a navy hero sheet with the headline and a drawing
  - a navy band for one section, such as the audit steps or the closing CTA
- **"Što radimo" from C's idea, on A's grid:** larger service titles, and three stages of equal visual weight. One option: stage 01 shows the audit's three steps as a small flow joined by a drafting line.
- **Motion:**
  - the CAD drawing reveals layer by layer, once
  - each zone rule draws across the sheet when its section arrives
  - dimensions draw next to real numbers only
  - one moving thing per viewport
  - all CSS, plus the existing small observer script

## Plan for the round 2 session

1. ✓ Read this brief and [2-design-directions.md](2-design-directions.md). Ask the client the questions above, in Croatian, and record the answers here.
2. ✓ Build the hybrid prototype or prototypes as new lab pages, such as `/lab/d`.
   - Keep A–C as the round 1 record.
   - Reuse the lab parts: `Wordmark`, `Grips`, `PartDrawing`, `PhotoSlot`, `Specimen`, `scripts/lab.ts` and `styles/lab-base.css`.
   - New pages are added to `LAB_PAGES` in `astro.config.ts` and to `src/lab/directions.ts`.
3. ✓ Build the motion: the CAD drawing's layer sequence, the section transitions, the logo entrance, and reduced motion for all of them.
4. ✓ Check it:
   - on the lab build: console, axe, overflow, reduced motion, focus
   - `npm run verify`, and `npm run test:e2e` with the dev server stopped
5. ✓ Take screenshots at 375, 768 and 1440 px into `.playwright-mcp/` and copy the ones for the report to `docs/phases/screenshots/phase-2/round-2/`.
6. ✓ Commit with messages from files, push, and present to the client in Croatian.
7. After the client picks: an ADR for the direction, then steps 3–7 of [2-design.md](2-design.md).

## Working notes from round 1

- **View:** `npm run dev`, then http://localhost:4321/lab.
- **Check under the CSP:**
  1. Run `npm run build:lab`.
  2. Start the server with `HOST=127.0.0.1 PORT=4322 node ./dist/server/entry.mjs`, so it doesn't clash with the dev server.
  3. Afterwards, `npm run build` restores the normal build.
- **Accessibility check.** Round 1 used a throwaway script with `@axe-core/playwright`, `.playwright-mcp/axe-lab.mjs`; it is local and not in git. It ran axe on every lab page at 375, 768 and 1440 px, measured horizontal overflow, and read the wordmark's computed styles under `reducedMotion: "reduce"`.
- **Pitfalls** ([research/2026-10-19-design-lab.md](../research/2026-10-19-design-lab.md)):
  - Playwright reuses whatever listens on port 4321.
  - Start the dev server with `exec node ./node_modules/astro/bin/astro.mjs dev` so it can be stopped cleanly.
  - Size the wordmark with `--wordmark-width`.
  - Vitest needs every injected lab page file to exist.
- **Fonts in the lab:** Archivo, Schibsted Grotesk, Literata and Hanken Grotesk in `src/lab/fonts/`. Sizes, coverage and licences are in the research note. A hybrid keeps at most two families.

## Working notes from round 2

- **Checks:** `.playwright-mcp/check-lab-r2.mjs` (local, not in git) runs on the lab build on port 4322. It covers axe, console errors, overflow, a slow scroll that must leave no part waiting, the replay, reduced motion and no JavaScript, on every lab page at three widths.
- **Playwright MCP and an old browser.** "Browser is already in use for …mcp-chrome-…" means that a Chrome started by an earlier session's MCP server still holds the profile. Reconnecting with `/mcp` doesn't help. With the client's OK, close that Chrome (its parent is the old `playwright-mcp` Node process); the MCP then opens its own.
- **Screenshots of motion.** The MCP's headed Chrome draws no frames while it is in the background, so a screenshot can catch an animation at its first frame. Call `finish()` on `document.getAnimations()` before a final-state screenshot. To catch a frame mid-sequence, `pause()` the animations and set their `currentTime`.
- **The pieces:**
  - `src/lab/hybrid/`: the shared sections, `hybrid.css` and `CadDrawing.astro`
  - `src/lab/directions/d/` and `e/`: the two page compositions
  - `src/lab/scripts/lab.ts`: the draw triggers (`data-draw`, `"late"`, `"half"`), the replay (`data-draw-replay`) and the end-of-page fallback
