# Vyralify — Build Phases

Work top to bottom. Don't start a phase until the previous one's exit criteria are actually true,
not just "probably fine." Mark phases `[DONE]` / `[IN PROGRESS]` / `[NOT STARTED]` here as you go —
this file is the map, `memory.md` is the diary.

---

## Phase 0 — Environment Sanity Check `[DO THIS FIRST, EVERY FRESH SESSION]`
**Goal:** confirm the ground truth before building anything.
- Confirm the static site (`index.html` etc.) opens correctly via a local server (e.g. `npx serve`
  or the Firebase emulator — plain `file://` will break Firebase SDK/module imports) against
  Firebase project `vyralifyin1`.
- Confirm `firestore.rules` deployed matches the copy in this repo (no drift).
- Confirm `vyralify.in`'s actual hosting target (Vercel vs Firebase Hosting — see `architecture.md`
  §9) and that DNS/deploy is correctly linked to it.
- Confirm which secrets actually exist vs. which are still placeholders (Razorpay, Stripe, Groq,
  NVIDIA keys are likely **not** added to `/functions` yet — check, don't assume).
- Confirm the shared-partials decision (`architecture.md` §7: duplicate markup vs JS partial
  loader) has been made — if not, make it now before pages start multiplying.
**Exit criteria:** you know, factually, what's live and what's stubbed. Log findings in `memory.md`.

---

## Phase 1 — Marketing Landing Page `[DONE per existing project]`
**Goal:** the 13-section landing page described in `PRD.md` §4.1.
**Status:** reported complete. Treat this phase as **verification + polish only**:
- Confirm it matches `design.md` tokens (colors/type may predate this design pass — reconcile).
- Confirm mobile layout for all 13 sections.
- Confirm CTAs ("Join Vyralify") point somewhere real (even if that "somewhere" is a coming-soon
  state until Phase 3 ships payments).
**Exit criteria:** landing page is live, responsive, and visually matches `design.md`.

---

## Phase 2 — Auth & Onboarding `[NEXT, in parallel with Phase 3]`
**Goal:** real signup/login and a `users/{uid}` doc created correctly for every new user.
- Firebase Auth email/password + Google sign-in.
- `onUserCreate` Cloud Function trigger to seed the Firestore user doc (see `architecture.md` §4).
- Country capture (for currency routing) — ask at signup or infer + let user confirm.
- Minimal onboarding: Beginner vs Existing-creator track selection.
**Exit criteria:** a new user can sign up, lands with a correct Firestore doc, and their
`country`/track is stored.

---

## Phase 3 — Payments (Razorpay + Stripe dual routing) `[NEXT]`
**Goal:** a user can actually pay and become a member.
- Checkout flow branches by `country` → Razorpay (INR) or Stripe (USD), per `architecture.md` §6.
- Webhook handlers in Firebase Functions, signature-verified, update `users/{uid}.tier` +
  `subscriptionStatus`.
- `orders/{id}` collection logs every attempt (success and failure).
- Failure/cancellation/renewal states handled, not just the happy path.
**Exit criteria:** a real (or sandbox) payment flips a test user from `free` to `active` and the
dashboard reflects it without a manual refresh.

---

## Phase 4 — Member Dashboard Shell `[THIS IS THE NEXT PLANNED PHASE — memory.md confirms]`
**Goal:** the gated app shell exists, with the 5-tab structure and correct access control.
- Auth-guarded dashboard pages — `auth-guard.js` (shared script, see `architecture.md` §7) runs on
  every `dashboard-*.html` page and redirects signed-out users to `login.html`.
- Tab navigation: Foundation / Content & Posting / Scaling & Growth / Monetisation / Community
  (either as in-page tab-switching JS on one `dashboard.html`, or as separate pages — decide and
  log which in `memory.md`, then be consistent).
- Each tab renders its `contentAssets` (query by `category`), respecting `tierRequired` gating.
- Floating AI Creator Assistant widget shell (UI only — wire to real AI in Phase 5).
- Empty/locked states designed per `design.md` (no bare "403" text — see writing guidance there).
**Exit criteria:** a logged-in `active` member can navigate all 5 tabs and see real
(or seeded-placeholder-and-labeled) content; a `free` member sees locked states correctly.

---

## Phase 5 — AI Creator Tools `[AFTER Phase 4 shell exists]`
**Goal:** the AI widget actually generates content via Groq/NVIDIA.
- Server-side AI provider layer per `architecture.md` §5.
- Wire up: Caption, Hook, Content Idea, Script, Hashtag generators (Groq-first).
- Wire up: Niche Research, Bio Generator, Trend Finder, Growth Insights, Content Planner
  (NVIDIA-first, or Groq if latency/quality testing says otherwise — log the decision).
- Rate limiting / tier gating enforced server-side.
**Exit criteria:** each AI tool works end-to-end for an `active` member, is blocked/limited
correctly for `free`, and failures degrade gracefully.

---

## Phase 6 — Affiliate System
**Goal:** members can refer others and see it tracked.
- Auto-generate `affiliateCode` on user creation.
- Referral capture at signup (`?ref=CODE` → stored as `referredBy`).
- `affiliates/{code}` doc tracks clicks/signups/conversions.
- Simple affiliate dashboard view (can live inside the Monetisation tab).
**Exit criteria:** referral link → signup → conversion is traceable end-to-end in Firestore.

---

## Phase 7 — Resource Vault & Content Population
**Goal:** the `contentAssets` collection is actually filled with real lessons/templates, not stubs.
- Admin-side content entry flow (even a simple internal form or seed script is fine for v1).
- Populate at least Foundation + one full track end-to-end before calling this phase done.
**Exit criteria:** a new member can complete the Foundation track using only real content.

---

## Phase 8 — Community
**Goal:** decided in `architecture.md` open question #2 — resolve it here before building.
- If embedded Discord: invite flow + role sync.
- If in-app: minimal feed/thread model in Firestore, moderation basics.
**Exit criteria:** members can post/see activity in whichever mode was chosen.

---

## Phase 9 — QA, Performance, SEO, Launch Polish
- Lighthouse pass on landing page (mobile).
- Broken-link/CTA sweep across all 13 landing sections.
- Webhook failure simulation (does the app handle a failed payment gracefully end-to-end?).
- Meta tags/OG image/favicon for `vyralify.in`.
- Final `design.md` conformance pass.
**Exit criteria:** ready to point real traffic at it with confidence.

---

## How to Use This File

- Update the `[STATUS]` tag on each phase heading as you go.
- Never skip Phase 0's checks just because "it probably still works."
- If a phase reveals it depends on an unresolved decision from `architecture.md` §9, stop, make the
  call (or ask), write it down, then continue — don't build around an unresolved fork twice.
