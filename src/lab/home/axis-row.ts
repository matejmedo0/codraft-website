/**
 * "Što radimo", layout "columns" (ServicesAxis.astro; review #79,
 * /lab/sto-radimo-2): on wide screens the three stages stand side by side
 * and the process line runs across, through their bubbles.
 *
 * - When the line reaches AIM of the screen's height, it draws from the
 *   first bubble to the last at a constant speed, like a plotter's pen.
 * - A service's icon draws once the pen has reached its stage's bubble and
 *   the service is above the same mark on the screen; icons that start
 *   together run NEXT_MS apart, top to bottom.
 * - A line or a service already above the screen is complete at once.
 *
 * axis-line.ts calls this instead of its own line when the layout is
 * "columns" and the screen is at least ROW_FROM wide; narrower screens keep
 * the line down the left. Without JavaScript, or with reduced motion, the
 * CSS shows the line and the icons complete.
 */
import { timeStrokes } from "./icons/icon-draw.ts";

/** From this width the stages stand side by side (ServicesAxis.astro). */
export const ROW_FROM = "(min-width: 80rem)";

/** The line and the services start at this share of the screen's height. */
const AIM = 0.85;
/** How long the pen takes from the first bubble to the last. */
const LINE_MS = 1200;
/** Icons that start together run this far apart. */
const NEXT_MS = 60;

const AT_AIM: IntersectionObserverInit = {
  rootMargin: `0px 0px -${String(Math.round((1 - AIM) * 100))}% 0px`,
};

interface Stage {
  /** When the pen reaches the stage's bubble, from the line's start. */
  at: number;
  reached: boolean;
  /** Its services on screen, waiting for the pen. */
  ready: HTMLElement[];
}

function isAbove(element: Element): boolean {
  return element.getBoundingClientRect().bottom <= 0;
}

export function initRow(root: HTMLElement): void {
  const line = root.querySelector<HTMLElement>("[data-axis-row-line]");
  if (line === null) return;

  const lineBox = line.getBoundingClientRect();
  const stageOf = new Map<HTMLElement, Stage>();
  const stages = [
    ...root.querySelectorAll<HTMLElement>("[data-axis-stage]"),
  ].map((element) => {
    const mark = element.querySelector("[data-axis-mark]");
    const box = mark?.getBoundingClientRect();
    const middle = box === undefined ? lineBox.left : box.left + box.width / 2;
    const share =
      lineBox.width === 0 ? 0 : (middle - lineBox.left) / lineBox.width;
    const stage: Stage = {
      at: Math.min(Math.max(share, 0), 1) * LINE_MS,
      reached: false,
      ready: [],
    };
    for (const item of element.querySelectorAll<HTMLElement>(
      "[data-axis-item]",
    )) {
      stageOf.set(item, stage);
    }
    return stage;
  });

  let nextAt = 0;

  /** Starts a service's icon, NEXT_MS after the one before at the latest. */
  const draw = (item: HTMLElement): void => {
    const now = performance.now();
    const delay = Math.max(nextAt - now, 0);
    nextAt = now + delay + NEXT_MS;
    const icon = item.querySelector<SVGSVGElement>("[data-icon]");
    if (icon !== null) timeStrokes(icon, delay);
    item.classList.add("is-drawn");
  };

  const reach = (stage: Stage): void => {
    stage.reached = true;
    for (const item of stage.ready) draw(item);
    stage.ready = [];
  };

  const onScreen = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const item = entry.target;
      if (!entry.isIntersecting || !(item instanceof HTMLElement)) continue;
      onScreen.unobserve(item);
      const stage = stageOf.get(item);
      if (stage === undefined || stage.reached) draw(item);
      else stage.ready.push(item);
    }
  }, AT_AIM);

  for (const item of stageOf.keys()) {
    if (isAbove(item)) item.classList.add("is-drawn", "is-instant");
    else onScreen.observe(item);
  }

  if (isAbove(line)) {
    line.classList.add("is-drawing", "is-instant");
    for (const stage of stages) reach(stage);
    return;
  }

  const atAim = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    atAim.disconnect();
    line.style.setProperty("--row-for", `${String(LINE_MS)}ms`);
    line.classList.add("is-drawing");
    for (const stage of stages) {
      window.setTimeout(() => {
        reach(stage);
      }, stage.at);
    }
  }, AT_AIM);
  atAim.observe(line);
}
