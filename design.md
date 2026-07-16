# Vyralify — Design System

Source material this is derived from: the VYRALIFY wordmark (black background, white type, both
"Y"s in a signal blue), `Gradiente_Suave.jpg` (a slow navy-to-cobalt liquid gradient — this sets the
*mood*), and the Crunchy landing page reference (a big soft-edged blob as the hero's visual anchor,
sitting behind/beside a floating card, with a pill CTA — this sets the *composition*, not the light
color scheme). Vyralify is dark, precise, and a little "algorithmic" — this is a growth/AI tool, not
a lifestyle brand, so the system should feel like a control panel that a serious creator trusts with
their income, not a generic dark-mode SaaS template.

## 1. Color

| Name | Hex | Use |
|---|---|---|
| **Void** | `#05070C` | Primary background — near-black, matches the wordmark's canvas |
| **Ink Navy** | `#0B1024` | Elevated surfaces: cards, nav bar, dashboard mockup frame |
| **Signal Blue** | `#2F6BFF` | Primary accent — CTAs, links, the wordmark's "Y"s, active states |
| **Aura Cyan** | `#5FA8FF` | Lighter end of the gradient glow ("Growth Aura," see §4) — never used as flat fill, only in gradients |
| **Paper** | `#F5F7FB` | Primary text on dark surfaces |
| **Slate** | `#8890A6` | Secondary/muted text, borders, dividers, placeholder text |

Functional-only (not decorative — use sparingly, only for real states):
- Success `#2FD97C` (payment success, completed lesson)
- Error `#FF5C5C` (failed payment, form errors)

Rule: Signal Blue and Aura Cyan are the *only* blues in the system. Don't let a second, slightly
different blue creep in from a copy-pasted component library default.

## 2. Typography

| Role | Typeface | Notes |
|---|---|---|
| Display (headlines, hero, section titles) | **Clash Display**, Semibold/Bold | Geometric, confident, slightly technical — echoes the wordmark's blocky letterforms. Used with restraint: headlines and numerals only, never body copy. |
| Body (paragraphs, nav, buttons, UI labels) | **General Sans**, Regular/Medium | Clean, humanist, high legibility at small sizes on mobile. |
| Utility (stats, timestamps, AI tool output, code-like data) | **Space Mono**, Regular | Reinforces the "this is a data/analytics tool" feeling — use for the stat cards (120+ Pages Built, 500M+ Views), progress trackers, and anywhere a number is the point. |

Type scale (base 16px, mobile-first, scale up at `md:`/`lg:` breakpoints):
- Display XL (hero headline): 40px → 64px
- Display L (section headings): 28px → 40px
- Body: 16px, 1.6 line-height
- Small/caption: 13px, Slate color

## 3. Layout Principles

- **Mobile-first, generous vertical rhythm.** Most traffic is on a phone (per the platform
  screenshots this project was scoped from) — design the 375–430px width first, then expand.
- **Cards float on Void, never touch the edge.** Rounded corners (16–24px radius), a 1px `Slate`
  border at low opacity, subtle inner glow rather than a hard drop shadow.
- **One Aura per view.** The Growth Aura (§4) should appear once per screen as the hero/anchor
  moment — repeating it everywhere flattens its impact into generic ambient decoration.
- **Numbered steps only where order is real.** "How It Works" (Join → Launch → Monetise → Scale)
  is a genuine sequence — number it. Feature grids and pricing inclusions are *not* sequences —
  don't add 01/02/03 markers there just for rhythm.

### Hero composition (signature moment)
```
┌──────────────────────────────────────────────────────────┐
│  [pill] The #1 AI-Powered Platform Built For IG Creators   │
│                                                              │
│  Build, Grow &                     ╭──────────────╮         │
│  Monetise Viral                    │   ░░ AURA ░░  │         │
│  Instagram Pages.                  │  ░▓▓▓▓▓▓▓▓░  │         │
│  (Monetise in Signal Blue)         │ ░▓▓        ▓░ │         │
│                                     │ ░▓  DASHBOARD│░│         │
│  subheadline copy...               │ ░▓   MOCKUP  ▓│░│         │
│                                     │ ░▓▓        ▓▓░│         │
│  [● Join Vyralify] [▶ View Platform]│  ░▓▓▓▓▓▓▓▓░  │         │
│                                     ╰──────────────╯         │
│  ✓AI Powered ✓Beginner Friendly ✓Weekly Updates ✓Community  │
│  👤👤 Join 1,000+ creators building with Vyralify            │
└──────────────────────────────────────────────────────────┘
```
The dashboard mockup card sits *inside* the aura's glow, not beside it — the aura should read as
light emanating from the product itself (implying the platform is "live"/active), not as decoration
floating independently. This is the adaptation of the Crunchy reference: same card-in-blob idea,
inverted to dark mode and tied to the brand's own blue rather than a generic gradient.

## 4. The Growth Aura — signature element

A soft, slow-moving radial gradient blob, `Signal Blue → Aura Cyan → transparent`, heavily blurred
(60–100px blur radius equivalent), low opacity (25–40%) against Void. Modeled on the flowing shapes
in `Gradiente_Suave.jpg` but simplified to 1–2 blob shapes rather than a busy multi-wave pattern.

Where it appears (and *only* here — this is what keeps it a signature rather than wallpaper):
1. Behind the hero dashboard mockup.
2. Behind the pricing card (subtle, reinforces "this is the moment that matters").
3. As a hover-reveal behind a stat card in Social Proof (appears on hover/focus, not always-on).

Motion: a very slow (20–40s loop) drift/breathe animation — barely perceptible, ambient, never
distracting from foreground content. Respect `prefers-reduced-motion`: freeze the aura on a single
static frame for those users, don't just slow it down.

## 5. Components

- **Buttons:** pill-shaped (full radius). Primary = Signal Blue fill, Paper text. Secondary =
  transparent fill, 1px Slate border, Paper text, fills Signal Blue on hover.
- **Pills/badges (trust badge, feature pills):** Ink Navy fill, 1px Slate border at low opacity,
  Paper or Slate text depending on emphasis.
- **Stat cards:** Ink Navy surface, number set in Space Mono + Display size, label in Slate below.
  Animate count-up from 0 on scroll-into-view (once per session, not every time you scroll past).
- **Nav bar:** per the source spec, the marketing nav is intentionally light/white with dark text
  (a deliberate contrast moment against the otherwise dark site) — keep that choice, don't force it
  dark just for consistency; the in-app dashboard nav, by contrast, stays on the Void/Ink Navy system.
- **Locked content state (dashboard, free-tier gating):** don't show a bare padlock icon and
  "Upgrade" — say what the member is missing and what unlocking it does for them, in the product's
  voice ("Unlock the full Content library to post your first viral reel today"), consistent with the
  writing guidance below.

## 6. Motion Guidance

- One orchestrated hero load-in (headline + card fade/slide together, aura fades up last) beats
  scattered micro-animations everywhere.
- Scroll-triggered reveals: stat counters, testimonial cards, before/after comparisons — fine, keep
  them subtle (short duration, small distance).
- Hover states: scale/glow on interactive cards (per the source spec's note on Instagram profile
  cards) — keep it small (1.02–1.05 scale), not bouncy.
- Always respect `prefers-reduced-motion`.

**Implementation, matching `architecture.md`'s shared-script setup:**
- `smooth-scroll.js` initializes **Lenis** once per page and drives its RAF loop through
  `gsap.ticker` (rather than `requestAnimationFrame` directly) so Lenis and GSAP stay in sync.
- `gsap-animations.js` registers `ScrollTrigger` once and wires it to Lenis's `scroll` event
  (`lenis.on('scroll', ScrollTrigger.update)`), so scroll-triggered reveals (stat counters,
  testimonial cards, before/after) fire at the right position even with Lenis's easing applied.
- The Growth Aura's ambient drift is a single GSAP timeline (`repeat: -1, yoyo: true`, long
  duration, no `ScrollTrigger` needed since it's always-on, not scroll-linked) — pause/skip it
  entirely under `prefers-reduced-motion`, don't just slow it down.
- Colors and type live as CSS custom properties in `tokens.css` (`--void`, `--ink-navy`,
  `--signal-blue`, `--aura-cyan`, `--paper`, `--slate`) so every page pulls from the same source
  instead of re-declaring hex values inline.

## 7. Voice & Writing

- Write from the creator's side of the screen: "Post your first reel," not "Initiate content
  workflow."
- Buttons say exactly what happens: "Join Vyralify," "Generate Caption," "Unlock Full Access" — not
  "Submit" or "Continue."
- Empty/locked states are an invitation to act, not an apology. No "Oops!" — state what's missing
  and the one next action that fixes it.
- Stat and proof copy stays concrete and specific ("120+ Pages Built") over vague superlatives
  ("Tons of pages built!").

## 8. Self-Check Before Shipping Any New Screen

- Does it use *only* the six named colors above (plus the two functional states where genuinely
  needed)?
- Is there more than one Aura visible on screen at once? If yes, remove one.
- Would this screen look identical if you swapped the wordmark for a generic SaaS logo? If yes,
  it's not using the system — the aura, the mono-numeral stats, and the pill/card language should
  make it recognizably Vyralify even without the logo present.
