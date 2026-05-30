import { describe, expect, it } from "vitest";

import {
  calculateAllFormulas,
  calculateCentralWeight,
  calculateDevine,
  calculateMiller,
  calculateRobinson,
  heightInchesFromCm,
} from "../formulas";

describe("peso-ideal formulas", () => {
  it("converts height cm to inches", () => {
    expect(heightInchesFromCm(175)).toBeCloseTo(68.8976, 3);
  });

  it("calculates Devine for 175 cm male", () => {
    const inches = heightInchesFromCm(175);
    expect(calculateDevine(inches, "male")).toBeCloseTo(70.46, 1);
  });

  it("calculates Robinson for 175 cm male", () => {
    const inches = heightInchesFromCm(175);
    expect(calculateRobinson(inches, "male")).toBeCloseTo(68.9, 1);
  });

  it("calculates Miller for 175 cm male", () => {
    const inches = heightInchesFromCm(175);
    expect(calculateMiller(inches, "male")).toBeCloseTo(68.7, 1);
  });

  it("calculates OMS range and central weight for 175 cm male", () => {
    const formulas = calculateAllFormulas(175, "male");
    expect(formulas.omsMin).toBeCloseTo(56.7, 1);
    expect(formulas.omsMax).toBeCloseTo(76.3, 1);
    expect(formulas.omsCenter).toBeCloseTo(66.5, 1);

    const central = calculateCentralWeight(formulas);
    expect(central).toBeCloseTo(68.6, 1);
  });
});
