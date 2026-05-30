"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NextStepConfig } from "@/lib/calc-context/next-steps";

type NextStepBannerProps = {
  config: NextStepConfig;
};

export function NextStepBanner({ config }: NextStepBannerProps) {
  return (
    <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
      <p className="text-primary mb-1 text-sm font-semibold">Próximo passo</p>
      <h4 className="mb-2 text-base font-semibold">{config.titulo}</h4>
      <p className="text-muted-foreground mb-4 text-sm">{config.descricao}</p>
      {config.dadosPassados.length > 0 && (
        <p className="text-muted-foreground mb-4 text-xs">
          Serão pré-preenchidos: {config.dadosPassados.join(", ")}
        </p>
      )}
      <Button asChild variant="default" size="sm">
        <Link href={config.href}>
          Continuar jornada
          <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}
