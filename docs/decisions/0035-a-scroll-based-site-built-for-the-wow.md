# 0035. A new direction: a scroll-based site built for the wow

- **Status:** Accepted; supersedes 0014, 0015, 0022, 0023, 0025, 0028, 0030, 0033 and 0034, which are removed
- **Date:** 2026-10-30
- **Deciders:** client (Codraft team), Claude

## Context

The site's look and motion came from the design direction of phase 2 (ADR 0015) and `docs/motion.md`: CAD actions played once, a strict "Ruled out" list (pinned scroll scenes, smooth scrolling, parallax), final states without JavaScript or with reduced motion, and a JavaScript budget of 15 KB per content page. A new Home drawn by the scroll, built with CSS scroll-driven animations on 2026-10-29, was rejected: it looked basic and static, with no real scroll-based feel and no sense that a professional made it.

The team wants a modern, scroll-based site with the polish that sells the studio: the kind of page a client remembers.

## Decision

1. **A new look and feel, built page by page on the team's instructions, Home first.** The CAD language (drafting lines, grips, the floor plan) comes back only where the team asks for it, on top of the new design.
2. **Motion foundation:** GSAP with ScrollTrigger and SplitText, and Lenis smooth scrolling on GSAP's ticker, set up once in `src/lib/scroll.ts` and loaded on every page by `BaseLayout`. Astro components animate in their own `<script>`; React islands only for stateful UI such as forms. Details in `docs/motion.md`.
3. **Rules dropped:**
   - the JavaScript budget (its check is out of `verify` and CI)
   - final states without JavaScript and with reduced motion
   - the hero H1 never waiting for an animation
   - the design rules of the removed ADRs, `docs/new-home-rules.md`, and the colour, type and imagery parts of `docs/brand.md`
4. **Kept:**
   - business, content and legal decisions: 0002–0004, 0007, 0017–0021, 0029, 0032, `docs/compliance.md` and its copy guardrails
   - architecture: the stack and hosting (0008, 0009), the integrations (0010–0013), the route map and i18n, the CSP, the layer rules
   - the quality gates: lint, types, unit tests, build, copy guardrails and the E2E checks for status, `lang`, canonical, CSP, console errors and axe
5. **Optimisation is a later phase,** once the team approves the look: the JavaScript budget, responsiveness on real devices, reduced motion and Core Web Vitals.

The removed documents stay in git history, in the commit before this ADR.

## Consequences

- Pages need JavaScript for their motion. GSAP, ScrollTrigger, SplitText and Lenis add about 52 KB gzip, accepted until the optimisation phase.
- Pages not yet rebuilt keep the old design and its code; comments there may point at the removed ADRs. Old code, and tests of it such as the reduced-motion check in `site-chrome.spec.ts`, go when their page is rebuilt.
- The visual details in the page outlines of `docs/information-architecture.md` describe the old design; its sitemap and URLs still hold.
