import { describe, expect, it } from "vitest";

import type { Company } from "../../config/company.ts";
import { SITE_URL } from "../../config/site.ts";
import { jsonLdText, organization } from "./structured-data.ts";

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
