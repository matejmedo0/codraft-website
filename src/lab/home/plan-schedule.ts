/**
 * "Što radimo", option 12 "Terminski plan" (ServicesPlan.astro; review
 * #101): the schedule draws as one pen moving down it, once and only
 * forwards (services.css plays it; docs/motion.md).
 *
 * - A row starts when its top reaches 85 % of the screen's height. A
 *   stage's head draws its bar from its bubble (BAR_MS), then the bar's grip
 *   or arrow snaps in. A service's icon draws first, beside the text being
 *   read, and its grip snaps in on its stage's grid line GRIP_AFTER_MS
 *   later; the milestone snaps in when the planning bar has reached its end.
 * - One pen: a row never starts before the one above it has had its turn
 *   (its bar drawn, or NEXT_MS after a service). Rows that had to wait play
 *   at HURRY times the speed, as in components/ui/draw.ts, so a fast scroll
 *   catches up.
 * - A row that starts also starts every earlier row still waiting, so a
 *   jump never leaves a gap; rows already above the screen are complete at
 *   once.
 *
 * Only the bars, the grips and the icons wait; the text never does.
 * Without JavaScript, or with reduced motion, the CSS shows them complete
 * and this script does nothing.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** A stage's bar draws from its bubble in this time. */
const BAR_MS = 360;
/** A service's grip snaps in this long after its icon starts. */
const GRIP_AFTER_MS = 240;
/** The next service may start this long after the one before. */
const NEXT_MS = 120;
/** Rows that had to wait play this much faster. */
const HURRY = 2;
/** A row starts when its top reaches 85 % of the screen's height. */
const TRIGGER: IntersectionObserverInit = { rootMargin: "0px 0px -15% 0px" };

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

function init(root: HTMLElement): void {
  let waiting = [...root.querySelectorAll<HTMLElement>("[data-plan-row]")];
  /** The earliest time the next row may start (performance.now()). */
  let nextAt = 0;

  const play = (row: HTMLElement): void => {
    const now = performance.now();
    const delay = Math.max(0, nextAt - now);
    const speed = delay > 0 ? HURRY : 1;
    const isHead = row.dataset.planRow === "head";
    row.style.setProperty("--mark-at", ms(delay));
    if (isHead) {
      row.style.setProperty("--mark-for", ms(BAR_MS / speed));
      nextAt = now + delay + BAR_MS / speed;
    } else {
      // The milestone waits for the planning bar it ends; it has no icon
      // to draw first.
      const isMilestone = row.querySelector(".plan-mark--milestone") !== null;
      const icon = row.querySelector<SVGSVGElement>("[data-icon]");
      if (icon !== null) timeStrokes(icon, delay);
      row.style.setProperty(
        "--mark-at",
        ms(delay + (isMilestone ? 0 : GRIP_AFTER_MS / speed)),
      );
      nextAt = now + delay + NEXT_MS / speed;
    }
    row.classList.add("is-drawn");
  };

  const start = (upTo: HTMLElement): void => {
    const index = waiting.indexOf(upTo);
    if (index === -1) return;
    const starting = waiting.slice(0, index + 1);
    waiting = waiting.slice(index + 1);
    for (const row of starting) {
      observer.unobserve(row);
      if (row.getBoundingClientRect().bottom <= 0) {
        row.classList.add("is-drawn", "is-instant");
        continue;
      }
      play(row);
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
