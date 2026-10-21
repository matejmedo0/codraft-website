# Motion

> **Status (2026-10-19):** the agreed motion concept. The tokens are built: `src/styles/motion.css` for CSS and `src/styles/motion.ts` for React islands, kept in step by a unit test. The client approved the logo entrance on 2026-10-19, for the home hero only ([ADR 0014](decisions/0014-logo-animation-web-copies-and-local-review.md)), and kept all four moments of round 2 with the chosen direction ([ADR 0015](decisions/0015-design-direction-model-i-list.md)): the logo entrance, the CAD drawing in layers, the section transitions and the lines through the steps.

## Idea

The client asked for animation that is high quality and **not generic**. The concept: every motion is a **CAD action** with a clear UI meaning. It comes straight from the brand. The main icon's four corner squares are selection grips, and the blue line in the wordmark is a drafting line ending in a grip. This motion vocabulary belongs to Codraft and no template has it.

## Vocabulary

| CAD action | Where it is used | Spec |
|---|---|---|
| **Select (grips)** | Hover and keyboard focus on cards, buttons, nav items, form fields | Four hollow blue squares (from icon C) appear at the corners; scale 0.6 → 1 plus fade, 140 ms. A real focus outline always stays. Static under reduced motion. |
| **Draw a line** | Hero wordmark (once); section dividers; audit-form progress (step nodes are grips, the line grows between them) | Reveal from the left, then the grip snaps in; 600–800 ms. Plays once and never again when scrolling back. In the wordmark the line completes the "f" and "t" crossbars. |
| **Dimension** | Only next to real numbers: timeline in weeks, page weight, response time | Extension lines, ticks and a monospace label draw in over 480 ms (`--motion-slow`). |
| **Layers** | Layer viewer on the drafting page; the floor plan on Home | Toggle buttons styled like a CAD layer manager (`aria-pressed`). On first view, layers reveal once in order: grid → outlines → hatches → dimensions → title block. Home's floor plan draws like a timelapse of drafting (review batch 5): element by element, each wiped in along its own direction, layer after layer (axes, walls, openings, dimensions, title block), about 5 s, with the layer list switching on in step. Then it rises into a 3D model (review #58): the axes and dimensions switch off with their lamps, the plan turns and tilts into an axonometric view (1200 ms, `--ease-pen`), and the walls rise from it (900 ms, `--ease-standard`); the 3D view is the final state. The client chose the ending with a roof (#64): once the walls are up, a roof comes down onto them (700 ms, `--ease-standard`), and the final state is the house, in palette 1 (#66). `/lab/tlocrt-3d` keeps the other two endings as the record (#63). |
| **Snap** | Pressing buttons, toggles, consent switches | 80 ms scale to 0.98. |
| **Plot stamp** | Form success | The confirmation appears as a stamped title block: "Zaprimljeno · 18. 10. 2026." |
| **Page change** | Navigation between pages | Cross-document View Transitions where supported: 200 ms crossfade (`--motion-base`); the header stays still. |

**The process line and the service icons in "Što radimo" follow the scroll** (the client's review, batches 14 and 15; [ADR 0022](decisions/0022-service-icons-on-home.md), [ADR 0023](decisions/0023-process-line-follows-the-screen.md); `axis-line.ts`):
- **The line** is one element from bubble 01 to bubble 03, scaled from its top. Its tip follows the screen continuously (batch 15): it reaches down to 85 % of the screen's height as you scroll, eased so that a fast scroll is caught up in about `--motion-follow` (280 ms), smoothly and never in a jerk. It only ever grows; nothing runs backwards when you scroll up. No scroll-jacking: the page scrolls as always, and the line only follows.
- **The icon** starts as the tip of the line reaches it: its strokes run along their paths in drawing order, at most 60 ms apart, the blue drafting line last, then the grip snaps in (`--motion-fast`, `--ease-spring`). An icon takes at most 450 ms. The right icon of a row starts 40 ms after the left; if the tip passes several rows in one frame, each further row starts 60 ms later. The services below the line's end start when the screen's 85 % mark reaches them.
- Services already above the screen (a reload mid-page, a jump from a link) show their icons complete at once, and the line jumps past them.
- Only the line and the icons wait; the text is always there. Their waiting state is set under the `js` class from the first paint. Without JavaScript the line and icons are complete; with reduced motion too. An IntersectionObserver switches the scroll handling on only while the section is near the screen; `will-change` is set only while the line moves.

The earlier behaviour of batch 3 (one stroke at a constant speed once the section reached its trigger) left the lab with its comparison page `/lab/sto-radimo` (review #108); it is in git history.

## Principles

1. **Every motion must earn its place.** It guides attention, communicates state, or keeps spatial continuity. If it does none of these, cut it.
2. **One moving thing per viewport at a time.** Body text appears instantly; motion is for key moments only, not fade-up-on-everything.
   - `draw.ts` enforces it for the parts that draw once (review #78, after the critique of 2026-10-21). A part that reaches its trigger while another part is moving on screen waits for it.
   - Meanwhile the moving part plays at double speed, and the waiting part does too when its turn comes, so a fast scroll gives quicker drawings and a slow one the full motion.
   - The floor plan on Home is the exception (`data-draw-steady`, review #127): it keeps its own pace, about 8.3 s to the roof, after waiting and while others wait for it. A part behind it waits for the whole of it, or shows its final state if it has left the screen by its turn.
   - Parts that reach their trigger in the same frame, as after a jump down the page, take their turns in reading order, top to bottom (review #126).
   - A part that is off the screen by its turn shows its final state at once, and so does a moving part that leaves the screen.
   - A selection's release (the fade after its hold) doesn't count as movement.
   - An element that moves with a part but sits beside it, such as a zone's letter, has `data-draw-with`.
   - A replay starts at once, at full motion.
3. **Never take over the scroll.** No scroll-jacking, no pinned scroll sequences, no smooth-scroll libraries, no parallax.
4. **The LCP element is visible at first paint.** The hero H1 never waits for an animation. Only decorative elements animate.
5. **Compositor-friendly.**
   - Animate `transform` and `opacity`; use `clip-path` only for the line reveal.
   - Never animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
6. **One-shot reveals use IntersectionObserver.** CSS scroll-driven animations are progressive enhancement only.
7. **Shape echoes the grips:** corner radius 2 px on controls and panels; the drawing vocabulary (sheet frame, zone rules, title block, grips) stays square ([ADR 0015](decisions/0015-design-direction-model-i-list.md)).

## Reduced motion

When `prefers-reduced-motion: reduce` is set:
- No transforms.
- Only fades of 200 ms or less, or no animation at all.
- Final states are shown immediately. The logo appears complete and the layers appear all on.
- Grips still appear on focus, but without the scale animation.
- Movement goes; meaning stays. Focus, hover, the open menu and every other change of state stay visible, at once or with a short fade, and nothing waits hidden for an animation that never runs ([ADR 0025](decisions/0025-browser-details-and-critique-re-check.md)).

## Tokens (built in phase 2, `src/styles/motion.css`)

| Token | Value | Typical use |
|---|---|---|
| `--motion-instant` | 80 ms | Snap |
| `--motion-fast` | 140 ms | Grips, small state changes |
| `--motion-base` | 200 ms | Page-change crossfade, menus, a dimension's value |
| `--motion-snap` | 320 ms | A grip snapping in at the end of a line |
| `--motion-slow` | 480 ms | Dimension lines; a selection's release |
| `--motion-draw` | 700 ms | Drafting line reveal |
| `--motion-entrance-delay` | 250 ms | The pause before the logo entrance |
| `--motion-hold` | 1700 ms | How long a zone rule stays selected |
| `--motion-follow` | 280 ms | How soon a part following the scroll catches up: the process line (review batches 14–15) |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most UI transitions |
| `--ease-pen` | `cubic-bezier(0.5, 0, 0.2, 1)` | Drawing lines, like a pen stroke || `--ease-spring` | `linear()` of the "snappy" spring (300/30) | Grips |
| `--ease-snap` | `linear()` of the "snap" spring (400/24) | A grip snapping in |

The springs come from `motion-foundations`; CSS uses them sampled into `linear()`, and `motion.ts` keeps the spring parameters for islands.

## Ruled out

These all read as "template":
- scroll-jacking and pinned scroll stories
- smooth-scroll libraries
- parallax
- generic fade-up on every block
- gradient blobs and glassmorphism
- bento grids
- logo marquees
- fake counters
- the "centred hero, two buttons, screenshot" formula

## Skills

- `motion-foundations` for tokens, springs, reduced motion and SSR safety.
- `animate` for motion in CSS and small TypeScript modules, which is most of this site: whether to animate, which tool, interruption, hover gating ([ADR 0026](decisions/0026-emil-kowalski-skills-in-the-setup.md)). This document's tokens and the client's decisions win over its default values (e.g. its 300 ms limit for UI does not apply to the drawing moments).
- `animation-performance` when motion stutters.
- `motion-patterns` for React islands: buttons, stagger, page transitions and scroll reveals.
- `motion-advanced` only for complex pieces: the wordmark line draw, the layer viewer and SVG path work.
