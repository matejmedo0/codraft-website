import { describe, expect, it } from "vitest";

import { formatEuro, formatGuidePrice, formatWeeks } from "./pricing.ts";

const NBSP = String.fromCharCode(0xa0);

describe("formatEuro", () => {
  it("writes Croatian amounts with a dot and the sign after", () => {
    expect(formatEuro(1290, "hr")).toBe(`1.290${NBSP}€`);
  });

  it("writes English amounts with a comma and the sign before", () => {
    expect(formatEuro(1290, "en")).toBe("€1,290");
  });
});

describe("formatGuidePrice", () => {
  it("writes a one-off starting price", () => {
    expect(formatGuidePrice({ from: 990 }, "hr")).toBe(`od 990${NBSP}€`);
    expect(formatGuidePrice({ from: 990 }, "en")).toBe("from €990");
  });

  it("writes a monthly fee", () => {
    expect(formatGuidePrice({ from: 29, monthly: true }, "hr")).toBe(
      `od 29${NBSP}€ mjesečno`,
    );
    expect(formatGuidePrice({ from: 29, monthly: true }, "en")).toBe(
      "from €29 a month",
    );
  });
});

describe("formatWeeks", () => {
  it("agrees the Croatian word with the last number", () => {
    expect(formatWeeks([1, 2], "hr")).toBe(`1–2${NBSP}tjedna`);
    expect(formatWeeks([3, 5], "hr")).toBe(`3–5${NBSP}tjedana`);
    expect(formatWeeks([1, 1], "hr")).toBe(`1${NBSP}tjedan`);
    expect(formatWeeks([6, 21], "hr")).toBe(`6–21${NBSP}tjedan`);
  });

  it("writes English weeks", () => {
    expect(formatWeeks([3, 5], "en")).toBe(`3–5${NBSP}weeks`);
    expect(formatWeeks([1, 1], "en")).toBe(`1${NBSP}week`);
  });
});
