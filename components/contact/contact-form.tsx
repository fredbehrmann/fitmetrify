"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type FormStatus = "idle" | "loading" | "success" | "error";

const SUBJECT_OPTIONS = [
  "Sugestão",
  "Erro",
  "Parceria",
  "Outro",
] as const;

const INITIAL_FORM = {
  nome: "",
  email: "",
  assunto: "Sugestão" as (typeof SUBJECT_OPTIONS)[number],
  mensagem: "",
};

export function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setForm(INITIAL_FORM);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-green-400">
        Mensagem enviada com sucesso! Responderemos em breve.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="contact-nome">Nome</Label>
        <Input
          id="contact-nome"
          name="nome"
          value={form.nome}
          onChange={(event) =>
            setForm((current) => ({ ...current, nome: event.target.value }))
          }
          required
          disabled={status === "loading"}
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">E-mail</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((current) => ({ ...current, email: event.target.value }))
          }
          required
          disabled={status === "loading"}
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-assunto">Assunto</Label>
        <Select
          value={form.assunto}
          onValueChange={(value) =>
            setForm((current) => ({
              ...current,
              assunto: value as (typeof SUBJECT_OPTIONS)[number],
            }))
          }
          disabled={status === "loading"}
        >
          <SelectTrigger id="contact-assunto" className="w-full">
            <SelectValue placeholder="Selecione um assunto" />
          </SelectTrigger>
          <SelectContent>
            {SUBJECT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-mensagem">Mensagem</Label>
        <Textarea
          id="contact-mensagem"
          name="mensagem"
          value={form.mensagem}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              mensagem: event.target.value,
            }))
          }
          required
          disabled={status === "loading"}
          rows={5}
        />
      </div>

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>

      {status === "error" && (
        <p className="text-xs text-red-400">
          Erro ao enviar. Tente novamente em instantes.
        </p>
      )}
    </form>
  );
}
