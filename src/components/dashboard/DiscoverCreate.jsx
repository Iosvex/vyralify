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
    { day: 4, date: 'Oct 12', format: 'Reels', pillar: 'Relatable Agitation', topic: 'Why you are working 10 hrs for 200 views', time: '18:30 IST', status: 'Draft' },
    { day: 5, date: 'Oct 13', format: 'Reels', pillar: 'Monetization Offer', topic: 'High-Converting Bio Link Offer', time: '19:30 IST', status: 'Scheduled' },
    { day: 6, date: 'Oct 14', format: 'Carousel', pillar: 'Resource Vault', topic: 'Tools the top 1% secretly use', time: '20:00 IST', status: 'Draft' },
    { day: 7, date: 'Oct 15', format: 'Reels', pillar: 'Weekly Recap', topic: 'Creator growth sprint benchmarks', time: '18:00 IST', status: 'Ready' }
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP PANEL TITLE & TAB NAVIGATION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Content &amp; Script Studio
          </h1>
          <p className="text-[#64748B] text-xs mt-1 font-medium">
            Discover high-retention formats, engineer AI scripts, and manage your content calendar.
          </p>
        </div>

        {/* Streamlined Segmented Navigation (5 Tabs) */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-[rgba(6,124,249,0.12)] shadow-xs overflow-x-auto no-scrollbar shrink-0">
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
                    ? 'bg-[#067CF9] text-white shadow-xs font-semibold'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === 'saved' && savedPosts.length > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#EFF6FF] text-[#067CF9]'
                  }`}>
                    {savedPosts.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB 1: VIRAL DISCOVERY */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Left: Dropdowns for Niche and Timeframe */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="appearance-none bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] text-xs font-medium rounded-xl pl-3 pr-7 py-2 text-[#0F172A] focus:outline-hidden focus:border-[#067CF9] cursor-pointer transition-colors"
                >
                  {NICHES.map(n => (
                    <option key={n} value={n} className="bg-white text-[#0F172A]">
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] text-xs font-medium rounded-xl pl-3 pr-7 py-2 text-[#0F172A] focus:outline-hidden focus:border-[#067CF9] cursor-pointer transition-colors"
                >
                  <option value="24h" className="bg-white text-[#0F172A]">Last 24 Hours</option>
                  <option value="7d" className="bg-white text-[#0F172A]">Last 7 Days</option>
                  <option value="30d" className="bg-white text-[#0F172A]">Last 30 Days</option>
                  <option value="all" className="bg-white text-[#0F172A]">All-Time Viral</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Center: Segmented Toggle All | Reels | Carousels */}
            <div className="flex items-center justify-center bg-[#F8FAFC] p-1 rounded-xl border border-[rgba(6,124,249,0.12)] self-center">
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
                      ? 'bg-white text-[#067CF9] shadow-xs font-bold border border-[rgba(6,124,249,0.12)]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            {/* Right: Search input field */}
            <div className="relative min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search viral hooks or topics..."
                className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] text-xs rounded-xl pl-8 pr-3 py-2 text-[#0F172A] placeholder-neutral-400 focus:outline-hidden focus:border-[#067CF9] transition-colors"
              />
            </div>
          </div>

          {/* Card Grid View */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map(post => {
                const isSaved = savedPosts.includes(post.id);

                return (
                  <div
                    key={post.id}
                    className="rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] overflow-hidden flex flex-col justify-between group hover:border-[#067CF9]/40 transition-all"
                  >
                    {/* Thumbnail Banner */}
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
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[#7DD3FC] font-semibold border border-white/10">
                          {post.hookType}
                        </span>
                      </div>

                      {/* Bottom Views Count */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <div className="text-[11px] font-mono text-[#7DD3FC] font-semibold flex items-center gap-2">
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
                        <h3 className="font-semibold text-[#0F172A] text-xs leading-relaxed line-clamp-2">
                          "{post.hookText}"
                        </h3>
                        <p className="text-[11px] text-[#64748B] mt-2 line-clamp-2 leading-relaxed">
                          {post.breakdown}
                        </p>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleToggleBookmark(post.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isSaved
                              ? 'border-[#067CF9]/40 text-[#067CF9] bg-[#EFF6FF]'
                              : 'border-neutral-200 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
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
                          className="px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.3)] text-[#067CF9] hover:bg-[#EFF6FF] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
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
            <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-[rgba(6,124,249,0.2)] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-[#0F172A]">
                No viral references found for this filter. Try extending the timeframe.
              </p>
              <button
                onClick={() => {
                  setSelectedNiche('All Niches');
                  setSelectedFormat('all');
                  setTimeRange('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#067CF9] hover:underline font-semibold cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* 3. TAB 2: SCRIPT STUDIO */}
      {activeTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Script Form Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
              <div>
                <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#067CF9]" />
                  <span>AI Reel Script Architect</span>
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Engineer retention-maximized 30s scripts with proven psychological hooks and pacing.
                </p>
              </div>

              {/* Reel Topic Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B] font-medium">Reel Topic / Concept</label>
                <textarea
                  rows={3}
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                  placeholder="e.g., 3 mistakes keeping creators stuck under 10k followers..."
                  className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-neutral-400 focus:outline-hidden focus:border-[#067CF9] transition-colors resize-none"
                />
              </div>

              {/* Hook Archetype Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B] font-medium">Hook Archetype</label>
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
                          ? 'bg-[#EFF6FF] border-[#067CF9] text-[#067CF9] font-bold shadow-xs'
                          : 'bg-[#F8FAFC] border-neutral-200 text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conversion Objective */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#64748B] font-medium">Conversion Objective</label>
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
                          ? 'bg-[#EFF6FF] border-[#067CF9] text-[#067CF9] font-bold shadow-xs'
                          : 'bg-[#F8FAFC] border-neutral-200 text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <div className="font-semibold">{g.label}</div>
                      <div className="text-[9px] text-[#94A3B8] truncate mt-0.5">{g.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleGenerateScript()}
                disabled={isGeneratingScript}
                className="w-full py-2.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
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
              <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-6">
                
                {/* Header: Title • Duration • Word Count | Right Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(6,124,249,0.08)] gap-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">{generatedScript.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#64748B] mt-0.5">
                      <span>30s Reel</span>
                      <span>&bull;</span>
                      <span>~135 Words</span>
                      <span>&bull;</span>
                      <span className="text-[#067CF9] font-semibold">{scriptGoal.toUpperCase()} FOCUS</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyScript}
                      className="px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.2)] text-[#0F172A] hover:bg-[#EFF6FF] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopiedScript ? <Check className="w-3.5 h-3.5 text-[#067CF9]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedScript ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleSaveScriptToPlanner}
                      className="px-3 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Send to Planner</span>
                    </button>
                  </div>
                </div>

                {/* Hook Box */}
                <div className="p-4 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#067CF9]">
                    <span>HOOK (0-3s): HIGH-RETENTION PATTERN INTERRUPT</span>
                    <span>100% RETENTION TARGET</span>
                  </div>
                  <div className="space-y-1 text-xs text-[#0F172A]">
                    <p><strong>Visual Framing:</strong> {generatedScript.hook?.visualFraming}</p>
                    <p><strong>Text on Screen:</strong> <span className="font-mono text-[#067CF9] font-bold">"{generatedScript.hook?.textOnScreen}"</span></p>
                    <p><strong>Spoken Audio:</strong> "{generatedScript.hook?.spokenAudio}"</p>
                  </div>
                </div>

                {/* Scene-by-Scene Breakdown */}
                <div className="space-y-3">
                  <div className="font-mono text-[10px] text-[#94A3B8] font-semibold uppercase">
                    BODY PACING (3-25s): 3-SECOND RETENTION GATES
                  </div>

                  <div className="space-y-2.5">
                    {generatedScript.scenes?.map((scene, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] flex items-start gap-3">
                        <span className="font-mono text-[10px] font-bold text-[#067CF9] bg-[#EFF6FF] px-2 py-0.5 rounded shrink-0">
                          {scene.time}
                        </span>
                        <div className="text-xs space-y-1 flex-1">
                          <p className="text-[#0F172A] font-medium leading-relaxed">
                            {scene.script}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748B]">
                            <span>B-Roll: {scene.visual}</span>
                            <span>&bull;</span>
                            <span className="text-[#067CF9] font-semibold">{scene.pacing}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Block */}
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] text-xs">
                  <div className="font-mono text-[10px] text-[#94A3B8] font-semibold uppercase">
                    CTA (25-30s): CLEAR DIRECTION TO LINK-IN-BIO OR COMMENT
                  </div>
                  <p className="text-[#0F172A] font-medium leading-relaxed mt-1">
                    {generatedScript.ctaTrigger?.delivery || 'Tap the link in my bio to download the complete free system.'}
                  </p>
                </div>

                {/* Caption Block */}
                {generatedScript.caption && (
                  <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.12)] space-y-1.5 text-xs">
                    <span className="font-mono text-[10px] text-[#94A3B8] uppercase font-semibold">Ready-to-Post Caption</span>
                    <p className="text-[#0F172A] whitespace-pre-line leading-relaxed text-[11px]">
                      {generatedScript.caption}
                    </p>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-8 text-center rounded-2xl bg-white border border-dashed border-[rgba(6,124,249,0.2)] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-xs">
                  Script Studio Canvas Ready
                </h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto leading-relaxed">
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
                      className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-neutral-200 text-[11px] text-[#0F172A] transition-colors cursor-pointer"
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

      {/* 4. TAB 3: CONTENT PLANNER (Panel 4 Blueprint: Minimalist white grid with light borders. Status pills Ready, Scheduled, Draft me sirf subtle blue ya gray outlines) */}
      {activeTab === 'planner' && (
        <div className="space-y-6">
          
          {/* Planner Header Bar */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm">
                30-Day Content Planner
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Schedule release cadence tuned to peak audience active hours.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAutoFillCalendar}
                disabled={isAutoFillingCalendar}
                className="px-3.5 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] disabled:opacity-50 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAutoFillingCalendar ? 'Auto-Filling...' : '+ Auto-Fill Calendar'}</span>
              </button>
            </div>
          </div>

          {/* Schedule Grid: Minimalist white grid with light borders and subtle outline pills (Blueprint Section 2.E) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {calendarSchedule.map((item, idx) => {
              // Status pills: subtle blue or gray outlines, no heavy fills (Blueprint Section 2.E)
              const getStatusStyle = (status) => {
                switch (status) {
                  case 'Ready':
                    return 'border border-[#067CF9]/40 text-[#067CF9] bg-[#EFF6FF]/60';
                  case 'Scheduled':
                    return 'border border-[#067CF9]/30 text-[#067CF9] bg-[#EFF6FF]/30';
                  case 'Draft':
                    return 'border border-[#64748B]/30 text-[#64748B] bg-neutral-50';
                  case 'Idea':
                  default:
                    return 'border border-neutral-200 text-[#64748B] bg-neutral-50';
                }
              };

              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-3 flex flex-col justify-between hover:border-[#067CF9]/30 transition-all"
                >
                  {/* Header: Day Number • Date | Status Badge */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                      <span className="font-bold text-[#0F172A]">Day {item.day} &bull; {item.date}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Content Type Tag & Card Title */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-[#067CF9] font-bold uppercase">
                        {item.format} &bull; {item.pillar}
                      </span>
                      <h4 className="font-semibold text-[#0F172A] text-xs leading-snug">
                        "{item.topic}"
                      </h4>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-2.5 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      <span>{item.time}</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('studio');
                        setScriptTopic(item.topic);
                        handleGenerateScript(item.topic);
                      }}
                      className="text-[#067CF9] hover:underline font-semibold cursor-pointer"
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

      {/* 5. TAB 4: COMPETITOR RADAR */}
      {activeTab === 'competitors' && (
        <div className="space-y-6">
          
          {/* Top Row */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm">Competitor Velocity Radar</h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Track top accounts in your niche to detect breakthrough reel formats before they saturate.
              </p>
            </div>
            <div className="text-xs font-mono text-[#64748B] font-medium">
              {competitors.length} of {tier === 'elite' ? 'Unlimited' : '10'} Accounts Tracked
            </div>
          </div>

          {/* Input Bar */}
          <div className="p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={newCompetitorInput}
                onChange={(e) => setNewCompetitorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
                placeholder="Search handle to track (e.g., @competitor_handle)..."
                className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-8 pr-3 py-2 text-xs text-[#0F172A] placeholder-neutral-400 focus:outline-hidden focus:border-[#067CF9]"
              />
            </div>
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track Account</span>
            </button>
          </div>

          {/* Tracked Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-4">
                
                {/* Account Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] flex items-center justify-center font-bold text-xs text-[#067CF9]">
                      @{comp.handle.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] text-xs">@{comp.handle}</h4>
                      <p className="text-[10px] text-[#94A3B8] font-mono">{comp.niche}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#067CF9] font-semibold px-2 py-0.5 rounded-md bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)]">
                    {comp.trend}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-[#F8FAFC] border border-neutral-100">
                    <div className="text-[10px] text-[#94A3B8] font-mono">Followers</div>
                    <div className="font-bold text-[#0F172A] font-mono mt-0.5">{comp.followers}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F8FAFC] border border-neutral-100">
                    <div className="text-[10px] text-[#94A3B8] font-mono">Cadence</div>
                    <div className="font-bold text-[#0F172A] font-mono mt-0.5">{comp.cadence}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#F8FAFC] border border-neutral-100">
                    <div className="text-[10px] text-[#94A3B8] font-mono">Avg Views</div>
                    <div className="font-bold text-[#0F172A] font-mono mt-0.5">{comp.avgViews}</div>
                  </div>
                </div>

                {/* Breakdown Tag */}
                <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.15)] text-xs">
                  <span className="text-[10px] font-mono text-[#067CF9] font-bold block">Top Performing Format:</span>
                  <span className="text-[#0F172A]">{comp.topFormat}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* 6. TAB 5: SAVED VAULT */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          
          {/* Header */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#0F172A] text-sm">Saved References &amp; Hooks</h3>
              <p className="text-xs text-[#64748B]">Your personal swipe file of high-performing references ready for re-scripting.</p>
            </div>
            <span className="text-xs font-mono text-[#067CF9] bg-[#EFF6FF] px-2.5 py-0.5 rounded font-semibold border border-[rgba(6,124,249,0.15)]">
              {savedPosts.length} Bookmarked
            </span>
          </div>

          {/* Saved Cards Grid */}
          {savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_VIRAL_POSTS.filter(p => savedPosts.includes(p.id)).map(post => (
                <div key={post.id} className="p-4 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-1">
                      <span className="text-[#067CF9] font-bold">{post.views} Views</span>
                      <span className="px-2 py-0.5 rounded bg-[#F8FAFC] text-[#64748B] text-[10px] border border-neutral-100">
                        {post.niche}
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#0F172A] text-xs leading-snug">
                      "{post.hookText}"
                    </h4>
                  </div>

                  {/* Actions */}
                  <div className="pt-2.5 border-t border-[rgba(6,124,249,0.08)] flex items-center justify-between">
                    <button
                      onClick={() => handleToggleBookmark(post.id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
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
                      className="px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.3)] text-[#067CF9] hover:bg-[#EFF6FF] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Re-Script</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-[rgba(6,124,249,0.2)] space-y-3">
              <Bookmark className="w-8 h-8 text-[#94A3B8] mx-auto" />
              <h3 className="font-bold text-[#0F172A] text-sm">No Saved References Yet</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Bookmark viral posts from the Viral Discovery tab to build your swipe file for rapid re-scripting.
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
