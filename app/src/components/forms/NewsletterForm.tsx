"use client";

import { useState, useTransition } from "react";
import { Loader2, Check } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/leads";
import { cn } from "@/lib/cn";

export function NewsletterForm({
  variant = "light",
  source = "inline",
  className,
}: {
  variant?: "light" | "dark";
  source?: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [naam, setNaam] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const dark = variant === "dark";

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.includes("@")) {
          setState("error");
          setMessage("Oeps, dat lijkt geen geldig mailadres.");
          return;
        }
        startTransition(async () => {
          const res = await subscribeNewsletter({ email, naam, source });
          if (res.ok) {
            setState("ok");
            setMessage("Proost — je bent ingeschonken. Check je inbox.");
            setEmail("");
            setNaam("");
          } else {
            setState("error");
            setMessage(res.error ?? "Er spat wat schuim over. Probeer opnieuw.");
          }
        });
      }}
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <label className="sr-only" htmlFor={`ns-naam-${source}`}>Naam</label>
        <input
          id={`ns-naam-${source}`}
          type="text"
          autoComplete="given-name"
          placeholder="Voornaam (optioneel)"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          className={cn(
            "h-11 sm:h-12 px-4 rounded-full outline-none transition-colors text-sm flex-1 min-w-0",
            dark
              ? "bg-schuim/10 text-schuim placeholder:text-schuim/50 border border-schuim/20 focus:border-koper"
              : "bg-schuim text-hout placeholder:text-hout-soft/60 border border-hout/10 focus:border-koper",
          )}
        />
        <label className="sr-only" htmlFor={`ns-email-${source}`}>E-mail</label>
        <input
          id={`ns-email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="jij@voorbeeld.nl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "h-11 sm:h-12 px-4 rounded-full outline-none transition-colors text-sm flex-1 min-w-0",
            dark
              ? "bg-schuim/10 text-schuim placeholder:text-schuim/50 border border-schuim/20 focus:border-koper"
              : "bg-schuim text-hout placeholder:text-hout-soft/60 border border-hout/10 focus:border-koper",
          )}
        />
        <button
          type="submit"
          disabled={pending || state === "ok"}
          className={cn(
            "h-11 sm:h-12 px-5 rounded-full font-medium text-sm inline-flex items-center justify-center gap-2 transition-colors",
            state === "ok"
              ? "bg-groen-ok text-schuim"
              : "bg-koper text-schuim hover:bg-koper-dark",
            "disabled:opacity-70",
          )}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "ok" ? (
            <Check className="h-4 w-4" />
          ) : null}
          {state === "ok" ? "Geproost" : "Schenk mij in"}
        </button>
      </div>
      {message && (
        <p
          role={state === "error" ? "alert" : "status"}
          className={cn(
            "mt-3 text-sm",
            state === "error" && (dark ? "text-hop" : "text-rood"),
            state === "ok" && (dark ? "text-hop" : "text-groen-ok"),
          )}
        >
          {message}
        </p>
      )}
      <p className={cn("mt-2 text-xs", dark ? "text-schuim/60" : "text-hout-soft/70")}>
        Eén mail per week. Altijd aftappen kan.
      </p>
    </form>
  );
}
