import { describe, expect, it } from "vitest";

import {
  assertEtapa14Result,
  enrichCalculatorResult,
} from "../../recommendations/enrich-result";
import { getCalculatorEngine } from "../index";

const ENGINE_FIXTURES: Record<string, Record<string, unknown>> = {
  "calculadora-imc": { weight: 70, height: 175 },
  "calculadora-tmb": {
    sex: "male",
    weight: 80,
    height: 180,
    age: 30,
  },
  "calculadora-gasto-calorico": {
    tmb: 1800,
    activityLevel: "sedentary",
  },
  "calculadora-deficit-calorico": {
    dailyExpenditure: 2200,
    strategy: "moderate",
  },
  "calculadora-proteina": { weight: 75, goal: "general" },
  "calculadora-macros": {
    calories: 2000,
    goal: "lose",
    inputMode: "percent",
  },
  "calculadora-agua": { weight: 70, ageGroup: "adult" },
  "calculadora-pace": { distance: 10, timeSeconds: 50 * 60 },
  "calculadora-pace-velocidade": { inputMode: "pace", timeSeconds: 6 * 60 },
  "calculadora-previsor-tempo": {
    knownDistance: 10,
    knownTimeSeconds: 50 * 60,
    targetDistance: 21.1,
  },
  "calculadora-1rm": { load: 80, reps: 8 },
  "calculadora-volume-treino": {
    exercise: "Supino",
    sets: 4,
    reps: 10,
    load: 32,
  },
  "calculadora-zonas-carga": {
    oneRepMax: 100,
    exercise: "bench-press",
    inputMode: "percent",
  },
  "calculadora-peso-ideal": { height: 175, sex: "male" },
  "calculadora-calorias-refeicao": { calories: 2000, mealCount: "4" },
  "calculadora-percentual-gordura": {
    sex: "male",
    height: 180,
    weight: 80,
    waist: 85,
    neck: 38,
  },
  "calculadora-fc-maxima": { age: 30, formula: "tanaka" },
};

describe("Etapa 14 result completeness", () => {
  for (const [slug, values] of Object.entries(ENGINE_FIXTURES)) {
    it(`${slug} exposes all five result elements after enrich`, () => {
      const engine = getCalculatorEngine(slug);
      expect(engine?.calculateSimple).toBeDefined();

      const raw = engine!.calculateSimple!(values);
      expect(raw).not.toBeNull();

      const enriched = enrichCalculatorResult(slug, raw!);
      expect(() => assertEtapa14Result(enriched)).not.toThrow();
      expect(enriched.relatedSlugs!.length).toBeGreaterThanOrEqual(1);
    });
  }
});
