# Phase 2 review: refinements before phase 3 (brief)

> **Status (2026-10-21, end of the fourth refinements session): the critique has run and "Što radimo" is settled; the rest of the critique's fixes, the Figma sync and the final checks are left before the phase gate. The next session starts at [Handover](#handover-2026-10-21), step 1.** Phase 2 is done and in review (PR #2). The first refinements session (2026-10-19) brought batches 1–7 (refinements 1–20), the second (2026-10-19 to 20) batches 8–18 (refinements 21–56), the third (2026-10-20 to 21) batches 19–23 (refinements 57–74), and the fourth (2026-10-21) batches 24–30 (refinements 75–104): the critique's first fixes, and "Što radimo" through fourteen layouts back to the central axis with larger type (#102). All are reviewed on `/lab/pocetna`.
> - **First, in the next session:** ask the client whether the older comparison `/lab/sto-radimo` (batch 3's three options: `ServicesChapters.astro`, `ServicesSchedule.astro`, `process-line.ts`) should be deleted too. Batch 30's last question was about it, and the client's answer ("Može sredi dokumentaciju…") didn't say clearly; a deletion needs a clear OK. Keep it until then.
> - **Next:** the three steps under [Handover](#handover-2026-10-21), in order: the rest of the critique (group A 16–18, then B and C, then the critic's re-check), the Figma sync, the final checks and the report.
> - **The rules of this review:** record each refinement under [Refinements](#refinements) before changing anything; change only what the client asks for (see the lesson in batch 7); make the change in code, check it, then bring the Figma library in line.
> - **Stop** after reporting. Merging PR #2 and starting phase 3 happen only on the client's word ("idemo dalje"), as the [phase gate](../../.claude/rules/codraft-workflow.md) says. In this review "idemo dalje" has also meant "the next batch"; ask if it is unclear.

## Handover (2026-10-21)

The client ended the third refinements session with: "Odlično ažuriraj dokumentaciju da u novoj sesij svježoj krenemo na design critica da pokreneš, i sve ostalo što ostaje do kraja faze 2." and answered the rest in batch 23 (below): no more refinements, the Figma sync after the critique, the final checks after Figma, and English and four other items moved to phase 3. Earlier handovers are in git history (`64854d2`, `9f6edf1`).

The fourth session (2026-10-21, batches 24–30) ran the critique and settled "Što radimo". The client ended it with: "Može sredi dokumentaciju i vidimo se u sljedećoj sesiji daj mi prompt za nastavak". The code of the session ends at `8b5e81d`; CI was green on every push.

**Where things are**
- **Branch:** `phase/2-design`, pushed; the last code commit of the session is `7c0c26d`, and CI was green on every push of the session.
- **Lab pages** (`npm run dev`, then http://localhost:4321):
  - `/lab/pocetna`: Home in the chosen direction, on the production components, with every approved refinement: the hero as in the client's reference, "Što radimo" as the central axis with the client's icons (option B) and the line that follows the screen, the free audit, "Tehničko crtanje" (option C as refined in batches 8–9, without a button since #61, its floor plan rising into a 3D house with a roof in palette 1: #58, #64, #66), "Kako radimo" with the client's commitments, the team strip, and the centred navy closing call to action.
  - `/lab/sto-radimo-2`, `/lab/crtanje`, `/lab/ikone`, `/lab/tlocrt-3d`, `/lab/kuca-boje`: the comparisons, kept as the record; each says which option the client chose. The older `/lab/sto-radimo` (batch 3) was deleted on the client's word (#108).
  - `/lab/style`, `/lab/a`–`/lab/e`: as before. D and E stay the round 2 record (they share the lab copy, so the client's wording shows there too).
- **Code of the refinements:** `src/lab/home/`:
  - Home's zones (`HomeHero`, `HomeAudit`, `HomePrinciples`, `HomeTeam`, `HomeClosing`)
  - "Što radimo": `ServicesAxis.astro` (the chosen central axis, the only layout left, with the services' type a step larger from 64rem, #102), `ServiceItem.astro`, `chapters.ts`, `services.css`, and `axis-line.ts`, which drives the line and the icons. The tabs (option 14) are in `src/lab/archive/` (`ServicesTabs.astro`, `stage-tabs.ts`), shown on `/lab/sto-radimo-2` with the chosen axis (#104); every other layout is in git history (`c5ffc0c`).
  - the icons: `icons/service-icons.ts` (transcribed from `Assets/codraft-icons/svg/`), `icons/ServiceIcon.astro`, `icons/icon-draw.ts`
  - the floor plan: `PlanDrawing.astro` with `plan-timelapse.ts`; its 3D view, roof and palettes from `plan-model.ts` and `plan-projection.ts` (#58, #63–66), with `plan-model.test.ts`
  - "Tehničko crtanje": `drafting/DraftingLegend.astro` (the chosen option; the roof and palette 1 are its defaults)

  Also `src/lab/pages/{pocetna,sto-radimo,crtanje,ikone,tlocrt-3d,kuca-boje}.astro` and `src/lab/copy.ts`. Production code changed in:
  - the header (no button)
  - the route map (`/tehnicko-crtanje`)
  - the locales
  - `draw.ts` (`data-draw-wait`)
  - the tokens: the paper grey `#4A5362` and `--motion-follow`
  - the sheet's margin at every width (`Sheet.astro`, #57)
- **Decisions of the review:** [ADR 0017](../decisions/0017-one-audit-call-to-action-per-page.md)–[0027](../decisions/0027-taste-skill-ideas-in-the-setup.md), all accepted (0022 point 3 superseded by 0023). See the list in `PROGRESS.md` under "Odluke".
- **Copy:** every new or changed line is in `docs/content.md` ("Prototype copy", one table per batch, and the changelog). The client gave much of it verbatim and will proofread every text by hand at the end of phase 3 (#73).
- **Screenshots of the review:** [screenshots/phase-2/review/](screenshots/phase-2/review/), named by batch (`batch8-…` to `batch22-…`), from the dev server or the lab build; `hero-reference-client.png` is the client's own screenshot of the hero as it must stay.
- **The client's screens:** the main one is 2560 × 1440 at 100 % (the browser about 1920 px wide); the laptop is 2560 × 1600 at 150 % (1707 px). The client has Windows "Animation effects" on and reviews the motion.
- **The dev server** runs on port 4321 (`node … astro dev`), usually started by the client. Check the port at the start of the session; stop it only before `npm run test:e2e`, and tell the client.

**The steps to the end of phase 2, in this order** (the client's order, batch 23)

1. **The independent critique** ([ADR 0024](../decisions/0024-independent-design-critique.md)). **Run on 2026-10-21:** capture `2026-10-21-0037` at `a28938e`, four critics, all "Ready after fixes"; 22 verified findings and questions in [research/2026-10-21-design-critique-home.md](../research/2026-10-21-design-critique-home.md), put to the client as options. The client answered group A in batch 24 and asked for the fixes one group at a time: 1, 2, 4 and 7 (batch 24), then 8–11 and 15 (batch 25), all done; for "Što radimo" the client kept the central axis, with the services' type a step larger (#102); the tabs (option 14) are in the archive (#104). **The rest moves to a new session, once "Što radimo" is settled (#92; settled in #102):** 16, 17 and 18 of group A (the grips on the header's links tried with 18, #91), then group B and group C (#83), then the critic's re-check. The client asked for its first run in this session, which is the client's word for it: „u novoj sesij svježoj krenemo na design critica da pokreneš“. Follow [design-critique.md](../design-critique.md):
   1. Make sure the dev server answers on port 4321 (start `npm run dev` if it doesn't).
   2. Capture Home: `npm run design:capture -- lab/pocetna` (six widths, motion at 1440 px). `/lab/style` only if the client asks.
   3. Launch four `design-critic` agents in one message, one per lens: `art-direction`, `craft`, `communication` and `motion`, each with the capture folder and the page.
   4. Verify every finding yourself against the screenshots, `metrics.json` and the code before reporting it. A finding that goes against a recorded decision of the client is a question, not a defect.
   5. Report to the client in Croatian: the findings by severity, each with options and a recommendation. Change nothing yet.
   6. On the client's word: record the approved fixes as a batch under [Refinements](#refinements), make them, check them, then let the critic re-check (ADR 0025; design-critique.md, "Re-check").
2. **The Figma sync** (#68), after the critique and its fixes. "Codraft sustav dizajna" has none of the review's refinements yet. Load `figma:figma-use` and `figma:figma-generate-library` before any `use_figma` call ([The Figma library](#the-figma-library) has the file and its nodes). Bring it in line with the code:
   - the variable for the paper grey (`#4A5362`)
   - the component Zaglavlje (no button; "Tehničko crtanje")
   - the nine service icons as components
   - the example page Početna:
     - the hero
     - "Što radimo" as the central axis with the icons beside the services
     - the drafting zone (option C as refined, no button), with the house in palette 1 as its drawing (the final state of the 3D view)
     - "Kako radimo"
     - the centred closing call to action
   - anything the critique's approved fixes changed
3. **The final checks and the report** (#69), after Figma: the steps under [After the refinements](#after-the-refinements).
   - The checks on the lab build: `.playwright-mcp/check-lab-r3.mjs` covers every lab page, the comparisons included (`/lab/tlocrt-3d` and `/lab/kuca-boje` since 2026-10-20 to 21); it is local and not in git, so if it is missing, rebuild it from [How to check a change](#how-to-check-a-change). Include the scroll motion of "Što radimo" and the floor plan's 3D view with the motion on.
   - `npm run verify`, and `npm run test:e2e` with port 4321 free (CI runs E2E on every push as well).
   - Report screenshots from the lab build.
   - The phase log, `PROGRESS.md`, and a "Review refinements" section in PR #2's description: batches 1–30, ADR 0017–0027, the two critiques, the screenshots.
   - Green CI, then the report in Croatian, and stop. On "idemo dalje": merge PR #2 with a merge commit, create `phase/3-pages` from `main`, start phase 3.

**Moved to phase 3** (the client's word, batch 23): the English copy (#70), the Kowalski proposals (#71), the browser bar's colour (#72), the client's proofreading of every text at the end of phase 3 (#73), the hero's line count on 1440 px laptops (#74), and the two local type sizes (#59). They are listed in [3-pages.md](3-pages.md#carried-over-from-phase-2).

**Working notes**
- **A `<script>` between two zones breaks `.zone + .zone`** (the rule above a zone disappears), because Astro renders a component's script in place. Put a component's script inside its zone.
- **A part that is in view at load and must still animate** hides itself with CSS under `.js` and `prefers-reduced-motion: no-preference`, so it never flashes complete (`data-draw-wait` in draw.ts; the axis line and icons in services.css).
- **Classes passed to `Zone`, `Button`, `ServiceItem` and `PlanDrawing` get the parent's scoped styles** (they spread their attributes); `Item` and `Steps` don't, so wrap them or use `:global()`.
- **The axis line** (`axis-line.ts`) is one element whose top and length the script measures from the bubbles (`data-axis-mark`); without JavaScript or with reduced motion the per-stage rails draw the line instead. The line is the first child of `.axis`, so the first stage is `.axis-stage:first-of-type`, not `:first-child`.
- **The icons** are inline SVG with `pathLength="1"` on every stroke; on screen they are 40 px with `stroke-width="1.8"`, so the line stays 1.5 px. Their accent takes `--accent`.
- **The sheet at 1920 px** keeps its margin since #57; the overflow of #23 is gone, so a check at 1920 px must find none.
- **The floor plan's 3D view** (#58): the plan's walls, windows and doors live in `plan-model.ts`, which builds the model's faces at build time; the view is in `plan-projection.ts`, shared with `plan-timelapse.ts`, which gives the CSS the two views (`--plan-from`, `--plan-to`) and each top's rise. Each side is a unit rectangle in its own frame (an SVG `transform` attribute), so CSS `scale` raises it from the floor: SVG's default transform origin is the frame's origin. Inline `style` attributes are blocked by the CSP, so per-element values go in through the CSSOM. `plan-model.test.ts` checks that the model fits above the title block.
- **A new component imported before its file exists** leaves the dev server failing to load the page (`FailedToLoadModuleSSR`) even after the file is written; touch the importing file to reload it.
- **A child added to `.axis`** must not be a `div`: the stages are found by `:first-of-type` and `nth-of-type()` among the `div`s, so any decoration there is a `span` or an `svg`.
- **Four critics on one capture** worked well for layout options (batch 29): one capture, four `design-critic` agents in one message, then verify, fix what is clearly the options' own fault, and put the rest to the client as questions. Each critic takes about ten minutes.
- **A curved border turned over with `scale: -1 1`** leaves a faint 1 px seam on the far side in Chromium; draw the mirror image instead.
- **A new lab page** needs `astro.config.ts` to reload after the page's file exists: the lab integration injects its routes when the dev server starts. Touch the config (`touch astro.config.ts`) and the dev server reloads it without a restart.
- **The draw queue** (`draw.ts`, #78) counts every animation of a part, its pseudo-elements' included, plus the siblings marked `data-draw-with`; a part's CSS needs nothing else to take part.
- **Playwright scripts** must live in the project (`.playwright-mcp/`, ignored by git) to find `@playwright/test`. In Git Bash, run them with `MSYS_NO_PATHCONV=1` when an argument starts with `/`. Element screenshots of tall sections at 375 px can come out shifted; give the viewport the section's height.
- **Node scripts on Windows** import project modules through `file:///C:/…` URLs.
- **Editing files with Python on Windows:** write with `newline="\n"`, or the file gets CRLF line endings. For long edits, write the script to the scratchpad first.
- **Lab copy is shared:** `src/lab/copy.ts` feeds A–E too, so a copy change shows there as well; that is accepted.
- **Specifications the client pastes** (sometimes written by another AI agent) are the target for how it should look and behave; the implementation follows this project's rules, tokens and patterns (the client's words, batch 14).

## Where things stand

- **The branch:** `phase/2-design`, pushed. PR #2 (https://github.com/matejmedo0/codraft-website/pull/2) is open; its description is the phase report, and gets a "Review refinements" section at the end of the review. CI was green on every push up to `d8e4f70`.
- **The decisions:** [ADR 0015](../decisions/0015-design-direction-model-i-list.md) (direction D with a paper header and hero, navy only as the closing call to action, the motion, Archivo, a 2 px radius, the lab keeps A–E) and [ADR 0016](../decisions/0016-figma-for-design-iterations.md) (Figma for quick iterations; code is the source of truth), then the review's ADR 0017–0027.
- **What was built before the review:** see the [phase log](2-design.md#log) and [2-design-system.md](2-design-system.md).

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

The client sends the refinements in small batches and reviews each batch before the next ("par njih odjednom da te ne natrpam").

**Where they are reviewed: `/lab/pocetna`.** Before the first batch, the client asked whether the chosen direction was the hybrid with the white ground, and it was confirmed (ADR 0015). Lab D still shows its navy header and hero, because D and E stay the round 2 record. So the refinements are shown on a new lab page, `/lab/pocetna`: Home in the chosen direction, on the production components (header, sheet, zones, buttons, items, steps, title block), with D's sections ported to the tokens and the paper hero. Phase 3 builds the real Home from it.

**Batch 1 (2026-10-19)**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 1 | "Izbaciti riječ mali iz ove rečenice: 'Codraft je mali studio za tvrtke kojima su važni rezultati, a ne žargon'" | "mali" is removed from the Croatian hero lead and from the HR draft of `services.intro`, which says the same. The English copy keeps "small" until the client approves suggestion S17. | `docs/content.md` (§2, §3, prototype copy), `src/lab/copy.ts`, `src/lab/style/style-data.ts` | None | Approved |
| 2 | "Previše se nameće gumb rezervirajte besplatnu analizu kroz 5 6 mjesta dobiva se dojam kao da se forsira, što bi mene prvog odbilo od ovakve stranice makar bila kvalitetna napraviti to manje nametljivo i definitivno na manje mjesta uz zadržavanje profesionalizma i ozbiljnosti same stranice." | Lab D asks for the audit five times on Home: the header button, the hero, a link in stage 01, the audit zone and the closing call to action. Now the free-audit button appears **once per page, in the section that explains the audit**. The header has no button (Usluge · CAD crtanje · O nama · Kontakt · EN). The hero leads with "Pogledajte usluge". The navy closing call to action invites a conversation with "Pošaljite upit". | [ADR 0017](../decisions/0017-one-audit-call-to-action-per-page.md); `Header.astro`, `navigation.ts`, the locales; `/lab/pocetna`; the style page; `docs/information-architecture.md`; the E2E header test | New ADR 0017, accepted with the batch | Approved |
| 3 | "Zadržati toplo bijelu boju u hero sekciji (to smo već definirali)" | No change: the header and hero stay warm off-white `#F6F5F1` (ADR 0015). `/lab/pocetna` shows it, unlike lab D. | — | Confirms ADR 0015 | Confirmed |

The client approved batch 1 with the next message: "Sviđa mi se idemo dalje". "Idemo dalje" there meant the next batch, not the phase gate. The English questions (S17) stay open.

**Batch 2 (2026-10-19)**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 4 | "Vratiti se dizajnu teksta kao u A nacrtu gdje rečenica "Planiramo, izrađujemo i održavamo" je u jednom redu a: "web stranice, softver i AI alate." u drugom redu jer je prostor više popunjen onda i nema toliko praznina. Ostalo ne dirati za sad samo prelamanje teksta znači" | A broke the H1 in these two lines only on a wide screen: the client's main screen is 2560 px wide, while at 1440 and 768 px A also had three lines. D and `/lab/pocetna` capped the H1 at 20ch, so it kept three lines even there. Now the cap is gone and the two halves are two lines whenever the text column fits the first one (a container query at 64rem). Narrower columns wrap the H1 evenly as before: three lines at 1440 px, more on phones. Size and layout are unchanged. | `src/lab/home/HomeHero.astro`, `src/lab/copy.ts` (`HERO.titleLines`) | None | Done; in review |
| 5 | "Promjeniti generičku rečenicu u hero sekciji: "Codraft je studio za tvrtke kojima su važni rezultati, a ne žargon." s naglaskom na riječ žargon koju treba definitivno zamiijeniti s nečim smislenijim. TE svugdje gdje se spominje žargon smisliti normalnu strukturu" | Drafts, for the client to approve. The hero lead says what "results, not jargon" promised, in concrete terms from the copy (`plan.body`, `run.tagline`): "Za tvrtke koje žele znati na čemu su: opseg posla, rok i cijenu dobivate prije početka rada, a nakon objave ostajemo uz vas." `services.intro` ends "…za tvrtke koje žele razumjeti što dobivaju." "Kako radimo" replaces "Bez žargona" with "Jasno objašnjeno: Objašnjavamo što radimo i zašto, jednostavnim jezikom i bez nepotrebnih tehničkih izraza." No "žargon" is left in the Croatian copy. The English keeps "not jargon" until S18. | `docs/content.md`, `src/lab/copy.ts`, `src/lab/style/style-data.ts` | None | Done; in review |
| 6 | "Umjesto CAD crtanje koristiti riječ Tehničko crtanje s naglaskom na arhitekturu i građevinarstvo (bez strojarstva i ostalih struka izvan navedene dvije)" | „Tehničko crtanje“ in the navigation, the hero link ("Tehničko crtanje za arhitekturu i građevinarstvo"), the Home zone and the page, with the slug `/tehnicko-crtanje`. The audience line is "Za arhitektonske urede i tvrtke u građevinarstvu kojima treba dodatni kapacitet za crtanje." "2D CAD crteži" keeps "CAD", which names the files. The English name, slug and audience wait for S19. The CAD illustration is a machined plate, which reads as mechanical engineering, so an architectural drawing is proposed to the client. | [ADR 0018](../decisions/0018-drafting-for-architecture-and-construction.md); `route-map.ts`, `hr.json`, `src/lab/copy.ts`; `docs/content.md`, `docs/information-architecture.md`, `CLAUDE.md`, the phase 3 and 4 plans | New ADR 0018 | Done; in review |

The client sent batch 3 next, with no change to batch 2, and didn't answer its three questions yet (the headline on 1440 px laptops, the English copy, the CAD illustration).

**Batch 3 (2026-10-19): "Što radimo"**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 7 | "Sekcija Što Radimo: Vizualno je dobro smišljen sam izgled sekcije, no treba popraviti raspored boxova i samu veličinu istih za početak tekst je pre sitan ispod svake djelatnosti to treba uskladiti, te osmisliti kako popuniti ili reorganizirati jer ima dosta praznog prostora, možda malo veći font ili recimo ljepša naglašenost sitnih rečenica, bolji kontrast, i eventualno centriranje probati više opcija da se smanji prazan prostor." | The services' sentences were 17 px in grey (5.16:1). In every option they are now 17–19 px in full ink (15.84:1), with tighter spacing and no empty cell. Three options on a comparison page, `/lab/sto-radimo`: **1 „Poglavlja“**, the chapters as before, the services in two columns, an odd last service across the row (on `/lab/pocetna` until the client chooses); **2 „Sastavnica“**, the stage's title and tagline on one line and its services in a ruled table like a drawing's parts list, every row full (2, 4 and 3 cells); **3 „Središnja os“**, the line down the middle of the sheet, the stages centred on it and the services left and right of it (on phones the line runs down the left). | `src/lab/home/` (`HomeServices`, `ServicesSchedule`, `ServicesAxis`, `ServiceItem`, `chapters.ts`, `services.css`), `src/lab/pages/sto-radimo.astro` | The client chooses an option | Options in review |
| 8 | "Isto tako animacija Nejde odmah do kraja ove plave crte lijevo odmah nego po skrolu što je dobro zamišljeno ali nije implementirano najbolje. Možda da je u početku nema uopće pa na skrol se aktivira animacija i crta prođe do točke 3 do kraja." | Each chapter drew its own stretch of the line as it arrived, and a chapter in view at load showed its stretch complete. Now the line is one stroke in every option: it isn't there until the section reaches its trigger (70 % of the viewport), then it runs from 01 to 03 at a constant speed, like a plotter's pen (about 1.3 s on a desktop, at most 2.4 s on a phone). `draw.ts` gains `data-draw-wait`, so a part in view at load waits too, hidden from the first paint. Reduced motion and no JavaScript show the complete line. | `src/components/ui/draw.ts`, `src/lab/home/process-line.ts`, `src/lab/home/services.css`; [motion.md](../motion.md) | None | Done; in review |

**Batch 4 (2026-10-19)**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 9 | "Opcija 3, s time da predlažem pojednostavljenu verziju možda da je manje teksta u opisima jer imamo već u planu posebnu stranicu za usluge ako se slažeš" | Option 3 „Središnja os“ is on `/lab/pocetna`. Each service on Home has one short line instead of its full sentence, as the Home outline already says ("one line, links to `/usluge#…`"); the full sentences stay for `/usluge`. The lines are shortened from the client's sentences, drafts in `content.md`. The comparison page stays as the record and says which option was chosen. | `src/lab/copy.ts` (`short`), `src/lab/home/chapters.ts`, `src/lab/pages/pocetna.astro`, `src/lab/pages/sto-radimo.astro`; option 1 is now `ServicesChapters.astro` | The client chose option 3 | Done; in review |
| 10 | "čak sam i razmišljao dostaviti ti set custom ikona koje mogu biti isto tako animirane kako skrolam kroz site i daju profesionalan dojam?" | Agreed in principle, within the brand's rules: custom icons only, drawn in the drafting language, never a generic pack (brand.md). Proposed placement: one icon per service in "Što radimo" (9). Proposed motion: each stage's icons draw once, as the process line reaches the stage, so the section keeps one movement (motion.md, "one moving thing per viewport"); static with reduced motion. The specification for the files is in [brand.md](../brand.md#imagery). | — | An ADR when the icons are adopted | Waiting for the client: the icons, or a first set drafted by Claude |

**Batch 5 (2026-10-19)**

The client answered the open questions of batches 2–4 here.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 11 | "Pa naslov u dva reda želim tamo gdje je zgodno znači i laptop da da ima smisla." | Shrinking the letters would have made the H1 no larger than the section headings on 1280–1440 px laptops (about 45–54 px against 46–49 px). So from 64rem (1024 px) the H1 spans the whole sheet in its two lines at full size, and the lead, the button and the drafting link sit below it on the left, with the drawing of the mark on the right. Below 64rem the H1 wraps as before. | `src/lab/home/HomeHero.astro` | None | Done; in review |
| 12 | "Engleski usklađujemo na kraju svih promjena" | The English copy (S17–S19 and every Croatian change of this review) is aligned once, after the last refinement. | `docs/content.md` §3 | None | Deferred to the end of the review |
| 13 | "Može zamijeni strojarsku ploču arhitektonskim tlocrtom i nekim timelapsom kao animiranim." | Home's drafting zone shows a floor plan of a small flat instead of the machined plate (ADR 0018). It draws itself like a timelapse of drafting, element by element and layer by layer: grid axes with their bubbles, the walls, the doors and windows, the dimension chains, the room names with their areas, and the title block, about 5 s once half of it is in view. The layer list switches on in step, and "Iscrtaj ponovno" replays it. Reduced motion and no JavaScript show the finished plan. Lab D and E keep the plate. | `src/lab/home/PlanDrawing.astro`, `src/lab/home/plan-timelapse.ts`, `src/lab/home/HomeDrafting.astro`, `src/lab/copy.ts` (`PLAN`); `docs/content.md`, [motion.md](../motion.md) | None | Done; in review |
| 14 | "I pošalji mi prompt za generiranje ikona - ja ti nakon toga dostavim set ikona po stilu na naš brend, svg png prozirni background kakav god trebaš ti onda animiraš i radiš s njima dalje što treba." | The prompt is in [brand.md](../brand.md#imagery) and was sent to the client. The client generates the nine icons and sends SVG or transparent PNG; Claude redraws them as stroke SVGs on the 48 px grid, so they can be drawn with the process line. | `docs/brand.md` | An ADR when the icons are adopted | Waiting for the client's icons |

**Batch 6 (2026-10-19)**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 15 | "Ne sviđa mi se novi dizajn hero sekcije vrati stari, nikako novi." | The hero is back as it was before batch 5: the headline beside the drawing of the mark. Its two lines hold wherever the text column fits the first one at a size that still reads as the page's headline (from about 1660 px, the client's screens); at 1440 px it has three lines again. | `src/lab/home/HomeHero.astro`, restored from `bed409a` | Reverts #11 | Done; in review |
| 16 | "Tlocrt dobar no nazivi prostorija nepotrebni ovdje makni ih ostalo je ok" | The room names and areas are gone, with their layer "Oznake"; the plan keeps the axes, walls, openings, dimensions and title block. | `src/lab/home/PlanDrawing.astro`, `plan-timelapse.ts`, `src/lab/copy.ts`, `docs/content.md` | None | Done; in review |
| 17 | "Sekcija CAD crtanje, sada Tehničko crtanje kako smo rekli, Ubaciti i 3D mogućnost ne samo 2D crteže." | The drafting offer gains "3D modeli", between the 2D drawings and the documentation. New HR draft: "Trodimenzionalni modeli zgrada i detalja, izrađeni prema vašim nacrtima i skicama, za provjeru i prezentaciju."; on Home, one line: "Modeli zgrada i detalja prema vašim nacrtima i skicama." | [ADR 0019](../decisions/0019-drafting-adds-3d-models.md); `docs/content.md`, `docs/information-architecture.md`, the phase 3 plan; `src/lab/copy.ts` | New ADR 0019 | Done; in review |
| 18 | "Te isto tako uskladiti sa sekcijom što radimo u smislu izgleda i veličine teksta da bude u skladu nije loša no izbaci mi opet tri opcije za usporedbu da vidimo može li bolje." | Every option uses the type of "Što radimo": the tagline as its muted lead, the services as its items (a title and one line in full ink, a hairline above), one short line per service. Three options on `/lab/crtanje`: **A „Uz tlocrt“**, the current layout tidied, text on the left and the plan on the right (on `/lab/pocetna` until the client chooses); **B „Središnja os“**, centred like "Što radimo", with the plan in the middle and the services around the axis below it; **C „Legenda“**, the plan large on the left and, on the right, the services in a ruled table like a drawing's legend. | `src/lab/home/drafting/`, `src/lab/pages/crtanje.astro` | The client chooses an option | Options in review |

**Batch 7 (2026-10-19): handover**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 19 | "Počeo si raditi gluposti rekao sam što se tiče hero sekcije da vratiš kao prije što je bilo poslao sam ti screesnhot." (with a screenshot of the hero) | No code change. The hero on `/lab/pocetna` already matched the client's screenshot, checked at 1920 px: the H1 in two lines at 72 px, the lead, "Pogledajte usluge", the drafting link, and the graph-paper drawing of 741 × 555 px. The screenshot is kept as the reference. **Lesson:** batch 5 changed the hero's composition when the client had asked only about line breaks. Change only what is asked; when a request needs more, show the options first and let the client choose. | `screenshots/phase-2/review/hero-reference-client.png` | None | Matches the reference |
| 20 | "Opcija C vjerovatno no updateaj dokumentaciju za nastavak u drugoj sesiji i daj prompt za drugu sesiju" | The client leans to option C „Legenda“ for "Tehničko crtanje", not yet final. Confirm in the next session, then put it on `/lab/pocetna`. The handover is above. | — | The client chooses | Confirmed in batch 8 (#21) |

**Batch 8 (2026-10-19, second refinements session): "Tehničko crtanje", option C**

The client's message, verbatim:

> Uredi sekciju "Tehničko crtanje" (varijanta C, s legendom slojeva) to potvrđujem. Interaktivni crtež, ostaje funkcionalno isti. Mijenjaš samo raspored i tekst desnog stupca.
>
> RASPORED
> 1. Naslov "Tehničko crtanje" makni iz reda iznad crteža i premjesti ga na vrh desnog stupca. Crtež počinje od vrha sekcije.
> 2. Desni stupac poravnaj s okvirom crteža: vrh naslova u ravnini s gornjim rubom okvira crteža, CTA u ravnini s donjim rubom okvira crteža. Bez vertikalnog centriranja i bez praznog prostora ispod CTA-a.
> 3. Red s legendom slojeva i gumbom "Iscrtaj ponovno" stavi u zaseban grid red ispod crteža, da se desni stupac ne rasteže do dna legende. Primjer: grid-template-areas: "drawing text" "legend .". U tekstnom stupcu daj CTA-u margin-top: auto.
> 4. Omjer stupaca ostaje približno 57/43. Crtež smijete smanjiti najviše 5 % ako treba.
> 5. Popravi overflow: okvir s uslugama trenutno ide do desnog ruba ekrana i border mu je odrezan. Kontejner neka ima simetričan horizontalni padding i max-width.
> 6. Ukloni okvir oko tri usluge. Umjesto njega numeriraj stavke krugovima u istom stilu kao oznake osi na crtežu (1, 2, 3) i odvoji ih tankom isprekidanom linijom u stilu crteža.
> 7. Lead rečenicu potamni tako da ima kontrast najmanje 4.5:1 prema pozadini.
> 8. Ispod 900 px: jedan stupac, tekst ide prvi, pa crtež, pa legenda.
>
> TEKST (zamijeni postojeći doslovno, ništa ne dodaj)
> Eyebrow: Tehničko crtanje
> Naslov: Kad crteža ima više nego ruku.
> Lead: Crtamo za arhitektonske urede i građevinske tvrtke, u vašim slojevima i s vašim zaglavljem.
>
> 1  2D crteži
>    Tlocrti, presjeci i detalji koje možete odmah koristiti.
> 2  3D modeli
>    Zgrade i detalji iz vaših nacrta i skica.
> 3  Tehnička dokumentacija
>    Komplet složen za predaju. ( ili tako nešto da ne zvuči robotski i generički sam smisli )
>
> Rečenicu "Precizni crteži, isporučeni u roku." obriši u potpunosti. Ne dodaj nikakve brojke, rokove ni obećanja koja nisu u tekstu iznad.
> Ako se slažeš nastavi pa stani i javi da pogledam

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 21 | "Uredi sekciju "Tehničko crtanje" (varijanta C, s legendom slojeva) to potvrđujem. Interaktivni crtež, ostaje funkcionalno isti. Mijenjaš samo raspored i tekst desnog stupca." | Option C „Legenda“ is on `/lab/pocetna` instead of A. The floor plan works as before: the same timelapse, layer list and replay. `/lab/crtanje` stays as the record and says which option was chosen; its option C shows the refined version. | `src/lab/pages/pocetna.astro`, `src/lab/pages/crtanje.astro`, `src/lab/home/drafting/DraftingLegend.astro` | The client chose option C (closes #20) | Done; in review |
| 22 | Layout, points 1–4 and 8 (quoted above) | The section's name moves to the top of the right column and the drawing starts at the top of the zone. The zone is a grid with the areas "drawing text" / "legend .": the floor plan is a subgrid across both rows, so its layer list and replay button sit in their own row under the drawing and the right column ends with the drawing's frame. The column runs from the frame's top edge (the section's name is trimmed to its cap height) to the frame's bottom edge, where the button sits (`margin-top: auto`); no vertical centring. Columns 57/43; the drawing is not reduced. From about 1440 px up the drawing is the taller one and the frame keeps the plan's own height (1440, 1707 and 1920 px measured). Below that the text is taller, so the frame grows with the column and the plan stays centred in it, and both edges still line up: by about 18 % at 1280 px, 46 % at 1024 px and 76 % at 900 px. Below 900 px: one column, text, drawing, layer list. The section's name is 15 px, in full ink. | `src/lab/home/drafting/DraftingLegend.astro`; `PlanDrawing.astro` takes a class (no functional change) | None | Done; in review |
| 23 | Point 5: "Popravi overflow: okvir s uslugama trenutno ide do desnog ruba ekrana i border mu je odrezan. Kontejner neka ima simetričan horizontalni padding i max-width." | The zone keeps its symmetric padding, and its content gets a maximum width of 100rem (1600 px), centred (at 1920 px it sits about 100 px in from each side). The box around the services is gone (#24). **The cause of the overflow is the sheet, on every page; not changed yet:** from a viewport of 120rem (1920 px), `Sheet.astro` switches to `margin-inline: auto`, but with a scrollbar the sheet (max 1920 px) no longer fits, so its side margins drop to zero, back to 24 px only at about 1983 px. Its frame then touches the screen's edges (the client's hero screenshot shows it), the zone letters fall off the left edge, and, with motion on, the grip at the right end of every zone rule sticks out 4 px, so the page scrolls sideways. The fix keeps the 24 px margin (`max-width: min(120rem, 100% - 3rem)`); at 1920 px it moves the hero 24 px in from each side and its H1 from 72 to 71.3 px, still two lines. Shown to the client before any change, because the hero must stay as in the reference: [now](screenshots/phase-2/review/batch8-sheet-now-1920.png), [with the fix](screenshots/phase-2/review/batch8-sheet-fix-1920.png). | `src/lab/home/drafting/DraftingLegend.astro` | None | Container done; the sheet's margin waits for the client |
| 24 | Points 6 and 7 (quoted above) | No box around the services. Each is numbered with a circle drawn like the plan's grid bubbles (a 1 px ink outline on paper, the number in the condensed width), and a thin dashed line, in the drawing's muted line colour, separates them. The services are an ordered list; their titles are now `h3` under the zone's `h2`. The lead is in full ink (15.84:1, was the muted grey, 5.16:1). | `src/lab/home/ServiceItem.astro` (optional number and heading level), `DraftingLegend.astro` | None | Done; in review |
| 25 | Text (quoted above) | Replaced verbatim: the section's name "Tehničko crtanje" above the heading, the heading "Kad crteža ima više nego ruku.", the lead, and the three services. The third line, which the client left to Claude, is "Crteži i specifikacije složeni u komplet spreman za predaju." (every word from `drafting.docs.body`; no new claim). "Precizni crteži, isporučeni u roku." and the audience line are no longer in the zone. The services' new lines apply wherever the lab shows them (options A and B too). | `docs/content.md`, `src/lab/copy.ts`, `src/lab/home/drafting/drafting.ts` | None | Done; in review |

The client reviewed batch 8 and sent batch 9 next; the sheet's margin at 1920 px (#23) is still unanswered.

**Batch 9 (2026-10-20): "Tehničko crtanje" again**

Before it, the client asked for the export settings of the icons they have made (transparent PNG and an SVG set). The answer follows [brand.md](../brand.md#imagery): nine files named by the service's anchor, SVG on `viewBox="0 0 48 48"` with real 1.5 px strokes in `currentColor` and the blue accent in `<g id="accent">`, PNG at 1024 px with alpha, into `Assets/icons/originals/{png,svg}/` (outside git), plus the tool, its licence and the editable source.

The client's message, verbatim:

> Doradi sekciju "Tehničko crtanje" na početnoj stranici. Crtež, toggle slojeva i gumb "Iscrtaj ponovno" ne diraj.
>
> 1. ŠIRINA: Sekcija je uža od ostatka stranice. Koristi isti container i horizontalni padding kao ostale sekcije. Lijevi rub okvira crteža mora biti poravnat s lijevim rubom naslova "Što radimo", "Kako radimo" i "Tim". Desni stupac završava na istom desnom rubu kao linije u sekciji "Kako radimo".
>
> 2. NASLOV: Ukloni mali eyebrow iznad naslova. H2 sekcije je "Tehničko crtanje", istog stila i veličine kao H2 u sekcijama "Što radimo", "Kako radimo" i "Tim".
>
> 3. LEAD ispod naslova, u istom stilu kao lead u sekciji "Besplatna analiza":
> "Za arhitektonske urede i građevinske tvrtke kad crteža ima više nego ruku. Crtamo u vašim slojevima i s vašim zaglavljem."
>
> 4. USLUGE: Ukloni numerirane krugove i isprekidane linije. Napravi listu bez brojeva i ikona po uzoru na sekciju "Kako radimo": naziv podebljano lijevo, kratak opis sivim tekstom desno, redovi odvojeni tankom punom linijom iste boje, debljine i razmaka kao u "Kako radimo". Ako je stupac uži od 520 px, opis ide ispod naziva.
> - 2D crteži: Tlocrti, presjeci i detalji koje možete odmah nastaviti.
> - 3D modeli: Zgrade i detalji iz vaših nacrta i skica.
> - Tehnička dokumentacija: Kompleti listova složeni za predaju.
>
> 5. CTA: Gumb ide odmah ispod liste, s razmakom kao između leada i gumba u "Besplatna analiza". Ukloni margin-top: auto. Tekst gumba: "Pošaljite skicu".
>
> 6. VERTIKALNO: Cijeli tekstni blok (naslov, lead, lista, gumb) vertikalno centriraj u odnosu na okvir crteža, ne na red s legendom. Legenda slojeva ostaje u zasebnom grid redu ispod crteža.
>
> 7. MOBITEL (ispod 900 px): jedan stupac, tekst prvi, zatim crtež, zatim legenda.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 26 | Point 1, width (quoted above) | The zone's content has no maximum width any more (it was 100rem, #23): the frame's left edge lines up with the headings of "Što radimo", "Kako radimo" and "Tim", and the right column ends on the right edge of the rules in "Kako radimo", the zone's padding on both sides. The sheet's own margin at 1920 px (#23) is unchanged. | `src/lab/home/drafting/DraftingLegend.astro` | None | Done; in review |
| 27 | Points 2 and 3, heading and lead (quoted above) | No section name above the heading. The `h2` is "Tehničko crtanje", in the style of every zone's `h2`; under it the lead, in the style of the free audit's lead (lead size, full ink, at most 36ch), with the client's new sentence. | `DraftingLegend.astro`, `src/lab/copy.ts`, `docs/content.md` | None | Done; in review |
| 28 | Point 4, services (quoted above) | No numbers and no dashed lines. The three services are rows as in "Kako radimo": the title (an `h3`, as there) on the left and the line in muted grey on the right, 3 : 5, with the same full 1 px rule between rows and the same spacing. When the text column is narrower than 520 px (a container query), the line goes under the title, with the spacing "Kako radimo" uses on narrow screens. The titles still link to their anchors on `/tehnicko-crtanje`, with the grips on hover and focus. The client's lines, verbatim ("…koje možete odmah nastaviti", "Kompleti listova složeni za predaju."). | `DraftingLegend.astro`, `src/lab/home/ServiceItem.astro` (the numbering of batch 8 removed), `src/lab/copy.ts`, `docs/content.md` | None | Done; in review |
| 29 | Point 5, the button (quoted above) | The button follows the list at 2.5rem, the gap between the lead and the button in "Besplatna analiza"; no `margin-top: auto`. Its text on Home is "Pošaljite skicu"; it still leads to `/tehnicko-crtanje`, and "Zatražite ponudu" stays the drafting page's own call to action. | `DraftingLegend.astro`, `src/lab/copy.ts`, `docs/content.md`, `docs/information-architecture.md` | None | Done; in review |
| 30 | Points 6 and 7, vertical position and phones (quoted above) | The text block is centred on the drawing's frame, in the drawing's row; the layer list keeps its own row below. Where the text is taller than the drawing, the frame still grows with it (#22), so the block stays centred. Below 900 px: one column, text, drawing, layer list (unchanged). | `DraftingLegend.astro` | None | Done; in review |

**Batch 10 (2026-10-20): "Kako radimo"**

The client answered batch 9 first: "Ma dobro nećemo direktno preko stranice to raditi to preko mail forme neko nam može putem maila poslati za ovo "pošaljite skicu" možemo to i maknuti no dobro tako i tako smo u prototipu i prije release-a javnog ću ja detaljno pročitati svaki tekst koji si napisao ručno te ispraviti te ako treba još šta stilski i vizualno i gramatički." So sketches and drawings come by email, not through the site ([ADR 0020](../decisions/0020-drawings-arrive-by-email.md)); "Pošaljite skicu" stays in the prototype and may go; and before the public launch the client reads and corrects every text by hand. "Nastaviti" in #28 stays as written until then.

Then the batch, verbatim:

> Uredi samo sekciju "Kako radimo". Raspored, razmaci i stil ostaju isti.
>
> 1. Zamijeni postojeće tri stavke ovima, doslovno i ovim redoslijedom:
>
> Razgovarate s onima koji rade
> Bez posrednika: pitanje ide ravno osobi koja radi na vašem projektu.
>
> Kažemo i kad nešto ne treba
> Ako vam nešto ne donosi korist, reći ćemo vam prije nego što to platite.
>
> Sve ostaje vaše
> Kod, crteži, domena i pristupi pripadaju vama, i ako jednog dana odete drugdje.
>
> 2. Potamni sivu boju opisa tako da ima kontrast najmanje 4.5:1 prema pozadini sekcije. Ako tu boju koriste i drugi sivi opisi na stranici, primijeni istu promjenu i na njih.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 31 | The answer above (sketches by email; the client proofreads every text before launch) | No code change. The site takes no file uploads; the contact form stays text only, and drawings and sketches come by email. | [ADR 0020](../decisions/0020-drawings-arrive-by-email.md); `PROGRESS.md` | New ADR 0020 | Recorded |
| 32 | Point 1 (quoted above) | The three commitments of "Kako radimo" are the client's, verbatim and in this order; the layout, spacing and style are unchanged. The third settles gap G2: the code, drawings, domain and access belong to the client's customer ([ADR 0021](../decisions/0021-the-customer-owns-the-work.md)). | `src/lab/copy.ts`, `docs/content.md`, `docs/information-architecture.md` | New ADR 0021 | Done; in review |
| 33 | Point 2 (quoted above) | The grey was already 5.16:1 on paper, above 4.5:1. As the client asked for it darker, the paper grey `--color-grey-on-paper` goes from `#5E6878` to `#4A5362`, the same blue-grey: **7.11:1** on paper (WCAG AAA) and 6.51:1 on the sunk paper of panels and disabled buttons. It is one token, so every grey text on paper follows: the lines in "Kako radimo" and "Tehničko crtanje", the taglines of "Što radimo", the team's note and roles, the audit's note, labels, the sheet's numbers and zone letters, and the disabled button. Text on navy keeps its own grey. Lab A–E keep the old grey as the round 1 and 2 record. | `src/styles/tokens.css`, `docs/brand.md`; the Figma variable follows with the Figma sync | None (a token value; [ADR 0015](../decisions/0015-design-direction-model-i-list.md) stands) | Done; in review |

**Batch 11 (2026-10-20): the closing call to action**

The client answered batch 10 first: "Ikone se smiju koristiti i dovršene su. Dopušteno je korištenje za njih makni cpa onaj kao za wordmark kako si maknuo, commitaj kao izvor ako želiš slobodno. Okvir lista ne znam na što misliš ali provjerimo to kasnije". The sheet's margin at 1920 px (#23) waits until then. Then the batch, verbatim:

> Uredi samo tamnoplavu završnu traku iznad footera. Boja pozadine i gumb ostaju isti.
>
> 1. TEKST: Zamijeni "Prvo jasnoća." ovim:
> Naslov: Imate skicu, stranicu ili samo ideju?
> Rečenica ispod naslova: Pošaljite nam što imate i javit ćemo vam se s prijedlogom.
> Gumb ostaje: Pošaljite upit
>
> 2. VELIČINA: Naslov mora biti manji od naslova u heroju. Koristi istu veličinu kao H2 ostalih sekcija ("Što radimo", "Kako radimo", "Tim") ili najviše 10 % veću. Rečenica ispod je u stilu leada ostalih sekcija, u svijetloj boji s kontrastom najmanje 4.5:1 prema tamnoj pozadini.
>
> 3. RASPORED: Naslov i rečenica čine jedan blok lijevo, gumb ostaje desno i vertikalno je centriran u odnosu na taj blok. Ograniči širinu teksta tako da naslov stane u najviše dva reda. Gornji i donji padding trake smanji proporcionalno manjem fontu, da traka ne ostane jednako visoka s praznim prostorom.
>
> 4. MOBITEL (ispod 900 px): naslov, rečenica pa gumb, jedno ispod drugoga, poravnato lijevo.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 34 | The answer above (the icons) | The nine icons in `Assets/codraft-icons/{png,svg}/` are finished and cleared for use. They carry no C2PA or other metadata (checked: the SVGs are plain, the PNGs hold only their colour chunks), so nothing was stripped; they are committed as the source. The SVGs already follow [brand.md](../brand.md#imagery): 48 × 48, real 1.5 px strokes in `currentColor`, square caps, the blue accent in `<g id="accent">`. Putting them on the services waits for the client's word. | `Assets/codraft-icons/` | The ADR comes when they go on the site | Source committed |
| 35 | Point 1, text (quoted above) | The heading is "Imate skicu, stranicu ili samo ideju?", with the lead "Pošaljite nam što imate i javit ćemo vam se s prijedlogom." under it; the button stays "Pošaljite upit" (to Kontakt). Files still come by email (ADR 0020). | `src/lab/copy.ts`, `docs/content.md`, `docs/information-architecture.md` | None | Done; in review |
| 36 | Point 2, size (quoted above) | The heading is a plain zone `h2`, the size of "Što radimo", "Kako radimo" and "Tim" (48 px at most, was the hero's 72 px). The lead has the other zones' lead style, in the navy surface's own ink, off-white: 15.84:1. | `src/lab/home/HomeClosing.astro` | None | Done; in review |
| 37 | Point 3, layout (quoted above) | One block on the left (heading and lead, at most 40rem wide, so the heading takes one or two lines and never more), the button on the right, centred on the block. The zone's top and bottom padding is two thirds of the others', as the heading is two thirds of its old size (48 of 72 px). | `HomeClosing.astro` | None | Done; in review |
| 38 | Point 4, phones (quoted above) | Below 900 px: heading, lead, button, one under the other, aligned left. | `HomeClosing.astro` | None | Done; in review |

The style page's navy sample (`StyleClosing.astro`) shows the same band, so it follows.

**Batch 12 (2026-10-20): the closing call to action, centred**

The client's message, verbatim:

> Uredi samo raspored tamnoplave završne trake. Tekst, boje i veličine fonta ostaju isti.
>
> 1. Sve centriraj horizontalno: naslov, ispod njega rečenica, ispod nje gumb.
> 2. Na desktopu naslov stoji u jednom redu. Rečenica ima max-width najviše jednak širini naslova, s text-wrap: balance.
> 3. Razmak između rečenice i gumba neka bude otprilike 1.5 puta veći od razmaka između naslova i rečenice.
> 4. Gornji i donji padding trake su jednaki.
> 5. Na mobitelu sve ostaje centrirano, a naslov se smije lomiti uz text-wrap: balance.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 39 | Points 1 and 2 (quoted above) | Heading, lead and button centred, one under the other; this replaces the left block and right button of #37 and the 40rem cap. From 900 px the heading has room for one line (it fits from about 900 px at its size there), and nothing forces it, so zoomed text can still wrap. The lead takes no width of its own: it is exactly as wide as the heading's block, so never wider than the heading, and balanced (`text-wrap: balance`). | `src/lab/home/HomeClosing.astro`, `src/lab/style/StyleClosing.astro` | None | Done; in review |
| 40 | Points 3 and 4 (quoted above) | Heading to lead 1rem, lead to button 1.5rem (1.5 times). The top and bottom padding stay equal (two thirds of a zone's, #37), and the heading's first line is trimmed to its cap height, so the space above the letters matches the space below the button. | `HomeClosing.astro` | None | Done; in review |
| 41 | Point 5 (quoted above) | On phones everything stays centred and the heading wraps balanced. | `HomeClosing.astro` | None | Done; in review |

**Batch 13 (2026-10-20): the service icons, options**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 42 | "U redu sada idemo na implementaciju ikona pošalji ako imaš ideju dvije opcije implementacije barem , i ako ima smisla neka jednostavna animacija koja prati profesionalne standarde i traku u sredini." | The nine icons, transcribed from `Assets/codraft-icons/svg/` into code (`src/lab/home/icons/`), on "Što radimo" in two options on a new comparison page, `/lab/ikone`; Home stays without icons until the client chooses. Both keep the central axis and put each icon on the side of the item that faces the line. **A „Iznad naslova“:** the icon above the title. **B „Uz tekst“:** the icon beside the title and its line, in its own column. The centred last service of stage 03 has its icon centred above it in both. Icons are 40 px, decorative (`aria-hidden`; the title carries the meaning), with a 1.5 px line on screen, navy ink and the blue accent from the surface's tokens. **The animation follows the line:** as the blue pen of the process line passes an icon's height, the icon draws itself stroke by stroke in its drawing order, then its blue drafting line runs out and the grip snaps in (the "Draw a line" and "Select" moments of [motion.md](../motion.md)). The icons below the line's end (stage 03) follow once it arrives, in reading order. One stroke of the pen, once; no fades or slides. Reduced motion and no JavaScript show the icons complete. | `src/lab/home/icons/`, `ServiceItem.astro`, `ServicesAxis.astro`, `chapters.ts`, `process-line.ts`, `src/lab/pages/ikone.astro`, `LabBar.astro`; [motion.md](../motion.md), [brand.md](../brand.md#imagery) | The client chooses an option; the ADR comes with it | Options in review |

**Batch 14 (2026-10-20): option B on Home, and the scroll animation of "Što radimo"**

The client's message: "Idemo na opciju B definitvno , no želim neke stvari malo promjeniti oko crte i samih animacija ikona", then the specification below, and: "Ovo uzmi samo kao prijedlog ako je koristan ako ne implementiraj na svoj način ali u prijevodu hoću to što je napisano sad kako točno implementiraš ostaje na dogovorenim pravilima i agentima za animacije i što već koristiš. Nastavi". The specification, verbatim:

> Preradi animaciju na skrol u sekciji "Što radimo". Raspored, ikone i postojeći stil iscrtavanja ikona potez po potez ostaju isti. Mijenjaš samo kako i kada se animacija okida.
>
> CILJ
> Plava crta se iscrtava malo ispred, a svaka ikona se iscrta kad do nje stigne crta, po stavci, kako stavka ulazi u ekran. Nikad ne smije djelovati zakašnjelo ili kao lag, i ništa se ne vraća kad se skrola prema gore. Bez scrubbinga.
>
> PRAVILA
> 1. Tekst (naslovi, opisi, naslovi faza) uvijek je odmah vidljiv. Animiraju se samo crta i ikone. Nikad ne skrivaj tekst i ne fadeaj ga dok čeka animaciju.
> 2. Koristi IntersectionObserver, ne scroll listenere. Prati svaki red stavki. Okidanje je kad vrh reda prijeđe ~85 % visine ekrana (rootMargin: "0px 0px -15% 0px"). Nakon okidanja prestani pratiti taj red (unobserve). Svaka stavka se animira samo jednom.
> 3. CRTA: jedan element animiran preko transform: scaleY() s transform-origin: top (nikad ne animiraj height). Svaki okinuti red postavlja ciljni napredak na svoju vertikalnu poziciju uz crtu. Napredak samo raste: cilj = max(trenutni, novi). Tranzicija: 280ms, cubic-bezier(0.2, 0.8, 0.2, 1).
> 4. IKONA: počinje se iscrtavati 120ms nakon okidanja reda, dok se crta još kreće, ne nakon što završi. Potezi ikone iscrtavaju se s pomakom od ~60ms po potezu, redoslijedom kao u DOM-u. Ukupno iscrtavanje ikone najviše ~450ms. Sve od okidanja do gotove ikone mora trajati manje od 700ms.
> 5. Stavke u istom redu (lijevo i desno od crte) okidaju se zajedno. Desna ikona smije krenuti ~40ms nakon lijeve.
> 6. Ako se više redova okine odjednom (brzi skrol, visok ekran), svaki sljedeći red pomakni za 60ms, umjesto da se izvode jedan za drugim punim trajanjem.
> 7. Redovi koji su već iznad ekrana u trenutku praćenja (reload usred stranice, skok preko linka u navigaciji) odmah se prikazuju u konačnom iscrtanom stanju, bez animacije, a crta odmah skoči do najdaljeg takvog reda.
> 8. Iscrtavanje ikona: dodaj pathLength="1" na svaki element poteza i animiraj stroke-dashoffset s 1 na 0, uz stroke-dasharray: 1. Bez mjerenja preko getTotalLength.
> 9. Početno neiscrtano stanje postavlja JS (dodaj klasu poput .anim-ready na sekciju prije prvog prikaza). Bez JS-a sve je vidljivo i potpuno iscrtano.
> 10. prefers-reduced-motion: reduce → sve odmah iscrtano, bez tranzicija, crta u punoj visini.
> 11. will-change koristi samo tijekom aktivne animacije i makni ga nakon nje.
> 12. Na mobitelu, gdje je raspored u jednom stupcu, primijeni istu logiku na istu crtu i redove.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 43 | "Idemo na opciju B definitvno" | Option B „Uz tekst“ is on `/lab/pocetna`: each service's icon beside its title and line, on the side facing the line. `/lab/ikone` stays as the record. | `src/lab/pages/pocetna.astro`, `src/lab/pages/ikone.astro` | [ADR 0022](../decisions/0022-service-icons-on-home.md) adopts the icons | Done; in review |
| 44 | The specification above | Implemented as specified, on the project's rules: <br>- **Rows:** an IntersectionObserver watches every service; services that cross the trigger together (one row on wide screens, one service on phones) start together, the right icon 40 ms after the left, each further row in the same batch 60 ms later. Each is unobserved once it starts and never animates again. <br>- **The line:** one element from bubble 01 to bubble 03, scaled with `scaleY()` from its top. Each started row moves its target to the row's icon (the line's end for the services below it); it only grows, over 280 ms on a quick-start, soft-stop curve, new motion tokens `--motion-follow` and `--ease-follow`. `will-change` is on only while it moves. <br>- **The icons:** each starts 120 ms after its row, while the line is still moving; its strokes run in DOM order with `pathLength="1"` and `stroke-dashoffset`, at most 60 ms apart, the blue line last, then the grip snaps in (`--motion-fast`, `--ease-spring`, the grips' own motion). Each icon takes at most 450 ms, so a row is done within 610 ms of its trigger. <br>- **Above the screen at load** (a reload mid-page, a jump from a link): those services show their icons complete at once, and the line jumps to the furthest of them. <br>- **The waiting state** is set under the `js` class from the first paint (the existing pattern, so nothing flashes). The text is never hidden. Without JavaScript the per-stage rails show the complete line and the icons are complete; with reduced motion the line is at full length and the icons complete, with no transitions. The same logic runs on phones, with the line on the left. <br>This replaces the one stroke at a constant speed of batch 3 (#8) on the chosen option; options 1 and 2 on `/lab/sto-radimo` keep it as their record. | `src/lab/home/axis-line.ts` (new), `icons/icon-draw.ts`, `ServicesAxis.astro`, `services.css`, `process-line.ts`; `src/styles/motion.{css,ts}`; [motion.md](../motion.md) | ADR 0022 | Done; in review |

**Batch 15 (2026-10-20): the line, smoother**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 45 | "Vidim animaciju no nije lijepa i gradualno da raste crta nego se u dijelovima animira u milisekundi odnosno ne prati lijepo ekran ako me razumiješ , želim da to izgleda više smooth naravno brzo i kako treba ali ne baš da trza od dijela do dijela , na primjer ovdje jedno vrijeme animira se prvi dio praktiči meni okom kad gledma instant i onda odjendom pukne crtu plavu skroz dolje iako se same ikone pravilno animiraju ali sama crta mi djeluje da treba popravak. fixaj to" (with two screenshots) | The line moved only when a row started, and then jumped the whole way to it in 280 ms, across the stage heads. Now its tip follows the screen continuously: it reaches down to 85 % of the screen's height as you scroll, eased so a fast scroll is caught up in about `--motion-follow` (280 ms) and never in a jerk. It still only grows. Each icon starts as the tip reaches it (the right one of a row 40 ms later), so "the line arrives, then the icon draws" holds exactly; the services below the line's end start when the screen's 85 % mark reaches them. A jump past services (a reload mid-page, a link) still shows them complete at once. An IntersectionObserver switches the scroll handling on only while the section is near the screen; the work per frame is one measurement. `--ease-follow` is no longer used and is removed. | `src/lab/home/axis-line.ts`, `services.css`; `src/styles/motion.{css,ts}`, the style page; [motion.md](../motion.md) | New [ADR 0023](../decisions/0023-process-line-follows-the-screen.md), superseding point 3 of ADR 0022 | Done; in review |

**Batch 16 (2026-10-20): ideas from the Impeccable skill**

After a critical evaluation of the outside skill Impeccable ([research](../research/2026-10-20-impeccable-skill.md)), the client asked: "implementiraj točke 1-4 kako si i sam naveo koje imaju koristi za naš projekt". The skill itself is not installed.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 46 | Point 1: what the browser draws | Selected text sits on a tint of the brand blue, like a selection in CAD: `#C4D3F5` on paper and `#1D3F8C` on navy, always in the surface's ink (navy 11.50:1, off-white 8.98:1). The text cursor in fields is the brand blue. Both pairs are in the contrast tests and on the style page. The critic checks these details (criterion 8), and the capture shows selected text on paper and on navy. | `src/styles/tokens.css`, `base.css`, `tokens.test.ts`; `src/lab/style/style-data.ts`; `scripts/design-capture/capture.mjs`; `.claude/agents/design-critic.md`; [brand.md](../brand.md#colour) | [ADR 0025](../decisions/0025-browser-details-and-critique-re-check.md) | Done; in review |
| 47 | Point 2: more space above a heading than below | A critic check (criterion 4). The capture's metrics now give each text block's height, so the critic can measure it. | `design-critic.md`, `scripts/design-capture/measure.mjs` | ADR 0025 | Done |
| 48 | Point 3: re-checking fixes | After approved changes, the critic scores each addressed finding resolved, partial or unresolved from a new capture and names at most three regressions. The session's account of its fixes is not evidence. | `design-critic.md` ("Re-check"), [design-critique.md](../design-critique.md) step 7 | ADR 0025 | Done |
| 49 | Point 4: reduced motion keeps meaning | Reduced motion removes movement, not meaning: states and feedback stay visible. Added to the motion rules and as a critic check (criterion 7). | [motion.md](../motion.md#reduced-motion), `design-critic.md` | ADR 0025 | Done |

**Batch 17 (2026-10-20): Emil Kowalski's skills in the setup**

After a critical evaluation of the outside collection emilkowalski/skills ([research](../research/2026-10-20-emil-kowalski-skills.md)), the client asked to add the recommended skills to the existing skills and rules, and to change nothing else for now: „samo htio da dodaš ovaj emil kowalski paket skilova koji treba … u postojeće skilove i pravila, ništa ne mijenjamo drugo za sad“.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 50 | Add the recommended skills, globally and to the rules | `animate`, `animation-performance`, `mobile-native` and `break-ui` added to `~/.claude/skills/`, adapted (project tokens and decisions first; content-site baseline; Croatian worst cases). `motion-patterns` points CSS-only motion to `animate`; three lines in the global `web-standards.md`; the skills named in phases 2–5 of the workflow and in motion.md. No site code changed. | `~/.claude/skills/`, `~/.claude/rules/web-standards.md`, `.claude/rules/codraft-workflow.md`, [motion.md](../motion.md#skills) | [ADR 0026](../decisions/0026-emil-kowalski-skills-in-the-setup.md) | Done |
| 51 | „samo zapišeš kao razmatranje obje opcije testirati … kasnije odlučujem“ | The browser bar's colour (`theme-color`: navy or paper) recorded as an open consideration, with how to try both. | Open item 9 above | ADR 0026 | Open; the client decides |

**Batch 18 (2026-10-20): ideas from Taste Skill**

After a critical evaluation of the outside skill Leonxlnx/taste-skill ([research](../research/2026-10-20-taste-skill.md)), the client approved the proposal: „Odobravam“. The skill itself is not installed, and no site code changed. Before approving the last part, the client asked what the skill's browser inspector does exactly; running it waits for the client's word.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 52 | A1–A5: five critic checks | The frame of a page, computed from `metrics.json` (criterion 4); the idea reaching the last zone and every page, and sameness of layouts (criterion 2); the costume test for the drafting language and three levels of detail in drawings (criterion 6); Croatian number-and-unit details and the character budget of a long heading (criterion 3). | `.claude/agents/design-critic.md`, [design-critique.md](../design-critique.md) | [ADR 0027](../decisions/0027-taste-skill-ideas-in-the-setup.md) | Done |
| 53 | B1–B3: the `animate` skill | Scroll-driven CSS animation and cross-document view transitions, with recipes; the values measured on award sites; readable-text limits; three "never ship" rows; the scroll-reveal recipe gated under `.js` and `no-preference`. | `~/.claude/skills/animate/` (backup in `~/.claude/backups/2026-10-20-taste-skill/`) | ADR 0027 | Done |
| 54 | C1: phase 3 | Each page starts with its argument: one claim and its verifiable proof per zone (ADR 0004). | [3-pages.md](3-pages.md#steps-for-each-page) | ADR 0027 | Done |
| 55 | D: `theme-color` | Taste Skill's rule, "the meta theme colour follows the first field", recorded as an argument for the paper option of open item 9. Nothing changes. | Open item 9 above, the research note | — | Open; the client decides |
| 56 | „njihov inspect radi što točno prije nego odobrim“ | Explained to the client: what it opens, measures, writes and deletes. The client approved one run on `/lab/pocetna` in a new session: „U redu daj mi compact prompt za pokretanje u novoj sesiji tog inspecta“. Run once on 2026-10-20 (11 FAIL, 4 WARN), output in the scratchpad only, nothing fixed. Most failures are the client's direction (rules, 01/02/03, icons, no photographs, the off-white, the hero sentence) or false positives (the graph paper's gradients, the title block's cell lines, margins skewed by the lab bar). The frame agrees with criterion 4; new is a density reading of "Što radimo" at 1440 px, a rest by eye. Three options put to the client. | [Research note](../research/2026-10-20-taste-skill-inspect.md), open item 10 | — | Done; the client chose in batch 19 (#59) |

**Batch 19 (2026-10-20, third refinements session): answers to the open items**

At the start of the session the open items were put to the client in Croatian. The client answered them in order:

> 1. Dorade riješimo na kraju kad popraviš ostalo:
> 2. Odobravam popravak okvira lista na 1920px
> 3. 3D Prikaz tlocrta u sljedećem koraku može , bilo bi fora vidjeti 3d prikaz
> 4. nakon inspecta :
> gustoća ostaje kako je za sad
> dvije veličine slova rješavamo u fazi 3
> automatska mjera gustoće nema potrebe sad dodavati
> 6. Kasnije nakon što ovo popraviš ide design-critic na moju potvrdu
> 7. To isto kasnije kowalskijeva provjera
> 8. Kasnije isto

The question about "Pošaljite skicu" on Home (open item 5) was not answered; it stays as it is.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 57 | "Odobravam popravak okvira lista na 1920px" | The fix proposed in #23 (closes it): the sheet is at most `min(--sheet-max, 100% - 2 × --sheet-margin)` wide with auto side margins, so it keeps its margin at every width and centres past 1920 px; the media query at 120rem is gone. Measured on the dev server: at 1920 px the margins went from 0/0 px (the page 1924 px wide, so it scrolled 4 px sideways) to 24/24 px with no overflow, the hero's H1 from 72 to 71.9 px and still two lines; 375–1707 px unchanged; 1983 and 2560 px centred as before. Every page on the sheet follows (Home, 404, the lab's Home and style page); lab A–E have their own sheets and stay the record. | `src/components/ui/Sheet.astro` | None | Done; in review |
| 58 | "3D Prikaz tlocrta u sljedećem koraku može , bilo bi fora vidjeti 3d prikaz" | After the timelapse, the floor plan rises into a 3D model, on Home's option C (`model` on `PlanDrawing`; options A and B on `/lab/crtanje` keep the plan only). <br>- **The sequence** (about 2.9 s after the title block, 8 s in all): the finished plan holds 600 ms; the axes and dimensions switch off with their lamps (200 ms); the plan turns 45° and tilts back into an axonometric view (1200 ms, `--ease-pen`) as a paper floor fades in under it; then the walls rise from it (900 ms, `--ease-standard`), and the title block's "Tlocrt stana" becomes "3D model stana". "Iscrtaj ponovno" replays all of it. <br>- **The model:** the plan's own walls at 2.6 m, window sills at 0.9 m with the glass in a tint of the brand blue up to the 2.1 m head, lintels over every opening, and the four door leaves; seen from the south-west and about 53° above, so the living room is in front. The wall tops keep the plan's solid ink (the cut), the other faces are paper, those facing along x a 9 % shade darker. Built at build time from the same data as the plan (`plan-model.ts`, in the projection of `plan-projection.ts`), painted back to front; only `transform` and `opacity` animate (each side scales up from the floor, each top slides up with it). <br>- **The final state is the 3D view:** without JavaScript, with reduced motion, or when the drawing is already in view at load. The drawing's accessible name says the plan is raised into a 3D model. <br>Compared before choosing: walls cut at 1.2 m like the plan (less of a building) and a view from the south-east (the small rooms in front, harder to read). | `src/lab/home/PlanDrawing.astro`, `plan-timelapse.ts`, `plan-model.ts` (new; the plan's walls, windows and doors moved here), `plan-projection.ts` (new), `plan-model.test.ts` (new), `drafting/DraftingLegend.astro`, `src/lab/copy.ts`; `docs/content.md`, [motion.md](../motion.md) | None | Done; in review |
| 59 | "gustoća ostaje kako je za sad / dvije veličine slova rješavamo u fazi 3 / automatska mjera gustoće nema potrebe sad dodavati" | No change. The three options of the inspector's run ([research note](../research/2026-10-20-taste-skill-inspect.md#proposed-for-the-client)): (1) "Što radimo" keeps its density at 1440 px; (2) `--step-service` and `--step-heading` are settled in phase 3, when "Što radimo" leaves the lab ([3-pages.md](3-pages.md#content-specifics)); (3) no density measure for the critic. | `docs/phases/3-pages.md` | None | Recorded |
| 60 | "Dorade riješimo na kraju kad popraviš ostalo"; "Kasnije nakon što ovo popraviš ide design-critic na moju potvrdu"; "To isto kasnije kowalskijeva provjera"; "Kasnije isto" | The order of the rest of the review: first #57 and #58; then the critic's first run on the client's word; the Kowalski proposals and `theme-color` later; the client's own further refinements at the end. | Open items under [Handover](#handover-2026-10-21) | None | Recorded |

**Batch 20 (2026-10-20): the sketch button, and options for the 3D view**

The client's message, verbatim:

> Pošaljite skicu gumb nije potreban jer postoji mail kontakt forma koja će biti logički smislena da svaki korisnik dobije što želi.
> Defign critic kasnije smo rekli
> Idemo ovako prikaži mi dvije tri 3d opcije ova za sad je ok no idemo isprobati još dvije tri opcije:
> Ovu opciju za sad spremi ( ako ostanemo na njoj ) no prikaži mi i povratak na tlocrt opciju nakon 3d prikaza te možda ne znam ima li smisla kako prelazi u 3d da se i krov vidi kako se stavlja ako razumiješ što mislim .
>
> Te dvije mi opcije prikaži s ovom trenutnom pa usporedim i odlučim

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 61 | "Pošaljite skicu gumb nije potreban jer postoji mail kontakt forma koja će biti logički smislena da svaki korisnik dobije što želi." | The button is gone from the drafting zone (option C, on Home and on `/lab/crtanje`). Sketches and requests go through the contact form and email (ADR 0020). | `src/lab/home/drafting/DraftingLegend.astro`, `src/lab/copy.ts`; `docs/content.md`, `docs/information-architecture.md` | As [ADR 0020](../decisions/0020-drawings-arrive-by-email.md) point 3 allowed; no new ADR | Done; in review |
| 62 | "Defign critic kasnije smo rekli" | No change: the critic's first run stays later, on the client's word (#60). | — | None | Recorded |
| 63 | "prikaži mi dvije tri 3d opcije … Ovu opciju za sad spremi … prikaži mi i povratak na tlocrt opciju nakon 3d prikaza te … da se i krov vidi kako se stavlja … Te dvije mi opcije prikaži s ovom trenutnom pa usporedim i odlučim" | Three options on a new comparison page, `/lab/tlocrt-3d`, numbered so they don't mix with the drafting zone's A–C. Each is the drafting zone as on Home; the plan, the switch-off, the tilt and the rise are the same, the end differs: <br>- **1 „Ostaje u 3D-u“:** the current one (#58); it stays on Home until the client chooses. <br>- **2 „Povratak na tlocrt“:** the 3D view holds 2.4 s, the walls go down (700 ms), the plan turns back (1000 ms, `--ease-pen`) and the axes and dimensions switch on again with their lamps; the final state is the plan. <br>- **3 „S krovom“:** once the walls are up, a pitched roof (35°, the ridge along the long side, 30 cm overhang, gables, lines of roofing down the slopes) comes down onto them (700 ms, `--ease-standard`), and a "Krov" layer switches on in the list. A flat has no roof of its own, so the drawing becomes a house: "Tlocrt kuće" and "3D model kuće". The final state is the house with its roof. <br>The roof is built at build time like the model (`roofDrawing` in `plan-model.ts`: faces that face the viewer, from their normals); with the roof the model sits 2 units lower (`ROOF_VIEW`), so the roof fits the sheet; unit tests check it. Compared before choosing the pitch: 25°, 35° and denser roofing; 35° reads most clearly as a house and is a usual pitch in Croatia. | `src/lab/pages/tlocrt-3d.astro` (new), `src/lab/home/PlanDrawing.astro`, `plan-model.ts`, `plan-projection.ts`, `plan-timelapse.ts`, `plan-model.test.ts`, `drafting/DraftingLegend.astro`, `src/lab/copy.ts`, the lab bar, index and `astro.config.ts`; `docs/content.md`, [motion.md](../motion.md) | The client chose option 3 in #64 | Done; option 3 chosen |

**Batch 21 (2026-10-21): the roof, in colour**

The client's message, verbatim:

> Odabirem opciju s krovom no možeš li sada opciju s krovom recimo ponuditi mi 2 3 opcije max da pogledam različitih boja koje pašu uz naš brending da ima fasadu ( može i boja samo zidova neka ) i krov obojan ili neka jednostavna tekstura u boji svejedno

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 64 | "Odabirem opciju s krovom" | Option 3 „S krovom“ of #63 is on Home: the drawing is a house, and a roof comes down onto the walls. `/lab/tlocrt-3d` stays as the record and says which option was chosen. | `src/lab/home/drafting/DraftingLegend.astro` (`model` is "roof" by default), `src/lab/pages/tlocrt-3d.astro`; `docs/content.md`, `docs/information-architecture.md`, [motion.md](../motion.md) | The client chose option 3 (closes #63) | Done; in review |
| 65 | "ponuditi mi 2 3 opcije max … različitih boja koje pašu uz naš brending da ima fasadu ( može i boja samo zidova neka ) i krov obojan ili neka jednostavna tekstura u boji" | Three palettes for the house on a new comparison page, from the brand's own colours only (navy, paper and blue, mixed from the drawing's role tokens): the facade (the walls' outer faces and the gable) and the roof in colour, the roof keeping its lines as a simple texture. The rooms inside stay paper, so the interior reads while the walls rise. <br>- **1 „Svijetla fasada, tamnoplavi krov“:** the paper facade under a navy roof, like slate, its lines lighter. <br>- **2 „Tamnoplava fasada, svijetli krov“:** a navy facade with lighter joints under a pale metal roof with dark lines; the glass a stronger blue so it reads on navy. <br>- **3 „Plavi tonovi“:** a facade tinted with the accent under a deep blue roof, its lines in the accent; the roof was toned down from a brighter first try. <br>The colours are CSS variables on the drawing (`--facade`, `--facade-shade`, `--facade-line`, `--roof`, `--roof-shade`, `--roof-line`, `--glass`), mixed from `--drawing-ink`, `--drawing-fill` and `--accent`; a palette class only sets them, and without one the house stays paper (Home until the client chooses). The model marks the walls' outer sides (`outer` in `plan-model.ts`, on the flat's outline; a unit test). | `src/lab/pages/kuca-boje.astro` (new), `src/lab/home/PlanDrawing.astro`, `plan-model.ts`, `plan-projection.ts`, `plan-model.test.ts`, `drafting/DraftingLegend.astro`, the lab bar, index and `astro.config.ts` | The client chose palette 1 in #66 | Done; palette 1 chosen |

**Batch 22 (2026-10-21): the palette**

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 66 | "Biram paletu 1." | Palette 1 „Svijetla fasada, tamnoplavi krov“ is on Home: the paper facade under a navy roof with lighter roofing lines. `DraftingLegend` defaults to it, so the drafting zone on `/lab/crtanje` and option 3 on `/lab/tlocrt-3d` show it too; `/lab/kuca-boje` stays as the record and says which palette was chosen. | `src/lab/home/drafting/DraftingLegend.astro`, `src/lab/pages/kuca-boje.astro`; `docs/information-architecture.md` | The client chose palette 1 (closes #65) | Done; in review |

The client then asked what is left of phase 2 („Nakon toga mi reci ostaje li još što u ovoj fazi 2 ?“). The answer: the client's own refinements if any, the critic's first run, the Figma sync, the final checks and the report; English proposed for phase 3; the "later" items not blocking the phase.

**Batch 23 (2026-10-21): the rest of phase 2, and what moves to phase 3**

The client's message, verbatim:

> Odlično ažuriraj dokumentaciju da u novoj sesij svježoj krenemo na design critica da pokreneš, i sve ostalo što ostaje do kraja faze 2.
> Neke stvari odmah mogu odgovoriti prije nego pređemo na novu sesiju .
> Moje daljne dorade za sad ih nema.
> Usklađivanje  figme nakon design critica
> Završne provjere onda kronološki nakon figme
> Engleski tekst u fazi 3 slažem se
> Ovo što ide kasnije :
> prijedlozi iz kowalskijevih skillova isto možemo u fazi 3 jer tkao i tako tad radimo sve stranice
> boja trake preglednika probati ćemo kasnije isto u fazi 3
> moje čitanje i ispravljanje generičkih tekstova isto kasnije ( na kraju faze 3 vjerovanto jer tkao i tako trebamo pregledati sve stranice zajedno )
> naslov u heroju na laptopima provjerimo u fazi 3 isto kad sve stranice odradimo

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 67 | "Moje daljne dorade za sad ih nema." | No change. The refinements are closed unless the client sends more. | — | None | Recorded |
| 68 | "Usklađivanje figme nakon design critica" + "u novoj sesij svježoj krenemo na design critica da pokreneš" | The order of the rest of phase 2: the critic's first run in the next session (the client's word for it), then the Figma sync. | [Handover](#handover-2026-10-21), steps 1–2 | None | Recorded |
| 69 | "Završne provjere onda kronološki nakon figme" | The final checks and the report come last. | [Handover](#handover-2026-10-21), step 3 | None | Recorded |
| 70 | "Engleski tekst u fazi 3 slažem se" | The English copy (S17–S19 and every Croatian change of this review) is aligned in phase 3, page by page, as each page is built in both languages. It replaces "at the end of the review" (#12). | [3-pages.md](3-pages.md#carried-over-from-phase-2) | None | Moved to phase 3 |
| 71 | "prijedlozi iz kowalskijevih skillova isto možemo u fazi 3 jer tkao i tako tad radimo sve stranice" | The four proposals (a 320 px overflow check, worst-case data in the phase documents, a motion-code checklist, a variant picker with replay) are considered in phase 3. | [3-pages.md](3-pages.md#carried-over-from-phase-2) | None | Moved to phase 3 |
| 72 | "boja trake preglednika probati ćemo kasnije isto u fazi 3" | The browser bar's colour (navy or paper) is tried on a real Android phone in phase 3. | [3-pages.md](3-pages.md#carried-over-from-phase-2) | None | Moved to phase 3 |
| 73 | "moje čitanje i ispravljanje generičkih tekstova isto kasnije ( na kraju faze 3 vjerovanto … )" | The client reads and corrects every text at the end of phase 3, all pages together; it is now an exit criterion of phase 3. | [3-pages.md](3-pages.md#exit-criteria) | None | Moved to phase 3 |
| 74 | "naslov u heroju na laptopima provjerimo u fazi 3 isto kad sve stranice odradimo" | The hero's three lines on 1440 px laptops are checked in phase 3, once every page is built. | [3-pages.md](3-pages.md#carried-over-from-phase-2) | None | Moved to phase 3 |

**Batch 24 (2026-10-21, fourth session): the critique's findings, part A**

The first critique ([research note](../research/2026-10-21-design-critique-home.md)) went to the client in three groups: A, fixes that touch no decision (1, 2, 4, 7, 8–11, 15–18); B, questions that touch the client's decisions (3, 5, 12, 13, 20, 21); C, proposed for phase 3 (6, 14, 19, 22). The numbers are the note's. The client answered A, verbatim:

> A popravci - Odobravam popravak 1.blokirajućeg logotipa
> 2. 10 linkova koji tako ne izgledaju , opcija A tanko podcratavanje za sad
>
> 4. Važno : Idemo opcijom A isto tako animacije čekaju jedna drugu , ako korisnik brže skrola brže su i animacije onda pretpostavljam ?
>
> 7. Važno isti elemnt u dva stila : Popravi i sekciju što radimo , predloži par opcija popravka te sekcije , možda i crtu lijevo premjestiti ili malo prerasporediti boxove dosta prazno i sitno sekcija sa središnjom crtom izglda iako je sama ideja središnje crte fora.
>
> 8. Odobravam ravnomjernu rasporedbu redova
> 9. Odobravam jednoredni datum
> 10. Slažem se da jke isti link kao u hero sekciji.
> 11. Odobravam popravak skrivenih crtica
> 15. Odobravam i taj popravak
> 16. Odobravam i taj popravak nakon što mi skrinaš kako izgleda taj popravak da vidim o čemu točno pričamo
> 17. Odobravam linkove kroz 200ms zbog mobitela kako predviđa motion.md
> 18. Objasni što su prvo gripovi u zaglavlju
>
> Ovako sada sam napisao sve što se tičke točke A , zahtjevam ovako ne sve odjednom popravljamo cjelinu po cjelinu , B i C točke kasnije razrješavao prvo zapiši B i C koje treba rješiti poslje ovoga.
> Što se tiče točke A na koju sam kompletno odgovorio - popravi sve do 8. znači 1. , 2. , 4. , 7. nakon toga stani i javi. Pa onda ako sam zadovoljan idemo dalje na ostale u točki A

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 75 | "ne sve odjednom popravljamo cjelinu po cjelinu"; "popravi sve do 8. znači 1. , 2. , 4. , 7. nakon toga stani i javi" | The order of the fixes: first 1, 2, 4 and 7, then a report and a stop; then the rest of A (8–11, 15–18) on the client's word; then B; then C. The critic's re-check follows the approved fixes (design-critique.md, step 7). | — | None | Recorded |
| 76 | "Odobravam popravak 1.blokirajućeg logotipa" (critique 1) | The title block's wordmark gets its clear space: 24 px (`--space-5`) on every side of its cell, at least the height of its "c" (about 20.5 px). | `src/components/site/Footer.astro` | None | Done; in review. Measured: 24 px at 375–1024, 24 px left and 39 px above and below from 1440 (the cell is as tall as its row) |
| 77 | "10 linkova koji tako ne izgledaju , opcija A tanko podcratavanje za sad" (critique 2) | The titles that link (7 in "Što radimo", 3 in "Tehničko crtanje") are underlined at rest with the base link style (1 px, 2 px on hover), in ink; the design system's `Item` gets the same. | `src/lab/home/ServiceItem.astro`, `src/components/ui/Item.astro` | None | Done; in review |
| 78 | "Idemo opcijom A isto tako animacije čekaju jedna drugu , ako korisnik brže skrola brže su i animacije onda pretpostavljam ?" (critique 4) | One drawing moves on the screen at a time (motion.md principle 2). A part that reaches its trigger while another is moving on screen waits for it; meanwhile the moving part plays at double speed, and the waiting part plays at double speed when its turn comes, so a fast scroll gives faster drawings. A part that has left the screen by its turn shows its final state at once. A replay starts at once. A zone's letter moves with its selection (`data-draw-with`). Checked with motion on at 1440 px: the audit's selection hurries when its steps reach their trigger, the steps follow, and after a jump to the end no part passed is left hidden. | `src/components/ui/draw.ts`, `ZoneMark.astro`; [motion.md](../motion.md#principles) | None | Done; in review |
| 79 | "Popravi i sekciju što radimo , predloži par opcija popravka te sekcije , možda i crtu lijevo premjestiti ili malo prerasporediti boxove dosta prazno i sitno sekcija sa središnjom crtom izglda iako je sama ideja središnje crte fora." (critique 7) | The service titles take the heading style everywhere (the heading width and weight, as in "Kako radimo"). Options for the layout of "Što radimo" on a new comparison page, `/lab/sto-radimo-2`, for the client to choose; Home keeps the central axis until then. Every option has the same copy and motion, with the icons at 48 px from 64rem (their grid's own size, the line at 1.5 px); phones keep the line down the left in all of them. The current layout comes first for comparison. <br>- **1 „Os lijevo“:** the line down the left, as on phones; the services in two columns, left-aligned, and from 80rem each stage's head beside its services. 1104 px tall at 1440 (now 1625). <br>- **2 „Središnja os, naizmjence“:** the line stays in the middle; each stage's head beside its bubble and its services on the other side, the sides alternating; from 80rem two services a row with the icon above the title. 1424 px at 1440. <br>- **3 „Tri stupca“:** from 80rem the three stages side by side, the line across through their bubbles; it draws once at a constant speed when it reaches 85 % of the screen, and a stage's icons draw once the pen has reached its bubble and they are on screen (`axis-row.ts`); narrower, as option 1. 995 px at 1440. | `ServiceItem.astro`, `drafting/DraftingLegend.astro`, the design system's `Item.astro`; `ServicesAxis.astro` (`layout`), `axis-row.ts` (new), `axis-line.ts`, `services.css`, `src/lab/pages/sto-radimo-2.astro` (new), the lab bar, index and `astro.config.ts` | The client chooses an option | Title style done; the layouts not chosen (#102), code removed (#104) |
| 80 | Critique 8, 9, 10, 11, 15 and 17: "Odobravam …" | Approved; made after the first four, on the client's word. | — | None | Approved; next |
| 81 | "16. Odobravam i taj popravak nakon što mi skrinaš kako izgleda" | The caption under the drawing on phones: a screenshot first, then the change. | — | None | Screenshot next |
| 82 | "18. Objasni što su prvo gripovi u zaglavlju" | Explained in the report. | — | None | Answer next |
| 83 | "B i C točke kasnije razrješavao prvo zapiši B i C koje treba rješiti poslje ovoga" | Open after A, for the client to resolve: **B** 3 (the layer list), 5 ("Što radimo" on phones), 12 (the plan's length), 13 (the second column's grid), 20 (the hero's drawing), 21 (the drafting zone's breakpoint); **C** 6 (the hero at 1024), 14 (the team strip), 19 (values off the token scale), 22 (copy). | [Research note](../research/2026-10-21-design-critique-home.md#verified-findings) | — | Open |

**Batch 25 (2026-10-21): the easy fixes of group A, and more central-axis options**

The client's message, verbatim:

> Dobro idemo ovako zadovoljan sam napravljenim , Što se tiče opcija sekcija Što radimo , nisam uopće siguran vizualno najviše fora izgleda središnja os jer je neobična , ali ja je vizualno ne mogu dobiti da mi sve odgovara i da nema previše praznog prostora i da nije presitna i da je lako čitljiva nisam siguran kako to izvesti. ( Ako imaš ideju možemo još par opcija sa središnjom osi izvesti , možda obrubi oko text boxa , ili odvojenost drugačija šita od crte ili neke strelice da iz glavne crte se granaju kako se skrola kroz svaku fazu čak možda da se popuni taj prostor i povećanje malo fonta ) Smisli par opcija još da vidimo , ali ako ne dobijemo kako želim idemo na preporuku opcija 3.
>
> Što se tiče pitanja 18. , probati ćemo i sa gripovima u animaciji kada dođemo do tog dijela.
>
> Trenutno rješavamo ovako ono što je trivijalno i lako za rješiti u jednom potezu , 8. , 9. , 10. , 11. i 15. možda , pa nakon toga kada to rješiš idemo na sekciju što radimo s mojom idejom kako sam već rekao.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 84 | "zadovoljan sam napravljenim" | Fixes 1, 2, 4 and 7 (#76–79) approved. | — | None | Approved |
| 85 | Critique 8 (approved in #80) | The services' lines and the steps' lines are balanced (`text-wrap: balance`), so a short block no longer ends on one word. | `src/lab/home/ServiceItem.astro`, `src/components/ui/Steps.astro` | None | Done; in review |
| 86 | Critique 9 (approved in #80) | The title block's date stays on one line. | `src/components/site/Footer.astro` | None | Done; in review |
| 87 | Critique 10 (approved in #80) | "Više o nama" takes the hero link's style: ink, medium weight, underlined. | `src/lab/home/HomeTeam.astro` | None | Done; in review |
| 88 | Critique 11 (approved in #80) | Every step of the floor plan's timelapse is hidden until its own start, so no hairline shows on the sheet before its element is drawn. Checked in frames of the timelapse with motion on (the axes drawn, the sheet otherwise clean). | `src/lab/home/PlanDrawing.astro` | None | Done; in review |
| 89 | Critique 15, "možda" (approved in #80) | Two line weights in the 3D house, as in a drafted axonometric: the building's mass (the outer walls and the roof) at 1.5 px, the details (windows, glass, roofing, the rooms) at 1 px. A true silhouette only (a line around the house's outline) needs new geometry or an SVG filter, so it is not a one-step change; offered as a further step. The windows' glass keeps its 1 px accent line. | `src/lab/home/PlanDrawing.astro` | None | Done; in review |
| 90 | "Ako imaš ideju možemo još par opcija sa središnjom osi izvesti , možda obrubi oko text boxa , ili odvojenost drugačija šita od crte ili neke strelice da iz glavne crte se granaju kako se skrola … i povećanje malo fonta … ako ne dobijemo kako želim idemo na preporuku opcija 3" | Three more options with the central axis on `/lab/sto-radimo-2`, after options 1–3; if none suits the client, option 3 „Tri stupca“. All three have larger type from 64rem (the service's title about 24 px, its line the lead size, about 21 px at 1440) and 48 px icons; phones as now. <br>- **4 „Središnja os s okvirima“:** each service in a thin frame (`--line`), like a cell of a drawing; the cells fill their side of the line and a row's cells share their height; the grips land on the frame's corners on hover. <br>- **5 „Središnja os s granama“:** the services stand a branch's length from the line (`clamp(4rem, 9vw, 11rem)`), and a blue branch grows from the line to each one as the line reaches it, ending in a grip, like the drafting line in the wordmark; then the icon draws. The line runs on through the last stage's services and ends on the last branch. <br>- **6 „Okviri i grane“:** 4 and 5 together; the branch ends in a grip on the frame. <br>Checked with motion on at 1440 px: every icon and branch drawn, the line complete, no console errors; axe clean and no overflow at 375–1920 px. | `ServicesAxis.astro` (`frames`, `branches`, `framed`; the class `axis--central`), `ServiceItem.astro` (`branch`), `axis-line.ts` (the line through the services, `BRANCH_MS`), `services.css`, `src/lab/pages/sto-radimo-2.astro` | The client chooses | Not chosen (#102); code removed (#104) |
| 91 | "Što se tiče pitanja 18. , probati ćemo i sa gripovima u animaciji kada dođemo do tog dijela." | Critique 18: the grips on the header's links are tried when the rest of group A comes (with 16 and 17). | — | None | Later |

**Batch 26 (2026-10-21): the rest of the critique in a new session**

The client's message, verbatim:

> Dobro zapiši ovako opcije 15 na dalje odnosno ostale iz točke A te B i C rješavamo u novoj sesiji , odnosno u trenutku kada rješimo sekciju Što radimo , zapiši to prvo pa ti kažem što mislim o generiranim opcijama

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 92 | "opcije 15 na dalje odnosno ostale iz točke A te B i C rješavamo u novoj sesiji , odnosno u trenutku kada rješimo sekciju Što radimo" | The order of the rest of the critique: first the client's choice for "Što radimo" (#79, #90) in this session. Then, in a new session, the rest of group A (15 is done in #89, so 16, 17 and 18, the grips on the header's links included, #91), then group B (3, 5, 12, 13, 20, 21) and group C (6, 14, 19, 22), as listed in #83. The critic's re-check follows the approved fixes; then the Figma sync and the final checks (Handover, steps 2–3). | [Handover](#handover-2026-10-21), step 1 | None | Recorded |
| 93 | "pa ti kažem što mislim o generiranim opcijama" | The client's view of the options on `/lab/sto-radimo-2` comes next. | — | — | Answered in batch 27 |

**Batch 27 (2026-10-21): "Što radimo" as a branching tree**

The client sent a sketch drawn over option 6's frames ([batch27-client-sketch.png](screenshots/phase-2/review/batch27-client-sketch.png)) with this message, verbatim:

> Pogledaj kako sam na draftu zamislio , znači ne doslovno pravi kutevi i pravilno 100% raspoređeni elementi , nego kao drvo koje se grana reicmo , naravno opet da ima neku pravilnu strukturu ali nadam se da iz ove slike možeš zaključiti prema kuda bih probao napraviti redizajn sa strelicama.
>
> Ponudi mi takvih par opcija novih koje bi mogle u tom smjeru ići naravno s animacijama kao do sad da prate jedna drugu.
>
> Isto tako u jednoj opciji dodaj nepravilnu pozadinu koja nije na 100% opacitya da ne upada prejako u oči ali da paše ajmo reći strukturi grananja i tematikom ostatka stranice.
>
> U prijevodu prerađujemo opciju 5 u par smjerova različitih da vidim što bi moglo najbolje ispasti.

What the sketch shows: the line down the middle; each stage's head in a tinted box on the line (01 Planiranje, the middle box, 03 Održavanje i rast); the services in tinted boxes left and right of the line, of different widths and distances from it, the right one of a pair a little lower; from the line, curved branches that leave it downwards, turn level and end in an arrow at each service; under 03, three arrows (left, down, right). Read as: the middle box on the line is stage 02's head (it holds an AI box as a placeholder), and the three arrows under 03 are its three services, the third under the line, which ends in an arrow into it.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 94 | "kao drvo koje se grana … naravno opet da ima neku pravilnu strukturu … redizajn sa strelicama"; "Ponudi mi takvih par opcija novih"; "prerađujemo opciju 5 u par smjerova različitih" | New options on `/lab/sto-radimo-2`, reworking option 5 as a branching tree, after the sketch: the stage heads in boxes on the line; the services in boxes left and right, the right one of a pair lower and each a different distance from the line; a branch from the line to each service ending in an arrow; under the last stage the line ends in an arrow into its last service. Larger type and 48 px icons as in options 4–6; phones as now. Each option tries one direction: **7 „Stablo“** (curved branches and open arrows, as in the sketch, the boxes tinted), **8 „Stablo s tehničkim strelicama“** (the branches as the leader lines of a technical drawing, a 45° slant then level, with a drawing's filled arrow; the boxes in thin frames, like the cells of a drawing), **9 „Stablo s podlogom“** (7 with the ground of #95). <br>How it is built: each box is as wide as its text (at most 28rem) and its lines fill it; the columns stand `clamp(3rem, 12vw - 4rem, 9rem)` from the line; the distances, the drops and the curves follow a cycle of four services, shifted stage by stage, so the tree is irregular but repeats. A branch is the service's own `.service__branch`: a rounded corner of its box (7, 9) or a slant and a shoulder (8), laid out for the right column and turned over for the left; the arrow's tip touches the box. Without JavaScript or with reduced motion the last stage's rail runs behind the centred box, so the line still ends at its arrow. <br>Height at 1440 px: 7 and 9 1825, 8 1841 (option 5 1678, now on Home 1625); 1773 at 1024. Checked: final state at 375–1920 px, axe clean and no overflow at every width, no console errors; with motion on at 1440, all 9 branches, arrows and icons drawn and the line at its end in each option; options 5 and 6 unchanged (9/9). Screenshots: `batch27-option7-1440.png`, `-option8-1440`, `-option9-1440`, `-option9-1920`, `-option7-1024`, `-option7-motion-1440` (a frame mid-motion). | `ServicesAxis.astro` (`tree`, `leaders`, `ground`; the class `axis--arrows`), `services.css` (the branch's wipe), `axis-line.ts` (`data-axis-into`; the branch's time from `data-axis-branches`, 360 ms in a tree), `src/lab/pages/sto-radimo-2.astro` | The client chooses | Not chosen (#102); code removed (#104) |
| 95 | "u jednoj opciji dodaj nepravilnu pozadinu koja nije na 100% opacitya da ne upada prejako u oči ali da paše ajmo reći strukturi grananja i tematikom ostatka stranice" | Option 9: an irregular ground behind the tree, at low opacity, shaped by the branching (wider where a stage branches, narrower at its head) and hatched like a section in a drawing. It does not move. Built as one outline in percentages of the tree (`clip-path: polygon()`), since the stages sit at much the same heights at every width; the hatch is the accent at 16 % on a 3 % tint. At 1920 px the ground reaches well beyond the boxes, at 1024 it stays mostly behind them. | as #94 | The client chooses | Not chosen (#102); code removed (#104) |
| 96 | "naravno s animacijama kao do sad da prate jedna drugu" | The motion as in option 5: the line follows the screen; when it reaches a service, its branch draws out from the line, the arrow snaps in, then the icon draws; one after another. Without JavaScript or with reduced motion everything is complete. The branch is uncovered from the line outwards along its course (a `clip-path` wipe, 360 ms, the pen's easing), since a curve can't be scaled out; the arrow snaps in after it (`motion-snap-in`); the arrow into the centred service snaps in when the service starts. | as #94 | None | Not chosen (#102); code removed (#104) |

**Batch 28 (2026-10-21): no boxes; option 9 in a few ways**

The client sent a close-up of the arrow into "Analitika i usklađenost" ([batch28-client-arrow.png](screenshots/phase-2/review/batch28-client-arrow.png)) with this message, verbatim:

> Nisi me dobro shvatio govorio sam samo o grananju i strelicama , nisam htio sive okvire , izgleda sad kao copy pastana slika a ne tekst na sranici.
>
> Što se tiče daljne prerade biti ću ovaj put konkretniji i detaljniji idemo ovako :
> Makni sive podloge , to nisam tražio nigdje ja sam ti samo u draft toolu copy pastao isječke slika jer mi je tako bilo najlakše.
>
> Druga stvar opcija 9 s nekom pozadinom mi se sviđa najviše idemo tu opciju razraditi , za početak makni sive okvire svugdje kako je i prije bilo, druga stvar opciju 9 razrađujemo sada još na par načina , sviđa mi se pozadina probaj ukomponirati kako već je slično samo sa malim izmjenama neka nepravilna krošnja možda nepravilnog oblika u tehničkom stilu neka bude , jedna opcija je kako je sad opcija 9 samo bez sivih obruba i proizvoljno izradi još opciju dvije kako ti misliš da bi bilo kvalitetno.
>
> Isto tako zadnju strelicu kod analitike nisi sto posto kalibrirao , par piksela izvan strelice ide glavna crta , tako da to popravi isto na svakoj od opcija.

The lesson, as in batch 7: the sketch's grey boxes were cut-outs of a screenshot, not a request; only the branching and the arrows were. A sketch the client pastes shows what they ask for, not everything in it.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 97 | "nisam htio sive okvire"; "Makni sive podloge"; "makni sive okvire svugdje kako je i prije bilo" | No boxes in any tree option (7–11), replacing the boxes of #94: the services and the stage heads stand on the page as text, as before; option 8's thin frames go too. Each head still hides the line where it passes behind the title, on the page's own ground. A service keeps a 12 px gap on the line's side, so its arrow stops short of the icon; the lines are balanced again (#85). Without the boxes the section is shorter: 1717 px at 1440 (1825 with the boxes, option 5 1678, Home now 1625), 1663 at 1024. | `ServicesAxis.astro` | None | Not chosen (#102); code removed (#104) |
| 98 | "opcija 9 s nekom pozadinom mi se sviđa najviše idemo tu opciju razraditi … jedna opcija je kako je sad opcija 9 samo bez sivih obruba i proizvoljno izradi još opciju dvije … neka nepravilna krošnja možda nepravilnog oblika u tehničkom stilu" | Three grounds, each an irregular crown in a technical style, at low opacity and still; each a lobe a stage, between the heads, so the heads stand on plain paper (with the boxes gone, a head's paper over the ground would show as a box). <br>- **9 „Stablo s podlogom“:** as before, hatched like a section (the accent at 16 % on a 3 % tint), the jagged outline kept, cut into three lobes. <br>- **10 „Stablo s obrisom krošnje“:** the crown as a selected object in CAD: a dashed outline (the accent at 55 %) with a grip on every corner, the brand's hollow square, over a 4 % tint; the lightest ground. <br>- **11 „Stablo na mreži“:** a drawing's grid in the crown (a line every 16 px, a stronger one every 80 px, one of them on the process line), in a stepped outline of level, upright and 45° edges, as drawn with a set square. <br>Built in `TreeCrown.astro`: the outlines in % of the tree, since the stages sit at the same heights within a percent at 1024–1920 px; 9 and 11 are a `clip-path` polygon whose lobes are joined down the line by edges of no width; 10 is an SVG stretched to the tree, its line kept at 1 px (`non-scaling-stroke`) and its grips square (zero-length strokes with square ends). Room under the last service (`--space-6`) holds the crown's lowest edge. Screenshots: `batch28-option{7–11}-1440.png`, `-option10-1920`, `-option11-1024`, `-option9-motion-1440` (a frame mid-motion). | `TreeCrown.astro` (new), `ServicesAxis.astro` (`outline`, `grid`; the classes `axis--curves`), `src/lab/pages/sto-radimo-2.astro` | The client chooses | Not chosen (#102); code removed (#104) |
| 99 | "zadnju strelicu kod analitike nisi sto posto kalibrirao , par piksela izvan strelice ide glavna crta … popravi isto na svakoj od opcija" | The line's square end stuck out past the arrow's tip (the tip sat exactly on the service's top, where the line ends). The tip now sits a rail (2 px) lower, so the line's end is inside it, in every option; the side arrows already ended so. Without JavaScript or with reduced motion the last rail now stops at the last service's bottom, hidden behind it by a strip of the page's ground. Checked at 3× with motion on and off ([batch28-arrow-tip-3x.png](screenshots/phase-2/review/batch28-arrow-tip-3x.png)). Also found and fixed: in the left column a turned-over curved branch left a faint 1 px seam beside its arrow in Chromium; the left branches are now drawn mirrored, not turned over. | `ServicesAxis.astro`, `services.css` (the left column's wipe) | None | Not chosen (#102); code removed (#104) |

**Batch 29 (2026-10-21): three options kept, new ways to show the stages**

The client's message, verbatim:

> Idemo ovako , zaboravi sve ovo prošlo sačuvaj samo opcije :
> središnju os kako je sada
> opciju tri sa tri stupca
> središnju os s okvirima.
>
> Sada me znaima postoji li neki skroz drugačiji način za prikazati ta tri koraka - odnosno što radimo sekciju.
> Ako imaš ideju ili način i ako skilovi i agenti za to imaju bolji način predloži ga sam i ponudi mi par novih opcija skroz koje nismo do sad primjenili
>
> . ( Koristi desing mogućnosti agente skilove figmu ili što god trebaš da napraviš par novih opcija koje su kvalitetne i uklapaju se u stranicu na pravi način)

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 100 | "zaboravi sve ovo prošlo sačuvaj samo opcije : središnju os kako je sada , opciju tri sa tri stupca , središnju os s okvirima" | `/lab/sto-radimo-2` keeps three of its options: the central axis as on Home now, option 3 „Tri stupca“ and option 4 „Središnja os s okvirima“. Options 1, 2 and 5–11 (the branches, the trees and their crowns) leave the page and are no longer offered. Their code stays until the client chooses; removing it is a deletion, so it waits for the client's OK. | `src/lab/pages/sto-radimo-2.astro` | Removing the old options' code: the client's OK | Done |
| 101 | "postoji li neki skroz drugačiji način za prikazati ta tri koraka … predloži ga sam i ponudi mi par novih opcija skroz koje nismo do sad primjenili … Koristi desing mogućnosti agente skilove figmu ili što god trebaš da napraviš par novih opcija koje su kvalitetne i uklapaju se u stranicu na pravi način" | Three new options, each a kind of layout not tried so far (not the chapters, the parts list, an axis, columns, frames, branches or trees). They keep the same copy and icons and are built from the page's own parts: the bubbles, the process line and grip of the wordmark, and the icons that draw. They use the larger type of #90 from 64rem. Weighed and left out: sticky stacked sheets and a pinned horizontal scroll (motion.md rules out pinned scroll sequences); an exploded isometric assembly (too close to the 3D house two zones below). Made with `frontend-design`, then critiqued by four `design-critic` agents (art direction, craft, communication, motion) on one capture. Their verified findings were fixed in the options before the report ([the critique](../research/2026-10-21-design-critique-sto-radimo-options.md)). Figma was not needed for options; the chosen one goes into the library at the Figma sync. <br>- **12 „Terminski plan“** (`ServicesPlan.astro`, `plan-schedule.ts`): the stages as a building schedule (gantogram). All the text is in one column on the left; from the middle of the sheet runs the schedule. Each stage starts at its grid line, with its bubble at the top; the lines step down to the right. From the bubble runs the stage's bar, the process line ending in a grip. Under the bar is the stage's period, its column across its services, hatched at low strength like option 9's ground. Each service has a grip on its stage's line, which says it belongs to the stage without claiming how long it takes. „Fiksni opseg, rok i cijena“ is a milestone where stage 02 starts. Stage 03's bar and period run to the edge, the bar ending in an arrow. No dates. On phones each stage has a small schedule under its tagline. Motion: one pen down the schedule. A stage's bar draws when its head reaches 85 % of the screen; a service's icon draws, then its grip snaps in; a row never starts before the one above has had its turn. Heights: 1661 px at 1440, 1746 at 1024, 1733 at 375. <br>- **13 „Krug“** (`ServicesCycle.astro`, `cycle.ts`): the stages as a cycle, since the care doesn't end at the launch. A circle drawn as on a drawing, with its centre lines (the wordmark's arc, closed), at 1:1. The bubbles and a grip per service are spaced evenly round it like a bolt circle, and each stage's name is written beside its bubble. From 64rem the circle stays beside the text (sticky; the page scrolls as always). Its arc follows what is read at the middle of the screen, each grip snapping in as it is reached; after the last service the arc closes on 01 with an arrow. The icons draw on their own, as in the other options. Phones have no circle. Heights: 1654 px at 1440, 1658 at 375. <br>- **14 „Kartice“** (`ServicesTabs.astro`, `stage-tabs.ts`): one stage at a time, as WAI-ARIA tabs from 48rem. An unchosen stage's name is underlined like every link; the chosen one is underlined by the process line, which draws, with its grip at the tab's corner. The services sit two to a row, and from 1280 px all in one row. From 64rem the panels share one place, so a choice never moves the page. Phones and no JavaScript show the stages one after another. Height: 722 px at 1440. Trade-off: 7 of the 9 services show only when their tab is opened. <br>Checked:<br>- axe clean, no overflow and no console errors at 375–1920 px (all six options);<br>- with motion on at 1440: every row, grip and icon drawn (12: 12 rows; 13: 9 icons and the circle closed);<br>- the tabs by click and keys at 1440 and 1024, stacked at 375 and without JavaScript;<br>- `npm run verify`.<br>Screenshots: `batch29-option12-1440.png`, `-option12-1920`, `-option12-375`, `-option13-1440`, `-option13-motion-1440` (the arc mid-reading), `-option14-1440` (stage 02 chosen), `-option14-1024`. | `ServicesPlan.astro`, `ServicesCycle.astro`, `ServicesTabs.astro`, `plan-schedule.ts`, `cycle.ts`, `stage-tabs.ts` (new), `services.css`, `ServiceItem.astro` (a slot), `src/lab/pages/sto-radimo-2.astro` | The client chooses among the six; the critique's questions (an ADR for leaving the process line, 13's sticky circle and its loop, 14's hidden services) | Not chosen (#102); 12 and 13 removed, 14 kept in the archive (#104) |

**Batch 30 (2026-10-21): the central axis stays, with larger type**

The client's answers to the four questions of batch 29, verbatim:

> 1. Odabiremo opciju kako je sada samo malo veći font zbog lakše čitljivosti
> 2. Ne odabiremo krug
> 3. Ne odabiremom ni 14
> 4. Možeš obriši ono što ne koristimo ostavi samo opciju 14 kartice negdje u arhivi da ako se vratim na to da imam

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 102 | "Odabiremo opciju kako je sada samo malo veći font zbog lakše čitljivosti" | "Što radimo" on Home stays the central axis as it is now, with the services' type a step larger from 64rem: the title about 24 px and its line about 21 px at 1440 (22 and 19 before), the size option 4 had (#90). Phones keep their sizes, since the line there is already short (critique #5). The section is 1666 px tall at 1440 (1625 before) and unchanged at 375. The ADRs of the process line (0015, 0022, 0023) stand. The icons stay 40 px, as asked. Checked: axe clean and no overflow at 375–1920, the line and icons drawn with motion on, no console errors. | `ServicesAxis.astro` (the larger type from 64rem; now only the central axis) | The client chose the central axis | Done; on `/lab/pocetna` |
| 103 | "Ne odabiremo krug"; "Ne odabiremom ni 14" | Options 13 and 14 are not chosen; nor is 12 (#102). | — | The client's choice | Decided |
| 104 | "Možeš obriši ono što ne koristimo ostavi samo opciju 14 kartice negdje u arhivi da ako se vratim na to da imam" | Removed: every layout of `ServicesAxis.astro` but the central axis (options 1–11, among them 3 „Tri stupca“ and 4 with its frames), `TreeCrown.astro`, `axis-row.ts`, the branches and the trees in `axis-line.ts` and `services.css`, `ServiceItem`'s branch and slot, options 12 and 13 (`ServicesPlan.astro`, `plan-schedule.ts`, `ServicesCycle.astro`, `cycle.ts`). All of it stays in git history (the last commit with every option: `c5ffc0c`). Option 14 „Kartice“ moved to `src/lab/archive/` (`ServicesTabs.astro`, `stage-tabs.ts`), its motion still in `services.css`. `/lab/sto-radimo-2` is now the record: the chosen axis and the archived tabs. The older comparison `/lab/sto-radimo` (batch 3) stays as the record, as do the other comparison pages. | `src/lab/home/`, `src/lab/archive/` (new), `src/lab/pages/sto-radimo-2.astro`, the lab bar and index | The client's OK | Done |

**Batch 31 (2026-10-21, fifth session): the order to the end of phase 2**

The client opened the fifth session with this message, verbatim:

> Nastavljamo fazu 2 (Dizajn), na hrvatskom, na grani phase/2-design (zadnji commit a5b79a5, pushano, CI zelen). Prvo pročitaj PROGRESS.md i docs/phases/2-design-review.md od odjeljka „Handover (2026-10-21)“, uključujući status na vrhu.
>
> Gdje smo: „Što radimo“ je riješen. Na /lab/pocetna je središnja os s korak krupnijim slovima usluga od 64rem (dorada 102). Ostale opcije su obrisane, a kartice (opcija 14) su u src/lab/archive/ i vide se na /lab/sto-radimo-2 (dorada 104).
>
> Redoslijed rada:
> 0. Najprije me pitaj smiješ li obrisati i stariju usporedbu /lab/sto-radimo (prve tri opcije iz skupine 3: ServicesChapters.astro, ServicesSchedule.astro, process-line.ts). Briši tek uz moje jasno „da“.
> 1. Ostatak kritike dizajna (dorada 92): 16, 17 i 18 iz skupine A (uz 18 isprobaj gripove na poveznicama u zaglavlju, dorada 91), zatim pitanja B (3, 5, 12, 13, 20, 21) i prijedlozi C (6, 14, 19, 22), pa ponovna provjera kritičara (ADR 0025). Nalaze su u docs/research/2026-10-21-design-critique-home.md.
> 2. Usklađivanje Figme s kodom (dorada 68).
> 3. Završne provjere i izvještaj (dorada 69), pa PR #2 i čekanje na moje „idemo dalje“.
>
> Pravila:
> - Svaku moju poruku najprije doslovno zapiši kao novu skupinu (31, dorada 105 nadalje) u 2-design-review.md.
> - Mijenjaj samo ono što tražim; šire promjene mi ponudi kao opcije.
> - Na pitanja tipa „kako da… / ili da…?“ predloži rješenje i čekaj moj izričiti OK.
> - Dev server je na portu 4321; ako ne odgovara, pokreni npm run dev u pozadini.
> - Commitaj s git commit -F, a nakon svake skupine pushaj.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 105 | "Najprije me pitaj smiješ li obrisati i stariju usporedbu /lab/sto-radimo (prve tri opcije iz skupine 3 …). Briši tek uz moje jasno „da“." | Asked before anything else. A deletion would remove the page `/lab/sto-radimo`, `ServicesChapters.astro`, `ServicesSchedule.astro` and `process-line.ts` in `src/lab/home/`, the page's entries in the lab bar, the lab index and `astro.config.ts`, and the mention in `services.css`'s comment. Lab D's chapters are another file (`src/lab/hybrid/ServicesChapters.astro`) and stay. | — | Deleting: only on the client's clear „da“ | Asked |
| 106 | "Redoslijed rada: … 1. Ostatak kritike dizajna (dorada 92) … 2. Usklađivanje Figme s kodom (dorada 68). 3. Završne provjere i izvještaj (dorada 69) …" | The order of #92, #68 and #69 stands: group A 16–18 (with the grips on the header's links, #91), then B, then C, then the critic's re-check; then Figma; then the final checks, the report and PR #2. | [Handover](#handover-2026-10-21) | None | Recorded |
| 107 | "Svaku moju poruku najprije doslovno zapiši …"; "Mijenjaj samo ono što tražim …"; "predloži rješenje i čekaj moj izričiti OK"; "Commitaj s git commit -F, a nakon svake skupine pushaj." | The rules of this review as before, plus a push after each batch. | — | None | Recorded |

**Batch 32 (2026-10-21): the older comparison deleted**

The client's answer to #105 ("Smijem li obrisati stariju usporedbu /lab/sto-radimo? …"), verbatim:

> Da, obriši

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 108 | "Da, obriši" | Deleted: the page `/lab/sto-radimo` (batch 3's options 1 „Poglavlja“ and 2 „Sastavnica“ beside the central axis), `ServicesChapters.astro`, `ServicesSchedule.astro` and `process-line.ts`, with the two rules in `services.css` that only `process-line.ts` drove; the page's link in the lab bar and the lab index, and its entry in `astro.config.ts`. All of it stays in git history (the last commit with it: `5234595`). Lab D's chapters (`src/lab/hybrid/ServicesChapters.astro`) stay. The other comparison pages stay as the record. | `src/lab/home/`, `src/lab/pages/`, `src/lab/components/LabBar.astro`, `astro.config.ts` | The client's OK | Done |
| 109 | Critique 16, "Odobravam i taj popravak nakon što mi skrinaš kako izgleda taj popravak da vidim o čemu točno pričamo" (#81) | Below 48rem the drawing's title block is set in HTML under the drawing, at the label size (13 px; the drawn one's letters were about 5 px at 375), in the same four cells, right-aligned as a title block sits, on the paper; the drawn one is off there. It is the same layer: the timelapse fades it in with the drawn one (a layer's second part starts with its first, `plan-timelapse.ts`), and its title turns from "Tlocrt kuće" to "3D model kuće" as the house rises. Hidden from screen readers, as the drawn one is (the drawing's name says it is an illustration). The comparison pages that show the drawing get it too. Checked: with motion on at 375 it fades in at the title block's step (about 4.5 s) and turns at the rise (about 7.2 s); 768 px and up unchanged; axe clean, no overflow, no console errors. Screenshots: [before](screenshots/phase-2/review/batch32-titleblock-375-before.png), [after](screenshots/phase-2/review/batch32-titleblock-375-after.png), and at 3× (`batch32-titleblock-375-3x-before.png`, `-after`). | `PlanDrawing.astro`, `plan-timelapse.ts` | None | Done; the client looks at it (#81) |
| 110 | Critique 17, "Odobravam linkove kroz 200ms zbog mobitela kako predviđa motion.md" (#80) | When the menu opens on a phone or tablet, its links fade in over 200 ms (`--motion-base`, `--ease-standard`, opacity only); the page moves down at once, as before, and closing is immediate. The fade stays with reduced motion, which motion.md allows for a fade of 200 ms or less. | `Header.astro` | None | Done; in review |
| 111 | Critique 18, "probati ćemo i sa gripovima u animaciji kada dođemo do tog dijela" (#91) | Tried: the header's links (Usluge, Tehničko crtanje, O nama, Kontakt, EN) take the four grips on hover and keyboard focus, as the buttons and the service items do (`Grips.astro`, 140 ms); the hover underline and the current page's blue line stay. In the open menu a focused link's grips mark its whole row. The footer's language link is unchanged. Screenshots: `batch32-header-grips-hover-1440.png`, `-focus-1024`, `batch32-menu-grips-focus-375.png`. | `Header.astro`, `LanguageSwitcher.astro` (`grips`) | The client keeps it or not | Tried; the client decides |

**Batch 33 (2026-10-21): what is left to answer**

The client's message, verbatim:

> Dobro , što sada od mene trebaš , koja pitanja razrješiti.

| # | The client's request | Change | Where | Decision | Status |
|---|---|---|---|---|---|
| 112 | "što sada od mene trebaš , koja pitanja razrješiti" | Put to the client: the two open points of group A (16's look, #109; 18's grips, #111), then group B's six questions (3, 5, 12, 13, 20, 21), each with options and a recommendation, checked again against the code as it is now. Group C (6, 14, 19, 22) follows B. Nothing changed. | [Research note](../research/2026-10-21-design-critique-home.md#verified-findings) | The client's answers | Asked |

## After the refinements

1. Run the checks ([How to check a change](#how-to-check-a-change)): the lab check on the lab build, `npm run verify`, `npm run test:e2e`, and report screenshots from the lab build.
2. Update this brief (the table above), the [phase log](2-design.md#log) and `PROGRESS.md`.
3. Add a "Review refinements" section to PR #2's description.
4. Wait for green CI.
5. Report to the client in Croatian, and stop.
6. On the client's word:
   1. Merge PR #2 into `main` with a merge commit.
   2. Create `phase/3-pages` from `main`.
   3. Start phase 3 ([3-pages.md](3-pages.md)).
