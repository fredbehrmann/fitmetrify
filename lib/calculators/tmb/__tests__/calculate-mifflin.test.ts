import { describe, expect, it } from "vitest";

import { calculateMifflinTmb } from "../calculate-mifflin";

describe("calculateMifflinTmb", () => {
  it("calculates TMB for male reference case", () => {
    expect(calculateMifflinTmb("male", 80, 180, 30)).toBe(1780);
  });

  it("calculates TMB for female", () => {
    expect(calculateMifflinTmb("female", 60, 165, 25)).toBe(1345);
  });

  it("rounds to integer kcal", () => {
    const tmb = calculateMifflinTmb("male", 75, 175, 28);
    expect(Number.isInteger(tmb)).toBe(true);
  });
});
