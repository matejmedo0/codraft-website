# Phase 4: Integrations (Integracije)

- **Status:** Not started
- **Branch:** `phase/4-integrations`

## Goal

Make the site work end to end: the free audit flow (form, then booking), the contact form, transactional email, cookie consent with analytics blocked until consent, and the AI assistant demo with its own page.

## Inputs

| Input | Status | Where |
|---|---|---|
| Stack, hosting, email and booking choices | From phase 1 (ADRs) | [decisions/](../decisions/README.md) |
| **Accounts and keys** (email API, booking tool, Anthropic API) | "Ask first" items: the client approves and creates or provides them | — |
| **Chatbot monthly spend cap** | Client decision needed | — |
| **No file uploads at launch** (CAD files arrive by email or link) | Proposal; client to confirm | — |
| Compliance requirements | Collected | [compliance.md](../compliance.md) |

## Steps

**1. Audit form (step 1).** Load `api-design` and `error-handling`.
- **Fields:**
  - name and email
  - company (optional)
  - website (optional, with an "I don't have a website" option)
  - what they're interested in (checkboxes)
  - message (optional)
  - honeypot
- **Validation:** Zod on the client and on the server, plus rate limiting.
- **Save the lead durably before sending any email.** An email outage must never lose a lead.
- **Privacy:** a link to the privacy notice. No consent checkbox is needed, because the legal basis is steps before a contract (C5).

**2. Booking (step 2).**
- The booking embed loads only on an explicit click, with name and email prefilled.
- If the visitor leaves at this step, the lead from step 1 is kept, and the microcopy says they will be contacted by email.

**3. Contact form**
- A topic field: Web i softver / Tehničko crtanje / Ostalo.
- For CAD it adds work type, sheet count, deadline and formats.
- Same pipeline as the audit form.

**4. Email**
- A team notification and a localised confirmation to the sender, sent through an email API (never a self-run mail server).

**5. Cookie consent and analytics**
- The first layer shows "Prihvati sve" and "Odbij sve" with equal weight, plus "Postavke".
- No pre-ticked boxes; consent can be withdrawn from the footer.
- No analytics or third-party script loads before consent; scripts load async or deferred.
- Verify with Playwright's network log.

**6. AI assistant**
- Load `claude-api` **before writing any code**.
- **What it does:**
  - answers only from approved content in [content.md](../content.md)
  - declines prices or commitments that are not in the copy
  - hands off to the audit form
- **AI disclosure at the first message** (EU AI Act Art. 50(1); C6).
- **Limits:** caps per IP and per day, and a monthly spend cap.
- **Data:** minimal logs with short retention. The privacy policy names the AI provider and the data transfer.
- **Page:** `/usluge/ai-asistenti` (EN `/en/services/ai-assistants`), with the live demo and a "Kako radi" panel (gap G29).

**7. Database.** Only if one is needed: `postgres-patterns`, `database-migrations`, `database-reviewer`.

**8. Reviews.** `security-reviewer` and `silent-failure-hunter` always review the forms and the chatbot endpoint.

## Deliverables

- Working audit and contact flows
- Email
- Consent manager
- Analytics behind consent
- AI assistant page and endpoint
- ADRs for any new service choices

## Exit criteria

- [ ] The audit form works end to end locally: validation, lead stored, emails sent, booking prefilled.
- [ ] Analytics and booking stay blocked until consent or a click, verified in the network log.
- [ ] The chatbot shows the AI disclosure and respects the caps.
- [ ] No open CRITICAL or HIGH findings from `security-reviewer` and `silent-failure-hunter`.

## Log

_Not started._
