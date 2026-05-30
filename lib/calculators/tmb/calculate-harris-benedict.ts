import type { Sex } from "./calculate-mifflin";

export function calculateHarrisBenedictTmb(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  age: number
): number {
  if (sex === "male") {
    return (
      88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
    );
  }

  return 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
}
