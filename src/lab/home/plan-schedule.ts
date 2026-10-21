/**
 * "Što radimo", option 12 "Terminski plan" (ServicesPlan.astro; review
 * #101): each service's bar draws when the service reaches 85 % of the
 * screen's height, then its grip or arrow snaps in and its icon draws
 * (services.css plays them; docs/motion.md). Once and only forwards.
 *
 * - Rows that start together (a fast scroll) start NEXT_ROW_MS apart.
 * - A row that starts also starts every earlier row still waiting, so a
 *   jump never leaves a gap; rows already above the screen are complete at
 *   once.
 *
 * Only the bars and the icons wait; the text never does. Without
 * JavaScript, or with reduced motion, the CSS shows them complete and this
 * script does nothing.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** A bar draws from its grid line in this time. */
const BAR_MS = 360;
/** Rows that start together start this far apart. */
const NEXT_ROW_MS = 90;
/** A row starts when its top reaches 85 % of the screen's height. */
const TRIGGER: IntersectionObserverInit = { rootMargin: "0px 0px -15% 0px" };

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

function init(root: HTMLElement): void {
  let waiting = [...root.querySelectorAll<HTMLElement>("[data-plan-row]")];

  const start = (upTo: HTMLElement): void => {
    const index = waiting.indexOf(upTo);
    if (index === -1) return;
    const starting = waiting.slice(0, index + 1);
    waiting = waiting.slice(index + 1);
    let order = 0;
    for (const row of starting) {
      observer.unobserve(row);
      if (row.getBoundingClientRect().bottom <= 0) {
        row.classList.add("is-drawn", "is-instant");
        continue;
      }
      const delay = order * NEXT_ROW_MS;
      row.style.setProperty("--mark-at", ms(delay));
      row.style.setProperty("--mark-for", ms(BAR_MS));
      const icon = row.querySelector<SVGSVGElement>("[data-icon]");
      if (icon !== null) timeStrokes(icon, delay + BAR_MS);
      row.classList.add("is-drawn");
      order += 1;
    }
  };

  const observer = new IntersectionObserver((entries) => {
    // The furthest row reached or passed starts, with all before it.
    const reached = entries
      .filter(
        (entry) => entry.isIntersecting || entry.boundingClientRect.bottom <= 0,
      )
      .map((entry) => entry.target as HTMLElement);
    const furthest = reached.reduce<HTMLElement | undefined>(
      (last, row) =>
        last === undefined || waiting.indexOf(row) > waiting.indexOf(last)
          ? row
          : last,
      undefined,
    );
    if (furthest !== undefined) start(furthest);
  }, TRIGGER);

  for (const row of waiting) observer.observe(row);
}

if (!prefersReducedMotion()) {
  for (const root of document.querySelectorAll<HTMLElement>("[data-plan]")) {
    init(root);
  }
}
