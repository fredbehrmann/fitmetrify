import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ArticleCard } from "@/components/blog/article-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getAllArticles } from "@/lib/blog";
import { buildBlogIndexMetadata } from "@/lib/seo/build-article-metadata";

export const metadata = buildBlogIndexMetadata();

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Início", href: "/" },
          { label: "Blog" },
        ]}
      />

      <SectionHeading
        title="Blog FitMetrify"
        subtitle="Dicas de fitness, nutrição e performance com base científica."
        className="mb-10"
      />

      {articles.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Novos artigos em breve.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
