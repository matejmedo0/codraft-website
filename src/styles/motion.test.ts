import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { DURATION_MS, EASING, type SpringPreset, SPRINGS } from "./motion.ts";

const CSS = readFileSync(new URL("./motion.css", import.meta.url), "utf8");

/** The value of a custom property in motion.css. */
function token(name: string): string {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(CSS);
  if (!match?.[1]) throw new Error(`--${name} is not in motion.css`);
  return match[1].trim();
}

function kebab(name: string): string {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/** Position of a damped spring (mass 1) released from 0 towards 1. */
function springAt(
  { stiffness, damping }: SpringPreset,
  seconds: number,
): number {
  const w0 = Math.sqrt(stiffness);
  const zeta = damping / (2 * w0);
  const wd = w0 * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * w0 * seconds);
  return (
    1 -
    decay *
      (Math.cos(wd * seconds) + ((zeta * w0) / wd) * Math.sin(wd * seconds))
  );
}

/** The time after which the spring stays within 0.1 % of its target. */
function settleTime(spring: SpringPreset): number {
  let last = 0;
  for (let t = 0; t < 3; t += 0.0005) {
    if (Math.abs(springAt(spring, t) - 1) > 0.001) last = t;
  }
  return last;
}

/** The stops of a CSS linear() easing, as [value, percent] pairs. */
function linearStops(value: string): [number, number][] {
  const inner = /^linear\(([\s\S]*)\)$/.exec(value)?.[1] ?? "";
  const parts = inner.split(",").map((part) => part.trim().split(/\s+/));
  return parts.map(([output, at], index) => [
    Number(output),
    at === undefined ? (index === 0 ? 0 : 100) : Number.parseFloat(at),
  ]);
}

describe("motion tokens", () => {
  it.each(Object.entries(DURATION_MS))(
    "%s is the same in motion.css and motion.ts",
    (name, ms) => {
      expect(token(`motion-${kebab(name)}`)).toBe(`${String(ms)}ms`);
    },
  );

  it.each(Object.entries(EASING))(
    "the %s easing is the same in motion.css and motion.ts",
    (name, curve) => {
      expect(token(`ease-${name}`)).toBe(`cubic-bezier(${curve.join(", ")})`);
    },
  );

  it.each([
    ["spring", SPRINGS.snappy],
    ["snap", SPRINGS.snap],
  ] as const)(
    "--ease-%s samples its spring over the time it takes to settle",
    (name, spring) => {
      const settle = settleTime(spring);
      for (const [output, percent] of linearStops(token(`ease-${name}`))) {
        expect(output).toBeCloseTo(
          springAt(spring, (percent / 100) * settle),
          2,
        );
      }
    },
  );
});
