export const kanalen = [
  { slug: "algemeen", naam: "# algemeen", beschrijving: "Kennismakingen, losse vragen, welkomsten." },
  { slug: "potjessysteem", naam: "# potjessysteem", beschrijving: "Hoe verdeel jij? Wat werkt, wat niet?" },
  { slug: "besparen", naam: "# besparen", beschrijving: "Tips, ontdekkingen, subscripties opzeggen." },
  { slug: "beleggen", naam: "# beleggen", beschrijving: "Rustig brouwen. Indexfondsen, rendement, geduld." },
  { slug: "proost-momenten", naam: "# proost-momenten", beschrijving: "Vier mijlpalen — klein of groot." },
  { slug: "kleine-brouwer", naam: "# kleine-brouwer", beschrijving: "Kinderen, zakgeld, digitale verleidingen." },
  { slug: "ondernemer", naam: "# ondernemer", beschrijving: "ZZP, box 1/2/3, pensioen, holding." },
] as const;

export type KanaalSlug = (typeof kanalen)[number]["slug"];

export function getKanaal(slug: string) {
  return kanalen.find((k) => k.slug === slug);
}
