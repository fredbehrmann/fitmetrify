import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { absoluteUrl, getSiteUrl } from "@/lib/seo/site";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "FitMetrify | Calculadoras Fitness e Nutrição",
    template: "%s | FitMetrify",
  },
  description:
    "Portal gratuito de calculadoras fitness, nutrição, emagrecimento, corrida e musculação. Transforme dados em evolução.",
  openGraph: {
    title: "FitMetrify | Calculadoras Fitness e Nutrição",
    description:
      "Métricas inteligentes para resultados reais. Calcule IMC, TMB, macros e muito mais.",
    type: "website",
    locale: "pt_BR",
    url: absoluteUrl("/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
