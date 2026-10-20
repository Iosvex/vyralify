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
  ShieldCheck,
  Play,
  Clock,
  Zap,
  BarChart2,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Check,
  FileText,
  Grid,
  Link as LinkIcon
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function HomeDashboard({ onNavigate }) {
  const { user } = useAuth();
  const { activePage } = usePage();

  const [timeRange, setTimeRange] = useState('7d');
  const [sortField, setSortField] = useState('views');

  // Personalized name from user or default 'Maaz' matching Image 1
  const displayName = user?.displayName ? user.displayName.split(' ')[0] : 'Maaz';

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Getting Started Checklist State
  const [checklist, setChecklist] = useState([
    { id: 'c1', label: 'Select your niche & target audience', done: true, module: 'builder' },
    { id: 'c2', label: 'Set up your link-in-bio storefront', done: true, module: 'store' },
    { id: 'c3', label: 'Generate your first reel script', done: false, module: 'discover_create' },
    { id: 'c4', label: 'Schedule a 7-day content plan', done: false, module: 'discover_create' }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const completedCount = checklist.filter(c => c.done).length;

  // Chart data for 7-Day Performance Trends
  const trendBars = [
    { label: 'Oct 14', heightPercent: 28, value: '24.5K' },
    { label: 'Oct 15', heightPercent: 44, value: '41.2K' },
    { label: 'Oct 16', heightPercent: 68, value: '64.8K' },
    { label: 'Oct 17', heightPercent: 42, value: '39.0K' },
    { label: 'Oct 18', heightPercent: 74, value: '72.5K' },
    { label: 'Oct 19', heightPercent: 56, value: '54.2K' },
    { label: 'Oct 20', heightPercent: 90, value: '88.4K' }
  ];

  // Top Performing Reels List (matching Image 1 exactly)
  const topReels = [
    {
      id: 1,
      title: 'This Niche is Exploding 🚀',
      date: 'Oct 18, 2024',
      caption: '3 underrated niches...',
      views: '2.4M',
      retention: '72%',
      shares: '24.1K',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: 'Faceless Page Strategy',
      date: 'Oct 16, 2024',
      caption: 'How I grew to 100K...',
      views: '1.8M',
      retention: '68%',
      shares: '18.4K',
      thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: '₹0 to $10K in 30 Days',
      date: 'Oct 14, 2024',
      caption: 'The exact blueprint...',
      views: '1.2M',
      retention: '65%',
      shares: '12.1K',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Make Better Reels (3 Tips)',
      date: 'Oct 12, 2024',
      caption: 'Stop making these...',
      views: '842K',
      retention: '62%',
      shares: '8.9K',
      thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      title: 'Best AI Tools for Creators',
      date: 'Oct 10, 2024',
      caption: 'These 5 tools saved...',
      views: '612K',
      retention: '58%',
      shares: '6.4K',
      thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      
      {/* 1. GREETING HEADER (Per Image 1: "Good morning, Maaz" Solid Obsidian Navy #0F172A) */}
      <div className="pb-1">
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {getGreeting()}, {displayName}
        </h1>
        <p className="text-sm text-[#64748B] mt-1 font-medium">
          Here is your growth overview for today.
        </p>
      </div>

      {/* 2. TOP 4 KPI CARDS WITH SUBTLE ELECTRIC BLUE SPARKLINES (Per Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Followers */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Followers</span>
                <span className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {activePage?.followersCount && activePage.followersCount !== '0' ? activePage.followersCount : '125,430'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#10B981] flex items-center justify-end gap-0.5">
                <span>&uarr; 12.4%</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium block">vs last 7 days</span>
            </div>
          </div>

          {/* Electric Blue Wave Sparkline */}
          <div className="mt-3 h-8 w-full overflow-hidden">
            <svg viewBox="0 0 160 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-spark-1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#067CF9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#067CF9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 30 Q 20 28, 40 20 T 80 18 T 120 12 T 160 8 L 160 40 L 0 40 Z" fill="url(#grad-spark-1)" />
              <path d="M 0 30 Q 20 28, 40 20 T 80 18 T 120 12 T 160 8" fill="none" stroke="#067CF9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 2: 7-Day Reel Views */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">7-Day Reel Views</span>
                <span className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {activePage?.views7d || '3,827,410'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#10B981] flex items-center justify-end gap-0.5">
                <span>&uarr; 18.6%</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium block">vs last 7 days</span>
            </div>
          </div>

          <div className="mt-3 h-8 w-full overflow-hidden">
            <svg viewBox="0 0 160 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-spark-2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#067CF9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#067CF9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 32 Q 25 35, 50 25 T 100 15 T 130 18 T 160 5 L 160 40 L 0 40 Z" fill="url(#grad-spark-2)" />
              <path d="M 0 32 Q 25 35, 50 25 T 100 15 T 130 18 T 160 5" fill="none" stroke="#067CF9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 3: Store Revenue */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center font-bold text-lg shrink-0">
                ₹
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Store Revenue</span>
                <span className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
                  ₹42,850
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#10B981] flex items-center justify-end gap-0.5">
                <span>&uarr; 32.4%</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium block">vs last 7 days</span>
            </div>
          </div>

          <div className="mt-3 h-8 w-full overflow-hidden">
            <svg viewBox="0 0 160 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-spark-3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#067CF9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#067CF9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 35 Q 30 25, 60 28 T 110 16 T 160 6 L 160 40 L 0 40 Z" fill="url(#grad-spark-3)" />
              <path d="M 0 35 Q 30 25, 60 28 T 110 16 T 160 6" fill="none" stroke="#067CF9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 4: Engagement Rate */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Engagement Rate</span>
                <span className="text-2xl font-bold text-[#0F172A] font-sans tracking-tight">
                  {activePage?.engagementRate || '5.8%'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-[#10B981] flex items-center justify-end gap-0.5">
                <span>&uarr; 0.9%</span>
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium block">vs last 7 days</span>
            </div>
          </div>

          <div className="mt-3 h-8 w-full overflow-hidden">
            <svg viewBox="0 0 160 40" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-spark-4" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#067CF9" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#067CF9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 30 Q 35 32, 70 20 T 120 22 T 160 10 L 160 40 L 0 40 Z" fill="url(#grad-spark-4)" />
              <path d="M 0 30 Q 35 32, 70 20 T 120 22 T 160 10" fill="none" stroke="#067CF9" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. MIDDLE ROW: PERFORMANCE TRENDS (Left 8 Cols) & INSIGHTS / AUDIT (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left (8 Cols): Performance Trends Bar Chart (Start light cyan -> peak pure Electric Blue #067CF9) */}
        <div className="lg:col-span-8 bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Performance Trends</h3>
                <p className="text-xs text-[#64748B]">Real-time reach, views and audience engagement.</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.12)] bg-[#F8FAFC] text-xs font-medium text-[#0F172A] cursor-pointer hover:bg-neutral-100 transition-colors">
              <Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Last 7 days</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
          </div>

          {/* Bar Chart Canvas with Y-Axis and Cyan-to-Electric-Blue gradient bars */}
          <div className="pt-6 pb-2">
            <div className="flex items-end gap-4 h-56">
              
              {/* Y-Axis scale */}
              <div className="flex flex-col justify-between h-44 text-[11px] font-mono text-[#94A3B8] pb-6 shrink-0">
                <span>100K</span>
                <span>75K</span>
                <span>50K</span>
                <span>25K</span>
                <span>0</span>
              </div>

              {/* 7 Bars Grid */}
              <div className="flex-1 grid grid-cols-7 gap-3 sm:gap-6 h-full items-end pb-6 border-b border-neutral-100">
                {trendBars.map((bar, i) => (
                  <div key={i} className="flex flex-col items-center h-full justify-end group">
                    <div 
                      className="w-full max-w-[42px] rounded-t-lg bg-gradient-to-t from-[#7DD3FC] via-[#38BDF8] to-[#067CF9] group-hover:brightness-110 transition-all cursor-pointer relative shadow-xs"
                      style={{ height: `${bar.heightPercent}%` }}
                    >
                      {/* Tooltip on Hover */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[#0F172A] text-white text-[10px] font-mono font-semibold whitespace-nowrap transition-opacity pointer-events-none z-10 shadow-md">
                        {bar.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* X-Axis Dates */}
            <div className="flex items-center justify-between pl-12 pr-2 pt-2 text-xs font-mono text-[#64748B]">
              {trendBars.map((bar, i) => (
                <span key={i} className="text-center">{bar.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right (4 Cols): Performance Insights & Page Health & Audit */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card 1: Performance Insights */}
          <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#067CF9]" />
              <h3 className="font-bold text-xs text-[#0F172A]">Performance Insights</h3>
            </div>

            <div className="space-y-2.5">
              {/* Row 1: Velocity */}
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] flex items-center justify-between hover:bg-[#EFF6FF]/60 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#0F172A]">Velocity</div>
                    <div className="text-[10px] text-[#64748B]">Views in last 7 days</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-xs text-[#0F172A]">182.4K</div>
                    <div className="text-[10px] text-[#10B981] font-semibold">&uarr; 24%</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 2: Watch Completion */}
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] flex items-center justify-between hover:bg-[#EFF6FF]/60 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#0F172A]">Watch Completion</div>
                    <div className="text-[10px] text-[#64748B]">Avg. watch rate</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-xs text-[#0F172A]">68.5%</div>
                    <div className="text-[10px] text-[#10B981] font-semibold">&uarr; 12%</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              {/* Row 3: Peak Window */}
              <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] flex items-center justify-between hover:bg-[#EFF6FF]/60 transition-colors cursor-pointer group">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                    <BarChart2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#0F172A]">Peak Window</div>
                    <div className="text-[10px] text-[#64748B]">Best time to post</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-bold text-xs text-[#0F172A]">7 PM – 10 PM</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Page Health & Audit */}
          <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#067CF9]" />
                <h3 className="font-bold text-xs text-[#0F172A]">Page Health &amp; Audit</h3>
              </div>
              <button 
                onClick={() => onNavigate('builder')}
                className="text-[11px] font-semibold text-[#067CF9] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>View full audit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center gap-4 pt-1">
              {/* Circular gauge */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle cx="32" cy="32" r="26" stroke="#EFF6FF" strokeWidth="5" fill="none" />
                  <circle 
                    cx="32" 
                    cy="32" 
                    r="26" 
                    stroke="#067CF9" 
                    strokeWidth="5" 
                    strokeDasharray="163" 
                    strokeDashoffset="23" 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-extrabold text-base text-[#0F172A] block leading-none">86</span>
                  <span className="text-[9px] text-[#94A3B8] font-mono leading-none">/100</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#10B981]">Great performance!</h4>
                <p className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                  Your page is well optimised for growth. Keep going!
                </p>
              </div>
            </div>

            {/* 4 Health Chips */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Bio Proposition</span>
                <span className="font-bold text-[#10B981] font-mono">92/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Grid Uniformity</span>
                <span className="font-bold text-[#067CF9] font-mono">78/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Bio Link &amp; Store</span>
                <span className="font-bold text-[#8B5CF6] font-mono">88/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Posting Velocity</span>
                <span className="font-bold text-[#067CF9] font-mono">84/100</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. BOTTOM ROW: TOP PERFORMING REELS (Left 8 Cols) & CHECKLIST (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left (8 Cols): Top Performing Reels Table */}
        <div className="lg:col-span-8 bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A]">Top Performing Reels</h3>
                <p className="text-xs text-[#64748B]">Your best content from the last 30 days.</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(6,124,249,0.12)] bg-[#F8FAFC] text-xs font-medium text-[#0F172A] cursor-pointer hover:bg-neutral-100 transition-colors">
              <span>Sort by: Views</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8]" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-[#64748B] font-mono text-[11px]">
                  <th className="pb-2.5 font-medium">#</th>
                  <th className="pb-2.5 font-medium">Reel</th>
                  <th className="pb-2.5 font-medium">Publish Date</th>
                  <th className="pb-2.5 font-medium">Hook / Caption</th>
                  <th className="pb-2.5 font-medium">Views</th>
                  <th className="pb-2.5 font-medium">Retention</th>
                  <th className="pb-2.5 font-medium">Shares</th>
                  <th className="pb-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {topReels.map((reel) => (
                  <tr key={reel.id} className="hover:bg-[#EFF6FF]/40 transition-colors group">
                    <td className="py-3 font-mono text-[#94A3B8] font-medium">{reel.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={reel.thumbnail} 
                          alt={reel.title} 
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-black/5 shrink-0" 
                        />
                        <span className="font-semibold text-[#0F172A] truncate max-w-[150px]">
                          {reel.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-[#64748B] text-[11px] whitespace-nowrap">{reel.date}</td>
                    <td className="py-3 text-[#64748B] text-xs truncate max-w-[130px]">{reel.caption}</td>
                    <td className="py-3 font-bold text-[#0F172A] font-mono">{reel.views}</td>
                    <td className="py-3 font-semibold text-[#10B981] font-mono">{reel.retention}</td>
                    <td className="py-3 font-mono text-[#64748B]">{reel.shares}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <button
                          onClick={() => onNavigate('assistant')}
                          className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>AI Remix</span>
                        </button>
                        <button className="p-1 rounded-lg hover:bg-neutral-100 text-[#94A3B8] cursor-pointer">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 Cols): Getting Started Checklist (matching Image 1) */}
        <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="font-bold text-xs text-[#0F172A]">Getting Started Checklist</h3>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">
                {completedCount}/{checklist.length} complete
              </span>
            </div>

            {/* Progress Bar in Electric Blue */}
            <div className="w-full h-1.5 rounded-full bg-[#EFF6FF] overflow-hidden my-3">
              <div 
                className="h-full bg-[#067CF9] transition-all duration-300"
                style={{ width: `${(completedCount / checklist.length) * 100}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 pt-1">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                    item.done
                      ? 'bg-[#F8FAFC] border-[rgba(6,124,249,0.1)] text-[#0F172A]'
                      : 'bg-white border-neutral-200 hover:border-[#067CF9]/40 text-[#0F172A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.done ? (
                      <div className="w-4 h-4 rounded-md bg-[#067CF9] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-md border-2 border-[#CBD5E1] shrink-0" />
                    )}
                    <span className={`text-xs ${item.done ? 'font-medium text-[#0F172A]' : 'text-[#64748B]'}`}>
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight className="w-3.5 h-3.5 text-[#94A3B8]" />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100">
            <button
              onClick={() => onNavigate('discover_create')}
              className="w-full py-2 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Continue setup sprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
