/**
 * Times Home's floor plan as a timelapse of drafting (the client's review,
 * batch 5). Each layer (`data-layer`) starts after the one before it, and
 * its steps (`data-wipe`) follow one another a little apart, so the plan is
 * drawn element by element. The times go into --at and --for on each step,
 * and --at on the layer's lamp; PlanDrawing's CSS plays them once draw.ts
 * starts the drawing. Without this script the CSS falls back to drawing
 * every step at once; without JavaScript, or with reduced motion, the plan
 * is complete.
 *
 * A plan with a model (`data-plan-model`, review #58) then rises into its
 * 3D view: this script times the switch-off, the tilt and the rise, and
 * gives the CSS the two views and how far each top rises.
 */
import { MODEL_VIEW, PLAN_VIEW, viewTransform } from "./plan-projection.ts";

interface LayerTiming {
  /** How long one step takes, in milliseconds. */
  duration: number;
  /** How long after the step before it a step starts. */
  stagger: number;
}

const TIMINGS: Partial<Record<string, LayerTiming>> = {
  osi: { duration: 450, stagger: 90 },
  zidovi: { duration: 280, stagger: 60 },
  otvori: { duration: 300, stagger: 55 },
  kote: { duration: 450, stagger: 120 },
  zaglavlje: { duration: 400, stagger: 0 },
};

const DEFAULT_TIMING: LayerTiming = { duration: 300, stagger: 80 };

/** The pause between two layers. */
const LAYER_GAP_MS = 120;

/** The 3D view: how long the finished plan holds before it rises. */
const HOLD_MS = 600;

/** How long the axes and dimensions take to switch off (--motion-base). */
const SWITCH_OFF_MS = 200;

/** The turn and tilt into the 3D view, like a picture opening. */
const TILT_MS = 1200;

/** The walls rising, like a section reveal. */
const RISE_MS = 900;

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

/** Times the plan's layers; returns when the last one is done. */
function timePlan(plan: HTMLElement): number {
  let at = 0;
  for (const layer of plan.querySelectorAll<SVGGElement>("[data-layer]")) {
    const id = layer.dataset.layer ?? "";
    const timing = TIMINGS[id] ?? DEFAULT_TIMING;
    plan
      .querySelector<HTMLElement>(`[data-lamp="${id}"]`)
      ?.style.setProperty("--at", ms(at));

    const steps = [...layer.querySelectorAll<SVGElement>("[data-wipe]")];
    for (const [index, step] of steps.entries()) {
      step.style.setProperty("--at", ms(at + index * timing.stagger));
      step.style.setProperty("--for", ms(timing.duration));
    }
    at +=
      Math.max(steps.length - 1, 0) * timing.stagger +
      timing.duration +
      LAYER_GAP_MS;
  }
  return at;
}

/** Times the rise into the 3D view, after the plan is done. */
function timeModel(plan: HTMLElement, planDone: number): void {
  const offAt = planDone + HOLD_MS;
  const tiltAt = offAt + SWITCH_OFF_MS;
  const riseAt = tiltAt + TILT_MS;
  plan.style.setProperty("--off-at", ms(offAt));
  plan.style.setProperty("--tilt-at", ms(tiltAt));
  plan.style.setProperty("--tilt-for", ms(TILT_MS));
  plan.style.setProperty("--rise-at", ms(riseAt));
  plan.style.setProperty("--rise-for", ms(RISE_MS));

  const ground = plan.querySelector<SVGGElement>("[data-plan-ground]");
  ground?.style.setProperty("--plan-from", viewTransform(PLAN_VIEW, "css"));
  ground?.style.setProperty("--plan-to", viewTransform(MODEL_VIEW, "css"));

  for (const top of plan.querySelectorAll<SVGElement>("[data-rise]")) {
    top.style.setProperty("--rise", `${top.dataset.rise ?? "0"}px`);
  }
}

for (const plan of document.querySelectorAll<HTMLElement>("[data-plan]")) {
  const planDone = timePlan(plan);
  if (plan.dataset.planModel !== undefined) timeModel(plan, planDone);
}
