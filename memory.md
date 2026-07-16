# Vyralify — Build Memory

This is the project's diary, not its spec. `PRD.md` / `architecture.md` / `phases.md` / `design.md`
/ `rules.md` describe what's *supposed* to be true; this file records what's *actually* been done,
decided, or discovered, in order, so a fresh session (possibly a different model entirely — Codex
today, maybe DeepSeek later) can pick up with zero prior chat history and not repeat work or
re-litigate settled decisions.

## How to use this file

- **Read it first**, every session, per `rules.md` §0.
- **Append, don't rewrite history.** New entry at the bottom, newest last, each with a date.
- Each entry should answer: what did I do, what did I decide (and why), what's still open, what
  should the next session do first.
- If something in the other docs turned out to be wrong (like the stack correction below), fix the
  source doc *and* log the correction here — both, not just one.
- Keep entries honest. Don't mark something done that wasn't actually run/tested.

---

## 2026-07-16 — Initial planning session

**What happened:** Built the first drafts of `PRD.md`, `architecture.md`, `rules.md`, `phases.md`,
and `design.md` from the approved 13-section landing page structure doc, the VYRALIFY wordmark, the
`Gradiente_Suave.jpg` color reference, and the Crunchy hero layout reference. No code was written
yet — this was pure planning/spec work.

**Correction logged:** first draft of `architecture.md` assumed a Next.js/React setup, inferred
from the `NEXT_PUBLIC_*` naming convention in `_env.local`. That was wrong. **Confirmed stack:
plain HTML/CSS/JS, one `.html` file per page, GSAP for animation, Lenis for smooth scroll — no
framework, no build step.** `architecture.md`, `rules.md`, `phases.md`, and `design.md` have all
been updated to match. The Firebase config values in `_env.local` are still correct and usable —
only the `NEXT_PUBLIC_` naming's usual meaning doesn't apply anymore; that config goes straight into
a plain `assets/js/firebase-config.js`.

**Current known state of the real project (from what's been shared, not yet independently verified
by an agent session — Phase 0 should confirm all of this):**
- Firebase project `vyralifyin1` exists. Auth is set up. Firestore is set up with `firestore.rules`
  already live, covering `users/{uid}` and `contentAssets/{document}`, with an `isAdmin()` helper
  keyed on `role == 'admin'` or two hardcoded admin emails (`support@vyralify.in`,
  `vyralify.io@gmail.com`).
- `firebase.json` currently only declares `functions` (source `functions`, codebase `default`) and
  `firestore` (rules path) — **no `hosting` block yet**, so the Vercel-vs-Firebase-Hosting question
  (`architecture.md` §9.1) is still genuinely open.
- Domain `vyralify.in` is reported connected, but the hosting target it points at hasn't been
  confirmed by an agent session yet.
- Marketing landing page (13 sections per `PRD.md` §4.1) is reported **complete**.
- Member dashboard shell is the next planned phase (matches `phases.md` Phase 4).
- No Razorpay, Stripe, Groq, or NVIDIA credentials confirmed present anywhere yet — treat as **not
  configured** until Phase 0 checks `/functions` and says otherwise.
- AI provider plan: Groq as primary (fast, short-form tools), NVIDIA NIM as secondary (heavier/
  longer-context tools) — not yet implemented, no code written.

**Open decisions still unresolved (see `architecture.md` §9 for full context):**
1. Hosting target for `vyralify.in` — Vercel vs Firebase Hosting.
2. Shared header/nav/footer pattern across pages — duplicate markup vs JS partial loader.
3. Community v1 — in-app feed vs embedded Discord.
4. Video/lesson hosting provider for the Content library.
5. Whether `/functions` is plain JS or TypeScript (default: plain JS, confirm if changed).

**Next session should:**
1. Run Phase 0 (`phases.md`) for real — actually check what's deployed, what secrets exist, what
   the current landing page's HTML/CSS looks like against `design.md`'s tokens.
2. Resolve open decisions #1 and #2 above before pages start multiplying (Phase 4 needs #2 decided).
3. Start Phase 1 verification pass on the existing landing page (does it already use anything close
   to the Void/Ink Navy/Signal Blue palette, or does it need a reconciliation pass?).

---

<!-- Next entry goes below this line. Copy the format above: date heading, what happened, what was
decided and why, what's open, what the next session should do first. -->

---

## 2026-07-16 — Phase 0 environment verification

**What happened:** Verified the repository working tree, local Firebase configuration, repository deployment clues, DNS, the current `/functions` state, and the available landing-page source. This was verification only; no product code, Firebase configuration, rules, or deployment state was changed.

**Actual working-tree structure vs. `architecture.md` §7:** The proposed plain-static structure does **not** exist yet. The root currently contains only planning/configuration documents, `firestore.rules`, `firebase.json`, `vyralifylogo.jpeg`, and ignored `_env.local`; it has **zero** `.html`, `.css`, `.js`, `.ts`, or `.tsx` files, no `/assets`, no `/partials`, and no `/functions` directory. `firebase.json` names `/functions` as its Functions source, but that directory is absent, so a Functions deploy from this working tree would not be viable. The Git index records the earlier Next/TypeScript application—including `app/`, `components/`, `functions/`, `package.json`, and landing components—as deleted in the current working tree. These deletions pre-existed this session and were not changed.

**Hosting finding:** `firebase.json` has `functions` and `firestore` blocks only—there is no `hosting` block. There is no `.firebaserc` or `vercel.json` in the working tree. DNS for `vyralify.in` delegates to `ns1.vercel-dns.com` and `ns2.vercel-dns.com`; apex and `www` resolve to `64.29.17.1` and `216.198.79.65`. This is conclusive evidence that the domain is currently managed/served through **Vercel DNS**, not Firebase Hosting. The Git remote and historical commits also point to a previous Vercel/Next deployment. An HTTPS HEAD request could not connect from this environment, so live page reachability/content was not independently checked.

**Secrets/functions finding:** There is no current `/functions` directory and therefore no current Razorpay, Stripe, Groq, or NVIDIA credential file/reference to classify as configured or placeholder. `_env.local` contains only the six public Firebase client-config variable names; it contains no payment or AI-provider variable names. The deleted Git baseline had TypeScript Functions code which referenced `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RAZORPAY_WEBHOOK_SECRET` with empty-string fallbacks, and included Razorpay/Stripe packages; it contained no Groq or NVIDIA credential reference. That historical code is not present/runnable in the current tree and does **not** prove any secret is deployed.

**Landing/design finding:** There is no current `index.html`, CSS, or runnable landing page to compare with `design.md`, so a current conformance check is impossible. The deleted Git baseline used Tailwind/Shadcn with a light palette (for example `#f4efe8`, white, indigo/violet/pink accents) and Geist/Geist Mono. It did not declare the required Void/Ink Navy/Signal Blue/Aura Cyan/Paper/Slate token set or Clash Display/General Sans/Space Mono typography. If that baseline is preserved or ported, it needs a reconciliation pass; it was not restored or modified here.

**Decisions/open items:** No implementation decision was made unilaterally. The factual hosting target is Vercel; confirm whether Vercel remains the intended target for the forthcoming static rebuild. The header/nav/footer strategy remains unresolved. Proposed defaults for confirmation: keep **Vercel** as the static-site host (the domain is already there), and use a **JS partial loader** for shared nav/footer before the number of static pages grows, with reserved slot dimensions to prevent layout shift. Do not begin Phase 2, 3, or 4 until these are confirmed and a deliberate decision is made about the pre-existing deleted application source.

**Next session should:** Obtain confirmation on the two defaults above, then decide whether the deleted legacy app is intentionally being replaced or needs recovery before creating any Phase 1/static assets. Re-run Phase 0 live checks once a local static entry point and `/functions` source exist; Firestore rules drift and deployed Functions secrets could not be verified from this checkout alone.

---

## 2026-07-16 — Static rebuild foundation (user-authorized)

**What happened:** The user explicitly directed a full plain HTML/CSS/JS rebuild for Vercel, including dashboard, admin, Firebase rules, payments, and AI. Created `index.html`, `login.html`, `signup.html`, `dashboard.html`, `admin.html`, shared CSS/JS assets, and shared nav/footer partials. The frontend uses Firebase browser modules, GSAP, and Lenis; it does not introduce a framework, TypeScript, or frontend build step. The prior deleted Next/TypeScript source was not restored or changed.

**Decisions made:** Vercel is the selected hosting target, per the user's confirmation that the Vercel deployment/domain wiring is already set. Shared nav/footer use the JS partial-loader pattern (`/partials/nav.html`, `/partials/footer.html`) with reserved nav slot space. The dashboard is a single HTML page with in-page category switching; admin is a separate protected `admin.html` page.

**Backend/security work:** Restored `/functions` as plain JavaScript with server-side user setup, active-tier-checked AI generation, checkout creation, and signature-verified Stripe/Razorpay webhook handlers. Secret names are referenced only via server environment variables and no values were added to the repo. Added rules blocks for `orders`, `aiGenerations`, `affiliates`, and `communityPosts` alongside the existing collections. Tightened `users` rules so clients can create only a free/member initial profile and cannot alter `role`, `tier`, subscription state, affiliate data, or AI usage. This is a security improvement: browser users can no longer self-upgrade a membership; only Admin SDK code invoked by verified webhooks can do so. `contentAssets` remains publicly readable as previously designed, with client-side tier presentation.

**What is not verified/live yet:** Firebase deployment was not run. `GROQ_API_KEY`, `NVIDIA_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, and `RAZORPAY_PLAN_ID` still need to be configured as Firebase Functions secrets/environment values before AI or paid checkout works. Payment/webhook flows have not been exercised against sandbox accounts. Content assets have not been seeded, so dashboard tracks can legitimately show empty states. The Firestore rules have not been deployed or emulator-tested in this session.

**Next session should:** Install Functions dependencies, deploy Functions/rules only after reviewing the secret setup and testing against Firebase Emulator Suite or sandbox accounts, seed clearly-labelled real content assets, then perform mobile, auth, payment/webhook, and AI end-to-end QA before calling any phase complete.
