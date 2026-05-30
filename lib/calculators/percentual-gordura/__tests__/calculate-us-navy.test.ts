import { describe, expect, it } from "vitest";

import {
  buildUsNavyResult,
  calculateUsNavyBodyFat,
} from "../calculate-us-navy";

describe("calculateUsNavyBodyFat", () => {
  it("calculates body fat for male", () => {
    const bodyFat = calculateUsNavyBodyFat({
      sex: "male",
      heightCm: 180,
      weightKg: 80,
      waistCm: 85,
      neckCm: 38,
    });

    expect(bodyFat).not.toBeNull();
    expect(bodyFat!).toBeGreaterThan(5);
    expect(bodyFat!).toBeLessThan(30);
  });

  it("calculates body fat for female with hip", () => {
    const bodyFat = calculateUsNavyBodyFat({
      sex: "female",
      heightCm: 165,
      weightKg: 62,
      waistCm: 72,
      neckCm: 32,
      hipCm: 98,
    });

    expect(bodyFat).not.toBeNull();
    expect(bodyFat!).toBeGreaterThan(10);
    expect(bodyFat!).toBeLessThan(60);
  });

  it("returns null when waist is not greater than neck", () => {
    expect(
      calculateUsNavyBodyFat({
        sex: "male",
        heightCm: 180,
        weightKg: 80,
        waistCm: 38,
        neckCm: 40,
      })
    ).toBeNull();
  });

  it("returns null for female without hip", () => {
    expect(
      calculateUsNavyBodyFat({
        sex: "female",
        heightCm: 165,
        weightKg: 62,
        waistCm: 72,
        neckCm: 32,
      })
    ).toBeNull();
  });

  it("builds lean and fat mass from weight", () => {
    const result = buildUsNavyResult({
      sex: "male",
      heightCm: 180,
      weightKg: 80,
      waistCm: 85,
      neckCm: 38,
    });

    expect(result).not.toBeNull();
    expect(result!.leanMassKg + result!.fatMassKg).toBeCloseTo(80, 1);
    expect(result!.method).toBe("us-navy");
  });
});
