import { describe, expect, it } from "vitest";

import { calculateAdvancedWater } from "../calculate-advanced";
import { HEAVY_SWEATING_ML } from "../constants";

describe("calculateAdvancedWater", () => {
  it("adds workout, hot climate and caffeine adjustments", () => {
    const result = calculateAdvancedWater(80, {
      workoutTime: 1,
      hotClimate: true,
      highCaffeine: true,
    });

    expect(result.baseMl).toBe(2800);
    expect(result.totalMl).toBe(2800 + 500 + 400 + 250);
    expect(result.adjustments).toHaveLength(3);
  });

  it("adds heavy sweating bonus", () => {
    const result = calculateAdvancedWater(70, {
      heavySweating: true,
    });

    expect(result.totalMl).toBe(2450 + HEAVY_SWEATING_ML);
    expect(result.adjustments[0].label).toBe("Sudorese alta");
  });

  it("returns base only when no options", () => {
    const result = calculateAdvancedWater(70, {});

    expect(result.totalMl).toBe(2450);
    expect(result.adjustments).toHaveLength(0);
  });
});
