"use client";

import type { Control } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CalculatorInput } from "@/lib/calculators/types";

type CalculatorFieldProps = {
  input: CalculatorInput;
  control: Control<Record<string, unknown>>;
};

export function CalculatorField({ input, control }: CalculatorFieldProps) {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {input.label}
            {input.unit && (
              <span className="text-tertiary font-normal"> ({input.unit})</span>
            )}
          </FormLabel>
          <FormControl>
            {input.type === "checkbox" ? (
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
                <span className="text-muted-foreground text-sm">
                  {input.helpText ?? input.label}
                </span>
              </div>
            ) : input.type === "select" || input.type === "radio" ? (
              <Select
                value={field.value ? String(field.value) : undefined}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder={input.placeholder ?? "Selecione"} />
                </SelectTrigger>
                <SelectContent>
                  {input.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={input.type === "number" ? "number" : "text"}
                placeholder={input.placeholder}
                step={input.validation?.step}
                {...field}
                value={field.value === undefined ? "" : String(field.value)}
                onChange={(event) => {
                  const value = event.target.value;
                  if (input.type === "number") {
                    field.onChange(value === "" ? undefined : value);
                    return;
                  }
                  field.onChange(value);
                }}
              />
            )}
          </FormControl>
          {input.helpText && input.type !== "checkbox" && (
            <FormDescription>{input.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
