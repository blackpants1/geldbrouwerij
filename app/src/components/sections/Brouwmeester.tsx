import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function Brouwmeester() {
  const b = site.brouwmeester;
  return (
    <Section tone="creme">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div className="order-2 lg:order-1 relative max-w-sm mx-auto lg:mx-0">
            <div className="aspect-[4/5] rounded-3xl bg-bg-groen relative overflow-hidden shadow-[var(--shadow-lift)]">
              <svg viewBox="0 0 400 500" className="w-full h-full" aria-hidden>
                <defs>
                  <linearGradient id="roy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B3A2D" />
                    <stop offset="100%" stopColor="#132a20" />
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#roy)" />
                {/* A simple portrait silhouette placeholder */}
                <g fill="#C78C4E" opacity="0.9">
                  <circle cx="200" cy="180" r="80" />
                  <path d="M80 500 C 80 360, 320 360, 320 500 Z" />
                </g>
                <g fill="#E8B84B" opacity="0.6">
                  <circle cx="308" cy="80" r="18" />
                  <circle cx="340" cy="110" r="10" />
                </g>
              </svg>
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-bg-groen via-bg-groen/80 to-transparent">
                <p className="text-schuim/80 text-sm">Roy Brouwer</p>
                <p className="text-schuim font-display text-xl">De Brouwmeester</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <Eyebrow>{b.eyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
              {b.titel}
            </h2>
            <p className="mt-5 text-hout leading-relaxed text-base sm:text-lg">
              {b.paragraaf}
            </p>
            <p className="mt-4 font-display text-xl text-koper-dark italic">
              Proost. — Roy
            </p>
            <div className="mt-6">
              <Link
                href="/over"
                className="inline-flex items-center gap-2 font-medium text-bg-groen link-koper"
              >
                {b.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
