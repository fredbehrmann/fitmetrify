import {
  KCAL_PER_G_CARBS,
  KCAL_PER_G_FAT,
  KCAL_PER_G_PROTEIN,
  MACRO_SPLITS_BY_GOAL,
  type MacroGoal,
} from "./constants";

export type MacroProfile = {
  proteinG: number;
  carbsG: number;
  fatG: number;
  proteinKcal: number;
  carbsKcal: number;
  fatKcal: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
  totalCalories: number;
};

function buildProfileFromGrams(
  proteinG: number,
  carbsG: number,
  fatG: number
): MacroProfile {
  const proteinKcal = proteinG * KCAL_PER_G_PROTEIN;
  const carbsKcal = carbsG * KCAL_PER_G_CARBS;
  const fatKcal = fatG * KCAL_PER_G_FAT;
  const totalCalories = proteinKcal + carbsKcal + fatKcal;

  return {
    proteinG,
    carbsG,
    fatG,
    proteinKcal,
    carbsKcal,
    fatKcal,
    proteinPercent: totalCalories > 0 ? (proteinKcal / totalCalories) * 100 : 0,
    carbsPercent: totalCalories > 0 ? (carbsKcal / totalCalories) * 100 : 0,
    fatPercent: totalCalories > 0 ? (fatKcal / totalCalories) * 100 : 0,
    totalCalories,
  };
}

export function calculateSimpleMacros(
  calories: number,
  goal: MacroGoal
): MacroProfile {
  const split = MACRO_SPLITS_BY_GOAL[goal];
  const proteinG = Math.round((calories * split.protein) / KCAL_PER_G_PROTEIN);
  const fatG = Math.round((calories * split.fat) / KCAL_PER_G_FAT);
  const carbsG = Math.round((calories * split.carbs) / KCAL_PER_G_CARBS);

  return buildProfileFromGrams(proteinG, carbsG, fatG);
}

export { buildProfileFromGrams };
