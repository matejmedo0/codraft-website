# Brand

> **Status (2026-10-30):** the brand package in `Assets/codraft-brand/` is **final**. The masters are read-only; the site uses the web copies made by `scripts/brand-web-copies.mjs` (the favicon set in `public/`, the marks in `src/assets/brand/`, all without C2PA). The full package documentation is in [Assets/codraft-brand/README.md](../Assets/codraft-brand/README.md), and every mark is shown on [the overview sheet](../Assets/codraft-brand/codraft-overview-sheet.png). The site's colours, type and imagery are being redesigned ([ADR 0035](decisions/0035-a-scroll-based-site-built-for-the-wow.md)); this file keeps only the marks. The colours are the Obsidian Copper palette ([ADR 0036](decisions/0036-obsidian-copper-palette.md)); the marks in the package still have the old ones.

## The marks

| Mark | Files | Use |
|---|---|---|
| **Wordmark** | `wordmark/` in four colourways (primary, reverse, mono-navy, mono-white), SVG and PNG at 1200 and 2400 px | Anywhere the full name fits: site header, documents. At least 20 px tall on screen. |
| **Main icon "C"** | `icon-main/`, primary and reverse, SVG and PNG at 512 and 1024 px | Square placements of 180 px and up. The four corner squares are CAD selection grips. |
| **Small icon "B"** | `icon-small/`, primary and reverse, SVG and PNG at 32, 64 and 128 px | 16–128 px: favicons, small UI |
| **Social images** | `social/`, navy and off-white backgrounds, 400 and 1080 px | Profile pictures; safe for circle crops |
| **Web set** | `web/`: `favicon.ico`, `icon.svg` (switches to off-white in dark mode), `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`, `head-snippet.html` | Served from the site root; the head snippet is in every page `<head>`. |

**Rules from the package README**
- Below 180 px use icon B; from 180 px up use icon C.
- Use the primary marks on white or off-white and the reverse marks on navy.
- Clear space around the wordmark is at least the height of the "c".
- Never stretch, rotate, outline or add effects to the marks, and never move the blue to other parts of the letters.

**SVG structure.** The masters are outlined paths with a tight viewBox and two groups, `.cd-ink` (lettering) and `.cd-accent` (blue details). Inline SVGs recolour with CSS, e.g. `.cd-ink { fill: currentColor; }`. The web copy splits the accent into three paths with identical geometry; the shapes are filled outlines, not strokes, so a "draw" effect is a clip or scale reveal, not a stroke-dash animation.

**C2PA.** Every master embeds a C2PA content-credentials block (about 6–8 KB of each 9–11 KB SVG). The web copies strip it; the masters keep it.

## What the accent means

The wordmark's `.cd-accent` is a single compound path with three parts:

1. a blue segment on the arc of the first "c"
2. a horizontal drafting line that forms the **crossbars of "f" and "t"**
3. a hollow **CAD grip square** at the end of that line

Code + Draft: drawing the line literally finishes the word.

## Favicon and manifest

The `web/` set is served from the site root (`public/`, PNGs without their C2PA chunk), and BaseLayout carries the package's head snippet. `site.webmanifest` names the site "Codraft"; `theme_color` is `#0F1B2D` and `background_color` is `#F6F5F1`.
