/**
 * Times one service icon's strokes (the client's review, batch 14): they
 * run along their paths in DOM order (ServiceIcon.astro: the navy ink, the
 * blue drafting line), at most STROKE_STAGGER_MS apart, then the grip snaps
 * in. The whole icon takes at most ICON_MAX_MS, so the stagger shrinks for
 * an icon with many strokes. The times go into --at and --for on each
 * stroke; services.css plays them. axis-line.ts calls this when the icon's
 * row starts.
 */
import { DURATION_MS } from "../../../styles/motion.ts";

/** How long one stroke takes. */
const STROKE_MS = 220;
/** The most time between two strokes' starts. */
const STROKE_STAGGER_MS = 60;
/** The longest an icon may take, from its first stroke to the grip. */
export const ICON_MAX_MS = 450;
/** The grip snaps in like the grips everywhere (docs/motion.md, "Select"). */
const GRIP_MS = DURATION_MS.fast;

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

/** Times `icon`'s strokes to start `delay` milliseconds from now. */
export function timeStrokes(icon: SVGSVGElement, delay: number): void {
  const strokes = [...icon.querySelectorAll<SVGElement>("[data-stroke]")];
  const count = strokes.length;
  // The last stroke before the grip, and the grip, both end in time.
  const stagger = Math.min(
    STROKE_STAGGER_MS,
    count > 2 ? (ICON_MAX_MS - STROKE_MS) / (count - 2) : STROKE_STAGGER_MS,
    count > 1 ? (ICON_MAX_MS - GRIP_MS) / (count - 1) : STROKE_STAGGER_MS,
  );
  for (const [index, stroke] of strokes.entries()) {
    stroke.style.setProperty("--at", ms(delay + index * stagger));
    stroke.style.setProperty("--for", ms(STROKE_MS));
  }
}
