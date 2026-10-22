# Phase 3: Pages (Izrada stranica)

- **Status:** In progress, from 2026-10-22. Phase 2 was approved and merged into `main` (PR #2). Page 1, Početna, is done (log M1–M3). Page 2, Usluge, started in the second session (M5): its argument, layout and copy wait for the client's OK.
- **Branch:** `phase/3-pages`, created from `main` after the merge of PR #2. Draft PR #3 is the phase report.

## Start here (2026-10-22, page 2: Usluge)

The handover after page 1. The first session of phase 3 opened the phase (the gate of PR #2), built Home in both languages and answered the client's review (log M1–M4). The client asked for this handover with: „azuriraj dokumentaciju i daj mi prompt za nastavak“ (M4).

**1. Where things stand**
- **Branch** `phase/3-pages`; **draft PR #3** is the phase report, updated after each page. CI green on its last commit.
- **Home is done** at `/` and `/en` (log M1–M3): the zones in `src/views/home/`, the services' catalogue and icons in `src/features/services/`, the JSON-LD in `src/features/seo/`, the team in `src/config/team.ts`, every line a locale key listed in [content.md](../content.md) ("Home, phase 3"). Screenshots: [screenshots/phase-3/](screenshots/phase-3/).
- **Decisions of this session:** [ADR 0029](../decisions/0029-english-naming-spelling-and-titles.md) ("Architectural Drafting" at `/en/architectural-drafting`, British English, "Croatia" in English titles) and [ADR 0030](../decisions/0030-steps-and-service-lines-on-the-type-scale.md) (no local type sizes).
- **Home's open items before launch** (none blocks the next page):
  - the free audit's facts in its lead (what is checked, the 30-minute call, the written summary, "bez obveze") and the closing note's reply time ("u roku od jednog radnog dana"): Claude's drafts, which the client confirms before launch (M2)
  - the team's photos, bios and written consent (item C)
  - the company data (item A) and contact (item B): asked for with the Impresum and Kontakt pages; until then the title block says "Stiže prije objave"
  - the OG images: generated per page later in the phase; that likely needs a new dependency, so ask first

**2. Next: page 2, Usluge** (`/usluge`, `/en/services`), on the client's word. Follow [Steps for each page](#steps-for-each-page):
1. **The page's argument and the missing copy first** (as for Home, M1): a claim and its proof per zone, into the page's outline in [information-architecture.md](../information-architecture.md#usluge--services-usluge); the gap copy (G4–G8) into [content.md](../content.md) with each line's locale key. Show the client both and build only after the client's OK.
2. **There is no lab design for Usluge.** Lay it out from the design system (`src/components/ui/`: Zone, Item, Steps, Button, …) and Home's patterns (stages with numbered bubbles and the service icons, rows like "Kako radimo", Steps for "Tijek suradnje"), and describe the layout zone by zone with the argument, so the client approves the structure before the build. The client reviews it live on the dev server.
3. **What already exists:** `STAGES` in `src/features/services/services.ts` (the stages and services with their anchors in both languages, their icons and title keys; `Stage.anchor` was added for this page); the client's full sentences in [content.md §2](../content.md#2-copy-blocks-en-source--hr-draft) (`*.body`, not in the locales yet); the anchors in the glossary (§1).
4. **Ask the client only for what this page needs** (`PROGRESS.md`, "Trebamo od vas", item E; gaps G4–G7): whether prices are shown, and if so a typical timeline or "od X €" per Build service and the monthly fee for Run & Grow; what each service delivers or includes (G5, G6: Claude drafts from the client's input); the audit's scope (G4) is already drafted on Home. Claude drafts the FAQ (G8).
5. **English for this page:** put the pending suggestions that touch its blocks to the client with a recommendation each: S1, S2, S4–S7, S11, S12, S16, S17, S18 ([content.md §3](../content.md#3-suggestions-for-the-english-copy)). S3, S15 and S20 are accepted (ADR 0029).
6. **SEO:** `Service` JSON-LD × 8 and `BreadcrumbList`; the title and meta description per language through the view registry in `src/pages/[...slug].astro`; the H1 wording (`services.title`) checked with the `seo` skill.
7. Then `/check`, screenshots at 375, 768 and 1440 px from the build, and the client's review.

**3. Still carried over from phase 2** ([below](#carried-over-from-phase-2)): the Kowalski proposals (#71) and the browser bar's colour (#72) are for the client to choose while the pages are built (not yet asked); the hero's line count (#74) with critique 6 once every page is built; critique 14 with the real photos; critique 22 and the no-break spaces with the client's proofreading (#73) at the end of the phase; real layer switches on the drafting page (page 3).

**4. How the client works** (kept from phase 2, and confirmed in this session):
- Record each of the client's messages verbatim in this document's log (M5, M6, …) before changing anything.
- Change only what the client asks; offer wider changes as options with a recommendation.
- A question such as „kako da… / ili da…?“ asks for a proposal; wait for an explicit OK. "Ako preporučaš, popravi" (M3) authorises the fixes Claude recommended, no more.
- Ask for the client's data only when the page needs it; placeholders stay until it arrives, as long as nothing blocks the phase (M2).
- The client reviews live on the dev server (port 4321), with Windows "Animation effects" on. Talk to the client in Croatian.
- Commit with `git commit -F` and push after each batch or page.

**5. Working notes**
- **Phase 2's notes still apply** ([2-design-review.md](2-design-review.md#pitfalls-from-this-phase)): a component's `<script>` renders in place; the CSP blocks inline styles, so per-element values go in through the CSSOM; the floor plan keeps its own pace, so a slow-scroll check waits about 10 s.
- **The dev server on 4321 stays up for the client.** Check the build on port 4322 instead: `npm run build`, then `HOST=127.0.0.1 PORT=4322 node ./dist/server/entry.mjs` in the background; E2E against it with `npx playwright test -c .playwright-mcp/pw-4322.config.ts`.
- **Check scripts** in `.playwright-mcp/` (ignored by git, on this machine only; run with `MSYS_NO_PATHCONV=1` in Git Bash): `check-pages.mjs` (full-page screenshots, console, overflow, axe; `BASE`, `PAGES`, `WIDTHS`, `OUT`, `MOTION`), `draw-check.mjs` (slow scroll and no JavaScript), `zone-heights.mjs` (zone heights before and after a change), `compare-home.mjs` (a page against its lab design, zone by zone), `axis-failsafe.mjs`.
- **A new page:** its view in `src/views/` (its zones in a folder beside it), its entry in the view registry of `[...slug].astro` with the title and description keys, its copy in both locale files (same keys; a unit test checks), and the E2E smoke test.
- **Pitfalls of this session:**
  - Playwright's loader can't import the locale JSON through `t()`; E2E tests read the files with `fs` (`tests/e2e/smoke.spec.ts`).
  - Python's `write_text` writes CRLF on this machine; the repository is LF. Edit by script with `write_bytes`.
  - Home's production zones are copies of the lab, trimmed to the client's choices; the lab stays unchanged as the record, but it shares the design-system components, so a change there shows in the lab too.

## Goal

Build every launch page in Croatian and English, one page at a time in sitemap order. Each page has approved copy, correct SEO and structured data, accessible interactions and purposeful motion.

## Inputs

| Input | Status | Where |
|---|---|---|
| Page outlines | Agreed | [information-architecture.md](../information-architecture.md#page-outlines) |
| Existing copy (EN + HR draft) | EN final; HR pending approval | [content.md](../content.md) |
| Gap copy | Claude drafts per page; client approves | [content.md §4](../content.md#4-content-gaps) |
| **Company data (A)** for the legal pages and footer | Needed from the client | `PROGRESS.md` |
| **Contact data (B), team (C), CAD material (D), commercial terms (E)** | Needed from the client | `PROGRESS.md` |
| Terminology and suggestion approvals | Needed from the client | [content.md](../content.md) |
| Design system | From phase 2 | — |

## Page order

1. Početna
2. Usluge
3. Tehničko crtanje
4. O nama
5. Besplatna analiza (static parts; the form comes in phase 4)
6. Kontakt (static parts; the form comes in phase 4)
7. Privatnost
8. Kolačići
9. Impresum
10. Izjava o pristupačnosti
11. 404

The AI asistenti page is built in phase 4.

## Carried over from phase 2

The client moved these items from the phase 2 review to this phase (review batch 23, 2026-10-21, and #59; [2-design-review.md](2-design-review.md#refinements)):

- **English copy** (#70): ✓ Home done on 2026-10-22 (S19 replaced by S20, ADR 0029); the other pages as they are built. S17–S18 and every Croatian change of the review, aligned page by page as each page is built in both languages. The changes are listed in [content.md](../content.md) ("Prototype copy" and the changelog): the hero lead, the one-line services, `drafting.3d.*`, the drafting zone of batch 9, "Kako radimo" of batch 10, the closing call to action of batch 11, the floor plan's title block and accessible names (#58, #63–64). The English changes only through suggestions the client approves.
- **Home's two local type sizes** (#59): ✓ decided on 2026-10-22, option A ([ADR 0030](../decisions/0030-steps-and-service-lines-on-the-type-scale.md)). When "Što radimo" moves out of the lab, decide whether `--step-service` (19 px at 1440, `src/lab/home/services.css`) and `--step-heading` (25 px, `Steps.astro`) become steps of the type scale or merge into their neighbours; with `--step-title` at 22 px they are three sizes 3 px apart ([inspector's note](../research/2026-10-20-taste-skill-inspect.md#measured-and-real-but-not-defects)).
- **The Kowalski proposals** (#71), for the client to choose from while the pages are built: a 320 px overflow check, worst-case data in the phase documents, a motion-code checklist, a variant picker with replay ([research note](../research/2026-10-20-emil-kowalski-skills.md#proposed-for-the-client)).
- **The browser bar's colour** (#72): navy `#0F1B2D` from the brand package, or the header's paper `#F6F5F1`. Try both on a real Android phone (DevTools can't show the bar), changing only the meta tag and the manifest copy in `public/`, never the brand masters; the client decides ([ADR 0026](../decisions/0026-emil-kowalski-skills-in-the-setup.md)).
- **The hero's line count on 1440 px laptops** (#74): three lines there, two from about 1660 px. Check it with the client once every page is built; show both side by side before changing anything.
- **The client's proofreading** (#73): at the end of this phase the client reads and corrects every text, all pages together (an exit criterion below).
- **Group C of the first design critique** (#123; [research note](../research/2026-10-21-design-critique-home.md#verified-findings)):
  - **6, the hero at 1024 px:** the H1 breaks into five ragged lines. Decide with #74 (the hero at 1440), showing the client both versions side by side: the two columns as now, or the stacked layout up to 80rem with the H1 in about three lines.
  - **14, the team strip:** the portraits end 220–300 px short of the content's right edge at 1440–1920 px. Decide with the real photos (G3); by default the list runs to the right edge (`5 / -1`).
  - **19, values off the token scale:** ✓ done on 2026-10-22 (M2; the log below): each value mapped to its nearest token; the client's own numbers (the hero's 72 px, #19, and the closing band's padding, #37) stay.
  - **22, copy:** the audit lead speaks only to visitors with a site; adjacent zones repeat the same promises; the audit's steps describe booking, not the audit. With the client's proofreading (#73) and the audit's scope (G4, G19); the words stay the client's.
  - **From the re-check** (#128–129): in the proofreading, a no-break space after "mobitelu i" ("Brze, prilagođene mobitelu i usmjerene na upite i narudžbe."), so the one-letter word never ends a line; the audit's three-word steps keep one word on a line in a narrow column ("Dobivate / potvrdu termina."), accepted unless the copy changes.
- **Real layer switches on the drafting page** (critique 3, #115): on `/tehnicko-crtanje` the layer viewer's lamps are toggle buttons (`aria-pressed`), as docs/motion.md ("Layers") plans. On Home the layer list only shows the layers' state, each lamp a sample of its layer's line (#115).

## Steps for each page

1. **The page's argument.** Before the copy and the build, list the page as claims, one line per zone, each with its proof: what the visitor should believe after that zone, and what makes it believable (ADR 0027, from Taste Skill's `copy.md`).
   - Proof is only what is true by construction ([ADR 0004](../decisions/0004-verifiable-proof-only.md)): the work itself, shown large (the floor plan, the sample drawings, the AI demo); how the work is done, stated specifically; and facts the client gives (terms, prices, the team, the place).
   - A zone with no claim is cut or merged into another. A claim with no verifiable proof is reworded or dropped.
   - The table goes into the page's outline in [information-architecture.md](../information-architecture.md#page-outlines). The client approves it with the copy; the words stay the client's.

   | Zone | Claim | Proof |
   |---|---|---|
   | Hero | … | … |

2. Draft the page's gap copy in HR and EN in [content.md](../content.md). The client approves it.
3. Build the page in both locales. Use:
   - `react-patterns`
   - `seo`: metadata, heading order, JSON-LD
   - `frontend-a11y` for interactive parts
   - `motion-patterns`, plus `motion-advanced` only for complex animation (wordmark draw, layer viewer)
   - `i18n-sync` for the locale files
4. Run the `/check` procedure. Fix CRITICAL and HIGH findings; list MEDIUM in the report.
5. Take Playwright screenshots at 375, 768 and 1440 px, with no console errors.
6. If a build or type error appears, run the `/fix` procedure (`build-error-resolver` or `react-build-resolver`).

## SEO specifics

**JSON-LD**
- `ProfessionalService` (Organization) on Home, with `areaServed`: Croatia. Include the address only if it is public, and `sameAs` links to the real profiles.
- `Service` × 8 on Usluge (Plan, four Build, three Run & Grow) and × 3 on Tehničko crtanje (2D, 3D, documentation; ADR 0019).
- `BreadcrumbList` on inner pages.

**Metadata**
- A title and description per page and language (gap G28).
- "Croatia" goes in the English titles only (suggestion S15, if accepted).

**OG images**
- Generated per page and language from a template at build time, using the brand tokens and the wordmark.

**FAQ**
- Written for people and for AI search; no FAQ rich results are expected (see [information-architecture.md](../information-architecture.md#keyword-map)).

**Plumbing**
- hreflang, canonical and `sitemap.xml` all come from the route map.

## Content specifics

- **Drafting page:** apply the guardrails in [compliance.md](../compliance.md#copy-guardrails); no projektiranje wording. Show the sample sheets in the layer viewer once the client delivers them.
- **Impresum:** every field from ZTD Art. 21 and ZET Art. 6 (compliance items C1–C2).
- **Alt text** for every meaningful image, in both languages. Decorative images get an empty `alt` (gap G28).
- **Legal pages:** Claude's drafts are reviewed by the client and, ideally, a lawyer.

## Deliverables

- All launch pages in HR and EN, plus the localised 404.
- Approved copy recorded in [content.md](../content.md).

## Exit criteria

- [ ] Every page in the sitemap is built in both languages.
- [ ] No open CRITICAL or HIGH findings.
- [ ] Screenshots at three widths for each page, with no console errors.
- [ ] The client has read and corrected every page's text, all pages together (the client's word in the phase 2 review, #73).

## Log

Each of the client's messages is recorded here verbatim before anything changes. They are numbered M1, M2, …, so they don't clash with the phase 2 refinements (#1–134), which this document still cites.

- **2026-10-22, first session of phase 3**
  - **M1**, the prompt that opens the session, verbatim:

    > Idemo dalje: počinjemo fazu 3 (Izrada stranica), na hrvatskom. Faza 2 je gotova na grani phase/2-design (zadnji commit 509c1e7, pushano, CI zelen), a PR #2 čeka merge.
    >
    > Prvo pročitaj PROGRESS.md i docs/phases/3-pages.md od odjeljka „Start here (2026-10-21)“.
    >
    > Redoslijed rada:
    > 0. Vrata faze: ovo je moje „idemo dalje“. Spoji PR #2 u main (merge commit), napravi granu phase/3-pages iz maina i pushaj je, ažuriraj PROGRESS.md, 2-design.md i 3-pages.md te otvori draft PR za fazu 3.
    > 1. Prva stranica je Početna: prenesi odobreni dizajn s /lab/pocetna (src/lab/home/) u pravu stranicu (src/views/), na oba jezika, prema koracima za svaku stranicu u 3-pages.md. Najprije mi pokaži argument stranice (tvrdnja i dokaz po zoni) i tekstove koji nedostaju, a gradi tek nakon mog OK-a.
    > 2. Podatke od mene (tim, podaci o tvrtki, kontakt…) traži tek kad ih stranica treba.
    >
    > Pravila:
    > - Svaku moju poruku najprije doslovno zapiši u dnevnik u docs/phases/3-pages.md.
    > - Mijenjaj samo ono što tražim; šire promjene mi ponudi kao opcije.
    > - Na pitanja tipa „kako da… / ili da…?“ predloži rješenje i čekaj moj izričiti OK.
    > - Odluke iz faze 2 (ADR 0015–0028 i dorade u 2-design-review.md) ostaju; dizajn početne ne mijenjaj bez mene.
    > - Dev server je na portu 4321; ako ne odgovara, pokreni npm run dev u pozadini.
    > - Commitaj s git commit -F, a nakon svake skupine pushaj.
  - **The phase gate** (M1, step 0): CI on PR #2 was green for its last commit, `509c1e7`. PR #2 was merged into `main` with a merge commit (`1f36f82`), and `phase/3-pages` was created from `main` and pushed. `PROGRESS.md`, [2-design.md](2-design.md) and this document are updated, and draft PR #3 is open, so CI checks every push.
  - **Početna, steps 1–2** (M1, item 1): the page's argument, a claim and its proof per zone, is in [information-architecture.md](../information-architecture.md) (Home, "The page's argument"); the drafts of the missing copy are in [content.md](../content.md) ("Home, phase 3"), with suggestion S20. Two zones lack proof today: the free audit (G4, G19) and the team strip (G3). Put to the client with the decisions the build needs: the audit's facts, the team's data, the optional line in the closing call to action, and the English name of the drafting service with the spelling and S15. The company data (item A) and the rest of the contact data (item B) wait for the Impresum and Kontakt pages; until then the title block keeps "Stiže prije objave". Nothing is built before the client's OK.
  - **M2**, the client's answer, verbatim:

    > Trenutno tekst neka bude kakav je prije pusha ću ti ja reći u konačnoj verziji što točno izmjenjujemo neka tekst ostane kako si napravio sada.
    > 2. Tim jesu dvije osobe prva osoba ( ja ):
    > Matej Medved , ja sam Full Stack Web Developer , SEO radim , dizajne , - ukratko ideju pretvaram u stvarnost što se tiče weba i AI asisteni i AI na stranici
    > A druga osoba je :
    > Tin Manjerović
    > SEO optimizacija isto
    > AI asistenti
    > Tehničko Crtanje
    >
    > 3. Završni poziv , da sam smisli tekst.
    > 4. Engleski po preporuci Croatia , i sve po preporuci onda
    > Podatci o tvrtci slike i ostale stvari naknadno koje nisam naveo ako ne blokiraju fazu
    > 19) može
    >
    > Odobravam uglavnom kreni s izradom
  - **What M2 decided:**
    - The page's argument is approved; the build starts.
    - The copy stays as drafted for now; before launch the client says what changes in the final version. So the audit's lead goes in without brackets, and its facts (what is checked, the 30-minute call, the written summary, "bez obveze") wait for the client's confirmation before launch.
    - The team: Matej Medved and Tin Manjerović, with their roles (G3, part of item C). The photos, the bios and the written consent come later.
    - The closing call to action gets a note under its lead, written by Claude: the reply time (one working day, a commitment the client confirms before launch) and sketches by email (ADR 0020).
    - The English as recommended: "Architectural Drafting" at `/en/architectural-drafting` (S20), British spelling (S3), "Croatia" in English titles (S15): [ADR 0029](../decisions/0029-english-naming-spelling-and-titles.md).
    - Critique 19 (values off the token scale) is approved.
    - The company data, the photos and the rest come later, as long as they don't block the phase.
  - **Početna, step 3, the build** (skills loaded: `seo`, `i18n-sync`):
    - Home's zones are ported from `src/lab/home/` to `src/views/home/`, with only the client's choices (the roof, palette 1, the icons beside the text); the lab is unchanged, as the record. The services' catalogue and icons are in `src/features/services/` for `/usluge` too, the team's names in `src/config/team.ts`.
    - Every line is a locale key (`docs/content.md`, "Home, phase 3"), in Croatian and in British English; the English slug of the drafting page and its navigation label follow ADR 0029.
    - SEO: the title and meta description per language from the view registry in `[...slug].astro`, Open Graph tags in BaseLayout, and a `ProfessionalService` JSON-LD with only today's facts (`src/features/seo/`, 5 unit tests). The OG image comes later in the phase, with the other pages.
    - **Checks:** each zone against `/lab/pocetna` at 375–1920 px in its final state: the hero and "Što radimo" are pixel-identical, the drafting zone and "Kako radimo" identical but for a 1 px offset, and the audit, the team and the closing call to action differ only by their new text. The dev server and the build under the CSP, `/` and `/en` at 375, 768 and 1440 px (the dev server also at 1024 and 1920): no console errors, axe clean, no overflow; a slow scroll draws every part, and without JavaScript nothing is hidden. `npm run verify`: 178 unit tests, 4.0 KB of JavaScript on Home. The E2E smoke test checks Home's H1, title, description, Open Graph URL and JSON-LD in both languages; CI runs it.
  - **Critique 19, values off the token scale** (approved in M2): each value of the critique's list mapped to its nearest token; on a tie, the one that keeps the same distance on phones and desktops.
    - Spacing: the steps' node-to-text gap and the node's margin to `--space-4` (were 18 and 20 px); the title block's cells to 12 px top and bottom (`--space-3`; the bottom was 14); the rows of "Kako radimo" and the drafting zone to 24 px above and below (`--space-5`; were 20/24 on phones and 24/28 from 64rem); the team's photo to name 8 + 4 px (`--space-2`, `--space-1`; were 10 + 2).
    - Type: the header's links at body size from 64rem (`--step-body`, 17 px at 1440; were 16) and lead size in the menu (`--step-lead`; were 18); `h4` at `--step-lead` and `--leading-title` (Home's `h4` set their own size); the stage bubbles' numbers at `--step-label` (13 px; were 14).
    - Leading and tracking: the stage titles at `--leading-heading` and `--tracking-section`, the taglines and the services' lines at `--leading-lead`, the team's names at `--leading-title`.
    - Kept: the hero's 72 px above the H1, from the client's reference screenshot (#19), now commented; the closing band's two-thirds padding (#37).
    - Measured on `/` at 375–1920 px: each zone within 13 px of its height before (the services 9–13 px shorter, "Kako radimo" 12 px either way, the title block 2–12 px shorter, the header 1.3 px taller from 64rem). The lab pages share the header, the title block, the steps and `h4`, so they follow.
    - Checked: the dev server at 375–1920 px and the build under the CSP at 375, 768 and 1440 px (console, axe, overflow, slow scroll, no JavaScript); `npm run verify`.
  - **Početna, steps 4–5, `/check` and screenshots:**
    - The `/check` procedure routed the changes (TypeScript and Astro, no React, no forms, API or third-party scripts) to `typescript-reviewer` only; `security-reviewer` and `silent-failure-hunter` had nothing in scope. **No CRITICAL or HIGH findings.**
    - **MEDIUM, for the client** (none is fixed without the client's word):
      1. "Što radimo" hides its line and icons in CSS before `axis-line.ts` runs, under the live `prefers-reduced-motion: no-preference` query, while the script checks reduced motion once at load. If the script fails to load, or the visitor turns animations on after the page has loaded, the line and the icons stay hidden. Inherited from the lab. The fix doesn't change the look: the script marks the axis as its own (`is-live`) and only then does the CSS hide what it draws.
      2. Placeholders on the page (the team's photos, the title block's company data) and links to pages that don't exist yet: known; they are filled page by page, and nothing reaches `main` before the phase gate.
      3. The token mapping (critique 19) changes a few values by 1–4 px, `h4` everywhere included: as approved, and measured above.
      4. Printing before scrolling leaves out the process line, the icons and the plan's steps; a print rule would show the final state.
    - **LOW**, noted for the coming pages: the stages' anchors in `services.ts` are for `/usluge`; the view registry's type widens with the second view; the JSON-LD keeps one `@id` for both languages on purpose.
    - Screenshots from the build, final states: [screenshots/phase-3/](screenshots/phase-3/) (`pocetna-{hr,en}-{375,768,1440}.png`).
    - **E2E:** CI's first run failed before any test: Playwright's loader can't import the locale JSON through `t()` without an import attribute, so the smoke test reads the strings with `fs` (`18986e3`). All 51 E2E tests pass on the build locally (on port 4322, so the dev server on 4321 kept running) and in CI.
  - **M3**, the client's answer to the review, verbatim:

    > 1. Idemo po A preopruci za lokalne veličine slova
    > 2. Ako preopručaš popravak popravi
  - **The two local type sizes (#59), option A** ([ADR 0030](../decisions/0030-steps-and-service-lines-on-the-type-scale.md)): the steps' titles at `--step-title` (22 px at 1440, were 25), the services' lines at `--step-lead` everywhere (1–2 px larger on phones). "Što radimo" is 53 px taller at 375 and 30 px at 768; from 1024 px no zone changes height. The lab follows in its steps, which are the shared component.
  - **The /check fixes Claude recommended** (MEDIUM 1 and 4; 2 and 3 need no change):
    - "Što radimo": `axis-line.ts` takes the axis over with `is-live`, and only then does the CSS hide what the script draws. Before that, from the first paint, the rails and the icons wait unseen as before, so nothing changes on screen; if the script never takes over, they show complete after a 3 s failsafe (`--axis-failsafe`), and if motion is turned on after the page has loaded, the script takes over then.
    - Printing: before printing, `draw.ts` shows every waiting part's final state and finishes the moving ones (the plan, the steps, the zones' selections, on every page), and the axis completes; a print rule covers an axis the script never took over. Documented in [motion.md](../motion.md).
    - Checked on the dev server and on the build under the CSP: with the axis script blocked, the rails and icons appear complete after 3.5 s; with reduced motion at load and motion turned on after, the script takes over and draws everything on the way down; before printing at the top of the page, nothing is hidden or pending and the line is complete. The normal path is unchanged: every part draws after a slow scroll, nothing is hidden without JavaScript, no console errors, axe clean, no overflow at 375, 768 and 1440 px; `npm run verify` (178 unit tests, 4.2 KB of JavaScript on Home); E2E 51 on the build.
    - The screenshots in [screenshots/phase-3/](screenshots/phase-3/) are retaken from this build.
  - **M4**, verbatim:

    > azuriraj dokumentaciju i daj mi prompt za nastavak
  - **Handover** (M4): [Start here](#start-here-2026-10-22-page-2-usluge) is rewritten for the next session (page 2, Usluge: where things stand, Home's open items, how to do Usluge, the client's habits, the working notes of this session); `PROGRESS.md` points to it, and the phase 2 documents' links to the old section point to this log. The prompt for the next session went to the client.
  - **Open for the client** (put to the client with the page): the two local type sizes (#59); the MEDIUM findings above. Both answered in M3, below. The English footer's placeholder "Arrives before launch" takes two lines in the title block's narrow cells; it goes away with the company data.
- **2026-10-22, second session of phase 3 (page 2: Usluge)**
  - **M5**, the prompt that opens the session, verbatim:

    > Nastavljamo fazu 3 (Izrada stranica), na hrvatskom. Početna je gotova na grani phase/3-pages (zadnji commit 416256f, pushano, CI zelen), a draft PR #3 je izvještaj faze.
    >
    > Prvo pročitaj PROGRESS.md i docs/phases/3-pages.md od odjeljka „Start here (2026-10-22, page 2: Usluge)“, pa dokumente na koje upućuje (information-architecture.md za Usluge, content.md §1–§4, ADR 0029 i 0030).
    >
    > Redoslijed rada:
    > 1. Druga stranica su Usluge (/usluge, /en/services), prema koracima za svaku stranicu u 3-pages.md. Za Usluge nema dizajna u labu. Zato mi najprije pokaži:
    >    - argument stranice (tvrdnja i dokaz po zoni), s rasporedom zona složenim od sustava dizajna i obrazaca s početne
    >    - tekstove koji nedostaju, na hrvatskom i engleskom
    >    - engleske prijedloge koji se tiču te stranice, svaki s preporukom
    >    Gradi tek nakon mog OK-a.
    > 2. Od mene traži samo ono što Usluge trebaju: prikazujemo li cijene ili okvirne rokove, mjesečnu naknadu za održavanje i što uključuje koja usluga. Ostale podatke traži kad ih stranica treba.
    > 3. Nakon izrade: /check, snimke s builda na 375, 768 i 1440 px, pa moj pregled.
    >
    > Pravila:
    > - Svaku moju poruku najprije doslovno zapiši u dnevnik u docs/phases/3-pages.md (M5, M6, …).
    > - Mijenjaj samo ono što tražim; šire promjene mi ponudi kao opcije s preporukom.
    > - Na pitanja tipa „kako da… / ili da…?“ predloži rješenje i čekaj moj izričiti OK.
    > - Odluke iz faze 2 (ADR 0015–0028) i faze 3 (ADR 0029–0030) ostaju; početnu i sustav dizajna ne mijenjaj bez mene.
    > - Dev server je na portu 4321 i ostaje upaljen za mene; build provjeravaj na portu 4322, kako piše u „Working notes“. Ako dev server ne odgovara, pokreni npm run dev u pozadini.
    > - Commitaj s git commit -F, a nakon svake skupine pushaj.
  - **Usluge, steps 1–2** (M5, item 1; skill loaded: `seo`): there is no lab design for Usluge, so the page's argument comes with a layout composed from the design system and Home's patterns, zone by zone, both in [information-architecture.md](../information-architecture.md) (Usluge, "The page's argument" and "Layout, zone by zone"). The missing copy, in Croatian and British English with each line's key, the facts the client confirms and the lines that depend on G7, is in [content.md](../content.md) ("Services, phase 3"), with a recommendation on each English suggestion that touches the page. Put to the client with what only the client can decide (M5, item 2): whether prices and timelines are shown (G7), the monthly fees and terms of Run & Grow, and what each service includes (G5, G6). Nothing is built before the client's OK.
    - Differences from the outline: the hero gets an index of the three stages and the drafting path, as on Home; "Tijek suradnje" has four steps (maintenance is stage 03 right above it, and five steps would be about 110 px each at 768 px); the FAQ is always open, as `Item` rows.
    - Shared code the build would touch, with no visible change on Home: the stage bubble's style moves out of Home's `services.css`, and Home's closing call to action takes its text as props. New in the design: only the list marker for the services' short points.
    - The H1 stays "Što radimo" (the `seo` check): the keywords are in the intro, the title, the description and the eight service headings.
  - **M6**, the client's answer, verbatim:

    > Trenutno smo u **fazi 3**. Želim da od ovog trenutka radiš maksimalno autonomno, koristeći postojeći plan, dokumentaciju, projektna pravila, skillove, hookove i specijalizirane agente.
    >
    > **Glavni cilj:** Implementiraj što više projekta bez nepotrebnog traženja mojih odluka. Vjerujem tvojoj tehničkoj procjeni — ako postoji razumno i kvalitetno rješenje, samostalno ga odaberi i realiziraj.
    >
    > **Smjernice:**
    > - Dovršavaj cijele stranice (pages), ne samo osnovne strukture. Implementiraj dizajn, responsive layout, navigaciju, interakcije, funkcionalne komponente, forme, animacije i prijelaze.
    > - Slike zasad zamijeni odgovarajućim placeholderima. Tekstove i opise slobodno samostalno generiraj. Sve to možemo naknadno pregledati i prilagoditi.
    > - Animacije i UX detalje implementiraj **sada**, nemoj ih odgađati samo zato što nedostaju finalne slike ili sadržaj.
    > - Za cijene usluga istraži aktualne tržišne cijene usporedivih usluga i postavi okvirno 10 % niže cijene. Dokumentiraj izvore i pretpostavke.
    > - Samostalno donosi dizajnerske, arhitekturne, tehničke i manje poslovne odluke, uz dosljednost postojećem projektu.
    > - Aktivno koristi odgovarajuće custom agente, skillove i hookove. Nemoj duplicirati ono što već postoji.
    > - Kontinuirano pokreći relevantne testove, lint, typecheck, build i druge provjere. Otkrivene probleme ispravljaj i ponovno provjeravaj.
    > - Radi iterativno: implementacija → provjera → ispravci → sljedeći zadatak. Nemoj stati nakon jedne uspješno dovršene cjeline.
    > - Poštuj postojeću arhitekturu i izbjegavaj nepotrebne refaktore ili kvarenje funkcionalnosti koje već rade.
    >
    > **Nemoj me pitati za sitnice, privremeni sadržaj, tekstove, slike, boje, rasporede ili standardne implementacijske odluke.** Pitaj isključivo ako je odluka zaista nepovratna ili kritična.
    >
    > Nastavi kroz fazu 3 i, kada je dovršiš, prijeđi na sljedeće planirane zadatke (faze) - skroz do launch-a ako treba. Ne ostavljaj nepotrebne TODO-ove ako ih možeš odmah riješiti.
    >
    > **Želim maksimalan konkretan napredak, a ne stalne konzultacije.** Na kraju mi sažeto prikaži što je napravljeno, što je provjereno i što eventualno zahtijeva moju odluku.
  - **M7**, sent while the work above ran, verbatim:

    > BTW Isto tako ako trebaš working tree napraviti ili bilo šta ne moraš me pitati imaš odobrenje
  - **What M6 and M7 decided:** Claude works autonomously from here ([ADR 0031](../decisions/0031-autonomous-work-from-phase-3.md)): pages are built right after their argument and copy are written down, the client reviews everything at the end of the phase, and Claude goes on through the next phases; facts only the client knows are never invented. The prices: about 10% below the market's median ([ADR 0032](../decisions/0032-guide-prices-below-the-market.md), [research](../research/2026-10-22-pricing.md)).
  - **Usluge, step 3, the build** (skills: `seo`): the page as laid out in [information-architecture.md](../information-architecture.md) (Usluge), with the guide prices; Claude's recommendations on the English suggestions applied for the client's final review (content.md §3). Shared code, with Home pixel-identical at 375, 768 and 1440 px: the stage bubble's styles in `src/features/services/stages.css`, the closing call to action as `src/views/shared/ClosingZone.astro`. New: a visible breadcrumb on inner pages (`Breadcrumbs.astro`), `service()`, `breadcrumbList()` and `graph()` JSON-LD helpers, `src/config/pricing.ts` with its formatting (Croatian week plurals), `tests/e2e/pages.spec.ts` for inner pages.
  - **Usluge, steps 4–5, the /check:** `typescript-reviewer` (no CRITICAL or HIGH; 4 MEDIUM, 11 LOW) and an independent `design-critic` run on all four lenses ("ready after fixes": 5 HIGH, 2 MEDIUM, 1 LOW, 4 questions). Fixed:
    - code: a row can't grow past the list with larger text (M1); each service's prices have a name for assistive technology (M2); no `availableLanguage` on `Service` (M3); every offer names its line, and a price per drawing sheet is a `UnitPriceSpecification` (M4); a space after each stage number, the shared stage styles imported where used, a fallback for the breadcrumb's separator, a row without an icon, the VAT flag tied to its copy in a comment, the E2E checks every Home link in both languages and every `Service` anchor.
    - design: a dimension's value is there from the start, only its line draws (DC-01; `Dimension.astro`, motion.md); each stage has the shape of its content: stage 01's two items side by side, stage 02 as rows with the terms on columns 10–12 from 80rem, stage 03 as three columns to compare from 80rem, their fees on one line through a subgrid (DC-02, DC-03); the FAQ in "Kako radimo"'s split, the answers to the rules' edge (DC-03); "Okvirno, bez PDV-a" above every service's prices (DC-04); the terms as name and price with the timeline under them, every dimension drawn to one scale for the page (8 weeks = the full line), the value above the line (DC-05, Q1; `Dimension`'s new `above` variant); the services' titles a step larger from 64rem, as on Home (#102), and stage 01's lead in lead type (DC-06); list items and cells wrap like paragraphs (DC-07, `base.css`); four steps stay stacked until 64rem (DC-08; `Steps`'s new `wide` variant).
    - Not changed: `role="list"` (the project's lint forbids redundant roles), the shared closing zone's `home.*` keys (LOW, renaming touches Home), values off the token scale in the row's marker and the terms' widths (LOW).
    - Measured: the page is 6,522 px at 1440 (was 8,290); `npm run verify` (192 unit tests, 2.0 KB of JavaScript); E2E 63 on the build; console, overflow and axe clean at 320–1920 px in both languages; every part drawn after a slow scroll, nothing hidden without JavaScript; Home pixel-identical. Larger root text (150–200%) overflows narrow phones on Home and Usluge alike, in Home's service titles, the price lines and the title block: for phase 5 (accessibility).
