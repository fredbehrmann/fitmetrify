export type UnitSystem = "metric" | "imperial";

export type DistanceUnit = "km" | "miles";

export function lbToKg(lb: number): number {
  return lb * 0.453592;
}

export function kgToLb(kg: number): number {
  return kg * 2.20462;
}

export function cmToFtIn(cm: number): { ft: number; in: number } {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inch = Math.round(totalInches - ft * 12);
  return { ft, in: inch === 12 ? 0 : inch };
}

export function ftInToCm(ft: number, inch: number): number {
  return ft * 30.48 + inch * 2.54;
}

export function inToCm(inches: number): number {
  return inches * 2.54;
}

export function cmToIn(cm: number): number {
  return cm / 2.54;
}

export function kmToMiles(km: number): number {
  return km * 0.621371;
}

export function milesToKm(miles: number): number {
  return miles / 0.621371;
}

export function secondsToDecimalMinutes(seconds: number): number {
  return seconds / 60;
}

export function decimalMinutesToSeconds(minutes: number): number {
  return Math.round(minutes * 60);
}
