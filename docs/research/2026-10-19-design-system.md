# Design system: fonts, brand files, CSS and Figma (2026-10-19)

> **What this is.** Facts gathered while building the phase 2 design system from the chosen direction ([ADR 0015](../decisions/0015-design-direction-model-i-list.md)), mostly by running the tools on this machine. It extends [2026-10-19-design-lab.md](2026-10-19-design-lab.md), which stays unchanged.
>
> **Confidence:** **High** = observed or read in the source today; **Medium** = inferred, or read in documentation and not tested.

## 1. Archivo for production

The production files are made from the lab's subset (`src/lab/fonts/archivo.woff2`: Archivo from `google/fonts`, OFL 1.1, widths 75–100 %, weights 400–700) with fonttools 4.67 and brotli, in a throwaway virtual environment in the session's scratchpad. Nothing was added to the project.

| Fact | Source | Confidence |
|---|---|---|
| The lab file: 477 glyphs, 343 code points, unitsPerEm 1000, typo ascender 878, descender −210, line gap 0, `USE_TYPO_METRICS` set. After narrowing, the weight axis's default is 600 (axes `wght` 400–600–700, `wdth` 75–100–100). | fonttools | High |
| Split by `unicode-range`: a core file for English and Croatian (Basic Latin, the ten Croatian letters, ×, Ø, °, ±, ², ³, §, ©, ®, «, », ·, ø, nbsp, the dashes, quotes, …, •, ‹›, €, ™, ←, →, −, prime, the combining acute and caron) and an extended file with the rest of Latin-1 and Latin Extended-A. | `fonts.css` | High |
| With every OpenType feature kept, the core file was 43.3 KB (254 glyphs). Keeping only `ccmp`, `locl`, `liga`, `rvrn`, `kern`, `mark`, `mkmk`, `tnum`, `lnum`, `pnum` and `case` makes it **36.5 KB** (186 glyphs); the extended file is 41.2 KB. The lab's single file was 71 KB, so a page in English or Croatian now loads about half. | fonttools; file sizes | High |
| Fallback metrics, measured over the site's copy in `content.md` (5,154 characters): Archivo at weight 400 and width 100 against Arial Regular gives `size-adjust: 98.54%`, `ascent-override: 89.1%`, `descent-override: 21.31%`. Archivo at weight 680 and width 87.5 (the H1) against Arial Narrow Bold gives 106.89 %, 82.14 % and 19.65 %; at weight 620, 104.99 %. Arial Narrow ships with Windows (`ARIALN*.TTF`); where it is missing, the heading stack falls back to the Arial face. | fonttools `instancer`; `C:\Windows\Fonts\arial.ttf`, `ARIALNB.TTF` | High (values); Medium (Arial Narrow on macOS, not checked) |
| A Python script named `inspect.py` shadows the standard library's `inspect` module and breaks the fonttools import (circular import through `dataclasses`). Name throwaway scripts differently. | Observed | High |

## 2. Brand web copies

| Fact | Source | Confidence |
|---|---|---|
| Apart from the `<metadata>` block and the `xmlns:c2pa` declaration, the SVG masters are already clean: outlined paths with two-decimal coordinates, `.cd-ink` and `.cd-accent` groups. Stripping the two gives the wordmark 3.1 KB (from 10.9 KB) and icon B 1 KB (from 8.8 KB). | The files; `scripts/brand-web-copies.mjs` | High |
| The PNGs in `web/` have exactly four chunk types: `IHDR`, `caBX` (the C2PA manifest, 5,758 bytes), `IDAT` and `IEND`. Dropping `caBX` leaves the image bytes unchanged; no re-encoding tool is needed. `favicon.ico` holds two PNGs (16 and 32 px) without C2PA. | A chunk listing script | High |
| `web/icon.svg` carries an inline `<style>` for dark mode. As a favicon it is an image document, so the page's CSP doesn't apply inside it. | CSP Level 3 (images are not subject to the embedding page's `style-src`) | Medium |

## 3. Astro and CSS

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| Cascade layers protect the lab | The production styles sit in `@layer reset, tokens, base, utilities`. The lab's prototypes have unlayered styles, which win over any layer whatever their specificity, so A–E look as they did; their screenshots match round 2. | CSS Cascade 5; screenshots compared | High |
| `@import` after `@layer` | `@layer a, b;` may precede `@import` rules; Vite inlines the imports and keeps the layer blocks. | The built CSS (`@layer reset/tokens/base/utilities` present) | High |
| Scripts render where the component is | Astro 7 doesn't hoist processed `<script>` tags: a component's script is emitted once, in place, where the component first renders. A script in the wordmark component ended up inside the header's link, so the wordmark has no script of its own; `draw.ts` comes through `ZoneMark`, which every sheet page has. A module imported by several component scripts runs once. | `dist/client/index.html` | High |
| Inline scripts and the CSP | Astro inlines a small processed script (the menu) as `<script type="module">` and adds its hash to the page's CSP. | The built page's CSP meta | High |
| Whitespace around expressions | In `.astro` templates, a line break between an element and a `{expression}` collapses to nothing: "slojevima.</strong>" followed by `{…}` on the next line rendered as "slojevima.Konture". Write `{" "}` explicitly. | The style page | High |
| `?raw` in plain `.ts` files | The type for `import css from "…?raw"` comes from `astro/client`. In CI, ESLint runs before anything generates `.astro/types.d.ts`, so the import had an error type. `src/env.d.ts` with `/// <reference types="astro/client" />` fixes it in a fresh checkout. | CI run 39285099321; lint with `.astro` moved away | High |
| Zone letters from a CSS counter | `counter-reset` on the sheet and `counter-increment` on each zone letter number the zones A, B, C… in document order through nested zones, so the title block takes the next letter without props. Elements with `display: none` don't increment, which only happens on phones, where the letters are hidden anyway. | CSS Lists 3; the style page | High |
| A title block that never shows an empty cell | Cells in a wrapping flex row with `flex: 1 1 10rem` always fill their row; each cell draws its right and bottom lines with `box-shadow`, and the block clips the outer ones. This works for any number of cells. | The style page and the home page at three widths | High |

## 4. Motion

| Fact | Source | Confidence |
|---|---|---|
| The `linear()` stops of `--ease-spring` and `--ease-snap` are the spring's step response sampled over its settle time, the time after which it stays within 0.1 % of the target: 505.5 ms for "snappy" (300/30) and 508 ms for "snap" (400/24). Every stop is within 0.005 of the equation; `motion.test.ts` checks it. | Computed | High |
| Windows "Animation effects" off (`SPI_GETCLIENTAREAANIMATION` = false) on the client's machine. Chrome on Windows maps that setting to `prefers-reduced-motion: reduce`, which is why the client saw no motion in the lab. The Playwright MCP's own Chrome reported `reduce: false` on the same machine. | `SystemParametersInfo` via PowerShell; `matchMedia` in the MCP browser | High (setting); Medium (the Chrome mapping, from Chromium behaviour, not read in its source) |
| Headless Chromium (Playwright) draws every frame, so one-shot triggers fire and frames can be frozen with `pause()` and `currentTime` for screenshots of motion in progress. The MCP's headed window draws no frames in the background (round 2), so its `IntersectionObserver` callbacks don't fire either. | Observed | High |

## 5. Figma

| Fact | Source | Confidence |
|---|---|---|
| The client's Figma account has one plan, "mmedved1's team" (education tier), with a Dev seat and the admin role. The MCP could create a design file in it and write to it. | `whoami`; `create_new_file`; `use_figma` | High |
| Figma has Archivo and Archivo Narrow. Archivo is variable there: `getFontFamilyVariationAxes("Archivo")` returns `wdth` and `wght`, and a text style keeps `variationSettings`, so the 87.5 % headings and 75 % labels match the site exactly. At 72 px, "Planiramo, izrađujemo" is 685 px wide at 87.5 % and 762 px at 100 %. | Plugin API | High |
| `resize()` on an auto-layout frame resets its sizing modes to fixed; set `primaryAxisSizingMode = "AUTO"` after it. A component's explicit variable mode (`setExplicitVariableModeForCollection`) switches every bound colour inside it, which is how the closing call to action turns navy. | Plugin API; observed | High |
