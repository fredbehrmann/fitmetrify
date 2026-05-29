import { getCalculatorBySlug } from "../registry";
import { PRIMARY_CROSS_LINKS } from "./cross-links";

const NEXT_STEP_MESSAGES: Record<string, string[]> = {
  "calculadora-imc": [
    "Estime sua taxa metabólica basal e avalie composição corporal no modo avançado da calculadora de TMB.",
    "Com o IMC em mãos, calcule seu gasto calórico total diário.",
  ],
  "calculadora-tmb": [
    "Calcule agora seu gasto calórico total para saber quantas calorias consumir por dia.",
    "Com a TMB definida, planeje um déficit calórico alinhado ao seu objetivo.",
  ],
  "calculadora-gasto-calorico": [
    "Use a calculadora de déficit calórico para definir seu plano de emagrecimento.",
    "Distribua suas calorias entre proteína, carboidrato e gordura na calculadora de macronutrientes.",
  ],
  "calculadora-deficit-calorico": [
    "Confira sua ingestão de proteína diária para preservar massa muscular no déficit.",
    "Ajuste macronutrientes com a calculadora de distribuição de macros.",
  ],
  "calculadora-proteina": [
    "Distribua suas calorias entre proteína, carboidrato e gordura na calculadora de macronutrientes.",
    "Mantenha o déficit calórico alinhado à meta na calculadora de déficit calórico.",
  ],
  "calculadora-macros": [
    "Ajuste a ingestão de proteína com a calculadora de proteína diária.",
    "Confira seu gasto calórico total na calculadora de gasto calórico.",
  ],
  "calculadora-agua": [
    "Ajuste proteína e macronutrientes na calculadora de macronutrientes.",
    "Confira sua ingestão de proteína na calculadora de proteína diária.",
  ],
  "calculadora-pace": [
    "Estime tempo em outra distância no previsor de tempo (fórmula de Riegel).",
    "Converta pace em velocidade no conversor pace/velocidade.",
  ],
  "calculadora-pace-velocidade": [
    "Calcule pace a partir de distância e tempo na calculadora de pace.",
    "Preveja tempo em outra distância no previsor de tempo.",
  ],
  "calculadora-previsor-tempo": [
    "Confira seu pace médio na calculadora de pace.",
    "Converta pace e velocidade no conversor pace/velocidade.",
  ],
  "calculadora-1rm": [
    "Defina zonas de treino na calculadora de zonas de carga.",
    "Monitore volume na calculadora de volume de treino.",
  ],
  "calculadora-zonas-carga": [
    "Compare métodos de estimativa na calculadora de 1RM.",
    "Monitore volume na calculadora de volume de treino.",
  ],
  "calculadora-volume-treino": [
    "Estime seu 1RM na calculadora de 1RM.",
    "Defina intensidades na calculadora de zonas de carga.",
  ],
  "calculadora-peso-ideal": [
    "Calcule seu IMC para contextualizar a faixa de peso.",
    "Estime sua TMB para planejar nutrição.",
  ],
  "calculadora-calorias-refeicao": [
    "Distribua macros na calculadora de macronutrientes.",
    "Confira seu gasto calórico na calculadora de gasto calórico.",
  ],
};

function buildPrimaryCrossStep(slug: string): string | null {
  const targetSlug = PRIMARY_CROSS_LINKS[slug];
  if (!targetSlug) return null;

  const target = getCalculatorBySlug(targetSlug);
  if (!target) return null;

  return `Continue com a ${target.title.toLowerCase()} para o próximo passo do seu plano.`;
}

export function buildNextStepsForSlug(slug: string): string[] {
  const predefined = NEXT_STEP_MESSAGES[slug];
  if (predefined?.length) {
    return [...predefined];
  }

  const primary = buildPrimaryCrossStep(slug);
  if (primary) return [primary];

  const calculator = getCalculatorBySlug(slug);
  const firstRelated = calculator?.relatedSlugs?.[0];
  if (firstRelated) {
    const related = getCalculatorBySlug(firstRelated);
    if (related) {
      return [`Explore a ${related.title.toLowerCase()} como próximo passo.`];
    }
  }

  return ["Explore as calculadoras relacionadas abaixo para continuar seu planejamento."];
}
