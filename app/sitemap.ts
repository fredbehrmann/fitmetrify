import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/blog";
import { getAllCalculatorSlugs } from "@/lib/calculators/registry";
import { absoluteUrl } from "@/lib/seo/site";

const INSTITUTIONAL_PATHS = ["/sobre", "/contato", "/privacidade", "/termos"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const calculatorEntries = getAllCalculatorSlugs().map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const institutionalEntries = INSTITUTIONAL_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const blogArticles = getAllArticles();
  const blogIndexEntry = {
    url: absoluteUrl("/blog"),
    lastModified,
    changeFrequency: "daily" as const,
    priority: 0.8,
  };
  const blogArticleEntries = blogArticles.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/calculadoras"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    blogIndexEntry,
    ...blogArticleEntries,
    ...institutionalEntries,
    ...calculatorEntries,
  ];
}
