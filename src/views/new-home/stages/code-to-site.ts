/**
 * Times stage 02's code-to-page animation (CodeToSite.astro) when it comes
 * into view: each line types at its own length after the one before it,
 * each part of the page appears as its line ends (`data-after-line`, the
 * line's index), and the finished page is selected at `--done`. The times
 * go into custom properties (CSSOM, so the CSP allows them), then `is-live`
 * starts the CSS. With reduced motion nothing is timed and everything is
 * there.
 */
import { prefersReducedMotion } from "../../../styles/motion.ts";

/** The stage slides in first (reveal.ts, NewHomeServices.astro). */
const START_MS = 700;
const CHAR_MS = 14;
const MIN_LINE_MS = 120;
const MAX_LINE_MS = 420;
const GAP_MS = 60;
/** The same trigger line as reveal.ts: 20 % above the screen's bottom. */
const ROOT_MARGIN = "0px 0px -20% 0px";

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
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        initStage(entry.target as HTMLElement);
      }
    },
    { rootMargin: ROOT_MARGIN },
  );
  for (const stage of document.querySelectorAll("[data-code-stage]")) {
    observer.observe(stage);
  }
}
