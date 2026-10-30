/**
 * Parts that draw once, when they first scroll into view (docs/motion.md):
 * a zone's selection, the line through steps, a dimension. A part opts in
 * with `data-draw`; its own CSS animates it while it has `.is-drawing`, and
 * hides it while it has `.is-pending`.
 *
 * Only parts below the fold wait, unless a part has `data-draw-wait`: it
 * waits for its trigger even when it starts in view, and its CSS hides it
 * from the first paint (under the `js` class and without reduced motion),
 * so it never flashes complete. Without JavaScript, or with reduced motion,
 * nothing is ever pending, so every part shows its final state.
 *
 * One part moves on the screen at a time (motion.md, principle 2; the
 * critique of 2026-10-21, finding 4). A part that reaches its trigger while
 * another part is moving on screen waits for it; meanwhile the moving part
 * plays at HURRY times its speed, and so does the waiting part when its
 * turn comes, so a fast scroll gives quicker drawings and a slow one the
 * full motion. A part that is off the screen by its turn shows its final
 * state at once, and so does a moving part that leaves the screen. An
 * element that moves with a part but sits beside it, such as a zone's
 * letter, has `data-draw-with`.
 *
 * Parts that reach their trigger in the same frame, as after a jump down
 * the page, take their turns in reading order (the critique's re-check,
 * R2). A part with `data-draw-steady` keeps its own pace: it never hurries,
 * so a part behind it waits for the whole of it (the floor plan, R3).
 *
 * A printed page shows every part complete: before printing, the parts
 * still waiting show their final state and the moving ones finish (the
 * /check of phase 3).
 *
 * Imported by the components' scripts; a module runs once per page however
 * many components import it.
 */
import { prefersReducedMotion } from "../../styles/motion.ts";

/** By default a part draws once its top is 15 % above the viewport's bottom. */
const DEFAULT_TRIGGER: IntersectionObserverInit = {
  rootMargin: "0px 0px -15% 0px",
};

/**
 * Other triggers, by the value of `data-draw`: "late" draws higher on
 * screen, and "half" waits until half of the part is in view, so a longer
 * sequence is seen from its start.
 */
const DRAW_TRIGGERS: Partial<Record<string, IntersectionObserverInit>> = {
  late: { rootMargin: "0px 0px -30% 0px" },
  half: { threshold: 0.5 },
};

/** How close to the end of the page counts as the bottom, in pixels. */
const BOTTOM_TOLERANCE = 2;

/** How much faster a part plays while another waits for it, or after waiting. */
const HURRY = 2;

/** The parts moving now, with their speed. */
const moving = new Map<Element, number>();

/** The parts waiting for their turn, in the order they reached their trigger. */
const waiting: Element[] = [];

/** The parts that reached their trigger in this frame. */
const requested = new Set<Element>();

function isBelowFold(element: Element): boolean {
  return element.getBoundingClientRect().top > window.innerHeight;
}

function isOnScreen(element: Element): boolean {
  const box = element.getBoundingClientRect();
  return box.bottom > 0 && box.top < window.innerHeight;
}

/** Calls `onEnter` once, when the element first reaches its trigger. */
function onFirstView(
  element: Element,
  onEnter: () => void,
  trigger: IntersectionObserverInit,
): void {
  const threshold =
    typeof trigger.threshold === "number" ? trigger.threshold : 0;
  const observer = new IntersectionObserver((entries) => {
    const reached = entries.some(
      (entry) => entry.isIntersecting && entry.intersectionRatio >= threshold,
    );
    if (!reached) return;
    observer.disconnect();
    onEnter();
  }, trigger);
  observer.observe(element);
}

/**
 * Starts a part's drawing. `.is-drawing` sets its animation; removing
 * `.is-pending` a frame later lets a transition start from the hidden state.
 * `onStarted` runs then, once every animation of the part exists.
 */
function startDrawing(element: Element, onStarted?: () => void): void {
  element.classList.add("is-drawing");
  requestAnimationFrame(() => {
    element.classList.remove("is-pending");
    onStarted?.();
  });
}

/** Every animation of a part: its own, its subtree's and its companions'. */
function animationsOf(part: Element): Animation[] {
  const companions = [...(part.parentElement?.children ?? [])].filter(
    (sibling) => sibling !== part && sibling.hasAttribute("data-draw-with"),
  );
  return [part, ...companions].flatMap((element) =>
    element.getAnimations({ subtree: true }),
  );
}

/** A selection's release fades it after its hold; that isn't movement. */
function isMovement(animation: Animation): boolean {
  return !(
    animation instanceof CSSAnimation &&
    animation.animationName === "motion-release"
  );
}

/** Jumps a part to its final state. */
function finish(part: Element): void {
  for (const animation of animationsOf(part)) animation.finish();
}

/** A moving part that leaves the screen finishes at once. */
const leaving = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting && moving.has(entry.target)) {
      finish(entry.target);
    }
  }
});

function blockers(): Element[] {
  return [...moving.keys()].filter(isOnScreen);
}

/** How fast a part plays when it hurries: a steady part never does. */
function hurried(part: Element): number {
  return part.hasAttribute("data-draw-steady") ? 1 : HURRY;
}

function hurry(part: Element): void {
  if (moving.get(part) === HURRY || hurried(part) !== HURRY) return;
  moving.set(part, HURRY);
  for (const animation of animationsOf(part)) {
    animation.updatePlaybackRate(HURRY);
  }
}

/** Starts the next waiting part that is on screen; the others finish. */
function next(): void {
  while (waiting.length > 0 && blockers().length === 0) {
    const part = waiting.shift();
    if (part === undefined) return;
    if (isOnScreen(part)) {
      run(part, hurried(part));
      return;
    }
    startDrawing(part, () => {
      finish(part);
    });
  }
}

/** Draws a part at `rate` times its speed and, when it is done, the next. */
function run(part: Element, rate: number): void {
  const queued = waiting.indexOf(part);
  if (queued !== -1) waiting.splice(queued, 1);
  moving.set(part, rate);
  startDrawing(part, () => {
    // Transitions start only now that `.is-pending` is gone.
    const animations = animationsOf(part);
    const speed = moving.get(part) ?? rate;
    if (speed !== 1) {
      for (const animation of animations) animation.updatePlaybackRate(speed);
    }
    leaving.observe(part);
    const motion = animations.filter(isMovement);
    void Promise.allSettled(motion.map(({ finished }) => finished)).then(() => {
      // A replay restarts the part with new animations; it ends that run.
      if (motion.some(({ playState }) => playState === "idle")) return;
      moving.delete(part);
      leaving.unobserve(part);
      next();
    });
  });
  // Its animations exist as soon as `.is-drawing` is set: a part that waited
  // is quick from its first frame.
  if (rate !== 1) {
    for (const animation of animationsOf(part)) {
      animation.updatePlaybackRate(rate);
    }
  }
}

/** A part takes its turn: it draws now, or waits for the moving one. */
function admit(part: Element): void {
  if (!part.classList.contains("is-pending") || moving.has(part)) return;
  const busy = blockers();
  if (busy.length === 0) {
    run(part, 1);
    return;
  }
  if (!waiting.includes(part)) waiting.push(part);
  for (const blocker of busy) hurry(blocker);
}

function inReadingOrder(a: Element, b: Element): number {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING
    ? -1
    : 1;
}

/** The parts of one frame take their turns from the top of the page down. */
function admitRequested(): void {
  const parts = [...requested].sort(inReadingOrder);
  requested.clear();
  for (const part of parts) admit(part);
}

/**
 * A part reached its trigger. It takes its turn in the next frame, with
 * every part that reached its trigger in this one.
 */
function request(part: Element): void {
  if (!part.classList.contains("is-pending") || moving.has(part)) return;
  if (requested.size === 0) requestAnimationFrame(admitRequested);
  requested.add(part);
}

function initDraws(): void {
  for (const part of document.querySelectorAll<HTMLElement>("[data-draw]")) {
    if (!isBelowFold(part) && part.dataset.drawWait === undefined) continue;
    part.classList.add("is-pending");
    const trigger = DRAW_TRIGGERS[part.dataset.draw ?? ""] ?? DEFAULT_TRIGGER;
    onFirstView(
      part,
      () => {
        request(part);
      },
      trigger,
    );
  }
}

/**
 * A part near the end of the page may never scroll up to its trigger. At
 * the bottom of the page, every part still waiting in view draws.
 */
function initBottomOfPage(): void {
  window.addEventListener(
    "scroll",
    () => {
      const { scrollHeight } = document.documentElement;
      const bottom = window.scrollY + window.innerHeight;
      if (bottom < scrollHeight - BOTTOM_TOLERANCE) return;
      for (const part of document.querySelectorAll(".is-pending")) {
        if (part.classList.contains("is-drawing")) continue;
        if (part.getBoundingClientRect().top < window.innerHeight) {
          request(part);
        }
      }
    },
    { passive: true },
  );
}

/**
 * A replay button (`data-draw-replay`) inside a part hides the part, then
 * draws it again at once, at full motion. Reading the layout in between
 * applies the hidden state, so the animations restart.
 */
function initReplays(): void {
  for (const button of document.querySelectorAll("[data-draw-replay]")) {
    const part = button.closest("[data-draw]");
    if (part === null) continue;
    button.addEventListener("click", () => {
      part.classList.remove("is-drawing");
      part.classList.add("is-pending");
      part.getBoundingClientRect();
      run(part, 1);
    });
  }
}

/**
 * The wordmark's entrance is CSS and plays on load. A mark below the fold
 * would play it unseen, so it waits and plays when it scrolls into view;
 * re-adding the class restarts the animation.
 */
function initWordmarkEntrances(): void {
  for (const mark of document.querySelectorAll(".wordmark--entrance")) {
    if (!isBelowFold(mark)) continue;
    mark.classList.remove("wordmark--entrance");
    onFirstView(
      mark,
      () => {
        mark.classList.add("wordmark--entrance");
      },
      DEFAULT_TRIGGER,
    );
  }
}

/** Before printing, every part shows its final state. */
function initPrint(): void {
  window.addEventListener("beforeprint", () => {
    waiting.length = 0;
    requested.clear();
    for (const part of document.querySelectorAll(".is-pending")) {
      if (!part.classList.contains("is-drawing")) {
        part.classList.remove("is-pending");
      }
    }
    for (const part of moving.keys()) finish(part);
  });
}

if (!prefersReducedMotion()) {
  initDraws();
  initBottomOfPage();
  initReplays();
  initWordmarkEntrances();
  initPrint();
}
