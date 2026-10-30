# 0028. On phones, a service's icon sits beside its title only

- **Status:** Accepted
- **Date:** 2026-10-21
- **Deciders:** client (Codraft team), Claude

## Context

[ADR 0022](0022-service-icons-on-home.md) point 1 puts each service icon in "Što radimo" beside its title and its line, in a column of its own. On desktop the column faces the central line and works. On phones the line runs down the left, so its indent and the icon column together left the services' text 209 px of a 325 px column at 375 px: 21–24 characters a line, most lines in three rows. The first design critique raised it (finding 5, research note). The client saw two previews (review #116): the icon beside the title with the line below it (B), and the icon above the title (C, about 300 px taller), and chose B (review #121).

## Decision

1. **Below 48rem, each service's icon sits beside its title only,** centred on the title's lines, and the service's line runs under both at the column's full width (265 px at 375 px, about 30 characters).
2. **From 48rem nothing changes:** ADR 0022 point 1 holds there.
3. The motion stays as in [ADR 0023](0023-process-line-follows-the-screen.md): the icon draws as the line reaches it.

This supersedes ADR 0022 point 1 below 48rem.

## Consequences

- The services' lines on phones take two rows instead of three, and the section's height stays about the same (1856 px against 1864 at 375 px). The two longest titles still take two lines beside their icons.
- Phase 3 builds Home's "Što radimo" this way on phones; the Figma example page is desktop and does not change.
