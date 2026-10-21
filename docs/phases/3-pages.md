# Phase 3: Pages (Izrada stranica)

- **Status:** In progress, from 2026-10-22. Phase 2 was approved and merged into `main` (PR #2). Page 1, Početna: the argument approved (M2), the page built in both languages and critique 19 done; the `/check` procedure next, then the client's review.
- **Branch:** `phase/3-pages`, created from `main` after the merge of PR #2. Draft PR #3 is the phase report.

## Start here (2026-10-21)

The handover from phase 2. Phase 2 ended with the client's review refinements, the design critique and its re-check, the Figma sync and the final checks ([2-design-review.md](2-design-review.md), batches 1–40). The client asked for this handover with: „sredi dokumentaciju i daj mi prompt onda za novu sesiju ( fazu 3)“ (#134).

**1. The phase gate, first** ([codraft-workflow.md](../../.claude/rules/codraft-workflow.md#phase-gate), step 7). The prompt that opens the session carries the client's „idemo dalje“. Then:
1. Check that `phase/2-design` is clean and pushed, and that CI on PR #2 is green for its last commit, the handover (`docs: hand over to phase 3`).
2. Merge PR #2 into `main` with a merge commit (`gh pr merge 2 --merge`), then `git checkout main && git pull`.
3. Create `phase/3-pages` from `main` and push it.
4. Update the docs:
   - `PROGRESS.md`: current phase 3; phase 2 ticked
   - [2-design.md](2-design.md): status done and approved
   - this document: status in progress, a log entry
5. Open a draft PR for phase 3 early, so CI checks every push (as in phase 2).

If the prompt doesn't say „idemo dalje“ (or similar), ask before merging.

**2. The first page: Početna.** The approved design is the lab page `/lab/pocetna`; the production Home, `src/views/HomeView.astro`, is still a placeholder (the H1 only). Site code never imports from `src/lab/` (CLAUDE.md, Architecture), so phase 3 ports Home out of the lab:
- **Where the design lives:**
  - the zones: `src/lab/home/` — `HomeHero`, `ServicesAxis` with `ServiceItem`, `axis-line.ts`, `chapters.ts`, `services.css`; `HomeAudit`; `drafting/DraftingLegend` with `PlanDrawing`, `plan-*.ts`; `HomePrinciples`, `HomeTeam`, `HomeClosing`
  - the icons: `src/lab/home/icons/`
  - the copy: `src/lab/copy.ts`
  - the page: `src/lab/pages/pocetna.astro`
  - the design-system parts it uses are already in production (`src/components/ui/`, `src/components/site/`)
- **Where it goes:** the view in `src/views/`, its parts beside it or in `src/components/` as [architecture.md](../architecture.md) describes; UI strings in `src/locales/{hr,en}.json` through `content.md` first.
- **What changes on the way:**
  - the copy moves from `copy.ts` to the locales, with the English (#70)
  - values off the token scale map to tokens (critique 19)
  - the two local type sizes are decided (#59)
  - JSON-LD and metadata (SEO specifics below)
  - the page's argument comes first (step 1 below)
- **What doesn't change:** the client's decisions of the review (the hero as in `screenshots/phase-2/review/hero-reference-client.png`; the central axis; the drafting zone, option C; the house in palette 1; the motion rules in [motion.md](../motion.md)), and ADR 0015–0028.
- **The lab after the port:** `/lab/pocetna` and the comparison pages stay the record. Removing lab code needs the client's OK.

**3. The client's inputs.** Ask for each only when its page needs it ([PROGRESS.md](../../PROGRESS.md), „Trebamo od vas“, items A–G): Home needs the team (C: names, roles, photos) and shows the company data (A) in the title block. Until they arrive, the placeholders stay as in the lab.

**4. How the review worked, kept for phase 3** (the client's habits):
- Record each of the client's messages verbatim in this document's log before changing anything.
- Change only what the client asks; offer wider changes as options.
- A question such as „kako da… / ili da…?“ asks for a proposal; wait for an explicit OK.
- The client reviews live on the dev server (port 4321), with Windows "Animation effects" on.
- Commit with `git commit -F` and push after each batch or page.

**5. Working notes that still apply:** [2-design-review.md](2-design-review.md#handover-2026-10-21) („Working notes“) and [Pitfalls from this phase](2-design-review.md#pitfalls-from-this-phase). In short:
- a component's `<script>` renders in place
- the CSP blocks inline styles, so per-element values go in through the CSSOM
- Playwright scripts live in `.playwright-mcp/`; run them with `MSYS_NO_PATHCONV=1` in Git Bash
- the lab build checks run on port 4322
- E2E needs port 4321 free
- a new lab page needs `astro.config.ts` touched
- the floor plan keeps its own pace (`data-draw-steady`), so a slow-scroll check waits about 10 s where it is on the page

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

- **English copy** (#70): S17–S19 and every Croatian change of the review, aligned page by page as each page is built in both languages. The changes are listed in [content.md](../content.md) ("Prototype copy" and the changelog): the hero lead, the one-line services, `drafting.3d.*`, the drafting zone of batch 9, "Kako radimo" of batch 10, the closing call to action of batch 11, the floor plan's title block and accessible names (#58, #63–64). The English changes only through suggestions the client approves.
- **Home's two local type sizes** (#59): when "Što radimo" moves out of the lab, decide whether `--step-service` (19 px at 1440, `src/lab/home/services.css`) and `--step-heading` (25 px, `Steps.astro`) become steps of the type scale or merge into their neighbours; with `--step-title` at 22 px they are three sizes 3 px apart ([inspector's note](../research/2026-10-20-taste-skill-inspect.md#measured-and-real-but-not-defects)).
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
