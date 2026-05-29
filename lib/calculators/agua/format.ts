export function formatLiters(liters: number): string {
  return liters.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatMl(ml: number): string {
  return Math.round(ml).toLocaleString("pt-BR");
}

export function formatCups(cups: number): string {
  return cups.toLocaleString("pt-BR");
}
