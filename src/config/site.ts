/**
 * Site-wide settings, shared by the Astro config, the layouts and the i18n
 * helpers. This is the bottom layer: it imports nothing from `src/`.
 */

/**
 * Production origin. codraft.hr is the recommended domain and is not bought
 * yet; if the client picks another domain, change it here.
 */
export const SITE_URL = "https://codraft.hr";

export const SITE_NAME = "Codraft";

/** Croatian is the default locale at `/`; English lives under `/en` (ADR 0002). */
export const LOCALES = ["hr", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE = "hr" satisfies Locale;

/** Open Graph locales: Croatian, and British English (ADR 0029). */
export const OG_LOCALES = {
  hr: "hr_HR",
  en: "en_GB",
} as const satisfies Record<Locale, string>;

/**
 * hreflang `x-default` points to English, so visitors who read neither
 * language (e.g. foreign drafting clients) get the English page.
 */
export const X_DEFAULT_LOCALE = "en" satisfies Locale;
