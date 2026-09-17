const { db, serverTimestamp } = require('../config/firebase');

const DEFAULT_CURRICULUM = [
  {
    id: 'trk-basics',
    trackName: 'Basics',
    icon: '📚',
    description: 'Foundation for complete beginners',
    lessons: [
      { id: 'b-1', title: 'Welcome to Vyralify Ecosystem', duration: '5 min' },
      { id: 'b-2', title: 'Choosing Your High-Margin Niche', duration: '12 min' },
      { id: 'b-3', title: 'Build Your Faceless Page Identity', duration: '15 min' },
      { id: 'b-4', title: 'Setup Existing Faceless Page Optimization', duration: '10 min' },
      { id: 'b-5', title: 'Instagram Algorithm Rules & Guidelines 2026', duration: '8 min' }
    ]
  },
  {
    id: 'trk-content',
    trackName: 'Content',
    icon: '🎬',
    description: 'High retention creation workflows',
    lessons: [
      { id: 'c-1', title: 'Finding Winning Outlier Content', duration: '10 min' },
      { id: 'c-2', title: 'Crafting High-Retention Visual Hooks', duration: '14 min' },
      { id: 'c-3', title: 'Trending Audio Drops & Velocity Timing', duration: '7 min' },
      { id: 'c-4', title: 'The High-Converting CTA Library', duration: '9 min' },
      { id: 'c-5', title: 'Plug-and-Play Template Packs', duration: '11 min' }
    ]
  },
  {
    id: 'trk-growth',
    trackName: 'Growth',
    icon: '📈',
    description: 'Scale from 0 to 100k organic followers',
    lessons: [
      { id: 'g-1', title: 'The 2026 Algorithm Ranking Guide', duration: '15 min' },
      { id: 'g-2', title: '2-Reels/Day Posting Calendar Framework', duration: '12 min' },
      { id: 'g-3', title: 'Multi-Page Portfolio Scaling Strategy', duration: '18 min' },
      { id: 'g-4', title: 'Creator Progress Tracking & Milestones', duration: '8 min' },
      { id: 'g-5', title: 'Case Studies & 500k Account Breakdowns', duration: '20 min' }
    ]
  },
  {
    id: 'trk-monetisation',
    trackName: 'Monetisation',
    icon: '💰',
    description: 'Turn profile traffic into digital cash flow',
    lessons: [
      { id: 'm-1', title: 'Digital Product Selection Framework', duration: '14 min' },
      { id: 'm-2', title: 'Creator Store Setup in Under 10 Minutes', duration: '12 min' },
      { id: 'm-3', title: 'Sales Psychology for Faceless Audiences', duration: '16 min' },
      { id: 'm-4', title: 'Automated DM Funnels & Closing Scripts', duration: '15 min' },
      { id: 'm-5', title: 'Affiliate Commissions & Sponsorship Marketplace', duration: '13 min' }
    ]
  },
  {
    id: 'trk-scaling',
    trackName: 'Scaling',
    icon: '🚀',
    description: 'Systems, automation, and full-time brand exit',
    lessons: [
      { id: 's-1', title: 'Business Plan Generator & Revenue Modeling', duration: '18 min' },
      { id: 's-2', title: '30/60/90-Day Execution Roadmap', duration: '22 min' }
    ]
  }
];

// ==================== CURRICULUM & LESSONS ====================

async function listCurriculum(req, res) {
  try {
    const snap = await db.collection('universityModules').orderBy('trackOrder').get();
    const modules = [];
    snap.forEach(d => modules.push({ id: d.id, ...d.data() }));

    return res.json({ success: true, data: modules.length ? modules : DEFAULT_CURRICULUM });
  } catch (err) {
    console.error('listCurriculum fallback applied:', err.message);
    return res.json({ success: true, data: DEFAULT_CURRICULUM, fallback: true });
  }
}

async function markLessonComplete(req, res) {
  try {
    const uid = req.user.uid;
    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({ error: 'lessonId is required.' });
    }

    await db.doc(`userLessonProgress/${uid}_${lessonId}`).set({
      uid,
      lessonId,
      completed: true,
      completedAt: serverTimestamp()
    }, { merge: true });

    return res.json({ success: true, message: 'Lesson marked as complete.' });
  } catch (err) {
    console.error('markLessonComplete error:', err);
    return res.status(500).json({ error: 'Failed to record lesson completion.' });
  }
}

// ==================== 30/60/90-DAY ROADMAP ====================

async function getRoadmap(req, res) {
  try {
    const uid = req.user.uid;
    const roadmapDoc = await db.doc(`userRoadmaps/${uid}`).get();

    if (roadmapDoc.exists) {
      return res.json({ success: true, data: roadmapDoc.data() });
    }

    // Default 30/60/90 Roadmap
    const standardRoadmap = {
      uid,
      title: 'Vyralify 90-Day Creator Business Blueprint',
      day30: {
        phase: 'Days 1 - 30: Foundation & First Viral Reel',
        goal: '0 to 2,500 Followers & 1 Tested Digital Offer',
        milestones: [
          'Pick high-margin niche with Opportunity Score > 80',
          'Audit and brand profile bio with line breaks and clear CTA',
          'Post 2 reels daily using Hook Archetypes #1 (Pattern Interrupt) & #4 (Contrarian)',
          'Create ₹499 digital cheat sheet or starter vault in Creator Store'
        ]
      },
      day60: {
        phase: 'Days 31 - 60: Conversion & Momentum',
        goal: '2,500 to 15,000 Followers & First 25 Paying Customers',
        milestones: [
          'Deploy automated DM keyword triggers for all reel captions',
          'Join 2 active Vyralify clipping campaigns for per-view cash flow',
          'Launch a secondary Instagram theme page in a complementary niche',
          'Optimize bio link page conversion rate'
        ]
      },
      day90: {
        phase: 'Days 61 - 90: Scaling & Recurring Revenue',
        goal: '15,000 to 50,000+ Followers & ₹75,000+ / Month',
        milestones: [
          'Pitch brand sponsorships using Vyralify media kit deck',
          'Introduce monthly paid community or recurring SaaS tool bundle',
          'Systematize batch content creation (14 reels scheduled every Sunday)'
        ]
      }
    };

    return res.json({ success: true, data: standardRoadmap });
  } catch (err) {
    console.error('getRoadmap error:', err);
    return res.status(500).json({ error: 'Failed to load roadmap.' });
  }
}

module.exports = {
  listCurriculum,
  markLessonComplete,
  getRoadmap
};
