import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { site } from "@/content/site";

export function Newsletter() {
  const n = site.newsletter;
  return (
    <Section tone="schuim" className="py-14 sm:py-20">
      <Container>
        <div className="rounded-3xl bg-bg-groen text-schuim p-8 sm:p-14 lg:p-16 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 0%, rgba(232,184,75,0.18), transparent 40%), radial-gradient(circle at 0% 100%, rgba(199,140,78,0.2), transparent 45%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow className="text-hop">Het Brouwboek</Eyebrow>
              <h2 className="mt-3 !text-schuim font-display text-3xl sm:text-4xl lg:text-5xl">
                {n.titel}
              </h2>
              <p className="mt-4 text-schuim/85 text-base sm:text-lg leading-relaxed max-w-xl">
                {n.subtitel}
              </p>
            </div>
            <div>
              <NewsletterForm variant="dark" source="homepage" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
