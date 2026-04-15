import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { Newsletter } from "@/components/sections/Newsletter";
import { posts } from "../page";

type Props = { params: Promise<{ slug: string }> };

const content: Record<string, string[]> = {
  "potjessysteem-in-vijf-minuten": [
    "Budgetten falen omdat ze wilskracht vragen. Elke uitgave bijhouden en elke maand een spreadsheet updaten is topsport. Topsport hou je niet tien jaar vol.",
    "Het potjessysteem draait het om: je verdeelt je geld vooraf in drie potten. Wat in pot A zit kun je niet uitgeven aan pot B. Simpel, saai, effectief.",
    "Pot 1: Vaste Lasten — 50% van je netto inkomen. Huur of hypotheek, energie, verzekeringen, abonnementen. Alles wat automatisch afgaat.",
    "Pot 2: Leven — 30%. Boodschappen, uit eten, hobby's, kleding. Wat hier op staat mag op.",
    "Pot 3: Brouwen — 20%. Noodfonds, spaardoelen, beleggen, pensioen. De stille kracht.",
    "De percentages zijn startpunten. Woon je duur? Je zit op 60/25/15. Woon je goedkoop? 40/30/30. Het belangrijkste: de rekeningen zijn fysiek gescheiden.",
    "Zet de overboekingen op de dag na je salaris. Daarna hoef je niks meer. Dit is De Automatische Brouwerij — stap 3 van Het Brouwproces.",
  ],
  "noodfonds-hoeveel-hoezo": [
    "Drie maanden vaste lasten. Liefst zes. Op een rekening die je niet in je bank-app ziet. Dat is het antwoord — maar het waarom is belangrijker.",
    "Een noodfonds is geen spaardoel. Het is een ademrecht. Het verschil tussen een onverwachte €2.000 rekening en een slapeloze nacht.",
    "30% van Nederland kan een onverwachte kostenpost van €2.000 niet opvangen. Dat is nog vóór je begint te beleggen, te sparen voor de keuken, of te denken aan pensioen.",
    "Waar parkeer je het? Een spaarrekening bij een andere bank dan je dagelijkse rekening. Net voldoende moeite om het niet impulsief te doen.",
    "Hoe kom je eraan? Automatische overboeking van €100 per maand, drie jaar lang. Dan heb je €3.600. Voor de gemiddelde Nederlander is dat drie maanden vaste lasten.",
    "En als het op is na een nood? Je bouwt het weer op. Geen schuldgevoel — daar is het fonds voor.",
  ],
  "schuimkraag-ai-scams": [
    "In 2025 werden er bijna 10.000 scam calls gerapporteerd in één kwartaal. Drie keer zoveel als het jaar ervoor. Dit is geen toekomst — dit is nu.",
    "AI heeft twee dingen goedkoop gemaakt: stemmen klonen en gezichten vervalsen. Je hebt dertig seconden audio nodig om iemands stem na te maken. En die 30 seconden staan op hun Instagram.",
    "De meest voorkomende scam in 2026: 'Mam, ik heb mijn telefoon verloren, dit is mijn nieuwe nummer. Kan je snel €800 overmaken?' In stemmenkloon. Met een noodstem.",
    "Slechts 4% van de Nederlanders kan met zekerheid een AI-gekloonde stem herkennen. 60% denkt dat een gekloonde stem van een bekende écht is.",
    "De Schuimkraag-check voor je gezin: spreek één codewoord af. Iets wat niet op social media staat. 'Peanutbutter'. 'De cavia van tante Els'. Wat dan ook.",
    "Leer je ouders: nieuw nummer = altijd bellen op het oude. Elke financiële aanvraag via nieuwe kanalen = fraude, tot bewezen tegendeel.",
    "Dit is stap 0 van Het Brouwproces: de Schuimkraag-check. Niet alleen je eigen uitgaven — ook je digitale veiligheid.",
  ],
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Niet gevonden" };
  return {
    title: post.titel,
    description: post.excerpt,
    alternates: { canonical: `/tap/${slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const body = content[slug] ?? [post.excerpt];

  return (
    <>
      <Section tone="creme" className="pt-12 sm:pt-16">
        <Container size="narrow">
          <Link
            href="/tap"
            className="inline-flex items-center gap-1.5 text-sm text-hout-soft hover:text-bg-groen"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar De Tap
          </Link>
          <Eyebrow className="mt-6">{post.rubriek} · {post.tijd}</Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{post.titel}</h1>
          <p className="mt-3 text-sm text-hout-soft">
            {new Date(post.datum).toLocaleDateString("nl-NL", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </Container>
      </Section>

      <Section tone="schuim">
        <Container size="narrow">
          <article className="prose-brouwerij space-y-5 text-hout text-base sm:text-lg leading-relaxed">
            {body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}
