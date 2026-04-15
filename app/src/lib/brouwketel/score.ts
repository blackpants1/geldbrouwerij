import type {
  BrouwketelAssen,
  BrouwketelDerived,
  BrouwketelInput,
  BrouwketelResult,
} from "./types";
import { compoundProjection } from "./compound";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const round = (v: number) => Math.round(v);

function sanitize(input: BrouwketelInput): BrouwketelInput {
  const nonNegative = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
  return {
    netInkomenMaand: nonNegative(input.netInkomenMaand),
    gezin: input.gezin,
    vasteLastenMaand: nonNegative(input.vasteLastenMaand),
    levenMaand: nonNegative(input.levenMaand),
    huidigSpaargeldTotal: nonNegative(input.huidigSpaargeldTotal),
    maandelijksSparen: nonNegative(input.maandelijksSparen),
    schuldenTotal: nonNegative(input.schuldenTotal),
  };
}

function derive(i: BrouwketelInput): BrouwketelDerived {
  const brouwen = i.netInkomenMaand - i.vasteLastenMaand - i.levenMaand;
  const spaarquoteRatio =
    i.netInkomenMaand > 0 ? Math.max(0, brouwen) / i.netInkomenMaand : 0;
  const vasteLastenRatioRaw =
    i.netInkomenMaand > 0 ? i.vasteLastenMaand / i.netInkomenMaand : 1;
  const monthlyOutflow = i.vasteLastenMaand + i.levenMaand;
  const bufferMaandenRaw =
    monthlyOutflow > 0 ? i.huidigSpaargeldTotal / monthlyOutflow : 0;
  const schuldenRatioRaw =
    i.netInkomenMaand > 0 ? i.schuldenTotal / i.netInkomenMaand : 0;
  return {
    brouwen,
    spaarquoteRatio,
    vasteLastenRatioRaw,
    bufferMaandenRaw,
    schuldenRatioRaw,
    heeftAutomatisering: i.maandelijksSparen > 0,
  };
}

function asSpaarquote(r: number): number {
  if (r < 0.05) return 0;
  if (r < 0.1) return 40;
  if (r < 0.15) return 65;
  if (r < 0.2) return 85;
  return 100;
}
function asVasteLastenRatio(r: number): number {
  if (r > 0.7) return 0;
  if (r > 0.6) return 30;
  if (r > 0.5) return 60;
  if (r > 0.4) return 85;
  return 100;
}
function asBufferMaanden(m: number): number {
  if (m < 1) return 0;
  if (m < 2) return 35;
  if (m < 3) return 60;
  if (m < 6) return 85;
  return 100;
}
function asSchuldenRatio(r: number): number {
  if (r > 1) return 0;
  if (r > 0.5) return 35;
  if (r > 0.2) return 65;
  if (r > 0.05) return 85;
  return 100;
}

function assen(d: BrouwketelDerived): BrouwketelAssen {
  return {
    spaarquote: asSpaarquote(d.spaarquoteRatio),
    vasteLastenRatio: asVasteLastenRatio(d.vasteLastenRatioRaw),
    bufferMaanden: asBufferMaanden(d.bufferMaandenRaw),
    schuldenRatio: asSchuldenRatio(d.schuldenRatioRaw),
    automatisering: d.heeftAutomatisering ? 100 : 0,
  };
}

const WEIGHTS: Record<keyof BrouwketelAssen, number> = {
  spaarquote: 0.4,
  vasteLastenRatio: 0.2,
  bufferMaanden: 0.2,
  schuldenRatio: 0.1,
  automatisering: 0.1,
};

function weightedScore(a: BrouwketelAssen): number {
  const sum =
    a.spaarquote * WEIGHTS.spaarquote +
    a.vasteLastenRatio * WEIGHTS.vasteLastenRatio +
    a.bufferMaanden * WEIGHTS.bufferMaanden +
    a.schuldenRatio * WEIGHTS.schuldenRatio +
    a.automatisering * WEIGHTS.automatisering;
  return clamp(round(sum), 1, 100);
}

function zwaksteAssen(a: BrouwketelAssen): Array<keyof BrouwketelAssen> {
  return (Object.keys(a) as Array<keyof BrouwketelAssen>)
    .map((k) => ({ k, v: a[k] }))
    .sort((x, y) => x.v - y.v)
    .slice(0, 3)
    .map((x) => x.k);
}

const ACTIES: Record<keyof BrouwketelAssen, string> = {
  spaarquote:
    "Zet vandaag een automatische €50/mnd overboeking in naar een losse Brouwen-rekening. Verhoog elke 3 maanden.",
  vasteLastenRatio:
    "Scan je abonnementen en energie in één uur. Eén op de drie Nederlanders vindt binnen 10 minuten ≥€40/mnd aan lekken.",
  bufferMaanden:
    "Bouw eerst je noodfonds op: 3× je vaste lasten op een aparte rekening die je niet ziet in je app.",
  schuldenRatio:
    "Maak een schuldenplan volgens de lawine-methode: hoogste rente eerst, minimumbedragen op de rest.",
  automatisering:
    "Stel De Automatische Brouwerij in: automatische overschrijvingen op de dag na salaris. Geen wilskracht meer nodig.",
};

function kleurVoorScore(score: number): BrouwketelResult["kleur"] {
  if (score < 40) return "rood";
  if (score < 70) return "amber";
  return "groen";
}

function potjes(i: BrouwketelInput): BrouwketelResult["potjes"] {
  const actueelBrouwen = Math.max(
    0,
    i.netInkomenMaand - i.vasteLastenMaand - i.levenMaand,
  );
  const actueel = {
    vasteLasten: i.vasteLastenMaand,
    leven: i.levenMaand,
    brouwen: actueelBrouwen,
  };
  const benchmark = {
    vasteLasten: i.netInkomenMaand * 0.5,
    leven: i.netInkomenMaand * 0.3,
    brouwen: i.netInkomenMaand * 0.2,
  };
  const delta = {
    vasteLasten: actueel.vasteLasten - benchmark.vasteLasten,
    leven: actueel.leven - benchmark.leven,
    brouwen: actueel.brouwen - benchmark.brouwen,
  };
  return { actueel, benchmark, delta };
}

export function berekenBrouwketel(raw: BrouwketelInput): BrouwketelResult {
  const input = sanitize(raw);
  const derived = derive(input);
  const a = assen(derived);
  const score = weightedScore(a);
  const zwakste = zwaksteAssen(a);

  const acties = zwakste.map((k) => ACTIES[k]);

  const jaarInleg = input.maandelijksSparen * 12;
  const projectie = {
    jaren10: compoundProjection({
      startkapitaal: input.huidigSpaargeldTotal,
      jaarInleg,
      jaren: 10,
    }),
    jaren20: compoundProjection({
      startkapitaal: input.huidigSpaargeldTotal,
      jaarInleg,
      jaren: 20,
    }),
    jaren30: compoundProjection({
      startkapitaal: input.huidigSpaargeldTotal,
      jaarInleg,
      jaren: 30,
    }),
  };

  return {
    score,
    assen: a,
    derived,
    kleur: kleurVoorScore(score),
    zwaksteAssen: zwakste,
    acties,
    potjes: potjes(input),
    projectie,
  };
}

// Re-export for convenience
export { compoundProjection } from "./compound";
