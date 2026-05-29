import { RIEGEL_EXPONENT } from "./constants";

export type TimePredictionResult = {
  knownDistanceKm: number;
  knownTimeMinutes: number;
  targetDistanceKm: number;
  predictedTimeMinutes: number;
  predictedPaceMinPerKm: number;
};

export function calculateRiegelTime(
  knownTimeMinutes: number,
  knownDistanceKm: number,
  targetDistanceKm: number
): number {
  return knownTimeMinutes * Math.pow(targetDistanceKm / knownDistanceKm, RIEGEL_EXPONENT);
}

export function calculateSimplePrediction(
  knownDistanceKm: number,
  knownTimeMinutes: number,
  targetDistanceKm: number
): TimePredictionResult {
  const predictedTimeMinutes = calculateRiegelTime(
    knownTimeMinutes,
    knownDistanceKm,
    targetDistanceKm
  );

  return {
    knownDistanceKm,
    knownTimeMinutes,
    targetDistanceKm,
    predictedTimeMinutes,
    predictedPaceMinPerKm: predictedTimeMinutes / targetDistanceKm,
  };
}
