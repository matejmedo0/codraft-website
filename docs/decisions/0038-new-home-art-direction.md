# 0038. The new Home's art direction: display capitals, one ivory band, pills

- **Status:** Accepted; refines the type and composition of the new Home (ADR 0035 to 0037); the Midnight palette (ADR 0033) and the wordmark (ADR 0034) stay
- **Date:** 2026-10-30
- **Deciders:** client (Codraft team), Claude

## Context

The client asked for the whole new Home to be made "as if for Nike: modern and elegant, but techy" (M32 in `docs/phases/3-pages.md`), after approving its structure and animations section by section.

## Decision

- **Type:** display titles in Archivo at its narrowest width (75%), weight 700, capitals, tight leading, large (zone titles to about 9.5rem, the closing question to 10.5rem, the hero's headline sized so its first line spans the sheet). Small numbers and labels in the system monospace. Body text unchanged.
- **Rhythm:** the free audit becomes the page's one ivory band, with the roles inverted (midnight text, a deep teal `#2E6E7A` for lines and grips, `#22555E` for accent text; all text AA on ivory).
- **A running strip** of the services' names between the hero and "Što radimo", filled and outlined in turn, with a pause button and no motion under reduced motion (WCAG 2.2.2).
- **Controls:** the page's buttons are pills.
- **Kept:** the copy, the links, the Midnight palette, the wordmark, the header's layout, the sheet frame and every approved animation (the hero's code-to-page, the zig-zag stages, the building scene).

## Amendment (2026-10-30, M33)

The client found the display type too large and the hero's windows too big: the type is a size smaller throughout (zone titles to 5.25rem, the hero's headline to 4.5rem, the closing question to 6rem), and the windows are at most 60rem wide at rest and 66rem wide and 64% of the screen's height grown.

## Consequences

- The system lives in `src/views/new-home/new-home.css` (`.nk-display`, `.nk-title`, `.nk-outline`, `.nk-label`, `.nk-inverse`) and is loaded only on the new Home; the shared components and the current Home are unchanged.
- If the new Home goes live, the site's other pages need the same direction, or the change of voice between pages will show.
