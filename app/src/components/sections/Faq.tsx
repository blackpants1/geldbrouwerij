import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { site } from "@/content/site";

export function Faq() {
  return (
    <Section tone="schuim">
      <Container size="narrow">
        <div className="text-center">
          <Eyebrow>Veelgestelde vragen</Eyebrow>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl">
            Nog even voorproeven?
          </h2>
        </div>

        <dl className="mt-10 space-y-3">
          {site.faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl bg-creme border border-hout/5 overflow-hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 sm:p-6">
                <dt className="font-display text-lg sm:text-xl !text-bg-groen">
                  {item.vraag}
                </dt>
                <span className="h-8 w-8 shrink-0 rounded-full bg-schuim text-bg-groen flex items-center justify-center transition-transform group-open:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                    <path
                      d="M7 1v12M1 7h12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <dd className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-hout leading-relaxed">
                {item.antwoord}
              </dd>
            </details>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
