import type { Calculator } from "@/lib/calculators/types";
import { absoluteUrl } from "../site";
import {
  buildBreadcrumbListJsonLd,
  buildCalculatorBreadcrumbItems,
} from "./breadcrumb";
import { buildFaqPageJsonLd } from "./faq";
import { buildWebApplicationJsonLd } from "./web-application";

export function buildCalculatorPageJsonLd(calculator: Calculator) {
  const pageUrl = absoluteUrl(`/${calculator.slug}`);
  const breadcrumbItems = buildCalculatorBreadcrumbItems(calculator.title);

  return [
    buildWebApplicationJsonLd(calculator, pageUrl),
    buildFaqPageJsonLd(calculator.faq, pageUrl),
    buildBreadcrumbListJsonLd(breadcrumbItems, absoluteUrl),
  ];
}
