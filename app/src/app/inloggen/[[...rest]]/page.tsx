import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Log in op Het Brouwplatform van De Geldbrouwerij.",
  alternates: { canonical: "/inloggen" },
  robots: { index: false },
};

export default function InloggenPage() {
  return (
    <Section tone="creme" className="pt-14 sm:pt-20 min-h-[70vh]">
      <Container size="narrow">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <Eyebrow>Inloggen</Eyebrow>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">
              Welkom terug.
            </h1>
            <p className="mt-3 text-hout-soft text-sm sm:text-base leading-relaxed">
              Log in op Het Brouwplatform.
            </p>
          </div>
          <div className="flex justify-center">
            <SignIn
              routing="path"
              path="/inloggen"
              signUpUrl="/aanmelden"
              forceRedirectUrl="/platform"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
