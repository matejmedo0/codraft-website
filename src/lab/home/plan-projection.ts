/**
 * How Home's floor plan turns into its 3D view (the client's review, #58):
 * the plan rotates on the sheet and tilts back, and the walls rise from it.
 * The view is a parallel projection seen from above, like an axonometric
 * drawing: a turn of the plan, a vertical squash for the tilt, and a rise
 * per unit of height. Shared by the model (plan-model.ts, at build time)
 * and the timelapse (plan-timelapse.ts, in the browser), so the tilted plan
 * and the walls rising from it line up exactly.
 *
 * Erasable syntax only, so Node can import it in scripts.
 */

export type Point = [x: number, y: number];

export interface View {
  /** The plan's turn on the sheet, in degrees (clockwise). */
  rotate: number;
  /** The plan's scale across the sheet. */
  scaleX: number;
  /** The plan's scale down the sheet: the tilt. */
  scaleY: number;
  /** How far one unit of height rises on the sheet. */
  rise: number;
  /** Where the model sits: a shift of the plan's centre, in drawing units. */
  shift: Point;
}

/** The plan's centre, which the view turns about. */
export const PIVOT: Point = [50, 35];

/** The plan as drawn: no turn, no tilt. */
export const PLAN_VIEW: View = {
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  rise: 0,
  shift: [0, 0],
};

/**
 * The 3D view: seen from the south-west and from above (about 53° up),
 * scaled to fit the sheet beside the title block. The tilt and the rise
 * are the sine and cosine of the same angle (0.8 and 0.6), times the scale.
 */
export const MODEL_VIEW: View = {
  rotate: -45,
  scaleX: 0.8,
  scaleY: 0.64,
  rise: 0.48,
  shift: [-8, -2],
};

/**
 * How the 3D view plays (review #63): it stays (the final state is the
 * model), it returns to the plan, or a roof is set on the model.
 */
export type PlanModel = "stay" | "return" | "roof";

/**
 * The house's colours with a roof (review #65): a navy roof, a navy
 * facade, or blue tones. PlanDrawing's CSS holds the colours.
 */
export type HousePalette = "navy-roof" | "navy-walls" | "blue";

/** With a roof, the model sits a little lower, so the roof fits the sheet. */
export const ROOF_VIEW: View = { ...MODEL_VIEW, shift: [-8, 0] };

/** The 3D view of an option. */
export function modelView(model: PlanModel): View {
  return model === "roof" ? ROOF_VIEW : MODEL_VIEW;
}

/** Where a point of the floor lands on the sheet in a view. */
export function ground([x, y]: Point, view: View): Point {
  const angle = (view.rotate * Math.PI) / 180;
  const dx = x - PIVOT[0];
  const dy = y - PIVOT[1];
  return [
    PIVOT[0] +
      view.shift[0] +
      view.scaleX * (dx * Math.cos(angle) - dy * Math.sin(angle)),
    PIVOT[1] +
      view.shift[1] +
      view.scaleY * (dx * Math.sin(angle) + dy * Math.cos(angle)),
  ];
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

/**
 * The view as a transform of the plan's group: for the SVG attribute
 * (`syntax: "svg"`) or for CSS (`"css"`, with units). The same four
 * functions in both, so CSS interpolates them one by one: the plan turns
 * and tilts about its centre, and doesn't drift.
 */
export function viewTransform(view: View, syntax: "svg" | "css"): string {
  const [cx, cy] = PIVOT;
  const x = round(cx + view.shift[0]);
  const y = round(cy + view.shift[1]);
  if (syntax === "svg") {
    return `translate(${String(x)} ${String(y)}) scale(${String(view.scaleX)} ${String(view.scaleY)}) rotate(${String(view.rotate)}) translate(${String(-cx)} ${String(-cy)})`;
  }
  return `translate(${String(x)}px, ${String(y)}px) scale(${String(view.scaleX)}, ${String(view.scaleY)}) rotate(${String(view.rotate)}deg) translate(${String(-cx)}px, ${String(-cy)}px)`;
}
