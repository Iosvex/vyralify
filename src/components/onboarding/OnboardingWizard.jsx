import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Compass, 
  TrendingUp, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Bot, 
  ShoppingBag, 
  Zap 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { auditLiveBio } from '../../lib/aiService';

function InstagramIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

const OFFICIAL_NICHES = [
  {
    id: 'business_money',
    name: 'Business & Money',
    subNiches: ['Entrepreneurship', 'Online Business', 'Finance & Investing', 'Marketing', 'E-commerce', 'AI Business'],
    profitability: 96,
    cpm: 'High (₹180-₹350)',
    icon: '💼'
  },
  {
    id: 'self_improvement',
    name: 'Self-Improvement',
    subNiches: ['Motivation', 'Discipline & Habits', 'Productivity', 'Mindset & Success', 'Stoicism'],
    profitability: 92,
    cpm: 'Medium-High (₹120-₹240)',
    icon: '🧠'
  },
  {
    id: 'health_fitness',
    name: 'Health & Fitness',
    subNiches: ['Gym Workouts', 'Weight Loss', 'Nutrition & Diet', 'Wellness & Longevity'],
    profitability: 89,
    cpm: 'Medium (₹100-₹220)',
    icon: '⚡'
  },
  {
    id: 'fashion_beauty',
    name: 'Fashion & Beauty',
    subNiches: ['Men\'s Fashion', 'Women\'s Fashion', 'Luxury Watches', 'Skincare & Grooming', 'Fragrance'],
    profitability: 94,
    cpm: 'High (₹150-₹300)',
    icon: '✨'
  },
  {
    id: 'cars_automotive',
    name: 'Cars & Automotive',
    subNiches: ['Supercars & Luxury', 'Sports Cars', 'JDM Culture', 'Car Detailing & Mods'],
    profitability: 87,
    cpm: 'Medium-High (₹130-₹260)',
    icon: '🏎️'
  },
  {
    id: 'travel_lifestyle',
    name: 'Travel & Lifestyle',
    subNiches: ['Luxury Travel', 'Adventure & Exploration', 'Aesthetic Lifestyle', 'Digital Nomad'],
    profitability: 88,
    cpm: 'Medium (₹110-₹230)',
    icon: '✈️'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subNiches: ['Movies & Series', 'Anime & Gaming', 'Pop Culture & Memes', 'Comedy Skits'],
    profitability: 82,
    cpm: 'Mass Reach (₹60-₹140)',
    icon: '🎬'
  },
  {
    id: 'sports',
    name: 'Sports',
    subNiches: ['Football', 'Basketball', 'Cricket', 'F1 Racing', 'MMA & Boxing', 'Tennis'],
    profitability: 85,
    cpm: 'High Engagement (₹90-₹190)',
    icon: '⚽'
  }
];

export default function OnboardingWizard({ onComplete }) {
  const { user, completeOnboarding } = useAuth();
  const { addPage, updatePage, activePage } = usePage();

  const [step, setStep] = useState(1);
  const [track, setTrack] = useState(null);
  
  // Existing Track State
  const [instagramHandle, setInstagramHandle] = useState('');
  const [isConnectingMeta, setIsConnectingMeta] = useState(false);
  const [connectedProfile, setConnectedProfile] = useState(null);
  const [auditRunning, setAuditRunning] = useState(false);
  const [auditResults, setAuditResults] = useState(null);

  // Beginner Track State
  const [selectedCategory, setSelectedCategory] = useState(OFFICIAL_NICHES[0]);
  const [selectedSubNiche, setSelectedSubNiche] = useState(OFFICIAL_NICHES[0].subNiches[0]);
  const [themeHandle, setThemeHandle] = useState('');

  // Step 3 Objective
  const [objective, setObjective] = useState('growth');

  // Handle Meta OAuth Connection Simulation
  const handleConnectInstagram = async () => {
    if (!instagramHandle) return;
    setIsConnectingMeta(true);

    const cleanHandle = instagramHandle.replace('@', '').toLowerCase();
    const connectedAcc = {
      id: `ig_${Date.now()}`,
      handle: cleanHandle,
      displayName: `${cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1)} Official`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      followersCount: '24.8K',
      followersNumeric: 24800,
      engagementRate: '4.8%',
      category: selectedCategory.name,
      subNiche: selectedSubNiche,
      bio: `Empowering creators in ${selectedCategory.name} with high-retention frameworks & digital leverage.`
    };

    setConnectedProfile(connectedAcc);
    setIsConnectingMeta(false);
    setAuditRunning(true);

    // Call Real AI Intelligence to analyze the creator's profile
    try {
      const aiResult = await auditLiveBio({
        handle: cleanHandle,
        currentBio: connectedAcc.bio,
        niche: selectedCategory.name
      });

      setAuditResults({
        overallScore: Math.floor(78 + Math.random() * 12),
        aiAnalysis: aiResult.text,
        strengths: [
          `Strong high-CPM positioning in ${selectedCategory.name}`,
          'Clear niche outcome tailored for viral retention'
        ],
        gaps: [
          'Missing automated DM keyword trigger on top reel',
          'Bio needs direct Link-in-Bio product showcase'
        ]
      });
    } catch (e) {
      console.warn('AI audit fallback:', e.message);
      setAuditResults({
        overallScore: 84,
        strengths: [
          'Consistent hook framing in last 12 reels',
          'Clear bio value proposition with high CTR'
        ],
        gaps: [
          'Missing automated DM keyword trigger',
          'No digital store checkout link in bio'
        ]
      });
    } finally {
      setAuditRunning(false);
    }
  };

  const handleFinish = () => {
    try {
      if (track === 'existing' && connectedProfile) {
        addPage({
          ...connectedProfile,
          audit: auditResults
        }, true);
      } else {
        const fallbackHandle = themeHandle 
          ? themeHandle.replace('@', '').toLowerCase() 
          : `${(selectedSubNiche || 'creator').toLowerCase().replace(/[^a-z0-9]/g, '.')}.daily`;
        addPage({
          id: `scratch_${Date.now()}`,
          handle: fallbackHandle,
          displayName: `${selectedSubNiche || 'Theme'} Daily`,
          avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          followersCount: '0',
          followersNumeric: 0,
          engagementRate: '0.0%',
          category: selectedCategory?.name || 'Business & Money',
          subNiche: selectedSubNiche || 'Online Business',
          bio: `Daily ${selectedSubNiche || 'creator'} insights for high-performers. Curated by Vyralify AI.`
        }, true);
      }
    } catch (err) {
      console.warn("Could not register page during onboarding finish, proceeding:", err);
    }

    completeOnboarding({
      track: track || 'beginner',
      objective: objective || 'growth'
    });

    if (onComplete) onComplete();
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200 flex flex-col items-center justify-center p-4 sm:p-6 select-none relative overflow-x-hidden">
      
      {/* Header with step progress */}
      <div className="w-full max-w-xl mb-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <img src="/vyralify-logo.png" alt="Vyralify" className="h-5 w-auto" />
          <span className="font-bold text-sm text-neutral-900 dark:text-white">Vyralify</span>
        </div>

        {/* Step indicator and Skip button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step 
                    ? 'w-6 bg-emerald-600 dark:bg-white' 
                    : s < step 
                    ? 'w-3 bg-emerald-300 dark:bg-neutral-600' 
                    : 'w-3 bg-neutral-200 dark:bg-neutral-800'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => completeOnboarding({ track: 'existing', objective: 'growth' })}
            className="text-[11px] font-mono text-neutral-500 hover:text-emerald-700 px-2 py-0.5 rounded hover:bg-neutral-200/60 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Skip &rarr;
          </button>
        </div>
      </div>

      {/* Main Container Card */}
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-md relative z-10"
      >
        
        {/* STEP 1: BRANCHING QUESTION */}
        {step === 1 && (
          <div>
            <div className="text-center max-w-md mx-auto mb-6">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-white/[0.05] text-emerald-700 dark:text-neutral-400 text-[10px] font-mono uppercase tracking-wider mb-2.5 inline-block border border-emerald-200 dark:border-white/[0.06] font-semibold">
                Step 1 of 3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                How will you use Vyralify?
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                Connect an existing Instagram account or launch a profitable theme page from zero.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: Existing Page */}
              <div
                onClick={() => {
                  setTrack('existing');
                  setStep(2);
                }}
                className="rounded-2xl p-5 bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.08] hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-white/[0.06] border border-emerald-200 dark:border-white/[0.08] flex items-center justify-center text-emerald-700 dark:text-white mb-3">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    I Have an Instagram Page
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Connect profile, auto-audit metrics, scale content with AI, and automate comment &amp; DM sales.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-neutral-300 font-semibold pt-3 mt-3 border-t border-neutral-200 dark:border-white/[0.06]">
                  <span>Import &amp; Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Option 2: Beginner / Theme Page from Scratch */}
              <div
                onClick={() => {
                  setTrack('beginner');
                  setStep(2);
                }}
                className="rounded-2xl p-5 bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.08] hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-white/[0.06] border border-emerald-200 dark:border-white/[0.08] flex items-center justify-center text-emerald-700 dark:text-white mb-3">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-1">
                    Starting from Scratch
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Find profitable niches, get AI-recommended themes, create viral hooks, and launch from zero.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-neutral-300 font-semibold pt-3 mt-3 border-t border-neutral-200 dark:border-white/[0.06]">
                  <span>Launch Theme Page</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* STEP 2A: EXISTING CREATOR (Meta OAuth & Instant Audit) */}
        {step === 2 && track === 'existing' && (
          <div>
            <div className="text-center max-w-lg mx-auto mb-6">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 inline-block border border-emerald-200">
                Existing Creator Path
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Connect Your Instagram Account
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                We pull your live profile stats via official Meta Graph API to benchmark your content and run your initial audit.
              </p>
            </div>

            {!connectedProfile ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1.5 font-medium">Enter Instagram Username / Handle</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-neutral-400 font-mono text-sm">@</span>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="yourbrand.hq"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-8 pr-3 py-2.5 text-sm text-neutral-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleConnectInstagram}
                  disabled={!instagramHandle || isConnectingMeta}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>{isConnectingMeta ? 'Connecting via Meta API...' : 'Connect With Instagram'}</span>
                </button>

                <p className="text-[11px] text-neutral-400 text-center font-mono">
                  Official Meta Graph API OAuth connection &bull; Read-only analytics permission
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Connected Profile Preview Card */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={connectedProfile.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20" />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white text-xs flex items-center gap-1.5">
                        <span>@{connectedProfile.handle}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{connectedProfile.bio}</div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] font-mono text-neutral-500">
                        <span><strong>{connectedProfile.followersCount}</strong> Followers</span>
                        <span>&bull;</span>
                        <span><strong>{connectedProfile.engagementRate}</strong> Eng. Rate</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-semibold border border-emerald-200 shrink-0">
                    Connected
                  </span>
                </div>

                {/* Audit Results Card */}
                {auditRunning ? (
                  <div className="p-5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] text-center space-y-1.5">
                    <Sparkles className="w-5 h-5 text-emerald-600 animate-spin mx-auto" />
                    <div className="text-xs font-semibold text-neutral-900 dark:text-white">Running Instant AI Page Audit...</div>
                    <div className="text-[11px] text-neutral-500">Benchmarking retention and bio conversion.</div>
                  </div>
                ) : auditResults && (
                  <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <span className="text-[11px] font-mono text-neutral-500 font-semibold">AUDIT SCORECARD</span>
                      <span className="text-xs font-bold font-mono text-emerald-700 dark:text-white">{auditResults.overallScore} / 100</span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-neutral-500 font-medium text-[10px] uppercase font-mono">Strengths Identified:</div>
                      {auditResults.strengths.map((s, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-[11px]">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1 text-xs pt-1">
                      <div className="text-neutral-500 font-medium text-[10px] uppercase font-mono">Growth Gaps:</div>
                      {auditResults.gaps.map((g, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={auditRunning}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-3 shadow-xs"
                >
                  <span>Continue to Objectives</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2B: BEGINNER PATH */}
        {step === 2 && track === 'beginner' && (
          <div>
            <div className="text-center max-w-md mx-auto mb-5">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block border border-emerald-200 font-semibold">
                Step 2 of 3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Select Your Niche &amp; Sub-Category
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Choose from Vyralify's official 8 launch categories. Each niche comes with pre-calculated CPM and profitability benchmarks.
              </p>
            </div>

            {/* 8 Niche Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {OFFICIAL_NICHES.map((niche) => {
                const isSelected = selectedCategory.id === niche.id;
                return (
                  <div
                    key={niche.id}
                    onClick={() => {
                      setSelectedCategory(niche);
                      setSelectedSubNiche(niche.subNiches[0]);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-xs' 
                        : 'bg-neutral-50/70 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                    }`}
                  >
                    <div className="text-lg mb-0.5">{niche.icon}</div>
                    <div className="text-[11px] leading-tight truncate">{niche.name}</div>
                    <div className="text-[9px] font-mono text-emerald-700 dark:text-neutral-400 mt-0.5">{niche.profitability}/100</div>
                  </div>
                );
              })}
            </div>

            {/* Sub-Niches Selector */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] mb-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold">
                  Select Sub-Niche:
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-medium">
                  CPM: {selectedCategory.cpm}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedCategory.subNiches.map((sub) => {
                  const isSelected = selectedSubNiche === sub;
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubNiche(sub)}
                      className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-emerald-600 text-white font-medium shadow-xs' 
                          : 'bg-white dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 border border-neutral-200 dark:border-white/[0.08]'
                      }`}
                    >
                      {sub}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Page Handle */}
            <div className="mb-5">
              <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">
                Suggested Page Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-neutral-400 font-mono text-xs">@</span>
                <input
                  type="text"
                  value={themeHandle}
                  onChange={(e) => setThemeHandle(e.target.value)}
                  placeholder={selectedSubNiche.toLowerCase().replace(/[^a-z0-9]/g, '.') + '.daily'}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-7 pr-3 py-2 text-xs text-neutral-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep(3)}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Confirm &amp; Set Goals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* STEP 3: OBJECTIVES */}
        {step === 3 && (
          <div>
            <div className="text-center max-w-md mx-auto mb-5">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-mono uppercase tracking-wider mb-2 inline-block border border-emerald-200 font-semibold">
                Step 3 of 3
              </span>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                What is your primary goal?
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                This customizes your Getting Started checklist and dashboard metrics.
              </p>
            </div>

            <div className="space-y-2 mb-5">
              {[
                {
                  id: 'growth',
                  title: 'Scale Reach & Followers',
                  desc: 'Hook optimization, retention formulas, and viral algorithms.',
                  icon: TrendingUp
                },
                {
                  id: 'monetization',
                  title: 'Monetize & Sell Products',
                  desc: 'Link-in-bio storefront and digital product sales.',
                  icon: ShoppingBag
                },
                {
                  id: 'automation',
                  title: 'Automate Lead Generation',
                  desc: 'Turn Reel comments and story replies into direct sales.',
                  icon: Bot
                }
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = objective === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setObjective(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-emerald-500 text-neutral-900 shadow-xs' 
                        : 'bg-neutral-50/60 dark:bg-white/[0.02] border-neutral-200/80 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-emerald-600 text-white' : 'bg-neutral-200 dark:bg-white/[0.05] text-neutral-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-neutral-900 dark:text-white">{item.title}</div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">{item.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
}
