export type PaceResult = {
  paceMinPerKm: number;
  speedKmh: number;
  distanceKm: number;
  timeMinutes: number;
};

export function calculatePace(
  distanceKm: number,
  timeMinutes: number
): PaceResult {
  const paceMinPerKm = timeMinutes / distanceKm;
  const speedKmh = (distanceKm * 60) / timeMinutes;

  return {
    paceMinPerKm,
    speedKmh,
    distanceKm,
    timeMinutes,
  };
}
