"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type BannerVariant = "confirmed" | "invalid" | null;

function getVariant(params: URLSearchParams): BannerVariant {
  const value = params.get("newsletter");
  if (value === "confirmed" || value === "invalid") {
    return value;
  }
  return null;
}

export function NewsletterConfirmBanner() {
  const params = useSearchParams();
  const [variant, setVariant] = useState<BannerVariant>(null);

  useEffect(() => {
    setVariant(getVariant(params));
  }, [params]);

  if (!variant) return null;

  const isConfirmed = variant === "confirmed";

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-6 py-3 text-sm font-medium shadow-lg ${
        isConfirmed ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
      role="status"
    >
      {isConfirmed
        ? "✓ E-mail confirmado! Bem-vindo ao FitMetrify."
        : "Link inválido ou expirado. Tente se cadastrar novamente."}
      <button
        type="button"
        onClick={() => setVariant(null)}
        className="ml-2 text-white/70 hover:text-white"
        aria-label="Fechar"
      >
        ✕
      </button>
    </div>
  );
}
