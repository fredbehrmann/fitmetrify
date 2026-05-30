import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import { RelatedCalcCTA } from "@/components/blog/related-calc-cta";
import { slugifyHeading } from "@/lib/blog/slugify-heading";

function getHeadingText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((child) => getHeadingText(child as ReactNode)).join("");
  }
  return String(children ?? "");
}

function createHeading(level: 2 | 3) {
  const Tag = level === 2 ? "h2" : "h3";

  return function Heading({ children }: { children?: ReactNode }) {
    const text = getHeadingText(children);
    const id = slugifyHeading(text);
    return <Tag id={id}>{children}</Tag>;
  };
}

export const mdxComponents: MDXComponents = {
  h2: createHeading(2),
  h3: createHeading(3),
  RelatedCalcCTA,
};
