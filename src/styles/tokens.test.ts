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
  // Headings, body copy and links on each surface
  ["bone", "obsidian"],
  ["mist", "obsidian"],
  ["copper", "obsidian"],
  ["bone", "petrol"],
  ["mist", "petrol"],
  ["copper", "petrol"],
  ["bone", "petrol-raised"], // secondary button, hover
  ["mist", "petrol-raised"], // also a disabled button
  ["copper", "petrol-raised"],
  ["obsidian", "copper"], // primary button
  ["obsidian", "copper-hover"], // primary button, hover
  // Selected text (base.css): the full ink on the selection tint
  ["bone", "selection"],
] as const;

const GRAPHIC_PAIRS = [
  ["copper", "obsidian"],
  ["copper", "petrol"],
  ["teal", "obsidian"],
  ["teal", "petrol"],
] as const;

describe("colour tokens", () => {
  it("keep the Obsidian Copper palette", () => {
    expect(colour("obsidian")).toBe("#080d10");
    expect(colour("petrol")).toBe("#111b1f");
    expect(colour("petrol-raised")).toBe("#19282c");
    expect(colour("bone")).toBe("#f1eeea");
    expect(colour("mist")).toBe("#9dadb0");
    expect(colour("copper")).toBe("#d6a075");
    expect(colour("teal")).toBe("#668a90");
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
});
