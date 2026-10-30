import type { Locale } from "../../config/site.ts";

/**
 * The route map: every launch page with its slug in each language (ADR 0002).
 * It drives the navigation, the language switcher, hreflang, sitemap.xml and
 * canonicals, so no URL is hard-coded anywhere else. The home page has an
 * empty slug in both languages.
 *
 * Slugs are provisional until the client approves the Croatian terminology
 * (docs/content.md §1). After launch they never change; a change needs a 301
 * redirect (docs/information-architecture.md).
 */
export const ROUTES = {
  home: { hr: "", en: "" },
  services: { hr: "usluge", en: "services" },
  drafting: { hr: "tehnicko-crtanje", en: "architectural-drafting" },
  about: { hr: "o-nama", en: "about" },
  audit: { hr: "besplatna-analiza", en: "free-audit" },
  contact: { hr: "kontakt", en: "contact" },
  privacy: { hr: "privatnost", en: "privacy" },
  cookies: { hr: "kolacici", en: "cookies" },
  legalNotice: { hr: "impresum", en: "legal-notice" },
  accessibility: { hr: "pristupacnost", en: "accessibility" },
} as const satisfies Record<string, Record<Locale, string>>;

export type PageId = keyof typeof ROUTES;

export const PAGE_IDS = Object.keys(ROUTES) as PageId[];
