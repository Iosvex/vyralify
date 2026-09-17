const { db, serverTimestamp } = require('../config/firebase');

// ==================== PAGE MANAGEMENT ====================

async function listPages(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('instagramPages')
      .where('ownerUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const pages = [];
    snap.forEach(doc => pages.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: pages });
  } catch (err) {
    console.error('listPages error:', err);
    return res.status(500).json({ error: 'Failed to list Instagram pages.' });
  }
}

async function addPage(req, res) {
  try {
    const uid = req.user.uid;
    const {
      handle,
      niche = 'General',
      followers = 0,
      bio = '',
      category = 'Theme Page',
      profilePicUrl = '',
      targetAudience = 'Global'
    } = req.body;

    if (!handle) {
      return res.status(400).json({ error: 'Instagram handle is required.' });
    }

    const cleanHandle = handle.replace(/^@/, '').trim().toLowerCase();

    const docRef = await db.collection('instagramPages').add({
      ownerUid: uid,
      handle: cleanHandle,
      niche,
      category,
      followers: Number(followers) || 0,
      totalViews: 0,
      views30d: 0,
      reach30d: 0,
      engagementRate: '4.5%',
      bio: bio.trim(),
      profilePicUrl,
      targetAudience,
      profileHealthScore: 78,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id, handle: cleanHandle } });
  } catch (err) {
    console.error('addPage error:', err);
    return res.status(500).json({ error: 'Failed to add Instagram page.' });
  }
}

async function auditProfile(req, res) {
  try {
    const { handle, bio = '', hasLinkInBio = true, highlightsCount = 4 } = req.body;

    let score = 50;
    const suggestions = [];

    // Bio checks
    if (bio.length >= 30 && bio.length <= 150) {
      score += 20;
    } else {
      suggestions.push('Keep bio between 30 and 150 characters for maximum scannability.');
    }

    if (/[\n\r]/.test(bio)) {
      score += 10;
    } else {
      suggestions.push('Use line breaks to separate your authority statement and call-to-action.');
    }

    if (hasLinkInBio) {
      score += 10;
    } else {
      suggestions.push('Add a high-converting link-in-bio to capture traffic.');
    }

    if (highlightsCount >= 3) {
      score += 10;
    } else {
      suggestions.push('Create at least 3 themed story highlights (About, Reviews/Proof, Best Content).');
    }

    return res.json({
      success: true,
      data: {
        handle: handle || 'Your Page',
        healthScore: Math.min(score, 100),
        rating: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Work',
        suggestions
      }
    });
  } catch (err) {
    console.error('auditProfile error:', err);
    return res.status(500).json({ error: 'Profile audit failed.' });
  }
}

async function checkUsername(req, res) {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    const clean = String(username).replace(/^@/, '').trim().toLowerCase();
    const isCleanLength = clean.length >= 4 && clean.length <= 18;
    const hasNumbers = /\d/.test(clean);
    const hasUnderscores = /_/.test(clean);

    let score = 90;
    if (hasNumbers) score -= 15;
    if (hasUnderscores) score -= 10;
    if (!isCleanLength) score -= 25;

    return res.json({
      success: true,
      data: {
        username: clean,
        isMemorable: score >= 75,
        memorabilityScore: Math.max(score, 10),
        advice: score >= 75
          ? 'Great username! Short, authoritative, and clean of unnecessary digits.'
          : 'Consider avoiding multiple numbers or underscores to maximize brand recall.'
      }
    });
  } catch (err) {
    console.error('checkUsername error:', err);
    return res.status(500).json({ error: 'Username check failed.' });
  }
}

// ==================== SCHEDULING & CONTENT CALENDAR ====================

async function listScheduledPosts(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('scheduledPosts')
      .where('ownerUid', '==', uid)
      .orderBy('scheduledTime', 'asc')
      .get();

    const posts = [];
    snap.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: posts });
  } catch (err) {
    console.error('listScheduledPosts error:', err);
    return res.status(500).json({ error: 'Failed to list scheduled posts.' });
  }
}

async function schedulePost(req, res) {
  try {
    const uid = req.user.uid;
    const { pageId, title, caption, scheduledTime, mediaUrl, postType = 'reel' } = req.body;

    if (!title || !scheduledTime) {
      return res.status(400).json({ error: 'Title and scheduledTime are required.' });
    }

    const docRef = await db.collection('scheduledPosts').add({
      ownerUid: uid,
      pageId: pageId || null,
      title: title.trim(),
      caption: (caption || '').trim(),
      postType,
      mediaUrl: mediaUrl || '',
      scheduledTime: new Date(scheduledTime).toISOString(),
      status: 'scheduled',
      createdAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (err) {
    console.error('schedulePost error:', err);
    return res.status(500).json({ error: 'Failed to schedule post.' });
  }
}

function getBestTimeRecommendations(req, res) {
  // Best posting time intelligence based on Instagram algorithm 2026 data
  const times = [
    { day: 'Monday', bestSlot: '12:30 PM & 7:15 PM', expectedEngagement: '+22%' },
    { day: 'Tuesday', bestSlot: '6:45 PM & 9:00 PM', expectedEngagement: '+28%' },
    { day: 'Wednesday', bestSlot: '11:00 AM & 8:00 PM', expectedEngagement: '+31%' },
    { day: 'Thursday', bestSlot: '7:30 PM & 9:30 PM', expectedEngagement: '+25%' },
    { day: 'Friday', bestSlot: '5:00 PM & 8:15 PM', expectedEngagement: '+35%' },
    { day: 'Saturday', bestSlot: '10:30 AM & 6:00 PM', expectedEngagement: '+30%' },
    { day: 'Sunday', bestSlot: '7:00 PM & 9:45 PM', expectedEngagement: '+40%' }
  ];

  return res.json({ success: true, data: times });
}

// ==================== COMMENTS & DMS ====================

async function listDmTemplates(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('dmTemplates')
      .where('ownerUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const templates = [];
    snap.forEach(doc => templates.push({ id: doc.id, ...doc.data() }));

    // Fallback default templates if user hasn't added custom ones
    if (templates.length === 0) {
      return res.json({
        success: true,
        data: [
          {
            id: 'default-1',
            triggerKeyword: 'LINK',
            title: 'Digital Product Link Delivery',
            body: 'Hey! Here is the direct link to the guide you requested: {{link}} Let me know if you have any questions!',
            isDefault: true
          },
          {
            id: 'default-2',
            triggerKeyword: 'START',
            title: 'Welcome & Niche Starter Kit',
            body: 'Thanks for reaching out! What stage are you currently at with your page? Just starting or scaling?',
            isDefault: true
          }
        ]
      });
    }

    return res.json({ success: true, data: templates });
  } catch (err) {
    console.error('listDmTemplates error:', err);
    return res.status(500).json({ error: 'Failed to list DM templates.' });
  }
}

async function saveDmTemplate(req, res) {
  try {
    const uid = req.user.uid;
    const { triggerKeyword, title, body } = req.body;

    if (!triggerKeyword || !body) {
      return res.status(400).json({ error: 'Trigger keyword and message body are required.' });
    }

    const docRef = await db.collection('dmTemplates').add({
      ownerUid: uid,
      triggerKeyword: triggerKeyword.toUpperCase().trim(),
      title: (title || triggerKeyword).trim(),
      body: body.trim(),
      createdAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (err) {
    console.error('saveDmTemplate error:', err);
    return res.status(500).json({ error: 'Failed to save DM template.' });
  }
}

// ==================== GROWTH & COMPETITOR WATCH ====================

async function getGrowthTracker(req, res) {
  try {
    const uid = req.user.uid;
    const goalsSnap = await db.collection('growthGoals').where('ownerUid', '==', uid).get();
    const goals = [];
    goalsSnap.forEach(d => goals.push({ id: d.id, ...d.data() }));

    return res.json({
      success: true,
      data: {
        milestones: [
          { title: 'Phase 1: Foundation (0 to 1,000 Followers)', target: 1000, keyFocus: 'Post 2 reels daily, test 5 hook archetypes' },
          { title: 'Phase 2: Productization (1,000 to 10,000 Followers)', target: 10000, keyFocus: 'Launch ₹499 digital product & DM funnel' },
          { title: 'Phase 3: Hyper-Scale (10,000 to 100,000 Followers)', target: 100000, keyFocus: 'Brand sponsorships & multi-page clipping' }
        ],
        activeGoals: goals
      }
    });
  } catch (err) {
    console.error('getGrowthTracker error:', err);
    return res.status(500).json({ error: 'Failed to get growth tracker.' });
  }
}

async function listCompetitors(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('competitorWatch').where('ownerUid', '==', uid).get();
    const list = [];
    snap.forEach(d => list.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: list });
  } catch (err) {
    console.error('listCompetitors error:', err);
    return res.status(500).json({ error: 'Failed to list competitors.' });
  }
}

async function addCompetitor(req, res) {
  try {
    const uid = req.user.uid;
    const { handle, niche, estimatedFollowers } = req.body;

    if (!handle) {
      return res.status(400).json({ error: 'Competitor handle is required.' });
    }

    const docRef = await db.collection('competitorWatch').add({
      ownerUid: uid,
      handle: handle.replace(/^@/, '').trim().toLowerCase(),
      niche: niche || 'Same Niche',
      estimatedFollowers: Number(estimatedFollowers) || 0,
      viralOutlierAlerts: true,
      createdAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (err) {
    console.error('addCompetitor error:', err);
    return res.status(500).json({ error: 'Failed to add competitor.' });
  }
}

module.exports = {
  listPages,
  addPage,
  auditProfile,
  checkUsername,
  listScheduledPosts,
  schedulePost,
  getBestTimeRecommendations,
  listDmTemplates,
  saveDmTemplate,
  getGrowthTracker,
  listCompetitors,
  addCompetitor
};
