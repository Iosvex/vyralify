/**
 * functions/aiPrompts.js
 * Vyralify AI Creator Intelligence Engine — System Prompts & Dynamic Context Builder
 * Designed for Groq LLM (llama-3.1-70b-versatile)
 */

const SYSTEM_BASE_INSTRUCTION = `
You are the Vyralify AI Creator Intelligence Assistant — an expert algorithm strategist, viral content architect, and digital product monetization strategist for Instagram creators and faceless theme page operators.

CORE MISSION:
Provide hyper-actionable, real-time, zero-fluff strategy and creative output for Instagram growth, viral content creation, and audience monetization.

RULES OF ENGAGEMENT:
1. NEVER give generic, canned, or robotic responses. Every response must be tailored specifically to the user's prompt, niche, and requested tool.
2. Output clean, visually structured Markdown with bold key phrases, line breaks, bullet points, and actionable steps.
3. Include real-time Instagram best practices (current 2026 algorithm preferences: retention rate, rewatch loops, saves/shares over likes, SEO keywords in captions).
4. No conversational filler like "Here is your response:" or "Sure! I can help with that." Begin directly with the requested strategy or content.
`;

const TOOL_PROMPTS = {
  caption: (prompt, niche) => `
TASK: Write 2 high-converting Instagram Reel captions for topic: "${prompt}" (Niche: ${niche || 'Theme Page'}).

STRUCTURE PER CAPTION:
- Line 1: Strong visual hook statement (Pattern interrupt).
- Body: 3-5 short, punchy paragraphs explaining the concept, giving real value, and creating an open loop.
- CTA: Clear directive (e.g. "Save this for later 📌" or "Comment 'GROWTH' for the free framework 👇").
- Hashtags: 3-5 hyper-relevant, non-spammy niche hashtags.
`,

  hook: (prompt, niche) => `
TASK: Generate 5 high-retention Instagram Reel hooks for topic: "${prompt}" (Niche: ${niche || 'General'}).

CATEGORIES TO COVER:
1. Pattern Interrupt (Shocking statement or myth-bust)
2. Curiosity Gap (Open loop starting with "The secret reason...")
3. Relatable Pain Point ("If you are struggling to...")
4. Contrarian Hook ("Stop doing [common habit], do this instead")
5. Quick Win ("How to [goal] in under [short time]")

For each hook, include:
- Visual Action (What to show on screen in the first 2 seconds)
- Text Overlay (Exact text to put on screen)
- Audio Hook (What to say or audio vibe)
`,

  trendFinder: (prompt, niche) => `
TASK: Provide real-time viral trend adaptation strategies for topic/niche: "${prompt}" (Niche: ${niche || 'Faceless Creator'}).

PROVIDE:
1. Top 3 Trending Content Formats currently working on Instagram Reels.
2. Suggested Audio Vibe & Pace (e.g., Cinematic Slow, Energetic Phonk, Lo-Fi Chill, High-Tension Beat).
3. 3 Step-by-Step Reel Concepts adapting this trend specifically to the user's topic.
4. Rewatch & Share Hack (How to force users to rewatch or share to stories).
`,

  nicheResearch: (prompt) => `
TASK: Conduct a deep Niche Viability & Monetization Audit for: "${prompt}".

PROVIDE:
- Niche Virality Score (/10) & Audience Demographics.
- Monetization Potential (/10) & Top 3 Digital Products to sell in this niche.
- Key Competitor Angle & Gap Analysis (What existing pages are missing).
- Recommended Brand Aesthetics & Color Palette.
- 5 Content Pillar Ideas for long-term posting.
`,

  bioGenerator: (prompt) => `
TASK: Generate 3 high-converting Instagram Profile Bios for: "${prompt}".

REQUIREMENTS PER BIO:
- Line 1: Authority Statement / Core Promise (Who you help & what you deliver).
- Line 2: Social Proof or Key Differentiator (e.g., "Helping 10k+ creators scale").
- Line 3: Value Add / Freebie teaser.
- Line 4: Call-To-Action pointing to the bio link (with emoji arrow 👇).
`,

  contentPlanner: (prompt) => `
TASK: Create a 7-Day Viral Instagram Reels Content Calendar for: "${prompt}".

FOR EACH DAY (Day 1 - Day 7):
- Content Pillar & Reel Title
- Visual Concept (What is shown)
- Hook Text Overlay (First 3s)
- Primary Metric Focus (Saves, Shares, Comments, or Bio Link Clicks)
- Suggested Audio Type
`,

  offerGenerator: (prompt) => `
TASK: Architect a High-Converting Digital Product Offer for: "${prompt}".

STRUCTURE:
1. Product Title & Tagline
2. Core Transformation Promise (What result the buyer achieves)
3. 3 Key Modules / Pillars included
4. Recommended Price Point ($19 - $97 or ₹499 - ₹2,499)
5. 2 Irresistible Fast-Action Bonuses
6. 1-Sentence High-Impact Elevator Pitch
`,

  script: (prompt) => `
TASK: Write a full 15-30 second viral Reel Script for: "${prompt}".

FORMAT IN TABLE / TIMELINE:
- 00:00 - 00:03 (The Hook): On-Screen Text, Visual Frame, Audio Voiceover.
- 00:03 - 00:12 (The Value): Story/Breakdown, Visual Transitions, Key Highlights.
- 00:12 - 00:15 (The CTA): Screen Directive & Engagement Trigger.
`,

  growthInsight: (prompt) => `
TASK: Provide an Instagram Page Audit & Growth Optimization Plan for: "${prompt}".

PROVIDE:
1. Reach & Impression Diagnostic (Why views stall at 200-500).
2. Retention Rate Fixes (How to get >70% watch time).
3. SEO & Hashtag Optimization Rules.
4. Daily Engagement Protocol for rapid growth.
`
};

/**
 * Builds the complete system and user prompt for Groq API call.
 */
function buildAiPrompt(tool, prompt, userContext = {}) {
  const niche = userContext.niche || 'Instagram Theme Page';
  const generator = TOOL_PROMPTS[tool] || TOOL_PROMPTS.caption;
  
  const systemPrompt = `${SYSTEM_BASE_INSTRUCTION}\nCurrent System Time: ${new Date().toISOString()}\nTarget Niche: ${niche}`;
  const userPrompt = generator(prompt, niche);

  return { systemPrompt, userPrompt };
}

module.exports = {
  SYSTEM_BASE_INSTRUCTION,
  TOOL_PROMPTS,
  buildAiPrompt
};
