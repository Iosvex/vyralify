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
  ShoppingBag, 
  Play, 
  Clock, 
  Zap, 
  BarChart2, 
  ChevronRight, 
  ChevronDown, 
  MoreHorizontal, 
  Check, 
  FileText 
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

  const [activeHoverPoint, setActiveHoverPoint] = useState(6); // Default highlight Sun

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

  // Default Stock Market Spline Line Data Points (Mon to Sun matching user's photo curve)
  const defaultStockPoints = [
    { day: 'Mon', x: 50,  y: 165, value: '24.2K', change: '+8.4%' },
    { day: 'Tue', x: 150, y: 135, value: '38.5K', change: '+14.2%' },
    { day: 'Wed', x: 250, y: 85,  value: '64.8K', change: '+28.0%' },
    { day: 'Thu', x: 350, y: 120, value: '49.0K', change: '-4.6%' },
    { day: 'Fri', x: 450, y: 100, value: '58.3K', change: '+12.5%' },
    { day: 'Sat', x: 550, y: 55,  value: '84.0K', change: '+35.1%' },
    { day: 'Sun', x: 650, y: 25,  value: '112.5K', change: '+46.8%' }
  ];

  // Dynamic stockPoints linked to active Instagram Page Graph data
  const stockPoints = (activePage?.stockPoints && Array.isArray(activePage.stockPoints) && activePage.stockPoints.length === 7)
    ? activePage.stockPoints
    : defaultStockPoints;

  // Helper to generate a smooth Catmull-Rom cubic bezier spline path
  const getSplinePath = (pts) => {
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
      
      const cp1x = p1.x + (p2.x - p0.x) / 5;
      const cp1y = p1.y + (p2.y - p0.y) / 5;
      const cp2x = p2.x - (p3.x - p1.x) / 5;
      const cp2y = p2.y - (p3.y - p1.y) / 5;
      
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const linePathD = getSplinePath(stockPoints);
  const areaPathD = `${linePathD} L 650 200 L 50 200 Z`;

  // Default Top Performing Reels List
  const defaultTopReels = [
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

  // Dynamic Top Performing Reels linked to active Instagram Page Graph data
  const topReels = (activePage?.topReels && Array.isArray(activePage.topReels) && activePage.topReels.length > 0)
    ? activePage.topReels
    : defaultTopReels;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* 1. GREETING HEADER */}
      <div className="pb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
          {getGreeting()}, {displayName}
        </h1>
        <p className="text-sm text-[#64748B] mt-1 font-medium">
          Here is your growth overview for today.
        </p>
      </div>

      {/* 2. TOP 4 KPI CARDS (Clean without wavy sparklines) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Followers */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Followers</span>
                <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {activePage?.followersCount && activePage.followersCount !== '0' ? activePage.followersCount : '48.2K'}
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
        </div>

        {/* KPI 2: 7-Day Reel Views */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <Play className="w-5 h-5 fill-current" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">7-Day Reel Views</span>
                <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {activePage?.views7d && activePage.views7d !== '0' ? activePage.views7d : '184.5K'}
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
        </div>

        {/* KPI 3: Store Revenue */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center font-bold text-lg shrink-0">
                ₹
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Store Revenue</span>
                <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {activePage?.revenue30d && activePage.revenue30d !== '₹0' ? activePage.revenue30d : '₹24,950'}
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
        </div>

        {/* KPI 4: Engagement Rate */}
        <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] hover:border-[#067CF9]/30 transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-[#64748B] font-medium block">Engagement Rate</span>
                <span className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {activePage?.engagementRate && activePage.engagementRate !== '0.0%' ? activePage.engagementRate : '4.8%'}
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
        </div>

      </div>

      {/* 3. MIDDLE ROW: PERFORMANCE TRENDS (Left 8 Cols) & INSIGHTS / AUDIT (Right 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left (8 Cols): Performance Trends Stock Market Spline Line Chart (Mon to Sun with Emerald Green Line) */}
        <div className="lg:col-span-8 bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#EAF7EE] text-[#10B981] flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
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

          {/* Stock Market Spline Line Chart Canvas */}
          <div className="pt-6 pb-2">
            <div className="relative w-full h-56">
              
              <svg viewBox="0 0 700 220" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  {/* Stock Market Emerald Green Area Fill Gradient */}
                  <linearGradient id="stock-market-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                    <stop offset="85%" stopColor="#10B981" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                  </linearGradient>
                  {/* Line Glow Filter */}
                  <filter id="stock-line-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#10B981" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Subtle Horizontal Guide Lines */}
                <line x1="50" y1="40" x2="650" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="90" x2="650" y2="90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="140" x2="650" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="50" y1="200" x2="650" y2="200" stroke="#CBD5E1" strokeWidth="1" />

                {/* Area Gradient Fill */}
                <path d={areaPathD} fill="url(#stock-market-gradient)" />

                {/* Continuous Smooth Spline Curve */}
                <path 
                  d={linePathD} 
                  fill="none" 
                  stroke="#10B981" 
                  strokeWidth="3.2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  filter="url(#stock-line-glow)" 
                />

                {/* Circular Halo Data Nodes (Mon to Sun) */}
                {stockPoints.map((pt, i) => {
                  const isHovered = activeHoverPoint === i;
                  return (
                    <g key={i} className="cursor-pointer transition-all duration-200" onMouseEnter={() => setActiveHoverPoint(i)}>
                      {/* Outer Halo */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? 9 : 6.5} 
                        fill="#10B981" 
                        fillOpacity={isHovered ? 0.35 : 0.18} 
                        stroke="#10B981" 
                        strokeWidth="1.5" 
                      />
                      {/* Inner Dot */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isHovered ? 4.5 : 3.5} 
                        fill="#FFFFFF" 
                        stroke="#10B981" 
                        strokeWidth="2.5" 
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Active Hover Tooltip */}
              {activeHoverPoint !== null && (
                <div 
                  className="absolute -top-3 transform -translate-x-1/2 pointer-events-none transition-all duration-150 z-20"
                  style={{ left: `${(stockPoints[activeHoverPoint].x / 700) * 100}%` }}
                >
                  <div className="px-2.5 py-1 rounded-lg bg-[#0F172A] text-white text-[11px] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-semibold">{stockPoints[activeHoverPoint].day}:</span>
                    <span className="text-[#10B981] font-bold">{stockPoints[activeHoverPoint].value}</span>
                    <span className="text-[10px] text-neutral-300">({stockPoints[activeHoverPoint].change})</span>
                  </div>
                </div>
              )}

            </div>

            {/* X-Axis Day Labels (Mon to Sun matching photo) */}
            <div className="flex items-center justify-between px-6 pt-2 text-xs text-[#64748B] font-medium">
              {stockPoints.map((pt, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHoverPoint(i)}
                  className={`w-12 text-center transition-colors cursor-pointer ${
                    activeHoverPoint === i ? 'text-[#10B981] font-bold' : 'hover:text-[#0F172A]'
                  }`}
                >
                  {pt.day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right (4 Cols): Insights & Page Health & Audit */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Card 1: Insights (Renamed from Performance Insights per user request) */}
          <div className="bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-4 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#067CF9]" />
              <h3 className="font-bold text-xs text-[#0F172A]">Insights</h3>
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
                    <div className="font-bold text-xs text-[#0F172A]">{activePage?.views7d || '184.5K'}</div>
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
                    <div className="font-bold text-xs text-[#0F172A]">
                      {activePage?.engagementRate ? `${Math.min(92, Math.round(parseFloat(activePage.engagementRate) * 14))}%` : '68.5%'}
                    </div>
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
                    <div className="font-bold text-xs text-[#0F172A]">
                      {activePage?.audience?.activeHours?.[6]?.primeSlot ? `Around ${activePage.audience.activeHours[6].primeSlot}` : '7 PM – 10 PM'}
                    </div>
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
                    strokeDashoffset={`${163 - (163 * (activePage?.audit?.overallScore || 86)) / 100}`} 
                    strokeLinecap="round" 
                    fill="none" 
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="font-extrabold text-base text-[#0F172A] block leading-none">
                    {activePage?.audit?.overallScore || 86}
                  </span>
                  <span className="text-[9px] text-[#94A3B8] leading-none">/100</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-[#10B981]">Great performance!</h4>
                <p className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                  Your page is well optimised for growth. Keep going!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100">
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Bio Proposition</span>
                <span className="font-bold text-[#10B981]">92/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Grid Uniformity</span>
                <span className="font-bold text-[#067CF9]">78/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Bio Link &amp; Store</span>
                <span className="font-bold text-[#8B5CF6]">88/100</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F8FAFC] border border-[rgba(6,124,249,0.08)] text-[10px] space-y-0.5">
                <span className="text-[#64748B] block truncate">Posting Velocity</span>
                <span className="font-bold text-[#067CF9]">84/100</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. FULL-WIDTH TOP PERFORMING REELS (Per user request: full width, spacious column layout) */}
      <div className="w-full bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
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
              <tr className="border-b border-neutral-100 text-[#64748B] text-[11px]">
                <th className="pb-3 w-10 text-center font-semibold">#</th>
                <th className="pb-3 w-[30%] min-w-[200px] font-semibold">Reel</th>
                <th className="pb-3 w-[15%] min-w-[110px] font-semibold">Publish Date</th>
                <th className="pb-3 w-[25%] min-w-[160px] font-semibold">Hook / Caption</th>
                <th className="pb-3 w-[10%] text-right font-semibold">Views</th>
                <th className="pb-3 w-[10%] text-right font-semibold">Retention</th>
                <th className="pb-3 w-[10%] text-right font-semibold">Shares</th>
                <th className="pb-3 w-28 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {topReels.map((reel) => (
                <tr key={reel.id} className="hover:bg-[#EFF6FF]/40 transition-colors group">
                  <td className="py-3 text-center text-[#94A3B8] font-medium">{reel.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={reel.thumbnail} 
                        alt={reel.title} 
                        className="w-9 h-9 rounded-lg object-cover ring-1 ring-black/5 shrink-0" 
                      />
                      <span className="font-semibold text-[#0F172A] truncate">
                        {reel.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-[#64748B] whitespace-nowrap">{reel.date}</td>
                  <td className="py-3 text-[#64748B] truncate max-w-[200px]">{reel.caption}</td>
                  <td className="py-3 text-right font-bold text-[#0F172A]">{reel.views}</td>
                  <td className="py-3 text-right font-semibold text-[#10B981]">{reel.retention}</td>
                  <td className="py-3 text-right text-[#64748B]">{reel.shares}</td>
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

      {/* 5. GETTING STARTED CHECKLIST (Moved below Top Performing Reels per user request) */}
      <div className="w-full bg-white/95 backdrop-blur-xl border border-[rgba(6,124,249,0.12)] rounded-2xl p-5 shadow-[0_2px_16px_rgba(6,124,249,0.04)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#067CF9] flex items-center justify-center">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">Getting Started Checklist</h3>
              <p className="text-xs text-[#64748B]">Complete these essential setup milestones to unlock automated growth.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#64748B] font-medium bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-neutral-200">
              {completedCount}/{checklist.length} complete
            </span>
            <button
              onClick={() => onNavigate('discover_create')}
              className="py-1.5 px-3 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Continue setup sprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-[#EFF6FF] overflow-hidden">
          <div 
            className="h-full bg-[#067CF9] transition-all duration-300"
            style={{ width: `${(completedCount / checklist.length) * 100}%` }}
          />
        </div>

        {/* 4 Checklist Cards in a Responsive Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklistItem(item.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
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

    </div>
  );
}
