import type { Locale } from "../../config/site.ts";
import type { UiKey } from "../i18n/ui.ts";
import type { ServiceIconId } from "./icons/service-icons.ts";

/** An anchor on a page, in each language (docs/content.md §1). */
export type Anchor = Record<Locale, string>;

/** A service as Home lists it: its title and one short line (review batch 4). */
export interface ServiceEntry {
  title: UiKey;
  short: UiKey;
  /** Its icon in "Što radimo" (ADR 0022); the drafting services have none. */
  icon?: ServiceIconId;
  /** Its anchor on its page; stage 01's two items have none. */
  anchor?: Anchor;
}

/** One stage of "Što radimo", with its number in a grid bubble. */
export interface Stage {
  number: string;
  anchor: Anchor;
  title: UiKey;
  tagline: UiKey;
  services: ServiceEntry[];
}

/**
 * The three stages and their services (docs/content.md §2), in order. Stage
 * 01 lists its two items from its own text, without a link to the audit:
 * Home's audit zone follows and asks once (ADR 0017). The services of
 * stages 02 and 03 link to their anchors on /usluge.
 */
export const STAGES: readonly Stage[] = [
  {
    number: "01",
    anchor: { hr: "planiranje", en: "plan" },
    title: "plan.title",
    tagline: "plan.tagline",
    services: [
      {
        title: "plan.audit.title",
        short: "plan.audit.short",
        icon: "besplatna-analiza",
      },
      {
        title: "plan.scope.title",
        short: "plan.scope.short",
        icon: "fiksni-opseg",
      },
    ],
  },
  {
    number: "02",
    anchor: { hr: "izrada", en: "build" },
    title: "build.title",
    tagline: "build.tagline",
    services: [
      {
        title: "build.websites.title",
        short: "build.websites.short",
        icon: "web-stranice",
        anchor: { hr: "web-stranice", en: "websites" },
      },
      {
        title: "build.apps.title",
        short: "build.apps.short",
        icon: "web-aplikacije",
        anchor: { hr: "web-aplikacije", en: "web-apps" },
      },
      {
        title: "build.integrations.title",
        short: "build.integrations.short",
        icon: "integracije",
        anchor: { hr: "integracije", en: "integrations" },
      },
      {
        title: "build.ai.title",
        short: "build.ai.short",
        icon: "ai-asistenti",
        anchor: { hr: "ai-asistenti", en: "ai-assistants" },
      },
    ],
  },
  {
    number: "03",
    anchor: { hr: "odrzavanje-i-rast", en: "run-and-grow" },
    title: "run.title",
    tagline: "run.tagline",
    services: [
      {
        title: "run.hosting.title",
        short: "run.hosting.short",
        icon: "hosting",
        anchor: { hr: "hosting", en: "hosting" },
      },
      {
        title: "run.seo.title",
        short: "run.seo.short",
        icon: "seo",
        anchor: { hr: "seo", en: "seo" },
      },
      {
        title: "run.analytics.title",
        short: "run.analytics.short",
        icon: "analitika",
        anchor: { hr: "analitika", en: "analytics" },
      },
    ],
  },
];

/**
 * The drafting services (ADR 0018, 0019): 2D drawings, 3D models and
 * documentation, each with its anchor on /tehnicko-crtanje. Home gives the
 * 2D drawings a shorter title (review batch 8).
 */
export const DRAFTING_SERVICES: readonly ServiceEntry[] = [
  {
    title: "drafting.cad.shortTitle",
    short: "drafting.cad.short",
    anchor: { hr: "2d-crtezi", en: "cad-drafting" },
  },
  {
    title: "drafting.3d.title",
    short: "drafting.3d.short",
    anchor: { hr: "3d-modeli", en: "3d-models" },
  },
  {
    title: "drafting.docs.title",
    short: "drafting.docs.short",
    anchor: { hr: "dokumentacija", en: "documentation" },
  },
];
