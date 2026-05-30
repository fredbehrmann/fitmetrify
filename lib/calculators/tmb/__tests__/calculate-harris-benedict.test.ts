import { describe, expect, it } from "vitest";

import { calculateHarrisBenedictTmb } from "../calculate-harris-benedict";

describe("calculateHarrisBenedictTmb", () => {
  it("calculates for male", () => {
    const tmb = calculateHarrisBenedictTmb("male", 80, 180, 30);
    expect(tmb).toBeCloseTo(1853.6, 0);
  });

  it("calculates for female", () => {
    const tmb = calculateHarrisBenedictTmb("female", 65, 165, 28);
    expect(tmb).toBeCloseTo(1438.6, 0);
  });
});
