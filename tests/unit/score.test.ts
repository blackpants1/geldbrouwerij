import { describe, it, expect } from "vitest";
import { berekenBrouwketel } from "@/lib/brouwketel/score";
import type { BrouwketelInput } from "@/lib/brouwketel/types";

const LISA: BrouwketelInput = {
  netInkomenMaand: 4500,
  vasteLastenMaand: 2400,
  levenMaand: 1800,
  huidigSpaargeldTotal: 1500,
  maandelijksSparen: 0,
  schuldenTotal: 6000,
  gezin: "gezin",
};

const MARK: BrouwketelInput = {
  netInkomenMaand: 5200,
  vasteLastenMaand: 2100,
  levenMaand: 1600,
  huidigSpaargeldTotal: 8000,
  maandelijksSparen: 300,
  schuldenTotal: 0,
  gezin: "partner",
};

const SANNE: BrouwketelInput = {
  netInkomenMaand: 2800,
  vasteLastenMaand: 1300,
  levenMaand: 750,
  huidigSpaargeldTotal: 6000,
  maandelijksSparen: 350,
  schuldenTotal: 0,
  gezin: "alleen",
};

describe("berekenBrouwketel", () => {
  it("Lisa case scores rood (<40)", () => {
    const r = berekenBrouwketel(LISA);
    expect(r.score).toBeLessThan(40);
    expect(r.kleur).toBe("rood");
    expect(r.acties).toHaveLength(3);
  });

  it("Mark case scores amber-to-green (≥55)", () => {
    const r = berekenBrouwketel(MARK);
    expect(r.score).toBeGreaterThanOrEqual(55);
    expect(r.score).toBeLessThanOrEqual(95);
  });

  it("Sanne case scores groen (>=70)", () => {
    const r = berekenBrouwketel(SANNE);
    expect(r.score).toBeGreaterThanOrEqual(70);
    expect(r.kleur).toBe("groen");
  });

  it("clamps score to [1,100]", () => {
    const zeros: BrouwketelInput = {
      netInkomenMaand: 1000,
      vasteLastenMaand: 5000,
      levenMaand: 2000,
      huidigSpaargeldTotal: 0,
      maandelijksSparen: 0,
      schuldenTotal: 50000,
      gezin: "alleen",
    };
    const r = berekenBrouwketel(zeros);
    expect(r.score).toBeGreaterThanOrEqual(1);
    expect(r.score).toBeLessThanOrEqual(100);
  });

  it("does not NaN on zero income", () => {
    const r = berekenBrouwketel({
      netInkomenMaand: 0,
      vasteLastenMaand: 0,
      levenMaand: 0,
      huidigSpaargeldTotal: 0,
      maandelijksSparen: 0,
      schuldenTotal: 0,
      gezin: "alleen",
    });
    expect(Number.isFinite(r.score)).toBe(true);
    expect(r.score).toBeGreaterThanOrEqual(1);
  });

  it("sanitizes negative input to zero", () => {
    const r = berekenBrouwketel({
      netInkomenMaand: -1000,
      vasteLastenMaand: -200,
      levenMaand: -100,
      huidigSpaargeldTotal: -5000,
      maandelijksSparen: -50,
      schuldenTotal: -1000,
      gezin: "alleen",
    });
    expect(Number.isFinite(r.score)).toBe(true);
  });

  it("potjes benchmark is 50/30/20 of inkomen", () => {
    const r = berekenBrouwketel(MARK);
    expect(r.potjes.benchmark.vasteLasten).toBeCloseTo(MARK.netInkomenMaand * 0.5);
    expect(r.potjes.benchmark.leven).toBeCloseTo(MARK.netInkomenMaand * 0.3);
    expect(r.potjes.benchmark.brouwen).toBeCloseTo(MARK.netInkomenMaand * 0.2);
  });

  it("3 unique acties gegenereerd", () => {
    const r = berekenBrouwketel(LISA);
    const uniq = new Set(r.acties);
    expect(uniq.size).toBe(r.acties.length);
  });

  it("automatisering=0 als geen maandelijks sparen", () => {
    const r = berekenBrouwketel(LISA);
    expect(r.assen.automatisering).toBe(0);
  });

  it("automatisering=100 als wel maandelijks sparen", () => {
    const r = berekenBrouwketel(MARK);
    expect(r.assen.automatisering).toBe(100);
  });
});
