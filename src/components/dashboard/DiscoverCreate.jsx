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
  Filter, 
  Plus, 
  Zap, 
  Flame, 
  BookmarkCheck,
  Video,
  FileText,
  RotateCw,
  Trash2,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { generateFullReelScript, generateAi30DayPlan } from '../../lib/aiService';

// 8 Official Niches matching Master Taxonomy
const NICHES = [
  'All Niches',
  'Business & Money',
  'Self-Improvement',
  'Health & Fitness',
  'Fashion & Beauty',
  'Cars & Automotive',
  'Travel & Lifestyle',
  'Entertainment',
  'Sports'
];

// Curated Verified Viral Database entries covering all 8 niches
const INITIAL_VIRAL_POSTS = [
  {
    id: 'post_1',
    niche: 'Business & Money',
    creator: '@creator.capital',
    views: '3.4M',
    engagement: '96%',
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
    engagement: '98%',
    saves: '210K',
    shares: '124K',
    format: 'Reels',
    retentionScore: '98%',
    hookType: 'Mistake / Pain',
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
    engagement: '93%',
    saves: '95K',
    shares: '48K',
    format: 'Reels',
    retentionScore: '93%',
    hookType: 'Curiosity',
    hookText: 'The 1 exercise ruining your rotator cuff (and what Olympic coaches do instead):',
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
    engagement: '97%',
    saves: '180K',
    shares: '160K',
    format: 'Reels',
    retentionScore: '97%',
    hookType: 'Proof / Breakdown',
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
    engagement: '91%',
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
    engagement: '94%',
    saves: '175K',
    shares: '92K',
    format: 'Reels',
    retentionScore: '94%',
    hookType: 'Curiosity',
    hookText: 'The secret Mediterranean island where digital nomads live for $600/month:',
    audioTrack: 'Summer Breeze Acoustic',
    duration: '29s',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Drone footage opening + cost breakdown table at second 12.'
  },
  {
    id: 'post_7',
    niche: 'Entertainment',
    creator: '@pop.stream',
    views: '5.1M',
    engagement: '99%',
    saves: '320K',
    shares: '215K',
    format: 'Reels',
    retentionScore: '99%',
    hookType: 'Curiosity',
    hookText: 'The psychological sound design trick Hollywood uses in every thriller trailer:',
    audioTrack: 'Sub-bass Shepards Tone',
    duration: '31s',
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Demonstrates auditory illusion live. Immediate replay trigger generates 2.4x loop rate.'
  },
  {
    id: 'post_8',
    niche: 'Sports',
    creator: '@athlete.edge',
    views: '2.4M',
    engagement: '95%',
    saves: '115K',
    shares: '64K',
    format: 'Reels',
    retentionScore: '95%',
    hookType: 'Proof / Breakdown',
    hookText: 'How Olympic sprinters shave 0.2s without running faster (stride cadence science):',
    audioTrack: 'Stadium Roar & Sub Boom',
    duration: '38s',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Slow-motion biomechanical overlay with freeze frames at foot strike.'
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

  // Tab 1: Discover Feed Filters & Search
  const [selectedNiche, setSelectedNiche] = useState('All Niches');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(['post_1', 'post_3']);

  // Tab 2: Script Studio State
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptHookType, setScriptHookType] = useState('contrarian');
  const [scriptGoal, setScriptGoal] = useState('lead_magnet'); // 'lead_magnet' | 'viral_reach' | 'storefront_sales'
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isCopiedScript, setIsCopiedScript] = useState(false);

  // Tab 3: Content Planner State
  const [calendarSchedule, setCalendarSchedule] = useState([
    { day: 1, date: 'Oct 09', format: 'Reels', pillar: 'Contrarian Hook', topic: 'Stop copying dead formats in 2026', time: '18:30 IST', status: 'Ready' },
    { day: 2, date: 'Oct 10', format: 'Reels', pillar: 'Proof / Teardown', topic: 'How 1 reel drove 140 storefront sales', time: '19:00 IST', status: 'Draft' },
    { day: 3, date: 'Oct 11', format: 'Carousel', pillar: 'Actionable Framework', topic: 'The 5-step bio conversion grid', time: '21:00 IST', status: 'Scheduled' },
    { day: 4, date: 'Oct 12', format: 'Reels', pillar: 'Relatable Agitation', topic: 'Why you are working 10 hrs for 200 views', time: '18:30 IST', status: 'Idea' },
    { day: 5, date: 'Oct 13', format: 'Reels', pillar: 'Monetization Offer', topic: 'High-Converting Bio Link Offer', time: '19:30 IST', status: 'Scheduled' },
    { day: 6, date: 'Oct 14', format: 'Carousel', pillar: 'Resource Vault', topic: 'Tools the top 1% secretly use', time: '20:00 IST', status: 'Draft' },
    { day: 7, date: 'Oct 15', format: 'Reels', pillar: 'Weekly Recap', topic: 'Creator growth sprint benchmarks', time: '18:00 IST', status: 'Idea' }
  ]);
  const [isAutoFillingCalendar, setIsAutoFillingCalendar] = useState(false);

  // Tab 4: Competitor Tracking State
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
    const topicToUse = presetTopic || scriptTopic || `How to win in ${selectedNiche === 'All Niches' ? (activePage?.category || 'Creator Growth') : selectedNiche}`;
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'You have hit your daily AI credit limit. Upgrade to Pro for 300 daily generations.');
      return;
    }

    setIsGeneratingScript(true);
    try {
      const script = await generateFullReelScript({
        niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Business & Money') : selectedNiche,
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

  // Save generated script to Content Planner
  const handleSaveScriptToPlanner = () => {
    if (!generatedScript) return;
    const newDay = calendarSchedule.length + 1;
    const hookLabelMap = {
      contrarian: 'Contrarian',
      mistake_pain: 'Mistake / Pain',
      curiosity: 'Curiosity',
      proof_breakdown: 'Proof / Breakdown'
    };
    const newPlanItem = {
      day: newDay,
      date: `Day ${newDay}`,
      format: 'Reels',
      pillar: hookLabelMap[scriptHookType] || 'Viral Hook',
      topic: generatedScript.title,
      time: '18:30 IST',
      status: 'Ready'
    };
    setCalendarSchedule([...calendarSchedule, newPlanItem]);
    addNotification({
      title: 'Saved to Planner',
      message: `"${generatedScript.title}" added to Day ${newDay} of your content calendar.`,
      type: 'success'
    });
  };

  // Copy full script to clipboard
  const handleCopyScript = () => {
    if (!generatedScript) return;
    const fullText = `TITLE: ${generatedScript.title}\n\nHOOK (0-3s):\nVisual: ${generatedScript.hook?.visualFraming}\nText: ${generatedScript.hook?.textOnScreen}\nAudio: ${generatedScript.hook?.spokenAudio}\n\nBODY (3-25s):\n${generatedScript.scenes?.map(s => `${s.time} [${s.pacing}]: ${s.script} (Visual: ${s.visual})`).join('\n')}\n\nCTA (25-30s):\n${generatedScript.ctaTrigger?.delivery || 'Check the link in bio'}\n\nCAPTION:\n${generatedScript.caption || ''}`;
    navigator.clipboard.writeText(fullText);
    setIsCopiedScript(true);
    setTimeout(() => setIsCopiedScript(false), 2000);
    addNotification({ title: 'Copied', message: 'Script copied to clipboard.', type: 'info' });
  };

  // 3. Auto-fill Calendar with AI
  const handleAutoFillCalendar = async () => {
    const daysToGenerate = tier === 'free' ? 7 : 30;
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'Upgrade to Pro to generate complete 30-day schedules.');
      return;
    }

    setIsAutoFillingCalendar(true);
    try {
      const plans = await generateAi30DayPlan({
        niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Business & Money') : selectedNiche,
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
        status: idx === 0 ? 'Ready' : idx % 3 === 0 ? 'Draft' : 'Scheduled'
      }));

      setCalendarSchedule(formatted);
      addNotification({
        title: 'Content Plan Auto-Filled',
        message: `Successfully populated ${daysToGenerate}-day strategic calendar.`,
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
      niche: selectedNiche === 'All Niches' ? 'General' : selectedNiche,
      followers: '72K',
      cadence: '1.5 Reels/day',
      topFormat: 'Screen breakdown format',
      avgViews: '290K',
      trend: '+10% this week'
    };

    setCompetitors([...competitors, newComp]);
    setNewCompetitorInput('');
    addNotification({
      title: 'Competitor Added',
      message: `Now tracking cadence and high-retention formats for @${cleanHandle}.`,
      type: 'success'
    });
  };

  // Filtered Viral Posts for Tab 1
  const filteredPosts = INITIAL_VIRAL_POSTS.filter(p => {
    if (selectedNiche !== 'All Niches' && p.niche !== selectedNiche) return false;
    if (selectedFormat !== 'all' && p.format.toLowerCase() !== selectedFormat.toLowerCase()) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchHook = p.hookText.toLowerCase().includes(q);
      const matchCreator = p.creator.toLowerCase().includes(q);
      const matchNiche = p.niche.toLowerCase().includes(q);
      if (!matchHook && !matchCreator && !matchNiche) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      
      {/* 1. TOP PANEL TITLE & TAB NAVIGATION CLEANUP (Per Section 1 Blueprint) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Content & Script Studio
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
            Discover high-retention formats, engineer AI scripts, and manage your content calendar.
          </p>
        </div>

        {/* Streamlined Segmented Navigation (5 Tabs) */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#0C0D12] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'feed', label: 'Viral Discovery', icon: Flame },
            { id: 'studio', label: 'Script Studio', icon: FileText },
            { id: 'planner', label: 'Content Planner', icon: Calendar },
            { id: 'competitors', label: 'Competitor Radar', icon: Users },
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
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300'
                  }`}>
                    {savedPosts.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: VIRAL DISCOVERY (Per Section 2 Blueprint) */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          
          {/* Filter Bar Redesign: Left (Niche & Timeframe) | Center (Segmented Format Toggle) | Right (Search Input) */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Left: Clean Dropdown Inputs for Niche and Timeframe */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="appearance-none bg-neutral-50 dark:bg-[#12131A] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium rounded-xl pl-3 pr-7 py-2 text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 cursor-pointer transition-colors"
                >
                  {NICHES.map(n => (
                    <option key={n} value={n} className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-neutral-50 dark:bg-[#12131A] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium rounded-xl pl-3 pr-7 py-2 text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 cursor-pointer transition-colors"
                >
                  <option value="24h" className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">Last 24 Hours</option>
                  <option value="7d" className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">Last 7 Days</option>
                  <option value="30d" className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">Last 30 Days</option>
                  <option value="all" className="bg-white dark:bg-[#0C0D12] text-neutral-900 dark:text-white">All-Time Viral</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Center: Segmented Toggle All | Reels | Carousels */}
            <div className="flex items-center justify-center bg-neutral-100 dark:bg-white/[0.04] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.05] self-center">
              {[
                { id: 'all', label: 'All' },
                { id: 'reels', label: 'Reels' },
                { id: 'carousels', label: 'Carousels' }
              ].map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setSelectedFormat(fmt.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedFormat === fmt.id
                      ? 'bg-white dark:bg-[#151720] text-neutral-900 dark:text-white shadow-xs font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            {/* Right: Search input field "Search viral hooks or topics..." */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search viral hooks or topics..."
                className="w-full bg-neutral-50 dark:bg-[#12131A] border border-neutral-200 dark:border-white/[0.08] text-xs rounded-xl pl-8 pr-3 py-2 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Card Grid View / Empty State Handling */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => {
                const isSaved = savedPosts.includes(post.id);

                return (
                  <div
                    key={post.id}
                    className="rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs overflow-hidden flex flex-col justify-between group hover:border-emerald-500/40 transition-all"
                  >
                    {/* Thumbnail / Preview Banner */}
                    <div className="relative h-44 bg-neutral-900 overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={post.hookText} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white font-mono text-[10px] font-semibold border border-white/10">
                          {post.format} &bull; {post.duration}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-emerald-400 font-semibold border border-white/10">
                          {post.hookType}
                        </span>
                      </div>

                      {/* Bottom Views Count | Engagement % */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-2">
                          <span>🔥 {post.views} Views</span>
                          <span>&bull;</span>
                          <span>{post.engagement} Engagement</span>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-white/70 font-mono mt-0.5">
                          <span>{post.creator}</span>
                          <span>{post.niche}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body & Actions */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white text-xs leading-relaxed line-clamp-2">
                          "{post.hookText}"
                        </h3>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                          {post.breakdown}
                        </p>
                      </div>

                      {/* Card Actions: Minimalist ghost buttons Save to Vault and Re-Script */}
                      <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleToggleBookmark(post.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isSaved
                              ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10'
                              : 'border-neutral-200/80 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          <span>{isSaved ? 'Saved' : 'Save to Vault'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('studio');
                            setScriptTopic(post.hookText);
                            handleGenerateScript(post.hookText);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Re-Script</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 3. Empty State Handling (Per Section 2 Blueprint) */
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0C0D12] border border-dashed border-neutral-200 dark:border-white/[0.08] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto text-neutral-400">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                No viral references found for this filter. Try extending the timeframe.
              </p>
              <button
                onClick={() => {
                  setSelectedNiche('All Niches');
                  setSelectedFormat('all');
                  setTimeRange('all');
                  setSearchQuery('');
                }}
                className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* 3. TAB 2: SCRIPT STUDIO (Per Section 3 Blueprint) */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Script Form Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>AI Reel Script Architect</span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Engineer retention-maximized 30s scripts with proven psychological hooks and pacing.
                </p>
              </div>

              {/* Reel Topic Input: Clean textarea input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">Reel Topic / Concept</label>
                <textarea
                  rows={3}
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                  placeholder="e.g., 3 mistakes keeping creators stuck under 10k followers..."
                  className="w-full bg-neutral-50 dark:bg-[#12131A] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Hook Archetype Selector: Clean dark pills (Contrarian, Mistake / Pain, Curiosity, Proof / Breakdown) */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">Hook Archetype</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'contrarian', label: 'Contrarian' },
                    { id: 'mistake_pain', label: 'Mistake / Pain' },
                    { id: 'curiosity', label: 'Curiosity' },
                    { id: 'proof_breakdown', label: 'Proof / Breakdown' }
                  ].map(h => (
                    <button
                      key={h.id}
                      onClick={() => setScriptHookType(h.id)}
                      className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        scriptHookType === h.id
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold shadow-xs'
                          : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-white/20'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Objective: Updated 3 Clean Objectives (Lead Magnet, Viral Reach, Storefront Sales) */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">Conversion Objective</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'lead_magnet', label: 'Lead Magnet', sub: 'Link-in-bio focus' },
                    { id: 'viral_reach', label: 'Viral Reach', sub: 'Maximize views' },
                    { id: 'storefront_sales', label: 'Storefront Sales', sub: 'Offer conversion' }
                  ].map(g => (
                    <button
                      key={g.id}
                      onClick={() => setScriptGoal(g.id)}
                      className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                        scriptGoal === g.id
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold'
                          : 'bg-neutral-50 dark:bg-white/[0.02] border-neutral-200 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="font-medium">{g.label}</div>
                      <div className="text-[9px] text-neutral-400 truncate mt-0.5">{g.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button: Generate Full Script (1 Credit) */}
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
                    <span>Generate Full Script (1 Credit)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Generated Script Workspace */}
          <div className="lg:col-span-7 space-y-4">
            {generatedScript ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-6">
                
                {/* Script Workspace Header & Action Bar: Copy Script | Save to Planner | Regenerate */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                      {generatedScript.estimatedDuration || '30s Reel'} &bull; {scriptHookType.toUpperCase()}
                    </span>
                    <h2 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                      {generatedScript.title}
                    </h2>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleCopyScript}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedScript ? 'Copied' : 'Copy Script'}</span>
                    </button>

                    <button
                      onClick={handleSaveScriptToPlanner}
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Save to Planner</span>
                    </button>

                    <button
                      onClick={() => handleGenerateScript()}
                      disabled={isGeneratingScript}
                      className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-white/[0.04] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Regenerate script"
                    >
                      <RotateCw className={`w-3.5 h-3.5 ${isGeneratingScript ? 'animate-spin' : ''}`} />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

                {/* ■ Hook (0-3s): Visual pattern interrupt + text overlay */}
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300">
                    <span>⚡ HOOK (0-3s): VISUAL PATTERN INTERRUPT</span>
                    <span>0:00 - 0:03</span>
                  </div>
                  <div className="text-xs space-y-1.5 text-neutral-800 dark:text-neutral-200">
                    <p><strong>Visual Framing:</strong> {generatedScript.hook?.visualFraming}</p>
                    <p><strong>Text on Screen:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">"{generatedScript.hook?.textOnScreen}"</span></p>
                    <p><strong>Spoken Audio:</strong> "{generatedScript.hook?.spokenAudio}"</p>
                  </div>
                </div>

                {/* ■ Body (3-25s): Pacing, scene cues, and value delivery */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-neutral-900 dark:text-white text-xs">
                      BODY (3-25s): PACING, SCENE CUES & VALUE DELIVERY
                    </h4>
                    <span className="text-[10px] font-mono text-neutral-400">Pacing Breakdown</span>
                  </div>
                  <div className="space-y-2.5">
                    {generatedScript.scenes?.map((scene, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] text-xs space-y-1.5">
                        <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400">
                          <span>Scene {idx + 1} ({scene.time})</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{scene.pacing}</span>
                        </div>
                        <p className="text-neutral-900 dark:text-white font-medium leading-relaxed">"{scene.script}"</p>
                        <p className="text-[11px] text-neutral-500 italic">Scene Cue: {scene.visual}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ■ CTA (25-30s): Clear direction to link-in-bio or comment */}
                <div className="p-4 rounded-xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.06] space-y-1 text-xs">
                  <div className="font-mono text-[10px] text-neutral-400 font-semibold uppercase">
                    CTA (25-30s): CLEAR DIRECTION TO LINK-IN-BIO OR COMMENT
                  </div>
                  <p className="text-neutral-900 dark:text-white font-medium leading-relaxed mt-1">
                    {generatedScript.ctaTrigger?.delivery || 'Tap the link in my bio to download the complete free system.'}
                  </p>
                </div>

                {/* Caption Block */}
                {generatedScript.caption && (
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1.5 text-xs">
                    <span className="font-mono text-[10px] text-neutral-400 uppercase font-semibold">Ready-to-Post Caption</span>
                    <p className="text-neutral-800 dark:text-neutral-300 whitespace-pre-line leading-relaxed text-[11px]">
                      {generatedScript.caption}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              /* Sleek, non-bloated Linear-style empty state card */
              <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#0C0D12] border border-dashed border-neutral-200 dark:border-white/[0.08] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white text-xs">
                  Script Studio Canvas Ready
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto leading-relaxed">
                  Enter your topic on the left and click "Generate Full Script", or click quick prompt below:
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  {[
                    '3 mistakes keeping creators under 10k',
                    'The quiet luxury bio-funnel framework',
                    'Why 90% of reels die in the first 3 seconds'
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => setScriptTopic(preset)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-[11px] text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. TAB 3: CONTENT PLANNER (Per Section 4 Blueprint) */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          
          {/* Planner Header Bar: Title 30-Day Content Planner | Sub-line | Right: Primary Action + Auto-Fill Calendar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                30-Day Content Planner
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Schedule release cadence tuned to peak audience active hours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoFillCalendar}
                disabled={isAutoFillingCalendar}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAutoFillingCalendar ? 'Auto-Filling...' : '+ Auto-Fill Calendar'}</span>
              </button>
            </div>
          </div>

          {/* Schedule Grid: Standardized 4 Clean Status Tags (Ready: Green outline, Scheduled: Blue outline, Draft: Yellow outline, Idea: Slate grey outline) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {calendarSchedule.map((item, idx) => {
              // Standardized clean status outline styles
              const getStatusStyle = (status) => {
                switch (status) {
                  case 'Ready':
                    return 'border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/10';
                  case 'Scheduled':
                    return 'border border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-500/10';
                  case 'Draft':
                    return 'border border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/10';
                  case 'Idea':
                  default:
                    return 'border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 bg-neutral-100/60 dark:bg-neutral-800/40';
                }
              };

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3 flex flex-col justify-between"
                >
                  {/* Header: Day Number • Date | Status Badge */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                      <span className="font-bold text-neutral-900 dark:text-white">Day {item.day} &bull; {item.date}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Content Type Tag & Card Title */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
                        {item.format} &bull; {item.pillar}
                      </span>
                      <h4 className="font-semibold text-neutral-900 dark:text-white text-xs leading-snug">
                        "{item.topic}"
                      </h4>
                    </div>
                  </div>

                  {/* Footer: Posting Time | Action link Edit Script → */}
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
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer"
                    >
                      Edit Script &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* 5. TAB 4: COMPETITOR RADAR (Per Section 5 Blueprint) */}
      {activeTab === 'competitors' && (
        <div className="space-y-6">
          
          {/* Top Row: Left Title Competitor Velocity Radar | Right Tracker: 1 of 10 Accounts Tracked */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Competitor Velocity Radar</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Track top accounts in your niche to detect breakthrough reel formats before they saturate.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">
              {competitors.length} of {tier === 'elite' ? 'Unlimited' : '10'} Accounts Tracked
            </div>
          </div>

          {/* Input Bar: Clean handle search field with Track Account button */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={newCompetitorInput}
                onChange={(e) => setNewCompetitorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                placeholder="Search handle to track (e.g., @competitor_handle)..."
                className="w-full bg-neutral-50 dark:bg-[#12131A] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-8 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track Account</span>
            </button>
          </div>

          {/* Tracked Cards Grid: [Avatar] | @username | Growth Rate % | Metrics Grid | Breakdown Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
                
                {/* Account Header: [Avatar] | @username | Growth Rate % */}
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
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20">
                    {comp.trend}
                  </span>
                </div>

                {/* Metrics Grid: Followers | Posting Cadence | Avg Views */}
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

                {/* Breakdown Tag: Top Performing Format: [Format Name] */}
                <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-semibold block">Top Performing Format:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{comp.topFormat}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 6. TAB 5: SAVED VAULT (Per Section 5 Blueprint) */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          
          {/* Header: Title Saved References & Hooks | Right Counter: X Bookmarked */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Saved References & Hooks</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Your personal swipe file of high-performing references ready for re-scripting.</p>
            </div>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 font-medium">
              {savedPosts.length} Bookmarked
            </span>
          </div>

          {/* Saved Cards Grid: Views Count, Hook Headline, Category Tag, ghost actions Re-Script | Remove (trash icon) */}
          {savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_VIRAL_POSTS.filter(p => savedPosts.includes(p.id)).map(post => (
                <div key={post.id} className="p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{post.views} Views</span>
                      <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 text-[10px]">
                        {post.niche}
                      </span>
                    </div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white text-xs leading-snug">
                      "{post.hookText}"
                    </h4>
                  </div>

                  {/* Ghost actions: Re-Script | Remove (trash icon) */}
                  <div className="pt-2.5 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove from saved vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('studio');
                        setScriptTopic(post.hookText);
                        handleGenerateScript(post.hookText);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Re-Script</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0C0D12] border border-dashed border-neutral-200 dark:border-white/[0.08] space-y-3">
              <Bookmark className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">No Saved References Yet</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
                Bookmark viral posts from the Viral Discovery tab to build your swipe file for rapid re-scripting.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
