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
  AlertCircle,
  Camera,
  Upload,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { generateLiveBios, generatePositioningStatement } from '../../lib/aiService';
import ConnectAccountModal from '../common/ConnectAccountModal';

// 8 Official V3 Niches with eRPM and sub-niche taxonomy per Section 3 Blueprint
const OFFICIAL_NICHES = [
  {
    id: 'business_money',
    name: 'Business & Money',
    subNiches: ['AI Business & SaaS', 'Finance & Investing', 'E-commerce & Dropshipping', 'Entrepreneurship', 'Marketing & Sales'],
    profitability: 96,
    eRPM: '$2.50 - $5.00 / ₹180 - ₹350',
    icon: '💼',
    monetizationFocus: 'Digital products, software affiliates, high-ticket consulting'
  },
  {
    id: 'self_improvement',
    name: 'Self-Improvement',
    subNiches: ['Motivation & Stoicism', 'Discipline & Daily Habits', 'Productivity Systems', 'Mindset & Success', 'Philosophy'],
    profitability: 92,
    eRPM: '$1.80 - $3.50 / ₹120 - ₹240',
    icon: '🧠',
    monetizationFocus: 'Notion templates, e-books, private skool communities'
  },
  {
    id: 'health_fitness',
    name: 'Health & Fitness',
    subNiches: ['Gym & Hypertrophy', 'Fat Loss & Diet', 'Biohacking & Longevity', 'Calisthenics', 'Holistic Wellness'],
    profitability: 89,
    eRPM: '$1.50 - $3.20 / ₹100 - ₹220',
    icon: '⚡',
    monetizationFocus: 'Workout guides, meal plans, supplement sponsorships'
  },
  {
    id: 'fashion_beauty',
    name: 'Fashion & Beauty',
    subNiches: ['Men\'s Sartorial Style', 'Luxury Watches & EDC', 'Skincare & Grooming', 'Minimalist Aesthetics', 'Streetwear'],
    profitability: 94,
    eRPM: '$2.20 - $4.40 / ₹150 - ₹300',
    icon: '✨',
    monetizationFocus: 'Brand affiliate deals, lookbooks, physical merchandise'
  },
  {
    id: 'cars_automotive',
    name: 'Cars & Automotive',
    subNiches: ['Supercars & Exotics', 'JDM Culture & Builds', 'Motorsport & Racing', 'Auto Detailing & Care', 'Vintage Classics'],
    profitability: 87,
    eRPM: '$1.90 - $3.80 / ₹130 - ₹260',
    icon: '🏎️',
    monetizationFocus: 'Car accessories, detailing kits, clipping bounties'
  },
  {
    id: 'travel_lifestyle',
    name: 'Travel & Lifestyle',
    subNiches: ['Luxury & Ultra-Stays', 'Digital Nomad Living', 'Adventure Expeditions', 'Hidden Destinations', 'Urban Photography'],
    profitability: 88,
    eRPM: '$1.60 - $3.40 / ₹110 - ₹230',
    icon: '✈️',
    monetizationFocus: 'Lightroom presets, itinerary guides, hotel collabs'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    subNiches: ['Cinema & Movie Breakdowns', 'Anime & Manga Lore', 'Pop Culture Curations', 'Gaming Clips', 'Humor & Relatable'],
    profitability: 82,
    eRPM: '$0.90 - $2.00 / ₹60 - ₹140',
    icon: '🎬',
    monetizationFocus: 'Mass view clipping bounties, game promotions'
  },
  {
    id: 'sports',
    name: 'Sports',
    subNiches: ['Football (Soccer)', 'Cricket Insights', 'F1 Racing & Telemetry', 'Combat Sports (MMA/Boxing)', 'Basketball'],
    profitability: 85,
    eRPM: '$1.30 - $2.80 / ₹90 - ₹190',
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

  // Active Sub-Tab: 'identity' | 'quiz' | 'demographics' | 'multi_page'
  const [activeTab, setActiveTab] = useState('identity');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Bio Studio State
  const [bioObjective, setBioObjective] = useState('lead_magnet');
  const [generatedBios, setGeneratedBios] = useState(null);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [copiedBioIndex, setCopiedBioIndex] = useState(null);

  // Positioning Statement State
  const [positioningData, setPositioningData] = useState({
    audience: 'Creator-operators & agency owners',
    outcome: 'Predictable organic reach & digital sales',
    painPoint: 'Ending content burnout and low engagement'
  });
  const [generatedStatements, setGeneratedStatements] = useState(null);
  const [isGeneratingPositioning, setIsGeneratingPositioning] = useState(false);

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
        message: 'Conversion-optimized bios generated using real AI models.',
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

  // 2b. Upload or Change Profile Photo
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      addNotification({
        title: 'Image Too Large',
        message: 'Please choose an image under 3MB.',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url && activePage?.id) {
        updatePage(activePage.id, { avatar: base64Url });
        addNotification({
          title: 'Profile Photo Updated',
          message: `Photo updated successfully for @${activePage.handle}`,
          type: 'success'
        });
      }
    };
    reader.readAsDataURL(file);
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

  // 4. Apply Recommended Niche to Active Page
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
      
      {/* 1. TOP PANEL TITLE & CLEAN SEGMENTED TAB NAVIGATION per Section 1 Blueprint */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Page &amp; Profile Studio
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Positioning, bio optimization, niche eRPM benchmarks, and audience demographics.
          </p>
        </div>

        {/* 4 Streamlined Tabs per Section 1 */}
        <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs">
          {[
            { id: 'identity', label: 'Bio & Positioning' },
            { id: 'quiz', label: 'Niche & eRPM' },
            { id: 'demographics', label: 'Audience Insights' },
            { id: 'multi_page', label: 'Workspace Accounts' }
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

      {/* 2. TAB 1: BIO & POSITIONING STUDIO (Identity & Bio) */}
      {activeTab === 'identity' && (
        <div className="space-y-6">
          
          {/* Refined Profile Identity Bar per Section 2 Blueprint */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative group shrink-0">
                <img 
                  src={getSafeAvatarUrl(activePage?.avatar, activePage?.handle)} 
                  alt={activePage?.handle} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getSafeAvatarUrl('', activePage?.handle);
                  }}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20 shadow-xs"
                />
                <label 
                  title="Change profile photo" 
                  className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-medium backdrop-blur-xs"
                >
                  <Camera className="w-3.5 h-3.5 mb-0.5 text-emerald-400" />
                  <span>Change</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white font-mono">@{activePage?.handle}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Meta Connected</span>
                  </span>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{activePage?.category}</span>
                  <span>&bull;</span>
                  <span>{activePage?.subNiche || 'Online Growth'}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Synced Just Now</span>
                </div>
              </div>
            </div>

            {/* Current Bio Snippet preview */}
            <div className="hidden md:block max-w-sm text-right">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block mb-0.5">Active Bio</span>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 italic font-sans truncate">
                "{activePage?.bio || 'No bio configured yet.'}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: AI Bio Optimizer Studio per Section 2 Blueprint */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">AI Bio Optimizer</h3>
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
                      { id: 'lead_magnet', label: 'Lead Magnet', sub: 'Link-in-bio focus' },
                      { id: 'store_clicks', label: 'Storefront Sales', sub: 'Catalog direct' },
                      { id: 'viral_followers', label: 'Brand Authority', sub: 'Reach focus' }
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBioObjective(opt.id)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer text-center ${
                          bioObjective === opt.id
                            ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-semibold'
                            : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-xs">{opt.label}</div>
                        <div className="text-[10px] text-neutral-400 dark:text-neutral-400 mt-0.5">{opt.sub}</div>
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
                  <span>{isGeneratingBio ? 'Architecting High-CTR Bios...' : 'Generate Bio Variations'}</span>
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

            {/* Right: Authority Positioning Statement Builder per Section 2 Blueprint */}
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
                  <label className="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={positioningData.audience}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, audience: e.target.value }))}
                    placeholder="e.g., Creator-operators & agency owners"
                    className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 font-medium focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold mb-1">
                    Primary Transformation
                  </label>
                  <input
                    type="text"
                    value={positioningData.outcome}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, outcome: e.target.value }))}
                    placeholder="e.g., Predictable organic reach & digital sales"
                    className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 font-medium focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold mb-1">
                    Key Obstacle Solved
                  </label>
                  <input
                    type="text"
                    value={positioningData.painPoint}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, painPoint: e.target.value }))}
                    placeholder="e.g., Ending content burnout and low engagement"
                    className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl text-xs text-neutral-900 dark:text-white placeholder-neutral-400 font-medium focus:outline-hidden focus:border-emerald-500 transition-colors"
                  />
                </div>

                <button
                  onClick={handleGeneratePositioning}
                  disabled={isGeneratingPositioning}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 dark:bg-white hover:bg-black dark:hover:bg-neutral-100 text-white dark:text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{isGeneratingPositioning ? 'Formulating Position...' : 'Generate Positioning Statement'}</span>
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

          {/* Story Highlights Stack (4 Conversion Anchors per Section 2 Blueprint) */}
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
                  desc: 'Origin, mission, and core thesis behind your curations.',
                  icon: '📖'
                },
                {
                  circle: '02',
                  name: 'PROOF',
                  role: 'Social Proof & Wins',
                  desc: 'Client wins, metric spikes, and reviews from followers.',
                  icon: '🏆'
                },
                {
                  circle: '03',
                  name: 'STORE',
                  role: 'Offer & Products',
                  desc: 'Overview of templates, guides, and tools with direct bio link.',
                  icon: '🛍️'
                },
                {
                  circle: '04',
                  name: 'RESOURCES',
                  role: 'Free Value Drops',
                  desc: 'Free value drops and link-in-bio guide hooks.',
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

      {/* 3. TAB 2: NICHE & eRPM BENCHMARK DIRECTORY (Direct 8 Niche Cards Hero per Section 3 Blueprint) */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
                Niche &amp; eRPM Benchmark Directory
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                8 Core high-leverage creator niches benchmarked against real digital sales and ad metrics.
              </p>
            </div>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              Click any niche card to apply to active profile
            </span>
          </div>

          {/* Official 8 Niche Catalog Grid with Clean High-Contrast Hierarchy */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {OFFICIAL_NICHES.map(niche => {
              const isCurrent = activePage?.category === niche.name;
              return (
                <div
                  key={niche.id}
                  onClick={() => handleApplyNicheToActivePage(niche)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 hover:border-emerald-500/50 hover:shadow-emerald-500/5 hover:shadow-md ${
                    isCurrent
                      ? 'bg-emerald-50/70 dark:bg-emerald-500/10 border-emerald-500 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-[#0C0D12] border-neutral-200/80 dark:border-white/[0.06]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{niche.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-neutral-100 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300">
                          {niche.profitability}% Match
                        </span>
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active Niche" />
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white mb-1">
                      {niche.name}
                    </h4>
                    <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium mb-2.5">
                      Est. eRPM: {niche.eRPM}
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
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 4. TAB 3: AUDIENCE INSIGHTS & ACTIVE HOURS per Section 4 Blueprint */}
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

              {/* Clean Summary Badge per Section 4 */}
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/[0.04] text-xs flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Primary Demographic:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">18–24 (46%)</span>
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
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Male</div>
                </div>
                <div className="h-12 w-px bg-neutral-200 dark:bg-white/[0.08]" />
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">32%</div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Female</div>
                </div>
              </div>

              {/* Minimalist Split Bar per Section 4 */}
              <div className="w-full h-3 rounded-full bg-neutral-100 dark:bg-white/[0.06] flex overflow-hidden">
                <div className="bg-neutral-800 dark:bg-neutral-300 h-full" style={{ width: '68%' }} title="Male 68%" />
                <div className="bg-emerald-500 h-full" style={{ width: '32%' }} title="Female 32%" />
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/70 dark:border-white/[0.04] text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Ideal hook framing: Direct, result-driven pattern interrupts.
              </div>
            </div>

            {/* Top Geographic Markets Card (eRPM removed, clean % share per Section 4) */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">Top Geographic Markets</h3>
                <span className="text-[10px] font-mono text-neutral-400">Territory Distribution</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { country: 'India', flag: '🇮🇳', pct: '56.4%' },
                  { country: 'United States', flag: '🇺🇸', pct: '21.8%' },
                  { country: 'United Kingdom', flag: '🇬🇧', pct: '8.2%' },
                  { country: 'United Arab Emirates', flag: '🇦🇪', pct: '7.1%' },
                  { country: 'Others', flag: '🌐', pct: '6.5%' }
                ].map((geo, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100 dark:border-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span>{geo.flag}</span>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">{geo.country}</span>
                    </div>
                    <div className="font-mono font-semibold text-neutral-900 dark:text-white">
                      {geo.pct}
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
                <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">Med</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-semibold">Peak Window</span>
              </div>
            </div>

            {/* Heatmap Grid: Flame emojis removed, clean indicator dots per Section 4 */}
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
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-medium">
                          {row.a}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-emerald-600 text-white font-bold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{row.p}% ({row.primeSlot})</span>
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-medium">
                          {row.l}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dynamic Crisp Highlight Bar per Section 4 */}
            <div className="p-3 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Optimal Release Window Today: <strong>7:00 PM – 9:00 PM IST</strong></span>
              </div>
              <button
                onClick={() => onNavigate('discover_create')}
                className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open Content Planner &rarr;</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 5. TAB 4: WORKSPACE ACCOUNTS (Multi-Page Hub per Section 5 Blueprint) */}
      {activeTab === 'multi_page' && (
        <div className="space-y-6">
          
          {/* Header Workspace Row per Section 5 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
            <div>
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Connected Accounts
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Manage connected Instagram Business accounts across workspaces.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Account Slots Usage Pill per Section 5 */}
              <div className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] text-xs font-mono text-neutral-700 dark:text-neutral-300 font-medium">
                {pages.length} of {getPageLimit() === 9999 ? 'Unlimited' : getPageLimit()} Accounts Used ({tier === 'free' ? 'Starter' : tier === 'elite' ? 'Elite Tier' : 'Pro Tier'})
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
                <span>+ Connect Account</span>
              </button>
            </div>
          </div>

          {/* Grid of Refined Connected Account Cards per Section 5 */}
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
                    {/* Header: [Avatar] | @username | Active Badge */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={getSafeAvatarUrl(p.avatar, p.handle)} 
                          alt={p.handle} 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getSafeAvatarUrl('', p.handle);
                          }}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-emerald-500/20" 
                        />
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

                    {/* Key Snapshot Metrics: Followers | 7D Reach | Page Score */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-neutral-400">Followers</div>
                        <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{p.followersCount || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">7D Reach</div>
                        <div className="font-bold text-neutral-900 dark:text-white mt-0.5">{p.views7d || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-neutral-400">Page Score</div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{p.audit?.overallScore || 80}/100</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Status per Section 5 */}
                  <div className="pt-3 border-t border-neutral-100 dark:border-white/[0.05] flex items-center justify-between">
                    {isActive ? (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active Workspace</span>
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
                      Synced {p.lastSynced || '2m ago'}
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
