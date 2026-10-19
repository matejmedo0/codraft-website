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

Where alternatives are listed, the client chooses (open question in `PROGRESS.md`). Slugs and anchors are provisional until the terminology is approved, and become permanent at launch.

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
| Engineering Drafting | **Tehničko crtanje** (the client's choice, [ADR 0018](decisions/0018-drafting-for-architecture-and-construction.md)) | CAD crtanje | `/tehnicko-crtanje` · `/en/engineering-drafting` |
| CAD Drafting | **2D CAD crteži** | CAD crtanje u AutoCAD-u | `#2d-crtezi` · `#cad-drafting` |
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

### Engineering Drafting (own page)

- **`drafting.title`**
  - EN: Engineering Drafting
  - HR `draft`: Tehničko crtanje (the client's choice, ADR 0018; the EN waits for S19)
- **`drafting.tagline`**
  - EN: Precise drawings, delivered on deadline.
  - HR `draft`: Precizni crteži, isporučeni u roku.
  - Not on Home: the client removed it from Home's drafting zone (review batch 8, 2026-10-19: "obriši u potpunosti"). Whether the drafting page keeps it is the client's call in phase 3.
- **`drafting.audience`**
  - EN: For architects, engineering firms and manufacturers who need extra drafting capacity.
  - HR `draft`: Za arhitektonske urede i tvrtke u građevinarstvu kojima treba dodatni kapacitet za crtanje.
  - Architecture and construction only, at the client's request (ADR 0018). The EN keeps its three audiences until S19.
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
| S1 | `plan.body` | "free review" | "free audit", to match the CTA | No | pending |
| S2 | `build.websites.*` | "Online Stores" in the title, "e-shops" in the body | One term in both, e.g. "online stores" | No | pending |
| S3 | `build.integrations.body` | "inquiry" (US spelling) | "enquiry", if British English is chosen (the brand README uses "colour") | No (spelling convention to decide) | pending |
| S4 | `build.integrations.body` | "payments and CRM" | "payments and your CRM"; consider naming "online booking" for search | No | pending |
| S5 | `run.analytics.body` | "…accessibility set up properly, so you can…" | "…accessibility, set up properly so you can…" | No | pending |
| S6 | `run.analytics.body` | "meet EU requirements" | "help you meet EU requirements". A technical setup is not legal compliance. | **Yes** | pending |
| S7 | `run.seo.body` | "including visibility in AI search tools" | "plus how you show up in AI search tools" | No | pending |
| S8 | `drafting.tagline` | "delivered on deadline" | "delivered on time" or "delivered by your deadline" | No | pending |
| S9 | `drafting.docs.body` | "ready to hand over" | "ready for handover" | No | pending |
| S10 | `drafting.docs.body` | "Clear specifications and drawing sets…" | Add "…prepared from your engineers' input". This positions Codraft as drafting support (see [compliance.md](compliance.md)). | **Yes** | pending |
| S11 | `plan.body` | "your current website" | Add "…or your Google presence, if you don't have a website yet" | **Yes** | pending |
| S12 | `build.ai.body` | — | Add "clearly labelled as AI". EU AI Act Art. 50 then becomes a selling point. | **Yes** | pending |
| S13 | `drafting.cad.body` | "in AutoCAD" | "in AutoCAD (DWG)"; confirm the versions you deliver | No | pending |
| S14 | all | — | Typographic apostrophes and quotes everywhere on the site; Croatian uses „…“ | No | pending |
| S15 | page metadata only | — | Add "Croatia" to English page titles and meta descriptions, not to body copy | No | pending |
| S16 | `build.integrations.body` | — | Local angle: mention e-invoicing (eRačun) and fiscalisation integrations for Croatian businesses | **Yes** (new claim) | pending |
| S17 | `services.intro` | "Codraft is a small studio that…" | "Codraft is a studio that…", to match the Croatian, where the client removed "mali" (2026-10-19) | No | pending |
| S18 | `services.intro` | "…for businesses that want results, not jargon." | "…for businesses that want to understand what they get.", to match the Croatian, where the client replaced "žargon" (2026-10-19) | **Yes** | pending |
| S19 | `drafting.title`, `drafting.audience` | "Engineering Drafting"; "For architects, engineering firms and manufacturers who need extra drafting capacity." | "Technical Drawing" (slug `/en/technical-drawing`); "For architecture practices and construction companies that need extra drafting capacity." To match ADR 0018 | **Yes** | pending |

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
| Button | Pošaljite skicu | The client (on Home only; it leads to `/tehnicko-crtanje`, as before) |

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

### UI strings of the base components (phase 2)

The header, footer and skip link of the design system (ADR 0015) read these strings from `src/locales/{hr,en}.json`. Both languages are drafts (`draft`); the Croatian lines come from the glossary and the prototype copy, and the English lines are new (gap G27). The navigation labels follow the glossary, so they change with it.

| Key | HR `draft` | EN `draft` | Where |
|---|---|---|---|
| `skipLink` | Preskoči na sadržaj | Skip to content | Skip link, first on every page |
| `header.home` | Codraft, početna stranica | Codraft, home page | Accessible name of the header's logo link |
| `header.menu` | Izbornik | Menu | Menu button on narrow screens |
| `header.navLabel` | Glavna navigacija | Main navigation | Accessible name of the main navigation |
| `nav.services` | Usluge | Services | Navigation |
| `nav.drafting` | Tehničko crtanje | Engineering Drafting | Navigation (EN waits for S19) |
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
| `footer.pending` | Stiže prije objave | Arrives before launch | Title block, in place of company data the client hasn't sent yet (PROGRESS.md, item A) |

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
