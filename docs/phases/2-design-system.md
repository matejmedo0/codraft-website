# Phase 2, last part: the direction and the design system (brief)

> **Status (2026-10-19): not started; the next session starts here.** Round 2 is done, and the hybrids D and E are built, checked and pushed. This brief was written at the end of the round 2 session, because its context was full. The client brings the final decisions to the next session.
> - **First**, put the decisions below to the client, in Croatian, and record the answers here. If the client already gives them in the opening message, record them and ask only what is missing. The direction becomes ADR 0015.
> - **Then** build steps 3–7 of [2-design.md](2-design.md) from the chosen direction, and close phase 2 at the phase gate.
>
> Nothing here is decided unless it is marked as decided.

## Where things stand

- **Round 1:** three directions, A "Nacrt", B "Noćni nacrt" and C "Studio" (`/lab/a`–`/lab/c`). The client took none as is ([2-design-directions.md](2-design-directions.md), with the client's review verbatim).
- **Round 2:**
  - The client answered the eight questions on 2026-10-19 and took every recommendation. For "Što radimo" they wanted both treatments.
  - Two hybrids were built, D „Model i list“ and E „Nacrt s pojasom“ (`/lab/d`, `/lab/e`).
  - [2-design-round-2.md](2-design-round-2.md) has the answers, the hybrids as built, the motion timings, the checks and the screenshots.
  - No accepted ADR changed:
    - the logo entrance stays in the home hero (ADR 0014)
    - the team strip stays on Home (ADR 0007)
- **The code that carries over** (all in the lab, which never ships):
  - `src/lab/hybrid/hybrid.css`: the tokens and every section's styles, for both surfaces (paper by default, navy inside `.on-navy`)
  - `src/lab/hybrid/*.astro`:
    - the sections
    - `CadDrawing.astro` (the drawing built layer by layer)
    - `ZoneMark.astro` (the section transition)
    - `TitleBlock.astro`
  - `src/lab/styles/lab-base.css`: the motion tokens, the springs as CSS `linear()`, the grips, the focus ring and the buttons
  - `src/lab/scripts/lab.ts`: the menu, the one-shot draws (`data-draw`, `"late"`, `"half"`), the replay and the end-of-page fallback (0.9 KB gzip)
  - `src/lab/components/Wordmark.astro`: the inlined mark, with the accent in three paths and the entrance
- **Checks at the end of round 2:**
  - on the lab build under the CSP, at 375, 768 and 1440 px:
    - no axe findings
    - no console errors
    - no overflow
    - every part draws
    - reduced motion and no JavaScript show the final states
  - `npm run verify` and `npm run test:e2e`
  - CI green on `1fccaad`
- **PR #2** (https://github.com/matejmedo0/codraft-website/pull/2) is still a draft. Its description becomes the phase report.
- **The dev server** may still run from the round 2 session. Stop anything on port 4321 before `npm run test:e2e`.

## Decisions for the client (ask first)

1. **Direction: D, E, or a mix.** For a mix, say which part comes from which:

   | Part | D „Model i list“ | E „Nacrt s pojasom“ |
   |---|---|---|
   | Header and hero | Navy, with the mark on a blueprint grid | Paper, with the mark on graph paper |
   | "Što radimo" | Chapters: rows on a process line 01 → 02 → 03 | Three columns with one line through the bubbles; stage 01 as a panel with the audit button |
   | Free audit | On paper | The navy band |
   | Closing call to action | Navy | Paper |

   **Claude's recommendation: D**, with E's stage 01 panel as an option.
   - D gives the premium navy the client liked in B, on A's sheet.
   - Its chapters carry the 2/4/3 items without uneven columns, and the process line reads clearly as a sequence, also on phones.
   - Navy at both ends frames the sheet. E's band would add a third navy zone close to D's hero.

   The client decides.
2. **Motion.** Keep all four moments as built (logo entrance, CAD drawing in layers, section transitions, lines through the steps)? Is any of them too slow, too fast or too much? The CAD sequence takes 3.2 s; a section transition takes about 2 s, then releases.
3. **Team strip.** How many people? The prototype shows three placeholders. The photos, names and roles arrive in phase 3 (G3).
4. **Fonts.** Keep Archivo as the only family (71 KB in the lab)? Recommendation: yes.
   - The condensed width already gives the labels and the title block their technical voice.
   - A monospace for labels would be a common template look.
5. **Corner radius.** 0 (sharp, as built), or up to 2 px ([motion.md](../motion.md) says 0–2 px, to be confirmed with the direction)? Recommendation: 0, like the drawing sheet.
6. **The lab after the choice.** The default is to keep A–E as the record ([2-design-directions.md](2-design-directions.md), "After the choice"). Removing any of them needs the client's OK.
7. **Figma** (step 8 of [2-design.md](2-design.md)): only if the client asks. The default is no.

## Plan for the next session

1. Put the decisions to the client and record the answers above.
   - Write ADR 0015 for the direction and a line under "Odluke" in `PROGRESS.md`.
   - Add the row in [decisions/README.md](../decisions/README.md); the next number is then 0016.
2. **Tokens** (step 3), as CSS custom properties in `src/styles/`, imported by `global.css`:
   - colour, with the surface tokens for paper and navy
   - the fluid type scale
   - spacing
   - radius
   - motion

   Take the values from `src/lab/hybrid/hybrid.css` and `src/lab/styles/lab-base.css`. The contrast of every text pair stays covered by unit tests ([src/lab/contrast.test.ts](../../src/lab/contrast.test.ts) shows the pattern).
3. **Fonts** (step 3):
   - the production Archivo WOFF2, subset to Croatian and English as in [research/2026-10-19-design-lab.md](../research/2026-10-19-design-lab.md) §1, with the axes narrowed to what the direction uses
   - one preload in `BaseLayout`
   - a size-adjusted fallback (`size-adjust`, `ascent-override`, `descent-override`) so the swap causes no layout shift
4. **Motion** (step 4, `motion-foundations`):
   - the motion tokens and springs in CSS
   - a TypeScript copy for future islands
   - reduced motion handled in both
5. **Brand assets in code** (step 5, ADR 0014):
   - the production `Wordmark` component, with the accent split into three paths and `currentColor`
   - optimised SVG copies of the marks, without C2PA
   - the `web/` favicon set in `public/`, with its PNGs re-encoded without metadata chunks
   - the head snippet in `BaseLayout`, replacing the `data:,` icon placeholder

   The masters in `Assets/codraft-brand/` stay untouched. A new tool, such as an SVG optimiser, is a dependency outside the approved architecture: ask first, or use a throwaway script outside the project, as with the fonts in round 1.
6. **Base components** (step 6), as Astro components (`frontend-a11y`):
   - header with mobile menu
   - footer as the title block
   - button
   - section (a zone with its transition)
   - card or item with grips
   - grip-focus utility
   - dimension annotation
   - language switcher (same page, other language, from the route map)
   - skip link

   Placement follows [architecture.md](../architecture.md): `src/components/ui/` never imports features, views, layouts or pages. UI strings go into `src/locales/{hr,en}.json` through [content.md](../content.md) first.
7. **The style page** (step 7): tokens and components on a noindex lab route, such as `/lab/style`, with screenshots at 375, 768 and 1440 px.
8. **Exit checks** ([2-design.md](2-design.md), exit criteria):
   - the style page and its screenshots
   - the direction ADR
   - AA contrast for every text pair
   - reduced motion
   - focus with the grips and an outline
   - on the lab build: console, axe and overflow
   - `npm run verify`, and `npm run test:e2e` with port 4321 free
9. **The phase gate:**
   1. Update the phase log, `PROGRESS.md` and the status in [2-design.md](2-design.md).
   2. Make PR #2's description the phase report, and mark the PR ready for review.
   3. Wait for green CI.
   4. Report to the client in Croatian, and stop. Merge and phase 3 happen only on the client's word.

## Constraints that still apply

- **CSP:** no inline `style` attributes; the CSP is active only in builds.
- **JavaScript:** at most 15 KB of gzip JavaScript on content pages. No React for the always-present UI (ADR 0008).
- **Brand:** blue for graphics only, navy primary buttons, AA contrast for every text pair ([brand.md](../brand.md)).
- **Motion:** the principles in [motion.md](../motion.md). The logo entrance plays only in the home hero (ADR 0014).
- **Copy:**
  - It goes into [content.md](../content.md) before the code.
  - No invented proof (ADR 0004).
  - The guardrails apply: no *projektiranje* in any form.
- **Fonts:** at most two families.

## Working notes

- **View:** `npm run dev`, then http://localhost:4321/lab. Start the dev server with `exec node ./node_modules/astro/bin/astro.mjs dev`, so it can be stopped cleanly.
- **Check under the CSP:**
  1. Run `npm run build:lab`.
  2. Run `HOST=127.0.0.1 PORT=4322 node ./dist/server/entry.mjs`.
  3. Run the local script `.playwright-mcp/check-lab-r2.mjs`: axe, console, overflow, scroll, replay, reduced motion and no JavaScript on every lab page at three widths. Extend it for the style page.
  4. Afterwards, `npm run build` restores the normal build.
- **Playwright MCP:**
  - "Browser is already in use" means a Chrome from an earlier session holds the profile. Ask the client, then close that Chrome; `/mcp` reconnect doesn't help.
  - The round 2 session closed its own browser at the handover.
  - The headed browser draws no frames in the background, so call `finish()` on `document.getAnimations()` before a final-state screenshot.
- **Pitfalls from round 1** ([2-design-round-2.md](2-design-round-2.md#working-notes-from-round-1)):
  - Playwright reuses whatever listens on port 4321.
  - Size the wordmark with `--wordmark-width`.
  - Vitest needs every injected lab page file to exist.
  - Scoped Astro styles beat single parent classes.
