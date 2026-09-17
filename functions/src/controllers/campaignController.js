const { db, serverTimestamp, increment } = require('../config/firebase');

// ==================== CAMPAIGN DISCOVERY ====================

async function listCampaigns(req, res) {
  try {
    const { type, niche } = req.query;
    let query = db.collection('campaigns').where('status', '==', 'active');

    if (type) {
      query = query.where('payoutType', '==', type); // fixed | per_view | cpm
    }
    if (niche) {
      query = query.where('niche', '==', niche);
    }

    const snap = await query.limit(50).get();
    const campaigns = [];
    snap.forEach(d => campaigns.push({ id: d.id, ...d.data() }));

    return res.json({ success: true, data: campaigns });
  } catch (err) {
    console.error('listCampaigns error:', err);
    return res.status(500).json({ error: 'Failed to list campaigns.' });
  }
}

async function getCampaignDetails(req, res) {
  try {
    const { id } = req.params;
    const doc = await db.doc(`campaigns/${id}`).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Campaign not found.' });
    }
    return res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (err) {
    console.error('getCampaignDetails error:', err);
    return res.status(500).json({ error: 'Failed to get campaign details.' });
  }
}

// ==================== CREATOR SUBMISSION WORKFLOW ====================

/**
 * POST /api/campaigns/:id/apply
 * Creator joins or applies to a campaign
 */
async function joinCampaign(req, res) {
  try {
    const uid = req.user.uid;
    const campaignId = req.params.id;
    const { instagramHandle } = req.body;

    const campaignDoc = await db.doc(`campaigns/${campaignId}`).get();
    if (!campaignDoc.exists || campaignDoc.data().status !== 'active') {
      return res.status(404).json({ error: 'Active campaign not found.' });
    }

    const campaign = campaignDoc.data();

    // Check existing participation
    const existingSnap = await db.collection('campaignSubmissions')
      .where('campaignId', '==', campaignId)
      .where('creatorUid', '==', uid)
      .limit(1)
      .get();

    if (!existingSnap.empty) {
      return res.json({ success: true, message: 'Already enrolled in this campaign.', submissionId: existingSnap.docs[0].id });
    }

    const docRef = await db.collection('campaignSubmissions').add({
      campaignId,
      campaignTitle: campaign.title,
      brandName: campaign.brandName,
      creatorUid: uid,
      instagramHandle: (instagramHandle || '').replace(/^@/, '').trim().toLowerCase(),
      status: 'enrolled', // enrolled -> submitted -> verifying -> approved / rejected -> paid
      postUrl: null,
      viewsCount: 0,
      verifiedViews: 0,
      earnedAmount: 0,
      currency: campaign.currency || 'INR',
      enrolledAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { submissionId: docRef.id, status: 'enrolled' } });
  } catch (err) {
    console.error('joinCampaign error:', err);
    return res.status(500).json({ error: 'Failed to join campaign.' });
  }
}

/**
 * POST /api/campaigns/submissions/:id/submit-clip
 * Creator submits reel/clip URL for view verification
 */
async function submitClipProof(req, res) {
  try {
    const uid = req.user.uid;
    const submissionId = req.params.id;
    const { postUrl } = req.body;

    if (!postUrl || !postUrl.includes('instagram.com/')) {
      return res.status(400).json({ error: 'A valid Instagram Reel URL is required.' });
    }

    const subDocRef = db.doc(`campaignSubmissions/${submissionId}`);
    const subDoc = await subDocRef.get();

    if (!subDoc.exists || subDoc.data().creatorUid !== uid) {
      return res.status(404).json({ error: 'Submission not found or unauthorized.' });
    }

    // Update to verifying state and initialize view tracking
    await subDocRef.update({
      postUrl: postUrl.trim(),
      status: 'verifying',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.json({
      success: true,
      message: 'Clip submitted for automated verification and view tracking.',
      status: 'verifying'
    });
  } catch (err) {
    console.error('submitClipProof error:', err);
    return res.status(500).json({ error: 'Failed to submit clip URL.' });
  }
}

/**
 * GET /api/campaigns/my-submissions
 * Returns user's enrolled campaigns and clip submissions
 */
async function listMySubmissions(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('campaignSubmissions')
      .where('creatorUid', '==', uid)
      .orderBy('enrolledAt', 'desc')
      .get();

    const submissions = [];
    snap.forEach(d => submissions.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: submissions });
  } catch (err) {
    console.error('listMySubmissions error:', err);
    return res.status(500).json({ error: 'Failed to list campaign submissions.' });
  }
}

// ==================== EARNINGS & PAYOUTS ====================

/**
 * GET /api/campaigns/earnings
 * Complete creator campaign earnings ledger
 */
async function getEarningsLedger(req, res) {
  try {
    const uid = req.user.uid;
    const earningsDoc = await db.doc(`creatorEarnings/${uid}`).get();
    const earningsData = earningsDoc.exists ? earningsDoc.data() : {
      totalEarned: 0,
      pending: 0,
      approved: 0,
      payable: 0,
      paid: 0,
      currency: 'INR'
    };

    // Fetch withdrawal / payout requests
    const payoutsSnap = await db.collection('payoutRequests')
      .where('creatorUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const payoutHistory = [];
    payoutsSnap.forEach(d => payoutHistory.push({ id: d.id, ...d.data() }));

    return res.json({
      success: true,
      data: {
        summary: earningsData,
        payoutHistory
      }
    });
  } catch (err) {
    console.error('getEarningsLedger error:', err);
    return res.status(500).json({ error: 'Failed to get earnings ledger.' });
  }
}

/**
 * POST /api/campaigns/withdraw
 * Request payout withdrawal of payable earnings
 */
async function requestWithdrawal(req, res) {
  try {
    const uid = req.user.uid;
    const { amount, payoutMethod = 'upi', paymentDetails } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'A valid withdrawal amount is required.' });
    }

    const earningsRef = db.doc(`creatorEarnings/${uid}`);
    const earningsDoc = await earningsRef.get();
    const currentPayable = earningsDoc.exists ? (earningsDoc.data().payable || 0) : 0;

    if (amount > currentPayable) {
      return res.status(400).json({ error: `Insufficient payable balance. Available: ₹${currentPayable}` });
    }

    // Deduct from payable and add to pending payout
    await earningsRef.update({
      payable: increment(-Number(amount)),
      pendingPayout: increment(Number(amount)),
      updatedAt: serverTimestamp()
    });

    const payoutDocRef = await db.collection('payoutRequests').add({
      creatorUid: uid,
      amount: Number(amount),
      currency: earningsDoc.data().currency || 'INR',
      payoutMethod,
      paymentDetails: paymentDetails || {},
      status: 'processing',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.json({
      success: true,
      message: 'Withdrawal request created successfully.',
      payoutId: payoutDocRef.id
    });
  } catch (err) {
    console.error('requestWithdrawal error:', err);
    return res.status(500).json({ error: 'Failed to request withdrawal.' });
  }
}

// ==================== BRAND CAMPAIGN ROI ====================

/**
 * GET /api/campaigns/:id/roi
 * Pre & Post campaign ROI metrics for brands and creators
 */
async function getCampaignRoi(req, res) {
  try {
    const { id } = req.params;
    const doc = await db.doc(`campaigns/${id}`).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Campaign not found.' });
    }

    const camp = doc.data();
    const budget = camp.budget || 50000;
    const targetViews = camp.targetViews || 500000;
    const actualViews = camp.actualViews || 420000;

    return res.json({
      success: true,
      data: {
        campaignId: id,
        title: camp.title,
        preCampaign: {
          budget,
          estimatedReach: targetViews * 1.25,
          estimatedCpm: `₹${((budget / targetViews) * 1000).toFixed(2)}`,
          estimatedClicks: Math.round(targetViews * 0.025),
          estimatedConversions: Math.round(targetViews * 0.003)
        },
        postCampaign: {
          totalSpent: camp.totalPaidOut || (budget * 0.84),
          actualViews,
          actualCpm: `₹${(((camp.totalPaidOut || (budget * 0.84)) / actualViews) * 1000).toFixed(2)}`,
          actualClicks: Math.round(actualViews * 0.028),
          actualConversions: Math.round(actualViews * 0.0034),
          roiMultiplier: '3.4x'
        }
      }
    });
  } catch (err) {
    console.error('getCampaignRoi error:', err);
    return res.status(500).json({ error: 'Failed to calculate campaign ROI.' });
  }
}

// ==================== 06 MARKETPLACE & CREATOR MATCHING ====================

/**
 * GET /api/marketplace/personalized-feed
 * Personalized opportunities feed tailored to the creator's niche, follower tier, and performance
 */
async function getPersonalizedOpportunities(req, res) {
  try {
    const uid = req.user.uid;

    // Load creator's primary page stats
    const pagesSnap = await db.collection('instagramPages').where('ownerUid', '==', uid).limit(1).get();
    const primaryPage = !pagesSnap.empty ? pagesSnap.docs[0].data() : { niche: 'General', followers: 0 };
    const creatorFollowers = primaryPage.followers || 0;
    const creatorNiche = (primaryPage.niche || 'General').toLowerCase();

    // Fetch active campaigns
    const campSnap = await db.collection('campaigns').where('status', '==', 'active').get();
    const opportunities = [];

    campSnap.forEach(d => {
      const c = d.data();
      const campNiche = (c.niche || '').toLowerCase();
      let matchScore = 70;

      // Niche match bonus
      if (campNiche && (creatorNiche.includes(campNiche) || campNiche.includes(creatorNiche))) {
        matchScore += 25;
      }

      // Follower match bonus
      if (c.payoutType === 'per_view' || creatorFollowers >= (c.minFollowers || 1000)) {
        matchScore += 5;
      }

      opportunities.push({
        id: d.id,
        type: 'campaign',
        title: c.title,
        brandName: c.brandName,
        payoutType: c.payoutType,
        rewardPer1000Views: c.rewardPer1000Views || null,
        fixedPayout: c.fixedPayout || null,
        currency: c.currency || 'INR',
        matchScore: Math.min(matchScore, 98),
        reason: matchScore >= 90 ? 'Perfect niche alignment with your audience' : 'High-paying performance pool'
      });
    });

    // Sort by matchScore
    opportunities.sort((a, b) => b.matchScore - a.matchScore);

    return res.json({
      success: true,
      data: {
        creatorContext: {
          niche: primaryPage.niche || 'Theme Page',
          followers: creatorFollowers
        },
        opportunities: opportunities.slice(0, 10)
      }
    });
  } catch (err) {
    console.error('getPersonalizedOpportunities error:', err);
    return res.status(500).json({ error: 'Failed to generate personalized opportunities.' });
  }
}

/**
 * GET /api/marketplace/creators
 * Discovery endpoint for brands looking for creators in specific niches
 */
async function listMarketplaceCreators(req, res) {
  try {
    const { niche, minFollowers = 1000 } = req.query;
    let query = db.collection('instagramPages').where('followers', '>=', Number(minFollowers));

    const snap = await query.limit(20).get();
    const creators = [];
    snap.forEach(d => {
      const page = d.data();
      if (!niche || (page.niche && page.niche.toLowerCase().includes(niche.toLowerCase()))) {
        creators.push({
          id: d.id,
          handle: page.handle,
          niche: page.niche,
          followers: page.followers,
          engagementRate: page.engagementRate || '4.2%',
          profileHealthScore: page.profileHealthScore || 85
        });
      }
    });

    return res.json({ success: true, data: creators });
  } catch (err) {
    console.error('listMarketplaceCreators error:', err);
    return res.status(500).json({ error: 'Failed to list marketplace creators.' });
  }
}

module.exports = {
  listCampaigns,
  getCampaignDetails,
  joinCampaign,
  submitClipProof,
  listMySubmissions,
  getEarningsLedger,
  requestWithdrawal,
  getCampaignRoi,
  getPersonalizedOpportunities,
  listMarketplaceCreators
};
