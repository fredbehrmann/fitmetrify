import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { slugifyHeading } from "@/lib/blog/slugify-heading";
import type { FaqItem } from "@/lib/calculators/types";

export type ArticleFaqItem = FaqItem;

export interface ArticleMeta {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  coverImage: string;
  relatedCalculators: string[];
  seoTitle: string;
  seoDescription: string;
  faq?: ArticleFaqItem[];
  readingTimeMinutes: number;
}

export type ArticleHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function getBlogDirectory(): string {
  return process.env.BLOG_DIR ?? path.join(process.cwd(), "content/blog");
}

function parseArticleFile(filepath: string, filename: string): ArticleMeta {
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const fileSlug = filename.replace(/\.mdx$/, "");

  if (
    process.env.NODE_ENV === "development" &&
    data.slug &&
    data.slug !== fileSlug
  ) {
    console.warn(
      `[blog] slug mismatch in ${filename}: frontmatter "${data.slug}" vs file "${fileSlug}"`
    );
  }

  return {
    ...(data as Omit<ArticleMeta, "readingTimeMinutes">),
    slug: (data.slug as string) ?? fileSlug,
    readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function getAllArticles(): ArticleMeta[] {
  const blogDir = getBlogDirectory();
  if (!fs.existsSync(blogDir)) return [];

  return fs
    .readdirSync(blogDir)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) =>
      parseArticleFile(path.join(blogDir, filename), filename)
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleBySlug(slug: string): {
  meta: ArticleMeta;
  content: string;
} | null {
  const blogDir = getBlogDirectory();
  const filepath = path.join(blogDir, `${slug}.mdx`);

  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      ...(data as Omit<ArticleMeta, "readingTimeMinutes">),
      slug: (data.slug as string) ?? slug,
      readingTimeMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    },
    content,
  };
}

export function getArticleSlugs(): string[] {
  return getAllArticles().map((article) => article.slug);
}

export function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3
): ArticleMeta[] {
  return getAllArticles()
    .filter((article) => article.slug !== slug && article.category === category)
    .slice(0, limit);
}

export function extractHeadings(content: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];

  for (const line of content.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/#+$/, "").trim();
    headings.push({
      id: slugifyHeading(text),
      text,
      level,
    });
  }

  return headings;
}
