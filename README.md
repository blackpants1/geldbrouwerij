# De Geldbrouwerij

Productie-klare launch-site + gratis **Brouwketel** tool.
Next.js 16 · React 19 · Tailwind v4 · Resend · TypeScript.

> Brouw aan je financiële vrijheid. — Roy Brouwer

## Start lokaal

```bash
cd app
cp .env.example .env.local    # vul Resend-keys in (mag ook leeg blijven: dev-fallback schrijft mails naar .data/email-outbox/)
npm install
npm run dev
```

Site draait op http://localhost:3000.

## Scripts

| Commando | Wat |
|---|---|
| `npm run dev` | Dev-server |
| `npm run build` | Productie-build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript-check |
| `npm test` | Vitest unit-tests (Brouwketel math) |
| `npm run e2e` | Playwright end-to-end tests |
| `npm run verify` | Lint + typecheck + test + e2e |
| `npm run email:preview` | React-Email preview op :3001 |

## Structuur

```
/spec.md                     # De harde spec voor deze MVP
/todo.md                     # Running to-do list
/tests/                      # E2E + unit tests
/scripts/                    # Hostinger DNS utilities
/.claude/                    # Project-skills + 12 custom agents
  /skills/brand-voice        # Dutch copy rules + Brouwtaal
  /skills/brouwketel-math    # Canonieke formules
  /skills/resend-email       # Email architectuur
  /skills/content-calendar   # Content rubrieken
  /agents/*                  # Nextjs, Convex, Clerk, Stripe, Resend, CMO, CRO, SEO, QA, UI, DevOps, Copywriter
/app/                        # Next.js app (src/ app router)
```

## Wat er live is (Fase 1 MVP)

- ✅ Marketing: `/`, `/brouwproces`, `/diensten`, `/over`, `/brouwavond`, `/tap` (+ 3 blog posts), `/privacy`, `/voorwaarden`, `/bedankt`, `404`.
- ✅ **De Brouwketel** — 5-step wizard, Brouw-score 1-100, geldstroom-viz, 30-jaars compound-projectie, 3 actiekaarten.
- ✅ Newsletter opt-in (header + footer + secties), Brouwketel lead-capture.
- ✅ Resend-integratie (transactional + nieuwsbrief), React Email templates (welcome-brouwketel, admin-notification, nieuwsbrief-opt-in, layout).
- ✅ Dev-fallback: zonder `RESEND_API_KEY` schrijft `sendEmail` HTML naar `.data/email-outbox/`.
- ✅ Lokale lead-store in `.data/leads.json` (migreren naar Convex in Fase 2).
- ✅ SEO: per-page titel/description, sitemap.xml, robots.txt, OpenGraph defaults.
- ✅ Mobile-first — getest 360px–1440px, geen horizontale scroll.
- ✅ 56 tests (16 unit + 40 E2E × 2 viewports) — allemaal groen.

## Wat jij nog even moet doen (1× ~5 minuten)

### A. Mailboxen in Hostinger hPanel aanmaken
De Hostinger REST API ondersteunt geen mailbox-management — dit kan alleen via de UI.

1. Log in op https://hpanel.hostinger.com
2. Ga naar **E-mail → geldbrouwerij.nl**
3. Maak aan:
   - `roy@geldbrouwerij.nl` — transactional + reply-to
   - `brouwboek@geldbrouwerij.nl` — nieuwsbrief `From:`
   - `noreply@geldbrouwerij.nl` — (optioneel) system notifications
4. Sla wachtwoorden op in je password manager.

### B. Resend account + domein verifiëren
1. Maak een Resend account op https://resend.com
2. Voeg `geldbrouwerij.nl` toe als sending domain.
3. Resend geeft je 3 CNAME + 1 MX + 1 TXT record. **Zeg het me** — ik kan ze via de Hostinger DNS API in één klap zetten:
   ```bash
   HOSTINGER_API_TOKEN=xxx node scripts/hostinger-dns-resend.mjs
   ```
   (Dat script maak ik zodra je de Resend-waarden hebt.)
4. Maak een Audience in Resend, noem 'em `brouwmaatjes`, kopieer `audience_id`.
5. Vul `.env.local`:
   ```
   RESEND_API_KEY=re_...
   RESEND_AUDIENCE_ID=aud_...
   RESEND_FROM_TX="Roy van De Geldbrouwerij <roy@geldbrouwerij.nl>"
   RESEND_FROM_NEWSLETTER="Het Brouwboek <brouwboek@geldbrouwerij.nl>"
   RESEND_ADMIN_EMAIL="dev@geldbrouwerij.nl"
   ```

### C. Deploy naar Vercel
1. Push `/Users/roy/geldbrouwerij/app` naar GitHub.
2. Import in Vercel — framework wordt automatisch Next.js 16.
3. Vul env-vars in Vercel dashboard (Production + Preview).
4. Voeg `geldbrouwerij.nl` toe aan Vercel → Domains.
5. DNS: apex `A` naar 76.76.21.21, `www` CNAME naar `cname.vercel-dns.com` (kan via Hostinger API — ik regel zodra je "go" zegt).

## Fase 2 (later)

Zie spec.md §7. Alles is al voorbereid in `.claude/agents/`:
- Clerk auth + `/platform` wall (clerk-auth-specialist)
- Convex backend migratie (convex-backend-dev)
- Stripe checkout + subscriptions (stripe-payments)
- Cursus/Tapkamer/Werkgeversplatform

## De AI-ploeg

12 project-specifieke agents in `.claude/agents/`. Dispatch parallel werk met ze. Zie `.claude/README.md` voor de mapping.

---

*Als het niet klinkt alsof het uit een Geldbrouwerij komt, brouw het opnieuw.*
