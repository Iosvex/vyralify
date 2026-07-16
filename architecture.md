# Vyralify — Architecture

> Stack confirmed by you: **plain HTML + CSS + JavaScript, one `.html` file per page, GSAP for
> animation, Lenis for smooth scroll. No framework, no build step.** (Earlier draft of this file
> assumed Next.js/React based on the `NEXT_PUBLIC_` naming in `_env.local` — that was wrong; see
> `memory.md` for the correction log. That env file's *values* — the Firebase config — are still
> correct, just ignore the `NEXT_PUBLIC_` prefix's usual meaning, it's not driving anything now.)

## 1. Stack Summary

| Layer | Choice |
|---|---|
| Frontend | Plain HTML + CSS + JavaScript — one `.html` file per page/view, no framework, no bundler required |
| Animation | **GSAP** (+ ScrollTrigger) for scroll reveals, hover states, load-in sequences, the Growth Aura's ambient drift |
| Smooth scroll | **Lenis**, initialized once and shared across every page |
| Hosting | `vyralify.in` — confirm whether it's Vercel (static) or Firebase Hosting; both serve plain HTML/CSS/JS fine, pick one and log it in `memory.md` |
| Backend / BaaS | Firebase (`vyralifyin1` project) |
| Auth | Firebase Authentication — client SDK, loaded directly via `<script type="module">` on any page that needs it |
| Database | Cloud Firestore |
| Server-side logic & secrets | **Firebase Cloud Functions only** (`/functions`) — since there's no app server, this is the sole place paid-API keys and webhook logic can live |
| Payments | Razorpay (INR) + Stripe (USD) |
| AI inference | Groq (primary) + NVIDIA NIM (secondary) |
| Domain | vyralify.in |

## 2. High-Level System Diagram

```
                         ┌───────────────────────────┐
                         │        vyralify.in          │
                         │  Static HTML/CSS/JS pages   │
                         │  (Lenis + GSAP on every page)│
                         └────────────┬─────────────────┘
                                      │ Firebase client SDK, loaded per page
              ┌────────────────────────┼────────────────────────┐
              ▼                        ▼                        ▼
   ┌────────────────────┐   ┌───────────────────┐   ┌─────────────────────────┐
   │ Firebase Auth        │   │ Firestore           │   │ Firebase Cloud Functions │
   │ (signup/login)       │   │ users/contentAssets │   │ - AI proxy (Groq/NVIDIA) │
   └────────────────────┘   └───────────────────┘   │ - payment webhooks        │
                                                        │ - onUserCreate trigger    │
                                                        │ - affiliate payout calc   │
                                                        └────────────┬─────────────┘
                                                                     │
                                                     ┌─────────────────┴──────────────────┐
                                                     ▼                                     ▼
                                          ┌───────────────────────┐            ┌────────────────────┐
                                          │ Groq / NVIDIA NIM       │            │ Razorpay / Stripe    │
                                          └───────────────────────┘            └────────────────────┘
```

Every `.html` page that needs Firebase talks to Auth/Firestore directly from client JS. Anything
that needs a secret key (AI generation, payment creation/verification) must go through a Cloud
Functions HTTPS endpoint — the page calls `fetch('https://.../generateCaption', ...)`, never the
provider directly.

## 3. Data Model (Firestore)

Unaffected by the frontend stack choice. These two collections already exist and are governed by
the live `firestore.rules` — extend, don't replace.

### `users/{uid}`
```
{
  email: string
  displayName: string
  role: "member" | "admin"          // used by isAdmin() in firestore.rules
  tier: "free" | "active" | "cancelled"   // membership status, separate from role
  country: string                   // ISO code, drives currency/gateway
  currency: "INR" | "USD"
  billingProvider: "razorpay" | "stripe"
  subscriptionId: string | null
  subscriptionStatus: "none" | "trialing" | "active" | "past_due" | "cancelled"
  affiliateCode: string             // this user's own referral code
  referredBy: string | null         // affiliate code that brought them in
  onboardingTrack: "beginner" | "existing" | null
  aiUsage: { count: number, resetAt: timestamp }   // simple rate-limit bookkeeping
  createdAt: timestamp
  updatedAt: timestamp
}
```

### `contentAssets/{id}`
Already publicly readable per `firestore.rules` (tier-gating happens client-side per the existing
comment in the rules file — keep that pattern unless you decide to move gating server-side).
```
{
  category: "foundation" | "content" | "growth" | "monetisation" | "community"
  title: string
  type: "lesson" | "template" | "download" | "video" | "checklist"
  tierRequired: "free" | "active"
  order: number
  body / url: string
  createdAt, updatedAt: timestamp
}
```

### New collections to introduce (propose in a session, don't add silently)
- `orders/{id}` — one doc per payment attempt (provider, amount, currency, status, uid, timestamps).
- `affiliates/{code}` — referral code → owner uid, click/signup/conversion counters.
- `aiGenerations/{id}` *(optional, for abuse monitoring/analytics)* — uid, tool, prompt hash, tokens, provider, timestamp. Don't log raw generated content if it's not needed — keep the footprint minimal.

Any new collection needs a matching rule block added to `firestore.rules` in the same change —
never ship a collection without rules for it.

## 4. Auth & Membership Flow

1. User signs up (Firebase Auth, client SDK) → a Cloud Function `onUserCreate` trigger creates the
   matching `users/{uid}` doc with `role: "member"`, `tier: "free"`.
2. User selects the plan → a small script detects country (see §6) → routes to Razorpay or Stripe
   checkout (checkout session created via a Cloud Function, never client-side, since it needs the
   secret key).
3. Gateway webhook hits a Cloud Function (`paymentWebhookRazorpay` / `paymentWebhookStripe`), which
   verifies the signature, then updates `users/{uid}.tier`, `subscriptionStatus`, `billingProvider`,
   `subscriptionId`.
4. Dashboard pages read `tier`/`subscriptionStatus` via a Firestore `onSnapshot` listener in plain
   JS to unlock gated content and AI tools in real time — no page reload needed after payment.
5. Cancellation/renewal/failed-payment webhooks update the same fields; a scheduled Function can
   downgrade `tier` to `free` if `subscriptionStatus` has been `past_due` beyond a grace period.

## 5. AI Provider Layer

Never call Groq or NVIDIA from a page's JS — there is no server to hide behind on the frontend, so
this has to live entirely in Cloud Functions.

**Proposed shape** — a single callable/HTTP function, `/functions/ai/generate`, that takes a `tool`
name and routes internally:
```js
// functions/ai/generate.js
// tool: "caption" | "hook" | "script" | "hashtag" | "contentIdea"
//     | "nicheResearch" | "bioGenerator" | "trendFinder" | "growthInsight"
//     | "contentPlanner" | "offerGenerator"
exports.generate = async (tool, input, uid) => { /* checks tier/usage, routes to Groq or NVIDIA */ }
```
- **Routing:** fast, short-form tools (captions, hooks, hashtags, content ideas) → **Groq** for
  low-latency responses in the floating AI widget. Heavier/longer-context tools (niche research,
  growth insights, content planning, scripts) → **NVIDIA NIM**.
- **Fallback:** if the primary provider errors or times out, retry once on the secondary provider
  before surfacing an error to the user.
- **Rate limiting:** check `users/{uid}.aiUsage` before calling out; increment after a successful
  generation; reset on a rolling window via a scheduled Function or lazy reset-on-read.
- **Gating:** free-tier users get zero or heavily-limited AI calls — enforced inside this same
  function, never trusted from the page.
- The dashboard page's JS calls this Cloud Function over HTTPS with the user's Firebase ID token
  attached, so the function can verify who's asking before it spends a paid API call.

## 6. Currency / Gateway Routing

- Detect country from (in order of preference): signed-in user's saved `country` → IP geolocation
  at signup time → browser `Intl` locale as a last-resort guess, always editable by the user.
- India → Razorpay, INR, ₹499/month.
- Everywhere else → Stripe, USD, $19/month.
- Store the decision (`currency`, `billingProvider`) on the user doc at checkout time so it's stable
  even if they travel or their IP changes later — don't re-derive it on every visit.

## 7. Folder Structure (proposed)

```
/                          # deployed as-is — static site root
  index.html                 # landing page
  login.html
  signup.html
  dashboard.html              # dashboard shell (tab switching can be in-page or split further)
  dashboard-content.html       # split per tab only if dashboard.html gets too heavy — decide & log it
  dashboard-growth.html
  dashboard-monetisation.html
  dashboard-community.html
  /assets
    /css
      tokens.css               # design.md's color/type CSS custom properties — loaded on every page
      base.css                  # resets, base typography
      landing.css
      dashboard.css
    /js
      firebase-config.js        # Firebase client config — public by design, not a secret
      auth-guard.js              # shared: redirect signed-out users off dashboard-*.html pages
      smooth-scroll.js            # Lenis init, one shared instance
      gsap-animations.js          # shared GSAP timelines / ScrollTrigger registrations
      landing.js
      dashboard.js
      ai-widget.js
    /images
    /fonts
  /partials                   # OPTIONAL — only if you choose the partial-loader pattern, see below
    nav.html
    footer.html
/functions                   # Firebase Cloud Functions (already declared in firebase.json)
  index.js
  /ai
    generate.js
  /payments
    webhookRazorpay.js
    webhookStripe.js
  onUserCreate.js
  affiliatePayout.js
firestore.rules
firebase.json
```

**Shared header/nav/footer across many pages — pick one pattern and log the choice in `memory.md`:**
1. **Duplicate the markup** in every `.html` file. Simplest, zero moving parts, totally fine for a
   handful of pages — but editing the nav means editing it everywhere.
2. **JS partial loader** — each page has `<div id="nav-slot"></div>`, a shared script does
   `fetch('/partials/nav.html')` and injects it. One source of truth, slight flash-of-unstyled-nav
   risk to handle (size the slot with CSS to avoid layout shift).
Don't mix both approaches across different pages — pick one for the whole site.

## 8. Environment Variables & Secrets

- **Firebase client config** (`apiKey`, `authDomain`, `projectId`, etc. — currently sitting in
  `_env.local`) is **not a secret** for a Firebase project; it's meant to be visible in client code.
  It goes straight into `/assets/js/firebase-config.js`, committed as plain public config. Firebase
  security comes from `firestore.rules`, not from hiding this object.
- **Everything else is a real secret and only ever lives inside `/functions`**, via Firebase's
  function config/secrets mechanism (`firebase functions:secrets:set ...` or a `.env` inside
  `/functions` that is itself gitignored) — never in any file under the static site root that gets
  deployed publicly:
```
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
GROQ_API_KEY
NVIDIA_API_KEY
```

## 9. Open Decisions To Confirm Before/During Build

1. Hosting target for `vyralify.in`: Vercel (static) vs Firebase Hosting — confirm and log.
2. Shared header/nav/footer: duplicate markup vs JS partial loader (§7) — pick one.
3. Community: in-app feed vs embedded Discord for v1.
4. Video/lesson hosting provider for the Content library.
5. Whether `/functions` is written in plain JS (matching the frontend) or TypeScript — default to
   plain JS for consistency unless you decide otherwise.

Log the answers to these in `memory.md` the moment they're decided so future sessions (or a
different model) don't re-litigate them.
