export function formatKcal(kcal: number): string {
  return Math.round(kcal).toLocaleString("pt-BR");
}

export function formatGrams(grams: number): string {
  return Math.round(grams).toLocaleString("pt-BR");
}

export function formatPercent(percent: number): string {
  return `${Math.round(percent)}%`;
}
