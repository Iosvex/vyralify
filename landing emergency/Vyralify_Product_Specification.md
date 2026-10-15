# 🚀 VYRALIFY — PRODUCT SPECIFICATION DOCUMENT (v2)
*For internal development. This document defines the complete product — every panel, feature, flow, and background process. Build the product exactly as specified. The landing/marketing site is NOT part of this scope and comes only after the product is complete.*

---

## 0. PRODUCT OVERVIEW & POSITIONING

**What Vyralify is:** An AI-powered SaaS toolkit for Instagram creators and page owners.

**Who it serves (two segments, one product):**
1. **Existing creators/page owners** — already running a page, want to grow it, automate engagement, and monetize faster.
2. **Beginners** — have no page yet, want to start an Instagram theme page from scratch specifically *to make money* — they need guided niche selection, page setup, and a clear path from zero to monetized page.

Both segments use the same 6 modules. Page Builder's "New Page" flow specifically serves beginners; "Import Page" flow serves existing creators. Onboarding must branch early to route each type correctly (see Section 1.1).

**What Vyralify is NOT:** Not a marketplace. Not a campaign/clipping platform. Not an agency tool. No brand-side product in this version. Single-sided product: creators (beginner or existing) are the only user type.

**Core Journey:**
`BUILD (Page Builder) → DISCOVER & CREATE → AUTOMATE (Instagram Automation) → MONETIZE (Store & Commerce) → MEASURE (Home) → OPTIMIZE (AI Assistant, cross-cutting)`

**The 6 Core Modules (sidebar navigation, top to bottom):**
1. 🏠 Home
2. ✨ Vyralify AI Assistant
3. 🚀 Page Builder
4. 🔎 Discover & Create
5. 🔗 Instagram Automation
6. 💰 Store & Commerce

---

## 1. GLOBAL SYSTEM REQUIREMENTS

### 1.1 Authentication & Onboarding

**What this is:** The entry point for every user — must correctly identify whether someone is a beginner or an existing creator, and route them accordingly.

- Sign up: email/password + Google OAuth + Apple OAuth (Apple often required for App Store compliance if a mobile app is planned later — confirm)
- Email verification (required before full access — prevents spam accounts)
- Password reset flow (forgot password → email link → reset)
- Terms of Service & Privacy Policy acceptance checkbox at signup (legal requirement)
- Onboarding branching question right after signup: **"Do you already have an Instagram page, or are you starting from scratch?"** → routes to Import Page flow or New Page flow respectively
- Instagram account connection (OAuth via Meta Graph API) — required before Page Builder or any Instagram-dependent feature works
- Onboarding wizard sequence:
  1. Create account → verify email
  2. Branching question (existing page vs. beginner)
  3. Connect Instagram (existing) OR Niche Selector quiz (beginner)
  4. Set primary objective (growth / monetization / automation-first)
  5. Land on Home with a "Getting Started" checklist widget (checklist differs slightly for beginner vs. existing — beginner sees "create your first post," existing sees "run your first page audit")
- Welcome email sequence (Day 0, Day 1, Day 3 — nudges toward first key action, e.g. "Have you tried the AI Assistant yet?")
- Session management: "Log out of all devices" option in settings (security)
- Two-Factor Authentication (2FA) — optional but recommended, especially since Instagram account access is involved (higher security expectation)
- Instagram token refresh handling — background job must refresh before expiry, alert user if reconnection required

### 1.2 Account & Settings Panel

**What this is:** Where users manage their account, billing, and connected accounts — separate from the 6 core modules but required for the product to function.

- Profile settings (name, email, password, avatar)
- Change email (with re-verification)
- Billing & Subscription management (plan, upgrade/downgrade, invoices, payment method)
- Connected Instagram Accounts management (add/remove/reconnect pages)
- Notification preferences
- Support/Help Center access (link out to docs or in-app chat support)
- Data export / account deletion (compliance requirement)

~~Team/collaborator access~~ — **removed.** This is a single-user tool, not a team collaboration platform. Do not build multi-user/role permissions in v1.

### 1.3 Notifications System
- In-app notification center (bell icon, global)
- Triggers: AI recommendation ready, automation triggered, sale made, content performance alert, subscription/billing alerts, Instagram token expiring, **usage limit warnings (see 1.6)**
- Email notifications (configurable) for: sales, weekly recap, billing events

### 1.4 Global Search
- Search across: past AI conversations, saved content/scripts, competitor tracked pages, products in store

### 1.5 Multi-Page Context Switcher
- Persistent page-switcher in the top nav — every module's data (analytics, content, automations, store) must be scoped to the currently selected page. Core architectural decision, not bolted on later.

### 1.6 Plan Gating & Usage Limits — "Hooked, Then Upgrade" Strategy

**What this is:** The system that gives free users a real taste of value, then creates natural, well-timed pressure to upgrade — never a hard wall that frustrates before the user has felt the product's value.

- AI credit metering system (tracks usage against plan limit, resets monthly/daily depending on tier)
- **Soft-lock UI pattern:** locked features are always *visible* (never hidden entirely) — shown with a lock icon + blurred preview + "Upgrade to unlock" button. Users should always see what they're missing, never wonder if a feature exists.
- **Usage warning triggers:** at 80% of AI credit usage, show an in-app banner ("You've used 80% of your monthly AI credits — upgrade for unlimited access"). At 100%, block further AI use with an upgrade prompt, but never mid-response (never cut off an answer already being generated).
- **First-taste strategy:** Free tier gets a genuinely useful (not crippled) experience of the AI Assistant and Discover & Create in their first session, so the "aha moment" happens before any limit is hit. Limits should bite on the *second* or *third* use, not the first.
- **Contextual upgrade prompts:** triggered at natural friction points — e.g., trying to add a 2nd page on Free, trying to enable Instagram Automation on Free, trying to add more than 1 product to Store on Free.
- Full tier breakdown: see Section 2 (Pricing Tiers Table).

---

## 2. PRICING TIERS — FULL FEATURE COMPARISON TABLE

**3 tiers:** Free (Starter) · Pro · Elite

| Feature / Module | 🆓 Free (Starter) | 💎 Pro (₹499/mo) | 🚀 Elite (₹1,499/mo) |
|---|---|---|---|
| **Connected Pages** | 1 page | Up to 3 pages | Unlimited pages |
| **AI Credits (Assistant + Content Gen combined)** | 20/day | 300/day | Unlimited |
| **AI Assistant — Ask Vyralify Anything** | ✅ Limited (basic Q&A only) | ✅ Full (deep analysis, strategy plans) | ✅ Full + priority response speed |
| **AI Assistant — Media Upload in Chat** | ❌ | ✅ | ✅ |
| **Conversation History** | Last 5 conversations | Unlimited | Unlimited |
| **Page Builder — Niche Selector** | ✅ | ✅ | ✅ |
| **Page Builder — New Page Setup Wizard** | ✅ | ✅ | ✅ |
| **Page Builder — Import & Audit** | ✅ (1x audit) | ✅ (unlimited re-audits) | ✅ (unlimited + priority audit depth) |
| **Page Builder — Audience Demographics** | ✅ Basic | ✅ Full | ✅ Full + export |
| **Discover — Trending Feed & Search** | ✅ Limited filters | ✅ Full filters | ✅ Full + early access to new trends |
| **Discover — Competitor Tracking** | 1 competitor | 10 competitors | Unlimited |
| **Discover — Niche Viral Database** | ✅ View only | ✅ Full access | ✅ Full access |
| **Create — Hooks/Scripts/Captions Generator** | ✅ Limited (counts toward daily AI credits) | ✅ Full | ✅ Full + unlimited |
| **Create — 30-Day Content Planner** | ❌ | ✅ | ✅ |
| **Create — Post Scheduling & Calendar** | ❌ (manual reminder only) | ✅ Auto-publish | ✅ Auto-publish + bulk scheduling |
| **Create — Saved/Research Library** | 10 saved items | Unlimited | Unlimited |
| **Create — Templates Library** | ✅ Limited set | ✅ Full library | ✅ Full library + exclusive templates |
| **Instagram Automation — DM/Comment/Story Triggers** | ❌ | ✅ (up to 3 active automations) | ✅ Unlimited automations |
| **Instagram Automation — Follow & Lead Collector** | ❌ | ✅ | ✅ |
| **Instagram Automation — AI Auto-Conversations** | ❌ | ✅ (limited monthly conversations) | ✅ Unlimited |
| **Instagram Automation — Analytics** | ❌ | ✅ | ✅ + advanced export |
| **Store & Commerce — Link-in-Bio Storefront** | ✅ (1 product/link) | ✅ (unlimited products) | ✅ (unlimited + custom branding) |
| **Store & Commerce — Winning Products Library** | ❌ (view only, can't add) | ✅ Full access | ✅ Full access + priority new drops |
| **Store & Commerce — Order & Customer Management** | ❌ | ✅ | ✅ |
| **Store & Commerce — Sales Analytics** | Basic (total sales only) | ✅ Full funnel analytics | ✅ Full + export |
| **White Label AI Assistant Resale** | ❌ | ❌ | ✅ Exclusive to Elite |
| **Support** | Community/Help Center only | Email support | Priority support (faster response) |
| **Best for** | Trying Vyralify, testing the AI | Active creators serious about growth | Scaling creators / multi-page / reselling |

*Note: exact pricing (₹499 / ₹1,499) and credit numbers are placeholders for launch — validate against actual AI inference cost before locking.*

---

## 3. 🏠 HOME (Dashboard)

**Panel explainer:** This is the first screen after login — a single-glance summary of how the page is doing across growth, content, and revenue, with AI nudges on what to do next.

### Panels/Screens
1. **Overview Dashboard** — top summary cards: Followers, Views (7d), Revenue (30d), Engagement Rate
2. **Page Analytics** — reach, impressions, engagement trend graph, top/worst performing posts
3. **Sales Tracker** — recent transactions list, sales trend graph
4. **Revenue Tracker** — total revenue, breakdown by source
5. **Recommendations Widget** — top 1-3 AI-pulled suggestions, click-through opens AI Assistant with context
6. **Quick Actions Bar** — "Create Content," "View Store," "Check Automations," "Ask AI"

*(User flow, background tasks, and edge cases: unchanged from v1 — see Section 8 for cross-module data map.)*

---

## 4. ✨ VYRALIFY AI ASSISTANT

**Panel explainer:** This is the AI brain of the product — a ChatGPT-style chat where users can ask literally anything about their Instagram business, and get expert-level, data-grounded answers, not generic advice.

### Panels/Screens
1. **Chat Interface** — "Ask Vyralify Anything" — persistent chat thread, context-aware
2. **Conversation History** — past chats saved and searchable
3. **Media Upload in Chat** *(new)* — users can upload screenshots (e.g. analytics screenshots, a competitor's post, their own content) or short videos directly into the chat for the AI to analyze and respond to with visual context

### AI Quality Requirement — Critical, Not Optional
This must NOT be a generic wrapper around a base model with a light prompt. It needs to feel like talking to a genuine, elite Instagram growth strategist:
- **Deep domain training/prompting**: the AI's system prompt and (if feasible) fine-tuning/retrieval layer must be built on real, high-quality Instagram growth expertise — algorithm behavior, retention mechanics, niche-specific benchmarks — not generic social media advice.
- **ChatGPT-style conversational quality**: natural, multi-turn, remembers context within a conversation, asks clarifying questions when needed rather than guessing.
- **Grounded in the user's real data**: every answer should reference the user's actual numbers/content where relevant (see Section 8 data dependencies) — genuinely personalized, not templated responses with the user's name inserted.
- **Media understanding**: when a user uploads an image/video, the AI must be able to actually analyze it (e.g., "here's a screenshot of my last Reel's analytics, why did it flop?" or "rate this thumbnail") — requires multimodal model capability, not just OCR text extraction.

### Core Capability
The AI must have read access to (and reason across): Page analytics, Content history & performance, Audience data, Competitor data, Automation performance, Revenue/sales data.

*(User flow, background tasks, edge cases: unchanged from v1, plus: media upload requires file size/type validation, and a content-safety check on uploaded media before processing.)*

---

## 5. 🚀 PAGE BUILDER

**Panel explainer:** This is where a page gets set up from scratch (for beginners) or connected and audited (for existing creators) — niche, positioning, profile, and audience all get defined here first, because every other module depends on this data.

### Panels/Screens
1. **Niche Selector & AI Page Building** — guided quiz → AI recommends niche(s) from Vyralify's official niche taxonomy (see Section 5.1 below) with a profitability/opportunity indicator
2. **Import Page & Setup** — connect existing Instagram account, auto-pull current bio/profile pic/stats, run an audit
3. **Objectives & Targeted Audiences** — user sets goals and defines target audience
4. **Page Positioning & Profile Setup** — bio generator/editor, positioning statement builder, profile picture guidance, highlights structure setup
5. **Multi-Page Management** — list view of all connected pages, add/switch/remove
6. **Audience Demographics** — visual breakdown of followers (age, gender, location, active times)

### 5.1 Official Niche Taxonomy (v1 Launch Categories)
The Niche Selector must use this exact taxonomy — 8 core categories, each with defined sub-niches. This structures the quiz, the Discover feed filters, the Viral Database filters, and Competitor Tracking categorization across the entire product (not just Page Builder).

1. **💰 Business & Money** — Entrepreneurship, Online Business, Finance, Investing, Marketing, E-commerce, AI Business
2. **🧠 Self-Improvement** — Motivation, Discipline, Productivity, Mindset, Success, Stoicism
3. **💪 Health & Fitness** — Gym, Fitness, Weight Loss, Nutrition, Wellness
4. **👗 Fashion & Beauty** — Men's Fashion, Women's Fashion, Luxury Fashion, Watches, Beauty, Skincare, Grooming, Fragrance
5. **🚗 Cars & Automotive** — Luxury Cars, Supercars, Sports Cars, JDM, Car Culture, Automotive
6. **✈️ Travel & Lifestyle** — Travel, Luxury Travel, Adventure, Lifestyle, Luxury Lifestyle
7. **🎬 Entertainment** — Movies, Anime, Music, Celebrity, Pop Culture, Memes, Comedy
8. **⚽ Sports** — Football, Basketball, Cricket, F1, MMA/Boxing, Tennis

**Implementation note:** every niche/sub-niche must be a structured field (not free text) since Discover's trending feed, Viral Database, and AI Assistant's recommendations all filter by this exact taxonomy. Adding a 9th category later should be possible without breaking existing user data (design as an extensible enum/table, not hardcoded).

*(User flows, background tasks, edge cases: unchanged from v1.)*

---

## 6. 🔎 DISCOVER & CREATE

**Panel explainer:** Discover is where users find out what's working right now in their niche (trends, competitors, viral formats); Create is where they turn that insight into actual content — hooks, scripts, captions — ready to post.

*(Full feature list, panels, user flow, background tasks, edge cases: unchanged from v1 — filters and categorization now explicitly driven by the Section 5.1 niche taxonomy.)*

---

## 7. 🔗 INSTAGRAM AUTOMATION

**Panel explainer:** This is where users set up their Instagram to auto-respond to comments, DMs, and story replies — turning engagement into leads or sales automatically, with an AI that can even hold a full conversation with a follower to convert them.

*(Full feature list, panels, user flow, background tasks, edge cases: unchanged from v1 — see compliance risk note on Instagram messaging rate limits.)*

---

## 8. 💰 STORE & COMMERCE

**Panel explainer:** This is a link-in-bio–style storefront — a single page (linked from the user's Instagram bio) where they list and sell their products, services, or affiliate offers. Not a traditional e-commerce store with catalogs/carts — it's a simple, scrollable page of product cards, each with its own buy/checkout link, built for how creators actually sell to their audience.

### Panels/Screens
1. **Sales & Conversion Analytics** — funnel view: link clicks → checkout starts → completed sales
2. **Store Builder** — customize the link-in-bio page itself (branding, layout, product card order, theme/colors)
3. **Product Pages & Links** — create/manage individual product cards on the link-in-bio page (Digital Goods, Services & Subscriptions) — each product is a card with an image, title, price, and a "Buy" or "Book" button
4. **Winning Products Library / Resell Affiliate Products** — browse a catalog of ready-to-sell digital products/affiliate offers; adding one auto-generates a product card on the user's link-in-bio page
5. **Orders & Customer Management** — order list, customer records, refund handling
6. **White Label AI Assistant Resale** *(Elite-tier)* — configure and resell a branded version of Vyralify's AI Assistant as its own product card on the user's storefront

### User Flow (Core — this is the primary flow, replacing traditional "store setup")
1. User opens Store Builder → sets up their link-in-bio page (choose theme, add profile photo/bio text matching their Instagram)
2. Adds product cards one by one via Product Pages & Links (or imports from Winning Products Library)
3. Gets a single link (e.g., `vyralify.io/u/username`) to put in their Instagram bio
4. Followers click through from Instagram → land on the link-in-bio page → browse product cards → buy directly
5. Sales flow into Analytics + Home's Revenue Tracker

*(Background tasks and edge cases: unchanged from v1, with payment/delivery logic now scoped per-product-card on this single link-in-bio page rather than a multi-page store.)*

---

## 9. CROSS-MODULE DATA DEPENDENCIES

*(Unchanged from v1 — still the critical architecture reference.)*

- **AI Assistant** reads from: Home, Page Builder, Discover & Create, Instagram Automation, Store & Commerce (all of them)
- **Home** reads from: Instagram Graph API (analytics), Store & Commerce (revenue/sales), Instagram Automation (activity feed items)
- **Discover & Create** reads from: Page Builder (niche taxonomy, objectives), writes to: Instagram Automation, Store & Commerce
- **Instagram Automation** reads from: Store & Commerce (to deliver product links via DM), writes to: Home, AI Assistant
- **Store & Commerce** reads from: Page Builder (audience data for targeting), writes to: Home

---

## 10. THINGS THAT MUST NOT BE MISSING (QA CHECKLIST)

- [ ] Instagram OAuth connection flow, with token refresh and expiry handling
- [ ] Beginner vs. existing-creator onboarding branch, correctly routing to New Page vs. Import Page
- [ ] Zero-states for every widget/panel (new user with no data)
- [ ] Plan-based feature gating with "Upgrade to unlock" soft-lock UI (not broken buttons)
- [ ] Usage limit warning system (80%/100% AI credit triggers)
- [ ] Multi-page context switching reflected correctly across ALL modules
- [ ] Rate-limit-safe Instagram automation (compliance risk)
- [ ] Payment processing with full order status lifecycle
- [ ] AI credit usage metering and limits per tier (Section 2 table)
- [ ] Media upload in AI chat — file validation + content-safety check
- [ ] Niche taxonomy implemented as structured, extensible data (Section 5.1) — not free text
- [ ] Link-in-bio storefront single-link generation and product card rendering
- [ ] Notification system wired to real triggers
- [ ] Data privacy/consent handling for lead collection
- [ ] Account settings/billing panel — no team/collaborator features included
- [ ] Clear escalation/human-override path for any AI-driven automation
- [ ] 2FA and "log out of all devices" security options

---

## 11. EXPLICITLY OUT OF SCOPE FOR THIS BUILD

- Landing/marketing website (built AFTER product completion)
- Brand-side/campaign marketplace features
- Clipping/creator-payout infrastructure
- Multi-user/team accounts/collaborator roles

---

*This document should be treated as the living source of truth for development. Any deviation should be updated here first, then built — not the other way around.*
