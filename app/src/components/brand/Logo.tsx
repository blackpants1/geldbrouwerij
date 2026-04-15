import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Het woordmerk — Fraunces serif met een koperen hop-accent.
 * Schaalt via `scale` prop (1 = standaard).
 */
export function Logo({
  className,
  tone = "groen",
  withTagline = false,
  href = "/",
}: {
  className?: string;
  tone?: "groen" | "schuim";
  withTagline?: boolean;
  href?: string | null;
}) {
  const content = (
    <span
      className={cn(
        "inline-flex items-baseline gap-1 font-display leading-none tracking-tight",
        tone === "groen" ? "text-bg-groen" : "text-schuim",
      )}
    >
      <span className="text-2xl sm:text-[1.7rem] font-medium">De</span>
      <span className="text-3xl sm:text-4xl font-semibold">Geldbrouwerij</span>
      <HopMark className="ml-1 h-4 w-4 sm:h-5 sm:w-5 text-koper" />
    </span>
  );

  const body = (
    <span className="inline-flex flex-col gap-1">
      {content}
      {withTagline && (
        <span
          className={cn(
            "text-xs sm:text-sm font-sans tracking-wide",
            tone === "groen" ? "text-hout-soft" : "text-schuim/80",
          )}
        >
          Brouw aan je financiële vrijheid
        </span>
      )}
    </span>
  );

  if (!href) return <span className={className}>{body}</span>;
  return (
    <Link
      href={href}
      aria-label="De Geldbrouwerij — home"
      className={cn("inline-block", className)}
    >
      {body}
    </Link>
  );
}

function HopMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {/* Simple stylised hop cone */}
      <path d="M12 2c2.5 2 3.5 4 3.5 6.5 0 1.3-.6 2-1.5 2.5 1.2.6 2 1.7 2 3.2 0 1.4-.8 2.4-2 2.9 1 .6 1.7 1.6 1.7 3 0 2-1.5 3.4-3.7 3.9-2.2-.5-3.7-1.9-3.7-3.9 0-1.4.7-2.4 1.7-3-1.2-.5-2-1.5-2-2.9 0-1.5.8-2.6 2-3.2-.9-.5-1.5-1.2-1.5-2.5C8.5 6 9.5 4 12 2z" />
    </svg>
  );
}
