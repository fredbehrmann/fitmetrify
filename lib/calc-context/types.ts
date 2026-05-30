import type { Sex } from "@/lib/calculators/tmb/calculate-mifflin";

export type CalcState = {
  weight?: number;
  height?: number;
  age?: number;
  sex?: Sex;
  bodyFat?: number;
  leanMass?: number;
  maxHeartRate?: number;
  restingHeartRate?: number;
  tmb?: number;
  get?: number;
  targetCalories?: number;
  bmi?: number;
  idealWeightMin?: number;
  idealWeightMax?: number;
  idealWeightCentral?: number;
  exercise?: string;
  oneRepMax?: number;
  dailyProtein?: number;
  proteinPerMeal?: number;
  dailyWaterLiters?: number;
  caloriesPerMeal?: number[];
};

export type CalcStore = {
  state: CalcState;
  update: (partial: Partial<CalcState>) => void;
  reset: () => void;
};

export type PrefillImportItem = {
  label: string;
  value: string;
};
