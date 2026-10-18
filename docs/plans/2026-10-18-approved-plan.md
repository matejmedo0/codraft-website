# Codraft — plan: faza 0 (Temelji) i smjer za faze 1–8

## Kontekst

Radimo web stranicu studija Codraft. Ciljevi su profesionalan dizajn od prvog dana, smislena struktura i kvalitetna animacija koja ne izgleda kao predložak.

Stanje projekta:
- Projekt je prazan. U njemu su samo dokumenti i **finalni brand paket** (`Assets/codraft-brand/`).
- Tekst usluga stigao je danas.
- Odluke su prikupljene kroz pitanja.

Plan određuje što točno radim u fazi 0 i postavlja smjer za ostale faze. **Nakon odobrenja izvršavam samo fazu 0, podnosim izvještaj i čekam vašu riječ.** Tako propisuje `.claude/rules/codraft-workflow.md`.

**Dodatni zahtjevi uz odobrenje (18. 10. 2026.):**
1. Ovaj folder mora imati smislenu, profesionalnu strukturu koda i arhitekture.
2. Cijeli plan mora biti zapisan u dokumentaciji, po fazama, tako da novi chat nastavlja bez gubitka.
3. Projekt dobiva vlastiti GitHub repozitorij. Odobrili ste da ga kreiram sam, s industrijski standardnom strukturom.
4. Radim u auto modu.

**Odluke od 18. 10. 2026.:**
- **Jezici:** HR je zadani jezik (bez prefiksa u URL-u), EN je pod `/en`.
- **Tržište:** Hrvatska.
- **Domena:** još ne postoji; preporuka je u točki 6.
- **Dokazi rada:**
  - Javnih web projekata još nema.
  - CAD radovi postoje, ali nije jasno smijemo li ih objaviti.
- **Tim:** prikazuje se, s fotografijama.
- **Besplatna analiza:** forma, zatim odabir termina.
- **AI chatbot:** da, u fazi 4.
- **Budžet:**
  - Cilj je trošak što bliže 0 € mjesečno.
  - Mali plaćeni hosting (npr. Hetzner) je prihvatljiv.
  - Forme i e-mail rade se po mjeri.
  - Opcije istražujem u fazi 1.
- **Brand paket je finalan** (vidi README). `CLAUDE.md` i `PROGRESS.md` još ga opisuju kao privremen, pa to ispravljam.

---

## 1. Struktura stranice (sitemap)

| # | Stranica | HR | EN | Svrha | Glavni CTA |
|---|---|---|---|---|---|
| 1 | Početna | `/` | `/en` | Ponuda jasna u 5 sekundi; zaseban put za CAD klijente | Rezervirajte besplatnu analizu |
| 2 | Usluge | `/usluge` | `/en/services` | Svih 8 usluga u 3 faze, tijek suradnje, česta pitanja | Rezervirajte besplatnu analizu |
| 3 | CAD crtanje | `/cad-crtanje` | `/en/engineering-drafting` | B2B ponuda za arhitekte, inženjerske urede i proizvođače | Zatražite ponudu |
| 4 | O nama | `/o-nama` | `/en/about` | Priča Code + Draft, tim, način rada, kako je nastala ova stranica | Rezervirajte besplatnu analizu |
| 5 | Besplatna analiza | `/besplatna-analiza` | `/en/free-audit` | Što provjeravamo i što dobivate; forma, zatim termin | Odaberite termin |
| 6 | Kontakt | `/kontakt` | `/en/contact` | Opći upiti i upiti za CAD | Pošaljite upit |
| 7 | Privatnost | `/privatnost` | `/en/privacy` | Obavijest o obradi podataka (GDPR) | — |
| 8 | Kolačići | `/kolacici` | `/en/cookies` | Popis kolačića, ponovno otvaranje postavki | Postavke kolačića |
| 9 | Impresum | `/impresum` | `/en/legal-notice` | Podaci koje traže ZTD i ZET | — |
| 10 | Izjava o pristupačnosti | `/pristupacnost` | `/en/accessibility` | Dobrovoljna i iskrena izjava (cilj WCAG 2.2 AA) | — |
| 11 | 404 | — | — | Lokalizirana poruka („Ova stranica nije na nacrtu.“) | Početna / Usluge |
| F4 | AI asistenti | `/usluge/ai-asistenti` | `/en/services/ai-assistants` | Usluga s živim demom | Isprobajte asistenta |
| Kasnije | Radovi, Blog | `/radovi`, `/blog` | `/en/work`, `/en/blog` | Kad budu stvarni projekti; blog za lokalni SEO | — |

**Navigacija:** Usluge · CAD crtanje · O nama · Kontakt · [Besplatna analiza] · EN. Prebacivač jezika vodi na istu stranicu na drugom jeziku. Podnožje sadrži pravne poveznice i podatke o tvrtki.

**Ključne odluke o strukturi:**
- **Jedna stranica Usluge sa sidrima, a ne 8 zasebnih stranica.**
  - Svaka usluga zasad ima oko 20 riječi teksta. Osam stranica na dva jezika bilo bi 16 tankih stranica, a Google takve stranice slabije rangira.
  - Za lokalno rangiranje važniji su Profil tvrtke na Googleu, recenzije, dosljedni podaci o tvrtki i jaka početna stranica.
  - **Pravilo za zasebnu stranicu:** usluga je dobiva kad na oba jezika ima stvarni demo ili studiju slučaja i oko 400 riječi konkretnog sadržaja. Prva takva je AI asistenti u fazi 4.
- **Besplatna analiza i Kontakt su odvojene stranice.** Imaju različitu publiku (vlasnik tvrtke ili arhitekt) i različite forme. Stranica CAD crtanje ugrađuje kontakt formu s već odabranom temom.
- **„Radovi“ nisu u navigaciji** dok nema stvarnih projekata.
- **Izjava o pristupačnosti** je dobrovoljna. Pristupačnost prodajete kao uslugu, pa vam izjava služi i kao dokaz.

### Sadržaj po stranicama

Oznake: **P** = tekst postoji · **I** = izvodi se iz postojećeg teksta ili odluka, bez novih tvrdnji · **N** = nedostaje, netko ga treba napisati ili dati.

**Početna**
1. **Hero**
   - H1 na temu „rezultati, a ne žargon“ (N).
   - Podnaslov je uvodna rečenica (P).
   - Dva CTA-a: analiza i usluge.
   - Plava linija iz wordmarka nacrta se jednom.
2. **Što radimo:** 01 Planiranje, 02 Izrada, 03 Održavanje i rast. Usluge su unutar svake faze i vode na `/usluge#…` (P).
3. **Besplatna analiza ukratko:** što provjeravamo (N) i 3 koraka (I).
4. **AI asistent:** najava živog demoa (faza 4).
5. **CAD crtanje:** zaseban put za arhitekte, inženjere i proizvođače (P).
6. **Kako radimo**
   - fiksna cijena prije početka, bez žargona, ostajemo nakon objave (I)
   - vlasništvo domene i koda (N, vaša odluka)
7. **Tim:** fotografije, imena i uloge (N).
8. **Završni CTA** (P).

**Usluge**
1. **Uvod** (P).
2. **`#planiranje`:** tekst i CTA (P); što analiza pokriva (N).
3. **`#izrada`:** 4 bloka. Svaki ima:
   - vašu rečenicu (P)
   - 3–4 stavke „Što dobivate“ (N)
   - okvirni rok ili cijenu (N, vaša odluka)
4. **`#odrzavanje-i-rast`:** 3 bloka. Svaki ima:
   - vašu rečenicu (P)
   - što je uključeno (N)
   - okvirnu mjesečnu naknadu (N, vaša odluka)
5. **Tijek suradnje:** analiza → ponuda → izrada → objava → održavanje (I).
6. **Česta pitanja, 6–8** (N): cijena, trajanje, tko je vlasnik domene i koda, „već imam stranicu“, vezanost uz održavanje, PDV.
7. **CTA** (P).

**CAD crtanje**
1. **Hero:** naslov, slogan i kome je usluga namijenjena (P).
2. **Usluge:** 2D CAD crteži i tehnička dokumentacija (P), uz popis onoga što točno isporučujemo (N).
3. **Uzorci:** 2–3 lista izrađena posebno za stranicu, prikazana u pregledniku slojeva (N, crta ih vaš tim).
4. **Opseg i odgovornost** (N, pravno osjetljivo):
   - Crtamo prema vašim skicama i standardima.
   - Odgovornost, pečat i potpis ostaju vašem ovlaštenom arhitektu ili inženjeru.
5. **Kako surađujemo:** datoteke → ponuda → crtanje → krugovi provjere → isporuka (N).
6. **Formati i standardi:** verzija DWG-a, DXF, PDF, slojevi, zaglavlja, CTB/STB (N, potvrđujete vi).
7. **Povjerljivost:** NDA na zahtjev. Radove klijenata ne prikazujemo bez pisanog dopuštenja (N).
8. **Upit za ponudu:** forma s temom „CAD crtanje“ (I).

**O nama**
1. **Priča Code + Draft** (N, iz bilješke).
   - Plava linija u logu čini prečke slova „f“ i „t“. Kad se nacrta, riječ je dovršena.
   - To je glavna animacija loga.
2. **Tim:** fotografija, ime, uloga, 2–3 rečenice i LinkedIn za svaku osobu (N).
3. **Način rada** (I).
4. **Gdje smo** (N): grad, područje rada, sastanci uživo.
5. **`#ova-stranica`** (N, pišemo nakon mjerenja u fazi 6):
   - kako je stranica izrađena
   - izmjerena brzina i težina stranice
   - cilj WCAG
   - nikakve vanjske skripte prije privole
6. **CTA** (P).

**Besplatna analiza**
1. **H1**, npr. „Besplatna analiza web stranice i vidljivosti na Googleu“ (I).
2. **Što provjeravamo:** brzina, prikaz na mobitelu, Google i Profil tvrtke na Googleu, pristupačnost, AI tražilice (N, opseg određujete vi).
3. **Što dobivate:** npr. razgovor i pisani sažetak (N).
4. **Tri koraka:** forma → termin → potvrda (I). Mikrotekst nedostaje (N).
5. **Primjer izvještaja** (N, može doći kasnije).
6. **Česta pitanja** (N): je li analiza stvarno besplatna, što ako nemam stranicu, koliko traje, obvezuje li me.

**Kontakt**
1. **Rok odgovora** (N).
2. **Forma s temom:** Web i softver / CAD crtanje / Ostalo. Za CAD se dodaju vrsta posla, broj listova, rok i formati.
3. **Kontakt podaci:** e-mail, telefon, radno vrijeme, adresa samo ako je javna (N).
4. **Poveznica na analizu** za web upite.

**Pravne stranice i 404:** nacrte pišem ja iz podataka o tvrtki. Vi ih pregledavate, idealno uz pravnika.

---

## 2. Povjerenje bez web portfolija

Koristimo samo dokaze koje posjetitelj može provjeriti:

- **Vlastiti CAD uzorci izrađeni za stranicu.** Primjeri:
  - tlocrt i presjek izmišljene kuće
  - strojni dio u tri pogleda
  - skica s oznakama uz gotov list

  Svaki je označen: „Uzorak izrađen za Codraft — nije rad za klijenta“. Tako nema problema s NDA-om, a vidi se kvaliteta slojeva, debljina linija i zaglavlja.
- **Dopuštenja bivših CAD klijenata.** Pošaljemo pisani predložak s tri izbora: cijeli rad, anonimizirani isječak ili ne. Objavljujemo samo radove za koje dobijemo „da“.
- **Stranica kao dokaz.** Izmjerene i datirane brojke objavljujemo u `#ova-stranica`.
- **Živi AI asistent** (faza 4).
- **Primjer izvještaja analize.**
- **Transparentan proces:**
  - što ulazi u fiksnu cijenu
  - što uključuje održavanje
  - tko je vlasnik domene i koda
- **Stvaran tim i provjerljiva tvrtka.** OIB i MBS stoje u podnožju. Hrvatski kupci tvrtke provjeravaju na sudreg ili poslovna.hr.
- **Prijedlog za prve klijente:** 2–3 partnerska projekta po nižoj cijeni, u zamjenu za objavljenu studiju slučaja. Na stranici su jasno označeni kao partnerski.
- **Nikada:**
  - izmišljene recenzije
  - stock ili AI fotografije „tima“
  - logotipi klijenata bez dopuštenja
  - izmišljene brojke („50+ projekata“)

  Lažne recenzije zabranjuje i direktiva EU 2019/2161.

---

## 3. Terminologija (HR)

Gdje su navedene alternative, odluka je vaša.

| EN | HR (preporuka) | Alternativa |
|---|---|---|
| What we do | **Usluge** (navigacija), „Što radimo“ (naslov na početnoj) | — |
| Plan / Build / Run & Grow | **Planiranje / Izrada / Održavanje i rast** | Podrška i rast |
| Engineering Drafting | **CAD crtanje** | Tehničko crtanje |
| Free audit / Book a free audit | **Besplatna analiza / Rezervirajte besplatnu analizu** | Besplatni audit |
| Websites & Online Stores | **Web stranice i web trgovine** | …i webshopovi |
| Legal notice | **Impresum** | Pravne informacije |

- **„Analiza“ umjesto „audit“:** vlasniku male tvrtke „audit“ zvuči kao žargon, a tekst obećava upravo „bez žargona“. „Revizija“ zvuči financijski.
- **„CAD crtanje“:** izbjegava riječ „projektiranje“ (vidi točku 4).
- **Obraćanje:** „vi“, malim slovom, što je standard u B2B komunikaciji.
- **Slugovi:** ASCII bez dijakritika. Nakon objave se ne mijenjaju, a ako se ipak promijene, ide preusmjeravanje 301.

---

## 4. Prijedlozi za engleski tekst

Vaš tekst spremam **doslovno**. Prijedloge zapisujem u `content.md` sa statusom „na čekanju“, a vi ih prihvaćate ili odbijate. Tipfelera nema.

**Ujednačavanje** (smisao se ne mijenja):
- „free review“ / „free audit“
- „Online Stores“ / „e-shops“
- „inquiry“ / „enquiry“
- „delivered on deadline“ → „on time“
- „ready to hand over“ → „ready for handover“

**Mijenjaju smisao, odlučujete vi:**
- „meet EU requirements“ → „help you meet…“. Tehničko postavljanje nije isto što i pravna usklađenost.
- Plan: dodati „…ili vaše prisutnosti na Googleu, ako još nemate stranicu“.
- AI: „jasno označeni kao AI“. EU AI Act tako postaje prodajni argument.
- Tehnička dokumentacija: „…prema podacima vaših inženjera“.
- Lokalni argument: integracija e-računa i fiskalizacije za webshopove. To bi bila nova tvrdnja.

**Važno za hrvatsko tržište:** projektiranje je zakonom regulirana djelatnost (ZPDPUG, čl. 17), koju smiju obavljati samo ovlašteni arhitekti i inženjeri.
- Na CAD stranici nikad ne pišemo „projektiramo“, „projektant“ ni „projektna dokumentacija“.
- Pišemo „crtamo prema vašim skicama i standardima“.
- Odgovornost, pečat i potpis ostaju naručitelju.
- Prije objave preporučujem kratku provjeru s HKA, HKIG ili pravnikom.

„(separate page)“ i bilješke iz drugog chata ne idu na stranicu.

---

## 5. Asseti i sadržaj

### Imamo (`Assets/codraft-brand/`, finalno)

- wordmark u 4 varijante (SVG i PNG)
- ikona C i ikona B
- favicon set s `site.webmanifest` i `head-snippet.html`, spreman za korijen stranice
- profilne slike za društvene mreže
- pregledni list svih znakova

**Napomene za dizajn:**
- **Plava `#2F6BFF` samo za grafiku.** Na off-white podlozi daje kontrast 4,12:1, a bijeli tekst na plavoj 4,4988:1. Oboje je ispod granice WCAG AA za običan tekst.
  - Primarni gumbi su navy.
  - Tekst-poveznice koriste tamniju plavu `#2457D6` (5,65:1).
  - Na navy podlozi koristi se svjetlija plava `#77A0FF` (6,80:1).
  - Izračune sam provjerio. Konačne vrijednosti određujemo u fazi 2.
- **C2PA metapodaci:** svaki SVG ih nosi, oko 6–8 KB od ukupnih 9–11 KB. Originale ne diramo, a web kopije optimiziramo. Hoćemo li iz web kopija ukloniti metapodatke, odlučujete vi u fazi 2.
- **Animacija loga:** README zabranjuje efekte na znaku. Predlažem jednokratni ulaz koji uvijek završava točnim znakom. Pitam vas u fazi 2.
- **Fontovi:**
  - najviše 2 obitelji
  - podskup latin-ext (č ć đ š ž, „“, €)
  - na vlastitom serveru, bez Google Fonts CDN-a, zbog GDPR-a
  - ne smiju oponašati wordmark

### Trebamo od vas

U `PROGRESS.md` ide popis s fazom do koje svaka stavka treba biti spremna.

- **A. Podaci o tvrtki.** Ne trebaju za izradu, ali bez njih nema objave.
  - pravni oblik i registrirani naziv
  - sjedište
  - sud i MBS, ili upis u obrtni registar
  - OIB
  - status u sustavu PDV-a
  - banka i IBAN
  - za d.o.o. ili j.d.o.o. još i temeljni kapital i članovi uprave (ZTD, čl. 21)
- **B. Kontakt:**
  - e-mail i telefon
  - je li adresa javna
  - radno vrijeme
  - grad i područje rada
  - primate li klijente uživo (o tome ovisi Profil tvrtke na Googleu)
  - profili na društvenim mrežama
- **C. Tim.**
  - Za svaku osobu: ime, uloga, kratka biografija, LinkedIn i pisana privola za objavu.
  - Fotografije: jedno snimanje, isto svjetlo i pozadina, portret 4:5, najmanje 3000 px.
  - Uz to 4–6 kadrova s posla.
- **D. CAD:**
  - za svaki projekt: smijemo li ga prikazati
  - softver i verzija
  - formati i standardi
  - rokovi isporuke
  - 2–3 uzorka izrađena za stranicu (DWG i PDF, izvoz po slojevima)
- **E. Poslovno:**
  - opseg besplatne analize i što klijent dobiva
  - prikazujemo li cijene
  - mjesečna naknada za održavanje
  - vlasništvo domene i koda
  - NDA

### Radimo sami

- HR nacrte teksta i tekst za praznine (stranicu po stranicu, uz vaše odobrenje)
- mikrotekst
- nacrte pravnih tekstova
- OG slike za svaku stranicu i jezik, generirane pri izradi stranice
- JSON-LD i alt tekstove
- bazu znanja za chatbot
- CAD motive u SVG-u: mreža, kote, zaglavlje

Generički paket ikona ne koristimo.

---

## 6. Domena

- **Preporuka: codraft.hr.** Jedna domena za oba jezika, s engleskim pod `/en`. To je najjači signal hrvatske tvrtke i za Google i za kupce.
  - DNS za nju ne postoji, pa je vjerojatno slobodna.
  - Potvrdite to kod registrara i registrirajte je što prije.
- **Provjerio sam danas:**
  - **codraft.com** je zauzeta: registrirana 2010., aktivna, ističe 14. 12. 2026.
  - **codraft.dev je aktivan proizvod „Codraft“**, radni prostor za AI agente koji pišu kod (beta). Područje je slično vašem (softver/AI).
  - Prema agentu su zauzete i .eu, .studio i .io.
- **Žig:** prije tiska i oglašavanja provjerite „CODRAFT“ u TMviewu (EUIPO) i DZIV-u, za razrede 9, 35 i 42.
- **Pravila za .hr** (NN 83/2023, ovo još treba potvrditi): pravna osoba ili obrt registriran u Hrvatskoj ima pravo na jednu besplatnu .hr domenu ako ona sadrži registrirani naziv. Ostale .hr domene registriraju se plaćeno, preko registrara.
- **E-mail:** `info@codraft.hr` i osobne adrese za članove tima.

---

## 7. Izvršenje faze 0 (nakon odobrenja)

**Faza 0 ne smije:**
- birati stack ni hosting
- postavljati kostur projekta (scaffold) ni instalirati pakete
- izrađivati `.claude/settings.json` ni hookove
- raditi na dizajnu
- registrirati domene ni račune

**Novo:** GitHub repozitorij kreiram u fazi 0, jer ste to odobrili.

### 7.1 Struktura repozitorija

```
codraft-website/                 GitHub: matejmedo0/codraft-website (privatan)
├── .claude/rules/               pravila rada s Claudeom (već postoji)
├── .github/                     predložak za PR, obrasci za issue, CODEOWNERS (CI dolazi u fazi 1)
├── Assets/codraft-brand/        originali branda, samo za čitanje
├── docs/                        cijela dokumentacija i plan po fazama (7.2)
├── .editorconfig                UTF-8, LF, 2 razmaka, prazan redak na kraju datoteke
├── .gitattributes               LF svugdje; binarne datoteke označene; Assets/** bez pretvorbe
├── .gitignore
├── CLAUDE.md                    ulaz za Claude: kratko, samo pokazivači
├── CONTRIBUTING.md              faze, grane, commitovi, PR-ovi, definicija „gotovog“
├── PROGRESS.md                  stanje projekta, na hrvatskom
└── README.md                    pregled projekta, struktura, indeks dokumentacije
```

**Aplikacijski kod** (`src/`, testovi, konfiguracija) dolazi u fazi 1, prema odabranom stacku. Načela su zapisana u `docs/architecture.md`:
- organizacija po značajkama (features), ne po vrsti datoteke
- jasni slojevi: rute → sekcije i značajke → UI komponente → lib
- sadržaj i prijevodi odvojeni od komponenti
- tokeni i konfiguracija na jednom mjestu
- strogi TypeScript, ESLint i Prettier
- testovi
- validacija env varijabli pri pokretanju
- CI na svakom PR-u

### 7.2 Dokumentacija: cijeli plan, po fazama

**Jezik:**
- dokumentacija na engleskom, kao `CLAUDE.md` i pravila rada (industrijski standard)
- `PROGRESS.md` na hrvatskom
- hrvatski tekst stranice u `content.md`

```
docs/
├── README.md                      indeks i karta pokrivenosti: koji dio plana je u kojoj datoteci
├── architecture.md                struktura repozitorija sada; načela koda; stack nakon faze 1
├── information-architecture.md    sitemap, URL-ovi, navigacija, sekcije po stranicama,
│                                  pravilo za zasebne stranice usluga, mapa ključnih riječi,
│                                  povjerenje bez portfolija
├── content.md                     tekst stranice: pravila, pojmovnik, EN izvor (doslovno),
│                                  HR nacrt (draft), prijedlozi S1–S15, praznine G1…, uredničke
│                                  bilješke, changelog
├── brand.md                       popis asseta, boje i kontrast, prijedlog tokena za tekst,
│                                  zahtjevi za fontove, pravila loga (animacija, C2PA)
├── motion.md                      rječnik pokreta (CAD radnje), načela, reduced motion
├── compliance.md                  hrvatski i EU zahtjevi s izvorima i pouzdanošću; pravila teksta
├── phases/
│   ├── README.md                  pregled svih faza: status, izlazni kriteriji, registar rizika
│   └── 0-foundation.md … 8-maintenance.md
│                                  po fazi: cilj, ulazi, koraci, isporuke, izlazni kriteriji, dnevnik
├── decisions/                     ADR-ovi (Architecture Decision Records) s indeksom i predloškom
│   ├── 0001-record-architecture-decisions.md
│   ├── 0002-croatian-default-english-secondary.md
│   ├── 0003-launch-sitemap.md
│   ├── 0004-verifiable-proof-only.md
│   ├── 0005-design-review-with-coded-prototypes.md
│   └── 0006-github-repo-and-phase-branches.md
├── research/                      datirane činjenice s izvorima
│   ├── 2026-10-18-hosting.md
│   └── 2026-10-18-domain-and-name.md
└── plans/2026-10-18-approved-plan.md
                                   ovaj plan, doslovno, kao snimka (ne ažurira se)
```

**Karta pokrivenosti.** Svaki dio ovog plana ima svoje mjesto u repozitoriju:

| Dio plana | Gdje živi |
|---|---|
| Kontekst i odluke | `PROGRESS.md`, `decisions/0002–0006` |
| 1 Struktura | `information-architecture.md`, `decisions/0003` |
| 2 Povjerenje | `information-architecture.md`, `decisions/0004` |
| 3 Terminologija, 4 Prijedlozi | `content.md` |
| 5 Asseti | `brand.md`; popis stavki koje trebamo od vas u `PROGRESS.md` |
| 6 Domena | `research/2026-10-18-domain-and-name.md` |
| 7 Faza 0 | `phases/0-foundation.md` |
| 8 Faze 1–8 | `phases/1…8`, `motion.md`, `compliance.md`, `research/2026-10-18-hosting.md` |
| 9 Rizici | `phases/README.md` |
| 10 Otvorena pitanja | `PROGRESS.md` i odjeljak „Inputs“ u svakoj fazi |
| Struktura koda | `architecture.md` |
| Git i GitHub | `CONTRIBUTING.md`, `decisions/0006` |

Detaljni izvještaj agenta za planiranje (tablice, izvori, pouzdanost tvrdnji) koristim kao građu za ove datoteke.

### 7.3 Ažuriranja postojećih datoteka

- **`CLAUDE.md`** (na engleskom, kratko):
  - „Where things are“ vodi na `PROGRESS.md`, pravila rada, `docs/README.md`, `docs/phases/`, `docs/decisions/` i `docs/content.md`.
  - Brand assets: finalni paket, originali samo za čitanje, stranica koristi optimizirane kopije.
  - Languages and market.
  - Site structure: kratko, sa slugovima.
  - Brand: hex vrijednosti boja; plava samo za grafiku i velik tekst.
  - Copy guardrails.
  - Git: repozitorij, grane po fazama, Conventional Commits.
  - Stack ostaje „Not chosen yet“.
- **`.claude/rules/codraft-workflow.md`:**
  - **Početak sesije:** nakon `PROGRESS.md` čita se dokument trenutne faze u `docs/phases/`.
  - **Kraj faze, redom:**
    1. izlazne provjere
    2. ažuriranje `PROGRESS.md`, dokumenta faze i ADR-ova
    3. commit i push grane faze
    4. PR prema `main`, s izvještajem faze kao opisom
    5. izvještaj vama
    6. stop
    7. na vašu riječ: merge u `main` i nova grana za sljedeću fazu
  - **Ovlasti:**
    - Bez pitanja: grane, commitovi, push u `origin` i PR-ovi.
    - Merge u `main` samo na vašu riječ.
    - Uz pitanje: vidljivost repozitorija, postavke, suradnici i tajne (secrets).
  - **Nova sekcija Documentation:**
    - `docs/` je trajna memorija projekta.
    - Svaka odluka dobiva ADR i jedan redak u `PROGRESS.md`.
    - Svaka činjenica iz istraživanja ide u `docs/research/`, s datumom i izvorom.
    - Ništa važno ne ostaje samo u chatu.
- **`PROGRESS.md`** (na hrvatskom):
  - Trenutna faza: „0 — Temelji (završena, čeka potvrdu za fazu 1)“.
  - Popis faza s poveznicama na dokumente faza.
  - Odluke u kratkim redcima, s poveznicama na ADR-ove.
  - „Što trebamo od vas“ (A–E, s rokom po fazi).
  - Otvorena pitanja.
  - Napomene, bez zastarjelih rečenica „asseti nisu finalni“ i „tekst usluga korisnik šalje…“.

### 7.4 Git i GitHub

1. **Inicijalizacija:** `git init -b main` te `.gitattributes`, `.gitignore` i `.editorconfig`.
   - Git je na ovom računalu postavljen na `core.autocrlf=true`, pa `.gitattributes` mora zadržati LF.
   - **`.gitignore` obuhvaća:**
     - ovisnosti: `node_modules/`, `.pnpm-store/`
     - build i cache: `dist/ build/ out/ .next/ .astro/ .vercel/ .netlify/ .wrangler/ .turbo/ .cache/`, `*.tsbuildinfo`, `.eslintcache`
     - testovi: `coverage/ playwright-report/ test-results/ blob-report/`
     - okruženje: `.env`, `.env.*`, `!.env.example`
     - logovi: `*.log`
     - OS i editor: `.DS_Store Thumbs.db desktop.ini .idea/`, `.vscode/*` uz `!.vscode/extensions.json`
     - Claude: `.claude/settings.local.json`
     - sirove fotografije: `Assets/**/originals/`
2. **Identitet je spreman.** Git je postavljen na Matej Medved s GitHub noreply e-mailom, a `gh` je prijavljen kao `matejmedo0`, s pravima `repo` i `workflow`.
3. **Commitovi:** nekoliko logičnih commitova po Conventional Commits, svaki s retkom Co-Authored-By. Primjeri:
   - `chore: initialize repository`
   - `docs: add project documentation and phase plans`
   - `docs(content): add service copy source of truth`
   - `chore(github): add PR and issue templates`
4. **Kreiranje:** `gh repo create codraft-website --private --source . --remote origin --push`, s opisom.
5. **Postavke repozitorija:**
   - merge commit i squash uključeni, rebase isključen
   - grane se automatski brišu nakon mergea
   - wiki isključen, jer je dokumentacija u repozitoriju
   - Dependabot upozorenja i sigurnosna ažuriranja uključeni
6. **Zaštita grane `main`** (obavezan PR, bez force pusha i brisanja):
   - Postavljam je ako vaš GitHub plan to dopušta za privatne repozitorije (Pro ili Team).
   - Ako ne dopušta, pravilo je zapisano u `CONTRIBUTING.md` i poštuje se kroz workflow.
7. **Od faze 1 nadalje:**
   - Svaka faza dobiva svoju granu (npr. `phase/1-architecture`).
   - Na kraju faze otvaram PR s izvještajem faze, a merge ide na vašu riječ.
   - CI (lint, typecheck, test, build) i Dependabot za npm dolaze u fazi 1, kad postoji kod.

**Iznimka za fazu 0:** commit i push idu na kraju faze, prije izvještaja, jer repozitorij nastaje upravo u ovoj fazi.

### 7.5 Izvještaj na hrvatskom i stop

---

## 8. Smjer za faze 1–8

Navodim samo ono što je novo ili preciznije u odnosu na pravila. Sve ide u `docs/phases/`.

### Faza 1 — Arhitektura

- **Prvo istraživanje.** Agent `architect` nema pristup webu, pa aktualne cijene i uvjete prikupljam ja, s datumom i izvorom, i unosim ih u brief.
- **Preliminarno provjereno 18. 10. 2026.:**
  - **Hetzner Cloud** (Njemačka i Finska): CX23 košta 5,49 € mjesečno, a CAX11 5,99 €. Cijene su bez PDV-a i bez IPv4 adrese i vrijede za nove narudžbe od 15. 6. 2026. S PDV-om to je oko 7 € mjesečno. Izvor: docs.hetzner.com.
  - **Vercel Hobby** dopušta samo nekomercijalnu upotrebu, a „Advertising the sale of a product or service“ računa se kao komercijalna. Za Codraft bi to značilo plaćeni plan Pro.
- **Još treba provjeriti:**
  - Cloudflare: uvjete komercijalne upotrebe na besplatnom planu
  - Netlify: sustav kredita
  - API za transakcijski e-mail: besplatni plan, EU regija
  - sandučiće za @codraft.hr
  - analitiku: Umami ili Plausible CE na vlastitom serveru, ili Cloudflare Web Analytics
  - Cal.com: besplatan je za jednog korisnika; provjeriti HR prijevod i EU hosting
  - nadzor dostupnosti i backup
- **Hetzner blokira odlazne portove 25 i 465.** E-mail zato šaljemo preko API-ja, ne vlastitog mail servera, što je ionako bolje za dostavu.
- **Brief sadrži:**
  - **Sitemap.**
  - **i18n:**
    - jedna mapa ruta iz koje nastaju navigacija, prebacivač jezika, hreflang (x-default vodi na EN), `sitemap.xml` i canonical
    - bez preusmjeravanja prema jeziku preglednika ili IP adresi
    - lokalizirana stranica 404
  - **Integracije:**
    - analiza u 2 koraka
    - kontakt forma s poljima za CAD
    - e-mail timu i potvrda klijentu
    - booking koji se učitava tek na klik
    - privola za kolačiće, analitika tek nakon nje
    - chatbot endpoint (faza 4)
  - **Ograničenja:**
    - trošak oko 0 €, hosting u EU
    - forme po mjeri
    - stack kompatibilan s Reactom, jer su instalirani skillovi za React
    - fontovi na vlastitom serveru
    - CSP
    - LCP < 2,5 s, INP < 200 ms, CLS < 0,1
    - preview URL za fazu 6
- **Primjeri opcija za usporedbu:**
  - static-first build s React otocima na Hetzner VPS-u
  - isti build na Cloudflareu
  - Next.js server na Hetzneru

  Za svaku: trošak s PDV-om, održavanje i lakoća prelaska na drugi hosting. **Birate vi.**
- **Profesionalna struktura koda:**
  - `architect` predlaže strukturu mapa za odabrani stack, prema načelima iz 7.1.
  - Nakon scaffolda strukturu zapisujem u `docs/architecture.md` i u ADR.
  - Odluke o stacku i hostingu dobivaju ADR 0007 i dalje.
- **CI na GitHub Actions:**
  - Na svakom PR-u: install, lint, typecheck, test, build.
  - Dependabot za npm i GitHub Actions.
  - Playwright i Lighthouse u CI-u dolaze u fazama 5 i 6.

### Faza 2 — Dizajn i animacija

**Rječnik pokreta.** Svaki pokret je radnja iz CAD-a:

| Radnja | Gdje |
|---|---|
| **Odabir (grips)** | 4 plava kvadratića iz ikone C pojave se na kutovima kartica, gumba i polja, na hover i fokus (140 ms). Vidljivi obrub fokusa uvijek ostaje. |
| **Crtanje linije** | Wordmark u heroju (jednom), razdjelnici sekcija, napredak forme za analizu (koraci su čvorovi). |
| **Kotiranje** | Kote samo uz stvarne brojke: rok u tjednima, težina stranice, rok odgovora. |
| **Slojevi** | Preglednik slojeva na CAD stranici: mreža → obrisi → šrafure → kote → zaglavlje. |
| **Snap i pečat** | Kratki „klik“ na gumbima. Potvrda forme izgleda kao otisnuto zaglavlje („Zaprimljeno · datum“). |
| **Prijelaz stranica** | View Transitions, 150–200 ms; zaglavlje miruje. |

**Načela:**
- Svaki pokret vodi pažnju, pokazuje stanje ili čuva kontinuitet. Ako ne radi ništa od toga, izbacujemo ga.
- Bez preuzimanja scrolla, bez smooth-scroll biblioteka i bez parallaxa.
- H1 je vidljiv odmah, jer o njemu ovisi LCP.
- Animiramo samo transform i opacity.
- Uz `prefers-reduced-motion` ostaje samo kratki fade ili ništa.
- Na ekranu se u jednom trenutku miče jedna stvar.

**Tri smjera.** Sva tri koriste iste tokene i pravi HR tekst:
- **A „Nacrt“:** papir, mreža, kote; podnožje oblikovano kao zaglavlje nacrta, s pravnim podacima.
- **B „Noćni nacrt“:** navy kao glavna boja.
- **C „Studio“:** topli editorial stil, vođen fotografijama.

Moja preporuka je A, uz toplinu fotografija iz C. **Birate vi.**

**Kako pregledavamo smjerove:** kao **žive prototipove u kodu**.
- To su lokalne noindex rute s pravim tekstom, fontovima i animacijom.
- Snimke radimo u Playwrightu na 375, 768 i 1440 px.
- Animaciju ne možete ocijeniti iz statičnog mockupa, a hrvatski tekst je duži od engleskog.
- Figma je opcija ako je želite, npr. za biblioteku odabranog smjera za društvene mreže i prezentacije.

**Dodatne komponente:**
- grip fokus
- kota
- podnožje u obliku zaglavlja
- prebacivač jezika
- wordmark komponenta (currentColor, plavi dio razdvojen u 3 putanje za animaciju)

### Faza 3 — Stranice

- **Redoslijed za svaku stranicu:**
  1. nacrt teksta za praznine (HR i EN)
  2. vaše odobrenje
  3. izrada
  4. `/check`
  5. snimke na tri širine

  Stranica AI asistenti radi se u fazi 4.
- **JSON-LD:**
  - ProfessionalService s `areaServed` Hrvatska; adresa samo ako je javna
  - Service ×8 na stranici Usluge i ×2 na CAD stranici
  - BreadcrumbList
- **Česta pitanja** pišemo za ljude i za AI tražilice. Google od 2023. prikazuje FAQ rich results samo za službene i zdravstvene stranice.

### Faza 4 — Integracije

- **Forma za analizu:**
  - Polja: ime, e-mail, tvrtka (neobavezno), web stranica uz opciju „nemam stranicu“, interes, poruka, honeypot.
  - **Upit se trajno sprema prije slanja e-maila.**
  - Zatim slijedi odabir termina, s već upisanim imenom i e-mailom. Ako klijent odustane od termina, upit ostaje sačuvan.
- **Datoteke:** na početku se ne učitavaju kroz formu. CAD datoteke stižu e-mailom ili linkom. To još trebate potvrditi.
- **Kolačići:**
  - „Prihvati sve“ i „Odbij sve“ jednako istaknuti, uz „Postavke“.
  - Privola se povlači iz podnožja.
  - Analitika i booking učitavaju se tek nakon privole ili klika (ZEK, čl. 43).
- **Chatbot:**
  - Prije bilo kakvog koda učitavam skill `claude-api`.
  - Odgovara samo iz odobrenog sadržaja, ne obećava cijene i vodi prema analizi.
  - **Od prve poruke jasno kaže da je AI** (EU AI Act, čl. 50, primjenjuje se od 2. 8. 2026.).
  - Ograničenja po IP adresi i po danu; mjesečni limit potrošnje određujete vi.
  - Logovi su minimalni.
  - Pružatelj AI usluge naveden je u politici privatnosti.

### Faze 5–7 — dodatno

- **Testovi:**
  - hreflang vrijedi u oba smjera
  - prebacivač jezika vodi na istu stranicu
  - reduced motion
  - grips rade s tipkovnicom
  - nema mrežnih poziva prije privole
  - dugi hrvatski natpisi stanu na 375 px
  - Đ i đ ispravno se prikazuju
  - upit ostaje sačuvan kad e-mail API padne
- **Audit:**
  - Impresum odgovara ZTD-u (čl. 21) i ZET-u (čl. 6)
  - obrađivači u politici privatnosti odgovaraju stvarnim mrežnim pozivima
  - pretraga riječi „projektiranje“ i „projektant“ ne nalazi ništa
  - EN tekst na stranici odgovara odobrenom `content.md`
- **Objava:**
  - Search Console i Bing Webmaster
  - SPF, DKIM i DMARC
  - nadzor dostupnosti i backup
  - isti podaci o tvrtki (naziv, adresa, telefon) svugdje
  - Profil tvrtke na Googleu, ako ispunjavate uvjete: fizička lokacija ili dolazak klijentu

### Faza 8 — sadržaj nakon objave

- **Studije slučaja** iz partnerskih projekata. „Radovi“ ulaze u navigaciju kad postoje.
- **HR blog**, 1–2 objave mjesečno. Moguće teme:
  - koliko košta web stranica
  - Profil tvrtke na Googleu
  - kolačići i hrvatski zakon
  - zakon o pristupačnosti i webshopovi
  - AI Act i chatbotovi
  - kako pripremiti skice za CAD
- **Zasebna stranica za uslugu** kad Search Console pokaže da je ljudi traže.
- **Svaka tri mjeseca:** osvježavanje brojki i pravnih tekstova, zatim `/audit`.

---

## 9. Rizici

| Rizik | Kako ga ublažavamo |
|---|---|
| Ime „Codraft“ već koristi AI alat (codraft.dev) | provjera žiga, odmah registrirati codraft.hr, dosljedni `sameAs` u strukturiranim podacima |
| Nepoznat pravni oblik i registracija; to blokira Impresum, besplatnu .hr domenu i Profil tvrtke na Googleu | pitanje u izvještaju faze 0 |
| CAD tekst zvuči kao projektiranje | pravila u `CLAUDE.md`, provjera s komorom ili pravnikom |
| Odobravanje HR teksta postane usko grlo | odobravanje stranicu po stranicu; faza 2 radi s postojećim tekstom |
| Trošak ili zloupotreba chatbota | limiti, samo odobreni sadržaj |
| Održavanje VPS-a | automatske nadogradnje, snapshotovi, nadzor; ili Cloudflare |
| Animacija naruši brzinu ili pristupačnost | budžeti, reduced motion, H1 vidljiv odmah |
| Moji pravni nacrti nisu pravni savjet | pregled pravnika prije objave |
| Novi chat izgubi kontekst | `docs/` kao trajna memorija, pravilo dokumentiranja u workflowu, test nove sesije u verifikaciji |

## 10. Otvorena pitanja

Ova pitanja idu u izvještaj faze 0 i ne blokiraju njezino izvršenje.

**Prije faze 1:**
1. Koji je pravni oblik i registrirani naziv? Je li tvrtka već registrirana i sadrži li naziv riječ „Codraft“?
2. U kojem ste gradu, primate li klijente uživo i je li adresa javna?
3. Odobravate li strukturu iz točke 1?
4. Koju terminologiju birate iz točke 3? Pišemo li engleski britanskim ili američkim pravopisom?
5. Koje prijedloge iz točke 4 prihvaćate?
6. Hoće li i ostali članovi tima raditi s Claudeom? Ako da, agente i skillove treba prebaciti u projekt.
7. Želite li GitHub organizaciju za tim? Napravite je na GitHubu i premjestit ću repozitorij; stare adrese se same preusmjeravaju.

**Kasnije:**
- **faza 2:** animacija loga, C2PA metapodaci
- **faza 3:** tim i fotografije, opseg analize, cijene, vlasništvo i NDA, CAD podaci i uzorci, kontakt podaci
- **faza 4:** limit potrošnje chatbota, alat za booking, bez učitavanja datoteka
- **faza 7:** kupnja domene, hosting e-maila, pregled pravnika

---

## Verifikacija (izlazne provjere faze 0)

- **Git lokalno:**
  - `git rev-parse --is-inside-work-tree` vraća `true`.
  - `git check-ignore -v .env .env.local node_modules/x dist/x .claude/settings.local.json` označava sve kao ignorirano.
  - `git check-ignore .env.example Assets/codraft-brand/README.md .claude/rules/codraft-workflow.md` završava kodom 1.
  - `git ls-files --eol` pokazuje LF za tekstualne datoteke.
- **`content.md`:**
  - EN blokovi odgovaraju poslanom tekstu znak po znak. Provjerava to skripta u scratchpadu, uz kopiju originala.
  - Broj EN blokova jednak je broju HR blokova.
  - Svi HR blokovi imaju status `draft`, a svi prijedlozi „na čekanju“.
  - Svaka sekcija ima status, a svaka praznina vlasnika.
- **Pokrivenost dokumentacije:**
  - Svaki redak karte pokrivenosti (7.2) vodi na postojeću datoteku sa stvarnim sadržajem.
  - Sve relativne poveznice u `docs/`, `README.md`, `CLAUDE.md` i `PROGRESS.md` vode na postojeće datoteke. Provjerava to skripta.
  - Snimka plana u `docs/plans/` odgovara ovom planu.
- **Test nove sesije:**
  - Agent Explore bez ikakvog konteksta iz ovog razgovora čita samo repozitorij, redom: `CLAUDE.md` → `PROGRESS.md` → `docs/`.
  - Odgovara na pitanja:
    - koja je trenutna faza i sljedeći korak
    - kakav je sitemap, s URL-ovima
    - koje su odluke donesene
    - što trebamo od vas
    - kakav je plan faze 1
    - kakav je koncept animacije
    - koja su pravna pravila za tekst
  - Njegove odgovore uspoređujem s ovim planom i popunjavam sve rupe.
- **Zastarjeli tekst je uklonjen:** `grep -niE "work in progress|provisional|still finishing" CLAUDE.md` i `grep -niE "nisu finalni|privremeni" PROGRESS.md` ne nalaze ništa.
- **Nema koda:** ne postoje `package.json`, lockfile, `node_modules`, konfiguracija frameworka ni `.claude/settings.json`.
- **GitHub:**
  - `gh repo view matejmedo0/codraft-website --json visibility,defaultBranchRef,url` vraća PRIVATE i `main`.
  - `git status` je čist, a `origin/main` je jednak lokalnom `main`.
  - Postavke repozitorija provjeravam preko `gh api`: načini mergea, brisanje grana, Dependabot, zaštita grane ako je dostupna.
- **Na kraju:** izvještaj na hrvatskom, zatim stop do vaše riječi.
