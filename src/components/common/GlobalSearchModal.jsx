import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MessageSquare, FileText, Target, ShoppingBag, ArrowRight } from 'lucide-react';

const SEARCHABLE_ITEMS = [
  { id: 's1', type: 'ai', title: 'Why did my Reel about 5 AM routine flop?', subtitle: 'AI Conversation · 3 days ago', module: 'assistant' },
  { id: 's2', type: 'ai', title: 'Hook formula for luxury lifestyle theme page', subtitle: 'AI Conversation · Yesterday', module: 'assistant' },
  { id: 's3', type: 'script', title: '3 Mistakes People Make When Starting Dropshipping', subtitle: 'Reel Script · 48s estimated duration', module: 'create' },
  { id: 's4', type: 'script', title: 'Stop Scrolling If You Want Financial Freedom in 2026', subtitle: 'Hook Template · 88% retention benchmark', module: 'create' },
  { id: 's5', type: 'competitor', title: '@millionaire.mindset.daily', subtitle: 'Tracked Competitor · 420K Followers', module: 'discover' },
  { id: 's6', type: 'competitor', title: '@stoic.habits', subtitle: 'Tracked Competitor · 185K Followers', module: 'discover' },
  { id: 's7', type: 'product', title: 'The Faceless Creator Blueprint (E-book)', subtitle: 'Store Product · ₹499 · 24 sales', module: 'store' },
  { id: 's8', type: 'product', title: '1-on-1 Instagram Page Audit Call', subtitle: 'Store Service · ₹1,999 · 6 booked', module: 'store' },
];

export default function GlobalSearchModal({ isOpen, onClose, onSelectModule }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? SEARCHABLE_ITEMS
    : SEARCHABLE_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );

  const getItemIcon = (type) => {
    switch (type) {
      case 'ai': return <MessageSquare className="w-4 h-4 text-emerald-600" />;
      case 'script': return <FileText className="w-4 h-4 text-emerald-600" />;
      case 'competitor': return <Target className="w-4 h-4 text-emerald-600" />;
      case 'product': return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      default: return <Search className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -6 }}
          transition={{ duration: 0.16 }}
          className="relative w-full max-w-xl bg-white dark:bg-[#0C0D12] border border-neutral-200 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-10 text-neutral-900 dark:text-white"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E]">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conversations, scripts, competitors, products... (Cmd+K)"
              autoFocus
              className="flex-1 bg-transparent text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden font-medium"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-neutral-700 text-xs px-1.5 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-white/[0.04] text-[10px] font-mono text-neutral-500 border border-neutral-200 dark:border-white/[0.08]">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-neutral-400 text-xs font-mono">
                No matching results found for "{query}"
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelectModule) onSelectModule(item.module);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50/60 dark:hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-white/[0.03] border border-emerald-100 dark:border-white/[0.06] flex items-center justify-center shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-white transition-colors leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-700 dark:group-hover:text-white transition-colors" />
                </div>
              ))
            )}
          </div>

          {/* Footer tip */}
          <div className="px-3.5 py-2 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex items-center justify-between text-[10px] text-neutral-400 font-mono font-medium">
            <span>Use &uarr; &darr; to navigate</span>
            <span>Jump to module in 1 click</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
