export type NextStepConfig = {
  titulo: string;
  descricao: string;
  href: string;
  dadosPassados: string[];
};

export const NEXT_STEPS: Record<string, NextStepConfig> = {
  "calculadora-imc": {
    titulo: "Calcule sua Taxa Metabólica Basal",
    descricao:
      "Com seu IMC calculado, o próximo passo é descobrir quantas calorias seu corpo gasta em repouso.",
    href: "/calculadora-tmb",
    dadosPassados: ["peso", "altura", "idade", "sexo"],
  },
  "calculadora-peso-ideal": {
    titulo: "Calcule sua Taxa Metabólica Basal",
    descricao:
      "Use seu peso e altura para estimar quantas calorias seu corpo gasta em repouso.",
    href: "/calculadora-tmb",
    dadosPassados: ["peso", "altura", "idade", "sexo"],
  },
  "calculadora-tmb": {
    titulo: "Calcule seu Gasto Calórico Total",
    descricao:
      "Sua TMB já foi salva. Clique para calcular seu gasto calórico com base no nível de atividade.",
    href: "/calculadora-gasto-calorico",
    dadosPassados: ["tmb"],
  },
  "calculadora-gasto-calorico": {
    titulo: "Defina seu Déficit Calórico",
    descricao:
      "Seu gasto diário foi calculado. Agora defina a estratégia de déficit para emagrecer.",
    href: "/calculadora-deficit-calorico",
    dadosPassados: ["get"],
  },
  "calculadora-deficit-calorico": {
    titulo: "Distribua seus Macronutrientes",
    descricao:
      "Com as calorias alvo definidas, distribua proteína, carboidrato e gordura.",
    href: "/calculadora-macros",
    dadosPassados: ["deficitAlvo"],
  },
  "calculadora-percentual-gordura": {
    titulo: "Calcule sua TMB com massa magra",
    descricao:
      "Use a massa magra estimada na calculadora de TMB (fórmula Katch-McArdle).",
    href: "/calculadora-tmb",
    dadosPassados: ["leanMass", "bodyFat", "peso"],
  },
  "calculadora-fc-maxima": {
    titulo: "Use sua FC máxima na Calculadora de Pace",
    descricao:
      "Estime intensidade e zonas cardíacas nos seus treinos de corrida.",
    href: "/calculadora-pace",
    dadosPassados: ["maxHeartRate", "idade"],
  },
};

export function getNextStepForSlug(slug: string): NextStepConfig | null {
  return NEXT_STEPS[slug] ?? null;
}
