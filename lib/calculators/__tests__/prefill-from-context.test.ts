import { describe, expect, it } from "vitest";

import {
  mergePrefillFromContext,
  getPrefillImportItems,
  getVolumeTreinoPrefillSuggestion,
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

  it("prefills proteina weight bodyFat and leanMass", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-proteina",
      { weight: 75, bodyFat: 18, leanMass: 61.5 },
      [
        {
          id: "weight",
          name: "weight",
          label: "Peso",
          type: "number",
          mode: "simple",
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

    expect(defaults.weight).toBe(75);
    expect(defaults.bodyFat).toBe(18);
  });

  it("prefills agua weight and ageGroup from age", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-agua",
      { weight: 70, age: 65 },
      [
        {
          id: "weight",
          name: "weight",
          label: "Peso",
          type: "number",
          mode: "simple",
        },
        {
          id: "ageGroup",
          name: "ageGroup",
          label: "Faixa etária",
          type: "select",
          mode: "simple",
        },
      ]
    );

    expect(defaults.weight).toBe(70);
    expect(defaults.ageGroup).toBe("senior");
  });

  it("prefills calorias refeicao from targetCalories", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-calorias-refeicao",
      { targetCalories: 1800 },
      [
        {
          id: "calories",
          name: "calories",
          label: "Calorias",
          type: "number",
          mode: "simple",
        },
      ]
    );

    expect(defaults.calories).toBe(1800);
  });

  it("prefills peso ideal from context", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-peso-ideal",
      { height: 175, sex: "male", weight: 80, bodyFat: 15 },
      [
        {
          id: "height",
          name: "height",
          label: "Altura",
          type: "number",
          mode: "advanced",
        },
        {
          id: "sex",
          name: "sex",
          label: "Sexo",
          type: "select",
          mode: "advanced",
        },
      ]
    );

    expect(defaults.height).toBe(175);
    expect(defaults.sex).toBe("male");
  });

  it("prefills 1rm advanced body metrics", () => {
    const defaults = mergePrefillFromContext(
      "calculadora-1rm",
      { weight: 80, sex: "male" },
      [
        {
          id: "weight",
          name: "weight",
          label: "Peso corporal",
          type: "number",
          mode: "advanced",
        },
        {
          id: "sex",
          name: "sex",
          label: "Sexo",
          type: "select",
          mode: "advanced",
        },
      ]
    );

    expect(defaults.weight).toBe(80);
    expect(defaults.sex).toBe("male");
  });

  it("builds volume treino suggestion from oneRepMax", () => {
    const suggestion = getVolumeTreinoPrefillSuggestion({
      oneRepMax: 100,
      exercise: "bench-press",
    });

    expect(suggestion?.oneRepMax).toBe(100);
    expect(suggestion?.exerciseLabel).toBe("Supino Reto");
    expect(suggestion?.suggestedLoadKg).toBe(70);
  });
});
