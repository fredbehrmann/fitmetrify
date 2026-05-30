import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/blog/article-body";
import { ArticleHero } from "@/components/blog/article-hero";
import { ArticleReadTracker } from "@/components/blog/article-read-tracker";
import { RelatedArticles } from "@/components/blog/related-articles";
import { RelatedCalcCTA } from "@/components/blog/related-calc-cta";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { MedicalDisclaimer } from "@/components/layout/medical-disclaimer";
import { JsonLd } from "@/components/seo/json-ld";
import {
  extractHeadings,
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/blog";
import { buildArticleMetadata } from "@/lib/seo/build-article-metadata";
import { buildBreadcrumbListJsonLd } from "@/lib/seo/json-ld/breadcrumb";
import { buildArticleJsonLd } from "@/lib/seo/json-ld/build-article-json-ld";
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld/faq";
import { absoluteUrl } from "@/lib/seo/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };
  return buildArticleMetadata(article.meta);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const { meta, content } = article;
  const pageUrl = absoluteUrl(`/blog/${meta.slug}`);
  const headings = extractHeadings(content);

  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: meta.title },
  ];

  const jsonLdGraphs: Record<string, unknown>[] = [
    buildBreadcrumbListJsonLd(breadcrumbItems, absoluteUrl),
    buildArticleJsonLd(meta),
  ];

  if (meta.faq && meta.faq.length > 0) {
    jsonLdGraphs.push(buildFaqPageJsonLd(meta.faq, pageUrl));
  }

  return (
    <>
      <JsonLd data={jsonLdGraphs} />
      <ArticleReadTracker articleSlug={meta.slug} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ArticleHero meta={meta} />
        <TableOfContents headings={headings} />
        <ArticleBody content={content} />
        <RelatedCalcCTA slugs={meta.relatedCalculators} />
        <MedicalDisclaimer className="mt-8" />
        <RelatedArticles currentSlug={meta.slug} category={meta.category} />
      </article>
    </>
  );
}
