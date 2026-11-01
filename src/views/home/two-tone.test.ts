import { describe, expect, it } from "vitest";

import { twoTone } from "./two-tone.ts";

describe("twoTone", () => {
  it("splits before the last word", () => {
    expect(twoTone("Što radimo")).toEqual(["Što ", "radimo"]);
    expect(twoTone("Imate skicu, stranicu ili samo ideju?")).toEqual([
      "Imate skicu, stranicu ili samo ",
      "ideju?",
    ]);
  });

  it("leaves a one-word title whole", () => {
    expect(twoTone("Tim")).toEqual(["Tim", ""]);
  });
});
