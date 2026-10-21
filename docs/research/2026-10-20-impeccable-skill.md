# The Impeccable design skill (2026-10-20)

The client asked for a detailed, critical evaluation of the outside skill [pbakaus/impeccable](https://github.com/pbakaus/impeccable): what it does, how good it is, whether it fits this project, what overlaps with what we have, and what to take from it. The conclusion led to [ADR 0025](../decisions/0025-browser-details-and-critique-re-check.md). The client's general notes on the skill, for later projects, are kept outside this repository.

## Source

- **Repository:** https://github.com/pbakaus/impeccable, cloned at commit `374a0e1` (2026-10-20). Skill 4.7.0, engine 0.1.16, Apache 2.0.
- **Read in full:**
  - `SKILL.md`
  - the 44 reference files
  - the four agents (the `degraded/` copies are the same text with a preamble)
  - the launchers `scripts/impeccable` and `impeccable.cmd`
- **Read in part:** the Rust engine (`crates/`), for its network calls, telemetry, image generation and the detector rules that touch this design. Not read: the minified `live-browser.js` (563 KB) and the vendored screenshot library.
- **GitHub API, 2026-10-20:** 83,556 stars, 5,053 forks, about 2,500 commits since 2025-11-16. Releases every 3 to 6 days (skill 4.5.2 on 10-09, 4.6.0 on 10-15, 4.7.0 on 10-19).
- **Confidence: high** for everything below, read from the source itself. The detector's behaviour on our pages is inferred from its code; it was not run.

## What it is

A product rather than a skill:
- **One skill with 24 commands:** `critique`, `audit`, `polish`, `typeset`, `layout`, `bolder`, `quieter`, `distill`, `animate`, `colorize`, `clarify`, `harden`, `adapt`, `optimize`, `live` and others.
- **A Rust engine:** the launcher downloads it on first run into `~/.impeccable/bin/`.
- **A detector of 61 deterministic rules:** it runs as a hook after every Write or Edit, and on Stop.
- **A live mode:** it injects a script into the dev page and writes variants into the source files.
- **A new-design flow:**
  - a direction "roll" from the impeccable.style API
  - a decision page
  - comp images through the harness or the OpenAI API (`gpt-image-2.5-flare` by default)
- **Its own files:** `PRODUCT.md`, `DESIGN.md` (Google Stitch format) and `.impeccable/`.

## Quality

**Strong:**
- **`craft-floor.md`:** a one-page quality floor. It includes "browser surfaces", the parts the browser draws itself (text selection, the caret, focus rings, underline offset, tabular numerals), which generated pages almost always leave at the defaults.
- **`polish.md` and `bolder.md`:** refinement never smuggles in a redesign, and scope is sovereign.
- **`typeset.md`:** the line-break rules.
- **The finish reviewer's verdict pass:** after fixes, each finding is scored resolved, partial or unresolved from new captures, and "the parent's narration of what was fixed is not evidence".
- **The detector:** for example `line-length`, `straggler`, `heading-rhythm`, `content-hidden-at-rest`, `tiny-text`, `skipped-heading`.

**Weak:**
- **Generic or app-oriented:** `harden`, `optimize`, `adapt` and `onboard` are generic checklists, partly dated (GraphQL, CDN, "bottom navigation on mobile").
- **`critique`:** it scores Nielsen's ten heuristics, half of which barely apply to a marketing page, and uses generic personas.
- **Contradictions:**
  - "The brief wins", yet a label above a heading is "a ban, not a default: no brief earns it back".
  - `craft-floor.md` asks for themed scrollbars; `operate.md` calls custom scrollbars reinventing standard affordances.
- **Heavy procedure:** gates, a "contract violation" for skipping the roll, mandatory closing questions, recommendations limited to its own commands. It is designed to push an unattended model to ambition; this project's direction is the client's.

## Fit for Codraft

Poor as a package:
- **The new-design flow assumes an open direction.** The direction is chosen (ADR 0015). In phase 3 the flow would roll structures for every page, while pages follow `docs/information-architecture.md`.
- **Its taste works against recorded decisions.** From the detector's code:
  - `.graph-paper` has the shape `codex-grid-background` looks for (four 1 px gradient lines). Whether it fires depends on whether the scan resolves our size variables.
  - The 01/02/03 bubbles may trigger `numbered-section-labels`.
  - The paper `#F6F5F1` clears `cream-palette` by one unit (warmth 5, threshold 6), and the new-design flow treats cream or paper grounds as a failed rendition.
  - "One authored moment" of motion conflicts with ADR 0015, 0022 and 0023.
- **Outward-facing and outside the approved architecture:**
  - the roll API call, with telemetry on until switched off
  - image generation through an OpenAI key
  - a downloaded binary run after every edit, also on `.ts` and `.js`
- **Supply chain:**
  - The binary is checked against a `.sha256` from the same release and is not signed.
  - The Windows launcher says it has "not yet" been tested "on a real Windows machine".
- **A second home for the design system.** `PRODUCT.md` and `DESIGN.md` would compete with `docs/`, the tokens (ADR 0016), `/lab/style` and Figma.

## Overlap

| Ours | Impeccable | Verdict |
|---|---|---|
| `frontend-design` | new-work, craft-floor (its README says it started from `frontend-design`; the calibration list is nearly the same) | Keep `frontend-design`: lean, and it served all of phase 2 |
| `design-critic` (ADR 0024) | `critique`, finish reviewer | Keep `design-critic`: it is built on the client's decisions, six widths with metrics, Croatian typesetting and ISO 128/129 |
| `motion-*` | `animate` | Little overlap: `motion-*` is the React library, `animate` the principles |
| `frontend-a11y`, `a11y-architect` | parts of `audit`, `harden` | Ours are deeper |
| `performance-optimizer` | `optimize` | Ours is deeper |
| `seo`, `seo-specialist` | — | None |

## Taken (ADR 0025)

1. **Selected text and the text cursor in brand colours,** and a critic check of what the browser draws (criterion 8).
2. **"More space above a heading than below it"** as a critic check (criterion 4), with each text block's height now in the capture's metrics.
3. **A re-check** that scores earlier findings resolved, partial or unresolved from a new capture.
4. **Reduced motion removes movement, not meaning,** in `docs/motion.md` and criterion 7.

Not taken: the skill itself, its hook and the detector. A one-off manual detector run in phase 5 or 6 stays an option for the client, since it downloads the engine.
