# Design critique

How the design gets an independent critique: who does it, what it looks at, how to run it, and what happens to its findings. The decision is [ADR 0024](decisions/0024-independent-design-critique.md); the evaluation of the outside skills that led to it is in [research/2026-10-20-design-critique-skills.md](research/2026-10-20-design-critique-skills.md).

## Why

Until now the design was reviewed only by the session that built it, using the self-critique in `frontend-design`. The `/check` procedure routes code to reviewer agents and skips CSS and copy, so nobody else looked at the visual side. A critic that didn't make the design, works from what a visitor sees, and measures instead of guessing closes that gap.

## The parts

| Part | Where | What it does |
|---|---|---|
| The critic | `.claude/agents/design-critic.md` | A project agent, in the repository so every team member's Claude Code has it. Report only. It holds the criteria, the process, the rules of independence and the report format. |
| The capture | `scripts/design-capture/` (`npm run design:capture`) | Screenshots and measurements of the rendered pages; the critic works from these. |
| This guide | `docs/design-critique.md` | How the session that runs the critique uses both. |

## What the critic looks at

**Eleven criteria**, each tied to a published standard or to the project's own decisions:
1. first impression and hierarchy
2. art direction and brand (including the defaults of generated design, from `frontend-design`)
3. typography (Bringhurst)
4. layout, grid and spacing
5. colour and contrast (WCAG 2.2 AA)
6. drawings, icons and the drafting language (ISO 128 and 129 conventions, for an audience of architects)
7. motion (`motion.md`)
8. interaction states and details
9. responsive behaviour
10. communication, conversion and trust (NN/g; ADR 0004 and 0017)
11. consistency and system integrity

**Five lenses** narrow a run to some of the criteria:

| Lens | Criteria |
|---|---|
| `full` | All eleven |
| `art-direction` | 1, 2, 5, 6, and the concept of 7 |
| `craft` | 3, 4, 8, 9, 11 |
| `communication` | 1, 10, and the readability side of 3 |
| `motion` | 7 and 8 |

**Six phases** in every run:
1. Prepare the capture.
2. A blind first look, before any project document.
3. Learn the brief and list the client's decisions.
4. Review every criterion at every width.
5. Verify each finding against the screenshots, the metrics and the code.
6. Classify and report.

**Findings have three severities** (Blocking, Major, Minor), at most 15 per run.

**Anything that conflicts with a client decision is a question, not a defect.** The client's words win (`.claude/agents/design-critic.md`, rule 3).

## The capture

`npm run design:capture -- [options] [page ...]` takes:

| Option | Default | Meaning |
|---|---|---|
| page | `lab/pocetna` | Site paths without the leading slash (Git Bash rewrites a leading `/`) |
| `--base` | `http://localhost:4321` | The running site |
| `--out` | `.playwright-mcp/design-review/<date>-<time>/` | The output folder (ignored by git) |
| `--widths` | `375,768,1024,1440,1707,1920` | Viewport widths; 1707 and 1920 are the client's laptop and monitor |
| `--motion` | `1440` | Widths for the motion frames, or `none` |

For each page and width it writes:
- one screen at a time, the whole page, and each part of the sheet, in the final state (reduced motion)
- the open menu, the first six keyboard focus stops (at 375 and 1440 px) and hover (from 1024 px)
- motion: the first screen held at seven moments, and the page scrolled at reading pace in real time
- `metrics.json`: the words on every rendered line of every text block, type, colour, contrast against the colour behind, the measure, control sizes, the parts of the sheet, axe, console errors and overflow

`index.md` lists every file with what it shows, and the leads the measurements give:
- long or short lines
- a word alone on a last line
- a one-letter word at a line's end
- low contrast
- small controls

It removes the lab's bar and Astro's dev toolbar. Text inside SVG isn't measured, and contrast on graph paper is approximate. One page at six widths with motion takes about a minute and writes about 150 screenshots.

The dev server is enough for a visual critique. To capture under the real CSP, use the lab build:

```sh
npm run build:lab
HOST=127.0.0.1 PORT=4322 node ./dist/server/entry.mjs   # PowerShell: $env:HOST="127.0.0.1"; $env:PORT="4322"; node ./dist/server/entry.mjs
npm run design:capture -- --base http://127.0.0.1:4322 lab/pocetna
```

## Running a critique

1. **Capture once.** All critics of a round read the same capture, so they see the same thing.
2. **Launch the critics in one message**, so they run in parallel, each with its lens:
   - **A review round**, such as the end of the phase 2 refinements: `art-direction`, `craft` and `communication`, plus `motion` when the motion changed.
   - **One page in phase 3:** one critic with the `full` lens (proposed; it waits for the client's word, see ADR 0024).
3. **Brief each critic with facts only.** Never add a judgement of the design: the critic must form its own.

   ```text
   Critique /lab/pocetna with the lens art-direction.
   Capture: .playwright-mcp/design-review/2026-10-20-1500/ (commit abc1234).
   Focus: the whole page.
   Context: phase 2, after the client's refinement batches 1–15.
   ```
4. **Verify before anything reaches the client.**
   - Open the cited screenshots and check the code.
   - Merge what several lenses found into one item.
   - Drop what doesn't hold.
   - A finding that touches a client decision becomes a question.
5. **Report to the client in Croatian, as options.** Keep the scope rule: change only what the client approves; wider changes go to the client as options first.
6. **Record it:**
   - The verified critique goes to `docs/research/YYYY-MM-DD-design-critique-<scope>.md`, with the critics' verdicts as they gave them.
   - The screenshots it cites are copied to `docs/phases/screenshots/phase-<n>/critique/`.
   - The client's answers go into the current phase's document.
7. **After the approved changes,** capture again. If the client wants, run once more only the lens that raised them.

## Limits

The critic is a model looking at screenshots, not a human designer. It can't judge:
- colour on a calibrated screen
- other browsers (the capture is Chromium) or real devices
- the smoothness of motion between frames
- whether the copy is approved

It shares blind spots with the session that built the design, which is why the brief carries no judgement and the first look is blind. The client's eye stays the final review.
