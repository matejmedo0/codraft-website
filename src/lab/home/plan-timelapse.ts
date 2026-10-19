/**
 * Times Home's floor plan as a timelapse of drafting (the client's review,
 * batch 5). Each layer (`data-layer`) starts after the one before it, and
 * its steps (`data-wipe`) follow one another a little apart, so the plan is
 * drawn element by element. The times go into --at and --for on each step,
 * and --at on the layer's lamp; PlanDrawing's CSS plays them once draw.ts
 * starts the drawing. Without this script the CSS falls back to drawing
 * every step at once; without JavaScript, or with reduced motion, the plan
 * is complete.
 */

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
  oznake: { duration: 300, stagger: 100 },
  zaglavlje: { duration: 400, stagger: 0 },
};

const DEFAULT_TIMING: LayerTiming = { duration: 300, stagger: 80 };

/** The pause between two layers. */
const LAYER_GAP_MS = 120;

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

function timePlan(plan: HTMLElement): void {
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
}

for (const plan of document.querySelectorAll<HTMLElement>("[data-plan]")) {
  timePlan(plan);
}
