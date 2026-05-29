export function calculateImc(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
}

export function formatImc(bmi: number): string {
  return bmi.toFixed(1);
}
