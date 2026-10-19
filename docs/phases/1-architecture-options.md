# Phase 1: architecture options (2026-10-19)

> **Status: decided on 2026-10-19.** The client chose Option 1 with the recommended services: [ADR 0008](../decisions/0008-stack-astro-with-react-islands.md) stack, [ADR 0009](../decisions/0009-hosting-ovhcloud-vps-eu.md) hosting, [ADR 0010](../decisions/0010-transactional-email-scaleway.md) email, [ADR 0011](../decisions/0011-analytics-goatcounter-after-consent.md) analytics, [ADR 0012](../decisions/0012-booking-easy-appointments.md) booking, [ADR 0013](../decisions/0013-mailboxes-zoho-mail-lite.md) mailboxes.
> - The `architect` agent wrote these options in the `/architecture` step, from [research/2026-10-19-hosting.md](../research/2026-10-19-hosting.md) and the inputs in [1-architecture.md](1-architecture.md).
> - The main session reviewed them; see [Review notes](#review-notes-main-session).
> - Nothing is ordered, bought or set up yet.
>
> Prices exclude VAT unless stated. Croatian VAT is 25 %; $1 ≈ €0.89. "Verify" marks what the research note does not confirm.

## Bottom line

- **Options 1 and 2 are the same codebase:** Astro 7.4, static-first, with React 19 islands and four small API endpoints. Only the host differs; moving between them later takes 1–2 days.
- **Option 3 is shown for comparison and not recommended.**
  - Next.js ships about 174 KB gzip of framework JS on every page, against 0 KB for Astro.
  - A strict CSP in Next.js needs nonces, which makes every page render on each request.
- **Recommendation: Option 1, Astro + Node on an OVHcloud VPS-1.**
  - €4.49/month, or €5.61 incl. VAT, with IPv4 and a daily backup included.
  - Everything runs in the EU.
  - It is the only option that can host a booking tool with a Croatian interface and EU data.
- **Option 2 is the better pick** if €0 and no server upkeep matter more to the client than EU hosting.

## At a glance

| | 1. Astro + Node, EU VPS | 2. Astro, Cloudflare Workers Free | 3. Next.js, EU VPS |
|---|---|---|---|
| Hosting per month incl. VAT and IPv4 | €5.61 | €0 | €5.61 |
| Data location | EU (OVHcloud) | US provider; leads in D1 pinned to the EU | EU |
| Booking with Croatian UI and EU data | Possible (Easy!Appointments) | No (NeetoCal is Croatian but US-hosted) | Possible |
| JS on content pages | 0–15 KB | 0–15 KB | ≈ 174 KB or more |
| Strict CSP | Hashes; pages stay static | Hashes; pages stay static | Nonces; every page dynamic |
| Previews | One private slot (basic auth); needs the domain | A URL per PR; public unless protected | As Option 1 |
| Server upkeep | ≈ 2–3 h/month | ≈ 0.5–1 h/month | ≈ 3–4 h/month |
| Platform limits | 2 vCores, 4 GB | 100k Worker requests/day, 10 ms CPU | 2 vCores, 4 GB |
| Moving elsewhere | Hours (to a VPS); 1–2 days (to Cloudflare) | 1–2 days | Hours (to a VPS) |

## Shared by Options 1 and 2

### Stack

- **Framework and libraries:**
  - astro 7.4.0 with static output; only `/api/*` sets `prerender = false`
  - @astrojs/react 7.1.0, react and react-dom 19.3.1
  - motion 14.3.0 (`m` + `LazyMotion`), inside islands only
  - Zod 4 as a single copy, imported via `astro/zod`
- **TypeScript 6.0.3, pinned.** `@astrojs/check` and typescript-eslint 8.71.2 need a version below 6.1, so Dependabot ignores 6.1 and 7.
- **Tooling:** ESLint 10.13, Prettier 3.9.10, Vitest 5.0.5 with Testing Library, Playwright 1.64.1 with axe.
- **Node:** 24 LTS now, then 26 LTS from 2026-10-28 (EOL 2029-04-30). CI tests both until the switch.
- **Package manager: npm 11,** which ships with both Node versions. Dependabot supports npm up to 11 and pnpm only up to 10.
- **CSS:** plain CSS with tokens as custom properties and Astro scoped styles. Tailwind 4.3 only if the team prefers it.

### i18n

- **Config:** Astro i18n with `defaultLocale: 'hr'` and `prefixDefaultLocale: false`.
- **One route map.** Astro can't translate slugs, so `features/i18n/route-map.ts` (page id → `{ hr, en }`) is the only place slugs live.
- **One catch-all page.** `pages/[...slug].astro` generates every localised path from the map in `getStaticPaths()` and renders it through a typed view registry, so a page id without a view is a type error.
- **What the map drives:** navigation, the language switcher, canonicals, reciprocal hreflang (`x-default` → EN) and a hand-written `sitemap.xml.ts` with language alternates.
- **404s:** `pages/404.astro` and `pages/en/404.astro` (localised 404s work since Astro 7.0.3).
- **Text:** UI strings in `locales/{hr,en}.json`; long copy in per-locale content collections keyed by the [content.md](../content.md) block IDs.
- **Islands** receive already-translated strings as props, so no i18n code ships to the browser.

### Forms (audit and contact)

1. **Endpoints.** A React island posts JSON to `/api/audit` or `/api/contact`.
   - Plain endpoints, not Astro Actions, so the handlers stay framework-neutral: a Web `Request` goes in and a `Response` comes out.
   - Storage, email sending, rate limiting and the clock are passed in through small interfaces.
2. **Checks on the server:**
   - body ≤ 32 KB (the Node adapter's default is 1 GB)
   - same-origin
   - Zod validation
   - honeypot
   - per-IP limits, keyed on a daily-salted hash of the IP and kept 48 h
3. **The lead is committed before any email is sent.** Each row tracks its email status (an outbox): emails go out after the commit, and a retry job resends failures. An email outage delays mail but never loses a lead.
4. **Confirmation email.** Short, no links, and it repeats nothing the visitor typed. A global daily cap protects the sending account from abuse.
5. **Step 2.** A button; only the click inserts the booking iframe, prefilled with `?name=&email=`. A fallback without JavaScript is optional and decided in phase 4.

### Consent

- A first-party script of about 3–4 KB, with no library.
- The choice is stored, with a version, in `localStorage`. "Prihvati sve" and "Odbij sve" have equal weight, plus "Postavke"; it can be reopened from the footer.
- The analytics beacon is injected only after a yes.
- **Only analytics needs consent.** Booking loads on an explicit click, and the chatbot runs only when someone uses it.

### Chatbot (phase 4)

- **Endpoint and model:** `/api/chat` streams its answer (SSE), with the API key kept on the server. Model: Claude Haiku 5.5.
- **Content and disclosure:** the system prompt holds approved copy only; the AI disclosure appears with the first message.
- **Per-message limits:** input ≤ 500 characters, at most 8 turns, `max_tokens` around 400.
- **Caps:**
  - per IP, e.g. 10 messages per 10 minutes and 40 per day
  - a global daily cap
  - an in-app monthly spend meter based on each response's `usage`
  - the Anthropic workspace spend limit, set just above the meter as a backstop
- **No transcripts are stored.**
- **Provider** sits behind an interface. The Anthropic API has no EU processing option; Vertex AI or Bedrock in the EU cost 10 % more. This is a phase 4 choice.

### CSP

- **Hash policy.** Astro's `security.csp` puts a SHA-256 hash policy for its own scripts, styles and island hydration in a `<meta>` tag on every prerendered page.
- **Other directives in the meta policy:** `default-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'`, and `frame-src` for the booking origin only.
- **Header-only directives come from the host** (see each option).
- **No `<ClientRouter />`,** because it is incompatible with the hash CSP. Page changes use CSS cross-document view transitions instead.
- **CSP is off in `astro dev`,** so CSP and end-to-end tests run against the production build.

## Option 1: Astro + Node on an EU VPS (recommended)

```
Visitor ─HTTPS─► OVHcloud VPS-1 (Ubuntu LTS, Germany or Italy)
                 Caddy 2.11: automatic HTTPS, precompressed br/gzip, headers
                 ├─ /*         static files (still served if Node stops)
                 ├─ /api/*     Node, @astrojs/node 11.1.8 standalone, systemd, 127.0.0.1
                 ├─ /count     GoatCounter (called only after consent)
                 ├─ preview.   basic_auth + noindex → preview build + preview Node (emails not delivered)
                 └─ termin.    Easy!Appointments (PHP 8.2 + MariaDB), if chosen
                 SQLite leads.db → nightly restic → off-site copy (Backblaze B2 EU)
```

**Hosting and services**
- **Server:** VPS-1 has 2 vCores, 4 GB RAM and 40 GB disk, with IPv4 and a daily backup kept 7 days included. Astro measured 74–258 MB of memory, so there is plenty of room. Fallbacks: Hetzner CX23 (only if an order goes through) or Netcup.
- **Email:** Scaleway Transactional Email through its HTTPS API.
- **Analytics:** GoatCounter self-hosted, after consent, plus Search Console and Bing Webmaster Tools.
- **Booking:** see the decisions below.
- **Monitoring:** UptimeRobot on the HR home page, `/en` and `/api/health`; Healthchecks.io heartbeats for the backup, retention and email-retry jobs.
- **DNS:** Hetzner DNS (free, EU) or Cloudflare DNS in DNS-only mode.

**Deploy**
- GitHub Actions builds the site and rsyncs it, with production dependencies, into a new release directory.
- A symlink switch activates the release; a systemd path unit then restarts Node. Rollback means switching the symlink back.
- The deploy key is limited to write-only `rrsync` in `authorized_keys`. GitHub Free private repositories have no environment secrets, so the key sits in repository secrets (added with the client's OK).
- Actions are pinned to commit SHAs.
- Production deploys only on a merge to `main`, which happens only on the client's word.

**Lead storage**
- **Database:** SQLite (WAL, `synchronous=FULL`, file mode 600) via Node's built-in `node:sqlite`, which needs no native build on Windows. `better-sqlite3` is the fallback.
- **Backups:**
  - OVH's daily image (same provider)
  - nightly `.backup` → restic (encrypted client-side) → off-site, keeping 14 daily and 3 weekly copies (about 35 days)
  - a Healthchecks ping on each run, and a restore drill every quarter
- **Second copy:** the team notification email holds every lead too.

**CSP and headers.** The Caddyfile lives in the repository and adds:
- `Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`
- HSTS: short at first, then one year
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, Permissions-Policy and COOP
- `default-src 'none'` on `/api/*` responses
- immutable caching for `/_astro/*`
- logs with masked IPs (`ip_mask`), kept 14 days

**Previews**
- `preview.codraft.hr`, behind basic auth and noindex. A labelled PR deploys there, built with the design lab included.
- Phase 2: private sharing needs the domain and the server already in phase 2. Otherwise the client reviews on localhost and screenshots.
- Phase 6: the audit tools can pass basic auth.

**Operations**
- **Setup:** about one day: a provisioning script; SSH with keys only and ports 22, 80 and 443 open; unattended-upgrades and systemd hardening; backups and monitors; a runbook in `docs/operations.md`.
- **Ongoing:** about 2–3 h/month for reboots after kernel updates, Node and Caddy updates, backup checks and Dependabot PRs.
- **Easy!Appointments, if chosen,** adds about 1–1.5 h/month: PHP, MariaDB, the app and its database dump.
- **Recovery:** about 2 h, by rebuilding from the script and restoring with restic.

**Portability.** Static HTML, one Node process and one SQLite file. To another VPS: 2–4 h. To Cloudflare: 1–2 days (swap the adapter, write D1 and Durable Object adapters).

**Risks and mitigations**

| Risk | Mitigation |
|---|---|
| A single server | Caddy keeps serving the static pages if Node stops; monitoring and a tested restore |
| Self-managed security | SSH keys only, few open ports, automatic security updates, an unprivileged service user; no Docker and no admin panel (Coolify and Dokploy rejected for their security advisory records) |
| A provider-wide incident | The off-site copy is with a different provider |
| OVH stock or price changes | The provisioning script makes a move cheap |
| Easy!Appointments is one more app to patch | Its admin area sits behind basic auth; NeetoCal is the fallback |
| Astro is now owned by Cloudflare | It stays MIT-licensed; the Node adapter shipped its major version on the same day as Astro 7.0 |

## Option 2: the same build on Cloudflare Workers Free

**Stack differences**
- **Adapter:** `@astrojs/cloudflare` 14.4.0 (Workers only; dev and build run on workerd).
- **What runs where:** static pages are free static assets and never invoke the Worker; only `/api/*` runs in the Worker.
- **Leads in D1, created with `--jurisdiction=eu`.** This can only be set when the database is created, and it is not confirmed on the free plan (verify). The fallback is a Durable Object pinned to the EU.
- **Rate limits and chat counters** in a Durable Object: KV allows only 1,000 writes a day, and the Rate Limiting binding is only eventually consistent.
- **Emails** go out through `waitUntil` after the D1 commit. Retries run from a Cron Trigger (verify that the free plan includes them).

**Services**
- **Email:** Scaleway Transactional Email. Cloudflare's own Email Sending needs Workers Paid and is still in beta.
- **Analytics:** hosted GoatCounter (EU servers, run by one person) or Plausible Cloud.
- **Booking:** NeetoCal.
- **Monitoring:** UptimeRobot and Healthchecks.io.
- **DNS:** must be Cloudflare (full setup).

**Lead storage**
- D1 Time Travel keeps 7 days on the free plan.
- Off-site copy: each night a GitHub Action runs `wrangler d1 export`, encrypts the result with `age` and uploads it to B2 EU. The data is unencrypted only briefly, on GitHub's runner.

**CSP and headers**
- The same Astro meta policy.
- `public/_headers` carries the header-only directives and the other security headers for static assets; Worker responses set their own headers in code; HSTS comes from the zone setting.
- Zone features that inject scripts must be off: the RUM beacon, email obfuscation and JS bot detections (verify which are on by default). They would break the hash CSP and the no-third-party rule.

**Previews**
- Workers Builds (3,000 build minutes a month) posts a URL on each PR. It needs the Cloudflare GitHub app on the private repository (ask first).
- Previews are public by default. Protecting them needs Cloudflare Access (a card reportedly required) or basic auth in the Worker with `run_worker_first` on preview builds (verify).
- No domain needed for phase 2.

**Operations.** About 3–4 h of setup, then about 0.5–1 h/month. Platform outages are out of our hands.

**Portability.** Cloudflare-specific bindings sit behind adapters. Moving to a VPS takes 1–2 days: export D1 into SQLite and move the DNS.

**Risks**
- Cloudflare is a US processor (DPA, SCCs, DPF); an appeal against the DPF (C-703/25 P) is pending.
- The free plan can be ended at Cloudflare's discretion.
- 10 ms of CPU per request: the chat stream and Zod should fit, but this must be measured. Workers Paid (€4.44, ≈ €5.55 incl. VAT) is the escape hatch and costs about as much as the VPS.
- 100k Worker requests a day: only API calls count, and the API should fail closed at the limit.
- No booking tool with a Croatian interface and EU data.
- Framework and host from one company.

## Option 3: Next.js 16.4 on the same VPS

- **Stack:**
  - next 16.4.2 (Turbopack) and react 19.3.1
  - next-intl 4.14.9 with `localePrefix: 'as-needed'` and localised `pathnames`; it needs `proxy.ts` at runtime, so static export is not possible
  - Route Handlers for the forms and the chat stream
  - `output: 'standalone'` behind Caddy; everything else as in Option 1
- **CSP:** nonces from `proxy.ts`, so every page renders on each request (no static optimisation, ISR or Partial Prerendering). The hash alternative breaks hydration (issue #95354). If Node stops, there is no static fallback.
- **Costs, previews, lead storage and portability:** as Option 1. Cloudflare is possible only through OpenNext, whose `proxy.ts` support is experimental.
- **Operations:** about 3–4 h/month. A demanding security record: React2Shell (CVSS 10) and two critical RCEs fixed on 2026-10-14.
- **Risks:** about 174 KB of JS on every page breaks the budget and puts INP at risk on low-end phones; Cache Components become the default in Next 17; the image optimiser adds attack surface.
- **Upside:** React everywhere, and an easy path to app features such as auth and dashboards, which this site does not need.

## Costs (EUR)

| Item per month (U = usage-based) | Opt 1 & 3 excl. | incl. 25 % | Opt 2 excl. | incl. 25 % |
|---|---|---|---|---|
| Server: OVHcloud VPS-1, no commitment | 4.49 | 5.61 | — | — |
| Hosting: Workers Free + D1 Free | — | — | 0.00 | 0.00 |
| IPv4 | included | included | n/a | n/a |
| Provider backups | included (7 days) | included | D1 Time Travel (7 days) | 0.00 |
| Off-site backup: Backblaze B2 EU (≤ 10 GB) | 0.00 | 0.00 | 0.00 | 0.00 |
| Email: Scaleway (U; 300 free, then €0.25 per 1,000; 600 emails ≈ €0.08) | 0.00–0.08 | 0.00–0.09 | 0.00–0.08 | 0.00–0.09 |
| Analytics: GoatCounter + Search Console + Bing | 0.00 | 0.00 | 0.00 | 0.00 |
| Booking: Easy!Appointments or NeetoCal Free | 0.00 | 0.00 | 0.00 | 0.00 |
| Monitoring: UptimeRobot + Healthchecks.io | 0.00 | 0.00 | 0.00 | 0.00 |
| Domain: free `.hr` / paid at €50.15 a year | 0.00 / 4.18 | 0.00 / 5.22 | 0.00 / 4.18 | 0.00 / 5.22 |
| **Monthly total without U items (free / paid `.hr`)** | **4.49 / 8.67** | **5.61 / 10.84** | **0.00 / 4.18** | **0.00 / 5.22** |
| **Yearly total without U items (free / paid `.hr`)** | **53.88 / 104.03** | **67.35 / 130.04** | **0.00 / 50.15** | **0.00 / 62.69** |
| Chatbot from phase 4 (U; ≈ 1,000 messages a month), per month / per year | 0.78 / 9.33 | 0.97 / 11.66 | 0.78 / 9.33 | 0.97 / 11.66 |

- **Chatbot estimate:** about 7,000 input and 350 output tokens per message on Haiku 5.5, so about $0.00088 a message. The worst case is the monthly cap the client sets. EU processing through Vertex AI or Bedrock adds 10 %.
- **Which column applies:** if Codraft is in the VAT system, the excl. column is the real cost; otherwise the incl. column is (open question A in `PROGRESS.md`).

| Variant or add-on | excl./month | incl./month | excl./year | incl./year |
|---|---|---|---|---|
| OVH VPS-1, 12 months paid upfront | 3.81 | 4.76 | 45.72 | 57.15 |
| Hetzner CX23 + IPv4 €0.50, only if an order goes through | 5.99 | 7.49 | 71.88 | 89.85 |
| … plus Hetzner backups (20 % of €5.49) | 7.09 | 8.86 | 85.06 | 106.32 |
| Netcup VPS Lite (6-month minimum) | 4.92 | 6.15 | 59.04 | 73.80 |
| Hetzner Storage Box BX11 instead of B2 (all-EU company) | 3.20 | 4.00 | 38.40 | 48.00 |
| Workers Paid (Option 2, if the limits bite) | 4.44 | 5.55 | 53.32 | 66.65 |
| Plausible Cloud instead of GoatCounter | 9.00 | 11.25 | 90.00 | 112.50 |
| NeetoCal Pro per user (removes the branding) | 4.44 | 5.55 | 53.32 | 66.65 |

IPv6-only is not viable: about 6 % of users in Croatia have IPv6, and GitHub has no IPv6 address. Hetzner therefore always needs the paid IPv4; OVH includes it.

**Mailboxes, per user (the same for every option)**

| Provider | excl./month | incl./month | excl./year | incl./year |
|---|---|---|---|---|
| Zoho Mail Free (≤ 5 users, web and mobile only; EU data centre confirmed only at sign-up) | 0.00 | 0.00 | 0.00 | 0.00 |
| **Zoho Mail Lite 5 GB** (IMAP, EU data centre, billed yearly) | 0.90 | 1.13 | 10.80 | 13.50 |
| Exchange Online Plan 1 (billed yearly; shared `info@` mailbox is free) | 3.50 | 4.38 | 42.00 | 52.50 |

## Budget ceiling: €10 a month (client, 2026-10-19)

After seeing the options, the client set a ceiling of €10 a month and asked whether it changes the recommendation. It doesn't. The €5.61 difference between Options 1 and 2 now fits the budget, so cost no longer separates them; Option 1's EU hosting and its Croatian booking with EU data decide it.

Assumptions: amounts include 25 % VAT (the stricter case), and the domain is a separate yearly cost, the same for every option.

| Item, per month incl. VAT | Option 1 (EUR) |
|---|---|
| OVHcloud VPS-1, no commitment (IPv4 and daily backup included) | 5.61 |
| Email, analytics, monitoring, off-site backup, booking | 0.00 (email above 300 a month costs cents) |
| Chatbot from phase 4 (≈ 1,000 messages a month, capped) | 0.97 |
| Zoho Mail Lite, per user | 1.13 |
| **Total with 2 / 3 mailbox users** | **8.83 / 9.96** |

- Paying OVH 12 months upfront after launch (€4.76 a month) lowers the total by €0.85.
- Exchange Online Plan 1 (€4.38 per user) fits only with one user, so Zoho Mail Lite is the mailbox recommendation under this ceiling.
- Not worth the headroom: a bigger server (VPS-1 has ample room), Plausible Cloud (€11.25 on its own), or Cloudflare Workers Paid for Option 2 (it doesn't add Croatian booking with EU data).
- Optional: a Hetzner Storage Box (€4.00) for backups held by an EU company only, at the cost of the mailbox headroom.

## Lead retention (proposal; the client decides)

**Proposal: 12 months.**
- **Leads that don't become clients:** kept 12 months after the last exchange, then deleted by a daily job with a heartbeat. Deleted rows leave the backups within about 35 days; the deletion job runs again after any restore.
- **Leads that become clients:** move to the client record outside the website, where contract and accounting retention apply (an accountant or lawyer confirms the periods).
- **Notification emails** in the team mailboxes follow the same 12-month rule.
- **Other data:** rate-limit hashes 48 h; server logs with masked IPs 14 days; chat transcripts not stored (Anthropic deletes API inputs and outputs within 30 days, with exceptions).

**GDPR rationale**
- The legal basis is Art. 6(1)(b), steps before a contract. It holds only while a deal is realistically open.
- Storage limitation (Art. 5(1)(e)) calls for a fixed, justified period, which the privacy notice must state (Art. 13(2)(a)).
- 12 months covers a budget cycle and late follow-ups. 6 months is stricter. 24 months is hard to justify for enquiries that went nowhere.

## Folder structure (Option 1)

```
codraft-website/
├── src/
│   ├── pages/                    routing only, thin files
│   │   ├── [...slug].astro       every localised page, from the route map
│   │   ├── 404.astro, en/404.astro
│   │   ├── sitemap.xml.ts, robots.txt.ts
│   │   └── api/                  prerender = false; thin wrappers around feature handlers
│   │       ├── audit.ts, contact.ts, health.ts
│   │       └── chat.ts           (phase 4)
│   ├── views/                    one composition per page id (home, services, drafting, …)
│   ├── layouts/BaseLayout.astro  <html lang>, head (canonical, hreflang, OG, JSON-LD), header, footer, skip link
│   ├── features/
│   │   ├── i18n/                 route-map.ts, urls.ts, t.ts (+ *.test.ts)
│   │   ├── seo/                  metadata, JSON-LD builders, OG template
│   │   ├── navigation/           Header.astro, mobile-menu.ts, LanguageSwitcher.astro
│   │   ├── leads/                schemas/ (shared by client and server); server/: handler, repository, outbox, rate-limit, retention
│   │   ├── audit-form/           AuditForm.tsx (island), BookingStep.tsx
│   │   ├── contact-form/         ContactForm.tsx (topic + CAD fields)
│   │   ├── booking/              click-to-load embed, prefill URL builder per tool
│   │   ├── email/                EmailSender interface, scaleway.ts, templates/{hr,en}
│   │   ├── consent/              store.ts, ConsentBanner.astro, analytics-loader.ts
│   │   ├── layer-viewer/         LayerViewer.tsx (phase 3)
│   │   └── chatbot/              ChatWidget.tsx; server/: provider interface, caps, spend meter (phase 4)
│   ├── components/ui/            Button, Card, Section, Grip, Dimension, Wordmark (.astro; .tsx only if interactive)
│   ├── content/{hr,en}/          long copy per page (content collections, checked against a schema)
│   ├── locales/{hr,en}.json      UI strings (i18n-sync format)
│   ├── lib/                      pure helpers: slugify, hr-HR formatting, Result type
│   ├── server/                   server-only: env.ts (Zod), db.ts (SQLite + migrations), ip.ts, log.ts
│   ├── styles/                   tokens.css, fonts.css, global.css
│   ├── config/site.ts            site URL, company data (impresum, footer)
│   └── design-lab/               phase 2 prototypes and style page (dev and preview builds only)
├── public/                       favicons (from Assets/codraft-brand/web), fonts/*.woff2
├── db/migrations/                001_leads.sql, …
├── deploy/                       Caddyfile, systemd units and timers, provision.sh, backup.sh
├── scripts/                      check-js-budget.ts, check-guardrails.ts (the compliance.md regex)
├── tests/e2e/                    Playwright journeys (unit tests sit next to the code)
├── .github/                      workflows/ci.yml, workflows/deploy.yml, dependabot.yml
└── astro.config.ts, tsconfig.json, eslint.config.js, vitest.config.ts, playwright.config.ts, .env.example, .nvmrc
```

ESLint enforces the layer boundaries: islands and `components/ui` never import anything under `**/server/**`, and `components/ui` never imports from `features/`.

- **Option 2 differences:** `deploy/` is replaced by `wrangler.jsonc` (D1 in the EU, the Durable Object, the cron) and `public/_headers`; `server/db.ts` and the repository and rate-limit adapters target D1 and the Durable Object; a `.github/workflows/backup.yml` runs the nightly D1 export.
- **Option 3 differences:** `src/app/[locale]/…`, `src/i18n/routing.ts`, `src/proxy.ts` (locale handling and the CSP nonce), `src/app/api/*/route.ts` and `messages/{hr,en}.json`; `features/`, `components/ui/`, `lib/` and `server/` stay the same; Caddy proxies every request to Node.

## JS budget (Options 1 and 2)

Sizes are gzip and count all JS a page loads, including what loads when islands hydrate.

| Pages | Budget | How |
|---|---|---|
| Home, Services, About, legal pages, 404 | **≤ 15 KB** (aim for < 10 KB) | No React runtime. Header, mobile menu, language switcher, consent banner and one-time reveals are Astro components with small TS modules. Grips, snap and line draws are CSS. |
| Besplatna analiza, Kontakt, CAD crtanje (form, layer viewer) | **≤ 100 KB** | React loads once per page (≈ 60–69 KB, measured with one island). Islands hydrate on `client:visible`. motion/react only where CSS can't do the job. |
| AI asistenti (phase 4) | **≤ 120 KB** | The chat island; no Markdown library. |

- **Other limits:** CSS ≤ 30 KB gzip; one preloaded WOFF2 font; no task longer than 50 ms during load on a mid-range phone; the hero H1 in the initial HTML.
- **Enforcement:** a build-time check over `dist/` in CI from phase 1; Lighthouse CI budgets from phase 6.
- **Trade-off:** the always-present parts (header, menu, consent) are built without React, so they are tested with `@testing-library/dom` and Playwright rather than React Testing Library. Building them in React would add about 60–70 KB to every page. Option 3 cannot go below about 180 KB on any page.

## Deliberately left out

- **CMS:** copy lives in the repo and changes through pull requests. Revisit when the blog starts (phase 8).
- **Login and an admin interface:** leads arrive by email.
- **Newsletter, file uploads** (CAD files come by email or link), **comments and site search.**
- **A separate database server:** leads go into one SQLite file (or D1 on Option 2). This is also why GoatCounter (SQLite) beats Umami (PostgreSQL) and Plausible CE (ClickHouse).
- **Docker and deploy panels (Coolify, Dokploy, Kamal):** Coolify and Dokploy have long lists of critical security advisories; Kamal has neither previews nor basic auth.
- **A CDN or proxy in front of the VPS:** it would add a US processor.
- **Captcha and Turnstile:** both make third-party requests. The honeypot and rate limits come first.
- **Also left out:** a client-side router, a runtime image optimiser (images are optimised at build time), an i18n library (a typed helper around the route map is enough), a tag manager, an error-tracking service.
- **Hosts considered but not shortlisted:**
  - Netlify Free: functions run in the US, all sites pause at the credit limit, previews can't be password-protected.
  - Bunny.net: no previews, and its database can't be pinned to the EU.
  - statichost.eu: static only, no previews.
  - Vercel Hobby: non-commercial use only.
  - Hostinger Cloud Startup (checked at the client's request after the options were presented): $7.99/month only on a 48-month prepay, renewal at $25.99/month excl. VAT (≈ €28.87 incl. VAT, nearly three times the €10 ceiling), no full server access ([research addendum](../research/2026-10-19-hosting.md#addendum-hostinger-cloud-startup-client-request-2026-10-19)).

## Recommendation: Option 1

1. **EU end to end.** Server, leads, email, analytics and, optionally, booking stay in the EU. Only the chatbot provider is outside the EU, and phase 4 can move it to Vertex AI or Bedrock in the EU.
2. **The strictest privacy setup.** No third-party request before consent or a click, and with self-hosted GoatCounter none even after consent. The CSP is strict and built from hashes.
3. **The only path to booking with a Croatian interface and EU data** (Easy!Appointments).
4. **No platform caps on the chatbot** (no CPU limit, no daily request limit), and a fixed cost of €5.61/month incl. VAT.
5. **It puts Codraft's own "Hosting & maintenance" service into practice,** and the About page can document it (`#ova-stranica`).
6. **Low lock-in.** The same code moves to Cloudflare in 1–2 days.

**The cost:** about 2–3 h/month of server upkeep, and a single server to look after. Choose Option 2 instead if €0 and no upkeep outweigh EU hosting and Croatian booking with EU data.

## Decisions for the client

Needed now (phase 1, recorded as ADR 0008 and later):
1. **Option** (stack and hosting): 1 (recommended), 2 or 3.
2. **Email API:** Scaleway (recommended), AhaSend (1,000 free emails a month) or Mailjet.
3. **Analytics:**
   - GoatCounter after consent, plus Search Console and Bing (recommended)
   - or no tracking script at all: statistics from the server logs (GoAccess) plus Search Console and Bing; no consent banner needed, VPS only
   - or Plausible Cloud at €9/month
4. **Booking:**
   - Option 1: Easy!Appointments, recommended if sync with the team's calendar works (checked in phase 4), adding about 1–1.5 h/month of upkeep; or NeetoCal Free (no upkeep, US data, Neeto branding).
   - Option 2: NeetoCal.
   - Cal.com: not recommended (no Croatian interface, US data).
5. **Mailbox provider to recommend:** Zoho Mail Lite (recommended), Zoho Mail Free or Exchange Online Plan 1. Mailboxes are set up in phase 7.

Later, when the phase needs them:
- **OVH terms (Option 1):** no commitment until launch, then 12 months upfront (€3.81/month); data centre in Germany or Italy. Decided when the server is ordered.
- **Private previews in phase 2 (Option 1 only):** these need the domain bought and the server set up during phase 2. Decided at the start of phase 2.
- **Lead retention:** 6, 12 (recommended) or 24 months. Decided with the privacy notice (phase 3) and built in phase 4.

## Verify during the scaffold or in phase 4

- **Node:** how stable `node:sqlite` is on Node 24 and 26; whether Astro 7.4 and its adapters support Node 26.
- **Inline styles:** whether motion/react's server rendering emits `style="…"` attributes. If it does, allow `style-src-attr 'unsafe-inline'` (Astro 7.1 and later); scripts stay protected.
- **Design lab routes:** Astro ignores `_`-prefixed files in `src/pages`, so the `/_design/*` routes planned in [phase 2](2-design.md) are added from `src/design-lab/` by a small local integration, in dev and preview builds only, or renamed.
- **Option 2:** D1's EU jurisdiction and Cron Triggers on the free plan; whether `not_found_handling` serves `/en/404.html` under `/en`; whether `run_worker_first` can be set per environment; which zone features inject scripts.
- **Easy!Appointments:** calendar sync, and outgoing SMTP on port 587 from OVH.
- **SPF:** one record must cover both the mailbox provider and Scaleway, because Scaleway doesn't follow nested includes.

## Review notes (main session)

- **Arithmetic checked.** Every incl.-VAT figure is the excl. figure × 1.25, and every yearly figure is the monthly figure × 12. The chatbot estimate follows from Haiku 5.5's prices.
- **Facts checked against the research note,** including the decision-critical ones re-checked on the vendors' pages (✓ rows in the note).
- **Backblaze is a US company** with an EU region (Amsterdam). restic encrypts the backups before upload, so the provider can't read them. For an all-EU-company chain, use the Hetzner Storage Box (€4.00/month incl. VAT) instead.
- **The €50.15/year `.hr` price is Plus Hosting's current discount** (regular €59). cyber_Folks lists €66.49 (€83.11 incl. VAT).
- **The always-present UI without React** (header, mobile menu, consent banner) is part of this proposal: it keeps content pages at ≤ 15 KB of JS. React stays for the forms, the layer viewer and the chatbot.
- **The decisions are split** into those phase 1 needs now and those that wait for their phase, following the client's instruction to raise open questions only when a phase needs them.
