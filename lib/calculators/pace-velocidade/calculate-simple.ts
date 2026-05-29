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
