import type { Metadata } from "next";

import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";

export const metadata: Metadata = buildHubMetadata(
  "/privacidade",
  "Política de Privacidade",
  "Política de privacidade do FitMetrify — como tratamos dados e cookies."
);

export default function PrivacidadePage() {
  return (
    <InstitutionalPageLayout
      title="Política de Privacidade"
      intro="Transparência sobre o uso de dados no FitMetrify."
    >
      <p>
        O FitMetrify não exige cadastro para usar as calculadoras. Dados
        informados nos formulários são processados localmente no seu navegador
        para exibir resultados.
      </p>
      <p>
        Algumas preferências (como valores importados entre calculadoras) podem
        ser armazenadas temporariamente no sessionStorage do navegador.
      </p>
      <p>
        Esta política completa está em atualização e será publicada em versão
        final em breve, incluindo detalhes sobre analytics, cookies e direitos
        do titular de dados conforme a LGPD.
      </p>
    </InstitutionalPageLayout>
  );
}
