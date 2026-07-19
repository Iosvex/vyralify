/**
 * seedFirestore.js
 * Seeding script for Vyralify Firestore database: populates contentAssets & initial community posts.
 * Run via: node seedFirestore.js (requires GOOGLE_APPLICATION_CREDENTIALS or firebase-admin init)
 */

const admin = require('firebase-admin');

// Initialize Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const SEED_CONTENT_ASSETS = [
  // Foundation Category
  {
    id: 'fnd-1',
    category: 'foundation',
    title: 'Welcome To Vyralify & Platform Onboarding',
    type: 'video',
    tierRequired: 'active',
    order: 1,
    body: 'Learn how to navigate your Vyralify dashboard, access AI creator tools, set up your profile, and start your 30-day viral page challenge.',
    url: 'https://vyralify.io/lessons/welcome-onboarding'
  },
  {
    id: 'fnd-2',
    category: 'foundation',
    title: 'Choosing Your High-Demand Instagram Niche',
    type: 'lesson',
    tierRequired: 'active',
    order: 2,
    body: 'Comprehensive breakdown of top 7 profitable theme-page niches in 2026: Wealth & Business, Mindset & Stoicism, Luxury Lifestyle, Fitness & Health, AI & Tech, Quotes, and Motivation.',
    url: 'https://vyralify.io/lessons/niche-selection'
  },
  {
    id: 'fnd-3',
    category: 'foundation',
    title: 'Building & Branding Your First Theme Page',
    type: 'lesson',
    tierRequired: 'active',
    order: 3,
    body: 'Step-by-step branding guide: profile picture design using Canva/Midjourney, consistent color palette selection, and setting up an Instagram Business Account correctly.',
    url: 'https://vyralify.io/lessons/page-branding'
  },
  {
    id: 'fnd-4',
    category: 'foundation',
    title: 'Profile Bio & Username Optimisation Framework',
    type: 'template',
    tierRequired: 'active',
    order: 4,
    body: 'Plug-and-play bio templates that convert profile visitors into followers and buyers. Includes line-break formatting and CTA link placement.',
    url: 'https://vyralify.io/templates/bio-framework'
  },
  {
    id: 'fnd-5',
    category: 'foundation',
    title: 'Instagram Algorithm Rules & Guidelines 2026',
    type: 'checklist',
    tierRequired: 'active',
    order: 5,
    body: 'Essential algorithm parameters: Watch time retention (>70%), rewatch loops, shares-to-story ratio, SEO keywords in caption, and avoiding shadowbans.',
    url: 'https://vyralify.io/checklists/algorithm-rules'
  },

  // Content & Posting Category
  {
    id: 'cnt-1',
    category: 'content',
    title: 'Viral Content Strategies & Reel Hooks',
    type: 'lesson',
    tierRequired: 'active',
    order: 1,
    body: 'How to craft 3-second visual and textual hooks that prevent users from scrolling past your reels. Master the 5 hook archetypes.',
    url: 'https://vyralify.io/lessons/reel-hooks'
  },
  {
    id: 'cnt-2',
    category: 'content',
    title: 'High-Retention Video Editing Playbook',
    type: 'video',
    tierRequired: 'active',
    order: 2,
    body: 'CapCut and Premiere Pro video editing masterclass for faceless creators: text animations, sound effects, B-roll selection, and seamless transition loops.',
    url: 'https://vyralify.io/lessons/editing-playbook'
  },
  {
    id: 'cnt-3',
    category: 'content',
    title: 'AI Caption & Hashtag Generator Vault',
    type: 'template',
    tierRequired: 'active',
    order: 3,
    body: 'Curated library of 50+ viral caption templates and keyword-rich hashtag stacks for major niches.',
    url: 'https://vyralify.io/templates/caption-vault'
  },
  {
    id: 'cnt-4',
    category: 'content',
    title: 'Trending Audio Library & Weekly Updates',
    type: 'download',
    tierRequired: 'active',
    order: 4,
    body: 'Updated weekly list of trending Instagram audio tracks with fast-growing viral velocity scores.',
    url: 'https://vyralify.io/downloads/audio-library'
  },
  {
    id: 'cnt-5',
    category: 'content',
    title: 'High-Converting Call-To-Action (CTA) Library',
    type: 'checklist',
    tierRequired: 'active',
    order: 5,
    body: '25 high-performing CTA phrases for comments, story shares, saves, and bio link clicks.',
    url: 'https://vyralify.io/checklists/cta-library'
  },

  // Scaling & Growth Category
  {
    id: 'grw-1',
    category: 'growth',
    title: '0 to 100K Followers Organic Growth System',
    type: 'lesson',
    tierRequired: 'active',
    order: 1,
    body: 'The exact posting schedule, reel frequency, and engagement strategy used to take faceless pages from 0 to 100,000 organic followers in 90 days.',
    url: 'https://vyralify.io/lessons/100k-growth-system'
  },
  {
    id: 'grw-2',
    category: 'growth',
    title: 'Daily Reels Posting & Scheduling Calendar',
    type: 'template',
    tierRequired: 'active',
    order: 2,
    body: 'Interactive Notion and Google Sheets content calendar for planning, drafting, and scheduling reels 2 weeks in advance.',
    url: 'https://vyralify.io/templates/reels-calendar'
  },
  {
    id: 'grw-3',
    category: 'growth',
    title: 'Multi-Page Portfolio Scaling Strategy',
    type: 'lesson',
    tierRequired: 'active',
    order: 3,
    body: 'How to manage 3-5 Instagram theme pages simultaneously without burning out, using batching and automated AI workflows.',
    url: 'https://vyralify.io/lessons/multi-page-scaling'
  },
  {
    id: 'grw-4',
    category: 'growth',
    title: 'Analytics & Growth Metric Progress Tracker',
    type: 'download',
    tierRequired: 'active',
    order: 4,
    body: 'Track account reach, follower growth rate, top-performing reels, and conversion rate with custom spreadsheets.',
    url: 'https://vyralify.io/downloads/growth-tracker'
  },

  // Monetisation Category
  {
    id: 'mnt-1',
    category: 'monetisation',
    title: 'Digital Product Launch & Store Setup Guide',
    type: 'lesson',
    tierRequired: 'active',
    order: 1,
    body: 'Step-by-step guide to creating eBooks, templates, or courses and setting up a store link on Stan Store / Beacons / Systeme.io.',
    url: 'https://vyralify.io/lessons/digital-store-launch'
  },
  {
    id: 'mnt-2',
    category: 'monetisation',
    title: 'High-Ticket Sales Scripts & DM Funnels',
    type: 'template',
    tierRequired: 'active',
    order: 2,
    body: 'Proven direct message sales conversation scripts to turn interested commenters into paying customers.',
    url: 'https://vyralify.io/templates/dm-sales-scripts'
  },
  {
    id: 'mnt-3',
    category: 'monetisation',
    title: 'Vyralify 40% Affiliate System Setup',
    type: 'lesson',
    tierRequired: 'active',
    order: 3,
    body: 'How to use your custom Vyralify affiliate link, place it in your bio and stories, and earn ₹200 / $7.60 recurring monthly per active member.',
    url: 'https://vyralify.io/lessons/affiliate-setup'
  },
  {
    id: 'mnt-4',
    category: 'monetisation',
    title: 'Brand Sponsorships & Deal Negotiation Deck',
    type: 'download',
    tierRequired: 'active',
    order: 4,
    body: 'Media kit template and email pitch scripts for securing $300-$1,500 brand sponsorships for your theme page.',
    url: 'https://vyralify.io/downloads/sponsorship-deck'
  },

  // Community Category
  {
    id: 'cmn-1',
    category: 'community',
    title: 'Creator Introductions & Networking Channel',
    type: 'lesson',
    tierRequired: 'active',
    order: 1,
    body: 'Connect with fellow theme page creators, find collaboration partners, and share your Instagram handle.',
    url: 'https://vyralify.io/community/introductions'
  },
  {
    id: 'cmn-2',
    category: 'community',
    title: 'Daily Wins, Milestones & Accountability',
    type: 'checklist',
    tierRequired: 'active',
    order: 2,
    body: 'Share your follower milestones, first digital sales, and viral reel wins with the Vyralify community.',
    url: 'https://vyralify.io/community/wins'
  }
];

const SEED_COMMUNITY_POSTS = [
  {
    uid: 'system-seed-1',
    displayName: 'Aiden (Vyralify Team)',
    channel: 'general',
    body: 'Welcome everyone to the new Vyralify platform! Make sure to check out the setup roadmap in the Foundation tab and test out the new Groq-powered AI Creator Assistant.',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    uid: 'system-seed-2',
    displayName: 'Marcus (Creator)',
    channel: 'wins',
    body: 'Just hit 50k followers on my luxury theme page today! The hook library in the Content section was a game changer for retention.',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    uid: 'system-seed-3',
    displayName: 'Sarah (Affiliate Partner)',
    channel: 'networking',
    body: 'Made 8 affiliate sales this week using the bio link strategy taught in Monetisation Lesson 3. Happy to share tips with anyone getting started!',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seedDatabase() {
  console.log('Seeding Vyralify Firestore contentAssets...');
  for (const asset of SEED_CONTENT_ASSETS) {
    await db.doc(`contentAssets/${asset.id}`).set({
      ...asset,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    console.log(`Seeded asset: ${asset.id} (${asset.title})`);
  }

  console.log('Seeding initial community posts...');
  for (const post of SEED_COMMUNITY_POSTS) {
    await db.collection('communityPosts').add(post);
  }

  console.log('Successfully completed Firestore seeding!');
}

if (require.main === module) {
  seedDatabase().catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
}

module.exports = { seedDatabase, SEED_CONTENT_ASSETS, SEED_COMMUNITY_POSTS };
