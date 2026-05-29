import Link from "next/link";
import { ArrowRight, BookOpen, HeartPulse, LineChart, Target } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Entenda seu resultado",
    description:
      "Interpretações claras para transformar números em insights sobre seu corpo.",
    href: "/calculadora-imc",
    cta: "Saiba mais",
  },
  {
    icon: Target,
    title: "Defina sua meta",
    description:
      "Ferramentas para planejar emagrecimento, ganho de massa ou performance.",
    href: "/calculadora-deficit-calorico",
    cta: "Criar meta",
  },
  {
    icon: LineChart,
    title: "Acompanhe sua evolução",
    description:
      "Métricas consistentes para monitorar progresso ao longo do tempo.",
    href: "/calculadoras",
    cta: "Ver progresso",
  },
  {
    icon: HeartPulse,
    title: "Melhore sua saúde",
    description:
      "Recomendações educativas para hábitos mais saudáveis no dia a dia.",
    href: "/calculadora-agua",
    cta: "Dicas de saúde",
  },
];

export function FeatureCardsSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Tudo que você precisa para evoluir"
          subtitle="Ferramentas pensadas para quem quer resultados com base em dados, não achismos."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="card-hover">
                <CardHeader>
                  <div className="bg-primary/10 mb-2 flex size-11 items-center justify-center rounded-xl">
                    <Icon className="text-primary size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    {feature.cta}
                    <ArrowRight className="size-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
