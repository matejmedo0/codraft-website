/**
 * The motion tokens for React islands (motion/react): the same values as
 * motion.css, which the CSS-only parts of the site use. motion.test.ts keeps
 * the two in step. The vocabulary and the rules are in docs/motion.md.
 */

/** Durations in milliseconds. motion/react takes seconds: `ms / 1000`. */
export const DURATION_MS = {
  instant: 80,
  fast: 140,
  base: 200,
  snap: 320,
  slow: 480,
  draw: 700,
  follow: 280,
  entranceDelay: 250,
  hold: 1700,
} as const;

export type CubicBezier = readonly [number, number, number, number];

export const EASING = {
  standard: [0.2, 0, 0, 1],
  /** A pen stroke: a slow start, a long glide, a gentle stop. */
  pen: [0.5, 0, 0.2, 1],
  /** Catching up with the scroll: a quick start, a soft stop. */
  follow: [0.2, 0.8, 0.2, 1],
} as const satisfies Record<string, CubicBezier>;

export interface SpringPreset {
  readonly type: "spring";
  readonly stiffness: number;
  readonly damping: number;
}

/**
 * Spring presets from motion-foundations (mass 1). CSS uses "snappy" and
 * "snap" sampled into linear(): --ease-spring and --ease-snap.
 */
export const SPRINGS = {
  /** UI state: grips, toggles. No visible overshoot. */
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  /** A grip snapping in at the end of a line: about 9 % overshoot. */
  snap: { type: "spring", stiffness: 400, damping: 24 },
  /** Panels landing softly. */
  gentle: { type: "spring", stiffness: 120, damping: 14 },
} as const satisfies Record<string, SpringPreset>;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor asked for reduced motion. Then every part shows its
 * final state at once. False while rendering on the server.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
