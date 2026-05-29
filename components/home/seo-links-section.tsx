import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { SEO_INTRO, SEO_LINK_GROUPS } from "@/lib/home/seo-links";

export function SeoLinksSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Calculadoras fitness gratuitas"
          subtitle={SEO_INTRO}
        />

        <div className="grid gap-10 md:grid-cols-2">
          {SEO_LINK_GROUPS.map((group) => (
            <article key={group.title} className="glass-card p-6">
              <h3 className="mb-4 text-lg font-semibold">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary text-sm hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
