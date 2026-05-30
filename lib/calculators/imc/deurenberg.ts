import type { Sex } from "../tmb/calculate-mifflin";

export function estimateBodyFatDeurenberg(
  bmi: number,
  age: number,
  sex: Sex
): number {
  const sexFactor = sex === "male" ? 1 : 0;
  const bodyFat = 1.2 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
  return Math.max(3, Math.min(60, bodyFat));
}

export function formatBodyFatPercent(value: number): string {
  return `${value.toFixed(1).replace(".", ",")}%`;
}
