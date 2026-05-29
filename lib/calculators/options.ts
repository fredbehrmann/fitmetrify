export const SEX_OPTIONS = [
  { value: "male", label: "Homem" },
  { value: "female", label: "Mulher" },
] as const;

export const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentário (1,2)" },
  { value: "light", label: "Levemente ativo (1,375)" },
  { value: "moderate", label: "Moderadamente ativo (1,55)" },
  { value: "active", label: "Muito ativo (1,725)" },
  { value: "extreme", label: "Extremamente ativo (1,9)" },
] as const;

export const GOAL_OPTIONS = [
  { value: "lose", label: "Emagrecer" },
  { value: "maintain", label: "Manter peso" },
  { value: "gain", label: "Ganhar massa" },
] as const;

export const DEFICIT_STRATEGY_OPTIONS = [
  { value: "light", label: "Leve (10% de déficit)" },
  { value: "moderate", label: "Moderado (20% de déficit)" },
  { value: "aggressive", label: "Agressivo (25% de déficit)" },
] as const;

export const PROTEIN_GOAL_OPTIONS = [
  { value: "general", label: "Sedentário / saúde geral" },
  { value: "weight-loss", label: "Emagrecimento" },
  { value: "hypertrophy", label: "Hipertrofia" },
  { value: "athlete", label: "Atleta / treino intenso" },
] as const;

export const WORK_TYPE_OPTIONS = [
  { value: "sedentary", label: "Trabalho sentado" },
  { value: "standing", label: "Trabalho em pé" },
  { value: "physical", label: "Trabalho físico" },
] as const;

export const ONE_RM_METHOD_OPTIONS = [
  { value: "brzycki", label: "Brzycki" },
  { value: "epley", label: "Epley" },
  { value: "lombardi", label: "Lombardi" },
  { value: "average", label: "Média dos métodos" },
] as const;

export const TRAINING_TYPE_OPTIONS = [
  { value: "strength", label: "Musculação" },
  { value: "cardio", label: "Cardio" },
  { value: "mixed", label: "Misto" },
] as const;

export const RACE_TYPE_OPTIONS = [
  { value: "5k", label: "5 km" },
  { value: "10k", label: "10 km" },
  { value: "half", label: "Meia maratona" },
  { value: "marathon", label: "Maratona" },
] as const;

export const RUNNER_EXPERIENCE_OPTIONS = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
] as const;

export const MEAL_COUNT_OPTIONS = [
  { value: "3", label: "3 refeições" },
  { value: "4", label: "4 refeições" },
  { value: "5", label: "5 refeições" },
  { value: "6", label: "6 refeições" },
] as const;
