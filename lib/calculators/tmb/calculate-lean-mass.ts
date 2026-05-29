export function estimateLeanMassFromBodyFat(
  weightKg: number,
  bodyFatPercent: number
): number {
  return weightKg * (1 - bodyFatPercent / 100);
}

export function calculateKatchMcArdleTmb(leanMassKg: number): number {
  return Math.round(370 + 21.6 * leanMassKg);
}
