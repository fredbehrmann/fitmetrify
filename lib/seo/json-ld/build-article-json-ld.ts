import type { ArticleMeta } from "@/lib/blog";
import { absoluteUrl, SITE_NAME } from "@/lib/seo/site";

export function buildArticleJsonLd(meta: ArticleMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.seoDescription,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt,
    author: {
      "@type": "Organization",
      name: meta.author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    image: absoluteUrl(meta.coverImage),
    url: absoluteUrl(`/blog/${meta.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${meta.slug}`),
  };
}
