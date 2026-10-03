import React, { useState } from 'react';
import { 
  Play, 
  Sparkles
} from 'lucide-react';

const MOCK_REELS = [
  {
    id: 'reel_1',
    hook: "The 1 subtle habit that separates top 1% creators from the 99% (it's not posting more):",
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&auto=format&fit=crop&q=80',
    views: '248.5K',
    viewsNumeric: 248500,
    completionRate: 88,
    shares: '14.2K',
    sharesNumeric: 14200,
    dmLeads: 342,
    date: '3d ago',
    triggerWord: 'BLUEPRINT'
  },
  {
    id: 'reel_2',
    hook: "Stop copying viral accounts. Here is the reverse-engineered 3-step formula we use:",
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=240&auto=format&fit=crop&q=80',
    views: '184.2K',
    viewsNumeric: 184200,
    completionRate: 82,
    shares: '9.8K',
    sharesNumeric: 9800,
    dmLeads: 218,
    date: '6d ago',
    triggerWord: 'FORMULA'
  },
  {
    id: 'reel_3',
    hook: "Why 95% of Instagram bio links never make a single rupee (and the 2-minute fix):",
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=240&auto=format&fit=crop&q=80',
    views: '142.1K',
    viewsNumeric: 142100,
    completionRate: 79,
    shares: '7.1K',
    sharesNumeric: 7100,
    dmLeads: 184,
    date: '9d ago',
    triggerWord: 'STORE'
  },
  {
    id: 'reel_4',
    hook: "3 automated DM scripts that generated ₹42,000 in digital product sales while asleep:",
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=240&auto=format&fit=crop&q=80',
    views: '98.4K',
    viewsNumeric: 98400,
    completionRate: 75,
    shares: '5.4K',
    sharesNumeric: 5400,
    dmLeads: 142,
    date: '12d ago',
    triggerWord: 'SCRIPTS'
  },
  {
    id: 'reel_5',
    hook: "The algorithmic posting timeline you need to follow if you are starting from zero in 2026:",
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=240&auto=format&fit=crop&q=80',
    views: '84.0K',
    viewsNumeric: 84000,
    completionRate: 72,
    shares: '4.8K',
    sharesNumeric: 4800,
    dmLeads: 96,
    date: '15d ago',
    triggerWord: 'SCHEDULE'
  }
];

export default function ReelPerformanceMatrix({ onNavigate }) {
  const [sortBy, setSortBy] = useState('views');

  const sortedReels = [...MOCK_REELS].sort((a, b) => {
    if (sortBy === 'views') return b.viewsNumeric - a.viewsNumeric;
    if (sortBy === 'shares') return b.sharesNumeric - a.sharesNumeric;
    return b.dmLeads - a.dmLeads;
  });

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
      {/* Header & Sorter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-neutral-200/80 dark:border-white/[0.05]">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
            Top Performing Reels
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            Retention and direct inbound DM leads captured per post.
          </p>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs font-mono">
          <span className="text-neutral-400 px-1 text-[10px] font-semibold">Sort:</span>
          {[
            { id: 'views', label: 'Views' },
            { id: 'shares', label: 'Shares' },
            { id: 'dmLeads', label: 'DM Leads' }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSortBy(s.id)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                sortBy === s.id 
                  ? 'bg-white dark:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reel Rows */}
      <div className="space-y-1.5">
        {sortedReels.map((reel, index) => (
          <div
            key={reel.id}
            className="p-2.5 sm:p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] hover:bg-neutral-100/70 dark:hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
          >
            {/* Left: Thumbnail & Hook */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative w-12 h-16 rounded-md overflow-hidden shrink-0 border border-neutral-200 dark:border-white/[0.08] bg-neutral-900">
                <img 
                  src={reel.thumbnail} 
                  alt="Reel thumbnail" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/70 text-[8px] font-mono text-neutral-300 font-semibold">
                  #{index + 1}
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-neutral-400">{reel.date}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-white/[0.06] text-emerald-700 dark:text-neutral-300 border border-emerald-200/80 dark:border-transparent font-medium">
                    Trigger: "{reel.triggerWord}"
                  </span>
                </div>
                <p className="text-xs text-neutral-800 dark:text-neutral-200 line-clamp-1 leading-snug font-medium">
                  "{reel.hook}"
                </p>
              </div>
            </div>

            {/* Middle: Metrics Grid */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 shrink-0 py-1 sm:py-0 text-center font-mono">
              <div>
                <div className="text-[10px] text-neutral-400 font-semibold">Views</div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{reel.views}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 font-semibold">Retention</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{reel.completionRate}%</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 font-semibold">Shares</div>
                <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">{reel.shares}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 font-semibold">DM Leads</div>
                <div className="text-xs font-bold text-neutral-900 dark:text-neutral-200 mt-0.5">+{reel.dmLeads}</div>
              </div>
            </div>

            {/* Right: AI Breakdown Action */}
            <div className="flex items-center justify-end shrink-0">
              <button
                onClick={() => onNavigate('assistant')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-white/[0.08] text-[11px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
                <span>AI Remix</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
