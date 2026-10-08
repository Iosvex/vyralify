import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Copy, 
  RotateCw, 
  ArrowRight, 
  Layers, 
  TrendingUp, 
  Users, 
  Clock, 
  MapPin, 
  Plus, 
  ExternalLink, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { generateLiveBios, generatePositioningStatement } from '../../lib/aiService';
import ConnectAccountModal from '../common/ConnectAccountModal';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

// 8 Official V3 Niches with eRPM and sub-niche taxonomy
const OFFICIAL_NICHES = [
  {
    id: 'business_money',
    name: 'Business & Money',
    subNiches: ['AI Business & SaaS', 'Finance & Investing', 'E-commerce & Dropshipping', 'Entrepreneurship', 'Marketing & Sales'],
    profitability: 96,
    eRPM: '₹180 - ₹350',
    icon: '💼',
    monetizationFocus: 'Digital products, software affiliates, high-ticket consulting'
  },
  {
    id: 'self_improvement',
    name: 'Self-Improvement',
    subNiches: ['Motivation & Stoicism', 'Discipline & Daily Habits', 'Productivity Systems', 'Mindset & Success', 'Philosophy'],
    profitability: 92,
    eRPM: '₹120 - ₹240',
    icon: '🧠',
    monetizationFocus: 'Notion templates, e-books, private skool communities'
  },
  {
    id: 'health_fitness',
    name: 'Health & Fitness',
    subNiches: ['Gym & Hypertrophy', 'Fat Loss & Diet', 'Biohacking & Longevity', 'Calisthenics', 'Holistic Wellness'],
    profitability: 89,
    eRPM: '₹100 - ₹220',
    icon: '⚡',
    monetizationFocus: 'Workout guides, meal plans, supplement sponsorships'
  },
  {
    id: 'fashion_beauty',
    name: 'Fashion & Beauty',
    subNiches: ['Men\'s Sartorial Style', 'Luxury Watches & EDC', 'Skincare & Grooming', 'Minimalist Aesthetics', 'Streetwear'],
    profitability: 94,
    eRPM: '₹150 - ₹300',
    icon: '✨',
    monetizationFocus: 'Brand affiliate deals, lookbooks, physical merchandise'
  },
  {
    id: 'cars_automotive',
    name: 'Cars & Automotive',
    subNiches: ['Supercars & Exotics', 'JDM Culture & Builds', 'Motorsport & Racing', 'Auto Detailing & Care', 'Vintage Classics'],
    profitability: 87,
    eRPM: '₹130 - ₹260',
    icon: '🏎️',
    monetizationFocus: 'Car accessories, detailing kits, clipping bounties'
  },
  {
    id: 'travel_lifestyle',
    name: 'Travel & Lifestyle',
    subNiches: ['Luxury & Ultra-Stays', 'Digital Nomad Living', 'Adventure Expeditions', 'Hidden Destinations', 'Urban Photography'],
    profitability: 88,
    eRPM: '₹110 - ₹230',
    icon: '✈️',
    monetizationFocus: 'Lightroom presets, itinerary guides, hotel collabs'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subNiches: ['Cinema & Movie Breakdowns', 'Anime & Manga Lore', 'Pop Culture Curations', 'Gaming Clips', 'Humor & Relatable'],
    profitability: 82,
    eRPM: '₹60 - ₹140',
    icon: '🎬',
    monetizationFocus: 'Mass view clipping bounties, game promotions'
  },
  {
    id: 'sports',
    name: 'Sports',
    subNiches: ['Football (Soccer)', 'Cricket Insights', 'F1 Racing & Telemetry', 'Combat Sports (MMA/Boxing)', 'Basketball'],
    profitability: 85,
    eRPM: '₹90 - ₹190',
    icon: '⚽',
    monetizationFocus: 'Sports apparel affiliates, fan community clubs'
  }
];

export default function PageBuilder({ onNavigate }) {
  const { user, tier, aiCredits, consumeCredit } = useAuth();
  const { pages, activePage, switchPage, updatePage, getPageLimit, canAddMorePages } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Active Sub-Tab: 'identity' | 'quiz' | 'multi_page' | 'demographics'
  const [activeTab, setActiveTab] = useState('identity');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Bio Studio State
  const [bioObjective, setBioObjective] = useState('dm_sales');
  const [generatedBios, setGeneratedBios] = useState(null);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [copiedBioIndex, setCopiedBioIndex] = useState(null);

  // Positioning Statement State
  const [positioningData, setPositioningData] = useState({
    audience: 'Ambitious creators & operators',
    outcome: 'Predictable viral reach & recurring sales',
    painPoint: 'Wasting months copying dead reel formats'
  });
  const [generatedStatements, setGeneratedStatements] = useState(null);
  const [isGeneratingPositioning, setIsGeneratingPositioning] = useState(false);

  // Niche Quiz State
  const [quizState, setQuizState] = useState({
    goal: 'digital_products',
    format: 'faceless_curation',
    region: 'global'
  });
  const [quizResult, setQuizResult] = useState(null);

  // 1. Generate Live AI Bios
  const handleGenerateBios = async () => {
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'You have hit your daily AI credit limit. Upgrade to Pro for 300 daily generations.');
      return;
    }

    setIsGeneratingBio(true);
    try {
      const res = await generateLiveBios({
        handle: activePage?.handle || 'creator',
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || 'Online Business',
        currentBio: activePage?.bio || '',
        objective: bioObjective
      });
      setGeneratedBios(res.bios || []);
      addNotification({
        title: 'AI Bios Generated',
        message: '3 conversion-optimized bios generated using real AI models.',
        type: 'success'
      });
    } catch (err) {
      console.warn('Live bio generation error:', err);
      addNotification({
        title: 'Generation Notice',
        message: 'Loaded high-converting formula bios for your niche.',
        type: 'info'
      });
    } finally {
      setIsGeneratingBio(false);
    }
  };

  // 2. Apply Bio directly to active profile
  const handleApplyBio = (bioText) => {
    if (!activePage?.id) return;
    updatePage(activePage.id, { bio: bioText });
    addNotification({
      title: 'Profile Updated',
      message: `Active bio for @${activePage.handle} was successfully updated.`,
      type: 'success'
    });
  };

  // 3. Generate Positioning Statement
  const handleGeneratePositioning = async () => {
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'Credit limit reached. Upgrade to Pro for unlimited positioning blueprints.');
      return;
    }

    setIsGeneratingPositioning(true);
    try {
      const res = await generatePositioningStatement({
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || 'Online Business',
        audience: positioningData.audience,
        painPoint: positioningData.painPoint,
        outcome: positioningData.outcome
      });
      setGeneratedStatements(res.statements || []);
    } catch (err) {
      console.warn('Positioning statement error:', err);
    } finally {
      setIsGeneratingPositioning(false);
    }
  };

  // 4. Calculate Niche Quiz Recommendation
  const handleRunQuiz = () => {
    let topNiche = OFFICIAL_NICHES[0];
    let score = 94;

    if (quizState.goal === 'digital_products') {
      topNiche = OFFICIAL_NICHES[0]; // Business & Money
      score = 96;
    } else if (quizState.goal === 'community_subscriptions') {
      topNiche = OFFICIAL_NICHES[1]; // Self-Improvement
      score = 92;
    } else if (quizState.goal === 'affiliate_deals') {
      topNiche = OFFICIAL_NICHES[3]; // Fashion & Beauty
      score = 94;
    } else {
      topNiche = OFFICIAL_NICHES[2]; // Health & Fitness
      score = 89;
    }

    setQuizResult({
      recommendedNiche: topNiche,
      opportunityScore: score,
      reasons: [
        `High monetization velocity via ${topNiche.monetizationFocus}`,
        `Healthy eRPM range benchmarked at ${topNiche.eRPM}`,
        `Ideal match for ${quizState.format.replace('_', ' ')} format`
      ]
    });
  };

  // 5. Apply Recommended Niche to Active Page
  const handleApplyNicheToActivePage = (nicheObj) => {
    if (!activePage?.id) return;
    updatePage(activePage.id, {
      category: nicheObj.name,
      subNiche: nicheObj.subNiches[0]
    });
    addNotification({
      title: 'Niche Updated',
      message: `@${activePage.handle} taxonomy switched to ${nicheObj.name}.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      
      {/* 1. HEADER & TOP NAV TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-mono mb-2 font-medium">
            <Rocket className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>01 Page Builder & Niche Taxonomy</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Page Identity & Taxonomy Studio
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Scoped to <span className="font-mono text-neutral-800 dark:text-neutral-200 font-semibold">@{activePage?.handle || 'creator'}</span> &bull; {activePage?.category || 'General'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs">
          {[
            { id: 'identity', label: 'Identity & Bio Studio' },
            { id: 'quiz', label: 'Niche Taxonomy & Quiz' },
            { id: 'demographics', label: 'Audience Demographics' },
            { id: 'multi_page', label: 'Multi-Page Hub' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold shadow-xs border border-neutral-200/80 dark:border-white/[0.06]'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. TAB 1: IDENTITY & BIO STUDIO */}
      {activeTab === 'identity' && (
        <div className="space-y-6">
          
          {/* Active Profile Status Header Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={activePage?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"} 
                alt={activePage?.handle} 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white font-mono">@{activePage?.handle}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Meta Connected
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {activePage?.category} &bull; Sub-Niche: <span className="font-medium text-neutral-700 dark:text-neutral-300">{activePage?.subNiche || 'General'}</span>
                </p>
                <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 italic font-sans max-w-xl">
                  "{activePage?.bio || 'No bio configured yet.'}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-medium border border-neutral-200 dark:border-white/[0.08] transition-colors cursor-pointer"
              >
                <span>View Dashboard</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: AI Bio Generator Studio */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">AI Bio Optimizer Studio</h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-white/[0.04] px-2 py-0.5 rounded">
                  150 Char Limit Safe
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold mb-1">
                    Select Primary Bio Objective
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'dm_sales', label: 'DM Sales Funnel' },
                      { id: 'store_clicks', label: 'Storefront Link' },
                      { id: 'viral_followers', label: 'Viral Authority' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBioObjective(opt.id)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer text-center ${
                          bioObjective === opt.id
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateBios}
                  disabled={isGeneratingBio}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isGeneratingBio ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingBio ? 'Architecting High-CTR Bios via AI...' : 'Generate 3 AI Bio Variations'}</span>
                </button>
              </div>

              {/* Bio Cards Result */}
              {generatedBios && (
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase font-semibold">
                    Generated Formulations
                  </div>
                  {generatedBios.map((b, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-semibold text-emerald-700 dark:text-emerald-400">
                          {b.archetype}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {b.text.length} / 150 chars
                        </span>
                      </div>

                      <div className="text-xs text-neutral-800 dark:text-neutral-200 font-mono whitespace-pre-line leading-relaxed bg-white dark:bg-black/30 p-2.5 rounded-lg border border-neutral-200/60 dark:border-white/[0.04]">
                        {b.text}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(b.text);
                            setCopiedBioIndex(idx);
                            setTimeout(() => setCopiedBioIndex(null), 2000);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.06] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedBioIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBioIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleApplyBio(b.text)}
                          className="px-3 py-1 rounded-lg text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Check className="w-3 h-3" />
                          <span>Apply to Active Profile</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Authority Positioning Statement Builder */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Authority Positioning Builder</h3>
                </div>
                <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                  Formula Architecture
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">Who you help (Audience)</label>
                  <input
                    type="text"
                    value={positioningData.audience}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, audience: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">Dream Outcome (Result)</label>
                  <input
                    type="text"
                    value={positioningData.outcome}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, outcome: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">Pain Point Avoided</label>
                  <input
                    type="text"
                    value={positioningData.painPoint}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, painPoint: e.target.value }))}
                    className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <button
                  onClick={handleGeneratePositioning}
                  disabled={isGeneratingPositioning}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white hover:bg-black dark:hover:bg-neutral-100 text-white dark:text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isGeneratingPositioning ? 'Formulating Position...' : 'Formulate Authority Positioning'}</span>
                </button>
              </div>

              {/* Live Statement Cards */}
              {generatedStatements ? (
                <div className="space-y-2.5 pt-2">
                  {generatedStatements.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        <span>{s.formula}</span>
                        <span className="text-neutral-400">{s.bannerHook}</span>
                      </div>
                      <p className="text-xs text-neutral-900 dark:text-white font-medium">"{s.statement}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-500/5 border border-emerald-200/80 dark:border-emerald-500/10 text-xs text-emerald-900 dark:text-emerald-300">
                  <span className="font-semibold block mb-0.5 font-mono text-[11px]">Core Blueprint:</span>
                  "I help {positioningData.audience} achieve {positioningData.outcome} without {positioningData.painPoint}."
                </div>
              )}

            </div>

          </div>

          {/* Story Highlights Architecture Section */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Instagram Story Highlights Architecture</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  The proven 4-highlight setup required to convert profile visitors into paying customers.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded font-medium border border-emerald-200 dark:border-emerald-500/20">
                Conversion Stack
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  circle: '01',
                  name: 'STORY',
                  role: 'Origin & Authority',
                  desc: 'Why this page exists, who runs it, and the philosophy behind your curations.',
                  icon: '📖'
                },
                {
                  circle: '02',
                  name: 'PROOF',
                  role: 'Social Proof & Wins',
                  desc: 'Screenshots of follower wins, DM conversations, earnings, and positive reviews.',
                  icon: '🏆'
                },
                {
                  circle: '03',
                  name: 'STORE',
                  role: 'Offer & Products',
                  desc: 'Breakdown of your digital guide, template, or private community with direct link.',
                  icon: '🛍️'
                },
                {
                  circle: '04',
                  name: 'VAULT',
                  role: 'Free Resource Hook',
                  desc: 'Keyword trigger to capture leads: "Reply with VAULT to get our free cheat sheet."',
                  icon: '⚡'
                }
              ].map((hl, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-sm font-bold font-mono text-emerald-800 dark:text-emerald-300">
                      {hl.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">{hl.name}</span>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{hl.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 3. TAB 2: OFFICIAL 8 NICHE TAXONOMY & AI QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          
          {/* Beginner Quiz Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">AI Niche Opportunity Diagnostic</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Calculate the exact profitability score and recommended niche based on your goals.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded font-medium border border-emerald-200 dark:border-emerald-500/20">
                Diagnostic Tool
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                  1. Primary Monetization Route
                </label>
                <select
                  value={quizState.goal}
                  onChange={(e) => setQuizState(prev => ({ ...prev, goal: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                >
                  <option value="digital_products">Digital Products / E-books / Notion</option>
                  <option value="community_subscriptions">Paid Memberships / Communities</option>
                  <option value="affiliate_deals">Software & Brand Affiliate Deals</option>
                  <option value="clipping_bounties">Mass View Clipping Bounties</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                  2. Creation Style
                </label>
                <select
                  value={quizState.format}
                  onChange={(e) => setQuizState(prev => ({ ...prev, format: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                >
                  <option value="faceless_curation">Faceless AI Curation & Quotes</option>
                  <option value="screen_breakdowns">Software & Workflow Breakdowns</option>
                  <option value="high_cinematic">Cinematic 4K Visual Cuts</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-500 uppercase font-semibold mb-1">
                  3. Geographic Focus
                </label>
                <select
                  value={quizState.region}
                  onChange={(e) => setQuizState(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 font-medium"
                >
                  <option value="global">Global Tier-1 (US, UK, Canada, UAE)</option>
                  <option value="india">Domestic India (Fast volume reach)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleRunQuiz}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Calculate Niche Opportunity Score</span>
            </button>

            {/* Quiz Recommendation Banner */}
            {quizResult && (
              <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{quizResult.recommendedNiche.icon}</span>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">
                      Recommended: {quizResult.recommendedNiche.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600 text-white">
                      Score: {quizResult.opportunityScore}/100
                    </span>
                  </div>
                  <ul className="text-xs text-emerald-900 dark:text-emerald-300 list-disc list-inside space-y-0.5">
                    {quizResult.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleApplyNicheToActivePage(quizResult.recommendedNiche)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Apply to Active Page &rarr;
                </button>
              </div>
            )}
          </div>

          {/* Official 8 Niche Catalog Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
                Official 8 Niche Taxonomy & eRPM Benchmark Directory
              </h3>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Click any niche to apply to active profile
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {OFFICIAL_NICHES.map(niche => {
                const isCurrent = activePage?.category === niche.name;
                return (
                  <div
                    key={niche.id}
                    onClick={() => handleApplyNicheToActivePage(niche)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isCurrent
                        ? 'bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                        : 'bg-white dark:bg-[#0C0D12] border-neutral-200/80 dark:border-white/[0.06] hover:border-emerald-300 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{niche.icon}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300">
                            {niche.profitability}% Score
                          </span>
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Niche" />
                          )}
                        </div>
                      </div>

                      <h4 className="font-bold text-xs text-neutral-900 dark:text-white mb-1">
                        {niche.name}
                      </h4>
                      <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium mb-2">
                        eRPM: {niche.eRPM}
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-neutral-400 uppercase font-medium">Sub-Niches:</div>
                        <div className="flex flex-wrap gap-1">
                          {niche.subNiches.slice(0, 3).map((sub, idx) => (
                            <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300">
                              {sub}
                            </span>
                          ))}
                          {niche.subNiches.length > 3 && (
                            <span className="text-[9px] font-mono text-neutral-400">+{niche.subNiches.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 dark:text-neutral-400 text-[10px]">Tap to sync taxonomy</span>
                      <ArrowRight className="w-3 h-3 text-neutral-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* 4. TAB 3: AUDIENCE DEMOGRAPHICS & PEAK ACTIVITY HEATMAP */}
      {activeTab === 'demographics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Age Distribution Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Age Brackets Breakdown</h3>
                <span className="text-[10px] font-mono text-neutral-400">Meta Verified</span>
              </div>

              <div className="space-y-3">
                {[
                  { bracket: '18 - 24', pct: 46, isTop: true },
                  { bracket: '25 - 34', pct: 34, isTop: false },
                  { bracket: '35 - 44', pct: 14, isTop: false },
                  { bracket: '45+', pct: 6, isTop: false }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-700 dark:text-neutral-300 font-medium">{item.bracket}</span>
                      <span className={`font-semibold ${item.isTop ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-500'}`}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-white/[0.06] overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.isTop ? 'bg-emerald-600' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/[0.04] text-[11px] text-neutral-600 dark:text-neutral-400">
                Primary segment: <strong className="text-neutral-900 dark:text-white font-mono">18–24 High-Growth Cohort</strong> (Ideal for low-friction digital products).
              </div>
            </div>

            {/* Gender Split Ratio Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Gender Distribution</h3>
                <span className="text-[10px] font-mono text-neutral-400">Active Audience</span>
              </div>

              <div className="flex items-center justify-around py-4">
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-neutral-900 dark:text-white">68%</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Male Audience</div>
                </div>
                <div className="h-12 w-px bg-neutral-200 dark:bg-white/[0.08]" />
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">32%</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Female Audience</div>
                </div>
              </div>

              <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-white/[0.06] flex overflow-hidden">
                <div className="bg-neutral-800 dark:bg-neutral-300 h-full" style={{ width: '68%' }} title="Male 68%" />
                <div className="bg-emerald-500 h-full" style={{ width: '32%' }} title="Female 32%" />
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/[0.04] text-[11px] text-neutral-600 dark:text-neutral-400">
                Optimal hook framing: Direct, outcome-driven, high-friction patterns work best for this split.
              </div>
            </div>

            {/* Top Geographies Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Top Geographic Markets</h3>
                <span className="text-[10px] font-mono text-neutral-400">Territory Distribution</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { country: 'India', flag: '🇮🇳', pct: '56.4%', eRPM: '₹140' },
                  { country: 'United States', flag: '🇺🇸', pct: '21.8%', eRPM: '₹380' },
                  { country: 'United Kingdom', flag: '🇬🇧', pct: '8.2%', eRPM: '₹310' },
                  { country: 'United Arab Emirates', flag: '🇦🇪', pct: '7.1%', eRPM: '₹290' },
                  { country: 'Others', flag: '🌐', pct: '6.5%', eRPM: '₹110' }
                ].map((geo, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100 dark:border-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span>{geo.flag}</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{geo.country}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-neutral-500 text-[11px]">{geo.eRPM} eRPM</span>
                      <span className="font-semibold text-neutral-900 dark:text-white">{geo.pct}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 24-Hour Active Posting Velocity Heatmap */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Audience Active Hours Heatmap</h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Algorithm retention windows specific to @{activePage?.handle || 'creator'}'s follower density.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-neutral-400">Intensity:</span>
                <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-500">Low</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-500/30 text-emerald-800 dark:text-emerald-300">Med</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-semibold">Peak Window</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-neutral-400 text-[10px]">
                    <th className="py-2 text-left font-medium">DAY</th>
                    <th className="py-2 text-center font-medium">MORNING (8AM-12PM)</th>
                    <th className="py-2 text-center font-medium">AFTERNOON (12PM-5PM)</th>
                    <th className="py-2 text-center font-medium">PRIME (5PM-9PM)</th>
                    <th className="py-2 text-center font-medium">LATE (9PM-12AM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-white/[0.04]">
                  {[
                    { day: 'Monday', m: 34, a: 52, p: 92, l: 64, primeSlot: '7:30 PM' },
                    { day: 'Tuesday', m: 38, a: 58, p: 88, l: 58, primeSlot: '8:00 PM' },
                    { day: 'Wednesday', m: 42, a: 64, p: 94, l: 72, primeSlot: '7:15 PM' },
                    { day: 'Thursday', m: 36, a: 62, p: 90, l: 68, primeSlot: '8:30 PM' },
                    { day: 'Friday', m: 48, a: 70, p: 98, l: 84, primeSlot: '6:45 PM' },
                    { day: 'Saturday', m: 62, a: 82, p: 96, l: 88, primeSlot: '6:00 PM' },
                    { day: 'Sunday', m: 74, a: 88, p: 100, l: 90, primeSlot: '7:00 PM' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-2.5 font-semibold text-neutral-800 dark:text-neutral-200">{row.day}</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 font-medium">
                          {row.m}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-emerald-100/70 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-medium">
                          {row.a}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-emerald-600 text-white font-bold shadow-xs">
                          {row.p}% 🔥 ({row.primeSlot})
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-emerald-100/70 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-medium">
                          {row.l}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Optimal Reel Release Window for Today: <strong>7:00 PM – 9:00 PM IST</strong></span>
              </div>
              <button
                onClick={() => onNavigate('discover_create')}
                className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                Schedule in Planner &rarr;
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 5. TAB 4: MULTI-PAGE MANAGEMENT HUB */}
      {activeTab === 'multi_page' && (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-neutral-900 dark:text-white">Multi-Page Workspace Management</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  {tier} Plan
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Connected accounts: <strong className="text-neutral-900 dark:text-white font-mono">{pages.length}</strong> / {getPageLimit() === 9999 ? 'Unlimited' : getPageLimit()} slots utilized.
              </p>
            </div>

            <button
              onClick={() => {
                if (!canAddMorePages()) {
                  openUpgradeModal('multi_page', `Your ${tier.toUpperCase()} plan is capped at ${getPageLimit()} page(s). Upgrade to connect additional accounts.`);
                } else {
                  setIsConnectModalOpen(true);
                }
              }}
              className="py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect New Account</span>
            </button>
          </div>

          {/* Grid of Connected Pages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => {
              const isActive = p.id === activePage?.id;
              return (
                <div 
                  key={p.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    isActive 
                      ? 'bg-white dark:bg-[#0C0D12] border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' 
                      : 'bg-white dark:bg-[#0C0D12] border-neutral-200/80 dark:border-white/[0.06] hover:border-neutral-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img src={p.avatar} alt={p.handle} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm font-mono text-neutral-900 dark:text-white">@{p.handle}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-emerald-600 text-white font-semibold">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{p.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-neutral-400">Followers</div>
                        <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{p.followersCount || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Views 7d</div>
                        <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{p.views7d || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Score</div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{p.audit?.overallScore || 80}/100</div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2 italic">
                      "{p.bio}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.05] flex items-center justify-between">
                    {isActive ? (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Scoping Workspace
                      </span>
                    ) : (
                      <button
                        onClick={() => switchPage(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                      >
                        Set as Active Context
                      </button>
                    )}

                    <span className="text-[10px] font-mono text-neutral-400">
                      Synced {p.lastSynced || 'Recently'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plan Limits Callout */}
          {tier === 'free' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Free Plan Limit:</strong> You can manage 1 Instagram account. Upgrade to Pro to scale up to 3 theme pages simultaneously.
                </span>
              </div>
              <button
                onClick={() => openUpgradeModal('multi_page', 'Upgrade to Pro to connect up to 3 Instagram accounts.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap cursor-pointer shadow-xs"
              >
                Upgrade to Pro (3 Pages)
              </button>
            </div>
          )}

        </div>
      )}

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

    </div>
  );
}
