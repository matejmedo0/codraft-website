import { type Company, COMPANY } from "../../config/company.ts";
import { type Locale, SITE_NAME, SITE_URL } from "../../config/site.ts";
import { urlFor } from "../i18n/urls.ts";

/** A JSON-LD object (schema.org). */
export type JsonLd = Record<string, unknown>;

export interface OrganizationInput {
  locale: Locale;
  /** The page's meta description, in its language. */
  description: string;
  /** The country served, in the page's language. */
  country: string;
  company?: Company;
}

/** The brand's square icon from the favicon set (public/), as the logo. */
const LOGO_PATH = "/icon-512.png";

/**
 * Home's ProfessionalService (docs/phases/3-pages.md, "SEO specifics"),
 * with only what is true today (ADR 0004): the name, the site, the
 * country served and the languages. The legal name, OIB, email and phone
 * join once the client sends them (PROGRESS.md, items A and B); the address
 * only if it is public, and `sameAs` only with real profiles.
 */
export function organization({
  locale,
  description,
  country,
  company = COMPANY,
}: OrganizationInput): JsonLd {
  const logo = new URL(LOGO_PATH, SITE_URL).href;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: urlFor("home", locale),
    logo,
    image: logo,
    description,
    areaServed: { "@type": "Country", name: country },
    knowsLanguage: ["hr", "en"],
    ...(company.legalName === null ? {} : { legalName: company.legalName }),
    ...(company.oib === null ? {} : { taxID: company.oib }),
    ...(company.email === null ? {} : { email: company.email }),
    ...(company.phone === null ? {} : { telephone: company.phone }),
  };
}

/**
 * JSON-LD as the text of a `<script type="application/ld+json">`: every
 * "<" escaped, so no value can close the element.
 */
export function jsonLdText(data: JsonLd): string {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}
