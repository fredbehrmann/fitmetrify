import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateImc, formatImc } from "../imc/calculate";
import { classifyImc } from "../imc/classify";
import {
  IMC_SCALE_MAX,
  IMC_SCALE_MIN,
  IMC_SCALE_SEGMENTS,
} from "../imc/constants";
import {
  estimateBodyFatDeurenberg,
  formatBodyFatPercent,
} from "../imc/deurenberg";
import {
  buildAdvancedWarnings,
  buildNextSteps,
  buildSimpleInterpretation,
  type ImcAdvancedContext,
} from "../imc/interpret";
import type { Sex } from "../tmb/calculate-mifflin";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function buildImcResult(
  weightKg: number,
  heightCm: number,
  options?: { advanced?: ImcAdvancedContext }
): CalculatorResult {
  const bmi = calculateImc(weightKg, heightCm);
  const age = options?.advanced?.age;
  const classification = classifyImc(bmi, { age });
  const interpretation = buildSimpleInterpretation(classification, bmi, age);

  const kpis = [];

  if (
    options?.advanced?.sex &&
    age !== undefined &&
    parseSex(options.advanced.sex)
  ) {
    const bodyFat = estimateBodyFatDeurenberg(
      bmi,
      age,
      options.advanced.sex as Sex
    );
    kpis.push({
      label: "Gordura estimada (Deurenberg)",
      value: formatBodyFatPercent(bodyFat),
    });
  }

  const actions: CalculatorResult["actions"] = [];

  const tmbParams: Record<string, string | number> = {
    weight: weightKg,
    height: heightCm,
  };
  if (options?.advanced?.sex) tmbParams.sex = options.advanced.sex;
  if (age !== undefined) tmbParams.age = age;

  actions.push({
    label: "Calcular minha TMB",
    href: "/calculadora-tmb",
    params: tmbParams,
  });

  const result: CalculatorResult = {
    primaryValue: formatImc(bmi),
    primaryUnit: "kg/m²",
    primaryLabel: "Seu IMC",
    classification,
    interpretation,
    scale: {
      segments: IMC_SCALE_SEGMENTS,
      value: bmi,
      min: IMC_SCALE_MIN,
      max: IMC_SCALE_MAX,
    },
    kpis: kpis.length > 0 ? kpis : undefined,
    nextSteps: buildNextSteps(),
    actions,
  };

  if (options?.advanced) {
    result.warnings = buildAdvancedWarnings(options.advanced, bmi);
  }

  return result;
}

function extractBaseValues(values: Record<string, unknown>): {
  weight: number;
  height: number;
} | null {
  const weight = parseNumber(values.weight);
  const height = parseNumber(values.height);

  if (weight === null || height === null) return null;

  return { weight, height };
}

export const imcEngine: CalculatorEngine = {
  calculateSimple(values) {
    const base = extractBaseValues(values);
    if (!base) return null;

    return buildImcResult(base.weight, base.height);
  },

  calculateAdvanced(values) {
    const base = extractBaseValues(values);
    if (!base) return null;

    const advanced: ImcAdvancedContext = {
      sex: typeof values.sex === "string" ? values.sex : undefined,
      age: parseNumber(values.age) ?? undefined,
      waist: parseNumber(values.waist) ?? undefined,
      activityLevel:
        typeof values.activityLevel === "string"
          ? values.activityLevel
          : undefined,
    };

    return buildImcResult(base.weight, base.height, { advanced });
  },
};
