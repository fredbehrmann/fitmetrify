import { describe, expect, it } from "vitest";

import { buildConfirmEmail } from "@/lib/email-templates/newsletter-confirm";

describe("buildConfirmEmail", () => {
  it("includes confirm URL and CTA", () => {
    const confirmUrl =
      "https://fitmetrify.com.br/api/newsletter/confirm?token=abc123";
    const html = buildConfirmEmail(confirmUrl);

    expect(html).toContain(confirmUrl);
    expect(html).toContain("Confirmar meu e-mail");
    expect(html).toContain("Confirme seu cadastro no FitMetrify");
  });
});
