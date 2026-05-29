import { describe, expect, it } from "vitest";

import {
  calculateKatchMcArdleTmb,
  estimateLeanMassFromBodyFat,
} from "../calculate-lean-mass";

describe("lean mass TMB", () => {
  it("estimates lean mass from body fat percent", () => {
    expect(estimateLeanMassFromBodyFat(80, 20)).toBe(64);
  });

  it("calculates Katch-McArdle TMB from lean mass", () => {
    expect(calculateKatchMcArdleTmb(64)).toBe(1752);
  });

  it("derives TMB from weight and body fat", () => {
    const leanMass = estimateLeanMassFromBodyFat(80, 20);
    expect(calculateKatchMcArdleTmb(leanMass)).toBe(1752);
  });
});
