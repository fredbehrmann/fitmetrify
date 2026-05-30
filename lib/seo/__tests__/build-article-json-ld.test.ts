import { describe, expect, it } from "vitest";

import type { ArticleMeta } from "@/lib/blog";
import { buildArticleJsonLd } from "@/lib/seo/json-ld/build-article-json-ld";

describe("buildArticleJsonLd", () => {
  it("includes Article schema fields", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://fitmetrify.com.br";

    const meta: ArticleMeta = {
      title: "Como calcular o IMC",
      slug: "como-calcular-imc",
      excerpt: "Guia completo.",
      category: "emagrecimento",
      tags: ["imc"],
      author: "FitMetrify",
      publishedAt: "2026-06-01",
      updatedAt: "2026-06-02",
      coverImage: "/images/blog/como-calcular-imc.svg",
      relatedCalculators: ["calculadora-imc"],
      seoTitle: "Como calcular o IMC | FitMetrify",
      seoDescription: "Aprenda a calcular o IMC.",
      readingTimeMinutes: 8,
    };

    const jsonLd = buildArticleJsonLd(meta);
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.headline).toBe(meta.title);
    expect(jsonLd.datePublished).toBe("2026-06-01");
    expect(jsonLd.url).toBe("https://fitmetrify.com.br/blog/como-calcular-imc");

    delete process.env.NEXT_PUBLIC_BASE_URL;
  });
});
