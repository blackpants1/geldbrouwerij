import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BrouwketelCta } from "@/components/sections/BrouwketelCta";

export const metadata: Metadata = {
  title: "Het Brouwproces™ — vijf stappen van chaos naar rust",
  description:
    "De eigen methode van De Geldbrouwerij. Vijf stappen: De Proeverij, Het Recept, De Automatische Brouwerij, De Rijping — plus de doorlopende Schuimkraag-check.",
  alternates: { canonical: "/brouwproces" },
};

const stappen = [
  {
    nr: "1",
    naam: "De Proeverij",
    kop: "Proef waar je staat.",
    regel:
      "Zonder helder startpunt geen recept. We kijken eerlijk — wat komt binnen, wat gaat eruit, wat blijft over. Geen oordeel, wel feiten.",
    principes: ["Bewustwording (Housel)", "Confrontatie met feiten (Stanley)"],
    doen: [
      "De Brouwketel invullen (je financiële röntgenfoto)",
      "Je geldlekken in kaart",
      "Je nettovermogen berekenen",
      "De vraag: ‘wat deed geld met jou thuis?’",
    ],
    resultaat: "Je kent je startpunt. Zonder ego, mét perspectief.",
  },
  {
    nr: "2",
    naam: "Het Recept",
    kop: "Verdeel vooraf, niet achteraf.",
    regel:
      "Budgetten falen omdat ze wilskracht vragen. Een recept werkt: je zet vooraf vast hoeveel in welk potje gaat. Drie potjes: Vaste Lasten · Leven · Brouwen.",
    principes: ["Potjessysteem (Maes)", "Betaal jezelf eerst (Sethi)"],
    doen: [
      "Drie potjes instellen (50 / 30 / 20 als startpunt)",
      "Spaarladder bepalen: noodfonds → spaardoelen → vermogen",
      "Schuldenplan als dat nodig is",
    ],
    resultaat: "Je weet vooraf waar je geld heen gaat. Geen verrassingen meer.",
  },
  {
    nr: "3",
    naam: "De Automatische Brouwerij",
    kop: "Stel het in. Vergeet het.",
    regel:
      "Goed gedrag mag geen wilskracht kosten. Op de dag na salaris rolt je systeem. Wat op je leefrekening staat mag op — zonder schuldgevoel.",
    principes: ["Automatisering (Sethi)"],
    doen: [
      "Je bankrekeningen inrichten",
      "Automatische overschrijvingen zetten",
      "Maandelijkse 10-minuten check-in",
      "Jaarlijkse besparings-reminders",
    ],
    resultaat: "Je systeem draait. Jij doet de rest van je leven.",
  },
  {
    nr: "4",
    naam: "De Rijping",
    kop: "Laat de tijd het werk doen.",
    regel:
      "Goed vermogen heeft tijd nodig. Compound interest is je stille medewerker — €150 per maand over 30 jaar wordt meer dan €150.000.",
    principes: ["Leef onder je stand (Stanley)", "Compound interest"],
    doen: [
      "De basis van beleggen snappen (indexfondsen, risico, tijd)",
      "Een beleggingsplan opzetten als je dat wilt",
      "Je pensioengat berekenen en dichten",
      "Laten rijpen — niet elke dag checken",
    ],
    resultaat: "Je vermogen groeit op de achtergrond terwijl jij leeft.",
  },
  {
    nr: "∞",
    naam: "De Schuimkraag-check",
    kop: "Doorlopend: herken verleidingen.",
    regel:
      "De Schuimkraag is het leuke, niet-essentiële deel. Mag best — zolang je je triggers kent. Impulsaankopen, influencers, BNPL, en AI-scams.",
    principes: ["Systeem 1 vs 2 (Kahneman)", "Bewust consumeren"],
    doen: [
      "De ‘slaap er een nacht over’-regel",
      "Reclame en influencers herkennen",
      "AI-scams en deepfakes doorzien",
      "Je Schuimkraag-budget: vast bedrag voor leuk",
      "Het familiegesprek — De Kleine Brouwer",
    ],
    resultaat: "Je koopt bewust, herkent trucs, geniet zonder schuldgevoel.",
  },
];

export default function BrouwprocesPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20">
        <Container size="narrow">
          <Eyebrow>Het Brouwproces™</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
            Vijf stappen van chaos naar rust.
          </h1>
          <p className="mt-5 text-hout-soft text-lg leading-relaxed">
            De meeste mensen proberen hun geld bij te houden achteraf. Dat werkt
            niet — net zomin als je goed bier brouwt door achteraf te kijken wat
            er in de ketel zat. Het Brouwproces draait het om: je beslist vooraf,
            je automatiseert, en dan laat je de tijd het werk doen.
          </p>
        </Container>
      </Section>

      <Section tone="schuim">
        <Container>
          <ol className="space-y-6">
            {stappen.map((s) => (
              <li
                key={s.nr}
                className="grid gap-6 lg:grid-cols-[auto_1fr] rounded-3xl bg-creme p-6 sm:p-10 border border-hout/5"
              >
                <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-2">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bg-groen text-schuim font-display text-2xl shrink-0">
                    {s.nr}
                  </span>
                  <p className="font-display text-xl text-bg-groen lg:mt-2">
                    {s.naam}
                  </p>
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl !text-bg-groen">
                    {s.kop}
                  </h2>
                  <p className="mt-3 text-hout leading-relaxed">{s.regel}</p>

                  <div className="mt-5 grid sm:grid-cols-[1fr_1fr] gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-koper-dark font-medium mb-2">
                        Wat je doet
                      </p>
                      <ul className="space-y-1.5 text-sm text-hout">
                        {s.doen.map((d) => (
                          <li key={d} className="flex gap-2">
                            <span className="text-koper mt-1.5 h-1.5 w-1.5 rounded-full bg-koper shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-koper-dark font-medium mb-2">
                        Principes
                      </p>
                      <ul className="space-y-1.5 text-sm text-hout-soft italic">
                        {s.principes.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="mt-5 rounded-xl bg-schuim p-4 text-sm text-hout-soft border border-hout/5">
                    <strong className="text-bg-groen">Resultaat: </strong>
                    {s.resultaat}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <Button href="/brouwketel" size="lg" className="gap-2">
              Start met stap 1 — vul de Brouwketel
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-3 text-sm text-hout-soft">
              Gratis. 5 minuten. Direct je Brouw-score.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="creme">
        <Container size="narrow">
          <Eyebrow>Waarom werkt dit?</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Vijf redenen, geen één is wilskracht.
          </h2>
          <ul className="mt-8 space-y-4 text-hout leading-relaxed">
            <li>
              <strong>Het is een systeem, geen budget.</strong> Budgetten falen
              omdat ze wilskracht kosten. Het Brouwproces automatiseert.
            </li>
            <li>
              <strong>Het begint bij gedrag, niet bij kennis.</strong> Je hoeft
              geen financieel expert te worden. Je hoeft alleen een systeem in
              te stellen.
            </li>
            <li>
              <strong>Het is eenmalig in te stellen.</strong> Na stap 3 draait
              je systeem. De rest is geduld.
            </li>
            <li>
              <strong>Het werkt op elk inkomen.</strong> Of je €2.000 of €5.000
              per maand verdient.
            </li>
            <li>
              <strong>Het adresseert alle niveaus.</strong> Jezelf, je kinderen
              (De Kleine Brouwer), en de digitale wereld (Schuimkraag-check).
            </li>
          </ul>
          <div className="mt-8">
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 font-medium text-bg-groen link-koper"
            >
              Bekijk hoe ik je help
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </Section>

      <BrouwketelCta />
    </>
  );
}
