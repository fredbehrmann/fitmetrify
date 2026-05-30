export function formatKg(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function formatKgRange(min: number, max: number): string {
  return `${formatKg(min)}–${formatKg(max)}`;
}

export function formatSignedKg(delta: number): string {
  const sign = delta > 0 ? "+" : "";
  return `${sign}${formatKg(delta)}`;
}
