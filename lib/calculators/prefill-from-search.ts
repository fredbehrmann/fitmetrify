import type { CalculatorInput } from "./types";

export function mergePrefillFromSearch(
  inputs: CalculatorInput[],
  searchParams: Record<string, string | string[] | undefined>
): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};

  inputs.forEach((input) => {
    const raw = searchParams[input.name];
    const value = Array.isArray(raw) ? raw[0] : raw;

    if (value === undefined || value === "") return;

    if (input.type === "number" || input.type === "time") {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        defaults[input.name] = parsed;
      }
      return;
    }

    if (input.type === "checkbox") {
      defaults[input.name] = value === "true" || value === "1";
      return;
    }

    defaults[input.name] = value;
  });

  return defaults;
}
