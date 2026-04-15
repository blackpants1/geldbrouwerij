export interface Module {
  id: string;
  nummer: number;
  titel: string;
  subtitel: string;
  duur: string;
  lessen: Array<{ id: string; titel: string; duur: string }>;
}

export const modules: Module[] = [
  {
    id: "m1",
    nummer: 1,
    titel: "De Proeverij",
    subtitel: "Bewustwording, geldlekken en de Brouwketel invullen.",
    duur: "45 min",
    lessen: [
      { id: "m1-l1", titel: "Welkom bij Het Brouwproces", duur: "5 min" },
      { id: "m1-l2", titel: "Waar gaat je geld heen?", duur: "12 min" },
      { id: "m1-l3", titel: "Geldlekken in kaart", duur: "14 min" },
      { id: "m1-l4", titel: "De Brouwketel samen invullen", duur: "14 min" },
    ],
  },
  {
    id: "m2",
    nummer: 2,
    titel: "De Ingrediënten",
    subtitel: "Inventarisatie: vaste lasten, schulden, overzicht.",
    duur: "55 min",
    lessen: [
      { id: "m2-l1", titel: "Vaste lasten doorlichten", duur: "18 min" },
      { id: "m2-l2", titel: "Schulden op een rij", duur: "14 min" },
      { id: "m2-l3", titel: "Je netto vermogen berekenen", duur: "10 min" },
      { id: "m2-l4", titel: "De geldstroom op papier", duur: "13 min" },
    ],
  },
  {
    id: "m3",
    nummer: 3,
    titel: "Het Recept",
    subtitel: "Potjessysteem, 50/30/20, spaarladder.",
    duur: "60 min",
    lessen: [
      { id: "m3-l1", titel: "Waarom potjes werken", duur: "12 min" },
      { id: "m3-l2", titel: "50 / 30 / 20 op maat", duur: "14 min" },
      { id: "m3-l3", titel: "Je spaarladder", duur: "12 min" },
      { id: "m3-l4", titel: "Het noodfonds", duur: "10 min" },
      { id: "m3-l5", titel: "Schuldenplan (lawine-methode)", duur: "12 min" },
    ],
  },
  {
    id: "m4",
    nummer: 4,
    titel: "De Automatische Brouwerij",
    subtitel: "Rekeningen, automatische overboekingen, routine.",
    duur: "50 min",
    lessen: [
      { id: "m4-l1", titel: "Je bankrekeningen inrichten", duur: "14 min" },
      { id: "m4-l2", titel: "Automatische overboekingen", duur: "14 min" },
      { id: "m4-l3", titel: "10-minuten maand-check", duur: "10 min" },
      { id: "m4-l4", titel: "Jaarlijkse bespaaracties", duur: "12 min" },
    ],
  },
  {
    id: "m5",
    nummer: 5,
    titel: "Laten Rijpen",
    subtitel: "Beleggen basics, indexfondsen, pensioen, compound.",
    duur: "75 min",
    lessen: [
      { id: "m5-l1", titel: "Hoe beleggen écht werkt", duur: "14 min" },
      { id: "m5-l2", titel: "Indexfondsen voor beginners", duur: "16 min" },
      { id: "m5-l3", titel: "Pensioenbeleggen", duur: "14 min" },
      { id: "m5-l4", titel: "Compound interest visueel", duur: "12 min" },
      { id: "m5-l5", titel: "Niet elke dag kijken", duur: "9 min" },
    ],
  },
  {
    id: "m6",
    nummer: 6,
    titel: "De Schuimkraag",
    subtitel: "Kahneman, marketing, impulsen, AI-scams.",
    duur: "55 min",
    lessen: [
      { id: "m6-l1", titel: "Systeem 1 vs Systeem 2", duur: "12 min" },
      { id: "m6-l2", titel: "Marketing-trucs herkennen", duur: "14 min" },
      { id: "m6-l3", titel: "BNPL en impulsaankopen", duur: "12 min" },
      { id: "m6-l4", titel: "AI-scams en deepfakes", duur: "17 min" },
    ],
  },
  {
    id: "m7",
    nummer: 7,
    titel: "Je Brouwplan",
    subtitel: "12-maanden doelen + accountability.",
    duur: "35 min",
    lessen: [
      { id: "m7-l1", titel: "Doelen die wél werken", duur: "14 min" },
      { id: "m7-l2", titel: "Je Brouwplan 2026", duur: "11 min" },
      { id: "m7-l3", titel: "Brouwmaatje gezocht", duur: "10 min" },
    ],
  },
];
