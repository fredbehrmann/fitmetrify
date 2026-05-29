import { TRAINING_CARB_BOOST } from "./constants";
import {
  buildProfileFromGrams,
  type MacroProfile,
} from "./calculate-simple";

export type AdvancedMacroResult = {
  training: MacroProfile;
  rest: MacroProfile;
  hasCycling: boolean;
  baseCarbG: number;
};

export function calculateAdvancedMacros(
  weightKg: number,
  calories: number,
  proteinPerKg: number,
  fatMinPerKg: number,
  options: { adjustCarbs?: boolean; trainingDays?: number }
): AdvancedMacroResult | null {
  const proteinG = Math.round(weightKg * proteinPerKg);
  const fatG = Math.round(weightKg * fatMinPerKg);
  const fixedKcal = proteinG * 4 + fatG * 9;

  if (fixedKcal >= calories) {
    return null;
  }

  const remainingKcal = calories - fixedKcal;
  const baseCarbG = remainingKcal / 4;

  const trainingDays = options.trainingDays ?? 0;
  const shouldCycle =
    options.adjustCarbs === true &&
    trainingDays > 0 &&
    trainingDays < 7;

  if (!shouldCycle) {
    const profile = buildProfileFromGrams(
      proteinG,
      Math.round(baseCarbG),
      fatG
    );
    return {
      training: profile,
      rest: profile,
      hasCycling: false,
      baseCarbG,
    };
  }

  const carbTreino = baseCarbG * TRAINING_CARB_BOOST;
  const restDays = 7 - trainingDays;
  const carbDescanso =
    (7 * baseCarbG - trainingDays * carbTreino) / restDays;

  return {
    training: buildProfileFromGrams(
      proteinG,
      Math.round(carbTreino),
      fatG
    ),
    rest: buildProfileFromGrams(
      proteinG,
      Math.round(carbDescanso),
      fatG
    ),
    hasCycling: true,
    baseCarbG,
  };
}
