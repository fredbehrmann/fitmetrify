"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CalculatorField } from "@/components/calculators/template/calculator-field";
import { useCalcStore } from "@/lib/calc-context/store";
import {
  getInlineTmbImperialInputs,
  getInlineTmbMetricInputs,
} from "@/lib/calculators/body-metrics/form-inputs";
import { transformBodyMetricInputs } from "@/lib/calculators/body-metrics/transform-inputs";
import { sexInput } from "@/lib/calculators/common-inputs";
import { calculateMifflinTmb } from "@/lib/calculators/tmb/calculate-mifflin";
import type { UnitSystem } from "@/lib/conversions";

type GastoInlineTmbProps = {
  hasStoredTmb: boolean;
  unitSystem: UnitSystem;
};

export function GastoInlineTmb({
  hasStoredTmb,
  unitSystem,
}: GastoInlineTmbProps) {
  const [expanded, setExpanded] = useState(!hasStoredTmb);
  const form = useFormContext<Record<string, unknown>>();
  const update = useCalcStore((store) => store.update);

  const inlineInputs = [
    ...(unitSystem === "metric"
      ? getInlineTmbMetricInputs("simple")
      : getInlineTmbImperialInputs("simple")),
    sexInput("simple", { id: "inlineSex", name: "inlineSex" }),
  ];

  if (hasStoredTmb && !expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="text-primary text-sm underline-offset-4 hover:underline"
      >
        Recalcular TMB aqui
      </button>
    );
  }

  const handleCalculateTmb = () => {
    const values = transformBodyMetricInputs(form.getValues(), unitSystem);
    const weight = Number(values.inlineWeight);
    const height = Number(values.inlineHeight);
    const age = Number(values.inlineAge);
    const sex = values.inlineSex;

    if (
      Number.isNaN(weight) ||
      Number.isNaN(height) ||
      Number.isNaN(age) ||
      (sex !== "male" && sex !== "female")
    ) {
      return;
    }

    const tmb = Math.round(calculateMifflinTmb(sex, weight, height, age));
    form.setValue("tmb", tmb, { shouldValidate: true, shouldDirty: true });
    update({ weight, height, age, sex, tmb });
    setExpanded(false);
  };

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div>
        <p className="font-medium">Calcular TMB aqui</p>
        <p className="text-muted-foreground text-sm">
          Informe peso, altura, idade e sexo para estimar sua TMB sem sair desta
          página.
        </p>
      </div>
      {inlineInputs.map((input) => (
        <CalculatorField
          key={input.id}
          input={input}
          control={form.control}
        />
      ))}
      <Button type="button" variant="secondary" onClick={handleCalculateTmb}>
        Calcular TMB e continuar
      </Button>
    </div>
  );
}
