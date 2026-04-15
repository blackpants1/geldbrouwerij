---
name: resend-email
description: Use for any email work — creating, modifying or debugging Resend/React-Email templates, broadcasts, audiences, and the dev-fallback outbox. Covers template patterns, env-vars, from-addresses, and preview workflow.
---

# Resend — e-mail architectuur

Alle e-mail van De Geldbrouwerij loopt via **Resend**. Dat is een harde regel (user directive).

## Env-vars (verplicht)
```
RESEND_API_KEY=              # re_xxx
RESEND_AUDIENCE_ID=          # uuid van de "brouwmaatjes" audience
RESEND_FROM_TX="Roy van De Geldbrouwerij <roy@geldbrouwerij.nl>"
RESEND_FROM_NEWSLETTER="Het Brouwboek <brouwboek@geldbrouwerij.nl>"
RESEND_ADMIN_EMAIL="dev@geldbrouwerij.nl"
```

## Dev-fallback
Als `RESEND_API_KEY` niet is ingesteld, schrijft `sendEmail()` de gerenderde HTML naar `.data/email-outbox/<timestamp>-<slug>.html`. Geen verzending, geen errors, zodat lokale dev niets breekt.

## Bestandsstructuur
```
src/lib/resend.ts                  # client + sendEmail() wrapper
src/emails/
  layout.tsx                       # gedeeld <EmailLayout /> met merk-header/footer
  welcome-brouwketel.tsx           # direct na Brouwketel-invulling
  admin-lead-notification.tsx      # intern, naar RESEND_ADMIN_EMAIL
  nieuwsbrief-opt-in.tsx           # single opt-in
  nurture-1.tsx ... nurture-4.tsx  # dag 0,2,5,9
  brouwavond-bevestiging.tsx
  check-up-bevestiging.tsx
```

## Template-patroon (React Email)
```tsx
import { Html, Head, Body, Container, Heading, Text, Link, Preview } from "@react-email/components";
import { EmailLayout } from "./layout";

export default function WelcomeBrouwketel({ naam, score }: { naam: string; score: number }) {
  return (
    <EmailLayout preview={`Je Brouw-score: ${score}/100`}>
      <Heading>Proost, {naam}.</Heading>
      <Text>Je hebt je eerste stap gezet. Hier is je Brouw-score: <strong>{score}/100</strong>.</Text>
      {/* ... */}
    </EmailLayout>
  );
}
```

## Merk-specs voor e-mail
- Max breedte container: **600px**.
- Kleuren uit brand tokens: bg `#FEFCF7`, tekst `#3D2B1F`, headings `#1B3A2D`, koper `#C78C4E`.
- Headings in serif (Fraunces) → in email fallback `Georgia, serif`.
- Body in `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`.
- CTA: full-width knop op mobiel, auto-width op desktop, border-radius 999px, padding 14px 28px, achtergrond `#C78C4E`.
- Alle templates **mobile-first** getest via react-email preview (320px).

## Audiences / Broadcasts
- Alle nieuwsbrief-opt-ins → `resend.contacts.create({ audienceId, email, firstName, unsubscribed: false })`.
- Wekelijkse "Brouwboek" → `resend.broadcasts.create({ audienceId, ... })` vanuit een aparte scheduler (Fase 2).

## Verplichte velden in elke mail
- Preview-text (1 regel, max 90 chars, 2e lees-hoek).
- Fysiek adres / reply-to onderaan (wettelijk NL — staat in EmailLayout).
- Unsubscribe link voor marketing-mails (Resend: `List-Unsubscribe` header + link in body).

## Brand-voice triggers
- Open met **Proost** of met de voornaam.
- Sluit af met **— Roy** of **Proost. Roy**.
- Nooit "Beste X" of "Geachte".
- CTA-tekst uit `brand-voice` CTA-library.

## Preview / test workflow
```bash
npm run email:preview   # start react-email dev server op http://localhost:3001
```
In CI:
- Unit test: render to string, assert dat `<a>` CTA's een `href` hebben en dat de preview-regel aanwezig is.
- Visual: screenshot bij 320px + 600px via Playwright.

## Veelgemaakte fouten
1. `sendEmail` vergeten te awaiten in Server Action → silent failure.
2. `to:` als array forget op broadcasts — gebruik `audienceId`.
3. `from:` zonder display-name → slechte deliverability.
4. Inline images > 100kB → gebruik absolute URL naar `public/og/*`.
