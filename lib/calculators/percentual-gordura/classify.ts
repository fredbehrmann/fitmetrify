import type { ResultClassification } from "@/lib/calculators/engines/types";
import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

import {
  BODY_FAT_CLASSIFICATION_LABELS,
  type BodyFatClassification,
} from "./constants";

type AgeBand = "20-39" | "40-59";

type ThresholdRow = {
  athletic: number;
  good: number;
  acceptable: number;
  overfat: number;
};

const MALE_THRESHOLDS: Record<AgeBand, ThresholdRow> = {
  "20-39": { athletic: 8, good: 16, acceptable: 20, overfat: 25 },
  "40-59": { athletic: 11, good: 17, acceptable: 22, overfat: 27 },
};

const FEMALE_THRESHOLDS: Record<AgeBand, ThresholdRow> = {
  "20-39": { athletic: 21, good: 27, acceptable: 31, overfat: 36 },
  "40-59": { athletic: 24, good: 30, acceptable: 35, overfat: 40 },
};

function resolveAgeBand(age?: number): AgeBand {
  if (age !== undefined && age >= 40) return "40-59";
  return "20-39";
}

export function classifyBodyFat(
  bodyFatPercent: number,
  sex: Sex,
  age?: number
): BodyFatClassification {
  const band = resolveAgeBand(age);
  const thresholds = sex === "male" ? MALE_THRESHOLDS[band] : FEMALE_THRESHOLDS[band];

  if (bodyFatPercent < thresholds.athletic) return "athletic";
  if (bodyFatPercent <= thresholds.good) return "good";
  if (bodyFatPercent <= thresholds.acceptable) return "acceptable";
  if (bodyFatPercent <= thresholds.overfat) return "overfat";
  return "obese";
}

export function buildBodyFatClassification(
  bodyFatPercent: number,
  sex: Sex,
  age?: number
): ResultClassification {
  const key = classifyBodyFat(bodyFatPercent, sex, age);
  const variant =
    key === "athletic" || key === "good"
      ? "success"
      : key === "acceptable"
        ? "default"
        : "warning";

  return {
    label: BODY_FAT_CLASSIFICATION_LABELS[key],
    variant,
  };
}
