import { formatDurationMinutes } from "../running/format";

const RACE_DISTANCES_KM = [
  { label: "5K", km: 5 },
  { label: "10K", km: 10 },
  { label: "21K", km: 21.097 },
  { label: "42K", km: 42.195 },
] as const;

export function buildPaceTargetRows(paceMinPerKm: number) {
  return RACE_DISTANCES_KM.map((race) => ({
    label: race.label,
    distanceKm: race.km,
    timeMinutes: paceMinPerKm * race.km,
    timeFormatted: formatDurationMinutes(paceMinPerKm * race.km),
  }));
}

export { RACE_DISTANCES_KM };
