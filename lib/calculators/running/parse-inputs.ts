export function parseTimeToMinutes(
  values: Record<string, unknown>,
  secondsField: string,
  legacyMinutesField?: string
): number | null {
  const seconds = values[secondsField];
  if (typeof seconds === "number" && !Number.isNaN(seconds) && seconds > 0) {
    return seconds / 60;
  }

  if (legacyMinutesField) {
    const minutes = values[legacyMinutesField];
    if (typeof minutes === "number" && !Number.isNaN(minutes) && minutes > 0) {
      return minutes;
    }
  }

  return null;
}

export function parseDistanceKm(
  values: Record<string, unknown>,
  distanceField = "distance"
): number | null {
  const distance = values[distanceField];
  if (typeof distance !== "number" || Number.isNaN(distance) || distance <= 0) {
    return null;
  }

  if (values.distanceUnit === "miles") {
    return distance * 1.60934;
  }

  return distance;
}
