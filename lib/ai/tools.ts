export type AiToolId =
  | "caption"
  | "hook"
  | "ideas"
  | "planner"
  | "growth";

export interface AiToolConfig {
  id: AiToolId;
  name: string;
  emoji: string;
  description: string;
  placeholder: string;
  fields: AiToolField[];
}

export interface AiToolField {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export const AI_TOOLS: AiToolConfig[] = [
  {
    id: "caption",
    name: "AI Caption Generator",
    emoji: "✨",
    description: "Generate viral captions for your reels and posts.",
    placeholder: "Describe your reel topic...",
    fields: [
      { name: "topic", label: "Reel Topic", type: "text", placeholder: "e.g. 3 morning habits that changed my life", required: true },
      { name: "niche", label: "Niche", type: "select", options: ["Finance", "Motivation", "Luxury", "Health", "Travel", "AI/Tech", "Business"], required: true },
      { name: "tone", label: "Tone", type: "select", options: ["Bold", "Educational", "Provocative", "Inspirational", "Casual"], required: true },
    ],
  },
  {
    id: "hook",
    name: "AI Hook Generator",
    emoji: "🔥",
    description: "Create scroll-stopping opening hooks with high retention.",
    placeholder: "What is your reel about?",
    fields: [
      { name: "topic", label: "Topic", type: "text", placeholder: "e.g. faceless Instagram income", required: true },
      { name: "style", label: "Hook Style", type: "select", options: ["Provocative", "Negative", "Question", "Story", "Statistic"], required: true },
      { name: "niche", label: "Niche", type: "select", options: ["Finance", "Motivation", "Luxury", "Health", "Travel", "AI/Tech", "Business"], required: true },
    ],
  },
  {
    id: "ideas",
    name: "AI Content Ideas",
    emoji: "🧠",
    description: "Get a batch of niche-specific reel ideas with angles and CTAs.",
    placeholder: "Your niche or page theme...",
    fields: [
      { name: "niche", label: "Niche", type: "text", placeholder: "e.g. stoicism and productivity", required: true },
      { name: "count", label: "Number of Ideas", type: "select", options: ["5", "10", "15"], required: true },
      { name: "goal", label: "Primary Goal", type: "select", options: ["Grow followers", "Drive sales", "Build authority", "Go viral"], required: true },
    ],
  },
  {
    id: "planner",
    name: "AI Content Planner",
    emoji: "📅",
    description: "Build a structured posting calendar for maximum reach.",
    placeholder: "Tell us about your page...",
    fields: [
      { name: "niche", label: "Niche", type: "text", placeholder: "e.g. luxury travel aesthetic", required: true },
      { name: "frequency", label: "Posts Per Week", type: "select", options: ["3", "5", "7", "14"], required: true },
      { name: "duration", label: "Plan Duration", type: "select", options: ["7 days", "14 days", "30 days"], required: true },
    ],
  },
  {
    id: "growth",
    name: "AI Growth Assistant",
    emoji: "📊",
    description: "Personalised growth audit and scaling recommendations.",
    placeholder: "Share your current metrics...",
    fields: [
      { name: "handle", label: "Instagram Handle", type: "text", placeholder: "@yourpage", required: true },
      { name: "followers", label: "Current Followers", type: "text", placeholder: "e.g. 2500", required: true },
      { name: "challenge", label: "Biggest Challenge", type: "textarea", placeholder: "What's holding your growth back?", required: true },
    ],
  },
];

export function getToolById(id: AiToolId): AiToolConfig | undefined {
  return AI_TOOLS.find((t) => t.id === id);
}

export function buildPrompt(toolId: AiToolId, inputs: Record<string, string>): string {
  switch (toolId) {
    case "caption":
      return `You are an expert Instagram caption writer for faceless pages. Write 3 caption variations for a reel about "${inputs.topic}" in the ${inputs.niche} niche with a ${inputs.tone} tone. Include emojis, a strong CTA, and relevant hashtags. Format with clear labels.`;
    case "hook":
      return `You are a viral hook specialist. Generate 5 opening hooks for a reel about "${inputs.topic}" in the ${inputs.niche} niche using ${inputs.style} style hooks. Each hook should be under 15 words and designed for maximum watch retention. Number each hook.`;
    case "ideas":
      return `You are an Instagram content strategist. Generate ${inputs.count} unique reel content ideas for the ${inputs.niche} niche with the goal to ${inputs.goal}. For each idea include: Title, Hook angle, Content format, and CTA. Number each idea.`;
    case "planner":
      return `You are an Instagram growth planner. Create a ${inputs.duration} content calendar for a ${inputs.niche} faceless page posting ${inputs.frequency} times per week. For each post include: Day, Content type, Hook idea, Posting tip. Use a clear table or day-by-day format.`;
    case "growth":
      return `You are an Instagram growth consultant. Audit @${inputs.handle.replace("@", "")} with ${inputs.followers} followers. Their challenge: "${inputs.challenge}". Provide: 1) Quick diagnosis 2) Top 3 fixes 3) 7-day action plan 4) Content recommendations. Be specific and actionable.`;
    default:
      return inputs.topic || "Generate Instagram content";
  }
}

export function generateFallbackResponse(toolId: AiToolId, inputs: Record<string, string>): string {
  const niche = inputs.niche || inputs.topic || "your niche";
  switch (toolId) {
    case "caption":
      return `**Caption 1 (Bold)**\nStop scrolling. These 3 ${niche} secrets changed everything for me 👇\n\nSave this reel. Share with someone who needs it.\n\n#${niche.replace(/\s/g, "")} #faceless #viral\n\n**Caption 2 (Educational)**\nMost creators in ${niche} make this mistake on day one...\n\nHere's the fix (takes 5 minutes):\n→ Step 1: Niche your bio\n→ Step 2: Post daily for 7 days\n→ Step 3: Use a proven hook\n\nComment "GUIDE" for the full breakdown.\n\n**Caption 3 (Provocative)**\nI made $0 for 6 months in ${niche}. Then I changed ONE thing.\n\nThis reel shows exactly what it was.\n\nFollow for the full system.`;
    case "hook":
      return `**Hook 1:** Nobody talks about this ${niche} trick...\n**Hook 2:** Stop posting reels until you do these 3 things\n**Hook 3:** Why does Instagram hide this from ${niche} creators?\n**Hook 4:** I tested 50 hooks — only this one went viral\n**Hook 5:** Do NOT start a ${niche} page before watching this`;
    case "ideas":
      return `**Idea 1:** "3 mistakes killing your ${niche} growth" — Listicle reel with text slides\n**Idea 2:** "Day in the life of a faceless ${niche} creator" — B-roll + voiceover\n**Idea 3:** "Controversial ${niche} opinion" — Bold statement hook\n**Idea 4:** "Free resource drop" — Lead magnet CTA in comments\n**Idea 5:** "Before vs After" — Transformation case study format`;
    case "planner":
      return `**Day 1:** Controversy hook reel — Post at 7 PM\n**Day 2:** Educational carousel — 3 tips format\n**Day 3:** Trending audio reel — Sync to viral sound\n**Day 4:** Mistake hook — "Stop doing this in ${niche}"\n**Day 5:** Resource share — Free template offer\n**Day 6:** Mini case study — Show results\n**Day 7:** Deep save reel — "Save this for later"`;
    case "growth":
      return `**Diagnosis:** Your page @${(inputs.handle || "").replace("@", "")} needs stronger hook consistency and a clearer bio CTA.\n\n**Top 3 Fixes:**\n1. Post shorter reels (under 8 seconds) for higher retention\n2. Use one hook style for 7 days to train the algorithm\n3. Add a lead magnet link in bio\n\n**7-Day Action Plan:**\nDay 1-2: Audit top 5 competitors\nDay 3-4: Batch 7 reels with AI hooks\nDay 5-6: Engage 30 min/day in niche\nDay 7: Review analytics, double down on best performer`;
    default:
      return "AI generation will be available once API keys are configured.";
  }
}
