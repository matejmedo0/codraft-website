import { readFileSync } from "node:fs";

import { expect, test } from "@playwright/test";

import { type Locale, SITE_URL } from "../../src/config/site.ts";
import type { UiKey } from "../../src/features/i18n/ui.ts";
import { collectErrors, expectNoSeriousA11yViolations } from "./helpers.ts";

/**
 * A UI string, read from the locale file: Playwright's loader can't import
 * JSON without an import attribute, which the site's own `t()` doesn't use.
 */
function t(locale: Locale, key: UiKey): string {
  const file = new URL(`../../src/locales/${locale}.json`, import.meta.url);
  const strings = JSON.parse(readFileSync(file, "utf8")) as Record<
    UiKey,
    string
  >;
  return strings[key];
}

interface InnerPage {
  path: string;
  lang: Locale;
  /** The other language's path, for hreflang. */
  other: string;
  h1: UiKey;
  title: UiKey;
  description: UiKey;
  /** The JSON-LD types in the page's graph, with how many of each. */
  graph: Record<string, number>;
}

/** The inner pages, as phase 3 builds them (docs/phases/3-pages.md). */
const PAGES: InnerPage[] = [
  {
    path: "/usluge",
    lang: "hr",
    other: "/en/services",
    h1: "services.title",
    title: "meta.services.title",
    description: "meta.services.description",
    graph: { BreadcrumbList: 1, Service: 8 },
  },
  {
    path: "/en/services",
    lang: "en",
    other: "/usluge",
    h1: "services.title",
    title: "meta.services.title",
    description: "meta.services.description",
    graph: { BreadcrumbList: 1, Service: 8 },
  },
];

for (const { path, lang, other, h1, title, description, graph } of PAGES) {
  test(`inner page ${path}`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(path);
    const canonical = `${SITE_URL}${path}`;

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      t(lang, h1),
    );
    await expect(page).toHaveTitle(t(lang, title));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      t(lang, description),
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonical,
    );
    await expect(
      page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
    ).toHaveAttribute("href", canonical);
    await expect(
      page.locator(
        `link[rel="alternate"][hreflang="${lang === "hr" ? "en" : "hr"}"]`,
      ),
    ).toHaveAttribute("href", `${SITE_URL}${other}`);

    // The trail back to Home, visible and as structured data.
    await expect(
      page.getByRole("navigation", { name: t(lang, "breadcrumb.label") }),
    ).toBeVisible();
    const text = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const data = JSON.parse(text ?? "{}") as {
      "@graph"?: { "@type": string }[];
    };
    const counts: Record<string, number> = {};
    for (const node of data["@graph"] ?? []) {
      counts[node["@type"]] = (counts[node["@type"]] ?? 0) + 1;
    }
    expect(counts).toEqual(graph);

    await expectNoSeriousA11yViolations(page);
    expect(errors).toEqual([]);
  });
}

test("Home's service links land on their rows on /usluge", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('a[href^="/usluge#"]');
  const targets = await links.evaluateAll((anchors) =>
    anchors.map((anchor) => new URL((anchor as HTMLAnchorElement).href).hash),
  );
  expect(targets.length).toBeGreaterThan(0);
  await page.goto("/usluge");
  for (const hash of targets) {
    await expect(page.locator(hash)).toHaveCount(1);
  }
});
