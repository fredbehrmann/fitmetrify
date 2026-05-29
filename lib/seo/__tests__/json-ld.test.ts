import { describe, expect, it } from "vitest";

import { imcCalculator } from "@/lib/calculators/imc";

import {
  buildBreadcrumbListJsonLd,
  buildCalculatorBreadcrumbItems,
} from "../json-ld/breadcrumb";
import { buildCalculatorPageJsonLd } from "../json-ld/build-calculator-json-ld";
import { buildFaqPageJsonLd } from "../json-ld/faq";
import { buildWebApplicationJsonLd } from "../json-ld/web-application";
import { absoluteUrl } from "../site";

describe("json-ld builders", () => {
  it("builds FAQPage with mainEntity per question", () => {
    const json = buildFaqPageJsonLd(
      imcCalculator.faq,
      "https://example.com/calculadora-imc"
    );

    expect(json["@type"]).toBe("FAQPage");
    expect(json.mainEntity).toHaveLength(imcCalculator.faq.length);
    expect(json.mainEntity[0]["@type"]).toBe("Question");
    expect(json.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
  });

  it("builds BreadcrumbList with positions and absolute URLs", () => {
    const items = buildCalculatorBreadcrumbItems("Calculadora de IMC");
    const json = buildBreadcrumbListJsonLd(items, (path) =>
      `https://example.com${path}`
    );

    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(3);
    expect(json.itemListElement[0].position).toBe(1);
    expect(json.itemListElement[0].item).toBe("https://example.com/");
    expect(json.itemListElement[2].name).toBe("Calculadora de IMC");
    expect(json.itemListElement[2].item).toBeUndefined();
  });

  it("builds WebApplication with absolute url", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://fitmetrify.com";
    const url = absoluteUrl("/calculadora-imc");
    const json = buildWebApplicationJsonLd(imcCalculator, url);

    expect(json["@type"]).toBe("WebApplication");
    expect(json.url).toBe("https://fitmetrify.com/calculadora-imc");
    expect(json.applicationCategory).toBe("HealthApplication");
    expect(json.offers.price).toBe("0");
  });

  it("aggregates three graphs for calculator page", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://fitmetrify.com";
    const graphs = buildCalculatorPageJsonLd(imcCalculator);

    expect(graphs).toHaveLength(3);
    expect(graphs.map((g) => g["@type"])).toEqual([
      "WebApplication",
      "FAQPage",
      "BreadcrumbList",
    ]);
  });
});
