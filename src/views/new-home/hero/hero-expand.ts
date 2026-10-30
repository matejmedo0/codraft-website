/**
 * The hero's two windows grow into the hero when the page is scrolled
 * down from its top, and shrink back when it returns to the top (M30, M31
 * in docs/phases/3-pages.md): `is-big` on the hero widens the stage and
 * heightens the windows with a transition (NewHomeHero.astro,
 * CodeToSite.astro). It doesn't follow the scroll: it is one state or the
 * other, by whether the page is at its top. `was-big` stays once the
 * windows have grown, so the wordmark's replay only runs on growing. With
 * reduced motion the change is at once, without the transition.
 */
const hero = document.querySelector<HTMLElement>("[data-hero]");

/** How far down counts as scrolled; back above it counts as the top. */
const DOWN_PX = 8;
const TOP_PX = 2;

if (hero !== null) {
  let frame = 0;
  const update = (): void => {
    frame = 0;
    const { scrollY } = window;
    if (scrollY > DOWN_PX && !hero.classList.contains("is-big")) {
      hero.classList.add("is-big", "was-big");
    } else if (scrollY <= TOP_PX) {
      hero.classList.remove("is-big");
    }
  };
  window.addEventListener(
    "scroll",
    () => {
      if (frame === 0) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}
