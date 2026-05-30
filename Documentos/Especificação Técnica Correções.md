
FitMetrify
Especificação Técnica de Implementação
  Portal de Calculadoras Fitness  

Auditoria técnica e plano de melhorias — 16 calculadoras
Implementação dividida em 5 etapas sequenciais

Calculadoras auditadas	Funcionando	Em desenvolvimento
16	11	3

Problemas críticos identificados	Etapas de implementação
5	5

Preparado com base em auditoria técnica realizada por especialista em educação física e nutrição
Maio 2026
 
Índice


 
1. Visão Geral do Projeto
O FitMetrify é um portal de calculadoras fitness voltado para emagrecimento, nutrição, corrida e musculação. A presente especificação detalha todas as correções, melhorias e novos desenvolvimentos a serem implementados no Cursor AI, organizados em 5 etapas sequenciais de forma que cada etapa entregue valor imediato ao usuário antes de avançar para a próxima.

1.1 Stack tecnológica assumida
💡 NOTA: Esta especificação foi escrita para a stack Next.js (App Router) com TypeScript, que é consistente com o código-fonte identificado no portal. Adaptar conforme o stack real confirmado no repositório.

Camada	Tecnologia
Framework	Next.js 14+ com App Router (TypeScript)
Estilização	Tailwind CSS
Estado global	Zustand ou Context API (para fluxo guiado entre calculadoras)
SEO	next/head com canonical dinâmico baseado em NEXT_PUBLIC_BASE_URL
Deploy	Railway (produção atual)

1.2 Problemas críticos transversais (afetam todas as páginas)
🚨 CRÍTICO: URL canônica aponta para http://localhost:3001 em TODAS as 16 páginas. Isso prejudica gravemente o SEO e indica variável de ambiente não configurada no ambiente de produção.
🚨 CRÍTICO: Duas calculadoras (Peso Ideal e Calorias por Refeição) estão publicadas na navegação principal com motor de cálculo desativado, gerando frustração ao usuário.
🚨 CRÍTICO: O fluxo entre calculadoras é fragmentado: o usuário precisa copiar valores manualmente entre telas (ex: TMB → Gasto Calórico → Déficit). Não há persistência de dados entre calculadoras relacionadas.
🔧 CORREÇÃO: Erro tipográfico na FAQ da calculadora de TMB: "Taxa Metabórica" em vez de "Taxa Metabólica Basal".
 
2. Mapa Completo de Calculadoras
A tabela abaixo consolida todas as 16 calculadoras auditadas com status atual, prioridade de correção e etapa de implementação.

Calculadora	Problema principal	Status	Etapa
IMC	Falta classificação geriátrica; sem preset por sistema imperial	Funcional	Etapa 2
TMB	Erro tipográfico no FAQ; falta Harris-Benedict	Funcional	Etapa 1
Gasto Calórico	Fluxo fragmentado: exige copiar TMB manualmente	Funcional	Etapa 3
Déficit Calórico	Sem alerta de piso calórico mínimo; fluxo fragmentado	Funcional	Etapa 3
Peso Ideal	Motor de cálculo desativado — não entrega resultado	EM DEV	Etapa 1
Proteína Diária	Usa peso total; falta orientação plant-based	Funcional	Etapa 2
Macronutrientes	Sem abordagem g/kg; sem periodização nutricional	Funcional	Etapa 3
Água Diária	Sem ajuste etário; ref. para clima quente pode ser baixa	Funcional	Etapa 2
Calorias por Refeição	Motor de cálculo desativado — não entrega resultado	EM DEV	Etapa 1
Pace	Input de tempo só em minutos decimais (deveria ser HH:MM:SS)	Funcional	Etapa 2
Conversor Pace/Vel.	Conversão mão-única (só pace→velocidade); input confuso	Funcional	Etapa 2
Previsor de Tempo	Input de tempo limitado; sem presets de distâncias	Funcional	Etapa 2
1RM	Sem campo de exercício; sem aviso de segurança	Funcional	Etapa 2
Volume de Treino	Só 1 exercício por vez; sem totalizador de sessão	Funcional	Etapa 3
Zonas de Carga	Apenas 4 zonas fixas; falta número de reps por zona	Funcional	Etapa 2
% Gordura Corporal	Não existe ainda — necessário para o portal	NOVA	Etapa 4
FC Máxima e Zonas	Não existe ainda — necessário para o portal	NOVA	Etapa 4

 
3. Etapa 1 — Correções Críticas e Calculadoras Quebradas
Objetivo: Corrigir todos os problemas que bloqueiam o funcionamento básico do portal. Esta etapa deve ser concluída antes de qualquer outra. Estimativa: 1–2 dias de desenvolvimento.

  1.1  Correção da URL Canônica (SEO crítico)

🚨 CRÍTICO: Impacto: todas as 16 páginas têm canonical apontando para localhost. Isso faz motores de busca desconsiderar o conteúdo do portal.

Problema
Em todos os arquivos de metadados (layout.tsx ou page.tsx com generateMetadata), a URL canônica está hardcoded ou utiliza uma variável não configurada, resultando em:
// Resultado atual (incorreto):
<link rel="canonical" href="http://localhost:3001/calculadora-imc" />
Solução
1. Criar variável de ambiente no Railway:
NEXT_PUBLIC_BASE_URL=https://fitmetrify-production.up.railway.app
2. Criar helper centralizado em lib/metadata.ts:
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  ?? "https://fitmetrify-production.up.railway.app";

export function canonicalUrl(path: string): string {
  return `${BASE_URL}${path}`;
}
3. Substituir em TODOS os generateMetadata das 16 calculadoras:
// app/calculadora-imc/page.tsx
import { canonicalUrl } from "@/lib/metadata";

export async function generateMetadata() {
  return {
    alternates: {
      canonical: canonicalUrl("/calculadora-imc"),
    },
    // ... demais metadados
  };
}
4. Verificar em produção após deploy que a tag canonical está correta em todas as páginas.

  1.2  Correção do Erro Tipográfico — TMB

Localização
Arquivo: app/calculadora-tmb/page.tsx (ou componente de FAQ da TMB)
// Texto atual (ERRADO):
"TMB é a Taxa Metabórica Basal: o gasto calórico..."

// Texto correto:
"TMB é a Taxa Metabólica Basal: o gasto calórico..."

  1.3  Sinalização de Calculadoras em Desenvolvimento

As calculadoras de Peso Ideal e Calorias por Refeição devem ser sinalizadas claramente. Opção A (recomendada): adicionar badge visual. Opção B: remover temporariamente da navegação.
Opção A — Badge "Em Breve" (recomendada)
Criar componente Badge em components/ui/ComingSoonBadge.tsx:
export function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
      bg-amber-100 text-amber-800 text-xs font-medium border border-amber-300">
      <span>🚧</span> Em breve
    </span>
  );
}
Adicionar o badge nos cards da home e na página de listagem de calculadoras, ao lado do nome das calculadoras afetadas.
No topo da página das calculadoras quebradas, adicionar banner de aviso:
<div className="rounded-lg bg-amber-50 border border-amber-200 p-4 mb-6">
  <p className="text-amber-800 font-medium">
    ⚠ Esta calculadora está em desenvolvimento.
    Os resultados estarão disponíveis em breve.
  </p>
  <p className="text-amber-700 text-sm mt-1">
    Enquanto isso, use a <a href="/calculadora-imc">Calculadora de IMC</a>
    para referência de composição corporal.
  </p>
</div>
Opção B — Remover da navegação principal
Se preferir não mostrar calculadoras incompletas: remover os links dessas calculadoras do menu principal e da home, mantendo as URLs acessíveis mas sem destaque na navegação.

  1.4  Implementação — Calculadora de Peso Ideal

⚠ ATENÇÃO: Esta calculadora está publicada mas o motor está desativado. Implementar o cálculo completo conforme especificação abaixo.
Inputs
Modo simples:
•	Altura (cm) — numérico, range 100–250
•	Sexo — Masculino / Feminino
Modo avançado (adicional):
•	Peso atual (kg) — para mostrar diferença até o peso saudável
•	Percentual de gordura (%) — opcional, para cálculo complementar
•	Biotipo — Ectomorfo / Mesomorfo / Endomorfo (ajuste de ±5% no alvo)
Fórmulas a implementar
Implementar as 4 fórmulas abaixo e exibir comparativo:
Fórmula	Cálculo (Masculino / Feminino)
IMC saudável (OMS)	Faixa: altura² × 18.5 até altura² × 24.9
Devine (1974)	H: 50 + 2.3 × (altura_pol − 60) | M: 45.5 + 2.3 × (altura_pol − 60)
Robinson (1983)	H: 52 + 1.9 × (altura_pol − 60) | M: 49 + 1.7 × (altura_pol − 60)
Miller (1983)	H: 56.2 + 1.41 × (altura_pol − 60) | M: 53.1 + 1.36 × (altura_pol − 60)
altura_pol = altura_cm / 2.54

Outputs
•	Faixa de peso saudável pela OMS (min–max em kg)
•	Peso central calculado pela média das 4 fórmulas
•	Tabela comparativa das 4 fórmulas
•	Se peso atual informado: diferença até a faixa saudável (+/− kg)
•	Classificação contextual: "Você está X kg acima da faixa saudável"
💡 NOTA: Evitar linguagem de "peso ideal único" — usar sempre "faixa de peso saudável" para não reforçar percepções distorcidas de corpo.

  1.5  Implementação — Calculadora de Calorias por Refeição

Inputs — Modo Simples
•	Calorias diárias totais (kcal) — numérico
•	Número de refeições — select: 2, 3, 4, 5, 6
Inputs — Modo Avançado
•	Horário estimado de treino — Manhã / Tarde / Noite / Não treino
•	Protocolo alimentar — Distribuição uniforme / Pré-treino maior / Pós-treino maior / Jejum 16:8 / Jejum 18:6
•	Maior refeição — Café da manhã / Almoço / Jantar
Lógica de cálculo
Modo simples: divisão igualitária.
calPorRefeicao = caloriasDiarias / numRefeicoes
Modo avançado — distribuição percentual por protocolo:
Protocolo	Distribuição sugerida
Uniforme	Todas as refeições com percentual igual
Pré-treino maior	Refeição pré-treino: +30% | demais: distribuídas igualmente no restante
Pós-treino maior	Refeição pós-treino: +30% | demais: distribuídas igualmente no restante
Jejum 16:8	3 refeições em janela de 8h; primeira = 25%, segunda = 40%, terceira = 35%
Jejum 18:6	2–3 refeições em janela de 6h; distribuição uniforme dentro da janela
Outputs
•	Calorias por refeição (kcal) — para cada refeição nomeada
•	Percentual de cada refeição sobre o total
•	Proteína estimada por refeição (assumindo 25–30% das calorias em proteína, 4 kcal/g)
•	Aviso quando nenhuma refeição atinge 25g de proteína (síntese proteica subótima)

 
4. Etapa 2 — Melhorias nas Calculadoras Funcionais
Objetivo: Aprimorar as calculadoras que já funcionam, corrigindo limitações técnicas e de UX identificadas na auditoria. Estimativa: 3–4 dias de desenvolvimento.

  2.1  Calculadora de IMC — Melhorias

Correções e adições
•	Adicionar classificação diferenciada para idosos (≥ 60 anos): sobrepeso = IMC ≥ 27, conforme recomendação para populações idosas
•	Adicionar opção de entrada em sistema imperial (pés/polegadas e libras) com conversão automática para métrico
•	No resultado, adicionar botão de ação "Calcular meu Gasto Calórico" que pré-preenche os dados na próxima calculadora (ver Etapa 3)
•	No modo avançado, incluir estimativa de percentual de gordura baseada no IMC e circunferência abdominal (fórmula de Deurenberg)
Lógica de classificação ampliada
Classificação	IMC adulto (18–59a)	IMC idoso (≥60a)
Baixo peso	< 18.5	< 22.0
Peso normal	18.5 – 24.9	22.0 – 26.9
Sobrepeso	25.0 – 29.9	27.0 – 29.9
Obesidade I	30.0 – 34.9	30.0 – 34.9
Obesidade II	35.0 – 39.9	35.0 – 39.9
Obesidade III	≥ 40.0	≥ 40.0

  2.2  Calculadora de TMB — Melhorias

Adições ao modo avançado
•	Adicionar Harris-Benedict revisada (Roza & Shizgal, 1984) como terceira opção:
// Harris-Benedict revisada
Homem: TMB = 88.362 + (13.397 × peso) + (4.799 × altura) − (5.677 × idade)
Mulher: TMB = 447.593 + (9.247 × peso) + (3.098 × altura) − (4.330 × idade)
•	Mostrar resultado em kcal/hora além de kcal/dia (kcal/hora = TMB / 24)
•	Adicionar nota contextual para mulheres sobre variação de TMB nas fases do ciclo menstrual (~5–10% de variação)
•	No modo avançado, exibir comparação entre Mifflin-St Jeor, Katch-McArdle e Harris-Benedict em tabela

  2.3  Calculadoras de Corrida — Input de Tempo HH:MM:SS

⚠ ATENÇÃO: Este problema afeta 3 calculadoras: Pace, Conversor Pace/Velocidade e Previsor de Tempo. A correção deve ser aplicada com um componente compartilhado.
Componente TimeInput compartilhado
Criar components/calculadoras/TimeInput.tsx:
interface TimeInputProps {
  label: string;
  value: number; // total em segundos
  onChange: (seconds: number) => void;
}

export function TimeInput({ label, value, onChange }: TimeInputProps) {
  const h = Math.floor(value / 3600);
  const m = Math.floor((value % 3600) / 60);
  const s = value % 60;

  const update = (hh: number, mm: number, ss: number) => {
    onChange(hh * 3600 + mm * 60 + ss);
  };

  return (
    <div>
      <label>{label}</label>
      <div className="flex gap-2 items-center">
        <input type="number" min={0} max={99} value={h}
          onChange={e => update(+e.target.value, m, s)} placeholder="00" />
        <span>h</span>
        <input type="number" min={0} max={59} value={m}
          onChange={e => update(h, +e.target.value, s)} placeholder="00" />
        <span>min</span>
        <input type="number" min={0} max={59} value={s}
          onChange={e => update(h, m, +e.target.value)} placeholder="00" />
        <span>seg</span>
      </div>
    </div>
  );
}
Substituir o campo de tempo em minutos decimais por este componente nas 3 calculadoras afetadas.

Calculadora de Pace — Melhorias adicionais
•	Adicionar toggle km / milhas nos inputs de distância
•	Adicionar tabela de pace-alvo para 5K / 10K / 21K / 42K no resultado
•	Incluir estimativa de zonas de frequência cardíaca baseadas no pace (se o usuário informar FC máxima ou idade)

Conversor Pace / Velocidade — Melhorias adicionais
•	Implementar conversão bidirecional: o usuário pode partir de pace (min/km) OU de velocidade (km/h) e obter o outro
•	Substituir instrução confusa "5:30 = 5,5" pelo novo componente TimeInput (mm:ss separados)
•	Adicionar tabela de referência rápida de equivalências comuns (de 4 km/h a 20 km/h)

Previsor de Tempo de Corrida — Melhorias adicionais
•	Adicionar botões de preset para distâncias populares: 5K / 10K / 21,097K / 42,195K
•	Mostrar pace médio previsto por km junto ao tempo estimado no resultado
•	Adicionar opção de calcular pace-alvo parcial para cumprir o tempo previsto (estratégia de prova)

  2.4  Calculadora de Proteína Diária — Melhorias

•	Quando percentual de gordura for informado no modo avançado, usar massa magra como base do cálculo (não peso total):
massaMagra = peso × (1 − percentualGordura / 100);
proteinaAlvo = massaMagra × faixaG_kg;
•	Adicionar orientação específica para dietas plant-based: "Vegetarianos e veganos devem priorizar combinação de leguminosas + cereais e aumentar a ingestão em ~10–15% pela menor digestibilidade das proteínas vegetais."
•	Exibir proteína alvo em gramas por refeição de forma proeminente no resultado (assumindo 4–5 refeições)
•	Adicionar exemplos de fontes proteicas por refeição: frango (31g/100g), atum (29g/100g), tofu (17g/100g), lentilha (9g/100g)

  2.5  Calculadora de Água Diária — Melhorias

•	Adicionar campo de faixa etária com ajuste para idosos (≥ 60 anos: +5 ml/kg base, pois o mecanismo de sede fica comprometido)
•	No modo avançado, incluir ajuste por clima: "Clima tropical ou calor intenso" → +5 ml/kg na base (de 35 para 40 ml/kg)
•	Adicionar opção de visualizar a meta diária convertida em copos de 250 ml ao longo do horário do dia
•	Incluir escala visual de cor da urina como referência de hidratação no resultado (de amarelo-claro = hidratado até âmbar-escuro = desidratado)

  2.6  Calculadora de 1RM — Melhorias

•	Adicionar campo de seleção do exercício (lista: Supino Reto, Supino Inclinado, Desenvolvimento, Agachamento Livre, Terra, Remada, Barra Fixa, Leg Press, Rosca Direta — com opção "Outro")
•	Adicionar aviso de segurança proeminente no topo da calculadora:
⚠ ATENÇÃO: Não realize testes de 1RM máximo real sem supervisão de um profissional de educação física certificado, especialmente nos exercícios Agachamento Livre, Levantamento Terra e Supino Reto com barra.
•	No resultado, exibir tabela de classificação de força relativa (fraco / abaixo da média / médio / acima da média / elite) baseada no exercício selecionado, sexo e peso corporal
•	Adicionar botão "Ver Zonas de Carga com este 1RM" que passa o valor calculado para a calculadora de Zonas de Carga (fluxo integrado)

  2.7  Calculadora de Zonas de Carga — Melhorias

•	Expandir de 4 para 6 zonas de carga com faixas de repetições correspondentes:
Zona / Objetivo	% do 1RM	Reps alvo	Carga (ex.: 1RM 100kg)
Resistência muscular	50–60%	15–20+	50–60 kg
Hipertrofia moderada	60–70%	12–15	60–70 kg
Hipertrofia principal	70–80%	8–12	70–80 kg
Força-hipertrofia	80–85%	5–8	80–85 kg
Força máxima	85–95%	2–5	85–95 kg
Potência / Teste	95–100%	1–2	95–100 kg
•	Adicionar escala de RPE (Rate of Perceived Exertion, 1–10) como alternativa ao %1RM para usuários que não conhecem o 1RM
•	Incluir campo de exercício de referência para contextualizar os valores exibidos

 
5. Etapa 3 — Fluxo Guiado e Integração entre Calculadoras
Objetivo: Eliminar o fluxo fragmentado onde o usuário precisa copiar valores manualmente entre calculadoras. Implementar persistência de dados e fluxo guiado sequencial. Esta é a melhoria de UX mais impactante do portal. Estimativa: 3–4 dias de desenvolvimento.

  3.1  Contexto Global de Cálculo (CalcContext)

Criar um contexto global que armazena os resultados das calculadoras durante a sessão do usuário, permitindo que calculadoras subsequentes pré-preencham seus campos automaticamente.
Estrutura do contexto
// lib/calc-context.ts
interface CalcState {
  // Dados do usuário
  peso?: number;        // kg
  altura?: number;      // cm
  idade?: number;       // anos
  sexo?: "M" | "F";
  percentualGordura?: number;

  // Resultados calculados
  tmb?: number;         // kcal/dia
  get?: number;         // kcal/dia (Gasto Energético Total)
  deficitAlvo?: number; // kcal/dia
  imc?: number;
  pesoIdeal?: { min: number; max: number };

  // Musculação
  exercicio1rm?: string;
  estimativa1rm?: number; // kg
}

interface CalcContextType {
  state: CalcState;
  update: (partial: Partial<CalcState>) => void;
  reset: () => void;
}
Implementar com Zustand (persist middleware para sobreviver a navegação entre páginas) ou com Context API + sessionStorage.
// Exemplo com Zustand
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCalcStore = create<CalcContextType>()(
  persist(
    (set) => ({
      state: {},
      update: (partial) => set((s) => ({ state: { ...s.state, ...partial } })),
      reset: () => set({ state: {} }),
    }),
    { name: "fitmetrify-calc", storage: createJSONStorage(() => sessionStorage) }
  )
);

  3.2  Fluxo Guiado — Jornada de Emagrecimento

Implementar componente de "Próximo Passo" que aparece abaixo do resultado de cada calculadora, guiando o usuário pela jornada completa.
Fluxo: IMC → TMB → Gasto Calórico → Déficit → Macros
// components/calculadoras/NextStepBanner.tsx

interface NextStepConfig {
  titulo: string;
  descricao: string;
  href: string;
  dadosPassados?: string[]; // quais campos serão pré-preenchidos
}

// Configuração por calculadora:
const NEXT_STEPS: Record<string, NextStepConfig> = {
  "imc": {
    titulo: "Calcule sua Taxa Metabólica Basal",
    descricao: "Com seu IMC calculado, o próximo passo é descobrir
      quantas calorias seu corpo gasta em repouso.",
    href: "/calculadora-tmb",
    dadosPassados: ["peso", "altura", "idade", "sexo"],
  },
  "tmb": {
    titulo: "Calcule seu Gasto Calórico Total",
    descricao: "Sua TMB já foi salva. Clique para calcular
      seu gasto calórico com base no nível de atividade.",
    href: "/calculadora-gasto-calorico",
    dadosPassados: ["tmb"],
  },
  "gasto-calorico": {
    titulo: "Defina seu Déficit Calórico",
    descricao: "Seu gasto diário foi calculado.
      Agora defina a estratégia de déficit para emagrecer.",
    href: "/calculadora-deficit-calorico",
    dadosPassados: ["get"],
  },
  "deficit-calorico": {
    titulo: "Distribua seus Macronutrientes",
    descricao: "Com as calorias alvo definidas, distribua
      proteína, carboidrato e gordura.",
    href: "/calculadora-macros",
    dadosPassados: ["deficitAlvo"],
  },
};
Comportamento de pré-preenchimento
Quando o usuário chega em uma calculadora via fluxo guiado, os campos já calculados devem ser pré-preenchidos automaticamente:
// Em calculadora-gasto-calorico/page.tsx
const { state } = useCalcStore();

const [tmb, setTmb] = useState(state.tmb ?? "");

// Mostrar banner informativo quando há dados pré-preenchidos:
{state.tmb && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
    <p className="text-blue-800 text-sm">
      ✓ TMB de {state.tmb} kcal/dia importada da calculadora anterior.
    </p>
  </div>
)}

  3.3  Calculadora de Gasto Calórico — Integração TMB

Atualmente o usuário precisa calcular a TMB separadamente e inserir o valor manualmente. Implementar modo integrado:
•	Se o usuário chegou via fluxo guiado: pré-preencher o campo TMB com o valor do contexto
•	Se o usuário chegou diretamente: exibir campos de cálculo de TMB inline (peso, altura, idade, sexo) com botão "Calcular TMB e continuar"
•	Adicionar exemplos contextualizados para cada nível de atividade:
Nível	Fator	Exemplo prático
Sedentário	1.2	Trabalho de escritório, sem exercícios regulares
Levemente ativo	1.375	1–2 treinos leves por semana; caminha bastante
Moderadamente ativo	1.55	3–4 treinos por semana; trabalho com algum movimento
Muito ativo	1.725	5–6 treinos intensos por semana ou trabalho físico
Extremamente ativo	1.9	Atletas em preparação; 2x treino/dia; trabalho manual pesado

  3.4  Calculadora de Déficit Calórico — Melhorias de segurança

•	Pré-preencher gasto diário com o valor do contexto (GET calculado anteriormente)
•	Implementar alerta de piso calórico mínimo:
const PISO_CALORICO = { F: 1200, M: 1500 };

const caloriasAlvo = get * (1 - percentualDeficit / 100);

if (state.sexo && caloriasAlvo < PISO_CALORICO[state.sexo]) {
  mostrarAlerta(
    `Atenção: ${caloriasAlvo.toFixed(0)} kcal está abaixo do
    mínimo recomendado de ${PISO_CALORICO[state.sexo]} kcal/dia.
    Déficits abaixo deste valor aumentam o risco de perda muscular,
    fadiga e deficiências nutricionais. Reduza o percentual de déficit`,
    "warn"
  );
}
•	Adicionar aviso sobre adaptação metabólica em déficits com duração superior a 8 semanas: "Em déficits prolongados o metabolismo se adapta. Considere semanas de recarga calórica (diet breaks) a cada 8–12 semanas."
•	Mostrar projeção de semanas até a meta no modo simples (não apenas no avançado)

  3.5  Calculadora de Macronutrientes — Integração e melhorias

•	Pré-preencher calorias diárias com o valor do contexto (déficit alvo ou GET)
•	Implementar abordagem por g/kg como alternativa à abordagem percentual:
// Modo por g/kg (mais preciso para praticantes de musculação):
proteinaG = peso × faixaProteina_gKg; // 1.6–2.2 g/kg
gorduraG  = peso × faixaGordura_gKg;  // 0.8–1.2 g/kg
calProtein = proteinaG * 4;
calGordura = gorduraG * 9;
calCarbo   = caloriasAlvo - calProtein - calGordura;
carboG     = calCarbo / 4;
•	Adicionar toggle "Dia de treino / Dia de descanso" no modo avançado com distribuição diferente de carboidratos (+20% no dia de treino, −20% no dia de descanso, mantendo proteína constante)
•	Incluir exemplos alimentares para cada macro no resultado: frango para proteína, arroz para carboidrato, azeite para gordura

 
6. Etapa 4 — Novas Calculadoras
Objetivo: Implementar as calculadoras que estão faltando no portal e são essenciais para o público fitness. Estimativa: 3–4 dias de desenvolvimento.

  4.1  Nova Calculadora: Percentual de Gordura Corporal

URL: /calculadora-percentual-gordura
Categoria: Emagrecimento / Composição Corporal
Justificativa
O IMC é limitado por não diferenciar massa muscular de gordura. O percentual de gordura é a métrica mais relevante para composição corporal e é frequentemente mencionada nas limitações das outras calculadoras do portal. A ausência desta calculadora é uma lacuna crítica.
Inputs — Modo Simples (equação de marinha dos EUA)
•	Sexo — Masculino / Feminino
•	Altura (cm)
•	Circunferência da cintura (cm) — medida na altura do umbigo
•	Circunferência do pescoço (cm) — medida abaixo da laringe
•	Circunferência do quadril (cm) — apenas para mulheres (ponto mais largo)
Fórmula — Método da Marinha dos EUA (US Navy)
// Homem:
bodyFat_M = 86.010 * log10(cintura - pescoco)
          - 70.041 * log10(altura)
          + 36.76

// Mulher:
bodyFat_F = 163.205 * log10(cintura + quadril - pescoco)
          - 97.684 * log10(altura)
          - 78.387
Inputs — Modo Avançado (Jackson-Pollock 3 dobras)
•	Densidade corporal via dobras cutâneas (Jackson & Pollock, 1978):
◦	Homem: Peitoral (mm) + Abdômen (mm) + Coxa (mm)
◦	Mulher: Tríceps (mm) + Supra-ilíaca (mm) + Coxa (mm)
// Homem — Jackson-Pollock 3 dobras:
S = peitoral + abdomen + coxa; // soma das dobras em mm
D = 1.10938 - (0.0008267 * S) + (0.0000016 * S²) - (0.0002574 * idade)
%Gordura = (4.95 / D - 4.50) * 100  // Siri equation

// Mulher — Jackson-Pollock 3 dobras:
S = triceps + suprailiaca + coxa;
D = 1.0994921 - (0.0009929 * S) + (0.0000023 * S²) - (0.0001392 * idade)
%Gordura = (4.95 / D - 4.50) * 100
Outputs
•	Percentual de gordura estimado (%)
•	Massa gorda (kg) = peso × %gordura / 100
•	Massa magra (kg) = peso − massa gorda
•	Classificação por faixa etária e sexo:
Classificação	H 20–39a	H 40–59a	M 20–39a	M 40–59a
Atlético	< 8%	< 11%	< 21%	< 24%
Boa forma	8–16%	11–17%	21–27%	24–30%
Aceitável	16–20%	17–22%	27–31%	30–35%
Excesso de gordura	20–25%	22–27%	31–36%	35–40%
Obesidade	> 25%	> 27%	> 36%	> 40%
•	Após o resultado: botão "Usar massa magra na Calculadora de TMB" (fluxo integrado com Katch-McArdle)

  4.2  Nova Calculadora: FC Máxima e Zonas de Frequência Cardíaca

URL: /calculadora-fc-maxima
Categoria: Corrida / Performance Aeróbica
Justificativa
A frequência cardíaca é o principal indicador de intensidade aeróbica. Qualquer corredor ou praticante de cardio necessita dessa informação para treinar com segurança e eficiência. A ausência desta calculadora cria uma lacuna significativa na seção de corrida.
Inputs — Modo Simples
•	Idade (anos)
•	Fórmula para FC máxima — select: Tanaka (padrão) / Fox (clássica) / Gellish
Inputs — Modo Avançado
•	FC de repouso (bpm) — para cálculo da Reserva de FC (método Karvonen)
•	Nível de condicionamento — Iniciante / Intermediário / Avançado / Atleta
•	Objetivo do treino — Queima de gordura / Aeróbico / Limiar anaeróbico / VO2max
Fórmulas de FC máxima
// Tanaka (2001) — mais precisa, recomendada como padrão:
FCmax = 208 - (0.7 × idade)

// Fox (1971) — clássica, ainda amplamente usada:
FCmax = 220 - idade

// Gellish (2007) — melhor para indivíduos treinados:
FCmax = 207 - (0.7 × idade)
Zonas de FC — Método Karvonen (com FC de repouso)
FCR = FCmax - FCrepouso; // Reserva de FC

// FC alvo = FCrepouso + (% × FCR)
Zona 1 (Recuperação):     50–60% FCR = FCrep + (0.50–0.60) × FCR
Zona 2 (Aeróbico base):   60–70% FCR
Zona 3 (Aeróbico intenso):70–80% FCR
Zona 4 (Limiar anaeróbico):80–90% FCR
Zona 5 (VO2max):          90–100% FCR
Outputs
•	FC máxima estimada pelas fórmulas selecionadas (comparativo se modo avançado)
•	Tabela de 5 zonas com faixas de bpm e descrição do benefício de cada zona
•	Percentual de tempo recomendado em cada zona (pirâmide de treinamento: 80% abaixo do limiar, 20% acima)
•	Integração: botão "Usar FC máxima na Calculadora de Pace" para estimar pace por zona cardíaca

  4.3  Melhorias no Volume de Treino — Sessão Completa

⚠ ATENÇÃO: A calculadora de Volume de Treino atual calcula apenas um exercício por vez. A refatoração abaixo transforma em uma calculadora de sessão completa.
Nova funcionalidade: múltiplos exercícios por sessão
•	Implementar lista dinâmica de exercícios com botão "Adicionar exercício":
interface Exercicio {
  id: string;
  nome: string;
  grupoMuscular: string; // Peito / Costas / Ombros / Bíceps / Tríceps / Pernas / Core / Glúteos
  series: number;
  reps: number;
  carga: number; // kg
}

const volumeExercicio = (e: Exercicio) => e.series * e.reps * e.carga;
const volumeSessao = exercicios.reduce((acc, e) => acc + volumeExercicio(e), 0);
•	Mostrar volume total da sessão e volume por grupo muscular
•	Comparar com referências de volume efetivo semanal por músculo (Schoenfeld, 2017):
Grupo muscular	Volume mínimo (séries/semana)	Volume ótimo (séries/semana)
Peito	10	12–20
Costas	10	14–22
Ombros	8	12–20
Pernas (Quad)	10	12–20
Posterior de coxa	8	10–16
Glúteos	8	12–18
Bíceps	8	10–16
Tríceps	8	10–16

 
7. Etapa 5 — Polimento, SEO e Experiência Final
Objetivo: Finalizar a experiência do usuário com melhorias de usabilidade transversais, SEO estrutural e qualidade de conteúdo. Estimativa: 2–3 dias de desenvolvimento.

  5.1  Suporte ao Sistema Imperial

Criar componente UnitToggle para as calculadoras que trabalham com peso, altura e distância:
// components/ui/UnitToggle.tsx
type Sistema = "metrico" | "imperial";

export function UnitToggle({ value, onChange }: {
  value: Sistema;
  onChange: (s: Sistema) => void;
}) {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
      {(["metrico", "imperial"] as Sistema[]).map(s => (
        <button key={s} onClick={() => onChange(s)}
          className={s === value ? "bg-white shadow px-3 py-1 rounded" : "px-3 py-1"}
        >
          {s === "metrico" ? "kg / cm" : "lb / ft"}
        </button>
      ))}
    </div>
  );
}

// Helpers de conversão:
export const lbToKg = (lb: number) => lb * 0.453592;
export const kgToLb = (kg: number) => kg * 2.20462;
export const cmToFtIn = (cm: number) => ({
  ft: Math.floor(cm / 30.48),
  in: Math.round((cm % 30.48) / 2.54),
});
export const ftInToCm = (ft: number, inch: number) => ft * 30.48 + inch * 2.54;
Aplicar em: IMC, Gasto Calórico, TMB, Peso Ideal, Percentual de Gordura.

  5.2  SEO Estrutural

•	Verificar e corrigir metadados og:url e twitter:url (atualmente também apontam para localhost)
•	Adicionar dados estruturados (JSON-LD) do tipo WebApplication em todas as calculadoras:
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Calculadora de IMC — FitMetrify",
  "url": canonicalUrl("/calculadora-imc"),
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
};

// No JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
•	Adicionar breadcrumb estruturado (BreadcrumbList) em todas as páginas de calculadoras
•	Verificar e adicionar meta description única e descritiva para cada calculadora

  5.3  Navegação e Links de Rodapé

•	Corrigir links "Sobre", "Contato", "Privacidade" e "Termos de uso" no rodapé — atualmente todos apontam para "#" (âncora vazia)
•	Criar páginas placeholder ou modais para: Sobre o FitMetrify / Política de Privacidade / Termos de Uso
•	Adicionar as novas calculadoras (Percentual de Gordura e FC Máxima) na navegação e nos cards da home
•	Atualizar as seções "Calculadoras relacionadas" para incluir as novas ferramentas

  5.4  Acessibilidade e Responsividade

•	Garantir que todos os inputs de formulário têm labels explícitas (não apenas placeholder)
•	Adicionar atributos aria-describedby nos campos com limites ou formatação específica
•	Verificar contraste de cor em todos os estados (normal, hover, focus, disabled)
•	Testar o componente TimeInput em dispositivos móveis — os três campos numéricos pequenos (h/min/seg) precisam de touch area mínima de 44×44px
•	Adicionar role="alert" nos banners de aviso que aparecem dinamicamente (piso calórico, déficit agressivo)

  5.5  Qualidade de Conteúdo

•	Revisar todos os textos de "Limitações" para garantir que citam a fórmula/método utilizado e sua margem de erro
•	Padronizar o aviso legal de rodapé em todas as calculadoras — atualmente o texto varia levemente entre páginas
•	Adicionar data de última revisão científica nos conteúdos educativos de cada calculadora
•	Criar seção "Como medir corretamente" para calculadoras que dependem de medições (circunferências, dobras cutâneas) com instruções textuais claras

 
8. Roadmap de Implementação

Tarefa	Etapa	Prioridade	Esforço
Corrigir URL canônica em todas as 16 páginas (variável NEXT_PUBLIC_BASE_URL)	Etapa 1	🔴 Crítica	0.5d
Corrigir erro tipográfico "Metabórica" na TMB	Etapa 1	🔴 Crítica	0.25h
Adicionar badge "Em breve" em Peso Ideal e Calorias por Refeição	Etapa 1	🔴 Crítica	2h
Implementar motor de cálculo — Peso Ideal (4 fórmulas)	Etapa 1	🔴 Crítica	4h
Implementar motor de cálculo — Calorias por Refeição (com protocolos)	Etapa 1	🔴 Crítica	4h
IMC: classificação geriátrica + suporte imperial	Etapa 2	🟠 Alta	3h
TMB: Harris-Benedict revisada + kcal/hora + nota ciclo menstrual	Etapa 2	🟠 Alta	2h
Criar componente TimeInput (HH:MM:SS) e aplicar em 3 calculadoras de corrida	Etapa 2	🟠 Alta	3h
Pace: toggle km/milhas + tabela de paces por distância	Etapa 2	🟠 Alta	2h
Conversor Pace/Velocidade: bidirecional + tabela de referência	Etapa 2	🟠 Alta	2h
Previsor de Tempo: presets 5K/10K/21K/42K + pace médio previsto	Etapa 2	🟠 Alta	2h
Proteína: usar massa magra como base + orientação plant-based	Etapa 2	🟠 Alta	2h
Água: ajuste etário + ajuste climático + escala cor de urina	Etapa 2	🟠 Alta	2h
1RM: campo de exercício + aviso de segurança + tabela de força	Etapa 2	🟠 Alta	3h
Zonas de Carga: expandir para 6 zonas + reps por zona + RPE	Etapa 2	🟠 Alta	2h
Criar CalcContext (Zustand + sessionStorage)	Etapa 3	🟡 Média	4h
Implementar NextStepBanner em todas as calculadoras de emagrecimento	Etapa 3	🟡 Média	3h
Gasto Calórico: modo integrado com TMB inline + exemplos de nível de atividade	Etapa 3	🟡 Média	3h
Déficit: pré-preenchimento + alerta piso calórico + projeção de semanas	Etapa 3	🟡 Média	2h
Macros: integração com contexto + abordagem g/kg + periodização	Etapa 3	🟡 Média	3h
Volume de Treino: refatorar para múltiplos exercícios por sessão	Etapa 3	🟡 Média	4h
Nova calculadora: Percentual de Gordura (US Navy + Jackson-Pollock)	Etapa 4	🟡 Média	6h
Nova calculadora: FC Máxima e Zonas (Karvonen + 3 fórmulas)	Etapa 4	🟡 Média	5h
Integrar % Gordura com TMB (Katch-McArdle) via CalcContext	Etapa 4	🟡 Média	2h
Integrar FC Máxima com Calculadora de Pace	Etapa 4	🟡 Média	2h
Criar componente UnitToggle e aplicar em calculadoras de corpo	Etapa 5	🟢 Normal	3h
Adicionar JSON-LD (WebApplication + BreadcrumbList) em todas as páginas	Etapa 5	🟢 Normal	2h
Corrigir links do rodapé + criar páginas institucionais placeholder	Etapa 5	🟢 Normal	3h
Adicionar novas calculadoras na navegação, home e seções relacionadas	Etapa 5	🟢 Normal	2h
Revisão de acessibilidade (labels, aria, touch area, contraste)	Etapa 5	🟢 Normal	3h
Revisão e padronização de todos os textos de limitações e aviso legal	Etapa 5	🟢 Normal	2h

 
9. Convenções de Código para o Cursor AI
Padrões a seguir durante toda a implementação para garantir consistência e manutenibilidade.

  9.1  Estrutura de arquivos

app/
  calculadora-[nome]/
    page.tsx          ← generateMetadata + layout da página
    components/       ← componentes específicos desta calculadora
      [Nome]Form.tsx  ← formulário de inputs
      [Nome]Result.tsx← exibição de resultado

components/
  calculadoras/       ← componentes compartilhados entre calculadoras
    TimeInput.tsx
    UnitToggle.tsx
    NextStepBanner.tsx
    ComingSoonBadge.tsx
    ResultCard.tsx
    AlertBox.tsx
  ui/                 ← componentes de design system

lib/
  metadata.ts         ← canonicalUrl helper
  calc-context.ts     ← CalcState interface + useCalcStore
  conversions.ts      ← lbToKg, kgToLb, ftInToCm, etc.
  formulas/           ← lógica de cálculo pura (sem React)
    imc.ts
    tmb.ts
    gasto-calorico.ts
    deficit.ts
    macros.ts
    proteina.ts
    agua.ts
    calorias-refeicao.ts
    pace.ts
    previsor-tempo.ts
    rm1.ts
    zonas-carga.ts
    volume-treino.ts
    peso-ideal.ts
    percentual-gordura.ts
    fc-maxima.ts

  9.2  Padrão de função de cálculo

Todas as funções de cálculo devem ser funções puras exportadas de lib/formulas/[nome].ts, sem dependências de React:
// lib/formulas/imc.ts

export interface ImcInput {
  peso: number;   // kg
  altura: number; // cm
  idade?: number;
  sexo?: "M" | "F";
}

export interface ImcResult {
  imc: number;
  classificacao: string;
  faixaIdeal: { min: number; max: number };
  alertas: string[];
}

export function calcularImc(input: ImcInput): ImcResult {
  const alturaM = input.altura / 100;
  const imc = input.peso / (alturaM * alturaM);
  // ... lógica de classificação
  return { imc, classificacao, faixaIdeal, alertas };
}

  9.3  Tratamento de edge cases

Implementar validação de inputs em TODAS as calculadoras:
// Ranges aceitáveis por campo:
const RANGES = {
  peso:   { min: 20,  max: 400, label: "Peso" },
  altura: { min: 100, max: 250, label: "Altura" },
  idade:  { min: 10,  max: 100, label: "Idade" },
  carga:  { min: 0.5, max: 500, label: "Carga" },
  reps:   { min: 1,   max: 50,  label: "Repetições" },
  series: { min: 1,   max: 20,  label: "Séries" },
};

function validar(valor: number, campo: keyof typeof RANGES): string | null {
  const r = RANGES[campo];
  if (isNaN(valor)) return `${r.label} é obrigatório.`;
  if (valor < r.min) return `${r.label} mínimo: ${r.min}`;
  if (valor > r.max) return `${r.label} máximo: ${r.max}`;
  return null;
}

 
