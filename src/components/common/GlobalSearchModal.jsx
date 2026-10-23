import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MessageSquare, FileText, Target, ShoppingBag, ArrowRight } from 'lucide-react';

const SEARCHABLE_ITEMS = [
  { id: 's1', type: 'ai', title: 'Viral Hook & 3-Second Retention Co-Pilot', subtitle: 'AI Assistant · Strategy Chat', module: 'assistant' },
  { id: 's2', type: 'ai', title: 'Why did my Reel about 5 AM routine flop?', subtitle: 'AI Conversation · History', module: 'assistant' },
  { id: 's3', type: 'script', title: '3 Mistakes People Make When Starting Dropshipping', subtitle: 'Reel Script · Discover & Create', module: 'discover_create' },
  { id: 's4', type: 'script', title: 'Stop Scrolling If You Want Financial Freedom in 2026', subtitle: 'Hook Template · Discover & Create', module: 'discover_create' },
  { id: 's5', type: 'competitor', title: 'Track Competitor Formats & Outlier Reels', subtitle: 'Viral Discovery · Discover & Create', module: 'discover_create' },
  { id: 's6', type: 'product', title: 'The Faceless Creator Blueprint (E-book)', subtitle: 'Store Product · ₹499 · Store & Commerce', module: 'store' },
  { id: 's7', type: 'product', title: '1-on-1 Instagram Page Audit Call', subtitle: 'Store Service · ₹1,999 · Store & Commerce', module: 'store' },
  { id: 's8', type: 'builder', title: 'Instagram Link-in-Bio Page Builder', subtitle: 'Page Builder · Bio & Theme', module: 'builder' },
  { id: 's9', type: 'home', title: 'Home Performance Trends & Analytics', subtitle: 'Home Dashboard · Overview', module: 'home' },
  { id: 's10', type: 'settings', title: 'Connected Accounts & Tier Settings', subtitle: 'Settings · Multi-Account Manager', module: 'settings' }
];

export default function GlobalSearchModal({ isOpen, onClose, onSelectModule, onNavigate, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);

  const handleSelect = onSelectModule || onNavigate;

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery || '');
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
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
      case 'ai': return <MessageSquare className="w-4 h-4 text-[#067CF9]" />;
      case 'script': return <FileText className="w-4 h-4 text-[#067CF9]" />;
      case 'competitor': return <Target className="w-4 h-4 text-[#067CF9]" />;
      case 'product': return <ShoppingBag className="w-4 h-4 text-[#067CF9]" />;
      default: return <Search className="w-4 h-4 text-[#94A3B8]" />;
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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -6 }}
          transition={{ duration: 0.16 }}
          className="relative w-full max-w-xl bg-white border border-[rgba(6,124,249,0.18)] rounded-2xl shadow-[0_12px_40px_rgba(6,124,249,0.08)] overflow-hidden z-10 text-[#0F172A]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-[#F8FAFC]">
            <Search className="w-4 h-4 text-[#067CF9] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search features, hooks, assets..."
              autoFocus
              className="flex-1 bg-transparent text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden font-medium"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="text-[#64748B] hover:text-[#0F172A] text-xs px-1.5 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white text-[10px] font-sans text-[#64748B] border border-slate-200 shadow-2xs">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="text-center py-8 text-[#94A3B8] text-xs font-sans">
                No matching results found for "{query}"
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (handleSelect) handleSelect(item.module);
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#EFF6FF] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[rgba(6,124,249,0.14)] flex items-center justify-center shrink-0">
                      {getItemIcon(item.type)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0F172A] group-hover:text-[#067CF9] transition-colors leading-tight">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-[#64748B] font-sans mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#067CF9] group-hover:translate-x-0.5 transition-all" />
                </div>
              ))
            )}
          </div>

          {/* Footer tip */}
          <div className="px-3.5 py-2 border-t border-slate-100 bg-[#F8FAFC] flex items-center justify-between text-[10px] text-[#64748B] font-sans font-medium">
            <span>Use &uarr; &darr; to navigate</span>
            <span>Jump to module in 1 click</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
