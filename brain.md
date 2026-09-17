# VYRALIFY — Master Architecture & Project Brain (`brain.md`)

> **CRITICAL PERSISTENCE DOCUMENT**: Read this file first in any new chat or session to immediately understand the complete state, decisions, backend APIs, and frontend plans for Vyralify.

---

## 1. Project Overview & Vision
- **Product**: **Vyralify** (`vyralify.io` / `vyralify.in`)
- **Core Philosophy**: *"Generic tools generate. Vyralify learns."*
- **Target Audience**: Instagram Theme Page operators, faceless creators, clipping editors, and digital product entrepreneurs.
- **Core Promise**: Build your business. Know what to create. Know what to do next. Turn attention into recurring revenue.

---

## 2. The 10 Locked Platform Systems

Based on the master specification documents:
1. **01 🚀 Vyralify Launch**: Onboarding, niche selection, business idea finder, business name generator, username finder, profile optimizer, link-in-bio builder, creator store builder.
2. **02 🧠 Vyralify Intelligence**: Niche profitability radar, competitor tracker, viral page/post database, trending audio velocity intelligence, content score (hook score, retention analysis), AI cross-tool strategist ("What should I do next?").
3. **03 ✍️ Vyralify Create**: Writing tools (5 hook archetypes, scripts, captions, CTAs, carousels, stories), content repurposer, content variations.
4. **04 📅 Vyralify Publish**: Content calendar, posting schedule, AI best-time recommendations, reels/posts scheduler, multi-account manager.
5. **05 💰 Vyralify Commerce & Affiliates**: Whop-style selling (digital products, SaaS/AI tools, paid communities, services), creator store builder, checkout links, orders, customer CRM, refund requests, automated 40% recurring affiliate tracking.
6. **06 🤝 Vyralify Marketplace**: Creator × Brand matching algorithm, campaign discovery (Fixed/Deal-Based, Per-View/Clipping, CPM pools), creator submission workflow, view verification, anti-fraud tracking.
7. **07 🎓 Vyralify University**: 5 structured tracks (Basics, Content, Growth, Monetisation, Scaling), personalized 30/60/90-day roadmap, downloadable templates.
8. **08 💸 Vyralify Wallet**: Unified creator earnings (Products + Affiliates + Brand deals + Clipping payouts), transaction ledger, payout withdrawals (UPI / Bank / Stripe).
9. **09 💬 Community & Page Reviews**: Multi-channel discussions (`introductions`, `general`, `networking`, `wins`, `reviews` for community page review requests).
10. **10 📱 Mobile-First Experience**: High-fidelity responsive mobile web experience.

---

## 3. Current Backend State (100% Production Ready)

The backend is built as a modular Express REST API deployed on **Firebase Cloud Functions** and backed by **Cloud Firestore**.

### Directory Structure
```
functions/
├── index.js                     # Express app entry, compression, rate limits, timeout, /health
├── package.json                 # express, cors, compression, express-rate-limit, firebase-admin
├── firestore.indexes.json       # 10 composite indexes for compound queries
├── scripts/
│   ├── loadTest.js              # 20 simultaneous users concurrency test (Passed 100/100)
│   └── backupRestore.js         # Automated snapshotting & disaster recovery test (Passed)
└── src/
    ├── config/firebase.js       # Admin SDK & Firestore initialization
    ├── utils/logger.js          # Structured JSON logging with correlation IDs & latency
    ├── middleware/
    │   ├── auth.js              # Token validation, user profile injection, admin check
    │   ├── rateLimiter.js       # Global (150/15m), AI (12/1m), Checkout/Payout (25/15m)
    │   ├── timeoutHandler.js    # 25-second API request timeout protection
    │   ├── idempotency.js       # Prevents duplicate submissions and charges via Idempotency-Key
    │   ├── cacheMiddleware.js   # In-memory TTL caching with Cache-Control headers
    │   └── errorHandler.js      # Sanitized 404, 413, and 500 error envelopes
    ├── controllers/
    │   ├── homeController.js        # Overview, sales, views, business activities
    │   ├── aiController.js          # Co-pilot ("What to do next?", audit, generators)
    │   ├── businessController.js    # Products, services, store, orders, affiliates
    │   ├── accountController.js     # IG pages, profile audit, calendar, DM templates
    │   ├── discoverController.js    # Niches, viral pages, audio radar, content score
    │   ├── campaignController.js    # Campaigns, clipping submissions, marketplace match
    │   ├── universityController.js  # 5-track curriculum & 30/60/90-day roadmap
    │   ├── walletController.js      # Unified 4-stream earnings, ledger, withdrawals
    │   └── communityController.js   # Multi-channel feed & page review requests
    └── routes/
        └── apiRouter.js             # Central router connecting all 63 API methods
```

### 20-Point Production Hardening
All 20 viral engineering safeguards have been implemented and verified:
1. Rate Limiting (`express-rate-limit`)
2. API Limits (Tiered for Global, AI, Payments)
3. Spending Caps (Daily AI quota: 25/day; Daily withdrawal cap: ₹50,000 max/24h)
4. Error Handling (`errorHandler.js` with sanitized production envelopes)
5. Loading States (Frontend metadata contracts)
6. Empty States (Standardized `emptyState: { icon, title, message, ctaAction }`)
7. Failed Request Handling (Resilient fallback catalogues)
8. API Timeouts (`timeoutHandler.js` at 25 seconds)
9. Prevent Duplicate Submissions (`idempotency.js` in-flight locks)
10. Prevent Duplicate Payments (`idempotency.js` replay cache)
11. Optimize DB Queries (Projections & composite ordering)
12. DB Indexes (`firestore.indexes.json`)
13. Paginate Large Results (`limit`, `page`, max 100)
14. Compress Files (`compression` middleware with Gzip/Brotli)
15. Limit Upload Size (`2mb` payload size cap)
16. Cache Repeat Requests (`cacheMiddleware.js` in-memory TTL cache)
17. Uptime Monitoring (Deep `/health` reporting uptime, memory RSS, and DB latency)
18. Structured Error Logging (`logger.js` with correlation IDs)
19. Test Simultaneous Users (`loadTest.js` — 20 concurrent users, 100% success rate)
20. Test Backup & Restore (`backupRestore.js` disaster recovery verified)

---

## 4. Frontend Rebuild Stack & Design Libraries

The legacy static frontend has been completely archived to [`archive/legacy_ui/`](file:///c:/Users/ADI/Desktop/Projects/vyralify/archive/legacy_ui).

The new frontend is being built with a cutting-edge, high-end design stack:

1. **Core Framework**: **React** (Vite or Next.js) with **Tailwind CSS** & **shadcn/ui**.
2. **Animation Engine**: **Motion for React** (`motion/react` from [motion.dev](https://motion.dev/docs/react-animation)).
3. **Animated UI Components**:
   - **Componentry UI** ([componentry.dev](https://componentry.dev/)): Beautiful, animated React UI components with motion and styling already handled.
   - **Skiper UI** ([skiper-ui.com](https://skiper-ui.com/)): Aesthetic, uncommon motion components built for shadcn/ui and Motion.
4. **Charts & Analytics**:
   - **Bklit UI** ([bklit.com](https://bklit.com/)): Composable chart and data visualization library built on shadcn/ui, Visx, and Motion (Line, Area, Ring, Radar, Gauges).
5. **AI Co-Pilot Visuals**:
   - **Thinking Orbs** (`thinking-orbs` from [libraries.dev/orbs](https://libraries.dev/orbs)): Hand-tuned interactive 2D canvas thought-orb loading indicators and glowing AI states.

---

## 5. Implementation Rules (How We Cook)
- **Step-by-Step & Section-by-Section**: Do NOT rush or generate multiple complex sections at once.
- **Focus on Polish & Rich Aesthetics**: Use deep navy/void surfaces, subtle glowing borders, glassmorphism, micro-animations, and fluid charts.
- **Maintain Documentation Integrity**: Update `memory.md` and `brain.md` whenever major decisions or architecture additions occur.
