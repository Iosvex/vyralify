import React, { useState, useMemo } from 'react';
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
  Pause,
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
  PenTool,
  X,
  Download,
  Film
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { generateFullReelScript, generateAi30DayPlan } from '../../lib/aiService';
import ReelVideoAnalyzerModal from './ReelVideoAnalyzerModal';

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
  },
  {
    id: 'post_9',
    niche: 'Business & Money',
    creator: '@saas.builder',
    views: '2.9M',
    engagement: '97%',
    saves: '210K',
    shares: '98K',
    format: 'Reels',
    retentionScore: '97%',
    hookType: 'Curiosity',
    hookText: 'The $0 SaaS tech stack solo founders secretly use to make $20K/month in 2026:',
    audioTrack: 'Minimalist Tech House Groove',
    duration: '26s',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Screen recording shows free tools with text arrows pointing out the exact workflow.'
  },
  {
    id: 'post_10',
    niche: 'Self-Improvement',
    creator: '@deepwork.lab',
    views: '3.1M',
    engagement: '98%',
    saves: '280K',
    shares: '140K',
    format: 'Reels',
    retentionScore: '98%',
    hookType: 'Contrarian',
    hookText: 'Why top CEOs never use to-do lists (and the 1 calendar rule they use instead):',
    audioTrack: 'Dark Cinematic Ambient (Trending #1)',
    duration: '35s',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Whiteboard demonstration of time-boxing quadrant. Massive saves from office workers.'
  },
  {
    id: 'post_11',
    niche: 'Health & Fitness',
    creator: '@core.biomechanics',
    views: '1.8M',
    engagement: '94%',
    saves: '160K',
    shares: '58K',
    format: 'Reels',
    retentionScore: '94%',
    hookType: 'Mistake / Pain',
    hookText: 'Stop doing 100 crunches. Here is the 2-minute anti-rotation drill that actually builds a bulletproof core:',
    audioTrack: 'Deep Bass Drop Impact',
    duration: '22s',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Side-by-side spine comparison graphic showing compression vs stabilization.'
  },
  {
    id: 'post_12',
    niche: 'Cars & Automotive',
    creator: '@f1.telemetry',
    views: '3.8M',
    engagement: '96%',
    saves: '190K',
    shares: '125K',
    format: 'Reels',
    retentionScore: '96%',
    hookType: 'Proof / Breakdown',
    hookText: 'Why Formula 1 telemetry engineers obsess over tire thermals rather than pure horsepower:',
    audioTrack: 'Twin Turbo Exhaust Roar',
    duration: '38s',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Infrared thermal camera footage synchronized with track speed graph.'
  },
  {
    id: 'post_13',
    niche: 'Fashion & Beauty',
    creator: '@aesthetic.rules',
    views: '2.2M',
    engagement: '93%',
    saves: '145K',
    shares: '72K',
    format: 'Carousels',
    retentionScore: '93%',
    hookType: 'Contrarian',
    hookText: 'The 3 color theory rules that instantly make a $30 outfit look like $3,000:',
    audioTrack: 'French Bistro Chill',
    duration: '6 Slides',
    thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&auto=format&fit=crop&q=80',
    breakdown: 'High-contrast split palettes with monochromatic anchor guides.'
  },
  {
    id: 'post_14',
    niche: 'Travel & Lifestyle',
    creator: '@flight.hacks',
    views: '4.5M',
    engagement: '99%',
    saves: '410K',
    shares: '230K',
    format: 'Reels',
    retentionScore: '99%',
    hookType: 'Curiosity',
    hookText: '3 hidden flight booking loopholes Google Flights doesn’t show you on mobile:',
    audioTrack: 'Ambient Lo-Fi Chill Beats #4',
    duration: '31s',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Live screen recording tapping multi-city matrix and currency conversion hack.'
  },
  {
    id: 'post_15',
    niche: 'Entertainment',
    creator: '@cinema.deconstruct',
    views: '2.7M',
    engagement: '97%',
    saves: '175K',
    shares: '88K',
    format: 'Reels',
    retentionScore: '97%',
    hookType: 'Proof / Breakdown',
    hookText: 'How Christopher Nolan directs unbearable tension in Dunkirk without using background music:',
    audioTrack: 'Sub-bass Shepards Tone',
    duration: '39s',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Audio frequency visualizer reveals rising Shepard tone disguised as ticking watch.'
  },
  {
    id: 'post_16',
    niche: 'Sports',
    creator: '@recovery.science',
    views: '1.9M',
    engagement: '94%',
    saves: '130K',
    shares: '60K',
    format: 'Reels',
    retentionScore: '94%',
    hookType: 'Curiosity',
    hookText: 'The exact 20-minute protocol NBA trainers mandate immediately after the final whistle:',
    audioTrack: 'Stadium Roar & Sub Boom',
    duration: '27s',
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80',
    breakdown: 'Chronological timeline of hydration, cold plunge, and lymphatic elevation.'
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
  const [attachedAudio, setAttachedAudio] = useState(null);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  // Video Analyzer Modal State
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [analyzerReel, setAnalyzerReel] = useState(null);

  // Create Section State: 30-Day Content Planner (Loaded dynamically from localStorage or generated)
  const [calendarSchedule, setCalendarSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem(`vyralify_planner_${activePage?.handle || 'default'}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { day: 1, date: 'Day 01', format: 'Reels', pillar: 'Contrarian Hook', topic: `Stop copying dead formats in ${activePage?.category || '2026'}`, time: '18:30 IST', status: 'Ready' },
      { day: 2, date: 'Day 02', format: 'Reels', pillar: 'Proof / Teardown', topic: `Case Study: Converting followers to storefront buyers`, time: '19:00 IST', status: 'Draft' },
      { day: 3, date: 'Day 03', format: 'Carousels', pillar: 'Actionable Framework', topic: `The 5-step bio conversion grid for @${activePage?.handle || 'creators'}`, time: '21:00 IST', status: 'Scheduled' },
      { day: 4, date: 'Day 04', format: 'Reels', pillar: 'Relatable Agitation', topic: 'Why high-effort reels get zero algorithmic reach', time: '18:30 IST', status: 'Draft' },
      { day: 5, date: 'Day 05', format: 'Reels', pillar: 'Monetization Offer', topic: 'High-Converting Digital Product Offer Drop', time: '19:30 IST', status: 'Scheduled' },
      { day: 6, date: 'Day 06', format: 'Carousels', pillar: 'Resource Vault', topic: '5 secret creator tools saving 12 hours every week', time: '20:00 IST', status: 'Draft' },
      { day: 7, date: 'Day 07', format: 'Reels', pillar: 'Weekly Recap', topic: 'Creator growth sprint retention benchmarks', time: '18:00 IST', status: 'Ready' }
    ];
  });
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
  const handleGenerateScript = async (presetTopic = null, presetHookType = null) => {
    const topicToUse = presetTopic || scriptTopic || `How to win in ${selectedNiche === 'All Niches' ? (activePage?.category || 'Creator Growth') : selectedNiche}`;
    const hookTypeToUse = presetHookType || scriptHookType;
    consumeCredit(1);

    setIsGeneratingScript(true);
    try {
      const script = await generateFullReelScript({
        niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Business & Money') : selectedNiche,
        subNiche: activePage?.subNiche,
        topic: topicToUse,
        hookType: hookTypeToUse,
        targetGoal: scriptGoal
      });
      setGeneratedScript(script);
      addNotification({
        title: 'Script Engineered',
        message: `High-retention script engineered for "${topicToUse.slice(0, 32)}...".`,
        type: 'success'
      });
    } catch (err) {
      console.warn('Script generation error:', err);
      addNotification({
        title: 'Script Generation Issue',
        message: 'Could not generate AI script. Please try again.',
        type: 'error'
      });
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
      date: `Day ${newDay < 10 ? '0' + newDay : newDay}`,
      format: 'Reels',
      pillar: hookLabelMap[scriptHookType] || 'Viral Hook',
      topic: generatedScript.title,
      time: '18:30 IST',
      status: 'Ready'
    };
    setCalendarSchedule([...calendarSchedule, newPlanItem]);
    addNotification({
      title: 'Added to Planner',
      message: `"${generatedScript.title}" added to Day ${newDay} of your content plan.`,
      type: 'success'
    });
  };

  // 4. Auto-Fill 30-Day Plan with AI (Populates all 30 days)
  const handleAutoFill30Days = async () => {
    const daysToGenerate = 30;
    consumeCredit(2);

    setIsAutoFillingCalendar(true);
    try {
      const aiSchedule = await generateAi30DayPlan({
        niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Business & Money') : selectedNiche,
        subNiche: activePage?.subNiche,
        goal: scriptGoal,
        days: daysToGenerate,
        daysCount: daysToGenerate
      });

      const formatted = aiSchedule.map((item, idx) => ({
        day: idx + 1,
        date: `Day ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}`,
        format: item.format || (idx % 3 === 0 ? 'Carousels' : 'Reels'),
        pillar: item.pillar || 'High Retention Hook',
        topic: item.topic || 'Strategic audience growth concept',
        time: item.time || (idx % 2 === 0 ? '18:30 IST' : '19:00 IST'),
        status: idx === 0 ? 'Ready' : idx % 2 === 0 ? 'Scheduled' : 'Draft'
      }));

      setCalendarSchedule(formatted);
      try {
        localStorage.setItem(`vyralify_planner_${activePage?.handle || 'default'}`, JSON.stringify(formatted));
      } catch (e) {}

      addNotification({
        title: '30-Day Plan Engineered 🚀',
        message: `Successfully populated all 30 days of strategic viral content tailored to @${activePage?.handle || 'creator'}.`,
        type: 'success'
      });
    } catch (err) {
      console.warn('Calendar auto-fill error:', err);
    } finally {
      setIsAutoFillingCalendar(false);
    }
  };

  // Export Calendar to .ICS for Google Calendar / Apple Calendar
  const handleExportIcsCalendar = () => {
    let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Vyralify//Content Calendar 2026//EN\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";
    const now = new Date();
    calendarSchedule.forEach((item, idx) => {
      const eventDate = new Date(now.getTime() + (idx * 24 * 60 * 60 * 1000));
      const year = eventDate.getFullYear();
      const month = String(eventDate.getMonth() + 1).padStart(2, '0');
      const day = String(eventDate.getDate()).padStart(2, '0');
      const dtStart = `${year}${month}${day}T130000Z`;
      const dtEnd = `${year}${month}${day}T133000Z`;

      ics += "BEGIN:VEVENT\n";
      ics += `UID:vyralify-${activePage?.handle || 'creator'}-day${idx + 1}@vyralify.in\n`;
      ics += `DTSTAMP:${year}${month}${day}T000000Z\n`;
      ics += `DTSTART:${dtStart}\n`;
      ics += `DTEND:${dtEnd}\n`;
      ics += `SUMMARY:[${item.format}] ${item.topic.replace(/[,;]/g, '')}\n`;
      ics += `DESCRIPTION:Strategic Pillar: ${item.pillar}\\nTarget Posting Time: ${item.time}\\nGenerated by Vyralify AI for @${activePage?.handle || 'creator'}\n`;
      ics += "STATUS:CONFIRMED\n";
      ics += "END:VEVENT\n";
    });
    ics += "END:VCALENDAR";

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_30day_calendar_${activePage?.handle || 'creator'}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Calendar (.ics) Exported',
      message: 'Import into Google Calendar or Apple Calendar to schedule your content roadmap.',
      type: 'success'
    });
  };

  // Export Calendar to CSV
  const handleExportCsvCalendar = () => {
    const headers = "Day,Format,Strategic Pillar,Topic,Posting Time,Status\n";
    const rows = calendarSchedule.map(i => `"${i.date}","${i.format}","${i.pillar}","${i.topic.replace(/"/g, '""')}","${i.time}","${i.status}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_30day_content_plan_${activePage?.handle || 'creator'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Content Plan (.csv) Exported',
      message: 'Downloaded 30-day spreadsheet schedule.',
      type: 'success'
    });
  };

  // 5. Add Competitor with Dynamic Intelligence
  const handleAddCompetitor = () => {
    if (!newCompetitorInput.trim()) return;

    const cleanHandle = newCompetitorInput.replace('@', '').trim();
    if (competitors.some(c => c.handle.toLowerCase() === cleanHandle.toLowerCase())) {
      addNotification({ title: 'Already Tracking', message: `@${cleanHandle} is already on your radar.`, type: 'info' });
      return;
    }

    // Dynamic stats generator based on handle hash
    const hash = cleanHandle.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const followersK = 35 + (hash % 420);
    const avgViewsK = Math.round(followersK * (1.6 + ((hash % 10) / 10)));
    const cadences = ['1.2 Reels/day', '1.8 Reels/day', '2.5 Reels/day', '1.0 Reel/day'];
    const formats = [
      'Whiteboard breakdown', 
      'Harsh pattern interrupt', 
      'Side-by-side proof comparison', 
      'Screen recording teardown', 
      'Dark aesthetic typography'
    ];

    const newComp = {
      handle: cleanHandle,
      niche: selectedNiche === 'All Niches' ? (activePage?.category || 'Creator Growth') : selectedNiche,
      followers: `${followersK}K`,
      cadence: cadences[hash % cadences.length],
      topFormat: formats[hash % formats.length],
      avgViews: `${avgViewsK}K`,
      trend: `+${8 + (hash % 22)}% this week`
    };

    setCompetitors([newComp, ...competitors]);
    setNewCompetitorInput('');
    addNotification({
      title: 'Competitor Added',
      message: `Now tracking cadence and high-retention formats for @${cleanHandle}.`,
      type: 'success'
    });
  };

  // Delete Competitor
  const handleDeleteCompetitor = (handle) => {
    setCompetitors(competitors.filter(c => c.handle !== handle));
    addNotification({
      title: 'Competitor Removed',
      message: `@${handle} removed from your radar.`,
      type: 'info'
    });
  };

  // Use hook from Discover in Script Studio (Automatically triggers generation)
  const handleUseHookInScript = async (post) => {
    const hookVal = post.hookText;
    setScriptTopic(hookVal);

    // Map hook type to scriptHookType
    const ht = (post.hookType || '').toLowerCase();
    let mappedHookType = 'contrarian';
    if (ht.includes('contrarian')) mappedHookType = 'contrarian';
    else if (ht.includes('pain') || ht.includes('mistake')) mappedHookType = 'mistake_pain';
    else if (ht.includes('curiosity')) mappedHookType = 'curiosity';
    else if (ht.includes('proof')) mappedHookType = 'proof_breakdown';

    setScriptHookType(mappedHookType);
    setMainMode('create');

    // Smooth scroll to top of Script Studio so user sees progress immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });

    addNotification({
      title: 'Hook Transferred to Script Studio',
      message: `Engineering viral script for "${hookVal.slice(0, 32)}..."`,
      type: 'info'
    });

    // Auto-generate script immediately so user doesn't have to click again!
    await handleGenerateScript(hookVal, mappedHookType);
  };

  // Use audio in Script Studio
  const handleUseAudioInScript = (audio) => {
    setAttachedAudio(audio);
    setScriptTopic(`High-retention Reel timed to "${audio.title}"`);
    setMainMode('create');
    addNotification({
      title: 'Audio Attached to Studio',
      message: `"${audio.title}" by ${audio.artist} linked to Script Studio.`,
      type: 'success'
    });
  };

  // Multi-Token Fuzzy Search Across Viral Posts
  const filteredPosts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      return INITIAL_VIRAL_POSTS.filter(p => {
        if (selectedNiche !== 'All Niches' && p.niche !== selectedNiche) return false;
        if (discoverFilter === 'reels' && p.format !== 'Reels') return false;
        if (discoverFilter === 'carousels' && p.format !== 'Carousels') return false;
        return true;
      });
    }

    const tokens = q.split(/\s+/).filter(Boolean);

    // Niche and industry synonyms
    const synonymMap = {
      car: ['automotive', 'engine', 'german', 'speed', 'telemetry', 'exhaust', 'cars'],
      cars: ['automotive', 'engine', 'german', 'speed', 'telemetry', 'exhaust', 'car'],
      porsche: ['engine', 'automotive', 'german', 'telemetry', 'car', 'cars'],
      gym: ['rotator', 'workout', 'fitness', 'exercise', 'olympic', 'biomechanic', 'health'],
      workout: ['rotator', 'gym', 'fitness', 'exercise', 'olympic', 'biomechanic', 'health'],
      fitness: ['rotator', 'gym', 'workout', 'exercise', 'health', 'biomechanic'],
      dopamine: ['lazy', 'focus', 'stoic', 'mindset', 'habits', 'discipline'],
      lazy: ['dopamine', 'focus', 'stoic', 'habits', 'architecture'],
      money: ['business', 'sales', 'course', 'courses', 'revenue', 'ticket', 'capital', 'saas'],
      business: ['sales', 'course', 'courses', 'revenue', 'ticket', 'capital', 'saas', 'money'],
      saas: ['software', 'tools', 'tech', 'stack', 'business', 'money'],
      stoic: ['dopamine', 'lazy', 'focus', 'mindset', 'self-improvement'],
      fashion: ['luxury', 'wardrobe', 'quiet', 'capsule', 'pieces', 'clothes', 'style', 'color'],
      clothes: ['fashion', 'wardrobe', 'outfit', 'luxury', 'capsule'],
      travel: ['island', 'nomad', 'mediterranean', 'odyssey', 'country', 'cost', 'flights', 'flight'],
      flight: ['flights', 'travel', 'booking', 'loopholes', 'google'],
      movie: ['hollywood', 'sound', 'thriller', 'trailer', 'entertainment', 'cinema', 'nolan'],
      cinema: ['hollywood', 'sound', 'thriller', 'trailer', 'entertainment', 'movie', 'nolan']
    };

    return INITIAL_VIRAL_POSTS.filter(p => {
      if (discoverFilter === 'reels' && p.format !== 'Reels') return false;
      if (discoverFilter === 'carousels' && p.format !== 'Carousels') return false;

      const haystack = [
        p.hookText,
        p.breakdown,
        p.creator,
        p.niche,
        p.format,
        p.hookType,
        p.audioTrack
      ].join(' ').toLowerCase();

      // Check if all search tokens match (directly or via synonyms)
      return tokens.every(token => {
        if (haystack.includes(token)) return true;
        const syns = synonymMap[token] || [];
        return syns.some(s => haystack.includes(s));
      });
    });
  }, [searchQuery, selectedNiche, discoverFilter]);

  // Filtered Viral Audios
  const filteredAudios = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return VIRAL_AUDIOS;
    const tokens = q.split(/\s+/).filter(Boolean);
    return VIRAL_AUDIOS.filter(a => {
      const haystack = `${a.title} ${a.artist} ${a.genre} ${a.badge} ${a.growth}`.toLowerCase();
      return tokens.every(t => haystack.includes(t));
    });
  }, [searchQuery]);

  // Filtered Competitors
  const filteredCompetitors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return competitors;
    return competitors.filter(c => 
      c.handle.toLowerCase().includes(q) || 
      c.niche.toLowerCase().includes(q) || 
      c.topFormat.toLowerCase().includes(q)
    );
  }, [searchQuery, competitors]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP HEADER & TWO MASTER TOGGLES: [ Discover | Create ] */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Discover &amp; Create
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-semibold border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Viral Feed
            </span>
          </div>
          <p className="text-[#64748B] text-xs mt-1 font-medium">
            Discover trending formats, viral audios, competitors, and engineer 30-day viral content calendars.
          </p>
        </div>

        {/* Master Two Toggles: [ Discover | Create ] */}
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xl p-1 rounded-xl border border-[rgba(99,102,241,0.2)] shadow-xs shrink-0">
          <button
            onClick={() => setMainMode('discover')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mainMode === 'discover'
                ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setMainMode('create')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mainMode === 'create'
                ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
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
          <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* 5 Content Toggles */}
            <div className="flex items-center gap-1 bg-white/60 p-1 rounded-xl border border-[rgba(99,102,241,0.15)] overflow-x-auto no-scrollbar shrink-0">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-gradient-to-r from-[#067CF9] to-[#6366F1] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search and Niche selector (for All, Reels, Carousels, Audios, Competitors) */}
            <div className="flex items-center gap-2 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    discoverFilter === 'audios' 
                      ? "Search audios, tempo, genre..." 
                      : discoverFilter === 'competitors'
                      ? "Search tracked competitors..."
                      : "Search viral hooks, cars, gym, money, mindset..."
                  }
                  className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl pl-8 pr-8 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#6366F1]/60"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {discoverFilter !== 'audios' && discoverFilter !== 'competitors' && (
                <select
                  value={selectedNiche}
                  onChange={(e) => setSelectedNiche(e.target.value)}
                  className="bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#6366F1]/60 cursor-pointer"
                >
                  {NICHES.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* VIEW A: VIRAL POSTS (All | Reels | Carousels) */}
          {(discoverFilter === 'all' || discoverFilter === 'reels' || discoverFilter === 'carousels') && (
            <>
              {filteredPosts.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 text-center space-y-4 max-w-md mx-auto my-6 shadow-xs">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.2)] text-[#6366F1] flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">No viral references match "{searchQuery}"</h3>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                      Want to build a high-retention script for this exact idea? Click below to engineer it in Script Studio.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const q = searchQuery;
                        setScriptTopic(q);
                        setMainMode('create');
                        handleGenerateScript(q);
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Engineer Script for "{searchQuery.slice(0, 20)}..."</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="w-full sm:w-auto px-3 py-2 rounded-xl bg-white border border-[rgba(99,102,241,0.2)] text-[#64748B] hover:text-[#0F172A] text-xs font-medium cursor-pointer"
                    >
                      Reset Filter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredPosts.map(post => (
                    <div
                      key={post.id}
                      className="rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] overflow-hidden flex flex-col justify-between transition-all group"
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
                          <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#067CF9] to-[#6366F1] backdrop-blur-md text-white text-[10px] font-semibold shadow-xs">
                            {post.retentionScore} Retention
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(post.id)}
                          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-md text-white flex items-center justify-center cursor-pointer hover:bg-[#6366F1] transition-colors"
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
                            <span>Saves: <strong className="text-[#6366F1] font-semibold">{post.saves}</strong></span>
                          </div>
                          <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed">
                            {post.breakdown}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handleUseHookInScript(post)}
                            className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.2)] hover:from-blue-100 hover:to-indigo-100 text-[#6366F1] font-semibold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <span>Use Hook</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAnalyzerReel({
                                id: post.id,
                                title: post.hookText,
                                caption: post.breakdown,
                                views: post.views,
                                retentionRate: '86%'
                              });
                              setIsAnalyzerOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-white border border-[rgba(99,102,241,0.2)] hover:bg-slate-50 text-[#0F172A] font-semibold text-[11px] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                            title="Audit Reel Retention & Breakdown"
                          >
                            <Film className="w-3 h-3 text-[#6366F1]" />
                            <span>Audit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* VIEW B: VIRAL AUDIOS */}
          {discoverFilter === 'audios' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAudios.map(audio => (
                <div
                  key={audio.id}
                  className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] space-y-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 text-[#6366F1] text-[10px] font-bold border border-[rgba(99,102,241,0.2)]">
                        {audio.badge}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{audio.growth}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setPlayingAudioId(playingAudioId === audio.id ? null : audio.id)}
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs transition-all cursor-pointer ${
                          playingAudioId === audio.id
                            ? 'bg-gradient-to-r from-[#067CF9] to-[#6366F1] text-white border-transparent shadow-md'
                            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-[rgba(99,102,241,0.2)] text-[#6366F1] hover:scale-105'
                        }`}
                        title={playingAudioId === audio.id ? "Pause Audio Preview" : "Play Audio Preview"}
                      >
                        {playingAudioId === audio.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-xs leading-snug">{audio.title}</h4>
                        <div className="text-[11px] text-[#64748B] mt-0.5">{audio.artist} &bull; {audio.genre}</div>
                      </div>
                    </div>

                    {/* Audio wave simulation bars */}
                    <div className="flex items-center gap-1 h-5 px-2 bg-white/60 rounded-lg border border-[rgba(99,102,241,0.1)]">
                      {[40, 70, 30, 90, 60, 45, 80, 50, 95, 40, 65, 85, 30, 70, 55, 90, 45].map((h, i) => (
                        <span
                          key={i}
                          style={{ 
                            height: playingAudioId === audio.id ? `${Math.min(100, h * 1.2)}%` : `${h}%` 
                          }}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            playingAudioId === audio.id 
                              ? 'bg-gradient-to-t from-[#067CF9] via-[#6366F1] to-[#8B5CF6] opacity-100 animate-pulse' 
                              : 'bg-gradient-to-t from-[#067CF9] to-[#8B5CF6] opacity-60'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#64748B] font-medium">
                      <span>Uses: <strong className="text-[#0F172A]">{audio.uses}</strong></span>
                      <span>Length: <strong className="text-[#0F172A]">{audio.duration}</strong></span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => handleUseAudioInScript(audio)}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/20"
                    >
                      <span>Use Audio in Script Studio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(`${audio.title} - ${audio.artist}`);
                        addNotification({
                          title: 'Audio Name Copied',
                          message: `Saved "${audio.title}" to clipboard. Ready to search on Instagram.`,
                          type: 'success'
                        });
                      }}
                      className="w-full py-1 rounded-lg text-[11px] text-[#64748B] hover:text-[#0F172A] hover:bg-white/80 transition-colors flex items-center justify-center gap-1 cursor-pointer font-medium"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Audio Name</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW C: COMPETITOR RADAR */}
          {discoverFilter === 'competitors' && (
            <div className="space-y-4">
              
              {/* Add Competitor Banner */}
              <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                    className="bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl px-3 py-1.5 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-hidden focus:border-[#6366F1]/60"
                  />
                  <button
                    type="button"
                    onClick={handleAddCompetitor}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white font-semibold text-xs transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-[#6366F1]/20 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Track Competitor</span>
                  </button>
                </div>
              </div>

              {/* Competitors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCompetitors.map((comp, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] space-y-3 transition-all relative group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.2)] text-[#6366F1] font-bold text-xs flex items-center justify-center">
                          @{comp.handle[0]?.toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-[#0F172A]">@{comp.handle}</h4>
                          <span className="text-[10px] text-[#64748B]">{comp.niche}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {comp.trend}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteCompetitor(comp.handle)}
                          className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-red-500 p-1 transition-opacity cursor-pointer"
                          title="Remove Competitor"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[rgba(99,102,241,0.1)] text-center text-xs">
                      <div className="p-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.1)]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Followers</span>
                        <strong className="text-[#0F172A] font-bold text-xs">{comp.followers}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.1)]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Cadence</span>
                        <strong className="text-[#0F172A] font-bold text-xs">{comp.cadence}</strong>
                      </div>
                      <div className="p-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.1)]">
                        <span className="text-[10px] text-[#64748B] block font-medium">Avg Views</span>
                        <strong className="text-[#6366F1] font-bold text-xs">{comp.avgViews}</strong>
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
          
          {/* AI Video & Reel Retention Auditor Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/70 to-purple-50/80 border border-[rgba(99,102,241,0.25)] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#067CF9] to-[#6366F1] text-white flex items-center justify-center shrink-0 shadow-md">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0F172A]">AI Reel &amp; Video Retention Auditor</h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    Gemini 2.5 Flash
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-0.5 max-w-xl leading-relaxed">
                  Upload any video file or paste an Instagram Reel link to diagnose viewer drop-off seconds, grade hook strength, and get 3 high-converting remix scripts.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAnalyzerReel(null);
                setIsAnalyzerOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] to-[#6366F1] text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/20 whitespace-nowrap self-start md:self-auto hover:opacity-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Video Auditor</span>
            </button>
          </div>

          {/* A. SCRIPT STUDIO */}
          <div className="p-6 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-5">
            <div>
              <h3 className="font-bold text-[#0F172A] text-base">
                AI Script Studio &amp; Scene Architecture
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                Engineer full viral reel scripts with high-retention visual hooks, body mechanisms, and conversion CTAs.
              </p>
            </div>

            {/* Attached Audio Notification in Script Studio */}
            {attachedAudio && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-[rgba(99,102,241,0.25)] flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-2.5 text-[#0F172A]">
                  <div className="w-7 h-7 rounded-lg bg-[#6366F1] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Music className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-[#6366F1]">Attached Trending Audio:</span>{' '}
                    <strong className="text-[#0F172A]">{attachedAudio.title}</strong> &bull; {attachedAudio.artist} ({attachedAudio.duration})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAttachedAudio(null)}
                  className="px-2 py-1 rounded-md text-xs text-[#64748B] hover:text-red-500 hover:bg-white/80 transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <X className="w-3 h-3" />
                  <span>Remove Audio</span>
                </button>
              </div>
            )}

            {/* Inputs: Hook Type, Target Goal, Topic */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="text-[#64748B] font-semibold">Hook Psychology</label>
                <select
                  value={scriptHookType}
                  onChange={(e) => setScriptHookType(e.target.value)}
                  className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#6366F1]/60"
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
                  className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] font-medium focus:outline-hidden focus:border-[#6366F1]/60"
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
                  className="w-full bg-white/60 border border-[rgba(99,102,241,0.15)] rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-hidden focus:border-[#6366F1]/60"
                />
              </div>

            </div>

            {/* Generate Script Action Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#64748B] flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
                Uses 1 AI Credit &bull; Optimized for 3-Second Retention
              </span>

              <button
                type="button"
                onClick={() => handleGenerateScript()}
                disabled={isGeneratingScript}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/20 disabled:opacity-50"
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

            {/* Live Generating Animation Box */}
            {isGeneratingScript && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border border-indigo-200/80 text-center space-y-3 animate-pulse shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#067CF9] to-[#6366F1] text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
                  <RotateCw className="w-5 h-5 animate-spin" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#0F172A]">Engineering Viral Reel Architecture...</h4>
                  <p className="text-xs text-[#64748B]">Synthesizing 3-second pattern interrupt hook, 3-scene retention framework, and bio conversion trigger.</p>
                </div>
              </div>
            )}

            {/* Generated Script Card */}
            {generatedScript && !isGeneratingScript && (
              <div className="p-5 rounded-2xl bg-white/60 border border-[rgba(99,102,241,0.2)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-blue-50 to-indigo-50 text-[#6366F1] text-[10px] font-bold border border-[rgba(99,102,241,0.2)]">
                      {generatedScript.angle || 'Viral Script'}
                    </span>
                    <h4 className="font-bold text-xs text-[#0F172A]">{generatedScript.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const hookText = typeof generatedScript.hook === 'object'
                          ? (generatedScript.hook.spokenAudio || generatedScript.hook.textOnScreen)
                          : generatedScript.hook;
                        const ctaText = typeof generatedScript.cta === 'object'
                          ? (generatedScript.cta.delivery || JSON.stringify(generatedScript.cta))
                          : generatedScript.cta;
                        const fullText = `${generatedScript.title}\n\nHook: ${hookText}\n\nScenes:\n${(generatedScript.scenes || []).map(s => s.visual + ': ' + (s.audio || s.script || '')).join('\n')}\n\nCTA: ${ctaText}`;
                        navigator.clipboard.writeText(fullText);
                        setIsCopiedScript(true);
                        setTimeout(() => setIsCopiedScript(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[rgba(99,102,241,0.2)] text-[#0F172A] text-xs font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {isCopiedScript ? <Check className="w-3 h-3 text-[#6366F1]" /> : <Copy className="w-3 h-3" />}
                      <span>{isCopiedScript ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveScriptToPlanner}
                      className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add to 30-Day Planner</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.1)]">
                    <span className="text-[10px] font-bold text-[#067CF9] uppercase tracking-wider block">Opening Hook (0:00 - 0:03)</span>
                    <p className="text-xs font-semibold text-[#0F172A] mt-1">
                      {typeof generatedScript.hook === 'object'
                        ? (generatedScript.hook.spokenAudio || generatedScript.hook.textOnScreen || String(generatedScript.hook))
                        : generatedScript.hook}
                    </p>
                    {generatedScript.visualHook && (
                      <div className="text-[11px] text-[#6366F1] mt-1.5 bg-indigo-50/70 p-2 rounded-lg border border-indigo-100 font-medium">
                        <strong>Visual Framing:</strong> {generatedScript.visualHook}
                      </div>
                    )}
                  </div>

                  {generatedScript.scenes && generatedScript.scenes.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Scene Breakdown</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {generatedScript.scenes.map((sc, i) => (
                          <div key={i} className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.08)]">
                            <span className="text-[10px] text-[#067CF9] font-bold block">{sc.timeframe || sc.time || `Scene ${i + 1}`}</span>
                            <div className="text-[11px] text-[#0F172A] font-semibold mt-0.5">{sc.visual}</div>
                            <div className="text-[11px] text-[#64748B] mt-1 leading-relaxed">{sc.audio || sc.script}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-white border border-[rgba(6,124,249,0.1)]">
                    <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider block">Conversion Call To Action</span>
                    <p className="text-xs font-semibold text-[#0F172A] mt-1">
                      {typeof generatedScript.cta === 'object'
                        ? (generatedScript.cta.delivery || JSON.stringify(generatedScript.cta))
                        : generatedScript.cta}
                    </p>
                  </div>

                  {generatedScript.caption && (
                    <div className="p-3 rounded-xl bg-white border border-[rgba(99,102,241,0.12)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#6366F1] uppercase tracking-wider block">Recommended Caption</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedScript.caption);
                            addNotification({ title: 'Caption Copied', message: 'Ready to paste into Instagram.', type: 'info' });
                          }}
                          className="text-[11px] text-[#6366F1] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Caption</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#475569] mt-1 whitespace-pre-line leading-relaxed">{generatedScript.caption}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* B. 30-DAY CONTENT PLANNER (Directly Under Script Studio) */}
          <div className="p-6 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-5">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#0F172A] text-base">
                    30-Day Strategic Content Planner
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-[#6366F1] border border-[rgba(99,102,241,0.25)] text-[10px] font-bold">
                    {calendarSchedule.length} Days Planned
                  </span>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  Automated strategic roadmap alternating viral reach, retention teardowns, and storefront monetization offers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleExportCsvCalendar}
                  className="px-3 py-2 rounded-xl bg-white/80 border border-[rgba(99,102,241,0.2)] hover:bg-slate-50 text-[#0F172A] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Export 30-day spreadsheet schedule (.csv)"
                >
                  <Download className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportIcsCalendar}
                  className="px-3 py-2 rounded-xl bg-white/80 border border-[rgba(99,102,241,0.2)] hover:bg-slate-50 text-[#0F172A] font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Sync with Google Calendar or Apple Calendar (.ics)"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#6366F1]" />
                  <span>Sync Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={handleAutoFill30Days}
                  disabled={isAutoFillingCalendar}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#6366F1]/20 whitespace-nowrap disabled:opacity-50"
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
            </div>

            {/* Day-by-Day Strategic Schedule Table */}
            <div className="overflow-x-auto rounded-xl border border-[rgba(99,102,241,0.12)]">
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
                      className={`${idx % 2 === 1 ? 'bg-[#FAFCFF]' : 'bg-white'} hover:bg-[#EFF6FF]/60 transition-colors`}
                    >
                      <td className="py-3 px-3.5 font-bold text-[#0F172A] whitespace-nowrap">
                        {item.date}
                      </td>

                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.format === 'Carousels'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
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
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          item.status === 'Ready'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : item.status === 'Scheduled'
                            ? 'bg-blue-50 text-[#067CF9] border border-blue-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
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

      {/* Reel & Video Analyzer Modal */}
      <ReelVideoAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        initialReel={analyzerReel}
        onDeployTrigger={() => onNavigate && onNavigate('instagram_automation')}
      />

    </div>
  );
}
