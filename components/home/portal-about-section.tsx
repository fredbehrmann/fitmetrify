import {
  BookOpen,
  Calculator,
  Sparkles,
  Zap,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

const benefits = [
  {
    icon: Sparkles,
    title: "100% gratuito",
    description: "Todas as calculadoras disponíveis sem custo ou cadastro.",
  },
  {
    icon: Zap,
    title: "Resultados instantâneos",
    description: "Cálculos rápidos com interpretação clara dos resultados.",
  },
  {
    icon: Calculator,
    title: "Modos simples e avançado",
    description: "Comece com o essencial ou aprofunde com dados adicionais.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo educativo",
    description: "Entenda fórmulas, limitações e próximos passos em cada ferramenta.",
  },
];

export function PortalAboutSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <SectionHeading
              title="Por que usar o FitMetrify?"
              className="mb-0"
            />
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                O FitMetrify transforma dados em evolução. Somos um portal
                gratuito de calculadoras fitness pensado para quem leva saúde,
                nutrição e performance a sério — com a precisão de uma
                plataforma profissional.
              </p>
              <p>
                De emagrecimento a hipertrofia, de corrida a musculação, nossas
                ferramentas ajudam você a calcular, entender e agir com base em
                métricas confiáveis, não em achismos.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass-card space-y-3 p-5">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                  <Icon className="text-primary size-5" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
