# Phase 2, round 2: brief for the hybrid prototypes

> **Status (2026-10-19): the questions are answered; the hybrid prototypes D and E are being built.** This brief was written at the end of the session that built round 1, because that session's context was full.
> - The client answered the eight questions on 2026-10-19: see [The client's answers](#the-clients-answers-2026-10-19). No answer changes an accepted ADR.
> - The two hybrids follow the [plan as agreed](#round-2-as-agreed).
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

## Plan for the next session

1. Read this brief and [2-design-directions.md](2-design-directions.md). Ask the client the questions above, in Croatian, and record the answers here.
2. Build the hybrid prototype or prototypes as new lab pages, such as `/lab/d`.
   - Keep A–C as the round 1 record.
   - Reuse the lab parts: `Wordmark`, `Grips`, `PartDrawing`, `PhotoSlot`, `Specimen`, `scripts/lab.ts` and `styles/lab-base.css`.
   - New pages are added to `LAB_PAGES` in `astro.config.ts` and to `src/lab/directions.ts`.
3. Build the motion: the CAD drawing's layer sequence, the section transitions, the logo entrance, and reduced motion for all of them.
4. Check it:
   - on the lab build: console, axe, overflow, reduced motion, focus
   - `npm run verify`, and `npm run test:e2e` with the dev server stopped
5. Take screenshots at 375, 768 and 1440 px into `.playwright-mcp/` and copy the ones for the report to `docs/phases/screenshots/phase-2/round-2/`.
6. Commit with messages from files, push, and present to the client in Croatian.
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
