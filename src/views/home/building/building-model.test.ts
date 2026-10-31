import { describe, expect, it } from "vitest";

import {
  AXO_VIEW,
  BOXES,
  FOOTPRINT,
  HEIGHT,
  PENTHOUSE,
  PLAN_VIEW,
  project,
  schedule,
  SITE,
  TERRACE_POOL,
  terrace,
  viewTransform,
} from "./building-model.ts";

describe("the building's schedule", () => {
  it("adds up the storeys' gross areas and volumes", () => {
    const { rows, area, volume } = schedule();
    expect(rows.map((row) => row.area)).toEqual([288, 288, 288, 288, 160]);
    expect(area).toBe(1312);
    expect(volume).toBe(3936);
  });

  it("stacks the storeys to the building's height", () => {
    expect(BOXES.at(-1)?.z1).toBe(HEIGHT);
    expect(HEIGHT).toBe(15);
  });

  it("keeps the penthouse inside the footprint", () => {
    expect(PENTHOUSE.x0).toBeGreaterThan(FOOTPRINT.x0);
    expect(PENTHOUSE.x1).toBeLessThan(FOOTPRINT.x1);
    expect(PENTHOUSE.y0).toBeGreaterThan(FOOTPRINT.y0);
    expect(PENTHOUSE.y1).toBeLessThan(FOOTPRINT.y1);
  });
});

describe("the terrace", () => {
  it("puts the pool on the west terrace, clear of the penthouse", () => {
    expect(TERRACE_POOL.x0).toBeGreaterThan(FOOTPRINT.x0);
    expect(TERRACE_POOL.x1).toBeLessThan(PENTHOUSE.x0);
  });

  it("rails all four edges, two behind the penthouse and two before", () => {
    const { far, near } = terrace();
    expect(far.panels).toHaveLength(2);
    expect(near.panels).toHaveLength(2);
  });
});

describe("the views", () => {
  it("leaves the plan as drawn", () => {
    expect(project([10, 20], 0, PLAN_VIEW)).toEqual([10, 20]);
  });

  it("lifts a point by its height in the 3D view", () => {
    const [, ground] = project([20, 16], 0, AXO_VIEW);
    const [, top] = project([20, 16], 10, AXO_VIEW);
    expect(ground - top).toBeCloseTo(10 * AXO_VIEW.rise);
  });

  it("writes the same transform for SVG and CSS", () => {
    const svg = viewTransform(AXO_VIEW, "svg");
    const css = viewTransform(AXO_VIEW, "css");
    expect(svg.replaceAll(" ", "")).toBe(
      css
        .replaceAll("px", "")
        .replaceAll("deg", "")
        .replaceAll(",", "")
        .replaceAll(" ", ""),
    );
  });

  it("puts the site's centre at the pivot in the plan view", () => {
    expect(project([SITE.width / 2, SITE.depth / 2], 0, PLAN_VIEW)).toEqual([
      26, 16,
    ]);
  });
});
