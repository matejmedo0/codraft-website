# Site copy: source of truth

> **Status (2026-10-18):** the English copy is saved verbatim from the client's message (Appendix A). The Croatian draft of the existing copy is waiting for the client's approval. Suggestions S1–S16 are pending. Gap copy (G1–G29) is drafted page by page in phase 3.

Related: [information-architecture.md](information-architecture.md) shows which page and section uses each block. [compliance.md](compliance.md) sets the wording guardrails.

## 0. Rules

- **The English copy below is the client's text and the source of truth.** It changes only through a suggestion the client approves. Every change is logged in [§7 Changelog](#7-changelog).
- **Croatian is the site's default language.** Each HR block stays `draft` until the client approves it, then becomes `approved`.
- **Block IDs are stable.** In phase 3 they become the i18n keys: one key per block, in both locales.
- **New copy is written here first, then built.** Nothing goes on the site unless it is in this file.
- **No invented proof.** Never invent clients, testimonials, logos or numbers (see [ADR 0004](decisions/0004-verifiable-proof-only.md)).
- **Drafting wording follows the guardrails** in [§1](#1-glossary-hr--en) and in [compliance.md](compliance.md).

## 1. Glossary (HR ↔ EN)

Where alternatives are listed, the client chooses. Slugs and anchors are provisional until the terminology is approved, and become permanent at launch.

| EN | HR (recommended) | Alternatives | Slug / anchor (HR · EN) |
|---|---|---|---|
| What we do | **Usluge** (nav, page title); **Što radimo** (`services.title`: section heading on Home and H1 on `/usluge`; the final H1 wording is checked with the `seo` skill in phase 3) | Što radimo (nav) | `/usluge` · `/en/services` |
| Plan | **Planiranje** | Plan | `#planiranje` · `#plan` |
| Build | **Izrada** | Razvoj | `#izrada` · `#build` |
| Run & Grow | **Održavanje i rast** | Podrška i rast | `#odrzavanje-i-rast` · `#run-and-grow` |
| Websites & Online Stores | **Web stranice i web trgovine** | …i webshopovi | `#web-stranice` · `#websites` |
| Web Apps & Internal Tools | **Web aplikacije i interni alati** | Aplikacije po mjeri i interni alati | `#web-aplikacije` · `#web-apps` |
| Integrations & Booking | **Integracije i online rezervacije** | Povezivanje sustava i rezervacije | `#integracije` · `#integrations` |
| AI Assistants & Automation | **AI asistenti i automatizacija** | AI chatbotovi i automatizacija | `#ai-asistenti` · `#ai-assistants` |
| Hosting & Maintenance | **Hosting i održavanje** | — | `#hosting` · `#hosting` |
| SEO & Local Visibility | **SEO i lokalna vidljivost** | Vidljivost na Googleu | `#seo` · `#seo` |
| Analytics & Compliance | **Analitika i usklađenost** | Analitika, kolačići i pristupačnost | `#analitika` · `#analytics` |
| Architectural Drafting (was "Engineering Drafting"; S20, [ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) | **Tehničko crtanje** (the client's choice, [ADR 0018](decisions/0018-drafting-for-architecture-and-construction.md)) | CAD crtanje | `/tehnicko-crtanje` · `/en/architectural-drafting` |
| CAD Drafting | **2D CAD crteži** | CAD crtanje u AutoCAD-u | `#2d-crtezi` · `#cad-drafting` |
| 3D Models | **3D modeli** ([ADR 0019](decisions/0019-drafting-adds-3d-models.md)) | — | `#3d-modeli` · `#3d-models` |
| Technical Documentation | **Tehnička dokumentacija** | — | `#dokumentacija` · `#documentation` |
| Free audit | **Besplatna analiza** | Besplatni audit; Besplatni pregled | `/besplatna-analiza` · `/en/free-audit` |
| Book a free audit | **Rezervirajte besplatnu analizu** | Zatražite besplatnu analizu | — |
| Request a quote | **Zatražite ponudu** | Pošaljite upit | — |
| About | **O nama** | — | `/o-nama` · `/en/about` |
| Contact | **Kontakt** | — | `/kontakt` · `/en/contact` |
| Privacy | **Privatnost** (page title: Politika privatnosti) | Zaštita osobnih podataka | `/privatnost` · `/en/privacy` |
| Cookies / Cookie settings | **Kolačići / Postavke kolačića** | Politika kolačića | `/kolacici` · `/en/cookies` |
| Legal notice | **Impresum** | Pravne informacije; Podaci o tvrtki | `/impresum` · `/en/legal-notice` |
| Accessibility statement | **Izjava o pristupačnosti** | — | `/pristupacnost` · `/en/accessibility` |
| Case studies (later) | **Radovi** | Reference; Projekti | `/radovi` · `/en/work` |
| Google Business Profile | **Profil tvrtke na Googleu** (Google's own Croatian term) | — | — |
| markups | **označeni nacrti** | crvene oznake | — |
| title block | **zaglavlje** (nacrta) | — | — |
| layer | **sloj** | — | — |

**Why these choices**
- **"Analiza", not "audit".** To a small-business owner "audit" is jargon, and the copy promises plain language. "Revizija" reads as a financial audit.
- **"Tehničko crtanje".** The client chose it over "CAD crtanje" on 2026-10-19, for architecture and construction only (ADR 0018). It avoids "projektiranje", which is a regulated activity. "Inženjersko crtanje" would suggest engineering services and protected titles. "CAD" stays in the deliverable's name, "2D CAD crteži".

**Do not use** (both languages):
- **As Codraft deliverables:** *projektiranje, projektiramo, projektant, projektna dokumentacija, snimka postojećeg stanja*. In English, nothing that presents Codraft as the designer of record.
  - The ban covers every inflected form (*projektiranja, projektanti, projektnu dokumentaciju…*). The plain word *projekt* (project) is fine.
  - Use instead: *crtanje, crtačka podrška, crtamo prema vašim skicama, oznakama i standardima*; in English, *drafting, drafting support, we draft to your sketches, markups and standards*.
  - Reason: projektiranje is regulated in Croatia. The guardrail regex used in phase 6 is in [compliance.md](compliance.md#copy-guardrails).
- *inženjer* for a team member, unless the person holds that title.
- *revizija* for the audit.
- **Invented claims:** client counts, "trusted by" bars, unverified metrics, testimonials without written permission.

**Form of address:** formal *vi*, lowercase on the web. Capitalised *Vi* only in one-to-one email. The alternative *ti* is unusual for B2B in Croatia; the client decides.

**Typography**
- Croatian quotes: „…“ (‚…‘ inside).
- English quotes and apostrophe: “…”, ’.
- En dash (–) for ranges. Keep the em dash (—) as used in the client's copy.
- Prices: HR `1.200,00 €`, EN `€1,200`.

## 2. Copy blocks (EN source + HR draft)

Each EN line is identical to the client's text. Where the original puts a title and body on one line ("Title: Body"), they are split into `.title` and `.body`.

### What we do

- **`services.title`**
  - EN: What we do
  - HR `draft`: Što radimo
- **`services.intro`**
  - EN: Codraft is a small studio that plans, builds and looks after websites, software and AI tools for businesses that want results, not jargon.
  - HR `draft`: Codraft je studio koji planira, izrađuje i održava web stranice, softver i AI alate za tvrtke koje žele razumjeti što dobivaju.
  - Changed at the client's request (2026-10-19): without "mali", and without "žargon", which the client found generic. The EN keeps "small" and "not jargon" until the client decides on S17 and S18.

### 01 — Plan

- **`plan.heading`**
  - EN: 01 — Plan
  - HR `draft`: 01 — Planiranje
- **`plan.tagline`**
  - EN: Start with clarity.
  - HR `draft`: Prvo jasnoća.
- **`plan.body`**
  - EN: We begin with a free review of your current website and Google visibility. You then get a fixed scope, timeline and price before any work starts.
  - HR `draft`: Počinjemo besplatnom analizom vaše postojeće web stranice i vidljivosti na Googleu. Zatim, prije početka bilo kakvog rada, dobivate fiksni opseg posla, rok i cijenu.
- **`plan.cta`**
  - EN: → Book a free audit
  - HR `draft`: → Rezervirajte besplatnu analizu

### 02 — Build

- **`build.heading`**
  - EN: 02 — Build
  - HR `draft`: 02 — Izrada
- **`build.tagline`**
  - EN: Websites and software shaped around how you actually work.
  - HR `draft`: Web stranice i softver prilagođeni načinu na koji stvarno radite.
- **`build.websites.title`**
  - EN: Websites & Online Stores
  - HR `draft`: Web stranice i web trgovine
- **`build.websites.body`**
  - EN: Fast, mobile-first sites and e-shops built to turn visitors into calls, bookings and orders.
  - HR `draft`: Brze stranice i web trgovine, osmišljene najprije za mobitel, koje posjetitelje pretvaraju u pozive, rezervacije i narudžbe.
- **`build.apps.title`**
  - EN: Web Apps & Internal Tools
  - HR `draft`: Web aplikacije i interni alati
- **`build.apps.body`**
  - EN: Custom portals, dashboards and admin tools that replace spreadsheets and manual workarounds.
  - HR `draft`: Portali, nadzorne ploče i administracijski alati po mjeri koji zamjenjuju tablice i ručna zaobilazna rješenja.
- **`build.integrations.title`**
  - EN: Integrations & Booking
  - HR `draft`: Integracije i online rezervacije
- **`build.integrations.body`**
  - EN: Your website connected to calendars, payments and CRM, so every inquiry reaches the right person.
  - HR `draft`: Vaša web stranica povezana s kalendarima, plaćanjima i CRM-om, da svaki upit stigne do prave osobe.
- **`build.ai.title`**
  - EN: AI Assistants & Automation
  - HR `draft`: AI asistenti i automatizacija
- **`build.ai.body`**
  - EN: Chatbots that answer customers around the clock using your own content, plus automations that take repetitive tasks off your plate.
  - HR `draft`: Chatbotovi koji klijentima odgovaraju danonoćno, na temelju vašeg vlastitog sadržaja, i automatizacije koje s vas skidaju ponavljajuće zadatke.

### 03 — Run & Grow

- **`run.heading`**
  - EN: 03 — Run & Grow
  - HR `draft`: 03 — Održavanje i rast
- **`run.tagline`**
  - EN: We don’t disappear after launch.
  - HR `draft`: Ne nestajemo nakon objave.
- **`run.hosting.title`**
  - EN: Hosting & Maintenance
  - HR `draft`: Hosting i održavanje
- **`run.hosting.body`**
  - EN: Managed hosting, updates, backups and security patches, all for a fixed monthly fee.
  - HR `draft`: Hosting o kojem brinemo mi, redovita ažuriranja, sigurnosne kopije i zakrpe, sve za fiksnu mjesečnu naknadu.
- **`run.seo.title`**
  - EN: SEO & Local Visibility
  - HR `draft`: SEO i lokalna vidljivost
- **`run.seo.body`**
  - EN: Ongoing work on your search rankings, Google Business Profile and reviews, including visibility in AI search tools.
  - HR `draft`: Kontinuirani rad na vašem položaju u tražilicama, Profilu tvrtke na Googleu i recenzijama, uključujući vidljivost u AI tražilicama.
- **`run.analytics.title`**
  - EN: Analytics & Compliance
  - HR `draft`: Analitika i usklađenost
- **`run.analytics.body`**
  - EN: Analytics, cookie consent and accessibility set up properly, so you can measure results and meet EU requirements.
  - HR `draft`: Analitika, privola za kolačiće i pristupačnost postavljene kako treba, da možete mjeriti rezultate i ispuniti zahtjeve EU-a.

### Architectural Drafting (own page)

- **`drafting.title`**
  - EN: Architectural Drafting (S20, accepted 2026-10-22; was "Engineering Drafting")
  - HR `draft`: Tehničko crtanje (the client's choice, ADR 0018)
- **`drafting.tagline`**
  - EN: Precise drawings, delivered on deadline.
  - HR `draft`: Precizni crteži, isporučeni u roku.
  - Not on Home: the client removed it from Home's drafting zone (review batch 8, 2026-10-19: "obriši u potpunosti"). Whether the drafting page keeps it is the client's call in phase 3.
- **`drafting.audience`**
  - EN: For architecture practices and construction companies that need extra drafting capacity. (S19's line, accepted with S20 on 2026-10-22; was "For architects, engineering firms and manufacturers who need extra drafting capacity.")
  - HR `draft`: Za arhitektonske urede i tvrtke u građevinarstvu kojima treba dodatni kapacitet za crtanje.
  - Architecture and construction only, at the client's request (ADR 0018).
- **`drafting.cad.title`**
  - EN: CAD Drafting
  - HR `draft`: 2D CAD crteži
- **`drafting.cad.body`**
  - EN: Accurate 2D drawings in AutoCAD, prepared to your layer and title-block standards from sketches, scans or markups.
  - HR `draft`: Točni 2D crteži u AutoCAD-u, izrađeni prema vašim standardima slojeva i zaglavlja, na temelju skica, skenova ili označenih nacrta.
- **`drafting.3d.title`** (new, at the client's request, 2026-10-19, [ADR 0019](decisions/0019-drafting-adds-3d-models.md))
  - EN: written when the English is aligned, at the end of the review
  - HR `draft`: 3D modeli
- **`drafting.3d.body`** (new, same)
  - EN: written when the English is aligned
  - HR `draft`: Trodimenzionalni modeli zgrada i detalja, izrađeni prema vašim nacrtima i skicama, za provjeru i prezentaciju.
- **`drafting.docs.title`**
  - EN: Technical Documentation
  - HR `draft`: Tehnička dokumentacija
- **`drafting.docs.body`**
  - EN: Clear specifications and drawing sets, consistent in format and ready to hand over.
  - HR `draft`: Jasne specifikacije i kompleti crteža, ujednačenog formata i spremni za predaju.

## 3. Suggestions for the English copy

None of these are applied. The client accepts or rejects each one; accepted ones change the EN block and get a changelog entry. The copy has no typos.

| ID | Block | Now | Suggested | Changes meaning? | Status |
|---|---|---|---|---|---|
| S1 | `plan.body` | "free review" | "free audit", to match the CTA | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S2 | `build.websites.*` | "Online Stores" in the title, "e-shops" in the body | One term in both, e.g. "online stores" | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S3 | `build.integrations.body` | "inquiry" (US spelling) | "enquiry", if British English is chosen (the brand README uses "colour") | No (spelling convention to decide) | accepted 2026-10-22: British English ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) |
| S4 | `build.integrations.body` | "payments and CRM" | "payments and your CRM"; consider naming "online booking" for search | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S5 | `run.analytics.body` | "…accessibility set up properly, so you can…" | "…accessibility, set up properly so you can…" | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S6 | `run.analytics.body` | "meet EU requirements" | "help you meet EU requirements". A technical setup is not legal compliance. | **Yes** | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S7 | `run.seo.body` | "including visibility in AI search tools" | "plus how you show up in AI search tools" | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S8 | `drafting.tagline` | "delivered on deadline" | "delivered on time" or "delivered by your deadline" | No | pending |
| S9 | `drafting.docs.body` | "ready to hand over" | "ready for handover" | No | pending |
| S10 | `drafting.docs.body` | "Clear specifications and drawing sets…" | Add "…prepared from your engineers' input". This positions Codraft as drafting support (see [compliance.md](compliance.md)). | **Yes** | pending |
| S11 | `plan.body` | "your current website" | Add "…or your Google presence, if you don't have a website yet" | **Yes** | not applied on /usluge (2026-10-22, M6): the audit row covers a business without a site |
| S12 | `build.ai.body` | — | Add "clearly labelled as AI". EU AI Act Art. 50 then becomes a selling point. | **Yes** | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S13 | `drafting.cad.body` | "in AutoCAD" | "in AutoCAD (DWG)"; confirm the versions you deliver | No | pending |
| S14 | all | — | Typographic apostrophes and quotes everywhere on the site; Croatian uses „…“ | No | pending |
| S15 | page metadata only | — | Add "Croatia" to English page titles and meta descriptions, not to body copy | No | accepted 2026-10-22 ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) |
| S16 | `build.integrations.body` | — | Local angle: mention e-invoicing (eRačun) and fiscalisation integrations for Croatian businesses | **Yes** (new claim) | open: only if Codraft connects stores to e-invoicing and fiscalisation (a new claim, the client's decision) |
| S17 | `services.intro` | "Codraft is a small studio that…" | "Codraft is a studio that…", to match the Croatian, where the client removed "mali" (2026-10-19) | No | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S18 | `services.intro` | "…for businesses that want results, not jargon." | "…for businesses that want to understand what they get.", to match the Croatian, where the client replaced "žargon" (2026-10-19) | **Yes** | applied 2026-10-22 by Claude (M6, ADR 0031), for the client's final review |
| S19 | `drafting.title`, `drafting.audience` | "Engineering Drafting"; "For architects, engineering firms and manufacturers who need extra drafting capacity." | "Technical Drawing" (slug `/en/technical-drawing`); "For architecture practices and construction companies that need extra drafting capacity." To match ADR 0018 | **Yes** | rejected 2026-10-22: S20 instead; its audience line is kept |
| S20 | `drafting.title`, `nav.drafting`, the EN slug (2026-10-22, an alternative to S19) | "Engineering Drafting" (`/en/engineering-drafting`) | "Architectural Drafting" (slug `/en/architectural-drafting`), with S19's audience line. It is the term architects and builders search for in English ("architectural drafting services"); "Technical Drawing" reads as the school subject or general engineering, and "Engineering Drafting" suggests engineering, which ADR 0018 leaves out | **Yes** | accepted 2026-10-22 ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) |

## 4. Content gaps

Copy or material the site needs that does not exist yet. "Client" means the Codraft team provides it; "Claude drafts" means Claude writes a draft here for the client to approve. Page and section references follow [information-architecture.md](information-architecture.md).

| ID | Page · section | What is needed | Owner | Needed by |
|---|---|---|---|---|
| G1 | Home · hero | H1 and lead; the prototype's two-line H1 and its lead are under "Prototype copy" | Claude drafts | Phase 3 |
| G2 | Home · how we work | Who owns the domain and the code. **Answered 2026-10-20:** the code, drawings, domain and access are the customer's ([ADR 0021](decisions/0021-the-customer-owns-the-work.md)); Home says so in the client's words | Client decides | Phase 3 |
| G3 | Home · team strip | Photos, names, roles (same source as G15) | Client | Phase 3 |
| G4 | Services · plan; Free audit · what we check | Scope of the free audit: speed, mobile, Google and Google Business Profile, accessibility, AI search… | Client defines, Claude writes | Phase 3 |
| G5 | Services · build (×4) | 3–4 "what you get" bullets per service | Claude drafts from client input | Phase 3 |
| G6 | Services · run & grow (×3) | What is included per service | Claude drafts from client input | Phase 3 |
| G7 | Services · pricing | Whether prices are shown; typical timeline or "from €X" per Build service; monthly fee indication for Run & Grow | Client decides | Phase 3 |
| G8 | Services · FAQ | 6–8 questions: price, duration, ownership, "I already have a site", maintenance lock-in, VAT | Claude drafts | Phase 3 |
| G9 | CAD drafting · services | Exactly what is delivered for each service | Client | Phase 3 |
| G10 | CAD drafting · samples | 2–3 sample sheets drawn for the site (DWG + PDF, exportable per layer) | Client's team | Phase 3 |
| G11 | CAD drafting · scope and responsibility | We draft to your sketches, markups and standards; responsibility, stamp and signature stay with your authorised architect or engineer | Claude drafts, client approves, legal check | Phase 3 |
| G12 | CAD drafting · how we work | Files → quote → drafting → review rounds → delivery | Claude drafts from client input | Phase 3 |
| G13 | CAD drafting · formats and standards | DWG version, DXF, PDF, layers, title blocks, CTB/STB, units | Client | Phase 3 |
| G14 | CAD drafting · confidentiality | NDA on request; client work shown only with written permission | Client policy, Claude drafts | Phase 3 |
| G15 | About · team | Per person: photo, name, role, 2–3 sentences, LinkedIn, written consent | Client | Phase 3 |
| G16 | About · story | The Code + Draft story (from §5) | Claude drafts | Phase 3 |
| G17 | About · where we are | City, area served, whether clients are met in person | Client | Phase 3 |
| G18 | About · `#ova-stranica` | How this site was built, with measured, dated numbers | Claude | Phase 6 (after the audit measurements) |
| G19 | Free audit · what you get | E.g. a call plus a written summary | Client | Phase 3 |
| G20 | Free audit · steps and form | Step texts, form and confirmation microcopy | Claude drafts | Phases 3–4 |
| G21 | Free audit · sample report | A labelled sample audit report | Client + Claude | Later (phase 8) |
| G22 | Free audit · FAQ | Is it really free, what if I have no website, how long, any obligation | Claude drafts | Phase 3 |
| G23 | Contact · intro | Response-time promise | Client | Phase 3 |
| G24 | Contact · details | Email, phone, hours, whether the address is public | Client | Phase 3 |
| G25 | Contact · form | Topic options (Web i softver / Tehničko crtanje / Ostalo) and the drafting fields | Claude drafts | Phases 3–4 |
| G26 | Legal pages | Privacy, cookies, legal notice (impresum), accessibility statement | Claude drafts from company data; client and a lawyer review | Phase 3 |
| G27 | Site-wide microcopy | 404 ("Ova stranica nije na nacrtu."), form errors and success, cookie banner | Claude drafts | Phases 3–4 |
| G28 | All pages · metadata and alt text | Title and meta description per page and language; alt text for every meaningful image in both languages (decorative images get an empty `alt`) | Claude drafts | Phase 3 |
| G29 | AI assistants page | Page copy and the chatbot's knowledge base | Claude drafts | Phase 4 |

### Prototype copy (phase 2)

The design-lab prototypes (`src/lab/copy.ts`) use the HR drafts from §2 unchanged, plus the lines below, derived from them. None adds a claim. All stay `draft`: the final hero copy (G1) is written in phase 3, and the UI strings go into the locale files with the base components.

| Where | HR (prototype) | Derived from |
|---|---|---|
| Home hero, H1 (G1 draft) | Planiramo, izrađujemo i održavamo web stranice, softver i AI alate. On a wide hero column it sets as two lines, "Planiramo, izrađujemo i održavamo" / "web stranice, softver i AI alate." (the client's review, batch 2) | `services.intro` |
| Home hero, lead | Za tvrtke koje žele znati na čemu su: opseg posla, rok i cijenu dobivate prije početka rada, a nakon objave ostajemo uz vas. (Replaces "Codraft je (mali) studio za tvrtke kojima su važni rezultati, a ne žargon." at the client's request, 2026-10-19.) | `plan.body`, `run.tagline` |
| Home hero, secondary CTA | Pogledajte usluge (the primary button on `/lab/pocetna`, ADR 0017) | [information-architecture.md](information-architecture.md), Home hero |
| Home hero, drafting path | Tehničko crtanje za arhitekturu i građevinarstvo | `drafting.title`, `drafting.audience`, ADR 0018 |
| Header CTA | Besplatna analiza (lab A–E only; the production header has no button, ADR 0017) | Glossary |
| Menu button | Izbornik | UI string |
| Skip link | Preskoči na sadržaj | UI string |
| Footer, placeholder note | Podaci o tvrtki stižu prije objave. | Stands in for the company data until the client sends it (lab only) |

**Added for round 2** (the hybrids D and E, 2026-10-19). They follow the full Home outline in [information-architecture.md](information-architecture.md).

| Where | HR (prototype) | Derived from |
|---|---|---|
| "Što radimo", stage 01, first item | **Besplatna analiza:** Pregled vaše postojeće web stranice i vidljivosti na Googleu. | `plan.body` |
| "Što radimo", stage 01, second item | **Fiksni opseg, rok i cijena:** Dobivate ih prije početka bilo kakvog rada. | `plan.body` |
| Free audit, heading | Besplatna analiza | Glossary |
| Free audit, lead | Počinjemo besplatnom analizom vaše postojeće web stranice i vidljivosti na Googleu. | `plan.body`, first sentence verbatim |
| Free audit, the three steps | 1 **Forma:** Ispunite kratku formu. · 2 **Termin:** Odaberite termin u kalendaru. · 3 **Potvrda:** Dobivate potvrdu termina. | The audit flow in [ADR 0007](decisions/0007-launch-scope-and-constraints.md); a first draft of the G20 microcopy |
| Free audit, placeholder note | Popis onoga što analiza provjerava stiže prije objave. | Stands in for G4 until the client defines the scope (lab only) |
| Free audit, button | Rezervirajte besplatnu analizu | Glossary |
| CAD section, layer list | Slojevi: Konture, Osi, Presjek, Kote, Oznake, Zaglavlje | Glossary (*sloj*, *zaglavlje*); drafting terms |
| CAD section, replay button | Iscrtaj ponovno | UI string |
| CAD drawing, title block | Ploča s utorom · mm · Codraft · Ilustracija | Describes the illustration honestly ([ADR 0004](decisions/0004-verifiable-proof-only.md)) |
| CAD drawing, accessible name | Ilustracija: crtež ploče s četiri provrta i utorom, s presjekom A–A i kotama u milimetrima. | Describes the illustration (a first draft for G28) |

**The floor plan on Home** (review batch 5, 2026-10-19). The client asked to replace the machined plate with an architectural floor plan drawn as a timelapse (ADR 0018: architecture and construction only). `/lab/pocetna` uses these lines; lab D and E keep the plate as the round 2 record.

| Where | HR (prototype) | Derived from |
|---|---|---|
| Floor plan, layer list | Slojevi: Osi, Zidovi, Otvori, Kote, Zaglavlje ("Oznake" and the room names removed at the client's request, batch 6) | Glossary (*sloj*, *zaglavlje*); drafting terms |
| Floor plan, title block | Tlocrt stana · Mjere u cm · Codraft · Ilustracija | Describes the illustration honestly ([ADR 0004](decisions/0004-verifiable-proof-only.md)) |
| Floor plan, accessible name | Ilustracija: tlocrt manjeg stana s osima, zidovima, vratima i prozorima te kotama u centimetrima. | Describes the illustration (a first draft for G28) |

**The floor plan's 3D view on Home** (review #58, 2026-10-20). After the timelapse the plan rises into a 3D model, so on Home (option C) the title block and the accessible name say so. The comparison options A and B on `/lab/crtanje` keep the lines above. Drafts.

| Where | HR (prototype) | Derived from |
|---|---|---|
| Floor plan, title block in 3D | 3D model stana · Mjere u cm · Codraft · Ilustracija ("Tlocrt stana" while the plan is drawn) | `drafting.3d.title`; describes the illustration honestly ([ADR 0004](decisions/0004-verifiable-proof-only.md)) |
| Floor plan, accessible name | Ilustracija: tlocrt manjeg stana s osima, zidovima, vratima i prozorima te kotama u centimetrima, podignut u 3D model. | The line above, plus the 3D view (G28) |

**The 3D view's options** (review #63, 2026-10-20), on `/lab/tlocrt-3d` for the client to compare. Option 1 is the one above. The client chose option 3 (#64), so Home uses its lines. Drafts.

| Where | HR (prototype) | Derived from |
|---|---|---|
| Option 2 (back to the plan), accessible name | Ilustracija: tlocrt manjeg stana s osima, zidovima, vratima i prozorima te kotama u centimetrima, nakratko podignut u 3D model. | The plan's line, plus the 3D view (G28) |
| Option 3 (roof), title block | Tlocrt kuće → 3D model kuće · Mjere u cm · Codraft · Ilustracija | A flat has no roof of its own, so with a roof the drawing is a house (ADR 0004: the illustration says what it is) |
| Option 3 (roof), layer list | Krov, before Zaglavlje | Drafting term, like the other layers |
| Option 3 (roof), accessible name | Ilustracija: tlocrt prizemne kuće s osima, zidovima, vratima i prozorima te kotama u centimetrima, podignut u 3D model s dvostrešnim krovom. | As above |
| The view switch, with reduced motion (review #117, 2026-10-21) | Prikaži tlocrt · Prikaži 3D model (the button says what it shows next) | UI strings; glossary (*tlocrt*, *3D model*); in place of "Iscrtaj ponovno", which needs motion |

**The closing call to action on Home** (review batch 11, 2026-10-20). The client's text, verbatim; it replaces "Prvo jasnoća." (`plan.tagline`, which stays in "Što radimo").

| Where | HR (Home) | Source |
|---|---|---|
| Heading | Imate skicu, stranicu ili samo ideju? | The client |
| Lead | Pošaljite nam što imate i javit ćemo vam se s prijedlogom. | The client |
| Button | Pošaljite upit | Unchanged (ADR 0017) |

**"Kako radimo" on Home** (review batch 10, 2026-10-20). The client's three commitments, verbatim and in this order; they replace the three lines of round 2 ("Cijena poznata unaprijed", "Jasno objašnjeno", "Ne nestajemo nakon objave", in the table further down). The client proofreads every text before the public launch.

| Item | HR (Home) | Source |
|---|---|---|
| 1 | **Razgovarate s onima koji rade:** Bez posrednika: pitanje ide ravno osobi koja radi na vašem projektu. | The client |
| 2 | **Kažemo i kad nešto ne treba:** Ako vam nešto ne donosi korist, reći ćemo vam prije nego što to platite. | The client |
| 3 | **Sve ostaje vaše:** Kod, crteži, domena i pristupi pripadaju vama, i ako jednog dana odete drugdje. | The client; answers G2 ([ADR 0021](decisions/0021-the-customer-owns-the-work.md)) |

**Tehničko crtanje on Home, batch 9** (review batch 9, 2026-10-20). The client's new text for the zone, verbatim; it replaces batch 8 below on Home. The drafting page keeps the full sentences of §2 and its own call to action, "Zatražite ponudu".

| Where | HR (Home) | Source |
|---|---|---|
| Heading (`h2`) | Tehničko crtanje | `drafting.title`; no section name above it any more |
| Lead | Za arhitektonske urede i građevinske tvrtke kad crteža ima više nego ruku. Crtamo u vašim slojevima i s vašim zaglavljem. | The client (joins the batch 8 heading and lead into one lead) |
| Service 1 | **2D crteži:** Tlocrti, presjeci i detalji koje možete odmah nastaviti. | The client (batch 8 had "…odmah koristiti") |
| Service 2 | **3D modeli:** Zgrade i detalji iz vaših nacrta i skica. | The client (as in batch 8) |
| Service 3 | **Tehnička dokumentacija:** Kompleti listova složeni za predaju. | The client (replaces Claude's batch 8 wording) |
| Button | ~~Pošaljite skicu~~ (removed in review #61: requests come through the contact form and email, ADR 0020) | The client (on Home only; it led to `/tehnicko-crtanje`) |

**Tehničko crtanje on Home, option C** (review batch 8, 2026-10-19; **replaced on Home by batch 9 above**, kept as the record). The client confirmed option C „Legenda“ and gave the right column's text verbatim ("zamijeni postojeći doslovno, ništa ne dodaj"). It replaces the batch 6 lines below on Home; the drafting page keeps the full sentences of §2. No numbers, deadlines or promises beyond this text.

| Where | HR (Home) | Source |
|---|---|---|
| Section name, above the heading | Tehničko crtanje | `drafting.title`; the client |
| Heading | Kad crteža ima više nego ruku. | The client |
| Lead | Crtamo za arhitektonske urede i građevinske tvrtke, u vašim slojevima i s vašim zaglavljem. | The client (replaces the tagline and `drafting.audience` on Home) |
| Service 1 | **2D crteži:** Tlocrti, presjeci i detalji koje možete odmah koristiti. | The client (on Home the title drops "CAD"; `drafting.cad.title` stays "2D CAD crteži" on the drafting page) |
| Service 2 | **3D modeli:** Zgrade i detalji iz vaših nacrta i skica. | The client (replaces the Home line in ADR 0019) |
| Service 3 | **Tehnička dokumentacija:** Crteži i specifikacije složeni u komplet spreman za predaju. | The client asked for "Komplet složen za predaju." or something less robotic; Claude's wording, every word from `drafting.docs.body` |
| Button | Zatražite ponudu | Glossary (unchanged) |
| Removed | "Precizni crteži, isporučeni u roku." and the audience line | The client: "obriši u potpunosti" |

**Tehničko crtanje on Home** (review batch 6, 2026-10-19; **replaced on Home by batch 8 above**, kept as the record). One line per service, as in "Što radimo"; the drafting page keeps the full sentences. Drafts.

| Service | HR (Home, one line) | Shortened from |
|---|---|---|
| 2D CAD crteži | Točni crteži u AutoCAD-u, prema vašim standardima slojeva i zaglavlja. | `drafting.cad.body` |
| 3D modeli | Modeli zgrada i detalja prema vašim nacrtima i skicama. | `drafting.3d.body` |
| Tehnička dokumentacija | Kompleti crteža ujednačenog formata, spremni za predaju. | `drafting.docs.body` |
| Floor plan, replay button | Iscrtaj ponovno | UI string (as before) |
| "Kako radimo", heading | Kako radimo | [information-architecture.md](information-architecture.md), Home §6 |
| "Kako radimo", first item | **Cijena poznata unaprijed:** Prije početka bilo kakvog rada dobivate fiksni opseg posla, rok i cijenu. | `plan.body` |
| "Kako radimo", second item | **Jasno objašnjeno:** Objašnjavamo što radimo i zašto, jednostavnim jezikom i bez nepotrebnih tehničkih izraza. (Replaces "Bez žargona", 2026-10-19.) | `services.intro` |
| "Kako radimo", third item | **Ne nestajemo nakon objave:** Hosting, ažuriranja, sigurnosne kopije i zakrpe brinemo mi, za fiksnu mjesečnu naknadu. | `run.tagline`, `run.hosting.body` |
| Team strip, heading | Tim | [information-architecture.md](information-architecture.md), Home §7 |
| Team strip, placeholders | Ime i prezime · Uloga | Stand in for G3 (lab only) |
| Team strip, placeholder note | Fotografije, imena i uloge stižu u fazi 3. | Stands in for G3 (lab only) |
| Team strip, link | Više o nama | Glossary (*O nama*) |
| Closing call to action, heading | Prvo jasnoća. | `plan.tagline` |
| Closing call to action, button | Rezervirajte besplatnu analizu | `plan.cta` |
| Closing call to action, second link | Pošaljite upit | Glossary (alternative for "Request a quote"); the Contact page CTA |

**Review refinements** (`/lab/pocetna`, 2026-10-19). Home in the chosen direction uses the lines above, arranged by [ADR 0017](decisions/0017-one-audit-call-to-action-per-page.md); no new line:
- **Header:** the four navigation links and the language, no button.
- **Hero:** "Pogledajte usluge" is the primary button; the drafting path link stays below it.
- **"Što radimo", stage 01:** its two items, without the link to the audit.
- **Free audit zone:** the only "Rezervirajte besplatnu analizu" on the page.
- **Closing call to action:** "Prvo jasnoća." with one button, "Pošaljite upit".

**One line per service on Home** (review batch 4, 2026-10-19). The client asked for less text under the services on Home, because the services page has the full sentences. Each line is shortened from the service's own sentence (§2) and adds no claim. They are drafts for the client to approve.

| Service | HR (Home, one line) | Shortened from |
|---|---|---|
| Besplatna analiza | Pregled vaše web stranice i vidljivosti na Googleu. | `plan.body` |
| Fiksni opseg, rok i cijena | Znate ih prije početka rada. | `plan.body` |
| Web stranice i web trgovine | Brze, prilagođene mobitelu i usmjerene na upite i narudžbe. | `build.websites.body` |
| Web aplikacije i interni alati | Alati po mjeri umjesto tablica i ručnog rada. | `build.apps.body` |
| Integracije i online rezervacije | Kalendari, plaćanja i CRM povezani s vašom stranicom. | `build.integrations.body` |
| AI asistenti i automatizacija | Chatbot koji odgovara danonoćno, na temelju vašeg sadržaja. | `build.ai.body` |
| Hosting i održavanje | Ažuriranja i sigurnosne kopije za fiksnu mjesečnu naknadu. | `run.hosting.body` |
| SEO i lokalna vidljivost | Rad na vašem položaju na Googleu i u AI tražilicama. | `run.seo.body` |
| Analitika i usklađenost | Analitika, kolačići i pristupačnost postavljeni kako treba. | `run.analytics.body` |

### Home, phase 3 (2026-10-22)

The copy of the real Home (`/`, `/en`), with the locale key of each line. It follows the page's argument ([information-architecture.md](information-architecture.md), Home, "The page's argument"), which the client approved on 2026-10-22 ("Odobravam uglavnom kreni s izradom", M2). Every line is `draft`. The client's word on the text (M2): it stays as drafted for now, and before launch the client says what changes in the final version; all of it is proofread with every page at the end of phase 3 (#73).

**Croatian.** The lines new in phase 3; every other Croatian line is as under "Prototype copy" above, and the table further down lists every key.

| Where | Key | HR `draft` | Source |
|---|---|---|---|
| Free audit, lead (replaces the lead and the placeholder note "Popis onoga što analiza provjerava stiže prije objave.") | `home.audit.lead` | Pregledamo vašu web stranicu i kako vas klijenti pronalaze na Googleu, a ako stranicu još nemate, samo vašu vidljivost na Googleu. Provjeravamo brzinu, prikaz na mobitelu, Profil tvrtke na Googleu, pristupačnost i vidljivost u AI tražilicama. Dobivate razgovor od 30 minuta i pisani sažetak s prioritetima, bez obveze. | G4 and G19, Claude's draft: what is checked, the 30-minute call, the written summary and "bez obveze" are **facts the client confirms before launch** (M2); the case without a site as in S11; critique 22, points 1–2 |
| Closing CTA, a note under the lead | `home.closing.note` | Odgovaramo u roku od jednog radnog dana. Skice i nacrte primamo i e-mailom. | Written by Claude at the client's request ("da sam smisli tekst", M2). The reply time (G23) is a commitment **the client confirms before launch**; sketches come by email ([ADR 0020](decisions/0020-drawings-arrive-by-email.md)), and the address is on Kontakt (G24) |
| Team strip, first person | `team.matejMedved.role` | Matej Medved · Web razvoj, dizajn, SEO i AI asistenti | The client (M2): "Full Stack Web Developer, SEO radim, dizajne … što se tiče weba i AI asisteni i AI na stranici". The title "Full stack web developer" and the longer description are for About (G15) |
| Team strip, second person | `team.tinManjerovic.role` | Tin Manjerović · Tehničko crtanje, SEO i AI asistenti | The client (M2): "SEO optimizacija isto, AI asistenti, Tehničko Crtanje" |
| Team strip, note | `home.team.pending` | Fotografije stižu prije objave. | Replaces "Fotografije, imena i uloge stižu u fazi 3."; the photos and the written consent come later (item C) |
| Home, `<title>` | `meta.home.title` | Izrada web stranica, softvera i AI alata \| Codraft | G28; keyword map (`/`: the brand and "izrada web stranica"; the city once known) |
| Home, meta description (151 characters) | `meta.home.description` | Planiramo, izrađujemo i održavamo web stranice, softver i AI alate za tvrtke. Opseg, rok i cijenu znate prije početka rada. Počnite besplatnom analizom. | G28; the hero's H1 and lead, `plan.body` |

**Every key on Home, HR and EN.** British English ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)). Where the client's English exists (§2), it is used verbatim; every other English line is a new draft, translated from the Croatian above it.

| Key | HR `draft` | EN `draft` | EN source |
|---|---|---|---|
| `meta.home.title` | Izrada web stranica, softvera i AI alata \| Codraft | Websites, software and AI tools in Croatia \| Codraft | New; S15 |
| `meta.home.description` | (above) | We plan, build and look after websites, software and AI tools for businesses in Croatia. Fixed scope, timeline and price before any work starts. | From `services.intro` and `plan.body`; S15 |
| `meta.country` | Hrvatska | Croatia | Structured data (`areaServed`) |
| `home.hero.titleLine1` | Planiramo, izrađujemo i održavamo | We plan, build and look after | From `services.intro` |
| `home.hero.titleLine2` | web stranice, softver i AI alate. | websites, software and AI tools. | `services.intro` |
| `home.hero.lead` | Za tvrtke koje žele znati na čemu su: opseg posla, rok i cijenu dobivate prije početka rada, a nakon objave ostajemo uz vas. | For businesses that want to know where they stand: you get the scope, timeline and price before any work starts, and we stay with you after launch. | New |
| `home.hero.cta` | Pogledajte usluge | See our services | New |
| `home.hero.drafting` | Tehničko crtanje za arhitekturu i građevinarstvo | Architectural drafting for architects and builders | New; S20 |
| `services.title` | Što radimo | What we do | The client |
| `plan.title` | Planiranje | Plan | `plan.heading`, without its number |
| `plan.tagline` | Prvo jasnoća. | Start with clarity. | The client |
| `plan.audit.title` | Besplatna analiza | Free audit | Glossary |
| `plan.audit.short` | Pregled vaše web stranice i vidljivosti na Googleu. | A review of your website and Google visibility. | From `plan.body` |
| `plan.scope.title` | Fiksni opseg, rok i cijena | Fixed scope, timeline and price | From `plan.body` |
| `plan.scope.short` | Znate ih prije početka rada. | You know them before work starts. | New |
| `build.title` | Izrada | Build | `build.heading`, without its number |
| `build.tagline` | Web stranice i softver prilagođeni načinu na koji stvarno radite. | Websites and software shaped around how you actually work. | The client |
| `build.websites.title` | Web stranice i web trgovine | Websites & Online Stores | The client |
| `build.websites.short` | Brze, prilagođene mobitelu i usmjerene na upite i narudžbe. | Fast, mobile-first and built for enquiries and orders. | From `build.websites.body` |
| `build.apps.title` | Web aplikacije i interni alati | Web Apps & Internal Tools | The client |
| `build.apps.short` | Alati po mjeri umjesto tablica i ručnog rada. | Custom tools instead of spreadsheets and manual work. | From `build.apps.body` |
| `build.integrations.title` | Integracije i online rezervacije | Integrations & Booking | The client |
| `build.integrations.short` | Kalendari, plaćanja i CRM povezani s vašom stranicom. | Calendars, payments and CRM connected to your site. | From `build.integrations.body` |
| `build.ai.title` | AI asistenti i automatizacija | AI Assistants & Automation | The client |
| `build.ai.short` | Chatbot koji odgovara danonoćno, na temelju vašeg sadržaja. | A chatbot that answers around the clock, from your own content. | From `build.ai.body` |
| `run.title` | Održavanje i rast | Run & Grow | `run.heading`, without its number |
| `run.tagline` | Ne nestajemo nakon objave. | We don’t disappear after launch. | The client |
| `run.hosting.title` | Hosting i održavanje | Hosting & Maintenance | The client |
| `run.hosting.short` | Ažuriranja i sigurnosne kopije za fiksnu mjesečnu naknadu. | Updates and backups for a fixed monthly fee. | From `run.hosting.body` |
| `run.seo.title` | SEO i lokalna vidljivost | SEO & Local Visibility | The client |
| `run.seo.short` | Rad na vašem položaju na Googleu i u AI tražilicama. | Work on your ranking on Google and in AI search. | From `run.seo.body` |
| `run.analytics.title` | Analitika i usklađenost | Analytics & Compliance | The client |
| `run.analytics.short` | Analitika, kolačići i pristupačnost postavljeni kako treba. | Analytics, cookies and accessibility set up properly. | From `run.analytics.body` |
| `home.audit.title` | Besplatna analiza | Free audit | Glossary |
| `home.audit.lead` | (above) | We review your website and how customers find you on Google, or, if you don’t have a site yet, just your visibility on Google. We check speed, how the site works on mobile, your Google Business Profile, accessibility and visibility in AI search. You get a 30-minute call and a written summary with priorities, with no obligation. | New; the facts wait for the client, as in Croatian |
| `audit.step.form.title` · `.body` | Forma · Ispunite kratku formu. | Form · Fill in a short form. | New (G20) |
| `audit.step.slot.title` · `.body` | Termin · Odaberite termin u kalendaru. | Time slot · Pick a time in the calendar. | New (G20) |
| `audit.step.confirmation.title` · `.body` | Potvrda · Dobivate potvrdu termina. | Confirmation · You get a confirmation of your time slot. | New (G20) |
| `audit.cta` | Rezervirajte besplatnu analizu | Book a free audit | `plan.cta`, without its arrow |
| `drafting.title` | Tehničko crtanje | Architectural Drafting | S20 |
| `home.drafting.lead` | Za arhitektonske urede i građevinske tvrtke kad crteža ima više nego ruku. Crtamo u vašim slojevima i s vašim zaglavljem. | For architecture practices and construction companies when there are more drawings than hands. We draw in your layers and with your title block. | New |
| `drafting.cad.shortTitle` | 2D crteži | 2D Drawings | New |
| `drafting.cad.short` | Tlocrti, presjeci i detalji koje možete odmah nastaviti. | Plans, sections and details you can pick up straight away. | New |
| `drafting.3d.title` | 3D modeli | 3D Models | New |
| `drafting.3d.short` | Zgrade i detalji iz vaših nacrta i skica. | Buildings and details from your drawings and sketches. | New |
| `drafting.docs.title` | Tehnička dokumentacija | Technical Documentation | The client |
| `drafting.docs.short` | Kompleti listova složeni za predaju. | Drawing sets assembled for handover. | New; "hand over" as in `drafting.docs.body` |
| `drawing.label` | Ilustracija: tlocrt prizemne kuće s osima, zidovima, vratima i prozorima te kotama u centimetrima, podignut u 3D model s dvostrešnim krovom. | Illustration: the floor plan of a single-storey house with axes, walls, doors and windows, and dimensions in centimetres, raised into a 3D model with a gable roof. | New (G28) |
| `drawing.layers` | Slojevi | Layers | New |
| `drawing.layer.axes` · `walls` · `openings` · `dimensions` · `roof` · `titleBlock` | Osi · Zidovi · Otvori · Kote · Krov · Zaglavlje | Axes · Walls · Openings · Dimensions · Roof · Title block | New |
| `drawing.replay` | Iscrtaj ponovno | Draw again | New |
| `drawing.showPlan` · `drawing.showModel` | Prikaži tlocrt · Prikaži 3D model | Show floor plan · Show 3D model | New |
| `drawing.titlePlan` · `drawing.titleModel` | Tlocrt kuće · 3D model kuće | House floor plan · House 3D model | New |
| `drawing.units` · `drawing.note` | Mjere u cm · Ilustracija | Units: cm · Illustration | New |
| `home.principles.title` | Kako radimo | How we work | New |
| `principles.direct.title` · `.body` | Razgovarate s onima koji rade · Bez posrednika: pitanje ide ravno osobi koja radi na vašem projektu. | You talk to the people doing the work · No go-betweens: your question goes straight to the person working on your project. | New, from the client's Croatian |
| `principles.honest.title` · `.body` | Kažemo i kad nešto ne treba · Ako vam nešto ne donosi korist, reći ćemo vam prije nego što to platite. | We tell you when you don’t need something · If something won’t benefit you, we’ll tell you before you pay for it. | New, from the client's Croatian |
| `principles.yours.title` · `.body` | Sve ostaje vaše · Kod, crteži, domena i pristupi pripadaju vama, i ako jednog dana odete drugdje. | Everything stays yours · Code, drawings, domain and access belong to you, even if one day you go elsewhere. | New, from the client's Croatian (ADR 0021) |
| `home.team.title` | Tim | Team | New |
| `home.team.more` | Više o nama | More about us | New |
| `home.team.pending` | (above) | Photos arrive before launch. | New |
| `team.matejMedved.role` | Web razvoj, dizajn, SEO i AI asistenti | Web development, design, SEO and AI assistants | The client (M2) |
| `team.tinManjerovic.role` | Tehničko crtanje, SEO i AI asistenti | Architectural drafting, SEO and AI assistants | The client (M2) |
| `home.closing.title` | Imate skicu, stranicu ili samo ideju? | Have a sketch, a website or just an idea? | New, from the client's Croatian |
| `home.closing.lead` | Pošaljite nam što imate i javit ćemo vam se s prijedlogom. | Send us what you have and we’ll get back to you with a proposal. | New, from the client's Croatian |
| `home.closing.note` | (above) | We reply within one working day, and we take sketches and drawings by email too. | New |
| `home.closing.cta` | Pošaljite upit | Send an enquiry | Glossary |

The names in the team strip are not translated; they live in `src/config/team.ts`.

### Services, phase 3 (2026-10-22)

The copy of `/usluge` and `/en/services`, zone by zone, with each line's locale key. It follows the page's argument ([information-architecture.md](information-architecture.md), Usluge, "The page's argument"). **Built on 2026-10-22** under the client's standing instruction (M6, ADR 0031): Claude's recommendations below are applied, and the client reviews every line at the end of phase 3 (#73). Every line is `draft`. Keys that Home already has are only named here; their text is under "Home, phase 3". The client's sentences (§2) are in the locales, the English ones with the suggestions applied below.

Marks: **confirm** is a fact about how Codraft works that Claude drafted and the client confirms or corrects before launch; **[G7]** is a line about prices or timelines. G7 is decided: the page shows guide prices about 10% below the market ([ADR 0032](decisions/0032-guide-prices-below-the-market.md); figures in `src/config/pricing.ts`, sources in the pricing research).

**A · Hero**

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `services.title` (H1) | Što radimo | What we do | The client. The `seo` check: keep it; the keywords are in the intro, the `<title>`, the description and the eight service headings, and a keyword H1 would repeat the intro |
| `services.intro` | Codraft je studio koji planira, izrađuje i održava web stranice, softver i AI alate za tvrtke koje žele razumjeti što dobivaju. | Codraft is a studio that plans, builds and looks after websites, software and AI tools for businesses that want to understand what they get. | §2; EN with S17 and S18 |
| `services.index.label` | Faze na ovoj stranici | Stages on this page | New: the accessible name of the index |
| `services.index.plan` | Besplatna analiza i fiksna ponuda | Free audit and a fixed offer | New, from the stage's two rows |
| `services.index.build` | Web stranice, aplikacije, integracije i AI | Websites, apps, integrations and AI | New, from the stage's four services |
| `services.index.run` | Hosting, SEO i analitika | Hosting, SEO and analytics | New, from the stage's three services |
| (the drafting path) | Tehničko crtanje za arhitekturu i građevinarstvo | Architectural drafting for architects and builders | `home.hero.drafting`, shared with Home |

**B · 01 Planiranje** (`#planiranje` · `#plan`)

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `plan.title` · `plan.tagline` | (Home) | (Home) | The client |
| `plan.body` | Počinjemo besplatnom analizom vaše postojeće web stranice i vidljivosti na Googleu. Zatim, prije početka bilo kakvog rada, dobivate fiksni opseg posla, rok i cijenu. | We begin with a free audit of your current website and Google visibility. You then get a fixed scope, timeline and price before any work starts. | §2; EN with S1 |
| `plan.audit.title` | (Home) | (Home) | Glossary |
| `services.plan.audit.body` | Pregledamo vašu web stranicu i kako vas klijenti pronalaze na Googleu, a ako stranicu još nemate, samo vašu vidljivost na Googleu. | We review your website and how customers find you on Google, or, if you don’t have a site yet, just your visibility on Google. | `home.audit.lead`, its first sentence |
| `services.gets` (label) | Što dobivate | What you get | New |
| `services.plan.audit.gets.1` | Provjeru brzine, prikaza na mobitelu, Profila tvrtke na Googleu, pristupačnosti i vidljivosti u AI tražilicama. | A check of speed, how the site works on mobile, your Google Business Profile, accessibility and visibility in AI search. | `home.audit.lead`; **confirm** (as on Home, M2) |
| `services.plan.audit.gets.2` | Razgovor od 30 minuta o tome što smo našli. | A 30-minute call about what we found. | **confirm** (as on Home) |
| `services.plan.audit.gets.3` | Pisani sažetak s prioritetima, bez obveze. | A written summary with priorities, with no obligation. | **confirm** (as on Home) |
| `audit.cta` (the page's one audit button) | (Home) | (Home) | ADR 0017 |
| `plan.scope.title` | (Home) | (Home) | From `plan.body` |
| `services.plan.scope.body` | Prije početka rada dobivate pisanu ponudu. Cijena se ne mijenja dok se ne mijenja opseg. | Before any work starts, you get a written offer. The price doesn’t change unless the scope does. | From `plan.body`; the second sentence is what a fixed price means: **confirm** |
| `services.offer` (label) | Što piše u ponudi | What the offer states | New |
| `services.plan.scope.gets.1` | Opseg: što točno radimo i što nije uključeno. | Scope: exactly what we do, and what isn’t included. | From `plan.body` |
| `services.plan.scope.gets.2` | Rok: kad je što gotovo i kad stranica ide uživo. | Timeline: when each part is done and when the site goes live. | From `plan.body` |
| `services.plan.scope.gets.3` | Cijena: fiksni iznos za dogovoreni opseg. | Price: a fixed amount for the agreed scope. | From `plan.body` |

**C · 02 Izrada** (`#izrada` · `#build`). Each service: the client's sentence, "Što dobivate" and, with G7, the timeline and price.

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `build.title` · `build.tagline` | (Home) | (Home) | The client |
| `services.terms` (the caption above every service's prices) [G7] | Okvirno, bez PDV-a | Guide figures, excl. VAT | New; the VAT status next to every price (the critique of Usluge, DC-04; ADR 0032) |
| `services.startingPrice` [G7] | Početna cijena | Starting price | New; the name of a service's only price |
| `services.time` (hidden before each timeline) [G7] | Okvirni rok | Typical timeline | New; the timeline as a dimension in weeks, drawn to one scale for the page (8 weeks = the full line) |
| `services.from` · `services.perMonth` · `services.perSheet` [G7] | od · mjesečno · po listu | from · a month · per sheet | New; with the amount: "od 890 €", "od 35 € mjesečno", "od 65 € po listu"; "from €890", "from €35 a month", "from €65 per sheet" |
| `services.weeks.one` · `.few` · `.other` [G7] | tjedan · tjedna · tjedana | week · weeks · weeks | New; the word agrees with the last number ("1–2 tjedna", "3–5 tjedana") |
| `build.websites.site` · `build.websites.shop` [G7] | Web stranica · Web trgovina | Website · Online store | New; the two price lines of the first service |
| `build.ai.setup` · `build.ai.monthly` [G7] | Izrada asistenta · Rad asistenta | Building the assistant · Running the assistant | New; the AI service's two price lines |
| `run.analytics.setup` [G7] | Postavljanje | Setup | New; analytics is a one-off setup |
| `build.websites.body` | Brze stranice i web trgovine, osmišljene najprije za mobitel, koje posjetitelje pretvaraju u pozive, rezervacije i narudžbe. | Fast, mobile-first sites and online stores built to turn visitors into calls, bookings and orders. | §2; EN with S2 |
| `build.websites.gets.1` | Dizajn složen najprije za mobitel, s jasnim putem do poziva, rezervacije ili narudžbe. | A design made for mobile first, with a clear path to a call, a booking or an order. | From `build.websites.body` |
| `build.websites.gets.2` | Brzinu izmjerenu prije objave, na mobitelu i na računalu. | Speed measured before launch, on mobile and on desktop. | From "Brze"; **confirm** |
| `build.websites.gets.3` | Osnovni SEO od prvog dana: naslovi, opisi, strukturirani podaci i karta stranice za Google. | Basic SEO from day one: titles, descriptions, structured data and a sitemap for Google. | **confirm** |
| `build.websites.gets.4` | Za web trgovinu: proizvode, košaricu, plaćanje i potvrdu narudžbe e-mailom. | For an online store: products, a basket, payment and order confirmation by email. | **confirm** (and which payment providers, if the client wants them named) |
| `build.apps.body` | Portali, nadzorne ploče i administracijski alati po mjeri koji zamjenjuju tablice i ručna zaobilazna rješenja. | Custom portals, dashboards and admin tools that replace spreadsheets and manual workarounds. | §2, unchanged |
| `build.apps.gets.1` | Najprije pregled toga kako sada radite i gdje gubite vrijeme. | First, a look at how you work now and where time is lost. | **confirm** |
| `build.apps.gets.2` | Alat po mjeri vašeg posla: unos, preglede, izvještaje i prava pristupa po ulogama. | A tool made for your work: data entry, overviews, reports and access by role. | From `build.apps.body` |
| `build.apps.gets.3` | Prijenos podataka iz vaših postojećih tablica. | Your data moved over from your existing spreadsheets. | **confirm** |
| `build.apps.gets.4` | Rad u pregledniku, na računalu i mobitelu, bez instalacije. | It runs in the browser, on desktop and mobile, with nothing to install. | **confirm** |
| `build.integrations.body` | Vaša web stranica povezana s kalendarima, plaćanjima i CRM-om, da svaki upit stigne do prave osobe. | Your website connected to calendars, payments and your CRM, so every enquiry reaches the right person. | §2; EN with S3 (accepted) and S4 |
| `build.integrations.gets.1` | Online rezervacije povezane s vašim kalendarom, uz potvrdu e-mailom. | Online booking connected to your calendar, with confirmation by email. | From `build.integrations.*`; **confirm** |
| `build.integrations.gets.2` | Plaćanje karticom na vašoj stranici. | Card payments on your site. | **confirm** |
| `build.integrations.gets.3` | Upite s forme koji stižu ravno u vaš CRM ili e-mail, pravoj osobi. | Form enquiries that go straight to your CRM or inbox, to the right person. | From `build.integrations.body` |
| `build.integrations.gets.4` | Povezivanje web trgovine s e-računima i fiskalizacijom. | Your online store connected to e-invoicing and fiscalisation. | Only with S16 (compliance C12) |
| `build.ai.body` | Chatbotovi, jasno označeni kao AI, koji klijentima odgovaraju danonoćno, na temelju vašeg vlastitog sadržaja, i automatizacije koje s vas skidaju ponavljajuće zadatke. | Chatbots, clearly labelled as AI, that answer customers around the clock using your own content, plus automations that take repetitive tasks off your plate. | §2 with S12, in both languages (it changes the meaning) |
| `build.ai.gets.1` | Chatbot koji odgovara samo iz vašeg sadržaja: stranice, cjenika i uputa. | A chatbot that answers only from your content: your site, price list and guides. | From `build.ai.body` |
| `build.ai.gets.2` | Kad ne zna odgovor, kaže to i upit predaje vama. | When it doesn’t know the answer, it says so and passes the question to you. | **confirm** |
| `build.ai.gets.3` | Automatizacije ponavljajućih zadataka, npr. razvrstavanje upita i prijenos podataka između alata. | Automations for repetitive tasks, such as sorting enquiries and moving data between tools. | From `build.ai.body` |
| `build.ai.gets.4` | Pregled razgovora, da vidite što klijenti najčešće pitaju. | A log of the conversations, so you can see what customers ask most. | **confirm** |
| The prices and timelines [G7] | Web stranica od 890 € (3–4 tjedna), web trgovina od 1.390 € (4–6 tjedana), web aplikacije od 2.690 € (4–8 tjedana), integracije od 190 € (1–2 tjedna), AI asistent od 690 € (1–3 tjedna) i od 45 € mjesečno | Formatted per language from `src/config/pricing.ts` | [ADR 0032](decisions/0032-guide-prices-below-the-market.md) |

**D · 03 Održavanje i rast** (`#odrzavanje-i-rast` · `#run-and-grow`). Each service: the client's sentence, "Što je uključeno" and, with G7, the monthly fee.

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `run.title` · `run.tagline` | (Home) | (Home) | The client |
| `services.included` (label) | Što je uključeno | What’s included | New |
| The monthly fees [G7] | Hosting i održavanje od 35 € mjesečno, SEO od 260 € mjesečno; analitika i usklađenost od 290 € jednokratno (1–2 tjedna) | Formatted per language from `src/config/pricing.ts` | [ADR 0032](decisions/0032-guide-prices-below-the-market.md) |
| `run.hosting.body` | Hosting o kojem brinemo mi, redovita ažuriranja, sigurnosne kopije i zakrpe, sve za fiksnu mjesečnu naknadu. | Managed hosting, updates, backups and security patches, all for a fixed monthly fee. | §2, unchanged |
| `run.hosting.gets.1` | Hosting s HTTPS-om, na serveru u EU-u. | Hosting with HTTPS, on a server in the EU. | **confirm** |
| `run.hosting.gets.2` | Redovita ažuriranja i sigurnosne zakrpe. | Regular updates and security patches. | `run.hosting.body` |
| `run.hosting.gets.3` | Dnevne sigurnosne kopije i povrat stranice ako nešto pođe po zlu. | Daily backups, and your site restored if something goes wrong. | **confirm** (daily) |
| `run.hosting.gets.4` | Nadzor dostupnosti i manje izmjene sadržaja. | Uptime monitoring and small content changes. | **confirm** (and how many hours a month, if any) |
| `run.seo.body` | Kontinuirani rad na vašem položaju u tražilicama, Profilu tvrtke na Googleu i recenzijama, uključujući vidljivost u AI tražilicama. | Ongoing work on your search rankings, Google Business Profile and reviews, plus how you show up in AI search tools. | §2; EN with S7 |
| `run.seo.gets.1` | Postavljanje i redovito ažuriranje Profila tvrtke na Googleu. | Your Google Business Profile set up and kept up to date. | `run.seo.body` |
| `run.seo.gets.2` | Tehnički SEO i sadržaj za pretrage po kojima vas klijenti traže. | Technical SEO and content for the searches your customers make. | `run.seo.body` |
| `run.seo.gets.3` | Kako tražiti recenzije od stvarnih klijenata i kako na njih odgovarati. | How to ask real customers for reviews, and how to reply to them. | `run.seo.body`; real reviews only (UCPD, information-architecture.md) |
| `run.seo.gets.4` | Mjesečni izvještaj: položaj na Googleu, posjeti i upiti. | A monthly report: Google rankings, visits and enquiries. | **confirm** |
| `run.analytics.body` | Analitika, privola za kolačiće i pristupačnost postavljene kako treba, da možete mjeriti rezultate i lakše ispuniti zahtjeve EU-a. | Analytics, cookie consent and accessibility, set up properly to measure results and help you meet EU requirements. | §2 with S6 in both languages ("lakše", "help you"), and S5 |
| `run.analytics.gets.1` | Analitika koja se uključuje tek nakon privole posjetitelja. | Analytics that starts only after the visitor consents. | `run.analytics.body`; as on this site (ADR 0011) |
| `run.analytics.gets.2` | Traka za kolačiće koja ništa ne učitava prije pristanka. | A cookie banner that loads nothing before consent. | As on this site |
| `run.analytics.gets.3` | Provjera pristupačnosti prema WCAG 2.2 AA i popravci. | An accessibility check against WCAG 2.2 AA, and the fixes. | **confirm** |
| `run.analytics.gets.4` | Pregled koji pokazuje odakle dolaze posjeti i upiti. | An overview of where your visits and enquiries come from. | `run.analytics.body` |

**E · Tijek suradnje**

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `services.process.title` | Tijek suradnje | How a project runs | The outline |
| `services.process.lead` | Nakon svakog koraka znate što ste dobili i što slijedi. | After each step, you know what you’ve got and what comes next. | New |
| `services.process.audit.title` · `.body` | Analiza · Besplatan pregled i razgovor od 30 minuta. | Audit · A free review and a 30-minute call. | `plan.body`; the call as above (**confirm**) |
| `services.process.offer.title` · `.body` | Ponuda · Pisana, s fiksnim opsegom, rokom i cijenom. | Offer · In writing, with a fixed scope, timeline and price. | `plan.body` |
| `services.process.build.title` · `.body` | Izrada · Radimo prema ponudi i pokazujemo vam napredak. | Build · We work to the offer and show you the progress. | **confirm** |
| `services.process.launch.title` · `.body` | Objava · Stranica ide uživo, a vi dobivate sve pristupe. | Launch · The site goes live and you get every login. | ADR 0021 |

**F · Česta pitanja** (G8). Two answers have a version for each G7 choice.

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `services.faq.title` | Česta pitanja | Frequently asked questions | New |
| `services.faq.price.q` · `.a` | Koliko košta? · Okvirnu početnu cijenu vidite uz svaku uslugu. Točnu cijenu dobivate u pisanoj ponudi nakon besplatne analize, prije početka rada. | How much does it cost? · You can see a guide starting price next to each service. You get the exact price in a written offer after the free audit, before any work starts. | `plan.body`; G7 (ADR 0032) |
| `services.faq.time.q` · `.a` | Koliko traje izrada? · Okvirni rok vidite uz svaku uslugu, a točan piše u ponudi. Rok teče od dana kad imamo sve što nam treba od vas, poput tekstova i fotografija. | How long does it take? · You can see a typical timeline next to each service; the exact one is in the offer. It runs from the day we have everything we need from you, such as text and photos. | G7; the second sentence: **confirm** |
| `services.faq.existing.q` · `.a` | Već imam web stranicu. Treba li mi nova? · Ne nužno. Analiza pokaže što vrijedi zadržati. Ako je dovoljno popraviti brzinu, prikaz na mobitelu ili SEO, reći ćemo vam to prije ponude. | I already have a website. Do I need a new one? · Not necessarily. The audit shows what’s worth keeping. If fixing the speed, the mobile layout or the SEO is enough, we’ll tell you before the offer. | The client's "Kažemo i kad nešto ne treba" |
| `services.faq.ownership.q` · `.a` | Čiji su stranica, kod i domena? · Vaši. Kod, domena i pristupi pripadaju vama, i ako jednog dana odete drugdje. Domenu registriramo na vaše ime. Licence tuđih alata, poput fontova i dodataka, ostaju pod njihovim uvjetima. | Who owns the site, the code and the domain? · You do. The code, the domain and every login belong to you, even if one day you go elsewhere. We register the domain in your name. Third-party licences, such as fonts and plugins, stay under their own terms. | [ADR 0021](decisions/0021-the-customer-owns-the-work.md) and its consequences |
| `services.faq.maintenance.q` · `.a` | Moram li uzeti i održavanje? · Ne. Održavanje je zasebna mjesečna usluga, bez minimalnog trajanja i s otkazom do kraja mjeseca. Ako ga ne uzmete ili kasnije odete, dobivate sve pristupe i kopiju stranice. | Do I have to take maintenance? · No. Maintenance is a separate monthly service, with no minimum term, and you can cancel by the end of any month. If you don’t take it, or leave later, you get every login and a copy of your site. | ADR 0021; "bez minimalnog trajanja" and the notice "do kraja mjeseca": **confirm** |
| `services.faq.editing.q` · `.a` | Mogu li sadržaj mijenjati bez vas? · Da. Tekstove, slike i proizvode mijenjate sami, a mi vam pokažemo kako. Veće izmjene radimo mi. | Can I change the content without you? · Yes. You change the text, images and products yourself, and we show you how. Bigger changes we make for you. | **confirm** (whether every site has an editor) |
| `services.faq.vat.q` · `.a` [G7] | Jesu li cijene s PDV-om? · Cijene na ovoj stranici su bez PDV-a. U ponudi i na računu PDV je iskazan zasebno, ako ga obračunavamo. | Do prices include VAT? · The prices on this page exclude VAT. If we charge VAT, the offer and the invoice show it separately. | Until the company's VAT status arrives (item A); then one plain sentence (ADR 0032) |

**G · Closing call to action** (navy)

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `services.closing.title` | Niste sigurni odakle početi? | Not sure where to start? | New |
| `services.closing.lead` | Opišite nam svoj posao i što vam treba, a mi ćemo vam predložiti prvi korak. | Tell us about your business and what you need, and we’ll suggest the first step. | New |
| `services.closing.note` | Odgovaramo u roku od jednog radnog dana. | We reply within one working day. | `home.closing.note`, its first sentence; **confirm** (G23, as on Home) |
| (the button) | Pošaljite upit | Send an enquiry | `home.closing.cta`, shared with Home (ADR 0017) |

**Metadata and structured data** (G28)

| Key | HR `draft` | EN `draft` | Source |
|---|---|---|---|
| `meta.services.title` | Usluge: web stranice, web trgovine, aplikacije i AI \| Codraft (61 characters) | Services: websites, online stores, apps and AI \| Codraft (56) | Keyword map (`/usluge`: the service cluster); distinct from Home's title |
| `meta.services.description` | Web stranice i web trgovine, web aplikacije, integracije, AI asistenti, hosting, SEO i analitika. Opseg, rok i cijenu znate prije početka rada. (143) | Websites, online stores, web apps, integrations, AI assistants, hosting, SEO and analytics for businesses in Croatia, with a fixed price before work starts. (156) | `plan.body`; S15 |
| `breadcrumb.home` | Početna | Home | The visible trail above the H1 and the `BreadcrumbList` (Početna / Usluge), on every inner page |
| `breadcrumb.label` | Putanja | Breadcrumb | New: the trail's accessible name |

The JSON-LD: a `Service` for each of the eight services (the free audit, the four Build services and the three Run & Grow services; the fixed offer is not a service of its own), each with its name, the client's sentence, its anchor's URL, `areaServed` Croatia and Home's organisation as the provider, and its guide prices as `offers` (a starting price, monthly where it is). No `FAQPage`: Google shows FAQ results only for government and health sites, so it adds nothing here.

**English suggestions on this page** ([§3](#3-suggestions-for-the-english-copy)), with Claude's recommendation, **applied** on 2026-10-22 under M6 (ADR 0031); the client can revert any of them in the final review. S3, S15 and S20 are accepted ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)).

| ID | Recommendation | Why |
|---|---|---|
| S1 | Accept | "Free audit" is the button's and the page's name |
| S2 | Accept: "online stores" in both | One term; the title already says "Online Stores" |
| S4 | Accept "your CRM"; no "online booking" in the body | The title already names booking |
| S5 | Accept | Punctuation only |
| S6 | Accept, in both languages | A technical setup alone isn't legal compliance; the HR says "lakše ispuniti" |
| S7 | Accept | Plainer, and AI search reads as its own thing |
| S11 | Reject on this page | The audit row right below covers a business without a site, as Home's audit lead does |
| S12 | Accept, in both languages | The EU AI Act's Art. 50(1) has applied since 2 August 2026 (compliance C6), so the label is a duty that reads as a reason to trust |
| S16 | Only if Codraft really connects stores to e-invoicing and fiscalisation | A strong local point (B2B e-invoices for VAT payers from 1 January 2026, compliance C12, medium confidence), but a new claim |
| S17 | Accept | Matches the Croatian, where the client removed "mali" |
| S18 | Accept | Matches the Croatian, which the client rewrote |

### UI strings of the base components (phase 2)

The header, footer and skip link of the design system (ADR 0015) read these strings from `src/locales/{hr,en}.json`. Both languages are drafts (`draft`); the Croatian lines come from the glossary and the prototype copy, and the English lines are new (gap G27). The navigation labels follow the glossary, so they change with it.

| Key | HR `draft` | EN `draft` | Where |
|---|---|---|---|
| `skipLink` | Preskoči na sadržaj | Skip to content | Skip link, first on every page |
| `header.home` | Codraft, početna stranica | Codraft, home page | Accessible name of the header's logo link |
| `header.menu` | Izbornik | Menu | Menu button on narrow screens |
| `header.navLabel` | Glavna navigacija | Main navigation | Accessible name of the main navigation |
| `nav.services` | Usluge | Services | Navigation |
| `nav.drafting` | Tehničko crtanje | Architectural Drafting | Navigation (S20, [ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)) |
| `nav.about` | O nama | About | Navigation |
| `nav.contact` | Kontakt | Contact | Navigation |
| `legal.privacy` | Privatnost | Privacy | Title block |
| `legal.cookies` | Kolačići | Cookies | Title block |
| `legal.legalNotice` | Impresum | Legal notice | Title block |
| `legal.accessibility` | Izjava o pristupačnosti | Accessibility statement | Title block |
| `language.name` | Hrvatski | English | Language switcher (each in its own language) |
| `language.code` | HR | EN | Language switcher in the header |
| `footer.mark` | Znak | Mark | Title block, hidden label of the wordmark cell |
| `footer.companyName` | Naziv tvrtke | Company name | Title block |
| `footer.oib` | OIB | OIB | Title block |
| `footer.mbs` | MBS | MBS | Title block |
| `footer.seat` | Sjedište | Registered office | Title block |
| `footer.contact` | Kontakt | Contact | Title block |
| `footer.legal` | Pravne informacije | Legal | Title block |
| `footer.language` | Jezik | Language | Title block |
| `footer.sheet` | List | Sheet | Title block: the page's sheet number |
| `footer.sheetOf` | od | of | Title block: "1 od 10" / "1 of 10" |
| `footer.updated` | Zadnja izmjena | Last updated | Title block: the build date |
| `footer.pending` | Stiže prije objave | Arrives before launch | Title block, in place of company data the client hasn't sent yet |

**The style page** (`/lab/style`, lab only, never shipped) describes the tokens and components in Croatian for the client. Its explanatory text is lab documentation, not site copy; its examples reuse the strings above and the prototype copy.

## 5. Editorial notes (not site copy)

- **The name is Code + Draft.** The CAD line in the logo is not decoration: it is the other half of the name, and the About page should tell that story. Source: the earlier chat, quoted in Appendix A.
  - In the wordmark, the blue line forms the crossbars of "f" and "t" and ends in a CAD grip square. Drawing it completes the word.
  - That is the planned main logo animation, subject to the client's approval in phase 2 (see [brand.md](brand.md)).
- **Trimming order.** If a shorter services grid is needed, drop Analytics & Compliance first; it sells fine as part of a package.
- **"(separate page)"** in the original is an editorial note: Engineering Drafting lives on its own page. It never appears on the site.

## 6. Approval workflow

1. The client reviews the HR draft and the suggestions. Phase 0 report: existing copy. Phase 3: each page's gap copy.
2. Approved HR blocks switch from `draft` to `approved`.
3. Accepted suggestions update the EN block and add a changelog line.
4. Rejected suggestions get the status `rejected` and stay in the table as a record.

## 7. Changelog

- **2026-10-18:** File created.
  - EN copy saved verbatim from the client's message (Appendix A).
  - HR draft of the existing copy added; all blocks `draft`.
  - Suggestions S1–S16 added; all `pending`.
  - Gaps G1–G29 listed.
- **2026-10-19:** Fixes after the fresh-session test. No copy blocks changed.
  - Glossary: banned-word forms and the approved phrasing aligned with compliance.md; the `/usluge` H1 clarified.
  - G11, G18 and G28 clarified.
- **2026-10-19 (phase 2):** "Prototype copy" added under §4: the lines the design-lab prototypes derive from the existing blocks. No copy block changed.
- **2026-10-19 (phase 2, round 2):** Lines for the hybrids D and E added under "Prototype copy": stage 01's two items, the free audit's three steps, the CAD layer names, "Kako radimo", the team strip and the closing call to action. All are derived from existing blocks or are lab placeholders. No copy block changed.
- **2026-10-19 (phase 2, design system):** "UI strings of the base components" added under §4: the header, navigation, language switcher, skip link and title block, in HR and EN, all `draft`. No copy block changed.
- **2026-10-19 (phase 2, review refinements, batch 1):**
  - The client removed "mali" from the Croatian `services.intro` and the hero lead. Suggestion S17 asks whether the EN drops "small" too.
  - The free-audit call to action now appears once per page ([ADR 0017](decisions/0017-one-audit-call-to-action-per-page.md)). The header button and its string `header.cta` are gone, and "Review refinements" under "Prototype copy" lists the new arrangement. No new line.
- **2026-10-19 (phase 2, review refinements, batch 2):**
  - No "žargon" in the Croatian copy, at the client's request: a new hero lead, the end of `services.intro`, and "Jasno objašnjeno" in "Kako radimo". Suggestion S18 asks about the EN.
  - "Tehničko crtanje" replaces "CAD crtanje", for architecture and construction only ([ADR 0018](decisions/0018-drafting-for-architecture-and-construction.md)): the glossary, `drafting.title`, `drafting.audience`, `nav.drafting`, the hero link and G25. Suggestion S19 asks about the EN.
- **2026-10-19 (phase 2, review refinements, batch 4):** "One line per service on Home" added under "Prototype copy": each service's sentence shortened for Home, drafts. No copy block changed.
- **2026-10-19 (phase 2, review refinements, batch 5):** "The floor plan on Home" added under "Prototype copy": its layers, room labels, title block and accessible name. The client will align the English at the end of all the changes. No copy block changed.
- **2026-10-19 (phase 2, review refinements, batch 6):** New blocks `drafting.3d.title` and `drafting.3d.body`, HR drafts, at the client's request ([ADR 0019](decisions/0019-drafting-adds-3d-models.md)); the EN follows at the end of the review. The floor plan loses its room names. "Tehničko crtanje on Home" added under "Prototype copy".
- **2026-10-19 (phase 2, review refinements, batch 8):** "Tehničko crtanje on Home, option C" added under "Prototype copy": the client's heading, lead and three service lines, verbatim, plus Claude's wording of the third line at the client's request. `drafting.tagline` is no longer on Home. No copy block changed; the EN follows at the end of the review.
- **2026-10-20 (phase 2, review refinements, batch 9):** "Tehničko crtanje on Home, batch 9" added under "Prototype copy": the heading back to "Tehničko crtanje", the client's new lead, three service lines and the button "Pošaljite skicu", verbatim. No copy block changed.
- **2026-10-20 (phase 2, review refinements, batch 10):** "'Kako radimo' on Home" added under "Prototype copy": the client's three commitments, verbatim, in place of the round 2 lines. G2 answered ([ADR 0021](decisions/0021-the-customer-owns-the-work.md)). Files come by email, not through the site ([ADR 0020](decisions/0020-drawings-arrive-by-email.md)). No copy block changed.
- **2026-10-20 (phase 2, review refinements, batch 11):** "The closing call to action on Home" added under "Prototype copy": the client's heading and lead in place of "Prvo jasnoća.". No copy block changed.
- **2026-10-21 (phase 2, review refinements, #117):** The view switch of the floor plan with reduced motion, "Prikaži tlocrt" and "Prikaži 3D model", added to "The 3D view's options". No copy block changed.
- **2026-10-21 (phase 2, review refinements, #64):** Home uses option 3's lines (the house's title block, the "Krov" layer and its accessible name). No copy block changed.
- **2026-10-20 (phase 2, review refinements, #63):** "The 3D view's options" added under "Prototype copy": the accessible names of options 2 and 3 and the house's title block. No copy block changed.
- **2026-10-20 (phase 2, review refinements, #61):** The button "Pošaljite skicu" removed from Home's drafting zone, at the client's request. No copy block changed.
- **2026-10-20 (phase 2, review refinements, #58):** "The floor plan's 3D view on Home" added under "Prototype copy": the title block's "3D model stana" and the accessible name with the 3D view. No copy block changed.
- **2026-10-22 (phase 3, Home, steps 1–2):** "Home, phase 3" added under §4: the free audit's new lead (G4, G19, with the client's facts in brackets), an optional line for the closing call to action (G23), and the metadata and the OG image's text alternative (G28), all drafts. Suggestion S20 added, an alternative to S19. No copy block changed.
- **2026-10-22 (phase 3, Home, the build):** The client approved Home's argument and asked to build (M2). "Home, phase 3" now holds every Home line with its locale key, in Croatian and in British English: the audit's lead without brackets (its facts confirmed by the client before launch), the closing call to action's note written by Claude at the client's request, and the team's names and roles from the client. Accepted: S3 (British English), S15 and S20, which changes the EN blocks `drafting.title` and `drafting.audience` and the slug to `/en/architectural-drafting` ([ADR 0029](decisions/0029-english-naming-spelling-and-titles.md)); S19 rejected.
- **2026-10-22 (phase 3, Usluge, the /check):** The price note under stages 02 and 03 (`services.priceNote`) and the price table's labels (`services.price`, `services.priceColumn`) are replaced by one caption above every service's prices, `services.terms` ("Okvirno, bez PDV-a"), and `services.startingPrice`, after the design critique (DC-04: the VAT status next to every price; Q3: one restatement fewer of the fixed offer).
- **2026-10-22 (phase 3, Usluge, the build):** The client asked Claude to work autonomously (M6, ADR 0031). "Services, phase 3" is built as drafted, with the guide prices of [ADR 0032](decisions/0032-guide-prices-below-the-market.md), their labels, the price note, the FAQ answers for shown prices and the breadcrumb's name. The EN blocks `plan.body`, `build.websites.body`, `build.integrations.body`, `build.ai.body`, `run.seo.body`, `run.analytics.body` and `services.intro` change with S1, S2, S4–S7, S12, S17 and S18 (the HR `build.ai.body` and `run.analytics.body` with S12 and S6), for the client's final review; S11 is not applied here, and S16 stays open.
- **2026-10-22 (phase 3, Usluge, steps 1–2):** "Services, phase 3" added under §4: every line of `/usluge` with its locale key, in Croatian and British English, the facts the client confirms marked, the lines that depend on G7 marked, and Claude's recommendation on each English suggestion that touches the page (S1, S2, S4–S7, S11, S12, S16–S18). Drafts, waiting for the client's OK (M5). No copy block changed.

## Appendix A: Original copy as received (2026-10-18)

Frozen record of the client's message, character for character, including the editorial notes from the earlier chat (in Croatian). Do not edit.

```text
What we do

Codraft is a small studio that plans, builds and looks after websites, software and AI tools for businesses that want results, not jargon.

01 — Plan

Start with clarity.
We begin with a free review of your current website and Google visibility. You then get a fixed scope, timeline and price before any work starts.
→ Book a free audit

02 — Build

Websites and software shaped around how you actually work.

Websites & Online Stores: Fast, mobile-first sites and e-shops built to turn visitors into calls, bookings and orders.
Web Apps & Internal Tools: Custom portals, dashboards and admin tools that replace spreadsheets and manual workarounds.
Integrations & Booking: Your website connected to calendars, payments and CRM, so every inquiry reaches the right person.
AI Assistants & Automation: Chatbots that answer customers around the clock using your own content, plus automations that take repetitive tasks off your plate.
03 — Run & Grow

We don’t disappear after launch.

Hosting & Maintenance: Managed hosting, updates, backups and security patches, all for a fixed monthly fee.
SEO & Local Visibility: Ongoing work on your search rankings, Google Business Profile and reviews, including visibility in AI search tools.
Analytics & Compliance: Analytics, cookie consent and accessibility set up properly, so you can measure results and meet EU requirements.
Engineering Drafting

(separate page)

Precise drawings, delivered on deadline.
For architects, engineering firms and manufacturers who need extra drafting capacity.

CAD Drafting: Accurate 2D drawings in AutoCAD, prepared to your layer and title-block standards from sketches, scans or markups.
Technical Documentation: Clear specifications and drawing sets, consistent in format and ready to hand over.

Ime vam ovdje radi u korist: Code + Draft. CAD linija time nije višak, nego druga polovica imena, pa to vrijedi spomenuti u “About” sekciji.

Ako želite kraći grid, prvo maknite Analytics & Compliance. To se lako prodaje kao dio paketa i bez zasebne pločice.
```
