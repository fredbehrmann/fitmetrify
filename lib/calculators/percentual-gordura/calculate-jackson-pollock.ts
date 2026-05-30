import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

import type { BodyFatResult } from "./constants";

export type JacksonPollockInput = {
  sex: Sex;
  age: number;
  weightKg: number;
  chestSkinfold?: number;
  abdomenSkinfold?: number;
  tricepsSkinfold?: number;
  suprailiacSkinfold?: number;
  thighSkinfold: number;
};

function calculateDensity(input: JacksonPollockInput): number | null {
  const { sex, age } = input;

  if (sex === "male") {
    const chest = input.chestSkinfold;
    const abdomen = input.abdomenSkinfold;
    const thigh = input.thighSkinfold;
    if (
      chest === undefined ||
      abdomen === undefined ||
      thigh === undefined
    ) {
      return null;
    }
    const sum = chest + abdomen + thigh;
    return (
      1.10938 -
      0.0008267 * sum +
      0.0000016 * sum * sum -
      0.0002574 * age
    );
  }

  const triceps = input.tricepsSkinfold;
  const suprailiac = input.suprailiacSkinfold;
  const thigh = input.thighSkinfold;
  if (
    triceps === undefined ||
    suprailiac === undefined ||
    thigh === undefined
  ) {
    return null;
  }
  const sum = triceps + suprailiac + thigh;
  return (
    1.0994921 -
    0.0009929 * sum +
    0.0000023 * sum * sum -
    0.0001392 * age
  );
}

export function bodyFatFromDensity(density: number): number {
  return ((4.95 / density - 4.5) * 100);
}

export function calculateJacksonPollockBodyFat(
  input: JacksonPollockInput
): number | null {
  const density = calculateDensity(input);
  if (density === null || density <= 0) return null;
  return Math.max(2, Math.min(60, bodyFatFromDensity(density)));
}

export function buildJacksonPollockResult(
  input: JacksonPollockInput
): BodyFatResult | null {
  const bodyFatPercent = calculateJacksonPollockBodyFat(input);
  if (bodyFatPercent === null) return null;

  const fatMassKg = (input.weightKg * bodyFatPercent) / 100;
  const leanMassKg = input.weightKg - fatMassKg;

  return {
    bodyFatPercent,
    fatMassKg,
    leanMassKg,
    method: "jackson-pollock",
    sex: input.sex,
    age: input.age,
  };
}
