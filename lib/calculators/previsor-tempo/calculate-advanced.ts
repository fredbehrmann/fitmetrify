import {
  ELEVATION_FACTOR_PER_100M,
  EXPERIENCE_FACTORS,
  EXPERIENCE_SPREAD,
  RACE_TYPE_FACTORS,
  TEMPERATURE_BASE_C,
  TEMPERATURE_FACTOR_PER_DEGREE,
  WEEKLY_RUNS_HIGH_FACTOR,
  WEEKLY_RUNS_HIGH_THRESHOLD,
  WEEKLY_RUNS_LOW_FACTOR,
  WEEKLY_RUNS_LOW_THRESHOLD,
  type RaceType,
  type RunnerExperience,
} from "./constants";
import {
  calculateSimplePrediction,
  type TimePredictionResult,
} from "./calculate-simple";

export type AdvancedPredictionOptions = {
  experience?: RunnerExperience;
  raceType?: RaceType;
  elevation?: number;
  temperature?: number;
  weeklyRuns?: number;
};

export type AdvancedTimePrediction = TimePredictionResult & {
  baseTimeMinutes: number;
  optimisticTimeMinutes: number;
  probableTimeMinutes: number;
  conservativeTimeMinutes: number;
  conditionFactor: number;
  spread: number;
};

export function buildConditionFactor(options: AdvancedPredictionOptions): number {
  let factor = 1;

  const elevation = options.elevation ?? 0;
  if (elevation > 0) {
    factor += (elevation / 100) * ELEVATION_FACTOR_PER_100M;
  }

  const temperature = options.temperature;
  if (temperature !== undefined && temperature > TEMPERATURE_BASE_C) {
    factor +=
      (temperature - TEMPERATURE_BASE_C) * TEMPERATURE_FACTOR_PER_DEGREE;
  }

  if (options.experience && options.experience in EXPERIENCE_FACTORS) {
    factor += EXPERIENCE_FACTORS[options.experience];
  }

  const weeklyRuns = options.weeklyRuns;
  if (weeklyRuns !== undefined) {
    if (weeklyRuns < WEEKLY_RUNS_LOW_THRESHOLD) {
      factor += WEEKLY_RUNS_LOW_FACTOR;
    } else if (weeklyRuns >= WEEKLY_RUNS_HIGH_THRESHOLD) {
      factor += WEEKLY_RUNS_HIGH_FACTOR;
    }
  }

  if (options.raceType && options.raceType in RACE_TYPE_FACTORS) {
    factor += RACE_TYPE_FACTORS[options.raceType];
  }

  return factor;
}

export function getSpread(experience?: RunnerExperience): number {
  if (experience && experience in EXPERIENCE_SPREAD) {
    return EXPERIENCE_SPREAD[experience];
  }
  return EXPERIENCE_SPREAD.intermediate;
}

export function calculateAdvancedPrediction(
  knownDistanceKm: number,
  knownTimeMinutes: number,
  targetDistanceKm: number,
  options: AdvancedPredictionOptions
): AdvancedTimePrediction {
  const base = calculateSimplePrediction(
    knownDistanceKm,
    knownTimeMinutes,
    targetDistanceKm
  );

  const conditionFactor = buildConditionFactor(options);
  const spread = getSpread(options.experience);
  const probableTimeMinutes = base.predictedTimeMinutes * conditionFactor;
  const optimisticTimeMinutes = probableTimeMinutes * (1 - spread);
  const conservativeTimeMinutes = probableTimeMinutes * (1 + spread);

  return {
    ...base,
    baseTimeMinutes: base.predictedTimeMinutes,
    probableTimeMinutes,
    optimisticTimeMinutes,
    conservativeTimeMinutes,
    predictedTimeMinutes: probableTimeMinutes,
    predictedPaceMinPerKm: probableTimeMinutes / targetDistanceKm,
    conditionFactor,
    spread,
  };
}
