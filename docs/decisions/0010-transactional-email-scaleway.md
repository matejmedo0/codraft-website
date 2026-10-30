# 0010. Transactional email: Scaleway

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

Every audit or contact submission sends two emails: a notification to the team and a localised confirmation to the sender ([ADR 0007](0007-launch-scope-and-constraints.md)). Email goes through an API, never a self-run mail server. Expected volume is about 50–600 emails a month. EU data processing is preferred, and the budget ceiling is €10 a month ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md)).

The research (research/2026-10-19-hosting.md) shortlisted three EU providers with permanent free tiers:
- **Scaleway** (Paris): 300 emails a month free, then €0.25 per 1,000; all data in the EU.
- **AhaSend** (Amsterdam): 1,000 a month free.
- **Mailjet** (France): 6,000 a month free.

US providers were ruled out: Resend stores data in the US even when sending from the EU, and Postmark has US servers only.

## Decision

The client confirmed on 2026-10-19:
- Transactional email goes through **Scaleway Transactional Email** (region fr-par) over its HTTPS API.
- The code sends through an `EmailSender` interface, so AhaSend or Mailjet can replace Scaleway without touching the form logic.

## Consequences

- **Cost:** about €0 at the expected volume; above 300 emails a month it costs cents.
- **Order of operations:** a lead is stored before any email is sent (outbox), and failed sends are retried, so an email outage never loses a lead.
- **Abuse protection:** every confirmation goes to an address the visitor typed, so the forms need:
  - a honeypot and per-IP rate limits
  - a global daily cap
  - a short confirmation without links that repeats nothing the visitor typed

  Without these, the sending account can be suspended for abuse.
- **The domain must exist and be verified with Scaleway** before the forms send real email in phase 4. SPF and DKIM are required. One SPF record must cover both Scaleway and the mailbox provider ([ADR 0013](0013-mailboxes-zoho-mail-lite.md)); Scaleway does not follow nested includes. DMARC is added in phase 7.
- **Accounts:** the Scaleway account and API key are created in phase 4, with the client's OK.
- **Privacy notice:** names Scaleway as a processor.
