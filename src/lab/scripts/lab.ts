/**
 * Behaviour shared by the design-lab prototypes: the mobile menu, the parts
 * that draw once when they scroll into view, the wordmark entrance when the
 * mark starts below the fold, and the replay button of the CAD drawing
 * (docs/motion.md). Without JavaScript the menu stays open, every part is
 * drawn, and the entrance plays on load.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** By default a part draws once its top is 15 % above the viewport's bottom. */
const DEFAULT_TRIGGER: IntersectionObserverInit = {
  rootMargin: "0px 0px -15% 0px",
};

/**
 * Other triggers, by the value of `data-draw`: "late" draws higher on
 * screen, and "half" waits until half of the part is in view (the CAD
 * drawing, so its sequence is seen from the start).
 */
const DRAW_TRIGGERS: Partial<Record<string, IntersectionObserverInit>> = {
  late: { rootMargin: "0px 0px -30% 0px" },
  half: { threshold: 0.5 },
};

function initMenus(): void {
  const toggles =
    document.querySelectorAll<HTMLButtonElement>("[data-menu-toggle]");
  for (const toggle of toggles) {
    const panelId = toggle.getAttribute("aria-controls");
    const panel = panelId === null ? null : document.getElementById(panelId);
    if (panel === null) continue;

    const setOpen = (open: boolean): void => {
      toggle.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("is-open", open);
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      setOpen(false);
      toggle.focus();
    });
  }
}

/** Calls `onEnter` once, when the element first reaches its trigger. */
function onFirstView(
  element: Element,
  onEnter: () => void,
  trigger: IntersectionObserverInit = DEFAULT_TRIGGER,
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

function isBelowFold(element: Element): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}

/**
 * Starts a part's drawing. `.is-drawing` sets its animation or transition;
 * removing `.is-pending` a frame later lets a transition run from the
 * hidden state.
 */
function startDrawing(element: Element): void {
  element.classList.add("is-drawing");
  requestAnimationFrame(() => {
    element.classList.remove("is-pending");
  });
}

function initDraws(): void {
  // Only parts below the fold wait to draw; the ones already on screen stay
  // as they are, so nothing flickers on load. `.rule-draw` scales itself;
  // `[data-draw]` lets its own CSS animate its parts (a line, then its grip).
  const parts = document.querySelectorAll<HTMLElement>(
    ".rule-draw, [data-draw]",
  );
  for (const part of parts) {
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

function initBottomOfPage(): void {
  // A part near the end of the page may never scroll up to its trigger. At
  // the bottom of the page, every part still waiting in view draws.
  const onScroll = (): void => {
    const { scrollHeight } = document.documentElement;
    if (window.scrollY + window.innerHeight < scrollHeight - 2) return;
    for (const part of document.querySelectorAll(".is-pending")) {
      if (part.classList.contains("is-drawing")) continue;
      if (part.getBoundingClientRect().top < window.innerHeight) {
        startDrawing(part);
      }
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReplays(): void {
  // "Iscrtaj ponovno": hide the part, then draw it again. Reading the layout
  // in between applies the hidden state, so the animations restart.
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

function initWordmarkDraws(): void {
  // A mark below the fold would play its entrance unseen, so it replays when
  // it scrolls into view. Re-adding the class restarts the CSS animation.
  for (const mark of document.querySelectorAll(".wordmark--draw")) {
    if (!isBelowFold(mark)) continue;
    mark.classList.remove("wordmark--draw");
    onFirstView(mark, () => {
      mark.classList.add("wordmark--draw");
    });
  }
}

initMenus();
if (!window.matchMedia(REDUCED_MOTION).matches) {
  initDraws();
  initBottomOfPage();
  initWordmarkDraws();
  initReplays();
}
