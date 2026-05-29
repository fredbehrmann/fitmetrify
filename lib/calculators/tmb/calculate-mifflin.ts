export type Sex = "male" | "female";

export function calculateMifflinTmb(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  age: number
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const tmb = sex === "male" ? base + 5 : base - 161;
  return Math.round(tmb);
}
