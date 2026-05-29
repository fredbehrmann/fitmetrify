import { describe, expect, it } from "vitest";

import { ACTIVITY_LEVEL_FACTORS } from "../constants";
import { calculateGet } from "../calculate-simple";

describe("calculateGet", () => {
  it("calculates GET for TMB 1800 and sedentary factor", () => {
    expect(calculateGet(1800, 1.2)).toBe(2160);
  });

  it("calculates GET for TMB 1780 and moderate factor", () => {
    expect(calculateGet(1780, 1.55)).toBe(2759);
  });

  it("calculates GET for TMB 1820 and sedentary factor", () => {
    expect(calculateGet(1820, 1.2)).toBe(2184);
  });

  it.each(
    Object.entries(ACTIVITY_LEVEL_FACTORS)
  )("applies factor %s", (level, factor) => {
    expect(calculateGet(2000, factor)).toBe(Math.round(2000 * factor));
  });
});
