# Design lab: fonts, brand files and tooling (2026-10-19)

> **What this is.** Facts gathered while building the phase 2 prototypes ([phases/2-design-directions.md](../phases/2-design-directions.md)), mostly by inspecting files and running the tools on this machine.
>
> **Confidence:** **High** = observed or read in the source today; **Medium** = inferred from code or documents, not tested.

## 1. Web font candidates

All files are the variable TTFs from the `google/fonts` repository (`ofl/<family>/`), licensed under the SIL Open Font License 1.1. They were subset with fonttools 4.67 (from a throwaway virtual environment, not a project dependency) to: Basic Latin, Latin-1, Latin Extended-A, U+0301 and U+030C, typographic quotes and dashes, `…`, `•`, `‹›`, `€`, `™`, `←`, `→` and `−`.

| Family | Axes | Croatian letters | Latin Extended-A gaps | Reserved Font Name | WOFF2 after subsetting | Source | Confidence |
|---|---|---|---|---|---|---|---|
| Archivo | wdth 62–125, wght 100–900 | complete | none | none | 115 KB; 71 KB with wdth 75–100 and wght 400–700 | https://github.com/google/fonts/tree/main/ofl/archivo | High |
| Schibsted Grotesk | wght 400–900 | complete | ſ | none | 55 KB; 53 KB with wght 400–800 | https://github.com/google/fonts/tree/main/ofl/schibstedgrotesk | High |
| Literata | opsz 7–72, wght 200–900 | complete | ſ | none | 179 KB; 95 KB with opsz 24–60 and wght 400–600 | https://github.com/google/fonts/tree/main/ofl/literata | High |
| Hanken Grotesk | wght 100–900 | complete | ſ | none | 40 KB; 27 KB with wght 400–700 | https://github.com/google/fonts/tree/main/ofl/hankengrotesk | High |
| Public Sans | wght 100–900 | complete | Ĳ ĳ ŉ ſ; no arrows | none | 29 KB | https://github.com/google/fonts/tree/main/ofl/publicsans | High |
| Atkinson Hyperlegible Next | wght 200–800 | complete | 38 letters (Esperanto, Maltese and others) | none | 40 KB | https://github.com/google/fonts/tree/main/ofl/atkinsonhyperlegiblenext | High |
| Sofia Sans Semi Condensed | wght 1–1000 | complete | 30 letters | none | 59 KB | https://github.com/google/fonts/tree/main/ofl/sofiasanssemicondensed | High |
| Mona Sans | wdth 75–125, wght 200–900 | complete | ĸ ŉ Ŏ ŏ ſ | **"Mona"** | 136 KB | https://github.com/google/fonts/tree/main/ofl/monasans | High |
| Hubot Sans | wdth 75–125, wght 200–900 | complete | ĸ ŉ Ŏ ŏ ſ | **"Hubot"** | 129 KB | https://github.com/google/fonts/tree/main/ofl/hubotsans | High |

**Findings**
- **Subsetting is a modification, and a Reserved Font Name blocks it.** OFL 1.1 defines a "Modified Version" as any derivative made by "adding to, deleting, or substituting" components, and condition 3 says no Modified Version "may use the Reserved Font Name(s)" without written permission. A subset drops glyphs, so Mona Sans and Hubot Sans would have to be renamed. They were dropped. Source: the `OFL.txt` shipped with each family. Confidence: High.
- **Hinting doesn't matter here.** Subsetting with and without TrueType hinting gave the same WOFF2 sizes (within 0.4 KB). These variable fonts ship unhinted. Confidence: High.
- **The width and optical-size axes cost the most.** Narrowing Archivo's width axis from 62–125 to 75–100 saves 44 KB. Literata stays heavy even narrowed; a static optical size would be the next step if it is chosen. Confidence: High.
- **Instancing after subsetting.** fonttools' instancer raised a `KeyError` in `gvar` when a lazily loaded font was subset after instancing. Subsetting first (with `lazy=False`) and then narrowing the axes works. Confidence: High.
- **Đ and đ** render correctly in all the candidates above (visual check in a specimen at 46 px and 18 px). Confidence: High.

## 2. The brand files

| Fact | Source | Confidence |
|---|---|---|
| Every SVG master carries a C2PA manifest in `<metadata><c2pa:manifest>` (base64 JUMBF). In `codraft-wordmark-primary.svg` it is 7,737 of 10,923 bytes; gzipped, the file is 3,537 bytes with it and 1,377 without. | The file; `gzip` | High |
| The PNGs in `web/`, `icon-small/` and `wordmark/` also contain C2PA data; `favicon.ico` doesn't. | `grep -a c2pa` | High |
| The claim generator is "Anthropic Files 1.0.0", spec version 2.4.0, signed with an "Anthropic Claude Content Signing" certificate (issuer "Anthropic Content Credentials Root CA"). One assertion says: "Claude provided this file at the request of a user and may have created or modified the file contents." | Decoded manifest strings | High |
| The hard binding is `c2pa.hash.data` with only the manifest's own bytes excluded, so any other change to the file invalidates it. | Decoded manifest; the C2PA 2.x hard-binding model | High (structure); Medium (validator behaviour, not run) |
| The wordmark's `.cd-accent` is one compound path: the c-arc, then the drafting line and the grip's outer square as one subpath (x 520.09–682.09), then the grip's inner square as a hole. The line spans x 520.09–652.09 at y 45.6–62.6; the grip is 652.09–682.09 × 39.1–69.1 with the hole at 659.09–675.09 × 46.1–62.1. Extending the line to x 659.09 hides the seam and keeps the union identical. | The SVG path data | High |

The decision based on these facts is [ADR 0014](../decisions/0014-logo-animation-web-copies-and-local-review.md).

## 3. Astro 7.4 and the tooling

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| CSP and integration scripts | Scripts injected with `injectScript("head-inline", …)` are hashed into the page CSP automatically (`trackScriptHashes` adds every `settings.scripts` entry with stage `head-inline`). The lab's one-line `js` class script loads without a violation. | `node_modules/astro/dist/core/csp/common.js`; the lab build | High |
| CSP and `is:inline` | `is:inline` scripts in components are not among the hashed sources, so the CSP would block them unless their hashes are added to `security.csp.scriptDirective.hashes`. | Same file | Medium (read, not tested) |
| `injectRoute` | Takes `{ pattern, entrypoint: string \| URL, prerender? }`. The `astro:config:setup` hook receives `command: "dev" \| "build" \| "preview" \| "sync"`, which lets the lab exist in dev and in flagged builds only. | `node_modules/astro/dist/types/public/integrations.d.ts`, `internal.d.ts` | High |
| Vitest | `getViteConfig` runs the integrations' `astro:config:setup` hooks, so every injected route file must exist or Vitest fails at startup with `ENOENT`. | Observed | High |
| Scoped styles | Scoped selectors carry the scope attribute (`.wordmark[data-astro-cid-…]`, specificity 0,2,0), so a single class from a parent stylesheet can't override them. The lab's wordmark takes its width from `--wordmark-width` instead. | Observed | High |
| Imported CSS | A CSS file imported by several lab pages became one shared chunk named after the first module (`copy.*.css`). | The lab build output | High |
| E2E and the dev server | Locally, Playwright reuses whatever listens on port 4321 (`reuseExistingServer: !process.env.CI`). With `npm run dev` running, the E2E tests ran against the dev server, without the CSP, and 9 failed. Stop the dev server before `npm run test:e2e`. | Observed | High |
| Stopping a background dev server | Stopping the shell that ran `npm run dev` left the `astro dev` Node process listening on Windows. Starting it with `exec node ./node_modules/astro/bin/astro.mjs dev` makes the process stoppable directly. | Observed | High |
| Headed Chrome scrollbars | Playwright MCP runs headed Chrome with classic scrollbars, so a 375 px viewport lays out at 360 px; full-page screenshots are 360 px wide. Phones use overlay scrollbars. | Observed | High |

## 4. Motion

| Topic | Fact | Source | Confidence |
|---|---|---|---|
| Springs as CSS | A damped spring's step response, sampled into `linear()`, gives CSS the `motion-foundations` presets without JavaScript. Snappy (stiffness 300, damping 30): ζ 0.866, settles in about 505 ms, peaks at 1.004. Snap (400/24): ζ 0.600, settles in about 508 ms, peaks at 1.095. Gentle (120/14): ζ 0.639, settles in about 942 ms, peaks at 1.074. | Computed (`x(t) = 1 − e^(−ζω₀t)(cos ω_d t + (ζω₀/ω_d) sin ω_d t)`) | High |
| `linear()` support | Supported in current Chrome, Edge, Firefox and Safari (Chrome 113, Firefox 112, Safari 17.2). | MDN browser-compatibility data, from memory, not re-checked today | Medium |
| Restarting a CSS animation | Removing and re-adding the class that sets `animation` restarts it from the first keyframe. The lab uses this to replay the wordmark entrance when the mark starts below the fold. | Observed | High |
