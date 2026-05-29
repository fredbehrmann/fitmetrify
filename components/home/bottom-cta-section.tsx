import Link from "next/link";
import { Calculator, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";

export function BottomCtaSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-card flex flex-col items-center gap-6 p-8 text-center md:flex-row md:text-left lg:p-10">
          <div className="bg-primary/10 flex size-16 shrink-0 items-center justify-center rounded-2xl">
            <Trophy className="text-primary size-8" />
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold md:text-3xl">
              Pronto para dar o primeiro passo?
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Comece calculando seu IMC e descubra como pequenas métricas podem
              guiar grandes transformações na sua saúde e performance.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link href="/calculadora-imc">
              <Calculator className="size-5" />
              Calcular meu IMC
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
