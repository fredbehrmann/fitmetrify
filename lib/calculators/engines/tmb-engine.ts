import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateMifflinTmb, type Sex } from "../tmb/calculate-mifflin";
import {
  calculateKatchMcArdleTmb,
  estimateLeanMassFromBodyFat,
} from "../tmb/calculate-lean-mass";
import { formatTmb } from "../tmb/format";
import {
  buildFormulaKpis,
  buildInterpretation,
  buildNextSteps,
  type TmbFormulaUsed,
} from "../tmb/interpret";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function extractMifflinInputs(values: Record<string, unknown>): {
  sex: Sex;
  weight: number;
  height: number;
  age: number;
} | null {
  const sex = parseSex(values.sex);
  const weight = parseNumber(values.weight);
  const height = parseNumber(values.height);
  const age = parseNumber(values.age);

  if (sex === null || weight === null || height === null || age === null) {
    return null;
  }

  return { sex, weight, height, age };
}

function buildTmbResult(
  tmb: number,
  formula: TmbFormulaUsed,
  estimatedLeanMassKg?: number
): CalculatorResult {
  return {
    primaryValue: formatTmb(tmb),
    primaryUnit: "kcal/dia",
    primaryLabel: "Sua TMB estimada",
    classification: {
      label: "Taxa metabólica basal",
      variant: "default",
    },
    interpretation: buildInterpretation(tmb),
    kpis: buildFormulaKpis(formula, estimatedLeanMassKg),
    nextSteps: buildNextSteps(),
  };
}

function resolveAdvancedTmb(values: Record<string, unknown>): {
  tmb: number;
  formula: TmbFormulaUsed;
  estimatedLeanMassKg?: number;
} | null {
  const leanMass = parseNumber(values.leanMass);
  const bodyFat = parseNumber(values.bodyFat);
  const weight = parseNumber(values.weight);

  if (leanMass !== null && leanMass > 0) {
    return {
      tmb: calculateKatchMcArdleTmb(leanMass),
      formula: "lean-mass",
      estimatedLeanMassKg: leanMass,
    };
  }

  if (bodyFat !== null && weight !== null) {
    const estimatedLeanMass = estimateLeanMassFromBodyFat(weight, bodyFat);
    return {
      tmb: calculateKatchMcArdleTmb(estimatedLeanMass),
      formula: "lean-mass",
      estimatedLeanMassKg: estimatedLeanMass,
    };
  }

  const mifflin = extractMifflinInputs(values);
  if (!mifflin) return null;

  return {
    tmb: calculateMifflinTmb(
      mifflin.sex,
      mifflin.weight,
      mifflin.height,
      mifflin.age
    ),
    formula: "mifflin",
  };
}

export const tmbEngine: CalculatorEngine = {
  calculateSimple(values) {
    const mifflin = extractMifflinInputs(values);
    if (!mifflin) return null;

    const tmb = calculateMifflinTmb(
      mifflin.sex,
      mifflin.weight,
      mifflin.height,
      mifflin.age
    );

    return buildTmbResult(tmb, "mifflin");
  },

  calculateAdvanced(values) {
    const resolved = resolveAdvancedTmb(values);
    if (!resolved) return null;

    return buildTmbResult(
      resolved.tmb,
      resolved.formula,
      resolved.estimatedLeanMassKg
    );
  },
};
