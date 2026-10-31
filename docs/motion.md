# Motion

> **Status (2026-10-30):** the direction is a scroll-based site built for the wow ([ADR 0035](decisions/0035-a-scroll-based-site-built-for-the-wow.md)). Pages are rebuilt one at a time on the team's instructions, Home first. This file holds the foundation and the craft rules, not a design.

## Foundation

`src/lib/scroll.ts`, loaded on every page by `BaseLayout`:
- registers ScrollTrigger and SplitText once
- runs Lenis smooth scrolling on GSAP's ticker, so there is one animation loop and ScrollTrigger stays in sync
- refreshes every trigger once the web fonts have loaded, so pins start at the right offsets

A component animates in its own `<script>`:

```astro
<script>
  import { gsap, ScrollTrigger, SplitText } from "../../lib/scroll.ts";

  for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
    gsap.from(el, { autoAlpha: 0, y: 40, scrollTrigger: { trigger: el, start: "top 80%" } });
  }
</script>
```

Astro bundles that script once per page, not once per instance, so it selects every instance of its component.

## Craft rules

- Animate `transform`, `opacity` and `clip-path`; never `width`, `height`, `top`, `left`, `margin` or `padding`.
- Pin a wrapper and animate its children, never the pinned element itself.
- Full-height scenes use `svh`, so the mobile address bar doesn't resize them mid-scroll.
- Every image has `width` and `height`, so nothing shifts the pins after it loads. After any other change of height, call `ScrollTrigger.refresh()`.
- One loop: no GSAP ScrollSmoother and no second `requestAnimationFrame` loop beside Lenis.
- Lenis ignores reduced motion for now (`respectReducedMotion: false` in `scroll.ts`); the optimisation phase decides (ADR 0035).
