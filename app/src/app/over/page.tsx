import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Brouwmeester } from "@/components/sections/Brouwmeester";

export const metadata: Metadata = {
  title: "Over de Brouwmeester — Roy Brouwer",
  description:
    "Geen financieel adviseur, geen MBA, geen pak. Wél iemand die het zelf heeft uitgezocht. Maak kennis met Roy Brouwer, de Brouwmeester achter De Geldbrouwerij.",
  alternates: { canonical: "/over" },
};

export default function OverPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20">
        <Container size="narrow">
          <Eyebrow>De Brouwmeester</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
            Hey, ik ben Roy.
          </h1>
          <div className="mt-6 space-y-5 text-hout leading-relaxed text-base sm:text-lg">
            <p>
              Ondernemer, geen financieel adviseur. Geen MBA, geen pak, geen
              spreadsheets met 47 tabbladen. Wel iemand die het zelf heeft
              uitgezocht — na jaren van geen grip op wat er maandelijks
              gebeurde.
            </p>
            <p>
              Ik heet Brouwer. En vermogen opbouwen is precies als bier brouwen:
              de juiste ingrediënten, een goed recept, en geduld. Ik ontdekte
              dat budgetten faalden omdat ze wilskracht vroegen. Systemen
              werkten. Automatisering werkte. Vaste potjes werkten. En
              compound interest? Dat werkt terwijl je slaapt.
            </p>
            <p>
              Ik heb geen extreem hoog inkomen. Maar ik heb wél financiële rust.
              Die rust gun ik jou ook — zonder dure adviseurs, zonder hype,
              zonder gedoe.
            </p>
            <p className="font-display text-xl text-koper-dark italic">
              Proost. — Roy
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="schuim">
        <Container size="narrow">
          <Eyebrow>Wat ik niet ben</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">
            Helder over grenzen.
          </h2>
          <ul className="mt-6 space-y-3 text-hout leading-relaxed">
            <li>
              <strong>Geen financieel adviseur.</strong> Ik sta niet onder
              AFM-toezicht. Voor beleggings- of hypotheekbeslissingen stuur ik
              je door naar iemand die dat wél mag doen.
            </li>
            <li>
              <strong>Geen “snel rijk worden”-goeroe.</strong> Je wordt niet
              rijk van mij. Je krijgt wel rust. En tijd. En een systeem.
            </li>
            <li>
              <strong>Geen crypto- of trading-community.</strong> Ik hou het
              saai: indexfondsen, potjes, rijping. Saai is goed.
            </li>
            <li>
              <strong>Geen droge boekhouder.</strong> Je gaat hier lachen. Ook
              over geld.
            </li>
          </ul>
        </Container>
      </Section>

      <Brouwmeester />
    </>
  );
}
