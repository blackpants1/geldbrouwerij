"use client";

import { useState, useTransition } from "react";
import { Check, CircleDashed, Loader2 } from "lucide-react";
import { toggleModule } from "@/app/actions/cursus";
import { cn } from "@/lib/cn";

export function ModuleToggle({
  moduleId,
  initialComplete,
}: {
  moduleId: string;
  initialComplete: boolean;
}) {
  const [complete, setComplete] = useState(initialComplete);
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        const next = !complete;
        setComplete(next);
        startTransition(async () => {
          await toggleModule(moduleId, next);
        });
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        complete
          ? "bg-groen-ok text-schuim hover:bg-groen-ok/90"
          : "bg-creme text-hout border border-hout/10 hover:border-bg-groen/40",
      )}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : complete ? (
        <Check className="h-4 w-4" />
      ) : (
        <CircleDashed className="h-4 w-4" />
      )}
      {complete ? "Gebotteld" : "Markeer af"}
    </button>
  );
}
