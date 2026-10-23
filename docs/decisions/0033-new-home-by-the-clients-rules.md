# 0033. A new Home, built apart by the client's rules, on the Midnight palette

- **Status:** Accepted; the wordmark's colour superseded by [0034](0034-new-home-wordmark-in-the-palette.md)
- **Date:** 2026-10-23
- **Deciders:** client (Codraft team), Claude

## Context

Home was built in phase 3 from the design approved in phase 2 (ADR 0015). On 2026-10-23 the client asked for pages to be made step by step by the client's own rules, starting with a new page from the old Home's frame, the old one kept (M8, M9 in `docs/phases/3-pages.md`). The client then set the new page's background to the dark navy of a new palette explored at `/lab/paleta` (M10), chose a frame that follows the screen at every width and zoom (M11), and replaced that navy with a simpler palette, "Midnight" (M13).

## Decision

1. **Pages are made step by step by the client's rules**, one instruction at a time. ADR 0031's autonomous build gives way to this for the pages; the rest of ADR 0031 holds.
2. **The new Home is built apart from the current one,** in `src/views/new-home/`, at `/lab/nova-pocetna`. The current Home stays at `/` and `/en`; a copy of it is archived at `/lab/pocetna-stara`. Nothing the new page changes reaches the current Home.
3. **Its frame follows the screen:** no maximum width, and the fields on its edges follow the width and zoom.
4. **Its palette is Midnight:** `#0B181D` background, `#11252C` cards and sections, `#193139` elevated, `#23414A` hover, `#ECEDEA` text, `#AAB8BB` muted text, `#82BBC5` accent, `#28434C` borders, on the design system's roles. The wordmark keeps its brand blue.

The rules and the role mapping are in `docs/new-home-rules.md`.

## Consequences

- The new page has its own sheet and palette; the site's tokens, sheet and other pages are unchanged until the client decides that the new Home replaces the current one.
- Midnight replaces the off-white ground of ADR 0015 on this page only. If the new Home goes live, the brand notes (`docs/brand.md`) and the other pages need a decision of their own.
- The palette at `/lab/paleta` stays an uncommitted exploration; Midnight is the one in use.
