import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
  SITE_URL,
  X_DEFAULT_LOCALE,
} from "../../config/site.ts";
import { PAGE_IDS, type PageId, ROUTES } from "./route-map.ts";

/**
 * Path of a page in a locale, without a trailing slash: `/`, `/en`,
 * `/usluge`, `/en/services`.
 */
export function pathFor(page: PageId, locale: Locale): string {
  const prefix: string[] = locale === DEFAULT_LOCALE ? [] : [locale];
  const slug = ROUTES[page][locale];
  const segments = slug === "" ? prefix : [...prefix, slug];
  return `/${segments.join("/")}`;
}

/** Absolute URL of a page in a locale, for canonicals and hreflang. */
export function urlFor(page: PageId, locale: Locale): string {
  return new URL(pathFor(page, locale), SITE_URL).href;
}

const OTHER_LOCALE = { hr: "en", en: "hr" } as const satisfies Record<
  Locale,
  Locale
>;

/** The language the language switcher offers on a page in `locale`. */
export function otherLocale(locale: Locale): Locale {
  return OTHER_LOCALE[locale];
}

export interface Alternate {
  hreflang: Locale | "x-default";
  href: string;
}

/**
 * hreflang links for a page: one per locale, plus `x-default` (English).
 * Every language version of the page carries the same list, so the pairs are
 * reciprocal.
 */
export function alternatesFor(page: PageId): Alternate[] {
  return [
    ...LOCALES.map((locale) => ({
      hreflang: locale,
      href: urlFor(page, locale),
    })),
    { hreflang: "x-default", href: urlFor(page, X_DEFAULT_LOCALE) },
  ];
}

export interface PageRoute<View> {
  params: { slug: string | undefined };
  props: { page: PageId; locale: Locale; view: View };
}

/**
 * `getStaticPaths` entries for the catch-all page route: every page that has
 * a view, in every locale. Pages without a view exist only in the route map
 * and are not generated.
 */
export function staticPathsFor<View>(
  views: Partial<Record<PageId, View>>,
): PageRoute<View>[] {
  return PAGE_IDS.flatMap((page) => {
    const view = views[page];
    if (view === undefined) return [];
    return LOCALES.map((locale) => {
      const path = pathFor(page, locale);
      return {
        params: { slug: path === "/" ? undefined : path.slice(1) },
        props: { page, locale, view },
      };
    });
  });
}
