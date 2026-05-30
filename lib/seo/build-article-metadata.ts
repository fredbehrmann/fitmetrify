import type { Metadata } from "next";

import type { ArticleMeta } from "@/lib/blog";
import { buildHubMetadata } from "@/lib/seo/build-calculator-metadata";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

export function buildBlogIndexMetadata(): Metadata {
  return buildHubMetadata(
    "/blog",
    "Blog FitMetrify — Dicas de Fitness, Nutrição e Performance",
    "Artigos gratuitos sobre emagrecimento, hipertrofia, corrida e nutrição, escritos com base científica."
  );
}

export function buildArticleMetadata(meta: ArticleMeta): Metadata {
  const pageUrl = absoluteUrl(`/blog/${meta.slug}`);

  return {
    title: meta.seoTitle.replace(` | ${SITE_NAME}`, ""),
    description: meta.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: meta.seoTitle,
      description: meta.seoDescription,
      url: pageUrl,
      locale: "pt_BR",
      type: "article",
      publishedTime: meta.publishedAt,
      modifiedTime: meta.updatedAt,
      images: [absoluteUrl(meta.coverImage)],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.seoTitle,
      description: meta.seoDescription,
      images: [absoluteUrl(meta.coverImage)],
    },
    other: {
      "twitter:url": pageUrl,
    },
  };
}
