import type { Metadata } from "next";
import { BrouwketelWizard } from "@/components/brouwketel/BrouwketelWizard";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "De Brouwketel — je financiële röntgenfoto in 5 minuten",
  description:
    "Gratis tool. In 5 minuten zie je je geldstroom, je Brouw-score van 1 tot 100, en drie concrete acties — zonder account, zonder IBAN, zonder gedoe.",
  alternates: { canonical: "/brouwketel" },
};

export default function BrouwketelPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>De Brouwketel · gratis · 5 minuten</Eyebrow>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl text-bg-groen">
              Proef waar je staat.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-hout-soft leading-relaxed">
              Vijf simpele vragen. Je krijgt je Brouw-score, je geldstroom en
              drie concrete acties. We rekenen in je browser — alleen je
              e-mailadres gaat onze kant op.
            </p>
          </div>
        </Container>
      </Section>

      <section className="pb-20 sm:pb-28 -mt-10 sm:-mt-14 px-5 sm:px-6">
        <BrouwketelWizard />
      </section>
    </>
  );
}
