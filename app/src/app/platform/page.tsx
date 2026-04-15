import type { Metadata } from "next";
import Link from "next/link";
import {
  Flame,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { readSession } from "@/lib/auth/session";
import { users, brouwketelRecords, cursusProgress } from "@/lib/db/store";
import { Eyebrow } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default async function PlatformDashboard() {
  const session = await readSession();
  const user = session ? await users.byId(session.uid) : null;
  if (!session || !user) return null;

  const records = await brouwketelRecords.listForUser(user._id);
  const latest = records[0];
  const previous = records[1];
  const progress = await cursusProgress.listForUser(user._id);

  const delta = previous ? latest?.score - previous.score : null;

  return (
    <div>
      <Eyebrow>Dashboard</Eyebrow>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl">
        Proost, {user.naam}.
      </h1>
      <p className="mt-3 text-hout-soft text-lg leading-relaxed">
        {latest
          ? "Hier is een momentopname van je brouwsel."
          : "Je staat op het punt te beginnen. Vul eerst de Brouwketel — daarna rollt de rest."}
      </p>

      {/* Top cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashCard
          title="Brouw-score"
          value={latest ? `${latest.score}` : "—"}
          unit={latest ? "/ 100" : ""}
          subtitle={
            latest
              ? latest.kleur === "rood"
                ? "Je vaten zijn leeg"
                : latest.kleur === "amber"
                  ? "Je ketel staat aan"
                  : "Mooi op weg"
              : "Vul de Brouwketel om te starten"
          }
          tone={
            !latest
              ? "neutral"
              : latest.kleur === "rood"
                ? "rood"
                : latest.kleur === "amber"
                  ? "amber"
                  : "groen"
          }
          href="/platform/brouwketel"
          icon={<Flame className="h-5 w-5" />}
          delta={delta}
        />
        <DashCard
          title="Het Brouwrecept"
          value={`${progress.length}`}
          unit="/ 7 modules"
          subtitle={
            progress.length === 7
              ? "Gebotteld — alle modules af"
              : progress.length === 0
                ? "Begin met Module 1"
                : `Verder met Module ${progress.length + 1}`
          }
          tone="koper"
          href="/platform/cursus"
          icon={<BookOpen className="h-5 w-5" />}
        />
        <DashCard
          title="Tapkamer"
          value="Open"
          unit=""
          subtitle="Post je eerste Proost-moment"
          tone="groen"
          href="/platform/tapkamer"
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      {/* Welkom / eerste stap */}
      {!latest && (
        <div className="mt-10 rounded-3xl bg-creme p-6 sm:p-10 border border-hout/5">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-koper-dark shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-2xl sm:text-3xl">
                Je eerste brouwsel.
              </h2>
              <p className="mt-2 text-hout leading-relaxed">
                Begin met de Brouwketel: vijf simpele vragen, en je hebt je
                startpunt. Daarna komt alles op zijn plek.
              </p>
              <Link
                href="/brouwketel"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-6 py-3 font-medium hover:bg-koper-dark"
              >
                Gooi je cijfers in de Brouwketel
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {latest && (
        <div className="mt-10">
          <h2 className="font-display text-2xl sm:text-3xl text-bg-groen">
            Je historie
          </h2>
          <p className="mt-1 text-hout-soft text-sm">
            Elk brouwsel is een peilmoment. Zie wat verandert.
          </p>
          <ul className="mt-5 space-y-3">
            {records.map((r) => (
              <li
                key={r._id}
                className="rounded-xl bg-creme border border-hout/5 p-4 flex items-center gap-4"
              >
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center font-display text-xl shrink-0",
                    r.kleur === "rood" && "bg-rood/10 text-rood",
                    r.kleur === "amber" && "bg-koper/15 text-koper-dark",
                    r.kleur === "groen" && "bg-groen-ok/10 text-groen-ok",
                  )}
                >
                  {r.score}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-hout">
                    {new Date(r.createdAt).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-hout-soft">
                    Projectie 30 jaar: €
                    {new Intl.NumberFormat("nl-NL").format(r.projectie30)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function DashCard({
  title,
  value,
  unit,
  subtitle,
  tone,
  href,
  icon,
  delta,
}: {
  title: string;
  value: string;
  unit?: string;
  subtitle: string;
  tone: "rood" | "amber" | "groen" | "koper" | "neutral";
  href: string;
  icon: React.ReactNode;
  delta?: number | null;
}) {
  const toneClasses = {
    rood: "bg-rood/10 text-rood border-rood/30",
    amber: "bg-koper/10 text-koper-dark border-koper/30",
    groen: "bg-bg-groen text-schuim border-bg-groen-dark",
    koper: "bg-koper text-schuim border-koper-dark",
    neutral: "bg-creme text-hout-soft border-hout/10",
  }[tone];

  return (
    <Link
      href={href}
      className={cn(
        "rounded-2xl p-5 border transition-shadow hover:shadow-[var(--shadow-lift)] group flex flex-col gap-3",
        toneClasses,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-medium opacity-80">
          {title}
        </span>
        <span className="opacity-70">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-semibold">{value}</span>
        {unit && <span className="text-sm opacity-70">{unit}</span>}
        {delta != null && delta !== 0 && (
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
              delta > 0 ? "bg-groen-ok/20 text-groen-ok" : "bg-rood/20 text-rood",
            )}
          >
            <TrendingUp
              className={cn("h-3 w-3", delta < 0 && "rotate-180")}
            />
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        )}
      </div>
      <p className="text-sm opacity-85">{subtitle}</p>
      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium opacity-80 group-hover:opacity-100">
        Openen <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}
