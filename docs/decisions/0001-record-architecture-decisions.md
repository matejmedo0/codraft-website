# 0001. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

Several people will build this site over several phases, together with Claude Code. Claude starts each chat session without memory of earlier ones. If decisions and their reasons live only in chat history, they get lost, re-argued or contradicted. The client explicitly asked that the complete plan be written down so that nothing is lost between sessions.

## Decision

- Every significant decision is recorded as an Architecture Decision Record in `docs/decisions/`, using the template in [README.md](README.md).
- Significant means anything that is costly to reverse or that a newcomer would ask "why?" about: stack, hosting, URLs, data, third-party services, content policy, workflow.
- Each ADR gets one line under "Odluke" in `PROGRESS.md`.
- Facts gathered by research go to `docs/research/YYYY-MM-DD-topic.md`, with sources and dates. The ADR links to them.

## Consequences

- A new session reads `CLAUDE.md` → `PROGRESS.md` → the current phase document → the linked ADRs, and has the full reasoning.
- It adds a small writing step to each decision.
- Accepted ADRs are never rewritten. Changes come as new ADRs that supersede old ones, so the history stays readable.
