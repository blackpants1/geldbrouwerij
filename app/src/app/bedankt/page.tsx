import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Bedankt",
  description: "Proost — we hebben je bericht ontvangen.",
  robots: { index: false },
};

export default function BedanktPage() {
  return (
    <Section tone="creme" className="py-20 sm:py-28 text-center">
      <Container size="narrow">
        <h1 className="font-display text-4xl sm:text-6xl">Proost.</h1>
        <p className="mt-4 text-hout-soft text-lg leading-relaxed">
          We hebben je gehoord. Check je inbox — daar staat je volgende stap.
          (Spam-vat ook even checken, voor de zekerheid.)
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/brouwketel" size="lg">
            Start de Brouwketel
          </Button>
          <Button href="/tap" size="lg" variant="outline">
            Blader door De Tap
          </Button>
        </div>
        <p className="mt-10 text-sm text-hout-soft">
          Vragen?{" "}
          <Link href="mailto:roy@geldbrouwerij.nl" className="link-koper text-bg-groen">
            roy@geldbrouwerij.nl
          </Link>
        </p>
      </Container>
    </Section>
  );
}
