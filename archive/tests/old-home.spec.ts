// Archived (ADR 0035): E2E tests of the old Home, out of tests/e2e so they don't run.
// From tests/e2e/site-chrome.spec.ts:

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

// From tests/e2e/pages.spec.ts:

for (const [home, services] of [
  ["/", "/usluge"],
  ["/en", "/en/services"],
] as const) {
  test(`Home's service links land on their rows on ${services}`, async ({
    page,
  }) => {
    await page.goto(home);
    const links = page.locator(`a[href^="${services}#"]`);
    const targets = await links.evaluateAll((anchors) =>
      anchors.map((anchor) => new URL((anchor as HTMLAnchorElement).href).hash),
    );
    expect(targets.length).toBeGreaterThan(0);
    await page.goto(services);
    for (const hash of targets) {
      await expect(page.locator(hash)).toHaveCount(1);
    }
  });
}
