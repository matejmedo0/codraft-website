/**
 * Production build with the design lab (/lab/*) included, so the prototypes
 * and the style page can be checked under the real CSP, which `astro dev`
 * doesn't apply (docs/phases/2-design.md). Never deploy this build; a normal
 * `npm run build` leaves the lab out.
 *
 * Usage: npm run build:lab
 */
import { build } from "astro";

process.env.CODRAFT_LAB = "1";
await build({});
