export type SeoLink = {
  href: string;
  label: string;
};

export type SeoLinkGroup = {
  title: string;
  links: SeoLink[];
};

export const SEO_LINK_GROUPS: SeoLinkGroup[] = [
  {
    title: "Emagrecimento e composição corporal",
    links: [
      { href: "/calculadora-imc", label: "Calculadora de IMC grátis" },
      { href: "/calculadora-tmb", label: "Calcular TMB online" },
      {
        href: "/calculadora-gasto-calorico",
        label: "Calculadora de gasto calórico diário",
      },
      {
        href: "/calculadora-deficit-calorico",
        label: "Calculadora de déficit calórico",
      },
      { href: "/calculadora-peso-ideal", label: "Calculadora de peso ideal" },
    ],
  },
  {
    title: "Nutrição e macros",
    links: [
      {
        href: "/calculadora-proteina",
        label: "Calculadora de proteína diária",
      },
      {
        href: "/calculadora-macros",
        label: "Calculadora de macronutrientes",
      },
      { href: "/calculadora-agua", label: "Calculadora de água diária" },
      {
        href: "/calculadora-calorias-refeicao",
        label: "Calorias por refeição",
      },
    ],
  },
  {
    title: "Corrida e performance",
    links: [
      { href: "/calculadora-pace", label: "Calculadora de pace para corrida" },
      {
        href: "/calculadora-pace-velocidade",
        label: "Conversor pace para velocidade",
      },
      {
        href: "/calculadora-previsor-tempo",
        label: "Previsor de tempo de corrida",
      },
    ],
  },
  {
    title: "Musculação e treino",
    links: [
      { href: "/calculadora-1rm", label: "Calculadora de 1RM grátis" },
      {
        href: "/calculadora-volume-treino",
        label: "Calculadora de volume de treino",
      },
      {
        href: "/calculadora-zonas-carga",
        label: "Calculadora de zonas de carga",
      },
    ],
  },
];

export const SEO_INTRO =
  "O FitMetrify reúne calculadoras fitness gratuitas para emagrecimento, nutrição, corrida e musculação. Calcule IMC, TMB, macronutrientes, pace, 1RM e muito mais — com resultados instantâneos e conteúdo educativo para você entender cada métrica.";
