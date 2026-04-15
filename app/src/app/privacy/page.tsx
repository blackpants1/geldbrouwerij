import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe De Geldbrouwerij omgaat met je gegevens. Kort, eerlijk, zonder juridisch geneuzel.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section tone="schuim" className="pt-14 sm:pt-20">
      <Container size="narrow">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Privacybeleid</h1>
        <p className="mt-3 text-sm text-hout-soft">
          Laatst bijgewerkt: {new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="mt-10 space-y-6 text-hout leading-relaxed">
          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Wat ik verzamel</h2>
            <p>
              Als je de Brouwketel invult: je naam en e-mail, plus de
              financiële schattingen die je zelf invoert. Geen IBAN, geen
              wachtwoorden, geen bankkoppelingen.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Waarvoor</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Je Brouwscore en rapport naar je mailen.</li>
              <li>Het Brouwboek versturen (alleen als je daarvoor kiest).</li>
              <li>Contact met je opnemen als je een dienst boekt.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Verwerkers</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li><strong>Resend</strong> voor e-mail (EU-servers).</li>
              <li><strong>Vercel</strong> voor hosting.</li>
              <li><strong>Stripe</strong> (bij betaalde diensten) voor betalingen.</li>
              <li><strong>Plausible</strong> voor cookie-loze, privacy-vriendelijke analytics.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Rechten</h2>
            <p>
              Je kunt altijd vragen wat ik over je weet, het aanpassen, of het laten
              verwijderen. Eén mailtje naar{" "}
              <a href="mailto:roy@geldbrouwerij.nl" className="link-koper text-bg-groen">
                roy@geldbrouwerij.nl
              </a>{" "}
              is genoeg.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl !text-bg-groen">Bewaartermijn</h2>
            <p>
              Zolang je lid bent of abonnee. Daarna maximaal 2 jaar voor de
              wettelijke administratie.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
