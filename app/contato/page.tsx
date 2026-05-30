import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { LEGAL } from "@/lib/site/legal";
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
      intro="Envie sua mensagem. Respondemos dúvidas, sugestões, reportes de erro e propostas de parceria."
    >
      <p>
        Você também pode escrever diretamente para{" "}
        <a
          href={`mailto:${LEGAL.contactEmail}`}
          className="text-primary font-medium hover:underline"
        >
          {LEGAL.contactEmail}
        </a>
        .
      </p>
      <ContactForm />
    </InstitutionalPageLayout>
  );
}
