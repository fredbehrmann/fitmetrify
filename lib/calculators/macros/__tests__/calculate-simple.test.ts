import { describe, expect, it } from "vitest";

import { calculateSimpleMacros } from "../calculate-simple";

describe("calculateSimpleMacros", () => {
  it("calculates lose goal at 2000 kcal", () => {
    const result = calculateSimpleMacros(2000, "lose");

    expect(result.proteinG).toBe(150);
    expect(result.fatG).toBe(56);
    expect(result.carbsG).toBe(225);
    expect(result.proteinPercent).toBeCloseTo(30, 0);
    expect(result.fatPercent).toBeCloseTo(25, 0);
    expect(result.carbsPercent).toBeCloseTo(45, 0);
  });

  it("calculates maintain goal at 2000 kcal", () => {
    const result = calculateSimpleMacros(2000, "maintain");

    expect(result.proteinG).toBe(125);
    expect(result.fatG).toBe(56);
    expect(result.carbsG).toBe(250);
    expect(result.proteinPercent).toBeCloseTo(25, 0);
    expect(result.fatPercent).toBeCloseTo(25, 0);
    expect(result.carbsPercent).toBeCloseTo(50, 0);
  });

  it("calculates gain goal at 2000 kcal", () => {
    const result = calculateSimpleMacros(2000, "gain");

    expect(result.proteinG).toBe(125);
    expect(result.fatG).toBe(44);
    expect(result.carbsG).toBe(275);
    expect(result.proteinPercent).toBeCloseTo(25, 0);
    expect(result.fatPercent).toBeCloseTo(20, 0);
    expect(result.carbsPercent).toBeCloseTo(55, 0);
  });

  it("total kcal from grams approximates target calories", () => {
    const result = calculateSimpleMacros(2000, "lose");
    const total =
      result.proteinG * 4 + result.carbsG * 4 + result.fatG * 9;

    expect(total).toBeGreaterThanOrEqual(1990);
    expect(total).toBeLessThanOrEqual(2010);
  });
});
