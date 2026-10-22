import { describe, expect, it } from "vitest";

import type { Company } from "../../config/company.ts";
import { SITE_URL } from "../../config/site.ts";
import {
  breadcrumbList,
  graph,
  jsonLdText,
  organization,
  service,
} from "./structured-data.ts";

const NO_DATA: Company = {
  legalName: null,
  oib: null,
  mbs: null,
  seat: null,
  email: null,
  phone: null,
};

describe("organization", () => {
  it("describes the studio in the page's language", () => {
    const data = organization({
      locale: "en",
      description: "We plan, build and look after websites.",
      country: "Croatia",
      company: NO_DATA,
    });
    expect(data).toMatchObject({
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "Codraft",
      url: `${SITE_URL}/en`,
      description: "We plan, build and look after websites.",
      areaServed: { "@type": "Country", name: "Croatia" },
    });
  });

  it("keeps one identity in both languages", () => {
    const hr = organization({ locale: "hr", description: "", country: "" });
    const en = organization({ locale: "en", description: "", country: "" });
    expect(hr["@id"]).toBe(en["@id"]);
    expect(hr.url).toBe(`${SITE_URL}/`);
  });

  it("leaves out the company data the client hasn't sent", () => {
    const data = organization({
      locale: "hr",
      description: "",
      country: "",
      company: NO_DATA,
    });
    for (const key of ["legalName", "taxID", "email", "telephone", "address"]) {
      expect(data).not.toHaveProperty(key);
    }
  });

  it("adds the company data once it arrives", () => {
    const data = organization({
      locale: "hr",
      description: "",
      country: "",
      company: {
        ...NO_DATA,
        legalName: "Codraft d.o.o.",
        oib: "12345678901",
        email: "info@example.com",
      },
    });
    expect(data).toMatchObject({
      legalName: "Codraft d.o.o.",
      taxID: "12345678901",
      email: "info@example.com",
    });
    expect(data).not.toHaveProperty("telephone");
  });
});

describe("jsonLdText", () => {
  it("can't close its script element", () => {
    const text = jsonLdText({ name: "</script><script>alert(1)</script>" });
    expect(text).not.toContain("<");
    expect(JSON.parse(text)).toEqual({
      name: "</script><script>alert(1)</script>",
    });
  });
});

describe("service", () => {
  const base = {
    locale: "hr" as const,
    name: "Hosting i održavanje",
    description: "Hosting o kojem brinemo mi.",
    url: `${SITE_URL}/usluge#hosting`,
    country: "Hrvatska",
  };

  it("describes one offering, provided by Home's organisation", () => {
    expect(service(base)).toMatchObject({
      "@type": "Service",
      "@id": `${SITE_URL}/usluge#hosting`,
      name: "Hosting i održavanje",
      url: `${SITE_URL}/usluge#hosting`,
      provider: { "@id": `${SITE_URL}/#organization`, url: `${SITE_URL}/` },
      areaServed: { "@type": "Country", name: "Hrvatska" },
    });
  });

  it("has no offer without a price", () => {
    expect(service(base)).not.toHaveProperty("offers");
  });

  it("gives a starting price, and a monthly fee its unit", () => {
    expect(
      service({ ...base, prices: [{ from: 29, monthly: true }] }),
    ).toMatchObject({
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 29,
          priceCurrency: "EUR",
          unitCode: "MON",
        },
      },
    });
    const two = service({ ...base, prices: [{ from: 990 }, { from: 1990 }] });
    expect(two.offers).toHaveLength(2);
  });
});

describe("breadcrumbList", () => {
  it("numbers the trail from Home", () => {
    const data = breadcrumbList([
      { name: "Početna", url: `${SITE_URL}/` },
      { name: "Usluge", url: `${SITE_URL}/usluge` },
    ]);
    expect(data).toEqual({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Početna",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Usluge",
          item: `${SITE_URL}/usluge`,
        },
      ],
    });
  });
});

describe("graph", () => {
  it("puts several objects in one context", () => {
    expect(graph([{ "@type": "Thing" }])).toEqual({
      "@context": "https://schema.org",
      "@graph": [{ "@type": "Thing" }],
    });
  });
});
