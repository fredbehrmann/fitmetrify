import { describe, expect, it } from "vitest";

import {
  cmToIn,
  ftInToCm,
  inToCm,
  kgToLb,
  lbToKg,
  secondsToDecimalMinutes,
} from "@/lib/conversions";

describe("conversions", () => {
  it("converts lb to kg", () => {
    expect(lbToKg(154)).toBeCloseTo(69.85, 1);
  });

  it("converts ft/in to cm", () => {
    expect(ftInToCm(5, 9)).toBeCloseTo(175.26, 1);
  });

  it("converts seconds to decimal minutes", () => {
    expect(secondsToDecimalMinutes(3000)).toBe(50);
  });

  it("converts inches and centimeters", () => {
    expect(inToCm(10)).toBeCloseTo(25.4, 1);
    expect(cmToIn(25.4)).toBeCloseTo(10, 1);
  });

  it("round-trips kg and lb", () => {
    expect(lbToKg(kgToLb(75))).toBeCloseTo(75, 1);
  });
});
