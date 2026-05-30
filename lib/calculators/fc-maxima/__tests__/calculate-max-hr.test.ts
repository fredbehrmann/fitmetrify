import { describe, expect, it } from "vitest";

import {
  calculateFoxMaxHr,
  calculateGellishMaxHr,
  calculateMaxHeartRate,
  calculateTanakaMaxHr,
} from "../calculate-max-hr";

describe("calculateMaxHeartRate", () => {
  it("calculates Tanaka for age 30", () => {
    expect(calculateTanakaMaxHr(30)).toBe(187);
    expect(calculateMaxHeartRate("tanaka", 30)).toBe(187);
  });

  it("calculates Fox formula", () => {
    expect(calculateFoxMaxHr(30)).toBe(190);
    expect(calculateMaxHeartRate("fox", 30)).toBe(190);
  });

  it("calculates Gellish formula", () => {
    expect(calculateGellishMaxHr(30)).toBe(186);
    expect(calculateMaxHeartRate("gellish", 30)).toBe(186);
  });
});
