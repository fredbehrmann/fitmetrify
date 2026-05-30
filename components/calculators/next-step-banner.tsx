"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { NextStepConfig } from "@/lib/calc-context/next-steps";

type NextStepBannerProps = {
  fromSlug: string;
  config: NextStepConfig;
};

function slugFromHref(href: string): string {
  return href.replace(/^\//, "");
}

export function NextStepBanner({ fromSlug, config }: NextStepBannerProps) {
  const router = useRouter();

  const handleContinue = () => {
    trackEvent("journey_step", {
      from_calc: fromSlug,
      to_calc: slugFromHref(config.href),
    });
    router.push(config.href);
  };

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
      <Button type="button" variant="default" size="sm" onClick={handleContinue}>
        Continuar jornada
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}
