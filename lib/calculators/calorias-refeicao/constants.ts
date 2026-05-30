export type MealProtocol =
  | "uniform"
  | "pre-workout"
  | "post-workout"
  | "fasting-16-8"
  | "fasting-18-6";

export type TrainingTime = "morning" | "afternoon" | "evening" | "none";

export type MainMeal = "breakfast" | "lunch" | "dinner";

export const MEAL_PROTOCOL_LABELS: Record<MealProtocol, string> = {
  uniform: "Distribuição uniforme",
  "pre-workout": "Pré-treino maior",
  "post-workout": "Pós-treino maior",
  "fasting-16-8": "Jejum 16:8",
  "fasting-18-6": "Jejum 18:6",
};

export const TRAINING_TIME_LABELS: Record<TrainingTime, string> = {
  morning: "Manhã",
  afternoon: "Tarde",
  evening: "Noite",
  none: "Não treino",
};

export const MAIN_MEAL_LABELS: Record<MainMeal, string> = {
  breakfast: "Café da manhã",
  lunch: "Almoço",
  dinner: "Jantar",
};

/** Percent boost for pre/post workout meal (+30%). */
export const WORKOUT_MEAL_BOOST = 1.3;

export const FASTING_16_8_PERCENTAGES = [25, 40, 35] as const;

export const PROTEIN_CALORIE_SHARE_MIN = 0.25;
export const PROTEIN_CALORIE_SHARE_MAX = 0.3;
export const PROTEIN_KCAL_PER_GRAM = 4;
export const MIN_PROTEIN_GRAMS_PER_MEAL = 25;

export const MEAL_NAMES_BY_COUNT: Record<number, string[]> = {
  2: ["Café da manhã", "Jantar"],
  3: ["Café da manhã", "Almoço", "Jantar"],
  4: ["Café da manhã", "Lanche da manhã", "Almoço", "Jantar"],
  5: [
    "Café da manhã",
    "Lanche da manhã",
    "Almoço",
    "Lanche da tarde",
    "Jantar",
  ],
  6: [
    "Café da manhã",
    "Lanche da manhã",
    "Almoço",
    "Lanche da tarde",
    "Jantar",
    "Ceia",
  ],
};
