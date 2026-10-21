# Design critique skills (2026-10-20)

The client asked whether an outside skill could critique the design independently, and pointed to two. Both were read in full. The conclusion led to [ADR 0024](../decisions/0024-independent-design-critique.md).

## 1. Microsoft, `frontend-design-review`

- **Source:** https://github.com/microsoft/skills/blob/main/.github/skills/frontend-design-review/SKILL.md, plus its four reference files (`review-output-format.md`, `review-type-modifiers.md`, `quick-checklist.md`, `pattern-examples.md`). Read through the GitHub API on 2026-10-20. The folder has one commit, "skill: add frontend-design-review skill", dated 2026-02-24. **Confidence: high**, from the source itself.
- **What it is:** two modes, review and creation.
  - **Review** follows three pillars: "Frictionless insight to action" (three interactions at most, one primary action), "Quality is craft" (design system compliance, distinctive aesthetics, accessibility from WCAG 2.1 level A as the minimum) and "Trustworthy building" (AI disclaimers, actionable errors).
  - Issues are blocking, major or minor, and the report template ends in a verdict.
  - It credits the review framework to @Quirinevwm and the creative guidance to Anthropic's `frontend-design`.
- **Fit for Codraft:** poor, as it stands.
  1. It never looks at the rendered page. The review compares code to Figma (Dev Mode) and a component library (Storybook), with no screenshots, widths or motion.
  2. Figma is its source of truth. Here the code is ([ADR 0016](../decisions/0016-figma-for-design-iterations.md)), and Figma isn't synced with the refinements yet, so every refinement would show as a deviation.
  3. Its aesthetic checklist conflicts with the client's decisions: it asks for a display face paired with a body face (ADR 0015: Archivo only), for gradient meshes, noise and grain, and for asymmetry, overlap and broken grids, and it counts centred content as generic.
  4. Its accessibility floor (WCAG 2.1 A) is below the project's (WCAG 2.2 AA, no axe findings, contrast tests). It asks for light, dark and high-contrast themes, and the site has no dark theme.
  5. The "Trustworthy" pillar concerns AI content and error messages: phase 4, not phase 2.
- **Taken from it:** the three severities, a verdict with reasons, the questions "What can I do here?" and "What happens next?", and checks that values come from tokens and that every state is designed.

## 2. Anthropic, `frontend-design`

- **Source:** the official `frontend-design` plugin from `claude-plugins-official`, installed on this machine as version `a0b04d9ddcca` (updated 2026-10-19). The text the client found online is the same as the installed `SKILL.md`; they were compared paragraph by paragraph. **Confidence: high.**
- **What it is:** guidance for creating a design.
  - It grounds the design in the subject, and the brief's own words win.
  - It allows one or two typefaces and asks for restraint ("spend your boldness in one place").
  - It ends with self-critique from screenshots.
  - It lists the defaults of generated design (a cream ground with a serif and terracotta; a near-black ground with an acid accent; a broadsheet look with hairline rules and no radius; the SaaS card kit; template chrome such as ALL-CAPS eyebrows, middle-dot strings, monospace labels and "→" on buttons), and warns against non-user-triggered motion beyond one orchestrated moment.
- **Fit for Codraft:** good for building, and used in every phase 2 session. It is not an independent critic: its critique is done by whoever builds the design.
- **Taken from it:** the list of defaults as a calibration for the critic, judged against the brief (Codraft's paper ground and drawing-sheet rules are the client's direction); the rule that the brief wins; restraint as a criterion.

## A first check against the defaults (from the code, not yet seen)

Done while answering the client, from the code only. The critic's run will judge it visually.

| Default | In the code |
|---|---|
| Cream ground | The paper is `#F6F5F1`, close to it, but it is the client's final brand colour, with navy and blue, a sans and no terracotta. |
| Broadsheet | Partly: zone rules and square drafting elements, grounded in the drawing sheet. This is the main thing to judge visually. |
| Template chrome | None: labels are in sentence case, Archivo is the only family, and there are no middle-dot strings. A "→" appears only in the copy of the round 1 prototypes A and B. 01/02/03 mark a real sequence. |
| Card kit, near-black ground | None; the only `box-shadow` is the title block's. |
| Motion | Several self-running moments on Home, all requested by the client (ADR 0015, 0022, 0023). Whether they add up to one idea is a question for the client. |
