# Phase 0: Foundation (Temelji)

- **Status:** Done (2026-10-19). Waiting for the client's go-ahead for phase 1.
- **Branch:** `main`. These are the initial commits: the repository was created in this phase. `main` is protected from the end of this phase.

## Goal

Agree what we are building and set up a professional repository: sitemap, copy source of truth, asset inventory, the client's decisions, complete documentation of the plan by phase, and a GitHub repository.

## Inputs

| Input | Status | Source |
|---|---|---|
| Service copy (EN) | Received 2026-10-18 | Client message, saved verbatim in [content.md](../content.md#appendix-a-original-copy-as-received-2026-10-18) |
| Brand package | Final | `Assets/codraft-brand/` |
| Languages, market, domain, proof of work, team, audit flow, chatbot, budget | Decided 2026-10-18 | Q&A with the client; [ADR 0002](../decisions/0002-croatian-default-english-secondary.md), [ADR 0007](../decisions/0007-launch-scope-and-constraints.md), `PROGRESS.md` |
| Professional structure, docs for session continuity, GitHub repo | Requested 2026-10-18 when the client approved the plan | Client |

## Steps

1. Initialise git (`main`) with `.gitattributes` (LF; binaries; `Assets/** -text`), `.gitignore` and `.editorconfig`.
2. Save the copy verbatim to `docs/content.md`, together with:
   - the HR draft
   - the glossary and wording guardrails
   - suggestions S1–S16
   - gaps G1–G29
3. Write the sitemap and page outlines: [information-architecture.md](../information-architecture.md).
4. Inventory the assets and list what is missing: [brand.md](../brand.md), plus the client's to-do list in `PROGRESS.md`.
5. Record the decisions as ADRs 0001–0007.
6. Write the research notes: hosting and domain.
7. Write the phase documents 0–8, [motion.md](../motion.md), [compliance.md](../compliance.md) and [architecture.md](../architecture.md).
8. Add `README.md`, `CONTRIBUTING.md` and the `.github/` templates.
9. Update `CLAUDE.md`, the workflow rules and `PROGRESS.md`.
10. Snapshot the approved plan to [plans/2026-10-18-approved-plan.md](../plans/2026-10-18-approved-plan.md).
11. Run the exit checks, including a fresh-session test.
12. Commit, create the private GitHub repository, push, and configure the repository settings and branch protection.
13. Report to the client in Croatian and stop.

## Out of scope

- choosing the stack or hosting
- scaffolding or installing packages
- `.claude/settings.json` or hooks
- design work
- registering domains or accounts

## Deliverables

- Repository foundation: `.gitattributes`, `.gitignore`, `.editorconfig`, `README.md`, `CONTRIBUTING.md`, `.github/`.
- `docs/`: everything listed in [docs/README.md](../README.md).
- Updated `CLAUDE.md`, `.claude/rules/codraft-workflow.md` and `PROGRESS.md`.
- Private GitHub repository `matejmedo0/codraft-website`.

## Exit criteria

- [x] Sitemap, asset gaps and decisions are recorded in `PROGRESS.md` (the workflow's criterion).
- [x] The EN blocks in `content.md` match the client's text character for character (31 blocks, rebuilt line by line against Appendix A and an independent copy). The EN and HR block counts are equal; all HR blocks are `draft` and all 16 suggestions `pending`.
- [x] Every row of the coverage map in [docs/README.md](../README.md#plan-coverage) points to an existing file with real content. All relative links resolve.
- [x] Fresh-session test: an agent with no chat context reconstructed the plan from the repository alone. Its findings were fixed (see the log).
- [x] `.env*` (except `.env.example`), `node_modules`, build output and `.claude/settings.local.json` are ignored. `Assets/` and `.claude/rules/` are tracked.
- [x] No application code exists yet: no `package.json`, lockfile or `.claude/settings.json`.
- [x] The GitHub repository is private, `main` is pushed, and the settings are applied.

## Report (summary of what the client was told)

**What was done**
- The repository was created and documented, with the full plan by phase.
- The copy was saved verbatim, with an HR draft, 16 suggestions and 29 gaps.
- The sitemap was agreed (ADR 0003).
- Decisions were recorded in ADRs 0001–0007.
- The private GitHub repository was set up with a protected `main`.

**What the checks found**
- All automated checks passed.
- The fresh-session test passed. Its 10 substantive findings and the cosmetic ones were fixed in one commit.

**Decisions that are the client's**

| Item | Where |
|---|---|
| Company data and registration | `PROGRESS.md`, open questions |
| City, in-person meetings, public address | Same |
| Terminology, *vi* or *ti*, British or American spelling | Same |
| Suggestions S1–S16 | [content.md §3](../content.md#3-suggestions-for-the-english-copy) |
| The launch-partner proposal | `PROGRESS.md` |
| Other team members using Claude | Same |
| A GitHub organisation | Same |
| Buying codraft.hr and a trademark check | [research note](../research/2026-10-18-domain-and-name.md) |

## Log

- **2026-10-18:**
  - **Q&A with the client:**
    - HR + EN; market Croatia; no domain yet
    - CAD work only, and permission to show it is unclear
    - team with photos
    - audit = form, then booking
    - chatbot in phase 4
    - budget ≈ €0 (Hetzner acceptable; custom forms and email)
  - **Plan approved,** with three additions: professional structure, complete docs for session continuity, a GitHub repository. The planning agent's report was used as source material.
  - **Verified directly:**
    - codraft.dev is a live "Codraft" AI tool
    - codraft.com is registered (RDAP)
    - Hetzner CX23 costs €5.49/month excl. VAT
    - Vercel Hobby is non-commercial only
  - **Git and GitHub:**
    - Git initialised; six commits on `main` (Conventional Commits).
    - Private repository `matejmedo0/codraft-website` created and pushed.
    - Repository settings applied and verified with `gh api`:
      - merge commit and squash on, rebase off
      - head branches auto-deleted
      - update-branch button on
      - wiki off
      - Dependabot alerts and security updates on
      - label `change-request` created
  - **Exit-check script** (scratchpad, not committed): 23/23 passed.
    - Appendix A equals the original; the 31 EN blocks rebuild the original copy; the HR/EN counts are equal
    - suggestions pending; every gap has an owner
    - all links resolve; the coverage map has real content
    - no stale asset wording; no application code
    - the plan snapshot is byte-identical
  - **Git checks:** the `git check-ignore` checks behave as required; `git ls-files --eol` shows LF for every text file, and `Assets/` is stored as `-text`.
- **2026-10-19:**
  - **Fresh-session test.** An Explore agent with no chat context answered 11 questions correctly from the repository. Its findings were fixed in one commit:
    - exit criteria were not ticked
    - `PROGRESS.md` said phase 1 ends with the stack choice
    - the open questions were unclear about blocking
    - booking and mailbox timing were inconsistent
    - the phase 6 guardrail grep was too narrow; it is now a regex covering inflected forms
    - "8 services" was clarified
    - research gaps for the architect brief (IPv4 price, preview deploys, CSP per host, framework versions, Anthropic data handling)
    - the `/architecture` skill conflict was resolved: a scaffold plan comes before scaffolding
    - decisions had no ADR; ADR 0007 was added
    - smaller fixes: motion timings, accent parts, slug wording, gap references, the audit CTA, Lighthouse CI, alt text, prototype sharing
  - **Branch protection.**
    - A probe ruleset confirmed that GitHub enforces rulesets on this private repository: a push to a protected ref was declined.
    - The ruleset "Protect main" (PR required, no force push, no deletion, no bypass) is switched on as the last step of phase 0, after the final push.
    - From then on, every change reaches `main` through a PR.
