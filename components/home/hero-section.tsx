import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Calculator,
  Flame,
  Heart,
  Scale,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const trustBadges = [
  { icon: Sparkles, label: "100% Gratuito" },
  { icon: Shield, label: "Seguro e Privado" },
  { icon: Zap, label: "Resultados Instantâneos" },
];

const floatingIcons = [
  { icon: Heart, className: "top-8 right-12" },
  { icon: Scale, className: "top-1/3 right-4" },
  { icon: Activity, className: "bottom-1/3 right-16" },
  { icon: Flame, className: "bottom-12 right-6" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="from-background via-background to-background-secondary absolute inset-0 bg-gradient-to-b" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">
              Portal de calculadoras fitness
            </p>
            <h1>
              Calcule.
              <br />
              Entenda.
              <br />
              <span className="text-primary">Evolua.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              Transforme números em resultados com ferramentas precisas para
              emagrecimento, nutrição, corrida e musculação. Gratuito, rápido e
              feito para quem leva a evolução a sério.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/calculadora-imc">
                <Calculator className="size-5" />
                Calcular meu IMC
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/calculadoras">
                Ver todas as calculadoras
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap gap-4">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <Icon className="text-primary size-4" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-lg lg:max-w-none">
          <div className="glass-card relative h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80"
              alt="Atletas treinando em academia"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            {floatingIcons.map(({ icon: Icon, className }) => (
              <div
                key={className}
                className={`bg-primary/15 border-primary/30 absolute flex size-12 items-center justify-center rounded-full border backdrop-blur-sm ${className}`}
              >
                <Icon className="text-primary size-5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
