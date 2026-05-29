import { DEFICIT_STRATEGY_PERCENT, KCAL_PER_KG_FAT } from "./constants";

export type SimpleDeficitResult = {
  targetCalories: number;
  dailyDeficit: number;
  weeklyDeficit: number;
  weeklyWeightLossKg: number;
  deficitPercent: number;
};

export function calculateSimpleDeficit(
  dailyExpenditure: number,
  strategy: keyof typeof DEFICIT_STRATEGY_PERCENT
): SimpleDeficitResult {
  const deficitPercent = DEFICIT_STRATEGY_PERCENT[strategy];
  const targetCalories = Math.round(dailyExpenditure * (1 - deficitPercent));
  const dailyDeficit = dailyExpenditure - targetCalories;
  const weeklyDeficit = dailyDeficit * 7;
  const weeklyWeightLossKg = weeklyDeficit / KCAL_PER_KG_FAT;

  return {
    targetCalories,
    dailyDeficit,
    weeklyDeficit,
    weeklyWeightLossKg,
    deficitPercent,
  };
}
