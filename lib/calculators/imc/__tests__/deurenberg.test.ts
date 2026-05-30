import { describe, expect, it } from "vitest";

import { estimateBodyFatDeurenberg } from "../deurenberg";

describe("estimateBodyFatDeurenberg", () => {
  it("estimates body fat for adult male", () => {
    const bodyFat = estimateBodyFatDeurenberg(24, 30, "male");
    expect(bodyFat).toBeCloseTo(19.5, 1);
  });

  it("estimates body fat for adult female", () => {
    const bodyFat = estimateBodyFatDeurenberg(22, 30, "female");
    expect(bodyFat).toBeCloseTo(27.9, 1);
  });
});
