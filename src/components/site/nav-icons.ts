/**
 * The bottom menu's page icons (BottomNav.astro), drawn by Claude in the
 * service icons' line style (service-icons.ts): a 48 × 48 grid, square
 * caps, strokes in drawing order, without their accent.
 */
import type { IconShape } from "../../features/services/icons/service-icons.ts";
import type { PageId } from "../../features/i18n/route-map.ts";

export const NAV_ICONS: Partial<Record<PageId, IconShape[]>> = {
  // A house with its door.
  home: [
    { tag: "path", attrs: { d: "M4.5 21.5L24 5.5L43.5 21.5" } },
    { tag: "path", attrs: { d: "M9.5 17.5V42.5H38.5V17.5" } },
    { tag: "path", attrs: { d: "M20.5 42.5V31.5H27.5V42.5" } },
  ],
  // Three modules, with room for the next.
  services: [
    { tag: "rect", attrs: { x: "4.5", y: "4.5", width: "17", height: "17" } },
    { tag: "rect", attrs: { x: "26.5", y: "4.5", width: "17", height: "17" } },
    { tag: "rect", attrs: { x: "4.5", y: "26.5", width: "17", height: "17" } },
  ],
  // Two people.
  about: [
    { tag: "circle", attrs: { cx: "18", cy: "14.5", r: "7" } },
    {
      tag: "path",
      attrs: { d: "M5 42.5V39C5 31.5 10.5 26.5 18 26.5S31 31.5 31 39V42.5" },
    },
    { tag: "circle", attrs: { cx: "34.5", cy: "17", r: "5.5" } },
    { tag: "path", attrs: { d: "M35 27C40 27.5 43.5 31.5 43.5 37V42.5" } },
  ],
  // An envelope.
  contact: [
    { tag: "rect", attrs: { x: "4.5", y: "9.5", width: "39", height: "29" } },
    { tag: "path", attrs: { d: "M4.5 9.5L24 25L43.5 9.5" } },
  ],
};
