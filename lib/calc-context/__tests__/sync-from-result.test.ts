import { describe, expect, it } from "vitest";

import {
  extractCalcStatePatch,
  paramsToCalcState,
} from "../sync-from-result";

describe("extractCalcStatePatch", () => {
  it("extracts IMC patch", () => {
    const patch = extractCalcStatePatch(
      "calculadora-imc",
      { weight: 80, height: 180, age: 30, sex: "male" },
      {
        primaryValue: "24,7",
        interpretation: "",
      }
    );

    expect(patch.weight).toBe(80);
    expect(patch.height).toBe(180);
    expect(patch.age).toBe(30);
    expect(patch.sex).toBe("male");
    expect(patch.bmi).toBeCloseTo(24.69, 1);
  });

  it("extracts TMB patch", () => {
    const patch = extractCalcStatePatch(
      "calculadora-tmb",
      { weight: 80, height: 180, age: 30, sex: "male" },
      {
        primaryValue: "1780",
        interpretation: "",
      }
    );

    expect(patch.tmb).toBe(1780);
    expect(patch.weight).toBe(80);
  });

  it("extracts gasto calorico patch", () => {
    const patch = extractCalcStatePatch(
      "calculadora-gasto-calorico",
      { tmb: 1780 },
      {
        primaryValue: "2136",
        interpretation: "",
      }
    );

    expect(patch.tmb).toBe(1780);
    expect(patch.get).toBe(2136);
  });

  it("maps params to calc state", () => {
    expect(
      paramsToCalcState({
        dailyExpenditure: 2200,
        calories: 1800,
        sex: "female",
      })
    ).toEqual({
      get: 2200,
      targetCalories: 1800,
      sex: "female",
    });
  });

  it("extracts percentual gordura patch with lean mass", () => {
    const patch = extractCalcStatePatch(
      "calculadora-percentual-gordura",
      {
        weight: 80,
        height: 180,
        age: 30,
        sex: "male",
      },
      {
        primaryValue: "18,5",
        interpretation: "",
      }
    );

    expect(patch.bodyFat).toBeCloseTo(18.5, 1);
    expect(patch.leanMass).toBeCloseTo(65.2, 1);
    expect(patch.weight).toBe(80);
  });

  it("extracts fc maxima patch", () => {
    const patch = extractCalcStatePatch(
      "calculadora-fc-maxima",
      { age: 30, restingHeartRate: 60 },
      {
        primaryValue: "187",
        interpretation: "",
      }
    );

    expect(patch.maxHeartRate).toBe(187);
    expect(patch.restingHeartRate).toBe(60);
    expect(patch.age).toBe(30);
  });

  it("maps leanMass and heart rate params", () => {
    expect(
      paramsToCalcState({
        leanMass: 65.2,
        maxHeartRate: 187,
        restingHeartRate: 60,
      })
    ).toEqual({
      leanMass: 65.2,
      maxHeartRate: 187,
      restingHeartRate: 60,
    });
  });
});
