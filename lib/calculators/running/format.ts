/** Converts decimal minutes (e.g. 5.5) to mm:ss display. */
export function formatPaceMinutesPerKm(paceMinPerKm: number): string {
  const totalSeconds = Math.round(paceMinPerKm * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatPaceMinutesPerMile(paceMinPerKm: number): string {
  return formatPaceMinutesPerKm(paceMinPerKm * 1.60934);
}

/** Formats duration in minutes as mm:ss or h:mm:ss when >= 60 min. */
export function formatDurationMinutes(totalMinutes: number): string {
  const totalSeconds = Math.round(totalMinutes * 60);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatSpeedKmh(speedKmh: number): string {
  return speedKmh.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatSpeedMph(speedKmh: number): string {
  const mph = speedKmh / 1.60934;
  return mph.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatDistanceKm(distanceKm: number): string {
  return distanceKm.toLocaleString("pt-BR", {
    minimumFractionDigits: distanceKm < 10 ? 1 : 0,
    maximumFractionDigits: 1,
  });
}
