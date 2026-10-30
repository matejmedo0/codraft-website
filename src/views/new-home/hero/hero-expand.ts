/**
 * On the first scroll down, the hero's two windows grow into the hero
 * itself (M30 in docs/phases/3-pages.md): `is-big` on the hero widens the
 * stage to the sheet and the windows to the screen's height, once, with a
 * transition (NewHomeHero.astro, CodeToSite.astro). Nothing follows the
 * scroll; it plays once and stays. A page loaded already scrolled starts
 * big. With reduced motion the change is at once, without the transition.
 */
const hero = document.querySelector<HTMLElement>("[data-hero]");

if (hero !== null) {
  const grow = (): void => {
    hero.classList.add("is-big");
  };
  if (window.scrollY > 0) {
    grow();
  } else {
    const onScroll = (): void => {
      if (window.scrollY <= 0) return;
      window.removeEventListener("scroll", onScroll);
      grow();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }
}
