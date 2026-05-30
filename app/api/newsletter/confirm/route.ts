import { NextRequest, NextResponse } from "next/server";

import { sendWelcomeEmail } from "@/lib/email-templates/newsletter-welcome";
import { getBaseUrl } from "@/lib/base-url";
import { prisma } from "@/lib/prisma";

function redirectToHome(newsletter: "confirmed" | "invalid"): NextResponse {
  return NextResponse.redirect(`${getBaseUrl()}/?newsletter=${newsletter}`);
}

export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token");

    if (!token) {
      return redirectToHome("invalid");
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (!subscriber) {
      return redirectToHome("invalid");
    }

    if (subscriber.confirmed) {
      return redirectToHome("confirmed");
    }

    await prisma.newsletterSubscriber.update({
      where: { token },
      data: { confirmed: true, confirmedAt: new Date(), token: null },
    });

    await sendWelcomeEmail(subscriber.email);

    return redirectToHome("confirmed");
  } catch (error) {
    console.error("[newsletter/confirm]", error);
    return redirectToHome("invalid");
  }
}
