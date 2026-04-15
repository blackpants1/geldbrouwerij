"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Flame,
  BookOpen,
  Users,
  UserCircle,
  LogOut,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/platform", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/platform/brouwketel", label: "Brouwketel Pro", icon: Flame },
  { href: "/platform/cursus", label: "Het Brouwrecept", icon: BookOpen },
  { href: "/platform/tapkamer", label: "De Tapkamer", icon: Users },
  { href: "/platform/account", label: "Account", icon: UserCircle },
];

export function PlatformNav({
  naam,
  email,
  initial,
}: {
  naam: string;
  email: string;
  initial: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-creme border border-hout/5">
        <div className="h-10 w-10 rounded-full bg-koper text-schuim flex items-center justify-center font-display text-lg shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-bg-groen truncate">{naam}</p>
          <p className="text-xs text-hout-soft truncate">{email}</p>
        </div>
      </div>

      <nav
        className="mt-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible -mx-1 px-1"
        aria-label="Platform"
      >
        {nav.map((n) => {
          const active = n.exact
            ? pathname === n.href
            : pathname.startsWith(n.href);
          const Icon = n.icon;
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap",
                active ? "bg-bg-groen text-schuim" : "text-hout hover:bg-creme",
              )}
            >
              <Icon className="h-4 w-4" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4">
        <SignOutButton redirectUrl="/">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-hout-soft hover:text-rood border border-hout/10 hover:border-rood/30 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Uitloggen
          </button>
        </SignOutButton>
      </div>
    </aside>
  );
}
