export const WEIGHT_VALIDATION = { min: 30, max: 300 } as const;
export const HEIGHT_VALIDATION = { min: 100, max: 250 } as const;
export const AGE_VALIDATION = { min: 14, max: 100 } as const;
export const CALORIES_VALIDATION = { min: 800, max: 8000 } as const;
export const REPS_1RM_VALIDATION = {
  min: 1,
  max: 12,
  warningAbove: 12,
  warningMessage:
    "Estimativas de 1RM ficam menos precisas com muitas repetições.",
} as const;
export const BODY_FAT_VALIDATION = { min: 3, max: 60 } as const;
export const PERCENT_VALIDATION = { min: 0, max: 100 } as const;
