---
name: brouwketel-math
description: Canonical formulas, benchmarks, and reference cases for De Brouwketel — the free financial health tool. Use when building, testing, or modifying any calculation in src/lib/brouwketel/*.
---

# De Brouwketel — Math & Benchmarks

## Inputs (canonieke shape)

```ts
type BrouwketelInput = {
  netInkomenMaand: number;          // totaal netto huishouden per maand (EUR)
  gezin: "alleen" | "partner" | "gezin";
  vasteLastenMaand: number;         // huur/hypotheek + energie + verzekeringen + abonnementen + transport
  levenMaand: number;               // boodschappen, uitgaan, hobby, kleding
  huidigSpaargeldTotal: number;     // EUR op spaarrekening(en) nu
  maandelijksSparen: number;        // EUR/mnd automatisch spaarinleg
  schuldenTotal: number;            // schulden excl. hypotheek
};
```

## Afgeleide waarden

```
brouwen            = netInkomen - vasteLasten - leven    // wat overblijft
spaarquote         = max(0, brouwen) / netInkomen        // 0..1
vasteLastenRatio   = vasteLasten / netInkomen            // 0..1+
bufferMaanden      = huidigSpaargeld / (vasteLasten + leven)
schuldenRatio      = schulden / max(1, netInkomen)       // 0..many
```

## Brouw-score (1..100)

Gewogen som van vijf assen (0..100 per as). Weging uit spec.md:

| As | Gewicht | Scoring |
|---|---|---|
| Spaarquote | 40% | <5%:0 · 5-10%:40 · 10-15%:65 · 15-20%:85 · ≥20%:100 |
| Vaste-lasten-ratio | 20% | >70%:0 · 60-70%:30 · 50-60%:60 · 40-50%:85 · ≤40%:100 |
| Buffer-in-maanden | 20% | <1mnd:0 · 1-2:35 · 2-3:60 · 3-6:85 · ≥6:100 |
| Schuldenratio | 10% | >100%:0 · 50-100%:35 · 20-50%:65 · 5-20%:85 · ≤5%:100 |
| Automatisering-signaal | 10% | 100 als `maandelijksSparen > 0`, anders 0 |

Weighted result afgerond op geheel getal, clamp [1..100]. (1 als minimum voor UX — 0 lijkt op "error".)

### Kleuring
- Score < 40 → rood (Vaten zijn leeg)
- 40 ≤ score < 70 → amber (Je ketel staat aan, er moet nog gebrouwen worden)
- ≥ 70 → groen (Goed op weg, laat het rijpen)

## Compound-projectie

```
toekomstigeWaarde(P, r, n) = P * ((1+r)^n - 1) / r
```
- `P` = `maandelijksSparen` * 12 (jaarinleg)
- `r` = 0.06 (6% reëel, conservatief)
- `n` = jaren (10, 20, 30)

Include `huidigSpaargeld * (1+r)^n` (startkapitaal laten rijpen).

**Ref-cases (unit tests):**
| maandInleg | huidig | 30 jaar (r=0.06) | Verwacht ≈ |
|---|---|---|---|
| 150 | 0 | 30 | €150.000 |
| 300 | 5.000 | 30 | €330.000 |
| 0 | 10.000 | 20 | €32.000 |

## Potje-advies (50/30/20 + afwijking)

```
benchmark = {
  vasteLasten: 0.50 * netInkomen,
  leven:       0.30 * netInkomen,
  brouwen:     0.20 * netInkomen,
}
delta = actueel - benchmark    // positief = meer dan benchmark
```

**Output:** drie potjes, per potje de actuele verdeling + benchmark + de delta in €, en een korte tekst uit brand voice ("Je vaste-lastenpot zit te vol — daar zit je eerste winst.").

## 3 concrete acties — generator

Kies de 3 assen met laagste score en map naar actie-kaarten:

| Zwakke as | Actie |
|---|---|
| spaarquote <40 | "Zet vandaag een automatische €50/mnd in een aparte Brouwen-rekening." |
| vasteLastenRatio <40 | "Scan je abonnementen. 1 op de 3 Nederlanders vindt binnen 10 minuten €40/mnd." |
| bufferMaanden <40 | "Bouw een noodfonds op van minimaal 3 maanden vaste lasten." |
| schuldenRatio <40 | "Maak een schuldenplan volgens de lawine-methode (hoogste rente eerst)." |
| automatisering==0 | "Stel de Automatische Brouwerij in: overboeking op dag na salaris." |

## Reken-hygiëne
- Alle amounts **in EUR integer (centen optioneel)** — geen Infinity, geen NaN lekken.
- Negatieve inputs clampen naar 0, log een `invalidField` array maar toon vriendelijke fout.
- `netInkomenMaand === 0` → score undefined, toon "Voeg je inkomen toe om te brouwen."

## Unit-test scaffold
Zie `app/src/lib/brouwketel/__tests__/`. Ref-cases:
```ts
const LISA = { netInkomenMaand: 4500, vasteLastenMaand: 2400, levenMaand: 1800, huidigSpaargeldTotal: 1500, maandelijksSparen: 0, schuldenTotal: 6000, gezin: "gezin" };
// expect(score(LISA)).toBeLessThan(40)

const MARK = { netInkomenMaand: 5200, vasteLastenMaand: 2100, levenMaand: 1600, huidigSpaargeldTotal: 8000, maandelijksSparen: 300, schuldenTotal: 0, gezin: "partner" };
// expect(score(MARK)).toBeBetween(55, 75)

const SANNE = { netInkomenMaand: 2800, vasteLastenMaand: 1300, levenMaand: 750, huidigSpaargeldTotal: 6000, maandelijksSparen: 350, schuldenTotal: 0, gezin: "alleen" };
// expect(score(SANNE)).toBeGreaterThan(75)
```
