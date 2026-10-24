# Vyralify — Owner Ahmad Testing & Verification Guide 🚀
**Release Build**: `5306786` (Pushed to `origin/main` for Live Domain Deployment)  
**Audience**: Ahmad (Owner / Lead Stakeholder)  
**Scope**: Connected Experience between Creator Dashboard, Live Public Storefront, Dedicated Product Pages, and Instant 1-Click Checkout.

---

## 🧭 Overview & Core Architecture

The store system has been engineered to provide an interconnected, high-converting digital storefront operating on a **dual-layer architecture**:

1. **Layer 1: The Bio Storefront Hub** (`vyralify.in/:customerstorename` or `/@customerstorename`): High-speed mobile-first creator storefront displaying custom store handle, headline, avatar, social links, pinned hero offer, and product grid/stack.
2. **Layer 2: Dedicated Product Landing Page** (`vyralify.in/:customerstorename/:productSlug`): High-ticket conversion page with 2-column hero gallery, dynamic FX pricing (50% OFF pills), bulleted deliverables checklist, target audience architecture ("Who This Is For"), accordion FAQs, verified student reviews, and cross-sell carousel.
3. **1-Click Share & Copy Links**: Creators can copy direct links for both their full store (`vyralify.in/:storename`) and individual products (`vyralify.in/:storename/:productSlug`) with 1-click clipboard buttons.
4. **1-Click Slide-Out Checkout Drawer**: Zero-friction checkout with automated simulated delivery, instant file downloads, and real-time CRM order ingestion.

---

## 🧪 Step-by-Step Test Scenarios for Ahmad

### Test Scenario 1: Creator Dashboard Customization & Phone Preview
- **URL**: Open `/dashboard` and select the **Store Commerce** tab.
- **Actions to Test**:
  1. **Change Store Title & Bio**:
     - Type in a custom Store Title (e.g., `Ahmad's Elite Growth Vault`).
     - Type in a custom Subtitle / Bio.
     - Notice the live phone preview on the right updates instantly in real time.
  2. **Test Card Radius Matrix**:
     - Click **Square**: Cards on phone frame turn sharp (`rounded-none`).
     - Click **Smooth**: Cards transition to sleek modern curves (`rounded-2xl`).
     - Click **Pill**: Cards transition to pill-capsule corners (`rounded-3xl`).
  3. **Test Font Pairing Matrix**:
     - Switch between **Plus Jakarta Sans**, **Inter**, and **Geist**.
     - Notice both the dashboard and live storefront dynamically adopt the typography.
  4. **Test Layout Presets**:
     - Toggle between **Stack** (Single column), **Grid** (2-column grid), and **Hero + List**.
     - Notice the phone preview immediately adapts the card layout.
  5. **Test Block / Product Reordering**:
     - In the Products list, click the **Up (↑)** and **Down (↓)** arrows on any product.
     - Verify the order swaps immediately and saves without manual refresh.
  6. **Pin a Featured Hero Offer**:
     - Click the **Star (⭐)** icon next to any product in the list.
     - Notice the item gets crowned with the amber `Pinned Hero Offer` badge and sits prominently at the top of the storefront.

---

### Test Scenario 2: Product Page Builder & In-Place Editing
- **Actions to Test**:
  1. **Edit Existing Product**:
     - Click the **Edit (pencil icon)** on any listed product.
     - The modal opens in **"Edit Digital Product"** mode with all existing data pre-filled.
     - Note the fields: Short Pitch, What's Included (1 per line), Target Audience, Video URL, and FAQ Accordions (Q1/A1 & Q2/A2).
  2. **Custom CTA Buttons**:
     - Click one of the 1-click CTA presets: `Buy Now`, `Get Instant Access`, `Book 1-on-1 Call`, `Download Free Guide`, or `Join VIP Club`.
     - Confirm character limit is enforced at 28 characters to prevent awkward text wrapping on mobile screens.
  3. **Save Changes**:
     - Click **"Save Changes"**.
     - Verify order history and revenue are safely preserved, and the updated details sync live.

---

### Test Scenario 3: Live Storefront Hub (Layer 1)
- **URL**: Click the new **"Visit Store"** button next to your Store Link in the dashboard, or open `/@demo` / `/u/demo` in an incognito tab.
- **Actions to Test**:
  1. **Visual Fidelity**:
     - Verify your chosen Avatar, Headline, Subtitle, and Border Radius are rendered cleanly.
     - Verify social icons (Instagram, YouTube, X, Telegram) render sharp inline SVGs with smooth hover states.
  2. **Layout Responsiveness**:
     - On desktop with 2-Column Grid selected: products appear side-by-side.
     - Resize browser window below 640px (or view on mobile): automatically collapses to a clean single-column stack.
  3. **Auto-FX Currency Switcher**:
     - Switch the currency selector in the top bar between **INR (₹)** and **USD ($)**.
     - Notice all prices update instantly with accurate conversion rates.

---

### Test Scenario 4: Dedicated Product Page (Layer 2)
- **Actions to Test**:
  1. On the storefront, click **"Learn More"** on the hero card, or click any product card.
  2. The page transitions smoothly to the **Dedicated Product Page** (`/@demo/faceless-operating-manual`).
  3. Verify the 4 key sections are present and populated:
     - **Cover Media / Video Box**: Displays cover image or 4K video preview badge.
     - **What's Included (Deliverables Checklist)**: Displays crisp checkmarks for each line item.
     - **Target Audience Architecture**: Shows the tailored "Who This Is For" breakdown.
     - **FAQ Accordions**: Click on FAQ questions to toggle answers open and closed.
  4. Click **"← Back to @demo's Storefront"** to ensure seamless breadcrumb navigation back to the store hub.

---

### Test Scenario 5: 1-Click Checkout & Instant Delivery
- **Actions to Test**:
  1. Click **"Get Instant Access"** (or custom CTA button) on any product or from Layer 2.
  2. The **1-Click Checkout Drawer** slides in from the right.
  3. Select Payment Gateway: **Razorpay (UPI / QR)**, **Stripe (Cards)**, or **Instant Access**.
  4. Enter a test customer name and email (e.g., `ahmad@vyralify.in`).
  5. Click **"Complete Order"**.
  6. **Fulfillment Screen**:
     - An instant success card pops up with Order ID, customer details, and a live **"Download Now"** button.
  7. **CRM Ingestion**:
     - Return to the Dashboard -> Store Commerce -> **Sales & CRM** tab.
     - Ahmad can see the new order recorded in the table with Status `Paid` and Instant Payout verified!

---

### Test Scenario 6: Visibility Toggles (Unlisted Products)
- **Actions to Test**:
  1. In the Dashboard product list, click the **Eye icon (👁)** on a product to toggle it to **Unlisted**.
  2. Visit the public store hub: The product is hidden from the main listing.
  3. Visit the product's direct URL: The page loads normally and allows full purchase and download fulfillment!

---

### Test Scenario 7: Instagram Automation & Live Trigger Engine
- **URL**: Open `/dashboard` and select the **Instagram Automation** tab.
- **Actions to Test**:
  1. **Dynamic Trigger Persistence**:
     - Notice all triggers are loaded dynamically in real time from Firestore (`users/{uid}/instagram_automations`).
     - Click **"Create Trigger"** to open the builder.
     - Select trigger type (e.g. `Comment on Any Reel/Post` with keyword `BLUEPRINT`).
     - Set human reply delay (e.g. 5–15 seconds) and public comment reply variation.
     - Click **"Create Trigger"** — syncs instantly to Firestore without page refresh.
  2. **Active Status Toggle**:
     - Toggle the switch on any trigger. The switch turns active/paused and updates in cloud state immediately.
  3. **Simulate Trigger Execution**:
     - Click **"Test Trigger"** on any active trigger.
     - Vyralify runs an end-to-end simulation of the public reply + direct message payload with live progress feedback and toast notification.
  4. **Meta Graph Webhook Ready**:
     - Check `/api/webhooks/instagram` and `/api/meta/send-dm`: serverless endpoints with dedup caching, signature verification, and Meta Messaging API integration.

---

### Test Scenario 8: AI Reel & Video Retention Auditor
- **URL**: Open `/dashboard` -> **Discover & Create** or click **AI Retention Audit** from any reel in the Reel Matrix or Dashboard menu.
- **Actions to Test**:
  1. **Launch Video Auditor**:
     - Click **"Launch Video Auditor"** in Discover & Create.
     - Paste any Instagram Reel URL or select an existing reel.
     - Click **"Run Retention Audit (Gemini 2.5 Flash)"**.
  2. **Retention Drop-off Curve & Grading**:
     - View estimated overall retention rate, Hook Grade (e.g., `A+` or `B`), and primary drop-off second markers (e.g., `00:03 - Pacing Drop`, `00:09 - Visual Fatigue`).
     - Review the AI diagnostic recommendations to eliminate retention cliffs.
  3. **Instant Action & Automation Flow**:
     - Click **"Deploy Automation Trigger"** to instantly jump to the Instagram Automation builder with the keyword pre-configured.
     - Click **"Copy Remix Script"** to paste the viral remix directly into your script workflow.

---

### Test Scenario 9: 30-Day Content Planner & Calendar Sync (.ics / .csv)
- **URL**: Open `/dashboard` -> **Discover & Create** -> scroll to **30-Day Strategic Content Planner**.
- **Actions to Test**:
  1. **AI Auto-Fill 30 Days**:
     - Click **"Auto-Fill 30-Day Plan with AI"**.
     - System engineers 30 days of strategic hooks, formats, and monetization offers tailored to the connected Instagram account.
     - Plan automatically saves to local browser memory for persistent retrieval.
  2. **Export to Calendar (.ics)**:
     - Click **"Sync Calendar (.ics)"**.
     - An `.ics` iCalendar file downloads immediately containing all 30 days as scheduled calendar events.
     - Double click the `.ics` file to import all events directly into Google Calendar, Apple Calendar, or Outlook.
  3. **Export to CSV**:
     - Click **"CSV"** to download a clean spreadsheet of the entire 30-day production roadmap.

---

## 📊 Quick Verification Checklist for Sign-Off

- [x] Production build passes cleanly (`npm run build` -> Exit code 0)
- [x] Pushed to remote repo (`origin/main`)
- [x] Theme radius & fonts propagate to live store & phone preview
- [x] Layout collapse tested for mobile viewports (<640px)
- [x] Star toggle pins Hero Offer and deduplicates from list
- [x] Multi-item deliverables & FAQ accordions render dynamically
- [x] CTA label length constrained to max 28 chars
- [x] 1-Click checkout generates instant download screen & updates CRM table
- [x] Direct "Visit Store" link button active in Store Link bar
- [x] Instagram Automation: Zero hardcoded triggers, live Firestore sync, interactive test simulator
- [x] Meta Webhook & DM API: Endpoints `/api/meta/send-dm`, `/api/meta/reply-comment`, `/api/webhooks/instagram`
- [x] AI Video & Reel Retention Auditor: Powered by Gemini 2.5 Flash with drop-off markers & remix scripts
- [x] 30-Day Content Planner: 1-Click `.ics` calendar sync and `.csv` spreadsheet export
- [x] Official Meta Graph API Connection: Zero fake handle inputs or manual typing; 100% official Meta OAuth handshake
- [x] Live Meta Graph Metrics: Real follower count, bio, reels reach/plays, and active follower hours pulled directly from Meta
- [x] Edit Bio & Profile Studio: Direct in-dashboard "Edit Bio & Profile" modal with 1-click AI bio enhancement and Cloud Firestore sync

