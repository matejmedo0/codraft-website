/**
 * The motion foundation (docs/motion.md, ADR 0035): GSAP's scroll plugins,
 * registered once, and Lenis smooth scrolling on GSAP's ticker, so there is
 * one animation loop and ScrollTrigger stays in sync. BaseLayout loads it on
 * every page; components import gsap and the plugins from here.
 */
import "lenis/dist/lenis.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Reduced motion is the optimisation phase's decision (ADR 0035).
export const lenis = new Lenis({ autoRaf: false, respectReducedMotion: false });
lenis.on("scroll", () => {
  ScrollTrigger.update();
});
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// The mobile address bar resizing the viewport would re-measure every trigger mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });
// Web fonts change text height after the first measure; pins would start at stale offsets.
void document.fonts.ready.then(() => {
  ScrollTrigger.refresh();
});

export { gsap, ScrollTrigger, SplitText };
