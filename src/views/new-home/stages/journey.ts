/**
 * Plays stage 01's client journey (ProcessJourney.astro): from the enquiry
 * to the launch, a step every STEP_MS, once when half of it is on screen
 * and again from the start on every new pick of a service. Clicking a step
 * stops on it. The step is the journey's `data-step`, which the CSS reads;
 * the current step's button gets `aria-current`. With reduced motion
 * nothing plays and the last step stands, as it does without this script;
 * the steps can still be clicked.
 */
import { prefersReducedMotion } from "../../../styles/motion.ts";

const STEP_MS = 1600;

for (const journey of document.querySelectorAll<HTMLElement>(
  "[data-journey]",
)) {
  const buttons = [
    ...journey.querySelectorAll<HTMLButtonElement>("[data-goto]"),
  ];
  const last = buttons.length - 1;
  let timer = 0;

  const show = (step: number): void => {
    journey.dataset.step = String(step);
    buttons.forEach((button, index) => {
      if (index === step) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
  };

  const stop = (): void => {
    window.clearInterval(timer);
  };

  const play = (): void => {
    stop();
    if (prefersReducedMotion()) {
      show(last);
      return;
    }
    let step = 0;
    show(step);
    timer = window.setInterval(() => {
      step += 1;
      show(step);
      if (step >= last) stop();
    }, STEP_MS);
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      stop();
      show(index);
    });
  });
  journey.addEventListener("change", play);

  if (!prefersReducedMotion()) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        play();
      },
      { threshold: 0.5 },
    );
    observer.observe(journey);
  }
}
