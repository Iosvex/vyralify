import { onRequest, HttpsError } from "firebase-functions/v2/https";
import { onCall } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { beforeUserCreated } from "firebase-functions/v2/identity";
import * as admin from "firebase-admin";
import Stripe from "stripe";
import * as crypto from "crypto";

// Initialize Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

/**
 * Helper to generate a unique affiliate code (e.g. VYR_A7F3)
 */
function generateCode(length = 6): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "VYR_";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 1. onUserCreate (Trigger): Fired when a new user account is created.
 * Sets up the profile and generates a unique affiliate code.
 */
export const onUserCreate = beforeUserCreated(async (event) => {
  const user = event.data;
  if (!user) return;

  const uid = user.uid;
  const email = user.email || "";
  const displayName = user.displayName || "";
  const affiliateCode = generateCode();

  const userDocRef = db.collection("users").doc(uid);

  const adminEmails = ["support@vyralify.in", "vyralify.io@gmail.com"];
  const role = adminEmails.includes(email.toLowerCase()) ? "admin" : "member";

  try {
    // Write profile document to Firestore
    await userDocRef.set({
      email,
      displayName,
      role,
      tier: "standard",
      subscriptionStatus: null,
      affiliateCode,
      referredBy: null, // Frontend will update if signed up via a link
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    
    console.log(`Successfully created user profile for UID: ${uid} with role: ${role} and affiliateCode: ${affiliateCode}`);
  } catch (error) {
    console.error("Error creating user profile in Firestore:", error);
  }
});

/**
 * Helper to register a referral conversion when a payment completes
 */
async function registerReferral(referredUid: string, pricePaid: number, currency: string) {
  try {
    const userSnap = await db.collection("users").doc(referredUid).get();
    if (!userSnap.exists) return;

    const userData = userSnap.data();
    if (!userData || !userData.referredBy) return;

    const referrerUid = userData.referredBy;

    // Check if referral document already exists
    const referralsRef = db.collection("referrals");
    const querySnapshot = await referralsRef
      .where("referrerUid", "==", referrerUid)
      .where("referredUid", "==", referredUid)
      .get();

    if (querySnapshot.empty) {
      // Create new referrals document
      const referralDoc = {
        referrerUid,
        referredUid,
        status: "active",
        commissionRate: 0.50, // Hardcoded 50%
        startDate: admin.firestore.FieldValue.serverTimestamp(),
      };
      await referralsRef.add(referralDoc);
      console.log(`Referral registered: ${referrerUid} referred ${referredUid}`);

      // Elevate referrer to "affiliate" role if they are a standard member
      const referrerDocRef = db.collection("users").doc(referrerUid);
      const referrerSnap = await referrerDocRef.get();
      if (referrerSnap.exists) {
        const referrerData = referrerSnap.data();
        if (referrerData && referrerData.role === "member") {
          await referrerDocRef.update({ role: "affiliate" });
          console.log(`Elevated user ${referrerUid} to affiliate role`);
        }
      }
    } else {
      // Ensure status is active
      const refId = querySnapshot.docs[0].id;
      await referralsRef.doc(refId).update({ status: "active" });
    }
  } catch (err) {
    console.error("Error in referral registration logic:", err);
  }
}

/**
 * 2. stripeWebhook (Endpoint): Receives Stripe subscription checkout webhooks.
 */
export const stripeWebhook = onRequest(async (req, res) => {
  const stripeSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
      apiVersion: "2023-10-16" as any,
    });
    event = stripe.webhooks.constructEvent(req.rawBody, signature, stripeSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle checkout session completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id || session.metadata?.userId;
    const subscriptionId = session.subscription as string;

    if (userId) {
      const userRef = db.collection("users").doc(userId);
      const pricePaid = session.amount_total ? session.amount_total / 100 : 49; // fallback standard price
      const currency = session.currency || "usd";

      // Determine Tier based on price metadata or standard price checks
      // In production, we'd query the stripe subscription items to verify the product/price ID
      const tier = pricePaid >= 99 ? "pro" : "standard";

      try {
        // Update user status
        await userRef.update({
          subscriptionStatus: "active",
          tier: tier,
        });

        // Add subscription log
        await db.collection("subscriptions").add({
          userId,
          gateway: "stripe",
          gatewayId: subscriptionId,
          priceId: session.metadata?.priceId || "price_standard",
          status: "active",
          currentPeriodEnd: admin.firestore.Timestamp.fromMillis(Date.now() + 30 * 24 * 60 * 60 * 1000), // Mock 30 days
        });

        console.log(`Stripe subscription activated for user: ${userId}, Tier: ${tier}`);

        // Register Referral if referred
        await registerReferral(userId, pricePaid, currency);
      } catch (error) {
        console.error("Error updating database for Stripe webhook:", error);
      }
    }
  }

  res.json({ received: true });
});

/**
 * 3. razorpayWebhook (Endpoint): Receives Razorpay payment webhooks.
 */
export const razorpayWebhook = onRequest(async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  const signature = req.headers["x-razorpay-signature"] as string;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    console.error("Razorpay signature verification failed");
    res.status(400).send("Signature verification failed");
    return;
  }

  const payload = req.body;
  const event = payload.event;

  // Handle subscription charged
  if (event === "subscription.charged") {
    const payment = payload.payload.payment.entity;
    const subscription = payload.payload.subscription.entity;
    const userId = subscription.notes?.userId;

    if (userId) {
      const userRef = db.collection("users").doc(userId);
      const pricePaid = payment.amount ? payment.amount / 100 : 2999; // INR fallback
      const currency = payment.currency || "INR";
      const tier = pricePaid >= 5000 ? "pro" : "standard";

      try {
        await userRef.update({
          subscriptionStatus: "active",
          tier: tier,
        });

        await db.collection("subscriptions").add({
          userId,
          gateway: "razorpay",
          gatewayId: subscription.id,
          priceId: subscription.plan_id,
          status: "active",
          currentPeriodEnd: admin.firestore.Timestamp.fromMillis(subscription.current_end * 1000),
        });

        console.log(`Razorpay subscription activated for user: ${userId}, Tier: ${tier}`);

        await registerReferral(userId, pricePaid, currency);
      } catch (error) {
        console.error("Error updating database for Razorpay webhook:", error);
      }
    }
  }

  res.json({ status: "ok" });
});

/**
 * 4. monthlyCommissionCron (Scheduler): Calculates 50% payout shares monthly.
 * Scheduled to run on the 1st of every month.
 */
export const monthlyCommissionCron = onSchedule("0 0 1 * *", async (event) => {
  console.log("Running monthly commission calculator...");
  const period = new Date().toISOString().substring(0, 7); // e.g. "2026-07"

  try {
    // Get all active referrals
    const referralsSnapshot = await db.collection("referrals")
      .where("status", "==", "active")
      .get();

    if (referralsSnapshot.empty) {
      console.log("No active referrals found for cycle.");
      return;
    }

    const batch = db.batch();

    for (const docSnap of referralsSnapshot.docs) {
      const refData = docSnap.data();
      const referrerUid = refData.referrerUid;
      const referredUid = refData.referredUid;
      const rate = refData.commissionRate || 0.50;

      // Check if the referred user's subscription is still active
      const userSnap = await db.collection("users").doc(referredUid).get();
      if (!userSnap.exists) continue;

      const userData = userSnap.data();
      if (!userData || userData.subscriptionStatus !== "active") {
        // Mark referral as churned if user canceled subscription
        if (userData && userData.subscriptionStatus === "canceled") {
          await docSnap.ref.update({ status: "churned" });
        }
        continue;
      }

      // Calculate amount based on membership tier
      // Standard tier is $49, Pro tier is $99. Affiliate receives 50% commission
      const tier = userData.tier || "standard";
      const subPrice = tier === "pro" ? 99 : 49;
      const commissionAmount = subPrice * rate;

      // Add record to commissions collection
      const commissionRef = db.collection("commissions").doc();
      batch.set(commissionRef, {
        affiliateUid: referrerUid,
        referralId: docSnap.id,
        amount: commissionAmount,
        currency: "USD",
        period,
        status: "pending",
        paidAt: null,
      });

      console.log(`Logged $${commissionAmount} commission for Affiliate: ${referrerUid} from referral: ${referredUid}`);
    }

    await batch.commit();
    console.log("Monthly commissions logging completed successfully.");
  } catch (error) {
    console.error("Error calculating monthly commissions:", error);
  }
});

/**
 * 5. generateSignedUrl (Callable): Generates secure temporary read links for Storage assets.
 */
export const generateSignedUrl = onCall(async (request) => {
  // Ensure user is authenticated
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Authentication is required.");
  }

  const uid = request.auth.uid;
  const storagePath = request.data.storagePath;

  if (!storagePath) {
    throw new HttpsError("invalid-argument", "The 'storagePath' parameter is required.");
  }

  try {
    // Read user tier from Firestore to check access
    const userSnap = await db.collection("users").doc(uid).get();
    if (!userSnap.exists) {
      throw new HttpsError("not-found", "User profile not found.");
    }

    const userData = userSnap.data();
    const userTier = userData?.tier || "standard";

    // Find the asset metadata in Firestore to verify its tier restrictions
    const assetsSnapshot = await db.collection("contentAssets")
      .where("storagePath", "==", storagePath)
      .limit(1)
      .get();

    if (assetsSnapshot.empty) {
      throw new HttpsError("not-found", "Requested asset not found in catalog.");
    }

    const assetData = assetsSnapshot.docs[0].data();
    const assetTier = assetData.tier || "standard";

    // Block standard users from accessing Pro assets
    if (assetTier === "pro" && userTier !== "pro" && userData?.role !== "admin") {
      throw new HttpsError("permission-denied", "Upgrading to Pro is required to access this asset.");
    }

    // Generate signed URL
    const bucket = storage.bucket();
    const file = bucket.file(storagePath);

    // Get signed URL valid for 1 hour
    const [signedUrl] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });

    return { signedUrl };
  } catch (error: any) {
    if (error instanceof HttpsError) {
      throw error;
    }
    console.error("Error generating signed URL:", error);
    throw new HttpsError("internal", "Failed to retrieve signed download URL.");
  }
});
