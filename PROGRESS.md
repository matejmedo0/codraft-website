# Codraft — napredak

**Trenutna faza:** 2 — Dizajn, **gotova; u tijeku su vaše dorade** (19.–20. 10. 2026.) na grani `phase/2-design`. Izvještaj faze je PR #2: https://github.com/matejmedo0/codraft-website/pull/2. Faza 1 (Arhitektura) je gotova i odobrena, a 19. 10. 2026. spojena je u `main` (PR #1).

**Sljedeći korak: nastavak dorada u novoj sesiji, prije faze 3.** U sesijama dorada poslali ste 18 skupina (dorade 1–56), a ja sam ih napravio na `/lab/pocetna`. Vaša ocjena: „Za sad je super … već sada smo na približno zadovoljavajućoj razini“. Sve je zapisano u `docs/phases/2-design-review.md` (odjeljak „Handover (2026-10-20)“):
1. **Gotovo:**
   - poziv na besplatnu analizu samo jednom na stranici, bez gumba u zaglavlju (ADR 0017)
   - bez „mali“ i bez „žargon“ u tekstu
   - „Tehničko crtanje“ samo za arhitekturu i građevinarstvo, s 3D modelima (ADR 0018, 0019), kao opcija C s vašim rasporedom i tekstom
   - naslov u dva reda na širokim ekranima; hero točno kao na vašoj snimci
   - „Što radimo“ sa središnjom osi, jednim kratkim retkom po usluzi i vašim ikonama (opcija B); plava crta glatko prati ekran, a ikone se iscrtavaju kad crta stigne do njih (ADR 0022, 0023)
   - tlocrt koji se iscrtava kao timelapse
   - „Kako radimo“ s vaše tri obveze; tamnija siva za sporedni tekst (7,11:1)
   - završni poziv s vašim pitanjem, centriran
   - skice stižu e-mailom (ADR 0020); sve pripada klijentu (ADR 0021)
   - procjena vanjskog skilla Impeccable (`docs/research/2026-10-20-impeccable-skill.md`). Ne instaliramo ga, ali smo preuzeli četiri ideje (ADR 0025, dorade 46–49):
     - označeni tekst u nijansi brand plave
     - plavi kursor u poljima
     - tri nove provjere za `design-critic`
     - ponovna provjera nalaza nakon popravaka
   - procjena vanjskih skillova Emila Kowalskog (`docs/research/2026-10-20-emil-kowalski-skills.md`). U globalne skillove dodana su četiri, prilagođena (ADR 0026, dorada 50):
     - `animate` i `animation-performance` za animacije u CSS-u
     - `mobile-native` za mobitel
     - `break-ui` za najgore podatke, s hrvatskim vrijednostima

     Upisani su i u pravila faza 2–5. Kod stranice se ne mijenja.
   - procjena vanjskog skilla Taste Skill (`docs/research/2026-10-20-taste-skill.md`). Ne instaliramo ga: njegova pravila zabranjuju naš smjer, a u autorovim testovima nije bio bolji od rada bez skilla. Preuzeto je, na vašu riječ (ADR 0027, dorade 52–56):
     - pet novih provjera za `design-critic`: okvir stranice, ideja do zadnje zone, test „kostima“ za crtački jezik, tri razine detalja u crtežima, hrvatske tipografske sitnice
     - animacije vezane uz skrol i prijelazi između stranica u globalnom skillu `animate`
     - u fazi 3 svaka stranica počinje svojim argumentom: tvrdnja i provjerljiv dokaz po zoni

     Kod stranice se ne mijenja.
2. **Otvoreno:**
   - vaše daljnje dorade („još par detalja i popravka prije faze 3“)
   - okvir lista na 1920 px (rekli ste da ćemo ga pogledati kasnije)
   - 3D prikaz tlocrta, ako ga želite
   - gumb „Pošaljite skicu“ na početnoj: ostaje ili ide
   - boja trake preglednika na mobitelu (`theme-color`): tamnoplava iz brand paketa ili papirnata kao zaglavlje. Obje opcije treba isprobati na mobitelu, a odlučujete kasnije (dorada 51). Taste Skill ima pravilo da traka prati prvo polje stranice, što ide u prilog papirnatoj (dorada 55).
   - jednokratno pokretanje alata `inspect` iz Taste Skilla na `/lab/pocetna` čeka vašu riječ (dorada 56)
   - ostali prijedlozi iz procjene Kowalskijevih skillova čekaju vašu riječ: provjera preljeva na 320 px, najgori podaci u dokumentima faza, popis pravila za kod animacija, birač varijanti u labu
   - engleski tekst na kraju dorada
   - usklađivanje Figme
   - neovisna kritika dizajna: agent `design-critic` je napravljen (ADR 0024, `docs/design-critique.md`). Prvo pokretanje na početnoj čeka vašu riječ. Pokretanje nakon svake stranice u fazi 3 je moj prijedlog.
   - završne provjere i ažuriranje PR-a #2
   - prije javne objave sami pregledavate i ispravljate sve tekstove

Merge i faza 3 (izrada stranica) idu tek na vašu riječ („idemo dalje“).

**Što pregledati:**
- **Početna s doradama:** pokrenite `npm run dev` u mapi projekta i otvorite http://localhost:4321/lab/pocetna. Usporedbe opcija: `/lab/sto-radimo`, `/lab/crtanje` i `/lab/ikone`.
- **Stranica sa stilovima:** http://localhost:4321/lab/style. Na njoj su tokeni, komponente i hero složen kao na početnoj. Bez pokrenutog dev servera stranica javlja `ERR_CONNECTION_REFUSED`.
- **Snimke:** `docs/phases/screenshots/phase-2/system/`, uključujući sličice animacija usred pokreta, i `.../review/` (dorade, uz vašu referentnu snimku heroja).
- **Figma knjižnica „Codraft sustav dizajna“:** https://www.figma.com/design/pWypJUUuwNZv9iTSDVFBV0
- **Animacije:** vidljive su samo kad su Windowsovi „Animacijski efekti“ uključeni (Postavke → Pristupačnost → Vizualni efekti → Animacijski efekti). Drugi način je DevTools → Rendering → „prefers-reduced-motion: no-preference“.

**Vaše konačne odluke** (19. 10. 2026., `docs/phases/2-design-system.md`, ADR 0015 i 0016):
- **Smjer:** D „Model i list“ sa svijetlim (papirnatim) zaglavljem i herojem. U heroju je znak na milimetarskom papiru, a tamnoplava ostaje samo u završnom pozivu.
- **Animacije:** sve četiri, kako su izrađene: ulaz loga, CAD crtež u slojevima, prijelazi odjeljaka i linije kroz korake. Pregled animacija ostaje za kasnije, kako ste rekli.
- **Traka tima:** dvije osobe.
- **Font:** samo Archivo.
- **Kutovi:** 2 px na gumbima, poljima i pločama. Crtački elementi ostaju oštri: okvir lista, crte zona, zaglavlje nacrta i gripovi.
- **Lab:** A–E ostaju kao zapis.
- **Figma:** da, za brze i jeftine prototipe i dorade; kod ostaje izvor istine.

**Što je izrađeno u završnom dijelu faze 2:**
1. **Brand asseti u kodu:** web kopije znakova i favicona bez C2PA. Skripta ih uvijek može ponovno izvesti iz originala, koji ostaju netaknuti.
2. **Tokeni:**
   - boje za papir i tamnoplavu površinu, s kontrastom svih parova teksta provjerenim testovima
   - tipografska skala, razmaci, kutovi, gripovi i fokus
3. **Font:** Archivo s vlastitog servera. Osnovna datoteka za hrvatski i engleski ima 36,5 KB (u labu 71 KB), a zamjenski font je podešen da se tekst ne pomakne kad stigne pravi.
4. **Animacija:** tokeni u CSS-u i ista vrijednost za buduće React otoke.
5. **Komponente:**
   - list sa zonama i prijelazima
   - gumb, gripovi, stavka, koraci, kota i znak
   - zaglavlje s izbornikom za mobitel
   - zaglavlje nacrta kao podnožje
   - prebacivanje jezika i poveznica „Preskoči na sadržaj“

   Početna i 404 stranice već stoje na listu, a sadržaj stiže u fazi 3.
6. **Stranica sa stilovima** `/lab/style`.
7. **Figma knjižnica:**
   - 58 varijabli: paleta, uloge s načinima Papir i Tamnoplava, raspored za mobitel, tablet i desktop, oblik
   - 24 stila teksta
   - 9 komponenti
   - primjer početne stranice složen od instanci

**Provjere:**
- Na lab buildu pod pravim CSP-om, na 375, 768 i 1440 px, na svim stranicama laba:
  - axe bez nalaza
  - konzola bez grešaka
  - bez vodoravnog pomicanja
  - svi dijelovi se iscrtaju
  - tipkovnica i izbornik rade
  - smanjeno kretanje i prikaz bez JavaScripta prikazuju gotovo stanje
- Prototipovi A–E izgledaju isto kao prije.
- `npm run verify`: 138 unit testova, 1,0 KB JavaScripta po stranici.
- `npm run test:e2e`: 51 test.

Redoslijed u fazi 2:
1. ✓ vaše tri odluke s početka faze (ADR 0014): animacija loga samo na početnoj; web kopije bez C2PA; pregled na localhostu
2. ✓ tri smjera kao živi prototipovi: A „Nacrt“, B „Noćni nacrt“, C „Studio“ (`docs/phases/2-design-directions.md`)
3. ✓ vaš pregled runde 1: nijedan smjer nije za uzeti kakav jest; željeli ste hibrid i više animacije
4. ✓ runda 2: hibridi D „Model i list“ i E „Nacrt s pojasom“ (`docs/phases/2-design-round-2.md`)
5. ✓ vaš izbor smjera i ostale konačne odluke (ADR 0015 i 0016)
6. ✓ tokeni, font, animacija, brand asseti u kodu, osnovne komponente, stranica sa stilovima, Figma knjižnica
7. ✓ izlazne provjere i PR #2 kao izvještaj faze
8. vaše dorade prije faze 3 ← sljedeća sesija (`docs/phases/2-design-review.md`)

Prototipovi obiju rundi ostaju na `/lab` kao zapis; snimke su u `docs/phases/screenshots/phase-2/` (runda 1), `.../round-2/` i `.../system/`.

Redoslijed u fazi 1:
1. ✓ istraživanje hostinga i servisa → `docs/research/2026-10-19-hosting.md`
2. ✓ postupak `/architecture` i 3 opcije s troškovima → `docs/phases/1-architecture-options.md`
3. ✓ vaš izbor: opcija 1 i servisi (ADR 0008–0013)
4. ✓ plan scaffolda, odobren 19. 10. 2026. → `docs/plans/2026-10-19-scaffold-plan.md` (provjerene verzije i postavke: `docs/research/2026-10-19-scaffold-toolchain.md`)
5. ✓ scaffold, CI, hookovi i dozvole, `/init`, provjere i PR → dnevnik u `docs/phases/1-architecture.md`, nalazi u `docs/research/2026-10-19-scaffold-verification.md`

Izlazni kriteriji faze 1 su ispunjeni: build prolazi, dev server radi, prazna stranica prikazuje se na 375, 768 i 1440 px bez grešaka u konzoli, a CI je zelen.

**Gdje je što:**
- Pravila rada i ovlasti: `.claude/rules/codraft-workflow.md`
- Pokretanje projekta i naredbe: `README.md`
- Neovisna kritika dizajna: `docs/design-critique.md`
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

Za kasnije, kad ih faza zatraži: uvjeti najma servera i rok čuvanja upita iz formi. Privatni pregled prototipova u fazi 2 nije potreban (ADR 0014).

## Faza 1: rezultat (19. 10. 2026.)

- **Projekt:** Astro 7.4 s React otocima i malim Node API-jem. Prazna početna na `/` i `/en` te lokalizirane 404 stranice.
- **Provjere:**
  - lint, format, tipovi, 83 unit testa, build, budžet JavaScripta i zabranjeni izrazi
  - 18 E2E testova na tri širine
  - CI na Nodeu 24 i 26, zelen
- **Claude Code:** hookovi i dozvole u `.claude/settings.json`. Izmjene `.env` datoteka su blokirane, a svaka izmjena koda prolazi kroz Prettier i ESLint.
- **Na ovom računalu:** Node 24.22.0. Playwright MCP sada ima limit od 10 minuta umjesto 30.
- **Prijedlog za vas:** CI kao obavezna provjera u pravilu „Protect main“, tako da se PR ne može spojiti dok CI nije zelen. To je administracija repozitorija, pa treba vaše odobrenje.

## Faze

- [x] 0 — Temelji: git i GitHub, tekst stranice, sitemap, asseti, odluke, dokumentacija → `docs/phases/0-foundation.md`
- [x] 1 — Arhitektura (gotova i odobrena 19. 10. 2026., PR #1): istraživanje, stack, hosting, scaffold, CI, hookovi i dozvole → `docs/phases/1-architecture.md`
- [ ] 2 — Dizajn (gotova 19. 10. 2026., čeka vaš pregled, PR #2): smjer (ADR 0015), tokeni, font, animacija, komponente, stranica sa stilovima, Figma knjižnica → `docs/phases/2-design.md`
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
| 2026-10-19 | Animacija loga samo na početnoj (jednom pri učitavanju); web kopije znakova bez C2PA metapodataka; prototipove pregledavate na localhostu, bez pregleda na internetu | [ADR 0014](docs/decisions/0014-logo-animation-web-copies-and-local-review.md) |
| 2026-10-19 | Smjer dizajna: D „Model i list“ sa svijetlim zaglavljem i herojem, tamnoplava samo u završnom pozivu; sve četiri animacije; dvije osobe u traci tima; samo Archivo; kutovi 2 px; lab A–E ostaje kao zapis | [ADR 0015](docs/decisions/0015-design-direction-model-i-list.md) |
| 2026-10-19 | Figma za brze prototipe i dorade: sustav iz koda zrcali se u Figma knjižnicu, a kod ostaje izvor istine | [ADR 0016](docs/decisions/0016-figma-for-design-iterations.md) |
| 2026-10-19 | Poziv na besplatnu analizu najviše jednom na stranici, ondje gdje je objašnjena; zaglavlje bez gumba; hero vodi na usluge; završni poziv je „Pošaljite upit“ | [ADR 0017](docs/decisions/0017-one-audit-call-to-action-per-page.md) |
| 2026-10-19 | „Tehničko crtanje“ umjesto „CAD crtanje“ (`/tehnicko-crtanje`), samo za arhitekturu i građevinarstvo | [ADR 0018](docs/decisions/0018-drafting-for-architecture-and-construction.md) |
| 2026-10-19 | Tehničko crtanje nudi i 3D modele, uz 2D crteže i tehničku dokumentaciju | [ADR 0019](docs/decisions/0019-drafting-adds-3d-models.md) |
| 2026-10-20 | Skice i crteži stižu e-mailom; stranica ne prima datoteke, a forma ostaje samo tekstualna | [ADR 0020](docs/decisions/0020-drawings-arrive-by-email.md) |
| 2026-10-20 | Kod, crteži, domena i pristupi pripadaju klijentu, i kad ode drugdje („Sve ostaje vaše“) | [ADR 0021](docs/decisions/0021-the-customer-owns-the-work.md) |
| 2026-10-20 | Vaše ikone usluga na početnoj (opcija B, uz tekst); crta i ikone iscrtavaju se red po red dok se skrola | [ADR 0022](docs/decisions/0022-service-icons-on-home.md) |
| 2026-10-20 | Plava crta u „Što radimo“ raste glatko i stalno prati ekran; ikona se iscrta kad crta stigne do nje | [ADR 0023](docs/decisions/0023-process-line-follows-the-screen.md) |
| 2026-10-20 | Neovisna kritika dizajna: agent `design-critic` u projektu radi sa snimkama i mjerenjima (`npm run design:capture`) i samo izvještava; nalazi koji se kose s vašim odlukama dolaze kao pitanja, a promjene idu samo na vašu riječ | [ADR 0024](docs/decisions/0024-independent-design-critique.md) |
| 2026-10-20 | Skill Impeccable ne instaliramo. Iz njega smo preuzeli četiri stvari:<br>- označeni tekst u nijansi brand plave i plavi kursor<br>- `design-critic` provjerava sitnice koje crta preglednik, razmak oko naslova i smanjeno kretanje<br>- nakon popravaka slijedi ponovna provjera: svaki nalaz je riješen, djelomično riješen ili neriješen | [ADR 0025](docs/decisions/0025-browser-details-and-critique-re-check.md) |
| 2026-10-20 | Od skillova Emila Kowalskog u globalne skillove i pravila faza dodana su četiri, prilagođena projektu: `animate`, `animation-performance`, `mobile-native` i `break-ui` (s hrvatskim vrijednostima). Kod stranice se zasad ne mijenja. | [ADR 0026](docs/decisions/0026-emil-kowalski-skills-in-the-setup.md) |
| 2026-10-20 | Taste Skill ne instaliramo. Iz njega smo preuzeli:<br>- pet provjera za `design-critic` (okvir stranice, ideja do zadnje zone, test „kostima“, tri razine detalja u crtežima, hrvatske tipografske sitnice)<br>- animacije vezane uz skrol i prijelaze između stranica u skillu `animate`<br>- argument stranice (tvrdnja i dokaz po zoni) kao prvi korak svake stranice u fazi 3<br>Kod stranice se ne mijenja. | [ADR 0027](docs/decisions/0027-taste-skill-ideas-in-the-setup.md) |

## Sitemap

Struktura je odobrena s planom (ADR 0003). Sekcije po stranicama su u `docs/information-architecture.md`. Nazivi i slugovi potvrđuju se kad odobrite terminologiju, a nakon objave se više ne mijenjaju.

| Stranica | HR | EN | Glavni CTA | Faza |
|---|---|---|---|---|
| Početna | `/` | `/en` | Rezervirajte besplatnu analizu | 3 |
| Usluge | `/usluge` | `/en/services` | Rezervirajte besplatnu analizu | 3 |
| Tehničko crtanje | `/tehnicko-crtanje` | `/en/engineering-drafting` | Zatražite ponudu | 3 |
| O nama | `/o-nama` | `/en/about` | Pošaljite upit (ADR 0017) | 3 |
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
| E | **Poslovno:**<br>- opseg besplatne analize i što klijent dobiva<br>- prikazujemo li cijene<br>- mjesečna naknada za održavanje<br>- ✓ vlasništvo domene i koda: sve pripada klijentu (ADR 0021)<br>- NDA | 3 |
| F | **Odobrenja:**<br>- HR nacrt postojećeg teksta<br>- prijedlozi S1–S19<br>- terminologija i obraćanje (vi/ti), u `docs/content.md`<br>- prije javne objave sami pregledavate sve tekstove (vaša riječ, 20. 10. 2026.) | prije faze 3 |
| G | **Domena:** kupnja codraft.hr i provjera žiga „CODRAFT“ | što prije; najkasnije u fazi 7 |

### Radimo mi

- ✓ optimizirane web kopije znakova i favicona, bez C2PA (faza 2)
- ✓ web font: Archivo, na vlastitom serveru, s latin-ext u zasebnoj datoteci (faza 2)
- ✓ CAD motivi u kodu (gripovi, kota, milimetarski papir, crte zona); nema generičkog paketa ikona (faza 2)
- ✓ vaših devet ikona usluga u kodu, bez metapodataka; izvori su u `Assets/codraft-icons/` (dorade, ADR 0022)
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
   - ✓ „Tehničko crtanje“, samo za arhitekturu i građevinarstvo (vaša odluka, 19. 10. 2026., ADR 0018)
   - obraćanje „vi“ ili „ti“
   - engleski britanskim ili američkim pravopisom
4. Koje prijedloge S1–S19 prihvaćate (`docs/content.md` §3)?
5. Želite li ponuditi 2–3 partnerska projekta po nižoj cijeni, u zamjenu za objavljenu studiju slučaja (`docs/information-architecture.md`)?
6. Hoće li i ostali članovi tima raditi s Claudeom na svojim računalima? Skillovi i agenti (npr. `/architecture`) postoje samo u `~/.claude` na ovom računalu. Ako da, prebacujemo ih u projekt.
7. Želite li GitHub organizaciju za tim? Repozitorij se može premjestiti, a stare adrese se same preusmjeravaju.

**Kasnije:**
- **Faza 1:** ✓ stack, hosting i servisi su odlučeni (ADR 0008–0013).
- **Faza 2:**
  - ✓ animacija loga, C2PA metapodaci i privatni pregled su odlučeni (ADR 0014)
  - ✓ pitanja runde 2 su odgovorena (19. 10. 2026.)
  - ✓ smjer i konačne odluke (ADR 0015, 0016)
  - pregled animacija na računalu s uključenim animacijskim efektima (ostavljeno za kasnije, na vašu riječ)
- **Faza 3:** tim i fotografije, opseg analize, cijene, vlasništvo i NDA, CAD podaci i uzorci, kontakt podaci, rok čuvanja upita iz formi (prijedlog: 12 mjeseci).
- **Faza 4:**
  - računi i ključevi (e-mail API, booking, Anthropic API)
  - limit potrošnje chatbota
  - ✓ datoteke se ne učitavaju kroz formu; skice i crteži stižu e-mailom (ADR 0020)
- **Faza 6:** narudžba servera i uvjeti najma (uz opciju 1; treba za pregledni URL audita).
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
