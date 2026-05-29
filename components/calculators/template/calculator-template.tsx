"use client";

import { useState } from "react";

import { CalculatorForm } from "@/components/calculators/template/calculator-form";
import { CalculatorResultPanel } from "@/components/calculators/template/calculator-result-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCalculatorEngine } from "@/lib/calculators/engines";
import type { CalculatorResult } from "@/lib/calculators/engines/types";
import { enrichCalculatorResult } from "@/lib/calculators/recommendations/enrich-result";
import {
  getAdvancedInputs,
  getSimpleInputs,
} from "@/lib/calculators/helpers";
import type { CalculatorTool, InputMode } from "@/lib/calculators/types";

type CalculatorTemplateProps = {
  calculator: CalculatorTool;
};

export function CalculatorTemplate({ calculator }: CalculatorTemplateProps) {
  const showTabs = calculator.simpleMode && calculator.advancedMode;
  const defaultMode: InputMode = calculator.simpleMode ? "simple" : "advanced";

  const [mode, setMode] = useState<InputMode>(defaultMode);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [panelState, setPanelState] = useState<
    "initial" | "placeholder" | "result"
  >("initial");

  const simpleInputs = getSimpleInputs(calculator);
  const advancedInputs = getAdvancedInputs(calculator);
  const activeInputs = mode === "simple" ? simpleInputs : advancedInputs;

  const handleSubmit = (values: Record<string, unknown>) => {
    const engine = getCalculatorEngine(calculator.slug);
    const calculateFn =
      mode === "simple" ? engine?.calculateSimple : engine?.calculateAdvanced;

    const calculated = calculateFn?.(values) ?? null;

    if (calculated) {
      setResult(enrichCalculatorResult(calculator.slug, calculated));
      setPanelState("result");
      return;
    }

    setResult(null);
    setPanelState("placeholder");
  };

  const handleModeChange = (value: string) => {
    setMode(value as InputMode);
    setResult(null);
    setPanelState("initial");
  };

  const formSection = (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
      <CalculatorForm
        key={mode}
        inputs={activeInputs}
        mode={mode}
        onSubmit={handleSubmit}
      />
    </div>
  );

  return (
    <section className="mb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showTabs ? (
          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="simple">Cálculo simples</TabsTrigger>
              <TabsTrigger value="advanced">Cálculo avançado</TabsTrigger>
            </TabsList>
            <TabsContent value="simple">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                {formSection}
                <CalculatorResultPanel state={panelState} result={result} />
              </div>
            </TabsContent>
            <TabsContent value="advanced">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                <div className="glass-card p-6 md:p-8">
                  <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
                  <CalculatorForm
                    key="advanced"
                    inputs={advancedInputs}
                    mode="advanced"
                    onSubmit={handleSubmit}
                  />
                </div>
                <CalculatorResultPanel state={panelState} result={result} />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {formSection}
            <CalculatorResultPanel state={panelState} result={result} />
          </div>
        )}
      </div>
    </section>
  );
}
