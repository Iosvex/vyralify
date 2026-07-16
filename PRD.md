# Vyralify — Product Requirements Document (PRD)

> Domain: **vyralify.in** · Firebase project: **vyralifyin1** · Status: Landing page live, Member Dashboard is next build phase.

## 1. What Vyralify Is

Vyralify is an AI-powered membership platform that teaches and tools-up creators to build, grow, and
monetise **faceless Instagram theme pages** (niches like wealth, mindset, luxury, stoicism, finance,
motivation). It combines a structured curriculum, an AI content-generation toolkit, a resource vault,
and an affiliate/monetisation system — sold as a single monthly membership.

**One-line pitch:** *"The all-in-one AI-powered platform helping creators launch, grow and monetise
profitable Instagram pages."*

## 2. Target User

- Primarily Class XI–college-age to mid-20s creators and side-hustlers, India-heavy audience but
  global (hence dual currency).
- Two entry states: (a) total beginners with zero pages, (b) creators already running 1+ pages who
  want systems, AI tools, and a monetisation path.
- Comfortable on mobile — most usage will be phone-first (per the WhatsApp-style demo captures).

## 3. Problem → Solution

| Problem | Vyralify's Answer |
|---|---|
| Creators don't know how to pick a niche, brand a page, or grow it | Foundation + Growth Systems modules with proven frameworks |
| Content creation is slow and inconsistent | AI Creator Tools: captions, hooks, scripts, hashtags, content ideas, niche research |
| No clear path from followers → income | Monetisation Engine: digital products, affiliate system, sponsorship playbooks |
| Learning is scattered across YouTube/Discord | One dashboard: lessons, templates, trackers, AI tools, community, all gated by membership |
| Growth advice is generic | Real page examples, case studies, before/after proof, live stats |

## 4. Core Product Surfaces

### 4.1 Marketing Site (Landing Page) — **Built**
13 sections per the approved structure doc:
1. Top strip (social proof ticker)
2. Sticky navbar (white/light, logo left, links center, Login right)
3. Hero + Trusted By (headline, dashboard mockup, dual CTA, feature pills)
4. Social Proof (animated IG page grid + 5 animated stat cards)
5. Features (6 pillars: Build Pages, Growth Systems, Viral Content, Monetisation Engine,
   Resource Vault, Community — each tagged with which AI tools power it)
6. Everything Inside (tabbed interactive preview of the 5 dashboard categories +
   floating "AI Creator Assistant" widget)
7. How It Works (4-step journey: Join → Launch → Monetise → Scale)
8. Why Vyralify (5 premium value cards)
9. Results & Testimonials (success story cards, before/after, testimonial slider)
10. Pricing (single card, ₹499/mo or $19/mo, expandable "what's included")
11. FAQs (10-question accordion)
12. Final CTA
13. Footer

This is treated as **content-complete**; further work here is refinement only unless explicitly
requested. Do not rebuild it from scratch.

### 4.2 Auth & Onboarding — **Next up alongside dashboard**
- Firebase Auth (email/password + Google) — already provisioned on `vyralifyin1`.
- Post-signup: capture country → determines pricing currency/gateway.
- First-login onboarding: pick a track (Beginner vs Existing creator) to personalize the
  dashboard's starting tab.

### 4.3 Member Dashboard — **Phase in progress, shell is the immediate goal**
Mirrors the "Everything Inside" tab structure from the landing page, but as the real gated app:
- **Foundation** — Welcome, Choose Your Niche, Build Your First Page, Setup Existing Page, Rules & Guidelines
- **Content & Posting** — Viral Content Strategies, Content Formats, High-Retention Hooks,
  Trending Audio Library, CTA Library, Templates Pack, AI Content Assistant
- **Scaling & Growth** — Algorithm Guide, Posting Calendar, Multi-Page Strategy, Progress Tracker, Case Studies
- **Monetisation** — Digital Products, Store Setup, Sales Psychology, Sales Scripts, Affiliate System, Sponsorship Guide
- **Community** — Introductions, General Chat, Networking, Wins & Milestones, Page Reviews
- Floating **AI Creator Assistant** widget available from anywhere in the dashboard (Generate
  Captions / Hooks / Scripts / Ideas / Find Trends).

### 4.4 AI Creator Tools (powered by Groq + NVIDIA)
- AI Niche Research, AI Bio Generator
- AI Trend Finder, AI Growth Insights, AI Content Planner
- AI Caption Generator, AI Hook Generator, AI Content Ideas, AI Script Generator, AI Hashtag Generator
- AI Offer Generator (product ideas / sales assistant are future-flagged in the source spec)

### 4.5 Monetisation & Payments
- Single membership tier: **₹499/month (India, Razorpay)** or **$19/month (rest of world, Stripe)**.
- Cancel-anytime (only ship this copy if it is operationally true).
- Affiliate program: every member gets a referral code; commissions tracked in Firestore.

### 4.6 Community
- V1 can be a lightweight in-app feed/forum or an embedded Discord — decide in Phase planning,
  see `phases.md`. Do not over-build this before the core loop (join → dashboard → AI tools →
  monetise) is solid.

## 5. Non-Goals (v1)

- No native mobile app — responsive web only.
- No multi-tier pricing / comparison tables — single plan by design.
- No public marketplace of user-generated digital products (that's a future idea per the source doc).
- No in-house video hosting — link out or embed (YouTube/Loom/etc.) for lessons initially.

## 6. Success Metrics

- Landing → signup conversion rate
- Signup → paid conversion rate
- AI tool usage per active member (proxy for retention/value realization)
- Affiliate-driven signups as % of total
- Monthly churn on the membership

## 7. Key Constraints Carried Into Every Phase

- Firebase project `vyralifyin1` and its Firestore rules are **already live** — treat schema
  changes as breaking changes, not free edits (see `rules.md`).
- Domain `vyralify.in` is connected — assume production deploys are real and public.
- Dual-currency payment routing (Razorpay for India, Stripe for the rest) is a hard product
  requirement, not a nice-to-have.
- AI features must run on **Groq** (primary, low-latency) and **NVIDIA NIM** (secondary/heavier
  tasks) — never call these from the client, always proxy server-side.

See `architecture.md` for system design, `phases.md` for build order, `design.md` for the visual
system, `rules.md` for boundaries any coding agent must respect, and `memory.md` for the running
build log.
