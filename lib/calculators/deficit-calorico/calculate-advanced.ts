import {
  KCAL_PER_KG_FAT,
  MODERATE_DEFICIT_PERCENT,
} from "./constants";

export type AdvancedDeficitResult = {
  targetCalories: number;
  dailyDeficit: number;
  weeklyDeficit: number;
  weeklyWeightLossKg: number;
  deficitPercent: number;
  kgToLose: number;
  realisticWeeks: number;
  requestedWeeks: number;
};

export function calculateAdvancedDeficit(
  dailyExpenditure: number,
  currentWeight: number,
  targetWeight: number,
  deadlineWeeks: number
): AdvancedDeficitResult | null {
  const kgToLose = currentWeight - targetWeight;
  if (kgToLose <= 0) return null;

  const totalDeficitKcal = kgToLose * KCAL_PER_KG_FAT;
  const dailyDeficit = totalDeficitKcal / (deadlineWeeks * 7);
  const targetCalories = Math.round(dailyExpenditure - dailyDeficit);
  const weeklyDeficit = dailyDeficit * 7;
  const weeklyWeightLossKg = weeklyDeficit / KCAL_PER_KG_FAT;
  const deficitPercent = dailyDeficit / dailyExpenditure;

  const moderateWeeklyDeficit = dailyExpenditure * MODERATE_DEFICIT_PERCENT * 7;
  const realisticWeeks = Math.ceil(totalDeficitKcal / moderateWeeklyDeficit);

  return {
    targetCalories,
    dailyDeficit,
    weeklyDeficit,
    weeklyWeightLossKg,
    deficitPercent,
    kgToLose,
    realisticWeeks,
    requestedWeeks: deadlineWeeks,
  };
}
