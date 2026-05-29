"use client";

import { ArrowRight, BarChart3 } from "lucide-react";

import type {
  CalculatorResult,
  ResultPanelState,
} from "@/lib/calculators/engines/types";
import {
  CalculatorResultKpi,
  ResultClassificationBadge,
} from "@/components/calculators/template/calculator-result-kpi";
import { CalculatorInterpretation } from "@/components/calculators/template/calculator-interpretation";
import { MacroSplitChart } from "@/components/calculators/template/macro-split-chart";
import { ResultRelatedLinks } from "@/components/calculators/template/result-related-links";
import { ResultScaleBar } from "@/components/calculators/template/result-scale-bar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CalculatorResultPanelProps = {
  state: ResultPanelState;
  result?: CalculatorResult | null;
};

export function CalculatorResultPanel({
  state,
  result,
}: CalculatorResultPanelProps) {
  if (state === "initial") {
    return (
      <div className="glass-card flex min-h-[320px] flex-col items-center justify-center gap-4 p-8 text-center">
        <div className="bg-primary/10 flex size-16 items-center justify-center rounded-2xl">
          <BarChart3 className="text-primary size-8" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Seu resultado aparecerá aqui</h3>
          <p className="text-muted-foreground max-w-sm text-sm">
            Preencha o formulário e clique em Calcular para ver a interpretação
            dos seus dados.
          </p>
        </div>
      </div>
    );
  }

  if (state === "placeholder") {
    return (
      <div className="glass-card relative min-h-[320px] overflow-hidden p-6 md:p-8">
        <Badge className="absolute top-4 right-4" variant="secondary">
          Em breve
        </Badge>
        <div className="space-y-6 opacity-40">
          <CalculatorResultKpi value="—" unit="" label="Resultado estimado" />
          <ResultClassificationBadge classification={{ label: "Aguardando cálculo" }} />
          <CalculatorInterpretation text="O cálculo desta ferramenta está em desenvolvimento. Seus dados foram validados com sucesso." />
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 p-6">
          <p className="glass-card max-w-sm p-4 text-center text-sm">
            O cálculo desta ferramenta está em desenvolvimento. Preencha o
            formulário normalmente — o resultado completo será exibido em breve.
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div
      className={cn(
        "glass-card space-y-6 p-6 transition-opacity md:p-8",
        "animate-in fade-in duration-300"
      )}
    >
      <CalculatorResultKpi
        value={result.primaryValue}
        unit={result.primaryUnit}
        label={result.primaryLabel ?? "Resultado"}
        className="mx-auto md:mx-0"
      />

      {result.classification && (
        <div className="flex justify-center md:justify-start">
          <ResultClassificationBadge classification={result.classification} />
        </div>
      )}

      {result.scale && <ResultScaleBar {...result.scale} />}

      {result.kpis && result.kpis.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {result.kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-tertiary text-xs">{kpi.label}</p>
              <p className="text-lg font-semibold">
                {kpi.value}
                {kpi.unit && (
                  <span className="text-muted-foreground ml-1 text-sm">
                    {kpi.unit}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}

      {result.macroChart && result.macroChart.length > 0 && (
        <MacroSplitChart segments={result.macroChart} />
      )}

      <CalculatorInterpretation text={result.interpretation} />

      {result.warnings && result.warnings.length > 0 && (
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
          {result.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}

      {result.nextSteps && result.nextSteps.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold">Próximos passos</p>
          <ul className="text-muted-foreground space-y-2 text-sm">
            {result.nextSteps.map((step) => (
              <li key={step} className="flex gap-2">
                <ArrowRight className="text-primary mt-0.5 size-4 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.relatedSlugs && result.relatedSlugs.length > 0 && (
        <ResultRelatedLinks slugs={result.relatedSlugs} />
      )}
    </div>
  );
}
