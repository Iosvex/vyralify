const { db, serverTimestamp } = require('../config/firebase');

// ==================== NICHE & BUSINESS INTELLIGENCE ====================

const DEFAULT_NICHES = [
  { id: 'niche-wealth', name: 'Wealth & Business', category: 'Finance', profitabilityScore: 96, opportunityScore: 92, viralityIndex: 88 },
  { id: 'niche-ai', name: 'AI Productivity & Tech', category: 'Technology', profitabilityScore: 94, opportunityScore: 97, viralityIndex: 95 },
  { id: 'niche-mindset', name: 'Mindset & Stoicism', category: 'Lifestyle', profitabilityScore: 86, opportunityScore: 89, viralityIndex: 94 },
  { id: 'niche-luxury', name: 'Luxury Aesthetics', category: 'Luxury', profitabilityScore: 89, opportunityScore: 84, viralityIndex: 97 },
  { id: 'niche-fitness', name: 'Fitness & Health', category: 'Fitness', profitabilityScore: 90, opportunityScore: 87, viralityIndex: 91 }
];

const DEFAULT_AUDIO = [
  { id: 'audio-1', title: 'Neon Blade (Slowed)', artist: 'MoonDeity', velocityScore: 9.8, reelsCount: '124K', vibe: 'High Tension' },
  { id: 'audio-2', title: 'Cornfield Chase (Ambient)', artist: 'Hans Zimmer', velocityScore: 9.4, reelsCount: '89K', vibe: 'Curiosity' }
];

async function listNiches(req, res) {
  try {
    const snap = await db.collection('nicheIntelligence').orderBy('profitabilityScore', 'desc').get();
    const niches = [];
    snap.forEach(d => niches.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: niches.length ? niches : DEFAULT_NICHES });
  } catch (err) {
    console.error('listNiches fallback applied:', err.message);
    return res.json({ success: true, data: DEFAULT_NICHES, fallback: true });
  }
}

async function listViralPages(req, res) {
  try {
    const { niche } = req.query;
    let query = db.collection('viralPageDatabase');
    if (niche) {
      query = query.where('niche', '==', niche);
    }
    const snap = await query.limit(30).get();
    const pages = [];
    snap.forEach(d => pages.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: pages });
  } catch (err) {
    console.error('listViralPages error:', err.message);
    return res.json({ success: true, data: [], fallback: true });
  }
}

async function listTrendingAudio(req, res) {
  try {
    const snap = await db.collection('trendingAudio').orderBy('velocityScore', 'desc').limit(20).get();
    const tracks = [];
    snap.forEach(d => tracks.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: tracks.length ? tracks : DEFAULT_AUDIO });
  } catch (err) {
    console.error('listTrendingAudio fallback applied:', err.message);
    return res.json({ success: true, data: DEFAULT_AUDIO, fallback: true });
  }
}

// ==================== CONTENT INTELLIGENCE SCORER ====================

/**
 * POST /api/discover/analyze-content
 * Core intelligence algorithm: What happened -> Why it happened -> What should happen next.
 */
function analyzeContent(req, res) {
  try {
    const { hookText = '', scriptText = '', niche = 'Theme Page' } = req.body;

    if (!hookText && !scriptText) {
      return res.status(400).json({ error: 'hookText or scriptText is required.' });
    }

    const textToEvaluate = (hookText + ' ' + scriptText).trim();
    const length = textToEvaluate.length;

    // Algorithmic heuristic evaluation based on 2026 reel patterns
    let hookScore = 65;
    let retentionScore = 70;
    const feedback = [];

    // Check for question or curiosity trigger
    if (/(\?|why|how to|secret|stop doing|mistake|hidden|nobody talks about)/i.test(hookText)) {
      hookScore += 20;
    } else {
      feedback.push('Hook lacks curiosity or urgency. Add an open loop like "The hidden reason..." or "Stop doing this..."');
    }

    // Check hook conciseness
    const hookWords = hookText.trim().split(/\s+/).length;
    if (hookWords > 12) {
      hookScore -= 15;
      feedback.push('Hook is too wordy (>12 words). Viewers scroll within 1.5 seconds.');
    } else if (hookWords >= 4 && hookWords <= 10) {
      hookScore += 10;
    }

    // Check for CTA trigger
    const hasCta = /(comment|save|share|link|bio|dm)/i.test(scriptText);
    if (!hasCta) {
      retentionScore -= 15;
      feedback.push('Missing clear single call-to-action (e.g. "Comment ASSET to get this").');
    }

    const overallScore = Math.min(Math.round((hookScore * 0.6) + (retentionScore * 0.4)), 98);

    return res.json({
      success: true,
      data: {
        overallScore,
        hookScore: Math.min(hookScore, 98),
        predictedRetention: `${Math.min(retentionScore + 10, 88)}%`,
        viralStructure: {
          hook: { timing: '00:00 - 00:03', status: hookScore >= 75 ? 'Strong Pattern Interrupt' : 'Needs Urgency' },
          retention: { timing: '00:03 - 00:12', status: 'High Paced Value Delivery' },
          reward: { timing: '00:12 - 00:14', status: 'Clear Payoff & Transformation' },
          callToAction: { timing: '00:14 - 00:15', status: hasCta ? 'Effective Loop' : 'Missing Action Trigger' }
        },
        feedback,
        recommendedNextActions: [
          'Add a fast text-highlight or sticker in the first 0.5s.',
          'Add an audio drop or whoosh sound effect on the primary hook word.',
          'Offer a free lead-magnet in exchange for a 1-word comment to trigger DM automation.'
        ],
        hookVariations: [
          `"The brutal truth about ${niche} that 99% of people ignore:"`,
          `"Stop doing this if you want to scale in ${niche}:"`,
          `"3 things I wish I knew before starting in ${niche}:"`,
          `"The exact 3-step framework to master ${niche} in 2026:"`,
          `"If you're struggling with ${niche}, watch this 15-second breakdown:"`
        ]
      }
    });
  } catch (err) {
    console.error('analyzeContent error:', err);
    return res.status(500).json({ error: 'Failed to analyze content.' });
  }
}

// ==================== REPURPOSING ENGINE ====================

function repurposeContent(req, res) {
  try {
    const { sourceText, targetFormat = 'reel_to_carousel' } = req.body;

    if (!sourceText || typeof sourceText !== 'string') {
      return res.status(400).json({ error: 'sourceText is required.' });
    }

    if (targetFormat === 'reel_to_carousel') {
      return res.json({
        success: true,
        data: {
          format: 'carousel',
          slides: [
            { slide: 1, type: 'Cover Hook', content: sourceText.slice(0, 80) + '... (Swipe Left ➡️)' },
            { slide: 2, type: 'Context / Problem', content: 'Why most people fail at this and what happens when you do it wrong.' },
            { slide: 3, type: 'Step 1 Core Principle', content: 'The foundational shift: Focus on retention and distribution first.' },
            { slide: 4, type: 'Step 2 Execution', content: 'Exact blueprint to implement this in under 30 minutes.' },
            { slide: 5, type: 'Step 3 Pro Tip', content: 'The secret lever: Leverage existing audience attention.' },
            { slide: 6, type: 'Summary & Actionable CTA', content: 'Save this post for later 📌 & Drop a comment for the free template link!' }
          ]
        }
      });
    }

    if (targetFormat === 'longform_to_reel') {
      return res.json({
        success: true,
        data: {
          format: 'short_reel',
          hook: 'Here is what 99% of people get wrong about this:',
          body: sourceText.slice(0, 200),
          cta: 'Comment "GUIDE" and I will send the full breakdown to your DMs.',
          estimatedDurationSeconds: 22
        }
      });
    }

    return res.json({
      success: true,
      data: {
        format: 'story_sequence',
        stories: [
          { story: 1, text: 'Quick question for you guys today... 📊 (Poll)' },
          { story: 2, text: sourceText.slice(0, 100) },
          { story: 3, text: 'Check the link in my bio or reply to this story for the link 🔗' }
        ]
      }
    });
  } catch (err) {
    console.error('repurposeContent error:', err);
    return res.status(500).json({ error: 'Repurpose engine failed.' });
  }
}

// ==================== ASSETS & B-ROLL ====================

async function listAssets(req, res) {
  try {
    const { category = 'broll' } = req.query;
    const snap = await db.collection('assetLibrary')
      .where('category', '==', category)
      .limit(30)
      .get();

    const assets = [];
    snap.forEach(d => assets.push({ id: d.id, ...d.data() }));
    return res.json({ success: true, data: assets });
  } catch (err) {
    console.error('listAssets error:', err);
    return res.status(500).json({ error: 'Failed to list asset library.' });
  }
}

// ==================== LAUNCH BUILDERS ====================

function generateBusinessNames(req, res) {
  try {
    const { niche = 'Wealth', style = 'modern' } = req.body;
    const cleanNiche = niche.toLowerCase();

    const prefixes = ['Vyral', 'Apex', 'Nova', 'Pulse', 'Aero', 'Chronos', 'Zenith', 'Omni', 'Vanguard', 'Hyper'];
    const suffixes = ['Media', 'HQ', 'Lab', 'Vault', 'Flow', 'Growth', 'Scale', 'Nexus', 'Matrix', 'Craft'];

    const names = [
      `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${niche}`,
      `${niche} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`,
      `The ${niche} Playbook`,
      `${prefixes[1]} & ${suffixes[0]}`,
      `${niche} Blueprint`,
      `ZeroTo${niche.replace(/\s+/g, '')}`,
      `Unfiltered ${niche}`,
      `${niche} Collective`,
      `Daily ${niche} Edge`,
      `${prefixes[3]}${suffixes[1]}`
    ];

    return res.json({
      success: true,
      data: {
        niche,
        style,
        names
      }
    });
  } catch (err) {
    console.error('generateBusinessNames error:', err);
    return res.status(500).json({ error: 'Failed to generate business names.' });
  }
}

function findInstagramUsernames(req, res) {
  try {
    const { keyword = 'stoic' } = req.query;
    const clean = String(keyword).toLowerCase().replace(/[^a-z0-9]/g, '');

    const patterns = [
      `${clean}.daily`,
      `the.${clean}`,
      `${clean}.mentality`,
      `${clean}.vault`,
      `pure.${clean}`,
      `${clean}.playbook`,
      `${clean}.hq`,
      `real.${clean}`,
      `${clean}.protocol`,
      `beyond.${clean}`
    ];

    const results = patterns.map(h => ({
      handle: `@${h}`,
      memorabilityScore: 92,
      isClean: true,
      recommendation: 'Short, authoritative dot-separated brand handle.'
    }));

    return res.json({
      success: true,
      data: {
        keyword: clean,
        suggestions: results
      }
    });
  } catch (err) {
    console.error('findInstagramUsernames error:', err);
    return res.status(500).json({ error: 'Failed to find usernames.' });
  }
}

module.exports = {
  listNiches,
  listViralPages,
  listTrendingAudio,
  analyzeContent,
  repurposeContent,
  listAssets,
  generateBusinessNames,
  findInstagramUsernames
};
