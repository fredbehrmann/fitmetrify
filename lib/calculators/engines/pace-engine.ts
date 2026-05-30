import type { CalculatorEngine, CalculatorResult } from "./types";
import { calculatePace } from "../pace/calculate-simple";
import { buildPaceTargetRows } from "../pace/pace-target-table";
import {
  buildClassification,
  buildInterpretation,
  buildKpis,
  buildNextSteps,
} from "../pace/interpret";
import {
  parseDistanceKm,
  parseTimeToMinutes,
} from "../running/parse-inputs";
import {
  formatPaceMinutesPerKm,
  formatPaceMinutesPerMile,
} from "../running/format";
import { calculateKarvonenZones } from "../fc-maxima/calculate-karvonen-zones";
import type { DistanceUnit } from "@/lib/conversions";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function buildHeartRateKpis(
  paceMinPerKm: number,
  options: {
    maxHeartRate?: number;
    age?: number;
    restingHeartRate?: number;
  }
): CalculatorResult["kpis"] {
  const maxHr = options.maxHeartRate;
  if (maxHr === undefined || maxHr <= 0) return [];

  if (
    options.restingHeartRate !== undefined &&
    options.restingHeartRate > 0
  ) {
    const zones = calculateKarvonenZones(maxHr, options.restingHeartRate);
    return zones.map((zone) => ({
      label: `${zone.label} (${zone.minPercent}–${zone.maxPercent}%)`,
      value: `${zone.minBpm}–${zone.maxBpm}`,
      unit: "bpm",
    }));
  }

  const speedKmh = 60 / paceMinPerKm;
  const intensityPercent = Math.min(95, Math.max(50, (speedKmh / 20) * 85 + 50));

  return [
    {
      label: "FC estimada (~intensidade)",
      value: Math.round(maxHr * (intensityPercent / 100)).toString(),
      unit: "bpm",
    },
    {
      label: "Zona aeróbica leve (~60%)",
      value: Math.round(maxHr * 0.6).toString(),
      unit: "bpm",
    },
    {
      label: "Zona limiar (~80%)",
      value: Math.round(maxHr * 0.8).toString(),
      unit: "bpm",
    },
  ];
}

function buildPaceResult(
  distance: number,
  timeMinutes: number,
  options?: {
    maxHeartRate?: number;
    age?: number;
    restingHeartRate?: number;
    distanceUnit?: DistanceUnit;
  }
): CalculatorResult {
  const result = calculatePace(distance, timeMinutes);
  const targetRows = buildPaceTargetRows(result.paceMinPerKm);
  const useMiles = options?.distanceUnit === "miles";

  const kpis = [
    ...buildKpis(result, useMiles),
    ...targetRows.map((row) => ({
      label: `Tempo alvo ${row.label}`,
      value: row.timeFormatted,
      unit: `@ ${formatPaceMinutesPerKm(result.paceMinPerKm)}/km`,
    })),
  ];

  if (options) {
    const hrOptions = {
      maxHeartRate: options.maxHeartRate,
      age: options.age,
      restingHeartRate: options.restingHeartRate,
    };
    if (hrOptions.maxHeartRate !== undefined) {
      kpis.push(...(buildHeartRateKpis(result.paceMinPerKm, hrOptions) ?? []));
    }
  }

  const primaryPace = useMiles
    ? formatPaceMinutesPerMile(result.paceMinPerKm)
    : formatPaceMinutesPerKm(result.paceMinPerKm);

  return {
    primaryValue: primaryPace,
    primaryUnit: useMiles ? "min/mi" : "min/km",
    primaryLabel: "Pace médio",
    classification: buildClassification(),
    interpretation: buildInterpretation(result, useMiles),
    kpis,
    nextSteps: buildNextSteps(),
  };
}

export const paceEngine: CalculatorEngine = {
  calculateSimple(values) {
    const distance = parseDistanceKm(values);
    const timeMinutes = parseTimeToMinutes(values, "timeSeconds", "timeMinutes");

    if (distance === null || timeMinutes === null) return null;

    const distanceUnit =
      values.distanceUnit === "miles" ? "miles" : ("km" as DistanceUnit);

    return buildPaceResult(distance, timeMinutes, { distanceUnit });
  },

  calculateAdvanced(values) {
    const distance = parseDistanceKm(values);
    const timeMinutes = parseTimeToMinutes(values, "timeSeconds", "timeMinutes");

    if (distance === null || timeMinutes === null) return null;

    const distanceUnit =
      values.distanceUnit === "miles" ? "miles" : ("km" as DistanceUnit);

    return buildPaceResult(distance, timeMinutes, {
      maxHeartRate: parseNumber(values.maxHeartRate) ?? undefined,
      age: parseNumber(values.age) ?? undefined,
      restingHeartRate: parseNumber(values.restingHeartRate) ?? undefined,
      distanceUnit,
    });
  },
};
