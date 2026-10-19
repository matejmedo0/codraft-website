# Phase 1: Architecture (Arhitektura)

- **Status:** In progress (started 2026-10-19).
  - Steps 1–3 are done (ADR 0008–0013).
  - The scaffold plan for step 4 is approved: [plans/2026-10-19-scaffold-plan.md](../plans/2026-10-19-scaffold-plan.md).
  - **Next:** a new session executes the plan from its point 0 (steps 4–8).
- **Branch:** `phase/1-architecture`

## Goal

Choose the stack and hosting with the client, scaffold the project with a professional structure, and set up the quality gates: tooling, CI, hooks and permissions. At the end there is an empty page running locally and passing CI.

## Inputs

| Input | Status | Where |
|---|---|---|
| Sitemap, i18n routing | Agreed | [information-architecture.md](../information-architecture.md), [ADR 0002](../decisions/0002-croatian-default-english-secondary.md), [ADR 0003](../decisions/0003-launch-sitemap.md) |
| Integrations | Agreed in principle | Below and [phase 4](4-integrations.md) |
| Budget and constraints | Agreed | [research/2026-10-18-hosting.md](../research/2026-10-18-hosting.md) |
| Hosting facts | Verified 2026-10-19 | [research/2026-10-19-hosting.md](../research/2026-10-19-hosting.md) (supersedes the 2026-10-18 note) |
| Domain | Recommended codraft.hr; the client buys it | [research/2026-10-18-domain-and-name.md](../research/2026-10-18-domain-and-name.md) |
| Launch scope (team photos, audit flow, AI demo, budget) | Agreed | [ADR 0007](../decisions/0007-launch-scope-and-constraints.md) |
| Will other team members run Claude on their own machines? | Open question in `PROGRESS.md` | The user-level skills and agents (`/architecture`, `architect`, …) exist only in `~/.claude` on this machine. If others will use Claude, copy the needed ones into `.claude/skills` and `.claude/agents` in the repo (ask first). |

## Steps

**1. Research first.** The `architect` agent has no web access, so research comes before the brief. Work through every "to verify" and "still to research" item in [research/2026-10-18-hosting.md](../research/2026-10-18-hosting.md):
- Cloudflare and Netlify: commercial-use terms and limits
- Hetzner: the IPv4 price and the mail-port policy
- a transactional email API (free tier, EU region)
- mailboxes for @codraft.hr
- analytics options
- Cal.com and its EU status. This one is time-sensitive.
- uptime monitoring and backups
- an EU static host
- preview deployments
- CSP support for each hosting model
- current framework versions and hosting adapters
- the Anthropic API's data handling, for phase 4 (load `claude-api` first)

Write the results, with dates and URLs, into a new dated note `docs/research/YYYY-MM-DD-hosting.md`. Add a "Superseded by …" line at the top of the 2026-10-18 note, but don't edit its facts.

**2. `/architecture` procedure.** Read `~/.claude/skills/architecture/SKILL.md` and launch the `architect` agent with a self-contained brief:
- **Scope:** the sitemap (10 pages + 404 + the phase 4 AI page); case studies and blog come later.
- **i18n:**
  - HR at the root, EN under `/en`, localised slugs
  - one route map driving nav, switcher, hreflang (`x-default` → EN), `sitemap.xml` and canonicals
  - `<html lang>` per locale
  - no `Accept-Language` or IP redirects
  - localised 404
  - UI strings in JSON locale files; long copy in per-locale content files
- **Integrations:**
  - 2-step audit flow: form, then booking prefilled with name and email; the lead is saved durably before any email is sent
  - contact form with CAD fields
  - transactional email: team notification plus a localised confirmation
  - booking embed that loads only on a click
  - consent manager; analytics only after consent
  - phase 4 chatbot endpoint: streaming, server-side key, per-IP and daily caps
- **Constraints:**
  - as close to €0/month as possible; a small VPS is acceptable; EU hosting preferred
  - custom forms rather than a form SaaS
  - no Vercel Hobby (non-commercial)
  - no third-party requests before consent
  - self-hosted fonts
  - a CSP that works with the hosting model
  - LCP < 2.5 s, INP < 200 ms, CLS < 0.1, and a JavaScript budget
  - a preview URL for phase 6
  - React-compatible, because the installed skills are React-based
- **Options to compare:**
  - a static-first build with React islands on a Hetzner VPS
  - the same build on Cloudflare
  - a Next.js server on Hetzner
- **What to return:** 2–3 options with one recommendation, covering:
  - the stack
  - hosting, with a monthly cost table including 25 % VAT and IPv4
  - where form submissions are stored and how long they are kept
  - the folder structure
  - the operations burden
  - portability
  - what is deliberately left out (CMS, auth, newsletter, file uploads)

**3. Present the options to the client in Croatian.** The options of 2026-10-19 are in [1-architecture-options.md](1-architecture-options.md). The client chooses (an "ask first" item). Record the choices as ADR 0008 and later:
- stack
- hosting
- transactional email
- analytics
- booking tool
- recommended mailbox provider

Accounts and keys are created in phase 4; mailboxes are set up in phase 7.

**4. Plan the scaffold, then scaffold.** The approved plan is [plans/2026-10-19-scaffold-plan.md](../plans/2026-10-19-scaffold-plan.md) (Croatian, verbatim). Its verified versions and settings are in [research/2026-10-19-scaffold-toolchain.md](../research/2026-10-19-scaffold-toolchain.md).
- The `/architecture` skill stops at the client's choice and points to `/plan`. So first write a short scaffold plan, in plan mode or with a Plan agent, covering folders, packages, scripts and config. The client approves it.
- Then scaffold, following the principles in [architecture.md](../architecture.md): feature-based structure, strict TypeScript, ESLint, Prettier, test setup, env validation.
- Load the stack skills: `nextjs-turbopack` for Next.js, `vite-patterns` for Vite-based stacks, and `react-patterns` whenever React is used.

**5. Run `/init`** to add the stack, commands and structure to `CLAUDE.md`. Fill in [architecture.md](../architecture.md) with the real structure.

**6. Hooks and permissions** with the `update-config` skill, in `.claude/settings.json`:
- PostToolUse on Write|Edit: Prettier, then ESLint on the changed file; report, don't block.
- PreToolUse on Write|Edit: block `.env*` files except `.env.example`.
- An allowlist for the project's build, dev, lint, typecheck, test and format scripts, plus the common `git` and `gh` commands.

**7. CI on GitHub Actions.**
- On every PR: install, lint, typecheck, test, build.
- Add `.github/dependabot.yml` for npm and GitHub Actions.

**8. Check the empty page** with Playwright MCP at 375, 768 and 1440 px; no console errors.

## Out of scope

- design tokens and visual design (phase 2)
- page content (phase 3)

## Deliverables

- Research note(s) in `docs/research/`
- ADRs for the stack, hosting and services
- The scaffolded app with the professional structure
- `.claude/settings.json` with hooks and the allowlist
- CI workflow and Dependabot config
- Updated `CLAUDE.md` and `architecture.md`

## Exit criteria

- [ ] The build passes and the dev server runs.
- [ ] An empty page renders in Playwright at 375, 768 and 1440 px with no console errors.
- [ ] CI is green on the phase PR.
- [ ] The stack and hosting choices are recorded as ADRs; `architecture.md` describes the real structure.
- [ ] Phase PR opened with the report; `PROGRESS.md` updated.

## Log

- **2026-10-19:**
  - **Start.** The client approved phase 0 and started phase 1. Branch `phase/1-architecture` was created from `main`. There was no phase 0 PR to merge: phase 0 committed straight to `main`.
  - **Research (step 1).**
    - Five research agents worked in parallel: edge hosts; Hetzner and EU VPS; email, mailboxes and `.hr`; booking, analytics and operations; frameworks, CSP and CI.
    - The main session loaded `claude-api` and researched the Anthropic API's data handling itself, then re-checked the decision-critical facts: Hetzner availability, OVH VPS-1 price, Cloudflare email sending, D1 jurisdiction, Scaleway TEM, `.hr` price.
    - Result: [research/2026-10-19-hosting.md](../research/2026-10-19-hosting.md). The 2026-10-18 note is marked superseded; its facts are unchanged.
  - **Findings that change the plan:**
    - Hetzner's cheap cloud line (CX23, CAX11) can't be ordered today; new servers are restricted since 2026-06-26.
    - cal.eu closes on 2026-11-01, and Cal.com has no Croatian booking UI.
    - Cloudflare's own email sending needs Workers Paid.
    - A strict CSP keeps pages static in Astro but forces dynamic rendering in Next.js.
    - Analytics needs consent in Croatia even when cookieless.
    - TypeScript must be pinned to 6.0.x for Astro's tooling.
  - **Repository hygiene.** A research agent's Playwright MCP run wrote snapshot files into `.playwright-mcp/` in the repository root; they were removed, and `.playwright-mcp/` is now in `.gitignore`.
  - **`/architecture` (step 2).**
    - The `architect` agent was briefed with the research note and the phase inputs.
    - It returned three options and recommended the first:
      1. Astro + Node on an EU VPS (OVHcloud VPS-1, €5.61/month incl. VAT and IPv4)
      2. the same build on Cloudflare Workers Free (€0)
      3. Next.js on a VPS
    - The main session checked the arithmetic and the facts, added review notes, and split the client's decisions into "now" and "when the phase needs them".
    - Everything is in [1-architecture-options.md](1-architecture-options.md).
  - **Step 3.** The options were presented to the client in Croatian. Waiting for the client's choice.
  - **Budget ceiling.** The client set a ceiling of €10 a month and asked whether it changes the recommendation. It doesn't: Option 1 with the chatbot and Zoho Mail Lite for three users comes to about €9.96 incl. VAT ([fit](1-architecture-options.md#budget-ceiling-10-a-month-client-2026-10-19)). Recorded here and in `PROGRESS.md`; it goes into the hosting ADR's context.
  - **Hostinger.** At the client's request, Hostinger Cloud Startup was checked ([research addendum](../research/2026-10-19-hosting.md#addendum-hostinger-cloud-startup-client-request-2026-10-19)). It was not shortlisted: the $7.99/month price needs a 48-month prepay, the renewal is $25.99/month excl. VAT, and there is no full server access.
  - **Decision: Option 1.** The client confirmed Option 1 once Hostinger had been ruled out. Recorded as [ADR 0008](../decisions/0008-stack-astro-with-react-islands.md) (stack) and [ADR 0009](../decisions/0009-hosting-ovhcloud-vps-eu.md) (hosting). Waiting for the service choices: email API, analytics, booking tool, mailbox provider.
  - **Services.** The client confirmed the recommended services: [ADR 0010](../decisions/0010-transactional-email-scaleway.md) Scaleway, [ADR 0011](../decisions/0011-analytics-goatcounter-after-consent.md) self-hosted GoatCounter after consent plus Search Console and Bing, [ADR 0012](../decisions/0012-booking-easy-appointments.md) self-hosted Easy!Appointments, [ADR 0013](../decisions/0013-mailboxes-zoho-mail-lite.md) Zoho Mail Lite. Step 3 is complete.
  - **Correction.** ADR 0009 first said phase 1 adds the server provisioning script; it is written when the server is first set up. The ADR was corrected before the phase PR, and this entry records the change.
  - **Scaffold plan (step 4).**
    - Written in plan mode and checked by a Plan agent against the npm registry, the Astro docs and source, the Claude Code docs and GitHub.
    - The check changed four things in the plan:
      - ESLint 10 with the `eslint-plugin-jsx-a11y-x` fork, because the original plugin doesn't support ESLint 10 yet
      - Node must be upgraded from 24.11.0 to 24.22.0, because `eslint-plugin-astro` needs ≥ 24.16
      - `build.format: 'directory'`, because `'file'` breaks `/en` on the Node adapter
      - the Node adapter serves the HR 404 for `/en/*`
    - The client approved the plan.
    - Snapshot: [plans/2026-10-19-scaffold-plan.md](../plans/2026-10-19-scaffold-plan.md). Facts with sources: [research/2026-10-19-scaffold-toolchain.md](../research/2026-10-19-scaffold-toolchain.md).
  - **Handover.** This session's context was full, so the client asked for the plan to be documented and for a prompt to continue in a new session.
    - The new session starts at point 0 of the plan.
    - Point 0 is the Node upgrade, approved as part of the plan; the client confirms the UAC prompt.
