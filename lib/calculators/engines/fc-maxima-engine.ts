import type { CalculatorEngine, CalculatorResult } from "./types";
import {
  calculateAllMaxHrFormulas,
  calculateMaxHeartRate,
} from "../fc-maxima/calculate-max-hr";
import {
  calculateKarvonenZones,
  calculatePercentMaxZones,
} from "../fc-maxima/calculate-karvonen-zones";
import type { MaxHrFormula, TrainingGoal } from "../fc-maxima/constants";
import {
  buildAdvancedInterpretation,
  buildFormulaComparisonKpis,
  buildNextSteps,
  buildSimpleInterpretation,
  buildZoneKpis,
} from "../fc-maxima/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseFormula(value: unknown): MaxHrFormula {
  if (value === "fox" || value === "gellish" || value === "tanaka") return value;
  return "tanaka";
}

function parseTrainingGoal(value: unknown): TrainingGoal | undefined {
  if (
    value === "fat-burn" ||
    value === "aerobic" ||
    value === "threshold" ||
    value === "vo2max"
  ) {
    return value;
  }
  return undefined;
}

function buildFcResult(
  age: number,
  formula: MaxHrFormula,
  options?: {
    restingHeartRate?: number;
    trainingGoal?: TrainingGoal;
    includeComparison?: boolean;
  }
): CalculatorResult {
  const maxHeartRate = calculateMaxHeartRate(formula, age);
  const zones = options?.restingHeartRate
    ? calculateKarvonenZones(maxHeartRate, options.restingHeartRate)
    : calculatePercentMaxZones(maxHeartRate);

  const kpis = options?.includeComparison
    ? [
        ...buildFormulaComparisonKpis(calculateAllMaxHrFormulas(age), formula),
        ...buildZoneKpis(zones),
      ]
    : buildZoneKpis(zones);

  return {
    primaryValue: String(maxHeartRate),
    primaryUnit: "bpm",
    primaryLabel: "FC máxima estimada",
    classification: {
      label: "Zonas de frequência cardíaca",
      variant: "default",
    },
    interpretation: options?.restingHeartRate
      ? buildAdvancedInterpretation(
          maxHeartRate,
          formula,
          zones,
          options.trainingGoal
        )
      : buildSimpleInterpretation(maxHeartRate, formula),
    kpis,
    heartRateZones: zones,
    nextSteps: buildNextSteps(),
    actions: [
      {
        label: "Usar FC máxima na Calculadora de Pace",
        href: "/calculadora-pace",
        params: {
          maxHeartRate,
          age,
          ...(options?.restingHeartRate
            ? { restingHeartRate: options.restingHeartRate }
            : {}),
        },
      },
    ],
  };
}

export const fcMaximaEngine: CalculatorEngine = {
  calculateSimple(values) {
    const age = parseNumber(values.age);
    if (age === null) return null;

    return buildFcResult(age, parseFormula(values.formula));
  },

  calculateAdvanced(values) {
    const age = parseNumber(values.age);
    const restingHeartRate = parseNumber(values.restingHeartRate);

    if (age === null || restingHeartRate === null) return null;

    return buildFcResult(age, parseFormula(values.formula), {
      restingHeartRate,
      trainingGoal: parseTrainingGoal(values.trainingGoal),
      includeComparison: true,
    });
  },
};
