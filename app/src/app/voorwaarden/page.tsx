import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Voorwaarden & disclaimer",
  description:
    "De kleine lettertjes — eerlijk en kort. Geen financieel advies, wel coaching en educatie.",
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  return (
    <Section tone="schuim" className="pt-14 sm:pt-20">
      <Container size="narrow">
        <Eyebrow>Voorwaarden</Eyebrow>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Voorwaarden & disclaimer
        </h1>
        <div className="mt-10 space-y-6 text-hout leading-relaxed">
          <div className="rounded-2xl bg-creme p-5 border border-hout/5">
            <p className="font-medium">
              De Geldbrouwerij biedt financiële coaching en educatie, géén
              financieel advies. Roy Brouwer is geen geregistreerd financieel
              adviseur en staat niet onder toezicht van de AFM.
            </p>
            <p className="mt-2 text-sm text-hout-soft">
              De informatie is bedoeld als algemene educatie. Raadpleeg altijd
              een gekwalificeerd adviseur voor je specifieke situatie.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Betalingen</h2>
            <p>
              Betalingen verlopen via Stripe. Abonnementen zijn maandelijks op
              te zeggen. De €1 proefperiode eindigt automatisch na 30 dagen
              tenzij je annuleert.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Garantie</h2>
            <p>
              Bij Het Brouwtraject geldt een “brouw opnieuw of geld terug”-garantie:
              als je na het traject geen werkend systeem hebt, kies je wat je
              wilt. Neem contact op binnen 14 dagen na de laatste sessie.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Aansprakelijkheid</h2>
            <p>
              Ik ben niet aansprakelijk voor financiële uitkomsten voortvloeiend
              uit gebruik van deze content. Alle keuzes maak je zelf.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Contact</h2>
            <p>
              Roy Brouwer ·{" "}
              <a
                href="mailto:roy@geldbrouwerij.nl"
                className="link-koper text-bg-groen"
              >
                roy@geldbrouwerij.nl
              </a>{" "}
              · KvK-nummer volgt.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
