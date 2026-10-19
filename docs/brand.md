# Brand

> **Status (2026-10-19):** the brand package in `Assets/codraft-brand/` is **final**. The masters are read-only; the site uses the web copies made in phase 2 by `scripts/brand-web-copies.mjs` (the favicon set in `public/`, the marks in `src/assets/brand/`, all without C2PA). The full package documentation is in [Assets/codraft-brand/README.md](../Assets/codraft-brand/README.md), and every mark is shown on [the overview sheet](../Assets/codraft-brand/codraft-overview-sheet.png). The colour and type tokens are final in `src/styles/` ([ADR 0015](decisions/0015-design-direction-model-i-list.md)).

## The marks

| Mark | Files | Use |
|---|---|---|
| **Wordmark** | `wordmark/` in four colourways (primary, reverse, mono-navy, mono-white), SVG and PNG at 1200 and 2400 px | Anywhere the full name fits: site header, documents. At least 20 px tall on screen. |
| **Main icon "C"** | `icon-main/`, primary and reverse, SVG and PNG at 512 and 1024 px | Square placements of 180 px and up. The four corner squares are CAD selection grips. |
| **Small icon "B"** | `icon-small/`, primary and reverse, SVG and PNG at 32, 64 and 128 px | 16–128 px: favicons, small UI |
| **Social images** | `social/`, navy and off-white backgrounds, 400 and 1080 px | Profile pictures; safe for circle crops |
| **Web set** | `web/`: `favicon.ico`, `icon.svg` (switches to off-white in dark mode), `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `site.webmanifest`, `head-snippet.html` | Copied to the site root in phase 2. The head snippet goes into every page `<head>`. |

**Rules from the package README**
- Below 180 px use icon B; from 180 px up use icon C.
- Use the primary marks on white or off-white and the reverse marks on navy.
- Clear space around the wordmark is at least the height of the "c".
- Never stretch, rotate, outline or add effects to the marks, and never move the blue to other parts of the letters.

**SVG structure.** The masters are outlined paths with a tight viewBox and two groups, `.cd-ink` (lettering) and `.cd-accent` (blue details). Inline SVGs recolour with CSS, e.g. `.cd-ink { fill: currentColor; }`.

### What the accent means

The wordmark's `.cd-accent` is a single compound path with three parts:

1. a blue segment on the arc of the first "c"
2. a horizontal drafting line that forms the **crossbars of "f" and "t"**
3. a hollow **CAD grip square** at the end of that line

Code + Draft: drawing the line literally finishes the word. This is the basis of the hero animation and the About story (see [motion.md](motion.md)).

**For animation (phase 2).** The web copy splits the accent into three paths with identical geometry. The shapes are filled outlines, not strokes, so the "draw" effect is a clip or scale reveal, not a stroke-dash animation. The animation always ends on the exact mark.

### Decisions (phase 2)

Both were decided on 2026-10-19 ([ADR 0014](decisions/0014-logo-animation-web-copies-and-local-review.md)):
- **Logo entrance animation: approved, on the home hero only.** It plays once per page load: the line draws, then the grip snaps in, ending on the exact, unmodified mark. The header logo and every other placement stay static. This is the only exception to the README's "no effects" rule.
- **C2PA metadata: stripped from every web copy** (SVG and PNG). Every master embeds a C2PA content-credentials block, about 6–8 KB of each 9–11 KB SVG. The masters stay untouched and keep it.

## Colour

| Token (brand) | Hex | Use |
|---|---|---|
| Navy | `#0F1B2D` | Lettering, body text, dark backgrounds, **primary buttons** |
| Blue | `#2F6BFF` | **Graphics only:** accents, lines, grips, focus ring, large text |
| Off-white | `#F6F5F1` | Light backgrounds; text on navy |
| White | `#FFFFFF` | The mono-white mark only |

### Contrast (WCAG 2.x, recalculated 2026-10-18)

| Pair | Ratio | Verdict |
|---|---|---|
| Navy on off-white | 15.84:1 | Body text |
| Blue `#2F6BFF` on off-white | 4.12:1 | **Fails AA for body text.** Fine for large text (24 px, or 18.66 px bold) and graphics (≥ 3:1) |
| White on blue `#2F6BFF` | **4.4988:1** | **Fails AA** (4.5:1). Don't round up; no white text on brand blue |
| Blue on navy | 3.84:1 | Large text and graphics only |

**Text tokens** (contrast verified; final in `src/styles/tokens.css` as `--color-blue-on-paper`, `--color-blue-on-navy`, `--color-grey-on-paper` and `--color-grey-on-navy`, with every text pair checked in `tokens.test.ts`):

| Token | Hex | Contrast |
|---|---|---|
| `--accent` | `#2F6BFF` | Graphics only: grips, lines, focus ring |
| `--accent-text-light` | `#2457D6` | 5.65:1 on off-white, 6.16:1 on white. Same hue as the brand blue; for links on light backgrounds |
| `--accent-text-dark` | `#77A0FF` | 6.80:1 on navy; for links on dark backgrounds |
| `--muted-light` | `#5E6878` | 5.16:1 on off-white. Avoid the common `#6B7280`, which is only about 4.4:1 |
| `--muted-dark` | `#A7B0BD` | 7.89:1 on navy |

**Implications**
- Primary buttons are navy with off-white text, which matches the README's "blue: accents only".
- Links are underlined.

## Typography

The wordmark is a custom geometric face drawn as outlines, so the site needs web fonts for text. **Chosen in phase 2: Archivo, the only family** ([ADR 0015](decisions/0015-design-direction-model-i-list.md)), at three widths: 100 % for text, 87.5 % for headings, 75 % for labels and title-block data. It is self-hosted in two files split by `unicode-range` (a 36.5 KB core file for English and Croatian, preloaded) with size-adjusted Arial fallbacks; details in [research/2026-10-19-design-system.md](research/2026-10-19-design-system.md). It met these requirements:

**Croatian coverage**
- Full Latin Extended-A, including Č č Ć ć Đ đ Š š Ž ž, plus „ “ ‚ ‘ – — €.
- Check Đ and đ visually; many display faces draw them badly.

**Hosting and licence**
- Self-host WOFF2 files. Never load fonts from the Google Fonts CDN (GDPR; see [compliance.md](compliance.md)).
- Use an open (OFL-type) licence and variable fonts where possible.

**Number of families**
- At most two (the workflow rule).
- A suggested pairing: a grotesk with some technical character for text, and a monospace for dimension labels and title-block data.

**Performance**
- Preload one weight only.
- Use a size-adjusted fallback font so the swap causes no layout shift.

**Don't mimic the wordmark.** A near-identical geometric sans for headings would look like a failed attempt at the logo font.

## Imagery

**Team photos.** Specification for the client's photo session (gaps G3 and G15 in [content.md](content.md)):
- one session, with the same light and background: a warm neutral close to off-white, or the real workspace
- head and shoulders, 4:5 portrait, eye level, at least 3000 px on the long edge
- plus 4–6 candid working shots (hands on markups, a screen with CAD or code), 3:2, at least 4000 px
- neutral clothing (navy, grey, white) and light retouching only
- originals stay out of git (`Assets/**/originals/` is ignored); only optimised copies are committed

**CAD samples.** These are sheets drawn for the site, not client work (G10). Deliver them as DWG plus PDF, exportable per layer, so they can be shown in the layer viewer.

**Service icons (proposed).** The client offered a set of custom icons, one per service in "Što radimo", drawn as the line reaches each stage (review batch 4, 2026-10-19). They are custom, never a generic pack (below). What the files need, so they fit the drawing sheet and can be drawn on screen:
- **Count and names:** nine, one per service, named by the service's anchor: `besplatna-analiza`, `fiksni-opseg`, `web-stranice`, `web-aplikacije`, `integracije`, `ai-asistenti`, `hosting`, `seo`, `analitika`.
- **Style:** line drawings in the drafting language: navy strokes of one weight, square corners, at most one blue accent per icon (a drafting line or a grip, as in the wordmark). No fills, gradients, shadows, text or perspective.
- **Format:** one SVG per icon, `viewBox="0 0 48 48"`, drawn on a 48 px grid with 2 px of clear space. Strokes stay strokes (`stroke`, not outlined to fills), 1.5 px wide, with `stroke-linecap="square"` and `stroke-linejoin="miter"`, and `currentColor` for the ink, so the site can colour them and draw them stroke by stroke. Paths are listed in drawing order. No `style` attributes (the CSP blocks them), no embedded images, no metadata.
- **Source and rights:** the editable source (Figma or Illustrator) and confirmation that Codraft owns the icons.
- **On the site:** about 40–48 px, decorative (the service's title carries the meaning), drawn once and static with reduced motion.
- **If the icons are generated** (the client's plan, review batch 5): any SVG or transparent PNG of at least 1024 px will do. Claude redraws each one as a stroke SVG on the 48 px grid, so the set stays consistent and can be drawn on screen. Check that the tool's licence allows commercial use.

The prompt sent to the client: the style part, the same for every icon, followed by one subject.

```text
A single minimalist technical line icon, drawn like a symbol on an architectural CAD drawing. Flat orthographic 2D, no perspective, no 3D, no shading. Thin uniform navy blue strokes (#0F1B2D), every line the same weight, square line ends and sharp mitred corners, built from straight lines, right angles, circles and arcs on a precise square grid. No fills, no gradients, no shadows, no textures, no text or letters. Exactly one small accent in bright blue (#2F6BFF): a short straight drafting line that ends in a small hollow square, like a CAD selection grip. Centred, with generous empty space around it, on a transparent background, square 1:1 format. Precise, calm and professional; not cartoonish, not playful, not glossy, not a generic stock icon. Subject: [SUBJECT]
```

| File | Service | Subject |
|---|---|---|
| `besplatna-analiza` | Besplatna analiza | a magnifying glass over a simple website window |
| `fiksni-opseg` | Fiksni opseg, rok i cijena | a sheet of paper with a dimension line measuring its width, with extension lines and small arrowheads |
| `web-stranice` | Web stranice i web trgovine | a desktop browser window with a smartphone standing in front of its lower right corner |
| `web-aplikacije` | Web aplikacije i interni alati | an application window with a sidebar and a grid of panels, one panel holding a small bar chart |
| `integracije` | Integracije i online rezervacije | three small square nodes joined by right-angled connector lines, one node drawn as a tiny calendar |
| `ai-asistenti` | AI asistenti i automatizacija | a speech bubble with a small network of three connected dots inside |
| `hosting` | Hosting i održavanje | a server of three stacked rectangles with small indicator dots, and a circular arrow beside it |
| `seo` | SEO i lokalna vidljivost | a map location pin above a rising line chart |
| `analitika` | Analitika i usklađenost | a simple bar chart inside a frame, with a small check mark in one corner |

**What we don't use**
- stock photography
- AI-generated people
- generic illustration packs
- generic icon packs

Instead the site uses drafting motifs: a grid, dimension lines, a title block, and numbered detail callouts like the reference bubbles on drawings.

**OG images.** Generated per page and per language from a template at build time (phase 3), using the brand tokens and the wordmark.

## Favicon and manifest

The `web/` set is served from the site root since phase 2 (`public/`, PNGs without their C2PA chunk), and BaseLayout carries the package's head snippet. `site.webmanifest` names the site "Codraft"; `theme_color` is `#0F1B2D` and `background_color` is `#F6F5F1`.
