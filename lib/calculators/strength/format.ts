export function formatLoadKg(kg: number): string {
  return kg.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  });
}

export function formatVolumeKg(kg: number): string {
  return Math.round(kg).toLocaleString("pt-BR");
}

export function roundLoadHalfKg(kg: number): number {
  return Math.round(kg * 2) / 2;
}
