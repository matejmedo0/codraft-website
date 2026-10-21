import { describe, expect, it } from "vitest";

import { LEGAL_NAV, MAIN_NAV, sheetFor } from "./navigation.ts";
import { PAGE_IDS } from "./route-map.ts";
import { t } from "./ui.ts";

describe("navigation", () => {
  it("links each page once, and never the home page or the audit", () => {
    const pages = [...MAIN_NAV, ...LEGAL_NAV].map(({ page }) => page);

    expect(new Set(pages).size).toBe(pages.length);
    expect(pages).not.toContain("home");
    expect(pages).not.toContain("audit");
  });

  it("has a label in both languages for every link", () => {
    for (const { label } of [...MAIN_NAV, ...LEGAL_NAV]) {
      expect(t("hr", label)).not.toBe("");
      expect(t("en", label)).not.toBe("");
    }
  });
});

describe("sheetFor", () => {
  it("numbers the pages in route-map order, home first", () => {
    expect(sheetFor("home")).toEqual({ number: 1, of: PAGE_IDS.length });
    expect(sheetFor("accessibility")).toEqual({
      number: PAGE_IDS.length,
      of: PAGE_IDS.length,
    });
  });

  it("has no sheet for a page outside the route map", () => {
    expect(sheetFor(undefined)).toBeUndefined();
  });
});
