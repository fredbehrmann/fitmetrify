import { describe, expect, it } from "vitest";

import { LEGAL, getContactDestinationEmail } from "@/lib/site/legal";

describe("LEGAL constants", () => {
  it("exports brand and contact emails", () => {
    expect(LEGAL.brandName).toBe("FitMetrify");
    expect(LEGAL.contactEmail).toBe("contato@fitmetrify.com.br");
    expect(LEGAL.privacyEmail).toBe("contato@fitmetrify.com.br");
  });

  it("exports policy version metadata", () => {
    expect(LEGAL.policyVersion).toBe("1.0");
    expect(LEGAL.policyEffectiveDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("getContactDestinationEmail", () => {
  it("defaults to legal contact email", () => {
    delete process.env.CONTACT_DESTINATION_EMAIL;
    expect(getContactDestinationEmail()).toBe(LEGAL.contactEmail);
  });

  it("uses CONTACT_DESTINATION_EMAIL when set", () => {
    process.env.CONTACT_DESTINATION_EMAIL = "inbox@example.com";
    expect(getContactDestinationEmail()).toBe("inbox@example.com");
    delete process.env.CONTACT_DESTINATION_EMAIL;
  });
});
