import type { CalcState, PrefillImportItem } from "@/lib/calc-context/types";
import type { CalculatorInput } from "./types";

const SLUG_PREFILL_MAP: Record<
  string,
  (state: CalcState) => Record<string, unknown>
> = {
  "calculadora-imc": (state) => ({
    weight: state.weight,
    height: state.height,
    age: state.age,
    sex: state.sex,
  }),
  "calculadora-tmb": (state) => ({
    weight: state.weight,
    height: state.height,
    age: state.age,
    sex: state.sex,
    leanMass: state.leanMass,
    bodyFat: state.bodyFat,
  }),
  "calculadora-gasto-calorico": (state) => ({
    tmb: state.tmb,
  }),
  "calculadora-deficit-calorico": (state) => ({
    dailyExpenditure: state.get,
    sex: state.sex,
    currentWeight: state.weight,
  }),
  "calculadora-macros": (state) => ({
    calories: state.targetCalories ?? state.get,
    weight: state.weight,
  }),
  "calculadora-zonas-carga": (state) => ({
    oneRepMax: state.oneRepMax,
    exercise: state.exercise,
  }),
  "calculadora-pace": (state) => ({
    maxHeartRate: state.maxHeartRate,
    age: state.age,
    restingHeartRate: state.restingHeartRate,
  }),
  "calculadora-proteina": (state) => ({
    weight: state.weight,
    bodyFat: state.bodyFat,
    leanMass: state.leanMass,
  }),
  "calculadora-agua": (state) => ({
    weight: state.weight,
    ...(state.age !== undefined
      ? { ageGroup: state.age >= 60 ? "senior" : "adult" }
      : {}),
  }),
  "calculadora-calorias-refeicao": (state) => ({
    calories: state.targetCalories ?? state.get,
  }),
  "calculadora-peso-ideal": (state) => ({
    height: state.height,
    sex: state.sex,
    weight: state.weight,
    bodyFat: state.bodyFat,
  }),
  "calculadora-1rm": (state) => ({
    weight: state.weight,
    sex: state.sex,
  }),
};

export function getVolumeTreinoPrefillSuggestion(state: CalcState): {
  exerciseLabel?: string;
  suggestedLoadKg?: number;
  oneRepMax?: number;
} | null {
  if (state.oneRepMax === undefined) return null;

  const exerciseLabel =
    state.exercise !== undefined
      ? (EXERCISE_LABELS[state.exercise] ?? state.exercise)
      : undefined;

  return {
    exerciseLabel,
    suggestedLoadKg: Math.round(state.oneRepMax * 0.7 * 2) / 2,
    oneRepMax: state.oneRepMax,
  };
}

const EXERCISE_LABELS: Record<string, string> = {
  "bench-press": "Supino Reto",
  "incline-bench": "Supino Inclinado",
  "overhead-press": "Desenvolvimento",
  squat: "Agachamento Livre",
  deadlift: "Terra",
  row: "Remada",
  "pull-up": "Barra Fixa",
  "leg-press": "Leg Press",
  curl: "Rosca Direta",
  other: "Outro",
};

const FIELD_LABELS: Record<string, string> = {
  weight: "Peso",
  height: "Altura",
  age: "Idade",
  sex: "Sexo",
  tmb: "TMB",
  dailyExpenditure: "Gasto calórico",
  calories: "Calorias alvo",
  oneRepMax: "1RM",
  exercise: "Exercício",
  currentWeight: "Peso atual",
  leanMass: "Massa magra",
  bodyFat: "% gordura",
  maxHeartRate: "FC máxima",
  restingHeartRate: "FC de repouso",
  ageGroup: "Faixa etária",
};

function formatPrefillValue(name: string, value: unknown): string {
  if (name === "sex") {
    return value === "female" ? "Feminino" : "Masculino";
  }
  if (name === "ageGroup") {
    return value === "senior" ? "Idoso (60 anos ou mais)" : "Adulto (até 59 anos)";
  }
  if (name === "exercise" && typeof value === "string") {
    return EXERCISE_LABELS[value] ?? value;
  }
  if (typeof value === "number") {
    if (name === "tmb" || name === "dailyExpenditure" || name === "calories") {
      return `${Math.round(value)} kcal/dia`;
    }
    if (name === "weight" || name === "currentWeight" || name === "oneRepMax") {
      return `${value} kg`;
    }
    if (name === "height") return `${value} cm`;
    if (name === "age") return `${value} anos`;
    if (name === "leanMass") return `${value} kg`;
    if (name === "bodyFat") return `${value}%`;
    if (name === "maxHeartRate" || name === "restingHeartRate") {
      return `${Math.round(value)} bpm`;
    }
  }
  return String(value);
}

export function mergePrefillFromContext(
  slug: string,
  state: CalcState,
  inputs: CalculatorInput[]
): Record<string, unknown> {
  const mapper = SLUG_PREFILL_MAP[slug];
  if (!mapper) return {};

  const raw = mapper(state);
  const inputNames = new Set(inputs.map((input) => input.name));
  const defaults: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(raw)) {
    if (!inputNames.has(name)) continue;
    if (value === undefined || value === null || value === "") continue;
    defaults[name] = value;
  }

  return defaults;
}

export function getPrefillImportItems(
  slug: string,
  state: CalcState,
  inputs: CalculatorInput[],
  appliedDefaults: Record<string, unknown>
): PrefillImportItem[] {
  const items: PrefillImportItem[] = [];

  for (const [name, value] of Object.entries(appliedDefaults)) {
    if (value === undefined || value === null || value === "") continue;
    items.push({
      label: FIELD_LABELS[name] ?? name,
      value: formatPrefillValue(name, value),
    });
  }

  if (items.length > 0) return items;

  const mapper = SLUG_PREFILL_MAP[slug];
  if (!mapper) return [];

  const raw = mapper(state);
  const inputNames = new Set(inputs.map((input) => input.name));

  for (const [name, value] of Object.entries(raw)) {
    if (!inputNames.has(name)) continue;
    if (value === undefined || value === null || value === "") continue;
    items.push({
      label: FIELD_LABELS[name] ?? name,
      value: formatPrefillValue(name, value),
    });
  }

  return items;
}
