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
| Engineering Drafting | **CAD crtanje** | Tehničko crtanje | `/cad-crtanje` · `/en/engineering-drafting` |
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
- **"Analiza", not "audit".** To a small-business owner "audit" is jargon, and the copy promises "results, not jargon". "Revizija" reads as a financial audit.
- **"CAD crtanje".** Clients in the field all know "CAD", and the term avoids "projektiranje", which is a regulated activity. "Inženjersko crtanje" would suggest engineering services and protected titles.

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
  - HR `draft`: Codraft je mali studio koji planira, izrađuje i održava web stranice, softver i AI alate za tvrtke kojima su važni rezultati, a ne žargon.

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
  - HR `draft`: CAD crtanje
- **`drafting.tagline`**
  - EN: Precise drawings, delivered on deadline.
  - HR `draft`: Precizni crteži, isporučeni u roku.
- **`drafting.audience`**
  - EN: For architects, engineering firms and manufacturers who need extra drafting capacity.
  - HR `draft`: Za arhitekte, inženjerske urede i proizvođače kojima treba dodatni kapacitet za crtanje.
- **`drafting.cad.title`**
  - EN: CAD Drafting
  - HR `draft`: 2D CAD crteži
- **`drafting.cad.body`**
  - EN: Accurate 2D drawings in AutoCAD, prepared to your layer and title-block standards from sketches, scans or markups.
  - HR `draft`: Točni 2D crteži u AutoCAD-u, izrađeni prema vašim standardima slojeva i zaglavlja, na temelju skica, skenova ili označenih nacrta.
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

## 4. Content gaps

Copy or material the site needs that does not exist yet. "Client" means the Codraft team provides it; "Claude drafts" means Claude writes a draft here for the client to approve. Page and section references follow [information-architecture.md](information-architecture.md).

| ID | Page · section | What is needed | Owner | Needed by |
|---|---|---|---|---|
| G1 | Home · hero | H1 built on "results, not jargon" | Claude drafts | Phase 3 |
| G2 | Home · how we work | Who owns the domain and the code | Client decides | Phase 3 |
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
| G25 | Contact · form | Topic options (Web i softver / CAD crtanje / Ostalo) and the CAD fields | Claude drafts | Phases 3–4 |
| G26 | Legal pages | Privacy, cookies, legal notice (impresum), accessibility statement | Claude drafts from company data; client and a lawyer review | Phase 3 |
| G27 | Site-wide microcopy | 404 ("Ova stranica nije na nacrtu."), form errors and success, cookie banner | Claude drafts | Phases 3–4 |
| G28 | All pages · metadata and alt text | Title and meta description per page and language; alt text for every meaningful image in both languages (decorative images get an empty `alt`) | Claude drafts | Phase 3 |
| G29 | AI assistants page | Page copy and the chatbot's knowledge base | Claude drafts | Phase 4 |

### Prototype copy (phase 2)

The design-lab prototypes (`src/lab/copy.ts`) use the HR drafts from §2 unchanged, plus the lines below, derived from them. None adds a claim. All stay `draft`: the final hero copy (G1) is written in phase 3, and the UI strings go into the locale files with the base components.

| Where | HR (prototype) | Derived from |
|---|---|---|
| Home hero, H1 (G1 draft) | Planiramo, izrađujemo i održavamo web stranice, softver i AI alate. | `services.intro` |
| Home hero, lead | Codraft je mali studio za tvrtke kojima su važni rezultati, a ne žargon. | `services.intro` |
| Home hero, secondary CTA | Pogledajte usluge | [information-architecture.md](information-architecture.md), Home hero |
| Home hero, drafting path | CAD crtanje za arhitekte, inženjerske urede i proizvođače | `drafting.title`, `drafting.audience` |
| Header CTA | Besplatna analiza | Glossary |
| Menu button | Izbornik | UI string |
| Skip link | Preskoči na sadržaj | UI string |
| Footer, placeholder note | Podaci o tvrtki stižu prije objave. | Stands in for the company data until the client sends it (lab only) |

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
