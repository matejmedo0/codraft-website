/**
 * "Što radimo", option 3 "Središnja os" (ServicesAxis.astro): the process
 * line and the service icons follow the scroll, row by row, once and only
 * forwards (the client's review, batch 14; docs/motion.md; ADR 0022).
 *
 * - An IntersectionObserver watches every service (`data-axis-item`). When
 *   services cross 85 % of the screen they start and are never watched
 *   again. Those that start together form rows by their tops: one row of
 *   two on wide screens, one service per row on phones.
 * - The line (`data-axis-line`) runs from the first bubble to the last
 *   (`data-axis-mark`); this script sets its top and length. Each batch
 *   moves it to its furthest row's icon, or to its end, through
 *   --progress (CSS: scaleY, --motion-follow, --ease-follow). It only
 *   grows, and has `will-change` only while it moves.
 * - Each icon starts ICON_DELAY_MS after its row, while the line still
 *   moves (icons/icon-draw.ts times its strokes; services.css plays them).
 * - Services already above the screen at load are complete at once, and
 *   the line jumps to the furthest of them.
 *
 * Only the line and the icons wait; the text never does. Without
 * JavaScript, or with reduced motion, the CSS shows them complete and this
 * script does nothing.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** A row starts when its top crosses 85 % of the screen's height. */
const ROW_TRIGGER: IntersectionObserverInit = {
  rootMargin: "0px 0px -15% 0px",
};
/** An icon starts this long after its row, while the line still moves. */
const ICON_DELAY_MS = 120;
/** The right icon of a row starts this long after the left. */
const NEXT_IN_ROW_MS = 40;
/** In a batch of several rows, each further row starts this much later. */
const NEXT_ROW_MS = 60;
/** Services whose tops are this close share a row. */
const ROW_TOLERANCE_PX = 4;

interface Axis {
  root: HTMLElement;
  line: HTMLElement;
  /** The line's top and length in the root, in pixels. */
  top: number;
  length: number;
  /** How far the line is drawn, from 0 to 1. */
  progress: number;
  /** The furthest service the line has reached. */
  reached: HTMLElement | undefined;
}

function middle(element: Element): number {
  const box = element.getBoundingClientRect();
  return box.top + box.height / 2;
}

/** Places the line between the first and the last bubble. */
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
}

/** How far down the line a service sits, from 0 to 1. */
function positionOf(axis: Axis, item: HTMLElement): number {
  if (axis.length === 0) return 1;
  const target = item.querySelector("[data-icon]") ?? item;
  const along =
    middle(target) - axis.root.getBoundingClientRect().top - axis.top;
  return Math.min(Math.max(along / axis.length, 0), 1);
}

/** Draws the line to `item`; it never runs back. */
function reach(axis: Axis, item: HTMLElement, instant: boolean): void {
  const progress = positionOf(axis, item);
  if (progress <= axis.progress && !instant) return;
  axis.progress = Math.max(progress, axis.progress);
  axis.reached = item;
  const { line } = axis;
  if (instant) {
    line.classList.add("is-instant");
    line.style.setProperty("--progress", String(axis.progress));
    line.getBoundingClientRect();
    line.classList.remove("is-instant");
    return;
  }
  line.style.willChange = "transform";
  line.style.setProperty("--progress", String(axis.progress));
}

/** Starts a batch of services: rows by their tops, then left to right. */
function start(axis: Axis, items: HTMLElement[]): void {
  const placed = items
    .map((item) => ({ item, box: item.getBoundingClientRect() }))
    .sort((a, b) => a.box.top - b.box.top || a.box.left - b.box.left);

  let row = -1;
  let rowTop = Number.NEGATIVE_INFINITY;
  let inRow = 0;
  for (const { item, box } of placed) {
    if (box.top - rowTop > ROW_TOLERANCE_PX) {
      row += 1;
      rowTop = box.top;
      inRow = 0;
    }
    const icon = item.querySelector<SVGSVGElement>("[data-icon]");
    if (icon !== null) {
      timeStrokes(
        icon,
        row * NEXT_ROW_MS + ICON_DELAY_MS + inRow * NEXT_IN_ROW_MS,
      );
    }
    item.classList.add("is-drawn");
    inRow += 1;
  }

  const furthest = placed.at(-1)?.item;
  if (furthest !== undefined) reach(axis, furthest, false);
}

function init(root: HTMLElement): void {
  const line = root.querySelector<HTMLElement>("[data-axis-line]");
  if (line === null) return;
  const axis: Axis = {
    root,
    line,
    top: 0,
    length: 0,
    progress: 0,
    reached: undefined,
  };
  layout(axis);

  line.addEventListener("transitionend", () => {
    line.style.removeProperty("will-change");
  });

  // Above the screen already: complete at once.
  const items = [...root.querySelectorAll<HTMLElement>("[data-axis-item]")];
  const above = items.filter(
    (item) => item.getBoundingClientRect().bottom <= 0,
  );
  for (const item of above) item.classList.add("is-drawn", "is-instant");
  const lastAbove = above.at(-1);
  if (lastAbove !== undefined) reach(axis, lastAbove, true);

  const observer = new IntersectionObserver((entries) => {
    const started = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => entry.target as HTMLElement);
    for (const item of started) observer.unobserve(item);
    if (started.length > 0) start(axis, started);
  }, ROW_TRIGGER);
  for (const item of items) {
    if (!item.classList.contains("is-drawn")) observer.observe(item);
  }

  // A new layout (a resize, the font arriving) moves the bubbles and rows.
  new ResizeObserver(() => {
    layout(axis);
    if (axis.reached !== undefined) {
      axis.progress = 0;
      reach(axis, axis.reached, true);
    }
  }).observe(root);
}

if (!prefersReducedMotion()) {
  for (const root of document.querySelectorAll<HTMLElement>("[data-axis]")) {
    init(root);
  }
}
