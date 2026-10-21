/**
 * The header's menu on narrow screens, a disclosure: the button toggles the
 * navigation and says whether it is open (`aria-expanded`). Escape closes
 * it and returns focus to the button. Without JavaScript the navigation
 * stays open and the button hidden (the `js` class on <html>).
 */

function initMenu(toggle: HTMLButtonElement): void {
  const panelId = toggle.getAttribute("aria-controls");
  const panel = panelId === null ? null : document.getElementById(panelId);
  if (panel === null) return;

  const isOpen = (): boolean => toggle.getAttribute("aria-expanded") === "true";
  const setOpen = (open: boolean): void => {
    toggle.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(!isOpen());
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
}

for (const toggle of document.querySelectorAll<HTMLButtonElement>(
  "[data-menu-toggle]",
)) {
  initMenu(toggle);
}
