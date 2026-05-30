import type { MaxHrFormula } from "./constants";

export function calculateTanakaMaxHr(age: number): number {
  return Math.round(208 - 0.7 * age);
}

export function calculateFoxMaxHr(age: number): number {
  return Math.round(220 - age);
}

export function calculateGellishMaxHr(age: number): number {
  return Math.round(207 - 0.7 * age);
}

export function calculateMaxHeartRate(formula: MaxHrFormula, age: number): number {
  switch (formula) {
    case "fox":
      return calculateFoxMaxHr(age);
    case "gellish":
      return calculateGellishMaxHr(age);
    case "tanaka":
    default:
      return calculateTanakaMaxHr(age);
  }
}

export function calculateAllMaxHrFormulas(age: number): Record<MaxHrFormula, number> {
  return {
    tanaka: calculateTanakaMaxHr(age),
    fox: calculateFoxMaxHr(age),
    gellish: calculateGellishMaxHr(age),
  };
}
