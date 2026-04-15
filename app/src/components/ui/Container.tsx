import * as React from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  as: As = "section",
  tone = "default",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "article";
  tone?: "default" | "creme" | "groen" | "schuim";
  id?: string;
}) {
  return (
    <As
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-28",
        tone === "creme" && "bg-creme",
        tone === "groen" && "bg-bg-groen text-schuim",
        tone === "schuim" && "bg-schuim",
        className,
      )}
    >
      {children}
    </As>
  );
}
