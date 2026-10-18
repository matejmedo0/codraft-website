# Phase 1: Architecture (Arhitektura)

- **Status:** Not started
- **Branch:** `phase/1-architecture`

## Goal

Choose the stack and hosting with the client, scaffold the project with a professional structure, and set up the quality gates: tooling, CI, hooks and permissions. At the end there is an empty page running locally and passing CI.

## Inputs

| Input | Status | Where |
|---|---|---|
| Sitemap, i18n routing | Agreed | [information-architecture.md](../information-architecture.md), [ADR 0002](../decisions/0002-croatian-default-english-secondary.md), [ADR 0003](../decisions/0003-launch-sitemap.md) |
| Integrations | Agreed in principle | Below and [phase 4](4-integrations.md) |
| Budget and constraints | Agreed | [research/2026-10-18-hosting.md](../research/2026-10-18-hosting.md) |
| Hosting facts | Partly verified; rest to research at phase start | Same file |
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

**3. Present the options to the client in Croatian.** The client chooses (an "ask first" item). Record the choices as ADR 0008 and later:
- stack
- hosting
- transactional email
- analytics
- booking tool
- recommended mailbox provider

Accounts and keys are created in phase 4; mailboxes are set up in phase 7.

**4. Plan the scaffold, then scaffold.**
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

_Not started._
