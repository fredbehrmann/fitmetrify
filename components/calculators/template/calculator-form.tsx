"use client";

import { useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator } from "lucide-react";
import { useForm } from "react-hook-form";

import { PrefillImportBanner } from "@/components/calculators/prefill-import-banner";
import { CalculatorField } from "@/components/calculators/template/calculator-field";
import { PrevisorDistancePresets } from "@/components/calculators/distance-preset-buttons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { trackEvent } from "@/lib/analytics";
import { useCalcStore, resetCalcStore } from "@/lib/calc-context/store";
import {
  getPrefillImportItems,
  mergePrefillFromContext,
} from "@/lib/calculators/prefill-from-context";
import { mergePrefillFromSearch } from "@/lib/calculators/prefill-from-search";
import {
  buildCalculatorSchema,
  getDefaultValues,
  getInputWarnings,
} from "@/lib/calculators/schema-builder";
import type { CalculatorInput, InputMode } from "@/lib/calculators/types";

type CalculatorFormProps = {
  slug: string;
  inputs: CalculatorInput[];
  mode: InputMode;
  onSubmit: (values: Record<string, unknown>) => void;
  headerSlot?: React.ReactNode;
  renderHeaderSlot?: (watchedValues: Record<string, unknown>) => React.ReactNode;
  footerSlot?: React.ReactNode;
  transformValues?: (values: Record<string, unknown>) => Record<string, unknown>;
  showPrevisorPresets?: boolean;
};

export function CalculatorForm({
  slug,
  inputs,
  mode,
  onSubmit,
  headerSlot,
  renderHeaderSlot,
  footerSlot,
  transformValues,
  showPrevisorPresets,
}: CalculatorFormProps) {
  const searchParams = useSearchParams();
  const calcState = useCalcStore((store) => store.state);
  const schema = useMemo(() => buildCalculatorSchema(inputs), [inputs]);

  const { defaultValues, importItems } = useMemo(() => {
    const base = getDefaultValues(inputs);
    const fromContext = mergePrefillFromContext(slug, calcState, inputs);
    const fromSearch = mergePrefillFromSearch(
      inputs,
      Object.fromEntries(searchParams.entries())
    );
    const merged = { ...base, ...fromContext, ...fromSearch };
    const items = getPrefillImportItems(slug, calcState, inputs, {
      ...fromContext,
      ...Object.fromEntries(
        Object.entries(fromSearch).filter(([key]) => !(key in fromContext))
      ),
    });
    return { defaultValues: merged, importItems: items };
  }, [inputs, slug, calcState, searchParams]);

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedValues = form.watch();
  const warnings = getInputWarnings(inputs, watchedValues);
  const hasTrackedStart = useRef(false);

  const handleFirstInteraction = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("calc_started", { calc_slug: slug });
  };

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(transformValues ? transformValues(values) : values);
  });

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        onFocusCapture={handleFirstInteraction}
        className="space-y-5"
      >
        {renderHeaderSlot ? renderHeaderSlot(watchedValues) : headerSlot}
        <PrefillImportBanner items={importItems} />
        {footerSlot}
        {showPrevisorPresets && <PrevisorDistancePresets />}
        {inputs.map((input) => (
          <CalculatorField
            key={`${mode}-${input.id}`}
            input={input}
            control={form.control}
          />
        ))}

        {warnings.length > 0 && (
          <div
            role="alert"
            className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-100"
          >
            {warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            <Calculator className="size-5" />
            Calcular
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => resetCalcStore()}
          >
            Limpar dados da jornada
          </Button>
        </div>
      </form>
    </Form>
  );
}
