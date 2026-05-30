import type { Metadata } from "next";

import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/termos",
  "Termos de Uso",
  "Termos de uso do FitMetrify — condições para utilização das calculadoras."
);

export default function TermosPage() {
  return (
    <InstitutionalPageLayout
      title="Termos de Uso"
      intro="Condições gerais para utilização do portal FitMetrify."
    >
      <p>
        As calculadoras do FitMetrify fornecem estimativas educativas. Elas não
        substituem orientação de profissionais de saúde, nutrição ou educação
        física.
      </p>
      <p>
        Ao utilizar o site, você concorda em usar os resultados como referência
        e não como prescrição individualizada.
      </p>
      <p>
        A versão completa dos termos de uso está em elaboração e será publicada
        em breve, incluindo limitações de responsabilidade e propriedade
        intelectual.
      </p>
    </InstitutionalPageLayout>
  );
}
