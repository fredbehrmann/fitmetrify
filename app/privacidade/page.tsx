import Link from "next/link";
import type { Metadata } from "next";

import { InstitutionalPageLayout } from "@/components/layout/institutional-page-layout";
import { LEGAL } from "@/lib/site/legal";
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
      intro="Transparência sobre o uso de dados no FitMetrify, em conformidade com a Lei Geral de Proteção de Dados (LGPD)."
    >
      <div className="border-amber-500/30 bg-amber-500/10 rounded-[14px] border p-4 text-sm text-foreground">
        Este texto é um modelo técnico preparado para o portal. Recomendamos
        revisão por advogado especializado em LGPD antes de campanhas de
        marketing em larga escala.
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          1. Controlador dos dados
        </h2>
        <p>
          O controlador dos dados pessoais tratados neste portal é o{" "}
          <strong>{LEGAL.brandName}</strong>. Para questões relacionadas a
          privacidade, entre em contato pelo e-mail{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="text-primary font-medium hover:underline"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          2. Dados coletados e finalidade
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>sessionStorage (CalcContext):</strong> dados informados nas
            calculadoras (peso, altura, idade, entre outros) são armazenados
            apenas na sessão do seu navegador para facilitar a jornada entre
            ferramentas. Não são transmitidos aos nossos servidores.
          </li>
          <li>
            <strong>Newsletter:</strong> endereço de e-mail e confirmação de
            opt-in (double opt-in). Finalidade: envio de conteúdo educativo
            sobre fitness, nutrição e performance.
          </li>
          <li>
            <strong>Formulário de contato:</strong> nome, e-mail, assunto e
            mensagem. Finalidade: responder a solicitações, sugestões e
            parcerias.
          </li>
          <li>
            <strong>Analytics (Google Analytics 4 e PostHog):</strong> dados de
            uso anonimizados ou pseudonimizados (páginas visitadas, eventos de
            interação). Finalidade: melhoria contínua do produto e da
            experiência do usuário.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          3. Base legal (LGPD, Art. 7)
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Consentimento:</strong> cadastro na newsletter, mediante
            confirmação por e-mail (double opt-in).
          </li>
          <li>
            <strong>Legítimo interesse:</strong> analytics para entender o uso
            do portal e aprimorar calculadoras e conteúdos, respeitando
            expectativas razoáveis do titular.
          </li>
          <li>
            <strong>Execução de solicitação:</strong> tratamento de mensagens
            enviadas pelo formulário de contato para atendê-lo.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          4. Direitos do titular
        </h2>
        <p>
          Nos termos da LGPD, você pode solicitar confirmação de tratamento,
          acesso, correção, anonimização, portabilidade, eliminação de dados
          desnecessários, informação sobre compartilhamento e revogação de
          consentimento. Envie sua solicitação para{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="text-primary font-medium hover:underline"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          5. Compartilhamento com terceiros
        </h2>
        <p>Utilizamos os seguintes fornecedores de serviço:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Google Analytics (GA4)</strong> —{" "}
            <Link
              href="https://policies.google.com/privacy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade do Google
            </Link>
          </li>
          <li>
            <strong>PostHog</strong> —{" "}
            <Link
              href="https://posthog.com/privacy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade do PostHog
            </Link>
          </li>
          <li>
            <strong>Resend</strong> (envio de e-mails transacionais e de
            newsletter) —{" "}
            <Link
              href="https://resend.com/legal/privacy-policy"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade do Resend
            </Link>
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">6. Cookies</h2>
        <p>O portal pode utilizar cookies e tecnologias similares, incluindo:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>_ga</strong> e <strong>_gid</strong> — Google Analytics 4,
            para métricas de audiência.
          </li>
          <li>
            <strong>ph_*</strong> — PostHog, para análise de produto e eventos
            de uso.
          </li>
        </ul>
        <p>
          Você pode gerenciar cookies nas configurações do seu navegador. A
          desativação pode limitar algumas funcionalidades analíticas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          7. Prazo de retenção
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Newsletter:</strong> e-mail mantido até descadastro ou
            solicitação de exclusão.
          </li>
          <li>
            <strong>Formulário de contato:</strong> dados tratados pelo tempo
            necessário para responder à solicitação.
          </li>
          <li>
            <strong>Analytics:</strong> retenção de até 14 meses, conforme
            configuração padrão do Google Analytics 4.
          </li>
          <li>
            <strong>CalcContext (sessionStorage):</strong> removido ao encerrar
            a sessão do navegador.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          8. Encarregado / responsável por privacidade
        </h2>
        <p>
          Para exercer direitos ou esclarecer dúvidas sobre esta política,
          contacte{" "}
          <a
            href={`mailto:${LEGAL.privacyEmail}`}
            className="text-primary font-medium hover:underline"
          >
            {LEGAL.privacyEmail}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-foreground">
          9. Vigência e versão
        </h2>
        <p>
          Versão {LEGAL.policyVersion}, vigente a partir de{" "}
          {new Date(`${LEGAL.policyEffectiveDate}T12:00:00`).toLocaleDateString(
            "pt-BR",
            { day: "2-digit", month: "long", year: "numeric" }
          )}
          . Alterações serão publicadas nesta página com nova data de vigência.
        </p>
      </section>
    </InstitutionalPageLayout>
  );
}
