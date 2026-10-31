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
| 1 | Početna / Home | `/` | `/en` | Explain the offer in 5 seconds; send drafting clients down their own path | Rezervirajte besplatnu procjenu (once, in the free audit teaser) | 3 |
| 2 | Usluge / Services | `/usluge` | `/en/services` | All 8 services in 3 stages (Plan, four Build, three Run & Grow), how we work together, FAQ | Rezervirajte besplatnu procjenu (once, in `#planiranje`) | 3 |
| 3 | Tehničko crtanje / Architectural Drafting | `/tehnicko-crtanje` | `/en/architectural-drafting` | B2B drafting offer for architecture and construction | Zatražite ponudu | 3 |
| 4 | O nama / About | `/o-nama` | `/en/about` | Code + Draft story, team, how we work, how this site was built | Pošaljite upit | 3 |
| 5 | Besplatna procjena / Free audit | `/besplatna-procjena` | `/en/free-audit` | What we check and what you get; form, then time slot | Nastavite na odabir termina (form submit, leads to booking) | 3 (form: 4) |
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
- EN: Services · Architectural Drafting · About · Contact · HR
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
3. **Free audit teaser:** what we check (N, G4) and the 3-step flow (I), with the page's one "Rezervirajte besplatnu procjenu" button (P: `plan.cta`).
4. **AI assistant teaser:** links to the live demo. Added in phase 4, when the demo exists (N, G29).
5. **Drafting strip:** its own path for architecture and construction: the floor plan drawn as a timelapse and raised into a 3D model of a house, with a roof set on it, a paper facade under a navy roof (review #58; the client's choices: the roof in #64, palette 1 in #66), the heading "Tehničko crtanje", a lead, the three services with one line each, whose titles link to the drafting page (I; the client's text from review batch 9, [content.md](content.md) "Prototype copy"). No button: the client removed "Pošaljite skicu" in review #61, because requests come through the contact form and email (ADR 0020). `drafting.tagline` and `drafting.audience` are for the drafting page.
6. **How we work:** three commitments in the client's words (review batch 10): you talk to the people who do the work, we say so when something isn't needed, and everything stays yours (code, drawings, domain and access; G2 answered, [ADR 0021](decisions/0021-the-customer-owns-the-work.md)).
7. **Team strip:** photos, names, roles (N, G3).
8. **Closing CTA:** the client's heading "Imate skicu, stranicu ili samo ideju?" and lead (review batch 11, [content.md](content.md) "Prototype copy"), and one button, "Pošaljite upit" (ADR 0017).

**The page's argument** (phase 3 step 1, [ADR 0027](decisions/0027-taste-skill-ideas-in-the-setup.md); put to the client on 2026-10-22, M1; **approved** by the client the same day: „Odobravam uglavnom kreni s izradom“, M2). One line per zone: what the visitor should believe after it, and what makes that believable. Proof is only what is true by construction ([ADR 0004](decisions/0004-verifiable-proof-only.md)).

| Zone | Claim | Proof | Proof today |
|---|---|---|---|
| Hero | Codraft plans, builds and looks after websites, software and AI tools; you know the scope, timeline and price before work starts, and the team stays after launch. Architects and builders see their own path at once. | A specific commitment about how the work is done, which "Što radimo" backs: stage 01 (fixed scope, timeline and price first) and stage 03 (maintenance for a fixed monthly fee). The drafting link is inside the first screen at every width (critique, communication lens). | In place |
| Što radimo | One team covers the whole way, plan → build → run and grow, and you can see exactly what you can get. | Nine services named concretely, each with one line and a link to its full description on `/usluge`; the order of the stages is the process itself. | In place (the full descriptions arrive with `/usluge`) |
| Besplatna procjena | The first step costs nothing, commits you to nothing and is worth your time. | What the audit checks (G4) and what you get from it (G19); three steps to a time slot. | **Missing:** G4 and G19 (the client's facts). Today a placeholder note. |
| Tehničko crtanje | Architecture practices and construction companies can hand us their drawings when there are more drawings than hands; we draw in their layers and with their title block, in 2D and 3D. | The work itself, shown large: the floor plan drawn layer by layer and raised into a 3D model of a house, labelled "Ilustracija". How the work is done, stated specifically: "u vašim slojevima i s vašim zaglavljem". The real sample sheets (G10) and formats (G13) belong to `/tehnicko-crtanje`. | In place for Home |
| Kako radimo | Working with Codraft is simple and honest. | Three commitments in the client's words; "Sve ostaje vaše" names what exactly (code, drawings, domain, access; [ADR 0021](decisions/0021-the-customer-owns-the-work.md)). "Razgovarate s onima koji rade" is proved by the team strip right below it. | In place (leans on Tim) |
| Tim | Real people with names and faces do the work, the same people you talk to. | Real photos, full names and roles (G3); the link to About for the bios and LinkedIn. | **Missing:** G3 (the client's data). Today placeholder frames. |
| Closing CTA | Whatever you have (a sketch, a site or just an idea), sending it is easy, and you get a proposal back. | One clear step, "Pošaljite upit" to Contact. When you hear back (G23) and where a sketch goes ([ADR 0020](decisions/0020-drawings-arrive-by-email.md): by email) are not on the page yet. | Partly |
| Title block (footer) | Codraft is a real company you can check. | OIB, MBS and registered office (item A), checkable on sudreg or poslovna.hr. | **Missing:** item A; "Stiže prije objave" until the Impresum page. |

Rules applied: no zone lacks a claim, so none is cut. A claim without proof at launch is reworded or dropped: the team strip launches with real data or not at all, and the audit zone claims only what G4 and G19 confirm. The AI assistant teaser joins in phase 4, with the demo as its proof.

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
5. **Tijek suradnje** (I): procjena → ponuda → izrada → objava → održavanje.
6. **FAQ, 6–8 questions** (N, G8).
7. **Closing CTA:** "Pošaljite upit" (I). The audit button is in `#planiranje` (ADR 0017).

**The page's argument** (phase 3 step 1, [ADR 0027](decisions/0027-taste-skill-ideas-in-the-setup.md); put to the client on 2026-10-22, M5; **built** the same day under the client's standing instruction, M6, [ADR 0031](decisions/0031-autonomous-work-from-phase-3.md); the client reviews it at the end of phase 3). One line per zone: what the visitor should believe after it, and what makes that believable. Proof is only what is true by construction ([ADR 0004](decisions/0004-verifiable-proof-only.md)). The copy, with each line's key, is in [content.md](content.md) ("Services, phase 3").

| Zone | Claim | Proof | Proof today |
|---|---|---|---|
| A · Hero | Everything Codraft does for businesses is on this page, in the order the work happens; you can go straight to what you need. Architects and builders see at once where their page is. | The index of the three stages, each with its services named and linking to its zone; the order is the process itself. The drafting path, as on Home. | In place |
| B · 01 Planiranje | Starting costs nothing, and you know the scope, timeline and price before you pay for anything. | What the audit checks and what you get (G4, G19: the same facts as Home's audit lead); what the written offer states (scope, timeline, price); the page's one "Rezervirajte besplatnu procjenu" (ADR 0017). | Partly: the audit's facts are Claude's drafts, which the client confirms before launch (M2), as on Home |
| C · 02 Izrada | Each of the four build services delivers named things, and you can see roughly how long it takes and what it costs before you ask. | The client's sentence, 3–4 deliverables per service (G5), a typical timeline and "od X €" (G7, [ADR 0032](decisions/0032-guide-prices-below-the-market.md)). | In place; the deliverables marked **confirm** are Claude's drafts, confirmed before launch |
| D · 03 Održavanje i rast | After launch we stay, for a fixed monthly fee that covers named things, and you can leave with everything. | What each service includes (G6), the monthly fee (G7, ADR 0032), and "Sve ostaje vaše" ([ADR 0021](decisions/0021-the-customer-owns-the-work.md)) in the FAQ. | In place; the inclusions marked **confirm** are confirmed before launch |
| E · Tijek suradnje | You always know what comes next, and each step ends with something you get. | Four named steps, each with what you receive: the audit's summary, the written offer, the progress you see, every login at launch (ADR 0021). | Partly: "you see the progress" is a working practice the client confirms |
| F · Česta pitanja | The usual worries (price, time, ownership, an existing site, being tied to maintenance) have straight answers. | Specific answers that follow the client's decisions (ADR 0021) and facts (G7, the terms of maintenance). | In place; the terms of maintenance are confirmed before launch |
| G · Closing CTA | Not sure which service you need? Describe what you do, and we suggest the first step. | One clear step, "Pošaljite upit" to Contact; the reply time, as on Home (G23, the client confirms). | Partly |
| H · Title block | Codraft is a real company you can check. | Item A, as on Home. | **Missing:** item A |

Rules applied: every zone has a claim, so none is cut. Zones C and D show the guide prices of ADR 0032; the deliverables and inclusions Claude drafted are confirmed or cut before launch.

**As built** (2026-10-22): as laid out below, plus a visible breadcrumb above the H1 on every inner page ("Početna / Usluge", the same trail as the `BreadcrumbList`), a price table per service (the timeline drawn as a dimension, the price right-aligned) with a note on what the prices are under stages 02 and 03, and the row's icon and title staying in view on desktop while its detail scrolls past.

**Layout, zone by zone** (there is no lab design for Usluge; composed from the design system in `src/components/ui/` and Home's patterns, on the 12-column grid of Home's hero, audit and team). Differences from the outline above: the hero gets the stage index and the drafting path; "Tijek suradnje" has four steps, since maintenance is stage 03 right above it and five steps don't fit a row at 768 px (about 110 px each); the FAQ is always open.

- **A · Hero** (paper): as Home's hero, the text on columns 1–7 (H1, `services.intro`, the drafting path link) and a drawing on graph paper on columns 8–12. The drawing is the page's index: the three stage bubbles of "Što radimo" (01, 02, 03) joined by the blue process line, each bubble with its stage's title and its services in one muted line, and each a link to its zone with the grips on hover and focus. Still, no animation (the mark's entrance stays on Home, ADR 0014). On phones the index follows the text, with the line down the left as in Home's narrow "Što radimo".
- **B, C, D · the three stages** (paper), one zone each, `#planiranje`, `#izrada`, `#odrzavanje-i-rast` (EN `#plan`, `#build`, `#run-and-grow`):
  - The stage head on columns 1–7: the bubble with its number beside the `h2` (the stage title), the tagline under it in muted lead type; stage 01 adds `plan.body` as its lead.
  - Then each service as a row, under a hairline, like the rows of "Kako radimo": its icon and `h3` title on columns 1–4, and on columns 5–12 the client's sentence (lead type, full ink), a label ("Što dobivate", or "Što je uključeno" in stage 03), 3–4 short points in muted ink, and, if the client gives them (G7), the timeline as a Dimension (a kota in weeks, as the design system plans it) and the price. Each row has its anchor (`#web-stranice`, …), so Home's links land on it.
  - The icons are still, as everywhere outside Home's process line.
  - Stage 01's rows are "Besplatna procjena", which ends with the page's one button, and "Fiksni opseg, rok i cijena".
  - On phones: the bubble beside the stage title; the icon beside the service's title and everything else under it at full width (ADR 0028).
- **E · Tijek suradnje** (paper): the `h2` and a lead on columns 1–7, then `Steps` with four steps across the full width (stacked on phones, a row from 48rem), the line drawing from step to step as on Home's audit.
- **F · Česta pitanja** (paper): the `h2` on columns 1–4 and the questions on columns 5–12, each an `Item` row (the question as `h3`, the answer under it), always open: no accordion and no script, and the answers stay readable for people and AI search.
- **G · Closing CTA** (navy, the page's one navy surface): as Home's, centred: heading, lead, note, one button "Pošaljite upit".
- **H · Title block**, as on every page.

New in the design: only the short points' list (a small square marker in the line colour, not blue). Shared code: the stage bubble's style moves from Home's `services.css` to a shared place, and Home's closing call to action takes its text as props, both with no visible change on Home.

### Tehničko crtanje / Architectural Drafting (`/tehnicko-crtanje`)

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

### Besplatna procjena / Free audit (`/besplatna-procjena`)

1. **H1**, e.g. "Besplatna procjena web stranice i vidljivosti na Googleu" (I).
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
| `/besplatna-procjena` | "besplatna procjena web stranice" |
| `/en` | "web design and development Croatia" |
| `/en/architectural-drafting` | "architectural drafting services", "CAD drafting services", "drafting outsourcing" ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) |

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
