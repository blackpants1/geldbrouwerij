import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const links = {
  Brouwerij: [
    { href: "/brouwproces", label: "Het Brouwproces™" },
    { href: "/diensten", label: "Diensten" },
    { href: "/brouwavond", label: "De Brouwavond" },
    { href: "/brouwketel", label: "De Brouwketel" },
  ],
  Lezen: [
    { href: "/tap", label: "De Tap (blog)" },
    { href: "/over", label: "Over de Brouwmeester" },
  ],
  Overig: [
    { href: "/privacy", label: "Privacy" },
    { href: "/voorwaarden", label: "Voorwaarden & disclaimer" },
    { href: "mailto:roy@geldbrouwerij.nl", label: "Mail Roy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-groen text-schuim mt-auto">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Logo tone="schuim" withTagline />
            <p className="mt-6 max-w-md text-schuim/80 text-sm sm:text-base leading-relaxed">
              De Geldbrouwerij helpt particulieren en ondernemers om grip te krijgen op hun
              geld via Het Brouwproces™ — vijf stappen van financiële chaos naar financiële
              rust. Nuchter, warm, zonder jargon.
            </p>
            <div className="mt-8">
              <p className="text-sm text-schuim/70 mb-3">
                Schenk het Brouwboek elke vrijdag in mijn inbox:
              </p>
              <NewsletterForm variant="dark" source="footer" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <h3 className="!text-schuim text-sm font-medium uppercase tracking-[0.18em] font-sans mb-4">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {items.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-schuim/85 hover:text-hop transition-colors text-sm sm:text-base"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-schuim/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-schuim/60">
          <p>© {new Date().getFullYear()} De Geldbrouwerij · Roy Brouwer · KvK volgt</p>
          <p className="max-w-xl">
            De Geldbrouwerij biedt coaching en educatie, géén financieel advies. Geen AFM-registratie.
            Raadpleeg altijd een gekwalificeerd adviseur voor je persoonlijke situatie.
          </p>
        </div>
      </Container>
    </footer>
  );
}
