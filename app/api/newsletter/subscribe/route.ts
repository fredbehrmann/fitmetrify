import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { buildConfirmEmail } from "@/lib/email-templates/newsletter-confirm";
import { getBaseUrl } from "@/lib/base-url";
import { validateEmail } from "@/lib/newsletter/validate-email";
import { prisma } from "@/lib/prisma";
import { getFromEmail, getResendClient } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = validateEmail(body.email);
    const source =
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim()
        : "footer";

    if (!email) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing?.confirmed) {
      return NextResponse.json({ message: "already_confirmed" }, { status: 200 });
    }

    const token = randomBytes(32).toString("hex");
    const confirmUrl = `${getBaseUrl()}/api/newsletter/confirm?token=${token}`;

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email, token, source },
      update: { token, source },
    });

    await getResendClient().emails.send({
      from: getFromEmail(),
      to: email,
      subject: "Confirme seu cadastro no FitMetrify",
      html: buildConfirmEmail(confirmUrl),
    });

    return NextResponse.json({ message: "confirmation_sent" }, { status: 200 });
  } catch (error) {
    console.error("[newsletter/subscribe]", error);
    return NextResponse.json(
      { error: "Erro ao processar cadastro." },
      { status: 500 }
    );
  }
}
