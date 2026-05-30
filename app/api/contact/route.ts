import { NextRequest, NextResponse } from "next/server";

import {
  buildContactEmail,
  buildContactSubject,
} from "@/lib/email-templates/contact-notification";
import { validateEmail } from "@/lib/newsletter/validate-email";
import { getFromEmail, getResendClient } from "@/lib/resend";
import { getContactDestinationEmail } from "@/lib/site/legal";

const CONTACT_SUBJECTS = new Set([
  "Sugestão",
  "Erro",
  "Parceria",
  "Outro",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, email, assunto, mensagem } = body;

    if (!isNonEmptyString(nome) || !isNonEmptyString(mensagem)) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const normalizedEmail = validateEmail(email);
    if (!normalizedEmail) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const subjectLabel =
      isNonEmptyString(assunto) && CONTACT_SUBJECTS.has(assunto)
        ? assunto
        : "Outro";

    await getResendClient().emails.send({
      from: getFromEmail(),
      to: getContactDestinationEmail(),
      replyTo: normalizedEmail,
      subject: buildContactSubject(subjectLabel),
      html: buildContactEmail({
        nome: nome.trim(),
        email: normalizedEmail,
        assunto: subjectLabel,
        mensagem: mensagem.trim(),
      }),
    });

    return NextResponse.json({ message: "sent" }, { status: 200 });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem." },
      { status: 500 }
    );
  }
}
