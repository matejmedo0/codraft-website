/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

// Unit tests run with Astro's Vite config, so imports resolve as in the app.
// They sit next to the code as *.test.ts; the Playwright tests in tests/e2e
// run separately (npm run test:e2e).
export default getViteConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "scripts/**/*.test.ts"],
  },
});
