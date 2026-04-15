import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Diensten } from "@/components/sections/Diensten";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Diensten — Brouwavond, Check-up, Brouwtraject, Werkgeversworkshop, Platform",
  description:
    "Van gratis Brouwketel tot persoonlijk Brouwtraject — kies hoe je met De Geldbrouwerij aan je financiële vrijheid bouwt.",
  alternates: { canonical: "/diensten" },
};

export default function DienstenPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20">
        <Container size="narrow">
          <Eyebrow>Diensten</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
            Kies je variant. Schaal op als je wilt.
          </h1>
          <p className="mt-5 text-hout-soft text-lg leading-relaxed">
            Sommige Brouwmaatjes willen één avond samen brouwen. Anderen willen
            drie maanden begeleiding. En sommigen willen een jaar lang het
            platform. Er is geen fout antwoord — je kunt altijd opschalen.
          </p>
        </Container>
      </Section>
      <Diensten />
      <Faq />
    </>
  );
}
