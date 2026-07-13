# 🚀 VYRALIFY.IO – FULL STACK MASTER PLAN
**Project Lead:** Ashwin (Frontend + Product)  
**Backend Lead:** [Developer Name]  
**Start Date:** July 10, 2026  
**Target MVP Launch:** August 14, 2026 (5 Weeks)

---

## 1. 🎯 PROJECT VISION
We are building a premium SaaS platform (Vyralify.io) that teaches creators how to build faceless Instagram pages, scale them, and monetize them. 

- **Core Value:** A full "business-in-a-box" for digital creators.
- **Key Differentiator:** A Dropship.io-style **50% Lifetime Recurring Affiliate Program**.
- **Aesthetic:** High-end startup UI (White + Blue, Stripe/Dropbox vibe).

---

## 2. 🧠 CURRENT STATUS (CHECKPOINT – DONE AS OF JULY 10)

> **We are exactly here:** The boilerplate is compiled, Firebase is connected, Admin authentication is locked down.

- [x] **Environment:** Next.js 14 (App Router) + TypeScript + Tailwind CSS initialized.
- [x] **UI Library:** shadcn/ui (`Nova` preset, `Radix` primitives) installed. Components (`button`, `tabs`, `card`) added.
- [x] **Firebase Setup:** Firebase project created. Auth (Google) enabled. Firestore DB created.
- [x] **Configuration:** `.env.local` file is live with Firebase keys.
- [x] **Auth Logic:** `lib/firebase/client.ts` and `lib/firebase/auth.ts` created (Google Sign-in, useAuth hook).
- [x] **Admin Gate:** Admin Login page (`/`), Admin Panel placeholder (`/admin`). Firestore `users/{uid}` document manually created with `role: "admin"` to restrict access.

---

## 3. 🗂️ FOLDER STRUCTURE (For Both of You)

We will split the repo so the backend dev doesn't mess with your UI, and vice versa.

```text
vyralify/
├── app/                    # [FRONTEND] All Next.js Pages & Routing
│   ├── (public)/           # Landing, Affiliates page (No auth required)
│   ├── (dashboard)/        # Member Dashboard (Auth required)
│   ├── admin/              # Admin Panel (Auth + role:admin required)
│   └── api/                # API Routes (Stripe Webhooks, Razorpay Webhooks)
├── components/             # [FRONTEND] Reusable shadcn/ui & custom components
├── lib/                    # [SHARED] Utilities & Firebase client
├── functions/              # [BACKEND] Firebase Cloud Functions (Node.js)
│   ├── src/
│   │   ├── index.ts        # Main export (Webhooks)
│   │   ├── cronJob.ts      # Monthly Commission Scheduler
│   │   └── adminTriggers.ts # On-create functions
├── firebase.json           # [BACKEND] Firebase config
└── .env.local              # [FRONTEND/BACKEND] Environment variables
```

---

## 4. 🔥 BACKEND SPECIFICATION (FOR THE DEVELOPER)

This section is your developer's exact technical requirement sheet. They must build **Firestore, Cloud Functions, Webhooks, and the Payment Gateway**.

### A. Firestore Database Schema
Please create these collections with these exact fields:

| Collection | Document ID | Fields (Key: Type) | Description |
| :--- | :--- | :--- | :--- |
| **`users`** | `uid` (Auth UID) | `email: string`, `displayName: string`, `role: "admin" \| "member" \| "affiliate"`, `tier: "standard" \| "pro"`, `subscriptionStatus: "active" \| "canceled" \| "past_due"`, `affiliateCode: string` (unique), `referredBy: string` (uid of referrer), `createdAt: timestamp` | Main user profile. |
| **`contentAssets`** | `auto-id` | `name: string`, `fileType: "video" \| "pdf" \| "template"`, `tier: "standard" \| "pro"`, `category: "Hooks" \| "CTAs" \| "Templates"`, `storagePath: string` (gs://...), `downloadURL: string` (signed), `uploadedAt: timestamp` | The vault content uploaded by Admin. |
| **`subscriptions`** | `auto-id` | `userId: string` (ref: users), `gateway: "stripe" \| "razorpay"`, `gatewayId: string` (subscription id), `priceId: string`, `status: string`, `currentPeriodEnd: timestamp` | Tracks payment status. |
| **`referrals`** | `auto-id` | `referrerUid: string`, `referredUid: string`, `status: "pending" \| "active" \| "churned"`, `commissionRate: 0.50` (hardcoded), `startDate: timestamp` | Tracks who referred whom. |
| **`commissions`** | `auto-id` | `affiliateUid: string`, `referralId: string`, `amount: number` (USD/INR), `currency: string`, `period: string` (YYYY-MM), `status: "pending" \| "paid"`, `paidAt: timestamp` | The accounting ledger for 50% payouts. |
| **`payouts`** | `auto-id` | `affiliateUid: string`, `totalAmount: number`, `paymentGateway: "stripe-connect" \| "razorpay-payouts"`, `status: "processing" \| "completed" \| "failed"`, `transactionId: string` | Record of bulk money sent to affiliate. |

### B. Security Rules (Firestore Rules)
The developer must write rules to ensure security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read content assets (we handle tier filtering on frontend)
    match /contentAssets/{document} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    // Users can only read their own data
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
      allow update: if request.auth != null && request.auth.uid == uid;
    }
    // Admin can read/write everything
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### C. Backend Cloud Functions (Must-Haves)
Your developer needs to deploy these **Firebase Cloud Functions**:

1.  **`onUserCreate`** (Trigger): When a new user signs up, generate a unique `affiliateCode` and create their `users` document.
2.  **`stripeWebhook`** (Endpoint): Handle `checkout.session.completed`. Update user `subscriptionStatus` to 'active' and set their `tier`.
3.  **`razorpayWebhook`** (Endpoint): Same as above, but for Razorpay.
4.  **`referralTracker`** (Logic inside webhook): If a user signed up with `?ref=CODE`, create the `referrals` document linking them to the referrer.
5.  **`monthlyCommissionCron`** (Scheduler - Cloud Scheduler): Runs on the 1st of every month.
    - Find all `referrals` where `status == 'active'`.
    - Calculate `subscriptionPrice * 0.50`.
    - Create a `commissions` record for each affiliate (status: `pending`).
6.  **`generateSignedUrl`** (Callable): Generate a secure temporary URL for content in Firebase Storage (so files aren't public forever).

---

## 5. 🖥️ FRONTEND SPECIFICATION (FOR ASHWIN)

You handle everything the user sees. Use the Firebase `client.ts` provided to fetch data.

### A. Pages to Build
- **Public Landing (`/`):** Hero, Bento Grid, Pricing Matrix (Toggle INR/USD), FAQ.
- **Public Affiliate Page (`/affiliates`):** 50% commission calculator, how-it-works, leaderboard mockup.
- **Member Dashboard (`/dashboard`):** 10-tab SPA. Must read `user.tier` to hide Pro tabs from Standard users.
- **Admin Panel (`/admin`):** 
  - *Overview:* Stats widget.
  - *Content Upload:* Drag-and-drop zone (uses signed URL logic).
  - *Users Table:* List all users, search, manually cancel/refund subscriptions.
  - *Affiliates:* Show top referrers, total pending payouts.
  - *Payouts:* A list of pending commissions with an "Approve & Pay" button (this will call a Cloud Function).

### B. Frontend State Management
- Use React Context (or Zustand) to hold the global `user` object (tier, subscription status).
- Protect routes: 
  - If `user.tier` is null -> redirect to pricing.
  - If `user.role` is 'admin' -> allow access to `/admin`.

---

## 6. 🛠️ TEAM COLLABORATION PLAN (Git Strategy)

Since both of you are working together, use this branching strategy to avoid conflicts:

- `main` (Production) – Protected. Only merged from `develop` on launch day.
- `develop` (Staging) – The main working branch where you merge your features.
- **Ashwin (Frontend):** Work on `feature/landing-page`, `feature/dashboard-ui`. Merge into `develop`.
- **Backend Dev:** Work on `feature/firebase-schema`, `feature/payment-webhooks`. Merge into `develop`.
- **Environment Variables:** Keep `.env.local` in `.gitignore`. Share them via a private DM or 1Password.

---

## 7. 📅 5-WEEK IMPLEMENTATION SPLIT (GANTT CHART)

| Week | Frontend (Ashwin) | Backend (Developer) |
| :--- | :--- | :--- |
| **Week 1** | **Admin Panel UI** – Build the upload interface, user management table, and affiliate overview screens. | **Schema & Auth** – Set up Firestore collections. Write Security Rules. Deploy `onUserCreate` trigger. |
| **Week 2** | **Landing & Affiliate Pages** – Build the premium homepage, pricing matrix, and `/affiliates` marketing page. | **Content API** – Write `generateSignedUrl` function. Set up Firebase Storage. |
| **Week 3** | **Member Dashboard** – Build the 10 tabs. Implement tier filtering (Std vs Pro). Fetch content from Firestore. | **Stripe/Razorpay Integration** – Implement checkout sessions. Write webhook endpoints. |
| **Week 4** | **Affiliate Hub (Inside Dashboard)** – Show referral link, wallet balance, and pending commissions. | **50% Logic & Cron** – Deploy the `referralTracker` and the `monthlyCommissionCron` job. |
| **Week 5** | **Polish & Testing** – Mobile responsiveness, animations, bug fixes. | **Payout System** – Deploy the admin "Approve Payout" function and Stripe Connect integration. |

---

## 8. 🚨 IMMEDIATE NEXT STEPS (For Monday Morning)

**Ashwin (You):**
1. Start building the **Admin Panel Sidebar** (`/admin/layout.tsx`).
2. Build the **Drag-and-Drop Uploader** using `react-dropzone` (I'll give you the code).

**Backend Developer:**
1. Initialize Firebase Functions locally (`firebase init functions`).
2. Write the Firestore Security Rules and deploy them.
3. Set up the `generateSignedUrl` cloud function so Ashwin can upload files to Storage securely.

---
