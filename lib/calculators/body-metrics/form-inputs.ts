import type { CalculatorInput, InputMode } from "../types";
import {
  AGE_VALIDATION,
  HEIGHT_VALIDATION,
  WEIGHT_VALIDATION,
} from "../validation";

type InputOverrides = Partial<
  Pick<
    CalculatorInput,
    | "id"
    | "name"
    | "label"
    | "helpText"
    | "placeholder"
    | "defaultValue"
    | "validation"
    | "unit"
  >
>;

function buildInput(
  base: CalculatorInput,
  overrides?: InputOverrides
): CalculatorInput {
  return { ...base, ...overrides };
}

export function getMetricWeightInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "weight",
      name: "weight",
      label: "Peso",
      type: "number",
      mode,
      unit: "kg",
      placeholder: "Ex: 75",
      validation: { required: true, ...WEIGHT_VALIDATION, step: 0.1 },
    },
    overrides
  );
}

export function getImperialWeightInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "weightLb",
      name: "weightLb",
      label: "Peso",
      type: "number",
      mode,
      unit: "lb",
      placeholder: "Ex: 165",
      validation: { required: true, min: 44, max: 660, step: 0.1 },
    },
    overrides
  );
}

export function getMetricHeightInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "height",
      name: "height",
      label: "Altura",
      type: "number",
      mode,
      unit: "cm",
      placeholder: "Ex: 175",
      validation: { required: true, ...HEIGHT_VALIDATION, step: 1 },
    },
    overrides
  );
}

export function getImperialHeightInputs(
  mode: InputMode,
  overrides?: { ft?: InputOverrides; inch?: InputOverrides }
): CalculatorInput[] {
  return [
    buildInput(
      {
        id: "heightFt",
        name: "heightFt",
        label: "Altura (pés)",
        type: "number",
        mode,
        unit: "ft",
        placeholder: "Ex: 5",
        validation: { required: true, min: 3, max: 8, step: 1 },
      },
      overrides?.ft
    ),
    buildInput(
      {
        id: "heightIn",
        name: "heightIn",
        label: "Altura (polegadas)",
        type: "number",
        mode,
        unit: "in",
        placeholder: "Ex: 9",
        validation: { required: true, min: 0, max: 11, step: 1 },
      },
      overrides?.inch
    ),
  ];
}

export function getMetricCircumferenceInput(
  mode: InputMode,
  config: {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    helpText?: string;
    required?: boolean;
    min: number;
    max: number;
  }
): CalculatorInput {
  return {
    id: config.id,
    name: config.name,
    label: config.label,
    type: "number",
    mode,
    unit: "cm",
    placeholder: config.placeholder,
    helpText: config.helpText,
    validation: {
      required: config.required ?? true,
      min: config.min,
      max: config.max,
      step: 0.1,
    },
  };
}

export function getImperialCircumferenceInput(
  mode: InputMode,
  config: {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    helpText?: string;
    required?: boolean;
    minIn: number;
    maxIn: number;
  }
): CalculatorInput {
  return {
    id: config.id,
    name: config.name,
    label: config.label,
    type: "number",
    mode,
    unit: "in",
    placeholder: config.placeholder,
    helpText: config.helpText,
    validation: {
      required: config.required ?? true,
      min: config.minIn,
      max: config.maxIn,
      step: 0.1,
    },
  };
}

export function getInlineTmbMetricInputs(mode: InputMode): CalculatorInput[] {
  return [
    getMetricWeightInput(mode, {
      id: "inlineWeight",
      name: "inlineWeight",
    }),
    getMetricHeightInput(mode, {
      id: "inlineHeight",
      name: "inlineHeight",
    }),
    buildInput(
      {
        id: "inlineAge",
        name: "inlineAge",
        label: "Idade",
        type: "number",
        mode,
        unit: "anos",
        placeholder: "Ex: 30",
        validation: { required: true, ...AGE_VALIDATION, step: 1 },
      },
      undefined
    ),
  ];
}

export function getInlineTmbImperialInputs(mode: InputMode): CalculatorInput[] {
  return [
    getImperialWeightInput(mode, {
      id: "inlineWeightLb",
      name: "inlineWeightLb",
    }),
    ...getImperialHeightInputs(mode, {
      ft: { id: "inlineHeightFt", name: "inlineHeightFt" },
      inch: { id: "inlineHeightIn", name: "inlineHeightIn" },
    }),
    buildInput(
      {
        id: "inlineAge",
        name: "inlineAge",
        label: "Idade",
        type: "number",
        mode,
        unit: "anos",
        placeholder: "Ex: 30",
        validation: { required: true, ...AGE_VALIDATION, step: 1 },
      },
      undefined
    ),
  ];
}
