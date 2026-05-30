import type { CalculatorEngine, CalculatorResult } from "./types";
import { buildUsNavyResult } from "../percentual-gordura/calculate-us-navy";
import { buildJacksonPollockResult } from "../percentual-gordura/calculate-jackson-pollock";
import { buildBodyFatClassification } from "../percentual-gordura/classify";
import { formatBodyFatPercent } from "../percentual-gordura/format";
import {
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../percentual-gordura/interpret";
import type { Sex } from "../tmb/calculate-mifflin";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseSex(value: unknown): Sex | null {
  if (value === "male" || value === "female") return value;
  return null;
}

function buildBodyFatCalculatorResult(
  result: NonNullable<ReturnType<typeof buildUsNavyResult>>,
  options: { weight: number; height?: number; age?: number }
): CalculatorResult {
  const roundedBodyFat = Math.round(result.bodyFatPercent * 10) / 10;
  const roundedLeanMass = Math.round(result.leanMassKg * 10) / 10;

  const actionParams: Record<string, string | number> = {
    leanMass: roundedLeanMass,
    bodyFat: roundedBodyFat,
    weight: options.weight,
    sex: result.sex,
  };
  if (options.height !== undefined) actionParams.height = options.height;
  if (options.age !== undefined) actionParams.age = options.age;
  else if (result.age !== undefined) actionParams.age = result.age;

  return {
    primaryValue: formatBodyFatPercent(roundedBodyFat),
    primaryUnit: "%",
    primaryLabel: "Percentual de gordura",
    classification: buildBodyFatClassification(
      roundedBodyFat,
      result.sex,
      options.age ?? result.age
    ),
    interpretation: buildInterpretation({ ...result, bodyFatPercent: roundedBodyFat }),
    kpis: buildKpis({ ...result, bodyFatPercent: roundedBodyFat }),
    nextSteps: buildNextSteps(),
    actions: [
      {
        label: "Usar massa magra na Calculadora de TMB",
        href: "/calculadora-tmb",
        params: actionParams,
      },
    ],
  };
}

export const percentualGorduraEngine: CalculatorEngine = {
  calculateSimple(values) {
    const sex = parseSex(values.sex);
    const height = parseNumber(values.height);
    const weight = parseNumber(values.weight);
    const waist = parseNumber(values.waist);
    const neck = parseNumber(values.neck);
    const hip = parseNumber(values.hip);

    if (sex === null || height === null || weight === null || waist === null || neck === null) {
      return null;
    }

    if (sex === "female" && hip === null) return null;

    const result = buildUsNavyResult({
      sex,
      heightCm: height,
      weightKg: weight,
      waistCm: waist,
      neckCm: neck,
      hipCm: hip ?? undefined,
    });

    if (!result) return null;

    return buildBodyFatCalculatorResult(result, { weight, height });
  },

  calculateAdvanced(values) {
    const sex = parseSex(values.sex);
    const age = parseNumber(values.age);
    const weight = parseNumber(values.weight);
    const thighSkinfold = parseNumber(values.thighSkinfold);

    if (sex === null || age === null || weight === null || thighSkinfold === null) {
      return null;
    }

    const result = buildJacksonPollockResult({
      sex,
      age,
      weightKg: weight,
      chestSkinfold: parseNumber(values.chestSkinfold) ?? undefined,
      abdomenSkinfold: parseNumber(values.abdomenSkinfold) ?? undefined,
      tricepsSkinfold: parseNumber(values.tricepsSkinfold) ?? undefined,
      suprailiacSkinfold: parseNumber(values.suprailiacSkinfold) ?? undefined,
      thighSkinfold,
    });

    if (!result) return null;

    return buildBodyFatCalculatorResult(result, { weight, age });
  },
};
