/**
 * Behaviour shared by the design-lab prototypes: the mobile menu, the rules
 * that draw once when they scroll into view, and the wordmark entrance when
 * the mark starts below the fold (docs/motion.md). Without JavaScript the
 * menu stays open, every rule is drawn, and the entrance plays on load.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

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

/** Calls `onEnter` once, when the element first scrolls into view. */
function onFirstView(element: Element, onEnter: () => void): void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      onEnter();
    },
    { rootMargin: "0px 0px -15% 0px" },
  );
  observer.observe(element);
}

function isBelowFold(element: Element): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}

function initRuleDraws(): void {
  // Only rules below the fold wait to draw; the ones already on screen stay
  // as they are, so nothing flickers on load. `.rule-draw` scales itself;
  // `[data-draw]` lets its own CSS animate parts (a line, then its grip).
  for (const rule of document.querySelectorAll(".rule-draw, [data-draw]")) {
    if (!isBelowFold(rule)) continue;
    rule.classList.add("is-pending");
    onFirstView(rule, () => {
      rule.classList.add("is-drawing");
      requestAnimationFrame(() => {
        rule.classList.remove("is-pending");
      });
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
  initRuleDraws();
  initWordmarkDraws();
}
