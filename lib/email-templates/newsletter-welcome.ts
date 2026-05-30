import { getBaseUrl } from "@/lib/base-url";
import { getFromEmail, getResendClient } from "@/lib/resend";

export async function sendWelcomeEmail(email: string): Promise<void> {
  const baseUrl = getBaseUrl();

  await getResendClient().emails.send({
    from: getFromEmail(),
    to: email,
    subject: "Bem-vindo ao FitMetrify 💪",
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px">
      <h1 style="color:#0F2D54">Bem-vindo ao FitMetrify!</h1>
      <p style="color:#334155;font-size:16px;line-height:1.6">
        Seu cadastro está confirmado. Você vai receber dicas de fitness,
        nutrição e performance diretamente aqui.
      </p>
      <h2 style="color:#1B4F8A;font-size:18px">Comece por aqui:</h2>
      <ul style="color:#334155;font-size:15px;line-height:2">
        <li><a href="${baseUrl}/calculadora-imc">Calcular meu IMC</a></li>
        <li><a href="${baseUrl}/calculadora-tmb">Descobrir minha TMB</a></li>
        <li><a href="${baseUrl}/calculadora-deficit-calorico">Criar um déficit calórico</a></li>
        <li><a href="${baseUrl}/calculadora-proteina">Calcular proteína diária</a></li>
      </ul>
    </div>`,
  });
}
