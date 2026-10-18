# 0004. Trust from verifiable proof only

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

Codraft is new. It has no public web projects to show. It does have CAD work, but the client is not sure past clients allow showing it. Studio sites often fill this gap with testimonials, logos or numbers that can't be checked. That is dishonest. In the EU it is also unlawful (fake reviews are banned by UCPD Annex I, points 23b–23c). And it hurts a small studio's credibility the moment someone checks.

## Decision

The site builds trust only from things a visitor can verify. The full list is in [information-architecture.md](../information-architecture.md#trust-without-a-web-portfolio):

- **In-house sample drawing sheets** made for the site, clearly labelled "Uzorak izrađen za Codraft — nije rad za klijenta", and shown in a layer viewer.
- **Past CAD work only with written permission:** full, anonymised, or not at all.
- **The site itself as a showcase:** measured, dated numbers in the About page's `#ova-stranica` section.
- **The live AI assistant demo** (phase 4).
- **A labelled sample audit report.**
- **Transparent process and terms.**
- **A real team** with real photos.
- **Company registration data** in the footer.
- **Launch-partner case studies,** disclosed as such.

**Never:**
- fake or unverified testimonials
- stock or AI-generated "team" photos
- client logos without permission
- invented numbers
- "trusted by" bars

## Consequences

- At launch the site leans on process, team, samples and demos rather than social proof.
- The client needs to produce the sample sheets and the team photos (see `PROGRESS.md`).
- Case studies come later (phase 8), from real projects with permission.
- Phase 6 checks the copy against this rule.
