# 0025. Browser-drawn details in brand colours, and a re-check for critiques

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

The client asked for a critical evaluation of the outside skill Impeccable ([research/2026-10-20-impeccable-skill.md](../research/2026-10-20-impeccable-skill.md)) before adding it. Its writing is strong, but as a package it doesn't fit:
- Its new-design flow assumes an open direction, and the direction is chosen (ADR 0015).
- Its taste and detector work against recorded decisions: the graph paper, 01/02/03, the paper ground, several moments of motion.
- It calls an outside API, with telemetry on by default.
- It runs a downloaded binary after every edit.
- It overlaps `frontend-design` and `design-critic` (ADR 0024).

Four of its ideas fit the project. The client approved them: „implementiraj točke 1-4 … koje imaju koristi za naš projekt“.

## Decision

1. **Impeccable is not installed:** neither the skill, nor its hook, nor its detector. A one-off manual detector run in phase 5 or 6 stays an option for the client.
2. **What the browser draws takes the brand's colours** (`src/styles/base.css`, tokens in `tokens.css`):
   - **Selected text** sits on a tint of the brand blue, like a selection in CAD: `#C4D3F5` on paper and `#1D3F8C` on navy. It always takes the surface's ink, navy at 11.50:1 and off-white at 8.98:1, so links and grey text stay readable while selected.
   - **The text cursor** in fields is the brand blue (`--accent`).
   - Both pairs are in `tokens.test.ts` and on `/lab/style`.
3. **`design-critic` checks three more things:**
   - **What the browser draws** (criterion 8): selection, cursor, focus, underline, tabular figures, and from phase 4 the form controls.
   - **A heading belongs to what follows it** (criterion 4): more space above it than below. The capture's `metrics.json` now gives each text block's height, so the critic can measure this.
   - **Reduced motion removes movement, not meaning** (criterion 7, and `docs/motion.md`).
4. **A re-check after approved changes** (`design-critic`, "Re-check"; `docs/design-critique.md`, step 7):
   - The critic scores each addressed finding resolved, partial or unresolved from a new capture.
   - It names at most three regressions and doesn't hunt for new findings.
   - The session's own account of its fixes is not evidence.
5. **The capture shows selected text** on paper and on navy, at 375 and 1440 px (`state-selection-*.png`).

## Consequences

- **The details where a page shows care** now follow the brand instead of the browser. Forms in phase 4 get the cursor colour for free. Their checkboxes and radios (`accent-color`) are left for phase 4, where the critic now asks about them.
- **A critique round can close properly:** the client sees which findings a change resolved, not the session's description of them.
- **The Figma library** gains the two selection colours at its next sync (an open item of the phase 2 review).
- **Outside ideas enter the project only through our own files and rules,** so they follow the client's decisions rather than another tool's taste.
