# 0014. Logo animation, web copies of the marks, and local design review

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

Phase 2 opened with three questions for the client ([phases/2-design.md](../phases/2-design.md), inputs).

**Logo animation.** The brand package README forbids effects on the marks. The motion concept ([motion.md](../motion.md)) proposes one exception: a one-time entrance in which the blue drafting line draws and completes the "f" and "t" crossbars, then the grip snaps in, always ending on the exact mark.

**C2PA metadata.** Every master in `Assets/codraft-brand/` carries a C2PA content-credentials manifest. In the SVGs it is a `<metadata>` block; the PNGs in `web/`, `icon-small/` and `wordmark/` embed one too. Inspected on 2026-10-19:
- The claim generator is "Anthropic Files", signed with an "Anthropic Claude Content Signing" certificate. The manifest says that Claude provided the file at a user's request and may have created or modified its contents.
- The hard binding is a hash of the file's bytes (`c2pa.hash.data`). Any optimised, recoloured or split copy no longer validates against it.
- In the primary wordmark SVG the block is 7,737 of 10,923 bytes. Gzipped, the file is 3,537 bytes with it and 1,377 without.

**Private preview.** With the VPS ([ADR 0009](0009-hosting-ovhcloud-vps-eu.md)), an online preview of the prototypes would need the domain and the server now. The client builds the site with one colleague, so nobody else needs to review it remotely.

## Decision

1. **The logo entrance is approved, on the home page only.**
   - The hero wordmark plays the entrance once per page load: the drafting line reveals from the left, then the grip snaps in ([motion.md](../motion.md)).
   - The header logo and every other placement of a mark stay static.
   - With `prefers-reduced-motion: reduce`, the complete mark appears at once.
   - The animated copy splits the accent into three paths (c-arc, line, grip) with the master's geometry, so the last frame is the exact mark.
   - Nothing is stored on the visitor's device to remember that the entrance played, so it raises no consent question.
2. **The web copies carry no C2PA metadata.** This covers every SVG and PNG the site serves, the favicon set included. The masters keep their manifests and stay untouched; they remain the provenance record in the repository.
3. **No online preview in phase 2.** The client reviews the prototypes on localhost and through the screenshots in the phase report. The server and the domain are ordered when the plan already needs them: the server for the phase 6 audit preview, the domain by phase 7 at the latest.

## Consequences

- The README's "no effects on the marks" rule has exactly one exception: the home hero entrance. Any other motion on a mark needs a new ADR.
- Web copies are much smaller, and the C2PA statement is not served with the site. Anyone who needs the provenance can check the masters.
- The PNG web copies are re-encoded without their metadata chunks; the SVG copies drop the `<metadata>` block.
- Prototype review stays on this machine, so phase 2 needs no account, order or deploy.
