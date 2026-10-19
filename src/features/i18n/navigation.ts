import { PAGE_IDS, type PageId } from "./route-map.ts";
import type { UiKey } from "./ui.ts";

/** A link in the header or the title block: a route-map page and its label. */
export interface NavLink {
  page: PageId;
  label: UiKey;
}

/** The header's navigation; the free audit has its own button beside it. */
export const MAIN_NAV: readonly NavLink[] = [
  { page: "services", label: "nav.services" },
  { page: "drafting", label: "nav.drafting" },
  { page: "about", label: "nav.about" },
  { page: "contact", label: "nav.contact" },
];

/** The legal pages, linked from the title block. */
export const LEGAL_NAV: readonly NavLink[] = [
  { page: "privacy", label: "legal.privacy" },
  { page: "cookies", label: "legal.cookies" },
  { page: "legalNotice", label: "legal.legalNotice" },
  { page: "accessibility", label: "legal.accessibility" },
];

export interface Sheet {
  number: number;
  of: number;
}

/**
 * A page's sheet number in the title block, like a drawing in a set: the
 * route map's order, from Home (sheet 1) to the accessibility statement.
 * Pages outside the route map, such as the 404 pages, have none.
 */
export function sheetFor(page: PageId | undefined): Sheet | undefined {
  if (page === undefined) return undefined;
  return { number: PAGE_IDS.indexOf(page) + 1, of: PAGE_IDS.length };
}
