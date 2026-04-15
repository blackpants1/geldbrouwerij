import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Diensten({ compact = false }: { compact?: boolean }) {
  const d = site.diensten;
  const items = compact ? d.items.slice(0, 3) : d.items;

  return (
    <Section tone="creme">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            {d.titel}
          </h2>
          <p className="mt-4 text-hout-soft leading-relaxed">{d.subtitel}</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <li
              key={it.key}
              className={cn(
                "relative rounded-2xl p-6 flex flex-col gap-4 border transition-shadow hover:shadow-[var(--shadow-lift)]",
                "featured" in it && it.featured
                  ? "bg-bg-groen text-schuim border-bg-groen-dark"
                  : "bg-schuim border-hout/5",
              )}
            >
              {"featured" in it && it.featured && (
                <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-hop text-hout px-3 py-1 text-xs font-medium">
                  Meestgekozen
                </span>
              )}
              <div>
                <h3
                  className={cn(
                    "font-display text-xl",
                    "featured" in it && it.featured
                      ? "!text-schuim"
                      : "!text-bg-groen",
                  )}
                >
                  {it.naam}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    "featured" in it && it.featured
                      ? "text-schuim/70"
                      : "text-hout-soft",
                  )}
                >
                  {it.prijs} · {it.duur}
                </p>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed flex-1",
                  "featured" in it && it.featured
                    ? "text-schuim/85"
                    : "text-hout",
                )}
              >
                {it.beschrijving}
              </p>
              <Link
                href={it.href}
                className={cn(
                  "inline-flex items-center gap-2 font-medium text-sm mt-auto",
                  "featured" in it && it.featured
                    ? "text-hop hover:text-schuim"
                    : "text-bg-groen link-koper",
                )}
              >
                {it.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>

        {compact && (
          <div className="mt-10 text-center">
            <Link
              href="/diensten"
              className="inline-flex items-center gap-2 font-medium text-bg-groen link-koper"
            >
              Bekijk alle diensten
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
