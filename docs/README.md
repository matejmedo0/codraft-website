# Codraft documentation

This folder is the project's durable memory. A new person or a new Claude session should be able to continue from these files alone, without the chat history.

## Start here

1. **[PROGRESS.md](../PROGRESS.md)** (Croatian): current phase, next step, decisions, and what we need from the client.
2. **[phases/README.md](phases/README.md):** the roadmap. Then open the current phase's document.
3. **[.claude/rules/codraft-workflow.md](../.claude/rules/codraft-workflow.md):** how Claude works here: phases, gates, authority, skills and agents.

## Map

| File | What it holds |
|---|---|
| [phases/](phases/README.md) | Roadmap, risk register, and one document per phase (0–8): goal, inputs, steps, deliverables, exit criteria, log. Phase 1 also has its [architecture options](phases/1-architecture-options.md) with costs. |
| [information-architecture.md](information-architecture.md) | Sitemap and URLs (HR/EN), navigation, i18n rules, section outline of every page, keyword map, trust strategy without a portfolio |
| [content.md](content.md) | All site copy: rules, glossary, EN source (verbatim) and HR draft per block, suggestions, content gaps, editorial notes, changelog |
| [brand.md](brand.md) | Brand marks and usage, colours and contrast, proposed text tokens, typography requirements, imagery rules, logo-animation and C2PA questions |
| [motion.md](motion.md) | The motion concept (CAD actions), principles, reduced motion, starting tokens, what is ruled out |
| [compliance.md](compliance.md) | Croatian and EU requirements with sources and confidence; copy guardrails; checks by phase |
| [architecture.md](architecture.md) | Repository layout, principles for the application code, planned integrations; completed in phase 1 |
| [decisions/](decisions/README.md) | Architecture Decision Records (ADRs), with index and template |
| [research/](research/) | Dated research notes with sources: [hosting and services, 2026-10-19](research/2026-10-19-hosting.md) (supersedes [2026-10-18](research/2026-10-18-hosting.md)), [scaffold toolchain, 2026-10-19](research/2026-10-19-scaffold-toolchain.md), [domain and name](research/2026-10-18-domain-and-name.md) |
| [plans/](plans/) | Snapshots of approved plans, verbatim and never updated (Croatian): [2026-10-18](plans/2026-10-18-approved-plan.md) (phase 0 and the roadmap), [2026-10-19 scaffold plan](plans/2026-10-19-scaffold-plan.md) (phase 1, steps 4–8) |

## Plan coverage

The plan approved on 2026-10-18 (snapshot: [plans/2026-10-18-approved-plan.md](plans/2026-10-18-approved-plan.md)) is fully captured in the living docs:

| Plan section | Lives in |
|---|---|
| Context and decisions | [PROGRESS.md](../PROGRESS.md), [ADRs 0002–0006](decisions/README.md) |
| 1 Site structure | [information-architecture.md](information-architecture.md), [ADR 0003](decisions/0003-launch-sitemap.md) |
| 2 Trust without a portfolio | [information-architecture.md](information-architecture.md#trust-without-a-web-portfolio), [ADR 0004](decisions/0004-verifiable-proof-only.md) |
| 3 Croatian terminology | [content.md §1](content.md#1-glossary-hr--en) |
| 4 Suggestions for the English copy | [content.md §3](content.md#3-suggestions-for-the-english-copy) |
| 5 Assets and content | [brand.md](brand.md), [content.md §4](content.md#4-content-gaps); the client's to-do list in [PROGRESS.md](../PROGRESS.md) |
| 6 Domain | [research/2026-10-18-domain-and-name.md](research/2026-10-18-domain-and-name.md) |
| 7 Phase 0 execution | [phases/0-foundation.md](phases/0-foundation.md) |
| 8 Phases 1–8 | [phases/1-architecture.md](phases/1-architecture.md) … [phases/8-maintenance.md](phases/8-maintenance.md), [motion.md](motion.md), [compliance.md](compliance.md), [research/2026-10-18-hosting.md](research/2026-10-18-hosting.md) |
| 9 Risks | [phases/README.md](phases/README.md#risk-register) |
| 10 Open questions | [PROGRESS.md](../PROGRESS.md) and the "Inputs" table of each phase |
| Code structure | [architecture.md](architecture.md) |
| Git and GitHub | [CONTRIBUTING.md](../CONTRIBUTING.md), [ADR 0006](decisions/0006-github-repo-and-phase-branches.md) |
| Launch scope (team photos, audit flow, AI demo, budget) | [ADR 0007](decisions/0007-launch-scope-and-constraints.md) |

**Where the living docs differ from the snapshot.** Each change is deliberate and refines the plan; none reverses it.
- Suggestions grew from S1–S15 to S1–S16. The plan's local e-invoicing idea became S16.
- ADR 0007 records the launch scope. Before it, those decisions had no ADR.
- The free audit page's primary CTA is "Nastavite na odabir termina", because the flow starts with the form.
- Lighthouse CI is added in phase 6.
- The phase 6 guardrail check uses a regex that covers inflected forms ([compliance.md](compliance.md#copy-guardrails)).

## Conventions

**Language**
- Docs, code, comments and commit messages are in English.
- `PROGRESS.md` is in Croatian, for the client.
- Site copy lives in [content.md](content.md): the EN source plus the HR translation.

**Dates:** ISO format, `YYYY-MM-DD`.

**Where things go**
- **A decision:** a new ADR in [decisions/](decisions/README.md), plus one line in `PROGRESS.md`. Accepted ADRs are never rewritten; a new ADR supersedes an old one.
- **A fact from research:** `research/YYYY-MM-DD-topic.md`, with the source URL and a confidence rating. Notes are not edited later. A newer dated note supersedes an older one; add "Superseded by …" at the top of the old note.
- **Progress within a phase:** the phase document's status and log, and `PROGRESS.md`.
- **Nothing important lives only in chat.** If it matters, it goes into these files before the phase ends.
