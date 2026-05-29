import {
  CAFFEINE_ML,
  CUP_ML,
  HEAVY_SWEATING_ML,
  HOT_CLIMATE_ML,
  ML_PER_WORKOUT_HOUR,
  type ExerciseType,
} from "./constants";
import {
  calculateSimpleWater,
  type WaterResult,
} from "./calculate-simple";

export type WaterAdjustment = {
  label: string;
  ml: number;
};

export type AdvancedWaterResult = WaterResult & {
  adjustments: WaterAdjustment[];
  exerciseType?: ExerciseType;
};

export type AdvancedWaterOptions = {
  workoutTime?: number;
  hotClimate?: boolean;
  highCaffeine?: boolean;
  heavySweating?: boolean;
  exerciseType?: ExerciseType;
};

export function calculateAdvancedWater(
  weightKg: number,
  options: AdvancedWaterOptions
): AdvancedWaterResult {
  const base = calculateSimpleWater(weightKg);
  const adjustments: WaterAdjustment[] = [];
  let totalMl = base.baseMl;

  const workoutTime = options.workoutTime ?? 0;
  if (workoutTime > 0) {
    const ml = workoutTime * ML_PER_WORKOUT_HOUR;
    adjustments.push({
      label: `Treino (${workoutTime} h)`,
      ml,
    });
    totalMl += ml;
  }

  if (options.hotClimate) {
    adjustments.push({ label: "Clima quente", ml: HOT_CLIMATE_ML });
    totalMl += HOT_CLIMATE_ML;
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
    ...base,
    totalMl,
    liters: totalMl / 1000,
    cups: Math.round(totalMl / CUP_ML),
    adjustments,
    exerciseType: options.exerciseType,
  };
}
