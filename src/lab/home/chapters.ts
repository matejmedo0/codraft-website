import { pathFor } from "../../features/i18n/urls.ts";
import { PLAN_ITEMS, SERVICES } from "../copy.ts";
import { SERVICE_ICONS, type ServiceIconId } from "./icons/service-icons.ts";

/** A service in "Što radimo": its title, its sentence and its anchor. */
export interface ServiceEntry {
  title: string;
  body: string;
  href?: string;
  /** Its icon (review batch 13), named by the service's anchor. */
  icon?: ServiceIconId | undefined;
}

/** Stage 01's items have no anchor of their own. */
const PLAN_ICONS: ServiceIconId[] = ["besplatna-analiza", "fiksni-opseg"];

function isIconId(value: string): value is ServiceIconId {
  return Object.hasOwn(SERVICE_ICONS, value);
}

/** One stage of "Što radimo", with its number in a grid bubble. */
export interface Chapter {
  number: string;
  title: string;
  tagline: string;
  items: ServiceEntry[];
}

const services = pathFor("services", "hr");

/**
 * The three stages of "Što radimo" on Home, each service with its one short
 * line (review batch 4; the full sentences are for /usluge). Stage 01 lists
 * its two items from its own text, without a link to the audit: the audit
 * zone follows and asks once (ADR 0017). The services of stages 02 and 03
 * link to their anchors on /usluge.
 */
export const CHAPTERS: Chapter[] = [
  {
    number: SERVICES.plan.number,
    title: SERVICES.plan.title,
    tagline: SERVICES.plan.tagline,
    items: PLAN_ITEMS.map(({ title, short }, index) => ({
      title,
      body: short,
      icon: PLAN_ICONS[index],
    })),
  },
  ...SERVICES.stages.map(({ number, title, tagline, items }) => ({
    number,
    title,
    tagline,
    items: items.map((item) => ({
      title: item.title,
      body: item.short,
      href: `${services}#${item.anchor}`,
      icon: isIconId(item.anchor) ? item.anchor : undefined,
    })),
  })),
];
