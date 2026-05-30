import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/blog/mdx-components";

type ArticleBodyProps = {
  content: string;
};

export function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="blog-prose">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
