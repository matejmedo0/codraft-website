# Phase 0: Foundation (Temelji)

- **Status:** Done (2026-10-18). Waiting for the client's go-ahead for phase 1.
- **Branch:** `main` (initial commits; the repository was created in this phase)

## Goal

Agree what we are building and set up a professional repository: sitemap, copy source of truth, asset inventory, the client's decisions, complete documentation of the plan by phase, and a GitHub repository.

## Inputs

| Input | Status | Source |
|---|---|---|
| Service copy (EN) | Received 2026-10-18 | Client message, saved verbatim in [content.md](../content.md#appendix-a-original-copy-as-received-2026-10-18) |
| Brand package | Final | `Assets/codraft-brand/` |
| Languages, market, domain, proof of work, team, audit flow, chatbot, budget | Decided 2026-10-18 | Q&A with the client (see `PROGRESS.md`) |
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
5. Record the decisions as ADRs 0001–0006.
6. Write the research notes: hosting and domain.
7. Write the phase documents 0–8, [motion.md](../motion.md), [compliance.md](../compliance.md) and [architecture.md](../architecture.md).
8. Add `README.md`, `CONTRIBUTING.md` and the `.github/` templates.
9. Update `CLAUDE.md`, the workflow rules and `PROGRESS.md`.
10. Snapshot the approved plan to [plans/2026-10-18-approved-plan.md](../plans/2026-10-18-approved-plan.md).
11. Run the exit checks, including a fresh-session test.
12. Commit, create the private GitHub repository, push, and configure the repository settings.
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

- [ ] Sitemap, asset gaps and decisions are recorded in `PROGRESS.md` (the workflow's criterion).
- [ ] The EN blocks in `content.md` match the client's text character for character. The EN and HR block counts are equal; all HR blocks are `draft` and all suggestions `pending`.
- [ ] Every row of the coverage map in [docs/README.md](../README.md#plan-coverage) points to an existing file with real content. All relative links resolve.
- [ ] Fresh-session test: an agent with no chat context reconstructs the plan from the repository alone.
- [ ] `.env*` (except `.env.example`), `node_modules`, build output and `.claude/settings.local.json` are ignored. `Assets/` and `.claude/rules/` are tracked.
- [ ] No application code exists yet: no `package.json`, lockfile or `.claude/settings.json`.
- [ ] The GitHub repository is private, `main` is pushed, and the settings are applied.

## Log

- **2026-10-18:**
  - Q&A with the client: HR + EN, market Croatia, no domain yet, CAD work only (permission unclear), team with photos, audit = form then booking, chatbot in phase 4, budget ≈ €0 (Hetzner acceptable, custom forms/email).
  - Plan approved, with three additions: professional structure, complete docs for session continuity, GitHub repository.
  - Planning agent report used as source material.
  - Verified myself: codraft.dev is a live "Codraft" AI tool; codraft.com is registered (RDAP); Hetzner CX23 price (€5.49 excl. VAT); Vercel Hobby is non-commercial.
