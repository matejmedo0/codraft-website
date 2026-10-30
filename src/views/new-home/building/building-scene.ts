/**
 * Starts the new Home's drafting scene once, when its drawing comes into
 * view (M28: no animation tied to the scroll). Every element with
 * `data-at` (and `data-for`) gets them as --at and --for, the site plan
 * gets its two views, and the scene goes from `is-pending` (everything
 * hidden, the plan flat) to `is-drawing`, whose CSS plays it all on those
 * times (scene.css).
 *
 * A scene already scrolled past on load (a reload mid-page) is left
 * finished, and so is every scene with reduced motion; without this script
 * the scene is never pending. Before printing, every scene finishes.
 */
import { prefersReducedMotion } from "../../../styles/motion.ts";
import { AXO_VIEW, PLAN_VIEW, viewTransform } from "./building-model.ts";

/** How much of the drawing must be on screen before it starts. */
const THRESHOLD = 0.35;

function ms(value: string | undefined): string {
  return `${value ?? "0"}ms`;
}

function initScene(scene: HTMLElement): void {
  const figure = scene.querySelector("[data-building-figure]");
  if (figure === null || figure.getBoundingClientRect().bottom < 0) return;

  for (const element of scene.querySelectorAll<HTMLElement | SVGElement>(
    "[data-at]",
  )) {
    element.style.setProperty("--at", ms(element.dataset.at));
    element.style.setProperty("--for", ms(element.dataset.for));
  }
  const ground = scene.querySelector<SVGGElement>("[data-ground]");
  ground?.style.setProperty("--plan-from", viewTransform(PLAN_VIEW, "css"));
  ground?.style.setProperty("--plan-to", viewTransform(AXO_VIEW, "css"));

  scene.classList.add("is-pending");
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      scene.classList.add("is-drawing");
      scene.classList.remove("is-pending");
    },
    { threshold: THRESHOLD },
  );
  observer.observe(figure);
}

if (!prefersReducedMotion()) {
  const scenes = document.querySelectorAll<HTMLElement>(
    "[data-building-scene]",
  );
  for (const scene of scenes) initScene(scene);

  window.addEventListener("beforeprint", () => {
    for (const scene of scenes) {
      scene.classList.remove("is-pending");
      for (const animation of scene.getAnimations({ subtree: true })) {
        animation.finish();
      }
    }
  });
}
