# Phase 2 review: refinements before phase 3 (brief)

> **Status (2026-10-19, end of the first refinements session): open; the next session starts at [Handover](#handover-2026-10-19).** Phase 2 is done and in review (PR #2). In the first refinements session the client sent six batches (refinements 1–20 below), reviewed on `/lab/pocetna`, then asked for a handover.
> - **Next:** the open items under [Handover](#handover-2026-10-19), in order, then the steps under [After the refinements](#after-the-refinements).
> - **The rules of this review:** record each refinement under [Refinements](#refinements) before changing anything; change only what the client asks for (see the lesson in batch 7); make the change in code, check it, then bring the Figma library in line.
> - **Stop** after reporting. Merging PR #2 and starting phase 3 happen only on the client's word ("idemo dalje"), as the [phase gate](../../.claude/rules/codraft-workflow.md) says. In this review "idemo dalje" has also meant "the next batch"; ask if it is unclear.

## Handover (2026-10-19)

The client asked for a handover at the end of batch 7: "updateaj dokumentaciju za nastavak u drugoj sesiji i daj prompt za drugu sesiju".

**Where things are**
- **Branch:** `phase/2-design`, pushed; the last refinements commit is `564ceeb`, and CI was green on every push before it.
- **Lab pages** (`npm run dev`, then http://localhost:4321):
  - `/lab/pocetna`: Home in the chosen direction, on the production components. Every approved refinement is here.
  - `/lab/sto-radimo`: the three "Što radimo" options; the client chose 3 „Središnja os“ (now on Home).
  - `/lab/crtanje`: the three "Tehničko crtanje" options; the client leans to C „Legenda“, not yet confirmed. Home still shows A.
  - `/lab/style`, `/lab/a`–`/lab/e`: as before. D and E stay the round 2 record (navy hero, the plate, five audit buttons).
- **Code of the refinements:** `src/lab/home/` (Home's zones, `ServiceItem`, `chapters.ts`, `process-line.ts`, `services.css`, `PlanDrawing.astro` with `plan-timelapse.ts`, `drafting/`), `src/lab/pages/{pocetna,sto-radimo,crtanje}.astro`, `src/lab/copy.ts`. Production code changed only in the header (no button), the route map (`/tehnicko-crtanje`), the locales and `draw.ts` (`data-draw-wait`).
- **Decisions:** [ADR 0017](../decisions/0017-one-audit-call-to-action-per-page.md) (one audit button per page), [ADR 0018](../decisions/0018-drafting-for-architecture-and-construction.md) („Tehničko crtanje“, architecture and construction only), [ADR 0019](../decisions/0019-drafting-adds-3d-models.md) (3D models). All accepted.
- **Copy:** every new or changed line is in `docs/content.md` (§2 blocks, §3 suggestions S17–S19, "Prototype copy" tables for batches 1–6, changelog). All are HR drafts for the client to approve.
- **Screenshots of the review:** [screenshots/phase-2/review/](screenshots/phase-2/review/), from the dev server (the Astro toolbar shows in the full-page ones); `hero-reference-client.png` is the client's own screenshot of the hero as it must stay.
- **The client's screens:** the main one is 2560 × 1440 at 100 % (the browser was about 1920 px wide in the client's screenshot); the laptop is 2560 × 1600 at 150 % (1707 px).
- **The dev server** still runs on port 4321 (`node` PID 29544 at the handover). Check the port at the start of the next session; stop it before `npm run test:e2e`, and tell the client.

**Open items, in order**
1. ✓ **Tehničko crtanje:** the client confirmed option C with a layout and text of their own (batch 8, #21–25); it is on `/lab/pocetna`.
2. **The service icons:** the client is generating nine icons with the prompt in [brand.md](../brand.md#imagery). When they arrive (SVG or transparent PNG): redraw each as a stroke SVG on the 48 px grid (`currentColor`, 1.5 px, square caps), put them on the services in "Što radimo", and draw each stage's icons as the process line reaches the stage (`process-line.ts` knows when). Static with reduced motion. Then write the ADR that adopts them.
3. **Proposed, not yet answered:** after the floor plan's timelapse, raise it into a 3D view (walls extruded), to show the 3D service. Do it only if the client says yes.
4. **The hero on 1440 px laptops:** three lines there, two from about 1660 px. Two lines on a laptop would need smaller letters (about 54 px instead of 70). The client rejected the other way (the H1 across the sheet). Don't change it unasked; if the client raises it, show both at 1440 px side by side first.
5. **Further batches** from the client, if any.
6. **English, at the end of the review** (the client's word, batch 5): S17–S19 and every Croatian change of this review, including the new `drafting.3d.*` blocks and the one-line services, then `src/locales/en.json` where a UI string changed.
7. **Figma:** not yet synced with any refinement. Bring the library "Codraft sustav dizajna" in line with the code once the batches settle: the component Zaglavlje (no button; "Tehničko crtanje"), the example page Početna (hero copy and two lines, "Što radimo" as the central axis with one line per service, the drafting zone with the floor plan and 3D, the closing call to action with "Pošaljite upit"), and the text styles if a size changed. Load `figma:figma-use` and `figma:figma-generate-library` first.
8. **The steps under [After the refinements](#after-the-refinements):** the checks on the lab build (add `/lab/pocetna`, `/lab/sto-radimo` and `/lab/crtanje` to `.playwright-mcp/check-lab-r3.mjs`), `npm run verify`, `npm run test:e2e`, report screenshots from the lab build, the phase log, `PROGRESS.md`, PR #2's "Review refinements" section, green CI, the report, and stop.

**Working notes from this session**
- **A `<script>` between two zones breaks `.zone + .zone`** (the rule above a zone disappears), because Astro renders a component's script in place. Put a component's script inside its zone.
- **A part that is in view at load and must still animate** takes `data-draw-wait` (draw.ts) and hides itself with CSS under `.js` and `prefers-reduced-motion: no-preference`, so it never flashes complete.
- **Classes passed to `Zone`, `Button` and `ServiceItem` get the parent's scoped styles** (they spread their attributes); `Item` and `Steps` don't, so wrap them or use `:global()`.
- **Playwright scripts** must live in the project (`.playwright-mcp/`, ignored by git) to find `@playwright/test`. In Git Bash, run them with `MSYS_NO_PATHCONV=1` when an argument starts with `/`.
- **Editing files with Python on Windows:** write with `newline="\n"`, or the file gets CRLF line endings. For long edits, write the script to the scratchpad first; heredocs with Croatian quotes broke once.
- **Lab copy is shared:** `src/lab/copy.ts` feeds A–E too, so a copy change shows there as well; that is accepted (the client's wording applies everywhere).

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

## After the refinements

1. Update this brief (the table above), the [phase log](2-design.md#log) and `PROGRESS.md`.
2. Add a "Review refinements" section to PR #2's description.
3. Wait for green CI.
4. Report to the client in Croatian, and stop.
5. On the client's word:
   1. Merge PR #2 into `main` with a merge commit.
   2. Create `phase/3-pages` from `main`.
   3. Start phase 3 ([3-pages.md](3-pages.md)).
