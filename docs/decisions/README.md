# Architecture Decision Records

Each significant decision gets a short record here, so the reasoning survives across people and sessions. Format: [Michael Nygard's ADR](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (see [0001](0001-record-architecture-decisions.md)).

## Index

| # | Decision | Status | Date |
|---|---|---|---|
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted | 2026-10-18 |
| [0002](0002-croatian-default-english-secondary.md) | Croatian is the default language, English secondary | Accepted | 2026-10-18 |
| [0003](0003-launch-sitemap.md) | Launch sitemap: one Services page with anchors | Accepted (slugs provisional) | 2026-10-18 |
| [0004](0004-verifiable-proof-only.md) | Trust from verifiable proof only | Accepted | 2026-10-18 |
| [0005](0005-design-review-with-coded-prototypes.md) | Design directions are reviewed as coded prototypes | Accepted | 2026-10-18 |
| [0006](0006-github-repo-and-phase-branches.md) | Private GitHub repository, one branch and PR per phase | Accepted | 2026-10-18 |
| [0007](0007-launch-scope-and-constraints.md) | Launch scope and constraints: team photos, audit flow, AI demo, budget | Accepted | 2026-10-18 |
| [0008](0008-stack-astro-with-react-islands.md) | Stack: Astro with React islands, static-first | Accepted | 2026-10-19 |
| [0009](0009-hosting-ovhcloud-vps-eu.md) | Hosting: an OVHcloud VPS in the EU (budget ceiling €10/month) | Accepted | 2026-10-19 |
| [0010](0010-transactional-email-scaleway.md) | Transactional email: Scaleway | Accepted | 2026-10-19 |
| [0011](0011-analytics-goatcounter-after-consent.md) | Analytics: self-hosted GoatCounter after consent, plus Search Console and Bing | Accepted | 2026-10-19 |
| [0012](0012-booking-easy-appointments.md) | Booking: self-hosted Easy!Appointments | Accepted | 2026-10-19 |
| [0013](0013-mailboxes-zoho-mail-lite.md) | Mailboxes: Zoho Mail Lite (recommended provider) | Accepted | 2026-10-19 |
| [0014](0014-logo-animation-web-copies-and-local-review.md) | Logo animation, web copies of the marks, and local design review | Accepted | 2026-10-19 |
| [0015](0015-design-direction-model-i-list.md) | Design direction: „Model i list“ with a paper hero | Accepted | 2026-10-19 |
| [0016](0016-figma-for-design-iterations.md) | Figma for quick design iterations | Accepted | 2026-10-19 |
| [0017](0017-one-audit-call-to-action-per-page.md) | One free-audit button per page | Accepted | 2026-10-19 |
| [0018](0018-drafting-for-architecture-and-construction.md) | Drafting: „Tehničko crtanje“ for architecture and construction | Accepted | 2026-10-19 |
| [0019](0019-drafting-adds-3d-models.md) | The drafting offer adds 3D models | Accepted | 2026-10-19 |
| [0020](0020-drawings-arrive-by-email.md) | Drawings and sketches arrive by email, not through the site | Accepted | 2026-10-20 |
| [0021](0021-the-customer-owns-the-work.md) | The customer owns the code, drawings, domain and access | Accepted | 2026-10-20 |
| [0022](0022-service-icons-on-home.md) | Service icons on Home, drawn as the line reaches them | Accepted; point 3 superseded by 0023, point 1 on phones by 0028 | 2026-10-20 |
| [0023](0023-process-line-follows-the-screen.md) | The process line follows the screen continuously | Accepted | 2026-10-20 |
| [0024](0024-independent-design-critique.md) | Independent design critique by a project agent | Accepted | 2026-10-20 |
| [0025](0025-browser-details-and-critique-re-check.md) | Browser-drawn details in brand colours, and a re-check for critiques | Accepted | 2026-10-20 |
| [0026](0026-emil-kowalski-skills-in-the-setup.md) | Four of Emil Kowalski's skills in the setup | Accepted | 2026-10-20 |
| [0027](0027-taste-skill-ideas-in-the-setup.md) | Ideas from Taste Skill in the critic, the animate skill and phase 3 | Accepted | 2026-10-20 |
| [0028](0028-service-icons-on-phones-beside-the-title.md) | On phones, a service's icon sits beside its title only | Accepted | 2026-10-21 |
| [0029](0029-english-naming-spelling-and-titles.md) | English: "Architectural Drafting", British spelling, "Croatia" in titles | Accepted | 2026-10-22 |
| [0030](0030-steps-and-service-lines-on-the-type-scale.md) | The steps' titles and the services' lines on the type scale | Accepted | 2026-10-22 |
| [0031](0031-autonomous-work-from-phase-3.md) | Claude works autonomously from the middle of phase 3 | Accepted | 2026-10-22 |
| [0032](0032-guide-prices-below-the-market.md) | Guide prices on the site, about 10% below the market | Accepted | 2026-10-22 |

Next number: **0033**.

## How to add one

1. Copy the template below into `NNNN-short-title.md` (kebab-case, next free number).
2. Fill it in. Keep it short; link to research in `docs/research/` instead of repeating it.
3. Add a row to the index above and one line under "Odluke" in `PROGRESS.md`.
4. Never rewrite an accepted ADR. To change a decision, write a new ADR that supersedes it, and set the old one's status to "Superseded by NNNN".

## Template

```markdown
# NNNN. Title

- **Status:** Proposed | Accepted | Superseded by NNNN
- **Date:** YYYY-MM-DD
- **Deciders:** client (Codraft team), Claude

## Context

What is the situation and what forces are at play?

## Decision

What we decided, stated plainly.

## Consequences

What becomes easier or harder; follow-up work; risks.
```
