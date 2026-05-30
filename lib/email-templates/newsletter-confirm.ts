export function buildConfirmEmail(confirmUrl: string): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px">
    <h1 style="color:#0F2D54;font-size:24px;margin-bottom:8px">
      Confirme seu cadastro no FitMetrify
    </h1>
    <p style="color:#334155;font-size:16px;line-height:1.6">
      Você está a um clique de receber dicas, guias e novidades sobre
      fitness, nutrição e performance.
    </p>
    <a href="${confirmUrl}"
       style="display:inline-block;background:#0F2D54;color:#fff;
              padding:14px 28px;border-radius:8px;text-decoration:none;
              font-size:16px;font-weight:bold;margin:24px 0">
      ✓ Confirmar meu e-mail
    </a>
    <p style="color:#64748B;font-size:14px">
      Se você não se cadastrou, ignore este e-mail.
      O link expira em 48 horas.
    </p>
    <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0">
    <p style="color:#64748B;font-size:12px">
      FitMetrify · Ferramentas Fitness Gratuitas
    </p>
  </div>`;
}
