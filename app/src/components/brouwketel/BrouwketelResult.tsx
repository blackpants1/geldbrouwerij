"use client";

import Link from "next/link";
import { Beer, TrendingUp, AlertTriangle, Download } from "lucide-react";
import type { BrouwketelResult } from "@/lib/brouwketel/types";
import { cn } from "@/lib/cn";

export function BrouwketelResultView({
  result,
  naam,
}: {
  result: BrouwketelResult;
  naam: string;
  email: string;
}) {
  const { score, kleur, acties, potjes, projectie, assen } = result;
  const kleurBg =
    kleur === "rood"
      ? "bg-rood/10 text-rood border-rood/30"
      : kleur === "amber"
        ? "bg-koper/10 text-koper-dark border-koper/30"
        : "bg-groen-ok/10 text-groen-ok border-groen-ok/30";

  const kleurLabel =
    kleur === "rood"
      ? "Je vaten zijn leeg"
      : kleur === "amber"
        ? "Je ketel staat aan"
        : "Mooi op weg — laat het rijpen";

  const totaalInkomen =
    potjes.benchmark.vasteLasten + potjes.benchmark.leven + potjes.benchmark.brouwen;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-medium text-koper-dark">
          Je resultaat
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-5xl text-bg-groen">
          Proost{naam && `, ${naam}`}.
        </h1>
        <p className="mt-3 text-hout-soft max-w-xl mx-auto">
          De Brouwketel heeft je cijfers geproefd. Dit is waar je staat —
          zonder oordeel, wel eerlijk.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
        <div
          className={cn(
            "rounded-3xl border-2 aspect-square sm:w-64 flex flex-col items-center justify-center p-6",
            kleurBg,
          )}
        >
          <Beer className="h-6 w-6 mb-2 opacity-70" />
          <span className="font-display text-6xl sm:text-7xl leading-none font-semibold">
            {score}
          </span>
          <span className="text-sm mt-1 opacity-80">van de 100</span>
        </div>
        <div>
          <p className="font-display text-2xl sm:text-3xl text-bg-groen">
            {kleurLabel}.
          </p>
          <p className="mt-3 text-hout leading-relaxed">
            {kleur === "rood" &&
              "Geen paniek. De meeste mensen starten hier. Je hebt nu een helder startpunt en drie concrete stappen."}
            {kleur === "amber" &&
              "Je bent aan het brouwen. Er zijn duidelijke kansen — en ze liggen binnen handbereik."}
            {kleur === "groen" &&
              "Je systeem staat. De winst zit nu in geduld: laten rijpen en de Schuimkraag-check."}
          </p>
        </div>
      </div>

      {/* Assen-overzicht */}
      <div className="mt-12">
        <h2 className="font-display text-2xl sm:text-3xl text-bg-groen mb-5">
          Waar sta je op elke as?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <AsBar label="Spaarquote" value={assen.spaarquote} weight="40%" />
          <AsBar label="Vaste-lasten-ratio" value={assen.vasteLastenRatio} weight="20%" />
          <AsBar label="Buffer in maanden" value={assen.bufferMaanden} weight="20%" />
          <AsBar label="Schulden-ratio" value={assen.schuldenRatio} weight="10%" />
          <AsBar label="Automatisering" value={assen.automatisering} weight="10%" />
        </div>
      </div>

      {/* Potjes */}
      <div className="mt-12">
        <h2 className="font-display text-2xl sm:text-3xl text-bg-groen mb-2">
          Je potjes — waar gaat je geld heen?
        </h2>
        <p className="text-hout-soft mb-5">
          Benchmark: 50% vaste lasten, 30% leven, 20% brouwen.
        </p>
        <div className="rounded-2xl overflow-hidden border border-hout/10 bg-schuim">
          <PotRow
            naam="Vaste Lasten"
            actueel={potjes.actueel.vasteLasten}
            benchmark={potjes.benchmark.vasteLasten}
            totaal={totaalInkomen}
            kleur="bg-bg-groen"
          />
          <PotRow
            naam="Leven"
            actueel={potjes.actueel.leven}
            benchmark={potjes.benchmark.leven}
            totaal={totaalInkomen}
            kleur="bg-koper"
          />
          <PotRow
            naam="Brouwen"
            actueel={potjes.actueel.brouwen}
            benchmark={potjes.benchmark.brouwen}
            totaal={totaalInkomen}
            kleur="bg-hop"
          />
        </div>
      </div>

      {/* Projectie */}
      <div className="mt-12 rounded-2xl bg-bg-groen text-schuim p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-6 w-6 text-hop shrink-0 mt-1" />
          <div>
            <h2 className="!text-schuim font-display text-2xl sm:text-3xl">
              En als je dit laat rijpen?
            </h2>
            <p className="mt-2 text-schuim/85 leading-relaxed">
              Op je huidige tempo, met een realistisch reëel rendement van 6%.
              Compound interest is je stille medewerker.
            </p>
          </div>
        </div>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <Milestone label="Over 10 jaar" value={projectie.jaren10} />
          <Milestone label="Over 20 jaar" value={projectie.jaren20} />
          <Milestone label="Over 30 jaar" value={projectie.jaren30} highlight />
        </div>
      </div>

      {/* Acties */}
      <div className="mt-12">
        <h2 className="font-display text-2xl sm:text-3xl text-bg-groen">
          Drie dingen die ik je meegeef
        </h2>
        <p className="mt-2 text-hout-soft">
          Op maat op basis van je zwakste assen. Doe er één deze week.
        </p>
        <ol className="mt-5 space-y-4">
          {acties.map((a, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-2xl bg-creme p-5 border border-hout/5"
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-koper text-schuim flex items-center justify-center font-display text-lg">
                {i + 1}
              </div>
              <p className="text-hout leading-relaxed">{a}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* CTA kaart */}
      <div className="mt-14 rounded-3xl bg-creme p-6 sm:p-10 border border-hout/5 text-center">
        <p className="text-xs uppercase tracking-[0.18em] font-medium text-koper-dark">
          Volgende stap
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-bg-groen">
          Zet je systeem in één avond op.
        </h2>
        <p className="mt-3 text-hout-soft max-w-xl mx-auto">
          De Brouwavond: €29, online, 2 uur, tussen 8-15 Brouwmaatjes. We lopen
          samen door stap 2 en 3 van Het Brouwproces. Je gaat naar huis met een
          plan.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/brouwavond"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-koper text-schuim px-6 font-medium hover:bg-koper-dark"
          >
            Reserveer je kruk
          </Link>
          <Link
            href="/diensten#platform"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-bg-groen text-bg-groen px-6 font-medium hover:bg-schuim"
          >
            Probeer het platform voor €1
          </Link>
        </div>
        <p className="mt-5 text-xs text-hout-soft/80">
          Je Brouw-score is ook in je mail beland. Check je inbox (of spam-vat).
        </p>
      </div>

      {/* disclaimer */}
      <div className="mt-10 rounded-xl bg-schuim border border-hout/10 p-5 flex gap-3 text-sm text-hout-soft">
        <AlertTriangle className="h-5 w-5 text-koper-dark shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Dit is coaching en educatie — <strong>geen financieel advies</strong>.
          De Geldbrouwerij staat niet onder AFM-toezicht. Raadpleeg voor
          specifieke beslissingen een gekwalificeerd adviseur.
        </p>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/brouwketel"
          className="inline-flex items-center gap-2 text-sm text-hout-soft hover:text-bg-groen"
          data-testid="brouwketel-restart"
        >
          <Download className="h-4 w-4" />
          Brouw een andere variant
        </Link>
      </div>

      <meta data-testid="brouwketel-done" data-score={score} />
    </div>
  );
}

function AsBar({
  label,
  value,
  weight,
}: {
  label: string;
  value: number;
  weight: string;
}) {
  const kleur =
    value < 40 ? "bg-rood" : value < 70 ? "bg-koper" : "bg-groen-ok";
  return (
    <div className="rounded-xl bg-creme p-4 border border-hout/5">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-hout">{label}</span>
        <span className="text-hout-soft text-xs">weging {weight}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-schuim overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", kleur)}
          style={{ width: `${Math.max(4, value)}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-hout-soft">{value}/100</p>
    </div>
  );
}

function PotRow({
  naam,
  actueel,
  benchmark,
  totaal,
  kleur,
}: {
  naam: string;
  actueel: number;
  benchmark: number;
  totaal: number;
  kleur: string;
}) {
  const widthActueel = Math.min(100, totaal > 0 ? (actueel / totaal) * 100 : 0);
  const widthBench = Math.min(100, totaal > 0 ? (benchmark / totaal) * 100 : 0);
  const delta = actueel - benchmark;
  return (
    <div className="p-4 sm:p-5 border-b border-hout/5 last:border-0">
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="font-medium text-hout">{naam}</span>
        <span className="text-hout-soft">
          {formatEUR(actueel)} <span className="opacity-60">/ {formatEUR(benchmark)}</span>
          {delta !== 0 && (
            <span className={cn("ml-2", delta > 0 ? "text-rood" : "text-groen-ok")}>
              ({delta > 0 ? "+" : ""}
              {formatEUR(delta)})
            </span>
          )}
        </span>
      </div>
      <div className="relative h-3 rounded-full bg-creme overflow-hidden">
        <div
          className={cn("absolute inset-y-0 left-0 rounded-full opacity-50", kleur)}
          style={{ width: `${widthBench}%` }}
          aria-hidden
        />
        <div
          className={cn("absolute inset-y-0 left-0 rounded-full", kleur)}
          style={{ width: `${widthActueel}%` }}
        />
      </div>
    </div>
  );
}

function Milestone({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        highlight ? "bg-koper text-schuim" : "bg-bg-groen-dark",
      )}
    >
      <p className={cn("text-xs uppercase tracking-wider", highlight ? "text-schuim/80" : "text-schuim/60")}>
        {label}
      </p>
      <p className="font-display text-3xl sm:text-4xl font-semibold mt-1">
        {formatEUR(value)}
      </p>
    </div>
  );
}

function formatEUR(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000)
    return `${sign}€${(abs / 1_000_000).toFixed(1).replace(".0", "")}M`;
  if (abs >= 10_000)
    return `${sign}€${(abs / 1000).toFixed(0)}K`;
  return `${sign}€${new Intl.NumberFormat("nl-NL").format(Math.round(abs))}`;
}
