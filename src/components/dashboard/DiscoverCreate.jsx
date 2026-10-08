import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Users, 
  Bookmark, 
  ArrowRight, 
  Copy, 
  Check, 
  Play, 
  Clock, 
  Eye, 
  Share2, 
  Heart, 
  Filter, 
  Plus, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Flame, 
  BookmarkCheck,
  Video,
  FileText,
  RotateCw,
  ExternalLink,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { generateFullReelScript, generateAi30DayPlan, generateLiveViralHooks } from '../../lib/aiService';

// 8 Official Niches matching Master Taxonomy
const NICHES = [
  'Business & Money',
  'Self-Improvement',
  'Health & Fitness',
  'Fashion & Beauty',
  'Cars & Automotive',
  'Travel & Lifestyle',
  'Entertainment',
  'Sports'
];

// Curated Verified Viral Database entries
const INITIAL_VIRAL_POSTS = [
  {
    id: 'post_1',
    niche: 'Business & Money',
    creator: '@creator.capital',
    views: '3.4M',
    saves: '142K',
    shares: '89K',
    format: 'Reels',
    retentionScore: '96%',
    hookType: 'Contrarian',
    hookText: 'Stop selling $20 courses in 2026. Here is the high-ticket micro-offer model:',
    audioTrack: 'Original Audio - Ambient Lo-Fi (Trending #4)',
    duration: '28s',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Opens with 0.8s fast camera zoom onto white text. Reveals 3-step value mechanism at 0:08.'
  },
  {
    id: 'post_2',
    niche: 'Self-Improvement',
    creator: '@stoic.focus',
    views: '2.8M',
    saves: '210K',
    shares: '124K',
    format: 'Reels',
    retentionScore: '98%',
    hookType: 'Negative Framing',
    hookText: 'You are not lazy. You just lack dopamine architecture. Watch this 3-rule fix:',
    audioTrack: 'Dark Cinematic Ambient (Trending #1)',
    duration: '34s',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Pattern interrupt uses harsh black screen flash. Spoken audio uses confident baritone cadence.'
  },
  {
    id: 'post_3',
    niche: 'Health & Fitness',
    creator: '@biomechanic.lab',
    views: '1.9M',
    saves: '95K',
    shares: '48K',
    format: 'Reels',
    retentionScore: '93%',
    hookType: 'Curiosity Gap',
    hookText: 'The 1 exercise ruining your rotator cuff (and what Olympic coaches do instead)',
    audioTrack: 'Deep Bass Drop Impact',
    duration: '24s',
    thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Visual proof side-by-side comparison. Strong Save-trigger because viewers want to review before gym.'
  },
  {
    id: 'post_4',
    niche: 'Cars & Automotive',
    creator: '@apex.telemetry',
    views: '4.2M',
    saves: '180K',
    shares: '160K',
    format: 'Reels',
    retentionScore: '97%',
    hookType: 'Case Study',
    hookText: 'Why this 1998 German engine was banned from production for being too reliable:',
    audioTrack: 'Twin Turbo Exhaust Roar',
    duration: '42s',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Cinematic B-roll with rapid sound design. Comments debated reliability sparking massive virality.'
  },
  {
    id: 'post_5',
    niche: 'Fashion & Beauty',
    creator: '@minimal.wardrobe',
    views: '1.5M',
    saves: '130K',
    shares: '52K',
    format: 'Carousels',
    retentionScore: '91%',
    hookType: 'Contrarian',
    hookText: 'You only need 9 pieces to look like quiet luxury in 2026. Here is the capsule grid:',
    audioTrack: 'French Bistro Chill',
    duration: '7 Slides',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Slide 1 uses clean serif typography. Swipe-through rate was 88% due to slide 7 checklist.'
  },
  {
    id: 'post_6',
    niche: 'Travel & Lifestyle',
    creator: '@nomad.odyssey',
    views: '2.1M',
    saves: '175K',
    shares: '92K',
    format: 'Reels',
    retentionScore: '94%',
    hookType: 'Curiosity Gap',
    hookText: 'The secret Mediterranean island where digital nomads live for ₹45K/month:',
    audioTrack: 'Summer Breeze Acoustic',
    duration: '29s',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Drone footage opening + cost breakdown breakdown table at second 12.'
  }
];

export default function DiscoverCreate({ onNavigate }) {
  const { user, tier, aiCredits, consumeCredit } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Active Sub-Tab: 'feed' | 'studio' | 'planner' | 'competitors' | 'saved'
  const [activeTab, setActiveTab] = useState('feed');

  // Discover Feed Filters
  const [selectedNiche, setSelectedNiche] = useState(activePage?.category || 'Business & Money');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [savedPosts, setSavedPosts] = useState(['post_1', 'post_3']);

  // Script Studio State
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptHookType, setScriptHookType] = useState('contrarian');
  const [scriptGoal, setScriptGoal] = useState('dm_leads');
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isCopiedScript, setIsCopiedScript] = useState(false);

  // Content Planner State
  const [calendarSchedule, setCalendarSchedule] = useState([
    { day: 1, date: 'Oct 09', format: 'Reels', pillar: 'Contrarian Hook', topic: 'Stop copying dead formats in 2026', time: '18:30 IST', status: 'Ready' },
    { day: 2, date: 'Oct 10', format: 'Reels', pillar: 'Proof / Teardown', topic: 'How 1 reel drove 140 store sales', time: '19:00 IST', status: 'Draft' },
    { day: 3, date: 'Oct 11', format: 'Carousel', pillar: 'Actionable Framework', topic: 'The 5-step bio conversion grid', time: '21:00 IST', status: 'Scheduled' },
    { day: 4, date: 'Oct 12', format: 'Reels', pillar: 'Relatable Agitation', topic: 'Why you are working 10 hrs for 200 views', time: '18:30 IST', status: 'Idea' },
    { day: 5, date: 'Oct 13', format: 'Reels', pillar: 'Monetization Offer', topic: 'Automated DM keyword reveal', time: '19:30 IST', status: 'Scheduled' },
    { day: 6, date: 'Oct 14', format: 'Carousel', pillar: 'Resource Vault', topic: 'Tools the top 1% secretly use', time: '20:00 IST', status: 'Draft' },
    { day: 7, date: 'Oct 15', format: 'Reels', pillar: 'Weekly Recap', topic: 'Creator growth sprint benchmarks', time: '18:00 IST', status: 'Idea' }
  ]);
  const [isAutoFillingCalendar, setIsAutoFillingCalendar] = useState(false);

  // Competitor Tracking State
  const [competitors, setCompetitors] = useState([
    {
      handle: 'viralgrowth.ops',
      niche: 'Business & Money',
      followers: '184K',
      cadence: '1.8 Reels/day',
      topFormat: 'Whiteboard breakdown',
      avgViews: '420K',
      trend: '+12% this week'
    }
  ]);
  const [newCompetitorInput, setNewCompetitorInput] = useState('');

  // 1. Toggle Bookmark Post
  const handleToggleBookmark = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      addNotification({ title: 'Removed', message: 'Post removed from saved vault.', type: 'info' });
    } else {
      setSavedPosts([...savedPosts, postId]);
      addNotification({ title: 'Saved to Vault', message: 'Viral reference bookmarked for your script studio.', type: 'success' });
    }
  };

  // 2. Generate Full Reel Script via AI
  const handleGenerateScript = async (presetTopic = null) => {
    const topicToUse = presetTopic || scriptTopic || `How to win in ${activePage?.category || selectedNiche}`;
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'You have hit your daily AI credit limit. Upgrade to Pro for 300 daily generations.');
      return;
    }

    setIsGeneratingScript(true);
    try {
      const script = await generateFullReelScript({
        niche: selectedNiche,
        subNiche: activePage?.subNiche,
        topic: topicToUse,
        hookType: scriptHookType,
        targetGoal: scriptGoal
      });
      setGeneratedScript(script);
      addNotification({
        title: 'Script Engineered',
        message: 'Full retention-optimized Reel script generated with scenes and CTA.',
        type: 'success'
      });
    } catch (err) {
      console.warn('Script generation error:', err);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  // 3. Auto-fill Calendar with AI
  const handleAutoFillCalendar = async () => {
    // Check tier planner limits
    // Free: 7 days, Pro: 30 days
    const daysToGenerate = tier === 'free' ? 7 : 30;

    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'Upgrade to Pro to generate complete 30-day schedules.');
      return;
    }

    setIsAutoFillingCalendar(true);
    try {
      const plans = await generateAi30DayPlan({
        niche: selectedNiche,
        subNiche: activePage?.subNiche,
        daysCount: daysToGenerate
      });

      const formatted = plans.map((p, idx) => ({
        day: idx + 1,
        date: `Day ${idx + 1}`,
        format: p.format || 'Reels',
        pillar: p.pillar || 'High Retention',
        topic: p.hook || `Growth System Part ${idx + 1}`,
        time: p.timeSlot || '18:30 IST',
        status: idx === 0 ? 'Ready' : 'Scheduled'
      }));

      setCalendarSchedule(formatted);
      addNotification({
        title: 'Content Plan Auto-Filled',
        message: `Successfully populated ${daysToGenerate}-day strategic calendar using AI.`,
        type: 'success'
      });
    } catch (err) {
      console.warn('Calendar auto-fill error:', err);
    } finally {
      setIsAutoFillingCalendar(false);
    }
  };

  // 4. Add Competitor Slot (Gated by Tier)
  const handleAddCompetitor = () => {
    if (!newCompetitorInput.trim()) return;

    // Check Plan Limits: Free = 1 slot, Pro = 10 slots, Elite = Unlimited
    const currentCount = competitors.length;
    if (tier === 'free' && currentCount >= 1) {
      openUpgradeModal(
        'competitor_tracking',
        'Free plan includes 1 competitor slot. Upgrade to Pro to track up to 10 competitors simultaneously.'
      );
      return;
    }

    if (tier === 'pro' && currentCount >= 10) {
      openUpgradeModal(
        'competitor_tracking',
        'Pro plan includes 10 competitor slots. Upgrade to Elite for unlimited tracking.'
      );
      return;
    }

    const cleanHandle = newCompetitorInput.replace('@', '').trim();
    const newComp = {
      handle: cleanHandle,
      niche: selectedNiche,
      followers: '68K',
      cadence: '1.5 Reels/day',
      topFormat: 'Screen recording breakdown',
      avgViews: '280K',
      trend: '+8% this week'
    };

    setCompetitors([...competitors, newComp]);
    setNewCompetitorInput('');
    addNotification({
      title: 'Competitor Added',
      message: `Now tracking cadence and high-retention formats for @${cleanHandle}.`,
      type: 'success'
    });
  };

  // Filtered Viral Posts
  const filteredPosts = INITIAL_VIRAL_POSTS.filter(p => {
    if (selectedNiche && p.niche !== selectedNiche) return false;
    if (selectedFormat !== 'all' && p.format.toLowerCase() !== selectedFormat.toLowerCase()) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. MODULE HEADER & SUB-TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mb-2 font-medium">
            <Search className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Phase 5 &bull; Content Velocity & Viral Discovery Engine</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>Discover & Create Engine</span>
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-[10px] font-mono text-neutral-600 dark:text-neutral-300 font-normal">
              @{activePage?.handle || 'creator'} &bull; {selectedNiche}
            </span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
            Identify verified viral structures in your niche, engineer full scripts with AI, and automate your 30-day publishing calendar.
          </p>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#0C0D12] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'feed', label: 'Viral Feed & DB', icon: Flame },
            { id: 'studio', label: 'Script Studio', icon: FileText },
            { id: 'planner', label: 'Content Planner', icon: Calendar },
            { id: 'competitors', label: 'Competitors', icon: Users },
            { id: 'saved', label: 'Saved Vault', icon: Bookmark }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === 'saved' && savedPosts.length > 0 && (
                  <span className={`px-1 rounded-full text-[9px] font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-neutral-300'}`}>
                    {savedPosts.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUB-TAB: VIRAL FEED & DATABASE */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          
          {/* Filter Toolbar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-wrap items-center justify-between gap-3">
            
            {/* Niche Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Niche:</span>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="bg-neutral-50 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium rounded-xl px-3 py-1.5 text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              >
                {NICHES.map(n => (
                  <option key={n} value={n} className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Format & Time Filters */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-neutral-100 dark:bg-white/[0.04] p-0.5 rounded-lg border border-neutral-200/80 dark:border-white/[0.05]">
                {['all', 'reels', 'carousels'].map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize transition-colors cursor-pointer ${
                      selectedFormat === fmt
                        ? 'bg-white dark:bg-[#111319] text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-neutral-50 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium rounded-xl px-3 py-1.5 text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="all">All-Time Viral</option>
              </select>
            </div>

            {/* AI Generator CTA */}
            <button
              onClick={() => {
                setActiveTab('studio');
                handleGenerateScript(`Top viral format in ${selectedNiche}`);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Script from Niche &rarr;</span>
            </button>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map(post => {
              const isSaved = savedPosts.includes(post.id);

              return (
                <div
                  key={post.id}
                  className="rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-all"
                >
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 bg-neutral-900 overflow-hidden">
                    <img 
                      src={post.thumbnail} 
                      alt={post.hookText} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-semibold border border-white/10">
                        {post.format} &bull; {post.duration}
                      </span>
                      <button
                        onClick={() => handleToggleBookmark(post.id)}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
                          isSaved 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-black/60 text-white/80 hover:text-white border border-white/10'
                        }`}
                        title={isSaved ? 'Saved in Vault' : 'Save to Vault'}
                      >
                        {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {/* Bottom Video Meta */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-2">
                        <span>🔥 {post.views} Views</span>
                        <span>&bull;</span>
                        <span>{post.saves} Saves</span>
                      </div>
                      <span className="text-[10px] text-white/70 font-mono block truncate mt-0.5">
                        🎵 {post.audioTrack}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">{post.creator}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{post.retentionScore} Retention Score</span>
                      </div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white text-xs leading-relaxed line-clamp-2">
                        "{post.hookText}"
                      </h3>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {post.breakdown}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400">
                        {post.hookType}
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab('studio');
                          setScriptTopic(post.hookText);
                          handleGenerateScript(post.hookText);
                        }}
                        className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                      >
                        <span>Re-Script Hook</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 3. SUB-TAB: SCRIPTING & HOOKS STUDIO */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Panel: Generator Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>AI Reel Script Architect</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Generate high-retention 30-second scripts with proven hook pacing and CTA triggers.
                </p>
              </div>

              {/* Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 font-medium">Reel Topic / Concept</label>
                <input
                  type="text"
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                  placeholder={`e.g. The 1 fatal mistake in ${selectedNiche}...`}
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              {/* Hook Archetype Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 font-medium">Hook Archetype</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'contrarian', label: 'Contrarian Take' },
                    { id: 'negative_framing', label: 'Negative Mistake' },
                    { id: 'curiosity_gap', label: 'Curiosity Vault' },
                    { id: 'case_study', label: 'Case Study / Proof' }
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => setScriptHookType(h.id)}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        scriptHookType === h.id
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs'
                          : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Goal */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 font-medium">Conversion Objective</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'dm_leads', label: 'DM Leads' },
                    { id: 'viral_reach', label: 'Viral Views' },
                    { id: 'product_sales', label: 'Store Sales' }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setScriptGoal(g.id)}
                      className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                        scriptGoal === g.id
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                          : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Trigger Button */}
              <button
                onClick={() => handleGenerateScript()}
                disabled={isGeneratingScript}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                {isGeneratingScript ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Writing Scene-by-Scene Script...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" />
                    <span>Generate Full Reel Script (1 Credit)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Panel: Output Script Viewer (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {generatedScript ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-6">
                
                {/* Script Header */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                      {generatedScript.estimatedDuration || '30s Reel'} &bull; {scriptHookType.toUpperCase()}
                    </span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                      {generatedScript.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const fullText = `TITLE: ${generatedScript.title}\n\nHOOK:\nVisual: ${generatedScript.hook?.visualFraming}\nText: ${generatedScript.hook?.textOnScreen}\nAudio: ${generatedScript.hook?.spokenAudio}\n\nSCENES:\n${generatedScript.scenes?.map(s => `${s.time} - ${s.script}`).join('\n')}\n\nCTA: ${generatedScript.ctaTrigger?.delivery}\n\nCAPTION:\n${generatedScript.caption}`;
                        navigator.clipboard.writeText(fullText);
                        setIsCopiedScript(true);
                        setTimeout(() => setIsCopiedScript(false), 2000);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedScript ? 'Copied' : 'Copy Full Script'}</span>
                    </button>
                  </div>
                </div>

                {/* 1. Opening Hook (0-3s) */}
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                    <span>⚡ FIRST 3 SECONDS (RETENTION GATE)</span>
                    <span>0:00 - 0:03</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-neutral-800 dark:text-neutral-200">
                    <p><strong>Visual Frame:</strong> {generatedScript.hook?.visualFraming}</p>
                    <p><strong>Text on Screen:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">"{generatedScript.hook?.textOnScreen}"</span></p>
                    <p><strong>Spoken Audio:</strong> "{generatedScript.hook?.spokenAudio}"</p>
                  </div>
                </div>

                {/* 2. Scene Breakdown (3-30s) */}
                <div className="space-y-3">
                  <h4 className="font-bold text-neutral-900 dark:text-white text-xs">
                    Scene Pacing & Narrative Blueprint
                  </h4>
                  <div className="space-y-2.5">
                    {generatedScript.scenes?.map((scene, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] text-xs space-y-1">
                        <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
                          <span>Scene {idx + 1} ({scene.time})</span>
                          <span className="text-emerald-600 font-semibold">{scene.pacing}</span>
                        </div>
                        <p className="text-neutral-900 dark:text-white font-medium">"{scene.script}"</p>
                        <p className="text-[11px] text-neutral-500 italic">Visual: {scene.visual}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. CTA & DM Keyword Trigger */}
                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.06] space-y-1 text-xs">
                  <div className="font-mono text-[10px] text-neutral-400 font-semibold uppercase">Micro-Conversion Trigger</div>
                  <p className="font-bold text-neutral-900 dark:text-white">
                    Keyword: <span className="text-emerald-600 font-mono">"{generatedScript.ctaTrigger?.keyword}"</span>
                  </p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                    {generatedScript.ctaTrigger?.delivery}
                  </p>
                </div>

                {/* 4. Caption Preview */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1.5 text-xs">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase font-semibold">Ready-to-Post Caption</span>
                  <p className="text-neutral-800 dark:text-neutral-300 whitespace-pre-line leading-relaxed text-[11px]">
                    {generatedScript.caption}
                  </p>
                </div>

              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0C0D12] border border-dashed border-neutral-300 dark:border-white/[0.1] space-y-3">
                <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">No Script Generated Yet</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Select a topic on the left or click "Re-Script Hook" from any viral reference in the feed to generate a full 30-second scene breakdown.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. SUB-TAB: 30-DAY CONTENT PLANNER & CALENDAR */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          
          {/* Planner Controls Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                  {tier === 'free' ? '7-Day Sprint Planner (Free Starter)' : '30-Day Master Content Calendar (Pro)'}
                </h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                  tier === 'free' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {tier === 'free' ? '7-Day View' : 'Full 30-Day View'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Strategic release cadence with automated posting times tuned to your followers' active hours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoFillCalendar}
                disabled={isAutoFillingCalendar}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAutoFillingCalendar ? 'Auto-Filling...' : 'AI Auto-Fill Calendar'}</span>
              </button>

              {tier === 'free' && (
                <button
                  onClick={() => openUpgradeModal('content_planner', 'Unlock full 30-day automated calendar scheduling with Pro.')}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 text-neutral-700 dark:text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Unlock 30 Days &rarr;
                </button>
              )}
            </div>
          </div>

          {/* Schedule List / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {calendarSchedule.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span className="font-bold text-neutral-900 dark:text-white">Day {item.day} &bull; {item.date}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-semibold ${
                      item.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-neutral-100 text-neutral-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                      {item.format} &bull; {item.pillar}
                    </span>
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-xs leading-snug">
                      "{item.topic}"
                    </h4>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{item.time}</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setScriptTopic(item.topic);
                      handleGenerateScript(item.topic);
                    }}
                    className="text-emerald-600 hover:underline font-semibold cursor-pointer"
                  >
                    Script &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 5. SUB-TAB: COMPETITOR TRACKING */}
      {activeTab === 'competitors' && (
        <div className="space-y-6">
          
          {/* Add Competitor Toolbar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Competitor Radar & Velocity</h3>
                <span className="text-xs font-mono text-neutral-400">
                  Slots: {competitors.length} / {tier === 'free' ? '1 (Free)' : tier === 'pro' ? '10 (Pro)' : 'Unlimited (Elite)'}
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Track top accounts in your niche to detect breakthrough reel formats before they saturate.
              </p>
            </div>

            <div className="flex items-center gap-2 max-w-sm w-full">
              <input
                type="text"
                value={newCompetitorInput}
                onChange={(e) => setNewCompetitorInput(e.target.value)}
                placeholder="@competitor_handle..."
                className="flex-1 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500"
              />
              <button
                onClick={handleAddCompetitor}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Track</span>
              </button>
            </div>
          </div>

          {/* Competitor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-white/[0.05] border border-emerald-200 dark:border-white/[0.08] flex items-center justify-center font-bold text-xs text-emerald-800 dark:text-white">
                      @{comp.handle.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-xs">@{comp.handle}</h4>
                      <p className="text-[10px] text-neutral-400 font-mono">{comp.niche}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 font-semibold">{comp.trend}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05]">
                    <div className="text-[10px] text-neutral-400 font-mono">Followers</div>
                    <div className="font-bold text-neutral-900 dark:text-white font-mono mt-0.5">{comp.followers}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05]">
                    <div className="text-[10px] text-neutral-400 font-mono">Cadence</div>
                    <div className="font-bold text-neutral-900 dark:text-white font-mono mt-0.5">{comp.cadence}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05]">
                    <div className="text-[10px] text-neutral-400 font-mono">Avg Views</div>
                    <div className="font-bold text-neutral-900 dark:text-white font-mono mt-0.5">{comp.avgViews}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold block">Winning Format:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{comp.topFormat}</span>
                </div>
              </div>
            ))}
          </div>

          {tier === 'free' && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Free Tier:</strong> You are currently using your 1 included competitor slot. Upgrade to Pro to track 10 competitor pages.
                </span>
              </div>
              <button
                onClick={() => openUpgradeModal('competitor_tracking', 'Upgrade to Pro to track up to 10 competitors simultaneously.')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs whitespace-nowrap cursor-pointer shadow-xs"
              >
                Upgrade to Pro (10 Slots)
              </button>
            </div>
          )}

        </div>
      )}

      {/* 6. SUB-TAB: SAVED VAULT */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Saved Viral References & Hooks</h3>
              <p className="text-xs text-neutral-500">Your personal swipe file of high-performing references ready for re-scripting.</p>
            </div>
            <span className="text-xs font-mono text-neutral-400">{savedPosts.length} Bookmarked</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_VIRAL_POSTS.filter(p => savedPosts.includes(p.id)).map(post => (
              <div key={post.id} className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                  <span className="text-emerald-600 font-bold">{post.views} Views</span>
                  <button
                    onClick={() => handleToggleBookmark(post.id)}
                    className="text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <h4 className="font-semibold text-neutral-900 dark:text-white text-xs">
                  "{post.hookText}"
                </h4>
                <div className="pt-2 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-400">{post.niche}</span>
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setScriptTopic(post.hookText);
                      handleGenerateScript(post.hookText);
                    }}
                    className="text-xs text-emerald-600 hover:underline font-semibold cursor-pointer"
                  >
                    Re-Script Now &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
