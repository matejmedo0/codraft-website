/**
 * The floor plan on Home and its 3D view (the client's review, #13 and
 * #58). One set of walls, windows and doors feeds both: PlanDrawing draws
 * the plan from them, and `modelFaces` turns them into the faces of a 3D
 * model seen from above, in the projection that tilts the plan
 * (plan-projection.ts). It runs at build time; the page gets the faces as
 * SVG.
 *
 * Units: 1 = 10 cm; the flat is 1000 × 700 cm, and z is the height above
 * the floor. The plan's y runs south, as on the screen.
 */
import {
  ground,
  MODEL_VIEW,
  type Point,
  ROOF_VIEW,
  type View,
} from "./plan-projection.ts";

/** The flat's outline: the outer faces of its walls. */
export const FOOTPRINT = { width: 100, depth: 70 };

/** A rectangle in the plan: x, y, width, depth. */
export type Rect = [x: number, y: number, width: number, depth: number];

/** Exterior walls are 30 cm thick, interior walls 12 cm. */
export const WALLS: Rect[] = [
  // Exterior, clockwise from the top left, with the openings left out.
  [0, 0, 10, 3],
  [24, 0, 10, 3],
  [48, 0, 22, 3],
  [86, 0, 14, 3],
  [97, 3, 3, 47],
  [97, 56, 3, 11],
  [73, 67, 27, 3],
  [38, 67, 26, 3],
  [0, 67, 18, 3],
  [0, 44, 3, 23],
  [0, 3, 3, 21],
  // Interior: living room | the rest, bedroom | entrance, entrance | bath.
  [59.4, 3, 1.2, 49],
  [59.4, 61, 1.2, 6],
  [60.6, 39.4, 5.4, 1.2],
  [74, 39.4, 23, 1.2],
  [79.4, 40.6, 1.2, 3.4],
  [79.4, 51, 1.2, 16],
];

/** The gaps in the walls that windows fill. */
export const WINDOWS: Rect[] = [
  [10, 0, 14, 3],
  [34, 0, 14, 3],
  [70, 0, 16, 3],
  [97, 50, 3, 6],
  [18, 67, 20, 3],
  [0, 24, 3, 20],
];

/**
 * The doors: the gap in the wall, the open leaf from its hinge to its end,
 * and the swing's arc as a path.
 */
export interface Door {
  opening: Rect;
  leaf: { from: Point; to: Point };
  swing: string;
}

export const DOORS: Door[] = [
  {
    opening: [64, 67, 9, 3],
    leaf: { from: [64, 67], to: [64, 58] },
    swing: "M73 67A9 9 0 0 0 64 58",
  },
  {
    opening: [59.4, 52, 1.2, 9],
    leaf: { from: [59.4, 61], to: [50.4, 61] },
    swing: "M59.4 52A9 9 0 0 0 50.4 61",
  },
  {
    opening: [66, 39.4, 8, 1.2],
    leaf: { from: [66, 39.4], to: [66, 31.4] },
    swing: "M74 39.4A8 8 0 0 0 66 31.4",
  },
  {
    opening: [79.4, 44, 1.2, 7],
    leaf: { from: [80.6, 44], to: [87.6, 44] },
    swing: "M80.6 51A7 7 0 0 0 87.6 44",
  },
];

/** Heights above the floor. */
export interface Heights {
  /** The walls. */
  wall: number;
  /** Window sills. */
  sill: number;
  /** Door and window heads. */
  head: number;
}

export const HEIGHTS: Heights = { wall: 26, sill: 9, head: 21 };

/** A door leaf is 4 cm thick; a pane of glass is drawn 2 cm thick. */
const LEAF_THICKNESS = 0.4;
const GLASS_THICKNESS = 0.2;

export type SolidKind = "wall" | "sill" | "lintel" | "glass" | "leaf";

interface Solid {
  kind: SolidKind;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  z0: number;
  z1: number;
}

function solid(
  kind: SolidKind,
  [x, y, width, depth]: Rect,
  z0: number,
  z1: number,
): Solid {
  return { kind, x0: x, x1: x + width, y0: y, y1: y + depth, z0, z1 };
}

/** The pane in the middle of a window's wall, along the wall. */
function pane([x, y, width, depth]: Rect): Rect {
  return width >= depth
    ? [x, y + (depth - GLASS_THICKNESS) / 2, width, GLASS_THICKNESS]
    : [x + (width - GLASS_THICKNESS) / 2, y, GLASS_THICKNESS, depth];
}

/** A leaf as a thin slab from its hinge to its end. */
function leafRect({ from, to }: Door["leaf"]): Rect {
  const [x0, y0] = from;
  const [x1, y1] = to;
  return x0 === x1
    ? [x0, Math.min(y0, y1), LEAF_THICKNESS, Math.abs(y1 - y0)]
    : [Math.min(x0, x1), y0, Math.abs(x1 - x0), LEAF_THICKNESS];
}

/** Every solid of the model: walls, and what fills their openings. */
function solids({ wall, sill, head }: Heights): Solid[] {
  const all = WALLS.map((rect) => solid("wall", rect, 0, wall));
  for (const opening of WINDOWS) {
    all.push(solid("sill", opening, 0, Math.min(sill, wall)));
    if (wall > sill) {
      all.push(solid("glass", pane(opening), sill, Math.min(head, wall)));
    }
    if (wall > head) all.push(solid("lintel", opening, head, wall));
  }
  for (const { opening, leaf } of DOORS) {
    if (wall > head) all.push(solid("lintel", opening, head, wall));
    all.push(solid("leaf", leafRect(leaf), 0, Math.min(head, wall)));
  }
  return all;
}

/** On the sheet, a point of the plan at height z. */
function project(point: Point, z: number, view: View): Point {
  const [x, y] = ground(point, view);
  return [x, y - view.rise * z];
}

/** Which sides of a solid face the viewer, from the plan's turn. */
interface Facing {
  east: boolean;
  south: boolean;
}

function facing(view: View): Facing {
  const angle = (view.rotate * Math.PI) / 180;
  return { east: Math.sin(angle) > 0, south: Math.cos(angle) > 0 };
}

type Bounds = [left: number, top: number, right: number, bottom: number];

/** A solid's box on the sheet. */
function bounds(part: Solid, view: View): Bounds {
  const corners: Point[] = [
    [part.x0, part.y0],
    [part.x1, part.y0],
    [part.x1, part.y1],
    [part.x0, part.y1],
  ];
  const points = [part.z0, part.z1].flatMap((z) =>
    corners.map((corner) => project(corner, z, view)),
  );
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

const EPSILON = 1e-6;

function overlap(a: Bounds, b: Bounds): boolean {
  return (
    a[0] < b[2] - EPSILON &&
    b[0] < a[2] - EPSILON &&
    a[1] < b[3] - EPSILON &&
    b[1] < a[3] - EPSILON
  );
}

/**
 * Whether `a` is behind `b`. Solids that don't intersect are apart along
 * x, y or z, and the viewer's side of the plane between them decides; when
 * two such planes disagree, the solids can't overlap on the sheet. Null
 * when the order doesn't matter.
 */
function isBehind(a: Solid, b: Solid, view: Facing): boolean | null {
  if (a.x1 <= b.x0 + EPSILON) return view.east;
  if (b.x1 <= a.x0 + EPSILON) return !view.east;
  if (a.y1 <= b.y0 + EPSILON) return view.south;
  if (b.y1 <= a.y0 + EPSILON) return !view.south;
  // The viewer looks down, so the lower one is behind.
  if (a.z1 <= b.z0 + EPSILON) return true;
  if (b.z1 <= a.z0 + EPSILON) return false;
  return null;
}

/** Orders the solids back to front, so each covers what is behind it. */
function backToFront(parts: Solid[], view: View): Solid[] {
  const sides = facing(view);
  const boxes = parts.map((part) => bounds(part, view));
  const nodes = parts.map((part, index) => ({
    part,
    bottom: boxes[index]?.[3] ?? 0,
    later: [] as number[],
    waiting: 0,
  }));
  for (const [i, a] of nodes.entries()) {
    for (const [j, b] of nodes.entries()) {
      if (j <= i) continue;
      const boxA = boxes[i];
      const boxB = boxes[j];
      if (boxA === undefined || boxB === undefined || !overlap(boxA, boxB)) {
        continue;
      }
      const behind = isBehind(a.part, b.part, sides);
      if (behind === null) continue;
      const [first, second] = behind ? [a, b] : [b, a];
      first.later.push(behind ? j : i);
      second.waiting += 1;
    }
  }
  // Kahn's sort; of the solids free to go, the highest on the sheet first.
  const free = nodes.filter((node) => node.waiting === 0);
  const order: Solid[] = [];
  while (free.length > 0) {
    free.sort((a, b) => a.bottom - b.bottom);
    const next = free.shift();
    if (next === undefined) break;
    order.push(next.part);
    for (const index of next.later) {
      const node = nodes[index];
      if (node === undefined) continue;
      node.waiting -= 1;
      if (node.waiting === 0) free.push(node);
    }
  }
  if (order.length !== parts.length) {
    throw new Error("plan-model: the solids can't be ordered back to front");
  }
  return order;
}

/**
 * A side of a solid. It is drawn as a rectangle in its own frame, u along
 * the side from 0 to 1 and w up from the floor, so it rises from the floor
 * with one vertical scale.
 */
export interface SideFace {
  type: "side";
  kind: SolidKind;
  /** The axis the side faces along, for its shade. */
  facing: "x" | "y";
  /** Whether the side is on the outline: the facade (review #65). */
  outer: boolean;
  /** The SVG transform from the side's frame to the sheet. */
  matrix: string;
  z0: number;
  z1: number;
}

/** The top of a solid, in place at full height. */
export interface TopFace {
  type: "top";
  kind: SolidKind;
  points: string;
  /** How far the top rises from the floor, in drawing units. */
  rise: number;
}

export type ModelFace = SideFace | TopFace;

function round(value: number): string {
  return String(Math.round(value * 1000) / 1000);
}

function sideFace(
  part: Solid,
  from: Point,
  to: Point,
  axis: "x" | "y",
  view: View,
): SideFace {
  const [ax, ay] = project(from, 0, view);
  const [bx, by] = project(to, 0, view);
  const matrix = [bx - ax, by - ay, 0, -view.rise, ax, ay].map(round);
  const at = axis === "x" ? from[0] : from[1];
  const outline = axis === "x" ? FOOTPRINT.width : FOOTPRINT.depth;
  return {
    type: "side",
    kind: part.kind,
    facing: axis,
    outer: Math.abs(at) < EPSILON || Math.abs(at - outline) < EPSILON,
    matrix: `matrix(${matrix.join(" ")})`,
    z0: part.z0,
    z1: part.z1,
  };
}

/**
 * The faces of the model, back to front: for each solid, the two sides
 * that face the viewer, then its top.
 */
export function modelFaces(
  view: View = MODEL_VIEW,
  heights: Heights = HEIGHTS,
): ModelFace[] {
  const sides = facing(view);
  return backToFront(solids(heights), view).flatMap((part): ModelFace[] => {
    const { x0, x1, y0, y1, z1 } = part;
    const x = sides.east ? x1 : x0;
    const y = sides.south ? y1 : y0;
    const top: Point[] = [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ];
    return [
      sideFace(part, [x, y0], [x, y1], "x", view),
      sideFace(part, [x0, y], [x1, y], "y", view),
      {
        type: "top",
        kind: part.kind,
        points: top
          .map((corner) => project(corner, z1, view).map(round).join(","))
          .join(" "),
        rise: view.rise * z1,
      },
    ];
  });
}

/**
 * The roof of the 3D view's option 3 (review #63): a pitched roof over the whole flat,
 * its ridge along the long side, resting on the outer edges of the walls'
 * tops and overhanging them. The west and east walls rise to it in gables.
 */
export interface Roof {
  /** How far the roof runs past the walls. */
  overhang: number;
  /** The roof's thickness, drawn at its edges. */
  thickness: number;
  /** Rise per unit of run: 0.7 is a pitch of 35°. */
  pitch: number;
  /** The gap between two lines of the roofing, along the ridge. */
  hatch: number;
}

export const ROOF: Roof = {
  overhang: 3,
  thickness: 1.2,
  pitch: 0.7,
  hatch: 6,
};

/** A face of the roof or a gable, on the sheet. */
export interface RoofFace {
  kind: "gable" | "slope" | "edge";
  /** Faces turned from the light get the shade of the sides along x. */
  shade: boolean;
  points: string;
}

export interface RoofDrawing {
  /** Back to front: the gable, the slopes, then the roof's edges. */
  faces: RoofFace[];
  /** The roofing's lines down each slope that faces the viewer. */
  hatch: string;
}

type Point3 = [x: number, y: number, z: number];

/** Whether a face with this outward normal faces the viewer. */
function facesViewer([nx, ny, nz]: Point3, view: View): boolean {
  const angle = (view.rotate * Math.PI) / 180;
  // Towards the viewer: across the sheet the way the plan turns, and up.
  const toViewer: Point3 = [
    Math.sin(angle),
    Math.cos(angle),
    view.scaleY / view.rise,
  ];
  return nx * toViewer[0] + ny * toViewer[1] + nz * toViewer[2] > EPSILON;
}

function polygon(points: Point3[], view: View): string {
  return points
    .map(([x, y, z]) => project([x, y], z, view).map(round).join(","))
    .join(" ");
}

interface RoofPart {
  normal: Point3;
  kind: RoofFace["kind"];
  shade: boolean;
  points: Point3[];
}

/** The roof over the flat's outline, seen in `view`. */
export function roofDrawing(
  view: View = ROOF_VIEW,
  heights: Heights = HEIGHTS,
  roof: Roof = ROOF,
): RoofDrawing {
  const { width, depth } = FOOTPRINT;
  const ridge = depth / 2;
  const { overhang, thickness, pitch } = roof;
  const [x0, x1] = [-overhang, width + overhang];
  const [y0, y1] = [-overhang, depth + overhang];
  // The underside rests on the walls' outer edges and rises to the ridge.
  const under = (y: number): number =>
    heights.wall + pitch * (ridge - Math.abs(y - ridge));
  const top = (y: number): number => under(y) + thickness;

  const gables: RoofPart[] = [0, width].map((x) => ({
    normal: [x === 0 ? -1 : 1, 0, 0],
    kind: "gable",
    shade: true,
    points: [
      [x, 0, heights.wall],
      [x, ridge, under(ridge)],
      [x, depth, heights.wall],
    ],
  }));
  const slopes: RoofPart[] = [y0, y1].map((eave) => ({
    normal: [0, eave === y0 ? -pitch : pitch, 1],
    kind: "slope",
    shade: eave === y0,
    points: [
      [x0, eave, top(eave)],
      [x1, eave, top(eave)],
      [x1, ridge, top(ridge)],
      [x0, ridge, top(ridge)],
    ],
  }));
  const verges: RoofPart[] = [x0, x1].map((x) => ({
    normal: [x === x0 ? -1 : 1, 0, 0],
    kind: "edge",
    shade: true,
    points: [
      [x, y0, under(y0)],
      [x, ridge, under(ridge)],
      [x, y1, under(y1)],
      [x, y1, top(y1)],
      [x, ridge, top(ridge)],
      [x, y0, top(y0)],
    ],
  }));
  const fascias: RoofPart[] = [y0, y1].map((y) => ({
    normal: [0, y === y0 ? -1 : 1, 0],
    kind: "edge",
    shade: false,
    points: [
      [x0, y, under(y)],
      [x1, y, under(y)],
      [x1, y, top(y)],
      [x0, y, top(y)],
    ],
  }));

  const faces = [...gables, ...slopes, ...verges, ...fascias]
    .filter(({ normal }) => facesViewer(normal, view))
    .map(({ kind, shade, points }) => ({
      kind,
      shade,
      points: polygon(points, view),
    }));

  // The roofing: a line down each slope the viewer sees, every `hatch`.
  const lines: string[] = [];
  for (const slope of slopes) {
    if (!facesViewer(slope.normal, view)) continue;
    const eave = slope.points[0]?.[1] ?? y0;
    for (let x = x0 + roof.hatch; x < x1 - EPSILON; x += roof.hatch) {
      const [ax, ay] = project([x, eave], top(eave), view).map(round);
      const [bx, by] = project([x, ridge], top(ridge), view).map(round);
      lines.push(`M${ax ?? ""} ${ay ?? ""}L${bx ?? ""} ${by ?? ""}`);
    }
  }
  return { faces, hatch: lines.join("") };
}
