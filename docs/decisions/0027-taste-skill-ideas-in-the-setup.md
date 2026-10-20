# 0027. Ideas from Taste Skill in the critic, the animate skill and phase 3

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

The client asked for a critical evaluation of the outside skill [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) ([research/2026-10-20-taste-skill.md](../research/2026-10-20-taste-skill.md)), under five standing rules:
1. don't touch the site
2. check the overlap with the existing skills, agents and rules
3. propose only what is useful for this project
4. merge useful partial overlaps into an existing skill, or a new one
5. keep general ideas in the client's notes for later

The skill (MIT, release 2.1.3) deals an art direction from a library, holds pages to a strict house style measured in a real browser, and critiques its own screenshots:
- **Its house rules ban this project's direction** (ADR 0015): hairline rules and grids, selection handles, 01/02/03, gradients (the graph paper), monospace, small tracked capitals. They also require photographs and a minimum amount of motion on every page.
- **Its lint over `src/`** gives 40 FAILs, all the client's direction or false positives. Its colour rule flags the brand ground `#F6F5F1` as a generated-page cream.
- **In its own blind tests,** it never beat working without it on average.
- **Its trigger** covers any web page in any stack.

Parts of it are sound and missing here: checks on the frame of a page, the idea carried to the last section, motion measured on award sites, and proof that is true by construction.

The client approved the proposal: „Odobravam“.

## Decision

1. **Taste Skill is not installed.** Its scripts, library, house rules and scoring are not adopted.
2. **The `design-critic` agent gains five checks** (`.claude/agents/design-critic.md`):
   - **The frame of a page** (criterion 4): equal outer margins, the header on the content's margins, no text within 16 px of the screen's edge, two or three left edges, no blank stretch over half a screen, no half left empty. The critic computes these from the capture's `metrics.json` and confirms each in the screenshots. Every large empty area is a rest that something closes, or a hole.
   - **The idea reaches the last zone and every page, and sameness of layouts** (criterion 2). The client's deliberate repetitions are questions, not defects.
   - **The costume test for the drafting language** (criterion 6): every rule, grip, dimension, number and title-block cell should carry something real. One that carries nothing is raised as a question for the client; the direction itself stands.
   - **Three levels of detail in drawings** (criterion 6).
   - **Croatian typesetting details and the character budget of a long heading** (criterion 3), as copy questions; the critic still never rewrites the copy.
3. **The global `animate` skill gains, adapted** (MIT notice in `LICENSE-taste-skill`, origin in its front matter, the earlier version backed up in `~/.claude/backups/2026-10-20-taste-skill/`):
   - CSS scroll-driven animation and cross-document view transitions in its tool ladder, with recipes, as progressive enhancement only
   - the values that ran on 99 award sites, for marketing pages without their own
   - limits that keep moving text readable
   - three "never ship" rows: content hidden with no fallback, `overflow: hidden` around a `view()` animation, eased scroll-linked motion

   Its scroll-reveal recipe now keeps the hidden state under a `js` class and `prefers-reduced-motion: no-preference`. The project's tokens and decisions still come first (ADR 0026).
4. **Phase 3 starts each page with its argument** (`docs/phases/3-pages.md`): one claim per zone, each with proof that is true by construction (ADR 0004). A zone with no claim is cut or merged. The words stay the client's.
5. **Nothing in the site's code changes.**
   - Running the skill's browser inspector on `/lab/pocetna` waits for the client's word.
   - Measuring the frame in the capture script would be a change to `scripts/`, so it is only a proposal.
   - The skill's rule that the browser bar's colour follows the page's first field is recorded as an argument for the open `theme-color` question; the client decides.

## Consequences

- From phase 3, critiques point out frame faults, stock blocks after the hero and drafting devices that carry nothing, still sorted as defects or questions for the client.
- Motion in CSS has a documented path for scroll-linked effects and page transitions that needs no JavaScript and keeps the CSP. Firefox lacked both in stable in October 2026, so they stay enhancements.
- Each page in phase 3 begins with a short claims-and-proof table in its outline, approved with the copy.
- The `animate` skill lives in `~/.claude` on this machine, like the other global skills (open question 6 in `PROGRESS.md`).
