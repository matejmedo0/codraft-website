/**
 * "Što radimo", option 13 "Krug" (ServicesCycle.astro; review #101).
 *
 * - The icons draw as in the other options: a service starts when it
 *   reaches 85 % of the screen's height (and every earlier one with it;
 *   those above the screen are complete at once).
 * - On wide screens the circle stays beside the text, and its arc follows
 *   the reading at the circle's own height, the middle of the screen. Each
 *   stage's head and each service is a knot: its height on the page and its
 *   place on the circle (`data-cycle-item`, a share of the turn). The arc
 *   aims at the place of whatever is at the middle of the screen, between
 *   knots in proportion, and eases towards it frame by frame, so a fast
 *   scroll is caught up in about --motion-follow (as the process line in
 *   axis-line.ts). It only ever grows. When it passes a service's grip, the
 *   grip snaps in; past the last service it closes on 01 and its arrow
 *   snaps in.
 * - Arriving mid-section (a reload, a link), the arc starts where the
 *   reading is, its grips complete, as the process line jumps past the
 *   services above the screen.
 * - Crossing 64rem (a turned tablet) shows everything complete.
 *
 * Only the arc, the grips and the icons wait; the text never does. Without
 * JavaScript, or with reduced motion, the CSS shows them complete and this
 * script does nothing.
 */
import { DURATION_MS, prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** The arc follows what is at this share of the screen's height. */
const AIM = 0.5;
/** The easing's time constant: about 95 % of a gap closes in --motion-follow. */
const TAU_MS = DURATION_MS.follow / 3;
/** Closer than this share of the turn, the arc is where it aims. */
const SETTLED = 0.0005;
/** Services that start together start this far apart. */
const NEXT_MS = 60;
/** Wide screens: the circle beside the text. */
const WIDE = "(min-width: 64rem)";
/** A service starts when its top reaches 85 % of the screen's height. */
const TRIGGER: IntersectionObserverInit = { rootMargin: "0px 0px -15% 0px" };
/** The section counts as near the screen this far ahead. */
const NEAR: IntersectionObserverInit = { rootMargin: "50% 0px" };

interface Knot {
  /** Its height on the page and its share of the turn. */
  y: number;
  turn: number;
}

interface Tick {
  element: Element;
  turn: number;
}

function pageY(element: Element, share = 0.5): number {
  const box = element.getBoundingClientRect();
  return box.top + box.height * share + window.scrollY;
}

/** The share of the turn at height `y`, between the knots in proportion. */
function turnAt(knots: Knot[], y: number): number {
  let previous: Knot | undefined;
  for (const knot of knots) {
    if (y < knot.y) {
      if (previous === undefined) return 0;
      const share = (y - previous.y) / (knot.y - previous.y);
      return previous.turn + (knot.turn - previous.turn) * share;
    }
    previous = knot;
  }
  return previous?.turn ?? 0;
}

/** The icons: each service draws when it reaches 85 % of the screen. */
function initIcons(root: HTMLElement): void {
  let waiting = [...root.querySelectorAll<HTMLElement>("[data-cycle-item]")];

  const start = (upTo: HTMLElement): void => {
    const index = waiting.indexOf(upTo);
    if (index === -1) return;
    const starting = waiting.slice(0, index + 1);
    waiting = waiting.slice(index + 1);
    let order = 0;
    for (const item of starting) {
      observer.unobserve(item);
      if (item.getBoundingClientRect().bottom <= 0) {
        item.classList.add("is-drawn", "is-instant");
        continue;
      }
      const icon = item.querySelector<SVGSVGElement>("[data-icon]");
      if (icon !== null) timeStrokes(icon, order * NEXT_MS);
      item.classList.add("is-drawn");
      order += 1;
    }
  };

  const observer = new IntersectionObserver((entries) => {
    const reached = entries
      .filter(
        (entry) => entry.isIntersecting || entry.boundingClientRect.bottom <= 0,
      )
      .map((entry) => entry.target as HTMLElement);
    const furthest = reached.reduce<HTMLElement | undefined>(
      (last, item) =>
        last === undefined || waiting.indexOf(item) > waiting.indexOf(last)
          ? item
          : last,
      undefined,
    );
    if (furthest !== undefined) start(furthest);
  }, TRIGGER);

  for (const item of waiting) observer.observe(item);
}

/** The circle complete at once: a narrow screen turned wide. */
function showComplete(root: HTMLElement): void {
  root
    .querySelector<SVGElement>("[data-cycle-arc]")
    ?.style.setProperty("stroke-dashoffset", "0");
  for (const part of root.querySelectorAll(
    "[data-cycle-tick], [data-cycle-arrow]",
  )) {
    part.classList.add("is-reached", "is-instant");
  }
}

/** The circle's arc, on wide screens. */
function initArc(root: HTMLElement, wide: MediaQueryList): void {
  const arc = root.querySelector<SVGElement>("[data-cycle-arc]");
  const arrow = root.querySelector<SVGElement>("[data-cycle-arrow]");
  if (arc === null || arrow === null) return;

  let ticks: Tick[] = [...root.querySelectorAll("[data-cycle-tick]")].map(
    (element) => ({
      element,
      turn: Number(element.getAttribute("data-cycle-tick")),
    }),
  );
  let knots: Knot[] = [];
  let aim = 0;
  let turn = 0;
  let frame = 0;
  let last = 0;
  let closed = false;

  const measure = (): void => {
    const heads = [...root.querySelectorAll("[data-cycle-head]")];
    const items = [...root.querySelectorAll<HTMLElement>("[data-cycle-item]")];
    const lastItem = items.at(-1);
    knots = [
      ...heads.map((head, index) => ({
        y: pageY(head),
        turn: index / heads.length,
      })),
      ...items.map((item) => ({
        y: pageY(item.querySelector("[data-icon]") ?? item),
        turn: Number(item.dataset.cycleItem),
      })),
      { y: lastItem === undefined ? 0 : pageY(lastItem, 1), turn: 1 },
    ].sort((a, b) => a.y - b.y);
  };

  const target = (): number =>
    turnAt(knots, window.scrollY + window.innerHeight * AIM);

  const render = (instant: boolean): void => {
    arc.style.strokeDashoffset = String(1 - turn);
    const passed = ticks.filter((tick) => tick.turn <= turn);
    ticks = ticks.filter((tick) => tick.turn > turn);
    for (const tick of passed) {
      tick.element.classList.add("is-reached");
      if (instant) tick.element.classList.add("is-instant");
    }
    if (!closed && turn >= 1) {
      closed = true;
      arrow.classList.add("is-reached");
      if (instant) arrow.classList.add("is-instant");
    }
  };

  const step = (now: number): void => {
    const elapsed = last === 0 ? 16 : now - last;
    last = now;
    aim = Math.max(aim, target());
    turn += (aim - turn) * (1 - Math.exp(-elapsed / TAU_MS));
    if (aim - turn < SETTLED) turn = aim;
    render(false);
    if (turn < aim) {
      frame = requestAnimationFrame(step);
      return;
    }
    frame = 0;
    last = 0;
    if (closed) stop();
  };

  const wake = (): void => {
    if (frame !== 0) return;
    frame = requestAnimationFrame(step);
  };

  const near = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      window.addEventListener("scroll", wake, { passive: true });
      wake();
    } else {
      window.removeEventListener("scroll", wake);
    }
  }, NEAR);

  // A new layout (a resize, the font arriving) moves the knots.
  const resize = new ResizeObserver(() => {
    measure();
    wake();
  });

  // Crossing 64rem shows everything complete.
  const complete = (): void => {
    stop();
    aim = 1;
    turn = 1;
    render(true);
  };

  function stop(): void {
    if (frame !== 0) cancelAnimationFrame(frame);
    frame = 0;
    near.disconnect();
    resize.disconnect();
    window.removeEventListener("scroll", wake);
    wide.removeEventListener("change", complete);
  }

  measure();
  // Arriving mid-section, the arc starts where the reading is.
  aim = target();
  turn = aim;
  render(true);
  if (turn >= 1) {
    stop();
    return;
  }
  near.observe(root);
  resize.observe(root);
  wide.addEventListener("change", complete);
}

if (!prefersReducedMotion()) {
  const wide = window.matchMedia(WIDE);
  for (const root of document.querySelectorAll<HTMLElement>("[data-cycle]")) {
    initIcons(root);
    if (wide.matches) {
      initArc(root, wide);
    } else {
      wide.addEventListener(
        "change",
        () => {
          showComplete(root);
        },
        { once: true },
      );
    }
  }
}
