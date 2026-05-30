import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateAdvancedPesoIdeal } from "../peso-ideal/calculate-advanced";
import { calculateSimplePesoIdeal } from "../peso-ideal/calculate-simple";
import type { Biotype, Sex } from "../peso-ideal/constants";
import { formatKg, formatKgRange } from "../peso-ideal/format";
import {
  buildAdvancedInterpretation,
  buildAdvancedWarnings,
  buildClassification,
  buildFormulaKpis,
  buildNextSteps,
  buildSimpleInterpretation,
} from "../peso-ideal/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function parseBiotype(value: unknown): Biotype | null {
  if (
    value === "ectomorph" ||
    value === "mesomorph" ||
    value === "endomorph"
  ) {
    return value;
  }
  return null;
}

export const pesoIdealEngine: CalculatorEngine = {
  calculateSimple(values) {
    const height = parseNumber(values.height);
    const sex = parseSex(values.sex);

    if (height === null || sex === null) return null;

    const result = calculateSimplePesoIdeal(height, sex);

    return {
      primaryValue: formatKg(result.centralWeight),
      primaryUnit: "kg",
      primaryLabel: "Peso central estimado",
      classification: buildClassification(result),
      interpretation: buildSimpleInterpretation(result),
      kpis: buildFormulaKpis(result),
      nextSteps: buildNextSteps(),
      relatedSlugs: ["calculadora-imc", "calculadora-tmb"],
    } satisfies CalculatorResult;
  },

  calculateAdvanced(values) {
    const height = parseNumber(values.height);
    const sex = parseSex(values.sex);
    const biotype = parseBiotype(values.biotype);

    if (height === null || sex === null || biotype === null) return null;

    const currentWeight = parseNumber(values.weight) ?? undefined;
    const bodyFat = parseNumber(values.bodyFat) ?? undefined;

    const result = calculateAdvancedPesoIdeal(height, sex, {
      currentWeight,
      bodyFat,
      biotype,
    });

    const warnings = buildAdvancedWarnings(result);

    const kpis = buildFormulaKpis(result);

    if (currentWeight !== undefined) {
      kpis.push(
        {
          label: "Peso atual",
          value: formatKg(currentWeight),
          unit: "kg",
        },
        {
          label: "Faixa OMS ajustada",
          value: formatKgRange(result.adjustedOmsMin, result.adjustedOmsMax),
          unit: "kg",
        }
      );
    }

    return {
      primaryValue: formatKg(result.adjustedCentralWeight),
      primaryUnit: "kg",
      primaryLabel: "Peso central ajustado",
      classification: buildClassification(result),
      interpretation: buildAdvancedInterpretation(result),
      kpis,
      warnings: warnings.length > 0 ? warnings : undefined,
      nextSteps: buildNextSteps(),
      relatedSlugs: ["calculadora-imc", "calculadora-tmb"],
    } satisfies CalculatorResult;
  },
};
