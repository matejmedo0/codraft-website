/**
 * "Što radimo", option 14 "Kartice" (ServicesTabs.astro; review #101): the
 * stages as tabs, after the WAI-ARIA tabs pattern with automatic
 * activation. Without JavaScript the stages stand one after another; this
 * script shows the tabs and puts the panels in one place.
 *
 * - Choosing a tab shows its panel at once; the tab's line draws and, the
 *   first time a stage is shown, its icons draw (services.css). The first
 *   stage's icons wait until the section reaches 85 % of the screen's
 *   height.
 * - The arrow keys move between the tabs and choose them; Home and End go
 *   to the first and the last.
 *
 * With reduced motion the tabs work the same; the CSS leaves out the
 * drawing.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** A row's icons start this far apart. */
const NEXT_MS = 60;
/** The section is in view when its tabs reach 85 % of the screen's height. */
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
  let inView = false;

  const select = (chosen: number, focus: boolean): void => {
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

  for (const [index, panel] of panels.entries()) {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabs[index]?.id ?? "");
    panel.tabIndex = 0;
  }
  list.hidden = false;
  root.classList.add("is-tabbed");

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

  // The first stage draws when the section comes into view.
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    inView = true;
    const chosen = tabs.findIndex(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );
    select(Math.max(chosen, 0), false);
  }, TRIGGER);
  observer.observe(list);

  if (prefersReducedMotion()) {
    observer.disconnect();
    inView = true;
  }
}

for (const root of document.querySelectorAll<HTMLElement>("[data-tabs]")) {
  init(root);
}
