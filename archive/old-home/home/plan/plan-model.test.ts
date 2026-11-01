import { describe, expect, it } from "vitest";

import { HEIGHTS, modelFaces, roofDrawing, WALLS } from "./plan-model.ts";
import {
  ground,
  MODEL_VIEW,
  PIVOT,
  PLAN_VIEW,
  ROOF_VIEW,
  type View,
  viewTransform,
} from "./plan-projection.ts";

/** The drawing's viewBox and its title block (PlanDrawing.astro). */
const VIEW_BOX = { left: -21, top: -21, right: 104, bottom: 89 };
const TITLE_BLOCK_TOP = 75;

function parsePoints(points: string): [number, number][] {
  return points
    .split(" ")
    .map((pair) => pair.split(",").map(Number) as [number, number]);
}

/** Every corner of the model on the sheet: the tops and the sides' feet. */
function modelPoints(view: View = MODEL_VIEW): [number, number][] {
  return modelFaces(view).flatMap((face): [number, number][] => {
    if (face.type === "top") return parsePoints(face.points);
    const [a, b, , , e, f] = face.matrix
      .slice("matrix(".length, -1)
      .split(" ")
      .map(Number);
    return [
      [e ?? 0, f ?? 0],
      [(e ?? 0) + (a ?? 0), (f ?? 0) + (b ?? 0)],
    ];
  });
}

describe("plan projection", () => {
  it("leaves the plan as drawn in the plan view", () => {
    expect(ground([12, 34], PLAN_VIEW)).toEqual([12, 34]);
  });

  it("turns the plan about its centre", () => {
    const [x, y] = ground(PIVOT, MODEL_VIEW);
    expect(x).toBeCloseTo(PIVOT[0] + MODEL_VIEW.shift[0]);
    expect(y).toBeCloseTo(PIVOT[1] + MODEL_VIEW.shift[1]);
  });

  it("writes the same view for SVG and for CSS", () => {
    const numbers = (text: string): number[] =>
      (text.match(/-?\d+(\.\d+)?/g) ?? []).map(Number);
    expect(numbers(viewTransform(MODEL_VIEW, "css"))).toEqual(
      numbers(viewTransform(MODEL_VIEW, "svg")),
    );
  });

  it("tilts and rises with one angle", () => {
    const { scaleX, scaleY, rise } = MODEL_VIEW;
    expect((scaleY / scaleX) ** 2 + (rise / scaleX) ** 2).toBeCloseTo(1);
  });
});

describe("plan model", () => {
  const faces = modelFaces();

  it("gives every solid two sides and a top", () => {
    const tops = faces.filter((face) => face.type === "top");
    expect(faces).toHaveLength(tops.length * 3);
    expect(tops.filter((face) => face.kind === "wall")).toHaveLength(
      WALLS.length,
    );
  });

  it("raises the wall tops by the wall height", () => {
    const wallTop = faces.find(
      (face) => face.type === "top" && face.kind === "wall",
    );
    expect(wallTop?.type === "top" && wallTop.rise).toBeCloseTo(
      MODEL_VIEW.rise * HEIGHTS.wall,
    );
  });

  it("draws the far walls before the near ones", () => {
    const tops = faces.filter((face) => face.type === "top");
    const bottomOf = (points: string): number =>
      Math.max(...points.split(" ").map((pair) => Number(pair.split(",")[1])));
    const bottoms = tops
      .filter((face) => face.kind === "wall")
      .map((face) => bottomOf(face.points));
    expect(bottoms[0]).toBeLessThan(bottoms.at(-1) ?? 0);
  });

  it.each([
    ["the model", (): [number, number][] => modelPoints()],
    [
      "the model with its roof",
      (): [number, number][] => [
        ...modelPoints(ROOF_VIEW),
        ...roofDrawing().faces.flatMap((face) => parsePoints(face.points)),
      ],
    ],
  ])("fits %s on the sheet above the title block", (_, corners) => {
    const points = corners();
    const xs = points.map(([x]) => x);
    const ys = points.map(([, y]) => y);
    expect(Math.min(...xs)).toBeGreaterThan(VIEW_BOX.left);
    expect(Math.max(...xs)).toBeLessThan(VIEW_BOX.right);
    expect(Math.min(...ys)).toBeGreaterThan(VIEW_BOX.top);
    expect(Math.max(...ys)).toBeLessThan(TITLE_BLOCK_TOP);
  });

  it("puts only the walls' outer sides on the facade", () => {
    const outer = faces.filter((face) => face.type === "side" && face.outer);
    // Seen from the south-west: the west and south walls, their sills and
    // lintels, between the openings.
    expect(outer.length).toBeGreaterThan(8);
    expect(outer.every((face) => face.kind !== "glass")).toBe(true);
    expect(outer.length).toBeLessThan(
      faces.filter((face) => face.type === "side").length / 2,
    );
  });
});

describe("plan roof", () => {
  const { faces, hatch } = roofDrawing();

  it("shows both slopes, one gable and the edges that face the viewer", () => {
    const kinds = faces.map((face) => face.kind);
    expect(kinds.filter((kind) => kind === "slope")).toHaveLength(2);
    expect(kinds.filter((kind) => kind === "gable")).toHaveLength(1);
    expect(kinds.filter((kind) => kind === "edge")).toHaveLength(2);
  });

  it("draws the roofing down the slopes", () => {
    expect(hatch.match(/M/g)?.length).toBeGreaterThan(10);
  });
});
