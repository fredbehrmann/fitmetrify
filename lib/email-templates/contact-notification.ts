export type ContactEmailPayload = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildContactEmail(payload: ContactEmailPayload): string {
  const nome = escapeHtml(payload.nome);
  const email = escapeHtml(payload.email);
  const assunto = escapeHtml(payload.assunto);
  const mensagem = escapeHtml(payload.mensagem).replaceAll("\n", "<br>");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h1 style="color:#0F2D54;font-size:20px">Nova mensagem de contato</h1>
      <p><b>De:</b> ${nome} (${email})</p>
      <p><b>Assunto:</b> ${assunto}</p>
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0">
      <p style="color:#334155;line-height:1.6">${mensagem}</p>
    </div>`;
}

export function buildContactSubject(assunto: string): string {
  return `[Contato FitMetrify] ${assunto || "Sem assunto"}`;
}
