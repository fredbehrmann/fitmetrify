import { describe, expect, it } from "vitest";

import { calculateSimpleOneRm } from "../calculate-simple";

describe("calculateSimpleOneRm", () => {
  it("calculates Brzycki 1RM", () => {
    const result = calculateSimpleOneRm(80, 8);

    expect(result).not.toBeNull();
    expect(result!.oneRmKg).toBeCloseTo(99.31, 1);
  });
});
