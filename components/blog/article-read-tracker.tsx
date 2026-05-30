"use client";

import { useEffect, useRef } from "react";

import { trackEvent } from "@/lib/analytics";

type ArticleReadTrackerProps = {
  articleSlug: string;
};

export function ArticleReadTracker({ articleSlug }: ArticleReadTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent("blog_article_read", { article_slug: articleSlug });
  }, [articleSlug]);

  return null;
}
