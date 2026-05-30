import path from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  extractHeadings,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/blog";

const FIXTURES_DIR = path.join(__dirname, "fixtures");

describe("blog", () => {
  beforeEach(() => {
    process.env.BLOG_DIR = FIXTURES_DIR;
  });

  afterEach(() => {
    delete process.env.BLOG_DIR;
  });

  it("parses frontmatter and reading time", () => {
    const article = getArticleBySlug("sample-article");
    expect(article).not.toBeNull();
    expect(article?.meta.title).toBe("Artigo de teste");
    expect(article?.meta.readingTimeMinutes).toBeGreaterThan(0);
    expect(article?.meta.faq).toHaveLength(1);
  });

  it("lists articles sorted by publishedAt desc", () => {
    const articles = getAllArticles();
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0].slug).toBe("sample-article");
  });

  it("extracts h2 and h3 headings", () => {
    const article = getArticleBySlug("sample-article");
    const headings = extractHeadings(article!.content);
    expect(headings).toHaveLength(2);
    expect(headings[0].id).toBe("introducao");
    expect(headings[1].level).toBe(2);
  });

  it("returns related articles by category", () => {
    const related = getRelatedArticles("other", "emagrecimento", 3);
    expect(related.every((a) => a.category === "emagrecimento")).toBe(true);
  });

  it("returns null for unknown slug", () => {
    expect(getArticleBySlug("inexistente")).toBeNull();
  });
});
