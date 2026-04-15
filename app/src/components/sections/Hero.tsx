import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function Hero() {
  const h = site.hero;
  return (
    <section className="relative overflow-hidden bg-creme">
      {/* Subtle background pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(199,140,78,0.35), transparent 45%), radial-gradient(ellipse at 80% 120%, rgba(27,58,45,0.25), transparent 50%)",
        }}
      />
      <div className="grain" aria-hidden />

      <Container className="relative pt-14 sm:pt-20 lg:pt-28 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-4 font-display text-[2.3rem] leading-[1.05] sm:text-6xl lg:text-7xl text-bg-groen">
            {h.titel}
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-hout-soft leading-relaxed max-w-2xl">
            {h.subtitel}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button href="/brouwketel" size="lg" className="gap-2">
              {h.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Link
              href="/brouwproces"
              className="inline-flex items-center gap-2 font-medium text-bg-groen link-koper"
            >
              {h.secondaryCta}
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-hout-soft">
            <Sparkles className="h-4 w-4 text-koper" />
            <span>{h.reassurance}</span>
          </div>
        </div>

        {/* Floating visual: a stylised ketel */}
        <div
          aria-hidden
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[34rem] h-[34rem] pointer-events-none"
        >
          <KetelIllustration />
        </div>
      </Container>

      {/* Stats strip */}
      <div className="relative border-t border-hout/5 bg-schuim/70 backdrop-blur-sm">
        <Container>
          <dl className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-hout/5">
            {[
              { v: "47%", l: "van NL financieel kwetsbaar" },
              { v: "1 op 5", l: "heeft <€1.000 spaargeld" },
              { v: "75%", l: "heeft een pensioengat" },
              { v: "€13K+", l: "productiviteitsverlies p.p./jaar" },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col gap-0.5 px-4 sm:px-6 py-5"
              >
                <dt className="font-display text-2xl sm:text-3xl text-bg-groen">
                  {s.v}
                </dt>
                <dd className="text-xs sm:text-sm text-hout-soft leading-snug">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}

function KetelIllustration() {
  return (
    <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="fg-ket" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#C78C4E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1B3A2D" stopOpacity="1" />
        </radialGradient>
      </defs>
      {/* Base */}
      <ellipse cx="200" cy="330" rx="140" ry="16" fill="#1B3A2D" opacity="0.25" />
      {/* Body */}
      <path
        d="M100 160 C 100 120, 300 120, 300 160 L 300 300 C 300 330, 100 330, 100 300 Z"
        fill="url(#fg-ket)"
      />
      {/* Rim */}
      <ellipse cx="200" cy="160" rx="100" ry="16" fill="#C78C4E" opacity="0.85" />
      <ellipse cx="200" cy="160" rx="92" ry="12" fill="#1B3A2D" />
      {/* Foam */}
      <g opacity="0.85">
        <circle cx="160" cy="150" r="20" fill="#FEFCF7" />
        <circle cx="195" cy="138" r="24" fill="#FEFCF7" />
        <circle cx="230" cy="148" r="22" fill="#FEFCF7" />
        <circle cx="170" cy="135" r="10" fill="#FEFCF7" />
        <circle cx="245" cy="136" r="9" fill="#FEFCF7" />
      </g>
      {/* Hop mark */}
      <g transform="translate(305 215)">
        <path
          d="M0 0c10 8 14 16 14 26 0 5-2 8-6 10 5 2 8 7 8 13 0 5-3 10-8 12 4 2 7 6 7 12 0 8-6 14-15 16-9-2-15-8-15-16 0-6 3-10 7-12-5-2-8-7-8-12 0-6 3-11 8-13-4-2-6-5-6-10 0-10 4-18 14-26z"
          fill="#E8B84B"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}
