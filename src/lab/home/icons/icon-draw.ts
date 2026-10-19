/**
 * Times the service icons of "Što radimo" to the pen of the process line
 * (the client's review, batch 13). An icon starts when the pen passes its
 * middle; below the line's end, once the pen arrives there. No two icons
 * start closer than ICON_GAP_MS, so a row reads left to right. Each icon
 * draws its ink strokes in their order, then its blue drafting line runs
 * out and the grip snaps in (docs/motion.md, "Draw a line" and "Select").
 *
 * The times go into --at and --for on each stroke (ServiceIcon.astro);
 * services.css plays them once draw.ts starts the line. process-line.ts
 * calls this with the pen's path and pace.
 */

/** The least time between two icons' starts. */
const ICON_GAP_MS = 90;
/** How long one ink stroke takes. */
const INK_MS = 360;
/** The ink strokes start within this window, at most INK_STAGGER_MS apart. */
const INK_WINDOW_MS = 420;
const INK_STAGGER_MS = 70;
/** The blue drafting line, which starts as the last ink stroke ends. */
const LINE_MS = 240;
const LINE_OVERLAP_MS = 120;

function ms(value: number): string {
  return `${String(Math.round(value))}ms`;
}

function timeStrokes(icon: SVGSVGElement, at: number): void {
  const ink = [...icon.querySelectorAll<SVGElement>('[data-stroke="ink"]')];
  const stagger =
    ink.length > 1
      ? Math.min(INK_STAGGER_MS, INK_WINDOW_MS / (ink.length - 1))
      : 0;
  for (const [index, stroke] of ink.entries()) {
    stroke.style.setProperty("--at", ms(at + index * stagger));
    stroke.style.setProperty("--for", ms(INK_MS));
  }

  const lineAt =
    at + Math.max(ink.length - 1, 0) * stagger + INK_MS - LINE_OVERLAP_MS;
  const line = icon.querySelector<SVGElement>('[data-stroke="line"]');
  line?.style.setProperty("--at", ms(lineAt));
  line?.style.setProperty("--for", ms(LINE_MS));
  icon
    .querySelector<SVGElement>('[data-stroke="grip"]')
    ?.style.setProperty("--at", ms(lineAt + LINE_MS));
}

/**
 * Times every icon on `line`. `top` and `bottom` are where the pen starts
 * and stops on the page; `speed` is its pace in pixels per millisecond.
 */
export function timeIcons(
  line: HTMLElement,
  top: number,
  bottom: number,
  speed: number,
): void {
  let previous = Number.NEGATIVE_INFINITY;
  for (const icon of line.querySelectorAll<SVGSVGElement>("[data-icon]")) {
    const box = icon.getBoundingClientRect();
    const middle = window.scrollY + box.top + box.height / 2;
    const reached = (Math.min(Math.max(middle, top), bottom) - top) / speed;
    const at = Math.max(reached, previous + ICON_GAP_MS);
    timeStrokes(icon, at);
    previous = at;
  }
}
