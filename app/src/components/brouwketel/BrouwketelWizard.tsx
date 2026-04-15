"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowRight, ArrowLeft, Beer, CheckCircle2 } from "lucide-react";
import { CurrencyInput } from "./CurrencyInput";
import { Button } from "@/components/ui/Button";
import { BrouwketelResultView } from "./BrouwketelResult";
import { submitBrouwketel } from "@/app/actions/leads";
import { berekenBrouwketel } from "@/lib/brouwketel/score";
import type {
  BrouwketelInput,
  BrouwketelResult,
  Gezin,
} from "@/lib/brouwketel/types";
import { cn } from "@/lib/cn";

const TOTAL_STEPS = 5;

const defaultInput: BrouwketelInput = {
  netInkomenMaand: 0,
  gezin: "alleen",
  vasteLastenMaand: 0,
  levenMaand: 0,
  huidigSpaargeldTotal: 0,
  maandelijksSparen: 0,
  schuldenTotal: 0,
};

export function BrouwketelWizard() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<BrouwketelInput>(defaultInput);
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<BrouwketelResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Live preview score (client-side) zodra er genoeg data is
  const preview = useMemo(() => {
    if (step < 5) return null;
    if (input.netInkomenMaand <= 0) return null;
    return berekenBrouwketel(input);
  }, [input, step]);

  const set = (patch: Partial<BrouwketelInput>) =>
    setInput((prev) => ({ ...prev, ...patch }));

  if (result) {
    return <BrouwketelResultView result={result} naam={naam} email={email} />;
  }

  const canContinue = (() => {
    switch (step) {
      case 1:
        return input.netInkomenMaand > 0;
      case 2:
        return input.vasteLastenMaand >= 0;
      case 3:
        return input.levenMaand >= 0;
      case 4:
        return input.huidigSpaargeldTotal >= 0 && input.schuldenTotal >= 0;
      case 5:
        return naam.trim().length >= 2 && /\S+@\S+\.\S+/.test(email) && consent;
      default:
        return false;
    }
  })();

  const next = () => {
    if (!canContinue) return;
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }
    setError(null);
    startTransition(async () => {
      const res = await submitBrouwketel({ email, naam, input });
      if (res.ok) setResult(res.result);
      else setError(res.error);
    });
  };

  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ProgressBar step={step} total={TOTAL_STEPS} />

      <div className="mt-6 sm:mt-8 bg-schuim rounded-[var(--radius-lg)] p-6 sm:p-8 shadow-[var(--shadow-lift)] border border-hout/5">
        {step === 1 && (
          <StepShell
            nr={1}
            titel="De Ingrediënten — jouw inkomen"
            intro="Zonder ingrediënten geen bier. Vertel kort hoeveel er binnenkomt."
          >
            <CurrencyInput
              label="Netto huishoudinkomen per maand"
              hint="Alles wat je samen (jij + partner) netto overhoudt per maand."
              value={input.netInkomenMaand}
              onChange={(v) => set({ netInkomenMaand: v })}
              required
              step={50}
              max={25000}
            />
            <fieldset className="mt-5">
              <legend className="text-sm font-medium text-hout mb-2">
                Gezinssituatie
              </legend>
              <div className="flex flex-wrap gap-2">
                {([
                  ["alleen", "Alleenstaand"],
                  ["partner", "Met partner"],
                  ["gezin", "Gezin met kind(eren)"],
                ] as const).map(([k, l]) => (
                  <button
                    type="button"
                    key={k}
                    onClick={() => set({ gezin: k as Gezin })}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm border transition-colors",
                      input.gezin === k
                        ? "bg-bg-groen text-schuim border-bg-groen"
                        : "bg-schuim text-hout border-hout/10 hover:border-bg-groen/40",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>
          </StepShell>
        )}

        {step === 2 && (
          <StepShell
            nr={2}
            titel="De Vaten — vaste lasten"
            intro="Alles wat elke maand automatisch afgaat: huur of hypotheek, energie, verzekeringen, abonnementen, vervoer."
          >
            <CurrencyInput
              label="Totaal vaste lasten per maand"
              hint="Grove inschatting is prima — je mag later verfijnen."
              value={input.vasteLastenMaand}
              onChange={(v) => set({ vasteLastenMaand: v })}
              required
              step={25}
              max={15000}
            />
          </StepShell>
        )}

        {step === 3 && (
          <StepShell
            nr={3}
            titel="Het Leven — dagelijks"
            intro="Boodschappen, uit eten, hobby's, kleding, uitjes. Alles wat niet automatisch is maar wél elke maand uitgaat."
          >
            <CurrencyInput
              label="Leefkosten per maand"
              hint="Denk aan €250 p.p. boodschappen + alle 'losse' euro's."
              value={input.levenMaand}
              onChange={(v) => set({ levenMaand: v })}
              required
              step={25}
              max={10000}
            />
          </StepShell>
        )}

        {step === 4 && (
          <StepShell
            nr={4}
            titel="Het Vat — sparen & schulden"
            intro="Wat staat er nu, wat gaat er automatisch weg, en wat moet er nog gebotteld?"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <CurrencyInput
                label="Huidig spaargeld (totaal)"
                value={input.huidigSpaargeldTotal}
                onChange={(v) => set({ huidigSpaargeldTotal: v })}
                step={100}
                max={1000000}
              />
              <CurrencyInput
                label="Automatisch sparen per maand"
                hint="€0 mag. Dat is juist waardevol om te weten."
                value={input.maandelijksSparen}
                onChange={(v) => set({ maandelijksSparen: v })}
                step={10}
                max={5000}
              />
            </div>
            <CurrencyInput
              className="mt-5"
              label="Schulden (excl. hypotheek)"
              hint="Rood staan, creditcard, persoonlijke lening, DUO, BNPL."
              value={input.schuldenTotal}
              onChange={(v) => set({ schuldenTotal: v })}
              step={100}
              max={500000}
            />
          </StepShell>
        )}

        {step === 5 && (
          <StepShell
            nr={5}
            titel="Waarheen stuur ik je resultaat?"
            intro="Ik stuur je Brouw-score, je geldstroom en drie concrete acties. Eén mail. Daarna nooit spam."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hout" htmlFor="bk-naam">
                  Voornaam<span className="text-koper">*</span>
                </label>
                <input
                  id="bk-naam"
                  type="text"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  autoComplete="given-name"
                  placeholder="Bijv. Sanne"
                  className="h-12 px-4 rounded-xl bg-schuim border border-hout/10 focus:border-koper outline-none transition-colors text-base"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-hout" htmlFor="bk-email">
                  E-mail<span className="text-koper">*</span>
                </label>
                <input
                  id="bk-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="jij@voorbeeld.nl"
                  className="h-12 px-4 rounded-xl bg-schuim border border-hout/10 focus:border-koper outline-none transition-colors text-base"
                />
              </div>
            </div>

            {preview && (
              <div className="mt-6 rounded-xl bg-creme p-4 flex items-start gap-3">
                <Beer className="h-5 w-5 text-koper-dark shrink-0 mt-0.5" />
                <p className="text-sm text-hout leading-relaxed">
                  Sneak-peek: je voorlopige Brouw-score is{" "}
                  <strong className="font-display text-lg text-bg-groen">
                    {preview.score}/100
                  </strong>
                  . Druk op de knop voor het volledige resultaat.
                </p>
              </div>
            )}

            <label className="mt-5 flex items-start gap-3 text-sm text-hout-soft cursor-pointer select-none">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-koper"
              />
              <span>
                Oké: stuur me mijn Brouw-score + Het Brouwboek (één mail per week, altijd
                aftappen).
              </span>
            </label>

            {error && (
              <p role="alert" className="mt-3 text-sm text-rood">
                {error}
              </p>
            )}
          </StepShell>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 text-sm text-hout-soft hover:text-bg-groen disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug
          </button>

          <Button
            onClick={next}
            disabled={!canContinue || pending}
            size="lg"
            className={cn(!canContinue && "opacity-60 cursor-not-allowed")}
          >
            {pending ? (
              "Brouwen…"
            ) : step === TOTAL_STEPS ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Toon mijn Brouw-score
              </>
            ) : (
              <>
                Volgende
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-hout-soft/80 px-4">
        De Brouwketel rekent in je browser. Alleen je naam, e-mail en resultaat
        worden opgeslagen — geen IBAN, geen wachtwoord, geen gekke dingen.
      </p>
    </div>
  );
}

function StepShell({
  nr,
  titel,
  intro,
  children,
}: {
  nr: number;
  titel: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] font-medium text-koper-dark">
        Stap {nr} van {TOTAL_STEPS}
      </p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl text-bg-groen">
        {titel}
      </h2>
      <p className="mt-2 text-hout-soft leading-relaxed">{intro}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Stap ${step} van ${total}`}>
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors",
            i <= step ? "bg-koper" : "bg-hout/10",
          )}
        />
      ))}
    </div>
  );
}
