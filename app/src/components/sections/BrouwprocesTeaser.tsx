import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function BrouwprocesTeaser() {
  const b = site.brouwproces;

  return (
    <Section tone="schuim">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            {b.titel}
          </h2>
          <p className="mt-4 text-hout-soft leading-relaxed">{b.subtitel}</p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {b.stappen.map((s, i) => (
            <li
              key={s.naam}
              className="relative rounded-2xl bg-creme p-5 border border-hout/5 hover:shadow-[var(--shadow-lift)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-koper text-schuim font-display text-base">
                  {s.nr === 0 ? "∞" : s.nr}
                </span>
                {i < b.stappen.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-hout/20 hidden lg:block" />
                )}
              </div>
              <h3 className="mt-3 font-display text-lg !text-bg-groen">
                {s.naam}
              </h3>
              <p className="mt-1.5 text-sm text-hout-soft leading-relaxed">
                {s.regel}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/brouwproces"
            className="inline-flex items-center gap-2 font-medium text-bg-groen link-koper"
          >
            Lees Het Brouwproces in detail
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
