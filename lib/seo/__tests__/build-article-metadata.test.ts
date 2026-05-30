import { describe, expect, it } from "vitest";

import type { ArticleMeta } from "@/lib/blog";
import {
  buildArticleMetadata,
  buildBlogIndexMetadata,
} from "@/lib/seo/build-article-metadata";

describe("build-article-metadata", () => {
  const meta: ArticleMeta = {
    title: "Como calcular o IMC",
    slug: "como-calcular-imc",
    excerpt: "Guia completo sobre IMC.",
    category: "emagrecimento",
    tags: ["imc"],
    author: "FitMetrify",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-01",
    coverImage: "/images/blog/como-calcular-imc.svg",
    relatedCalculators: ["calculadora-imc"],
    seoTitle: "Como calcular o IMC | FitMetrify",
    seoDescription: "Aprenda a calcular o IMC.",
    readingTimeMinutes: 8,
  };

  it("builds blog index metadata", () => {
    const metadata = buildBlogIndexMetadata();
    expect(metadata.title).toContain("Blog FitMetrify");
    expect(metadata.alternates?.canonical).toContain("/blog");
  });

  it("builds article metadata with OG article type", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://fitmetrify.com.br";
    const metadata = buildArticleMetadata(meta);
    expect(metadata.openGraph?.type).toBe("article");
    expect(metadata.openGraph?.publishedTime).toBe("2026-06-01");
    expect(metadata.alternates?.canonical).toBe(
      "https://fitmetrify.com.br/blog/como-calcular-imc"
    );
    delete process.env.NEXT_PUBLIC_BASE_URL;
  });
});
