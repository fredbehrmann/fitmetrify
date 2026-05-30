import { z } from "zod";

import type { CalculatorInput } from "./types";

function applyNumberValidation(
  schema: z.ZodTypeAny,
  validation?: CalculatorInput["validation"]
): z.ZodTypeAny {
  let result: z.ZodTypeAny = schema;

  if (validation?.min !== undefined) {
    result = (result as z.ZodNumber).min(validation.min, {
      message: `Valor mínimo: ${validation.min}`,
    });
  }

  if (validation?.max !== undefined) {
    result = (result as z.ZodNumber).max(validation.max, {
      message: `Valor máximo: ${validation.max}`,
    });
  }

  return result;
}

export function buildFieldSchema(input: CalculatorInput): z.ZodTypeAny {
  const { validation, type, options } = input;

  switch (type) {
    case "number": {
      const schema = applyNumberValidation(
        z.coerce.number({
          message: "Informe um número válido",
        }),
        validation
      );

      if (validation?.required) {
        return schema;
      }

      return schema.optional();
    }

    case "text": {
      let schema = z.string();

      if (validation?.required) {
        schema = schema.min(1, "Campo obrigatório");
      } else {
        return schema.optional();
      }

      return schema;
    }

    case "select":
    case "radio": {
      const values = options?.map((option) => option.value) ?? [];

      if (values.length === 0) {
        return z.string().optional();
      }

      const schema = z.enum(values as [string, ...string[]], {
        message: "Selecione uma opção",
      });

      if (validation?.required === false) {
        return schema.optional();
      }

      return schema;
    }

    case "checkbox":
      return z.boolean().default(false);

    case "time": {
      const schema = applyNumberValidation(
        z.coerce.number({ message: "Informe um tempo válido" }).min(0),
        validation
      );
      if (validation?.required) return schema;
      return schema.optional();
    }

    default:
      return z.unknown().optional();
  }
}

export function buildCalculatorSchema(inputs: CalculatorInput[]) {
  const shape: Record<string, z.ZodTypeAny> = {};

  inputs.forEach((input) => {
    shape[input.name] = buildFieldSchema(input);
  });

  return z.object(shape);
}

export function getDefaultValues(
  inputs: CalculatorInput[]
): Record<string, unknown> {
  return inputs.reduce<Record<string, unknown>>((acc, input) => {
    if (input.defaultValue !== undefined) {
      acc[input.name] = input.defaultValue;
      return acc;
    }

    if (input.type === "checkbox") {
      acc[input.name] = false;
      return acc;
    }

    if (input.type === "time") {
      acc[input.name] = 0;
      return acc;
    }

    if (input.type === "number") {
      acc[input.name] = undefined;
      return acc;
    }

    acc[input.name] = "";
    return acc;
  }, {});
}

export function getInputWarnings(
  inputs: CalculatorInput[],
  values: Record<string, unknown>
): string[] {
  const warnings: string[] = [];

  inputs.forEach((input) => {
    const validation = input.validation;
    if (!validation?.warningAbove || !validation.warningMessage) return;

    const value = values[input.name];
    if (typeof value === "number" && value > validation.warningAbove) {
      warnings.push(validation.warningMessage);
    }
  });

  return warnings;
}
