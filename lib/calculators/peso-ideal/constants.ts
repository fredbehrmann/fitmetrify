export const BMI_MIN = 18.5;
export const BMI_MAX = 24.9;

export type Sex = "male" | "female";

export type Biotype = "ectomorph" | "mesomorph" | "endomorph";

export const BIOTYPE_ADJUSTMENT: Record<Biotype, number> = {
  ectomorph: 0.05,
  mesomorph: 0,
  endomorph: -0.05,
};

export const BIOTYPE_LABELS: Record<Biotype, string> = {
  ectomorph: "Ectomorfo",
  mesomorph: "Mesomorfo",
  endomorph: "Endomorfo",
};
