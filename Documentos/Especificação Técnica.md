

# Especificação Técnica — MVP FitMetrify - Portal de Calculadoras Fitness

## Objetivo da MVP

Construir um portal web gratuito com calculadoras fitness, nutrição, emagrecimento, corrida e musculação, com foco em:

* SEO;
* uso simples;
* cálculo rápido;
* versão avançada opcional;
* possibilidade futura de área do usuário e monetização premium.

---

# Etapa 1 — Estrutura inicial do projeto

## Desenvolver

Aplicação web com:

* Next.js;
* TypeScript;
* Tailwind CSS;
* shadcn/ui;
* PostgreSQL;
* Prisma;
* Docker.

## Entregáveis

* Estrutura base do projeto;
* Layout global;
* Header;
* Footer;
* Página inicial;
* Sistema de rotas para calculadoras.

---

# Etapa 2 — Modelagem das calculadoras

Criar uma estrutura reutilizável para todas as calculadoras.

## Modelo sugerido

Cada calculadora deve possuir:

```ts
type Calculator = {
  slug: string;
  title: string;
  description: string;
  category: string;
  inputs: CalculatorInput[];
  simpleMode: boolean;
  advancedMode: boolean;
  seoTitle: string;
  seoDescription: string;
  content: string;
  faq: FaqItem[];
};
```

## Categorias iniciais

* Emagrecimento;
* Nutrição;
* Corrida;
* Musculação;
* Saúde geral.

---

# Etapa 3 — Página inicial do portal

## Desenvolver

Página inicial com:

* Campo de busca;
* Cards das principais calculadoras;
* Categorias;
* Ferramentas populares;
* Bloco explicativo sobre o portal;
* Chamadas para SEO.

## Exemplo de seções

* “Calculadoras para emagrecimento”
* “Calculadoras para ganho de massa”
* “Ferramentas para corrida”
* “Ferramentas para musculação”

---

# Etapa 4 — Template padrão das calculadoras

Cada calculadora deve ter o mesmo padrão visual.

## Estrutura da página

1. Título;
2. Descrição curta;
3. Abas: **Cálculo simples** e **Cálculo avançado**;
4. Formulário;
5. Resultado;
6. Interpretação;
7. Explicação da fórmula;
8. Conteúdo educativo;
9. FAQ;
10. Aviso de responsabilidade.

## Aviso obrigatório

> Os resultados são estimativas educativas e não substituem avaliação de médico, nutricionista ou profissional de educação física.

---

# Etapa 5 — Calculadora de IMC

## Objetivo

Calcular o Índice de Massa Corporal.

## Cálculo simples

### Entradas

* Peso em kg;
* Altura em cm.

### Fórmula

```txt
IMC = peso / altura²
```

Altura deve ser convertida para metros.

### Saída

* IMC;
* Classificação;
* Mensagem interpretativa.

## Classificação

|         IMC | Classificação      |
| ----------: | ------------------ |
|      < 18,5 | Abaixo do peso     |
| 18,5 a 24,9 | Peso normal        |
|   25 a 29,9 | Sobrepeso          |
|   30 a 34,9 | Obesidade grau I   |
|   35 a 39,9 | Obesidade grau II  |
|        ≥ 40 | Obesidade grau III |

## Cálculo avançado

### Entradas adicionais

* Sexo;
* Idade;
* Circunferência abdominal;
* Nível de atividade.

### Resultado adicional

* Alerta sobre limitação do IMC;
* Indicação de avaliar percentual de gordura;
* Sugestão de próxima calculadora.

---

# Etapa 6 — Calculadora de TMB

## Objetivo

Estimar a Taxa Metabólica Basal.

## Cálculo simples

### Entradas

* Sexo;
* Peso;
* Altura;
* Idade.

## Fórmula recomendada

Mifflin-St Jeor.

### Homem

```txt
TMB = 10 × peso + 6,25 × altura - 5 × idade + 5
```

### Mulher

```txt
TMB = 10 × peso + 6,25 × altura - 5 × idade - 161
```

## Saídas

* TMB em kcal/dia;
* Explicação do que significa;
* Link para gasto calórico total.

## Cálculo avançado

### Entradas adicionais

* Percentual de gordura, se conhecido;
* Massa magra estimada.

Quando houver percentual de gordura, permitir fórmula baseada em massa magra:

```txt
TMB = 370 + 21,6 × massa magra
```

---

# Etapa 7 — Calculadora de Gasto Calórico Diário

## Objetivo

Calcular o gasto energético total diário.

## Cálculo simples

### Entradas

* TMB;
* Nível de atividade.

## Fatores de atividade

| Nível               | Fator |
| ------------------- | ----: |
| Sedentário          |   1,2 |
| Levemente ativo     | 1,375 |
| Moderadamente ativo |  1,55 |
| Muito ativo         | 1,725 |
| Extremamente ativo  |   1,9 |

## Fórmula

```txt
GET = TMB × fator de atividade
```

## Cálculo avançado

### Entradas adicionais

* Dias de musculação por semana;
* Dias de cardio por semana;
* Duração média dos treinos;
* Trabalho sentado, em pé ou físico;
* Meta: emagrecer, manter ou ganhar massa.

## Saídas

* Calorias de manutenção;
* Calorias para emagrecimento;
* Calorias para hipertrofia;
* Faixa recomendada.

---

# Etapa 8 — Calculadora de Déficit Calórico

## Objetivo

Estimar calorias para perda de peso.

## Cálculo simples

### Entradas

* Gasto diário;
* Objetivo: leve, moderado ou agressivo.

## Regras

| Estratégia | Déficit |
| ---------- | ------: |
| Leve       |     10% |
| Moderado   |     20% |
| Agressivo  |     25% |

## Saída

* Calorias diárias sugeridas;
* Déficit diário;
* Déficit semanal;
* Estimativa de perda semanal.

Usar referência:

```txt
1 kg de gordura ≈ 7.700 kcal
```

## Cálculo avançado

### Entradas adicionais

* Peso atual;
* Peso desejado;
* Prazo desejado;
* Sexo;
* Nível de treino;
* Proteína mínima desejada.

## Saídas avançadas

* Prazo estimado realista;
* Déficit necessário;
* Alerta se a meta for agressiva;
* Recomendação de não reduzir calorias excessivamente.

---

# Etapa 9 — Calculadora de Proteína Diária

## Objetivo

Calcular ingestão diária de proteína.

## Cálculo simples

### Entradas

* Peso;
* Objetivo.

## Regras sugeridas

| Objetivo                 |       Proteína |
| ------------------------ | -------------: |
| Sedentário / saúde geral | 0,8 a 1,2 g/kg |
| Emagrecimento            | 1,6 a 2,2 g/kg |
| Hipertrofia              | 1,6 a 2,2 g/kg |
| Atleta / treino intenso  | 2,0 a 2,4 g/kg |

## Saída

* Proteína mínima;
* Proteína ideal;
* Proteína máxima sugerida;
* Exemplos práticos.

## Cálculo avançado

### Entradas adicionais

* Percentual de gordura;
* Massa magra;
* Tipo de treino;
* Frequência semanal;
* Preferência alimentar.

## Saída avançada

* Proteína por massa magra;
* Distribuição por refeição;
* Exemplo:

```txt
160g de proteína/dia em 4 refeições = 40g por refeição
```

---

# Etapa 10 — Calculadora de Macronutrientes

## Objetivo

Distribuir calorias em proteína, carboidrato e gordura.

## Cálculo simples

### Entradas

* Calorias diárias;
* Objetivo.

## Distribuições padrão

### Emagrecimento

* Proteína: 30%;
* Gordura: 25%;
* Carboidrato: 45%.

### Manutenção

* Proteína: 25%;
* Gordura: 25%;
* Carboidrato: 50%.

### Hipertrofia

* Proteína: 25%;
* Gordura: 20%;
* Carboidrato: 55%.

## Conversões

```txt
1g proteína = 4 kcal
1g carboidrato = 4 kcal
1g gordura = 9 kcal
```

## Cálculo avançado

### Entradas adicionais

* Proteína fixa em g/kg;
* Gordura mínima em g/kg;
* Carboidrato ajustável;
* Dias de treino e descanso.

## Saídas

* Macros para dia de treino;
* Macros para dia de descanso;
* Calorias totais;
* Percentual de cada macro.

---

# Etapa 11 — Calculadora de Água Diária

## Objetivo

Estimar ingestão de água.

## Cálculo simples

### Entrada

* Peso.

## Fórmula

```txt
Água = peso × 35 ml
```

## Cálculo avançado

### Entradas adicionais

* Tempo de treino;
* Clima quente;
* Consumo de cafeína;
* Sudorese alta;
* Corrida ou musculação.

## Ajustes

* +500 ml por hora de treino;
* +300 a 500 ml em clima quente;
* +250 ml se houver alta ingestão de cafeína.

## Saída

* Litros por dia;
* Copos de 250 ml;
* Recomendação distribuída ao longo do dia.

---

# Etapa 12 — Calculadoras de Corrida

## 12.1 Calculadora de Pace

### Entradas

* Distância;
* Tempo.

### Saída

* Pace médio;
* Velocidade média.

### Fórmula

```txt
Pace = tempo / distância
Velocidade = distância / tempo
```

## 12.2 Conversor Pace para Velocidade

### Entrada

* Pace em min/km.

### Saída

* Velocidade em km/h.

## 12.3 Previsor de Tempo

### Cálculo simples

Entrada:

* Distância conhecida;
* Tempo conhecido;
* Nova distância desejada.

Usar fórmula de Riegel:

```txt
T2 = T1 × (D2 / D1)^1,06
```

## Cálculo avançado

Entradas adicionais:

* Experiência do corredor;
* Tipo de prova;
* Desnível;
* Temperatura;
* Frequência semanal de treino.

Saída:

* Tempo otimista;
* Tempo provável;
* Tempo conservador.

---

# Etapa 13 — Calculadoras de Musculação

## 13.1 Calculadora de 1RM

## Objetivo

Estimar carga máxima para uma repetição.

### Cálculo simples

Entradas:

* Carga;
* Repetições.

Fórmula de Brzycki:

```txt
1RM = carga × 36 / (37 - repetições)
```

### Saída

* 1RM estimado;
* 90%;
* 80%;
* 70%;
* 60%.

## Cálculo avançado

Permitir comparar métodos:

* Brzycki;
* Epley;
* Lombardi.

Exibir média dos métodos.

## 13.2 Calculadora de Volume de Treino

### Entradas

* Exercício;
* Séries;
* Repetições;
* Carga.

### Fórmula

```txt
Volume = séries × repetições × carga
```

## Saídas

* Volume por exercício;
* Volume total;
* Sugestão de controle progressivo.

---

# Etapa 14 — Resultado, interpretação e recomendações

Todas as calculadoras devem retornar mais do que apenas número.

## Cada resultado deve conter

1. Valor principal;
2. Classificação;
3. Interpretação;
4. Próximos passos;
5. Links para calculadoras relacionadas.

## Exemplo

Após calcular TMB:

> Sua TMB estimada é de 1.820 kcal/dia. Esse é o gasto aproximado do seu corpo em repouso. Para saber quantas calorias consumir por dia, calcule agora seu gasto calórico total.

## Recomendações cruzadas

* IMC → percentual de gordura;
* TMB → gasto calórico;
* Gasto calórico → déficit calórico;
* Proteína → macronutrientes;
* Pace → previsão de tempo;
* 1RM → zonas de carga.

---

# Etapa 15 — SEO, conteúdo e publicação

## Cada calculadora deve possuir

* URL amigável;
* Title SEO;
* Meta description;
* H1 único;
* Conteúdo explicativo;
* FAQ;
* Schema.org FAQ;
* Schema.org SoftwareApplication ou WebApplication;
* Breadcrumbs;
* Links internos.

## Exemplo de URL

```txt
/calculadora-imc
/calculadora-tmb
/calculadora-gasto-calorico
/calculadora-proteina
/calculadora-macros
/calculadora-pace
/calculadora-1rm
```

## Conteúdo mínimo por página

* O que a calculadora faz;
* Como o cálculo é feito;
* Fórmula utilizada;
* Como interpretar o resultado;
* Limitações;
* Perguntas frequentes.

---

# Calculadoras mínimas da MVP

## Emagrecimento

1. IMC;
2. TMB;
3. Gasto calórico diário;
4. Déficit calórico;
5. Peso ideal.

## Nutrição

6. Proteína diária;
7. Macronutrientes;
8. Água diária;
9. Calorias por refeição.

## Corrida

10. Pace;
11. Conversor pace/velocidade;
12. Previsor de tempo.

## Musculação

13. 1RM;
14. Volume de treino;
15. Zonas de carga.

---

# Regras gerais de validação

## Peso

* Mínimo: 30 kg;
* Máximo: 300 kg.

## Altura

* Mínimo: 100 cm;
* Máximo: 250 cm.

## Idade

* Mínimo: 14 anos;
* Máximo: 100 anos.

## Calorias

* Mínimo: 800 kcal;
* Máximo: 8.000 kcal.

## Repetições no 1RM

* Mínimo: 1;
* Máximo recomendado: 12.

Acima de 12 repetições, exibir alerta:

> Estimativas de 1RM ficam menos precisas com muitas repetições.

---

# Requisitos técnicos gerais

## Frontend

* Componentes reutilizáveis;
* Formulários com React Hook Form;
* Validação com Zod;
* Resultado em cards;
* Responsivo mobile-first.

## Backend

* Inicialmente, os cálculos podem rodar no frontend;
* Criar funções puras em `/lib/calculators`;
* Preparar estrutura para salvar histórico futuramente.

## Exemplo de organização

```txt
/lib/calculators/imc.ts
/lib/calculators/tmb.ts
/lib/calculators/macros.ts
/lib/calculators/pace.ts
/lib/calculators/one-rep-max.ts
```

## Testes

Criar testes unitários para:

* Fórmulas;
* Validações;
* Classificações;
* Casos extremos.

---

# Entrega final da MVP

Ao final das 15 etapas, o sistema deve entregar:

* Portal público funcional;
* 15 calculadoras fitness;
* Modo simples e avançado onde aplicável;
* Páginas otimizadas para SEO;
* Conteúdo educativo;
* FAQ por ferramenta;
* Layout responsivo;
* Base pronta para login, histórico e área premium futura.
