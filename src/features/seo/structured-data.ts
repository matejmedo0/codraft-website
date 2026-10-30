import { type Company, COMPANY } from "../../config/company.ts";
import { type GuidePrice, PRICES_INCLUDE_VAT } from "../../config/pricing.ts";
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

/** Home's organisation, one identity in both languages. */
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/**
 * Home's ProfessionalService,
 * with only what is true today (ADR 0004): the name, the site, the
 * country served and the languages. The legal name, OIB, email and phone
 * join once the client sends them; the address
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
    "@id": ORGANIZATION_ID,
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

/** A reference to Home's organisation, as a service's provider. */
function provider(locale: Locale): JsonLd {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: urlFor("home", locale),
  };
}

/** A guide price on a page, with the label that tells it from the others. */
export interface PricedOffer {
  price: GuidePrice;
  /** E.g. "Web trgovina" beside "Web stranica", in the page's language. */
  name?: string | undefined;
}

/**
 * A guide price as a schema.org offer: a starting price, with its unit when
 * it has one (a month, a drawing sheet).
 */
function offer({ price, name }: PricedOffer): JsonLd {
  const unit =
    price.monthly === true
      ? { unitCode: "MON" }
      : price.perSheet === true
        ? { unitText: "sheet" }
        : undefined;
  return {
    "@type": "Offer",
    ...(name === undefined ? {} : { name }),
    priceCurrency: "EUR",
    priceSpecification: {
      "@type":
        unit === undefined ? "PriceSpecification" : "UnitPriceSpecification",
      minPrice: price.from,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: PRICES_INCLUDE_VAT,
      ...unit,
    },
  };
}

export interface ServiceInput {
  locale: Locale;
  name: string;
  /** The service's sentence, in the page's language. */
  description: string;
  /** Where the page describes it, anchor included. */
  url: string;
  /** The country served, in the page's language. */
  country: string;
  /** Its guide prices (src/config/pricing.ts), if the page shows them. */
  prices?: readonly PricedOffer[];
}

/**
 * One offering as a `Service`:
 * eight on /usluge, three on the drafting page. Home's organisation is the
 * provider; a guide price is an offer with a starting price.
 */
export function service({
  locale,
  name,
  description,
  url,
  country,
  prices = [],
}: ServiceInput): JsonLd {
  const offers = prices.map(offer);
  return {
    "@type": "Service",
    "@id": url,
    name,
    description,
    url,
    provider: provider(locale),
    areaServed: { "@type": "Country", name: country },
    ...(offers.length === 0
      ? {}
      : { offers: offers.length === 1 ? offers[0] : offers }),
  };
}

export interface Crumb {
  name: string;
  url: string;
}

/** An inner page's trail, Home first (src/components/site/Breadcrumbs.astro). */
export function breadcrumbList(crumbs: readonly Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/** Several JSON-LD objects in one script, as a graph. */
export function graph(nodes: readonly JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * JSON-LD as the text of a `<script type="application/ld+json">`: every
 * "<" escaped, so no value can close the element.
 */
export function jsonLdText(data: JsonLd): string {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}
