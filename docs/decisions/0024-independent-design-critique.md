# 0024. Independent design critique by a project agent

- **Status:** Accepted
- **Date:** 2026-10-20
- **Deciders:** client (Codraft team), Claude

## Context

Until now only the session that built the design reviewed it, using the self-critique in `frontend-design`. The `/check` procedure routes code to reviewer agents and skips CSS and copy. None of the installed agents judges visual design.

During the phase 2 refinements, the client asked for an independent and critical look at the design by professional standards. Two outside skills were evaluated first ([research/2026-10-20-design-critique-skills.md](../research/2026-10-20-design-critique-skills.md)):
- **Microsoft's `frontend-design-review`** is built for product UI checked against Figma. It conflicts with ADR 0015 and ADR 0016 and never looks at the rendered page.
- **Anthropic's `frontend-design`** is the skill already used to build the design; its critique is self-critique.

Neither is an independent critic, so the client asked for one of our own: "Napravi ga prvo detaljno i kvalitetno".

## Decision

1. **A project agent, `design-critic`** (`.claude/agents/design-critic.md`), lives in the repository, so every team member's Claude Code has it.
   - It reports only and never edits.
   - It judges by eleven criteria tied to published standards (Bringhurst; WCAG 2.2 AA; NN/g; Gestalt; the ISO 128 and 129 drafting conventions) and to the project's brand, motion concept and ADRs.
   - It works through five lenses and six phases, starting with a blind first look.
   - It never invents a number.
   - Its findings have three severities, at most 15 per run.
2. **The client's decisions are not defects.** A finding that conflicts with a recorded decision or the client's own words is a question for the client, with what would be gained and lost.
3. **The critic works from a capture, not from guesses.** `npm run design:capture` (`scripts/design-capture/`) gives it:
   - screenshots at six widths, including the client's two screens
   - the interaction states and frames of the motion
   - measurements of the rendered text and controls
4. **The session that runs the critique verifies every finding** before it reaches the client. The client decides every change, and a change goes only as far as the request.
5. **It runs on the client's word.** Running it after each page in phase 3, next to `/check`, is proposed and waits for the client's answer.

How to run it: [design-critique.md](../design-critique.md).

## Consequences

- The design gets a second pair of eyes that measures. The first run is the phase 2 review, when the client says so.
- **Cost of a run:** a capture of about a minute and 150 screenshots, and the critics' tokens. A review round runs three or four lenses in parallel.
- **Limits:** the critic is a model looking at Chromium screenshots, not a human designer. It can't judge calibrated colour, other browsers, real devices or the smoothness of motion between frames, and it may share blind spots with the session that built the design. The blind first look and a brief without judgement reduce that; the client's eye stays the final review.
- **Screenshots stay out of git.** They go to `.playwright-mcp/`; only the ones a recorded critique cites are copied into `docs/phases/screenshots/`.
