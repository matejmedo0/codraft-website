import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { contrast, formatRatio } from "../lib/contrast.ts";

const CSS = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

/** The palette in tokens.css: `--color-name: #rrggbb;`. */
const PALETTE = new Map(
  [...CSS.matchAll(/--color-([a-z-]+):\s*(#[0-9a-f]{6});/gi)].map(
    ([, name, hex]) => [name ?? "", hex ?? ""],
  ),
);

function colour(name: string): string {
  const hex = PALETTE.get(name);
  if (hex === undefined)
    throw new Error(`--color-${name} is not in tokens.css`);
  return hex;
}

/**
 * Every text pair the components use, as palette names: [text, background].
 * Normal text needs 4.5:1 (WCAG 2.2 AA); large text and graphics need 3:1.
 */
const TEXT_PAIRS = [
  // Paper surface
  ["navy", "paper"],
  ["grey-on-paper", "paper"],
  ["blue-on-paper", "paper"],
  ["navy", "paper-sunk"],
  ["grey-on-paper", "paper-sunk"], // also a disabled button
  ["blue-on-paper", "paper-sunk"],
  ["paper", "navy"], // primary button
  ["paper", "navy-hover"], // primary button, hover
  // Navy surface
  ["grey-on-navy", "navy"],
  ["blue-on-navy", "navy"],
  ["paper", "navy-raised"], // secondary button, hover
  ["navy", "paper-hover"], // primary button on navy, hover
] as const;

const GRAPHIC_PAIRS = [
  ["blue", "paper"],
  ["blue", "navy"],
  ["navy", "paper"],
  ["paper", "navy"],
] as const;

describe("colour tokens", () => {
  it("keep the brand colours of docs/brand.md", () => {
    expect(colour("paper")).toBe("#f6f5f1");
    expect(colour("navy")).toBe("#0f1b2d");
    expect(colour("blue")).toBe("#2f6bff");
  });

  it.each(TEXT_PAIRS)("%s text on %s meets AA (4.5:1)", (text, background) => {
    const ratio = contrast(colour(text), colour(background));
    expect(ratio, formatRatio(ratio)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(GRAPHIC_PAIRS)(
    "%s graphics on %s meet 3:1",
    (graphic, background) => {
      expect(
        contrast(colour(graphic), colour(background)),
      ).toBeGreaterThanOrEqual(3);
    },
  );

  it("never uses brand blue for body text (4.12:1 on paper)", () => {
    expect(contrast(colour("blue"), colour("paper"))).toBeLessThan(4.5);
    expect(CSS).not.toMatch(
      /--(ink|ink-muted|link|accent-text):\s*var\(--color-blue\)/,
    );
  });
});
