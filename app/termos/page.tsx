import type { Metadata } from "next";

import { MedicalDisclaimer } from "@/components/layout/medical-disclaimer";
import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { LEGAL } from "@/lib/site/legal";
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
      <MedicalDisclaimer />

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Natureza das ferramentas
        </h2>
        <p>
          As calculadoras do {LEGAL.brandName} são ferramentas educativas
          baseadas em fórmulas científicas. Os resultados são estimativas e{" "}
          <strong>não constituem</strong> diagnóstico, prescrição médica,
          nutricional ou de treinamento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Isenção de responsabilidade médica
        </h2>
        <p>
          O uso das calculadoras não substitui consulta com profissionais
          habilitados. O {LEGAL.brandName} não se responsabiliza por decisões
          tomadas com base nos resultados exibidos no portal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Limitações das fórmulas
        </h2>
        <p>
          Cada calculadora apresenta limitações explicitadas em sua página.
          Ao utilizar qualquer ferramenta, você reconhece essas limitações e
          concorda em interpretar os resultados como referência educativa, não
          como orientação individualizada.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Conteúdo do blog
        </h2>
        <p>
          Artigos publicados no blog têm fins educativos e informativos. Eles
          não substituem avaliação personalizada por profissionais de saúde,
          nutrição ou educação física.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Propriedade intelectual
        </h2>
        <p>
          O código, design e conteúdo textual original do {LEGAL.brandName} são
          de propriedade do portal. É vedada a reprodução não autorizada de
          materiais protegidos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">Alterações</h2>
        <p>
          O {LEGAL.brandName} reserva-se o direito de alterar calculadoras,
          conteúdos e estes termos a qualquer momento, publicando a versão
          atualizada nesta página.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          Lei aplicável
        </h2>
        <p>
          Estes termos são regidos pelas leis da República Federativa do
          Brasil. Fica eleito o foro da comarca do domicílio do controlador do
          portal para dirimir eventuais controvérsias.
        </p>
      </section>
    </InstitutionalPageLayout>
  );
}
