import { describe, expect, it } from "vitest";

import { calculateSpeedFromPace } from "../calculate-simple";

describe("calculateSpeedFromPace", () => {
  it("converts 6 min/km to 10 km/h", () => {
    const result = calculateSpeedFromPace(6);

    expect(result.speedKmh).toBe(10);
  });

  it("converts 5.5 min/km", () => {
    const result = calculateSpeedFromPace(5.5);

    expect(result.speedKmh).toBeCloseTo(60 / 5.5, 2);
  });
});
