import { describe, expect, it } from "vitest";

import { calculateAdvancedProtein } from "../calculate-advanced";

describe("calculateAdvancedProtein", () => {
  it("calculates protein from lean mass with strength training", () => {
    const result = calculateAdvancedProtein(80, "hypertrophy", "strength", 4, {
      leanMass: 64,
    });

    expect(result.usesLeanMass).toBe(true);
    expect(result.idealGrams).toBe(147);
    expect(result.gramsPerKgLbm).toBeCloseTo(2.3, 1);
    expect(result.gramsPerMeal).toBe(37);
    expect(result.mealCount).toBe(4);
  });

  it("derives lean mass from body fat percent", () => {
    const result = calculateAdvancedProtein(80, "hypertrophy", "cardio", 2, {
      bodyFat: 20,
    });

    expect(result.usesLeanMass).toBe(true);
    expect(result.leanMassKg).toBe(64);
    expect(result.idealGrams).toBe(128);
  });

  it("falls back to simple calculation without lean mass data", () => {
    const result = calculateAdvancedProtein(75, "general", "cardio", 2);

    expect(result.usesLeanMass).toBe(false);
    expect(result.idealGrams).toBe(75);
    expect(result.gramsPerMeal).toBe(19);
  });
});
