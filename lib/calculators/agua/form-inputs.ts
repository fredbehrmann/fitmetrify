import {
  getImperialWeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import { checkboxInput, numberInput, selectInput } from "../common-inputs";
import { TRAINING_TYPE_OPTIONS } from "../options";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

const AGE_GROUP_INPUT = (mode: InputMode): CalculatorInput =>
  selectInput(mode, {
    id: "ageGroup",
    name: "ageGroup",
    label: "Faixa etária",
    options: [
      { value: "adult", label: "Adulto (até 59 anos)" },
      { value: "senior", label: "Idoso (60 anos ou mais)" },
    ],
    validation: { required: true },
  });

export function getAguaInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  const weightInput =
    unitSystem === "metric"
      ? getMetricWeightInput(mode)
      : getImperialWeightInput(mode);

  if (mode === "simple") {
    return [weightInput, AGE_GROUP_INPUT("simple")];
  }

  return [
    weightInput,
    AGE_GROUP_INPUT("advanced"),
    numberInput("advanced", {
      id: "workoutTime",
      name: "workoutTime",
      label: "Tempo de treino",
      unit: "horas",
      placeholder: "Ex: 1",
      helpText: "+500 ml por hora de treino.",
      validation: { min: 0, max: 6, step: 0.5 },
    }),
    checkboxInput("advanced", {
      id: "hotClimate",
      name: "hotClimate",
      label: "Clima quente",
      helpText: "+300 a 500 ml em clima quente.",
    }),
    checkboxInput("advanced", {
      id: "highCaffeine",
      name: "highCaffeine",
      label: "Alta ingestão de cafeína",
      helpText: "+250 ml se houver alta ingestão de cafeína.",
    }),
    checkboxInput("advanced", {
      id: "heavySweating",
      name: "heavySweating",
      label: "Sudorese alta",
    }),
    selectInput("advanced", {
      id: "exerciseType",
      name: "exerciseType",
      label: "Tipo de exercício",
      options: [...TRAINING_TYPE_OPTIONS],
    }),
  ];
}
