import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Newsletter } from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "De Tap — blog van De Geldbrouwerij",
  description:
    "Nuchter geschreven artikelen over het potjessysteem, beleggen, pensioen, AI-scams en de Schuimkraag-check. Geen gebakken lucht.",
  alternates: { canonical: "/tap" },
};

export const posts = [
  {
    slug: "potjessysteem-in-vijf-minuten",
    titel: "Het potjessysteem in vijf minuten.",
    excerpt:
      "Waarom budgetten falen, hoe drie potjes het probleem oplossen, en het exacte recept dat je vandaag kunt instellen.",
    rubriek: "Het Ingrediënt",
    tijd: "5 min",
    datum: "2026-04-10",
  },
  {
    slug: "noodfonds-hoeveel-hoezo",
    titel: "Noodfonds: hoeveel, hoezo, en waar parkeer je het?",
    excerpt:
      "Drie maanden vaste lasten. Op een rekening die je niet in je app ziet. Hier is waarom — en hoe je er komt.",
    rubriek: "Het Ingrediënt",
    tijd: "6 min",
    datum: "2026-04-03",
  },
  {
    slug: "schuimkraag-ai-scams",
    titel: "De Schuimkraag-check: AI-scams die je ouders beroven.",
    excerpt:
      "Voice cloning, deepfake-video en de kleinkind-scam. Waarom 80% van Nederland echt van nep niet meer onderscheidt — en hoe je thuis een codewoord afspreekt.",
    rubriek: "De Schuimkraag",
    tijd: "7 min",
    datum: "2026-03-27",
  },
];

export default function TapIndexPage() {
  return (
    <>
      <Section tone="creme" className="pt-14 sm:pt-20">
        <Container size="narrow">
          <Eyebrow>De Tap</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
            Nuchter, bruikbaar, nooit hypey.
          </h1>
          <p className="mt-5 text-hout-soft text-lg leading-relaxed">
            Eén tap, veel soorten bier. Hier schrijf ik over het potjessysteem,
            beleggen voor beginners, AI-scams, pensioen voor ZZP&apos;ers en wat we
            onze kinderen moeten meegeven. Geen clickbait.
          </p>
        </Container>
      </Section>

      <Section tone="schuim">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/tap/${p.slug}`}
                  className="group block h-full rounded-2xl bg-creme p-6 border border-hout/5 transition-shadow hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="text-xs uppercase tracking-wider font-medium text-koper-dark">
                    {p.rubriek} · {p.tijd}
                  </p>
                  <h2 className="mt-3 font-display text-xl !text-bg-groen group-hover:text-koper-dark transition-colors">
                    {p.titel}
                  </h2>
                  <p className="mt-3 text-hout-soft text-sm leading-relaxed">
                    {p.excerpt}
                  </p>
                  <p className="mt-5 text-xs text-hout-soft">
                    {new Date(p.datum).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
