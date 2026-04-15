import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Users, Clock, Euro, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "De Brouwavond — reserveer je kruk",
  description:
    "Online groepsworkshop, 2 uur, €29. We leren je het potjessysteem en hoe je je geld op de automaat zet. Ook als gezinseditie voor ouders met kinderen.",
  alternates: { canonical: "/brouwavond" },
};

const draaiboek = [
  { tijd: "15 min", blok: "Welkom + kennismaken" },
  { tijd: "20 min", blok: "Wake-up call: waar lek je?" },
  { tijd: "25 min", blok: "Het potjessysteem op maat" },
  { tijd: "20 min", blok: "Automatisering — live demo" },
  { tijd: "15 min", blok: "Compound interest in plaatjes" },
  { tijd: "20 min", blok: "Q&A + jouw eerste actie" },
];

export default function BrouwavondPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>De Brouwavond</Eyebrow>
              <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
                Reserveer je kruk aan de bar.
              </h1>
              <p className="mt-5 text-hout-soft text-lg leading-relaxed">
                Online groepsworkshop van 2 uur. Tussen 8 en 15 Brouwmaatjes,
                samen door Het Brouwproces. Je gaat naar huis met een concreet
                plan en de energie om het te doen.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  href="https://cal.com/royvandegeldbrouwerij/brouwavond"
                  size="lg"
                  target="_blank"
                  rel="noopener"
                >
                  Reserveer je kruk · €29
                </Button>
                <Button href="#gezin" size="lg" variant="outline">
                  Bekijk de Gezinseditie
                </Button>
              </div>
              <p className="mt-3 text-sm text-hout-soft">
                Niet tevreden na de avond? Ik brouw opnieuw of je krijgt je
                geld terug.
              </p>
            </div>

            <div className="rounded-3xl bg-schuim p-6 sm:p-8 border border-hout/5 shadow-[var(--shadow-soft)]">
              <ul className="space-y-4">
                <Fact icon={<Euro className="h-5 w-5" />} k="Prijs" v="€29 per persoon" />
                <Fact icon={<Clock className="h-5 w-5" />} k="Duur" v="2 uur · live" />
                <Fact icon={<Users className="h-5 w-5" />} k="Groep" v="8 tot 15 Brouwmaatjes" />
                <Fact icon={<CalendarCheck className="h-5 w-5" />} k="Locatie" v="Online via Zoom" />
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="schuim">
        <Container size="narrow">
          <Eyebrow>Het draaiboek</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Wat je 2 uur lang doet.
          </h2>
          <ul className="mt-8 space-y-2">
            {draaiboek.map((d) => (
              <li
                key={d.blok}
                className="flex items-center gap-4 rounded-xl bg-creme p-4 border border-hout/5"
              >
                <span className="w-16 text-center font-display text-lg text-koper-dark shrink-0">
                  {d.tijd}
                </span>
                <span className="text-hout">{d.blok}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-hout-soft">
            ~30-40% van de deelnemers stapt daarna in op Het Brouwplatform voor
            €1 (30 dagen proef). Geen verplichting — je mag ook gewoon de avond
            hebben.
          </p>
        </Container>
      </Section>

      <Section tone="creme" id="gezin">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <Eyebrow>De Kleine Brouwer</Eyebrow>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl">
                Brouwavond Gezinseditie.
              </h2>
              <p className="mt-4 text-hout leading-relaxed">
                Voor ouders met kinderen van 8 tot 16. We leren je het
                mini-potjessysteem, hoe je een zakgeldcontract maakt, en hoe je
                met je kind over online verleidingen praat — inclusief AI-scams
                en BNPL-apps.
              </p>
              <ul className="mt-5 space-y-2 text-hout">
                {[
                  "Mini-potjessysteem voor je kind",
                  "Zakgeldcontract (template meegestuurd)",
                  "Digitale verleidingen herkennen (TikTok-shop, BNPL)",
                  "Gesprekopeners voor aan tafel",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <Check className="h-5 w-5 text-groen-ok shrink-0 mt-0.5" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button
                  href="https://cal.com/royvandegeldbrouwerij/brouwavond-gezin"
                  size="lg"
                  target="_blank"
                  rel="noopener"
                >
                  Boek de Gezinseditie · €39 per huishouden
                </Button>
              </div>
            </div>

            <div className="rounded-3xl bg-bg-groen text-schuim p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-hop">
                Waarom dit nu telt
              </p>
              <ul className="mt-5 space-y-4 text-schuim/90">
                <li>
                  <span className="font-display text-3xl text-hop">3×</span>{" "}
                  zoveel betalingsproblemen als volwassene wanneer een kind niet
                  leert omgaan met geld.
                </li>
                <li>
                  <span className="font-display text-3xl text-hop">22%</span>{" "}
                  van de ouders bespreekt hoe reclame op social media werkt met
                  hun kind.
                </li>
                <li>
                  <span className="font-display text-3xl text-hop">80%</span>{" "}
                  van de Nederlanders kan echt niet meer van AI-nep
                  onderscheiden.
                </li>
              </ul>
              <p className="mt-6 text-sm text-schuim/70 italic">
                Bronnen: Nibud, Rijksoverheid.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="schuim" className="py-14">
        <Container size="narrow" className="text-center">
          <p className="text-hout-soft">
            Geen plek meer op de eerstvolgende avond?{" "}
            <Link
              href="/brouwketel"
              className="text-bg-groen font-medium link-koper"
            >
              Vul vast de Brouwketel
            </Link>
            {" "}— dan krijg je bij de volgende release voorrang.
          </p>
        </Container>
      </Section>
    </>
  );
}

function Fact({
  icon,
  k,
  v,
}: {
  icon: React.ReactNode;
  k: string;
  v: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="text-koper-dark shrink-0">{icon}</span>
      <span className="text-sm text-hout-soft">{k}</span>
      <span className="ml-auto font-medium text-hout">{v}</span>
    </li>
  );
}
