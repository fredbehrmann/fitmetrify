import { describe, expect, it } from "vitest";

import {
  mergePrefillFromContext,
  getPrefillImportItems,
} from "../prefill-from-context";
import type { CalcState } from "@/lib/calc-context/types";

describe("mergePrefillFromContext", () => {
  const state: CalcState = {
    tmb: 1780,
    get: 2200,
    targetCalories: 1800,
    weight: 75,
    sex: "female",
  };

  it("prefills gasto calorico tmb", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-gasto-calorico",
      state,
      [
        {
          id: "tmb",
          name: "tmb",
          label: "TMB",
          type: "number",
          mode: "simple",
        },
      ]
    );

    expect(defaults.tmb).toBe(1780);
  });

  it("prefills deficit daily expenditure from get", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-deficit-calorico",
      state,
      [
        {
          id: "dailyExpenditure",
          name: "dailyExpenditure",
          label: "Gasto",
          type: "number",
          mode: "simple",
        },
      ]
    );

    expect(defaults.dailyExpenditure).toBe(2200);
  });

  it("builds import banner items", () => {
    const items = getPrefillImportItems(
      "calculadora-gasto-calorico",
      state,
      [
        {
          id: "tmb",
          name: "tmb",
          label: "TMB",
          type: "number",
          mode: "simple",
        },
      ],
      { tmb: 1780 }
    );

    expect(items[0]?.value).toBe("1780 kcal/dia");
  });

  it("prefills TMB lean mass and body fat from context", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-tmb",
      { leanMass: 62.5, bodyFat: 18, weight: 75, age: 30, sex: "male" },
      [
        {
          id: "leanMass",
          name: "leanMass",
          label: "Massa magra",
          type: "number",
          mode: "advanced",
        },
        {
          id: "bodyFat",
          name: "bodyFat",
          label: "% gordura",
          type: "number",
          mode: "advanced",
        },
      ]
    );

    expect(defaults.leanMass).toBe(62.5);
    expect(defaults.bodyFat).toBe(18);
  });

  it("prefills pace max heart rate and resting heart rate", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-pace",
      { maxHeartRate: 187, restingHeartRate: 60, age: 30 },
      [
        {
          id: "maxHeartRate",
          name: "maxHeartRate",
          label: "FC máxima",
          type: "number",
          mode: "advanced",
        },
        {
          id: "restingHeartRate",
          name: "restingHeartRate",
          label: "FC de repouso",
          type: "number",
          mode: "advanced",
        },
      ]
    );

    expect(defaults.maxHeartRate).toBe(187);
    expect(defaults.restingHeartRate).toBe(60);
  });
});
