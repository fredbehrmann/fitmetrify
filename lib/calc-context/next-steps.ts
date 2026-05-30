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
  "calculadora-proteina": {
    titulo: "Distribua sua proteína nas refeições",
    descricao:
      "Você calculou sua meta de proteína. Agora veja como distribuí-la ao longo do dia.",
    href: "/calculadora-calorias-refeicao",
    dadosPassados: ["proteína diária"],
  },
  "calculadora-macros": {
    titulo: "Distribua seus macros por refeição",
    descricao:
      "Com seus macros definidos, veja como encaixá-los em cada refeição do dia.",
    href: "/calculadora-calorias-refeicao",
    dadosPassados: ["calorias alvo"],
  },
  "calculadora-1rm": {
    titulo: "Calcule suas cargas de treino",
    descricao:
      "Seu 1RM estimado está pronto. Use-o para definir as cargas ideais por objetivo.",
    href: "/calculadora-zonas-carga",
    dadosPassados: ["1RM", "exercício"],
  },
  "calculadora-zonas-carga": {
    titulo: "Planeje o volume semanal",
    descricao:
      "Com as cargas definidas, calcule o volume total do seu treino.",
    href: "/calculadora-volume-treino",
    dadosPassados: ["1RM", "exercício"],
  },
  "calculadora-pace": {
    titulo: "Projete seu tempo em outras distâncias",
    descricao:
      "Com este pace, quanto tempo você levaria em uma meia maratona ou maratona?",
    href: "/calculadora-previsor-tempo",
    dadosPassados: ["pace"],
  },
};

export function getNextStepForSlug(slug: string): NextStepConfig | null {
  return NEXT_STEPS[slug] ?? null;
}
