# todo.md — De Geldbrouwerij

## Fase 1 — Marketing site + Brouwketel ✅
Zie eerdere commits. Homepage, /brouwproces, /diensten, /over, /brouwavond, /tap (+3 posts), /privacy, /voorwaarden, /bedankt, /brouwketel (5-step wizard + score + projectie + acties), 404, sitemap, robots, SEO per-route. 16 unit + 20 E2E tests groen.

## Fase 2 — Werkend lokaal platform ✅
- [x] Magic-link auth via Resend (jose JWT, signed cookie, 30 dagen)
- [x] `/aanmelden` — naam + email signup
- [x] `/inloggen` — magic-link flow met dev-mode direct-link
- [x] `/api/auth/verify` — token verificatie, auto-upsert user, koppelt bestaande Brouwketel-invullingen
- [x] `proxy.ts` beschermt `/platform/*`
- [x] `/platform` dashboard — 3 dashcards, historie, welkomst-CTA
- [x] `/platform/brouwketel` Pro — historie, scorelijn-chart, stats
- [x] `/platform/cursus` Het Brouwrecept — 7 modules met lessen + voortgangsbalk + afvinken
- [x] `/platform/tapkamer` — 7 kanalen, posts, likes, comments
- [x] `/platform/tapkamer/[id]` — post detail + comments
- [x] `/platform/account` — profiel bewerken, verwijderen
- [x] Header toont login/platform-knop afhankelijk van auth
- [x] File-backed store (users, posts, comments, brouwketel-records, cursus-progress)
- [x] 3 nieuwe E2E tests voor platform flow
- [x] 22 E2E tests groen (desktop + mobile)
- [x] Build: 23 routes, alle pagina's renderen

## Openstaand — niet-code (jij of latere sessie)
- [ ] Mailboxen in Hostinger hPanel: `roy@`, `brouwboek@`, `noreply@` (API ondersteunt dit niet — handmatig via panel) ✅ jij al gedaan
- [ ] **GitHub/Convex/Clerk account aanmaken** → CAPTCHA blokkeert Playwright-bot. Moet handmatig door jou (eenmalig). Na login vult `.env.local` zich met keys.
- [ ] Resend account + domain-verification — DNS records kan ik via Hostinger API zetten
- [ ] Stripe account — KYC vereist jouw identiteit (IBAN, KvK)
- [ ] Vercel deploy (later, na SaaS-setup)

## Fase 3 — Swap local → Convex (later, wanneer accounts er zijn)
De `src/lib/db/store.ts` is één file die je 1:1 vervangt door Convex-clients. Consumers (platform pages, server actions) blijven ongewijzigd. Clerk `<ClerkProvider>` wrapt `app/layout.tsx` en `readSession` wordt Clerk's `auth()`. Rest van de code blijft.

## Fase 4 — Stripe betalen (later)
Platform Trial €1/30 dagen → €19,95/mnd, €49/kwartaal, €179/jaar. Brouwavond €29, Gezinseditie €39, Check-up €97, Brouwtraject €197×3, Werkgeversworkshop €597. Zie `.claude/agents/stripe-payments.md` voor het plan.
