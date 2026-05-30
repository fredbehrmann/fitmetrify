export type PaceVelocityResult = {
  paceMinPerKm: number;
  speedKmh: number;
};

export function calculateSpeedFromPace(paceMinPerKm: number): PaceVelocityResult {
  const speedKmh = 60 / paceMinPerKm;

  return {
    paceMinPerKm,
    speedKmh,
  };
}

export function calculatePaceFromSpeed(speedKmh: number): PaceVelocityResult {
  const paceMinPerKm = 60 / speedKmh;

  return {
    paceMinPerKm,
    speedKmh,
  };
}

export const REFERENCE_SPEEDS_KMH = [4, 6, 8, 10, 12, 14, 16, 18, 20] as const;
