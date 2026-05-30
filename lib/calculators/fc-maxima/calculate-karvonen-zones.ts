import {
  HEART_RATE_ZONES_META,
  type HeartRateZone,
} from "./constants";

export function calculateKarvonenZones(
  maxHeartRate: number,
  restingHeartRate: number
): HeartRateZone[] {
  const reserve = maxHeartRate - restingHeartRate;

  return HEART_RATE_ZONES_META.map((zone) => ({
    id: zone.id,
    label: zone.label,
    minPercent: zone.minPercent,
    maxPercent: zone.maxPercent,
    minBpm: Math.round(restingHeartRate + (zone.minPercent / 100) * reserve),
    maxBpm: Math.round(restingHeartRate + (zone.maxPercent / 100) * reserve),
    benefit: zone.benefit,
  }));
}

export function calculatePercentMaxZones(maxHeartRate: number): HeartRateZone[] {
  return HEART_RATE_ZONES_META.map((zone) => ({
    id: zone.id,
    label: zone.label,
    minPercent: zone.minPercent,
    maxPercent: zone.maxPercent,
    minBpm: Math.round(maxHeartRate * (zone.minPercent / 100)),
    maxBpm: Math.round(maxHeartRate * (zone.maxPercent / 100)),
    benefit: zone.benefit,
  }));
}
