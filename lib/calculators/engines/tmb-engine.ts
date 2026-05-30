import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculateMifflinTmb, type Sex } from "../tmb/calculate-mifflin";
import { calculateHarrisBenedictTmb } from "../tmb/calculate-harris-benedict";
import {
  calculateKatchMcArdleTmb,
  estimateLeanMassFromBodyFat,
} from "../tmb/calculate-lean-mass";
import { formatTmb } from "../tmb/format";
import {
  buildComparisonKpis,
  buildFormulaKpis,
  buildHourlyKpi,
  buildInterpretation,
  buildNextSteps,
  type TmbComparison,
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

function buildComparison(values: Record<string, unknown>): TmbComparison | null {
  const mifflin = extractMifflinInputs(values);
  if (!mifflin) return null;

  const comparison: TmbComparison = {
    mifflin: calculateMifflinTmb(
      mifflin.sex,
      mifflin.weight,
      mifflin.height,
      mifflin.age
    ),
    harrisBenedict: calculateHarrisBenedictTmb(
      mifflin.sex,
      mifflin.weight,
      mifflin.height,
      mifflin.age
    ),
  };

  const leanMass = parseNumber(values.leanMass);
  const bodyFat = parseNumber(values.bodyFat);

  if (leanMass !== null && leanMass > 0) {
    comparison.leanMassKg = leanMass;
    comparison.katchMcArdle = calculateKatchMcArdleTmb(leanMass);
  } else if (bodyFat !== null) {
    const estimated = estimateLeanMassFromBodyFat(mifflin.weight, bodyFat);
    comparison.leanMassKg = estimated;
    comparison.katchMcArdle = calculateKatchMcArdleTmb(estimated);
  }

  return comparison;
}

function buildTmbResult(
  tmb: number,
  formula: TmbFormulaUsed,
  options?: {
    sex?: string;
    comparison?: TmbComparison;
    estimatedLeanMassKg?: number;
  }
): CalculatorResult {
  const kpis = [
    buildHourlyKpi(tmb),
    ...buildFormulaKpis(formula, options?.estimatedLeanMassKg),
  ];

  if (options?.comparison) {
    kpis.push(...buildComparisonKpis(options.comparison));
  }

  return {
    primaryValue: formatTmb(tmb),
    primaryUnit: "kcal/dia",
    primaryLabel: "Sua TMB estimada",
    classification: {
      label: "Taxa metabólica basal",
      variant: "default",
    },
    interpretation: buildInterpretation(tmb, {
      sex: options?.sex,
      showMenstrualNote: true,
    }),
    kpis,
    nextSteps: buildNextSteps(),
    actions: [
      {
        label: "Calcular meu Gasto Calórico",
        href: "/calculadora-gasto-calorico",
        params: { tmb: Math.round(tmb) },
      },
    ],
  };
}

function resolveAdvancedTmb(values: Record<string, unknown>): {
  tmb: number;
  formula: TmbFormulaUsed;
  estimatedLeanMassKg?: number;
  sex?: string;
  comparison?: TmbComparison;
} | null {
  const comparison = buildComparison(values);
  if (!comparison?.mifflin) return null;

  const leanMass = parseNumber(values.leanMass);
  const bodyFat = parseNumber(values.bodyFat);
  const mifflinInputs = extractMifflinInputs(values);

  if (leanMass !== null && leanMass > 0) {
    return {
      tmb: calculateKatchMcArdleTmb(leanMass),
      formula: "lean-mass",
      estimatedLeanMassKg: leanMass,
      sex: mifflinInputs?.sex,
      comparison,
    };
  }

  if (bodyFat !== null && mifflinInputs) {
    const estimatedLeanMass = estimateLeanMassFromBodyFat(
      mifflinInputs.weight,
      bodyFat
    );
    return {
      tmb: calculateKatchMcArdleTmb(estimatedLeanMass),
      formula: "lean-mass",
      estimatedLeanMassKg: estimatedLeanMass,
      sex: mifflinInputs.sex,
      comparison,
    };
  }

  return {
    tmb: comparison.mifflin,
    formula: "mifflin",
    sex: mifflinInputs?.sex,
    comparison,
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

    return buildTmbResult(tmb, "mifflin", { sex: mifflin.sex });
  },

  calculateAdvanced(values) {
    const resolved = resolveAdvancedTmb(values);
    if (!resolved) return null;

    return buildTmbResult(resolved.tmb, resolved.formula, {
      sex: resolved.sex,
      comparison: resolved.comparison,
      estimatedLeanMassKg: resolved.estimatedLeanMassKg,
    });
  },
};
