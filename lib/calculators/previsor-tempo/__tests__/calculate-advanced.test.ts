import { describe, expect, it } from "vitest";

import { calculateAdvancedPrediction } from "../calculate-advanced";
import { calculateSimplePrediction } from "../calculate-simple";

describe("calculateAdvancedPrediction", () => {
  it("probable time exceeds simple Riegel with hard conditions", () => {
    const simple = calculateSimplePrediction(10, 50, 21.1);
    const advanced = calculateAdvancedPrediction(10, 50, 21.1, {
      experience: "beginner",
      elevation: 200,
      temperature: 30,
      weeklyRuns: 2,
      raceType: "marathon",
    });

    expect(advanced.probableTimeMinutes).toBeGreaterThan(
      simple.predictedTimeMinutes
    );
    expect(advanced.optimisticTimeMinutes).toBeLessThan(
      advanced.probableTimeMinutes
    );
    expect(advanced.conservativeTimeMinutes).toBeGreaterThan(
      advanced.probableTimeMinutes
    );
  });
});
