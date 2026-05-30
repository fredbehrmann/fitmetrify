import type { CalculatorEngine, CalculatorResult } from "./types";
import { buildCalorieTargets } from "../gasto-calorico/calorie-targets";
import { calculateGet } from "../gasto-calorico/calculate-simple";
import {
  ACTIVITY_LEVEL_FACTORS,
  type ActivityLevel,
  type Goal,
  type WorkType,
} from "../gasto-calorico/constants";
import { estimateActivityFactor } from "../gasto-calorico/estimate-activity-factor";
import { formatKcal } from "../gasto-calorico/format";
import {
  buildInterpretation,
  buildNextSteps,
  buildResultKpis,
} from "../gasto-calorico/interpret";
import { ACTIVITY_LEVEL_EXAMPLES } from "../gasto-calorico/constants-examples";

function parseNumber(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  return null;
}

function parseActivityLevel(value: unknown): ActivityLevel | null {
  if (typeof value === "string" && value in ACTIVITY_LEVEL_FACTORS) {
    return value as ActivityLevel;
  }
  return null;
}

function parseWorkType(value: unknown): WorkType | null {
  if (value === "sedentary" || value === "standing" || value === "physical") {
    return value;
  }
  return null;
}

function parseGoal(value: unknown): Goal | null {
  if (value === "lose" || value === "maintain" || value === "gain") {
    return value;
  }
  return null;
}

function buildGastoCaloricoResult(
  tmb: number,
  activityFactor: number,
  goal: Goal,
  activityLevel?: ActivityLevel
): CalculatorResult {
  const get = calculateGet(tmb, activityFactor);
  const targets = buildCalorieTargets(get);

  const kpis = buildResultKpis(activityFactor, targets);

  if (activityLevel && ACTIVITY_LEVEL_EXAMPLES[activityLevel]) {
    kpis.push({
      label: "Exemplo prático",
      value: ACTIVITY_LEVEL_EXAMPLES[activityLevel].example,
    });
  }

  return {
    primaryValue: formatKcal(targets.maintenance),
    primaryUnit: "kcal/dia",
    primaryLabel: "Gasto calórico diário",
    classification: {
      label: "Gasto calórico estimado",
      variant: "default",
    },
    interpretation: buildInterpretation(targets, goal),
    kpis,
    nextSteps: buildNextSteps(),
    actions: [
      {
        label: "Definir Déficit Calórico",
        href: "/calculadora-deficit-calorico",
        params: { dailyExpenditure: targets.maintenance },
      },
    ],
  };
}

export const gastoCaloricoEngine: CalculatorEngine = {
  calculateSimple(values) {
    const tmb = parseNumber(values.tmb);
    const activityLevel = parseActivityLevel(values.activityLevel);

    if (tmb === null || activityLevel === null) return null;

    const factor = ACTIVITY_LEVEL_FACTORS[activityLevel];
    return buildGastoCaloricoResult(tmb, factor, "maintain", activityLevel);
  },

  calculateAdvanced(values) {
    const tmb = parseNumber(values.tmb);
    const strengthDays = parseNumber(values.strengthDays);
    const cardioDays = parseNumber(values.cardioDays);
    const workoutDuration = parseNumber(values.workoutDuration);
    const workType = parseWorkType(values.workType);
    const goal = parseGoal(values.goal);

    if (
      tmb === null ||
      strengthDays === null ||
      cardioDays === null ||
      workoutDuration === null ||
      workType === null ||
      goal === null
    ) {
      return null;
    }

    const factor = estimateActivityFactor(
      workType,
      strengthDays,
      cardioDays,
      workoutDuration
    );

    return buildGastoCaloricoResult(tmb, factor, goal);
  },
};
