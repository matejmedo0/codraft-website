# 0013. Mailboxes: Zoho Mail Lite (recommended provider)

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

The team needs mailboxes on `codraft.hr`:
- a personal address per person
- `info@` for enquiries (research/2026-10-18-domain-and-name.md)

The budget ceiling is €10 a month in total ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md)). EU data is preferred.

The research of 2026-10-19 (research/2026-10-19-hosting.md) compared these options:

| Option | Price | Why not chosen |
|---|---|---|
| Zoho Mail Free | €0 | Web and mobile only, at most 5 users |
| **Zoho Mail Lite** | €0.90 per user per month, billed yearly, excl. VAT | Chosen: IMAP, EU data centre |
| Exchange Online Plan 1 | €3.50 per user | Fits the budget for one user only |
| Google Workspace | €6.80 per user | Over budget |
| Forwarding to Gmail with "Send as" | €0 | Ends in January 2027 |

## Decision

The client confirmed on 2026-10-19:

- **Recommended provider:** Zoho Mail Lite (5 GB per user) in Zoho's EU data centre.
- **`info@`:** set up as an alias or group.

## Consequences

- **Cost:** about €1.13 per user per month incl. VAT. With the server and the phase 4 chatbot, three users come to about €9.96 a month.
- **Ownership:** mailboxes belong to the company account, not to personal accounts.
- **Setup timing:** mailboxes are set up in phase 7, or earlier if the domain is bought sooner. The client creates the account.
- **DNS:** MX, SPF, DKIM and DMARC records come with the domain setup. One SPF record covers Zoho and Scaleway ([ADR 0010](0010-transactional-email-scaleway.md)).
