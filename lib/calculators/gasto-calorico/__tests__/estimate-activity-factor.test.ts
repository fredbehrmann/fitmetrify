import { describe, expect, it } from "vitest";

import { MAX_ACTIVITY_FACTOR, MIN_ACTIVITY_FACTOR } from "../constants";
import { estimateActivityFactor } from "../estimate-activity-factor";

describe("estimateActivityFactor", () => {
  it("returns sedentary base with no training", () => {
    expect(estimateActivityFactor("sedentary", 0, 0, 30)).toBe(1.2);
  });

  it("increases factor with training days", () => {
    const factor = estimateActivityFactor("standing", 4, 2, 60);
    expect(factor).toBeGreaterThan(1.375);
    expect(factor).toBeLessThanOrEqual(MAX_ACTIVITY_FACTOR);
  });

  it("clamps at maximum factor", () => {
    const factor = estimateActivityFactor("physical", 7, 7, 90);
    expect(factor).toBe(MAX_ACTIVITY_FACTOR);
  });

  it("never goes below minimum factor", () => {
    const factor = estimateActivityFactor("sedentary", 0, 0, 15);
    expect(factor).toBeGreaterThanOrEqual(MIN_ACTIVITY_FACTOR);
  });
});
