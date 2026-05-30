import { describe, expect, it } from "vitest";

import {
  brzycki1RM,
  calculateAllOneRmEstimates,
  epley1RM,
  trainingLoads,
  trainingZoneLoads,
} from "../one-rm-formulas";

describe("one-rm-formulas", () => {
  it("calculates Brzycki for 80 kg x 8 reps", () => {
    const result = brzycki1RM(80, 8);
    expect(result).toBeCloseTo(99.31, 1);
  });

  it("calculates Epley for 80 kg x 8 reps", () => {
    expect(epley1RM(80, 8)).toBeCloseTo(101.33, 1);
  });

  it("builds six training zones from 100 kg 1RM", () => {
    const zones = trainingZoneLoads(100);
    expect(zones).toHaveLength(6);
    expect(zones[0]?.minLoadKg).toBe(50);
    expect(zones[5]?.maxLoadKg).toBe(100);
  });

  it("builds legacy training zones from 100 kg 1RM", () => {
    const zones = trainingLoads(100);
    expect(zones.map((z) => z.loadKg)).toEqual([90, 80, 70, 60]);
  });

  it("returns null for invalid Brzycki reps", () => {
    expect(calculateAllOneRmEstimates(80, 37)).toBeNull();
  });
});
