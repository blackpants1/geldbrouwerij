"use client";

import { useState, useTransition } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toggleLike } from "@/app/actions/tapkamer";
import { cn } from "@/lib/cn";

export function LikeButton({
  postId,
  initialLiked,
  initialCount,
}: {
  postId: string;
  initialLiked: boolean;
  initialCount: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const next = !liked;
        setLiked(next);
        setCount((c) => c + (next ? 1 : -1));
        startTransition(async () => {
          await toggleLike(postId);
        });
      }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm border transition-colors",
        liked
          ? "bg-koper/10 text-koper-dark border-koper/30"
          : "bg-creme text-hout-soft border-hout/10 hover:border-koper/40",
      )}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={cn("h-4 w-4", liked && "fill-current")} />
      )}
      {count}
    </button>
  );
}
