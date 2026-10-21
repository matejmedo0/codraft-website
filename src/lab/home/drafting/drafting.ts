import { pathFor } from "../../../features/i18n/urls.ts";
import { DRAFTING } from "../../copy.ts";
import type { ServiceEntry } from "../chapters.ts";

const drafting = pathFor("drafting", "hr");

/**
 * The drafting services on Home (review batches 6 and 8): 2D drawings, 3D
 * models (ADR 0019) and documentation, each with its Home title and one
 * short line, as in "Što radimo", and a link to its anchor on
 * /tehnicko-crtanje.
 */
export const DRAFTING_SERVICES: ServiceEntry[] = DRAFTING.items.map((item) => ({
  title: item.shortTitle ?? item.title,
  body: item.short,
  href: `${drafting}#${item.anchor}`,
}));
