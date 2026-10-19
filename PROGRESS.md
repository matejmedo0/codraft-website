# Codraft — napredak

**Trenutna faza:** 1 — Arhitektura (u tijeku od 19. 10. 2026., grana `phase/1-architecture`)

**Sljedeći korak:** nova sesija izvršava odobreni plan scaffolda (`docs/plans/2026-10-19-scaffold-plan.md`) od točke 0. Točka 0 je nadogradnja Nodea na 24.22.0, a vi potvrđujete UAC prozor. Redoslijed u fazi 1:
1. ✓ istraživanje hostinga i servisa → `docs/research/2026-10-19-hosting.md`
2. ✓ postupak `/architecture` i 3 opcije s troškovima → `docs/phases/1-architecture-options.md`
3. ✓ vaš izbor: opcija 1 i servisi (ADR 0008–0013)
4. ✓ plan scaffolda, odobren 19. 10. 2026. → `docs/plans/2026-10-19-scaffold-plan.md` (provjerene verzije i postavke: `docs/research/2026-10-19-scaffold-toolchain.md`)
5. **scaffold, CI, hookovi i dozvole, `/init`, provjere i PR ← sljedeće, u novoj sesiji**

Faza 1 je gotova kad build prolazi, prazna stranica radi na tri širine i CI je zelen.

**Gdje je što:**
- Pravila rada i ovlasti: `.claude/rules/codraft-workflow.md`
- Plan po fazama: `docs/phases/`
- Indeks dokumentacije: `docs/README.md`
- Repozitorij: https://github.com/matejmedo0/codraft-website (privatan). Grana `main` je zaštićena, pa svaka promjena ide kroz PR.

## Faza 1: odluke (donesene 19. 10. 2026.)

Detalji, rizici i cijeli izračun troškova: `docs/phases/1-architecture-options.md`. Iznosi su mjesečni.

| | Opcija 1 (preporuka) | Opcija 2 | Opcija 3 |
|---|---|---|---|
| Što | Astro s React otocima i malim Node API-jem, na EU VPS-u (OVHcloud VPS-1) | Isti kod na Cloudflare Workers Free | Next.js na EU VPS-u |
| Hosting s PDV-om (IPv4 i dnevni backup uključeni) | 5,61 € | 0 € | 5,61 € |
| Gdje su podaci | EU | Američki pružatelj; upiti u bazi vezanoj uz EU | EU |
| Booking na hrvatskom, podaci u EU | Da (Easy!Appointments) | Ne | Da |
| Održavanje servera | oko 2–3 h | oko 0,5–1 h | oko 3–4 h |

**Budžet:** do 10 € mjesečno (vaša odluka, 19. 10. 2026.). Preporuka ostaje opcija 1. S chatbotom i Zoho Mail Lite za tri osobe to je oko 9,96 € s PDV-om. Domena je zaseban godišnji trošak.

Hostinger Cloud Startup provjeren je na vaš zahtjev i nije u užem izboru. Cijena od 7,99 $ vrijedi samo uz 48 mjeseci unaprijed, a obnova je 25,99 $ mjesečno bez PDV-a (oko 28,87 € s PDV-om).

Odlučeno (svaka stavka ima ADR):
1. ✓ **Opcija 1:** stack (ADR 0008) i hosting (ADR 0009)
2. ✓ **E-mail iz formi:** Scaleway (ADR 0010)
3. ✓ **Analitika:** GoatCounter na našem serveru uz privolu, plus Search Console i Bing (ADR 0011)
4. ✓ **Booking:** Easy!Appointments na našem serveru (ADR 0012)
5. ✓ **Sandučići @codraft.hr:** Zoho Mail Lite, postavljaju se u fazi 7 (ADR 0013)

Računi i ključevi otvaraju se u fazi 4, a sandučići u fazi 7.

Za kasnije, kad ih faza zatraži: uvjeti najma servera, privatni pregled prototipova u fazi 2 i rok čuvanja upita iz formi.

## Faze

- [x] 0 — Temelji: git i GitHub, tekst stranice, sitemap, asseti, odluke, dokumentacija → `docs/phases/0-foundation.md`
- [ ] 1 — Arhitektura (u tijeku): istraživanje, stack, hosting, scaffold, CI, hookovi i dozvole → `docs/phases/1-architecture.md`
- [ ] 2 — Dizajn: 2–3 smjera kao prototipovi, tokeni, animacija, osnovne komponente → `docs/phases/2-design.md`
- [ ] 3 — Izrada stranica: stranica po stranica, HR i EN, uz `/check` nakon svake → `docs/phases/3-pages.md`
- [ ] 4 — Integracije: forme, booking, kolačići i analitika, AI asistent → `docs/phases/4-integrations.md`
- [ ] 5 — Kvaliteta: E2E i unit testovi, pristupačnost, performanse → `docs/phases/5-quality.md`
- [ ] 6 — Audit prije objave → `docs/phases/6-audit.md`
- [ ] 7 — Objava → `docs/phases/7-launch.md`
- [ ] 8 — Održavanje → `docs/phases/8-maintenance.md`

## Odluke

Svaka odluka ima svoj ADR u `docs/decisions/`.

| Datum | Odluka | Zapis |
|---|---|---|
| 2026-10-18 | Odluke se zapisuju kao ADR-ovi; `docs/` je trajna memorija projekta | [ADR 0001](docs/decisions/0001-record-architecture-decisions.md) |
| 2026-10-18 | Jezici: hrvatski je zadani (`/`), engleski je pod `/en`; slugovi su lokalizirani. Tržište: Hrvatska. | [ADR 0002](docs/decisions/0002-croatian-default-english-secondary.md) |
| 2026-10-18 | Sitemap za objavu: jedna stranica Usluge sa sidrima (8 usluga); Besplatna analiza i Kontakt odvojeno; izjava o pristupačnosti; „Radovi“ tek uz stvarne projekte | [ADR 0003](docs/decisions/0003-launch-sitemap.md) |
| 2026-10-18 | Povjerenje gradimo samo na provjerljivim dokazima: vlastiti CAD uzorci, tim, demo, primjer izvještaja | [ADR 0004](docs/decisions/0004-verifiable-proof-only.md) |
| 2026-10-18 | Dizajn smjerove pregledavamo kao žive prototipove u kodu; Figma po želji | [ADR 0005](docs/decisions/0005-design-review-with-coded-prototypes.md) |
| 2026-10-18 | GitHub: privatan repozitorij; svaka faza ima granu i PR, a merge ide na vašu riječ | [ADR 0006](docs/decisions/0006-github-repo-and-phase-branches.md) |
| 2026-10-18 | Opseg za objavu:<br>- tim s fotografijama<br>- analiza: forma, pa termin<br>- AI asistent u fazi 4<br>- budžet što bliže 0 €, mali plaćeni EU hosting je u redu<br>- forme i e-mail po mjeri | [ADR 0007](docs/decisions/0007-launch-scope-and-constraints.md) |
| 2026-10-19 | Stack: Astro s React otocima, statične stranice, mali Node API; TypeScript 6, npm, Node 24 LTS; budžet JavaScripta po stranici | [ADR 0008](docs/decisions/0008-stack-astro-with-react-islands.md) |
| 2026-10-19 | Hosting: OVHcloud VPS-1 u EU-u, s Caddyjem i deployem iz GitHub Actionsa; budžet do 10 € mjesečno | [ADR 0009](docs/decisions/0009-hosting-ovhcloud-vps-eu.md) |
| 2026-10-19 | E-mail iz formi: Scaleway (EU), uz zaštitu od zlouporabe | [ADR 0010](docs/decisions/0010-transactional-email-scaleway.md) |
| 2026-10-19 | Analitika: GoatCounter na našem serveru, tek nakon privole; plus Search Console i Bing | [ADR 0011](docs/decisions/0011-analytics-goatcounter-after-consent.md) |
| 2026-10-19 | Booking: Easy!Appointments na našem serveru (hrvatsko sučelje, podaci u EU) | [ADR 0012](docs/decisions/0012-booking-easy-appointments.md) |
| 2026-10-19 | Sandučići: Zoho Mail Lite (EU), postavljaju se u fazi 7 | [ADR 0013](docs/decisions/0013-mailboxes-zoho-mail-lite.md) |

## Sitemap

Struktura je odobrena s planom (ADR 0003). Sekcije po stranicama su u `docs/information-architecture.md`. Nazivi i slugovi potvrđuju se kad odobrite terminologiju, a nakon objave se više ne mijenjaju.

| Stranica | HR | EN | Glavni CTA | Faza |
|---|---|---|---|---|
| Početna | `/` | `/en` | Rezervirajte besplatnu analizu | 3 |
| Usluge | `/usluge` | `/en/services` | Rezervirajte besplatnu analizu | 3 |
| CAD crtanje | `/cad-crtanje` | `/en/engineering-drafting` | Zatražite ponudu | 3 |
| O nama | `/o-nama` | `/en/about` | Rezervirajte besplatnu analizu | 3 |
| Besplatna analiza | `/besplatna-analiza` | `/en/free-audit` | Nastavite na odabir termina | 3 (forma: 4) |
| Kontakt | `/kontakt` | `/en/contact` | Pošaljite upit | 3 (forma: 4) |
| Privatnost | `/privatnost` | `/en/privacy` | — | 3 |
| Kolačići | `/kolacici` | `/en/cookies` | Postavke kolačića | 3 |
| Impresum | `/impresum` | `/en/legal-notice` | — | 3 |
| Izjava o pristupačnosti | `/pristupacnost` | `/en/accessibility` | — | 3 (dovršava se u 6) |
| 404 | — | — | Početna / Usluge | 3 |
| AI asistenti | `/usluge/ai-asistenti` | `/en/services/ai-assistants` | Isprobajte asistenta | 4 |
| Radovi, Blog | `/radovi`, `/blog` | `/en/work`, `/en/blog` | — | kasnije |

## Asseti

### Imamo

Brand paket u `Assets/codraft-brand/` je finalan:
- wordmark u 4 varijante (SVG i PNG)
- ikona C i ikona B
- favicon set s manifestom i head snippetom
- profilne slike za društvene mreže
- pregledni list svih znakova

Pregled je u `docs/brand.md`.

### Trebamo od vas

| | Što | Do faze |
|---|---|---|
| A | **Podaci o tvrtki:**<br>- pravni oblik i registrirani naziv<br>- sjedište<br>- sud i MBS ili obrtni registar<br>- OIB<br>- status u sustavu PDV-a<br>- banka i IBAN<br>- za (j.)d.o.o. još temeljni kapital i uprava | 3 (bez toga nema objave) |
| B | **Kontakt:**<br>- e-mail i telefon<br>- je li adresa javna<br>- radno vrijeme<br>- grad i područje rada<br>- primate li klijente uživo<br>- rok u kojem odgovarate na upit<br>- profili na društvenim mrežama | 3 |
| C | **Tim:**<br>- ime, uloga, kratka biografija i LinkedIn za svaku osobu<br>- pisana privola za objavu<br>- fotografije prema specifikaciji u `docs/brand.md` | 3 |
| D | **CAD:**<br>- smijemo li prikazati pojedine projekte<br>- softver i verzija<br>- formati i standardi<br>- rokovi isporuke<br>- 2–3 uzorka izrađena posebno za stranicu | 3 |
| E | **Poslovno:**<br>- opseg besplatne analize i što klijent dobiva<br>- prikazujemo li cijene<br>- mjesečna naknada za održavanje<br>- vlasništvo domene i koda<br>- NDA | 3 |
| F | **Odobrenja:**<br>- HR nacrt postojećeg teksta<br>- prijedlozi S1–S16<br>- terminologija i obraćanje (vi/ti), u `docs/content.md` | prije faze 3 |
| G | **Domena:** kupnja codraft.hr i provjera žiga „CODRAFT“ | što prije; najkasnije u fazi 7 |

### Radimo mi

- optimizirane web kopije znakova i favicona (faza 2)
- web fontovi: najviše dvije obitelji, latin-ext, na vlastitom serveru (faza 2)
- CAD motivi u SVG-u; nema generičkog paketa ikona (faza 2)
- OG slike, generirane pri izradi stranice (faza 3)
- nacrti teksta za praznine koje su na nama (`docs/content.md` §4, faze 3–6)
- nacrti pravnih tekstova (faza 3)

## Domena

- **Preporuka: codraft.hr**, jedna domena za oba jezika.
- codraft.hr je 19. 10. 2026. bila slobodna (WHOIS).
- Cijena: besplatna preko CARNET-a ako registrirani naziv tvrtke sadrži „Codraft“; inače oko 50–66 € godišnje bez PDV-a (npr. cyber_Folks 66,49 €, s PDV-om 83,11 €).
- codraft.com je zauzeta (ističe 14. 12. 2026.).
- **codraft.dev je aktivan AI alat „Codraft“**, pa prije tiska i oglašavanja treba provjeriti žig.

Detalji: `docs/research/2026-10-18-domain-and-name.md`

## Otvorena pitanja

Nijedno od ovih pitanja ne blokira početak faze 1. Odgovori trebaju najkasnije do faze 3.

1. Koji je pravni oblik i registrirani naziv tvrtke? Je li tvrtka već registrirana i sadrži li naziv riječ „Codraft“? O tome ovise Impresum i besplatna .hr domena.
2. U kojem ste gradu, primate li klijente uživo i je li adresa javna? O tome ovise lokalni SEO i Profil tvrtke na Googleu.
3. Koju terminologiju birate (`docs/content.md` §1)?
   - „analiza“ ili „audit“
   - „CAD crtanje“ ili „tehničko crtanje“
   - obraćanje „vi“ ili „ti“
   - engleski britanskim ili američkim pravopisom
4. Koje prijedloge S1–S16 prihvaćate (`docs/content.md` §3)?
5. Želite li ponuditi 2–3 partnerska projekta po nižoj cijeni, u zamjenu za objavljenu studiju slučaja (`docs/information-architecture.md`)?
6. Hoće li i ostali članovi tima raditi s Claudeom na svojim računalima? Skillovi i agenti (npr. `/architecture`) postoje samo u `~/.claude` na ovom računalu. Ako da, prebacujemo ih u projekt.
7. Želite li GitHub organizaciju za tim? Repozitorij se može premjestiti, a stare adrese se same preusmjeravaju.

**Kasnije:**
- **Faza 1:** ✓ stack, hosting i servisi su odlučeni (ADR 0008–0013).
- **Faza 2:**
  - animacija loga (README paketa zabranjuje efekte na znaku)
  - C2PA metapodaci u web kopijama
  - privatni pregled prototipova na poddomeni (uz opciju 1 traži kupljenu domenu i server već u fazi 2)
- **Faza 3:** tim i fotografije, opseg analize, cijene, vlasništvo i NDA, CAD podaci i uzorci, kontakt podaci, rok čuvanja upita iz formi (prijedlog: 12 mjeseci).
- **Faza 4:**
  - računi i ključevi (e-mail API, booking, Anthropic API)
  - limit potrošnje chatbota
  - potvrda da se datoteke ne učitavaju kroz formu
- **Faza 6:** narudžba servera i uvjeti najma (uz opciju 1; treba za pregledni URL audita, ili ranije uz privatne preglede u fazi 2).
- **Faza 7:**
  - kupnja domene, ako dotad nije kupljena
  - postavljanje e-mail sandučića
  - pregled pravnika
  - ispunjavate li uvjete za Profil tvrtke na Googleu

## Napomene

- Brand paket u `Assets/codraft-brand/` je finalan. Originale ne mijenjamo, a stranica koristi optimizirane kopije.
- Tekst usluga zaprimljen je 18. 10. 2026. i spremljen doslovno u `docs/content.md` (Dodatak A).
- Dokumentacija u `docs/` je na engleskom; ovaj dokument je na hrvatskom.
- Odobreni plan od 18. 10. 2026. spremljen je doslovno u `docs/plans/2026-10-18-approved-plan.md`.
- Istraživanje hostinga i servisa od 19. 10. 2026. (`docs/research/2026-10-19-hosting.md`) zamjenjuje ono od 18. 10.
