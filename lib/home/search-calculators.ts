import { CATEGORY_LABELS } from "@/lib/calculators/registry";
import type { Calculator } from "@/lib/calculators/types";

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getMatchScore(calculator: Calculator, query: string): number {
  const normalizedQuery = normalizeText(query);
  const title = normalizeText(calculator.title);
  const description = normalizeText(calculator.description);
  const slug = normalizeText(calculator.slug);
  const category = normalizeText(CATEGORY_LABELS[calculator.category]);

  if (title.includes(normalizedQuery)) return 100;
  if (slug.includes(normalizedQuery)) return 80;
  if (category.includes(normalizedQuery)) return 60;
  if (description.includes(normalizedQuery)) return 40;
  return 0;
}

export function searchCalculators(
  query: string,
  calculators: Calculator[]
): Calculator[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  return calculators
    .map((calculator) => ({
      calculator,
      score: getMatchScore(calculator, normalizedQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ calculator }) => calculator);
}
