# Information architecture

> **Status (2026-10-18):** the launch sitemap has been agreed in the approved plan (see [ADR 0003](decisions/0003-launch-sitemap.md)). Slugs and labels stay provisional until the client approves the Croatian terminology ([content.md §1](content.md#1-glossary-hr--en)). They become permanent at launch.

## Principles

- **Small and focused.** Every page has one job and one primary call to action.
- **Ask once.** The free-audit button appears at most once on a page, in the section that explains the audit. The header has no button, and the closing call to action invites a conversation ("Pošaljite upit") ([ADR 0017](decisions/0017-one-audit-call-to-action-per-page.md)).
- **Croatian first.** Croatian lives at the root and English under `/en` ([ADR 0002](decisions/0002-croatian-default-english-secondary.md)).
- **Two audiences, two paths.**
  - Small and medium businesses want a website, software or AI tools. Their path ends at the free audit.
  - Architecture practices and construction companies need drafting capacity ([ADR 0018](decisions/0018-drafting-for-architecture-and-construction.md)). Their path ends at a quote request.
- **Trust from verifiable proof only** ([ADR 0004](decisions/0004-verifiable-proof-only.md)).

## Launch sitemap

| # | Page | HR (default) | EN | Purpose | Primary CTA | Phase |
|---|---|---|---|---|---|---|
| 1 | Početna / Home | `/` | `/en` | Explain the offer in 5 seconds; send drafting clients down their own path | Rezervirajte besplatnu analizu (once, in the free audit teaser) | 3 |
| 2 | Usluge / Services | `/usluge` | `/en/services` | All 8 services in 3 stages (Plan, four Build, three Run & Grow), how we work together, FAQ | Rezervirajte besplatnu analizu (once, in `#planiranje`) | 3 |
| 3 | Tehničko crtanje / Engineering Drafting | `/tehnicko-crtanje` | `/en/engineering-drafting` | B2B drafting offer for architecture and construction | Zatražite ponudu | 3 |
| 4 | O nama / About | `/o-nama` | `/en/about` | Code + Draft story, team, how we work, how this site was built | Pošaljite upit | 3 |
| 5 | Besplatna analiza / Free audit | `/besplatna-analiza` | `/en/free-audit` | What we check and what you get; form, then time slot | Nastavite na odabir termina (form submit, leads to booking) | 3 (form: 4) |
| 6 | Kontakt / Contact | `/kontakt` | `/en/contact` | General enquiries and drafting quote requests | Pošaljite upit | 3 (form: 4) |
| 7 | Privatnost / Privacy | `/privatnost` | `/en/privacy` | GDPR privacy notice | — | 3 |
| 8 | Kolačići / Cookies | `/kolacici` | `/en/cookies` | Cookie list; reopen cookie settings | Postavke kolačića | 3 |
| 9 | Impresum / Legal notice | `/impresum` | `/en/legal-notice` | Company data required by ZTD and ZET (see [compliance.md](compliance.md)) | — | 3 |
| 10 | Izjava o pristupačnosti / Accessibility statement | `/pristupacnost` | `/en/accessibility` | Voluntary, honest statement (target WCAG 2.2 AA) | — | 3 (finalised: 6) |
| 11 | 404 | unknown paths under `/` | unknown paths under `/en` | Localised recovery ("Ova stranica nije na nacrtu.") | Home / Services | 3 |
| P4 | AI asistenti / AI assistants | `/usluge/ai-asistenti` | `/en/services/ai-assistants` | The service plus the live chatbot demo | Isprobajte asistenta | 4 |
| Later | Radovi / Work | `/radovi`, `/radovi/<slug>` | `/en/work/…` | Case studies, once real projects exist | — | 8 |
| Later | Blog | `/blog/<slug>` | `/en/blog/…` (selected posts only) | Local SEO content | — | 8 |

### Why the pages are split this way

**Free audit and Contact are separate pages.**
- They serve different people with different forms: a business owner booking a call, and an architect asking for a quote.
- The drafting page also embeds the shared contact form, with the topic preset to "Tehničko crtanje".

**One Services page with anchors at launch, not eight service pages.**
- The existing copy is about 20 words per service. Eight pages in two languages would mean 16 thin pages. Padding them is exactly the low-value content that Google's quality systems demote.
- For a small Croatian studio, local rankings depend more on other factors:
  - the Google Business Profile ("Profil tvrtke na Googleu")
  - reviews
  - consistent name, address and phone everywhere
  - a strong home page

**Rule for giving a service its own page.** A service moves to `/usluge/<slug>` (EN `/en/services/<slug>`) when, in both languages, it has:
- at least one real case study or demo, and
- about 400 words or more of specific content: process, deliverables, price range, FAQ.

The block on `/usluge` then becomes a summary that links down to the new page.

Planned order:
1. AI asistenti (phase 4, built around the chatbot demo)
2. Web stranice i web trgovine (after the first case study)
3. SEO i lokalna vidljivost

### Navigation and footer

**Header**
- HR: Usluge · Tehničko crtanje · O nama · Kontakt · EN
- EN: Services · Engineering Drafting · About · Contact · HR
- No button: the header serves both audiences, so it offers no sales action ([ADR 0017](decisions/0017-one-audit-call-to-action-per-page.md)).
- The language switcher links to the *same page* in the other language; it does not go to the home page.
- No "Radovi" item until real case studies exist.

**Footer**
- Legal links: Privatnost, Kolačići, Impresum, Izjava o pristupačnosti.
- "Postavke kolačića" reopens the consent dialog.
- Contact details.
- Company data (OIB, MBS or craft register number). In design direction A this is styled as a drawing title block (see [phases/2-design.md](phases/2-design.md)).

## Internationalisation and URLs

**Locales**
- `hr` is the default and has no prefix.
- `en` lives under `/en`.
- `<html lang>` is set per locale.

**One route map**
- A single map (page id → `{ hr, en }` slug) drives the navigation, the language switcher, hreflang, `sitemap.xml` and canonical URLs.
- Nothing is hard-coded per page.

**hreflang**
- Reciprocal `hr` ↔ `en` on every page.
- `x-default` → EN, so visitors whose language is neither Croatian nor English (e.g. foreign drafting clients) get English.

**Redirects and errors**
- No redirects based on `Accept-Language` or IP address; the visitor chooses.
- The 404 page is localised.

**Slug rules**
- Lowercase ASCII with hyphens: č and ć → c, đ → d, š → s, ž → z.
- Slugs never change after launch. If one must, add a 301 redirect.

**Translations in code**
- UI strings go in JSON locale files (the format `i18n-sync` works on).
- Long copy goes in per-locale content files.
- Both are generated from the block IDs in [content.md](content.md).

## Page outlines

Legend: **P** = the copy exists in [content.md](content.md) (block IDs given) · **I** = derived from existing copy or decisions, no new claims · **N** = gap ([content.md §4](content.md#4-content-gaps), gap IDs given).

### Početna / Home (`/`)

1. **Hero**
   - H1 (N, G1).
   - Subline: `services.intro` (P).
   - CTA: "Pogledajte usluge" (I), and the link to Tehničko crtanje. No audit button here (ADR 0017).
   - The wordmark's blue drafting line draws once, if the client approves the logo animation in phase 2 (see [motion.md](motion.md)).
2. **Što radimo:** 01 Planiranje / 02 Izrada / 03 Održavanje i rast, with the services listed inside each stage. Each service gets one line and links to `/usluge#…` (P: `plan.*`, `build.*`, `run.*`).
3. **Free audit teaser:** what we check (N, G4) and the 3-step flow (I), with the page's one "Rezervirajte besplatnu analizu" button (P: `plan.cta`).
4. **AI assistant teaser:** links to the live demo. Added in phase 4, when the demo exists (N, G29).
5. **Drafting strip:** its own path for architecture and construction (P: `drafting.tagline`, `drafting.audience`).
6. **How we work** (I): fixed price before work starts, plain language, we stay after launch. Ownership of domain and code (N, G2, client decides).
7. **Team strip:** photos, names, roles (N, G3).
8. **Closing CTA:** `plan.tagline` and one button, "Pošaljite upit" (I, ADR 0017).

### Usluge / Services (`/usluge`)

1. **H1 and intro** (P: `services.title`, `services.intro`).
2. **`#planiranje`:** `plan.tagline`, `plan.body`, `plan.cta` (P). What the audit covers, with a link to the audit page (N, G4).
3. **`#izrada`:** `build.tagline` (P), then four blocks: `#web-stranice`, `#web-aplikacije`, `#integracije`, `#ai-asistenti`. Each block has:
   - the client's sentence (P)
   - 3–4 "Što dobivate" bullets (N, G5)
   - a typical timeline or "od X €" (N, G7, client decides)
4. **`#odrzavanje-i-rast`:** `run.tagline` (P), then `#hosting`, `#seo`, `#analitika`. Each block has:
   - the client's sentence (P)
   - what is included (N, G6)
   - an indication of the monthly fee (N, G7)
5. **Tijek suradnje** (I): analiza → ponuda → izrada → objava → održavanje.
6. **FAQ, 6–8 questions** (N, G8).
7. **Closing CTA:** "Pošaljite upit" (I). The audit button is in `#planiranje` (ADR 0017).

### Tehničko crtanje / Engineering Drafting (`/tehnicko-crtanje`)

1. **Hero:** H1 "Tehničko crtanje za arhitekturu i građevinarstvo" (I); `drafting.tagline`, `drafting.audience` (P).
2. **The three services:** `drafting.cad.*`, `drafting.3d.*` (P; added 2026-10-19, [ADR 0019](decisions/0019-drafting-adds-3d-models.md)) and `drafting.docs.*` (P), plus deliverable bullets for each (N, G9).
3. **Uzorci / Samples:** 2–3 sample sheets made in-house for the site, shown in a layer viewer (N, G10). Each is labelled "Uzorak izrađen za Codraft — nije rad za klijenta".
4. **Opseg i odgovornost / Scope and responsibility** (N, G11; legally sensitive):
   - We draft to your sketches, markups and standards.
   - Responsibility, stamp and signature stay with your authorised architect or engineer.
5. **Kako surađujemo / How we work together** (N, G12): files in → quote → drafting → review rounds → delivery.
6. **Formati i standardi / Formats and standards** (N, G13): DWG version, DXF, PDF, layers, title blocks, CTB/STB, units.
7. **Povjerljivost / Confidentiality** (N, G14): NDA on request; client work is never shown without written permission.
8. **Quote request:** the embedded contact form with topic "Tehničko crtanje" (I; form built in phase 4).

### O nama / About (`/o-nama`)

1. **Intro** (N, G16).
2. **The Code + Draft story** (N, G16, drafted from the editorial note in [content.md §5](content.md#5-editorial-notes-not-site-copy)).
   - The blue line in the wordmark forms the crossbars of "f" and "t". Drawing it completes the word.
   - This is the main logo animation.
3. **Team** (N, G15): photo, name, role, 2–3 sentences, LinkedIn. Say who answers enquiries.
4. **Principles** (I).
5. **Where we are** (N, G17): city, area served, in-person meetings.
6. **`#ova-stranica`, how this site was built** (N, G18; written after the phase 6 measurements):
   - stack
   - measured LCP, INP and CLS
   - page weight
   - WCAG target
   - no third-party requests before consent
7. **Closing CTA:** "Pošaljite upit" (I, ADR 0017).

### Besplatna analiza / Free audit (`/besplatna-analiza`)

1. **H1**, e.g. "Besplatna analiza web stranice i vidljivosti na Googleu" (I).
2. **What we check** (N, G4).
3. **What you get**, e.g. a call plus a written summary (N, G19).
4. **The three steps** (I; microcopy N, G20): form → time slot → confirmation. The form and booking are built in phase 4.
5. **Sample report** (N, G21; may come later).
6. **FAQ** (N, G22): is it really free, what if I have no website yet, how long does it take, is there any obligation.
7. **Privacy note under the form** (N, G20).

### Kontakt / Contact (`/kontakt`)

1. **H1 and a response-time promise** (N, G23).
2. **Form with a topic field:** Web i softver / Tehničko crtanje / Ostalo. For drafting it adds work type, sheet count, deadline and formats (N, G25; built in phase 4).
3. **Contact details** (N, G24): email, phone, hours; the address only if it is public.
4. **Link to the free audit** for web enquiries (I).

### Legal pages and 404

- **Privatnost, Kolačići, Impresum, Izjava o pristupačnosti** (N, G26). Claude drafts them from the company data; the client reviews them, ideally with a lawyer.
- **404** (N, G27): a localised message with links to Home and Services.

## Keyword map

Validated in phase 3 with the `seo` skill. The city is added once known.

| URL | Target intent |
|---|---|
| `/` | brand + "izrada web stranica" (+ city) |
| `/usluge` | the service cluster: izrada web stranica, web trgovine, web aplikacije, održavanje, SEO, AI chatbot |
| `/tehnicko-crtanje` | "tehničko crtanje", "CAD crtanje", "AutoCAD crtanje", "digitalizacija nacrta" |
| `/besplatna-analiza` | "besplatna analiza web stranice" |
| `/en` | "web design and development Croatia" |
| `/en/engineering-drafting` | "CAD drafting services", "drafting outsourcing" |

FAQ copy is written for people and for AI search. Since August 2023, Google shows FAQ rich results only for well-known government and health sites, so don't expect them here.

## Trust without a web portfolio

Codraft has no public web projects yet. Trust comes only from things a visitor can check ([ADR 0004](decisions/0004-verifiable-proof-only.md)):

1. **Sample drawing sheets made for the site.**
   - The team drafts 2–3 A3 sheets:
     - a floor plan and section of a fictional house
     - a mechanical part drawing with three views and tolerances
     - a scanned sketch with red markups next to the finished sheet
   - Each is labelled "Uzorak izrađen za Codraft — nije rad za klijenta".
   - Online they appear as one SVG per layer in the layer viewer.
   - This turns the NDA problem into proof of precision, line weights, layer naming and title-block work.
2. **Permission from past CAD clients.**
   - Send a written HR/EN request offering three options: the full sheet, an anonymised crop with the title block removed, or no.
   - Keep a record of the answers. Publish only the "yes" ones.
3. **The site itself is the showcase.** The `#ova-stranica` section reports measured, dated numbers, refreshed every quarter.
4. **Live AI assistant demo** (phase 4).
   - It answers only from Codraft's approved copy.
   - A "Kako radi" panel explains what data it uses, what it won't do, and the AI disclosure.
5. **A sample audit report** that shows exactly what the free audit delivers. Run it on a demo site, or on a real site with permission, and label it.
6. **Process transparency.**
   - what happens in which week
   - what the fixed offer includes
   - what maintenance includes
   - who owns the domain and the code (the client decides)
7. **A real team.** Real photos, full names, roles, background and LinkedIn. Say who answers enquiries.
8. **A company anyone can check.** The OIB and MBS (or craft register number) are in the footer; Croatian buyers look companies up on sudreg or poslovna.hr.
9. **Commitments the client sets and can keep:** a reply within X working days, a fixed price before work starts, a no-obligation audit.
10. **Launch-partner projects (proposal).**
    - The first 2–3 clients get a reduced rate in exchange for a published case study.
    - Each case study has real before/after metrics and a genuine quote, disclosed as a partner project.
11. **Optional, after launch:** 1–2 concept sites for typical Croatian small businesses, clearly labelled "Koncept".

**Never:**
- fake testimonials
- stock or AI-generated "team" photos
- client logos without permission
- invented numbers ("50+ projekata")
- "trusted by" bars

EU law bans fake reviews (UCPD Annex I, points 23b–23c, added by Directive 2019/2161).

## Open items

- **Terminology and slugs:** client approval of [content.md §1](content.md#1-glossary-hr--en) (phase 0 report).
- **Prices on the site:** the client decides (gap G7).
- **Address, city and in-person meetings:** these decide the local keywords and Google Business Profile eligibility (see [phases/7-launch.md](phases/7-launch.md)).
