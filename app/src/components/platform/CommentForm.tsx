"use client";

import { useState, useTransition } from "react";
import { Loader2, Send } from "lucide-react";
import { addComment } from "@/app/actions/tapkamer";
import { cn } from "@/lib/cn";

export function CommentForm({ postId }: { postId: string }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setError(null);
        startTransition(async () => {
          const res = await addComment({ postId, body });
          if (res.ok) setBody("");
          else setError(res.error);
        });
      }}
      className="mt-4"
    >
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Reageer met warmte. Geen oordeel, wel eerlijk."
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-schuim border border-hout/10 focus:border-koper outline-none text-sm resize-y leading-relaxed"
      />
      {error && <p className="mt-2 text-sm text-rood">{error}</p>}
      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={pending || body.trim().length < 2}
          className={cn(
            "inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-5 py-2 font-medium text-sm hover:bg-koper-dark",
            (pending || body.trim().length < 2) && "opacity-60",
          )}
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Plaats reactie
        </button>
      </div>
    </form>
  );
}
