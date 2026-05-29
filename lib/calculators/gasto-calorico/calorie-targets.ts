import {
  HYPERTROPHY_MULTIPLIER,
  WEIGHT_LOSS_MULTIPLIER,
} from "./constants";
import { formatKcal } from "./format";

export type CalorieTargets = {
  maintenance: number;
  weightLoss: number;
  hypertrophy: number;
  recommendedRange: string;
};

export function buildCalorieTargets(maintenanceGet: number): CalorieTargets {
  const weightLoss = Math.round(maintenanceGet * WEIGHT_LOSS_MULTIPLIER);
  const hypertrophy = Math.round(maintenanceGet * HYPERTROPHY_MULTIPLIER);

  return {
    maintenance: maintenanceGet,
    weightLoss,
    hypertrophy,
    recommendedRange: `${formatKcal(weightLoss)} – ${formatKcal(hypertrophy)} kcal/dia`,
  };
}
