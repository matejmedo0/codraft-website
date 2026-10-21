import { expect, type Page, test } from "@playwright/test";

import { LEGAL_NAV, MAIN_NAV } from "../../src/features/i18n/navigation.ts";
import { pathFor } from "../../src/features/i18n/urls.ts";
import { collectErrors } from "./helpers.ts";

/** Below 64rem the navigation folds behind the menu button. */
const DESKTOP_WIDTH = 1024;

function isNarrow(page: Page): boolean {
  return (page.viewportSize()?.width ?? DESKTOP_WIDTH) < DESKTOP_WIDTH;
}

test("the skip link comes first and leads to the main content", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skip = page.getByRole("link", { name: "Preskoči na sadržaj" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveAttribute("href", "#main");
  await expect(page.locator("main#main")).toHaveCount(1);
});

test("the header links every main page and asks for nothing", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Glavna navigacija" });
  if (isNarrow(page)) {
    await page.getByRole("button", { name: "Izbornik" }).click();
  }

  for (const { page: target } of MAIN_NAV) {
    await expect(
      nav.locator(`a[href="${pathFor(target, "hr")}"]`),
    ).toBeVisible();
  }
  // The free audit is asked for once, where a page explains it (ADR 0017).
  await expect(
    page.locator(`header a[href="${pathFor("audit", "hr")}"]`),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Codraft, početna stranica" }),
  ).toHaveAttribute("aria-current", "page");
});

test("the menu opens, and Escape closes it and returns focus", async ({
  page,
}) => {
  const errors = collectErrors(page);
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Izbornik" });
  const nav = page.getByRole("navigation", { name: "Glavna navigacija" });

  if (!isNarrow(page)) {
    await expect(toggle).toBeHidden();
    await expect(nav).toBeVisible();
    return;
  }

  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  expect(errors).toEqual([]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the navigation stays open and the menu button hidden", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("navigation", { name: "Glavna navigacija" }),
    ).toBeVisible();
    await expect(page.locator("[data-menu-toggle]")).toBeHidden();
  });
});

for (const { from, to, lang } of [
  { from: "/", to: "/en", lang: "en" },
  { from: "/en", to: "/", lang: "hr" },
  { from: "/nepostojeca-stranica", to: "/en", lang: "en" },
]) {
  test(`the language switcher on ${from} leads to ${to}`, async ({ page }) => {
    await page.goto(from);
    const links = page.locator(`a[hreflang="${lang}"]`);

    // One in the header, one in the title block; both say the target
    // language in that language.
    await expect(links).toHaveCount(2);
    for (const link of await links.all()) {
      await expect(link).toHaveAttribute("href", to);
      await expect(link).toHaveAttribute("lang", lang);
    }
  });
}

for (const locale of ["hr", "en"] as const) {
  test(`the title block links the legal pages (${locale})`, async ({
    page,
  }) => {
    await page.goto(pathFor("home", locale));
    const footer = page.getByRole("contentinfo");

    for (const { page: target } of LEGAL_NAV) {
      await expect(
        footer.locator(`a[href="${pathFor(target, locale)}"]`),
      ).toHaveCount(1);
    }
    await expect(footer.locator("time")).toHaveAttribute(
      "datetime",
      /^\d{4}-\d{2}-\d{2}$/,
    );
  });
}

test("with reduced motion nothing waits to be drawn", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });

  await expect(page.locator(".is-pending")).toHaveCount(0);
  await context.close();
});

test("the favicon set is served without C2PA metadata", async ({ request }) => {
  for (const path of [
    "/favicon.ico",
    "/icon.svg",
    "/apple-touch-icon.png",
    "/icon-192.png",
    "/icon-512.png",
    "/site.webmanifest",
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const body = await response.body();
    expect(body.includes("c2pa"), path).toBe(false);
    expect(body.includes("caBX"), path).toBe(false);
  }
});
