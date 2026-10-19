import { defineConfig, devices } from "@playwright/test";

const HOST = "127.0.0.1";
const PORT = "4321";
const BASE_URL = `http://${HOST}:${PORT}`;

/** The three widths every page is checked at (375, 768 and 1440 px). */
const WIDTHS = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

// The tests run against the production build (run `npm run build` first),
// because the CSP is only active there. The web server is the same Node
// server that runs in production.
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: WIDTHS.map(({ name, width, height }) => ({
    name,
    use: { ...devices["Desktop Chrome"], viewport: { width, height } },
  })),
  webServer: {
    command: "node ./dist/server/entry.mjs",
    env: { HOST, PORT },
    url: `${BASE_URL}/api/health`,
    reuseExistingServer: !process.env.CI,
  },
});
