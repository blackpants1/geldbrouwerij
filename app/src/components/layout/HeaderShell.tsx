"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, UserCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/brouwproces", label: "Het Brouwproces" },
  { href: "/diensten", label: "Diensten" },
  { href: "/brouwketel", label: "De Brouwketel" },
  { href: "/tap", label: "De Tap" },
  { href: "/over", label: "Over" },
];

export function HeaderShell({ isAuthed }: { isAuthed: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-schuim/85 backdrop-blur-md border-b border-hout/5 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 ml-auto" aria-label="Hoofdnavigatie">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-hout-soft hover:text-bg-groen transition-colors link-koper whitespace-nowrap"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-hout/10">
          {isAuthed ? (
            <Link
              href="/platform"
              className="inline-flex items-center gap-2 rounded-full bg-bg-groen text-schuim h-9 px-4 text-sm font-medium hover:bg-bg-groen-dark"
            >
              <UserCircle className="h-4 w-4" />
              Mijn platform
            </Link>
          ) : (
            <>
              <Link
                href="/inloggen"
                className="text-sm font-medium text-bg-groen link-koper"
              >
                Inloggen
              </Link>
              <Button href="/brouwketel" size="sm" variant="primary">
                <span className="xl:hidden">Brouwketel</span>
                <span className="hidden xl:inline">Start de Brouwketel</span>
              </Button>
            </>
          )}
        </div>

        <button
          className="lg:hidden ml-auto inline-flex items-center justify-center h-11 w-11 rounded-full text-bg-groen hover:bg-creme"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-[64px] bottom-0 z-40 bg-schuim border-t border-hout/5 overflow-y-auto"
        >
          <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Mobiele navigatie">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block font-display text-2xl text-bg-groen py-3 border-b border-hout/5"
              >
                {n.label}
              </Link>
            ))}
            {isAuthed ? (
              <Button href="/platform" size="lg" className="mt-6">
                Naar Het Brouwplatform
              </Button>
            ) : (
              <>
                <Button href="/brouwketel" size="lg" className="mt-6">
                  Start de Brouwketel
                </Button>
                <Link
                  href="/inloggen"
                  className="mt-3 text-center text-sm font-medium text-bg-groen"
                >
                  Al een account? Inloggen
                </Link>
              </>
            )}
            <p className="mt-6 text-xs text-hout-soft/80">
              Gratis. 5 minuten. Direct je Brouw-score.
            </p>
          </nav>
        </div>
      )}
    </header>
  );
}
