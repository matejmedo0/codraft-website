# 0022. Service icons on Home, drawn as the line reaches them

- **Status:** Accepted; point 3 superseded by [0023](0023-process-line-follows-the-screen.md)
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

The site uses drafting motifs instead of generic icon packs ([brand.md](../brand.md#imagery)). In the review of Home (batches 4 and 5) the client offered a set of custom icons, one per service in "Što radimo", and generated them from a prompt and specification Claude wrote: line drawings on a 48 px grid, navy strokes and one blue accent, a drafting line ending in a grip. The client delivered the nine icons and cleared them for use (batch 11). Claude showed two placements on `/lab/ikone` (batch 13), and the client chose option B. With it the client specified how the animation is triggered (batch 14): the line and the icons follow the scroll row by row, instead of the line's one stroke when the section arrives.

## Decision

1. **Each service in "Što radimo" on Home has its icon** (option B „Uz tekst“): beside its title and line, on the side that faces the central line, in a column of its own; the centred last service has its icon above it. 40 px, the line 1.5 px on screen, decorative (the title carries the meaning).
2. **The icons are the client's own,** kept as sources in `Assets/codraft-icons/`, without metadata, and transcribed into code unchanged.
3. **The line and the icons follow the scroll,** once and only forwards ([motion.md](../motion.md)): as each row of services crosses 85 % of the screen, the line grows to it over 280 ms, and its icons draw stroke by stroke 120 ms later, within 450 ms. The text is always visible. Without JavaScript, or with reduced motion, the line and the icons are complete.

## Consequences

- Phase 3 builds Home's "Što radimo" with the icons and this motion; the services page may reuse the icons (a decision for then).
- Two new motion tokens, `--motion-follow` (280 ms) and `--ease-follow`, for a part that catches up with the scroll; [motion.md](../motion.md) describes them.
- The Figma library gets the icons as components when it is synced with the review.
- The icons' licence: the client confirmed they may be used (2026-10-20). If they came from a generator, its terms for commercial use apply; the client keeps that record.
