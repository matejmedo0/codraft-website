/**
 * The residential building in the new Home's drafting scene (M28 in
 * docs/phases/3-pages.md): a site with the building in the middle, a
 * courtyard with a pool on its west side and parking on its east side, the
 * building four storeys high (ground floor and three floors) with a
 * penthouse set back on top. An illustration, not client work.
 *
 * Everything is in metres here; the drawing works in decimetres (`U`), so
 * the browser's clip insets and stroke widths read as on the house plan.
 * The axonometric view is the house plan's (plan-projection.ts): a turn of
 * the plan, a vertical squash for the tilt, and a rise per metre, so the
 * flat site plan can turn into the 3D view with one CSS transform.
 *
 * The gross floor areas and volumes the scene's table shows come from
 * these same boxes (`schedule`), so the numbers always match the drawing.
 * Erasable syntax only.
 */

export type Point = [x: number, y: number];

/** A box: plan corners in metres and its bottom and top heights. */
export interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  z0: number;
  z1: number;
}

/** Decimetres per metre: the drawing's unit. */
export const U = 10;

/** The site: 52 × 32 m. */
export const SITE = { width: 52, depth: 32 };

/** The storey height, floor to floor. */
export const STOREY = 3;

/** The building's footprint: 24 × 12 m. */
export const FOOTPRINT = { x0: 14, y0: 10, x1: 38, y1: 22 };

/** The penthouse, set back 4 m at the ends and 1 m at the sides. */
export const PENTHOUSE = { x0: 18, y0: 11, x1: 34, y1: 21 };

/** The storeys, ground floor first, with their names' locale keys. */
export const LEVELS = [
  { key: "newHome.building.level.ground", plan: FOOTPRINT },
  { key: "newHome.building.level.first", plan: FOOTPRINT },
  { key: "newHome.building.level.second", plan: FOOTPRINT },
  { key: "newHome.building.level.third", plan: FOOTPRINT },
  { key: "newHome.building.level.penthouse", plan: PENTHOUSE },
] as const;

export type LevelKey = (typeof LEVELS)[number]["key"];

/** The storeys as boxes, one on the other. */
export const BOXES: Box[] = LEVELS.map(({ plan }, index) => ({
  ...plan,
  z0: index * STOREY,
  z1: (index + 1) * STOREY,
}));

/**
 * The scene's clock (ms from its start, building-scene.ts): the plan
 * tilts into the 3D view at TILT_AT (--tilt-at in scene.css), then the
 * storeys come down one after another, each STOREY_STEP after the last.
 * The sections and the schedule beside the drawing keep the same clock
 * (BuildingAnalysis.astro, M37).
 */
export const TILT_AT = 2400;
export const TILT_FOR = 1200;
/** The site plan's dimensions switch off just before the tilt. */
export const DIMS_OFF_AT = 2300;
export const STOREY_AT = 3600;
export const STOREY_STEP = 320;

/** The building's height to the penthouse roof. */
export const HEIGHT = LEVELS.length * STOREY;

/** The courtyard's pool and its deck, 5 × 12 m and 9 × 16 m. */
export const POOL = { x0: 4, y0: 10, x1: 9, y1: 22 };
export const DECK = { x0: 2, y0: 8, x1: 11, y1: 24 };

/** The trees in the courtyard: centres and radius. */
export const TREES: Point[] = [
  [3, 3],
  [9, 3.5],
  [3, 28.5],
  [9, 28],
];
export const TREE_RADIUS = 1.6;

/** Parking: one row of 11 bays, 2.5 × 5 m, on the east, its aisle 6 m. */
export const PARKING = { x0: 40, x1: 51, bay: 2.5, depth: 5, y0: 3, count: 11 };

// The view -----------------------------------------------------------------

export interface View {
  /** The plan's turn, in degrees (clockwise on screen). */
  rotate: number;
  scaleX: number;
  /** The tilt: the plan's scale down the sheet. */
  scaleY: number;
  /** How far a metre of height rises on the sheet. */
  rise: number;
  /** A shift of the plan's centre, in metres. */
  shift: Point;
}

/** The site's centre, which the view turns about. */
export const PIVOT: Point = [SITE.width / 2, SITE.depth / 2];

/** Seen from the south-west, 35° from above: sin 35° and cos 35°. */
const AXO_RAW: View = {
  rotate: -25,
  scaleX: 1,
  scaleY: 0.574,
  rise: 0.819,
  shift: [0, 0],
};

/** Where a point lands on the sheet in a view, in metres. */
export function project([x, y]: Point, z: number, view: View): Point {
  const angle = (view.rotate * Math.PI) / 180;
  const dx = x - PIVOT[0];
  const dy = y - PIVOT[1];
  return [
    PIVOT[0] +
      view.shift[0] +
      view.scaleX * (dx * Math.cos(angle) - dy * Math.sin(angle)),
    PIVOT[1] +
      view.shift[1] +
      view.scaleY * (dx * Math.sin(angle) + dy * Math.cos(angle)) -
      z * view.rise,
  ];
}

function corners({
  x0,
  y0,
  x1,
  y1,
}: {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}): Point[] {
  return [
    [x0, y0],
    [x1, y0],
    [x1, y1],
    [x0, y1],
  ];
}

function bbox(points: Point[]): {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
} {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  return {
    x0: Math.min(...xs),
    y0: Math.min(...ys),
    x1: Math.max(...xs),
    y1: Math.max(...ys),
  };
}

const siteCorners = corners({ x0: 0, y0: 0, x1: SITE.width, y1: SITE.depth });

function axoPoints(view: View): Point[] {
  return [
    ...siteCorners.map((point) => project(point, 0, view)),
    ...BOXES.flatMap((box) =>
      corners(box).map((point) => project(point, box.z1, view)),
    ),
  ];
}

/** The 3D view, its whole drawing centred on the site's centre. */
export const AXO_VIEW: View = (() => {
  const raw = bbox(axoPoints(AXO_RAW));
  return {
    ...AXO_RAW,
    shift: [PIVOT[0] - (raw.x0 + raw.x1) / 2, PIVOT[1] - (raw.y0 + raw.y1) / 2],
  };
})();

/** The site plan as drawn: no turn, no tilt. */
export const PLAN_VIEW: View = {
  rotate: 0,
  scaleX: 1,
  scaleY: 1,
  rise: 0,
  shift: [0, 0],
};

const MARGIN = 4;

/** The drawing's viewBox, in decimetres: both views fit it, with a margin. */
export const VIEW_BOX: string = (() => {
  const box = bbox([
    ...axoPoints(AXO_VIEW),
    ...siteCorners.map((p) => project(p, 0, PLAN_VIEW)),
  ]);
  const x = (box.x0 - MARGIN) * U;
  const y = (box.y0 - MARGIN) * U;
  const width = (box.x1 - box.x0 + MARGIN * 2) * U;
  const height = (box.y1 - box.y0 + MARGIN * 2) * U;
  return [x, y, width, height].map((value) => round(value)).join(" ");
})();

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * The view as a transform of the site plan's group, in decimetres: for the
 * SVG attribute or for CSS. The same four functions in both, so CSS
 * interpolates them one by one and the plan turns about its centre.
 */
export function viewTransform(view: View, syntax: "svg" | "css"): string {
  const cx = PIVOT[0] * U;
  const cy = PIVOT[1] * U;
  const x = round(cx + view.shift[0] * U);
  const y = round(cy + view.shift[1] * U);
  const [unit, deg, sep] =
    syntax === "svg" ? ["", "", " "] : ["px", "deg", ", "];
  return `translate(${String(x)}${unit}${sep}${String(y)}${unit}) scale(${String(view.scaleX)}${sep}${String(view.scaleY)}) rotate(${String(view.rotate)}${deg}) translate(${String(-cx)}${unit}${sep}${String(-cy)}${unit})`;
}

// The model's faces --------------------------------------------------------

/** Points on the sheet in decimetres, as an SVG `points` value. */
export function points(list: Point[]): string {
  return list
    .map(([x, y]) => `${String(round(x * U))},${String(round(y * U))}`)
    .join(" ");
}

function axo(point: Point, z: number): Point {
  return project(point, z, AXO_VIEW);
}

export interface Facade {
  /** "south" faces the viewer; "west" is the lit end. */
  side: "south" | "west";
  outline: string;
  windows: string[];
}

export interface Storey {
  top: string;
  facades: Facade[];
}

/** A window band on a facade from `a` to `b`: one pane per bay. */
function panes(
  a: Point,
  b: Point,
  box: Box,
  bay: number,
  penthouse: boolean,
): string[] {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const count = Math.round(length / bay);
  const step = length / count;
  const width = penthouse ? step * 0.8 : Math.min(2.2, step * 0.6);
  const sill = box.z0 + (penthouse ? 0.2 : box.z0 === 0 ? 0.4 : 0.9);
  const head = box.z0 + 2.5;
  const at = (t: number): Point => [
    a[0] + ((b[0] - a[0]) * t) / length,
    a[1] + ((b[1] - a[1]) * t) / length,
  ];
  return Array.from({ length: count }, (_, index) => {
    const middle = step * (index + 0.5);
    const p = at(middle - width / 2);
    const q = at(middle + width / 2);
    return points([axo(p, sill), axo(q, sill), axo(q, head), axo(p, head)]);
  });
}

/**
 * Each storey's visible faces, bottom up: from the south-west the south
 * and west facades and the top. Drawn in order, each storey covers the top
 * of the one below, so the penthouse leaves the third floor's roof as its
 * terrace.
 */
export function storeys(): Storey[] {
  return BOXES.map((box, index) => {
    const penthouse = index === BOXES.length - 1;
    const sw: Point = [box.x0, box.y1];
    const se: Point = [box.x1, box.y1];
    const nw: Point = [box.x0, box.y0];
    const face = (a: Point, b: Point): string =>
      points([axo(a, box.z0), axo(b, box.z0), axo(b, box.z1), axo(a, box.z1)]);
    return {
      top: points(corners(box).map((point) => axo(point, box.z1))),
      facades: [
        {
          side: "west",
          outline: face(nw, sw),
          windows: panes(nw, sw, box, 4, penthouse),
        },
        {
          side: "south",
          outline: face(sw, se),
          windows: panes(sw, se, box, 4, penthouse),
        },
      ],
    };
  });
}

/** The height's dimension in the 3D view, just east of the south-east corner, clear of the facades. */
export function heightDimension(): {
  line: string;
  ticks: string[];
  label: Point;
} {
  const foot: Point = [FOOTPRINT.x1 + 2.5, FOOTPRINT.y1];
  const levels = Array.from(
    { length: LEVELS.length + 1 },
    (_, index) => index * STOREY,
  );
  const at = (z: number): Point => axo(foot, z);
  const tick = (z: number): string => {
    const [px, py] = at(z);
    const x = px * U;
    const y = py * U;
    return `M${String(round(x - 6))} ${String(round(y + 6))}L${String(round(x + 6))} ${String(round(y - 6))}`;
  };
  const [bx, by] = at(0);
  const [tx, ty] = at(HEIGHT);
  return {
    line: `M${String(round(bx * U))} ${String(round(by * U))}L${String(round(tx * U))} ${String(round(ty * U))}`,
    ticks: levels.map(tick),
    label: [(bx + tx) / 2 + 1.4, (by + ty) / 2],
  };
}

// The schedule -------------------------------------------------------------

export interface ScheduleRow {
  key: LevelKey;
  /** Gross floor area, m². */
  area: number;
  /** Storey height, m. */
  height: number;
  /** Gross volume, m³. */
  volume: number;
}

/** Gross floor area and volume per storey: outer dimensions × storey height. */
export function schedule(): {
  rows: ScheduleRow[];
  area: number;
  volume: number;
} {
  const rows = LEVELS.map(({ key, plan }) => {
    const area = (plan.x1 - plan.x0) * (plan.y1 - plan.y0);
    return { key, area, height: STOREY, volume: area * STOREY };
  });
  return {
    rows,
    area: rows.reduce((sum, row) => sum + row.area, 0),
    volume: rows.reduce((sum, row) => sum + row.volume, 0),
  };
}
