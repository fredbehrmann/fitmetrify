import { describe, expect, it } from "vitest";

import {
  bodyFatFromDensity,
  buildJacksonPollockResult,
  calculateJacksonPollockBodyFat,
} from "../calculate-jackson-pollock";

describe("calculateJacksonPollockBodyFat", () => {
  it("converts density to body fat via Siri equation", () => {
    expect(bodyFatFromDensity(1.05)).toBeCloseTo(21.43, 1);
  });

  it("calculates male body fat from three skinfolds", () => {
    const bodyFat = calculateJacksonPollockBodyFat({
      sex: "male",
      age: 30,
      weightKg: 80,
      chestSkinfold: 10,
      abdomenSkinfold: 18,
      thighSkinfold: 14,
    });

    expect(bodyFat).not.toBeNull();
    expect(bodyFat!).toBeGreaterThan(5);
    expect(bodyFat!).toBeLessThan(30);
  });

  it("calculates female body fat from three skinfolds", () => {
    const bodyFat = calculateJacksonPollockBodyFat({
      sex: "female",
      age: 28,
      weightKg: 60,
      tricepsSkinfold: 16,
      suprailiacSkinfold: 14,
      thighSkinfold: 20,
    });

    expect(bodyFat).not.toBeNull();
    expect(bodyFat!).toBeGreaterThan(10);
    expect(bodyFat!).toBeLessThan(40);
  });

  it("returns null when required male skinfolds are missing", () => {
    expect(
      calculateJacksonPollockBodyFat({
        sex: "male",
        age: 30,
        weightKg: 80,
        thighSkinfold: 14,
      })
    ).toBeNull();
  });

  it("builds result with lean and fat mass", () => {
    const result = buildJacksonPollockResult({
      sex: "male",
      age: 30,
      weightKg: 80,
      chestSkinfold: 10,
      abdomenSkinfold: 18,
      thighSkinfold: 14,
    });

    expect(result).not.toBeNull();
    expect(result!.method).toBe("jackson-pollock");
    expect(result!.leanMassKg + result!.fatMassKg).toBeCloseTo(80, 1);
  });
});
