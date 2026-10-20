/**
 * The process line through "Što radimo" draws as one stroke (the client's
 * review, batch 3): it is hidden until the section reaches its trigger
 * (draw.ts, `data-draw` with `data-draw-wait`), then runs from bubble 01 to
 * bubble 03 at a constant speed, like a plotter's pen.
 *
 * Each chapter holds one stretch of the line (`data-rail`). This script
 * times the stretches by their length, as --rail-at and --rail-for, so they
 * join into one movement. Without it the CSS falls back to fixed timings;
 * without JavaScript, or with reduced motion, the line is complete.
 *
 * Options 1 and 2 of "Što radimo" keep this as their record; the chosen
 * option 3 follows the scroll instead (axis-line.ts; review batch 14).
 */

/** The longest the whole line may take, so a phone's long line keeps pace. */
const MAX_DURATION_MS = 2400;
/** The slowest the pen may move, in pixels per millisecond. */
const MIN_SPEED = 0.5;

function timeRails(line: HTMLElement): void {
  const rails = [...line.querySelectorAll<HTMLElement>("[data-rail]")];
  const lengths = rails.map((rail) => rail.offsetHeight);
  const total = lengths.reduce((sum, length) => sum + length, 0);
  if (total === 0) return;

  const speed = Math.max(total / MAX_DURATION_MS, MIN_SPEED);
  let at = 0;
  for (const [index, rail] of rails.entries()) {
    const duration = (lengths[index] ?? 0) / speed;
    rail.style.setProperty("--rail-at", `${String(Math.round(at))}ms`);
    rail.style.setProperty("--rail-for", `${String(Math.round(duration))}ms`);
    at += duration;
  }
}

function timeAll(): void {
  for (const line of document.querySelectorAll<HTMLElement>(
    "[data-process-line]",
  )) {
    timeRails(line);
  }
}

timeAll();
void document.fonts.ready.then(timeAll);
window.addEventListener("resize", timeAll, { passive: true });
