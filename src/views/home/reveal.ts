/**
 * Plays an element's entrance once, when it comes into view (M28: on
 * arrival, not tied to the scroll). An element with `data-reveal` that is
 * still below the screen's trigger line gets `is-pending` (its CSS hides
 * it), then `is-in` once it reaches the line (its CSS plays the entrance).
 * Elements already in view or above it on load, every element with reduced
 * motion, and every element without this script show at once.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";

/** The trigger line: 20 % above the screen's bottom. */
const TRIGGER = 0.8;

if (!prefersReducedMotion()) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        entry.target.classList.add("is-in");
        entry.target.classList.remove("is-pending");
      }
    },
    { rootMargin: `0px 0px -${String(Math.round((1 - TRIGGER) * 100))}% 0px` },
  );
  for (const element of document.querySelectorAll("[data-reveal]")) {
    if (element.getBoundingClientRect().top < window.innerHeight * TRIGGER) {
      continue;
    }
    element.classList.add("is-pending");
    observer.observe(element);
  }
  window.addEventListener("beforeprint", () => {
    for (const element of document.querySelectorAll(".is-pending")) {
      element.classList.remove("is-pending");
    }
  });
}
