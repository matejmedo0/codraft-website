# 0036. The new Home's drafting scene: a residential building, played on arrival

- **Status:** Accepted; supersedes the pinned, scroll-scrubbed house plan of [0035](0035-new-home-drawn-by-the-scroll.md) and the scroll-driven stages of "Što radimo" (M26, M27)
- **Date:** 2026-10-30
- **Deciders:** client (Codraft team), Claude

## Context

ADR 0035 made the new Home's drafting zone a pinned scene in which the scroll drafted the house plan, and M26–M27 made the stages of "Što radimo" slide in with the scroll. The client then asked (M28 in `docs/phases/3-pages.md`) that the section not move with the scroll but play its animation once on arrival, and that the drawing be a residential building of four storeys with a penthouse, a courtyard with a pool on one side and parking on the other, followed by its sections and the gross floor area and volume.

## Decision

- **On arrival, not with the scroll.** The drafting scene and the stages of "Što radimo" each play once when they come into view (`building/building-scene.ts`, `reveal.ts`). Nothing in either is pinned or scrubbed. Without JavaScript, with reduced motion, or when already scrolled past on load, they show their final state.
- **The building** (`src/views/new-home/building/`): a 52 × 32 m site with the building in the middle (24 × 12 m, ground floor and three floors, 3 m storeys, and a penthouse of 16 × 10 m set back on top, 15 m high), a courtyard with a pool on the west and a row of eleven parking bays on the east. Its site plan draws element by element, turns and tilts into a 3D view (the house plan's projection), and the storeys come down one on the other, the penthouse last; the height is dimensioned.
- **Then, under the text on the left:** sections A–A and B–B, drawn storey by storey with the storeys' levels, and a table of gross floor area and volume per storey with the totals (1.312 m², 3.936 m³), computed from the same model as the drawing.
- Everything is labelled as an illustration (ADR 0004). The current Home's house plan is unchanged.

## Consequences

- `plan-scrub.ts` is removed; the new Home no longer uses `PlanDrawing.astro`.
- The areas follow a simple rule stated under the table (outer plan dimensions; volume = area × storey height); they illustrate the work and are not a calculation under any regulation.
- The other zones' scroll-driven details (the pen on the left frame, the row rules in "Kako radimo", the closing line) stay until the client says otherwise.
