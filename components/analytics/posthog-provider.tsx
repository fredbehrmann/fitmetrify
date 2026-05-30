"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { initPostHog, isPostHogReady, posthog } from "@/lib/posthog";

export function PostHogProvider() {
  const pathname = usePathname();

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!isPostHogReady()) return;

    posthog.capture("$pageview", {
      $current_url: window.location.href,
    });
  }, [pathname]);

  return null;
}
