"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { createPost } from "@/app/actions/tapkamer";
import { kanalen } from "@/content/tapkamer";
import { cn } from "@/lib/cn";

export function PostForm({ defaultKanaal = "algemeen" }: { defaultKanaal?: string }) {
  const [kanaal, setKanaal] = useState(defaultKanaal);
  const [titel, setTitel] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="rounded-2xl bg-schuim border border-hout/10 p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          const res = await createPost({ kanaal, titel, body });
          if (res.ok) {
            setTitel("");
            setBody("");
          } else {
            setError(res.error);
          }
        });
      }}
    >
      <p className="text-xs uppercase tracking-wider font-medium text-koper-dark mb-3">
        Post een nieuw onderwerp
      </p>

      <div className="grid gap-3 sm:grid-cols-[220px_1fr]">
        <select
          value={kanaal}
          onChange={(e) => setKanaal(e.target.value)}
          className="h-11 px-3 rounded-xl bg-creme border border-hout/10 focus:border-koper outline-none text-sm"
        >
          {kanalen.map((k) => (
            <option key={k.slug} value={k.slug}>
              {k.naam}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={titel}
          onChange={(e) => setTitel(e.target.value)}
          placeholder="Titel — kort en duidelijk"
          maxLength={120}
          required
          className="h-11 px-4 rounded-xl bg-creme border border-hout/10 focus:border-koper outline-none text-sm"
        />
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Schrijf je verhaal, vraag of Proost-moment..."
        rows={4}
        maxLength={4000}
        required
        className="mt-3 w-full px-4 py-3 rounded-xl bg-creme border border-hout/10 focus:border-koper outline-none text-sm resize-y leading-relaxed"
      />

      {error && <p className="mt-2 text-sm text-rood">{error}</p>}

      <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-hout-soft">
          Warm, eerlijk, nooit oordelend. {body.length}/4000.
        </p>
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-5 py-2.5 font-medium text-sm hover:bg-koper-dark",
            pending && "opacity-70",
          )}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Plaats
        </button>
      </div>
    </form>
  );
}
