import { Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function SocialProof() {
  const s = site.socialProof;
  return (
    <Section tone="schuim">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            {s.titel}
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {s.items.map((q) => (
            <li
              key={q.naam}
              className="relative rounded-2xl bg-creme p-6 border border-hout/5"
            >
              <Quote className="h-6 w-6 text-koper/60 mb-3" />
              <p className="text-hout leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
              <div className="mt-5 pt-4 border-t border-hout/5 text-sm">
                <p className="font-medium text-bg-groen">
                  {q.naam} · {q.plaats}
                </p>
                <p className="text-hout-soft">{q.rol}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
