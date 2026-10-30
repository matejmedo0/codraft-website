/**
 * The house plan on the new Home drawn by the scroll (NewHomeDrafting.astro).
 * The plan keeps the timelapse of the current Home (PlanDrawing.astro,
 * plan-timelapse.ts: the layers in order, the tilt into the 3D view, the
 * walls rising, the roof coming down), but instead of playing it once when
 * it scrolls into view, this module pauses every animation of it and seeks
 * them all to the scene's scroll progress: scrolling down drafts the house,
 * scrolling up undrafts it, and nothing moves on its own.
 *
 * The scene (`data-scene`) is a tall track, and the figure (`data-scene-
 * figure`) sticks inside it; the progress is how far the track has scrolled
 * past the figure. The scene gets `is-live` once this runs, which is what
 * makes it tall: without JavaScript, or with reduced motion, the track is
 * as tall as the figure and the plan shows its final state (the component's
 * own fallback).
 *
 * draw.ts and plan-timelapse.ts are imported first, so the plan's times are
 * set and draw.ts has given up on the plan before this takes it over:
 * draw.ts only ever starts a part that is still pending.
 */
import "../../components/ui/draw.ts";
import "../home/plan/plan-timelapse.ts";

import { prefersReducedMotion } from "../../styles/motion.ts";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function initScene(scene: HTMLElement): void {
  const plan = scene.querySelector<HTMLElement>("[data-plan]");
  const figure = scene.querySelector<HTMLElement>("[data-scene-figure]");
  if (plan === null || figure === null) return;

  // Take the plan over from draw.ts: it draws now, and we hold the pen.
  plan.classList.remove("is-pending");
  plan.classList.add("is-drawing");
  const animations = plan.getAnimations({ subtree: true });
  let total = 0;
  for (const animation of animations) {
    animation.pause();
    const end = animation.effect?.getComputedTiming().endTime ?? 0;
    total = Math.max(total, Number(end));
  }
  if (total === 0) return;

  scene.classList.add("is-live");

  let frame = 0;
  let shown = -1;
  const update = (): void => {
    frame = 0;
    const box = scene.getBoundingClientRect();
    const travel = box.height - figure.offsetHeight;
    const progress = travel > 0 ? clamp01(-box.top / travel) : 1;
    if (progress === shown) return;
    shown = progress;
    const time = progress * total;
    for (const animation of animations) animation.currentTime = time;
  };
  const schedule = (): void => {
    if (frame === 0) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
}

if (!prefersReducedMotion()) {
  for (const scene of document.querySelectorAll<HTMLElement>("[data-scene]")) {
    initScene(scene);
  }
}
