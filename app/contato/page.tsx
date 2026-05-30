import type { Metadata } from "next";

import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/contato",
  "Contato",
  "Entre em contato com o FitMetrify para dúvidas, sugestões ou parcerias."
);

export default function ContatoPage() {
  return (
    <InstitutionalPageLayout
      title="Contato"
      intro="Quer falar conosco? Esta página está em construção."
    >
      <p>
        Em breve disponibilizaremos um formulário de contato e canais oficiais
        de suporte. Enquanto isso, acompanhe nossas redes sociais pelo rodapé do
        site.
      </p>
    </InstitutionalPageLayout>
  );
}
