const fs = require('fs');
const path = require('path');

const discoverCreateContent = `import React, { useState } from 'react';
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
  ChevronDown,
  Music,
  Volume2,
  Radio,
  Layers,
  CheckCircle2,
  Compass,
  PenTool
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
    format: 'Carousels',
    retentionScore: '95%',
    hookType: 'Proof / Breakdown',
    hookText: 'How Olympic sprinters shave 0.2s without running faster (stride cadence science):',
    audioTrack: 'Stadium Roar & Sub Boom',
    duration: '8 Slides',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Slow-motion biomechanical overlay with freeze frames at foot strike.'
  }
];

// Curated Viral Audio Tracks for Discovery
const VIRAL_AUDIOS = [
  {
    id: 'audio_1',
    title: 'Dark Cinematic Ambient (Trending #1)',
    artist: '@stoic.sounds',
    uses: '412K Reels',
    genre: 'Cinematic / Phonk',
    duration: '0:34',
    growth: '+42% this week',
    badge: 'Viral Surge'
  },
  {
    id: 'audio_2',
    title: 'Ambient Lo-Fi Chill Beats #4',
    artist: '@creator.frequency',
    uses: '284K Reels',
    genre: 'Lo-Fi / Focus',
    duration: '0:28',
    growth: '+28% this week',
    badge: 'Creator Top Choice'
  },
  {
    id: 'audio_3',
    title: 'Deep Bass Drop & Sub Boom Impact',
    artist: '@bassline.audio',
    uses: '195K Reels',
    genre: 'Hook Trigger / Bass',
    duration: '0:15',
    growth: '+65% this week',
    badge: 'High Retention'
  },
  {
    id: 'audio_4',
    title: 'Luxury Motivational Strings & Piano',
    artist: '@wealth.cadence',
    uses: '320K Reels',
    genre: 'Classical / Uplifting',
    duration: '0:45',
    growth: '+18% this week',
    badge: 'Trending Audio'
  },
  {
    id: 'audio_5',
    title: 'Minimalist Tech House Groove',
    artist: '@cyber.tempo',
    uses: '164K Reels',
    genre: 'Electronic / Fast',
    duration: '0:22',
    growth: '+34% this week',
    badge: 'Fast Rise'
  },
  {
    id: 'audio_6',
    title: 'Slowed Reverberation - Midnight Drive',
    artist: '@synth.nocturne',
    uses: '512K Reels',
    genre: 'Vaporwave / Mood',
    duration: '0:30',
    growth: '+12% this week',
    badge: 'All-Time Hit'
  }
];

export default function DiscoverCreate({ onNavigate, initialTab = 'discover' }) {
  const { user, tier, aiCredits, consumeCredit } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  // Top-Level Two Master Toggles: 'discover' | 'create'
  const [mainMode, setMainMode] = useState(
    initialTab === 'studio' || initialTab === 'planner' ? 'create' : 'discover'
  );

  // Discover Section: 5 Content Filter Toggles: 'all' | 'reels' | 'carousels' | 'audios' | 'competitors'
  const [discoverFilter, setDiscoverFilter] = useState('all');
  const [selectedNiche, setSelectedNiche] = useState('All Niches');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(['post_1', 'post_3']);

  // Create Section State: Script Studio
  const [scriptTopic, setScriptTopic] = useState('');
  const [scriptHookType, setScriptHookType] = useState('contrarian');
  const [scriptGoal, setScriptGoal] = useState('lead_magnet'); // 'lead_magnet' | 'viral_reach' | 'storefront_sales'
  const [generatedScript, setGeneratedScript] = useState(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isCopiedScript, setIsCopiedScript] = useState(false);

  // Create Section State: 30-Day Content Planner
  const [calendarSchedule, setCalendarSchedule] = useState([
    { day: 1, date: 'Day 01', format: 'Reels', pillar: 'Contrarian Hook', topic: 'Stop copying dead formats in 2026', time: '18:30 IST', status: 'Ready' },
    { day: 2, date: 'Day 02', format: 'Reels', pillar: 'Proof / Teardown', topic: 'How 1 reel drove 140 storefront sales', time: '19:00 IST', status: 'Draft' },
    { day: 3, date: 'Day 03', format: 'Carousels', pillar: 'Actionable Framework', topic: 'The 5-step bio conversion grid', time: '21:00 IST', status: 'Scheduled' },
    { day: 4, date: 'Day 04', format: 'Reels', pillar: 'Relatable Agitation', topic: 'Why you are working 10 hrs for 200 views', time: '18:30 IST', status: 'Draft' },
    { day: 5, date: 'Day 05', format: 'Reels', pillar: 'Monetization Offer', topic: 'High-Converting Bio Link Offer', time: '19:30 IST', status: 'Scheduled' },
    { day: 6, date: 'Day 06', format: 'Carousels', pillar: 'Resource Vault', topic: 'Tools the top 1% secretly use', time: '20:00 IST', status: 'Draft' },
    { day: 7, date: 'Day 07', format: 'Reels', pillar: 'Weekly Recap', topic: 'Creator growth sprint benchmarks', time: '18:00 IST', status: 'Ready' }
  ]);
  const [isAutoFillingCalendar, setIsAutoFillingCalendar] = useState(false);

  // Competitor Radar State
  const [competitors, setCompetitors] = useState([
    {
      handle: 'viralgrowth.ops',
      niche: 'Business & Money',
      followers: '184K',
      cadence: '1.8 Reels/day',
      topFormat: 'Whiteboard breakdown',
      avgViews: '420K',
      trend: '+12% this week'
    },
    {
      handle: 'stoic.mindset',
      niche: 'Self-Improvement',
      followers: '310K',
      cadence: '2.0 Reels/day',
      topFormat: 'Dark aesthetic quote reels',
      avgViews: '680K',
      trend: '+24% this week'
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
      addNotification({ title: 'Saved to Vault', message: 'Viral reference bookmarked.', type: 'success' });
    }
  };

  // 2. Generate Full Reel Script via AI
  const handleGenerateScript = async (presetTopic = null) => {
    const topicToUse = presetTopic || scriptTopic || \`How to win in \${selectedNiche === 'All Niches' ? (activePage?.category || 'Creator Growth') : selectedNiche}\`;
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

  // 3. Save Generated Script to Content Planner
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
      date: \`Day \${newDay < 10 ? '0' + newDay : newDay}\`,
      format: 'Reels',
      pillar: hookLabelMap[scriptHookType] || 'Viral Hook',
      topic: generatedScript.title,
      time: '18:30 IST',
      status: 'Ready'
    };
    setCalendarSchedule([...calendarSchedule, newPlanItem]);
    addNotification({
      title: 'Added to Planner',
      message: \`"\${generatedScript.title}" added to Day \${newDay} of your content plan.\`,
      type: 'success'
    });
  };

  // 4. Auto-Fill 30-Day Plan with AI
  const handleAutoFill30Days = async () => {
    const daysToGenerate = tier === 'free' ? 7 : 30;
    if (tier === 'free' && calendarSchedule.length >= 7) {
      openUpgradeModal(
        'content_planner',
        'Free plan includes 7 planned days. Upgrade to Pro for unlimited 30-day automated calendars.'
      );
      return;
    }

    const canUse = consumeCredit(2);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'Auto-generating 30-day plan requires 2 credits.');
      return;
    }

    setIsAutoFillingCalendar(true);
    try {
      const aiSchedule = await generateAi30DayPlan({
        niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Business & Money') : selectedNiche,
        goal: scriptGoal,
        days: daysToGenerate
      });

      const formatted = aiSchedule.map((item, idx) => ({
        day: idx + 1,
        date: \`Day \${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}\`,
        format: item.format || (idx % 3 === 0 ? 'Carousels' : 'Reels'),
        pillar: item.pillar || 'High Retention Hook',
        topic: item.topic || 'Strategic audience growth concept',
        time: item.time || (idx % 2 === 0 ? '18:30 IST' : '19:00 IST'),
        status: idx === 0 ? 'Ready' : idx % 2 === 0 ? 'Scheduled' : 'Draft'
      }));

      setCalendarSchedule(formatted);
      addNotification({
        title: '30-Day Plan Engineered',
        message: \`Successfully populated \${daysToGenerate}-day strategic viral calendar.\`,
        type: 'success'
      });
    } catch (err) {
      console.warn('Calendar auto-fill error:', err);
    } finally {
      setIsAutoFillingCalendar(false);
    }
  };

  // 5. Add Competitor
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
      message: \`Now tracking cadence and high-retention formats for @\${cleanHandle}.\`,
      type: 'success'
    });
  };

  // Use hook from Discover in Script Studio
  const handleUseHookInScript = (post) => {
    setScriptTopic(post.hookText);
    setMainMode('create');
    addNotification({
      title: 'Hook Transferred',
      message: 'Hook loaded into Script Studio. Ready to engineer full script.',
      type: 'info'
    });
  };

  // Use audio in Script Studio
  const handleUseAudioInScript = (audio) => {
    setScriptTopic(\`Script matching vibe of "\${audio.title}"\`);
    setMainMode('create');
    addNotification({
      title: 'Audio Selected',
      message: \`Loaded "\${audio.title}" into Script Studio.\`,
      type: 'info'
    });
  };

  // Filtered Viral Posts
  const filteredPosts = INITIAL_VIRAL_POSTS.filter(p => {
    if (selectedNiche !== 'All Niches' && p.niche !== selectedNiche) return false;
    if (discoverFilter === 'reels' && p.format !== 'Reels') return false;
    if (discoverFilter === 'carousels' && p.format !== 'Carousels') return false;
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
      
      {/* 1. TOP HEADER & TWO MASTER TOGGLES: [ Discover | Create ] */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Discover &amp; Create
          </h1>
          <p className="text-[#64748B] text-xs mt-1 font-medium">
            Discover trending formats, viral audios, competitors, and engineer 30-day viral content calendars.
          </p>
        </div>

        {/* Master Two Toggles: [ Discover | Create ] */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-[rgba(6,124,249,0.15)] shadow-xs shrink-0">
          <button
            onClick={() => setMainMode('discover')}
            className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer \${
              mainMode === 'discover'
                ? 'bg-[#067CF9] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }\`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setMainMode('create')}
            className={\`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer \${
              mainMode === 'create'
                ? 'bg-[#067CF9] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }\`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          PANEL 1: DISCOVER
          Toggles: [ All | Reels | Carousels | Audios | Competitors ]
         ========================================================================= */}
      {mainMode === 'discover' && (
        <div className="space-y-6">
          
          {/* Sub-Filters: [ All | Reels | Carousels | Audios | Competitors ] */}
          <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 5 Content Toggles */}
            <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[rgba(6,124,249,0.12)] overflow-x-auto no-scrollbar shrink-0">
              {[
                { id: 'all', label: 'All', icon: Layers },
                { id: 'reels', label: 'Reels', icon: Video },
                { id: 'carousels', label: 'Carousels', icon: Layers },
                { id: 'audios', label: 'Audios', icon: Music },
                { id: 'competitors', label: 'Competitors', icon: Users }
              ].map(f => {
                const Icon = f.icon;
                const isActive = discoverFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setDiscoverFilter(f.id)}
                    className={\`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap \${
                      isActive
                        ? 'bg-[#067CF9] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }\`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search and Niche selector (for All, Reels, Carousels) */}
            {discoverFilter !== 'competitors' && (
              <div className="flex items-center gap-2 flex-1 max-w-lg">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={discoverFilter === 'audios' ? "Search audios, genres..." : "Search viral hooks, creators..."}
                    className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#067CF9]"
                  />
                </div>

                {discoverFilter !== 'audios' && (
                  <select
                    value={selectedNiche}
                    onChange={(e) => setSelectedNiche(e.target.value)}
                    className="bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#067CF9] cursor-pointer"
                  >
                    {NICHES.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          {/* VIEW A: VIRAL POSTS (All | Reels | Carousels) */}
          {(discoverFilter === 'all' || discoverFilter === 'reels' || discoverFilter === 'carousels') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] overflow-hidden flex flex-col justify-between hover:border-[#067CF9]/40 transition-all group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={post.thumbnail}
                      alt={post.hookText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10">
                        {post.format}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#067CF9]/80 backdrop-blur-md text-white text-[10px] font-semibold">
                        {post.retentionScore} Retention
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(post.id)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center cursor-pointer hover:bg-[#067CF9] transition-colors"
                    >
                      {savedPosts.includes(post.id) ? (
                        <BookmarkCheck className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5 text-white/80" />
                      )}
                    </button>

                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <div className="text-[10px] text-white/80 font-medium">{post.creator}</div>
                      <div className="text-xs font-bold leading-snug line-clamp-2 mt-0.5">{post.hookText}</div>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[#64748B] text-[11px]">
                        <span>Views: <strong className="text-[#0F172A] font-semibold">{post.views}</strong></span>
                        <span>Saves: <strong className="text-[#067CF9] font-semibold">{post.saves}</strong></span>
                      </div>
                      <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed">
                        {post.breakdown}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUseHookInScript(post)}
                      className="w-full py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#067CF9] text-[#067CF9] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Use Hook in Script</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW B: VIRAL AUDIOS */}
          {discoverFilter === 'audios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIRAL_AUDIOS.map(audio => (
                <div
                  key={audio.id}
                  className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-[0_2px_12px_rgba(6,124,249,0.03)] space-y-4 hover:border-[#067CF9]/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#067CF9] text-[10px] font-bold border border-[rgba(6,124,249,0.15)]">
                        {audio.badge}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{audio.growth}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] flex items-center justify-center shrink-0">
                        <Music className="w-5 h-5 text-[#067CF9]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-xs leading-snug">{audio.title}</h4>
                        <div className="text-[11px] text-[#64748B] mt-0.5">{audio.artist} &bull; {audio.genre}</div>
                      </div>
                    </div>

                    {/* Audio wave simulation bars */}
                    <div className="flex items-center gap-1 h-5 px-2 bg-[#F8FAFC] rounded-lg">
                      {[40, 70, 30, 90, 60, 45, 80, 50, 95, 40, 65, 85, 30, 70, 55, 90, 45].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: \`\${h}%\` }}
                          className="flex-1 bg-[#067CF9]/40 rounded-full"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] font-medium">
                      <span>Uses: <strong className="text-[#0F172A]">{audio.uses}</strong></span>
                      <span>Length: <strong className="text-[#0F172A]">{audio.duration}</strong></span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleUseAudioInScript(audio)}
                    className="w-full py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Use Audio in Script Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* VIEW C: COMPETITOR RADAR */}
          {discoverFilter === 'competitors' && (
            <div className="space-y-4">
              
              {/* Add Competitor Banner */}
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-[#0F172A] text-sm">Competitor Radar &amp; Format Benchmarking</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Track publishing cadence, follower velocity, and top-converting formats.</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCompetitorInput}
                    onChange={(e) => setNewCompetitorInput(e.target.value)}
                    placeholder="@competitor.handle"
                    className="bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#067CF9]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompetitor}
                    className="px-3.5 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Track Competitor</span>
                  </button>
                </div>
              </div>

              {/* Competitors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {competitors.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[rgba(6,124,249,0.12)] shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#EFF6FF] border border-[rgba(6,124,249,0.2)] text-[#067CF9] font-bold text-xs flex items-center justify-center">
                          @{comp.handle[0]?.toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0F172A]">@{comp.handle}</h4>
                          <span className="text-[10px] text-[#64748B]">{comp.niche}</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {comp.trend}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(6,124,249,0.08)] text-center text-xs">
                      <div className="p-2 rounded-xl bg-[#F8FAFC]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Followers</span>
                        <strong className="text-[#0F172A] font-bold text-xs">{comp.followers}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-[#F8FAFC]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Cadence</span>
                        <strong className="text-[#0F172A] font-bold text-xs">{comp.cadence}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-[#F8FAFC]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Avg Views</span>
                        <strong className="text-[#067CF9] font-bold text-xs">{comp.avgViews}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#64748B] pt-1">
                      Top format: <strong className="text-[#0F172A]">{comp.topFormat}</strong>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      )}

      {/* =========================================================================
          PANEL 2: CREATE
          Structure:
          A. Script Studio (Top)
          B. 30-Day Content Planner (Directly underneath)
         ========================================================================= */}
      {mainMode === 'create' && (
        <div className="space-y-6">
          
          {/* A. SCRIPT STUDIO */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-5">
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">
                AI Script Studio &amp; Scene Architecture
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                Engineer full viral reel scripts with high-retention visual hooks, body mechanisms, and conversion CTAs.
              </p>
            </div>

            {/* Inputs: Hook Type, Target Goal, Topic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="text-[#64748B] font-semibold">Hook Psychology</label>
                <select
                  value={scriptHookType}
                  onChange={(e) => setScriptHookType(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#067CF9]"
                >
                  <option value="contrarian">Contrarian (Challenge beliefs)</option>
                  <option value="mistake_pain">Mistake / Pain (Stop doing X)</option>
                  <option value="curiosity">Curiosity Loop (The secret reason...)</option>
                  <option value="proof_breakdown">Proof / Breakdown (Case study)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#64748B] font-semibold">Monetization Objective</label>
                <select
                  value={scriptGoal}
                  onChange={(e) => setScriptGoal(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#067CF9]"
                >
                  <option value="lead_magnet">Free Lead Magnet / DM Trigger</option>
                  <option value="storefront_sales">Storefront Product Direct Sale</option>
                  <option value="viral_reach">Viral Audience Expansion</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#64748B] font-semibold">Topic / Central Theme</label>
                <input
                  type="text"
                  value={scriptTopic}
                  onChange={(e) => setScriptTopic(e.target.value)}
                  placeholder="e.g. Stop wasting 5 hours making Reels"
                  className="w-full bg-[#F8FAFC] border border-[rgba(6,124,249,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#067CF9]"
                />
              </div>

            </div>

            {/* Generate Script Action Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#64748B] flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-[#067CF9]" />
                Uses 1 AI Credit &bull; Optimized for 3-Second Retention
              </span>

              <button
                type="button"
                onClick={() => handleGenerateScript()}
                disabled={isGeneratingScript}
                className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isGeneratingScript ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Engineering Script...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate AI Script</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Script Card */}
            {generatedScript && (
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.2)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#067CF9] text-[10px] font-bold border border-[rgba(6,124,249,0.2)]">
                      {generatedScript.angle || 'Viral Script'}
                    </span>
                    <h4 className="font-bold text-xs text-[#0F172A]">{generatedScript.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const fullText = \`\${generatedScript.title}\\n\\nHook: \${generatedScript.hook}\\n\\nScenes:\\n\${(generatedScript.scenes || []).map(s => s.visual + ': ' + s.audio).join('\\n')}\\n\\nCTA: \${generatedScript.cta}\`;
                        navigator.clipboard.writeText(fullText);
                        setIsCopiedScript(true);
                        setTimeout(() => setIsCopiedScript(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[rgba(6,124,249,0.2)] text-[#0F172A] text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {isCopiedScript ? <Check className="w-3 h-3 text-[#067CF9]" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopiedScript ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveScriptToPlanner}
                      className="px-2.5 py-1 rounded-lg bg-[#067CF9] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to 30-Day Planner</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.1)]">
                    <span className="text-[10px] font-bold text-[#067CF9] uppercase tracking-wider block">Opening Hook (0:00 - 0:03)</span>
                    <p className="text-xs font-semibold text-[#0F172A] mt-1">{generatedScript.hook}</p>
                  </div>

                  {generatedScript.scenes && generatedScript.scenes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Scene Breakdown</span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {generatedScript.scenes.map((sc, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.08)]">
                            <span className="text-[10px] text-[#067CF9] font-bold block">{sc.timeframe || \`Scene \${i + 1}\`}</span>
                            <div className="text-[11px] text-[#0F172A] font-semibold mt-0.5">{sc.visual}</div>
                            <div className="text-[11px] text-[#64748B] mt-1">{sc.audio}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.1)]">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">Conversion Call To Action</span>
                    <p className="text-xs font-semibold text-[#0F172A] mt-1">{generatedScript.cta}</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* B. 30-DAY CONTENT PLANNER (Directly Under Script Studio) */}
          <div className="p-6 rounded-2xl bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#0F172A] text-base">
                    30-Day Strategic Content Planner
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)] text-[10px] font-bold">
                    {calendarSchedule.length} Days Planned
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  Automated strategic roadmap alternating viral reach, retention teardowns, and storefront monetization offers.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAutoFill30Days}
                disabled={isAutoFillingCalendar}
                className="px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0568D2] text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap self-start sm:self-auto disabled:opacity-50"
              >
                {isAutoFillingCalendar ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Engineering 30-Day Plan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Auto-Fill 30-Day Plan with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Day-by-Day Strategic Schedule Table */}
            <div className="overflow-x-auto rounded-xl border border-[rgba(6,124,249,0.1)]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[rgba(6,124,249,0.1)] text-[#64748B] text-[11px]">
                    <th className="py-2.5 px-3.5 font-semibold">Day &amp; Schedule</th>
                    <th className="py-2.5 px-3 font-semibold">Format</th>
                    <th className="py-2.5 px-3 font-semibold">Strategic Pillar</th>
                    <th className="py-2.5 px-3 font-semibold">Topic &amp; Hook Angle</th>
                    <th className="py-2.5 px-3 font-semibold">Posting Time</th>
                    <th className="py-2.5 px-3.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(6,124,249,0.06)]">
                  {calendarSchedule.map((item, idx) => (
                    <tr
                      key={item.day || idx}
                      className={\`\${idx % 2 === 1 ? 'bg-[#FAFCFF]' : 'bg-white'} hover:bg-[#EFF6FF]/60 transition-colors\`}
                    >
                      <td className="py-3 px-3.5 font-bold text-[#0F172A] whitespace-nowrap">
                        {item.date}
                      </td>

                      <td className="py-3 px-3">
                        <span className={\`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold \${
                          item.format === 'Carousels'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }\`}>
                          {item.format}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[#64748B] font-medium text-[11px]">
                        {item.pillar}
                      </td>

                      <td className="py-3 px-3 font-semibold text-[#0F172A] max-w-[280px] truncate" title={item.topic}>
                        {item.topic}
                      </td>

                      <td className="py-3 px-3 text-[#64748B] text-[11px]">
                        {item.time}
                      </td>

                      <td className="py-3 px-3.5 text-right">
                        <span className={\`px-2 py-0.5 rounded-md text-[10px] font-bold \${
                          item.status === 'Ready'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : item.status === 'Scheduled'
                            ? 'bg-blue-50 text-[#067CF9] border border-blue-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }\`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
`;

const targetPath = path.join(__dirname, '..', 'src', 'components', 'dashboard', 'DiscoverCreate.jsx');
fs.writeFileSync(targetPath, discoverCreateContent, 'utf8');
console.log('Successfully wrote DiscoverCreate.jsx');
