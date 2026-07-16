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

---

## 2026-07-16 — Frontend rebuild + community chat rules change (user-authorized)

**What happened:** The 5 root HTML pages had been deleted since the previous entry; the backend (`functions/index.js`), `firestore.rules`, all CSS tokens, and most JS were still intact. The user authorized keeping the backend and rebuilding the frontend, adding a floating AI Creator Assistant with client-side chat history, a Firestore-only realtime community chat (fully on-brand, no paid services), and login-aware pricing currency detection. Rebuilt `index.html` (all 13 sections per `PRD.md` §4.1), `login.html`, `signup.html`, `dashboard.html` (5 category tabs + community + AI widget), and `admin.html` (protected content/user management). Added new JS modules `assets/js/pricing.js`, `ai-widget.js`, `community.js`, `admin.js`, `landing.js`; refactored `dashboard.js` to orchestrate tabs/widget/community; rewrote `gsap-animations.js` to register ScrollTrigger and hook Lenis. Extended `app.css` with chat + expanded AI-widget styles, switched `base.css` to load Clash Display / General Sans via Fontshare, and added footer-link styles. No framework, no build step introduced.

**Firestore rules change (the one authorized backend touch — logged per `rules.md` §1):** Extended only the `communityPosts` block. Added a `validPost()` function and changed `create` to accept the field set `['uid','displayName','channel','body','createdAt']` (was `['uid','body','createdAt']`). The rule still enforces `uid == request.auth.uid` so authorship cannot be spoofed, restricts `channel` to the five allowed channel ids (`introductions`, `general`, `networking`, `wins`, `reviews`), caps `body` to 1–1000 chars, and caps `displayName` to 80 chars. Read stays `signedIn()`; update/delete stay owner-only. **Security implication in plain language:** this enables author display names and channels in community chat. A signed-in user still cannot forge another user's `uid`, but `displayName` is client-supplied and therefore spoofable/duplicable — acceptable for a v1 chat, but do not treat `displayName` as an identity guarantee (always key trust on `uid`). This rules change has NOT been deployed or emulator-tested this session; it is console/emulator-review only until a deliberate deploy.

**Design/technical decisions:** Community = Firestore `communityPosts` with a single `onSnapshot` ordered by `createdAt` and client-side channel filtering, deliberately avoiding composite-index requirements (same approach used in `dashboard.js` asset queries and `admin.js` — all fetch/order on a single field and filter/sort client-side, so no manual Firestore indexes are needed). AI widget keeps the backend stateless: per-uid history lives in `localStorage` (`vyralify.ai.<uid>`, capped ~40 entries) and recent turns are prepended into the prompt string for continuity. Free-tier users see an on-brand locked state instead of an error. Pricing currency detection: signed-out visitors get an immediate browser-locale/timezone best-guess (`Asia/Kolkata` or `-in` locale → India ₹499), signed-in visitors use the authoritative `country` from their Firestore profile; default fallback is `$19` to avoid layout shift. This only chooses which of the two existing PRD prices to display — the ₹499-India / $19-ROW logic and server-side gateway routing in `createCheckout` are unchanged.

**What is not verified/live yet:** No Functions/rules deploy was run this session. AI and paid checkout remain gated until the provider/payment secrets from the previous entry are configured. Content assets are still unseeded, so dashboard tracks can legitimately show empty states. Landing testimonials/stats use clearly-labelled sample content per `rules.md` (no fabricated real numbers). Pages must be served over local http (not `file://`) for the ES-module/Firebase imports to resolve.

**Next session should:** Serve locally over http and walk each page (auth signup/login/guard, 5 dashboard tabs, AI widget history + locked state, two-session community chat per channel, pricing swap for India vs ROW), do a 375–430px mobile pass and a `prefers-reduced-motion` aura-freeze check, then seed labelled content assets. Deploy the `communityPosts` rules change only after an emulator review.

---

## 2026-07-16 — Blue-white retheme to match dropcourse.com (user-authorized)

**What happened:** User asked to drop the near-black "Void" theme and match dropcourse.com's look — a **blue-and-white** system. Inspected dropcourse.com live via the browser MCP: deep-navy hero/footer with a concentrated top-center blue glow, royal-blue accents, bold white hero headline, and clean white content cards on a light blue-white body. Retooled the token/style layer to that system (design change only; no HTML structure, JS logic, functions, or rules changed). Files touched: `tokens.css` (new semantic palette), `base.css` (white body + dark text + white cards + navy footer + safe reveal CSS), `landing.css` (navy hero with glow, white sections, blue stat/step numbers, styled FAQ, navy final-CTA), `app.css` (dashboard/auth/chat/AI-widget flipped to light surfaces with blue accents and white-on-blue bubbles), and `gsap-animations.js`.

**Reveal-animation bug fixed:** the previous `gsap-animations.js` used `gsap.from(... scrollTrigger)`, which immediately set `[data-reveal]` elements to opacity:0 and left large blank blocks when triggers didn't fire (e.g. full-page capture / CDN hiccup). Replaced it with a dependency-free vanilla module: content is visible by default in CSS, JS only opts into a hidden→shown IntersectionObserver transition, with a 2.5s failsafe that force-shows everything, plus a vanilla count-up. Removed the esm.sh GSAP/ScrollTrigger import entirely (Lenis smooth-scroll is untouched).

**Palette (blue-white):** dark navy `--ink-navy #0A1330` / `--navy-2 #0E1A3F` / `--void #060B1A` for hero/footer/CTA; `--signal-blue #2F6BFF` primary accent with `--aura-cyan #5FA8FF` glow; light surfaces `--paper #F4F7FE` / `--white #FFFFFF`; text `--text-dark #0A1330` / `--text-muted #55607A`. Tuned the hero glow down (was washing the navy to light-blue and killing white-text contrast) to a concentrated top beam.

**Verified over local http:** landing, login render clean with no console errors; hero is dark-navy with readable white headline; stat count-ups animate; pricing shows ₹499 (locale-detected). Auth guard still redirects signed-out users. No deploy; backend/rules unchanged.

---

## 2026-07-16 — Card grid alignment fix + motion/3D upgrade (user-authorized)

**Grid alignment:** the card grids collapsed to a rigid 2-column layout at in-between widths (~710px), orphaning odd cards (the 3rd niche card and the 5th stat) against an empty cell. Switched `.feature-grid`/`.value-grid`/`.stat-grid` in `landing.css` to centered flex-wrap (`flex:1 1 260px`/`150px` + `max-width`), so leftover cards center instead of leaving a blank cell at every width. `.steps` stays a grid (1→2→4 cols; 4 divides evenly).

**Motion upgrade (SectionFlow-inspired):** user asked for scroll animations like sectionflow.vercel.app + better spacing + "3d element and cards". Rewrote `gsap-animations.js` into a motion engine: staggered directional reveals (each item's `--i` = its index among revealing siblings drives a cascading delay; CSS in `base.css` supports up/left/right/scale/clip variants), scroll-linked `data-parallax` drift (translate3d only), 3D pointer-tilt on cards (`.feature/.value/.step/.stat/.pricing/.mockup`, pointer-fine only, perspective+rotateX/Y), and the existing count-up. Still dependency-free with the 2.5s reveal failsafe + reduced-motion guard.

**Imported 3D element:** new `assets/js/hero3d.js` imports Three.js (module CDN `unpkg three@0.160.0`) and renders a glossy brand-blue icosahedron inside a cyan wireframe shell in the hero, slow auto-rotate + pointer parallax. Mounted on `<canvas id="hero3d">` in the hero visual, layered behind a tilting dashboard mockup and three floating glass "chip" cards (AI caption / +2,480 followers / ₹40k month). Fails silently (hides canvas) if WebGL/import unavailable, so the hero always renders.

**Spacing:** added a spacing scale to `tokens.css` (`--space-section` clamp, `--space-head`, `--gap`, easing vars, `--shadow-3d`, `--glass`) and applied it across sections/heads/cards for consistent vertical rhythm; softened default card shadow with hover-lift depth.

**Verified over local http (browser MCP):** no console errors; Three.js canvas loads (782×401, not hidden) with visible wireframe 3D + floating glass cards; niche/stat grids center their orphans; features/pricing sections show clean spacing; pricing still ₹499. Design/animation only — no HTML logic, functions, or rules changed. No deploy.

**Follow-up refinement (same day):** per user, removed the "Vyralify Dashboard" mockup card from the hero so the imported 3D icosahedron is a clean standalone centerpiece; repositioned the three floating glass cards to the corners (top-left/top-right/bottom-left) so nothing overlaps the object; pulled the 3D camera back (z 6→7.6) and brightened the core material (lower metalness + emissive glow) so the brand blue reads vividly. Strengthened the "imported" scroll feel: section headers now reveal with a clip-path wipe (JS retags `.section-head[data-reveal]` to `data-reveal="clip"`). Removed the now-unused `.mockup`/`.mock-*`/`.tilt-wrap` CSS. Re-verified: hero shows only the 3D + non-overlapping corner cards, no console errors.
