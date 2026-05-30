import {
  CATEGORY_LABELS,
  getCalculatorsGroupedByCategory,
  type CalculatorCategory,
} from "@/lib/calculators/registry";

export const mainNavLinks = [
  { label: "Início", href: "/" },
  { label: "Calculadoras", href: "/calculadoras" },
  { label: "Blog", href: "#" },
] as const;

export const calculatorCategories = Object.entries(
  getCalculatorsGroupedByCategory()
).map(([category, items]) => ({
  category: category as CalculatorCategory,
  label: CATEGORY_LABELS[category as CalculatorCategory],
  calculators: items.map((item) => ({
    label: item.title,
    href: `/${item.slug}`,
  })),
}));

export const footerNavigation = {
  navegacao: [
    { label: "Início", href: "/" },
    { label: "Calculadoras", href: "/calculadoras" },
    { label: "Calculadora de IMC", href: "/calculadora-imc" },
    { label: "Calculadora de TMB", href: "/calculadora-tmb" },
  ],
  recursos: [
    { label: "Gasto Calórico", href: "/calculadora-gasto-calorico" },
    { label: "Proteína Diária", href: "/calculadora-proteina" },
    { label: "Percentual de Gordura", href: "/calculadora-percentual-gordura" },
    { label: "Calculadora de Pace", href: "/calculadora-pace" },
    { label: "FC Máxima e Zonas", href: "/calculadora-fc-maxima" },
    { label: "Calculadora de 1RM", href: "/calculadora-1rm" },
  ],
  institucional: [
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Privacidade", href: "/privacidade" },
    { label: "Termos de uso", href: "/termos" },
  ],
} as const;

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
] as const;
