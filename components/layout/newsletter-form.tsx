"use client";

import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(event) => event.preventDefault()}
    >
      <Input type="email" placeholder="Seu e-mail" aria-label="E-mail" />
      <Button type="submit" size="icon" aria-label="Inscrever-se">
        <Send className="size-4" />
      </Button>
    </form>
  );
}
