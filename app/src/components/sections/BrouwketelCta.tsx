import { ArrowRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function BrouwketelCta() {
  const b = site.brouwketel;
  return (
    <Section tone="groen" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 15% 0%, rgba(199,140,78,0.25), transparent 35%), radial-gradient(circle at 100% 100%, rgba(232,184,75,0.2), transparent 40%)",
        }}
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow className="text-hop">{b.eyebrow}</Eyebrow>
            <h2 className="mt-3 !text-schuim font-display text-3xl sm:text-5xl">
              {b.titel}
            </h2>
            <p className="mt-5 text-schuim/85 text-base sm:text-lg leading-relaxed max-w-xl">
              {b.subtitel}
            </p>
            <ul className="mt-6 space-y-2.5">
              {b.bullets.map((x) => (
                <li key={x} className="flex items-center gap-2.5 text-schuim/90">
                  <Check className="h-5 w-5 text-hop shrink-0" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/brouwketel" size="lg" className="gap-2">
                {b.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mini preview card */}
          <div className="relative">
            <div className="rounded-3xl bg-schuim text-hout p-6 sm:p-8 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] max-w-sm ml-auto">
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-koper-dark">
                Voorbeeld — Sanne, 27
              </p>
              <div className="mt-4 flex items-end gap-4">
                <span className="font-display text-6xl font-semibold text-bg-groen leading-none">
                  78
                </span>
                <span className="text-sm text-hout-soft pb-1">/ 100</span>
              </div>
              <p className="mt-2 text-sm text-groen-ok font-medium">
                Mooi op weg — laat het rijpen.
              </p>
              <div className="mt-6 space-y-2.5">
                {[
                  ["Spaarquote", 85],
                  ["Vaste-lasten-ratio", 85],
                  ["Buffer", 60],
                ].map(([k, v]) => (
                  <div key={k as string}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-hout-soft">{k}</span>
                      <span className="text-hout">{v}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-creme overflow-hidden">
                      <div
                        className="h-full bg-koper"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
