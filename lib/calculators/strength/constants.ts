export type TrainingZone = {
  id: string;
  label: string;
  minPercent: number;
  maxPercent: number;
  repsLabel: string;
};

export const TRAINING_ZONES: TrainingZone[] = [
  {
    id: "endurance",
    label: "Resistência muscular",
    minPercent: 50,
    maxPercent: 60,
    repsLabel: "15–20+",
  },
  {
    id: "hypertrophy-moderate",
    label: "Hipertrofia moderada",
    minPercent: 60,
    maxPercent: 70,
    repsLabel: "12–15",
  },
  {
    id: "hypertrophy-main",
    label: "Hipertrofia principal",
    minPercent: 70,
    maxPercent: 80,
    repsLabel: "8–12",
  },
  {
    id: "strength-hypertrophy",
    label: "Força-hipertrofia",
    minPercent: 80,
    maxPercent: 85,
    repsLabel: "5–8",
  },
  {
    id: "max-strength",
    label: "Força máxima",
    minPercent: 85,
    maxPercent: 95,
    repsLabel: "2–5",
  },
  {
    id: "power",
    label: "Potência / Teste",
    minPercent: 95,
    maxPercent: 100,
    repsLabel: "1–2",
  },
];

/** @deprecated use TRAINING_ZONES */
export const TRAINING_ZONE_PERCENTS = [90, 80, 70, 60] as const;

export type TrainingZonePercent = (typeof TRAINING_ZONE_PERCENTS)[number];

export const ZONE_LABELS: Record<TrainingZonePercent, string> = {
  90: "Força",
  80: "Força / hipertrofia",
  70: "Hipertrofia",
  60: "Resistência",
};

export type OneRmMethod = "brzycki" | "epley" | "lombardi" | "average";

export const ONE_RM_METHOD_LABELS: Record<OneRmMethod, string> = {
  brzycki: "Brzycki",
  epley: "Epley",
  lombardi: "Lombardi",
  average: "Média dos métodos",
};

export const RPE_TO_PERCENT: Record<number, number> = {
  10: 100,
  9.5: 97,
  9: 95,
  8.5: 92,
  8: 90,
  7.5: 87,
  7: 85,
  6.5: 82,
  6: 80,
  5.5: 77,
  5: 75,
};

export type StrengthTier =
  | "weak"
  | "below-average"
  | "average"
  | "above-average"
  | "elite";

export const STRENGTH_TIER_LABELS: Record<StrengthTier, string> = {
  weak: "Fraco",
  "below-average": "Abaixo da média",
  average: "Médio",
  "above-average": "Acima da média",
  elite: "Elite",
};
