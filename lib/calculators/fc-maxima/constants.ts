export type MaxHrFormula = "tanaka" | "fox" | "gellish";

export type FitnessLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "athlete";

export type TrainingGoal =
  | "fat-burn"
  | "aerobic"
  | "threshold"
  | "vo2max";

export type HeartRateZone = {
  id: number;
  label: string;
  minPercent: number;
  maxPercent: number;
  minBpm: number;
  maxBpm: number;
  benefit: string;
  timeRecommendation?: string;
};

export const MAX_HR_FORMULA_LABELS: Record<MaxHrFormula, string> = {
  tanaka: "Tanaka (2001)",
  fox: "Fox (1971)",
  gellish: "Gellish (2007)",
};

export const HEART_RATE_ZONES_META = [
  {
    id: 1,
    label: "Zona 1 — Recuperação",
    minPercent: 50,
    maxPercent: 60,
    benefit: "Recuperação ativa e base aeróbica leve.",
  },
  {
    id: 2,
    label: "Zona 2 — Aeróbico base",
    minPercent: 60,
    maxPercent: 70,
    benefit: "Melhora capacidade aeróbica e oxidação de gordura.",
  },
  {
    id: 3,
    label: "Zona 3 — Aeróbico intenso",
    minPercent: 70,
    maxPercent: 80,
    benefit: "Resistência cardiovascular moderada a alta.",
  },
  {
    id: 4,
    label: "Zona 4 — Limiar anaeróbico",
    minPercent: 80,
    maxPercent: 90,
    benefit: "Limiar anaeróbico e tolerância ao lactato.",
  },
  {
    id: 5,
    label: "Zona 5 — VO2max",
    minPercent: 90,
    maxPercent: 100,
    benefit: "Potência aeróbica máxima — use com moderação.",
  },
] as const;

export const TRAINING_PYRAMID_NOTE =
  "Pirâmide de treinamento: cerca de 80% do volume abaixo do limiar anaeróbico (zonas 1–3) e 20% acima (zonas 4–5).";
