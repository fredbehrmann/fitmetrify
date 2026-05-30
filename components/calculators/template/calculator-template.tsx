"use client";

import { useCallback, useMemo, useState } from "react";

import { GastoInlineTmb } from "@/components/calculators/gasto-inline-tmb";
import { CalculatorForm } from "@/components/calculators/template/calculator-form";
import { CalculatorResultPanel } from "@/components/calculators/template/calculator-result-panel";
import { VolumeSessionForm } from "@/components/calculators/volume-session-form";
import { DistanceUnitToggle } from "@/components/ui/distance-unit-toggle";
import { UnitToggle } from "@/components/ui/unit-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { extractCalcStatePatch } from "@/lib/calc-context/sync-from-result";
import { useCalcStore } from "@/lib/calc-context/store";
import { trackEvent } from "@/lib/analytics";
import { transformBodyMetricInputs } from "@/lib/calculators/body-metrics/transform-inputs";
import { getAguaInputs } from "@/lib/calculators/agua/form-inputs";
import { getCalculatorEngine } from "@/lib/calculators/engines";
import type { CalculatorResult } from "@/lib/calculators/engines/types";
import { getImcInputs } from "@/lib/calculators/imc/form-inputs";
import { getMacrosInputs } from "@/lib/calculators/macros/form-inputs";
import { getPaceInputs } from "@/lib/calculators/pace/form-inputs";
import { getPercentualGorduraInputs } from "@/lib/calculators/percentual-gordura/form-inputs";
import { getPesoIdealInputs } from "@/lib/calculators/peso-ideal/form-inputs";
import { getPrevisorTempoInputs } from "@/lib/calculators/previsor-tempo/form-inputs";
import { getProteinaInputs } from "@/lib/calculators/proteina/form-inputs";
import {
  attachDistanceUnit,
  transformPrevisorDistanceInputs,
} from "@/lib/calculators/running/transform-distance-inputs";
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

const WEIGHT_TOGGLE_SLUGS = new Set([
  "calculadora-proteina",
  "calculadora-agua",
]);

const DISTANCE_TOGGLE_SLUGS = new Set([
  "calculadora-pace",
  "calculadora-previsor-tempo",
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

function DistanceToggleHeader({
  distanceUnit,
  onChange,
}: {
  distanceUnit: DistanceUnit;
  onChange: (value: DistanceUnit) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-muted-foreground text-sm">Unidade de distância</p>
      <DistanceUnitToggle value={distanceUnit} onChange={onChange} />
    </div>
  );
}

export function CalculatorTemplate({ calculator }: CalculatorTemplateProps) {
  const showTabs = calculator.simpleMode && calculator.advancedMode;
  const defaultMode: InputMode = calculator.simpleMode ? "simple" : "advanced";
  const slug = calculator.slug;
  const isImc = slug === "calculadora-imc";
  const isPace = slug === "calculadora-pace";
  const isPrevisor = slug === "calculadora-previsor-tempo";
  const isGastoCalorico = slug === "calculadora-gasto-calorico";
  const isVolumeTreino = slug === "calculadora-volume-treino";
  const isTmb = slug === "calculadora-tmb";
  const isPesoIdeal = slug === "calculadora-peso-ideal";
  const isPercentualGordura = slug === "calculadora-percentual-gordura";
  const isProteina = slug === "calculadora-proteina";
  const isAgua = slug === "calculadora-agua";
  const isMacros = slug === "calculadora-macros";
  const usesBodyMetrics = BODY_METRIC_SLUGS.has(slug);
  const usesWeightToggle = WEIGHT_TOGGLE_SLUGS.has(slug);
  const usesDistanceToggle = DISTANCE_TOGGLE_SLUGS.has(slug);

  const [mode, setMode] = useState<InputMode>(defaultMode);
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>("km");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [panelState, setPanelState] = useState<
    "initial" | "placeholder" | "result"
  >("initial");

  const calcState = useCalcStore((store) => store.state);
  const updateCalcStore = useCalcStore((store) => store.update);

  const handleUnitSystemChange = useCallback(
    (next: UnitSystem) => {
      if (next !== unitSystem) {
        trackEvent("unit_toggle", {
          calc_slug: slug,
          unit_from: unitSystem,
          unit_to: next,
        });
      }
      setUnitSystem(next);
    },
    [slug, unitSystem]
  );

  const handleDistanceUnitChange = useCallback(
    (next: DistanceUnit) => {
      if (next !== distanceUnit) {
        trackEvent("unit_toggle", {
          calc_slug: slug,
          unit_from: distanceUnit,
          unit_to: next,
        });
      }
      setDistanceUnit(next);
    },
    [slug, distanceUnit]
  );

  const simpleInputs = getSimpleInputs(calculator);
  const advancedInputs = getAdvancedInputs(calculator);

  const resolveInputs = useCallback(
    (inputMode: InputMode) => {
      if (isImc) return getImcInputs(inputMode, unitSystem);
      if (isTmb) return getTmbInputs(inputMode, unitSystem);
      if (isPesoIdeal) return getPesoIdealInputs(inputMode, unitSystem);
      if (isPercentualGordura) {
        return getPercentualGorduraInputs(inputMode, unitSystem);
      }
      if (isProteina) return getProteinaInputs(inputMode, unitSystem);
      if (isAgua) return getAguaInputs(inputMode, unitSystem);
      if (isMacros) return getMacrosInputs(inputMode, unitSystem);
      if (isPace) return getPaceInputs(inputMode, distanceUnit);
      if (isPrevisor) return getPrevisorTempoInputs(inputMode, distanceUnit);
      return inputMode === "simple" ? simpleInputs : advancedInputs;
    },
    [
      isImc,
      isTmb,
      isPesoIdeal,
      isPercentualGordura,
      isProteina,
      isAgua,
      isMacros,
      isPace,
      isPrevisor,
      unitSystem,
      distanceUnit,
      simpleInputs,
      advancedInputs,
    ]
  );

  const activeInputs = useMemo(
    () => resolveInputs(mode),
    [resolveInputs, mode]
  );

  const transformValues = useMemo(() => {
    if (isPrevisor) {
      return (values: Record<string, unknown>) =>
        transformPrevisorDistanceInputs(values, distanceUnit);
    }
    if (isPace) {
      return (values: Record<string, unknown>) =>
        attachDistanceUnit(values, distanceUnit);
    }
    if (isMacros) {
      return (values: Record<string, unknown>) => {
        const usesWeight =
          mode === "advanced" || values.inputMode === "gramsPerKg";
        if (usesWeight && unitSystem === "imperial") {
          return transformBodyMetricInputs(values, unitSystem);
        }
        return values;
      };
    }
    if (usesBodyMetrics || usesWeightToggle) {
      return (values: Record<string, unknown>) =>
        transformBodyMetricInputs(values, unitSystem);
    }
    return undefined;
  }, [
    isPrevisor,
    isPace,
    isMacros,
    mode,
    usesBodyMetrics,
    usesWeightToggle,
    distanceUnit,
    unitSystem,
  ]);

  const handleSubmit = (values: Record<string, unknown>) => {
    const engine = getCalculatorEngine(slug);
    const calculateFn =
      mode === "simple" ? engine?.calculateSimple : engine?.calculateAdvanced;
    const payload = transformValues ? transformValues(values) : values;

    const calculated = calculateFn?.(payload) ?? null;

    if (calculated) {
      const enriched = enrichCalculatorResult(slug, calculated);
      const patch = extractCalcStatePatch(slug, payload, enriched);
      if (Object.keys(patch).length > 0) {
        updateCalcStore(patch);
      }
      trackEvent("calc_completed", { calc_slug: slug, mode });
      setResult(enriched);
      setPanelState("result");
      return;
    }

    setResult(null);
    setPanelState("placeholder");
  };

  const handleVolumeSubmit = (values: Record<string, unknown>) => {
    const engine = getCalculatorEngine(slug);
    const calculated = engine?.calculateSimple?.(values) ?? null;

    if (calculated) {
      const enriched = enrichCalculatorResult(slug, calculated);
      trackEvent("calc_completed", { calc_slug: slug, mode: "simple" });
      setResult(enriched);
      setPanelState("result");
      return;
    }

    setResult(null);
    setPanelState("placeholder");
  };

  const handleModeChange = (value: string) => {
    if (value === "advanced") {
      trackEvent("advanced_mode", { calc_slug: slug });
    }
    setMode(value as InputMode);
    setResult(null);
    setPanelState("initial");
  };

  const staticHeaderSlot = usesDistanceToggle ? (
    <DistanceToggleHeader
      distanceUnit={distanceUnit}
      onChange={handleDistanceUnitChange}
    />
  ) : usesBodyMetrics || usesWeightToggle ? (
    <UnitToggleHeader
      unitSystem={unitSystem}
      onChange={handleUnitSystemChange}
    />
  ) : undefined;

  const macrosHeaderSlot = useCallback(
    (watchedValues: Record<string, unknown>) => {
      const showToggle =
        mode === "advanced" || watchedValues.inputMode === "gramsPerKg";
      if (!showToggle) return null;
      return (
        <UnitToggleHeader
          unitSystem={unitSystem}
          onChange={handleUnitSystemChange}
        />
      );
    },
    [mode, unitSystem, handleUnitSystemChange]
  );

  const gastoFooterSlot = isGastoCalorico ? (
    <GastoInlineTmb
      hasStoredTmb={Boolean(calcState.tmb)}
      unitSystem={unitSystem}
    />
  ) : undefined;

  const formSection = isVolumeTreino ? (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
      <VolumeSessionForm
        calcSlug={slug}
        onSubmit={handleVolumeSubmit}
      />
    </div>
  ) : (
    <div className="glass-card p-6 md:p-8">
      <h2 className="mb-6 text-xl font-semibold">Ferramenta de cálculo</h2>
      <CalculatorForm
        slug={slug}
        key={`${mode}-${unitSystem}-${distanceUnit}`}
        inputs={activeInputs}
        mode={mode}
        onSubmit={handleSubmit}
        headerSlot={isMacros ? undefined : staticHeaderSlot}
        renderHeaderSlot={isMacros ? macrosHeaderSlot : undefined}
        footerSlot={gastoFooterSlot}
        transformValues={transformValues}
        showPrevisorPresets={isPrevisor}
      />
    </div>
  );

  const resultPanel = (
    <CalculatorResultPanel
      slug={slug}
      state={panelState}
      result={result}
    />
  );

  const advancedFormInputs = resolveInputs("advanced");

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
                    slug={slug}
                    key={`advanced-${unitSystem}-${distanceUnit}`}
                    inputs={advancedFormInputs}
                    mode="advanced"
                    onSubmit={handleSubmit}
                    headerSlot={
                      isMacros ? undefined : staticHeaderSlot
                    }
                    renderHeaderSlot={
                      isMacros ? macrosHeaderSlot : undefined
                    }
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
