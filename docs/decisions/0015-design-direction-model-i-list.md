# 0015. Design direction: „Model i list“ with a paper hero

- **Status:** Accepted
- **Date:** 2026-10-19
- **Deciders:** client (Codraft team), Claude

## Context

Phase 2 explored the visual direction in two rounds of coded prototypes (ADR 0005):
- **Round 1:** three directions, A "Nacrt", B "Noćni nacrt" and C "Studio". The client took none as is (phases/2-design-directions.md).
- **Round 2:** two hybrids on A's drawing sheet, D „Model i list“ and E „Nacrt s pojasom“ (phases/2-design-round-2.md). D has a navy header and hero, "Što radimo" as chapters on a process line, the free audit on paper and a navy closing call to action. E has a paper hero, "Što radimo" in three columns and a navy band for the free audit.

Open with the choice were the motion, the number of people in the team strip, the fonts and the corner radius (phases/2-design-system.md).

## Decision

The client decided on 2026-10-19.

1. **Direction: D „Model i list“, with the header and hero on paper.**
   - The base is A's drawing sheet: a frame with zone numbers along the top, zone letters in the margin, and the title block as the footer.
   - The header and hero are paper. The hero holds the headline beside a drawing on graph paper with the mark at mid size; the mark plays its entrance there ([ADR 0014](0014-logo-animation-web-copies-and-local-review.md)).
   - "Što radimo" reads as D's chapters: each stage a row with its number in a grid bubble, joined by a process line 01 → 02 → 03. Stage 01 holds its two items; E's stage 01 panel is not used.
   - The free audit sits on paper, with its three steps as grips joined by a line.
   - The CAD section shows the drawing on graph paper, built layer by layer.
   - **Navy as a surface appears once on a page, as the closing call to action.** Everywhere else navy is the ink: lettering, lines, the frame and the primary buttons.
2. **Motion: all four moments, as built in round 2.** The logo entrance in the hero, the CAD drawing in layers (3.2 s), the section transitions (a CAD selection of the zone rule, about 2 s) and the lines through the steps. Each plays once, in its own section, and reduced motion shows the final states. The timings are in phases/2-design-round-2.md and become the motion tokens.
3. **The team strip on Home shows two people.**
4. **Fonts: Archivo is the only family.** One self-hosted variable WOFF2, with the width axis narrowed to 75–100 % and the weight axis to 400–700. Headings use the semi-condensed width, labels the condensed one.
5. **Corner radius: 2 px** on controls and panels: buttons, form fields, the menu button, panels and cards. The drawing vocabulary stays square: the sheet frame, zone rules, the title block, grips and drawing boxes. Grid bubbles stay circles.
6. **The lab keeps A–E** as the record of both rounds.

## Consequences

- The design tokens, the base components and the style page follow this direction (phase 2, steps 3–7). The hybrid D's code in `src/lab/hybrid/` is the reference; the lab itself never ships.
- Phase 3 builds Home in this order and composition. Other pages use the same sheet, with navy at most once, as the closing call to action.
- The principle "corner radius 0–2 px, to be confirmed" in [motion.md](../motion.md) is settled at 2 px.
- The client's computer has Windows "Animation effects" switched off, so Chrome reports reduced motion and the client has not yet seen the motion. A review of the motion with the setting on (or emulated in DevTools) is still open; changes to the timings change tokens only.
- The team strip's two places wait for the photos, names and roles in phase 3 (G3); [ADR 0007](0007-launch-scope-and-constraints.md) stands.
