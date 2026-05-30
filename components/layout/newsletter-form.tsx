"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "already" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        return;
      }

      if (data.message === "already_confirmed") {
        setStatus("already");
        return;
      }

      setStatus("success");
      trackEvent("newsletter_signup", { source: "footer" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-green-400">
        ✓ Verifique seu e-mail para confirmar o cadastro.
      </p>
    );
  }

  if (status === "already") {
    return <p className="text-sm text-blue-300">Você já está cadastrado!</p>;
  }

  return (
    <div className="w-full max-w-md space-y-2">
      <form
        className="flex w-full gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          type="email"
          placeholder="Seu e-mail"
          aria-label="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={status === "loading"}
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Inscrever-se"
          disabled={status === "loading"}
        >
          <Send className="size-4" />
        </Button>
      </form>
      {status === "error" && (
        <p className="text-xs text-red-400">
          Erro ao cadastrar. Tente novamente.
        </p>
      )}
    </div>
  );
}
