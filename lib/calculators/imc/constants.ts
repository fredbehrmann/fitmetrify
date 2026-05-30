import type { ScaleSegment } from "@/lib/calculators/engines/types";

export const IMC_SCALE_MIN = 15;
export const IMC_SCALE_MAX = 45;
export const ELDERLY_AGE_THRESHOLD = 60;

export const IMC_THRESHOLDS_ADULT = {
  underweight: 18.5,
  normal: 25,
  overweight: 30,
  obesity1: 35,
  obesity2: 40,
} as const;

export const IMC_THRESHOLDS_ELDERLY = {
  underweight: 22,
  normal: 27,
  overweight: 30,
  obesity1: 35,
  obesity2: 40,
} as const;

/** @deprecated use IMC_THRESHOLDS_ADULT */
export const IMC_THRESHOLDS = IMC_THRESHOLDS_ADULT;

export const IMC_SCALE_SEGMENTS: ScaleSegment[] = [
  {
    label: "Abaixo",
    min: IMC_SCALE_MIN,
    max: IMC_THRESHOLDS_ADULT.underweight,
    color: "rgba(96, 165, 250, 0.5)",
  },
  {
    label: "Normal",
    min: IMC_THRESHOLDS_ADULT.underweight,
    max: IMC_THRESHOLDS_ADULT.normal,
    color: "rgba(124, 255, 77, 0.5)",
  },
  {
    label: "Sobrepeso",
    min: IMC_THRESHOLDS_ADULT.normal,
    max: IMC_THRESHOLDS_ADULT.overweight,
    color: "rgba(250, 204, 21, 0.5)",
  },
  {
    label: "Obes. I",
    min: IMC_THRESHOLDS_ADULT.overweight,
    max: IMC_THRESHOLDS_ADULT.obesity1,
    color: "rgba(251, 146, 60, 0.5)",
  },
  {
    label: "Obes. II",
    min: IMC_THRESHOLDS_ADULT.obesity1,
    max: IMC_THRESHOLDS_ADULT.obesity2,
    color: "rgba(248, 113, 113, 0.5)",
  },
  {
    label: "Obes. III",
    min: IMC_THRESHOLDS_ADULT.obesity2,
    max: IMC_SCALE_MAX,
    color: "rgba(239, 68, 68, 0.6)",
  },
];

export type ImcThresholdSet = {
  readonly underweight: number;
  readonly normal: number;
  readonly overweight: number;
  readonly obesity1: number;
  readonly obesity2: number;
};

export function getImcThresholds(age?: number): ImcThresholdSet {
  if (age !== undefined && age >= ELDERLY_AGE_THRESHOLD) {
    return IMC_THRESHOLDS_ELDERLY;
  }
  return IMC_THRESHOLDS_ADULT;
}
