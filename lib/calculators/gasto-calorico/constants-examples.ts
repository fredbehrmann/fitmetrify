export const ACTIVITY_LEVEL_EXAMPLES: Record<
  string,
  { factor: string; example: string }
> = {
  sedentary: {
    factor: "1,2",
    example: "Trabalho de escritório, sem exercícios regulares",
  },
  light: {
    factor: "1,375",
    example: "1–2 treinos leves por semana; caminha bastante",
  },
  moderate: {
    factor: "1,55",
    example: "3–4 treinos por semana; trabalho com algum movimento",
  },
  active: {
    factor: "1,725",
    example: "5–6 treinos intensos por semana ou trabalho físico",
  },
  extreme: {
    factor: "1,9",
    example: "Atletas em preparação; 2× treino/dia; trabalho manual pesado",
  },
};

export function getActivityLevelHelpText(level: string): string | undefined {
  return ACTIVITY_LEVEL_EXAMPLES[level]?.example;
}
