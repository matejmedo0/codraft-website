# 0007. Launch scope and constraints

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

During phase 0 the client answered a set of questions that shape both the content and the architecture. ADRs 0002–0006 do not cover them. Phase 1 needs them as fixed inputs.

## Decision

- **Team.**
  - The site presents the real team, with photos: on the About page and in a strip on Home.
  - The client provides the photos and written consent.
  - The photo specification is in [brand.md](../brand.md#imagery).
- **Free audit flow.** Two steps:
  1. A short form. The lead is stored durably before any email is sent.
  2. Booking a time slot in a calendar, prefilled with the name and email from step 1.
- **AI assistant.**
  - A live chatbot demo is built in phase 4, on its own page (`/usluge/ai-asistenti`).
  - It answers only from approved content and discloses that it is an AI.
- **Budget and hosting constraints.**
  - Target: as close to €0/month as possible. A small paid EU host (for example a Hetzner VPS) is acceptable.
  - Forms and email handling are custom-built rather than bought as a form SaaS. Email is sent through a transactional email API, not a self-run mail server.
  - EU hosting is preferred.

## Consequences

- Phase 1 must choose a stack and hosting that can run a small backend for the forms and, later, the chatbot endpoint, within the budget.
- The booking tool, the email API and the analytics approach are chosen in phase 1 as ADR 0008 and later. Accounts and keys are created in phase 4, with the client's OK.
- The client must deliver team photos and consent before the About and Home pages are finished (phase 3).
- The chatbot needs a spend cap and abuse limits, set by the client in phase 4.
