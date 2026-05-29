export function formatKcal(kcal: number): string {
  return Math.round(kcal).toLocaleString("pt-BR");
}

export function formatFactor(factor: number): string {
  return factor.toFixed(3).replace(".", ",");
}
