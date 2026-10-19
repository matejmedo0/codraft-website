import { describe, expect, it } from "vitest";

import { findGuardrailMatches } from "./check-guardrails.mjs";

// Examples from docs/compliance.md (copy guardrail 1).
describe("copy guardrail regex", () => {
  it.each([
    ["projektiranje", "projektiranje"],
    ["Projektiramo kuće.", "Projektiramo"],
    ["Naši projektanti", "projektanti"],
    ["Izrađujemo projektnu dokumentaciju.", "projektnu dokumentaciju"],
    ["snimka postojećeg stanja", "snimka postojećeg stanja"],
    ["We act as the designer of record.", "designer of record"],
    ["We design buildings.", "We design buildings"],
  ])("flags %j", (text, expected) => {
    expect(findGuardrailMatches(text).map((match) => match.text)).toContain(
      expected,
    );
  });

  it.each([
    "projekt",
    "Svaki projekt počinje analizom.",
    "Crtamo prema vašim skicama, oznakama i standardima.",
    "We draft to your sketches, markups and standards.",
  ])("allows %j", (text) => {
    expect(findGuardrailMatches(text)).toEqual([]);
  });

  it("reports the line and column of a match", () => {
    expect(findGuardrailMatches("Prvi red\n  projektiranje")).toEqual([
      { text: "projektiranje", line: 2, column: 3 },
    ]);
  });
});
