# Vyralify — Rules for the Coding Agent

You (Codex / ChatGPT / DeepSeek / whichever model is driving this session) are working inside a
**live, revenue-connected** codebase: real domain (`vyralify.in`), real Firebase project
(`vyralifyin1`), real users' auth data. Treat it accordingly. These rules override generic
instincts to "just make it work" — when in doubt, do the smaller/safer thing and leave a note in
`memory.md` instead of guessing.

## 0. Session Start Protocol (do this before writing any code)

1. Read `memory.md` — this is the current state of the project, in the previous session's own words.
2. Read `rules.md` (this file).
3. Skim `architecture.md` and `phases.md` to know what phase you're in and why.
4. Check `design.md` before touching anything visual.
5. Only then start working — and only on the current phase from `phases.md` unless told otherwise.

At the **end** of every session (or before you run out of context/tokens), append an entry to
`memory.md` — see that file's own instructions. This is not optional; it's how the next session
(possibly a different model) picks up where you left off.

## 1. Hard Boundaries — never do these without explicit human approval in-chat

- **Never** modify `firestore.rules` and ship it without also describing the change in `memory.md`
  and explaining the security implication in plain language.
- **Never** add a new Firestore collection without a matching rules block in the same change.
- **Never** commit `.env`, `.env.local`, or any file containing real API keys/secrets. If you must
  reference an env var, reference its *name*, never its value, in code, comments, commits, or docs.
- **Never** call Groq or NVIDIA (or any paid API) directly from a page's client-side JS. There is
  no app server in this stack — all AI calls go through a Firebase Cloud Function per `architecture.md`.
- **Never** hardcode Razorpay/Stripe secret keys, webhook secrets, or Firebase Admin credentials in
  any file that ships to the client bundle.
- **Never** delete or rename the existing `users` or `contentAssets` collections/fields without a
  migration plan written down first.
- **Never** change the pricing logic (₹499/month India via Razorpay, $19/month elsewhere via
  Stripe) without it being an explicit instruction, not an inference.
- **Never** rewrite the completed landing page sections wholesale. Targeted fixes/improvements are
  fine; a "let me redo this section" rewrite is not, unless asked for.
- **Never** claim a feature is "done" in `memory.md` if it wasn't actually tested/run.

## 2. Working Style

- **Plain HTML/CSS/JS, no framework.** One `.html` file per page, vanilla JS (ES modules), no
  bundler or build step assumed. If you ever think a build step or TypeScript would genuinely help
  (e.g. inside `/functions`), say so explicitly and log the decision in `memory.md` — don't
  introduce one silently mid-session.
- **GSAP + Lenis are the only animation/scroll tools.** Initialize Lenis once in a shared script
  (`smooth-scroll.js`) and register GSAP/ScrollTrigger once (`gsap-animations.js`), both loaded the
  same way on every page. Don't hand-roll a competing scroll or animation approach (raw
  `IntersectionObserver` fade-ins, CSS-only scroll-snap tricks, etc.) on just one page — consistency
  across pages matters more than any single page's cleverness.
- **Small, reviewable changes.** Prefer several focused commits/diffs over one giant one. If a task
  is large, check it against `phases.md` and split it into sub-steps.
- **Mobile-first.** Most Vyralify users will be on a phone. Build and check the mobile layout
  first, then scale up — not the reverse.
- **Follow `design.md` literally** for colors, type, spacing, and the signature visual (the "Growth
  Aura" blob treatment). Don't introduce a new accent color, font, or button style ad hoc.
- **No placeholder content that looks real.** If you need dummy data (stats, testimonials, page
  handles) while building, mark it clearly (`// TODO: replace mock data`) — don't ship fabricated
  numbers or fake testimonials as if they were real.
- **Respect the tier-gating pattern** already established: `contentAssets` reads are open, tier
  filtering happens in the app layer per the existing rules-file comment — don't silently move this
  to a different enforcement point without flagging it.
- **Accessibility floor:** visible keyboard focus states, sufficient color contrast against the
  near-black background, respect `prefers-reduced-motion` for the aura/blob animations.

## 3. AI Feature Rules Specifically

- Every AI tool call must check the calling user's `tier`/`aiUsage` server-side before hitting
  Groq/NVIDIA — never trust a client-supplied "I'm a paid member" flag.
- Log enough to debug and rate-limit (uid, tool, timestamp, token count) — avoid logging full raw
  generations if it's not needed, to keep user data footprint minimal.
- If a provider call fails, fail gracefully in the UI ("Couldn't generate that — try again") — never
  surface raw provider error text or stack traces to the end user.
- Don't let AI tools be usable by unauthenticated/free-tier users beyond whatever explicit limit
  product has actually defined; if that limit isn't defined yet, default to zero and ask.

## 4. Money Rules Specifically

- Webhook handlers (Razorpay/Stripe) must verify signatures before trusting any payload.
- A user's `tier` should only ever change as a result of a verified webhook or an explicit admin
  action — never from a client-side write.
- Currency/gateway routing decided at checkout is sticky (stored on the user doc) — don't
  re-derive it silently later and risk double-currency confusion.

## 5. When You're Not Sure

If a requirement is ambiguous (e.g. "should cancellation be self-serve or support-only?"), make the
smallest reasonable assumption, clearly label it as an assumption in `memory.md`, and keep moving —
don't block the whole session on it. Reserve actually stopping and asking the human for things with
real consequences: money logic, auth/security changes, or anything that would be expensive to undo.

## 6. Model Handoff

This project may be worked on by different AI tools in sequence (Codex today, possibly DeepSeek
later). `memory.md` exists specifically so none of you need the others' chat history — it needs to
be a complete enough snapshot that a fresh model with zero prior context can read it and continue
correctly. Write it with that reader in mind.
