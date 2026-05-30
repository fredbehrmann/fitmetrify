import { describe, expect, it } from "vitest";

import {
  buildContactEmail,
  buildContactSubject,
  escapeHtml,
} from "@/lib/email-templates/contact-notification";

describe("contact-notification", () => {
  it("buildContactEmail includes sender fields and message", () => {
    const html = buildContactEmail({
      nome: "Maria",
      email: "maria@example.com",
      assunto: "Sugestão",
      mensagem: "Olá, equipe FitMetrify!",
    });

    expect(html).toContain("Maria");
    expect(html).toContain("maria@example.com");
    expect(html).toContain("Sugestão");
    expect(html).toContain("Olá, equipe FitMetrify!");
  });

  it("escapeHtml prevents HTML injection", () => {
    const escaped = escapeHtml('<script>alert("x")</script>');
    expect(escaped).not.toContain("<script>");
    expect(escaped).toContain("&lt;script&gt;");
  });

  it("buildContactEmail escapes malicious input", () => {
    const html = buildContactEmail({
      nome: "<b>Atacante</b>",
      email: "evil@example.com",
      assunto: "Erro",
      mensagem: "<img src=x onerror=alert(1)>",
    });

    expect(html).not.toContain("<b>Atacante</b>");
    expect(html).toContain("&lt;b&gt;Atacante&lt;/b&gt;");
    expect(html).not.toContain("<img");
  });

  it("buildContactSubject prefixes assunto", () => {
    expect(buildContactSubject("Parceria")).toBe(
      "[Contato FitMetrify] Parceria"
    );
    expect(buildContactSubject("")).toBe("[Contato FitMetrify] Sem assunto");
  });
});
