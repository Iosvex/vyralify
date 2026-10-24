import React, { useState } from 'react';
import { 
  Play, 
  Sparkles, 
  TrendingUp, 
  Share2, 
  Eye, 
  Film, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { usePage } from '../../context/PageContext';
import ReelVideoAnalyzerModal from './ReelVideoAnalyzerModal';

export default function ReelPerformanceMatrix({ onNavigate }) {
  const { activePage } = usePage();
  const [sortBy, setSortBy] = useState('views');
  const [analyzingReel, setAnalyzingReel] = useState(null);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);

  // Use real reels from activePage.topReels if available
  const topReels = (activePage?.topReels && Array.isArray(activePage.topReels))
    ? activePage.topReels
    : [];

  const sortedReels = [...topReels].sort((a, b) => {
    const vA = parseInt((a.views || '0').replace(/[^0-9]/g, '')) || a.viewsNumeric || 0;
    const vB = parseInt((b.views || '0').replace(/[^0-9]/g, '')) || b.viewsNumeric || 0;
    const rA = parseInt((a.retention || '0').replace(/[^0-9]/g, '')) || 0;
    const rB = parseInt((b.retention || '0').replace(/[^0-9]/g, '')) || 0;
    const sA = parseInt((a.shares || '0').replace(/[^0-9]/g, '')) || a.sharesNumeric || 0;
    const sB = parseInt((b.shares || '0').replace(/[^0-9]/g, '')) || b.sharesNumeric || 0;

    if (sortBy === 'views') return vB - vA;
    if (sortBy === 'retention') return rB - rA;
    return sB - sA;
  });

  const handleOpenAnalyzer = (reel = null) => {
    setAnalyzingReel(reel);
    setIsAnalyzerOpen(true);
  };

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-neutral-200/80 dark:border-white/[0.05]">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
              Top Performing Reels
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-medium">
              Live Content Analytics
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            Retention benchmarks, views, and AI 3-second hook analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sorter */}
          {sortedReels.length > 0 && (
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs font-mono">
              {[
                { id: 'views', label: 'Views' },
                { id: 'retention', label: 'Retention' },
                { id: 'shares', label: 'Shares' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                    sortBy === s.id 
                      ? 'bg-white dark:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold shadow-xs' 
                      : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => handleOpenAnalyzer(null)}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Analyze Any Reel</span>
          </button>
        </div>
      </div>

      {/* Reel Rows or Empty State */}
      {sortedReels.length === 0 ? (
        <div className="py-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <Film className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h4 className="font-bold text-neutral-900 dark:text-white text-xs">
              No synced reels found for @{activePage?.handle || 'creator'} yet
            </h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Connect your official Instagram account to sync recent reels, or analyze any reel concept or Instagram link instantly using our AI.
            </p>
          </div>
          <button
            onClick={() => handleOpenAnalyzer(null)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Video Analyzer</span>
          </button>
        </div>
      ) : (
        <div className="space-y-1.5">
          {sortedReels.map((reel, index) => (
            <div
              key={reel.id || index}
              className="p-2.5 sm:p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] hover:bg-neutral-100/70 dark:hover:bg-white/[0.04] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3 group"
            >
              {/* Left: Thumbnail & Hook */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-12 h-16 rounded-md overflow-hidden shrink-0 border border-neutral-200 dark:border-white/[0.08] bg-neutral-900">
                  <img 
                    src={reel.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=240&auto=format&fit=crop&q=80'} 
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

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 border border-neutral-200/70 dark:border-white/[0.06] font-medium">
                      {reel.type || 'Reel'}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">{reel.date || 'Recent'}</span>
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 line-clamp-1 leading-snug font-medium">
                    "{reel.caption || reel.title || reel.hook}"
                  </p>
                </div>
              </div>

              {/* Middle: Metrics Grid */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 shrink-0 py-1 sm:py-0 text-center font-mono">
                <div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Views</div>
                  <div className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">{reel.views || '12.4K'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Retention</div>
                  <div className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                    {typeof reel.retention === 'number' ? `${reel.retention}%` : (reel.retention || '68%')}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-400 font-semibold">Shares</div>
                  <div className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-0.5">{reel.shares || '142'}</div>
                </div>
              </div>

              {/* Right: AI Analyze / Remix Action */}
              <div className="flex items-center justify-end shrink-0">
                <button
                  onClick={() => handleOpenAnalyzer(reel)}
                  className="px-3 py-1.5 rounded-lg border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-500/5 hover:bg-purple-100/70 dark:hover:bg-purple-500/10 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>AI Analyze &amp; Remix</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Reel Analyzer Modal */}
      <ReelVideoAnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        initialReel={analyzingReel}
        onDeployTrigger={(kw) => {
          if (onNavigate) onNavigate('instagram_automation');
        }}
      />
    </div>
  );
}
