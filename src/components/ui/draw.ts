/**
 * Parts that draw once, when they first scroll into view (docs/motion.md):
 * a zone's selection, the line through steps, a dimension. A part opts in
 * with `data-draw`; its own CSS animates it while it has `.is-drawing`, and
 * hides it while it has `.is-pending`.
 *
 * Only parts below the fold wait. Without JavaScript, or with reduced
 * motion, nothing is ever pending, so every part shows its final state.
 *
 * Imported by the components' scripts; a module runs once per page however
 * many components import it.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";

/** By default a part draws once its top is 15 % above the viewport's bottom. */
const DEFAULT_TRIGGER: IntersectionObserverInit = {
  rootMargin: "0px 0px -15% 0px",
};

/**
 * Other triggers, by the value of `data-draw`: "late" draws higher on
 * screen, and "half" waits until half of the part is in view, so a longer
 * sequence is seen from its start.
 */
const DRAW_TRIGGERS: Partial<Record<string, IntersectionObserverInit>> = {
  late: { rootMargin: "0px 0px -30% 0px" },
  half: { threshold: 0.5 },
};

/** How close to the end of the page counts as the bottom, in pixels. */
const BOTTOM_TOLERANCE = 2;

function isBelowFold(element: Element): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}

/** Calls `onEnter` once, when the element first reaches its trigger. */
function onFirstView(
  element: Element,
  onEnter: () => void,
  trigger: IntersectionObserverInit,
): void {
  const threshold =
    typeof trigger.threshold === "number" ? trigger.threshold : 0;
  const observer = new IntersectionObserver((entries) => {
    const reached = entries.some(
      (entry) => entry.isIntersecting && entry.intersectionRatio >= threshold,
    );
    if (!reached) return;
    observer.disconnect();
    onEnter();
  }, trigger);
  observer.observe(element);
}

/**
 * Starts a part's drawing. `.is-drawing` sets its animation; removing
 * `.is-pending` a frame later lets a transition start from the hidden state.
 */
function startDrawing(element: Element): void {
  element.classList.add("is-drawing");
  requestAnimationFrame(() => {
    element.classList.remove("is-pending");
  });
}

function initDraws(): void {
  for (const part of document.querySelectorAll<HTMLElement>("[data-draw]")) {
    if (!isBelowFold(part)) continue;
    part.classList.add("is-pending");
    const trigger = DRAW_TRIGGERS[part.dataset.draw ?? ""] ?? DEFAULT_TRIGGER;
    onFirstView(
      part,
      () => {
        if (part.classList.contains("is-pending")) startDrawing(part);
      },
      trigger,
    );
  }
}

/**
 * A part near the end of the page may never scroll up to its trigger. At
 * the bottom of the page, every part still waiting in view draws.
 */
function initBottomOfPage(): void {
  window.addEventListener(
    "scroll",
    () => {
      const { scrollHeight } = document.documentElement;
      const bottom = window.scrollY + window.innerHeight;
      if (bottom < scrollHeight - BOTTOM_TOLERANCE) return;
      for (const part of document.querySelectorAll(".is-pending")) {
        if (part.classList.contains("is-drawing")) continue;
        if (part.getBoundingClientRect().top < window.innerHeight) {
          startDrawing(part);
        }
      }
    },
    { passive: true },
  );
}

/**
 * A replay button (`data-draw-replay`) inside a part hides the part, then
 * draws it again. Reading the layout in between applies the hidden state,
 * so the animations restart.
 */
function initReplays(): void {
  for (const button of document.querySelectorAll("[data-draw-replay]")) {
    const part = button.closest("[data-draw]");
    if (part === null) continue;
    button.addEventListener("click", () => {
      part.classList.remove("is-drawing");
      part.classList.add("is-pending");
      part.getBoundingClientRect();
      startDrawing(part);
    });
  }
}

/**
 * The wordmark's entrance is CSS and plays on load. A mark below the fold
 * would play it unseen, so it waits and plays when it scrolls into view;
 * re-adding the class restarts the animation.
 */
function initWordmarkEntrances(): void {
  for (const mark of document.querySelectorAll(".wordmark--entrance")) {
    if (!isBelowFold(mark)) continue;
    mark.classList.remove("wordmark--entrance");
    onFirstView(
      mark,
      () => {
        mark.classList.add("wordmark--entrance");
      },
      DEFAULT_TRIGGER,
    );
  }
}

if (!prefersReducedMotion()) {
  initDraws();
  initBottomOfPage();
  initReplays();
  initWordmarkEntrances();
}
