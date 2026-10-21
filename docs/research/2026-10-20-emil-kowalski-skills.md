# Emil Kowalski's skills (2026-10-20)

The client asked for a critical evaluation of the outside skill collection [emilkowalski/skills](https://github.com/emilkowalski/skills): whether anything in it helps this project, and whether it helps web work and the existing set of skills and agents in general. The conclusion led to [ADR 0026](../decisions/0026-emil-kowalski-skills-in-the-setup.md): four adapted skills in the global set and in the workflow, no change to the site's code. The client's general notes on the collection, for later projects, are kept outside this repository.

## Source

- **Repository:** https://github.com/emilkowalski/skills, cloned at commit `2d22863` (2026-10-11). MIT licence.
- **GitHub API, 2026-10-20:** 47,909 stars, 2,768 forks, 57 commits since 2026-03-16.
- **Author:** Emil Kowalski, author of the Sonner toast and Vaul drawer libraries and the animations.dev course; the README says the skills come from his years at Vercel and Linear.
- **What it is:** 15 skills, about 300 KB of Markdown and nothing else: no scripts, hooks, binaries, network calls or telemetry.
- **Read in full:** `emil-design-eng`, `animate` (+ `RECIPES.md`), `review-animations` (+ `STANDARDS.md`), `improve-animations` (+ `AUDIT.md`, `PLAN-TEMPLATE.md`), `find-animation-opportunities`, `animation-performance`, `animation-vocabulary`, `apple-design`, `mobile-native`, `break-ui` (+ `CATALOG.md`), `pick-ui-library`, `prototype` (+ `PICKER.md`), the README and `performance-cheatsheet.md`.
- **Skimmed (not web):** `ask-sonner` (+ `API.md`), `animate-expo` (+ `RECIPES.md`, React Native), `write-swift` (Swift 6).
- **Confidence: high** for what the skills say, read from the source. Claims checked against outside sources are marked below.

## What it contains

| Skill | Kind | In one line |
|---|---|---|
| `emil-design-eng` | Knowledge | The main skill: when to animate, easing, duration, springs, clip-path, gestures, performance, Sonner's principles. Reviews must be a Before/After/Why table. |
| `animate` | Builds | A gate (how often is it seen? what is it for?), then the cheapest tool: CSS transition → `@starting-style` → CSS animation → WAAPI → Motion. Recipes for button, popover, tooltip, modal, drawer, toast, accordion, stagger, hold-to-confirm, tabs, scroll reveal, drag. |
| `review-animations` | Reviews a diff | Ten standards, escalation triggers, Block or Approve. "Default to flagging." User-invoked only. |
| `improve-animations` | Audits a codebase | Read-only: recon, audit in eight categories, vet every finding, then self-contained plans in `plans/` for a weaker model to execute. Respects documented decisions. |
| `find-animation-opportunities` | Proposes | Where motion would help, with a required list of rejected candidates. At most 5–7. |
| `animation-performance` | Diagnoses jank | Layout/paint/composite tiers, main thread vs compositor, React state per frame, inherited CSS variables, blur, `will-change` only as the last step. |
| `animation-vocabulary` | Glossary | Turns a vague description of an effect into its name. |
| `apple-design` | Knowledge | WWDC "Designing Fluid Interfaces" for the web: springs, velocity handoff, momentum projection, rubber-banding, materials, typography. |
| `mobile-native` | Fixes | Sticky hover, tap highlight, `dvh`/`svh`, 16 px inputs, `touch-action`, overscroll, safe areas, `theme-color`; test on a real phone. |
| `break-ui` | Stress test | Worst-case but plausible data behind a dev-only "Demo / Worst case" toggle; a catalogue of values that break UI, with the CSS fix for each failure. |
| `pick-ui-library` | Lookup | A curated list: base-ui, cmdk, Sonner, motion, NumberFlow, Satori, recharts, dnd kit, Virtuoso, zustand, clsx/cva, next-themes. User-invoked only. |
| `prototype` | Explores | 3–5 genuinely different variants of one piece behind a fixed picker (keys 1–N, ← →, R to replay, `?v=` in the URL). User-invoked only. |
| `ask-sonner`, `animate-expo`, `write-swift` | Other stacks | Sonner, React Native/Expo, Swift. |

## Quality

**Strong:**
- **Short, concrete and opinionated.** Every rule has a reason and a value: press feedback 100–160 ms at `scale(0.97)`, stagger 30–80 ms, exit faster than entry, blur under 20 px.
- **Restraint first.** "Should this animate at all?" comes before any curve, and `find-animation-opportunities` must list what it rejected.
- **CSS-first.** The tool ladder suits a static site better than the `motion/react`-only skills installed on this machine (`motion-foundations`, `motion-patterns`, `motion-advanced`).
- **`animation-performance`:** the clearest account of the inherited-CSS-variable trap and of `will-change` discipline.
- **`break-ui`:** plausible values instead of nonsense ("1 members", an unbreakable e-mail, an emoji-first name), "change the data, not the component", and keep the fixture as a regression test.
- **`improve-animations`:** vets every finding at its `file:line` and does not re-litigate documented decisions.

**Weak:**
- **Contradictions:**
  - `animate` Hard Rule 2 takes every curve from its own tables ("never invent `cubic-bezier(0.4, 0, 0.2, 1)`"); Hard Rule 3 says to extend the codebase's tokens.
  - `apple-design` says to hint with `will-change` where motion is imminent; `animation-performance` says to add it only once a shift is seen.
  - `mobile-native` Hard Rule 1 says to apply each fix only where its reason applies; its Baseline then puts `user-select: none` on every `a`. On a content site that stops visitors selecting or copying text that contains a link.
- **One factual error:** `mobile-native` says `interactive-widget=resizes-content` makes Android react to the keyboard "the way they do on iOS". It is the reverse. Since Chrome 108, Android resizes only the visual viewport by default, to match iOS; `resizes-content` restores the old behaviour ([Chrome for Developers](https://developer.chrome.com/blog/viewport-resize-behavior), confidence high).
- **Checked and correct:** Motion's `x`/`y` shorthands are not hardware-accelerated and a full `transform` string is. Source: Motion's own animation documentation, as a web search summarised it on 2026-10-20; the page itself was not opened. Confidence: medium-high.
- **Built for apps.** The 300 ms UI budget, the frequency table (keyboard shortcuts, command palettes), toasts, drawers and Base UI's `--transform-origin` assume a product UI. A marketing site's deliberate motion is the "can be longer" exception, which the strict reviewer only honours if it reads the project's reasons.
- **Self-promotion:** every skill opens with a canned line naming the author, and `pick-ui-library` recommends his own Sonner (a fair pick, but not neutral).
- **Overlapping triggers:** `animate` triggers on "animate something, add motion", as `motion-patterns` does. Installing both invites the wrong one to load.

## Fit for Codraft

Poor as a package, for a different reason than Impeccable: it is safe, but most of it targets app UI, and Codraft's motion is designed, documented and approved (ADR 0015, 0022, 0023, `docs/motion.md`).

**The code already follows most of its rules** (checked 2026-10-20):
- only `transform` and `opacity` are animated; no `transition: all`
- the grips use transitions, so they can be interrupted, and their hover is behind `@media (hover: hover)`
- the other hovers change only an underline or a background, so sticky hover on touch costs nothing
- reduced motion keeps a short fade and shows final states
- the scroll-following line sets `--progress` on the line element itself, not on a parent with many children, and sets `will-change` only while it moves
- buttons press to `scale(0.98)` in 80 ms; no `100vh`; `text-size-adjust` is set
- heading tracking is size-specific (`--tracking-display` −0.026em … `--tracking-label` 0.02em), as `apple-design` asks

**Where its rules would misfire here** (so `review-animations` would add noise, as Impeccable's detector would):
- "UI under 300 ms": the drawing moments run 480–700 ms by design (`docs/motion.md`)
- "never `scale(0)`": `motion-draw-x` reveals a line with `scaleX(0)`, which is a line being drawn, not an element appearing from nothing
- "start at `scale(0.9–0.97)`": the grip snaps in from 0.6 with a 9 % overshoot, the brand's "snap"
- Hard Rule 2 would replace `--ease-standard` and `--ease-pen` with its own curves
- `apple-design` prefers the system font and translucent materials; the project uses Archivo and rules out glassmorphism

**Measured, 2026-10-20:** at 320 px and 375 px, `/`, `/en`, `/lab/pocetna` and `/lab/style` have no horizontal overflow (scroll width equals viewport width; no element outside it).

## Overlap

- **`design-critic` (ADR 0024):** judges motion from frames and the end state (criterion 7). Nothing reviews motion *code* against craft rules; `docs/motion.md` and the `motion-*` skills cover principles and the React API.
- **`motion-foundations`, `motion-patterns`, `motion-advanced`:** `motion/react` only (Next.js `"use client"`, `AnimatePresence`). Most of Codraft's motion is CSS and small TypeScript modules, where `animate` and `animation-performance` fit better.
- **`/lab`:** already does what `prototype` does (prototypes A–E, the option pages). Its picker adds replay and keyboard switching; its "delete after the choice" conflicts with keeping the lab as a record (ADR 0015).
- **`e2e-runner`, `a11y-architect`, `react-testing`:** test journeys and accessibility; none has a catalogue of worst-case data like `break-ui`.

## Decided (ADR 0026)

The client chose the setup first and nothing in the site for now:
- **Added to `~/.claude/skills/`, adapted:** `animate` (+ `RECIPES.md`), `animation-performance`, `mobile-native`, `break-ui` (+ `CATALOG.md` with Croatian values). Each keeps the MIT licence and names its origin.
- **Adaptations:**
  - the project's tokens and recorded decisions take precedence over the skills' default values
  - a one-axis line reveal from `scaleX(0)` counts as drawing
  - `mobile-native`'s baseline split into "every site" and "app shell only"; no `user-select: none` on links
  - its `interactive-widget` claim corrected
  - every locale tested in `break-ui`
  - the canned opening lines and the references to skills that are not installed removed
- **Existing files:**
  - `motion-patterns` points CSS-only motion to `animate`
  - three write-time lines in `~/.claude/rules/web-standards.md`
  - the skills named in phases 2–5 of `.claude/rules/codraft-workflow.md` and in `docs/motion.md`
- **The proposals below** wait for the client's word; point 3 is an open consideration (both colours to be tried on a phone).

## Proposed for the client

Ideas only, adopted into the project's own files, each on the client's word:

1. **Guard 320 px** (from `break-ui`; WCAG 2.2 1.4.10 Reflow). Today the pages pass, but nothing checks it: E2E runs at 375/768/1440 and the capture starts at 375. Add an overflow-only E2E check at 320 px, and 320 to the capture's widths.
2. **Worst-case data for phases 3–5** (`break-ui` catalogue, adapted to Croatian), written into the phase documents as test cases:
   - team cards: a long name with Đ/Č and a hyphen, a long role, a missing photo
   - the forms: a long unbreakable e-mail, the same length limits in the client and server schema, every error state
   - the AI assistant demo: a long URL in an answer, Markdown and `<script>` shown as text, an API error, an empty message
   - HR vs EN length of buttons and navigation
   - counts in Croatian need three plural forms (1 dan, 2 dana, 5 dana, 21 dan): `Intl.PluralRules("hr")`
3. **`theme-color`: a question for the client** (from `mobile-native`). The brand package sets navy `#0F1B2D`, so Chrome on Android tints its bar navy above the paper header of direction D. The skill's rule is to match the header (`#F6F5F1`). Keeping navy as a frame is also a legitimate choice.
4. **A motion-code checklist in `docs/motion.md`**, for `/check` in phase 3, so new pages keep what the code already does: transitions for anything re-triggered quickly; hover motion only behind `(hover: hover)`; no per-frame CSS variables on a parent with many children; `will-change` only while moving; exit faster than entry.
5. **Optional:** the `prototype` picker (keys 1–N, R to replay, `?v=`) for option pages in phase 3, so motion can be replayed without a reload; and `-webkit-tap-highlight-color` as a detail under critic criterion 8, with `:active` states where it is removed.

**Not proposed:** installing the whole collection; `review-animations` and `find-animation-opportunities` (they push against recorded decisions); `apple-design`, `pick-ui-library`, `ask-sonner`, `animate-expo`, `write-swift`, `animation-vocabulary`. For the phase 3 OG images, `pick-ui-library`'s pick, Satori, is the usual tool; that choice belongs to phase 3, as a dependency outside the approved architecture.
