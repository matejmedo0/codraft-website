# The new Home: the client's rules

From 2026-10-23 the pages are made step by step by the client's rules, one instruction at a time (M8 in [phases/3-pages.md](phases/3-pages.md); [ADR 0033](decisions/0033-new-home-by-the-clients-rules.md)). The first page is a new Home. This document holds its rules; each new rule is added here, with the client's message it comes from.

- **Where:** `src/views/new-home/`, shown at `/lab/nova-pocetna` (the dev server and lab builds only, noindex).
- **The current Home** stays at `/` and `/en`, unchanged; its copy as of 2026-10-23 is in the lab archive (`src/lab/archive/home-v1/`, `/lab/pocetna-stara`).

## 1. Apart from the current Home (M8, M9)

- The new page starts from the current Home's frame: the header, the drawing sheet and the title block.
- It shares nothing with the current Home that it changes. Its zones go in its own folder, its copy gets its own locale keys, and a shared component it needs to change gets its own copy first.

## 2. The frame follows the screen (M11)

The client's choice "Prati rub ekrana" (`NewHomeSheet.astro`):
- The frame keeps its margin to the screen's edges at every width and zoom, with no maximum width.
- Numbers along the top edge and letters A, B, C… down the left edge, about one field per 200 px, stretched to fill the edge. Zooming out adds fields, zooming in takes them away; phones get two at least.
- The margin is 12 px on phones and 24 px from 768 px.
- The rows' letters replace the zones' own letters.

## 3. The palette: Midnight (M13)

The client's "new, simpler palette" replaces the dark navy of M10. The colours sit on the design system's roles in `NewHomeView.astro`, so every component follows them.

| Colour | Name | Use on the page | Role tokens |
|---|---|---|---|
| `#0B181D` | Midnight navy | Main background: the page, the margin and the sheet | `--surface`, `--grip-fill`, `--drawing-fill`, primary button text |
| `#11252C` | Deep teal navy | Cards and sections | `--surface-sunk` |
| `#193139` | Elevated surface | Raised parts; disabled buttons | `--button-disabled-bg` |
| `#23414A` | Interactive surface | Hover; selected text | `--button-secondary-bg-hover`, `--selection` |
| `#ECEDEA` | Soft ivory | Main text, the wordmark's lettering; primary button hover | `--ink`, `--drawing-ink`, secondary button text |
| `#AAB8BB` | Muted silver | Muted text: labels, notes, the frame's numbers and letters | `--ink-muted` |
| `#82BBC5` | Muted teal | Accent: the wordmark's details, links' accent text, the current page's line, focus ring, grips, primary buttons | `--accent`, `--accent-text`, `--link`, `--focus`, `--button-primary-bg` |
| `#28434C` | Subtle border | Every line: the sheet's frame, rules, cell borders, button outlines | `--frame`, `--line`, `--line-strong`, `--button-secondary-border` |

- **The ratio** of visual presence is about 65% background, 20% surfaces, 10% text and 5% accent. The client calls it illustrative, not a strict rule.
- **The wordmark** takes the palette (M14, [ADR 0034](decisions/0034-new-home-wordmark-in-the-palette.md)): ivory lettering (15.4:1) and its three accent details (the arc, the drafting line, the grip) in muted teal (8.5:1), in place of the brand blue `#2F6BFF`.
- **Contrast**, checked on all four surfaces: ivory 9.3–15.4:1, silver 5.3–8.8:1, teal 5.1–8.5:1, so all three pass AA for body text on any of them; midnight on a teal button 8.5:1. The border is 1.7:1 on the background: it is decorative, never the only sign of a control.
- **Sections** use `--surface-sunk`, not `.surface-navy`, which still holds the site's old navy.

## 4. The hero fills the first screen (M15)

- On arrival the visitor sees the header and the hero only; the next zone comes in with the scroll.
- The hero stays inside the sheet, under the header, and is as tall as the screen less the sheet's top margin and the header (`NewHomeHero.astro`). Its bottom edge falls 1–4 px below the fold at every width and zoom, so the next zone never peeks in.
- It sits on the main background, Midnight `#0B181D`. It is empty for now.
