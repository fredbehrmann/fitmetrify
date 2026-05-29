import { describe, expect, it } from "vitest";

import { calculateImc } from "../calculate";

describe("calculateImc", () => {
  it("calculates BMI for 70 kg and 175 cm", () => {
    expect(calculateImc(70, 175)).toBe(22.9);
  });

  it("converts height from cm to meters", () => {
    expect(calculateImc(80, 180)).toBe(24.7);
  });

  it("rounds to one decimal place", () => {
    expect(calculateImc(65, 170)).toBe(22.5);
  });
});
