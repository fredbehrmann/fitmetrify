import { describe, expect, it } from "vitest";

import { calculateSimpleWater } from "../calculate-simple";

describe("calculateSimpleWater", () => {
  it("calculates 70 kg as 2450 ml and 10 cups", () => {
    const result = calculateSimpleWater(70);

    expect(result.baseMl).toBe(2450);
    expect(result.totalMl).toBe(2450);
    expect(result.liters).toBeCloseTo(2.45, 2);
    expect(result.cups).toBe(10);
  });

  it("calculates 80 kg base", () => {
    const result = calculateSimpleWater(80);

    expect(result.baseMl).toBe(2800);
    expect(result.cups).toBe(11);
  });
});
