import type { MetadataRoute } from "next";

import { getAllCalculatorSlugs } from "@/lib/calculators/registry";
import { absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const calculatorEntries = getAllCalculatorSlugs().map((slug) => ({
    url: absoluteUrl(`/${slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
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
    ...calculatorEntries,
  ];
}
