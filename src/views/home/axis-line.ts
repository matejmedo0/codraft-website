/**
 * "Što radimo" on Home (HomeServices.astro): the process line follows the
 * screen and the service icons draw as it reaches them, once and only
 * forwards (the client's review, batches 14 and 15; docs/motion.md;
 * ADR 0022 and 0023).
 *
 * - The line (`data-axis-line`) runs from the first bubble to the last
 *   (`data-axis-mark`); this script sets its top and length. Its tip aims at
 *   85 % of the screen's height and eases towards it frame by frame, so a
 *   fast scroll is caught up in about --motion-follow and a slow one is
 *   followed exactly. The aim only grows; the page scrolls as always.
 * - A service (`data-axis-item`) starts when the tip reaches its icon (or,
 *   below the line's end, when the aim does): its strokes are timed by
 *   icon-draw.ts (src/features/services/icons/) and played by
 *   services.css. The right icon of a row starts NEXT_IN_ROW_MS after the
 *   left; rows passed in one frame NEXT_ROW_MS apart.
 * - Services already above the screen are complete at once, and the tip
 *   jumps past them.
 * - An IntersectionObserver switches the scroll handling on only while the
 *   section is near the screen.
 *
 * - The script takes the axis over (`is-live`); only then does the CSS hide
 *   what it draws. If it comes later than the CSS's failsafe, which by then
 *   shows the axis complete, it leaves the axis so. If motion is turned on
 *   after the page has loaded, it takes over then. Before printing it
 *   completes the axis (the /check of phase 3).
 *
 * Only the line and the icons wait; the text never does. Without
 * JavaScript, or with reduced motion, the CSS shows them complete and this
 * script does nothing.
 */
import { timeStrokes } from "../../features/services/icons/icon-draw.ts";
import { DURATION_MS, REDUCED_MOTION_QUERY } from "../../styles/motion.ts";

/** The tip aims at this share of the screen's height. */
const AIM = 0.85;
/** The easing's time constant: about 95 % of a gap closes in --motion-follow. */
const TAU_MS = DURATION_MS.follow / 3;
/** Closer than this, the tip is where it aims. */
const SETTLED_PX = 0.5;
/** The right icon of a row starts this long after the left. */
const NEXT_IN_ROW_MS = 40;
/** Rows the tip passes in one frame start this far apart. */
const NEXT_ROW_MS = 60;
/** Services whose icons are this close in height share a row. */
const ROW_TOLERANCE_PX = 4;
/** The section counts as near the screen this far ahead. */
const NEAR: IntersectionObserverInit = { rootMargin: "50% 0px" };

interface Service {
  item: HTMLElement;
  icon: SVGSVGElement | null;
  /** Where the tip starts the service, and its bottom, along the line. */
  at: number;
  bottom: number;
}

interface Axis {
  root: HTMLElement;
  line: HTMLElement;
  /** The line's top and length in the root, in pixels. */
  top: number;
  length: number;
  /** Where the tip aims and where it is, along the line, in pixels. */
  aim: number;
  tip: number;
  waiting: Service[];
}

function middle(element: Element): number {
  const box = element.getBoundingClientRect();
  return box.top + box.height / 2;
}

/** Places the line between the first and last bubble; measures services. */
function layout(axis: Axis): void {
  const marks = [
    ...axis.root.querySelectorAll<HTMLElement>("[data-axis-mark]"),
  ];
  const first = marks[0];
  const last = marks.at(-1);
  if (first === undefined || last === undefined) return;
  const origin = axis.root.getBoundingClientRect().top;
  axis.top = middle(first) - origin;
  axis.length = Math.max(middle(last) - origin - axis.top, 0);
  axis.line.style.top = `${String(axis.top)}px`;
  axis.line.style.height = `${String(axis.length)}px`;

  const start = origin + axis.top;
  for (const service of axis.waiting) {
    service.at = middle(service.icon ?? service.item) - start;
    service.bottom = service.item.getBoundingClientRect().bottom - start;
  }
}

/** Where the line starts on the screen. */
function lineStart(axis: Axis): number {
  return axis.root.getBoundingClientRect().top + axis.top;
}

function render(axis: Axis): void {
  const share = axis.length === 0 ? 1 : axis.tip / axis.length;
  axis.line.style.setProperty(
    "--progress",
    String(Math.min(Math.max(share, 0), 1)),
  );
}

/** Starts the services the tip has passed, in rows. */
function startPassed(axis: Axis, instantUpTo: number): void {
  const passed = axis.waiting.filter((service) => service.at <= axis.tip);
  if (passed.length === 0) return;
  axis.waiting = axis.waiting.filter((service) => service.at > axis.tip);

  let row = -1;
  let rowAt = Number.NEGATIVE_INFINITY;
  let inRow = 0;
  for (const service of passed) {
    if (service.bottom <= instantUpTo) {
      service.item.classList.add("is-drawn", "is-instant");
      continue;
    }
    if (service.at - rowAt > ROW_TOLERANCE_PX) {
      row += 1;
      rowAt = service.at;
      inRow = 0;
    }
    const delay = row * NEXT_ROW_MS + inRow * NEXT_IN_ROW_MS;
    if (service.icon !== null) timeStrokes(service.icon, delay);
    service.item.classList.add("is-drawn");
    inRow += 1;
  }
}

function init(root: HTMLElement): void {
  const line = root.querySelector<HTMLElement>("[data-axis-line]");
  if (line === null) return;
  // Past its failsafe the CSS already shows the axis complete: leave it so.
  const stroke = root.querySelector("[data-stroke]");
  if (stroke !== null && getComputedStyle(stroke).visibility === "visible") {
    return;
  }
  root.classList.add("is-live");
  const axis: Axis = {
    root,
    line,
    top: 0,
    length: 0,
    aim: 0,
    tip: 0,
    waiting: [...root.querySelectorAll<HTMLElement>("[data-axis-item]")].map(
      (item) => ({
        item,
        icon: item.querySelector<SVGSVGElement>("[data-icon]"),
        at: 0,
        bottom: 0,
      }),
    ),
  };
  layout(axis);

  let frame = 0;
  let last = 0;

  const step = (now: number): void => {
    const elapsed = last === 0 ? 16 : now - last;
    last = now;
    const start = lineStart(axis);
    axis.aim = Math.max(axis.aim, window.innerHeight * AIM - start);

    // Services scrolled past entirely (a jump): complete at once.
    const above = -start;
    const skipped = axis.waiting.filter((service) => service.bottom <= above);
    const furthest = skipped.at(-1);
    if (furthest !== undefined) axis.tip = Math.max(axis.tip, furthest.at);

    const gap = axis.aim - axis.tip;
    axis.tip += gap * (1 - Math.exp(-elapsed / TAU_MS));
    if (axis.aim - axis.tip < SETTLED_PX) axis.tip = axis.aim;

    render(axis);
    startPassed(axis, above);

    if (axis.tip < axis.aim) {
      frame = requestAnimationFrame(step);
      return;
    }
    frame = 0;
    last = 0;
    line.style.removeProperty("will-change");
    if (axis.waiting.length === 0 && axis.tip >= axis.length) stop();
  };

  const wake = (): void => {
    if (frame !== 0) return;
    line.style.willChange = "transform";
    frame = requestAnimationFrame(step);
  };

  const near = new IntersectionObserver((entries) => {
    const isNear = entries.some((entry) => entry.isIntersecting);
    if (isNear) {
      window.addEventListener("scroll", wake, { passive: true });
      wake();
    } else {
      window.removeEventListener("scroll", wake);
    }
  }, NEAR);

  // A new layout (a resize, the font arriving) moves the bubbles and rows.
  const resize = new ResizeObserver(() => {
    layout(axis);
    wake();
  });

  function stop(): void {
    near.disconnect();
    resize.disconnect();
    window.removeEventListener("scroll", wake);
  }

  // A printed page shows the axis complete.
  window.addEventListener(
    "beforeprint",
    () => {
      axis.aim = axis.length;
      axis.tip = axis.length;
      render(axis);
      for (const service of axis.waiting) {
        service.item.classList.add("is-drawn", "is-instant");
      }
      axis.waiting = [];
      stop();
    },
    { once: true },
  );

  near.observe(root);
  resize.observe(root);
}

function start(): void {
  for (const root of document.querySelectorAll<HTMLElement>("[data-axis]")) {
    init(root);
  }
}

const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
if (reducedMotion.matches) {
  // Motion turned on after the page has loaded: the axis takes over then.
  reducedMotion.addEventListener("change", start, { once: true });
} else {
  start();
}
