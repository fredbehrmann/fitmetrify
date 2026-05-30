import type { CalculatorEngine, CalculatorResult } from "./types";
import {
  calculatePaceFromSpeed,
  calculateSpeedFromPace,
  REFERENCE_SPEEDS_KMH,
} from "../pace-velocidade/calculate-simple";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../pace-velocidade/interpret";
import { parseTimeToMinutes } from "../running/parse-inputs";
import {
  formatPaceMinutesPerKm,
  formatSpeedKmh,
} from "../running/format";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

export const paceVelocidadeEngine: CalculatorEngine = {
  calculateSimple(values) {
    const inputMode =
      typeof values.inputMode === "string" ? values.inputMode : "pace";

    let result;

    if (inputMode === "speed") {
      const speedKmh = parseNumber(values.speedKmh);
      if (speedKmh === null || speedKmh <= 0) return null;
      result = calculatePaceFromSpeed(speedKmh);
    } else {
      const paceMinutes = parseTimeToMinutes(
        values,
        "timeSeconds",
        "paceMinutes"
      );
      if (paceMinutes === null) return null;
      result = calculateSpeedFromPace(paceMinutes);
    }

    const referenceKpis = REFERENCE_SPEEDS_KMH.map((speed) => {
      const ref = calculatePaceFromSpeed(speed);
      return {
        label: `${formatSpeedKmh(speed)} km/h`,
        value: formatPaceMinutesPerKm(ref.paceMinPerKm),
        unit: "min/km",
      };
    });

    return {
      primaryValue:
        inputMode === "speed"
          ? formatPaceMinutesPerKm(result.paceMinPerKm)
          : formatSpeedKmh(result.speedKmh),
      primaryUnit: inputMode === "speed" ? "min/km" : "km/h",
      primaryLabel: inputMode === "speed" ? "Pace equivalente" : "Velocidade",
      classification: buildClassification(),
      interpretation: buildInterpretation(result),
      kpis: [...buildKpis(result), ...referenceKpis.slice(0, 6)],
      nextSteps: buildNextSteps(),
    } satisfies CalculatorResult;
  },
};
