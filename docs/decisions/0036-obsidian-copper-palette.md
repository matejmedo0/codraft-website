# 0036. The Obsidian Copper palette

- **Status:** Accepted
- **Date:** 2026-10-31
- **Deciders:** client (Codraft team), Claude

## Context

ADR 0035 removed the old design's colour rules (paper, navy and blue), and the new scroll-based look needed its own palette. On 2026-10-30 the team tried "Obsidian Copper": a near-black, slightly cold ground on which copper stands out, for a calmer look than the old blue.

## Decision

The site uses this palette. The values live in `src/styles/tokens.css`; `src/styles/tokens.test.ts` pins them and checks the contrast of every text pair (WCAG AA).

| Token | Hex | Role |
|---|---|---|
| `--color-obsidian` | `#080D10` | Background |
| `--color-petrol` | `#111B1F` | Surface: the alternate section, sunk areas |
| `--color-petrol-raised` | `#19282C` | Elevated surface: hovers, disabled buttons |
| `--color-bone` | `#F1EEEA` | Headings, the wordmark's lettering (`--ink`) |
| `--color-mist` | `#9DADB0` | Body text (`--ink-muted`) |
| `--color-copper` | `#D6A075` | Copper accent: CTA, links, focus ring, small marks (`--accent`) |
| `--color-teal` | `#668A90` | Technical accent: lines, grids, drawings |

Derived values, also in `tokens.css`: `--color-copper-hover` `#E2B48F` (the primary button on hover), `--color-selection` `#504033` (selected text) and `--silk-ramp`, the eight stops of the silk background (`SilkWaves.astro`), which deepen the teal's hue so the silk's edges stay dark.

Rules:

1. **Copper only in small doses:** calls to action, links, the focus ring, small marks and some interactive details; never large copper areas.
2. **Body copy in mist, headings in bone** (`base.css`).
3. Components use the role tokens (`--ink`, `--surface`, `--accent`, …), not the palette directly.

Suggested with the palette, not decided yet: sections alternating between obsidian and petrol for depth without hard edges, and blur only on background effects, never on content.

## Consequences

- The wordmark on the site follows the palette by itself: its lettering takes `currentColor` (bone) and its accent `--accent` (copper).
- The brand package (`Assets/codraft-brand/`, read-only) still has the old colours: the favicon set, `site.webmanifest` (`theme_color` `#0F1B2D`, `background_color` `#F6F5F1`) and the social images are navy, blue and off-white. A copper colourway of the masters and regenerated web copies are open follow-up work, for the team to decide.
- The class `.surface-navy` and the Zone prop `surface="navy"` keep the old palette's name; they now mean the petrol surface.
