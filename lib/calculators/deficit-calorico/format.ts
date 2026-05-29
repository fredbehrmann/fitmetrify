export { formatKcal } from "../gasto-calorico/format";

export function formatKg(kg: number): string {
  return kg.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function formatPercent(percent: number): string {
  return `${Math.round(percent * 100)}%`;
}

export function formatWeeks(weeks: number): string {
  return weeks.toString();
}
