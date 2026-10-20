# Taste Skill's inspector on Home (2026-10-20)

The one-off run of Taste Skill's browser inspector on `/lab/pocetna`, approved by the client as review refinement 56 after the evaluation in [2026-10-20-taste-skill.md](2026-10-20-taste-skill.md) ([ADR 0027](../decisions/0027-taste-skill-ideas-in-the-setup.md)). The aim was a second, independent measurement of the page's frame, cross-checked against criterion 4 of the `design-critic` agent. Nothing was fixed; the real findings went to the client as options.

## Source and run

- **Tool:** `skills/taste-skill/scripts/inspect.mjs` from https://github.com/Leonxlnx/taste-skill at commit `63aba5f` (release 2.1.3, MIT), read in full with `lib/cdp.mjs`, `lib/probe.mjs` and `lib/rules.mjs` before the run.
- **Run:** once, on 2026-10-20, with Node 24.22.0 and the installed Chrome headless, against the dev server (`npm run dev`, so the lab bar and Astro's dev toolbar were on the page). Command, from a scratchpad folder outside the project:

  ```sh
  TASTE_SKILL_TMP=<scratchpad>/taste-run/tmp node <clone>/skills/taste-skill/scripts/inspect.mjs http://localhost:4321/lab/pocetna --out <scratchpad>/taste-run/inspect
  ```

- **What it did:** the page at 1440, 768 and 390 px; a screenshot of the first screen and contact sheets of every screen; the in-page measurements; then the page again at 1440 px with reduced motion. It wrote only to `--out` (9 JPEGs and `report.json`). Its temporary Chrome profile was deleted on exit; nothing was written to the project, to `.taste-skill/` or to `~/.taste-skill/`. The output stayed in the session's scratchpad and is not kept in the repository.
- **Cross-check:** `npm run design:capture -- lab/pocetna` right after it (`.playwright-mcp/design-review/2026-10-20-1849/`, ignored by git), with criterion 4 of [design-critic.md](../../.claude/agents/design-critic.md) computed from its `metrics.json`.
- **Confidence: high** for what the tool measured (its own report, the screenshots and the code it ran). The classification below was checked in the screenshots and in `src/`.

## Result

**11 FAIL and 4 WARN** (exit code 1). Measured at 1440 px: the hero heading in 3 lines at 69.9 px (3 lines at 768 px, 5 at 390 px); Archivo 93 % of the text, system-ui 7 % (the lab bar); 13 font sizes; 5.7 screens, 477 words, no raster images; no console errors, no horizontal overflow.

### The client's direction (listed only)

| Rule | Widths | Why it fires | Recorded in |
|---|---|---|---|
| `hairline` (21 rules), `outlined-box` (5) | all | The drawing sheet's frame, the zone rules and the item rules: the drafting language. | ADR 0015 |
| `numbering` ("01", "02", "03") | all | The three stages in "Što radimo". | ADR 0015, review batch 3 |
| `icon-cards` | all | The client's service icons, option B. The rule reads them as "cards topped with an icon"; at 1440 px they sit beside the titles. | ADR 0022, review #42–43 |
| `few-pictures`, `no-footage` | 1440 | No photographs or video by direction; the drawings are SVG, which the tool doesn't count. The team photos come in phase 3. | ADR 0015, the team strip |
| `palette-cream` | all | The brand package's off-white `#F6F5F1` (48°, 22 %, 95 %), which the rule calls "AI cream". | `docs/brand.md` |
| `headline-lines` | 1440, 768, 390 | The client's hero sentence (10 words). Three lines at 1440 px is known and accepted; 768 and 390 px follow from the same sentence. | Review open item 4 |

### False positives

| Rule | Widths | What it measured | Evidence |
|---|---|---|---|
| `gradient` (2) | all | The graph paper of the hero and the floor plan, drawn with `linear-gradient` lines. | `src/styles/utilities.css` (`.graph-paper`) |
| `shadow` (10) | all | The title block's cell lines, drawn with a `box-shadow` of `--rule` width. | `src/components/site/Footer.astro`, the cell rule |
| `off-centre` WARN | 1440 (41/73 px), 768 (28/57 px) | Its margin is a percentile over every box on the page, so the lab bar (16 px), the zone letters in the sheet's left margin and the title block's cells (41 px) pull the left side in. | Our capture, without the lab bar: content on 73/73 px at 1440 and 1707, 57/57 at 768 and 1024, 25/24 at 375; the header ends on the content's right edge. Header and zones share `--pad` inside a sheet with one margin (`Sheet.astro`). |

Astro's dev toolbar is in every screenshot but triggered no finding. On phones the tool took the lab bar for the hero section.

### Measured and real, but not defects

- **`empty-screens` at 1440 px:** screens 2 and 3, both in "Što radimo", hold 10 % and 16 % ink by the tool's sampling (text rectangles, pictures, colour fields), under its 20 % limit. By eye and by criterion 4 neither is a hole: the axis line closes the middle, and each stage's rules run to both margins. The zone is 1593 px tall (1.8 screens) for 141 words, with the services at 19 px. It is a density reading of the chosen central axis, and it matches what the client said in review #7 („ima dosta praznog prostora“) before choosing it. Our capture's text-box share for the same screens is 20 % and 18 %; the two methods differ, and neither is a standard.
- **`size-count` WARN (13 sizes):** the token scale gives eight (`--step-display` to `--step-label`), the sheet's marks one (11 px), the stage bubbles one (14 px, `services.css`), and two are local steps: `--step-service` (19 px at 1440, in `src/lab/home/services.css`, from review #7) and `--step-heading` (25 px, in `Steps.astro`). With `--step-title` at 22 px, that is three sizes 3 px apart. The rest is the lab bar (system-ui).

### Passed

Covered text and text clipped while scrolling; text closer than 16 px to the edge; blank stretches over half a screen; more than six left edges (it found two at 1440 px, three at 768 and 390); content on one side only; the void beside the hero; the heading readable 1.2 s after load; **text hidden with reduced motion** (none on the first screen); contrast; body size; horizontal overflow; console errors.

The contact sheets caught some service icons before they were drawn: they draw as the process line reaches them (ADR 0022, 0023), and the tool screenshots each screen soon after scrolling. Not a finding; our capture checks the motion separately.

## Against criterion 4

| Check | Inspector | Criterion 4 from our capture |
|---|---|---|
| Equal outer margins | WARN at 1440 and 768 (false, see above) | Equal at every width from 375 to 1707 px; at 1920 px only the sheet's numbers reach the edge (known item #23) |
| Header on the content's margins | — | Yes: the header's right edge is the content's |
| Text near the edge | None | None below 1920 px |
| Two or three left edges | 2–3 | One main anchor (73 px at 1440); the other edges are the axis's right-aligned column and the second columns |
| Blank stretch over half a screen | None | One at 768 px in "Tehničko crtanje" (3564–4215), filled by the floor plan: a rest |
| Screen density | Screens 2 and 3 at 1440 px | Not measured |

The two agree on the frame. Criterion 4 is more accurate on margins, because the capture removes the lab's chrome and measures per zone. The inspector adds one thing criterion 4 doesn't have, a per-screen density reading, and here the eye judged it a rest, not a hole.

## Proposed for the client

1. **Density of "Što radimo" at 1440 px:** (A) keep it, as the chosen option, with rests and no holes (recommended); (B) options on `/lab/sto-radimo` that tighten it on wide screens (less space between the stages, larger service lines); (C) leave it to the first run of the critic (open item 8).
2. **Font sizes:** (A) in phase 3, when "Što radimo" moves out of the lab, decide whether `--step-service` and `--step-heading` become steps of the scale or merge into their neighbours (recommended); (B) leave them.
3. **A density measure for the critic:** (A) no; the rest-or-hole test by eye in criterion 4 covers it (recommended); (B) add a per-screen ink share to `npm run design:capture`.

Nothing changes until the client chooses.
