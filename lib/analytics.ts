import { isPostHogReady, posthog } from "@/lib/posthog";

export type EventName =
  | "calc_started"
  | "calc_completed"
  | "journey_step"
  | "unit_toggle"
  | "advanced_mode"
  | "search_used"
  | "newsletter_signup" // Etapa 3
  | "blog_article_read"; // Etapa 5

export type EventProperties = {
  calc_slug?: string;
  from_calc?: string;
  to_calc?: string;
  unit_from?: string;
  unit_to?: string;
  article_slug?: string;
  search_query?: string;
  mode?: string;
  source?: string;
  [key: string]: unknown;
};

export function trackEvent(name: EventName, props?: EventProperties): void {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, props ?? {});
  }

  if (isPostHogReady()) {
    posthog.capture(name, props);
  }
}
