import {
  ACTIVITY_LEVELS,
  SEX_OPTIONS,
} from "./options";
import type { CalculatorInput, InputMode } from "./types";
import {
  AGE_VALIDATION,
  BODY_FAT_VALIDATION,
  CALORIES_VALIDATION,
  HEIGHT_VALIDATION,
  REPS_1RM_VALIDATION,
  WEIGHT_VALIDATION,
} from "./validation";

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

export function weightInput(
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

export function heightInput(
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

export function ageInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "age",
      name: "age",
      label: "Idade",
      type: "number",
      mode,
      unit: "anos",
      placeholder: "Ex: 30",
      validation: { required: true, ...AGE_VALIDATION, step: 1 },
    },
    overrides
  );
}

export function sexInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "sex",
      name: "sex",
      label: "Sexo",
      type: "select",
      mode,
      options: [...SEX_OPTIONS],
      validation: { required: true },
    },
    overrides
  );
}

export function activityLevelInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "activityLevel",
      name: "activityLevel",
      label: "Nível de atividade",
      type: "select",
      mode,
      options: [...ACTIVITY_LEVELS],
      validation: { required: true },
    },
    overrides
  );
}

export function caloriesInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "calories",
      name: "calories",
      label: "Calorias diárias",
      type: "number",
      mode,
      unit: "kcal",
      placeholder: "Ex: 2000",
      validation: { required: true, ...CALORIES_VALIDATION, step: 1 },
    },
    overrides
  );
}

export function bodyFatInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "bodyFat",
      name: "bodyFat",
      label: "Percentual de gordura",
      type: "number",
      mode,
      unit: "%",
      placeholder: "Ex: 18",
      helpText: "Opcional, se você souber seu percentual de gordura.",
      validation: { ...BODY_FAT_VALIDATION, step: 0.1 },
    },
    overrides
  );
}

export function repsInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "reps",
      name: "reps",
      label: "Repetições",
      type: "number",
      mode,
      placeholder: "Ex: 8",
      validation: {
        required: true,
        min: REPS_1RM_VALIDATION.min,
        max: REPS_1RM_VALIDATION.max,
        warningAbove: REPS_1RM_VALIDATION.warningAbove,
        warningMessage: REPS_1RM_VALIDATION.warningMessage,
        step: 1,
      },
    },
    overrides
  );
}

export function loadInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "load",
      name: "load",
      label: "Carga",
      type: "number",
      mode,
      unit: "kg",
      placeholder: "Ex: 80",
      validation: { required: true, min: 1, max: 500, step: 0.5 },
    },
    overrides
  );
}

export function tmbInput(
  mode: InputMode,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      id: "tmb",
      name: "tmb",
      label: "TMB",
      type: "number",
      mode,
      unit: "kcal/dia",
      placeholder: "Ex: 1800",
      helpText: "Taxa Metabólica Basal em kcal/dia.",
      validation: { required: true, ...CALORIES_VALIDATION, step: 1 },
    },
    overrides
  );
}

export function checkboxInput(
  mode: InputMode,
  config: Pick<CalculatorInput, "id" | "name" | "label" | "helpText">,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      ...config,
      type: "checkbox",
      mode,
      defaultValue: false,
    },
    overrides
  );
}

export function numberInput(
  mode: InputMode,
  config: Pick<
    CalculatorInput,
    "id" | "name" | "label" | "unit" | "placeholder" | "helpText" | "validation"
  >,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      ...config,
      type: "number",
      mode,
    },
    overrides
  );
}

export function selectInput(
  mode: InputMode,
  config: Pick<
    CalculatorInput,
    "id" | "name" | "label" | "options" | "helpText" | "validation" | "defaultValue"
  >,
  overrides?: InputOverrides
): CalculatorInput {
  return buildInput(
    {
      ...config,
      type: "select",
      mode,
    },
    overrides
  );
}
