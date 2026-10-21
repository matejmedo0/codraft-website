# 0020. Drawings and sketches arrive by email, not through the site

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

Drafting work starts from the customer's files: sketches, scans, markups and earlier drawings ([ADR 0018](0018-drafting-for-architecture-and-construction.md)). The contact form (phase 4, with the topic "Tehničko crtanje") was planned as text only, and `PROGRESS.md` listed for phase 4 "potvrda da se datoteke ne učitavaju kroz formu". In the review of Home (batch 9), the drafting zone's button became "Pošaljite skicu", and Claude noted that sending a sketch needs a way to send files.

The client answered on 2026-10-20: "nećemo direktno preko stranice to raditi to preko mail forme neko nam može putem maila poslati". In other words, files don't go through the site; a customer emails them.

## Decision

1. **The site takes no file uploads.** The contact form stays text only, on every topic.
2. **Drawings, sketches and other files come by email** to Codraft's address. The form's confirmation and the drafting page say so in phase 3 and 4, with the address (PROGRESS.md, item B).
3. "Pošaljite skicu" on Home is prototype copy; the client may drop it before launch.

## Consequences

- The form, its server and the security review stay simpler: no upload limits, malware scanning or file storage on the VPS ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md)).
- Files sit in the mailboxes ([ADR 0013](0013-mailboxes-zoho-mail-lite.md)), so the privacy policy names email as the channel for files, and the mailbox limits apply to large drawings.
- The phase 4 question about files in the form is answered.
