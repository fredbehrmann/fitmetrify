export type MacroGoal = "lose" | "maintain" | "gain";

export type MacroSplitPercent = {
  protein: number;
  fat: number;
  carbs: number;
};

export const MACRO_SPLITS_BY_GOAL: Record<MacroGoal, MacroSplitPercent> = {
  lose: { protein: 0.3, fat: 0.25, carbs: 0.45 },
  maintain: { protein: 0.25, fat: 0.25, carbs: 0.5 },
  gain: { protein: 0.25, fat: 0.2, carbs: 0.55 },
};

export const KCAL_PER_G_PROTEIN = 4;
export const KCAL_PER_G_CARBS = 4;
export const KCAL_PER_G_FAT = 9;

export const TRAINING_CARB_BOOST = 1.2;

export const CHART_COLORS = {
  protein: "#7CFF4D",
  carbs: "#3B82F6",
  fat: "#E5E7EB",
} as const;

export const GOAL_CLASSIFICATION_LABELS: Record<MacroGoal, string> = {
  lose: "Emagrecimento",
  maintain: "Manutenção",
  gain: "Hipertrofia",
};
