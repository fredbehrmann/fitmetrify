"use client";

import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator } from "lucide-react";
import { useForm } from "react-hook-form";

import { CalculatorField } from "@/components/calculators/template/calculator-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  buildCalculatorSchema,
  getDefaultValues,
  getInputWarnings,
} from "@/lib/calculators/schema-builder";
import type { CalculatorInput, InputMode } from "@/lib/calculators/types";

type CalculatorFormProps = {
  inputs: CalculatorInput[];
  mode: InputMode;
  onSubmit: (values: Record<string, unknown>) => void;
};

export function CalculatorForm({
  inputs,
  mode,
  onSubmit,
}: CalculatorFormProps) {
  const schema = useMemo(() => buildCalculatorSchema(inputs), [inputs]);
  const defaultValues = useMemo(() => getDefaultValues(inputs), [inputs]);

  const form = useForm<Record<string, unknown>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const watchedValues = form.watch();
  const warnings = getInputWarnings(inputs, watchedValues);

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {inputs.map((input) => (
          <CalculatorField
            key={`${mode}-${input.id}`}
            input={input}
            control={form.control}
          />
        ))}

        {warnings.length > 0 && (
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm text-yellow-200">
            {warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        )}

        <Button type="submit" size="lg" className="w-full sm:w-auto">
          <Calculator className="size-5" />
          Calcular
        </Button>
      </form>
    </Form>
  );
}
