/**
 * Times the hero's code-to-page animation (CodeToSite.astro) on load: each
 * line types at its own length after the one before it, each part of the
 * page appears as its line ends (`data-after-line`, the line's index), and
 * the finished page is selected at `--done`. The times go into custom
 * properties (CSSOM, so the CSP allows them), then `is-live` starts the
 * CSS. With reduced motion nothing is timed and everything is there.
 */
import { prefersReducedMotion } from "../../../styles/motion.ts";

/** The hero's text comes in first (NewHomeHero.astro). */
const START_MS = 900;
const CHAR_MS = 14;
const MIN_LINE_MS = 120;
const MAX_LINE_MS = 420;
const GAP_MS = 60;

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

function initStage(stage: HTMLElement): void {
  const ends: number[] = [];
  let at = START_MS;
  for (const line of stage.querySelectorAll<HTMLElement>("[data-code-line]")) {
    const length = line.textContent.length;
    const duration = Math.min(
      MAX_LINE_MS,
      Math.max(MIN_LINE_MS, length * CHAR_MS),
    );
    line.style.setProperty("--n", String(Math.max(length, 1)));
    line.style.setProperty("--at", ms(at));
    line.style.setProperty("--for", ms(duration));
    at += duration + GAP_MS;
    ends.push(at - GAP_MS);
  }
  for (const part of stage.querySelectorAll<HTMLElement>("[data-after-line]")) {
    const end = ends[Number(part.dataset.afterLine)] ?? at;
    part.style.setProperty("--at", ms(end));
  }
  stage.style.setProperty("--done", ms(at + 200));
  stage.classList.add("is-live");
}

if (!prefersReducedMotion()) {
  for (const stage of document.querySelectorAll<HTMLElement>(
    "[data-code-stage]",
  )) {
    initStage(stage);
  }
}
