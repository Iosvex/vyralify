# Vyralify — Owner Ahmad Testing & Verification Guide 🚀
**Release Build**: `5306786` (Pushed to `origin/main` for Live Domain Deployment)  
**Audience**: Ahmad (Owner / Lead Stakeholder)  
**Scope**: Connected Experience between Creator Dashboard, Live Public Storefront, Dedicated Product Pages, and Instant 1-Click Checkout.

---

## 🧭 Overview & Core Architecture

The store system has been engineered to provide an interconnected, high-converting digital storefront operating on a **dual-layer architecture**:

1. **Layer 1: The Bio Storefront Hub** (`vyralify.me/@handle` or `/u/:handle`): High-speed mobile-first creator link-in-bio storefront displaying headline, avatar, social links, pinned hero offer, and product grid/stack.
2. **Layer 2: Dedicated Product Landing Page** (`vyralify.me/@handle/:productSlug`): High-ticket conversion page with cover video/media teardown, bulleted deliverables checklist, target audience architecture ("Who This Is For"), and accordion FAQs.
3. **1-Click Slide-Out Checkout Drawer**: Zero-friction checkout with automated simulated delivery and real-time CRM order ingestion.

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

## 📊 Quick Verification Checklist for Sign-Off

- [x] Production build passes cleanly (`npm run build` -> Exit code 0)
- [x] Pushed to remote repo (`origin/main` -> Commit `5306786`)
- [x] Theme radius & fonts propagate to live store & phone preview
- [x] Layout collapse tested for mobile viewports (<640px)
- [x] Star toggle pins Hero Offer and deduplicates from list
- [x] Multi-item deliverables & FAQ accordions render dynamically
- [x] CTA label length constrained to max 28 chars
- [x] 1-Click checkout generates instant download screen & updates CRM table
- [x] Direct "Visit Store" link button active in Store Link bar
