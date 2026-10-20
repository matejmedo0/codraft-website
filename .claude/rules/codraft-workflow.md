# Codraft workflow

How Claude works on this project: the phases, what to load and launch in each, and what it may do without asking. The user grants standing authority for everything under "Autonomous"; everything else needs their OK.

## Session start

1. Read `PROGRESS.md` for the current phase, the next open step and the decisions made so far.
2. Read the current phase's document in `docs/phases/` and the documents it links to.
3. Talk to the user in Croatian. Code, comments, commit messages, file names and `docs/` stay in English. `PROGRESS.md` is written in Croatian.
4. Work only inside the current phase. Never start the next phase on your own.

## Phase gate

Every phase ends the same way:

1. Run the phase's exit checks.
2. Update the docs:
   - `PROGRESS.md`: tick finished steps, record decisions and open questions.
   - The phase document in `docs/phases/`: status and log.
   - An ADR for every decision.
3. Commit (Conventional Commits) and push the phase branch (`phase/<n>-<name>`).
4. Open a PR to `main`. Its description is the phase report.
5. Report to the user in Croatian: what was done, what the checks found, which decisions are theirs, and the PR link.
6. Stop and wait. The next phase starts only on the user's word ("idemo dalje", "sljedeća faza" or similar).
7. On that word:
   1. Commit any changes the user asked for during the review.
   2. Merge the phase PR into `main` with a merge commit.
   3. Create the next phase branch from `main`.
   4. Start the next phase.

Phase 0 is the exception: the repository was created in that phase, so its commits went straight to `main`.

From the end of phase 0, `main` is protected by a GitHub ruleset: a PR is required, and force pushes and deletion are blocked. Changes requested in the phase 0 review therefore go through a small PR (e.g. `docs/phase-0-review`), merged on the user's word before the phase 1 branch is created.

## Authority

### Autonomous

- Load any skill and launch any agent listed for the current phase. Launch independent agents in one message so they run in parallel.
- Run the project's build, dev server, lint, typecheck, format and test scripts.
- Check the local dev site with Playwright MCP: screenshots at 375, 768 and 1440 px, console errors. Use Claude in Chrome only when the user asks to work in their own browser.
- Create and edit files in this project for the current phase's steps.
- Install packages that belong to the approved architecture (recorded in `PROGRESS.md`).
- Run the procedures of the user's commands (see below) as part of phase work.
- Fix CRITICAL and HIGH review findings in code written during the current phase, then re-run that reviewer once.
- Git and GitHub, within the project's repository (`origin` = `matejmedo0/codraft-website`):
  - create branches
  - commit (Conventional Commits)
  - push to `origin`
  - open and update PRs
  - read issues and CI results

  Merging into `main` happens only on the user's word (phase gate).

### Ask first

- Moving to the next phase.
- Choosing between options: stack, hosting, design direction, languages, third-party services.
- Changing the meaning of the user's service copy in `docs/content.md`. Suggest wording, typo and SEO fixes; do not apply them silently.
- Any dependency outside the approved architecture, with a one-line reason.
- Deleting files or code, `/clean` removals, destructive git commands.
- Anything beyond localhost: deploys, DNS, pushing to any remote other than `origin`, creating accounts, API keys, paid services, publishing pages.
- GitHub repository administration:
  - visibility
  - settings and branch rules
  - collaborators
  - secrets
  - deleting branches that hold unmerged work
- Changes to global config in `~/.claude` (settings, skills, agents, plugins).

## Documentation

`docs/` is the project's durable memory. A new session must be able to continue from the repository alone.

- **Decisions:** every decision becomes an ADR in `docs/decisions/` (ADR 0001 defines what counts; the template is in the README there), plus one line under "Odluke" in `PROGRESS.md`. Accepted ADRs are never rewritten; a new ADR supersedes an old one.
- **Research:** every fact gathered from research goes to `docs/research/YYYY-MM-DD-topic.md`, with its source URL and a confidence rating.
- **Phase documents:** keep the current phase's document up to date while working (status, log).
- **Site copy:** copy goes into `docs/content.md` before it goes into the site.
- **Nothing important lives only in chat.** Write it down before the phase ends.

## The user's commands

`/architecture`, `/check`, `/fix`, `/test`, `/audit` and `/clean` live in `~/.claude/skills/<name>/SKILL.md` and are user-only, so the Skill tool cannot invoke them. When a phase calls for one, Read its SKILL.md and follow the procedure directly, with these project overrides:

- `/architecture` in phase 1: the procedure ends with the user's choice and points to `/plan`. Write a short scaffold plan (plan mode or a Plan agent) and get the user's OK on it before scaffolding. Do the hosting research first, because the `architect` agent has no web access.
- `/check` during phase work: fix CRITICAL and HIGH findings in this phase's code, list MEDIUM in the phase report.
- `/audit` and `/clean`: ask before applying fixes or removals, as the skills say.

When the user types one of these commands, that run follows the skill exactly, including asking before any fix.

## Phases

The skills and agents for each phase are listed below. The project-specific plan for each phase (inputs, steps, deliverables, exit criteria, log) is in `docs/phases/<n>-<name>.md`.

### 0 — Foundation (Temelji)

- `git init`, `.gitignore` (dependencies, build output, `.env*` except `.env.example`).
- Save the user's service copy to `docs/content.md` as the source of truth for site text.
- Draft the sitemap (result: `docs/information-architecture.md`):
  - Home
  - Services (Plan / Build / Run & Grow)
  - Engineering Drafting
  - About
  - Free audit
  - Contact
  - Privacy, Cookies, Legal notice, Accessibility statement
  - 404
- Inventory `Assets/` and list what is missing: SVG logo, favicon and app icons, OG image, photos.
- Decisions for the user: site languages, target market, domain.
- Document the full plan by phase in `docs/`.
- Create the private GitHub repository. The user authorised this on 2026-10-18.

Exit: sitemap, asset gaps and decisions recorded in `PROGRESS.md`; repository on GitHub.

### 1 — Architecture (Arhitektura)

- `/architecture` procedure (`architect` agent) with the sitemap, languages, planned integrations (form, booking, analytics, chatbot) and hosting budget.
- After the user picks an option: scaffold the project, then run `/init` to add commands and structure to `CLAUDE.md`.
- Stack skill from here on: `nextjs-turbopack` for Next.js, `vite-patterns` for Vite, `react-patterns` whenever React is used.
- Hooks and permissions with `update-config`, in `.claude/settings.json`:
  - PostToolUse on Write|Edit: Prettier, then ESLint on the changed file; report, do not block.
  - PreToolUse on Write|Edit: block `.env*` files except `.env.example`.
  - Allowlist for the project's build, dev, lint, typecheck, test and format scripts, plus common `git` and `gh` commands.
- CI on GitHub Actions: install, lint, typecheck, test and build on every PR. Dependabot for npm and GitHub Actions.

Exit: build passes, dev server runs, an empty page renders in Playwright at all three widths, CI is green.

### 2 — Design system (Dizajn)

- `frontend-design:frontend-design`: 2–3 visual directions built from the logo (navy wordmark, blue CAD-handle accent, warm off-white ground) for the user to choose from.
- Tokens as CSS custom properties: color, type scale, spacing, radius, motion. Two font families at most.
- `motion-foundations`: motion tokens, springs, `prefers-reduced-motion`.
- `animate` for motion in CSS and small TypeScript modules (most of this site), `animation-performance` when motion stutters (ADR 0026). `docs/motion.md` and the client's decisions take precedence over their defaults.
- Base components: header with mobile menu, footer, button, section, card. `frontend-a11y` for the menu, focus states and skip link.
- Figma only when the user asks: `figma:figma-generate-design` or `figma:figma-generate-library`, with `figma:figma-use` before any `use_figma` call.
- `design-critic` (project agent, ADR 0024) for an independent critique, on the user's word: capture with `npm run design:capture`, then one critic per lens, as `docs/design-critique.md` describes. Verify its findings before reporting them, and put them to the user as options.

Exit: a style page with tokens and base components, screenshots at three widths, the user approves the direction.

### 3 — Pages (Izrada stranica)

One page at a time, in sitemap order.

- While writing: `react-patterns`; `seo` (metadata, heading order, JSON-LD: Organization/ProfessionalService on Home, Service per offering, BreadcrumbList); `frontend-a11y` for interactive parts; `animate` for motion in CSS and plain TypeScript, `motion-patterns` for React islands, plus `motion-advanced` only for complex animation; `mobile-native` for touch details (hover, tap feedback, fields), applying only the fixes whose reason fits a content site; `i18n-sync` when there is more than one language.
- After each page: `/check` procedure, then Playwright screenshots at three widths with no console errors. Pages with variable content (team, tables, legal texts) also get `break-ui` in both languages, with its Croatian values.
- Build or type error: `/fix` procedure (`build-error-resolver` or `react-build-resolver`).

Exit: every page in the sitemap built; no open CRITICAL or HIGH findings.

### 4 — Integrations (Integracije)

- Free audit / contact form: `api-design`, `error-handling`; Zod validation on client and server, honeypot, rate limiting. `security-reviewer` and `silent-failure-hunter` always review it. `mobile-native` for the fields (16 px, `inputmode`, `autocomplete`, `enterkeyhint`); `break-ui` for worst-case input in both languages.
- Booking, analytics and cookie consent: no analytics or third-party script loads before consent; scripts load async or deferred.
- AI chatbot demo (the user said yes, ADR 0007): load `claude-api` before writing any code. `break-ui` on its answers: long URLs, Markdown and HTML shown as text, an API error, an empty message.
- Any database: `postgres-patterns`, `database-migrations`, `database-reviewer`.

Exit: the form works end to end locally; analytics stay blocked until consent.

### 5 — Quality and tests (Kvaliteta)

- `/test` procedure: `e2e-runner` with `e2e-testing` for journeys (navigation and mobile menu, audit form, language switch, cookie banner); `tdd-guide` with `react-testing` for form logic and utilities.
- `a11y-architect` on the menu, form and cookie banner; `performance-optimizer` with `react-performance` on images, fonts and bundle, and with `animation-performance` on motion.
- `break-ui` worst cases become test fixtures; `mobile-native` items that only a real phone shows (sticky hover, tap feedback, keyboard, `theme-color`) are checked on a phone.

Exit: tests pass; no open CRITICAL or HIGH findings.

### 6 — Pre-launch audit (Audit)

- `/audit` procedure: `seo-specialist`, `a11y-architect`, `performance-optimizer` and `security-reviewer` in parallel, with a preview URL when one exists.
- `/security-review` on the whole branch.
- Fix only the items the user approves.

Exit: no BLOCKERS.

### 7 — Launch (Objava)

- `deployment-patterns`: hosting config, security headers (CSP, HSTS, nosniff, Referrer-Policy, frame protection), redirects, sitemap and robots on the real domain.
- Every step that touches the internet asks first.

Exit: production site live and re-checked with Playwright.

### 8 — Maintenance (Održavanje)

- `/clean` procedure (removals only with the user's OK), `/simplify`, `/code-review` before larger changes.
- `fewer-permission-prompts` once there is enough session history.

## Out of scope

- The Workflow tool runs only when the user asks for multi-agent orchestration in their own words.
- Blender and Roblox MCP tools are not used on this project.
