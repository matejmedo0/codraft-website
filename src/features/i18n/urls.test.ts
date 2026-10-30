import { describe, expect, it } from "vitest";

import { LOCALES, SITE_URL } from "../../config/site.ts";
import { PAGE_IDS } from "./route-map.ts";
import {
  alternatesFor,
  otherLocale,
  pathFor,
  staticPathsFor,
  urlFor,
} from "./urls.ts";

describe("pathFor", () => {
  it("puts Croatian at the root and English under /en", () => {
    expect(pathFor("home", "hr")).toBe("/");
    expect(pathFor("home", "en")).toBe("/en");
    expect(pathFor("services", "hr")).toBe("/usluge");
    expect(pathFor("services", "en")).toBe("/en/services");
  });

  it.each(PAGE_IDS)("never ends a %s path with a slash", (page) => {
    for (const locale of LOCALES) {
      const path = pathFor(page, locale);
      expect(path === "/" || !path.endsWith("/")).toBe(true);
    }
  });
});

describe("urlFor", () => {
  it("builds absolute URLs on the site origin", () => {
    expect(urlFor("home", "hr")).toBe(`${SITE_URL}/`);
    expect(urlFor("drafting", "en")).toBe(
      `${SITE_URL}/en/architectural-drafting`,
    );
  });
});

describe("otherLocale", () => {
  it("switches between Croatian and English", () => {
    expect(otherLocale("hr")).toBe("en");
    expect(otherLocale("en")).toBe("hr");
  });
});

describe("alternatesFor (hreflang)", () => {
  it.each(PAGE_IDS)(
    "lists each locale once, plus x-default, for %s",
    (page) => {
      const hreflangs = alternatesFor(page).map(({ hreflang }) => hreflang);
      expect(hreflangs.sort()).toEqual([...LOCALES, "x-default"].sort());
    },
  );

  // Every language version carries this list, so each version links to
  // itself and to the others, and they link back.
  it.each(PAGE_IDS)("has reciprocal hr and en links for %s", (page) => {
    for (const locale of LOCALES) {
      expect(alternatesFor(page)).toContainEqual({
        hreflang: locale,
        href: urlFor(page, locale),
      });
    }
  });

  it.each(PAGE_IDS)("points x-default to the English %s page", (page) => {
    expect(alternatesFor(page)).toContainEqual({
      hreflang: "x-default",
      href: urlFor(page, "en"),
    });
  });
});

describe("staticPathsFor", () => {
  it("generates only the pages that have a view, in every locale", () => {
    expect(staticPathsFor({ home: "home view" })).toEqual([
      {
        params: { slug: undefined },
        props: { page: "home", locale: "hr", view: "home view" },
      },
      {
        params: { slug: "en" },
        props: { page: "home", locale: "en", view: "home view" },
      },
    ]);
  });

  it("uses the path without its leading slash as the slug", () => {
    const slugs = staticPathsFor({ services: "view" }).map(
      ({ params }) => params.slug,
    );
    expect(slugs).toEqual(["usluge", "en/services"]);
  });
});
