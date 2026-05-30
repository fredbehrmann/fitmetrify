import {
  getImperialWeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import {
  bodyFatInput,
  numberInput,
  selectInput,
} from "../common-inputs";
import { PROTEIN_GOAL_OPTIONS, TRAINING_TYPE_OPTIONS } from "../options";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

export function getProteinaInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  const weightInput =
    unitSystem === "metric"
      ? getMetricWeightInput(mode)
      : getImperialWeightInput(mode);

  if (mode === "simple") {
    return [
      weightInput,
      selectInput("simple", {
        id: "goal",
        name: "goal",
        label: "Objetivo",
        options: [...PROTEIN_GOAL_OPTIONS],
        validation: { required: true },
      }),
    ];
  }

  return [
    weightInput,
    selectInput("advanced", {
      id: "goal",
      name: "goal",
      label: "Objetivo",
      options: [...PROTEIN_GOAL_OPTIONS],
      validation: { required: true },
    }),
    bodyFatInput("advanced"),
    numberInput("advanced", {
      id: "leanMass",
      name: "leanMass",
      label: "Massa magra",
      unit: "kg",
      placeholder: "Ex: 55",
      validation: { min: 20, max: 150, step: 0.1 },
    }),
    selectInput("advanced", {
      id: "trainingType",
      name: "trainingType",
      label: "Tipo de treino",
      options: [...TRAINING_TYPE_OPTIONS],
      validation: { required: true },
    }),
    numberInput("advanced", {
      id: "weeklyFrequency",
      name: "weeklyFrequency",
      label: "Frequência semanal",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { required: true, min: 0, max: 7, step: 1 },
    }),
    selectInput("advanced", {
      id: "mealCount",
      name: "mealCount",
      label: "Refeições por dia",
      options: [
        { value: "4", label: "4 refeições" },
        { value: "5", label: "5 refeições" },
      ],
      validation: { required: true },
    }),
    selectInput("advanced", {
      id: "dietPreference",
      name: "dietPreference",
      label: "Preferência alimentar",
      options: [
        { value: "omnivore", label: "Onívoro" },
        { value: "vegetarian", label: "Vegetariano" },
        { value: "vegan", label: "Vegano" },
      ],
    }),
  ];
}
