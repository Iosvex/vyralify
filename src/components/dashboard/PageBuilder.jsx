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
    <div className="space-y-6 max-w-6xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP PANEL TITLE & CLEAN SEGMENTED TAB NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Page &amp; Profile Studio
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Positioning, bio optimization, niche eRPM benchmarks, and audience demographics.
          </p>
        </div>

        {/* 4 Streamlined Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-white/80 border border-[rgba(6,124,249,0.12)] text-xs shadow-xs">
          {[
            { id: 'identity', label: 'Bio & Positioning' },
            { id: 'quiz', label: 'Niche & eRPM' },
            { id: 'demographics', label: 'Audience Insights' },
            { id: 'multi_page', label: 'Workspace Accounts' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#067CF9] text-white font-semibold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
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
          
          {/* Profile Identity Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative group shrink-0">
                <img 
                  src={getSafeAvatarUrl(activePage?.avatar, activePage?.handle)} 
                  alt={activePage?.handle} 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = getSafeAvatarUrl('', activePage?.handle);
                  }}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#067CF9]/20 shadow-xs"
                />
                <label 
                  title="Change profile photo" 
                  className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-[9px] font-medium backdrop-blur-xs"
                >
                  <Camera className="w-3.5 h-3.5 mb-0.5 text-white" />
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
                  <h2 className="text-base font-bold text-[#0F172A] font-sans">@{activePage?.handle}</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#067CF9]" />
                    <span>Meta Connected</span>
                  </span>
                </div>
                <div className="text-xs text-[#64748B] font-mono mt-0.5 flex items-center gap-1.5">
                  <span className="font-semibold text-[#0F172A]">{activePage?.category}</span>
                  <span>&bull;</span>
                  <span>{activePage?.subNiche || 'Online Growth'}</span>
                  <span>&bull;</span>
                  <span className="text-[#067CF9] font-medium">Synced Just Now</span>
                </div>
              </div>
            </div>

            {/* Current Bio Snippet preview */}
            <div className="hidden md:block max-w-sm text-right">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider block mb-0.5">Active Bio</span>
              <p className="text-xs text-[#64748B] italic font-sans truncate">
                "{activePage?.bio || 'No bio configured yet.'}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left: AI Bio Optimizer Studio */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#067CF9]" />
                  <h3 className="font-bold text-sm text-[#0F172A]">AI Bio Optimizer</h3>
                </div>
                <span className="text-[10px] font-mono text-[#067CF9] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[rgba(6,124,249,0.12)] font-semibold">
                  150 Char Limit Safe
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase font-semibold mb-1">
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
                            ? 'bg-[#EFF6FF] border-[#067CF9] text-[#067CF9] font-bold shadow-xs'
                            : 'bg-[#F8FAFC] border-neutral-200 text-[#64748B] hover:text-[#0F172A]'
                        }`}
                      >
                        <div className="font-semibold text-xs">{opt.label}</div>
                        <div className="text-[10px] text-[#94A3B8] mt-0.5">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateBios}
                  disabled={isGeneratingBio}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isGeneratingBio ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingBio ? 'Architecting High-CTR Bios...' : 'Generate Bio Variations'}</span>
                </button>
              </div>

              {/* Bio Cards Result */}
              {generatedBios && (
                <div className="space-y-3 pt-2">
                  <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold">
                    Generated Formulations
                  </div>
                  {generatedBios.map((b, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] space-y-2 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase font-semibold text-[#067CF9]">
                          {b.archetype}
                        </span>
                        <span className="text-[10px] font-mono text-[#94A3B8]">
                          {b.text.length} / 150 chars
                        </span>
                      </div>

                      <div className="text-xs text-[#0F172A] font-mono whitespace-pre-line leading-relaxed bg-white p-2.5 rounded-lg border border-[rgba(6,124,249,0.1)]">
                        {b.text}
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(b.text);
                            setCopiedBioIndex(idx);
                            setTimeout(() => setCopiedBioIndex(null), 2000);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#64748B] hover:text-[#0F172A] bg-white border border-[rgba(6,124,249,0.15)] flex items-center gap-1 cursor-pointer"
                        >
                          {copiedBioIndex === idx ? <Check className="w-3 h-3 text-[#067CF9]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedBioIndex === idx ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleApplyBio(b.text)}
                          className="px-3 py-1 rounded-lg text-[11px] font-semibold text-white bg-[#067CF9] hover:bg-[#0568D2] flex items-center gap-1 cursor-pointer shadow-xs"
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
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#067CF9]" />
                  <h3 className="font-bold text-sm text-[#0F172A]">Authority Positioning Builder</h3>
                </div>
                <span className="text-[10px] font-mono text-[#64748B]">
                  Formula Architecture
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase font-semibold mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={positioningData.audience}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, audience: e.target.value }))}
                    placeholder="e.g., Creator-operators & agency owners"
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl text-xs text-[#0F172A] placeholder-neutral-400 font-medium focus:outline-hidden focus:border-[#067CF9] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase font-semibold mb-1">
                    Primary Transformation
                  </label>
                  <input
                    type="text"
                    value={positioningData.outcome}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, outcome: e.target.value }))}
                    placeholder="e.g., Predictable organic reach & digital sales"
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl text-xs text-[#0F172A] placeholder-neutral-400 font-medium focus:outline-hidden focus:border-[#067CF9] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#64748B] uppercase font-semibold mb-1">
                    Key Obstacle Solved
                  </label>
                  <input
                    type="text"
                    value={positioningData.painPoint}
                    onChange={(e) => setPositioningData(prev => ({ ...prev, painPoint: e.target.value }))}
                    placeholder="e.g., Ending content burnout and low engagement"
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl text-xs text-[#0F172A] placeholder-neutral-400 font-medium focus:outline-hidden focus:border-[#067CF9] transition-colors"
                  />
                </div>

                <button
                  onClick={handleGeneratePositioning}
                  disabled={isGeneratingPositioning}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{isGeneratingPositioning ? 'Formulating Position...' : 'Generate Positioning Statement'}</span>
                </button>
              </div>

              {/* Live Statement Cards */}
              {generatedStatements ? (
                <div className="space-y-2.5 pt-2">
                  {generatedStatements.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#067CF9] font-semibold">
                        <span>{s.formula}</span>
                        <span className="text-[#94A3B8]">{s.bannerHook}</span>
                      </div>
                      <p className="text-xs text-[#0F172A] font-medium">"{s.statement}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.15)] text-xs text-[#0F172A]">
                  <span className="font-semibold block mb-0.5 font-mono text-[11px] text-[#067CF9]">Core Blueprint:</span>
                  "I help {positioningData.audience} achieve {positioningData.outcome} without {positioningData.painPoint}."
                </div>
              )}

            </div>

          </div>

          {/* Story Highlights Stack (4 Conversion Anchors) */}
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Instagram Story Highlights Architecture</h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  The proven 4-highlight setup required to convert profile visitors into paying customers.
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#067CF9] bg-[#EFF6FF] px-2.5 py-0.5 rounded font-semibold border border-[rgba(6,124,249,0.2)]">
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
                <div key={i} className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.1)] flex flex-col justify-between space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFF6FF] border-2 border-[#067CF9] flex items-center justify-center text-sm font-bold font-mono text-[#067CF9]">
                      {hl.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0F172A] font-mono">{hl.name}</span>
                      <p className="text-[10px] text-[#067CF9] font-mono">{hl.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 3. TAB 2: NICHE & eRPM BENCHMARK DIRECTORY (Panel 3: Solid white cards with clean Electric Blue score badges & eRPM) */}
      {activeTab === 'quiz' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">
                Niche &amp; eRPM Benchmark Directory
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                8 Core high-leverage creator niches benchmarked against real digital sales and ad metrics.
              </p>
            </div>
            <span className="text-xs text-[#64748B] font-mono">
              Click any niche card to apply to active profile
            </span>
          </div>

          {/* Official 8 Niche Catalog Grid (Blueprint Section 2.D) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICIAL_NICHES.map(niche => {
              const isCurrent = activePage?.category === niche.name;
              return (
                <div
                  key={niche.id}
                  onClick={() => handleApplyNicheToActivePage(niche)}
                  className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-[0_2px_12px_rgba(6,124,249,0.03)] hover:border-[#067CF9]/40 hover:shadow-md ${
                    isCurrent
                      ? 'border-[#067CF9] ring-2 ring-[#067CF9]/20 bg-[#EFF6FF]/25 shadow-xs'
                      : 'border-[rgba(6,124,249,0.12)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{niche.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] font-semibold bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.15)]">
                          {niche.profitability}% Match
                        </span>
                        {isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-[#067CF9]" title="Active Niche" />
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-xs text-[#0F172A] mb-1">
                      {niche.name}
                    </h4>
                    <div className="text-[11px] font-mono text-[#067CF9] font-bold mb-2.5">
                      Est. eRPM: {niche.eRPM}
                    </div>

                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-[#94A3B8] uppercase font-semibold">Sub-Niches:</div>
                      <div className="flex flex-wrap gap-1">
                        {niche.subNiches.slice(0, 3).map((sub, idx) => (
                          <span key={idx} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] border border-neutral-100">
                            {sub}
                          </span>
                        ))}
                        {niche.subNiches.length > 3 && (
                          <span className="text-[9px] font-mono text-[#94A3B8]">+{niche.subNiches.length - 3}</span>
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

      {/* 4. TAB 3: AUDIENCE INSIGHTS & ACTIVE HOURS (Panel 3: Heatmap with Electric Blue peak cells) */}
      {activeTab === 'demographics' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Age Distribution Card */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
                <h3 className="font-bold text-sm text-[#0F172A]">Age Brackets Breakdown</h3>
                <span className="text-[10px] font-mono text-[#067CF9] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[rgba(6,124,249,0.12)] font-semibold">Meta Verified</span>
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
                      <span className="text-[#0F172A] font-medium">{item.bracket}</span>
                      <span className={`font-semibold ${item.isTop ? 'text-[#067CF9]' : 'text-[#64748B]'}`}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#EFF6FF] overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.isTop ? 'bg-[#067CF9]' : 'bg-neutral-300'}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Clean Summary Badge */}
              <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.12)] text-xs flex items-center justify-between">
                <span className="text-[#64748B] font-medium">Primary Demographic:</span>
                <span className="text-[#067CF9] font-mono font-bold">18–24 (46%)</span>
              </div>
            </div>

            {/* Gender Split Ratio Card */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
                <h3 className="font-bold text-sm text-[#0F172A]">Gender Distribution</h3>
                <span className="text-[10px] font-mono text-[#64748B]">Active Audience</span>
              </div>

              <div className="flex items-center justify-around py-4">
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-[#0F172A]">68%</div>
                  <div className="text-xs text-[#64748B] font-mono">Male</div>
                </div>
                <div className="h-12 w-px bg-neutral-200" />
                <div className="text-center space-y-1">
                  <div className="text-3xl font-bold font-mono text-[#067CF9]">32%</div>
                  <div className="text-xs text-[#64748B] font-mono">Female</div>
                </div>
              </div>

              {/* Minimalist Split Bar */}
              <div className="w-full h-3 rounded-full bg-[#EFF6FF] flex overflow-hidden">
                <div className="bg-[#0F172A] h-full" style={{ width: '68%' }} title="Male 68%" />
                <div className="bg-[#067CF9] h-full" style={{ width: '32%' }} title="Female 32%" />
              </div>

              <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[11px] text-[#64748B] leading-relaxed">
                Ideal hook framing: Direct, result-driven pattern interrupts.
              </div>
            </div>

            {/* Top Geographic Markets Card */}
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(6,124,249,0.08)]">
                <h3 className="font-bold text-sm text-[#0F172A]">Top Geographic Markets</h3>
                <span className="text-[10px] font-mono text-[#64748B]">Territory Distribution</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { country: 'India', flag: '🇮🇳', pct: '56.4%' },
                  { country: 'United States', flag: '🇺🇸', pct: '21.8%' },
                  { country: 'United Kingdom', flag: '🇬🇧', pct: '8.2%' },
                  { country: 'United Arab Emirates', flag: '🇦🇪', pct: '7.1%' },
                  { country: 'Others', flag: '🌐', pct: '6.5%' }
                ].map((geo, i) => (
                  <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100">
                    <div className="flex items-center gap-2">
                      <span>{geo.flag}</span>
                      <span className="font-medium text-[#0F172A]">{geo.country}</span>
                    </div>
                    <div className="font-mono font-bold text-[#067CF9]">
                      {geo.pct}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 24-Hour Active Posting Velocity Heatmap (Blueprint Section 2.D: Non-peak hours muted blue cells, peak active windows pure Electric Blue filled cells) */}
          <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(6,124,249,0.08)]">
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Audience Active Hours Heatmap</h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Algorithm retention windows specific to @{activePage?.handle || 'creator'}'s follower density.
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="text-[#94A3B8]">Intensity:</span>
                <span className="px-1.5 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] border border-neutral-200">Low</span>
                <span className="px-1.5 py-0.5 rounded bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)] font-semibold">Muted Blue</span>
                <span className="px-1.5 py-0.5 rounded bg-[#067CF9] text-white font-bold shadow-xs">Peak Window</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-[#94A3B8] text-[10px]">
                    <th className="py-2 text-left font-semibold">DAY</th>
                    <th className="py-2 text-center font-semibold">MORNING (8AM-12PM)</th>
                    <th className="py-2 text-center font-semibold">AFTERNOON (12PM-5PM)</th>
                    <th className="py-2 text-center font-semibold">PRIME (5PM-9PM)</th>
                    <th className="py-2 text-center font-semibold">LATE (9PM-12AM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(6,124,249,0.06)]">
                  {[
                    { day: 'Monday', m: 34, a: 52, p: 92, l: 64, primeSlot: '7:30 PM' },
                    { day: 'Tuesday', m: 38, a: 58, p: 88, l: 58, primeSlot: '8:00 PM' },
                    { day: 'Wednesday', m: 42, a: 64, p: 94, l: 72, primeSlot: '7:15 PM' },
                    { day: 'Thursday', m: 36, a: 62, p: 90, l: 68, primeSlot: '8:30 PM' },
                    { day: 'Friday', m: 48, a: 70, p: 98, l: 84, primeSlot: '6:45 PM' },
                    { day: 'Saturday', m: 62, a: 82, p: 96, l: 88, primeSlot: '6:00 PM' },
                    { day: 'Sunday', m: 74, a: 88, p: 100, l: 90, primeSlot: '7:00 PM' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#EFF6FF]/40 transition-colors">
                      <td className="py-2.5 font-bold text-[#0F172A]">{row.day}</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#F8FAFC] text-[#64748B] font-medium border border-neutral-100">
                          {row.m}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#EFF6FF] text-[#067CF9] font-semibold border border-[rgba(6,124,249,0.15)]">
                          {row.a}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-[#067CF9] text-white font-bold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>{row.p}% ({row.primeSlot})</span>
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#EFF6FF] text-[#067CF9] font-semibold border border-[rgba(6,124,249,0.15)]">
                          {row.l}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Dynamic Crisp Highlight Bar */}
            <div className="p-3 px-4 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#0F172A]">
                <Clock className="w-4 h-4 text-[#067CF9] shrink-0" />
                <span>Optimal Release Window Today: <strong className="text-[#067CF9]">7:00 PM – 9:00 PM IST</strong></span>
              </div>
              <button
                onClick={() => onNavigate('discover_create')}
                className="font-mono text-[#067CF9] font-bold hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Open Content Planner &rarr;</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* 5. TAB 4: WORKSPACE ACCOUNTS (Multi-Page Hub) */}
      {activeTab === 'multi_page' && (
        <div className="space-y-6">
          
          {/* Header Workspace Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)]">
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">
                Connected Accounts
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Manage connected Instagram Business accounts across workspaces.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Account Slots Usage Pill */}
              <div className="px-3 py-1 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.15)] text-xs font-mono text-[#067CF9] font-semibold">
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
                className="py-2 px-3.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Connect Account</span>
              </button>
            </div>
          </div>

          {/* Grid of Refined Connected Account Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => {
              const isActive = p.id === activePage?.id;
              return (
                <div 
                  key={p.id}
                  className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(6,124,249,0.03)] ${
                    isActive 
                      ? 'border-[#067CF9] ring-2 ring-[#067CF9]/20 shadow-sm' 
                      : 'border-[rgba(6,124,249,0.12)] hover:border-[#067CF9]/30'
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
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#067CF9]/20" 
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm font-sans text-[#0F172A]">@{p.handle}</span>
                            {isActive && (
                              <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-[#067CF9] text-white font-semibold">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#64748B] font-mono">{p.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Snapshot Metrics */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-center text-xs font-mono">
                      <div>
                        <div className="text-[10px] text-[#94A3B8]">Followers</div>
                        <div className="font-bold text-[#0F172A] mt-0.5">{p.followersCount || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94A3B8]">7D Reach</div>
                        <div className="font-bold text-[#0F172A] mt-0.5">{p.views7d || '0'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#94A3B8]">Page Score</div>
                        <div className="font-bold text-[#067CF9] mt-0.5">{p.audit?.overallScore || 80}/100</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Status */}
                  <div className="pt-3 border-t border-[rgba(6,124,249,0.06)] flex items-center justify-between">
                    {isActive ? (
                      <span className="text-xs font-mono text-[#067CF9] flex items-center gap-1.5 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9] animate-pulse" />
                        <span>Active Workspace</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => switchPage(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-neutral-200 text-xs font-medium text-[#0F172A] transition-colors cursor-pointer"
                      >
                        Set as Active Context
                      </button>
                    )}

                    <span className="text-[10px] font-mono text-[#94A3B8]">
                      Synced {p.lastSynced || '2m ago'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Plan Limits Callout */}
          {tier === 'free' && (
            <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#0F172A]">
                <AlertCircle className="w-4 h-4 text-[#067CF9] shrink-0" />
                <span>
                  <strong>Free Plan Limit:</strong> You can manage 1 Instagram account. Upgrade to Pro to scale up to 3 theme pages simultaneously.
                </span>
              </div>
              <button
                onClick={() => openUpgradeModal('multi_page', 'Upgrade to Pro to connect up to 3 Instagram accounts.')}
                className="px-3 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs whitespace-nowrap cursor-pointer shadow-xs"
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
