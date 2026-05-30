import type { CalculatorResult } from "@/lib/calculators/engines/types";
import { calculateImc } from "@/lib/calculators/imc/calculate";
import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

import type { CalcState } from "./types";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseSex(value: unknown): Sex | undefined {
  if (value === "male" || value === "female") return value;
  return undefined;
}

function parsePrimaryNumber(result: CalculatorResult): number | null {
  const parsed = Number(
    String(result.primaryValue).replace(/\./g, "").replace(",", ".")
  );
  if (!Number.isNaN(parsed)) return parsed;
  return null;
}

function parseLitersFromPrimary(value: string): number | null {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(",", ".");
  const parsed = Number(normalized);
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

function parseKpiNumber(kpi: { value: string } | undefined): number | null {
  if (!kpi) return null;
  const parsed = Number(kpi.value.replace(/[^\d,.-]/g, "").replace(",", "."));
  if (Number.isNaN(parsed)) return null;
  return parsed;
}

function parseKcalFromKpi(kpi: { value: string } | undefined): number | null {
  if (!kpi) return null;
  const match = kpi.value.match(/[\d.,]+/);
  if (!match) return null;
  const parsed = Number(match[0].replace(",", "."));
  if (Number.isNaN(parsed)) return null;
  return Math.round(parsed);
}

export function extractCalcStatePatch(
  slug: string,
  inputs: Record<string, unknown>,
  result: CalculatorResult
): Partial<CalcState> {
  const patch: Partial<CalcState> = {};

  switch (slug) {
    case "calculadora-imc": {
      const weight = parseNumber(inputs.weight);
      const height = parseNumber(inputs.height);
      const age = parseNumber(inputs.age);
      const sex = parseSex(inputs.sex);
      if (weight !== null) patch.weight = weight;
      if (height !== null) patch.height = height;
      if (age !== null) patch.age = age;
      if (sex) patch.sex = sex;
      if (weight !== null && height !== null) {
        patch.bmi = calculateImc(weight, height);
      }
      break;
    }
    case "calculadora-tmb": {
      const weight = parseNumber(inputs.weight);
      const height = parseNumber(inputs.height);
      const age = parseNumber(inputs.age);
      const sex = parseSex(inputs.sex);
      const tmb = parsePrimaryNumber(result);
      if (weight !== null) patch.weight = weight;
      if (height !== null) patch.height = height;
      if (age !== null) patch.age = age;
      if (sex) patch.sex = sex;
      if (tmb !== null) patch.tmb = Math.round(tmb);
      break;
    }
    case "calculadora-gasto-calorico": {
      const tmb = parseNumber(inputs.tmb);
      const get = parsePrimaryNumber(result);
      if (tmb !== null) patch.tmb = tmb;
      if (get !== null) patch.get = Math.round(get);
      break;
    }
    case "calculadora-deficit-calorico": {
      const expenditure = parseNumber(inputs.dailyExpenditure);
      const sex = parseSex(inputs.sex);
      const target = parsePrimaryNumber(result);
      if (expenditure !== null) patch.get = expenditure;
      if (sex) patch.sex = sex;
      if (target !== null) patch.targetCalories = Math.round(target);
      break;
    }
    case "calculadora-macros": {
      const calories = parseNumber(inputs.calories);
      const weight = parseNumber(inputs.weight);
      if (calories !== null) patch.targetCalories = Math.round(calories);
      if (weight !== null) patch.weight = weight;
      break;
    }
    case "calculadora-1rm": {
      const oneRepMax = parsePrimaryNumber(result);
      const exercise =
        typeof inputs.exercise === "string" ? inputs.exercise : undefined;
      if (oneRepMax !== null) patch.oneRepMax = oneRepMax;
      if (exercise) patch.exercise = exercise;
      break;
    }
    case "calculadora-proteina": {
      const weight = parseNumber(inputs.weight);
      const dailyProtein = parsePrimaryNumber(result);
      const proteinPerMealKpi = result.kpis?.find((k) => k.label === "Por refeição");

      if (weight !== null) patch.weight = weight;
      if (dailyProtein !== null) patch.dailyProtein = Math.round(dailyProtein);
      const proteinPerMeal = parseKpiNumber(proteinPerMealKpi);
      if (proteinPerMeal !== null) patch.proteinPerMeal = Math.round(proteinPerMeal);
      break;
    }
    case "calculadora-agua": {
      const weight = parseNumber(inputs.weight);
      const liters = parseLitersFromPrimary(String(result.primaryValue));

      if (weight !== null) patch.weight = weight;
      if (liters !== null) patch.dailyWaterLiters = liters;
      break;
    }
    case "calculadora-calorias-refeicao": {
      const calories = parseNumber(inputs.calories);
      if (calories !== null) patch.targetCalories = Math.round(calories);

      const mealCalories =
        result.kpis
          ?.map((kpi) => parseKcalFromKpi(kpi))
          .filter((value): value is number => value !== null) ?? [];

      if (mealCalories.length > 0) patch.caloriesPerMeal = mealCalories;
      break;
    }
    case "calculadora-peso-ideal": {
      const weight = parseNumber(inputs.weight);
      const height = parseNumber(inputs.height);
      const sex = parseSex(inputs.sex);
      const bodyFat = parseNumber(inputs.bodyFat);
      const central = parsePrimaryNumber(result);

      if (weight !== null) patch.weight = weight;
      if (height !== null) patch.height = height;
      if (sex) patch.sex = sex;
      if (bodyFat !== null) patch.bodyFat = bodyFat;
      if (central !== null) patch.idealWeightCentral = central;

      const omsRangeKpi = result.kpis?.find((k) =>
        k.label.toLowerCase().includes("oms")
      );
      if (omsRangeKpi?.value) {
        const rangeMatch = omsRangeKpi.value.match(
          /([\d.,]+)\s*[–-]\s*([\d.,]+)/
        );
        if (rangeMatch) {
          const min = Number(rangeMatch[1].replace(",", "."));
          const max = Number(rangeMatch[2].replace(",", "."));
          if (!Number.isNaN(min)) patch.idealWeightMin = min;
          if (!Number.isNaN(max)) patch.idealWeightMax = max;
        }
      }
      break;
    }
    case "calculadora-percentual-gordura": {
      const weight = parseNumber(inputs.weight);
      const height = parseNumber(inputs.height);
      const age = parseNumber(inputs.age);
      const sex = parseSex(inputs.sex);
      const bodyFat = parsePrimaryNumber(result);

      if (weight !== null) patch.weight = weight;
      if (height !== null) patch.height = height;
      if (age !== null) patch.age = age;
      if (sex) patch.sex = sex;
      if (bodyFat !== null) {
        patch.bodyFat = bodyFat;
        if (weight !== null) {
          patch.leanMass =
            Math.round(weight * (1 - bodyFat / 100) * 10) / 10;
        }
      }
      break;
    }
    case "calculadora-fc-maxima": {
      const age = parseNumber(inputs.age);
      const maxHeartRate = parsePrimaryNumber(result);
      const restingHeartRate = parseNumber(inputs.restingHeartRate);

      if (age !== null) patch.age = age;
      if (maxHeartRate !== null) patch.maxHeartRate = Math.round(maxHeartRate);
      if (restingHeartRate !== null) {
        patch.restingHeartRate = Math.round(restingHeartRate);
      }
      break;
    }
    default:
      break;
  }

  return patch;
}

export function paramsToCalcState(
  params: Record<string, string | number>
): Partial<CalcState> {
  const patch: Partial<CalcState> = {};
  const numericKeys = [
    "weight",
    "height",
    "age",
    "tmb",
    "get",
    "dailyExpenditure",
    "calories",
    "oneRepMax",
    "bodyFat",
    "leanMass",
    "maxHeartRate",
    "restingHeartRate",
    "targetCalories",
    "idealWeightCentral",
    "idealWeightMin",
    "idealWeightMax",
    "dailyProtein",
    "proteinPerMeal",
    "dailyWaterLiters",
  ] as const;

  for (const key of numericKeys) {
    const raw = params[key];
    if (raw === undefined) continue;
    const num = typeof raw === "number" ? raw : Number(raw);
    if (Number.isNaN(num)) continue;

    if (key === "dailyExpenditure") patch.get = num;
    else if (key === "calories") patch.targetCalories = num;
    else if (key === "oneRepMax") patch.oneRepMax = num;
    else patch[key] = num;
  }

  const sex = params.sex;
  if (sex === "male" || sex === "female") patch.sex = sex;

  const exercise = params.exercise;
  if (typeof exercise === "string") patch.exercise = exercise;

  return patch;
}
