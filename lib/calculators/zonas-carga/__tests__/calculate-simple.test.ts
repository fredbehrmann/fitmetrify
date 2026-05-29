import { describe, expect, it } from "vitest";

import { calculateZones } from "../calculate-simple";

describe("calculateZones", () => {
  it("calculates zones from direct 1RM", () => {
    const result = calculateZones(100);

    expect(result).not.toBeNull();
    expect(result!.zones.map((z) => z.loadKg)).toEqual([90, 80, 70, 60]);
    expect(result!.source).toBe("direct");
  });

  it("estimates zones from load and reps", () => {
    const result = calculateZones(undefined, 80, 8);

    expect(result).not.toBeNull();
    expect(result!.source).toBe("estimated");
    expect(result!.oneRmKg).toBeCloseTo(99.31, 1);
  });

  it("returns null without inputs", () => {
    expect(calculateZones()).toBeNull();
  });
});
