# Phase 2 review: refinements before phase 3 (brief)

> **Status (2026-10-19): open; the next session starts here.** Phase 2 is done and in review (PR #2). The client likes the design system and wants a few refinements before phase 3. They bring them to the next session.
> - **First**, ask the client, in Croatian, for the refinements. Record each one under [Refinements](#refinements) before changing anything.
> - **Then** make them on `phase/2-design`, check them, and update the docs, the Figma library and PR #2.
> - **Stop** after reporting. Merging PR #2 and starting phase 3 happen only on the client's word ("idemo dalje"), as the [phase gate](../../.claude/rules/codraft-workflow.md) says.

## Where things stand

- **The branch:** `phase/2-design`, pushed.
  - PR #2 (https://github.com/matejmedo0/codraft-website/pull/2) is ready for review; its description is the phase report.
  - CI was green on `cd6b148`.
- **The decisions:**
  - [ADR 0015](../decisions/0015-design-direction-model-i-list.md): direction D with a paper header and hero, navy only as the closing call to action, all four motion moments, two people in the team strip, Archivo only, a 2 px radius, and the lab keeps A–E
  - [ADR 0016](../decisions/0016-figma-for-design-iterations.md): Figma for quick iterations; code is the source of truth
- **What was built:** see the [phase log](2-design.md#log) (the design system session) and [2-design-system.md](2-design-system.md).
- **The client's machine:** Windows "Animation effects" is off, so Chrome reports reduced motion and the site shows final states only. The client knows how to switch it on (Settings → Accessibility → Visual effects → Animation effects).
- **The dev server:** this session started one on port 4321 so the client could review `/lab/style`. It may still run.
  - Check port 4321 first: `netstat -ano | grep ":4321 .*LISTENING"`, then inspect the process.
  - Stop it before `npm run test:e2e`, and tell the client.

## Where each kind of change goes

| Change | Code | Also update |
|---|---|---|
| Colour, type, space, radius, motion values | `src/styles/tokens.css`, `motion.css`; `motion.ts` for motion | `tokens.test.ts` pairs if a text pair changes; the Figma variables; `docs/brand.md` or `docs/motion.md` |
| Font files or fallback metrics | `src/styles/fonts.css`, `src/assets/fonts/` | Rebuild them with fonttools in a throwaway venv outside the repo ([research note](../research/2026-10-19-design-system.md#1-archivo-for-production)); never add a font tool to the project |
| A design-system component | `src/components/ui/*.astro` | The style page if it shows it; the matching Figma component |
| Header, title block, language switcher | `src/components/site/*.astro`, `menu.ts` | The E2E tests in `tests/e2e/site-chrome.spec.ts`; the Figma components Zaglavlje and Zaglavlje nacrta |
| Any visible text | `docs/content.md` first, then `src/locales/{hr,en}.json` (UI strings) or `src/lab/copy.ts` (lab only) | Both locales keep the same keys |
| The page frame (sheet, zones, letters) | `Sheet.astro`, `Zone.astro`, `ZoneMark.astro`, `SiteLayout.astro` | The Figma example page |
| The style page | `src/lab/style/*`, `src/lab/pages/style.astro` | Screenshots in `docs/phases/screenshots/phase-2/system/` |
| A change to a decision in ADR 0015 or 0016 | — | A new ADR that supersedes the part it changes (accepted ADRs are never rewritten), and a line under "Odluke" in `PROGRESS.md` |

**Lab D and E stay the round 2 record.** Don't restyle them; the style page and the production components carry the direction.

## How to check a change

1. `npm run build:lab`, then `HOST=127.0.0.1 PORT=4322 node ./dist/server/entry.mjs` in the background.
2. Run `node .playwright-mcp/check-lab-r3.mjs`. It is local and not in git. It runs axe, console errors, overflow, a slow scroll, the replay, the keyboard and menu, reduced motion and no JavaScript, on every lab page at 375, 768 and 1440 px.
   - `ONLY_KEYBOARD=1` skips the per-page loop.
   - `.playwright-mcp/motion-frames.mjs` takes frames of motion in progress for the client, who can't see it on their machine.
3. Take screenshots with Playwright MCP into `.playwright-mcp/`, and copy the report ones to `docs/phases/screenshots/phase-2/system/`.
   - In the MCP, emulate reduced motion for final-state screenshots: the headed window draws no frames in the background, so one-shot triggers don't fire.
4. Stop the server, then run `npm run build` to restore the normal build.
5. Run `npm run verify`, and `npm run test:e2e` with port 4321 free.
6. Commit (Conventional Commits, messages from a file with `git commit -F`), push, and wait for green CI.

## The Figma library

"Codraft sustav dizajna": https://www.figma.com/design/pWypJUUuwNZv9iTSDVFBV0 (file key `pWypJUUuwNZv9iTSDVFBV0`). It is in the client's account: team "mmedved1's team", education plan, Dev seat, admin.

Load `figma:figma-use` and `figma:figma-generate-library` before any `use_figma` call. Then find the nodes by name, because IDs can change.

| Node | Name | ID (2026-10-19) |
|---|---|---|
| Pages | Naslovnica, Temelji, Komponente, Primjer: početna | `0:1`, `2:2`, `2:3`, `2:4` |
| Variable collections | Paleta (palette, hidden), Uloge (roles; modes Papir and Tamnoplava), Raspored (modes Mobitel, Tablet, Desktop), Oblik | — |
| Components | Grip, Znak | `3:2`, `3:8` |
| Component sets | Gumb (16 variants), Stavka, Korak, Zaglavlje, Zaglavlje nacrta | `3:121`, `4:34`, `4:49`, `5:64`, `5:150` |
| Components | Kota, Milimetarski papir | `4:50`, `4:58` |
| Example page | Početna, desktop 1440; sheet frame "List" | `6:2`, `6:16` |

- **Text styles:** `Desktop/…` and `Mobitel/…`. Archivo uses `variationSettings` for weight and width (`wdth` 87.5 for headings, 75 for labels).
- **Plugin API pitfalls:** see [research/2026-10-19-design-system.md §5](../research/2026-10-19-design-system.md#5-figma).
- **Rule (ADR 0016):** a change agreed in Figma goes into the code first. Then the library is brought in line with the code, in the same piece of work.

## Pitfalls from this phase

- **Astro renders a component's `<script>` in place** (not hoisted). Keep scripts out of components that render inside links or SVG.
- **A line break between an element and a `{expression}` collapses** in `.astro` templates; write `{" "}`.
- **`resize()` on a Figma auto-layout frame** resets its sizing to fixed. Set `primaryAxisSizingMode = "AUTO"` after it.
- **Playwright MCP:** "Browser is already in use" means a Chrome from an earlier session holds the profile. Ask the client before closing it.

## Refinements

Recorded when the client gives them. For each one, record:
- the client's words
- what changed
- where it changed
- whether it changes a decision (then add a new ADR)

| # | The client's request | Change | Status |
|---|---|---|---|
| — | — | — | — |

## After the refinements

1. Update this brief (the table above), the [phase log](2-design.md#log) and `PROGRESS.md`.
2. Add a "Review refinements" section to PR #2's description.
3. Wait for green CI.
4. Report to the client in Croatian, and stop.
5. On the client's word:
   1. Merge PR #2 into `main` with a merge commit.
   2. Create `phase/3-pages` from `main`.
   3. Start phase 3 ([3-pages.md](3-pages.md)).
