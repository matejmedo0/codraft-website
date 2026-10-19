# Plan scaffolda — faza 1, korak 4 (Codraft)

## Kontekst

- **Odluke:** stack, hosting i servisi odlučeni su 19. 10. 2026. (ADR 0008–0013).
  - Stack je Astro 7 sa statičnim stranicama, React otocima i malim Node API-jem (ADR 0008).
  - Hosting je OVHcloud VPS-1 (ADR 0009).
- **Cilj koraka:** profesionalni kostur projekta s alatima, testovima, hookovima i CI-jem. Kostur je, kao i ovaj plan, na grani `phase/1-architecture`.
- **Kraj faze 1:** build prolazi, dev server radi, prazna stranica prikazuje se na 375, 768 i 1440 px bez grešaka u konzoli, a CI je zelen.
- **Ne radi se:** nema dizajna, sadržaja, formi ni deploya. Ništa se ne naručuje i ne otvara se nijedan račun.
- **Provjera paketa i postavki:** na npm registryju i u službenoj dokumentaciji, 19. 10. 2026.

## 0. Preduvjet (treba vaše odobrenje)

**Nadogradnja Node.js na ovom računalu s 24.11.0 na 24.22.0 (LTS).**
- Zašto: `eslint-plugin-astro` traži Node ≥ 24.16.
- Kako: ja pokrenem `winget install --id OpenJS.NodeJS.LTS -e`, a vi potvrdite UAC prozor. Ili vi instalirate MSI s nodejs.org.
- To je promjena sustava izvan repozitorija, zato pitam.

## 1. Projekt i paketi

**Postavljanje**
- Projekt pišem ručno u korijenu repozitorija. `npm create astro` očekuje prazan direktorij, a u korijenu su već `docs/`, `Assets/` i `.github/`.
- `package.json`: `private`, `type: module`, `engines.node: "^24.16.0 || >=26.3.0"`; `.nvmrc` = `24`.
- npm 11 s `package-lock.json`.

**Paketi.** Točne verzije, sve unutar ADR 0008:

| Vrsta | Paketi |
|---|---|
| dependencies | `astro@7.4.0`<br>`@astrojs/node@11.1.8`<br>`@astrojs/react@7.1.0`<br>`react@19.3.1`, `react-dom@19.3.1` |
| devDependencies | `typescript@6.0.3` (fiksiran)<br>`@astrojs/check@0.9.10`<br>`@types/react`, `@types/react-dom`, `@types/node@24`<br>`eslint@10.13.0`, `@eslint/js`, `typescript-eslint@8.71.2`<br>`eslint-plugin-astro@3.2.1`, `eslint-plugin-react-hooks@7.1.1`, `globals`<br>`eslint-plugin-jsx-a11y-x@0.2.0`<br>`prettier@3.9.10`, `prettier-plugin-astro@1.1.1`<br>`vitest@5.0.5`<br>`@playwright/test@1.64.1`, `@axe-core/playwright@4.14.0` |

- **Zašto `eslint-plugin-jsx-a11y-x`:** originalni `eslint-plugin-jsx-a11y` još ne podržava ESLint 10. Fork koristi i službeni `eslint-plugin-astro`.
- **Vitest:** ako Vitest 5 ne radi s Astrovim `getViteConfig`, vraćam se na 4.1.x i to bilježim u dnevnik.
- **Kasnije, kad zatrebaju:**
  - `motion` (faza 2)
  - Testing Library i jsdom (prvi React otok)
  - `@anthropic-ai/sdk` (faza 4)
- **Zod** dolazi s Astrom (`astro/zod`).

## 2. Struktura (samo ono što faza 1 koristi; prazne mape ne stvaram)

```
src/pages/[...slug].astro      stranice iz route mape; u fazi 1 samo početna (/ i /en)
src/pages/404.astro, src/pages/en/404.astro
src/pages/api/health.ts        on-demand ruta: provjera Node adaptera, kasnije za nadzor
src/layouts/BaseLayout.astro   <html lang>, charset, viewport, title, canonical i hreflang iz route mape
src/views/HomeView.astro       prazna početna: samo H1 „Codraft“, bez dizajna
src/features/i18n/route-map.ts sve stranice za objavu sa slugovima (privremenima, iz information-architecture.md)
src/features/i18n/urls.ts      URL za stranicu i jezik, drugi jezik, hreflang (x-default → EN)
src/locales/{hr,en}.json       UI tekstovi (nekoliko ključeva)
src/config/site.ts             https://codraft.hr (preporučena domena), jezici
src/styles/global.css          minimalno; tokeni u fazi 2
scripts/check-js-budget.mjs    budžet JS-a po stranici nad dist/ (15 / 100 / 120 KB gzip)
scripts/check-guardrails.mjs   regex zabranjenih izraza iz compliance.md nad src/ (ne nad docs/)
tests/e2e/smoke.spec.ts        Playwright smoke test
.claude/hooks/*.mjs            hookovi u Node.js-u (rade jednako u PowerShellu i Git Bashu)
.github/workflows/ci.yml, .github/dependabot.yml
astro.config.ts, tsconfig.json, eslint.config.js, prettier.config.mjs, .prettierignore,
vitest.config.ts, playwright.config.ts, .nvmrc, .env.example
```

- **View registry:** do faze 3 je `Partial`, jer pogled ima samo početna. Ostale stranice postoje samo u route mapi i ne generiraju se.
- **Favicon i brand kopije** dolaze u fazi 2, kako faza 2 predviđa.

## 3. Ključne postavke

**Astro (`astro.config.ts`)**
- `output: 'static'` + `@astrojs/node` (`mode: 'standalone'`, `bodySizeLimit` 32 KB).
- i18n: `hr` zadani bez prefiksa, `en` pod `/en`.
- `trailingSlash: 'never'` i `build.format: 'directory'`.
  - Daje `/usluge` i `/en/services` bez kose crte na kraju.
  - Format `'file'` bi na Node serveru slomio `/en`.
  - Canonicale gradim iz route mape.
- `security.csp` uključen: hashevi i osnovne direktive (`default-src 'self'`, `img-src 'self' data:`, `font-src 'self'`, `connect-src 'self'`).
- Varijable okruženja: `astro:env` shema. Faza 1 nema varijabli, pa `.env.example` sadrži samo opis.

**TypeScript (`tsconfig.json`)**
- `extends: astro/tsconfigs/strictest`, JSX za React, `types: ["node"]` (TS 6 to više ne dodaje sam).

**ESLint (flat config)**
- Pravila: `@eslint/js`, typescript-eslint (type-checked), Astro, a11y za `.tsx` i `.astro`, React hooks.
- `no-console` (osim u `scripts/`).
- Granice slojeva prema `docs/architecture.md`:
  - `components/ui` ne uvozi `features/`
  - klijentski kod ne uvozi `**/server/**`

**Prettier**
- Zadano + `prettier-plugin-astro`.
- `.prettierignore`: `docs/`, `Assets/`, `*.md` u korijenu. Tako formatiranje ne dira dokumentaciju ni snapshot planova.

**Vitest**
- `getViteConfig` iz `astro/config`, okruženje `node`, testovi uz kod (`*.test.ts`).

**Playwright**
- Testira produkcijski build (CSP radi samo tamo).
- Server: `node ./dist/server/entry.mjs` na 127.0.0.1:4321, spreman kad odgovori `/api/health`.
- Projekti za širine 375, 768 i 1440 px.

## 4. Testovi

**Unit testovi (Vitest)**
- **Route map:**
  - svaki slug je mali ASCII s crticama
  - slugovi su jedinstveni po jeziku
  - svaka stranica ima HR i EN
  - hreflang parovi su recipročni
  - `x-default` vodi na EN
- **Regex zabranjenih izraza.** Mora biti Unicode, jer `\w` u JavaScriptu ne hvata „ć“. Testovi provjeravaju primjere iz `compliance.md`:
  - hvata: *projektiranje*, *projektnu dokumentaciju*, *snimka postojećeg stanja*, *designer of record*
  - propušta: *projekt*

**E2E smoke test (Playwright)**
- `/` i `/en`:
  - odgovor 200
  - ispravan `lang`
  - H1
  - canonical i hreflang
  - meta CSP prisutan
  - nema grešaka u konzoli
  - axe bez ozbiljnih nalaza, na sve tri širine
- `/en/x` vraća 404, a `/en/404` prikazuje engleski tekst.
- Poznato ograničenje: Node adapter za nepoznate `/en/*` putanje vraća hrvatsku 404. U produkciji to rješava Caddy u fazi 7. Zapisujem u dnevnik.
- `/api/health` vraća `{ status: "ok" }`.

## 5. Skripte (`package.json`)

| Skripta | Što radi |
|---|---|
| `dev`, `build`, `preview` | Astro |
| `typecheck` | `astro check` (Astro build ne provjerava tipove) |
| `lint` | ESLint |
| `format`, `format:check` | Prettier |
| `test` | Vitest |
| `test:e2e` | Playwright |
| `check:budget`, `check:guardrails` | budžet JS-a i zabranjeni izrazi |
| `verify` | sve osim E2E, redom |

## 6. Hookovi i dozvole (`.claude/settings.json`, skill `update-config`)

**PreToolUse (`Write|Edit`): `guard-env.mjs`**
- Blokira `.env` i `.env.*` osim `.env.example` (izlazni kod 2 s porukom).

**PostToolUse (`Write|Edit`): `format-lint.mjs`**
- Za datoteke koda pokreće Prettier, pa ESLint.
- Nalaze javlja kao kontekst i ne blokira.
- Alate poziva izravno preko Nodea, jer `.cmd` omotači na Windowsu ne rade bez ljuske.

**Allowlist**
- Gornje `npm run` skripte, `npm ci`, `npm install`, `npx astro`, `npx playwright`.
- Git: `status`, `diff`, `log`, `add`, `commit`, `switch`, `branch`, `fetch`, `push origin …`.
- `gh pr …`, `gh run …`.
- Isto za Bash i za PowerShell, jer je PowerShell ovdje glavna ljuska.

**Push**
- Push na druge remoteove i dalje traži potvrdu.

## 7. CI i Dependabot

**`ci.yml`**
- Pokreće se na svaki PR i na push u `main`.
- Posao `verify` na Node 24: `npm ci` → lint → format:check → typecheck → test → build → check:budget → check:guardrails.
- Posao `e2e` na Node 24: build, Chromium (`playwright install --with-deps --only-shell chromium`), smoke test; izvještaj se učitava samo kod pada.
- Posao na Node 26 (LTS od 28. 10.): samo `verify`, bez E2E.

**Sigurnost i cijena**
- Akcije su prikvačene na puni SHA, uz komentar verzije:
  - checkout v7.0.1
  - setup-node v7.1.0
  - upload-artifact v7.0.2
- SHA-ove ponovno provjeravam preko `gh api` prije commita.
- `permissions: contents: read`, `persist-credentials: false`.
- Zastarjela pokretanja se otkazuju, a npm cache je uključen.
- Procjena: oko 8 minuta po pokretanju, unutar 2.000 besplatnih minuta mjesečno.

**`dependabot.yml`**
- npm i GitHub Actions, tjedno ponedjeljkom.
- Minor i patch nadogradnje su grupirane.
- `typescript` ≥ 6.1 se ignorira (ADR 0008), kao i major nadogradnje `@types/node`.

**Prijedlog za kasnije (administracija repozitorija, zato samo prijedlog):** CI kao obavezna provjera u pravilu „Protect main“.

## 8. Dokumentacija

- **`/init` (skill `init`):** `CLAUDE.md` dobiva stack, naredbe i strukturu, a ostaje kratak i zadržava postojeća pravila.
- **`docs/architecture.md`:** stvarna struktura i poveznice na ADR 0008–0013.
- **`README.md`:** pokretanje projekta.
- **`CONTRIBUTING.md`:** „definition of done“ s konkretnim naredbama.
- **Snapshot plana:** odobreni plan spremam doslovno u `docs/plans/2026-10-19-scaffold-plan.md`.
- **Dnevnik i status:** dnevnik faze, `PROGRESS.md` i `docs/phases/README.md`.

## 9. Commitovi

Conventional Commits, poruke iz datoteke (`git commit -F`), push na `origin`:
1. `build: scaffold Astro project with React and the Node adapter`
2. `feat(i18n): add the route map and empty localised home and 404 pages`
3. `chore: add ESLint, Prettier and the budget and guardrail checks`
4. `test: add Vitest unit tests and the Playwright smoke test`
5. `chore(claude): add hooks and permissions`
6. `ci: add the CI workflow and Dependabot`
7. `docs: update CLAUDE.md, architecture, README and contributing for the stack`

## Provjera (izlazni kriteriji faze 1)

1. Lokalno `npm run verify`, `npm run build` i `npm run test:e2e` prolaze, a `npm run dev` radi.
2. Playwright MCP: `/`, `/en` i 404 na 375, 768 i 1440 px, bez grešaka u konzoli. Snimke idu u izvještaj.
3. Hookovi:
   - pokušaj pisanja u `.env` je blokiran
   - izmjena `.ts` datoteke pokreće Prettier i ESLint
4. PR faze 1 prema `main`: CI zelen, opis je izvještaj faze. Merge tek na vašu riječ.

## Kako nastavljamo (vaša uputa, 19. 10. 2026.)

Plan je odobren, ali se ne izvršava u ovoj sesiji, jer joj je kontekst pun. U ovoj sesiji samo:
1. **Snapshot plana:** spremam ga doslovno u `docs/plans/2026-10-19-scaffold-plan.md`.
2. **Provjerene činjenice o alatima,** s izvorima i ocjenom pouzdanosti, idu u `docs/research/2026-10-19-scaffold-toolchain.md`:
   - verzije i kompatibilnost paketa
   - postavke Astra
   - sintaksa hookova i dozvola
   - SHA-ovi akcija
   - Dependabot
   - rizici
3. **Status:** ažuriram dnevnik faze, `PROGRESS.md` i `docs/README.md`, pa radim commit i push.
4. **Prompt za novu sesiju:** dajem vam ga, a ona izvršava ovaj plan od točke 0.

## Usput bilježim (iz ADR-ova)

- Radi li `node:sqlite` na Node 24 i 26 (koristi se u fazi 4).
- Radi li Astro 7.4 na Node 26.
- Kako izgleda CSP u buildu.
- Kako nazvati rute prototipova za fazu 2, jer Astro ignorira prefiks `_`.
