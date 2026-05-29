export const KCAL_PER_KG_FAT = 7700;

export const DEFICIT_STRATEGY_PERCENT: Record<string, number> = {
  light: 0.1,
  moderate: 0.2,
  aggressive: 0.25,
};

export const MODERATE_DEFICIT_PERCENT = 0.2;

export const AGGRESSIVE_DEFICIT_PERCENT_THRESHOLD = 0.25;
export const AGGRESSIVE_DEFICIT_KCAL_THRESHOLD = 1000;

export const MIN_DAILY_CALORIES_BY_SEX: Record<string, number> = {
  male: 1500,
  female: 1200,
};

export type DeficitStrategy = keyof typeof DEFICIT_STRATEGY_PERCENT;
export type Sex = "male" | "female";
