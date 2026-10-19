import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/config/site.ts";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: SITE_URL,

  // Pages are prerendered. Only routes that opt out with
  // `export const prerender = false` (the /api/* endpoints) run on the Node
  // server (ADR 0008).
  output: "static",
  adapter: node({
    mode: "standalone",
    // The forms (phase 4) post small bodies; the default limit is 1 GB.
    bodySizeLimit: 32 * 1024,
  }),

  // React only for islands: forms, the CAD layer viewer, the chatbot.
  integrations: [react()],

  // URLs without a trailing slash: /usluge, /en/services. The directory
  // format keeps /en working on the Node server ('file' would write en.html
  // next to the en/ folder). Astro.url keeps a trailing slash in directory
  // builds, so canonicals come from the route map, not from Astro.url.
  trailingSlash: "never",
  build: { format: "directory" },

  i18n: {
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    routing: { prefixDefaultLocale: false },
  },

  security: {
    // Hash-based CSP in a <meta> tag on every prerendered page. Header-only
    // directives (frame-ancestors, report-to) come from Caddy (phase 7).
    // The CSP is not active in `astro dev`; test it on the production build.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
      ],
    },
  },

  // Shiki highlights code blocks with inline styles, which the CSP blocks.
  // The site has no code blocks; use Prism if it ever needs them.
  markdown: { syntaxHighlight: false },

  env: {
    // Every environment variable is declared here and documented in
    // .env.example. Phase 1 has none; phase 4 adds the email, booking and
    // Anthropic API settings.
    schema: {},
    validateSecrets: true,
  },
});
