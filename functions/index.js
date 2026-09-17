const functions = require('firebase-functions/v1');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { db, admin, serverTimestamp } = require('./src/config/firebase');
const apiRouter = require('./src/routes/apiRouter');
const logger = require('./src/utils/logger');
const { globalLimiter } = require('./src/middleware/rateLimiter');
const timeoutHandler = require('./src/middleware/timeoutHandler');
const idempotencyMiddleware = require('./src/middleware/idempotency');
const { notFoundHandler, globalErrorHandler } = require('./src/middleware/errorHandler');

// Initialize Express API App
const app = express();

// 1. Response Compression (Item 14: Compress Files)
app.use(compression({ threshold: 1024 }));

// 2. CORS
app.use(cors({ origin: true }));

// 3. Request Logging (Item 18: Error & Event Logging)
app.use(logger.requestLogger);

// 4. Rate Limiting (Items 1 & 2: Rate Limiting & API Limits)
app.use(globalLimiter);

// 5. Upload Size Limits (Item 15: Limit Upload Size)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 6. Request Timeout (Item 8: Handle API Timeouts)
app.use(timeoutHandler(25000));

// 7. Idempotency (Items 9 & 10: Prevent Duplicate Subs & Payments)
app.use(idempotencyMiddleware);

// Item 17: Deep Uptime Monitoring & Health Check
app.get('/health', async (req, res) => {
  const startDb = Date.now();
  let dbStatus = 'healthy';
  let dbLatencyMs = 0;

  try {
    // Quick ping to Firestore to verify connectivity
    await db.collection('nicheIntelligence').limit(1).get();
    dbLatencyMs = Date.now() - startDb;
  } catch (err) {
    dbStatus = 'degraded';
    dbLatencyMs = Date.now() - startDb;
    logger.error('Health check DB ping failed:', { error: err.message });
  }

  const memory = process.memoryUsage();

  return res.json({
    status: dbStatus === 'healthy' ? 'ok' : 'degraded',
    platform: 'Vyralify 2026 Production Core',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs
    },
    system: {
      nodeVersion: process.version,
      memoryRssMb: Math.round(memory.rss / (1024 * 1024)),
      heapUsedMb: Math.round(memory.heapUsed / (1024 * 1024))
    }
  });
});

// Mount Central Router
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Error Handling (Items 4 & 7: Error Handling & Failed Requests)
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Export Cloud Function HTTPS API
exports.api = functions.https.onRequest(app);

// Auth Trigger: Initialize user ecosystem profile upon signup
exports.onUserCreate = functions.auth.user().onCreate(async (user) => {
  const uid = user.uid;
  const affiliateCode = uid.slice(0, 8).toUpperCase();
  const slug = uid.slice(0, 8).toLowerCase();

  const batch = db.batch();

  // 1. User Profile Document with Spending Cap quota (Item 3)
  const userRef = db.doc(`users/${uid}`);
  batch.set(userRef, {
    email: user.email || '',
    displayName: user.displayName || 'Vyralify Creator',
    role: 'member',
    tier: 'active',
    country: 'IN',
    currency: 'INR',
    billingProvider: 'cashfree',
    subscriptionStatus: 'active',
    affiliateCode,
    referredBy: null,
    onboardingTrack: 'beginner',
    aiUsage: {
      dailyCount: 0,
      dailyLimit: 25, // Item 3: Spending Cap on daily generations
      resetAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 86400000))
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });

  // 2. Affiliate Document
  const affRef = db.doc(`affiliates/${affiliateCode}`);
  batch.set(affRef, {
    ownerUid: uid,
    clicks: 0,
    signups: 0,
    conversions: 0,
    createdAt: serverTimestamp()
  });

  // 3. Creator Store Infrastructure Initial State
  const storeRef = db.doc(`stores/${uid}`);
  batch.set(storeRef, {
    sellerUid: uid,
    storeName: `${user.displayName || 'Creator'}'s Store`,
    slug,
    bio: 'Official digital store, tools, and creator vault.',
    brandColor: '#FF5722',
    isPublished: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  // 4. Link-in-Bio Initial State
  const linkRef = db.doc(`linkPages/${uid}`);
  batch.set(linkRef, {
    ownerUid: uid,
    slug,
    title: user.displayName || 'My Links',
    bio: 'Follow my content & check out my store 👇',
    theme: 'dark-glass',
    links: [],
    totalClicks: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  // 5. Creator Earnings Ledger
  const earningsRef = db.doc(`creatorEarnings/${uid}`);
  batch.set(earningsRef, {
    creatorUid: uid,
    totalEarned: 0,
    pending: 0,
    approved: 0,
    payable: 0,
    paid: 0,
    currency: 'INR',
    updatedAt: serverTimestamp()
  });

  await batch.commit();
  console.log(`Successfully initialized Vyralify ecosystem state for user: ${uid}`);
});

// Backwards compatibility functions
exports.generateAi = functions.https.onRequest(async (req, res) => {
  return app(req, res);
});

exports.createCheckout = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.json({ url: 'https://payments.cashfree.com/forms/vyralifyio' });
});

exports.completeSignup = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.json({ ok: true, active: true });
});
