FitMetrify — Especificação Técnica Fase 2
Excelência das Calculadoras

Resumo executivo
MóduloEscopoEtapaM2.1Correção de gaps técnicos das calculadoras (imperial, prefill, banners, textos)Etapa 1M2.2Analytics: GA4 + PostHog + eventos customizadosEtapa 2M2.3Newsletter: backend Resend + double opt-in + PrismaEtapa 3M2.4Conteúdo institucional: Sobre, Contato, Privacidade (LGPD), Termos, RedesEtapa 4M2.5Blog: arquitetura MDX + 10 artigos SEO publicadosEtapa 5
KPI da Fase 2MetaVisitas orgânicas/mês15.000Taxa de conclusão das calculadoras> 60%Taxa de jornada IMC → Macros> 25%Leads de newsletter captados500 e-mails confirmadosArtigos publicados10 artigos indexadosConformidade jurídica (LGPD)Privacidade + Termos publicados

1. Contexto e Estado Atual
A Fase 1 do FitMetrify foi concluída com 17 calculadoras funcionais, SEO técnico completo e CalcContext (Zustand + sessionStorage) para jornada entre calculadoras. A Fase 2 não adiciona novas calculadoras — seu objetivo é fazer o que já existe funcionar com excelência e adicionar as camadas de produto (analytics, newsletter, blog) que são pré-requisito para o crescimento orgânico.

✅ JÁ EXISTE — não alterar: 17 engines de cálculo, CalcContext com Zustand, UnitToggle (IMC simples, TMB, Peso Ideal, % Gordura, Gasto inline), DistanceUnitToggle (Pace), TimeInput HH:MM:SS (Pace, Previsor, Conversor), NextStepBanner na cadeia emagrecimento + % Gordura→TMB + FC→Pace, JSON-LD + sitemap + robots.txt.

1.1 Gaps a corrigir nesta fase
GapImpactoMóduloEtapaUnitToggle ausente em 6 calcsMédioM2.1Etapa 1CalcContext prefill em apenas 7/17 calcsAltoM2.1Etapa 1NextStepBanner ausente em 6 fluxosMédioM2.1Etapa 1Textos de Limitações genéricos em 5 calcsBaixoM2.1Etapa 1Analytics (GA4 + PostHog) não configuradosCríticoM2.2Etapa 2Newsletter UI-only — não envia nem persiste leadsAltoM2.3Etapa 3Páginas institucionais com texto placeholderMédioM2.4Etapa 4Privacidade e Termos sem versão jurídica (LGPD)CríticoM2.4Etapa 4Blog: link "#" no header — zero rotas ou artigosAltoM2.5Etapa 5Redes sociais com href="#" no footerBaixoM2.4Etapa 4
1.2 Convenções deste documento

Arquivos: caminhos relativos à raiz do projeto Next.js
Código: blocos são código a implementar (exceto onde indicado "adaptar")
✅ JÁ EXISTE: padrões da Fase 1 — replicar sem alterar
★ NOVO: implementar do zero
⚠️ ATENÇÃO: ponto crítico que pode quebrar funcionalidade existente


2. Etapa 1 — Correção de Gaps Técnicos das Calculadoras
Objetivo: Completar os componentes transversais que já existem mas não cobrem todas as calculadoras. Nenhum engine de cálculo deve ser alterado — apenas a camada de inputs/outputs e configuração do CalcContext.
Estimativa: 2–3 dias · Pré-requisito: nenhum — iniciar aqui

⚠️ ATENÇÃO: Não alterar os engines em lib/calculators/engines/. Todas as mudanças desta etapa são em: configuração do registry (lib/calculators/index.ts), arquivos de página das calculadoras (app/calculadora-*/), e nos arquivos de contexto (lib/calc-context/ ou equivalente).


2.1 Expansão do UnitToggle para sistema imperial
O componente UnitToggle (kg↔lb / cm↔ft·in) existe e está implementado em: IMC simples, TMB, Peso Ideal, % Gordura, Gasto Calórico inline. O DistanceUnitToggle (km↔mi) existe no Pace. Ambos devem ser replicados nas calculadoras abaixo sem nenhuma alteração nos componentes.
2.1.1 IMC modo avançado
Arquivo: app/calculadora-imc/ — componente do modo avançado
O IMC simples já tem o UnitToggle. Replicar exatamente o mesmo padrão para o modo avançado. Os campos afetados são peso e altura. A lógica de conversão antes de passar para o engine é idêntica ao modo simples.
typescript// No componente de modo avançado do IMC:
// 1. Adicionar o UnitToggle já existente acima dos campos de peso/altura
// 2. Antes de chamar o engine, aplicar a mesma conversão do modo simples:
const pesoKg   = unidade === "imperial" ? lbToKg(pesoLb)       : peso;
const alturaCm = unidade === "imperial" ? ftInToCm(ft, inches) : altura;
// 3. Passar pesoKg e alturaCm ao engine — não alterar o engine
2.1.2 Proteína Diária
Arquivo: app/calculadora-proteina/
Adicionar UnitToggle para o campo de peso corporal. O formulário usa o registry padrão (CalculatorForm). Criar um wrapper de formulário específico ou adaptar o campo de peso existente para aceitar o toggle.
Conversão: peso_kg = unidade === "imperial" ? lbToKg(valor) : valor — depois disso, o engine recebe sempre kg.

✅ JÁ EXISTE: Helpers lbToKg e kgToLb já existem em lib/conversions.ts (ou equivalente). Importar de lá.

2.1.3 Macronutrientes
Arquivo: app/calculadora-macros/
O toggle é necessário apenas quando o usuário usa o modo g/kg (campo de peso). No modo percentual não há campo de peso, portanto o toggle só deve aparecer quando o modo g/kg estiver ativo.
tsx// Renderização condicional do UnitToggle:
{modoGKg && (
  <UnitToggle value={unidade} onChange={setUnidade} />
)}

// Conversão antes do cálculo:
const pesoParaCalculo = modoGKg && unidade === "imperial"
  ? lbToKg(pesoInputado)
  : pesoInputado;
2.1.4 Água Diária
Arquivo: app/calculadora-agua/
Adicionar UnitToggle para peso. A base de cálculo (35 ml/kg) opera em kg internamente — a conversão deve acontecer antes de passar para o engine.
2.1.5 Previsor de Tempo de Corrida
Arquivo: app/calculadora-previsor-tempo/

✅ JÁ EXISTE: O componente DistanceUnitToggle já existe no Pace. Importar e usar da mesma forma.

Adicionar DistanceUnitToggle para os campos de distância conhecida e distância alvo. Conversão: se milhas → multiplicar por 1,60934 antes de passar ao engine (Riegel opera em km).
typescriptconst distKm = distUnidade === "mi" ? distancia * 1.60934 : distancia;
const alvoKm = alvoUnidade === "mi" ? alvo * 1.60934      : alvo;
// Resultado em km → converter de volta para exibição se preferência for milhas
const tempoExibicao = tempoCalculado; // tempo não muda com unidade
const paceExibicao  = paceKm * (alvoUnidade === "mi" ? 1.60934 : 1);
2.1.6 Conversor Pace ↔ Velocidade
Arquivo: app/calculadora-pace-velocidade/
Adicionar toggle de unidade de pace: min/km ↔ min/mi. Exibir o resultado nas duas unidades simultaneamente (pace em min/km e em min/mi, velocidade em km/h e em mph) — elimina a necessidade do toggle na exibição.
typescript// Se input for pace em min/km:
const paceKm = inputSegundos / 60;   // min/km
const paceMi = paceKm * 1.60934;     // min/mi
const velKmh = 60 / paceKm;          // km/h
const velMph = velKmh / 1.60934;     // mph

// Se input for velocidade em km/h:
const velKmh = inputVel;
const velMph = velKmh / 1.60934;
const paceKm = 60 / velKmh;          // min/km
const paceMi = paceKm * 1.60934;     // min/mi

2.2 Expansão do CalcContext — prefill nas calculadoras restantes
O prefill automático (prefill-from-context.ts) cobre 7 calculadoras. Adicionar as entradas abaixo seguindo exatamente o mesmo formato dos 7 existentes.
Arquivo: lib/prefill-from-context.ts (ou equivalente)
typescript// Adicionar os casos abaixo ao objeto de configuração existente:

"calculadora-proteina": {
  weight:   (s) => s.peso,
  bodyFat:  (s) => s.bodyFat,
  leanMass: (s) => s.leanMass,
},

"calculadora-agua": {
  weight: (s) => s.peso,
  age:    (s) => s.idade,
},

"calculadora-calorias-refeicao": {
  // Prioridade: targetCalories (déficit) > get (manutenção)
  calories: (s) => s.targetCalories ?? s.get,
},

"calculadora-peso-ideal": {
  height:  (s) => s.altura,
  sex:     (s) => s.sexo,
  weight:  (s) => s.peso,
  bodyFat: (s) => s.bodyFat,
},

"calculadora-1rm": {
  weight: (s) => s.peso,
  sex:    (s) => s.sexo,
},

"calculadora-volume-treino": {
  // Sugestão de carga baseada no 1RM calculado
  oneRepMax: (s) => s.estimativa1rm,
  exercise:  (s) => s.exercicio1rm,
},

💡 NOTA: Previsor de Tempo não recebe prefill — não há dados de corrida relevantes no store atual. Não é necessário adicionar.

Sincronização após cálculo (sync-from-result.ts)
Verificar se as calculadoras abaixo já gravam no store após calcular. Se não, adicionar:
CalculadoraCampos a gravar no store após calcularProteína DiáriaproteinaDiaria (g/dia), proteinaPorRefeicao (g)Água DiáriaaguaDiaria (L/dia)Calorias por RefeiçãocalPorRefeicao (array de kcal por refeição)Peso IdealpesoIdeal: { min, max, central } — verificar se já existe1RMestimativa1rm, exercicio1rm — verificar se já existe

2.3 Expansão do NextStepBanner
O componente NextStepBanner e sua configuração (lib/next-steps.ts ou equivalente) já existem. Apenas adicionar entradas novas — não alterar o componente.
OrigemDestinoTítulo do bannerSubtextoProteínaCalorias por Refeição"Distribua sua proteína nas refeições""Você calculou sua meta de proteína. Agora veja como distribuí-la ao longo do dia."MacrosCalorias por Refeição"Distribua seus macros por refeição""Com seus macros definidos, veja como encaixá-los em cada refeição do dia."1RMZonas de Carga"Calcule suas cargas de treino""Seu 1RM estimado está pronto. Use-o para definir as cargas ideais por objetivo."Zonas de CargaVolume de Treino"Planeje o volume semanal""Com as cargas definidas, calcule o volume total do seu treino."PacePrevisor de Tempo"Projete seu tempo em outras distâncias""Com este pace, quanto tempo você levaria em uma meia maratona ou maratona?"
Arquivo: lib/next-steps.ts (ou onde os banners são configurados)
typescript// Adicionar ao objeto de configuração existente:

"calculadora-proteina": {
  titulo:   "Distribua sua proteína nas refeições",
  subtexto: "Você calculou sua meta de proteína. Agora veja como distribuí-la ao longo do dia.",
  href:     "/calculadora-calorias-refeicao",
  ctaLabel: "Distribuir por refeição",
},

"calculadora-macros": {
  titulo:   "Distribua seus macros por refeição",
  subtexto: "Com seus macros definidos, veja como encaixá-los em cada refeição do dia.",
  href:     "/calculadora-calorias-refeicao",
  ctaLabel: "Distribuir por refeição",
},

"calculadora-1rm": {
  titulo:   "Calcule suas cargas de treino",
  subtexto: "Seu 1RM estimado está pronto. Use-o para definir as cargas ideais por objetivo.",
  href:     "/calculadora-zonas-carga",
  ctaLabel: "Ver zonas de carga",
},

"calculadora-zonas-carga": {
  titulo:   "Planeje o volume semanal",
  subtexto: "Com as cargas definidas, calcule o volume total do seu treino.",
  href:     "/calculadora-volume-treino",
  ctaLabel: "Calcular volume",
},

"calculadora-pace": {
  titulo:   "Projete seu tempo em outras distâncias",
  subtexto: "Com este pace, quanto tempo você levaria em uma meia maratona ou maratona?",
  href:     "/calculadora-previsor-tempo",
  ctaLabel: "Prever tempo de prova",
},

2.4 Revisão dos textos de Limitações
Cinco calculadoras têm textos de Limitações genéricos. Substituir pelo conteúdo específico abaixo no registry ou no arquivo de conteúdo educativo correspondente.
Calculadora de Pace
typescriptlimitacoes: `A calculadora assume pace constante ao longo de toda a distância, o que raramente ocorre em condições reais. Variações de terreno (subidas, descidas), temperatura acima de 25°C e vento contrário de 30+ km/h podem reduzir o pace em 3–8%. Em provas com largada em grupo, o pace dos primeiros quilômetros costuma ser mais lento que o previsto. Use o resultado como referência de treinamento, não como previsão exata de prova.`
Conversor Pace ↔ Velocidade
typescriptlimitacoes: `A conversão é matemática e não considera inclinação do terreno. Em esteiras, a inclinação de 1% é o ajuste padrão para simular o esforço ao ar livre — uma velocidade de 10 km/h na esteira plana equivale a aproximadamente 9,5 km/h em solo externo plano. Ritmos acima de 20 km/h (pace abaixo de 3:00 min/km) são referências para atletas de elite e podem não ser sustentáveis por longos períodos.`
Volume de Treino
typescriptlimitacoes: `O volume calculado (séries × reps × carga) é um indicador de trabalho mecânico total, mas não reflete a intensidade relativa ao 1RM. 3 séries de 10 reps a 60% do 1RM geram o mesmo volume bruto que 3 séries de 10 reps a 80%, mas produzem estímulos de hipertrofia muito diferentes. Para uma análise completa, combine esta calculadora com as Zonas de Carga. Referências de volume efetivo semanal: 10–20 séries por grupo muscular (Schoenfeld, 2017).`
Calorias por Refeição
typescriptlimitacoes: `A distribuição calórica sugerida é um ponto de partida, não uma regra rígida. Fatores individuais como sensibilidade insulínica, cronobiologia (preferência por refeições maiores de manhã ou à noite) e variação do apetite ao longo do dia devem guiar ajustes personalizados. Para objetivos de hipertrofia, a presença de proteína em todas as refeições (mínimo 25–40g por refeição) é mais relevante do que a distribuição calórica exata.`
Água Diária
typescriptlimitacoes: `A base de 35 ml/kg é uma estimativa populacional e pode variar ±30% por fatores individuais: altitude elevada aumenta as necessidades em até 500 ml/dia; dietas ricas em sódio ou proteína aumentam a necessidade de eliminação renal; alimentos com alto teor de água (frutas, vegetais) contribuem com 20–30% da hidratação diária. Sintomas como urina escura, boca seca e dor de cabeça são indicadores práticos mais confiáveis do que a fórmula isolada.`
✅ Checklist — Etapa 1

 UnitToggle no IMC modo avançado — toggle aparece + cálculo correto em lb/ft
 UnitToggle na Proteína Diária — toggle aparece + engine recebe kg
 UnitToggle em Macros — só aparece no modo g/kg
 UnitToggle na Água Diária — toggle aparece + cálculo correto
 DistanceUnitToggle no Previsor de Tempo — km e mi funcionam
 Dupla exibição pace/velocidade no Conversor — min/km, min/mi, km/h, mph
 Prefill Proteína, Água, Cal/Refeição, Peso Ideal, 1RM, Volume — campos pré-preenchidos quando store tem dados
 NextStepBanner em Proteína, Macros, 1RM, Zonas, Pace — banner visível após resultado
 Textos de limitações atualizados nas 5 calculadoras — conteúdo específico, não genérico


3. Etapa 2 — Analytics e Rastreamento
Objetivo: Instalar e configurar GA4 e PostHog antes de qualquer campanha ou decisão de produto.
Estimativa: 1 dia · Pré-requisito: Etapa 1 concluída

🚨 CRÍTICO: Analytics deve ser configurado ANTES de publicar o blog (Etapa 5). Sem rastreamento, os primeiros artigos não geram dados de SEO úteis.


3.1 Google Analytics 4 — instalação
Arquivo: app/layout.tsx
tsximport Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag("js", new Date());
                gtag("config", "${GA_ID}", {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
Arquivo: .env.local (e configurar no Railway)
envNEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

3.2 PostHog — instalação
bashnpm install posthog-js
Arquivo: lib/posthog.ts
typescriptimport posthog from "posthog-js";

export function initPostHog() {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:         process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://app.posthog.com",
    capture_pageview: false, // controlado manualmente
    persistence:      "localStorage",
  });
}

export { posthog };
Arquivo: app/layout.tsx — adicionar provider de pageview
tsx"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, posthog } from "@/lib/posthog";

function PostHogProvider() {
  const pathname = usePathname();
  useEffect(() => { initPostHog(); }, []);
  useEffect(() => {
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, [pathname]);
  return null;
}

// Adicionar <PostHogProvider /> dentro do <body> no RootLayout
Arquivo: .env.local
envNEXT_PUBLIC_POSTHOG_KEY=phc_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

3.3 Hook centralizado de tracking: useTrackEvent
Arquivo: lib/analytics.ts
Usar este helper em todos os eventos — nunca chamar gtag() ou posthog diretamente.
typescriptimport { posthog } from "@/lib/posthog";

type EventName =
  | "calc_started"
  | "calc_completed"
  | "journey_step"
  | "unit_toggle"
  | "advanced_mode"
  | "search_used"
  | "newsletter_signup"
  | "blog_article_read";

interface EventProperties {
  calc_slug?:    string;  // ex.: "calculadora-imc"
  from_calc?:    string;  // para journey_step
  to_calc?:      string;  // para journey_step
  unit_from?:    string;  // para unit_toggle
  unit_to?:      string;
  article_slug?: string;  // para blog_article_read
  search_query?: string;  // para search_used
  [key: string]: unknown;
}

export function trackEvent(name: EventName, props?: EventProperties) {
  // GA4
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", name, props ?? {});
  }
  // PostHog
  posthog.capture(name, props);
}

3.4 Instrumentação — onde chamar cada evento
calc_started e calc_completed
No componente CalculatorForm compartilhado:
tsximport { trackEvent } from "@/lib/analytics";

// Quando o usuário foca no primeiro campo do formulário:
onFirstInteraction={() => trackEvent("calc_started", { calc_slug: slug })}

// Quando o engine retorna resultado com sucesso:
onResultReady={() => trackEvent("calc_completed", { calc_slug: slug })}
journey_step
No componente NextStepBanner:
tsxonClick={() => {
  trackEvent("journey_step", {
    from_calc: currentSlug,
    to_calc:   destinoSlug,
  });
  router.push(destinoHref);
}}
unit_toggle
No componente UnitToggle existente — adicionar:
tsxonChange={(novaUnidade) => {
  trackEvent("unit_toggle", {
    calc_slug: currentCalcSlug, // passar via prop
    unit_from: unidadeAtual,
    unit_to:   novaUnidade,
  });
  setUnidade(novaUnidade);
}}
advanced_mode
tsxonAdvancedModeToggle={(ativo) => {
  if (ativo) trackEvent("advanced_mode", { calc_slug: slug });
}}
search_used
No componente CalculatorSearch da home — disparar após debounce de 600ms:
tsxuseEffect(() => {
  const t = setTimeout(() => {
    if (query.length >= 3) trackEvent("search_used", { search_query: query });
  }, 600);
  return () => clearTimeout(t);
}, [query]);

3.5 Configuração no GA4 (painel web)

GA4 → Admin → Events → Mark as conversion: marcar calc_completed
Criar audiences: (a) "Calculou ao menos 1 vez" — todos com calc_completed; (b) "Completou a jornada" — todos com journey_step de IMC até Macros
Ativar Enhanced Measurement para scroll depth e outbound clicks
Configurar Custom Dimensions: calc_slug como user-scoped dimension

✅ Checklist — Etapa 2

 GA4 disparando pageviews — confirmar no GA4 Realtime
 PostHog gravando sessões — confirmar sessão no dashboard PH
 calc_started dispara ao focar no primeiro campo
 calc_completed dispara ao receber resultado
 journey_step dispara ao clicar NextStepBanner
 calc_completed marcado como conversão no GA4 (Admin → Conversions)
 Variáveis NEXT_PUBLIC_GA_* e NEXT_PUBLIC_POSTHOG_* configuradas no Railway


4. Etapa 3 — Newsletter e Captação de Leads
Objetivo: Transformar o formulário de newsletter do footer (atualmente UI-only) em um sistema funcional de captação com double opt-in, persistência em banco e sequência de boas-vindas.
Estimativa: 1–2 dias · Pré-requisito: Etapa 2 concluída

4.1 Dependências e variáveis de ambiente
bashnpm install resend
# Prisma já está instalado
Arquivo: .env.local
envRESEND_API_KEY=re_XXXXXXXXXXXXXXXXXX
RESEND_FROM_EMAIL=newsletter@fitmetrify.com.br
NEXT_PUBLIC_BASE_URL=https://fitmetrify-production.up.railway.app

💡 Criar conta no Resend, verificar o domínio fitmetrify.com.br e gerar a API key. O plano gratuito suporta 3.000 e-mails/mês — suficiente para a Fase 2.


4.2 Schema Prisma
Arquivo: prisma/schema.prisma — adicionar model
prismamodel NewsletterSubscriber {
  id          String    @id @default(cuid())
  email       String    @unique
  confirmed   Boolean   @default(false)
  token       String?   @unique
  source      String?           // "footer" | "calc-imc" | "blog" | etc.
  createdAt   DateTime  @default(now())
  confirmedAt DateTime?

  @@index([email])
  @@index([token])
  @@map("newsletter_subscribers")
}
bashnpx prisma migrate dev --name add_newsletter_subscriber
npx prisma generate

4.3 API Route: POST /api/newsletter/subscribe
Arquivo: app/api/newsletter/subscribe/route.ts
typescriptimport { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { randomBytes } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email, source } = await req.json();

  // Validação
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
  }

  // Verificar se já existe e está confirmado
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing?.confirmed) {
    return NextResponse.json({ message: "already_confirmed" }, { status: 200 });
  }

  // Gerar token de confirmação
  const token = randomBytes(32).toString("hex");
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/confirm?token=${token}`;

  // Criar ou atualizar subscriber
  await prisma.newsletterSubscriber.upsert({
    where:  { email },
    create: { email, token, source },
    update: { token, source },
  });

  // Enviar e-mail de confirmação
  await resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      email,
    subject: "Confirme seu cadastro no FitMetrify",
    html:    buildConfirmEmail(confirmUrl),
  });

  return NextResponse.json({ message: "confirmation_sent" }, { status: 200 });
}

4.4 API Route: GET /api/newsletter/confirm
Arquivo: app/api/newsletter/confirm/route.ts
typescriptimport { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?newsletter=invalid`);
  }

  const subscriber = await prisma.newsletterSubscriber.findUnique({ where: { token } });

  if (!subscriber) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/?newsletter=invalid`);
  }

  await prisma.newsletterSubscriber.update({
    where: { token },
    data:  { confirmed: true, confirmedAt: new Date(), token: null },
  });

  await sendWelcomeEmail(subscriber.email);

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/?newsletter=confirmed`
  );
}

4.5 Template do e-mail de confirmação
Arquivo: lib/email-templates/newsletter-confirm.ts
typescriptexport function buildConfirmEmail(confirmUrl: string): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px">
    <h1 style="color:#0F2D54;font-size:24px;margin-bottom:8px">
      Confirme seu cadastro no FitMetrify
    </h1>
    <p style="color:#334155;font-size:16px;line-height:1.6">
      Você está a um clique de receber dicas, guias e novidades sobre
      fitness, nutrição e performance.
    </p>
    <a href="${confirmUrl}"
       style="display:inline-block;background:#0F2D54;color:#fff;
              padding:14px 28px;border-radius:8px;text-decoration:none;
              font-size:16px;font-weight:bold;margin:24px 0">
      ✓ Confirmar meu e-mail
    </a>
    <p style="color:#64748B;font-size:14px">
      Se você não se cadastrou, ignore este e-mail.
      O link expira em 48 horas.
    </p>
    <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0">
    <p style="color:#64748B;font-size:12px">
      FitMetrify · Ferramentas Fitness Gratuitas
    </p>
  </div>`;
}

4.6 Template do e-mail de boas-vindas
Arquivo: lib/email-templates/newsletter-welcome.ts
typescriptexport async function sendWelcomeEmail(email: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  await resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      email,
    subject: "Bem-vindo ao FitMetrify 💪",
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px">
      <h1 style="color:#0F2D54">Bem-vindo ao FitMetrify!</h1>
      <p style="color:#334155;font-size:16px;line-height:1.6">
        Seu cadastro está confirmado. Você vai receber dicas de fitness,
        nutrição e performance diretamente aqui.
      </p>
      <h2 style="color:#1B4F8A;font-size:18px">Comece por aqui:</h2>
      <ul style="color:#334155;font-size:15px;line-height:2">
        <li><a href="${BASE_URL}/calculadora-imc">Calcular meu IMC</a></li>
        <li><a href="${BASE_URL}/calculadora-tmb">Descobrir minha TMB</a></li>
        <li><a href="${BASE_URL}/calculadora-deficit-calorico">Criar um déficit calórico</a></li>
        <li><a href="${BASE_URL}/calculadora-proteina">Calcular proteína diária</a></li>
      </ul>
    </div>`,
  });
}

4.7 Componente NewsletterForm no footer
Arquivo: components/layout/footer.tsx — atualizar o formulário existente
tsx"use client";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function NewsletterForm() {
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "already" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/newsletter/subscribe", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, source: "footer" }),
    });
    const data = await res.json();

    if (!res.ok)                                    setStatus("error");
    else if (data.message === "already_confirmed")  setStatus("already");
    else {
      setStatus("success");
      trackEvent("newsletter_signup", { source: "footer" });
    }
  }

  if (status === "success") return (
    <p className="text-green-400 font-medium">
      ✓ Verifique seu e-mail para confirmar o cadastro.
    </p>
  );
  if (status === "already") return (
    <p className="text-blue-300">Você já está cadastrado!</p>
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="seu@email.com"
        required
        disabled={status === "loading"}
        className="flex-1 rounded-lg px-4 py-2 text-sm bg-white/10
                   border border-white/20 text-white placeholder:text-white/50
                   focus:outline-none focus:ring-2 focus:ring-white/40"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-5 py-2 bg-white text-navy rounded-lg text-sm font-semibold
                   hover:bg-white/90 disabled:opacity-50 transition"
      >
        {status === "loading" ? "..." : "Inscrever"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1">
          Erro ao cadastrar. Tente novamente.
        </p>
      )}
    </form>
  );
}

4.8 Banner de confirmação na home
Após o redirect de /api/newsletter/confirm, o usuário chega na home com ?newsletter=confirmed.
Arquivo: app/page.tsx (home)
tsx"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function NewsletterConfirmBanner() {
  const params = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (params.get("newsletter") === "confirmed") setShow(true);
  }, [params]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                    bg-green-600 text-white px-6 py-3 rounded-full
                    shadow-lg flex items-center gap-2 text-sm font-medium">
      ✓ E-mail confirmado! Bem-vindo ao FitMetrify.
      <button onClick={() => setShow(false)} className="ml-2 text-white/70 hover:text-white">✕</button>
    </div>
  );
}
✅ Checklist — Etapa 3

 Migration Prisma aplicada sem erros
 POST /api/newsletter/subscribe retorna 200 + envia e-mail
 GET /api/newsletter/confirm grava confirmed: true no banco
 E-mail de confirmação chega na caixa (testar com e-mail real)
 E-mail de boas-vindas enviado após confirmação
 Footer form mostra "Verifique seu e-mail" após submit
 E-mail duplicado retorna "Você já está cadastrado"
 Evento newsletter_signup disparado no PostHog


5. Etapa 4 — Conteúdo Institucional e Redes Sociais
Objetivo: Substituir textos placeholder das páginas institucionais por conteúdo real e em conformidade com a LGPD. Corrigir links mortos de redes sociais no footer.
Estimativa: 1–2 dias · Pré-requisito: Etapas 1–3 concluídas

🚨 CRÍTICO: Privacidade e Termos devem ser publicados antes de qualquer campanha de marketing ou captação ativa de usuários (LGPD).


5.1 Página /sobre
Arquivo: app/sobre/page.tsx
Estrutura de conteúdo (página estática, sem "use client"):

H1: "Sobre o FitMetrify"
Seção 1 — O que é: missão — a principal plataforma brasileira de calculadoras fitness gratuitas, criada para democratizar o acesso a ferramentas de saúde e performance
Seção 2 — Nossa metodologia: como as fórmulas são escolhidas (literatura científica peer-reviewed, diretrizes OMS, ISSN, ACSM) e revisadas (data de última revisão visível em cada calculadora)
Seção 3 — Aviso médico (bloco destacado, visualmente proeminente):

"As calculadoras do FitMetrify são ferramentas educativas baseadas em fórmulas científicas validadas. Elas NÃO substituem avaliação de médico, nutricionista ou educador físico habilitado."


Seção 4 — Contato: link para /contato


5.2 Página /contato
Arquivo: app/contato/page.tsx
Campos do formulário: Nome (obrigatório), E-mail (obrigatório), Assunto (select: Sugestão / Erro / Parceria / Outro), Mensagem (textarea, obrigatório). Após envio: mostrar mensagem de sucesso e limpar formulário.
Arquivo: app/api/contact/route.ts
typescriptimport { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { nome, email, assunto, mensagem } = await req.json();

  if (!nome || !email || !mensagem) {
    return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
  }

  await resend.emails.send({
    from:    process.env.RESEND_FROM_EMAIL!,
    to:      "contato@fitmetrify.com.br", // e-mail real de destino
    replyTo: email,
    subject: `[Contato FitMetrify] ${assunto ?? "Sem assunto"}`,
    html:    `<p><b>De:</b> ${nome} (${email})</p><p>${mensagem}</p>`,
  });

  return NextResponse.json({ message: "sent" }, { status: 200 });
}

5.3 Página /privacidade (LGPD)
Arquivo: app/privacidade/page.tsx

🚨 O texto abaixo é um modelo técnico — recomenda-se revisão por advogado especializado em LGPD antes de publicar em produção.

A Política de Privacidade deve cobrir obrigatoriamente os seguintes pontos:

Controlador dos dados: identificar quem é o responsável (razão social ou nome + contato do DPO)
Dados coletados e finalidade:

sessionStorage (CalcContext): dados de cálculo (peso, altura, idade, etc.) — armazenados apenas na sessão do navegador, não são transmitidos a servidores
Newsletter: e-mail + confirmação de opt-in — finalidade: envio de conteúdo educativo fitness
Formulário de contato: nome, e-mail, mensagem — finalidade: responder a solicitações
Analytics (GA4 + PostHog): dados de uso anonimizados — finalidade: melhoria do produto


Base legal (LGPD Art. 7): legítimo interesse para analytics; consentimento para newsletter
Direitos do titular: acesso, correção, exclusão, portabilidade — canal: contato@fitmetrify.com.br
Compartilhamento: listar fornecedores terceiros (Google Analytics, PostHog, Resend) com links de privacidade de cada um
Cookies: informar quais cookies são utilizados (_ga, _gid do GA4; ph_* do PostHog)
Prazo de retenção: leads de newsletter → até descadastro; logs de analytics → 14 meses (padrão GA4)
DPO / Responsável: e-mail dedicado para questões de privacidade
Data de vigência e versão do documento


5.4 Página /termos
Arquivo: app/termos/page.tsx
Os Termos de Uso devem cobrir:

Natureza das ferramentas: as calculadoras são ferramentas educativas baseadas em fórmulas científicas. Os resultados são estimativas e não constituem diagnóstico, prescrição médica, nutricional ou de treinamento
Isenção de responsabilidade médica: o uso das calculadoras não substitui consulta profissional. O portal não se responsabiliza por decisões tomadas com base nos resultados
Limitações das fórmulas: cada calculadora apresenta limitações explicitadas em sua página. O usuário reconhece essas limitações ao usar a ferramenta
Conteúdo do blog: artigos têm fins educativos e informativos — não são orientação personalizada
Propriedade intelectual: código, design e conteúdo textual original são propriedade do FitMetrify
Alterações: o portal reserva-se o direito de alterar as calculadoras e seu conteúdo a qualquer momento
Lei aplicável: Brasil, foro da comarca do domicílio do controlador


5.5 Redes sociais no footer
Arquivo: components/layout/footer.tsx

⚠️ ATENÇÃO: Não manter href="#" em links de redes sociais. Links mortos prejudicam a credibilidade mais do que a ausência do ícone.

typescript// Substituir no footer:
const REDES_SOCIAIS = [
  // Incluir APENAS as redes com perfis ativos:
  { label: "Instagram", href: "https://instagram.com/fitmetrify", icon: InstagramIcon },
  { label: "YouTube",   href: "https://youtube.com/@fitmetrify",  icon: YoutubeIcon  },
  // Se o array estiver vazio, o bloco de redes não renderiza.
];
✅ Checklist — Etapa 4

 /sobre com conteúdo real — sem texto "em atualização"
 /contato formulário funcional — envio chega no e-mail destino
 /privacidade cobre todos os 9 pontos LGPD
 /termos com isenção médica clara e proeminente
 Nenhum href="#" em links de redes sociais no footer
 Sitemap inclui /sobre, /contato, /privacidade, /termos


6. Etapa 5 — Blog: Arquitetura e Primeiros Artigos
Objetivo: Implementar a estrutura do blog com MDX e publicar os 10 primeiros artigos otimizados para SEO.
Estimativa: 4–6 dias · Pré-requisito: Etapas 1–4 concluídas — especialmente analytics (para medir desde o dia 1)

6.1 Dependências
bashnpm install next-mdx-remote gray-matter reading-time
npm install -D @types/mdx

6.2 Estrutura de diretórios
content/
  blog/
    como-calcular-imc.mdx
    tmb-taxa-metabolica-basal.mdx
    ... (10 artigos)

lib/
  blog.ts                    ← funções para ler/listar artigos

app/
  blog/
    page.tsx                 ← listagem (SSG)
    [slug]/
      page.tsx               ← artigo individual (SSG)

components/
  blog/
    ArticleCard.tsx
    ArticleHero.tsx
    TableOfContents.tsx
    RelatedCalcCTA.tsx
    RelatedArticles.tsx

6.3 Frontmatter padrão de cada artigo
yaml---
title: "Como calcular o IMC corretamente"
slug: "como-calcular-imc"
excerpt: "Entenda o que é o Índice de Massa Corporal, como a fórmula funciona e como interpretar o resultado com segurança."
category: "emagrecimento"
tags: ["imc", "composição corporal", "peso"]
author: "FitMetrify"
publishedAt: "2026-06-15"
updatedAt: "2026-06-15"
coverImage: "/images/blog/como-calcular-imc.jpg"
relatedCalculators: ["calculadora-imc", "calculadora-tmb"]
seoTitle: "Como calcular o IMC | Fórmula, tabela e interpretação"
seoDescription: "Aprenda a calcular o IMC com a fórmula correta, veja a tabela de classificação da OMS e use nossa calculadora gratuita."
---

6.4 lib/blog.ts
Arquivo: lib/blog.ts
typescriptimport fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface ArticleMeta {
  title:              string;
  slug:               string;
  excerpt:            string;
  category:           string;
  tags:               string[];
  author:             string;
  publishedAt:        string;
  updatedAt:          string;
  coverImage:         string;
  relatedCalculators: string[];
  seoTitle:           string;
  seoDescription:     string;
  readingTimeMinutes: number;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllArticles(): ArticleMeta[] {
  return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".mdx"))
    .map(filename => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as Omit<ArticleMeta, "readingTimeMinutes">),
        readingTimeMinutes: Math.ceil(readingTime(content).minutes),
      };
    })
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleBySlug(slug: string) {
  const filepath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      ...(data as Omit<ArticleMeta, "readingTimeMinutes">),
      readingTimeMinutes: Math.ceil(readingTime(content).minutes),
    },
    content,
  };
}

6.5 app/blog/page.tsx (listagem SSG)
Arquivo: app/blog/page.tsx
tsximport { getAllArticles } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { canonicalUrl } from "@/lib/metadata";

export async function generateMetadata() {
  return {
    title: "Blog FitMetrify — Dicas de Fitness, Nutrição e Performance",
    description: "Artigos gratuitos sobre emagrecimento, hipertrofia, corrida e nutrição, escritos com base científica.",
    alternates: { canonical: canonicalUrl("/blog") },
    openGraph: { url: canonicalUrl("/blog") },
  };
}

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <main>
      <section>
        <h1>Blog FitMetrify</h1>
        <p>Dicas de fitness, nutrição e performance com base científica.</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(a => <ArticleCard key={a.slug} article={a} />)}
      </section>
    </main>
  );
}

6.6 app/blog/[slug]/page.tsx (artigo individual)
Arquivo: app/blog/[slug]/page.tsx
tsximport { getAllArticles, getArticleBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { canonicalUrl } from "@/lib/metadata";
import { RelatedCalcCTA } from "@/components/blog/RelatedCalcCTA";
import { RelatedArticles } from "@/components/blog/RelatedArticles";
import { ArticleHero } from "@/components/blog/ArticleHero";

export async function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { meta } = getArticleBySlug(params.slug);
  return {
    title:       meta.seoTitle,
    description: meta.seoDescription,
    alternates:  { canonical: canonicalUrl(`/blog/${params.slug}`) },
    openGraph: {
      url:           canonicalUrl(`/blog/${params.slug}`),
      images:        [meta.coverImage],
      type:          "article",
      publishedTime: meta.publishedAt,
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { meta, content } = getArticleBySlug(params.slug);

  const jsonLd = {
    "@context":      "https://schema.org",
    "@type":         "Article",
    "headline":      meta.title,
    "description":   meta.seoDescription,
    "datePublished": meta.publishedAt,
    "dateModified":  meta.updatedAt,
    "author":        { "@type": "Organization", "name": "FitMetrify" },
    "publisher":     { "@type": "Organization", "name": "FitMetrify",
                       "url": canonicalUrl("/") },
    "image":         meta.coverImage,
    "url":           canonicalUrl(`/blog/${meta.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-8">
        <ArticleHero meta={meta} />
        <div className="prose prose-lg max-w-none">
          <MDXRemote source={content} />
        </div>
        <RelatedCalcCTA slugs={meta.relatedCalculators} />
        <RelatedArticles currentSlug={meta.slug} category={meta.category} />
      </article>
    </>
  );
}

6.7 Componente RelatedCalcCTA
Arquivo: components/blog/RelatedCalcCTA.tsx
Principal mecanismo de conversão do blog → calculadoras.
tsximport Link from "next/link";
import { calculatorRegistry } from "@/lib/calculators"; // registry existente

export function RelatedCalcCTA({ slugs }: { slugs: string[] }) {
  const calcs = slugs
    .map(slug => calculatorRegistry[slug])
    .filter(Boolean)
    .slice(0, 2); // máximo 2 CTAs por artigo

  if (calcs.length === 0) return null;

  return (
    <div className="my-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
      <p className="text-sm font-semibold text-blue-700 mb-3 uppercase tracking-wide">
        Calcule agora, gratuitamente
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        {calcs.map(calc => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2
                       bg-blue-600 text-white px-5 py-3 rounded-lg font-medium
                       hover:bg-blue-700 transition text-sm"
          >
            {calc.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}

6.8 Atualizar sitemap para incluir /blog
Arquivo: app/sitemap.ts (ou onde estiver o sitemap atual)
typescriptimport { getAllArticles } from "@/lib/blog";
import { BASE_URL } from "@/lib/metadata";

// Adicionar ao array existente de URLs:
const blogEntries = getAllArticles().map(a => ({
  url:             `${BASE_URL}/blog/${a.slug}`,
  lastModified:    new Date(a.updatedAt),
  changeFrequency: "weekly" as const,
  priority:        0.7,
}));

const blogIndex = {
  url:             `${BASE_URL}/blog`,
  lastModified:    new Date(),
  changeFrequency: "daily" as const,
  priority:        0.8,
};

6.9 Atualizar link "Blog" no header
Arquivo: lib/navigation.ts (ou onde estiver a config do header)
typescript// Substituir:
{ label: "Blog", href: "#" }

// Por:
{ label: "Blog", href: "/blog" }

6.10 Os 10 artigos a publicar
Criar os arquivos abaixo em content/blog/. Cada artigo deve ter entre 1.200 e 2.500 palavras, incluir a fórmula/tabela principal do tema e terminar com um RelatedCalcCTA.
Arquivo MDXTítulo H1Palavra-chave principalCalculadora CTAcomo-calcular-imc.mdx"Como calcular o IMC corretamente""como calcular imc"calculadora-imctmb-taxa-metabolica-basal.mdx"TMB: o que é e como calcular""taxa metabolica basal"calculadora-tmbquantas-calorias-preciso-por-dia.mdx"Quantas calorias preciso por dia?""quantas calorias por dia"calculadora-gasto-caloricodeficit-calorico-como-criar.mdx"Déficit calórico: guia completo""deficit calorico"calculadora-deficit-caloricoquanto-de-proteina-por-dia.mdx"Quanto de proteína devo comer por dia?""proteina por dia"calculadora-proteinapercentual-de-gordura-corporal.mdx"Percentual de gordura corporal: guia""percentual de gordura corporal"calculadora-percentual-gordurao-que-e-1rm.mdx"1RM: o que é e como calcular o seu""o que e 1rm"calculadora-1rmpace-de-corrida.mdx"Pace de corrida: como calcular e melhorar""pace de corrida"calculadora-pacefrequencia-cardiaca-maxima.mdx"Frequência cardíaca máxima: guia completo""frequencia cardiaca maxima"calculadora-fc-maximamacronutrientes-guia-pratico.mdx"Macronutrientes: guia prático para iniciantes""macronutrientes"calculadora-macros
Estrutura padrão de cada artigo

Introdução: contexto + problema que o leitor quer resolver (150–200 palavras)
O que é [tema]: definição clara em linguagem acessível
A fórmula / método: exibir a fórmula, explicar cada variável
Como calcular passo a passo: exemplo numérico com valores reais
Tabela de referência / classificação: quando aplicável (IMC, % gordura, FC, etc.)
[RelatedCalcCTA — inserir aqui no meio do artigo]
Erros comuns e limitações: o que a fórmula não considera
Perguntas frequentes: 3–5 perguntas em formato FAQ (alimenta JSON-LD FAQPage)
[RelatedCalcCTA + links para artigos relacionados]

✅ Checklist — Etapa 5

 /blog renderiza sem erro (npm run build sem erros)
 /blog/[slug] com generateStaticParams — build gera 10 páginas estáticas
 Canonical /blog/[slug] correto — não aponta para localhost
 JSON-LD Article em cada artigo — validar em Schema.org Rich Results
 RelatedCalcCTA aparece em todos os artigos — clicar leva à calculadora correta
 Sitemap inclui /blog e os 10 slugs — ver /sitemap.xml
 Link "Blog" no header aponta para /blog — não mais href="#"
 Evento blog_article_read disparando — confirmar no PostHog
 10 artigos com frontmatter completo — todos os campos obrigatórios presentes


7. Variáveis de Ambiente — Referência Completa
Configurar no Railway (produção) e no .env.local (desenvolvimento).
VariávelValor / OrigemObrigatóriaEtapaNEXT_PUBLIC_BASE_URLhttps://fitmetrify-production.up.railway.appSimJá existeNEXT_PUBLIC_GA_MEASUREMENT_IDG-XXXXXXXXXX — painel GA4SimEtapa 2NEXT_PUBLIC_POSTHOG_KEYphc_XXX — painel PostHogSimEtapa 2NEXT_PUBLIC_POSTHOG_HOSThttps://app.posthog.comSimEtapa 2RESEND_API_KEYre_XXX — painel ResendSimEtapa 3RESEND_FROM_EMAILnewsletter@fitmetrify.com.brSimEtapa 3DATABASE_URLConexão Postgres do RailwaySimEtapa 3

⚠️ ATENÇÃO: Nunca commitar .env.local no git. Verificar se .gitignore inclui .env*. No Railway: Settings → Variables.


8. Checklist Final da Fase 2
Etapa 1 — Gaps técnicos

 UnitToggle funcionando em: IMC avançado, Proteína, Macros (modo g/kg), Água, Previsor, Conversor
 CalcContext prefill em: Proteína, Água, Cal/Refeição, Peso Ideal, 1RM, Volume
 NextStepBanner em: Proteína→Cal/Ref, Macros→Cal/Ref, 1RM→Zonas, Zonas→Volume, Pace→Previsor
 Textos de Limitações atualizados em: Pace, Conversor, Volume, Cal/Refeição, Água

Etapa 2 — Analytics

 GA4 e PostHog instalados e disparando pageviews
 6 eventos customizados implementados e rastreados
 calc_completed marcado como conversão no GA4
 Variáveis de ambiente configuradas no Railway

Etapa 3 — Newsletter

 Schema Prisma com NewsletterSubscriber + migration aplicada
 Fluxo completo de double opt-in funcionando end-to-end
 E-mail de confirmação + boas-vindas chegando na caixa
 Footer form com feedback correto em todos os estados

Etapa 4 — Institucional

 Todas as 4 páginas com conteúdo real (sem placeholder)
 Política de Privacidade cobre todos os requisitos LGPD
 Formulário de contato funcionando (e-mail chega)
 Nenhum href="#" em links de redes sociais no footer

Etapa 5 — Blog

 Rota /blog funcionando (SSG)
 10 artigos publicados com frontmatter completo
 JSON-LD Article em cada artigo (validado em schema.org)
 Sitemap atualizado com /blog e todos os slugs
 Link "Blog" no header aponta para /blog
 RelatedCalcCTA presente em todos os artigos

KPIs finais
KPIMetaComo medirVisitas orgânicas/mês15.000GA4 → Acquisition → Organic SearchTaxa de conclusão das calcs> 60%GA4: calc_completed / calc_startedTaxa de jornada IMC → Macros> 25%PostHog: funnel IMC → TMB → Gasto → Déficit → MacrosLeads newsletter confirmados500SELECT COUNT(*) WHERE confirmed = trueArtigos indexados no Google10Google Search Console → Coverage → IndexedConformidade jurídica LGPDPrivacidade + Termos publicadosRevisão manual