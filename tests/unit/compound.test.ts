import { describe, it, expect } from "vitest";
import { compoundProjection } from "@/lib/brouwketel/compound";

describe("compoundProjection", () => {
  it("€150/mnd over 30 jaar @6% ≈ €150.000", () => {
    const fv = compoundProjection({
      startkapitaal: 0,
      jaarInleg: 150 * 12,
      jaren: 30,
    });
    expect(fv).toBeGreaterThan(130_000);
    expect(fv).toBeLessThan(175_000);
  });

  it("€300/mnd + €5.000 start over 30 jaar ≈ €300.000-360.000", () => {
    const fv = compoundProjection({
      startkapitaal: 5000,
      jaarInleg: 300 * 12,
      jaren: 30,
    });
    expect(fv).toBeGreaterThan(290_000);
    expect(fv).toBeLessThan(360_000);
  });

  it("€10.000 start over 20 jaar @6% ≈ €32.000", () => {
    const fv = compoundProjection({
      startkapitaal: 10_000,
      jaarInleg: 0,
      jaren: 20,
    });
    expect(fv).toBeGreaterThan(30_000);
    expect(fv).toBeLessThan(34_000);
  });

  it("nul jaar = startkapitaal terug", () => {
    expect(compoundProjection({ startkapitaal: 5000, jaarInleg: 1200, jaren: 0 })).toBe(5000);
  });

  it("0% rendement werkt (geen divide by zero)", () => {
    const fv = compoundProjection({
      startkapitaal: 1000,
      jaarInleg: 1200,
      jaren: 10,
      rendement: 0,
    });
    expect(fv).toBe(13_000);
  });

  it("negatieve inputs geven geen NaN", () => {
    const fv = compoundProjection({
      startkapitaal: -100,
      jaarInleg: -50,
      jaren: 10,
    });
    expect(Number.isFinite(fv)).toBe(true);
    expect(fv).toBe(0);
  });
});
