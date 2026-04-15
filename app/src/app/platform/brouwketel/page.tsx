import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { readSession } from "@/lib/auth/session";
import { users, brouwketelRecords } from "@/lib/db/store";
import { Eyebrow } from "@/components/ui/Card";
import { cn } from "@/lib/cn";

export const metadata: Metadata = { title: "Brouwketel Pro", robots: { index: false } };

export default async function BrouwketelProPage() {
  const session = await readSession();
  const user = session ? await users.byId(session.uid) : null;
  if (!user) return null;

  const records = await brouwketelRecords.listForUser(user._id);
  const best = records.length
    ? records.reduce((a, b) => (a.score > b.score ? a : b))
    : null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Eyebrow>Brouwketel Pro</Eyebrow>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">
            Elk brouwsel is een peiling.
          </h1>
          <p className="mt-2 text-hout-soft max-w-xl">
            Ga niet wekelijks, maar wel regelmatig. Elke 4-8 weken een verse
            ronde en je ziet wat werkt.
          </p>
        </div>
        <Link
          href="/brouwketel"
          className="inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-5 py-2.5 font-medium hover:bg-koper-dark"
        >
          <Plus className="h-4 w-4" />
          Nieuw brouwsel
        </Link>
      </div>

      {records.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-creme p-8 sm:p-12 border border-hout/5 text-center">
          <p className="font-display text-2xl !text-bg-groen">
            Nog geen ingrediënten in de ketel.
          </p>
          <p className="mt-2 text-hout-soft">
            Je hebt nog geen Brouwketel gedaan. Begin met je eerste ronde.
          </p>
          <Link
            href="/brouwketel"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-koper text-schuim px-6 py-3 font-medium hover:bg-koper-dark"
          >
            Gooi je cijfers in de Brouwketel
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          {/* Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat label="Brouwsels" value={`${records.length}`} />
            <Stat
              label="Hoogste score"
              value={best ? `${best.score}/100` : "—"}
            />
            <Stat
              label="Huidige projectie"
              value={
                records[0]
                  ? `€${new Intl.NumberFormat("nl-NL").format(records[0].projectie30)}`
                  : "—"
              }
              subtitle="over 30 jaar"
            />
          </div>

          {/* Progression chart (simple bars) */}
          <div className="mt-8 rounded-2xl bg-creme border border-hout/5 p-5 sm:p-8">
            <p className="font-display text-xl !text-bg-groen mb-4">
              Je scorelijn
            </p>
            <div className="flex items-end gap-2 h-40">
              {[...records].reverse().map((r) => (
                <div key={r._id} className="flex-1 flex flex-col items-center">
                  <div
                    className={cn(
                      "w-full rounded-t-lg",
                      r.kleur === "rood" && "bg-rood/70",
                      r.kleur === "amber" && "bg-koper",
                      r.kleur === "groen" && "bg-groen-ok/90",
                    )}
                    style={{ height: `${Math.max(4, r.score)}%` }}
                    title={`${r.score}/100`}
                  />
                  <p className="mt-1 text-[10px] text-hout-soft">{r.score}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-hout-soft">
              Van oud naar nieuw (links → rechts).
            </p>
          </div>

          {/* Table */}
          <ul className="mt-6 space-y-3">
            {records.map((r) => (
              <li
                key={r._id}
                className="rounded-xl bg-schuim border border-hout/10 p-4 sm:p-5 flex items-center gap-4 flex-wrap"
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
                    Spaarquote {r.assen.spaarquote} · Vaste lasten{" "}
                    {r.assen.vasteLastenRatio} · Buffer {r.assen.bufferMaanden}
                  </p>
                </div>
                <p className="text-sm text-hout-soft">
                  €{new Intl.NumberFormat("nl-NL").format(r.projectie30)}
                  <span className="text-xs"> / 30 jr</span>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-2xl bg-creme border border-hout/5 p-5">
      <p className="text-xs uppercase tracking-wider text-koper-dark font-medium">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-bg-groen">{value}</p>
      {subtitle && <p className="text-xs text-hout-soft mt-1">{subtitle}</p>}
    </div>
  );
}
