import { describe, expect, it } from "vitest";

import { calculateSimpleDeficit } from "../calculate-simple";

describe("calculateSimpleDeficit", () => {
  it("calculates moderate deficit for 2200 kcal expenditure", () => {
    const result = calculateSimpleDeficit(2200, "moderate");

    expect(result.targetCalories).toBe(1760);
    expect(result.dailyDeficit).toBe(440);
    expect(result.weeklyDeficit).toBe(3080);
    expect(result.weeklyWeightLossKg).toBeCloseTo(0.4, 1);
  });

  it("applies 10% light deficit", () => {
    const result = calculateSimpleDeficit(2000, "light");
    expect(result.targetCalories).toBe(1800);
    expect(result.deficitPercent).toBe(0.1);
  });

  it("applies 25% aggressive deficit", () => {
    const result = calculateSimpleDeficit(2000, "aggressive");
    expect(result.targetCalories).toBe(1500);
    expect(result.deficitPercent).toBe(0.25);
  });
});
