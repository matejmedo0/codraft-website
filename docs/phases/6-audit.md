# Phase 6: Pre-launch audit (Audit)

- **Status:** Not started
- **Branch:** `phase/6-audit`

## Goal

Run an independent audit before launch and fix what the client approves.

## Inputs

- The finished site.
- A preview URL, if the hosting provides one (planned in phase 1).

## Steps

1. **`/audit` procedure:** `seo-specialist`, `a11y-architect`, `performance-optimizer` and `security-reviewer` in parallel, against the preview URL where one exists.
   - Add Lighthouse CI to the pipeline at the same time, with budgets for LCP, CLS, total JS and accessibility score.
2. **`/security-review`** on the whole branch.
3. **Compliance checks** ([compliance.md](../compliance.md#checks-by-phase)):
   - The impresum matches ZTD Art. 21 and ZET Art. 6.
   - The processors listed in the privacy policy match the actual network calls.
   - The cookie policy matches the actual cookies.
   - The AI disclosure is present.
   - The guardrail regex in [compliance.md](../compliance.md#copy-guardrails) finds nothing in the site's source and locale files.
   - A manual read of the EN drafting copy finds no design-of-record claims.
   - The English copy on the site equals the approved [content.md](../content.md).
   - No invented proof ([ADR 0004](../decisions/0004-verifiable-proof-only.md)).
4. **Measure the site** and write the `#ova-stranica` section on the About page (gap G18) with the dated numbers.
5. **Finalise the accessibility statement**, dated and based on the audit.
6. **Fix only the items the client approves.**

## Deliverables

- The audit report
- Approved fixes
- `#ova-stranica` content
- The final accessibility statement

## Exit criteria

- [ ] No BLOCKERS.

## Log

_Not started._
