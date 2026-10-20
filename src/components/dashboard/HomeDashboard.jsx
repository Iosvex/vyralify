import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Bot, 
  ShoppingBag, 
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import AnalyticsCharts from './AnalyticsCharts';
import ReelPerformanceMatrix from './ReelPerformanceMatrix';
import PageAuditWidget from './PageAuditWidget';
import { formatCurrency } from '../../lib/utils';

export default function HomeDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { activePage } = usePage();

  const isBeginner = user?.onboardingTrack === 'beginner' || (activePage && activePage.followersNumeric === 0);


  // Dynamic personalized greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getCleanFirstName = () => {
    const raw = user?.displayName || user?.name || '';
    if (!raw) return null;
    const lower = raw.toLowerCase().trim();
    if (lower.includes('apple creator') || lower.includes('@') || lower === 'creator' || lower === 'user') {
      return null;
    }
    const first = raw.trim().split(' ')[0];
    return first || null;
  };

  const firstName = getCleanFirstName();

  // Getting Started Checklist State (Clean 4-step checklist per audit spec)
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Select niche & target audience', done: true, module: 'builder' },
    { id: 'c2', label: 'Set up Link-in-Bio Storefront', done: false, module: 'store' },
    { id: 'c3', label: 'Generate initial hook scripts', done: false, module: 'discover_create' },
    { id: 'c4', label: 'Schedule 7-day content queue', done: false, module: 'discover_create' }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-16">
      
      {/* 1. DYNAMIC PERSONALIZED GREETING HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            {getGreeting()}{firstName ? `, ${firstName}` : ''}
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            {activePage 
              ? `Here's what's happening with your ${activePage.category || 'creator'} page today.`
              : "Welcome to Vyralify. Let's get your page set up."}
          </p>
        </div>

        {/* Quick Actions Row: Create, Store, Page Setup (outline) | Ask AI (THE ONE solid green button per 1.6 & 2.1) */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onNavigate('discover_create')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-400" />
            <span>Create</span>
          </button>
          
          <button
            onClick={() => onNavigate('store')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
            <span>Store</span>
          </button>

          <button
            onClick={() => onNavigate('builder')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-semibold text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>Page Setup</span>
          </button>

          <button
            onClick={() => onNavigate('assistant')}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* 2. CORE METRICS SUMMARY CARDS (KPI BAR per 2.2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Followers */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium">
            Followers
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.followersCount && activePage.followersCount !== '0' ? activePage.followersCount : (activePage ? '14.2K' : '0')}
            </div>
            {!activePage || activePage.followersCount === '0' ? (
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                No data yet &mdash; connect a page to see this.
              </div>
            ) : (
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>+1.2K this month &bull; organic</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: 7-Day Reel Views */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium">
            Reel Views (7D)
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.views7d || (activePage ? "142.8K" : "0")}
            </div>
            {!activePage ? (
              <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                No data yet &mdash; connect a page to see this.
              </div>
            ) : (
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-500" />
                <span>+44.8% vs last week</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Store Revenue (30D) */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium">
            Store Revenue (30D)
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {formatCurrency(activePage?.revenue30dNumeric || 42850, user?.currency || 'INR')}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>+32.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4: Engagement Rate */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium">
            Engagement Rate
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.engagementRate || "4.6%"}
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              Niche average: 2.8%
            </div>
          </div>
        </div>

      </div>

      {/* 3. ALGORITHMIC GROWTH CHARTS */}
      <AnalyticsCharts activePageHandle={activePage?.handle || 'growth.mindset'} />

      {/* 4. REEL PERFORMANCE & CONVERSION MATRIX */}
      <ReelPerformanceMatrix onNavigate={onNavigate} />

      {/* 5. AI PAGE AUDIT & CONVERSION HEALTH */}
      <PageAuditWidget onNavigate={onNavigate} />

      {/* 6. GETTING STARTED CHECKLIST */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-900 dark:text-white">Getting Started</span>
            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
              ({completedCount}/{checklist.length})
            </span>
          </div>

          <div className="w-24 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${(completedCount / checklist.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${
                item.done 
                  ? 'bg-transparent border-neutral-200/60 dark:border-white/[0.04] text-neutral-400' 
                  : 'bg-neutral-50/70 dark:bg-white/[0.02] border-neutral-200/80 dark:border-white/[0.06] text-neutral-800 dark:text-neutral-200'
              }`}
            >
              <div 
                onClick={() => toggleChecklistItem(item.id)}
                className="flex items-center gap-2 cursor-pointer flex-1"
              >
                {item.done ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                )}
                <span className={`text-xs ${item.done ? 'line-through text-neutral-400' : 'font-normal'}`}>
                  {item.label}
                </span>
              </div>

              {!item.done && (
                <button
                  onClick={() => onNavigate(item.module)}
                  className="text-[10px] font-mono text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5 ml-2 shrink-0 cursor-pointer font-medium"
                >
                  <span>Go &rarr;</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. AI GROWTH RECOMMENDATIONS */}
      <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-400" />
            <h3 className="text-xs font-semibold text-neutral-900 dark:text-white">
              AI Growth Recommendations
            </h3>
          </div>

          <button
            onClick={() => onNavigate('assistant')}
            className="text-[11px] font-mono text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Open Assistant &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Card 1: Reels Retention */}
          <div className="p-3.5 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                Reels Retention
              </div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white mb-1 leading-snug">
                {activePage?.category?.trim()
                  ? `"3 mistakes keeping you stuck in ${activePage.category.toLowerCase().trim()}..."`
                  : activePage?.subNiche?.trim()
                  ? `"3 mistakes keeping you stuck in ${activePage.subNiche.toLowerCase().trim()}..."`
                  : '"3 mistakes keeping creators stuck right now"'}
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Showed 82% retention spike in your niche. Generate full script.
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('assistant')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Create it &rarr;</span>
            </button>
          </div>

          {/* Card 2: Calendar & Cadence */}
          <div className="p-3.5 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                Calendar &amp; Cadence
              </div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white mb-1 leading-snug">
                Plan 7-Day Reel Schedule
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Auto-generate 7 reel ideas mapped to peak active times for your {activePage?.category || 'target'} audience.
              </p>
            </div>

            <button
              onClick={() => onNavigate('discover_create')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View in Calendar &rarr;</span>
            </button>
          </div>

          {/* Card 3: Monetization */}
          <div className="p-3.5 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                Monetization
              </div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white mb-1 leading-snug">
                Add "The Faceless Guide" to Bio
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                Matches your {activePage?.subNiche || 'creator'} audience for immediate storefront conversions.
              </p>
            </div>

            <button
              onClick={() => onNavigate('store')}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Set up in Store &rarr;</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
