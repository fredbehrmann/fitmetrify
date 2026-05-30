export function formatKcal(value: number): string {
  return Math.round(value).toLocaleString("pt-BR");
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

export function formatProteinGrams(value: number): string {
  return Math.round(value).toLocaleString("pt-BR");
}
