import Link from "next/link";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section tone="creme" className="py-24 sm:py-36">
      <Container size="narrow" className="text-center">
        <p className="text-7xl sm:text-9xl font-display text-bg-groen/90">404</p>
        <h1 className="mt-5 font-display text-3xl sm:text-5xl">
          Oeps, dit vat is leeg.
        </h1>
        <p className="mt-4 text-hout-soft leading-relaxed">
          De pagina die je zoekt is verdampt — of hij heeft nooit bestaan.
          Kies een andere tap:
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Terug naar de homepage
          </Button>
          <Button href="/brouwketel" variant="outline" size="lg">
            Start de Brouwketel
          </Button>
        </div>
        <p className="mt-10 text-sm text-hout-soft">
          Of kijk in <Link href="/tap" className="text-bg-groen link-koper">De Tap</Link>.
        </p>
      </Container>
    </Section>
  );
}
