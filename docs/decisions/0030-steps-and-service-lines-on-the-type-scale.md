# 0030. The steps' titles and the services' lines on the type scale

- **Status:** Accepted
- **Date:** 2026-10-22
- **Deciders:** client (Codraft team), Claude

## Context

Home had two type sizes of its own, outside the scale in `src/styles/tokens.css`: `--step-heading` for the titles of the free audit's steps (`Steps.astro`; 20 px on phones, 25 px at 1440 px) and `--step-service` for the services' one-line descriptions in "Što radimo" (`services.css`; 17–19 px, below 64rem). With `--step-title` at 19–22 px they made three sizes about 3 px apart (inspector's note). The client moved the decision to phase 3 (review #59). Claude put two options to the client: A, merge each into its neighbour on the scale; B, keep both and name them as tokens. The client chose A (phase 3, M3: „Idemo po A preopruci za lokalne veličine slova“).

## Decision

1. **The steps' titles use `--step-title`,** like every other item title: 19 px on phones, 22 px at 1440 px (were 20 and 25).
2. **The services' lines use `--step-lead` at every width.** From 64rem nothing changes (they already were at the lead size, review #102); on phones they grow by 1–2 px.
3. The services' titles in "Što radimo" keep their larger size from 64rem (about 24 px at 1440, the client's choice in review #102).

## Consequences

- The type scale has no local sizes left besides #102's.
- On Home, "Što radimo" is 53 px taller at 375 px and 30 px at 768 px; from 1024 px the zone heights don't change. The steps change wherever `Steps.astro` is used, the lab included.
