import { describe, expect, it } from "vitest";

import { transformPrevisorDistanceInputs } from "../transform-distance-inputs";

describe("transformPrevisorDistanceInputs", () => {
  it("converts known and target distances from miles to km", () => {
    const result = transformPrevisorDistanceInputs(
      { knownDistance: 6.2, targetDistance: 13.1 },
      "miles"
    );

    expect(result.knownDistance).toBeCloseTo(9.98, 1);
    expect(result.targetDistance).toBeCloseTo(21.08, 1);
    expect(result.distanceUnit).toBe("miles");
  });

  it("keeps km values unchanged", () => {
    const result = transformPrevisorDistanceInputs(
      { knownDistance: 10, targetDistance: 21.1 },
      "km"
    );

    expect(result.knownDistance).toBe(10);
    expect(result.targetDistance).toBe(21.1);
  });
});
