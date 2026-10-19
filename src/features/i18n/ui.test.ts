import { describe, expect, it } from "vitest";

import en from "../../locales/en.json";
import hr from "../../locales/hr.json";
import { t } from "./ui.ts";

describe("UI strings", () => {
  // The type check catches missing English keys; this also catches extras.
  it("have the same keys in Croatian and English", () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(hr).sort());
  });

  it("are never empty", () => {
    for (const value of [...Object.values(hr), ...Object.values(en)]) {
      expect(value.trim()).not.toBe("");
    }
  });

  it("are looked up per locale", () => {
    expect(t("hr", "notFound.title")).toBe(hr["notFound.title"]);
    expect(t("en", "notFound.title")).toBe(en["notFound.title"]);
  });
});
