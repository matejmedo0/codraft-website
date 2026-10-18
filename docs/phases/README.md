# Roadmap

The site is built in nine gated phases. Each phase document says what the phase needs (inputs), what Claude does (steps), what it produces (deliverables), and how it ends (exit criteria). Its log records what actually happened.

How phases run is defined in [.claude/rules/codraft-workflow.md](../../.claude/rules/codraft-workflow.md):
- **Gates.** A phase ends with exit checks, a report and a PR. The next phase starts only on the client's word.
- **Authority.** What Claude may do alone.
- **Skills and agents** per phase.

Live status is in [PROGRESS.md](../../PROGRESS.md).

## Phases

| # | Phase (HR) | Goal | Key deliverables | Exit criteria | Status |
|---|---|---|---|---|---|
| 0 | [Foundation](0-foundation.md) (Temelji) | Agree what we build and set up the repository | Sitemap, copy source, docs, ADRs, GitHub repo | Sitemap, asset gaps and decisions recorded; repo on GitHub | Done 2026-10-19; approved |
| 1 | [Architecture](1-architecture.md) (Arhitektura) | Choose and scaffold the stack and hosting | Research, architecture options, scaffold, CI, hooks | Build passes; dev server runs; empty page renders at 375/768/1440; CI green | In progress (2026-10-19) |
| 2 | [Design](2-design.md) (Dizajn) | Choose a visual direction and build the design system | 2–3 coded prototypes, tokens, base components, style page | Client approves the direction; style page at three widths | Not started |
| 3 | [Pages](3-pages.md) (Izrada stranica) | Build every launch page in HR and EN | 10 pages + 404, SEO, JSON-LD, OG images | All sitemap pages built; no open CRITICAL/HIGH findings | Not started |
| 4 | [Integrations](4-integrations.md) (Integracije) | Forms, booking, consent, analytics, chatbot | Audit and contact forms, consent manager, AI page and demo | Form works end to end locally; analytics blocked until consent | Not started |
| 5 | [Quality](5-quality.md) (Kvaliteta) | Prove it works | E2E and unit tests, a11y and performance passes | Tests pass; no open CRITICAL/HIGH findings | Not started |
| 6 | [Audit](6-audit.md) (Audit) | Pre-launch audit | SEO, a11y, performance, security and compliance audit | No BLOCKERS | Not started |
| 7 | [Launch](7-launch.md) (Objava) | Go live on the real domain | Hosting config, headers, DNS, email auth, Search Console | Production live and re-checked | Not started |
| 8 | [Maintenance](8-maintenance.md) (Održavanje) | Keep it healthy and growing | Cleanups, case studies, blog, quarterly refresh | Ongoing | Not started |

## Cross-cutting documents

- **[information-architecture.md](../information-architecture.md):** pages, URLs, page outlines, trust strategy.
- **[content.md](../content.md):** all site copy (EN source, HR drafts), suggestions, gaps.
- **[brand.md](../brand.md):** marks, colours, contrast, typography, imagery.
- **[motion.md](../motion.md):** motion concept and rules.
- **[compliance.md](../compliance.md):** Croatian and EU requirements and copy guardrails.
- **[architecture.md](../architecture.md):** repository layout and code principles.
- **[decisions/](../decisions/README.md):** ADRs.
- **[research/](../research/):** dated facts with sources.

## Risk register

| Risk | Impact | Mitigation | Owner |
|---|---|---|---|
| The name "Codraft" is also used by an AI developer tool (codraft.dev, verified). codraft.com is taken (verified); .eu, .studio and .io are reported taken (unverified). | Brand confusion, trademark conflict | Trademark search (TMview, DZIV; classes 9/35/42); register codraft.hr now; consistent `sameAs` links | Client |
| Legal form and registration unknown | Blocks the impresum, the free .hr domain and the Google Business Profile | Asked in the phase 0 report | Client |
| Drafting copy that reads like regulated projektiranje | Legal exposure | Copy guardrails ([compliance.md](../compliance.md)); grep in phase 6; check with HKA, HKIG or a lawyer | Claude, client |
| Croatian copy approval becomes a bottleneck | Delays phase 3 | Approve page by page; phase 2 uses the existing copy | Client |
| Chatbot cost, abuse or wrong answers | Cost, reputation | Per-IP and daily caps, a monthly spend cap, approved content only, no promises | Claude |
| Not eligible for a Google Business Profile if fully remote | Weaker local SEO | Rely on content, links and consistent business data | Client |
| Hosting or booking vendors change (price rises, cal.eu status) | Cost, rework | **Happened (research 2026-10-19):** Hetzner's cheap cloud line can't be ordered, and cal.eu closes on 2026-11-01. Options are priced on available alternatives; the build stays portable and static-first. | Claude |
| VPS operations burden | Downtime, security | Automated patching, snapshots and monitoring, or choose Cloudflare | Claude, client |
| Motion hurts speed or accessibility | Worse UX and rankings | Budgets, reduced-motion rules, LCP text visible at first paint | Claude |
| Claude's legal drafts are not legal advice | Legal exposure | Lawyer review before launch | Client |
| A new chat session loses context | Rework, contradictions | `docs/` as durable memory; documentation rule in the workflow; fresh-session test at phase 0 exit | Claude |
| Accidental pushes or force pushes to `main` | Unreviewed or lost work | Mitigated. The ruleset "Protect main" (PR required, no force push, no deletion) is enforced; a probe test on 2026-10-19 confirmed enforcement. Merges happen only on the client's word. | Claude |
