import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateImc, formatImc } from "../imc/calculate";
import { classifyImc } from "../imc/classify";
import {
  IMC_SCALE_MAX,
  IMC_SCALE_MIN,
  IMC_SCALE_SEGMENTS,
} from "../imc/constants";
import {
  buildAdvancedWarnings,
  buildNextSteps,
  buildSimpleInterpretation,
  type ImcAdvancedContext,
} from "../imc/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function buildImcResult(
  weightKg: number,
  heightCm: number,
  options?: { advanced?: ImcAdvancedContext }
): CalculatorResult {
  const bmi = calculateImc(weightKg, heightCm);
  const classification = classifyImc(bmi);
  const interpretation = buildSimpleInterpretation(classification, bmi);

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
    nextSteps: buildNextSteps(),
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
