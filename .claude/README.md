# `.claude/` — De Geldbrouwerij AI team

This folder defines the **project-specific skills and agents** for De Geldbrouwerij.
Loaded automatically by Claude Code (and compatible MCP clients) as long as
Claude is launched from `/Users/roy/geldbrouwerij/`.

## Skills — always-on knowledge packs
Invoke with the `Skill` tool (`Skill(skill: "<name>")`).

| Skill | When to use |
|---|---|
| **brand-voice** | Any customer-facing Dutch copy. Enforces tone, Brouwtaal, CTA library. |
| **brouwketel-math** | Any money-calculation work (score, compound, potjes). |
| **resend-email** | Any email template, audience, or broadcast work. |
| **content-calendar** | Blog posts, social, nurture emails, content briefs. |

## Agents — delegated specialists
Dispatch via the `Agent` tool (`Agent(subagent_type: "<name>", …)`). Use them in parallel for independent work.

| Agent | Domain |
|---|---|
| **brouwmeester-copywriter** | Dutch copywriter, brand voice guardian. |
| **nextjs-developer** | Next.js 16 + React 19 + Tailwind v4 UI/routes. |
| **convex-backend-dev** | Convex schema, queries, mutations, actions (Fase 2). |
| **clerk-auth-specialist** | Clerk auth, /platform wall, Convex JWT (Fase 2). |
| **stripe-payments** | Checkout, subscriptions, webhooks, portal. |
| **resend-email-dev** | React Email templates + Resend wiring. |
| **cmo-marketer** | Funnel strategy, channels, nurture, content briefs. |
| **financial-auditor** | Independent correctness review of money math. |
| **ui-polish-designer** | Visual polish, brand fidelity, responsive checks. |
| **conversion-optimizer** | CRO audits, friction hunting, test backlog. |
| **seo-specialist** | Keyword, technical SEO, schema.org, sitemap. |
| **qa-tester** | Playwright E2E, Vitest units, a11y, Lighthouse. |
| **devops-deploy** | Vercel, DNS, CI, env-vars, monitoring. |

## How to work in parallel
Open independent streams at the same time. Example:
```
Agent(nextjs-developer)    → bouw /brouwproces pagina structuur
Agent(brouwmeester-copywriter) → schrijf final copy voor /brouwproces
Agent(resend-email-dev)    → bouw welcome-brouwketel.tsx template
Agent(qa-tester)           → schrijf tests/e2e/brouwketel.spec.ts
```
Deze werken concurrent, daarna integreer je de resultaten.

## Conventions
- Always load the relevant `SKILL.md` before writing copy or formulas.
- Each agent definition states exactly what is in-scope. Stay in lane.
- For cross-agent work, orchestrate explicitly (e.g. developer asks copywriter for final text; copywriter returns Dutch only).
