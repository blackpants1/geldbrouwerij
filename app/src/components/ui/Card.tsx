import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  tone = "schuim",
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  tone?: "schuim" | "creme" | "groen";
  as?: "div" | "article" | "li";
}) {
  return (
    <As
      className={cn(
        "rounded-[--radius-lg] p-6 sm:p-8 shadow-[var(--shadow-soft)] transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]",
        tone === "schuim" && "bg-schuim border border-hout/5",
        tone === "creme" && "bg-creme border border-hout/5",
        tone === "groen" && "bg-bg-groen text-schuim border border-bg-groen-dark",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function Badge({
  children,
  tone = "koper",
  className,
}: {
  children: React.ReactNode;
  tone?: "koper" | "groen" | "hop" | "creme";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        tone === "koper" && "bg-koper/15 text-koper-dark",
        tone === "groen" && "bg-bg-groen/10 text-bg-groen",
        tone === "hop" && "bg-hop/20 text-hout",
        tone === "creme" && "bg-creme text-hout-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-koper-dark",
        className,
      )}
    >
      {children}
    </p>
  );
}
