export function formatGrams(grams: number): string {
  return Math.round(grams).toLocaleString("pt-BR");
}

export function formatGramsPerKg(value: number): string {
  return value.toFixed(1).replace(".", ",");
}
