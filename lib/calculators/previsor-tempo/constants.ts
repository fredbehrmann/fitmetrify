export const RIEGEL_EXPONENT = 1.06;

export const ELEVATION_FACTOR_PER_100M = 0.004;
export const TEMPERATURE_BASE_C = 22;
export const TEMPERATURE_FACTOR_PER_DEGREE = 0.008;

export const EXPERIENCE_FACTORS = {
  beginner: 0.02,
  intermediate: 0,
  advanced: -0.015,
} as const;

export const EXPERIENCE_SPREAD = {
  beginner: 0.04,
  intermediate: 0.03,
  advanced: 0.02,
} as const;

export const WEEKLY_RUNS_LOW_THRESHOLD = 3;
export const WEEKLY_RUNS_HIGH_THRESHOLD = 5;
export const WEEKLY_RUNS_LOW_FACTOR = 0.02;
export const WEEKLY_RUNS_HIGH_FACTOR = -0.01;

export const RACE_TYPE_FACTORS = {
  "5k": 0,
  "10k": 0.005,
  half: 0.01,
  marathon: 0.015,
} as const;

export type RunnerExperience = keyof typeof EXPERIENCE_FACTORS;
export type RaceType = keyof typeof RACE_TYPE_FACTORS;
