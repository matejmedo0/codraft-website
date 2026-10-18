# 0005. Design directions are reviewed as coded prototypes

- **Status:** Accepted
- **Date:** 2026-10-18
- **Deciders:** client (Codraft team), Claude

## Context

The client wants a professional, distinctive design and high-quality animation that does not look like a template. Motion is a core part of the concept (see [motion.md](../motion.md)). Static mockups cannot show timing, easing, reduced-motion behaviour or how Croatian text lengths behave in a layout. Figma is connected through MCP and may be used if useful.

## Decision

- **Prototypes in the real stack.** In phase 2, the 2–3 visual directions are built as live prototypes. They run on local, noindex routes and use real Croatian copy, real fonts and real motion.
- **The client reviews them in the browser.** Playwright screenshots are taken at 375, 768 and 1440 px.
- **The chosen prototype becomes the style page,** so nothing has to be translated from Figma into code.
- **Figma is optional, on the client's request.** One use: mirroring the chosen direction as a Figma library for social media graphics and presentations (`figma:figma-generate-library`, with `figma:figma-use` before any `use_figma` call).

## Consequences

- The client judges motion, contrast and Croatian text as they will really behave.
- Prototyping in code costs a bit more up front, and phase 1 must deliver a working stack first.
- The design system lives in code (CSS custom properties and components). Figma, if used, is a mirror, not the source.
