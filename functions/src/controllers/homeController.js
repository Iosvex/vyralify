const { db, serverTimestamp } = require('../config/firebase');

/**
 * GET /api/home/overview
 * Central ecosystem overview: Sales, Earnings, Content views, Business Activity, and Progress.
 */
async function getOverview(req, res) {
  try {
    const uid = req.user.uid;

    // Fetch user profile
    const userDoc = await db.doc(`users/${uid}`).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    // 1. Fetch connected Instagram accounts summary
    const pagesSnap = await db.collection('instagramPages').where('ownerUid', '==', uid).get();
    let totalViews = 0;
    let totalReach = 0;
    let totalFollowers = 0;
    let connectedPagesCount = pagesSnap.size;

    pagesSnap.forEach(doc => {
      const p = doc.data();
      totalViews += (p.views30d || p.totalViews || 0);
      totalReach += (p.reach30d || p.totalReach || 0);
      totalFollowers += (p.followers || 0);
    });

    // 2. Fetch business orders and sales
    const ordersSnap = await db.collection('orders')
      .where('sellerUid', '==', uid)
      .limit(50)
      .get();
    
    let totalSalesCount = ordersSnap.size;
    let totalProductRevenue = 0;
    ordersSnap.forEach(doc => {
      const o = doc.data();
      if (o.status === 'completed' || o.status === 'paid') {
        totalProductRevenue += (Number(o.amount) || 0);
      }
    });

    // 3. Fetch creator campaign earnings
    const earningsDoc = await db.doc(`creatorEarnings/${uid}`).get();
    const campaignEarnings = earningsDoc.exists ? earningsDoc.data() : {
      totalEarned: 0,
      pending: 0,
      approved: 0,
      payable: 0,
      paid: 0
    };

    // Total ecosystem earnings
    const totalEarnings = (totalProductRevenue) + (campaignEarnings.totalEarned || 0);

    // 4. Fetch recent business activities
    const activitiesSnap = await db.collection('businessActivities')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get();

    const activities = [];
    activitiesSnap.forEach(doc => {
      activities.push({ id: doc.id, ...doc.data() });
    });

    // 5. Calculate progress milestone score
    // Factors: Page connected, product published, scheduled post active, first sale or campaign submission
    let milestoneScore = 15; // Base profile creation
    if (connectedPagesCount > 0) milestoneScore += 25;
    if (totalSalesCount > 0) milestoneScore += 30;
    if (campaignEarnings.totalEarned > 0) milestoneScore += 20;
    if (totalViews > 10000) milestoneScore += 10;
    if (milestoneScore > 100) milestoneScore = 100;

    return res.json({
      success: true,
      data: {
        summary: {
          totalEarnings,
          currency: userData.currency || 'INR',
          totalSalesCount,
          productRevenue: totalProductRevenue,
          campaignEarnings: campaignEarnings.totalEarned || 0,
          pendingCampaignPayout: campaignEarnings.pending || 0,
          payableCampaignPayout: campaignEarnings.payable || 0
        },
        contentPerformance: {
          connectedPagesCount,
          totalViews,
          totalReach,
          totalFollowers,
          averageEngagement: connectedPagesCount > 0 ? '4.8%' : '0.0%'
        },
        progress: {
          score: milestoneScore,
          currentLevel: milestoneScore >= 80 ? 'Scale' : milestoneScore >= 40 ? 'Grow' : 'Launch',
          nextMilestone: milestoneScore >= 80 ? 'Scale to ₹1,00,000 / month' : milestoneScore >= 40 ? 'Secure first 10 digital customers' : 'Publish your first digital product & connect page'
        },
        recentActivity: activities.length ? activities : [
          {
            type: 'system',
            title: 'Welcome to Vyralify',
            description: 'Your business command center is active. Choose an action from Launch Your Business or Vyralify AI.',
            timestamp: new Date().toISOString()
          }
        ]
      }
    });
  } catch (err) {
    console.error('getHomeOverview error:', err);
    return res.status(500).json({ error: 'Failed to aggregate home overview metrics.' });
  }
}

/**
 * Helper: Log business activity
 */
async function logActivity(uid, { type, title, description, metadata = {} }) {
  try {
    await db.collection('businessActivities').add({
      uid,
      type,
      title,
      description,
      metadata,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error('logActivity error:', e.message);
  }
}

module.exports = {
  getOverview,
  logActivity
};
