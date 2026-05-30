import { ageInput, numberInput } from "../common-inputs";
import type { CalculatorInput, InputMode } from "../types";
import type { DistanceUnit } from "@/lib/conversions";

export function getPaceInputs(
  mode: InputMode,
  distanceUnit: DistanceUnit
): CalculatorInput[] {
  const unitLabel = distanceUnit === "miles" ? "mi" : "km";

  const base: CalculatorInput[] = [
    numberInput(mode, {
      id: "distance",
      name: "distance",
      label: "Distância",
      unit: unitLabel,
      placeholder: distanceUnit === "miles" ? "Ex: 6.2" : "Ex: 10",
      validation: { required: true, min: 0.1, max: 500, step: 0.1 },
    }),
    {
      id: "timeSeconds",
      name: "timeSeconds",
      label: "Tempo total",
      type: "time",
      mode,
      validation: { required: true, min: 60, max: 86400 },
    },
  ];

  if (mode === "advanced") {
    base.push(
      ageInput("advanced", {
        id: "age",
        name: "age",
        label: "Idade (opcional, para FC estimada)",
        helpText:
          "Usada para estimar FC máxima (220 − idade) se FC máx. não informada.",
      }),
      numberInput("advanced", {
        id: "maxHeartRate",
        name: "maxHeartRate",
        label: "FC máxima",
        unit: "bpm",
        placeholder: "Ex: 190",
        validation: { min: 120, max: 220, step: 1 },
      }),
      numberInput("advanced", {
        id: "restingHeartRate",
        name: "restingHeartRate",
        label: "FC de repouso (opcional)",
        unit: "bpm",
        placeholder: "Ex: 60",
        helpText: "Com FC de repouso, as zonas usam o método Karvonen.",
        validation: { min: 35, max: 120, step: 1 },
      })
    );
  }

  return base;
}
