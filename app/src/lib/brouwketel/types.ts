export type Gezin = "alleen" | "partner" | "gezin";

export interface BrouwketelInput {
  netInkomenMaand: number;
  gezin: Gezin;
  vasteLastenMaand: number;
  levenMaand: number;
  huidigSpaargeldTotal: number;
  maandelijksSparen: number;
  schuldenTotal: number;
}

export interface BrouwketelAssen {
  spaarquote: number;         // score 0..100
  vasteLastenRatio: number;   // score 0..100
  bufferMaanden: number;      // score 0..100
  schuldenRatio: number;      // score 0..100
  automatisering: number;     // score 0..100
}

export interface BrouwketelDerived {
  brouwen: number;                    // EUR/mnd over
  spaarquoteRatio: number;            // 0..1
  vasteLastenRatioRaw: number;        // 0..1
  bufferMaandenRaw: number;           // getal maanden
  schuldenRatioRaw: number;           // 0..many
  heeftAutomatisering: boolean;
}

export interface BrouwketelResult {
  score: number;                      // 1..100
  assen: BrouwketelAssen;
  derived: BrouwketelDerived;
  kleur: "rood" | "amber" | "groen";
  zwaksteAssen: Array<keyof BrouwketelAssen>;
  acties: string[];
  potjes: {
    actueel: { vasteLasten: number; leven: number; brouwen: number };
    benchmark: { vasteLasten: number; leven: number; brouwen: number };
    delta: { vasteLasten: number; leven: number; brouwen: number };
  };
  projectie: {
    jaren10: number;
    jaren20: number;
    jaren30: number;
  };
}
