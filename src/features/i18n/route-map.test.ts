import { describe, expect, it } from "vitest";

import { LOCALES } from "../../config/site.ts";
import { PAGE_IDS, ROUTES } from "./route-map.ts";

// Lowercase ASCII words joined by single hyphens (docs/information-architecture.md).
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const PAGES_WITH_SLUGS = PAGE_IDS.filter((page) => page !== "home");

describe("route map", () => {
  it.each(PAGE_IDS)("gives %s a slug in every locale", (page) => {
    expect(Object.keys(ROUTES[page]).sort()).toEqual([...LOCALES].sort());
  });

  it.each(PAGES_WITH_SLUGS)(
    "gives %s lowercase ASCII slugs with hyphens",
    (page) => {
      for (const locale of LOCALES) {
        expect(ROUTES[page][locale]).toMatch(SLUG);
      }
    },
  );

  it("gives only the home page an empty slug", () => {
    for (const locale of LOCALES) {
      expect(ROUTES.home[locale]).toBe("");
    }
  });

  it.each(LOCALES)("has unique %s slugs", (locale) => {
    const slugs = PAGE_IDS.map((page) => ROUTES[page][locale]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps slugs clear of the routes outside the route map", () => {
    for (const page of PAGE_IDS) {
      // Croatian pages sit at the root, next to /en, /api and the 404 page.
      expect(["en", "api", "404"]).not.toContain(ROUTES[page].hr);
      expect(ROUTES[page].en).not.toBe("404");
    }
  });
});
