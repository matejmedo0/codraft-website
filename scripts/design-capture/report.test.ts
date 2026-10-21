import { describe, expect, it } from "vitest";

import { describeEntry, findingsOf } from "./report.mjs";

type Metrics = Parameters<typeof findingsOf>[0];
type TextBlock = Metrics["textBlocks"][number];
type Target = Metrics["targets"][number];

function block(lines: string[], overrides: Partial<TextBlock> = {}): TextBlock {
  return {
    zone: "Što radimo",
    tag: "p",
    fontSize: 17,
    large: false,
    contrast: 15.84,
    onPattern: false,
    charsPerLine: null,
    lineCount: lines.length,
    lines,
    ...overrides,
  };
}

function target(overrides: Partial<Target> = {}): Target {
  return {
    zone: "Footer (title block)",
    name: "Privatnost",
    width: 74,
    height: 17,
    inline: false,
    ...overrides,
  };
}

function flagged(
  title: string,
  textBlocks: TextBlock[],
  targets: Target[] = [],
): number {
  const findings = findingsOf({ textBlocks, targets });
  const entries = findings[title];
  if (!entries) throw new Error(`No finding called "${title}"`);
  return entries.length;
}

describe("design capture findings", () => {
  it("flags one word alone on the last line, but not a one-line block", () => {
    const title = "One word alone on the last line";
    expect(
      flagged(title, [block(["Kalendari, plaćanja i CRM", "stranicom."])]),
    ).toBe(1);
    expect(flagged(title, [block(["Hosting."])])).toBe(0);
  });

  it("flags a one-letter word at the end of a line, but not of the last line", () => {
    const title = "One-letter word at the end of a line";
    expect(
      flagged(title, [block(["Planiramo, izrađujemo i", "održavamo"])]),
    ).toBe(1);
    expect(flagged(title, [block(["Web stranice", "i"])])).toBe(0);
  });

  it("flags a long measure in body text only", () => {
    const title = "Measure over 80 characters (body text)";
    expect(flagged(title, [block(["a", "b", "c"], { charsPerLine: 92 })])).toBe(
      1,
    );
    expect(
      flagged(title, [
        block(["a", "b", "c"], { charsPerLine: 92, large: true }),
      ]),
    ).toBe(0);
  });

  it("holds normal text to 4.5:1 and large text to 3:1", () => {
    const title = "Contrast under AA (approximate on a pattern)";
    expect(flagged(title, [block(["Tekst"], { contrast: 4.12 })])).toBe(1);
    expect(
      flagged(title, [block(["Naslov"], { contrast: 4.12, large: true })]),
    ).toBe(0);
  });

  it("flags small controls unless they sit inside a sentence", () => {
    const title =
      "Controls under 24 × 24 px, not inline (pass if spaced, WCAG 2.5.8)";
    expect(flagged(title, [], [target()])).toBe(1);
    expect(flagged(title, [], [target({ inline: true })])).toBe(0);
    expect(flagged(title, [], [target({ height: 44 })])).toBe(0);
  });
});

describe("design capture index lines", () => {
  it("shortens a long block to its first two lines and its last", () => {
    const line = describeEntry(
      block(["jedan", "dva", "tri", "četiri"], { charsPerLine: 4 }),
    );
    expect(line).toContain('lines: "jedan" / "dva" / "…" / "četiri"');
    expect(line).toContain("4 ch/line");
  });

  it("describes a control by its name and size", () => {
    expect(describeEntry(target())).toBe(
      'Footer (title block) | "Privatnost" | 74 × 17 px',
    );
  });
});
