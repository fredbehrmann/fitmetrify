import { describe, expect, it } from "vitest";

import { calculatePace } from "../calculate-simple";

describe("calculatePace", () => {
  it("calculates 10 km in 50 min", () => {
    const result = calculatePace(10, 50);

    expect(result.paceMinPerKm).toBe(5);
    expect(result.speedKmh).toBe(12);
  });
});
