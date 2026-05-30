"use client";

import { useMemo, useState } from "react";

import { GastoInlineTmb } from "@/components/calculators/gasto-inline-tmb";
import { CalculatorForm } from "@/components/calculators/template/calculator-form";
import { CalculatorResultPanel } from "@/components/calculators/template/calculator-result-panel";
import { VolumeSessionForm } from "@/components/calculators/volume-session-form";
import { DistanceUnitToggle } from "@/components/ui/distance-unit-toggle";
import { UnitToggle } from "@/components/ui/unit-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractCalcStatePatch } from "@/lib/calc-context/sync-from-result";
import { useCalcStore } from "@/lib/calc-context/store";
import { transformBodyMetricInputs } from "@/lib/calculators/body-metrics/transform-inputs";
import { getCalculatorEngine } from "@/lib/calculators/engines";
import type { CalculatorResult } from "@/lib/calculators/engines/types";
import {
  getImcImperialInputs,
  getImcMetricInputs,
} from "@/lib/calculators/imc/form-inputs";
import { getPaceInputs } from "@/lib/calculators/pace/form-inputs";
import { getPercentualGorduraInputs } from "@/lib/calculators/percentual-gordura/form-inputs";
import { getPesoIdealInputs } from "@/lib/calculators/peso-ideal/form-inputs";
import { getTmbInputs } from "@/lib/calculators/tmb/form-inputs";
import { enrichCalculatorResult } from "@/lib/calculators/recommendations/enrich-result";
import {
  getAdvancedInputs,
  getSimpleInputs,
} from "@/lib/calculators/helpers";
import type { CalculatorTool, InputMode } from "@/lib/calculators/types";
import type { DistanceUnit, UnitSystem } from "@/lib/conversions";

type CalculatorTemplateProps = {
  calculator: CalculatorTool;
};

const BODY_METRIC_SLUGS = new Set([
  "calculadora-imc",
  "calculadora-tmb",
  "calculadora-peso-ideal",
  "calculadora-percentual-gordura",
  "calculadora-gasto-calorico",
]);

function UnitToggleHeader({
  unitSystem,
  onChange,
}: {
  unitSystem: UnitSystem;
  onChange: (value: UnitSystem) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-muted-foreground text-sm">Sistema de medidas</p>
      <UnitToggle value={unitSystem} onChange={onChange} />
    </div>
  );
}

export function CalculatorTemplate({ calculator }: CalculatorTemplateProps) {
  const showTabs = calculator.simpleMode && calculator.advancedMode;
  const defaultMode: InputMode = calculator.simpleMode ? "simple" : "advanced";
  const isImc = calculator.slug === "calculadora-imc";
  const isPace = calculator.slug === "calculadora-pace";
  const isPrevisor = calculator.slug === "calculadora-previsor-tempo";
  const isGastoCalorico = calculator.slug === "calculadora-gasto-calorico";
  const isVolumeTreino = calculator.slug === "calculadora-volume-treino";
  const isTmb = calculator.slug === "calculadora-tmb";
  const isPesoIdeal = calculator.slug === "calculadora-peso-ideal";
  const isPercentualGordura = calculator.slug === "calculadora-percentual-gordura";
  const usesBodyMetrics = BODY_METRIC_SLUGS.has(calculator.slug);

  const [mode, setMode] = useState<InputMode>(defaultMode);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [panelState, setPanelState] = useState<
    "initial" | "placeholder" | "result"
  >("initial");

  const calcState = useCalcStore((store) => store.state);
  const updateCalcStore = useCalcStore((store) => store.update);

  const simpleInputs = getSimpleInputs(calculator);
  const advancedInputs = getAdvancedInputs(calculator);

  const activeInputs = useMemo(() => {
    if (isImc && mode === "simple") {
      return unitSystem === "metric"
        ? getImcMetricInputs("simple")
        : getImcImperialInputs("simple");
    }
    if (isTmb) {
      return getTmbInputs(mode, unitSystem);
    }
    if (isPesoIdeal) {
      return getPesoIdealInputs(mode, unitSystem);
    }
    if (isPercentualGordura) {
      return getPercentualGorduraInputs(mode, unitSystem);
    }
    if (isPace) {
      return getPaceInputs(mode, distanceUnit);
    }
    return mode === "simple" ? simpleInputs : advancedInputs;
  }, [
    isImc,
    isTmb,
    isPesoIdeal,
    isPercentualGordura,
    isPace,
    mode,
    unitSystem,
    distanceUnit,
    simpleInputs,
    advancedInputs,
  ]);

  const transformValues = useMemo(() => {
    if (isPace) {
      return (values: Record<string, unknown>) => ({ ...values, distanceUnit });
    }
    if (usesBodyMetrics) {
      return (values: Record<string, unknown>) =>
        transformBodyMetricInputs(values, unitSystem);
    }
    return undefined;
  }, [isPace, usesBodyMetrics, distanceUnit, unitSystem]);

  const handleSubmit = (values: Record<string, unknown>) => {
    const engine = getCalculatorEngine(calculator.slug);
    const calculateFn =
      mode === "simple" ? engine?.calculateSimple : engine?.calculateAdvanced;
    const payload = transformValues ? transformValues(values) : values;

    const calculated = calculateFn?.(payload) ?? null;

    if (calculated) {
      const enriched = enrichCalculatorResult(calculator.slug, calculated);
      const patch = extractCalcStatePatch(calculator.slug, payload, enriched);
      if (Object.keys(patch).length > 0) {
        updateCalcStore(patch);
      }
      setResult(enriched);
      setPanelState("result");
      return;
    }

    setResult(null);
    setPanelState("placeholder");
  };

  const handleVolumeSubmit = (values: Record<string, unknown>) => {
    const engine = getCalculatorEngine(calculator.slug);
    const calculated = engine?.calculateSimple?.(values) ?? null;

    if (calculated) {
      const enriched = enrichCalculatorResult(calculator.slug, calculated);
      setResult(enriched);
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

  const headerSlot = isPace ? (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-muted-foreground text-sm">Unidade de distância</p>
      <DistanceUnitToggle value={distanceUnit} onChange={setDistanceUnit} />
    </div>
  ) : usesBodyMetrics ? (
    <UnitToggleHeader unitSystem={unitSystem} onChange={setUnitSystem} />
  ) : undefined;

  const gastoFooterSlot = isGastoCalorico ? (
    <GastoInlineTmb
      hasStoredTmb={Boolean(calcState.tmb)}
      unitSystem={unitSystem}
    />
  ) : undefined;

  const formSection = isVolumeTreino ? (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
      <VolumeSessionForm onSubmit={handleVolumeSubmit} />
    </div>
  ) : (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
      <CalculatorForm
        slug={calculator.slug}
        key={`${mode}-${unitSystem}-${distanceUnit}`}
        inputs={activeInputs}
        mode={mode}
        onSubmit={handleSubmit}
        headerSlot={headerSlot}
        footerSlot={gastoFooterSlot}
        transformValues={transformValues}
        showPrevisorPresets={isPrevisor}
      />
    </div>
  );

  const resultPanel = (
    <CalculatorResultPanel
      slug={calculator.slug}
      state={panelState}
      result={result}
    />
  );

  const advancedFormInputs = isPace
    ? getPaceInputs("advanced", distanceUnit)
    : isTmb
      ? getTmbInputs("advanced", unitSystem)
      : isPesoIdeal
        ? getPesoIdealInputs("advanced", unitSystem)
        : isPercentualGordura
          ? getPercentualGorduraInputs("advanced", unitSystem)
          : advancedInputs;

  return (
    <section className="mb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showTabs && !isVolumeTreino ? (
          <Tabs value={mode} onValueChange={handleModeChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="simple">Cálculo simples</TabsTrigger>
              <TabsTrigger value="advanced">Cálculo avançado</TabsTrigger>
            </TabsList>
            <TabsContent value="simple">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                {formSection}
                {resultPanel}
              </div>
            </TabsContent>
            <TabsContent value="advanced">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
                <div className="glass-card p-6 md:p-8">
                  <h2 className="mb-6 text-xl font-semibold">
                    Ferramenta de cálculo
                  </h2>
                  <CalculatorForm
                    slug={calculator.slug}
                    key={`advanced-${unitSystem}-${distanceUnit}`}
                    inputs={advancedFormInputs}
                    mode="advanced"
                    onSubmit={handleSubmit}
                    headerSlot={headerSlot}
                    footerSlot={isGastoCalorico ? gastoFooterSlot : undefined}
                    transformValues={transformValues}
                    showPrevisorPresets={isPrevisor}
                  />
                </div>
                {resultPanel}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {formSection}
            {resultPanel}
          </div>
        )}
      </div>
    </section>
  );
}
