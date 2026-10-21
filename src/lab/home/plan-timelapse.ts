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
 * gives the CSS the two views and how far each top rises. Then, by option
 * (review #63), a roof comes down onto the walls, or after a hold the walls
 * go down and the plan turns back.
 *
 * Where the 3D view is the final state, reduced motion has no replay, so a
 * button (`data-plan-view`) switches between the 3D view and the plan at
 * once (critique 12, review #117): it sets `is-flat` on the plan and says
 * what it shows next.
 */
import {
  modelView,
  PLAN_VIEW,
  type PlanModel,
  viewTransform,
} from "./plan-projection.ts";

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

/** Option "roof": the roof coming down onto the walls. */
const ROOF_MS = 700;

/** Option "return": how long the 3D view holds, then the way back. */
const MODEL_HOLD_MS = 2400;
const LOWER_MS = 700;
const UNTILT_MS = 1000;

const MODELS: readonly string[] = ["stay", "return", "roof"];

function isPlanModel(value: string | undefined): value is PlanModel {
  return value !== undefined && MODELS.includes(value);
}

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

/** Times a layer's steps from its start; returns how long they take. */
function timeSteps(layer: HTMLElement | SVGElement, start: number): number {
  const timing = TIMINGS[layer.dataset.layer ?? ""] ?? DEFAULT_TIMING;
  const steps = [
    ...layer.querySelectorAll<HTMLElement | SVGElement>("[data-wipe]"),
  ];
  for (const [index, step] of steps.entries()) {
    step.style.setProperty("--at", ms(start + index * timing.stagger));
    step.style.setProperty("--for", ms(timing.duration));
  }
  return Math.max(steps.length - 1, 0) * timing.stagger + timing.duration;
}

/** Times the plan's layers; returns when the last one is done. */
function timePlan(plan: HTMLElement): number {
  let at = 0;
  // A layer with a second part (the title block set under the drawing on
  // phones) draws both at once.
  const starts = new Map<string, number>();
  for (const layer of plan.querySelectorAll<HTMLElement | SVGGElement>(
    "[data-layer]",
  )) {
    const id = layer.dataset.layer ?? "";
    const start = starts.get(id);
    if (start !== undefined) {
      timeSteps(layer, start);
      continue;
    }
    starts.set(id, at);
    plan
      .querySelector<HTMLElement>(`[data-lamp="${id}"]`)
      ?.style.setProperty("--at", ms(at));
    at += timeSteps(layer, at) + LAYER_GAP_MS;
  }
  return at;
}

/** Times the rise into the 3D view, after the plan is done, and its end. */
function timeModel(
  plan: HTMLElement,
  planDone: number,
  model: PlanModel,
): void {
  const offAt = planDone + HOLD_MS;
  const tiltAt = offAt + SWITCH_OFF_MS;
  const riseAt = tiltAt + TILT_MS;
  const risen = riseAt + RISE_MS;
  const lowerAt = risen + MODEL_HOLD_MS;
  const untiltAt = lowerAt + LOWER_MS;
  const times: Record<string, number> = {
    "--off-at": offAt,
    "--tilt-at": tiltAt,
    "--tilt-for": TILT_MS,
    "--rise-at": riseAt,
    "--rise-for": RISE_MS,
    "--roof-at": risen,
    "--roof-for": ROOF_MS,
    "--lower-at": lowerAt,
    "--lower-for": LOWER_MS,
    "--untilt-at": untiltAt,
    "--untilt-for": UNTILT_MS,
    "--on-at": untiltAt + UNTILT_MS,
  };
  for (const [name, value] of Object.entries(times)) {
    plan.style.setProperty(name, ms(value));
  }
  // The roof's lamp switches on as the roof lands.
  plan
    .querySelector<HTMLElement>('[data-lamp="krov"]')
    ?.style.setProperty("--at", ms(risen + ROOF_MS));

  const ground = plan.querySelector<SVGGElement>("[data-plan-ground]");
  ground?.style.setProperty("--plan-from", viewTransform(PLAN_VIEW, "css"));
  ground?.style.setProperty(
    "--plan-to",
    viewTransform(modelView(model), "css"),
  );

  for (const top of plan.querySelectorAll<SVGElement>("[data-rise]")) {
    top.style.setProperty("--rise", `${top.dataset.rise ?? "0"}px`);
  }
}

/** The switch between the 3D view and the plan, with reduced motion. */
function initViewSwitch(plan: HTMLElement): void {
  const button = plan.querySelector<HTMLButtonElement>("[data-plan-view]");
  const label = button?.querySelector<HTMLElement>("[data-plan-view-label]");
  if (button === null || label === null || label === undefined) return;
  const { planLabel = "", modelLabel = "" } = button.dataset;
  button.addEventListener("click", () => {
    const flat = plan.classList.toggle("is-flat");
    label.textContent = flat ? modelLabel : planLabel;
  });
}

for (const plan of document.querySelectorAll<HTMLElement>("[data-plan]")) {
  const planDone = timePlan(plan);
  const model = plan.dataset.planModel;
  if (isPlanModel(model)) timeModel(plan, planDone, model);
  initViewSwitch(plan);
}
