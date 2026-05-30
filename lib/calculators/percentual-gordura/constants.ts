import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

export type BodyFatClassification =
  | "athletic"
  | "good"
  | "acceptable"
  | "overfat"
  | "obese";

export type BodyFatMethod = "us-navy" | "jackson-pollock";

export type BodyFatResult = {
  bodyFatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
  method: BodyFatMethod;
  sex: Sex;
  age?: number;
};

export const BODY_FAT_CLASSIFICATION_LABELS: Record<BodyFatClassification, string> =
  {
    athletic: "Atlético",
    good: "Boa forma",
    acceptable: "Aceitável",
    overfat: "Excesso de gordura",
    obese: "Obesidade",
  };
