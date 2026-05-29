import { describe, expect, it } from "vitest";

import { calculateSimplePrediction } from "../calculate-simple";

describe("calculateSimplePrediction", () => {
  it("predicts half marathon from 10k in 50 min", () => {
    const result = calculateSimplePrediction(10, 50, 21.1);

    expect(result.predictedTimeMinutes).toBeCloseTo(50 * Math.pow(2.11, 1.06), 0);
    expect(result.predictedTimeMinutes).toBeGreaterThan(110);
    expect(result.predictedTimeMinutes).toBeLessThan(113);
  });
});
