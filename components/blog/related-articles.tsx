import { ArticleCard } from "@/components/blog/article-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getRelatedArticles } from "@/lib/blog";

type RelatedArticlesProps = {
  currentSlug: string;
  category: string;
};

export function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const articles = getRelatedArticles(currentSlug, category, 3);

  if (articles.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <SectionHeading
        title="Artigos relacionados"
        subtitle="Continue aprendendo sobre o mesmo tema."
        className="mb-6"
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
