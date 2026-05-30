import type { Metadata } from "next";

import type { Calculator } from "@/lib/calculators/types";

import { absoluteUrl, SITE_NAME } from "./site";

export function buildCalculatorMetadata(calculator: Calculator): Metadata {
  const pageUrl = absoluteUrl(`/${calculator.slug}`);
  const title = calculator.seoTitle.replace(` | ${SITE_NAME}`, "");
  const ogTitle = calculator.seoTitle;

  return {
    title,
    description: calculator.seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description: calculator.seoDescription,
      url: pageUrl,
      locale: "pt_BR",
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: calculator.seoDescription,
    },
    other: {
      "twitter:url": pageUrl,
    },
  };
}

export function buildHubMetadata(
  path: string,
  title: string,
  description: string
): Metadata {
  const pageUrl = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: pageUrl,
      locale: "pt_BR",
      type: "website",
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    other: {
      "twitter:url": pageUrl,
    },
  };
}
