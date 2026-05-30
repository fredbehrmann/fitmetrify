import { BMI_MAX, BMI_MIN, type Sex } from "./constants";

export type FormulaResult = {
  devine: number;
  robinson: number;
  miller: number;
  omsMin: number;
  omsMax: number;
  omsCenter: number;
};

export function heightInchesFromCm(heightCm: number): number {
  return heightCm / 2.54;
}

export function calculateDevine(heightInches: number, sex: Sex): number {
  const inchesOver60 = heightInches - 60;
  if (sex === "male") {
    return 50 + 2.3 * inchesOver60;
  }
  return 45.5 + 2.3 * inchesOver60;
}

export function calculateRobinson(heightInches: number, sex: Sex): number {
  const inchesOver60 = heightInches - 60;
  if (sex === "male") {
    return 52 + 1.9 * inchesOver60;
  }
  return 49 + 1.7 * inchesOver60;
}

export function calculateMiller(heightInches: number, sex: Sex): number {
  const inchesOver60 = heightInches - 60;
  if (sex === "male") {
    return 56.2 + 1.41 * inchesOver60;
  }
  return 53.1 + 1.36 * inchesOver60;
}

export function calculateOmsRange(heightCm: number): {
  min: number;
  max: number;
  center: number;
} {
  const heightM = heightCm / 100;
  const min = BMI_MIN * heightM * heightM;
  const max = BMI_MAX * heightM * heightM;
  return { min, max, center: (min + max) / 2 };
}

export function calculateAllFormulas(
  heightCm: number,
  sex: Sex
): FormulaResult {
  const heightInches = heightInchesFromCm(heightCm);
  const oms = calculateOmsRange(heightCm);

  return {
    devine: calculateDevine(heightInches, sex),
    robinson: calculateRobinson(heightInches, sex),
    miller: calculateMiller(heightInches, sex),
    omsMin: oms.min,
    omsMax: oms.max,
    omsCenter: oms.center,
  };
}

export function calculateCentralWeight(formulas: FormulaResult): number {
  return (
    (formulas.omsCenter +
      formulas.devine +
      formulas.robinson +
      formulas.miller) /
    4
  );
}
