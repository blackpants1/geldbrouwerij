# todo.md — De Geldbrouwerij

## ✅ Klaar

### Fase 1 — Marketing + Brouwketel
Homepage, /brouwproces, /diensten, /over, /brouwavond, /tap (+3 posts),
/privacy, /voorwaarden, /bedankt, /brouwketel, 404. De Brouwketel: 5-step
wizard, Brouw-score 1-100, potjes, 30-jaars compound projectie, acties.
16 unit + 20 E2E tests groen.

### Fase 2 — Platform
Clerk auth (NL-gelokaliseerd, brand-gethemed), /aanmelden, /inloggen,
middleware `/platform/*` beschermd. /platform dashboard + Brouwketel Pro +
Het Brouwrecept (7 modules) + Tapkamer (7 kanalen, posts, likes, comments)
+ Account.

### Backend
- **Convex** project `geldbrouwerij` (team `clickwave`, deployment
  `brilliant-parakeet-873`). Schema + 8 indexes + 5 function modules
  (users, brouwketel, posts, comments, cursus).
- **ConvexProviderWithClerk** voor real-time client subscriptions (Fase 2.1
  klaar om in te schakelen).
- **auth.config.ts** koppelt Clerk JWT template aan Convex.

### E-mail
- **Resend** account, API-key (geroteerd na GitGuardian-alert), audience
  `brouwmaatjes`, 3 DNS records auto-geplaatst via Hostinger API, domein
  in AWS-SES verify-queue.
- **React Email** templates: welcome-brouwketel, admin-notification,
  nieuwsbrief-opt-in, layout.

### Integraties
- **Hostinger DNS** via API (automatiseerbaar).
- **Clerk → Convex** JWT template "convex" aangemaakt.
- **Mailboxen** actief: dev@, roy@, brouwboek@, noreply@ @geldbrouwerij.nl.

### AI-ploeg
`.claude/` — 4 skills + 13 custom agents (nextjs, convex, clerk, stripe,
resend, cmo, copywriter, financial-auditor, ui-polish, cro, seo, qa, devops).

### Git
Repo `github.com/blackpants1/geldbrouwerij` — 4 commits, public, gepushed
via PAT (in macOS keychain opgeslagen).

---

## 🔵 Wachten (automatisch)

- **Resend domain verification** — DNS records staan in Hostinger, AWS-SES
  verifier polt periodiek. Binnen 15-30 min flipt status naar "verified".
  Check: `curl https://api.resend.com/domains -H "Authorization: Bearer $RESEND_API_KEY"`
  Daarna in `app/.env.local` de `RESEND_FROM_TX` en `RESEND_FROM_NEWSLETTER`
  omzetten naar `roy@geldbrouwerij.nl` / `brouwboek@geldbrouwerij.nl`.

---

## 🟡 Jouw handmatige stappen

1. **Hostinger API-token roteren** — oude token stond tijdelijk in de repo
   (scripts). Nieuwe genereren in hpanel.hostinger.com → Profiel → Developer,
   dan `HOSTINGER_API_TOKEN` updaten in `app/.env.local`.

---

## 🟢 Fase 3 — Later

- **Stripe** (KYC vereist: IBAN, KvK, ID):
  - Platform Trial €1/30 dagen → €19,95/mnd · €49/kwartaal · €179/jaar
  - One-off: Brouwavond €29, Gezinseditie €39, Check-up €97,
    Werkgeversworkshop €597
  - Zie `.claude/agents/stripe-payments.md`
- **Vercel deploy**:
  - `cd app && npx vercel login` → OAuth via browser (jij doet eenmalig)
  - `npx vercel` → link nieuw project
  - Env-vars kopiëren naar Vercel dashboard
  - DNS `A @ 76.76.21.21` + `CNAME www cname.vercel-dns.com` via Hostinger API
- **Realtime Tapkamer** — ConvexProviderWithClerk is al gewired; enkel
  `useQuery(api.posts.list)` in client component wisselen voor real-time.
- **Cursus video** — Mux/Bunny integratie voor Het Brouwrecept lessen.
- **Analytics** — Plausible snippet in `app/layout.tsx` (env-var gereed).
- **Error tracking** — Sentry (zie `.claude/agents/devops-deploy.md`).
- **Wekelijkse Brouwboek scheduler** — Convex cron + Resend broadcasts.
