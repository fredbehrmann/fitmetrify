import { numberInput, selectInput } from "../common-inputs";
import {
  RACE_TYPE_OPTIONS,
  RUNNER_EXPERIENCE_OPTIONS,
} from "../options";
import type { CalculatorInput, InputMode } from "../types";
import type { DistanceUnit } from "@/lib/conversions";

export function getPrevisorTempoInputs(
  mode: InputMode,
  distanceUnit: DistanceUnit
): CalculatorInput[] {
  const unitLabel = distanceUnit === "miles" ? "mi" : "km";

  const base: CalculatorInput[] = [
    numberInput(mode, {
      id: "knownDistance",
      name: "knownDistance",
      label: "Distância conhecida",
      unit: unitLabel,
      placeholder: distanceUnit === "miles" ? "Ex: 6.2" : "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    {
      id: "knownTimeSeconds",
      name: "knownTimeSeconds",
      label: "Tempo conhecido",
      type: "time",
      mode,
      validation: { required: true, min: 60, max: 86400 },
    },
    numberInput(mode, {
      id: "targetDistance",
      name: "targetDistance",
      label: "Nova distância desejada",
      unit: unitLabel,
      placeholder: distanceUnit === "miles" ? "Ex: 13.1" : "Ex: 21.1",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
  ];

  if (mode === "advanced") {
    base.push(
      selectInput("advanced", {
        id: "experience",
        name: "experience",
        label: "Experiência do corredor",
        options: [...RUNNER_EXPERIENCE_OPTIONS],
      }),
      selectInput("advanced", {
        id: "raceType",
        name: "raceType",
        label: "Tipo de prova",
        options: [...RACE_TYPE_OPTIONS],
      }),
      numberInput("advanced", {
        id: "elevation",
        name: "elevation",
        label: "Desnível",
        unit: "m",
        placeholder: "Ex: 150",
        validation: { min: 0, max: 5000, step: 10 },
      }),
      numberInput("advanced", {
        id: "temperature",
        name: "temperature",
        label: "Temperatura",
        unit: "°C",
        placeholder: "Ex: 22",
        validation: { min: -10, max: 45, step: 1 },
      }),
      numberInput("advanced", {
        id: "weeklyRuns",
        name: "weeklyRuns",
        label: "Frequência semanal de treino",
        unit: "dias",
        placeholder: "Ex: 4",
        validation: { min: 0, max: 7, step: 1 },
      })
    );
  }

  return base;
}
