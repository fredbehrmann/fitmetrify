export const SITE_NAME = "FitMetrify";

const LOCAL_DEV_URL = "http://localhost:3001";
export const PRODUCTION_DEFAULT_URL =
  "https://fitmetrify-production.up.railway.app";

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (url) return url.replace(/\/$/, "");

  return process.env.NODE_ENV === "production"
    ? PRODUCTION_DEFAULT_URL
    : LOCAL_DEV_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Alias aligned with spec (Etapa 1 Correções). */
export const canonicalUrl = absoluteUrl;
