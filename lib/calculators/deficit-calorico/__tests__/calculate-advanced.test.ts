import { describe, expect, it } from "vitest";

import { calculateAdvancedDeficit } from "../calculate-advanced";

describe("calculateAdvancedDeficit", () => {
  it("calculates required deficit for weight loss goal", () => {
    const result = calculateAdvancedDeficit(2500, 90, 80, 10);

    expect(result).not.toBeNull();
    expect(result?.kgToLose).toBe(10);
    expect(result?.dailyDeficit).toBe(1100);
    expect(result?.targetCalories).toBe(1400);
    expect(result?.deficitPercent).toBeCloseTo(0.44, 2);
  });

  it("estimates realistic weeks at moderate deficit", () => {
    const result = calculateAdvancedDeficit(2500, 90, 80, 10);
    expect(result?.realisticWeeks).toBe(22);
  });

  it("returns null when target weight is not lower", () => {
    expect(calculateAdvancedDeficit(2500, 80, 85, 10)).toBeNull();
    expect(calculateAdvancedDeficit(2500, 80, 80, 10)).toBeNull();
  });
});
