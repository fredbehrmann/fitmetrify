import {
  CATEGORY_LABELS,
  getCalculatorBySlug,
  getCalculatorsByCategory,
} from "@/lib/calculators/registry";
import type { Calculator, CalculatorCategory } from "@/lib/calculators/types";

export type HomeSectionSource =
  | { type: "category"; category: CalculatorCategory }
  | { type: "slugs"; slugs: string[] };

export type HomeSection = {
  id: string;
  anchor: string;
  title: string;
  subtitle: string;
  source: HomeSectionSource;
};

export const HOME_SECTIONS: HomeSection[] = [
  {
    id: "emagrecimento",
    anchor: "emagrecimento",
    title: "Calculadoras para emagrecimento",
    subtitle:
      "Ferramentas para entender seu corpo, calcular déficit calórico e alcançar metas de peso.",
    source: { type: "category", category: "emagrecimento" },
  },
  {
    id: "ganho-massa",
    anchor: "ganho-massa",
    title: "Calculadoras para ganho de massa",
    subtitle:
      "Estime calorias, proteína e volume de treino para hipertrofia e performance.",
    source: {
      type: "slugs",
      slugs: [
        "calculadora-tmb",
        "calculadora-gasto-calorico",
        "calculadora-proteina",
        "calculadora-macros",
        "calculadora-1rm",
        "calculadora-volume-treino",
      ],
    },
  },
  {
    id: "corrida",
    anchor: "corrida",
    title: "Ferramentas para corrida",
    subtitle:
      "Calcule pace, converta velocidade e preveja tempos de prova com precisão.",
    source: { type: "category", category: "corrida" },
  },
  {
    id: "musculacao",
    anchor: "musculacao",
    title: "Ferramentas para musculação",
    subtitle:
      "Estime 1RM, volume de treino e zonas de carga para evoluir com segurança.",
    source: { type: "category", category: "musculacao" },
  },
];

export function getHomeSectionCalculators(section: HomeSection): Calculator[] {
  if (section.source.type === "category") {
    return getCalculatorsByCategory(section.source.category);
  }

  return section.source.slugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((calculator): calculator is Calculator => calculator !== undefined);
}

export function getHomeSectionNavItems() {
  return HOME_SECTIONS.map((section) => ({
    id: section.id,
    anchor: section.anchor,
    label: section.title.replace(/^(Calculadoras para |Ferramentas para )/, ""),
    href: `#${section.anchor}`,
  }));
}

export function getCategoryLinkForSection(section: HomeSection): string | null {
  if (section.source.type === "category") {
    return `/calculadoras#${section.source.category}`;
  }
  return null;
}

export { CATEGORY_LABELS };
