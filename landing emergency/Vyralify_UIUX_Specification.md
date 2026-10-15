# 🎨 VYRALIFY — COMPLETE UI/UX SPECIFICATION
*For the developer. This document defines every design decision — layout, components, spacing, color, typography, interactions, states — across every module. No coding needed from the product owner's side; this is purely a design specification.*

---

## PHASE 1 — DESIGN SYSTEM (Foundation)

### 1.1 Core Philosophy
Not a generic AI SaaS dashboard. Not a cheap creator tool. Vyralify should feel like:
- **Premium but approachable** — Linear's cleanliness + Whop's confidence + Vyralify's own identity
- **Dark-first, light-capable** — Dark mode is the flagship experience; light mode is equally polished, not an afterthought
- **Data-forward without being cold** — charts and numbers feel alive and relevant, not like a boring analytics tool
- **Intelligent** — every screen should feel like the product knows what you're doing and is one step ahead

The single standard: "Does this look like it costs $999/mo to use, or ₹9?"

---

### 1.2 Color System

#### Dark Mode (Primary)
| Token | Value | Usage |
|---|---|---|
| `--bg-base` | #0A0A0A | Main app background |
| `--bg-surface` | #111111 | Cards, panels, sidebar |
| `--bg-elevated` | #1A1A1A | Hover states, dropdowns, modals |
| `--bg-overlay` | #242424 | Tooltips, popovers |
| `--border-subtle` | #1F1F1F | Card borders, dividers |
| `--border-default` | #2A2A2A | Input borders, section dividers |
| `--text-primary` | #FFFFFF | Headlines, main labels |
| `--text-secondary` | #A0A0A0 | Subtext, descriptions, metadata |
| `--text-tertiary` | #555555 | Placeholders, disabled |
| `--green-primary` | #23E598 | Primary CTA, active nav, success |
| `--green-hover` | #1DCC84 | Hover on green elements |
| `--green-subtle` | rgba(35,229,152,0.08) | Green tint backgrounds |
| `--green-glow` | rgba(35,229,152,0.15) | Glow effects, focus rings |
| `--red-soft` | #FF4D4F | Errors, negative trends |
| `--yellow-soft` | #FFB800 | Warnings, pending states |
| `--blue-soft` | #4D9EFF | Info states, links |

#### Light Mode
| Token | Value | Usage |
|---|---|---|
| `--bg-base` | #F5F5F5 | Main app background |
| `--bg-surface` | #FFFFFF | Cards, panels, sidebar |
| `--bg-elevated` | #F0F0F0 | Hover states, dropdowns |
| `--border-subtle` | #EBEBEB | Card borders |
| `--border-default` | #D9D9D9 | Input borders |
| `--text-primary` | #0A0A0A | Headlines |
| `--text-secondary` | #666666 | Subtext |
| `--text-tertiary` | #AAAAAA | Placeholders |
| `--green-primary` | #1DC884 | Slightly deeper green for light bg |
| All other tokens | Same value | Green/red/yellow/blue stay consistent |

#### Theme Toggle
- Toggle lives in the top-right of the top bar (sun/moon icon)
- Transition: 200ms ease — no jarring flash
- User preference saved to account settings
- Default: Dark mode

---

### 1.3 Typography

**Font Family:** Inter (primary) — clean, modern, globally legible. JetBrains Mono for any code/data strings only.

| Scale | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| Display | 32px | 700 | 1.2 | Page headers, hero states |
| H1 | 24px | 600 | 1.3 | Module titles |
| H2 | 20px | 600 | 1.35 | Section headers |
| H3 | 16px | 600 | 1.4 | Card titles, labels |
| Body Large | 15px | 400 | 1.6 | Primary body text |
| Body | 14px | 400 | 1.6 | Default body text |
| Body Small | 13px | 400 | 1.5 | Secondary labels, metadata |
| Caption | 12px | 400 | 1.4 | Timestamps, fine print |
| Mono | 13px | 400 | 1.5 | Data values, code snippets |

**Rule:** Never go below 12px. Never use more than 3 font weights on any single screen.

---

### 1.4 Spacing System (8px base grid)
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80 / 96

Card internal padding: 20px (compact) / 24px (default)
Section gaps: 24px between cards in same row, 32px between sections
Page outer padding: 32px desktop, 20px tablet, 16px mobile

---

### 1.5 Border Radius
| Element | Radius |
|---|---|
| Cards, panels | 12px |
| Buttons (default) | 8px |
| Buttons (pill/CTA) | 999px (fully rounded) |
| Inputs | 8px |
| Badges, chips | 6px |
| Avatars | 50% |
| Modals | 16px |
| Dropdowns | 10px |

---

### 1.6 Shadows (Dark Mode: glow-based, Light Mode: shadow-based)

Dark mode — use subtle green glow for focus/active states only, not decorative:
- Focus ring: `0 0 0 2px var(--green-glow)`
- Card hover: `0 4px 24px rgba(0,0,0,0.4)`
- Modal: `0 20px 60px rgba(0,0,0,0.6)`

Light mode:
- Card default: `0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)`
- Card hover: `0 4px 20px rgba(0,0,0,0.10)`
- Modal: `0 20px 60px rgba(0,0,0,0.15)`

---

### 1.7 Core Components

#### Buttons
| Variant | Background | Text | Usage |
|---|---|---|---|
| Primary | `--green-primary` | #000000 | Main CTA |
| Primary Hover | `--green-hover` | #000000 | |
| Secondary | Transparent | `--text-primary` | Border: `--border-default` |
| Ghost | Transparent | `--text-secondary` | Subtle actions |
| Destructive | `--red-soft` | #FFFFFF | Delete/disconnect |
| Disabled | `--bg-elevated` | `--text-tertiary` | |

Button sizes: SM (32px height, 12px side padding) / MD (36px height, 16px) / LG (44px height, 24px)
Icons in buttons: 16px, 4px gap from label

**Critical:** Every CTA button uses rounded-pill style (border-radius: 999px). Secondary/ghost use 8px radius. This creates a clear visual hierarchy between "do something important" vs "minor action."

#### Input Fields
- Height: 40px
- Border: 1px solid `--border-default`
- Background: `--bg-elevated`
- Focus: border color transitions to `--green-primary`, focus ring applied
- Placeholder: `--text-tertiary`
- Icon left/right: 16px, `--text-secondary`
- Error state: border `--red-soft`, error message in caption below

#### Cards
- Background: `--bg-surface`
- Border: 1px solid `--border-subtle`
- Radius: 12px
- Padding: 20px
- Hover (interactive cards): background lifts to `--bg-elevated`, border lightens slightly
- No box shadows in dark mode by default — border alone defines cards
- Light mode: add a subtle shadow (see 1.6)

#### Badges / Status Chips
- Height: 22px, padding: 4px 8px, radius: 6px
- Success: green-subtle bg + green text
- Warning: yellow-subtle bg + yellow text
- Error: red-subtle bg + red text
- Neutral: `--bg-elevated` + `--text-secondary`
- Font: 12px, 500 weight

#### Data Metric Cards (KPI cards on Home)
Structure:
```
[Icon]  Metric Name
        Big Number    [Trend arrow + %]
        Sparkline chart (subtle, right-aligned)
        "+XXX this week" (caption)
```
Green trend = positive. Red trend = negative. Sparkline uses green for positive, red for negative trendline. Card background: `--bg-surface`.

#### Charts
- Library decision: developer's choice, but visual style must match:
- Line charts: smooth curves, no fill/area by default (clean look), single dot on hover with tooltip
- Bar charts: rounded top corners (4px radius), green bars, subtle gridlines only (no heavy borders)
- Donut charts: 4px gap between segments, center shows total value
- All charts: no heavy axes, minimal gridlines, light text labels only
- Tooltip: dark background (`--bg-overlay`), white text, rounded, appears on hover with smooth fade

#### Navigation (Sidebar)
- Width: 220px expanded, 60px collapsed (icon-only)
- Toggle: chevron arrow at bottom of sidebar (not a hamburger — more elegant)
- Active item: green left-side indicator bar (3px) + green text + `--bg-elevated` background
- Hover: `--bg-elevated` background, text lightens
- Icons: 20px, consistent style (Lucide or Phosphor — pick one, use throughout)
- Logo: top of sidebar, 28px height, clickable (goes to Home)
- Bottom of sidebar: user avatar + name + plan badge + settings icon (not cluttered at top)

---

### 1.8 Motion & Interactions
- Page transitions: fade (150ms ease)
- Sidebar collapse/expand: 200ms ease
- Card hover: transform: translateY(-1px), 150ms ease
- Modal open: scale 0.97 → 1.0 + fade in, 200ms
- Dropdown open: translateY(-4px) → 0 + fade, 150ms
- Skeleton loading: shimmer animation, 1.5s loop
- No bouncy/springy animations — clean, professional, fast
- No animations exceeding 300ms anywhere

---

## PHASE 2 — APP SHELL

### 2.1 Top Bar (persistent across all screens)
Height: 56px
Background: `--bg-surface`, bottom border: `--border-subtle`

Left side:
- Vyralify logo (only in expanded sidebar; disappears in collapsed, logo moves to top of icon column)

Center:
- **Instagram Page Selector** — most important persistent element
  - Shows: Instagram profile picture (24px circle) + @handle + dropdown arrow
  - Dropdown: lists all connected pages with avatars, active status dot, "Add Page" at bottom
  - This is the page-context switcher (described in product spec as critical)

Right side (left to right):
- Global search bar (280px width on desktop, icon-only on tablet/mobile)
  - Shortcut hint: Ctrl+K
  - Search opens a command-palette style full-screen overlay when clicked
- Connection status dot (green = connected, red = disconnected) + "Last synced" timestamp (subtle)
- Notification bell with unread count badge
- Help icon (?)
- User avatar (32px) — click opens a dropdown: Profile, Settings, Billing, Theme toggle, Logout

### 2.2 Sidebar Navigation
Full sidebar structure (top to bottom):
```
🏠 Home
✍️ Create Content      ← shortcut to Discover & Create's Create tab
✨ AI Assistant
───────────────
📊 Analytics
🛍️ Store & Commerce
⚡ Instagram Automation
📅 Content Planner
💰 Monetization         ← links to Store & Commerce > Winning Products
👥 Audience             ← links to Page Builder > Audience Demographics
───────────────
⚙️ Settings
```

**Note:** This navigation matches the original 6 modules but adds helpful shortcuts/aliases (Create Content, Analytics, Content Planner, Audience) that deep-link into the correct sub-panels. Users never need to remember "is scheduling inside Discover & Create?" — they just click "Content Planner."

Bottom section (above settings):
```
[Crown icon]  Creator Pro     ← plan badge
              2,450 credits
[Avatar]  Aryan Mehta
          @aryanvisuals  [•••]
```

---

## PHASE 3 — HOME DASHBOARD

### 3.1 Page Header
```
Good [morning/afternoon/evening], [First Name] 👋
Here's how your page is performing this week.

[● Connected  Last synced: Today, 10:42 AM  ↻]    [📅 Last 7 days ▾]
```

Morning/afternoon/evening changes by time of day — small personal touch.
Connection status + date range filter live in the same row, right-aligned.

### 3.2 KPI Cards Row (4 cards, equal width, full row)
Order: Followers | Views | Revenue | Engagement Rate

Each card (see Component 1.7 — Data Metric Cards):
- Followers: person icon, big number, +% vs last period, sparkline
- Views: eye icon, number, +%, sparkline
- Revenue: ₹ icon, amount, +%, sparkline
- Engagement Rate: heart icon, %, change in pp (not %), sparkline

### 3.3 Performance Overview Chart (left, ~60% width) + AI Recommendation (right, ~40%)
These two sit side by side.

**Performance Overview:**
- Dual-line chart: Views + Reach over time
- Date range toggle: 7d / 30d / 90d
- Metric toggle: Views / Reach (dropdown)
- Chart hover: tooltip showing both metrics at that date point
- Y-axis: clean numbers (100K not 100,000)
- Section title: "Performance Overview" — subtitle: "Reach and views over time"

**AI Recommendation card:**
- Header: "✨ AI Recommendation" + "View all →" link
- Content panel shows ONE recommendation:
  - Thumbnail (if content-related — actual reel thumbnail)
  - Headline: bold, specific ("Your reel on 'Morning Routine' performed 3.2x better than average.")
  - What happened: 1 line
  - Why it matters: 1 line
  - What to do next: 1 line
  - Two action buttons: [Create Similar Reel →] [Ask AI]
- Feeling: like a smart advisor is sitting next to you, not a generic insight widget

### 3.4 Top Performing + Underperforming Content (side by side, full row)

**Top Performing (left):**
- Title + "View all →"
- 4 content cards horizontal scroll (don't truncate to fewer on desktop)
- Each card: thumbnail (square, rounded corners) + title (1 line, truncated) + views + % vs average (green)

**Underperforming (right):**
- Same layout
- % shown in red
- Subtle visual treatment — same card design, just red indicators

### 3.5 Revenue & Sales + Recent Transactions (side by side)

**Revenue & Sales (left, ~55%):**
- Title + date filter (Last 7d / 30d / 90d)
- Big number: Total Revenue + % change
- Small: Total Orders + % change
- Bar chart: daily revenue over selected period
- Below chart: Revenue by Source (donut chart + legend with ₹ amounts)

**Recent Transactions (right, ~45%):**
- Title + "View all →"
- Table rows: icon | product name | amount | status badge | timestamp
- Status badges: Completed (green) / Pending (yellow) / Refunded (red)
- Max 5 rows visible, "View all" for more

### 3.6 Quick Actions (bottom, 4 equal buttons in a row)
```
[✍️ Create Content]  [🛍️ View Store]  [⚡ Check Automations]  [✨ Ask AI]
```
Style: ghost buttons with icon, large enough to tap on mobile. Not pill-shaped — squared with 8px radius for this row specifically (action row, not CTA).

### 3.7 States
**Zero State (new user):**
- Replace KPI cards with: large centered illustration + "Connect your Instagram page" + 4-step checklist (Import page → Run audit → Get AI recommendations → Start growing) + CTA button
- No broken charts or zero-value cards

**Loading State:**
- Every card shows a skeleton placeholder (shimmer)
- Skeleton matches the exact shape/size of the real content

**API Error / Disconnected:**
- Red warning bar at top of dashboard content area: "Instagram connection lost. We couldn't fetch your latest data. [Reconnect Instagram →]"
- Charts show last-cached data with a "Last successful sync: [time]" label
- Not a full blank screen

---

## PHASE 4 — VYRALIFY AI ASSISTANT

### 4.1 Layout
Two-column layout:

**Left (280px):** Conversation history panel
- "✨ AI Assistant" title + "New Chat" button (pill, green)
- Saved conversations: star icon header + list
- Recent: Today / Yesterday / Last 7 days — grouped
- Each item: truncated first message, timestamp on hover
- Bottom: search icon for searching past conversations

**Right (remaining width):** Active chat area

### 4.2 Empty State (New Chat)
Center-aligned, generous whitespace:
```
[Vyralify V logo animation — subtle pulse]

Hi, [First Name] 👋
Ask me anything about your Instagram business.

[Suggestion cards — 2x2 grid of prompts]:
"Why did my last Reel underperform?"
"What should I post this week?"
"How can I improve my reach?"
"What's the best way to monetize my page?"
```
Suggestion cards: ghost card style, hover highlights, click sends as message.

### 4.3 Active Chat
- User messages: right-aligned, dark rounded bubble (`--bg-elevated`), white text
- AI messages: left-aligned, no bubble background — just text with AI icon (small ✨ sparkle) to the left
- AI responses should NEVER look like raw text blocks — formatted with:
  - Bold for important terms
  - Bullet points when listing
  - Clear paragraph breaks
  - Action buttons where applicable (see below)
- Timestamps: show on hover of any message, caption size

**AI Action Buttons (appears at bottom of relevant AI responses):**
Horizontal strip of contextual action buttons:
```
[📊 View Analytics]  [✍️ Create Similar Reel]  [⚡ Set Up Automation]
```
These deep-link into the relevant module with context pre-loaded. Green ghost buttons. This is the "Question → Answer → Action" flow from the UX spec.

### 4.4 Media Upload
- Paperclip icon in the chat input bar
- Supported: images (PNG/JPG/WEBP), videos (MP4, max 50MB)
- Preview appears above the input bar before sending — thumbnail + filename + remove X
- Upload progress: linear progress bar inside the preview card
- After upload + send: thumbnail shown inline in the message bubble

### 4.5 Input Bar
```
[📎 Attach]  [         Ask Vyralify anything...          ]  [➤ Send]
```
- Input: auto-grows up to 5 lines, then scrolls
- Send button: green pill when there's text, disabled gray when empty
- Keyboard: Enter sends, Shift+Enter = new line
- Above input: small credit usage indicator (e.g. "247 credits remaining today") — shown subtly, not obtrusively

### 4.6 States
- **Generating response:** animated typing indicator (3 dots, staggered bounce) below last AI message
- **Credit limit reached:** soft inline message in chat: "You've used all your daily AI credits. [Upgrade to Pro →] for unlimited access." — green CTA inline, chat input disabled but still visible
- **No internet:** inline warning: "Reconnect to continue chatting."
- **Data not available (new user):** AI responds with: "I don't have enough data from your page yet. Connect your Instagram to get personalized insights." — with a [Connect Instagram] button inline

---

## PHASE 5 — PAGE BUILDER

### 5.1 Layout
Two-panel layout:

**Left (280px):** Step progress sidebar
- Shows all steps of the current flow (New Page or Import Page)
- Each step: number circle + label + status (completed ✓ / active → / upcoming ○)
- Green = completed, white = active, gray = upcoming

**Right (remaining):** Step content area

### 5.2 New Page Flow (Beginner Path)
Step 1: **Choose Your Path**
- Two large cards side by side:
  - "I'm starting a new page from scratch" (rocket icon)
  - "I already have an Instagram page" (Instagram icon)
- Card style: large (not small), center-aligned content, hover lifts, selected = green border

Step 2: **Niche Selector**
- Big headline: "What kind of page do you want to build?"
- Sub: "Choose a niche — this helps us personalize your entire Vyralify experience."
- Grid of 8 category cards (2x4 on desktop, 2x4 on tablet, 1x8 on mobile):
  - Each card: large emoji + category name + "X sub-niches" hint
  - Single click selects category → expands to show sub-niches below as pill chips
  - Multiple sub-niches selectable (up to 3 recommended, softly enforced)
  - Selected: green border + checkmark
- "Continue" button activates only after at least 1 sub-niche selected

Step 3: **Objectives**
- "What's your main goal with this page?" (single select, 4 options as large cards):
  - 📈 Grow my audience
  - 💰 Make money from my page
  - 🎯 Get leads for my business
  - 🚀 All of the above
- "Who is your target audience?" — simple age range slider + interest tags (free text chips)

Step 4: **Page Positioning & Profile Setup**
- Left: form fields (Page Name, Niche-based positioning statement, Bio — AI-generated, user edits)
- Right: live preview of how the bio looks on an Instagram profile mockup (phone frame)
- "Regenerate" button next to bio field to get a new AI suggestion
- "Highlights" section: suggested highlight categories as chips (user adds/removes)

Step 5: **Launch Checklist**
- Vyralify can guide, not create the IG account
- Checklist card: "Here's what to do next on Instagram" — 5 steps with external links
- Big green CTA: "I've created my page — Connect it now →"

### 5.3 Import Page Flow (Existing Creator)
Step 1: **Connect Instagram**
- Simple centered card: Instagram icon + "Connect your Instagram account" + big button "Connect with Instagram"
- Below button: small text explaining what permissions are requested and why

Step 2: **Audit Running**
- Animated loading state with progress: "Analyzing your bio... Checking content pillars... Running audience insights..."
- Not a boring spinner — show what's actually happening

Step 3: **Audit Results**
- Score card at top: "Page Health Score: 74/100" (circular progress indicator, green fill)
- Below: 3 columns — Strengths (green checkmarks) / Gaps (yellow warnings) / Recommendations (actionable)
- Each recommendation links to the relevant tool: "Improve your bio" → opens Bio Generator in place

### 5.4 Multi-Page Management
- Grid of page cards (3-column desktop, 2-column tablet, 1-column mobile)
- Each card: page PFP (large) + @handle + follower count + last-active date + status badge
- Active page: green border + "Active" badge
- "Add Page" card: dashed border, "+" icon, "Connect another page"
- Plan limit shown: "3 of 3 pages connected" + "Upgrade for unlimited pages" (Elite prompt)

---

## PHASE 6 — DISCOVER & CREATE

### 6.1 Tab Navigation (top of module)
```
[🔎 Discover]  [✍️ Create]
```
Large tabs — these are the two main worlds. Active tab: underline in green + white text.

### 6.2 Discover Tab

**Top bar:**
- Left: "Trending in [Niche]" — shows user's selected niche as a tag (clickable to change)
- Right: Filter chips — Format (All/Reels/Carousels/Stories) | Date (Today/This Week/This Month) | Sort (Most Viral/Most Recent)
- Search bar: "Search trending topics, hooks, formats..."

**Main content: Masonry/card grid layout**
Each content card:
- Thumbnail (16:9 for video, 1:1 for carousel)
- Views badge (top-left overlay, semi-transparent dark bg)
- Trending indicator (🔥 if above niche average)
- On hover: slide-up overlay with:
  - Hook text (first line of the content)
  - "Why it's working" — 1 line
  - [Save] [Use as Inspiration →]

**Right sidebar (desktop only, 280px):**
- "Niche Intelligence" panel:
  - Top format this week
  - Best posting time
  - Trending audio drop (with play button)
  - "Ask AI about your niche →" CTA

**Competitor Tracking section (below main grid, collapsible):**
- Row of competitor avatars + handles — click to see their recent posts
- Add competitor: "Track a competitor" input
- Plan limit: "1 of 1 competitors tracked" for Free users + upgrade prompt

### 6.3 Create Tab

**Left panel (280px):** Tool list
```
✍️  Post & Reel Scripting
🪝  Hooks Generator
💬  Caption Generator
💡  Idea Generator
📅  30-Day Content Planner
📆  Post Scheduler
📚  Saved Library
🗂️  Templates
```
Active tool highlighted with green left bar.

**Right panel:** Active tool interface

**Hooks Generator (example — all tools follow similar structure):**
- Input: "What's your topic?" (text field) + "Niche" (auto-filled from Page Builder, editable dropdown)
- Generate button: large green pill CTA "Generate Hooks ✨"
- Output: list of 6-8 hook variations, each as a card:
  - Hook text (large, readable)
  - Type badge: "Curiosity" / "Controversy" / "Story" / "Authority"
  - [Copy] [Save] [Use in Script →] actions on hover

**30-Day Content Planner:**
- Calendar view (month grid)
- Each day: can hold 1-2 content pills
- Empty day: "+" on hover to add
- Content pill: tiny thumbnail (if scheduled) or colored dot + content type
- Side panel (when clicking a day): shows the generated idea/hook/script for that day
- "AI Fill Month" button: auto-populates entire month based on niche/objectives — this is an Elite/Pro feature

**Post Scheduler:**
- Calendar + list view toggle
- Time slots shown based on "Best time to post" AI recommendation
- Drag-and-drop to reschedule
- Each scheduled post: thumbnail + status badge (Scheduled / Published / Failed)
- Failed status: red badge + "Retry" button

---

## PHASE 7 — INSTAGRAM AUTOMATION

### 7.1 Layout
**Top summary row:** 4 metric cards — Automations Active | Messages Sent (30d) | Leads Captured | Conversion Rate

**Main content:** Two-panel
- Left: list of automations
- Right: selected automation detail/editor

### 7.2 Automation List (left panel)
Header: "My Automations" + "Create New +" button

Each automation row:
- Icon (matching trigger type — comment/DM/story/follow)
- Automation name (user-defined)
- Trigger label ("Comment 'FREE' → DM link")
- Stats: sent count + last triggered time
- Toggle: on/off switch (green when on)
- More options: [•••] → Edit / Duplicate / Delete

Empty state: "No automations yet. Set up your first trigger and start converting followers."

### 7.3 Automation Editor (right panel)

**Step 1 — Select Trigger**
Large icon cards (3 across):
- [💬 Comment] — Someone comments a keyword
- [📩 DM Keyword] — Someone DMs a keyword
- [📖 Story Reply] — Someone replies to a story

Second row:
- [👥 New Follower] — Follow & Lead Collector
- [🤖 AI Conversation] — AI Auto-Conversations

**Step 2 — Configure Trigger**
- Keywords input (chips, add multiple)
- Match type: Exact / Contains / Any (radio pills)
- Limit: once per user / unlimited (toggle)

**Step 3 — Configure Response**
Three response type tabs:
- Static Message (text input, link picker from Store)
- AI Response (toggle on AI Auto-Conversations — set goal, tone, guardrails)
- Deliver Product (dropdown of store products)

**Step 4 — Review & Activate**
- Summary: "When someone [trigger], [action]"
- Preview of the DM message (mock phone DM UI)
- [Activate Automation] green pill CTA

### 7.4 AI Auto-Conversations Detail Panel
When "AI Conversation" is selected as response type:
- Goal input: "What should the AI try to achieve?" (e.g. "Sell my Instagram Growth Guide")
- Tone selector: Professional / Friendly / Casual (radio pills)
- Guardrails: "Topics to avoid" text input
- "AI will qualify → nurture → convert" — visual flow diagram showing the 3 stages
- [Take Over Conversation] button always visible in the conversation log view — non-negotiable trust feature

### 7.5 Conversation Logs
Separate tab: "Conversations"
- List of DM conversations the AI has handled
- Each row: follower avatar + handle + goal + current stage (Qualifying/Nurturing/Converted/Escalated) + last message time
- Click to open full conversation thread
- "Take over" button in the conversation view — when clicked, AI stops, you take manual control, thread turns from green to blue color to indicate human-mode

---

## PHASE 8 — STORE & COMMERCE

### 8.1 Layout
Top tabs:
```
[📊 Analytics]  [🛍️ My Store]  [📦 Products]  [📋 Orders]  [🏆 Winning Products]
```

### 8.2 Analytics Tab
Funnel visualization (top):
```
Link Clicks: 4,821  →  Checkout Started: 892  →  Completed: 234
                    [18.5% click→checkout]         [26.2% checkout→sale]
```
Below funnel: Revenue trend chart + Revenue by product table

### 8.3 My Store Tab (Link-in-Bio Editor)
**Left (live editor, 60%):**
- Section: "Your Store Link" — `vyralify.io/u/username` with copy button + QR code icon
- Store branding: upload cover image, choose theme (3-4 presets — Dark/Light/Green accent/Monochrome)
- Bio text for the store page (separate from IG bio)
- Product card ordering: drag-and-drop list

**Right (live preview, 40%):**
- Phone mockup frame
- Shows exactly how the link-in-bio page looks on mobile
- Updates in real-time as user edits left panel
- Toggle: Desktop / Mobile preview

### 8.4 Products Tab
Grid of product cards + "Add Product" button

Each product card:
- Product image (square, rounded)
- Product name
- Price
- Sales count badge
- Status: Live / Draft / Archived
- [•••] → Edit / Duplicate / Archive / Delete

**Add/Edit Product modal:**
- Product image upload (drag-and-drop)
- Name, description, price
- Type: Digital File / Service / Subscription / External Link
- For Digital File: file upload with delivery preview
- For Subscription: billing frequency selector
- Save as Draft / Publish

### 8.5 Orders Tab
Filterable table:
- Columns: Order ID | Customer | Product | Amount | Status | Date
- Status filter chips at top: All / Completed / Pending / Refunded
- Row click: expands to show order detail panel (right side)
- Bulk actions: select multiple → Mark as refunded / Export

### 8.6 Winning Products Library Tab
- Header: "Ready-made products you can sell instantly — no creation needed."
- Filter: by category (Digital, Templates, Guides, Courses, etc.)
- Product cards (same as Products tab but with "Add to Store" CTA instead of edit)
- Each card also shows: "120 creators selling this" social proof + commission % if affiliate
- Locked/blurred for Free tier with upgrade prompt overlay

---

## PHASE 9 — SETTINGS & BILLING

### 9.1 Layout
Left rail: Settings category list (vertical, 200px)
Right: Selected category content

Categories:
- Profile
- Account Security
- Connected Accounts (Instagram)
- Notifications
- Billing & Plan
- Appearance (theme toggle)
- Help & Support

### 9.2 Billing & Plan (critical section)
- Current plan card: plan name + features summary + renewal date + [Manage Billing]
- AI Credits meter: visual bar (used/total) + daily reset countdown
- Upgrade section (for Free/Pro): comparison table of the 3 plans — same as the pricing table from spec
- Downgrade warning: if downgrading, show exactly what they'll lose (red list)
- Invoice history table: date | amount | plan | [Download PDF]

---

## PHASE 10 — ONBOARDING (First-Time Experience)

### 10.1 Onboarding Modal/Overlay (shows on first login only)
- Full-screen modal (not a separate page)
- Dark background, centered content card (600px max width)
- Progress dots at top: 4 steps total

Step 1: "Welcome to Vyralify 👋" — Name/personalization + choose beginner or existing creator
Step 2: Connect Instagram (or Niche Selector for beginner)
Step 3: Set your main goal (same 4 options as Page Builder step 3)
Step 4: "You're all set" — confetti animation + "Go to Dashboard" CTA

Each step: one clear question, one clear input, one green "Continue" CTA. Zero distraction.

### 10.2 Getting Started Widget (persists on Home until completed)
Checklist card, collapsible, at top of Home dashboard:
```
Getting Started (3/5 completed)
━━━━━━━━━━━━━━━━░░░░░ 60%

✅ Connect your Instagram page
✅ Choose your niche
✅ Explore AI Assistant
○  Create your first content
○  Set up your store
```
Each incomplete step is clickable and deep-links to the right place. Dismiss button (X) in top-right once all 5 are done.

---

## RESPONSIVE BEHAVIOR SUMMARY

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Sidebar | 220px expanded | 60px icon-only | Hidden, bottom nav |
| Top bar | Full (search visible) | Search icon only | Condensed, page switcher prominent |
| KPI cards | 4 in a row | 2x2 grid | 1 column scroll |
| Dashboard 2-col | Side by side | Side by side | Stacked |
| Discover grid | 4-col masonry | 3-col | 2-col |
| Automation editor | Two-panel | Two-panel | Full-screen steps |
| Store editor | Two-panel with preview | Two-panel | Editor only, preview on tap |
| Mobile nav | — | — | Bottom bar: Home / Create / AI / Store / More |

**Mobile bottom navigation (5 items max):**
```
🏠 Home  ✍️ Create  ✨ AI  🛍️ Store  ••• More
```
"More" opens a bottom sheet with all remaining navigation items.

---

## LOCKED FEATURE STATES (appears throughout the product)

**Visual pattern (must be consistent everywhere):**
- Feature card/section: 40% opacity
- Lock icon (🔒) overlaid, center-top of the locked area
- Overlay card (not full screen): "This is a [Pro/Elite] feature"
- Feature name + 1-line benefit
- [Upgrade to Pro →] green pill CTA
- [See all features] ghost button
- Clicking anywhere on the locked area triggers this overlay
- NEVER hide a feature entirely — always show the shape of what's behind the lock

---

*This document covers the complete visual and interactive specification for the Vyralify internal product. Hand this directly to the developer alongside the Product Specification document. Together they define everything that needs to be built — this defines how it looks and feels, the product spec defines what it does.*
