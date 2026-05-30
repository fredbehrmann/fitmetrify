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
  { value: "2", label: "2 refeições" },
  { value: "3", label: "3 refeições" },
  { value: "4", label: "4 refeições" },
  { value: "5", label: "5 refeições" },
  { value: "6", label: "6 refeições" },
] as const;

export const BIOTYPE_OPTIONS = [
  { value: "ectomorph", label: "Ectomorfo" },
  { value: "mesomorph", label: "Mesomorfo" },
  { value: "endomorph", label: "Endomorfo" },
] as const;

export const TRAINING_TIME_OPTIONS = [
  { value: "morning", label: "Manhã" },
  { value: "afternoon", label: "Tarde" },
  { value: "evening", label: "Noite" },
  { value: "none", label: "Não treino" },
] as const;

export const MEAL_PROTOCOL_OPTIONS = [
  { value: "uniform", label: "Distribuição uniforme" },
  { value: "pre-workout", label: "Pré-treino maior" },
  { value: "post-workout", label: "Pós-treino maior" },
  { value: "fasting-16-8", label: "Jejum 16:8" },
  { value: "fasting-18-6", label: "Jejum 18:6" },
] as const;

export const MAIN_MEAL_OPTIONS = [
  { value: "breakfast", label: "Café da manhã" },
  { value: "lunch", label: "Almoço" },
  { value: "dinner", label: "Jantar" },
] as const;

export const MACRO_INPUT_MODE_OPTIONS = [
  { value: "percent", label: "Por percentual (%)" },
  { value: "gramsPerKg", label: "Por gramas/kg (musculação)" },
] as const;

export const EXERCISE_OPTIONS = [
  { value: "bench-press", label: "Supino Reto" },
  { value: "incline-bench", label: "Supino Inclinado" },
  { value: "overhead-press", label: "Desenvolvimento" },
  { value: "squat", label: "Agachamento Livre" },
  { value: "deadlift", label: "Terra" },
  { value: "row", label: "Remada" },
  { value: "pull-up", label: "Barra Fixa" },
  { value: "leg-press", label: "Leg Press" },
  { value: "curl", label: "Rosca Direta" },
  { value: "other", label: "Outro" },
] as const;

export const ZONE_INPUT_MODE_OPTIONS = [
  { value: "percent", label: "Percentual do 1RM" },
  { value: "rpe", label: "RPE (1–10)" },
] as const;

export const MAX_HR_FORMULA_OPTIONS = [
  { value: "tanaka", label: "Tanaka (2001) — recomendada" },
  { value: "fox", label: "Fox (1971) — clássica" },
  { value: "gellish", label: "Gellish (2007) — treinados" },
] as const;

export const FITNESS_LEVEL_OPTIONS = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" },
  { value: "athlete", label: "Atleta" },
] as const;

export const HR_TRAINING_GOAL_OPTIONS = [
  { value: "fat-burn", label: "Queima de gordura" },
  { value: "aerobic", label: "Aeróbico" },
  { value: "threshold", label: "Limiar anaeróbico" },
  { value: "vo2max", label: "VO2max" },
] as const;
