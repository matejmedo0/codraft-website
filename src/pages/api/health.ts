import type { APIRoute } from "astro";

// Rendered on demand by the Node server, so it proves the server is up. The
// E2E web server waits for it; uptime monitoring will use it later.
export const prerender = false;

export const GET: APIRoute = () =>
  Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
