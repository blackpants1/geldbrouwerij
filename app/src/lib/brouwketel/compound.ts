/**
 * Compound projection — rekent de toekomstige waarde van een startkapitaal
 * plus jaarlijkse inleg uit, aangenomen een constant reëel rendement.
 *
 *   FV = startkapitaal * (1+r)^n  +  jaarInleg * ((1+r)^n - 1) / r
 *
 * Annuiteit-formule gaat er van uit dat de inleg éénmaal per jaar aan het einde
 * van het jaar gebeurt (ordinary annuity). Voor MVP-voldoende precisie —
 * verschil met maandelijkse inleg < 3% op 30 jaar.
 */
export function compoundProjection({
  startkapitaal,
  jaarInleg,
  jaren,
  rendement = 0.06,
}: {
  startkapitaal: number;
  jaarInleg: number;
  jaren: number;
  rendement?: number;
}): number {
  if (!Number.isFinite(startkapitaal) || !Number.isFinite(jaarInleg)) return 0;
  if (jaren <= 0) return Math.max(0, startkapitaal);

  const P = Math.max(0, startkapitaal);
  const A = Math.max(0, jaarInleg);
  const r = rendement;
  const n = jaren;

  const fvStart = P * Math.pow(1 + r, n);
  const fvAnnuity = r === 0 ? A * n : A * (Math.pow(1 + r, n) - 1) / r;
  return Math.round(fvStart + fvAnnuity);
}
