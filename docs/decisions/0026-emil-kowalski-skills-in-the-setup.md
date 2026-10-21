# 0026. Four of Emil Kowalski's skills in the setup

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

The client asked for a critical evaluation of the outside skill collection [emilkowalski/skills](https://github.com/emilkowalski/skills) ([research/2026-10-20-emil-kowalski-skills.md](../research/2026-10-20-emil-kowalski-skills.md)):
- 15 small skills, Markdown only, MIT.
- Strongest on motion craft, written mostly for app UI.
- The project's code already follows most of its rules.
- Its strict reviewer would push against recorded motion decisions (ADR 0015, 0022, 0023).

The evaluation proposed five changes in the project. The client chose the setup first: „samo htio da dodaš ovaj emil kowalski paket skilova koji treba … u postojeće skilove i pravila, ništa ne mijenjamo drugo za sad“, then „samo ono što si ti preporučio … na način koji preporučuješ“, globally and in the project's rules.

## Decision

1. **Four skills are added to the global set** (`~/.claude/skills/`), adapted from commit `2d22863`, each with the MIT licence and its origin in the front matter:
   - **`animate`**, with `RECIPES.md`: CSS-first motion. Adapted so that the project's tokens and recorded decisions take precedence over its default values, and a one-axis line reveal from `scaleX(0)` counts as drawing.
   - **`animation-performance`**: why motion stutters.
   - **`mobile-native`**: touch and mobile details. Its baseline is split into "every site" and "app shell only": `user-select: none` on controls only, never on links; `overscroll-behavior: none` only for app shells. Its claim about `interactive-widget=resizes-content` is corrected.
   - **`break-ui`**, with `CATALOG.md`: worst-case data, extended with Croatian values (Đ, three plural forms, `1.284,50 €`, `20. 10. 2026.`, OIB, IBAN, addresses, HR/EN label length). Every shipped locale is tested.

   In all four, the author's canned opening line and the references to skills that are not installed are removed.
2. **Not added:** `review-animations`, `improve-animations`, `find-animation-opportunities`, `emil-design-eng`, `apple-design`, `pick-ui-library`, `prototype`, `animation-vocabulary`, `ask-sonner`, `animate-expo`, `write-swift`.
3. **Existing skills and rules:**
   - `motion-patterns` (global) says in its description that CSS-only motion goes to `animate`, so the two don't trigger on the same request.
   - The global rule `~/.claude/rules/web-standards.md` gains three write-time lines:
     - `transition` names its properties, and re-triggerable motion uses transitions, not keyframes
     - hover motion sits behind `(hover: hover) and (pointer: fine)`
     - fields are at least 16 px, and zoom is never disabled
   - The project's workflow (`.claude/rules/codraft-workflow.md`) names the skills in phases 2–5, and [motion.md](../motion.md#skills) lists `animate` and `animation-performance`. This document's tokens and the client's decisions win over the skills' defaults.
4. **Nothing in the site's code changes.** The project changes the evaluation proposed stay proposals for later (research note, "Proposed for the client"). The browser bar's colour (`theme-color`) is an open consideration: both options are to be tried on a phone, and the client decides later.

## Consequences

- **From phase 3:**
  - motion work in CSS loads `animate` instead of a React-only skill
  - pages with variable content, the forms and the AI assistant get `break-ui` with Croatian worst cases
  - touch details get `mobile-native`
- **Their defaults never override this project's decisions:** the 300 ms limit for UI does not apply to the drawing moments, and the grip's snap from 0.6 stays.
- **The skills live in `~/.claude` on this machine**, like the others (open question 6 in `PROGRESS.md`).
- **The client's general notes** on the collection, and what to add to other setups, are kept outside this repository.
