import type { PriceId } from "../../config/pricing.ts";
import type { Locale } from "../../config/site.ts";
import type { UiKey } from "../i18n/ui.ts";
import type { ServiceIconId } from "./icons/service-icons.ts";

/** An anchor on a page, in each language (docs/content.md §1). */
export type Anchor = Record<Locale, string>;

/** A guide price on /usluge, with a label when a service has several. */
export interface PriceLine {
  price: PriceId;
  label?: UiKey;
}

/**
 * A service as /usluge describes it (docs/content.md, "Services, phase 3"):
 * the client's sentence, a label and 3-4 short points, and its guide prices
 * (G7; src/config/pricing.ts).
 */
export interface ServiceDetail {
  body: UiKey;
  pointsLabel: UiKey;
  points: readonly UiKey[];
  prices?: readonly PriceLine[];
  /** The free audit's row holds the page's one audit button (ADR 0017). */
  auditCta?: boolean;
  /** False for the fixed offer: part of stage 01, not an offering of its
      own, so it gets no `Service` markup. */
  offering?: boolean;
}

/** A service as Home lists it: its title and one short line (review batch 4). */
export interface ServiceEntry {
  title: UiKey;
  short: UiKey;
  /** Its icon in "Što radimo" (ADR 0022); the drafting services have none. */
  icon?: ServiceIconId;
  /** Its anchor on its page; stage 01's two items have none. */
  anchor?: Anchor;
  /** Its full description on /usluge. */
  detail?: ServiceDetail;
}

/** One stage of "Što radimo", with its number in a grid bubble. */
export interface Stage {
  number: string;
  anchor: Anchor;
  title: UiKey;
  tagline: UiKey;
  /** The stage's lead on /usluge, if it has one. */
  body?: UiKey;
  /** Its services in one line, for the index in the hero of /usluge. */
  index: UiKey;
  services: ServiceEntry[];
}

/**
 * The three stages and their services (docs/content.md §2), in order. Stage
 * 01 lists its two items from its own text, without a link to the audit:
 * Home's audit zone follows and asks once (ADR 0017). The services of
 * stages 02 and 03 link to their anchors on /usluge, which describes every
 * service in full (`detail`).
 */
export const STAGES: readonly Stage[] = [
  {
    number: "01",
    anchor: { hr: "planiranje", en: "plan" },
    title: "plan.title",
    tagline: "plan.tagline",
    body: "plan.body",
    index: "services.index.plan",
    services: [
      {
        title: "plan.audit.title",
        short: "plan.audit.short",
        icon: "besplatna-analiza",
        detail: {
          body: "services.plan.audit.body",
          pointsLabel: "services.gets",
          points: [
            "services.plan.audit.gets.1",
            "services.plan.audit.gets.2",
            "services.plan.audit.gets.3",
          ],
          auditCta: true,
        },
      },
      {
        title: "plan.scope.title",
        short: "plan.scope.short",
        icon: "fiksni-opseg",
        detail: {
          body: "services.plan.scope.body",
          pointsLabel: "services.offer",
          offering: false,
          points: [
            "services.plan.scope.gets.1",
            "services.plan.scope.gets.2",
            "services.plan.scope.gets.3",
          ],
        },
      },
    ],
  },
  {
    number: "02",
    anchor: { hr: "izrada", en: "build" },
    title: "build.title",
    tagline: "build.tagline",
    index: "services.index.build",
    services: [
      {
        title: "build.websites.title",
        short: "build.websites.short",
        icon: "web-stranice",
        anchor: { hr: "web-stranice", en: "websites" },
        detail: {
          body: "build.websites.body",
          pointsLabel: "services.gets",
          points: [
            "build.websites.gets.1",
            "build.websites.gets.2",
            "build.websites.gets.3",
            "build.websites.gets.4",
          ],
          prices: [
            { price: "website", label: "build.websites.site" },
            { price: "shop", label: "build.websites.shop" },
          ],
        },
      },
      {
        title: "build.apps.title",
        short: "build.apps.short",
        icon: "web-aplikacije",
        anchor: { hr: "web-aplikacije", en: "web-apps" },
        detail: {
          body: "build.apps.body",
          pointsLabel: "services.gets",
          points: [
            "build.apps.gets.1",
            "build.apps.gets.2",
            "build.apps.gets.3",
            "build.apps.gets.4",
          ],
          prices: [{ price: "apps" }],
        },
      },
      {
        title: "build.integrations.title",
        short: "build.integrations.short",
        icon: "integracije",
        anchor: { hr: "integracije", en: "integrations" },
        detail: {
          body: "build.integrations.body",
          pointsLabel: "services.gets",
          points: [
            "build.integrations.gets.1",
            "build.integrations.gets.2",
            "build.integrations.gets.3",
          ],
          prices: [{ price: "integrations" }],
        },
      },
      {
        title: "build.ai.title",
        short: "build.ai.short",
        icon: "ai-asistenti",
        anchor: { hr: "ai-asistenti", en: "ai-assistants" },
        detail: {
          body: "build.ai.body",
          pointsLabel: "services.gets",
          points: [
            "build.ai.gets.1",
            "build.ai.gets.2",
            "build.ai.gets.3",
            "build.ai.gets.4",
          ],
          prices: [
            { price: "ai", label: "build.ai.setup" },
            { price: "aiMonthly", label: "build.ai.monthly" },
          ],
        },
      },
    ],
  },
  {
    number: "03",
    anchor: { hr: "odrzavanje-i-rast", en: "run-and-grow" },
    title: "run.title",
    tagline: "run.tagline",
    index: "services.index.run",
    services: [
      {
        title: "run.hosting.title",
        short: "run.hosting.short",
        icon: "hosting",
        anchor: { hr: "hosting", en: "hosting" },
        detail: {
          body: "run.hosting.body",
          pointsLabel: "services.included",
          points: [
            "run.hosting.gets.1",
            "run.hosting.gets.2",
            "run.hosting.gets.3",
            "run.hosting.gets.4",
          ],
          prices: [{ price: "hosting" }],
        },
      },
      {
        title: "run.seo.title",
        short: "run.seo.short",
        icon: "seo",
        anchor: { hr: "seo", en: "seo" },
        detail: {
          body: "run.seo.body",
          pointsLabel: "services.included",
          points: [
            "run.seo.gets.1",
            "run.seo.gets.2",
            "run.seo.gets.3",
            "run.seo.gets.4",
          ],
          prices: [{ price: "seo" }],
        },
      },
      {
        title: "run.analytics.title",
        short: "run.analytics.short",
        icon: "analitika",
        anchor: { hr: "analitika", en: "analytics" },
        detail: {
          body: "run.analytics.body",
          pointsLabel: "services.included",
          points: [
            "run.analytics.gets.1",
            "run.analytics.gets.2",
            "run.analytics.gets.3",
            "run.analytics.gets.4",
          ],
          prices: [{ price: "analytics", label: "run.analytics.setup" }],
        },
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
