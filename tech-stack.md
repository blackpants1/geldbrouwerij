OKE DUS GEEN SUPABASE MAAR CONVEX EN CLERK


19:41Synthesized tech stack overview balancing comprehensiveness with practical feasibilitySynthesized tech stack overview balancing comprehensiveness with practical feasibilityOp basis van alles wat we hebben besproken, hier is de volledige tech stack uitgedacht voor jouw situatie: side project, zelf vibe-coden, schaalbaar, en zo min mogelijk externe afhankelijkheden.
De kern:
LaagToolWaaromFrameworkNext.js (App Router)Zelf bouwen, SEO, snelheid, alles op één domeinDatabase + Auth + StorageSupabaseAuth, Postgres, real-time (community), file storage (video's), edge functionsBetalingenStripeSubscriptions, €1 trial, eenmalige betalingen, webhooks naar SupabaseHostingVercelGratis tier is genoeg voor start, automatische deploys vanuit GitHubDomeingeldbrouwerij.nlVia TransIP of Vercel Domains
De website:
ComponentAanpakMarketing pagesNext.js static pages (homepage, diensten, over, Brouwproces)Blog / De TapMDX of Supabase als CMSBrouwketel (gratis tool)React component, berekeningen client-side, resultaat opslaan in SupabaseBrouwketel Pro (betaald)Achter Supabase auth, dashboard met charts (Recharts of Chart.js)Cursus / Het BrouwreceptSupabase auth-gated pages, video's via Mux of Supabase StorageTapkamer (community)Supabase real-time, eigen gebouwd (kanalen, posts, reacties)BoekingenCal.com (embed) of eigen booking-flow met Supabase + Stripe
E-mail:
WatToolTransactioneel (welkomstmail, bevestigingen)Resend (gratis tier: 3.000/mnd)Nurture sequences (4-mail reeks na Brouwketel)Resend + Supabase edge functions als scheduler, of Loops.soBrouwboek (wekelijkse nieuwsbrief)Loops.so of Buttondown (simpel, betaalbaar)
Video:
WatToolPublieke content (YouTube, Reels)YouTube + native upload Instagram/TikTokCursus-video's (beschermd)Mux (streaming, signed URLs, geen download mogelijk) of Bunny.net (goedkoper)Live sessiesZoom (opname → upload naar Mux/Bunny)
Analytics & monitoring:
WatToolWebsite analyticsPlausible (€9/mnd, privacy-friendly, geen cookie banner nodig)Product analyticsPostHog (gratis tier, funnels, retentie)Error trackingSentry (gratis tier)UptimeBetterStack of Vercel's built-in
Content & planning:
WatToolContent planningNotionSocial schedulingBuffer (gratis tier: 3 kanalen) of LaterGraphic design (posts)Canva Pro (templates uit je social bibliotheek)AI afbeeldingenGoogle AI Studio, Midjourney, of Flux
De architectuur visueel:
┌─────────────────────────────────────────────────┐
│                   VERCEL                         │
│              (hosting + CDN)                     │
├─────────────────────────────────────────────────┤
│                                                  │
│   NEXT.JS APP                                    │
│   ├── /                    Homepage               │
│   ├── /diensten            Diensten               │
│   ├── /brouwproces         Het Brouwproces™       │
│   ├── /over                Over Roy               │
│   ├── /brouwketel          Gratis tool            │
│   ├── /blog                De Tap (blog)          │
│   ├── /brouwavond          Boekingen              │
│   │                                               │
│   ├── /platform            ← AUTH WALL ──────┐   │
│   │   ├── /dashboard       Brouwketel Pro     │   │
│   │   ├── /cursus          Het Brouwrecept    │   │
│   │   ├── /community       De Tapkamer        │   │
│   │   ├── /live            Live sessies       │   │
│   │   └── /account         Profiel + billing  │   │
│   │                                           │   │
├───┼───────────────────────────────────────────┤   │
│   │           SUPABASE                        │   │
│   │   ├── Auth (magic link + social)          │   │
│   │   ├── Database (Postgres)                 │   │
│   │   │   ├── users                           │   │
│   │   │   ├── brouwketel_results              │   │
│   │   │   ├── course_progress                 │   │
│   │   │   ├── community_posts                 │   │
│   │   │   ├── community_comments              │   │
│   │   │   ├── bookings                        │   │
│   │   │   └── subscriptions                   │   │
│   │   ├── Real-time (community chat)          │   │
│   │   ├── Storage (documenten, werkbladen)    │   │
│   │   └── Edge Functions (cron jobs, emails)  │   │
│   │                                           │   │
├───┼───────────────────────────────────────────┤   │
│   │           STRIPE                          │   │
│   │   ├── Products:                           │   │
│   │   │   ├── Brouwavond (€29, eenmalig)      │   │
│   │   │   ├── Check-up (€97, eenmalig)        │   │
│   │   │   ├── Brouwtraject (€197/mnd, 3 mnd)  │   │
│   │   │   ├── Werkgever (€597, eenmalig)      │   │
│   │   │   └── Platform:                       │   │
│   │   │       ├── Trial (€1, 30 dagen)        │   │
│   │   │       ├── Maandelijks (€19,95)        │   │
│   │   │       ├── Kwartaal (€49)              │   │
│   │   │       └── Jaar (€179)                 │   │
│   │   ├── Webhooks → Supabase                 │   │
│   │   └── Customer Portal (self-service)      │   │
│   │                                           │   │
├───┼───────────────────────────────────────────┤   │
│   │      EXTERNE SERVICES                     │   │
│   │   ├── Mux / Bunny.net (video streaming)   │   │
│   │   ├── Resend (transactionele e-mail)      │   │
│   │   ├── Loops.so (nieuwsbrief + sequences)  │   │
│   │   ├── Cal.com (scheduling, embed)         │   │
│   │   ├── Plausible (analytics)               │   │
│   │   └── Zoom (live sessies)                 │   │
│   │                                           │   │
└───┴───────────────────────────────────────────┘
Kosten bij launch (maand 1-3):
ServiceKosten/mndVercel€0 (gratis tier)Supabase€0 (gratis tier: 50K requests, 500MB DB)Stripe1,4% + €0,25 per transactieResend€0 (3.000 mails/mnd gratis)Plausible€9Cal.com€0 (self-hosted of gratis tier)Domein~€10/jaarTotaal~€10/mnd
Kosten bij groei (200+ leden):
ServiceKosten/mndVercel Pro€20Supabase Pro€25Mux of Bunny€10-30Resend€20 (50K mails)Loops.so€49Plausible€9Totaal~€150/mnd
Bij 200 leden × €17 gem. = €3.400/mnd omzet. Dus ruim rendabel.
Bouw-volgorde:
WeekWat1-2Next.js project opzetten, Supabase connecten, marketing pages3-4Brouwketel gratis tool (wizard + resultaat + e-mail capture)5-6Stripe integratie, Brouwavond booking, Check-up booking7-8Auth + platform shell, cursus-omgeving (video player + progress)9-10Brouwketel Pro (dashboard, tracking, charts)11-12Tapkamer (community), live sessie-integratie
Wil je dat ik begin met het opzetten van het Next.js project en de eerste pagina's?domein heb ik via hostinger. ook mail even al aangemaakt. niet convex en clerk doen voor de eenvoudg?19:54Weegde Convex en Clerk tegen Supabase af voor eenvoudWeegde Convex en Clerk tegen Supabase af voor eenvoudGoed idee. Convex + Clerk is eerlijk gezegd een betere keuze voor jouw situatie. Hier is waarom:
Clerk vs Supabase Auth:
Clerk wint voor jou. Je krijgt kant-en-klare login componenten (magic link, Google, Apple), een user management dashboard, en het werkt out-of-the-box met Next.js. Geen custom auth-flows bouwen. Bij vibe-coden scheelt dat dagen.
Convex vs Supabase Database:
SupabaseConvexQuery-taalSQL (Postgres)TypeScript functiesReal-timeMoet je configurerenStandaard, alles is real-timeType safetyHandmatigAutomatisch, end-to-endScheduled jobsEdge Functions (complex)Ingebouwd (cron, scheduling)Vibe-codenMeer config nodigSneller, minder boilerplateLearning curveMediumLaag als je TypeScript kentFile storageIngebouwdIngebouwdLock-inLaag (Postgres)Hoger (proprietary)Gratis tier50K requests, 500MB1M function calls, 1GB
De eerlijke afweging:
Convex is sneller bouwen, beter voor real-time (je Tapkamer), en TypeScript-first past perfect bij vibe-coden met Claude Code. Het nadeel is vendor lock-in — maar voor een side project dat snel moet draaien is dat acceptabel. Je kunt altijd later migreren als je op 10.000 leden zit.
Aangepaste stack:
┌──────────────────────────────────┐
│           VERCEL                  │
│        (hosting + CDN)            │
├──────────────────────────────────┤
│                                   │
│   NEXT.JS (App Router)            │
│   ├── Marketing pages             │
│   ├── Brouwketel (tool)           │
│   ├── /platform (achter Clerk)    │
│   │   ├── Dashboard               │
│   │   ├── Cursus                  │
│   │   ├── Tapkamer                │
│   │   └── Account                 │
│                                   │
├──────────────────────────────────┤
│                                   │
│   CLERK (auth)                    │
│   ├── Magic link login            │
│   ├── Google / Apple SSO          │
│   ├── User management             │
│   └── Webhooks → Convex           │
│                                   │
├──────────────────────────────────┤
│                                   │
│   CONVEX (backend)                │
│   ├── Database                    │
│   │   ├── users                   │
│   │   ├── brouwketel_results      │
│   │   ├── course_progress         │
│   │   ├── community_posts         │
│   │   ├── community_comments      │
│   │   ├── bookings                │
│   │   └── subscriptions           │
│   ├── Real-time (Tapkamer)        │
│   ├── File Storage (werkbladen)   │
│   ├── Scheduled Functions         │
│   │   ├── E-mail sequences        │
│   │   ├── Check-in reminders      │
│   │   └── Proost-moment triggers  │
│   └── HTTP Actions (webhooks)     │
│                                   │
├──────────────────────────────────┤
│                                   │
│   STRIPE (betalingen)             │
│   ├── Subscriptions + trial       │
│   ├── Eenmalige betalingen        │
│   ├── Webhooks → Convex           │
│   └── Customer Portal             │
│                                   │
├──────────────────────────────────┤
│                                   │
│   OVERIGE SERVICES                │
│   ├── Mux / Bunny (video)         │
│   ├── Resend (e-mail)             │
│   ├── Loops.so (nieuwsbrief)      │
│   ├── Cal.com (boekingen)         │
│   ├── Plausible (analytics)       │
│   └── Zoom (live sessies)         │
│                                   │
└──────────────────────────────────┘
Kosten vergelijking:
ServiceSupabase stackConvex + Clerk stackAuth€0 (Supabase)€0 (Clerk gratis tot 10K MAU)Database/Backend€0-25 (Supabase)€0-25 (Convex)Hosting€0-20 (Vercel)€0-20 (Vercel)Totaal~€10-50/mnd~€10-50/mnd
Vrijwel identiek qua kosten. Maar sneller te bouwen.
Het grote voordeel voor jou: als je met Claude Code vibe-codet, is Convex ideaal. Je schrijft TypeScript functies, geen SQL queries. Alles is typed, alles is real-time. Clerk geeft je een login-scherm in 5 minuten in plaats van 5 uur.
Hostinger voor domein + mail: prima. Koppel het domein aan Vercel via DNS records (A-record of CNAME). Mail via Hostinger werken houden — geen reden om dat te veranderen.
Zal ik het project opzetten?