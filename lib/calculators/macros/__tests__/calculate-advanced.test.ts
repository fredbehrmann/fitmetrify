import { describe, expect, it } from "vitest";

import { calculateAdvancedMacros } from "../calculate-advanced";

describe("calculateAdvancedMacros", () => {
  it("calculates fixed protein and fat with remaining carbs", () => {
    const result = calculateAdvancedMacros(80, 2200, 2.0, 0.8, {});

    expect(result).not.toBeNull();
    expect(result!.training.proteinG).toBe(160);
    expect(result!.training.fatG).toBe(64);
    expect(result!.hasCycling).toBe(false);

    const fixedKcal = 160 * 4 + 64 * 9;
    const expectedCarbG = Math.round((2200 - fixedKcal) / 4);
    expect(result!.training.carbsG).toBe(expectedCarbG);
  });

  it("returns null when fixed macros exceed calories", () => {
    const result = calculateAdvancedMacros(80, 1500, 2.5, 1.5, {});

    expect(result).toBeNull();
  });

  it("cycles carbs on training vs rest days", () => {
    const result = calculateAdvancedMacros(80, 2200, 2.0, 0.8, {
      adjustCarbs: true,
      trainingDays: 4,
    });

    expect(result).not.toBeNull();
    expect(result!.hasCycling).toBe(true);
    expect(result!.training.carbsG).toBeGreaterThan(result!.rest.carbsG);

    const baseCarbG = result!.baseCarbG;
    const weeklyAvg =
      (4 * result!.training.carbsG + 3 * result!.rest.carbsG) / 7;
    expect(weeklyAvg).toBeCloseTo(baseCarbG, 0);
  });

  it("uses single profile when adjustCarbs is false", () => {
    const result = calculateAdvancedMacros(80, 2200, 2.0, 0.8, {
      adjustCarbs: false,
      trainingDays: 4,
    });

    expect(result!.hasCycling).toBe(false);
    expect(result!.training.carbsG).toBe(result!.rest.carbsG);
  });
});
