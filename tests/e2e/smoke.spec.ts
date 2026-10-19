import { expect, test } from "@playwright/test";

import { SITE_URL } from "../../src/config/site.ts";
import { collectErrors, expectNoSeriousA11yViolations } from "./helpers.ts";

const HREFLANG = {
  hr: `${SITE_URL}/`,
  en: `${SITE_URL}/en`,
  "x-default": `${SITE_URL}/en`,
};

const HOME_PAGES = [
  { path: "/", lang: "hr", canonical: `${SITE_URL}/` },
  { path: "/en", lang: "en", canonical: `${SITE_URL}/en` },
];

for (const { path, lang, canonical } of HOME_PAGES) {
  test(`home page ${path}`, async ({ page }) => {
    const errors = collectErrors(page);
    const response = await page.goto(path);

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Codraft");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonical,
    );
    for (const [hreflang, href] of Object.entries(HREFLANG)) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`),
      ).toHaveAttribute("href", href);
    }
    await expect(
      page.locator('meta[http-equiv="content-security-policy"]'),
    ).toHaveCount(1);
    await expectNoSeriousA11yViolations(page);
    expect(errors).toEqual([]);
  });
}

test("an unknown Croatian path gets the Croatian 404 page", async ({
  page,
}) => {
  const response = await page.goto("/nepostojeca-stranica");

  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "hr");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Stranica nije pronađena",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex",
  );
  await expectNoSeriousA11yViolations(page);
});

test("an unknown English path returns 404", async ({ page }) => {
  // Known limitation: the Node adapter serves the Croatian 404 page for
  // unknown /en/* paths. In production Caddy serves en/404 (phase 7).
  const response = await page.goto("/en/x");

  expect(response?.status()).toBe(404);
});

test("the English 404 page has English copy", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/en/404");

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Page not found",
  );
  await expect(
    page.getByRole("link", { name: "Back to the home page" }),
  ).toHaveAttribute("href", "/en");
  await expectNoSeriousA11yViolations(page);
  expect(errors).toEqual([]);
});

test("the health endpoint answers ok", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});
