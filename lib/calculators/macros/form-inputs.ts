import {
  getImperialWeightInput,
  getMetricWeightInput,
} from "../body-metrics/form-inputs";
import {
  caloriesInput,
  checkboxInput,
  numberInput,
  selectInput,
} from "../common-inputs";
import { GOAL_OPTIONS, MACRO_INPUT_MODE_OPTIONS } from "../options";
import type { CalculatorInput, InputMode } from "../types";
import type { UnitSystem } from "@/lib/conversions";

function getWeightInput(mode: InputMode, unitSystem: UnitSystem): CalculatorInput {
  return unitSystem === "metric"
    ? getMetricWeightInput(mode, {
        id: "weight",
        name: "weight",
        label: "Peso corporal",
        helpText: "Obrigatório no modo g/kg. Pode vir da jornada anterior.",
        validation: { required: false, min: 30, max: 300, step: 0.1 },
      })
    : getImperialWeightInput(mode, {
        id: "weightLb",
        name: "weightLb",
        label: "Peso corporal",
        helpText: "Obrigatório no modo g/kg. Pode vir da jornada anterior.",
        validation: { required: false, min: 66, max: 660, step: 0.1 },
      });
}

export function getMacrosInputs(
  mode: InputMode,
  unitSystem: UnitSystem
): CalculatorInput[] {
  if (mode === "simple") {
    return [
      caloriesInput("simple"),
      selectInput("simple", {
        id: "inputMode",
        name: "inputMode",
        label: "Modo de cálculo",
        options: [...MACRO_INPUT_MODE_OPTIONS],
        defaultValue: "percent",
        validation: { required: true },
      }),
      selectInput("simple", {
        id: "goal",
        name: "goal",
        label: "Objetivo",
        options: [...GOAL_OPTIONS],
        validation: { required: true },
      }),
      getWeightInput("simple", unitSystem),
      numberInput("simple", {
        id: "proteinPerKg",
        name: "proteinPerKg",
        label: "Proteína",
        unit: "g/kg",
        placeholder: "Ex: 1.8",
        validation: { min: 0.8, max: 3, step: 0.1 },
      }),
      numberInput("simple", {
        id: "fatMinPerKg",
        name: "fatMinPerKg",
        label: "Gordura mínima",
        unit: "g/kg",
        placeholder: "Ex: 1.0",
        validation: { min: 0.3, max: 2, step: 0.1 },
      }),
    ];
  }

  return [
    caloriesInput("advanced"),
    getWeightInput("advanced", unitSystem),
    numberInput("advanced", {
      id: "proteinPerKg",
      name: "proteinPerKg",
      label: "Proteína fixa",
      unit: "g/kg",
      placeholder: "Ex: 2.0",
      validation: { required: true, min: 0.8, max: 3, step: 0.1 },
    }),
    numberInput("advanced", {
      id: "fatMinPerKg",
      name: "fatMinPerKg",
      label: "Gordura mínima",
      unit: "g/kg",
      placeholder: "Ex: 0.8",
      validation: { required: true, min: 0.3, max: 2, step: 0.1 },
    }),
    checkboxInput("advanced", {
      id: "adjustCarbs",
      name: "adjustCarbs",
      label: "Dia de treino / Dia de descanso",
      helpText:
        "Distribui carboidratos com +20% nos dias de treino e −20% nos dias de descanso, mantendo proteína constante.",
    }),
    numberInput("advanced", {
      id: "trainingDays",
      name: "trainingDays",
      label: "Dias de treino por semana",
      unit: "dias",
      placeholder: "Ex: 4",
      validation: { min: 0, max: 7, step: 1 },
    }),
  ];
}
