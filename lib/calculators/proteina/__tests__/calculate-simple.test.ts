import { describe, expect, it } from "vitest";

import { calculateSimpleProtein } from "../calculate-simple";

describe("calculateSimpleProtein", () => {
  it("calculates range for general goal at 75 kg", () => {
    const result = calculateSimpleProtein(75, "general");

    expect(result.minGrams).toBe(60);
    expect(result.maxGrams).toBe(90);
    expect(result.idealGrams).toBe(75);
  });

  it("calculates range for weight loss at 80 kg", () => {
    const result = calculateSimpleProtein(80, "weight-loss");

    expect(result.minGrams).toBe(128);
    expect(result.maxGrams).toBe(176);
    expect(result.idealGrams).toBe(152);
  });

  it("calculates range for athlete at 70 kg", () => {
    const result = calculateSimpleProtein(70, "athlete");

    expect(result.minGrams).toBe(140);
    expect(result.maxGrams).toBe(168);
    expect(result.idealGrams).toBe(154);
  });
});
