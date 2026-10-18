# Codraft — napredak

**Trenutna faza:** 0 — Temelji (završena 19. 10. 2026., čeka vašu potvrdu za fazu 1)

**Sljedeći korak:** kad kažete „idemo dalje“, počinje faza 1 — Arhitektura. Redoslijed u fazi 1:
1. istraživanje hostinga i servisa
2. postupak `/architecture` i 2–3 opcije
3. vaš izbor stacka i hostinga
4. plan scaffolda
5. scaffold, CI, hookovi i dozvole

Faza 1 je gotova kad build prolazi, prazna stranica radi na tri širine i CI je zelen.

**Gdje je što:**
- Pravila rada i ovlasti: `.claude/rules/codraft-workflow.md`
- Plan po fazama: `docs/phases/`
- Indeks dokumentacije: `docs/README.md`
- Repozitorij: https://github.com/matejmedo0/codraft-website (privatan). Grana `main` je zaštićena, pa svaka promjena ide kroz PR.

## Faze

- [x] 0 — Temelji: git i GitHub, tekst stranice, sitemap, asseti, odluke, dokumentacija → `docs/phases/0-foundation.md`
- [ ] 1 — Arhitektura: istraživanje, stack, hosting, scaffold, CI, hookovi i dozvole → `docs/phases/1-architecture.md`
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
- **Faza 1:** birate stack, hosting, servis za e-mail, analitiku i alat za booking (dobivate 2–3 opcije s troškovima).
- **Faza 2:** animacija loga (README paketa zabranjuje efekte na znaku); C2PA metapodaci u web kopijama.
- **Faza 3:** tim i fotografije, opseg analize, cijene, vlasništvo i NDA, CAD podaci i uzorci, kontakt podaci.
- **Faza 4:**
  - računi i ključevi (e-mail API, booking, Anthropic API)
  - limit potrošnje chatbota
  - potvrda da se datoteke ne učitavaju kroz formu
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
