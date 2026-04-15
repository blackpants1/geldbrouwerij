import type { Metadata } from "next";
import { Clock, PlayCircle, Lock } from "lucide-react";
import { readSession } from "@/lib/auth/session";
import { cursusProgress } from "@/lib/db/store";
import { modules } from "@/content/cursus";
import { Eyebrow } from "@/components/ui/Card";
import { ModuleToggle } from "@/components/platform/ModuleToggle";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Het Brouwrecept", robots: { index: false } };

export default async function CursusPage() {
  const session = await readSession();
  if (!session) return null;

  const progress = await cursusProgress.listForUser(session.uid);
  const doneIds = new Set(progress.map((p) => p.moduleId));

  const total = modules.length;
  const done = progress.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div>
      <Eyebrow>Het Brouwrecept</Eyebrow>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">
        De cursus in 7 modules.
      </h1>
      <p className="mt-2 text-hout-soft max-w-xl">
        Nuchter, bruikbaar, één module per week als je wilt. Bekijk in je eigen
        tempo, markeer af als je klaar bent.
      </p>

      {/* Progress banner */}
      <div className="mt-8 rounded-3xl bg-bg-groen text-schuim p-6 sm:p-8 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-wider text-hop font-medium">
              Voortgang
            </p>
            <p className="mt-1 font-display text-3xl sm:text-4xl text-schuim">
              {done} / {total}
            </p>
            <p className="text-schuim/70 text-sm mt-1">
              {done === total
                ? "Gebotteld. Proost."
                : done === 0
                  ? "Begin met Module 1 — De Proeverij."
                  : `Nog ${total - done} modules te gaan.`}
            </p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="h-3 w-full rounded-full bg-schuim/10 overflow-hidden">
              <div
                className="h-full bg-hop rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-schuim/70 mt-2">{pct}%</p>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mt-8 space-y-4">
        {modules.map((m) => {
          const isDone = doneIds.has(m.id);
          // Eerste module altijd open; daarna pas als vorige af is (optioneel gating)
          const locked = false; // we houden alles open voor de MVP
          return (
            <article
              key={m.id}
              className={cn(
                "rounded-2xl border p-5 sm:p-6 transition-colors",
                isDone
                  ? "bg-groen-ok/5 border-groen-ok/30"
                  : "bg-creme border-hout/5",
              )}
            >
              <div className="flex items-start gap-4 flex-wrap">
                <div
                  className={cn(
                    "h-12 w-12 rounded-full flex items-center justify-center font-display text-xl shrink-0",
                    isDone
                      ? "bg-groen-ok text-schuim"
                      : "bg-bg-groen text-schuim",
                  )}
                >
                  {m.nummer}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-xl !text-bg-groen">
                      {m.titel}
                    </h2>
                    <span className="inline-flex items-center gap-1 text-xs text-hout-soft">
                      <Clock className="h-3 w-3" />
                      {m.duur}
                    </span>
                  </div>
                  <p className="mt-1 text-hout-soft text-sm">{m.subtitel}</p>
                </div>
                {!locked && (
                  <ModuleToggle moduleId={m.id} initialComplete={isDone} />
                )}
                {locked && (
                  <span className="inline-flex items-center gap-1 text-xs text-hout-soft">
                    <Lock className="h-3 w-3" />
                    Nog op slot
                  </span>
                )}
              </div>

              <ul className="mt-5 divide-y divide-hout/5">
                {m.lessen.map((l) => (
                  <li
                    key={l.id}
                    className="py-2.5 flex items-center gap-3 text-sm"
                  >
                    <PlayCircle className="h-4 w-4 text-koper shrink-0" />
                    <span className="text-hout flex-1">{l.titel}</span>
                    <span className="text-xs text-hout-soft">{l.duur}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-xl bg-schuim border border-hout/5 p-4 text-sm text-hout-soft">
                <p className="italic">
                  Video&apos;s worden in Fase 2 toegevoegd via Mux. Voor nu zie je
                  het leerpad met lessen + duur, en kun je de module afmarkeren
                  als je de basis in de Brouwketel hebt toegepast.
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
