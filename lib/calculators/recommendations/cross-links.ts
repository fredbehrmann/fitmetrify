import { getCalculatorBySlug } from "../registry";

/** Official cross-recommendations from Etapa 14 spec (priority destination). */
export const PRIMARY_CROSS_LINKS: Record<string, string> = {
  "calculadora-imc": "calculadora-tmb",
  "calculadora-tmb": "calculadora-gasto-calorico",
  "calculadora-gasto-calorico": "calculadora-deficit-calorico",
  "calculadora-proteina": "calculadora-macros",
  "calculadora-pace": "calculadora-previsor-tempo",
  "calculadora-1rm": "calculadora-zonas-carga",
  "calculadora-percentual-gordura": "calculadora-tmb",
  "calculadora-fc-maxima": "calculadora-pace",
};

export function getRelatedSlugsForCalculator(slug: string): string[] {
  const calculator = getCalculatorBySlug(slug);
  const registrySlugs = calculator?.relatedSlugs ?? [];
  const primary = PRIMARY_CROSS_LINKS[slug];

  if (primary) {
    const rest = registrySlugs.filter((s) => s !== primary);
    return [primary, ...rest];
  }

  return [...registrySlugs];
}
