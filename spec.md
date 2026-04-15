# spec.md — De Geldbrouwerij

**Stakeholder:** Roy Brouwer (Brouwmeester)
**Doel:** Productie-klaar launch-platform voor De Geldbrouwerij. Focus op **Fase 1 MVP**: marketing site + gratis Brouwketel tool + lead capture + content scaffolding. Platform/auth/cursus/community volgen als Fase 2.

---

## 1. Goals

### Primair (launch-kritisch)
1. **Merk live zetten** — branded marketing site met alle brand-tokens (kleuren, fonts, toon, Brouwtaal) uit `de-geldbrouwerij-definitief.md` §17 en de brand-guide HTML.
2. **Brouwketel werkt** — gratis financiële tool die in 5 minuten de "röntgenfoto" geeft: geldstroom, Brouw-score 1–100, toekomstprojectie, en concrete adviezen.
3. **Lead-capture draait** — elk Brouwketel-resultaat + nieuwsbrief-signup wordt vastgelegd; welkomstmail via Resend (stubbed in dev, productie-ready).
4. **Marketing-pagina's compleet** — `/`, `/brouwproces`, `/diensten`, `/over`, `/brouwavond`, `/tap` (blog index), `/404`.
5. **SEO & performance** — metadata, OG-tags, sitemap, robots, Lighthouse ≥90 op Performance/SEO/Accessibility voor de homepage.
6. **Mobile-first** — alles werkt vanaf 360px tot 1920px.

### Secundair (nice-to-have, niet blokkerend)
- Blog MDX scaffolding (De Tap) met voorbeeldpost.
- Booking-embed voor Brouwavond (Cal.com link-out).
- Analytics hook (Plausible script slot).

### Expliciet **buiten scope** (Fase 2)
- Clerk auth, /platform shell, Convex backend, Stripe checkout, cursus-video, community/Tapkamer, live sessies. De architectuur reserveert wel de routes (`/platform/*`) en documenteert het.

---

## 2. Tech Stack (gekozen)

| Laag | Keuze | Reden |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + TypeScript | SEO, ISR, Server Actions |
| Styling | **Tailwind v4** + CSS variables voor brand-tokens | Vibe-code speed + consistentie |
| Fonts | Fraunces (serif koppen) + Inter (body) | Warm serif × schone sans per §17 |
| Iconen | lucide-react | Lightweight, consistent |
| Charts | Recharts | Voor Brouwketel resultaat-visualisaties |
| Email (alles) | **Resend** — transactional, notificaties én marketing (nurture + Brouwboek) | Unified provider, 3k/mnd gratis, React-email templates, audiences voor nieuwsbrief |
| Lead storage (dev/MVP) | Lokaal JSON-bestand in `.data/` | Zero-setup, migrate naar Convex in Fase 2 |
| Hosting | Vercel (via GitHub) | Gratis tier voldoende |
| Domein | geldbrouwerij.nl (Hostinger DNS → Vercel) | Al in bezit |
| Mail-zender | `dev@geldbrouwerij.nl` (Hostinger SMTP) als fallback; Resend verified domain voor productie | — |
| Tests | Playwright (E2E) + Vitest (unit voor Brouwketel-logica) | Dekkend en snel |

---

## 3. Informatie-architectuur

```
/                    Homepage — hero, brouwproces-teaser, brouwketel-CTA, diensten-grid, social proof, nieuwsbrief
/brouwproces         Deep-dive Het Brouwproces™ (5 stappen)
/diensten            Alle producten (Brouwavond, Check-up, Brouwtraject, Werkgeversworkshop, Platform teaser)
/over                Over Roy — De Brouwmeester
/brouwavond          Brouwavond + Gezinseditie details + booking
/tap                 Blog index (MDX)
/tap/[slug]          Blog post
/brouwketel          De gratis tool (wizard + resultaat)
/bedankt             Post-conversie thank-you
/privacy             Privacybeleid
/voorwaarden         Algemene voorwaarden + disclaimer §18
/404                 "Oeps, dit vat is leeg."

/platform/*          GERESERVEERD voor Fase 2 (auth wall)
```

---

## 4. De Brouwketel — functionele spec

**Input-wizard** (5 stappen, progress bar):
1. **Stap 1 – Inkomen:** netto maandinkomen (jij + partner), gezinssituatie.
2. **Stap 2 – Vaste lasten:** huur/hypotheek, energie, verzekeringen, abonnementen, transport.
3. **Stap 3 – Leven:** boodschappen, uitgaan, hobby's.
4. **Stap 4 – Sparen & schulden:** huidig spaargeld, maandelijks sparen, schulden (excl. hypotheek).
5. **Stap 5 – E-mail capture:** naam + e-mail om resultaat te ontvangen (verplicht om resultaat te zien).

**Output-resultaat:**
- **Geldstroom-visualisatie** — Sankey-achtig of horizontale staven: Inkomen → Vaste Lasten / Leven / Brouwen.
- **Brouw-score (1–100):** gewogen score op 5 assen — spaarquote (40%), vaste-lasten-ratio (20%), buffer-in-maanden (20%), schuldenratio (10%), automatisering-signaal (10%). Kleuring: <40 rood, 40–70 amber, >70 groen.
- **Potje-advies** — 50/30/20 benchmark + persoonlijke afwijking.
- **Compound projectie** — als je huidige spaarbedrag 30 jaar laat rijpen @ 6% reëel: bedrag over 10/20/30 jaar.
- **3 concrete acties** — gegenereerd uit de zwakste assen.
- **CTA's:** "Probeer het platform 30 dagen voor €1" + "Boek een Brouwavond" + "Download je resultaat (PDF later)".

**Bereken-functies** (pure, testbaar in `lib/brouwketel/`):
- `berekenBrouwScore(input) → {score, assen, zwakstePunten}`
- `compoundProjection(maandelijkseInleg, jaren, rendement) → number`
- `potjesAdvies(inkomen, vasteLasten, leven, brouwen) → {huidig, benchmark, deltas}`

**Privacy:** geen sensitieve data (geen IBAN, geen exacte saldi vereist). Rekenen client-side, alleen resultaat + e-mail naar server.

---

## 5. Brand implementatie (vast)

Kleuren als CSS custom properties in `app/globals.css`:
```css
--bg-groen: #1B3A2D;   /* primair */
--koper:    #C78C4E;   /* accent, knoppen */
--creme:    #F5F0E8;   /* lichte achtergrond */
--schuim:   #FEFCF7;   /* body bg */
--hout:     #3D2B1F;   /* tekst */
--hop:      #E8B84B;   /* succes / badges */
--rood:     #C0392B;   /* waarschuwing */
--groen-ok: #27AE60;   /* positief */
```

Typografie: `font-display: 'Fraunces'` voor h1–h3, `font-sans: 'Inter'` voor body.
Tone-of-voice per §13: je/jij, korte zinnen, nuchter-warm. CTA's uit §15 (bv. "Gooi je cijfers in de Brouwketel").

---

## 6. Verification — hoe we bewijzen dat het werkt

### 6.1 Acceptatiecriteria per onderdeel
| # | Criterium | Bewijs |
|---|---|---|
| A1 | Homepage laadt onder 1s lokaal | `curl` + Lighthouse report |
| A2 | Alle nav-links resolven (200) | Playwright sweep test |
| A3 | Brouwketel wizard rondloopt in 5 stappen | Playwright `tests/brouwketel.spec.ts` |
| A4 | Brouw-score berekening klopt op ref-cases | Vitest `tests/lib/score.test.ts` |
| A5 | Compound-functie klopt op 6 ref-punten | Vitest `tests/lib/compound.test.ts` |
| A6 | E-mail-capture schrijft een lead (MVP: lokaal JSON) | Playwright + filesystem assert |
| A7 | 404 pagina toont brand-copy "Oeps, dit vat is leeg" | Playwright |
| A8 | `next build` passes zonder errors | CI-command |
| A9 | `tsc --noEmit` passes | CI-command |
| A10 | Responsive: geen horizontaal scroll op 360px | Playwright viewport test |
| A11 | Merk-tokens: primaire knop is Koper op Brouwerij Groen | Visual snapshot test |
| A12 | SEO: elke pagina heeft unieke `<title>` en `<meta description>` | Playwright head-assertion |

### 6.2 Loop-regel
Na elke meaningful commit: `npm run verify` (= `lint && typecheck && test && e2e`). We loopen tot alles groen is. Elke ~20 iteraties: fresh sub-agent review ("spec.md vs implementatie — vind gaten").

---

## 6.3 E-mail architectuur (Resend)

Alles loopt via **Resend** — geen Loops.so, geen Mailgun, geen Hostinger SMTP in applicatieflow.

- **React Email templates** in `emails/` (renderbaar in Resend én previewbaar via `react-email preview`).
- **Templates:**
  - `welcome-brouwketel.tsx` — direct na Brouwketel-invulling, met samenvatting + link naar volledig resultaat.
  - `nurture-1..4.tsx` — 4-mail welkomstreeks (dag 0, 2, 5, 9).
  - `nieuwsbrief-brouwboek.tsx` — wekelijkse Brouwboek-editie, compatibel met Resend Broadcasts.
  - `brouwavond-bevestiging.tsx`, `check-up-bevestiging.tsx` — transactional.
  - `admin-lead-notification.tsx` — intern naar `dev@geldbrouwerij.nl` bij elke nieuwe lead.
- **Audiences (marketing):** één audience `brouwmaatjes` voor Brouwboek; contacts gesynced via Resend API bij email-opt-in.
- **From-adressen:**
  - transactional: `Brouwmeester Roy <roy@geldbrouwerij.nl>`
  - marketing/nieuwsbrief: `Het Brouwboek <brouwboek@geldbrouwerij.nl>`
- **Env-vars:** `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `RESEND_FROM_TX`, `RESEND_FROM_NEWSLETTER`.
- **Dev-fallback:** als `RESEND_API_KEY` ontbreekt, log gerenderde HTML naar `.data/email-outbox/*.html` — géén echte verzending.

## 7. Non-goals voor deze sessie
- Geen productie-deploy naar Vercel (dat doet de user wanneer tevreden).
- Geen echte Resend API-key integratie (stub + env-var ready; user vult in).
- Geen Stripe (Fase 2).
- Geen auth (Fase 2).

---

## 8. Risico's + mitigatie
| Risico | Mitigatie |
|---|---|
| Scope-creep naar platform/auth | Expliciet Fase 2 geparkeerd; routes wel gereserveerd |
| Brouwketel-logica onjuist | Unit tests op pure functies met bekende casussen |
| Merk voelt generiek | Design system eerst opzetten vóór pagina's |
| Performance kelderd door fonts/charts | Fraunces variable subset + Recharts lazy-load |
