import { Resend } from "resend";

const globalForResend = globalThis as unknown as {
  resend: Resend | undefined;
};

export function getResendClient(): Resend {
  if (!globalForResend.resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    globalForResend.resend = new Resend(apiKey);
  }
  return globalForResend.resend;
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "newsletter@fitmetrify.com.br";
}
