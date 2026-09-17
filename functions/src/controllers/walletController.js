const { db, serverTimestamp, increment } = require('../config/firebase');

/**
 * 08 💸 WALLET SYSTEM
 * Unified creator earnings:
 * 1. Digital Product Sales
 * 2. Recurring Affiliate Commissions
 * 3. Brand Sponsorship Payments
 * 4. Clipping / Per-View Payouts
 */

/**
 * GET /api/wallet/summary
 * Aggregates all 4 earning streams into a unified balance
 */
async function getWalletSummary(req, res) {
  try {
    const uid = req.user.uid;

    // 1. Digital Product Sales revenue
    const ordersSnap = await db.collection('orders')
      .where('sellerUid', '==', uid)
      .where('status', 'in', ['completed', 'paid'])
      .get();
    
    let productSalesTotal = 0;
    ordersSnap.forEach(d => {
      productSalesTotal += (Number(d.data().amount) || 0);
    });

    // 2. Affiliate Commissions
    const userDoc = await db.doc(`users/${uid}`).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    const affiliateCode = userData.affiliateCode || uid.slice(0, 8).toUpperCase();
    
    const affiliateDoc = await db.doc(`affiliates/${affiliateCode}`).get();
    const affiliateData = affiliateDoc.exists ? affiliateDoc.data() : {};
    const affiliateTotal = affiliateData.totalCommissionsEarned || ((affiliateData.conversions || 0) * 200); // ₹200 per active member

    // 3 & 4. Brand Sponsorships & Clipping Payouts
    const earningsDoc = await db.doc(`creatorEarnings/${uid}`).get();
    const campaignEarnings = earningsDoc.exists ? earningsDoc.data() : {
      totalEarned: 0,
      pending: 0,
      approved: 0,
      payable: 0,
      paid: 0
    };

    const brandPaymentsTotal = campaignEarnings.brandDealsTotal || 0;
    const clippingPayoutsTotal = (campaignEarnings.totalEarned || 0) - brandPaymentsTotal;

    // Unified total earned
    const totalLifetimeEarned = productSalesTotal + affiliateTotal + (campaignEarnings.totalEarned || 0);
    const availableBalance = (campaignEarnings.payable || 0) + (productSalesTotal * 0.95); // 95% net after standard payment gateway

    return res.json({
      success: true,
      data: {
        currency: userData.currency || 'INR',
        availableBalance: Math.round(availableBalance),
        totalLifetimeEarned: Math.round(totalLifetimeEarned),
        streams: {
          productSales: {
            amount: Math.round(productSalesTotal),
            ordersCount: ordersSnap.size,
            label: 'Digital Products & Store Sales'
          },
          affiliateCommissions: {
            amount: Math.round(affiliateTotal),
            conversions: affiliateData.conversions || 0,
            label: 'Vyralify 40% Recurring Affiliate'
          },
          clippingPayouts: {
            amount: Math.max(Math.round(clippingPayoutsTotal), 0),
            label: 'Per-View Clipping Challenges'
          },
          brandPayments: {
            amount: Math.round(brandPaymentsTotal),
            label: 'Direct Brand Sponsorship Deals'
          }
        },
        payoutStatus: {
          pendingApproval: campaignEarnings.pending || 0,
          readyForWithdrawal: Math.round(availableBalance),
          alreadyPaidOut: campaignEarnings.paid || 0
        }
      }
    });
  } catch (err) {
    console.error('getWalletSummary error:', err);
    return res.status(500).json({ error: 'Failed to aggregate unified wallet summary.' });
  }
}

/**
 * GET /api/wallet/transactions
 * Unified transaction ledger
 */
async function getTransactionHistory(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('walletTransactions')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const transactions = [];
    snap.forEach(d => transactions.push({ id: d.id, ...d.data() }));

    // Items 5 & 6: Standardized Empty State
    if (transactions.length === 0) {
      return res.json({
        success: true,
        data: [],
        emptyState: {
          icon: '💸',
          title: 'No transactions yet',
          message: 'Your earnings from digital product sales, clipping campaigns, and affiliate commissions will appear here.',
          ctaAction: '/campaigns'
        }
      });
    }

    return res.json({ success: true, data: transactions });
  } catch (err) {
    console.error('getTransactionHistory error:', err);
    return res.status(500).json({ error: 'Failed to load transaction history.' });
  }
}

/**
 * POST /api/wallet/withdraw
 * Request a payout withdrawal with Item 3: Spending Cap Protection
 */
async function createWithdrawal(req, res) {
  try {
    const uid = req.user.uid;
    const { amount, method = 'upi', details } = req.body;
    const numericAmount = Number(amount);

    if (!amount || numericAmount < 500) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is ₹500.' });
    }

    // Item 3: Spending Caps (Max ₹50,000 per 24 hours)
    const MAX_DAILY_WITHDRAWAL_CAP = 50000;
    if (numericAmount > MAX_DAILY_WITHDRAWAL_CAP) {
      return res.status(400).json({
        success: false,
        error: `Requested amount exceeds the daily withdrawal security cap of ₹${MAX_DAILY_WITHDRAWAL_CAP.toLocaleString('en-IN')}.`,
        code: 'ERR_DAILY_SPENDING_CAP_EXCEEDED'
      });
    }

    // Check recent 24-hour withdrawals
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentPayoutsSnap = await db.collection('payoutRequests')
      .where('creatorUid', '==', uid)
      .where('createdAt', '>=', oneDayAgo)
      .get();

    let past24hTotal = 0;
    recentPayoutsSnap.forEach(d => { past24hTotal += (Number(d.data().amount) || 0); });

    if (past24hTotal + numericAmount > MAX_DAILY_WITHDRAWAL_CAP) {
      return res.status(400).json({
        success: false,
        error: `Daily withdrawal limit reached. You have already requested ₹${past24hTotal.toLocaleString('en-IN')} in the last 24 hours. (Limit: ₹${MAX_DAILY_WITHDRAWAL_CAP.toLocaleString('en-IN')})`,
        code: 'ERR_DAILY_SPENDING_CAP_EXCEEDED'
      });
    }

    if (!details || (!details.upiId && !details.accountNumber)) {
      return res.status(400).json({ error: 'Valid payout destination details (UPI ID or Bank Details) required.' });
    }

    const docRef = await db.collection('payoutRequests').add({
      creatorUid: uid,
      amount: numericAmount,
      currency: 'INR',
      method,
      details,
      status: 'processing',
      estimatedArrival: '24 - 48 Hours',
      createdAt: serverTimestamp()
    });

    // Record in ledger
    await db.collection('walletTransactions').add({
      uid,
      type: 'debit',
      category: 'withdrawal',
      title: `Payout Withdrawal (${method.toUpperCase()})`,
      amount: numericAmount,
      currency: 'INR',
      status: 'processing',
      payoutRequestId: docRef.id,
      timestamp: serverTimestamp()
    });

    return res.status(201).json({
      success: true,
      message: 'Withdrawal request submitted successfully.',
      payoutId: docRef.id
    });
  } catch (err) {
    console.error('createWithdrawal error:', err);
    return res.status(500).json({ error: 'Failed to create withdrawal request.' });
  }
}

module.exports = {
  getWalletSummary,
  getTransactionHistory,
  createWithdrawal
};
