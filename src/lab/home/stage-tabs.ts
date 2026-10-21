/**
 * "Što radimo", option 14 "Kartice" (ServicesTabs.astro; review #101): the
 * stages as tabs from 48rem, after the WAI-ARIA tabs pattern with automatic
 * activation. On phones and without JavaScript the stages stand one after
 * another; this script shows the tabs and hides the unchosen stages only
 * while the screen is at least 48rem wide, and undoes it below.
 *
 * - Choosing a tab shows its panel at once; the tab's line draws, and the
 *   line of the tab left behind fades (services.css). The first time a
 *   stage is shown, its icons draw; the first stage's wait until its
 *   services reach 85 % of the screen's height.
 * - The arrow keys move between the tabs and choose them; Home and End go
 *   to the first and the last.
 *
 * With reduced motion the tabs work the same; the CSS leaves out the
 * drawing.
 */
import { DURATION_MS, prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** A row's icons start this far apart. */
const NEXT_MS = 60;
/** The tabs from this width; narrower, the stages one after another. */
const TABS_FROM = "(min-width: 48rem)";
/** The first stage draws when its services reach 85 % of the screen. */
const TRIGGER: IntersectionObserverInit = { rootMargin: "0px 0px -15% 0px" };

/** Draws a panel's icons, once. */
function drawPanel(panel: HTMLElement): void {
  const items = panel.querySelectorAll<HTMLElement>(
    "[data-axis-item]:not(.is-drawn)",
  );
  for (const [index, item] of [...items].entries()) {
    const icon = item.querySelector<SVGSVGElement>("[data-icon]");
    if (icon !== null) timeStrokes(icon, index * NEXT_MS);
    item.classList.add("is-drawn");
  }
}

function init(root: HTMLElement): void {
  const list = root.querySelector<HTMLElement>("[data-tabs-list]");
  const tabs = [...root.querySelectorAll<HTMLElement>("[data-tabs-tab]")];
  const panels = [...root.querySelectorAll<HTMLElement>("[data-tabs-panel]")];
  if (list === null || tabs.length !== panels.length) return;
  const tabsFrom = window.matchMedia(TABS_FROM);
  let inView = prefersReducedMotion();
  let chosen = 0;

  const select = (next: number, focus: boolean): void => {
    const previous = tabs[chosen];
    if (next !== chosen && previous !== undefined && inView) {
      // The line left behind fades, as a selection releases.
      previous.classList.add("is-releasing");
      window.setTimeout(() => {
        previous.classList.remove("is-releasing");
      }, DURATION_MS.fast);
    }
    chosen = next;
    for (const [index, tab] of tabs.entries()) {
      const isChosen = index === chosen;
      tab.setAttribute("aria-selected", String(isChosen));
      tab.tabIndex = isChosen ? 0 : -1;
      tab.classList.toggle("is-drawing", isChosen && inView);
      panels[index]?.classList.toggle("is-active", isChosen);
    }
    const panel = panels[chosen];
    if (panel !== undefined && inView) drawPanel(panel);
    if (focus) tabs[chosen]?.focus();
  };

  // The tabs from 48rem; below, the stages one after another, all drawn.
  const apply = (): void => {
    const isTabbed = tabsFrom.matches;
    list.hidden = !isTabbed;
    root.classList.toggle("is-tabbed", isTabbed);
    for (const [index, panel] of panels.entries()) {
      if (isTabbed) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tabs[index]?.id ?? "");
        panel.tabIndex = 0;
      } else {
        panel.removeAttribute("role");
        panel.removeAttribute("aria-labelledby");
        panel.removeAttribute("tabindex");
        if (inView) drawPanel(panel);
      }
    }
  };

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener("click", () => {
      select(index, false);
    });
  }

  list.addEventListener("keydown", (event) => {
    const current = tabs.findIndex((tab) => tab === document.activeElement);
    if (current === -1) return;
    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next, true);
  });

  // Without tabs, each service draws as it comes into view.
  const items = [...root.querySelectorAll<HTMLElement>("[data-axis-item]")];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) {
        continue;
      }
      const item = entry.target as HTMLElement;
      if (tabsFrom.matches) {
        // The tabs: the first services in view draw the chosen stage.
        observer.disconnect();
        inView = true;
        select(chosen, false);
        return;
      }
      observer.unobserve(item);
      if (item.classList.contains("is-drawn")) continue;
      const icon = item.querySelector<SVGSVGElement>("[data-icon]");
      if (icon !== null) timeStrokes(icon, 0);
      item.classList.add("is-drawn");
    }
  }, TRIGGER);

  apply();
  select(0, false);
  tabsFrom.addEventListener("change", () => {
    inView = true;
    apply();
    select(chosen, false);
  });
  if (!prefersReducedMotion()) {
    for (const item of items) observer.observe(item);
  }
}

for (const root of document.querySelectorAll<HTMLElement>("[data-tabs]")) {
  init(root);
}
