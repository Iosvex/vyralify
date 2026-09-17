/**
 * seedFirestore.js
 * Comprehensive Seeding Script for the Vyralify 7-Module Platform & 10 Systems
 * Populates:
 * 1. Niche Intelligence & Opportunity Radar
 * 2. Viral Page Database (Benchmark accounts)
 * 3. Trending Audio Intelligence
 * 4. Active Vyralify Campaigns (Fixed, Clipping per-view, CPM)
 * 5. Business Templates Vault (Whop-style offers, contracts, DM scripts)
 * 6. Vyralify University Curriculum (5 complete tracks)
 * 7. Community Posts & Page Review Requests
 *
 * Run via: node seedFirestore.js
 */

const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// 1. NICHE INTELLIGENCE
const SEED_NICHES = [
  {
    id: 'niche-wealth-business',
    name: 'Wealth, Finance & Startup Breakdowns',
    category: 'Finance',
    profitabilityScore: 96,
    opportunityScore: 92,
    viralityIndex: 88,
    avgCpm: '₹140 - ₹280',
    topOffers: ['SaaS Tool Affiliates', 'Financial Notion Vaults', 'Trading Courses'],
    audienceDemographics: 'Male 22-38, High Purchasing Power',
    summary: 'Evergreen high-ticket niche. Strong demand for case studies, revenue leaks, and business frameworks.'
  },
  {
    id: 'niche-ai-tools',
    name: 'AI Productivity & Tech Automations',
    category: 'Technology',
    profitabilityScore: 94,
    opportunityScore: 97,
    viralityIndex: 95,
    avgCpm: '₹120 - ₹240',
    topOffers: ['AI Prompt Libraries', 'Software Affiliate Deals', 'Custom GPT Setup'],
    audienceDemographics: 'Global 18-35, Tech-savvy Creators & Solopreneurs',
    summary: 'Massive viral velocity on Reels. Viewers readily comment keywords to receive AI tool links in DMs.'
  },
  {
    id: 'niche-mindset-stoicism',
    name: 'Stoicism, Discipline & High-Performance',
    category: 'Lifestyle',
    profitabilityScore: 86,
    opportunityScore: 89,
    viralityIndex: 94,
    avgCpm: '₹80 - ₹160',
    topOffers: ['Habit Trackers', 'Discipline Ebooks', 'Private Discord Communities'],
    audienceDemographics: 'Male 18-30, Seeking Self-Improvement',
    summary: 'Exceptionally high retention rate on cinematic voiceover reels and quote carousels.'
  },
  {
    id: 'niche-luxury-lifestyle',
    name: 'Luxury Aesthetics, Travel & Supercars',
    category: 'Luxury',
    profitabilityScore: 89,
    opportunityScore: 84,
    viralityIndex: 97,
    avgCpm: '₹150 - ₹320',
    topOffers: ['High-Ticket Affiliates', 'Travel Guides', 'Brand Sponsorships'],
    audienceDemographics: 'Broad Global, Aspirational Youth',
    summary: 'Extreme visual hook potential. Easy to reach millions of views using trending slow-reverb audio.'
  },
  {
    id: 'niche-health-fitness',
    name: 'Home Workouts, Calisthenics & Nutrition',
    category: 'Fitness',
    profitabilityScore: 90,
    opportunityScore: 87,
    viralityIndex: 91,
    avgCpm: '₹90 - ₹190',
    topOffers: ['Workout PDF Guides', 'Supplement Affiliates', '1-on-1 Coaching Calls'],
    audienceDemographics: '18-40, Both Male & Female',
    summary: 'High repeat engagement and loyal follower conversion when offering structured routines.'
  }
];

// 2. VIRAL PAGE BENCHMARK DATABASE
const SEED_VIRAL_PAGES = [
  {
    id: 'page-apexmind',
    handle: 'apex.mentality',
    niche: 'Stoicism & Mindset',
    followers: 480000,
    avgViewsPerReel: 185000,
    coreHookFormula: 'Contrarian question with dark cinematic background clip',
    monetizationMethod: '₹499 Habit Tracker in Bio link + Automated DM script'
  },
  {
    id: 'page-businessinsider-clips',
    handle: 'founder.playbook',
    niche: 'Wealth & Business',
    followers: 620000,
    avgViewsPerReel: 340000,
    coreHookFormula: 'Revenue breakdown of recognizable brand in first 2 seconds',
    monetizationMethod: 'Software sponsorships & newsletter sponsorship slots'
  },
  {
    id: 'page-ai-supercharged',
    handle: 'future.tools.ai',
    niche: 'AI Productivity',
    followers: 310000,
    avgViewsPerReel: 220000,
    coreHookFormula: '"Stop using ChatGPT like an amateur—use this 1 prompt instead"',
    monetizationMethod: 'Digital prompt vault + SaaS affiliate referral links'
  }
];

// 3. TRENDING AUDIO INTELLIGENCE
const SEED_TRENDING_AUDIO = [
  {
    id: 'audio-phonk-drift',
    title: 'Neon Blade (Slowed + Reverb)',
    artist: 'MoonDeity',
    velocityScore: 9.8,
    reelsCount: '124K Reels',
    vibe: 'High Tension / Alpha Motivation',
    audioUrl: 'https://instagram.com/reels/audio/neonblade',
    recommendedNiches: ['Mindset & Stoicism', 'Luxury Lifestyle', 'Fitness']
  },
  {
    id: 'audio-interstellar-lofi',
    title: 'Cornfield Chase (Cinematic Ambient)',
    artist: 'Hans Zimmer / Ambient Remix',
    velocityScore: 9.4,
    reelsCount: '89K Reels',
    vibe: 'Thought-Provoking / Curiosity',
    audioUrl: 'https://instagram.com/reels/audio/cornfield',
    recommendedNiches: ['Wealth & Business', 'AI Productivity', 'Philosophy']
  },
  {
    id: 'audio-phonk-brazilian',
    title: 'Montagem Mysterious Game',
    artist: 'LXNGVX',
    velocityScore: 9.1,
    reelsCount: '210K Reels',
    vibe: 'Fast Pattern Interrupt / High Energy',
    audioUrl: 'https://instagram.com/reels/audio/montagem',
    recommendedNiches: ['Tech Automations', 'Gaming', 'Dropshipping']
  }
];

// 4. ACTIVE VYRALIFY CAMPAIGNS
const SEED_CAMPAIGNS = [
  {
    id: 'camp-ai-prompt-vault',
    title: 'Promptify AI — Creator Clipping Challenge',
    brandName: 'Promptify AI',
    payoutType: 'per_view', // per_view | fixed | cpm
    rewardPer1000Views: 120, // ₹120 per 1k views
    budget: 75000,
    totalPaidOut: 32000,
    currency: 'INR',
    niche: 'AI Productivity',
    status: 'active',
    requirements: 'Must show Promptify website in reel, include #Promptify in caption, minimum 5,000 views to qualify for payout.',
    guidelines: 'Use high-retention screen recording hooks. Emphasize how Promptify cuts writing time by 90%.'
  },
  {
    id: 'camp-fintech-invest',
    title: 'WealthFlow App Launch — Fixed Sponsorship Deal',
    brandName: 'WealthFlow',
    payoutType: 'fixed',
    fixedPayout: 4500, // ₹4,500 per approved reel
    budget: 90000,
    totalPaidOut: 40500,
    currency: 'INR',
    niche: 'Wealth & Business',
    status: 'active',
    requirements: 'Instagram page with > 15,000 followers and > 5% engagement rate. 1 dedicated reel integrating WealthFlow portfolio tracker.',
    guidelines: 'Focus on personal finance budgeting mistakes in your 20s.'
  },
  {
    id: 'camp-notion-productivity',
    title: 'NeuroTask OS — CPM Performance Pool',
    brandName: 'NeuroTask',
    payoutType: 'cpm',
    rewardPer1000Views: 95,
    budget: 50000,
    totalPaidOut: 18500,
    currency: 'INR',
    niche: 'Productivity',
    status: 'active',
    requirements: 'Open to all creators with > 1,000 followers. Place custom tracking link in bio.',
    guidelines: 'Show aesthetic Notion workspace tour with smooth ambient B-roll.'
  }
];

// 5. BUSINESS TEMPLATES VAULT
const SEED_BUSINESS_TEMPLATES = [
  {
    id: 'tpl-high-converting-dm',
    category: 'Sales Templates',
    title: 'The 3-Message Inbound DM Closing Script',
    description: 'Converts commenters into buyers without being pushy. Used across 50+ theme pages.',
    content: `Message 1 (Delivery): "Hey [Name]! Here is the direct link to the [Asset Name] you requested: {{link}}\n\nMessage 2 (Value Check): "Did you get a chance to check out the section on [Specific Step]?"\n\nMessage 3 (The Offer): "If you want the complete plug-and-play vault that builds this automatically, I have it discounted for followers here: {{store_link}}"`
  },
  {
    id: 'tpl-brand-sponsorship-pitch',
    category: 'Proposal Templates',
    title: 'Outbound Brand Sponsorship Pitch Email & Media Kit Deck',
    description: 'Secures $250 - $1,500 brand sponsorships for Instagram theme pages.',
    content: `Subject: Partnership with @{{handle}} ({{followers}} Active Creators)\n\nHi [Brand Team],\n\nI run @{{handle}}, reaching over {{monthly_views}} monthly viewers interested in [Niche].\n\nWe love [Brand Product] and noticed your recent push on [Feature]. We'd love to produce a high-retention reel featuring your product using our proven viral retention framework.\n\nHere is our media kit with demographics and past brand ROI: {{mediakit_link}}\n\nAre you open to a brief collaboration this month?`
  },
  {
    id: 'tpl-digital-offer-blueprint',
    category: 'Offer Templates',
    title: 'The ₹499/₹999 Micro-Offer Blueprint',
    description: 'Structure for high-converting digital products, prompt packs, and Notion vaults.',
    content: `1. Title: The [Topic] Fast-Track System\n2. The Irresistible Hook: Solve 1 painful problem in under 15 minutes\n3. Core Deliverable: 1 Cheatsheet / Notion Dashboard / Resource Database\n4. Fast Action Bonus: 25 Plug-and-Play Prompts or Checklists\n5. Price Point: ₹499 (India) / $19 (Global)`
  }
];

// 6. VYRALIFY UNIVERSITY CURRICULUM
const SEED_UNIVERSITY_MODULES = [
  {
    id: 'trk-basics',
    trackName: 'Basics',
    trackOrder: 1,
    icon: '📚',
    description: 'Foundation for complete beginners to establish an authoritative faceless page.',
    lessonsCount: 5,
    lessons: [
      { id: 'b-1', title: 'Welcome to Vyralify & Platform Navigation', duration: '5 min', tierRequired: 'active' },
      { id: 'b-2', title: 'High-Demand Niche Selection Framework', duration: '12 min', tierRequired: 'active' },
      { id: 'b-3', title: 'Building & Branding Your Faceless Identity', duration: '15 min', tierRequired: 'active' },
      { id: 'b-4', title: 'Optimizing An Existing Page for Conversions', duration: '10 min', tierRequired: 'active' },
      { id: 'b-5', title: 'Instagram Algorithm Rules & Guidelines 2026', duration: '8 min', tierRequired: 'active' }
    ]
  },
  {
    id: 'trk-content',
    trackName: 'Content',
    trackOrder: 2,
    icon: '🎬',
    description: 'High-retention video creation workflows, hook psychology, and pacing.',
    lessonsCount: 5,
    lessons: [
      { id: 'c-1', title: 'Finding Winning Outlier Content in Any Niche', duration: '10 min', tierRequired: 'active' },
      { id: 'c-2', title: 'Crafting High-Retention Visual Hooks (5 Archetypes)', duration: '14 min', tierRequired: 'active' },
      { id: 'c-3', title: 'Trending Audio Velocity & Algorithm Timing', duration: '7 min', tierRequired: 'active' },
      { id: 'c-4', title: 'The High-Converting CTA Library for Saves & Shares', duration: '9 min', tierRequired: 'active' },
      { id: 'c-5', title: 'Plug-and-Play Viral Template Packs', duration: '11 min', tierRequired: 'active' }
    ]
  },
  {
    id: 'trk-growth',
    trackName: 'Growth',
    trackOrder: 3,
    icon: '📈',
    description: 'Organic scaling strategies to take accounts from 0 to 100,000 followers.',
    lessonsCount: 5,
    lessons: [
      { id: 'g-1', title: 'The 2026 Algorithm Ranking System Explained', duration: '15 min', tierRequired: 'active' },
      { id: 'g-2', title: '2-Reels/Day Batch Creation & Scheduling System', duration: '12 min', tierRequired: 'active' },
      { id: 'g-3', title: 'Multi-Page Portfolio Scaling Strategy', duration: '18 min', tierRequired: 'active' },
      { id: 'g-4', title: 'Growth Tracking & Milestone Diagnostics', duration: '8 min', tierRequired: 'active' },
      { id: 'g-5', title: 'Case Studies: 0 to 500k Followers in 90 Days', duration: '20 min', tierRequired: 'active' }
    ]
  },
  {
    id: 'trk-monetisation',
    trackName: 'Monetisation',
    trackOrder: 4,
    icon: '💰',
    description: 'Monetization architecture: digital stores, automated DM funnels, and campaigns.',
    lessonsCount: 5,
    lessons: [
      { id: 'm-1', title: 'Digital Product & SaaS Offer Selection', duration: '14 min', tierRequired: 'active' },
      { id: 'm-2', title: 'Creator Store Setup & Payment Infrastructure', duration: '12 min', tierRequired: 'active' },
      { id: 'm-3', title: 'Sales Psychology & Conversion Optimization', duration: '16 min', tierRequired: 'active' },
      { id: 'm-4', title: 'Automated DM Funnels & Closing Scripts', duration: '15 min', tierRequired: 'active' },
      { id: 'm-5', title: 'Brand Sponsorships & Vyralify Campaigns', duration: '13 min', tierRequired: 'active' }
    ]
  },
  {
    id: 'trk-scaling',
    trackName: 'Scaling',
    trackOrder: 5,
    icon: '🚀',
    description: 'Systematizing operations, revenue predictability, and building digital media assets.',
    lessonsCount: 2,
    lessons: [
      { id: 's-1', title: 'Creator Business Plan Generator & Financial Modeling', duration: '18 min', tierRequired: 'active' },
      { id: 's-2', title: 'The 30/60/90-Day Execution Roadmap', duration: '22 min', tierRequired: 'active' }
    ]
  }
];

// 7. LAUNCH COMMUNITY POSTS & PAGE REVIEW REQUESTS
const SEED_COMMUNITY_POSTS = [
  {
    id: 'post-review-1',
    uid: 'creator-seed-1',
    displayName: 'Aarav (Faceless Creator)',
    channel: 'reviews',
    title: 'Page Review Request: Bio & First 3 Reels Check',
    instagramHandle: 'stoic.protocol',
    body: 'Hey creators! Just launched @stoic.protocol in the Stoicism/High-Performance niche. Can someone critique my bio CTA and hook pacing on the pinned reel?',
    tags: ['Page Review', 'Hook Feedback', 'Bio Audit'],
    likesCount: 14,
    commentsCount: 3
  },
  {
    id: 'post-intro-1',
    uid: 'creator-seed-2',
    displayName: 'Dev (AI Entrepreneur)',
    channel: 'introductions',
    title: 'Hello from Bangalore! Scaling 2 AI Theme Pages',
    instagramHandle: 'future.tools.ai',
    body: 'Joined Vyralify to systematize my product offers and tap into the per-view clipping campaigns. Excited to connect with fellow tech creators!',
    tags: ['Introduction', 'AI Tools'],
    likesCount: 22,
    commentsCount: 5
  },
  {
    id: 'post-win-1',
    uid: 'creator-seed-3',
    displayName: 'Priya (Digital Products)',
    channel: 'wins',
    title: '₹28,500 in my first 3 weeks using the ₹499 Micro-Offer Vault!',
    instagramHandle: 'wealthy.habits',
    body: 'Plugged the 3-message DM script into my bio funnel. 57 sales on autopilot without showing my face once. Thank you Vyralify community!',
    tags: ['Revenue Win', 'Digital Store'],
    likesCount: 48,
    commentsCount: 12
  },
  {
    id: 'post-networking-1',
    uid: 'creator-seed-4',
    displayName: 'Karan (Growth Specialist)',
    channel: 'networking',
    title: 'Looking for cross-promotion partners in Wealth & Mindset',
    instagramHandle: 'founder.playbook',
    body: 'Currently at 45k followers. Looking for creators between 20k-60k for weekly story shoutout exchanges and collaboration reels.',
    tags: ['Collab', 'Shoutouts'],
    likesCount: 19,
    commentsCount: 8
  }
];

async function seedDatabase() {
  console.log('--- Starting Vyralify Complete 7-Module Database Seeder ---');

  // 1. Seed Niches
  console.log('Seeding nicheIntelligence...');
  for (const item of SEED_NICHES) {
    await db.doc(`nicheIntelligence/${item.id}`).set(item, { merge: true });
  }

  // 2. Seed Viral Pages
  console.log('Seeding viralPageDatabase...');
  for (const item of SEED_VIRAL_PAGES) {
    await db.doc(`viralPageDatabase/${item.id}`).set(item, { merge: true });
  }

  // 3. Seed Trending Audio
  console.log('Seeding trendingAudio...');
  for (const item of SEED_TRENDING_AUDIO) {
    await db.doc(`trendingAudio/${item.id}`).set(item, { merge: true });
  }

  // 4. Seed Campaigns
  console.log('Seeding campaigns...');
  for (const item of SEED_CAMPAIGNS) {
    await db.doc(`campaigns/${item.id}`).set({
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  // 5. Seed Business Templates
  console.log('Seeding businessTemplates...');
  for (const item of SEED_BUSINESS_TEMPLATES) {
    await db.doc(`businessTemplates/${item.id}`).set(item, { merge: true });
  }

  // 6. Seed University Modules
  console.log('Seeding universityModules...');
  for (const item of SEED_UNIVERSITY_MODULES) {
    await db.doc(`universityModules/${item.id}`).set(item, { merge: true });
  }

  // 7. Seed Community Posts
  console.log('Seeding communityPosts...');
  for (const item of SEED_COMMUNITY_POSTS) {
    await db.doc(`communityPosts/${item.id}`).set({
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  }

  console.log('✅ Successfully populated Vyralify Firestore database across all systems!');
}

if (require.main === module) {
  seedDatabase().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}

module.exports = {
  seedDatabase,
  SEED_NICHES,
  SEED_VIRAL_PAGES,
  SEED_TRENDING_AUDIO,
  SEED_CAMPAIGNS,
  SEED_BUSINESS_TEMPLATES,
  SEED_UNIVERSITY_MODULES,
  SEED_COMMUNITY_POSTS
};
