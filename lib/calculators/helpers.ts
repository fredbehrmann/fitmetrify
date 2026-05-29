import type { Calculator, CalculatorInput, CalculatorTool, InputMode } from "./types";

export function getInputsByMode(
  calculator: CalculatorTool,
  mode: InputMode
): CalculatorInput[] {
  return calculator.inputs.filter((input) => input.mode === mode);
}

export function getSimpleInputs(calculator: CalculatorTool): CalculatorInput[] {
  return getInputsByMode(calculator, "simple");
}

export function getAdvancedInputs(calculator: CalculatorTool): CalculatorInput[] {
  return getInputsByMode(calculator, "advanced");
}

export function hasMode(calculator: Calculator, mode: InputMode): boolean {
  return mode === "simple" ? calculator.simpleMode : calculator.advancedMode;
}
