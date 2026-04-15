# De Geldbrouwerij

Productie-klare launch-site, platform met auth, community en cursus.
Next.js 16 · React 19 · Tailwind v4 · Clerk · Convex · Resend · TypeScript.

> Brouw aan je financiële vrijheid. — Roy Brouwer

**Repo:** [github.com/blackpants1/geldbrouwerij](https://github.com/blackpants1/geldbrouwerij)

---

## Start lokaal

```bash
git clone https://github.com/blackpants1/geldbrouwerij.git
cd geldbrouwerij/app
cp .env.example .env.local    # vraag Roy voor de echte keys
npm install
npm run dev                    # → http://localhost:3000
```

Parallel in een tweede terminal, als je backend-changes maakt:

```bash
cd app
npx convex dev                 # watches convex/*.ts en deployed naar cloud
```

## Scripts

| Commando | Wat |
|---|---|
| `npm run dev` | Dev-server |
| `npm run build` | Productie-build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-check |
| `npm test` | Vitest unit tests (Brouwketel math) |
| `npm run e2e` | Playwright end-to-end (publiek) |
| `npm run verify` | Full pipeline |

## Architectuur

```
┌──────────────────────────────────────────────────┐
│                   VERCEL (later)                 │
│               Next.js 16 · Turbopack             │
├──────────────────────────────────────────────────┤
│                                                  │
│   Marketing                   Platform (auth)    │
│   ──────────                  ───────────────    │
│   /                           /platform          │
│   /brouwproces                /platform/…        │
│   /diensten                     dashboard        │
│   /brouwavond                   brouwketel-pro   │
│   /brouwketel (Brouw-score)     cursus           │
│   /over   /tap   /privacy       tapkamer         │
│   /voorwaarden                  account          │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│   CLERK                       CONVEX             │
│   ─────                       ──────             │
│   sign-in / sign-up (NL)      users              │
│   sessie + JWT                brouwketelRecords  │
│   user management             posts + comments   │
│                               cursusProgress     │
│                               (real-time ready)  │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│   RESEND                      HOSTINGER          │
│   ──────                      ─────────          │
│   transactional + nieuwsbrief DNS (API)          │
│   React Email templates       Domein: geldbrouwerij.nl
│   audience 'brouwmaatjes'     Mailboxen (UI)     │
│                                                  │
└──────────────────────────────────────────────────┘
```

## Structuur

```
/spec.md                     # Hard spec + verificatie
/todo.md                     # Running to-do list
/tests/                      # E2E + unit tests
/scripts/
  hostinger-setup.mjs        # (bijna-deprecated, mailbox via UI)
  resend-dns.mjs             # Resend DNS auto-configure via Hostinger API
/.claude/                    # Project-skills + 13 custom agents
/app/                        # Next.js app (src/ app router)
  convex/                    # Convex schema + functions
    schema.ts
    users.ts brouwketel.ts posts.ts comments.ts cursus.ts
    auth.config.ts           # Clerk issuer-koppeling
  src/
    app/                     # App Router routes
      (public, /platform/*, /api/*)
    components/
      brand/ layout/ ui/ sections/ platform/ forms/ providers/
      brouwketel/            # Wizard + result + currency input
    lib/
      db/store.ts            # Convex data-laag (alle queries/mutations)
      auth/session.ts        # Clerk → lokale Session mapping
      brouwketel/            # Pure scoring + compound (met tests)
      resend.ts              # Resend wrapper + dev-fallback
    emails/                  # React Email templates (5 stuks)
    content/                 # site copy, cursus modules, kanalen
```

## SaaS-accounts

| Service | Status | Account |
|---|---|---|
| **GitHub** | ✅ live | `blackpants1` · repo public |
| **Resend** | ✅ live | dev@geldbrouwerij.nl · domein in verificatie |
| **Clerk** | ✅ live | dev@geldbrouwerij.nl · app "De Geldbrouwerij" |
| **Convex** | ✅ live | team `clickwave` · project `geldbrouwerij` · deployment `brilliant-parakeet-873` |
| **Hostinger** | ✅ live | DNS via API, mailboxen via hpanel-UI |
| **Stripe** | ⏳ later | KYC vereist (IBAN + KvK + ID) |
| **Vercel** | ⏳ later | `vercel login` + deploy wanneer je zover bent |

## Dev-keys in `app/.env.local`

`.env.local` staat in `.gitignore`. Kopieer `.env.example`, vul in, start.

Bij productie: zet dezelfde keys in Vercel dashboard (Production + Preview).

## Jouw openstaande taken (~10 minuten totaal)

### 1. Mailboxen aanmaken (Hostinger hpanel)
API ondersteunt mailbox-beheer niet. Handmatig:
- https://hpanel.hostinger.com → E-mail → geldbrouwerij.nl → Maak aan:
  - `roy@geldbrouwerij.nl`
  - `brouwboek@geldbrouwerij.nl`
  - `noreply@geldbrouwerij.nl`

### 2. Hostinger API-token roteren
Een oude token stond tijdelijk in de repo (zie security commit). Rotatie:
- https://hpanel.hostinger.com → Profiel → Developer / API Keys → Revoke oud + generate new
- Update `HOSTINGER_API_TOKEN` in `app/.env.local`

### 3. Resend domein verifiëren (~15-30 min DNS wachttijd)
DNS is ingesteld via API. Resend checkt automatisch. Zodra status "verified":
```bash
curl -s https://api.resend.com/domains -H "Authorization: Bearer $RESEND_API_KEY"
```
Dan update `app/.env.local`:
```
RESEND_FROM_TX="Roy van De Geldbrouwerij <roy@geldbrouwerij.nl>"
RESEND_FROM_NEWSLETTER="Het Brouwboek <brouwboek@geldbrouwerij.nl>"
```

### 4. Later — Stripe
Zie `.claude/agents/stripe-payments.md` voor prijzen en KYC-plan.

### 5. Later — Vercel deploy
```bash
cd app
npx vercel login        # interactieve auth
npx vercel              # link naar nieuw project
npx vercel --prod       # deploy
```
Daarna env-vars zetten in Vercel dashboard en `geldbrouwerij.nl` koppelen.

## De AI-ploeg

`.claude/` bevat 4 skills + 13 agents (Next.js, Convex, Clerk, Stripe, Resend,
CMO, Copywriter, Financial-Auditor, UI-Polish, CRO, SEO, QA, DevOps). Zie
`.claude/README.md` voor de mapping.

---

*Als het niet klinkt alsof het uit een Geldbrouwerij komt, brouw het opnieuw.*
