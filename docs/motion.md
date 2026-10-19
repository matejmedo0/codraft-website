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
| **Layers** | Layer viewer on the drafting page | Toggle buttons styled like a CAD layer manager (`aria-pressed`). On first view, layers reveal once in order: grid → outlines → hatches → dimensions → title block. |
| **Snap** | Pressing buttons, toggles, consent switches | 80 ms scale to 0.98. |
| **Plot stamp** | Form success | The confirmation appears as a stamped title block: "Zaprimljeno · 18. 10. 2026." |
| **Page change** | Navigation between pages | Cross-document View Transitions where supported: 200 ms crossfade (`--motion-base`); the header stays still. |

## Principles

1. **Every motion must earn its place.** It guides attention, communicates state, or keeps spatial continuity. If it does none of these, cut it.
2. **One moving thing per viewport at a time.** Body text appears instantly; motion is for key moments only, not fade-up-on-everything.
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
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most UI transitions |
| `--ease-pen` | `cubic-bezier(0.5, 0, 0.2, 1)` | Drawing lines, like a pen stroke |
| `--ease-spring` | `linear()` of the "snappy" spring (300/30) | Grips |
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
- `motion-patterns` for buttons, stagger, page transitions and scroll reveals.
- `motion-advanced` only for complex pieces: the wordmark line draw, the layer viewer and SVG path work.
