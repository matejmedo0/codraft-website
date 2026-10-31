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
- **2026-10-23, third session of phase 3**
  - **M8**, verbatim:

    > idemo redom , radimo po mojim pravilima page od sad , za početak kreiraj po starom template-u početne stranice novi page (stari ne briši ovaj smjesti u odvojeni folder )
  - **What M8 decided:** from here the pages are made step by step, by the client's rules, one instruction at a time. The first step: the current Home is kept, unchanged, as the old version, and the new Home starts as its copy.
  - **The old Home, archived:** `src/views/HomeView.astro` and `src/views/home/` copied to `src/lab/archive/home-v1/` (only the imports' depth changed; the plan's unit test stays with the original), shown at `/lab/pocetna-stara`. The new Home is the page at `/` and `/en` (`src/views/HomeView.astro`, `src/views/home/`), identical to the old one until the client's next instruction. The archive shares the design system, the locale keys (`home.*`), the services' catalogue, the team and `ClosingZone` with the new page, so a change to the new page made in those places shows in the archive too; such changes get their own keys or files.
  - **M9**, verbatim:

    > dobro napravi je skroz odvojeno i daj mi localport za novi prazni page
  - **What M9 decided:** the new page is fully apart from the current Home: its own folder and its own address, in the old Home's frame (the header, the sheet and the title block) with an empty sheet. The current Home stays at `/` and `/en`, unchanged; its copy in the lab archive stays too.
  - **The new page:** `src/views/new-home/` (`NewHomeView.astro`, empty), shown at `/lab/nova-pocetna` (the dev server and lab builds only, noindex). Its zones go in that folder and its copy gets its own locale keys, so nothing it changes reaches the current Home. It shares only the site's frame (BaseLayout, Header, Sheet, Footer) and the design system.
  - **M10**, verbatim:

    > Promijeni cijelu stranicu pozadinu na navy tamnu pozadinu koju smo dodali u novoj color paleti
  - **The new page on the dark navy** (M10): the whole page, the margin around the sheet included, is on the new palette's navy `#11252c` with its tones from `/lab/paleta` (paper `#f2f1ef` for text and the sheet's frame, grey `#babcbd` for muted text, teal `#7dbed4` for links' accent text). The values sit in a global style in `src/views/new-home/NewHomeView.astro`, loaded only on this page, with `.surface-navy`'s roles on `:root`; the current Home and the other pages are unchanged (`/` still on paper). The wordmark keeps its brand blue accent, as in every palette. Checked at 375, 768 and 1440 px, the mobile menu open included: console clean, no overflow, axe clean but for the missing `h1` of the empty page.
  - **M11**, verbatim:

    > Odlično , napravi da obrub , odnosno ovaj vanjski layer tehničkog papira bude dinamičan s obzirom na ekran s kojeg netko gleda odnosno zoom in zoom out ako razumiješ.
  - **What M11 decided** (the client chose "Prati rub ekrana", Claude's recommendation, over a frame of constant size with only the content zooming): the frame follows the screen's edges at every width and zoom, and the number of fields on its edges follows the screen.
  - **The new page's sheet** (`src/views/new-home/NewHomeSheet.astro`; the site's `Sheet.astro` is unchanged): no maximum width, so the frame keeps its margin to the screen's edges at any width or zoom (past 1920 px the site's sheet stops and centres). Numbers along the top and letters A, B, C… down the left, one field per 200 px or so, stretched to fill the edge; a CSS grid fits as many as there is room for and clips the rest, without JavaScript. Two fields at least on phones, where the margin is now 12 px (was 8; 12 still keeps the title block's cells as they were at 375 px). The zones' own letters give way to the rows'. The lab page composes the frame like SiteLayout, on this sheet.
  - **Measured** (zoom simulated as a wider viewport at a lower pixel ratio): 2 fields at 375 px, 3 at 768, 6 at 1440 as before, 9 at 1920, 14 at 1440 zoomed out to 50%, 3 zoomed in to 200%, 38 at 2560 zoomed out to 33%; the frame 12 px from the edges on phones and 24 px from 768 px, at every zoom. Console clean, no overflow, axe clean but for the empty page's missing `h1`.
  - **M12**, verbatim (a question; answered in chat with the new page's colours and the new palette from `/lab/paleta`, nothing changed):

    > Odlično sad mi reci paletu boja koju koristimo ?
  - **M13**, verbatim, with two images: a mockup ("Moja preporuka — Midnight Studio": a dark studio page, a muted teal kicker and second line in the H1, a teal primary button and an outlined secondary one, two cards) and the palette ("Nova paleta"): main background, Midnight navy `#0B181D`; cards and sections, Deep teal navy `#11252C`; elevated surface `#193139`; hover, interactive surface `#23414A`; main text, Soft ivory `#ECEDEA`; muted text, Muted silver `#AAB8BB`; accent, Muted teal `#82BBC5`; borders, Subtle border `#28434C`. "Odnos boja na stranici": 65% background, 20% surfaces, 10% text, 5% accent, "an illustrative ratio of visual presence, not a rule to follow strictly".

    > Ovo je nova jednostavnija paleta , zapiši pravilo za ovu stranicu novu , te primjeni na stranicu
  - **What M13 decided:** the new page's palette is Midnight, in place of M10's navy; the rule is written down. The new page's rules, this one included, are in [new-home-rules.md](../new-home-rules.md), and [ADR 0033](../decisions/0033-new-home-by-the-clients-rules.md) records M8–M13: pages step by step by the client's rules, the new Home apart, the frame that follows the screen, Midnight.
  - **Midnight on the page** (`NewHomeView.astro`): the eight colours as the page's own palette tokens, on the design system's roles (the mapping is in the rules): the background `#0B181D` on the page, the margin and the sheet; every line, the sheet's frame included, in the subtle border `#28434C`; text ivory, muted text silver; the accent teal for the focus ring, grips, the current page's line, links' accent text and primary buttons; cards and sections on `--surface-sunk` (`#11252C`). The wordmark keeps its brand blue. Contrast on all four surfaces: ivory 9.3–15.4:1, silver 5.3–8.8:1, teal 5.1–8.5:1; the border, decorative, 1.7:1. Checked at 375, 768 and 1440 px with the menu open: console clean, no overflow, axe clean but for the empty page's missing `h1`.
  - **M14**, verbatim (sent after an interrupted "mo"):

    > možeš li prilagoditi boju loga da ima dobar kontrast i da se vizualno lijepo uklapa u našu paletu boja
  - **The wordmark in the palette** (M14, [ADR 0034](../decisions/0034-new-home-wordmark-in-the-palette.md)): on the new page the wordmark's lettering is ivory `#ECEDEA` (15.4:1) and its arc, drafting line and grip are the accent teal `#82BBC5` (8.5:1), in place of the brand blue (4.0:1). In the header and the title block alike; the shapes are unchanged. The rules ([new-home-rules.md](../new-home-rules.md)) are updated.
  - **M15**, verbatim (sent again after an interrupted first version):

    > Odlično dodaj hero sekciju praznu da je velika preko cijelog ekrana u smislu da je i dalje u Sheetu našem ali da je velika da korisnik kada uđe na stranicu vidi gore izbronik stranica i hero sekciju samo , te da skrolom tek otkvira sljedeću sekciju
  - **The hero** (M15, `src/views/new-home/NewHomeHero.astro`, rule 4 in [new-home-rules.md](../new-home-rules.md)): an empty section at the top of `<main>`, on the main background, `min-height: calc(100svh - var(--sheet-margin) - 4.125rem)`. The header is 4.2–4.3rem tall at every width (67–69 px at 16 px), so taking off a little less puts the hero's bottom just below the fold, in CSS only. Measured: 2–4 px below the fold from 320×568 to 1920×1080, at 50% and 200% zoom and with 150% text on a laptop; on a 375 px phone with 125% text the header wraps to two lines and the hero ends 71 px below the fold. The next part stays out of view in every case. Console clean, no overflow, axe clean but for the missing `h1`.
  - **M16**, verbatim, with a screenshot of the header's links (Usluge, Tehničko crtanje, O nama, Kontakt):

    > Odlično sada centriraj ovo , logo ostaje lijevo a engleski desno , i smanji weight fonta da je više premium
  - **The header** (M16, `src/views/new-home/NewHomeHeader.astro`, a copy of `Header.astro`; rule 5 in [new-home-rules.md](../new-home-rules.md)): from 64rem a three-column grid (`1fr auto 1fr`), the nav spanning the last two through a subgrid, so the links centre on the header with the wordmark on the left and EN on the right; the links and EN at weight 400 (was 500), the lightest the self-hosted Archivo carries (400–700). Measured at 1024–2880 px: the links 0 px off the header's centre, the header's height unchanged (67 px), so the hero still ends 2–4 px below the fold. The phone menu opens and closes as before. Console clean, no overflow, axe clean but for the missing `h1`.
  - **M17**, verbatim: a pasted recommendation, then the client's instruction.

    > 1. Da, povećao bih font u navigaciji
    > Na slici je navigacija vizualno presitna u odnosu na širinu zaslona. Logo također može biti malo dominantniji.
    > Element	Moja preporuka
    > Logo Codraft	26–30 px
    > Navigacijske poveznice	14–15 px, medium
    > EN oznaka	13–14 px
    > Visina navigacije	76–84 px
    > Razmak poveznica	28–36 px
    > Boja navigacije	#BEC8CA
    > Hover / aktivna poveznica	#ECEDEA
    >
    > Ne bih išao na 17–18 px navigaciju. Premium dizajn ne zahtijeva velike navigacijske elemente, nego dobro odmjerenu tipografsku hijerarhiju.
    >
    > I još jedna bitna promjena: iz navigacije bih uklonio zasebnu stavku Tehničko crtanje.
    >
    > Odradi ovako
  - **What M17 changed** (the pasted recommendation, applied as written; rule 5 in [new-home-rules.md](../new-home-rules.md) rewritten): Tehničko crtanje is out of the new header's links (the phone menu too); from 64rem the header is 77.5 px tall (`padding-block: var(--space-4)`), the wordmark 28.5 px tall (`--wordmark-width: 8.25rem`), the links 15 px (`--step-small`) and EN 13 px (`--step-label`), both on the type scale, the links 32 px apart (`--space-6`); the links and EN medium (500, in place of M16's 400) in a new navigation colour `#BEC8CA` (`--nav-ink`, 11:1), ivory on hover and for the current page. The links were 17 px before, so 15 px is smaller in pixels, as the recommendation's numbers say ("Ne bih išao na 17–18 px"); the taller header and the larger wordmark give the bar its weight. Below 64rem the sizes stay the site's, so the header keeps one line at 320 px. The hero takes off 4.75rem from 64rem for the taller header: 0.5–2.7 px below the fold at 1024–1920 px, 50% zoom and 150% text. Console clean, no overflow, axe clean but for the missing `h1`.
  - **M18**, verbatim:

    > Povećaj proporcionalno veličine elemenata u topbaru da su malo više vidljivi ali ne previše
  - **What M18 changed:** from 64rem every size in the new header is M17's times one factor, `--topbar-scale: 1.125` (on `:root` in `NewHomeView.astro`): the header 87 px (was 77.5), the wordmark 32 px (28.5), the links 16.9 px (15), EN 14.6 px (13), the links 36 px apart (32), the header's and the wordmark's padding with them. The hero takes off `4.75rem * var(--topbar-scale)` from 64rem, so it stays 2.5–2.8 px below the fold at 1024–1920 px, 50% zoom and 150% text. Phones unchanged. The links stay 0 px off centre. Console clean, no overflow, axe clean but for the missing `h1`. Rule 5 in [new-home-rules.md](../new-home-rules.md) updated.
  - **M19**, verbatim:

    > Imam ideju radimo centrirane elemente u topbar-u te mičemo doljni border line skroz
  - **What M19 changed** (the client chose "Sve u jednoj grupi", Claude's recommendation, over the wordmark above the links and the wordmark in the centre between the links and EN): the new header has no rule below it, on every width, so it runs into the hero; from 64rem the wordmark, the links and EN sit in one row in the header's centre (`justify-content: center`), 54 px apart (`--space-8` times the factor) with the links 36 px apart, in place of M16's three columns. Measured at 1024–1920 px: the group 0 px off the header's centre, one row, the header 86 px. Below 64rem the wordmark and the menu button stay at the edges. The hero, 1 px taller with the rule gone, still ends 1.5–3 px below the fold. Console clean, no overflow, axe clean but for the missing `h1`. Rule 5 in [new-home-rules.md](../new-home-rules.md) updated.
  - **M20**, verbatim:

    > u redu s time da tri elementa usluge o nama i kontakt moraju biti centrirani a logo mora biti od toga udaljen na lijevo 48px × faktor i en hr switch element s desne strane isto toliko 48px × faktor ako me razumiješ i dalje ostaje u jednom recu samo su tri elementa centrirana a ne evi elementri jer ovako logo je veći pa ne ispada lijepo da je cijela grupa elemenata centrirana
  - **What M20 changed:** from 64rem the three links are centred on the header and the wordmark and EN sit beside them, 54 px away on each side (`--space-8` times the factor): a three-column grid (`1fr auto 1fr`) with the gap between the columns, the wordmark at the end of the first column, the nav spanning the other two through a subgrid, EN at the start of the third. Measured at 1024–2880 px: the links 0 px off the header's centre, 54 px from the wordmark and from EN, one row, the header 86 px; the hero still 1.5–3 px below the fold. Console clean, no overflow, axe clean but for the missing `h1`. Rule 5 in [new-home-rules.md](../new-home-rules.md) updated.
  - **M21**, verbatim:

    > Dobro daj mi samo negdje da vidim kako bi izgledao u dva reda kao prva druga opcija koju si predložio logo gore ostali elementi ispod
  - **The two-row header, as a preview** (M21; option 2 of M19): `NewHomeHeader.astro` takes `layout="stacked"`, which from 64rem centres the wordmark on a row of its own above the links and EN (the links centred, EN 54 px to their right, as in M20; 9 px between the rows, times the factor). Shown at `/lab/nova-pocetna-dva-reda`; `/lab/nova-pocetna` keeps one row, unchanged. Measured at 1024–1920 px: the wordmark and the links 0 px off centre, the header 137 px (86 in one row). The hero there is still computed for one row, so it runs about 51 px past the fold; nothing below it shows. No rule changes until the client chooses.
  - **M22**, verbatim:

    > Dobro sada EN / HR switch gumb dodaj desno gore u topbar kao floating element sa krugom iza njega konrastne boje iz palete ( pretpostavljam bijele )
  - **What M22 changed:** from 64rem EN leaves the row and floats at the header's top right (`position: absolute`, at the header's top padding and right padding): a circle 2.75rem times the factor (50 px), ivory with midnight text (15.4:1), teal on hover (8.5:1) with the grips, the teal focus ring. It lines up with the wordmark's row in one row and in two (0.3 px off). The links stay centred and the wordmark 54 px left of them. Below 64rem EN stays in the phone menu (no room at 320 px). Both lab pages, `/lab/nova-pocetna` and `/lab/nova-pocetna-dva-reda`: console clean, no overflow, axe clean but for the missing `h1`; EN reached by Tab, named "EN (English)". Rule 5 in [new-home-rules.md](../new-home-rules.md) updated.
  - **M23**, verbatim (about the language circle of M22):

    > napravi glass efekt pozadine da je proziran i malo ga smanji
  - **What M23 changed:** the language circle is glass: `color-mix` of ivory at 10% over the header with `backdrop-filter: blur(12px)`, an ivory rim at 30% and a faint inner highlight; its text turns ivory (12:1 on the mixed fill; midnight would be unreadable on it), a teal tint on hover (22%, 9.9:1). It is smaller, 2.5rem times the factor (45 px, was 50), and its top is reworked so it stays centred on the wordmark's row (0 px off, one row and two). The header behind it is solid today, so the blur shows only once something passes behind it. Axe clean on both lab pages but for the missing `h1`. Rule 5 in [new-home-rules.md](../new-home-rules.md) updated.
- **2026-10-29, fourth session of phase 3 (the new Home, section by section)**
  - **M24**, the prompt that opens the session, verbatim:

    > Nastavljamo redizajn nove početne stranice Codrafta, sekciju po sekciju. Pričaj sa mnom na hrvatskom.
    >
    > 1. Na početku pročitaj:
    >    - CLAUDE.md, PROGRESS.md i .claude/rules/git-workflow-local.md (moja git pravila; imaju prednost pred ostalima)
    >    - docs/new-home-rules.md (pravila nove početne)
    >    - u docs/phases/3-pages.md dnevnik od M8 do M23
    >    - ADR 0033 i 0034
    >
    > 2. Git, prije bilo kakve izmjene:
    >    - git fetch, pa provjeri je li origin/phase/3-pages već spojen u origin/dev.
    >    - Ako jest: napravi granu feature/new-home-sections od svježeg dev.
    >    - Ako nije: stani i pitaj me treba li granu napraviti od phase/3-pages ili čekati da kolega spoji PR #3 u dev.
    >    - Nikad ne commitaj na dev, main ni phase/3-pages.
    >
    > 3. Pokreni npm run dev u pozadini i daj mi linkove:
    >    - http://localhost:4321/lab/nova-pocetna
    >    - http://localhost:4321/lab/pocetna-stara
    >    - http://localhost:4321/
    >
    > 4. Redizajn ide jednu sekciju po jednu, u src/views/new-home/:
    >    - Prvo hero, koji je sada prazan. Zatim ostale zone redom kao na staroj početnoj.
    >    - Za svaku sekciju: ukratko predloži 2–3 smjera s preporukom, pa čekaj moju odluku. Ne gradi ništa bez nje.
    >    - Kad gradiš: pazi na paletu Midnight, okvir lista i pravila iz new-home-rules.md. Provjeri izgled na 375, 768 i 1440 px, bez grešaka u konzoli i s ispravnim reduced motion.
    >    - Svaku moju poruku upiši doslovno u dnevnik kao M24, M25 itd. Novo pravilo upiši u docs/new-home-rules.md. Svaku sekciju commitaj zasebno (Conventional Commits).
    >    - Prava početna na / i /en ostaje netaknuta dok ne kažem drukčije.
    >
    > 5. Pravila za skillove i tekst:
    >    - Impeccable (critique, polish, typeset) i motion-design koristi gdje pomažu, ali moja pravila i zabilježene odluke uvijek imaju prednost.
    >    - Nalaze Impeccableove automatske provjere samo mi javi, ne popravljaj ih sam.
    >    - Tekst ide prvo u docs/content.md.
    >    - Nikad "projektiranje" ni srodni izrazi za tehničko crtanje.
    >
    > 6. Kad kažem da je sekcija ili stranica gotova:
    >    - npm run verify i E2E testovi,
    >    - push grane, PR u dev, squash merge kad CI prođe (prema git pravilima),
    >    - nikad ništa u main.
  - **The branch** (M24, item 2): after `git fetch`, `origin/phase/3-pages` was not merged into `origin/dev` (`dev` still ends at phase 2, without `src/views/new-home/`), and PR #3 targets `main`, not `dev`. Asked, the client chose to branch from `phase/3-pages` (Claude's recommendation) over waiting for PR #3: `feature/new-home-sections` from `origin/phase/3-pages`. Until PR #3 reaches `dev`, this branch's PR into `dev` carries phase 3 with it. The dev server was already up on 4321.
- **2026-10-29, fifth session of phase 3 (the new Home, redesigned as one scroll-drawn page)**
  - **M25**, the client's message, verbatim (it came twice, the first time interrupted):

    > http://localhost:4321/lab/nova-pocetna
    >
    > Kompletno redizajniraj pocetnu stranicu koju sam krenuo redizajnirati , zaboravi pravila koja smo zapisali u dokumentaciji.
    > Hoću profesionalnu animiranu scroll based stranicu koja je lijepo i kvalitetno složena
    > Imaš impecable design skillove i pravila generalna za motion design i pravila koristi ih i složi kompletno novu animiranu scrol based stranicu.
    > Imaš i mcp za browsanje ako nađeš što zgodno preko mcp-a si možeš pomoći https://www.awwwards.com/ na toj stranici ima puno primjera animiranih scrol based stranica.
    > Opet zapamti da se drži profesionalne strukture i da je lijepo složena.
    > Kreni imaš moje odobrenje
  - **What M25 changed** ([ADR 0035](../decisions/0035-new-home-drawn-by-the-scroll.md)): the whole page below the header, in one go, as "the sheet the scroll drafts": the pen on the left frame, the hero's site drawing that drafts itself on load, the three stages with sticky heads and rows whose rules and icons draw as they arrive, the free audit as one panel with the line through its steps, the house plan as a pinned scene scrubbed by the scroll (the current Home's `PlanDrawing.astro` reused unchanged, driven by `plan-scrub.ts`), "Kako radimo" as three statements, the team's drafted frames, and the closing zone entered by a drafting line with its grip. CSS scroll-driven animations throughout, guarded by `@supports` and reduced motion; no library. Three new locale lines for the site drawing (`newHome.drawing.*`). The header, the sheet, the palette and the wordmark are as the client set them (rules 1–3 and 5). Impeccable's concept round and PRODUCT.md interview were skipped on the client's "kreni, imaš moje odobrenje"; its design detector ran clean, and of its finish reviewer's findings three were applied (the hero drawing larger, with its title block kept at every width, the stage numbers on the heading's own line instead of a label above it, and the title block's timed selection line off on this page) and four were not (a PRODUCT.md and a seed reference, process artefacts the project doesn't keep; a balanced H1 on phones, already the case through base.css; a top-anchored hero, kept centred). Awwwards was not browsed (the Chrome MCP was held by another session). `npm run verify` green; screenshots at 375, 768 and 1440 px with no console errors; the pinned scene checked at 15, 45, 75 and 100 % of its track. Not merged: the client reviews the page first.
- **2026-10-29/30, after M25 (the revert and its undoing, "Što radimo" as a zig-zag)**
  - **M25a**, verbatim: "ovo ne valja, vrati na verziju prije ovog". The redesign was reverted (f55d846), the PR closed, the page back at M23's empty hero.
  - **M25b**, verbatim: "daj mi link te stranice da je pogledam, ovaj je istekao". The dev server had been down, so the client had not seen the redesign; it was started again on 4321 and the reverted redesign served for comparison from a scratch worktree on 4322 (removed afterwards).
  - **M26**, with a screenshot of "Što radimo" on the redesign, verbatim:

    > zelim da ova kompletna sekcija "što radimo" u potpunosti scroll based. znaci dok skrolam da mi jedna stavka dolazi recimo s lijeva na desno i sljedeca stavka s desna na lijevo. ovo mi je predosadno i monotono
  - **What M26 changed:** the redesign returned to the branch (0822055 undoes the revert; ADR 0035 stands) and "Što radimo" became a zig-zag the scroll pulls in: no sticky head any more; each stage's head (its number large in the accent, title and tagline) slides in from the left, and its services alternate, the first from the right, the next from the left, each on its own half of the sheet from 64rem, with larger titles (`--step-chapter`) and 56 px icons. The slides are view-timeline animations (position and opacity, `entry 0% cover 30%`, 24vw from 64rem and 16vw below), so scrolling back slides the rows out again; the zone clips sideways so the page never scrolls horizontally. The row rules are plain again; the icons still draw as the row lands. Reduced motion and browsers without scroll-driven animations get the rows in place. Checked at 1440 and 375 px, no console errors, no horizontal scroll.
  - **M27**, with a screenshot of the zig-zag, verbatim:

    > zelim da mi ovo izade kao jedna cjelina ili eventualno kao dva dijela koja izadu sa strana. nemoj da svaki red za sebe izlazi
  - **What M27 changed:** a stage now comes in as two halves on one view timeline per stage: its head from one side and its services, as one group, from the other. Stage 02 is mirrored (services on the left, head on the right from 64rem), so the zone still goes zig-zag while the rows of a stage stay together. Phones keep one column, with the head and the group sliding from opposite sides. Checked at 1440 and 375 px, no console errors, no horizontal scroll.
  - **M28**, verbatim:

    > ova tu sekcija ne zelim da se pomice odnosno da animacija radi dok skrolam nego da animacija ide cim dodem na taj dio stranice. usput napravi mi takvu projekciju za neku stambenu zgradu od recimo 4 kata s penthousom i dvoristem s bazenom i s druge strane zgrade nek budu parkirna mjesta. nek se nakon kraja projekcije ispod tog dijela stranice gdje se nalazi tekst lijevo od projekcije ispod pokazu presjeci i izracun bruto povrsine i kubatura
  - **What M28 changed** ([ADR 0036](../decisions/0036-new-home-building-scene-on-arrival.md)): "this section" was read as both the drafting scene and "Što radimo", so neither moves with the scroll any more; each plays once when it comes into view (`reveal.ts` for the stages, `building/building-scene.ts` for the drawing). The house plan and its pinned, scroll-scrubbed scene (`plan-scrub.ts`) are gone from the new Home (the current Home's `PlanDrawing.astro` is unchanged). In their place, `building/`: a residential building on a 52 × 32 m site, a courtyard with a 5 × 12 m pool on the west and eleven parking bays on the east; its site plan draws element by element, turns into a 3D view, and the storeys come down one on the other: the ground floor, three floors (24 × 12 m) and a penthouse set back to 16 × 10 m, 15 m high with its dimension. Then, under the text, sections A–A and B–B draw storey by storey with their levels (±0,00 to +15,00), and the schedule of gross floor areas and volumes comes in row by row: 4 × 288 m² + 160 m² = 1.312 m², 3.936 m³ at a 3 m storey height, computed from the same model (`schedule()`, unit-tested). "4 kata s penthousom" was read as four storeys (ground floor and three floors) plus the penthouse. All of it is labelled as an illustration (ADR 0004). New locale lines `newHome.building.*` (`docs/content.md`). Checked at 1440 and 375 px through the whole sequence, no console errors, no horizontal scroll.
- **2026-10-30, the new Home's hero (branch `feature/hero-code` from `dev`, after PR #7 was squash-merged into `dev` at the client's word: "sa brancha pushaj u development granu, nikako u main")**
  - **M29**, with a screenshot of the hero, verbatim:

    > ovo desno zamijeni nekom animacijom izrade coda i kako se taj code pretvara u web stranicu/aplikaciju, tekst centriraj i to sve takoder napravi s nekom animacijom
  - **What M29 changed** ([ADR 0037](../decisions/0037-new-home-hero-code-to-page.md)): the site drawing on the right is gone (`SiteDrawing.astro` and its three `newHome.drawing.*` lines removed). The hero's text is centred and comes in on load: the headline's two lines rise out of their baselines one after the other, then the lead, the button with the drafting link beside it, and the stage fade up. Under the text, `hero/CodeToSite.astro`: an editor in which fifteen lines of HTML type themselves at their own length (about 6.5 s in all, `hero/hero-code.ts`), a drafting line with its grip to a browser beside it, and in the browser the page those lines make, each part (the header, its logo and links, the headline, lead, image and button, three cards) appearing with a flash of the accent outline as its line is finished; the finished page is then selected with the four grips. Stacked on phones, side by side from 768 px. Decorative and hidden from assistive technology; reduced motion and no JavaScript show it complete. The sample page's words are placeholders ("Vaša tvrtka", "Nova web stranica", …), listed in `docs/content.md`. Checked at 1440, 768 and 375 px through the sequence, no console errors, no horizontal scroll.
  - **M30**, with three screenshots (the hero's lead, the two windows, the image in the browser), verbatim:

    > prva slika: ovo napravi da je u 2 reda.
    > za drugu :sliku na prvi skrol na stranici nek ova dva prozora postanu veca odnosno neka to postane hero sekcija
    > treca slika: nek u ovom prozoru bude animiran prikaz naseg codraft loga.
  - **What M30 changed** (branch `feature/hero-expand` from `dev`): the lead is up to 66 characters wide, so two lines on wide screens. On the first scroll down the hero gets `is-big` once (`hero/hero-expand.ts`): the stage widens from 72rem to the sheet's width and, from 64rem, the two windows grow to the screen's height, in 1.1 s; their contents are sized in container units, so the code, the sample page's type and its spacing grow with them. It doesn't follow the scroll and stays big; a page loaded already scrolled starts big; with reduced motion the change is at once. The sample page's image is now the Codraft wordmark on graph paper, drawn in as the image's line is typed (the lettering rises, the arc snaps, the drafting line draws, the grip snaps in), and drawn once more when the windows grow. Checked at 1440, 768 and 375 px, before and after the first scroll, no console errors, no horizontal scroll.
  - **M31**, verbatim:

    > ta dva prozora koje si sad animirao. napravi da postanu malo manji i da kad skrolam nazad gore da se opet smanje
  - **What M31 changed** (branch `feature/hero-expand-back` from `dev`): grown, the stage is at most 76rem wide (was the sheet's full width) and, from 64rem, the windows 76% of the screen's height (was the screen less 80 px), their contents a step smaller to match. The growth is now reversible: `hero-expand.ts` adds `is-big` when the page is scrolled more than 8 px down and removes it back at the top (2 px or less), so the windows shrink back with the same transition; it is still one state or the other, not tied to the scroll's position. The wordmark replays only on growing; shrunk back it stays drawn (`was-big`).
- **2026-10-30, the new Home's art direction (branch `feature/home-nike` from `dev`)**
  - **M32**, verbatim:

    > aj mi sad kompletnu tu stranicu napravi tako samo ju napravi kao da ju radis npr za Nike. onako moderno i elegantno ali techi
  - **What M32 changed** ([ADR 0038](../decisions/0038-new-home-art-direction.md)): the whole page took one art direction, "Nike × technical drawing", keeping its copy, links, the Midnight palette, the wordmark and every approved animation. Display type is Archivo at its narrowest width (75%), bold, in capitals, set tight and large: the hero's headline is sized so its first line spans the sheet, and every zone's title runs to about 9.5rem; the services', steps' and team's names are in the same capitals; small numbers and labels are in the system monospace. Buttons are pills. A running strip of the services' names, filled and outlined in turn with a grip between, sits between the hero and "Što radimo" (`NewHomeTicker.astro`, 60 s a run, a pause button, still with reduced motion). The free audit is the page's one ivory band, its roles inverted (deep teal for lines and grips, every text colour AA on ivory), its three steps in a row of grips joined by drawn lines. "Što radimo" keeps its zig-zag, with the stage numbers outlined at up to 10rem. "Kako radimo" is a manifesto of three statements, "Tim" two tall frames with corner grips set a step apart, and the closing question runs up to 10.5rem with the pill beside the lead. The header's links are in condensed, tracked capitals. The zones that come in on arrival use `reveal.ts`. New locale lines `newHome.ticker.pause` and `.play`. Checked at 1440 and 375 px through every zone, no console errors, no horizontal scroll.
  - **M33**, verbatim (the first attempt was interrupted):

    > ova ogromna slova su prevelika. smanji to. i ova dva prozora isto smanji
  - **What M33 changed** (branch `fix/home-smaller` from `dev`): the display type a size smaller everywhere: zone titles to at most 5.25rem (were 9.5), statements 2.75rem (4.25), rows 1.75rem (2.125), the hero's headline to at most 4.5rem with its first line about two thirds of the sheet (was the whole sheet, up to 7rem), the stage numbers 6rem (10), the stage titles 2.625rem (3.75), the strip 3.5rem (6), the closing question 6rem (10.5), its measure widened to 22ch so it no longer stacks in a narrow column. The two windows: at rest at most 60rem wide (were 72), grown at most 66rem wide (76) and 64% of the screen's height (76%). At 1440 px the browser window measures 448 × 377 at rest and 496 × 576 grown (was 544 × 379 and 576 × 684), and still shrinks back at the top.
  - **M34**, verbatim: "ovo mi makni ne svida mi se" (with a screenshot of the running strip).
  - **What M34 changed** (branch `fix/remove-ticker` from `dev`): the running strip between the hero and "Što radimo" is gone: `NewHomeTicker.astro` and its locale lines `newHome.ticker.pause` and `.play` removed.
  - **M35**, verbatim: "ovu sekciju promijeni. zelim da na jednoj strani bude recimo 01 planiranje i desno od toga da bude neka animacija za to. 02 izrada isto da je to s opisom s jedne strane a s druge strane neki prikaz te izrade. razmisli onda jel i ova sekcija s druge slike potrebna." (with screenshots of "Što radimo" and of the hero's code-to-page animation).
  - **What M35 changed** (branch `feature/stage-drawings` from `dev`): each stage of "Što radimo" is its text (number, title, tagline, services) on one side and a drawing on the other, zig-zag as before; the two halves slide in from their sides on arrival (`reveal.ts`). 01 Planiranje: the site's map (`/` and Usluge, O nama, Kontakt) and a schedule of the three stages, the build ending on a grip (`stages/StageSketch.astro`, `kind="plan"`). 02 Izrada: the code-to-page animation, moved from the hero (`stages/CodeToSite.astro`, timed by `stages/code-to-site.ts` when it comes into view). 03 Održavanje i rast: a line rising after launch (`v1.0`), a grip for each regular update, no numbers (`kind="run"`). The drawings draw stroke by stroke, 250 ms a step; complete without JavaScript, with reduced motion, or in view on load. The hero is now its text only: the animation said what stage 02 says, so it went there, and with it the windows growing into the hero (M30, M31; `hero-expand.ts` removed). Checked at 1440, 768 and 375 px, no console errors, no horizontal scroll.
  - **M36**, verbatim: "https://torch-template.framer.website/?ref=a1.gallery pregledaj ovu stranicu i na osnovu ovih oblika i sekcija malo poslozi moju stranicu. zadrzi moje boje i temu ali zelim ovakav raspred slican".
  - **What M36 changed** (branch `feature/torch-layout` from `dev`): the reference's layout on the page's own palette, display capitals and drawing vocabulary. Shared shapes in `new-home.css`: rounded cards (`.nk-card`, 20 px, deep teal) with inner panels a step lighter (`.nk-panel`, 12 px), a teal eyebrow, and a title's last word in the accent (`TwoTone.astro`, `two-tone.ts`). Hero: split, the text left-aligned on the left (the second line in the accent, the drafting link now an outlined pill beside the primary one) and on the right a card of four small drawings that draw on load: site map, code, growth with updates, floor plan (`HeroBoard.astro`). "Što radimo": each stage a rounded card (text on one side, the drawing in an inner panel on the other, still zig-zag), its services under it in a row of columns (icon, title, line). Free audit: the ivory band set in as a rounded card. "Tehničko crtanje": title and lead, then one large card with the building and, beside it, its sections and schedule, then the three services in columns numbered in the eyebrow. "Kako radimo": three cards, the first tall. "Tim": three cards, the two people and one with the note and "Više o nama". New "Česta pitanja" before the closing: a centred title and four questions as rounded `<details>` rows with a teal plus (`NewHomeFaq.astro`). Closing: centred on graph paper. Not taken from the reference: its client logos and testimonials (no invented proof) and its header (the client's header rules stay). Checked at 1440 and 375 px, no console errors, no horizontal scroll.
  - **M37**, verbatim: "ova animacija nek krene isto kad i ovaj 3d model lijevo(neka prati skrol)" (with a screenshot of the sections and the schedule beside the building).
  - **What M37 changed** (branch `feature/analysis-with-model` from `dev`): the sections and the schedule no longer wait for the 3D view to finish (they started at 6 s); they run on the building's clock, started by the same scroll trigger. As the plan tilts (2.4 s) the ground and the schedule's head come in; each storey is then cut in both sections and gets its row in the schedule just as it comes down on the 3D building (from 3.6 s, 320 ms apart); the total and the note follow the last storey. The clock's times are shared from `building-model.ts` (`TILT_AT`, `STOREY_AT`, `STOREY_STEP`).
  - **M38**, verbatim: "presporo je. mora ranije krenuti ili biti znatno brzi".
  - **What M38 changed** (branch `fix/faster-building` from `dev`): the drafting scene both starts earlier and runs twice as fast. It starts once a tenth of the drawing is on screen (was 0.35), and one knob, `SPEED` in `building-scene.ts` (0.5), scales every time in it: the plan, the tilt (now set by the script from `building-model.ts`, no longer in `scene.css`), the storeys, the sections and the schedule. From the plan to the finished schedule takes about 3.3 s (was 6.6 s); the sections and the schedule still keep step with the storeys.
  - **M39**, verbatim: "meni je bitna ova desno animacija s presjekom i kubaturama. onda mora ranije krenuti".
  - **What M39 changed** (branch `fix/analysis-first` from `dev`): the sections and the schedule, the part the client cares about most, no longer wait for the plan and its tilt (M37 had them keep step with the 3D storeys, from 1.8 s). They run their own clock from the scene's start: the ground and the schedule's head at once, a storey in both sections with its row every 200 ms from 0.15 s, then the total and the note, all finished in about 1.4 s. The 3D building follows on its own clock, as before.

