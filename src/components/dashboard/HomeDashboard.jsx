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

export default function HomeDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { activePage } = usePage();

  const isBeginner = user?.onboardingTrack === 'beginner' || (activePage && activePage.followersNumeric === 0);

  // Getting Started Checklist State
  const [checklist, setChecklist] = useState(() => {
    if (isBeginner) {
      return [
        { id: 'c1', label: 'Select profitable niche & theme', done: true, module: 'builder' },
        { id: 'c2', label: 'Generate first 5 viral hook scripts', done: false, module: 'discover_create' },
        { id: 'c3', label: 'Set up Link-in-Bio Storefront', done: false, module: 'store' },
        { id: 'c4', label: 'Schedule initial 7-day content queue', done: false, module: 'discover_create' }
      ];
    } else {
      return [
        { id: 'c1', label: `Connect Instagram profile (@${activePage?.handle || 'creator'})`, done: true, module: 'builder' },
        { id: 'c2', label: 'Review initial AI Page Audit & gaps', done: true, module: 'builder' },
        { id: 'c3', label: 'Create first automated DM Keyword Trigger', done: false, module: 'automation' },
        { id: 'c4', label: 'List digital product in Store', done: false, module: 'store' }
      ];
    }
  });

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;

  return (
    <div className="space-y-5 max-w-6xl mx-auto pb-16">
      
      {/* 1. WHITE & GREEN HEADER & SCOPE BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/20 font-medium">
              Meta Graph Active
            </span>
            <span className="text-neutral-400 text-xs">&bull;</span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              {activePage?.category || 'Business'} &bull; {activePage?.subNiche || 'Online'}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Active account: <span className="text-neutral-800 dark:text-neutral-200 font-mono font-medium">@{activePage?.handle || "growth.mindset"}</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onNavigate('discover_create')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-neutral-400" />
            <span>Create</span>
          </button>
          
          <button
            onClick={() => onNavigate('store')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
            <span>Store</span>
          </button>

          <button
            onClick={() => onNavigate('automation')}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/[0.08] text-xs font-medium text-neutral-700 dark:text-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Bot className="w-3.5 h-3.5 text-neutral-400" />
            <span>Automations</span>
          </button>

          <button
            onClick={() => onNavigate('assistant')}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>

      {/* 2. WHITE & GREEN 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Card 1: Followers */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
            Followers
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.followersCount || "0"}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium">
              +1.2K (30d) <span className="text-neutral-400 font-sans">&bull; organic</span>
            </div>
          </div>
        </div>

        {/* Card 2: 7-Day Views */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
            Reel Views (7d)
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.views7d || "142.8K"}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium">
              +44.8% <span className="text-neutral-400 font-sans">&bull; reach</span>
            </div>
          </div>
        </div>

        {/* Card 3: 30-Day Revenue */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
            Store Revenue (30d)
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.revenue30d || "₹42,850"}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-medium">
              +32.4% <span className="text-neutral-400 font-sans">&bull; sales</span>
            </div>
          </div>
        </div>

        {/* Card 4: Engagement Rate */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
            Engagement Rate
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight font-mono">
              {activePage?.engagementRate || "4.6%"}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
              Niche avg: 2.8%
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          
          <div 
            onClick={() => onNavigate('assistant')}
            className="p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] hover:border-emerald-300 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-emerald-700 dark:text-neutral-500 uppercase mb-1 font-medium">
              Reels Retention
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
              "3 mistakes keeping you stuck in [niche]..."
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Showed 82% retention spike in your niche. Generate full script.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('automation')}
            className="p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] hover:border-emerald-300 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-emerald-700 dark:text-neutral-500 uppercase mb-1 font-medium">
              Lead Capture
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
              Set up "SCALE" keyword auto-DM
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              142 recent comments asking for details without automated replies.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('store')}
            className="p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] hover:border-emerald-300 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="text-[10px] font-mono text-emerald-700 dark:text-neutral-500 uppercase mb-1 font-medium">
              Monetization
            </div>
            <div className="text-xs font-semibold text-neutral-900 dark:text-white mb-0.5">
              Add "The Faceless Guide" to Bio
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Matches your {activePage?.subNiche || 'niche'} audience for immediate sales.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
