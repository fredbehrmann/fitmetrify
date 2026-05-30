import Link from "next/link";
import type { Metadata } from "next";

import { MedicalDisclaimer } from "@/components/layout/medical-disclaimer";
import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { LEGAL } from "@/lib/site/legal";
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
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">O que é</h2>
        <p>
          O {LEGAL.brandName} nasceu com a missão de ser a principal plataforma
          brasileira de calculadoras fitness gratuitas, criada para democratizar
          o acesso a ferramentas de saúde e performance. Transformamos dados em
          decisões mais informadas, com explicações claras sobre cada métrica.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Nossa metodologia
        </h2>
        <p>
          As fórmulas utilizadas são selecionadas com base em literatura
          científica peer-reviewed e em diretrizes reconhecidas, como as da
          Organização Mundial da Saúde (OMS), International Society of Sports
          Nutrition (ISSN) e American College of Sports Medicine (ACSM).
        </p>
        <p>
          Cada calculadora passa por revisão periódica. A data da última
          revisão fica visível na página da ferramenta, para que você saiba
          quando o conteúdo foi atualizado.
        </p>
      </section>

      <MedicalDisclaimer />

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">Contato</h2>
        <p>
          Dúvidas, sugestões ou parcerias?{" "}
          <Link href="/contato" className="text-primary font-medium hover:underline">
            Entre em contato conosco
          </Link>
          .
        </p>
      </section>
    </InstitutionalPageLayout>
  );
}
