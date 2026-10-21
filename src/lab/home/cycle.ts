/**
 * "Što radimo", option 13 "Krug" (ServicesCycle.astro; review #101): the
 * circle's arc follows the reading (docs/motion.md; as the process line in
 * axis-line.ts).
 *
 * - On wide screens the circle stays beside the text. Each stage's head
 *   and each service is a knot: its height on the page and its place on the
 *   circle (`data-cycle-item`, a share of the turn). The arc aims at the
 *   place of whatever is at 85 % of the screen's height, between knots in
 *   proportion, and eases towards it frame by frame, so a fast scroll is
 *   caught up in about --motion-follow. Past the last service it closes on
 *   01 and its arrow snaps in. It only ever grows.
 * - On narrow screens the circle sits above the stages: once it reaches
 *   85 % of the screen's height the arc runs round in DRAW_MS, and each
 *   service draws when it reaches that height itself.
 * - When the arc passes a service's grip, the grip snaps in and the
 *   service's icon draws (services.css). Services already above the screen
 *   are complete at once.
 *
 * Only the arc, the grips and the icons wait; the text never does. Without
 * JavaScript, or with reduced motion, the CSS shows them complete and this
 * script does nothing.
 */
import { DURATION_MS, prefersReducedMotion } from "../../styles/motion.ts";
import { timeStrokes } from "./icons/icon-draw.ts";

/** The arc aims at what is at this share of the screen's height. */
const AIM = 0.85;
/** The easing's time constant: about 95 % of a gap closes in --motion-follow. */
const TAU_MS = DURATION_MS.follow / 3;
/** Closer than this share of the turn, the arc is where it aims. */
const SETTLED = 0.0005;
/** On narrow screens the arc runs round once in this time. */
const DRAW_MS = 1400;
/** Services the arc passes in one frame start this far apart. */
const NEXT_MS = 60;
/** Wide screens: the circle beside the text. */
const WIDE = "(min-width: 64rem)";
/** The section counts as near the screen this far ahead. */
const NEAR: IntersectionObserverInit = { rootMargin: "50% 0px" };

interface Knot {
  /** Its height on the page and its share of the turn. */
  y: number;
  turn: number;
}

interface Part {
  element: Element;
  turn: number;
}

function pageY(element: Element, share = 0.5): number {
  const box = element.getBoundingClientRect();
  return box.top + box.height * share + window.scrollY;
}

/** The share of the turn at height `y`, between the knots in proportion. */
function turnAt(knots: Knot[], y: number): number {
  let previous: Knot = { y: Number.NEGATIVE_INFINITY, turn: 0 };
  for (const knot of knots) {
    if (y < knot.y) {
      if (previous.y === Number.NEGATIVE_INFINITY) return 0;
      const share = (y - previous.y) / (knot.y - previous.y);
      return previous.turn + (knot.turn - previous.turn) * share;
    }
    previous = knot;
  }
  return previous.turn;
}

function init(root: HTMLElement): void {
  const arc = root.querySelector<SVGElement>("[data-cycle-arc]");
  const arrow = root.querySelector<SVGElement>("[data-cycle-arrow]");
  const figure = root.querySelector<HTMLElement>(".cycle__figure");
  if (arc === null || arrow === null || figure === null) return;
  const wide = window.matchMedia(WIDE).matches;

  let ticks: Part[] = [...root.querySelectorAll("[data-cycle-tick]")].map(
    (element) => ({
      element,
      turn: Number(element.getAttribute("data-cycle-tick")),
    }),
  );
  let items: Part[] = [
    ...root.querySelectorAll<HTMLElement>("[data-cycle-item]"),
  ].map((element) => ({
    element,
    turn: Number(element.dataset.cycleItem),
  }));
  let knots: Knot[] = [];
  let aim = 0;
  let turn = 0;
  let frame = 0;
  let last = 0;
  let closed = false;

  const measure = (): void => {
    const heads = [...root.querySelectorAll(".cycle-stage__bubble")];
    const all = [
      ...heads.map((head, index) => ({
        y: pageY(head),
        turn: index / heads.length,
      })),
      ...[...root.querySelectorAll<HTMLElement>("[data-cycle-item]")].map(
        (item) => ({
          y: pageY(item.querySelector("[data-icon]") ?? item),
          turn: Number(item.dataset.cycleItem),
        }),
      ),
    ].sort((a, b) => a.y - b.y);
    const lastItem = [...root.querySelectorAll("[data-cycle-item]")].at(-1);
    const end = lastItem === undefined ? 0 : pageY(lastItem, 1);
    knots = [...all, { y: end, turn: 1 }];
  };

  const startItem = (item: Part, delay: number): void => {
    const element = item.element as HTMLElement;
    if (element.getBoundingClientRect().bottom <= 0) {
      element.classList.add("is-drawn", "is-instant");
      return;
    }
    const icon = element.querySelector<SVGSVGElement>("[data-icon]");
    if (icon !== null) timeStrokes(icon, delay);
    element.classList.add("is-drawn");
  };

  const render = (): void => {
    arc.style.strokeDashoffset = String(1 - turn);
    const passed = ticks.filter((tick) => tick.turn <= turn);
    ticks = ticks.filter((tick) => tick.turn > turn);
    for (const tick of passed) tick.element.classList.add("is-reached");
    if (wide) {
      const reached = items.filter((item) => item.turn <= turn);
      items = items.filter((item) => item.turn > turn);
      for (const [index, item] of reached.entries()) {
        startItem(item, index * NEXT_MS);
      }
    }
    if (!closed && turn >= 1) {
      closed = true;
      arrow.classList.add("is-reached");
    }
  };

  const step = (now: number): void => {
    const elapsed = last === 0 ? 16 : now - last;
    last = now;
    if (wide) {
      aim = Math.max(
        aim,
        turnAt(knots, window.scrollY + window.innerHeight * AIM),
      );
      turn += (aim - turn) * (1 - Math.exp(-elapsed / TAU_MS));
      if (aim - turn < SETTLED) turn = aim;
    } else {
      turn = Math.min(aim, turn + elapsed / DRAW_MS);
    }
    render();
    if (turn < aim) {
      frame = requestAnimationFrame(step);
      return;
    }
    frame = 0;
    last = 0;
    if (closed && items.length === 0) stop();
  };

  const wake = (): void => {
    if (frame !== 0) return;
    frame = requestAnimationFrame(step);
  };

  const near = new IntersectionObserver((entries) => {
    if (!wide) return;
    if (entries.some((entry) => entry.isIntersecting)) {
      window.addEventListener("scroll", wake, { passive: true });
      wake();
    } else {
      window.removeEventListener("scroll", wake);
    }
  }, NEAR);

  // Narrow screens: the circle draws once it reaches 85 % of the screen,
  // and each service when it does.
  const trigger = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) {
          continue;
        }
        trigger.unobserve(entry.target);
        if (entry.target === figure) {
          aim = 1;
          wake();
          continue;
        }
        const item = items.find((part) => part.element === entry.target);
        if (item === undefined) continue;
        items = items.filter((part) => part !== item);
        startItem(item, 0);
      }
      if (closed && items.length === 0) stop();
    },
    { rootMargin: `0px 0px -${String(Math.round((1 - AIM) * 100))}% 0px` },
  );

  const resize = new ResizeObserver(() => {
    measure();
    wake();
  });

  function stop(): void {
    near.disconnect();
    trigger.disconnect();
    resize.disconnect();
    window.removeEventListener("scroll", wake);
  }

  measure();
  if (wide) {
    near.observe(root);
    resize.observe(root);
  } else {
    trigger.observe(figure);
    for (const item of items) trigger.observe(item.element);
  }
}

if (!prefersReducedMotion()) {
  for (const root of document.querySelectorAll<HTMLElement>("[data-cycle]")) {
    init(root);
  }
}
