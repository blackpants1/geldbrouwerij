import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Aanmelden — word Brouwmaatje",
  description:
    "Maak je Brouwmaatje-account aan. Je krijgt toegang tot Het Brouwplatform, de Tapkamer en Het Brouwrecept.",
  alternates: { canonical: "/aanmelden" },
  robots: { index: false },
};

export default function AanmeldenPage() {
  return (
    <Section tone="creme" className="pt-14 sm:pt-20 min-h-[70vh]">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <Eyebrow>Aanmelden</Eyebrow>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">
              Word Brouwmaatje.
            </h1>
            <p className="mt-3 text-hout-soft text-sm sm:text-base leading-relaxed">
              Gratis. Je krijgt de Brouwketel Pro, Het Brouwrecept en de
              Tapkamer.
            </p>
          </div>
          <div className="flex justify-center">
            <SignUp
              routing="path"
              path="/aanmelden"
              signInUrl="/inloggen"
              forceRedirectUrl="/platform"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
