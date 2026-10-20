# Phase 3: Pages (Izrada stranica)

- **Status:** Not started
- **Branch:** `phase/3-pages`

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

## Log

_Not started._
