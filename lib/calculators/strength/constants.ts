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
