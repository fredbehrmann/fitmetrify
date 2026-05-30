import { describe, expect, it } from "vitest";

import { getCalculatorBySlug } from "@/lib/calculators/registry";
import {
  getHomeSectionCalculators,
  HOME_SECTIONS,
} from "../sections";

describe("home sections", () => {
  it("defines exactly 4 thematic sections", () => {
    expect(HOME_SECTIONS).toHaveLength(4);
  });

  it("resolves all curated slugs for ganho de massa", () => {
    const section = HOME_SECTIONS.find((s) => s.id === "ganho-massa");
    expect(section).toBeDefined();

    if (section?.source.type === "slugs") {
      section.source.slugs.forEach((slug) => {
        expect(getCalculatorBySlug(slug)).toBeDefined();
      });
    }
  });

  it("returns non-empty calculators for category sections", () => {
    HOME_SECTIONS.filter((s) => s.source.type === "category").forEach(
      (section) => {
        const items = getHomeSectionCalculators(section);
        expect(items.length).toBeGreaterThan(0);
      }
    );
  });

  it("returns 7 calculators for ganho de massa section", () => {
    const section = HOME_SECTIONS.find((s) => s.id === "ganho-massa")!;
    expect(getHomeSectionCalculators(section)).toHaveLength(7);
  });
});
