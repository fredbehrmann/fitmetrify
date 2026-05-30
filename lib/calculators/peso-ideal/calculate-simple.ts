import type { Sex } from "./constants";
import {
  calculateAllFormulas,
  calculateCentralWeight,
  type FormulaResult,
} from "./formulas";

export type SimplePesoIdealResult = {
  heightCm: number;
  sex: Sex;
  formulas: FormulaResult;
  centralWeight: number;
};

export function calculateSimplePesoIdeal(
  heightCm: number,
  sex: Sex
): SimplePesoIdealResult {
  const formulas = calculateAllFormulas(heightCm, sex);
  const centralWeight = calculateCentralWeight(formulas);

  return {
    heightCm,
    sex,
    formulas,
    centralWeight,
  };
}
