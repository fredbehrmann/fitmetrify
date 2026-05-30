import type { Metadata } from "next";

import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/sobre",
  "Sobre o FitMetrify",
  "Conheça o FitMetrify: calculadoras fitness e nutrição gratuitas, com conteúdo educativo e foco em estimativas responsáveis."
);

export default function SobrePage() {
  return (
    <InstitutionalPageLayout
      title="Sobre o FitMetrify"
      intro="O FitMetrify é um portal gratuito de calculadoras para emagrecimento, nutrição, corrida e musculação."
    >
      <p>
        Nosso objetivo é transformar dados em decisões mais informadas, com
        ferramentas práticas e explicações claras sobre cada métrica.
      </p>
      <p>
        Este conteúdo institucional está em atualização. Em breve publicaremos
        mais detalhes sobre a equipe, metodologia de revisão científica e
        roadmap do projeto.
      </p>
    </InstitutionalPageLayout>
  );
}
