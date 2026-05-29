import { describe, expect, it } from "vitest";

import { buildCalorieTargets } from "../calorie-targets";

describe("buildCalorieTargets", () => {
  it("builds maintenance, loss and hypertrophy from GET", () => {
    const targets = buildCalorieTargets(2160);

    expect(targets.maintenance).toBe(2160);
    expect(targets.weightLoss).toBe(1728);
    expect(targets.hypertrophy).toBe(2376);
  });

  it("formats recommended range", () => {
    const targets = buildCalorieTargets(2000);
    expect(targets.recommendedRange).toContain("kcal/dia");
    expect(targets.recommendedRange).toContain("–");
  });
});
