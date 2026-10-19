import { describe, expect, it } from "vitest";

import { contrast, formatRatio, luminance } from "./contrast.ts";

describe("contrast", () => {
  it("is 21:1 for black on white and 1:1 for a colour on itself", () => {
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrast("#0F1B2D", "#0F1B2D")).toBe(1);
  });

  it("matches the brand ratios recorded in docs/brand.md", () => {
    expect(formatRatio(contrast("#0F1B2D", "#F6F5F1"))).toBe("15.84:1");
    expect(formatRatio(contrast("#2F6BFF", "#F6F5F1"))).toBe("4.12:1");
    expect(formatRatio(contrast("#2F6BFF", "#0F1B2D"))).toBe("3.84:1");
    expect(formatRatio(contrast("#5E6878", "#F6F5F1"))).toBe("5.16:1");
  });

  it("never rounds white on brand blue up to AA", () => {
    const ratio = contrast("#FFFFFF", "#2F6BFF");
    expect(ratio).toBeLessThan(4.5);
    expect(formatRatio(ratio)).toBe("4.49:1");
  });

  it("rejects values that are not #rrggbb", () => {
    expect(() => luminance("#fff")).toThrow();
    expect(() => luminance("navy")).toThrow();
  });
});
