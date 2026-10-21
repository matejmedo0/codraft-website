# Phase 3: Pages (Izrada stranica)

- **Status:** Not started. Phase 2 and its review are done (PR #2); the next session starts at [Start here](#start-here-2026-10-21).
- **Branch:** `phase/3-pages`, created from `main` once PR #2 is merged.

## Start here (2026-10-21)

The handover from phase 2. Phase 2 ended with the client's review refinements, the design critique and its re-check, the Figma sync and the final checks ([2-design-review.md](2-design-review.md), batches 1–40). The client asked for this handover with: „sredi dokumentaciju i daj mi prompt onda za novu sesiju ( fazu 3)“ (#134).

**1. The phase gate, first** ([codraft-workflow.md](../../.claude/rules/codraft-workflow.md#phase-gate), step 7). The prompt that opens the session carries the client's „idemo dalje“. Then:
1. Check that `phase/2-design` is clean and pushed, and that CI on PR #2 is green (last: `64437d7`, green).
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
  - **19, values off the token scale:** when Home's zones leave the lab, map each value to its nearest token or name it as a token; the client's own numbers (such as the closing band's padding, #37) stay.
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

_Not started. The handover from phase 2 is under [Start here](#start-here-2026-10-21)._
