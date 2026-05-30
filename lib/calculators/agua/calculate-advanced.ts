import {
  CAFFEINE_ML,
  CLIMATE_ML_PER_KG_BONUS,
  CUP_ML,
  HEAVY_SWEATING_ML,
  ML_PER_KG,
  ML_PER_WORKOUT_HOUR,
  SENIOR_ML_PER_KG,
  type AgeGroup,
  type ExerciseType,
} from "./constants";
import { getMlPerKg, type WaterResult } from "./calculate-simple";

export type WaterAdjustment = {
  label: string;
  ml: number;
};

export type AdvancedWaterResult = WaterResult & {
  adjustments: WaterAdjustment[];
  exerciseType?: ExerciseType;
  ageGroup: AgeGroup;
};

export type AdvancedWaterOptions = {
  workoutTime?: number;
  hotClimate?: boolean;
  highCaffeine?: boolean;
  heavySweating?: boolean;
  exerciseType?: ExerciseType;
  ageGroup?: AgeGroup;
};

export function calculateAdvancedWater(
  weightKg: number,
  options: AdvancedWaterOptions
): AdvancedWaterResult {
  const ageGroup = options.ageGroup ?? "adult";
  const adjustments: WaterAdjustment[] = [];

  let mlPerKg = getMlPerKg(ageGroup);

  if (ageGroup === "senior") {
    adjustments.push({
      label: "Faixa etária ≥60 anos (+5 ml/kg)",
      ml: weightKg * (SENIOR_ML_PER_KG - ML_PER_KG),
    });
  }

  if (options.hotClimate) {
    mlPerKg += CLIMATE_ML_PER_KG_BONUS;
    adjustments.push({
      label: "Clima tropical (+5 ml/kg na base)",
      ml: weightKg * CLIMATE_ML_PER_KG_BONUS,
    });
  }

  const baseMl = weightKg * mlPerKg;
  let totalMl = baseMl;

  const workoutTime = options.workoutTime ?? 0;
  if (workoutTime > 0) {
    const ml = workoutTime * ML_PER_WORKOUT_HOUR;
    adjustments.push({
      label: `Treino (${workoutTime} h)`,
      ml,
    });
    totalMl += ml;
  }

  if (options.highCaffeine) {
    adjustments.push({ label: "Alta cafeína", ml: CAFFEINE_ML });
    totalMl += CAFFEINE_ML;
  }

  if (options.heavySweating) {
    adjustments.push({ label: "Sudorese alta", ml: HEAVY_SWEATING_ML });
    totalMl += HEAVY_SWEATING_ML;
  }

  return {
    baseMl,
    totalMl,
    liters: totalMl / 1000,
    cups: Math.round(totalMl / CUP_ML),
    mlPerKg,
    adjustments,
    exerciseType: options.exerciseType,
    ageGroup,
  };
}
