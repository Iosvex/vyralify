import React, { useState, useRef } from 'react';
import { ArrowUpRight, TrendingUp, Globe, Activity, DollarSign } from 'lucide-react';

// ============================================================================
// 1. TrendBadge Component
// ============================================================================
export function TrendBadge({ value = 24.8, className = '' }) {
  const isPositive = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${
        isPositive
          ? 'bg-[#12220D] border-[#223B17] text-[#D1FE17]'
          : 'bg-[#2A1012] border-[#44181B] text-[#FF5757]'
      } ${className}`}
    >
      <ArrowUpRight className={`w-3 h-3 ${isPositive ? '' : 'rotate-90'}`} />
      {isPositive ? '+' : ''}
      {value.toFixed(1)}%
    </span>
  );
}

// ============================================================================
// 2. StatCardArea (@bklit/stat-card-area-01) - Total Revenue
// NO STATIC DOTS - Smooth vector path with dynamic interactive scrub
// ============================================================================
export function StatCardArea({
  title = "Total Creator Revenue",
  value = "$128,450.00",
  subtitle = "Verified net payout this cycle",
  trend = 24.8
}) {
  const containerRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);

  const points = [
    { xPct: 0, yPct: 75, val: '$18,400', date: 'Jan 1' },
    { xPct: 18, yPct: 68, val: '$32,100', date: 'Jan 6' },
    { xPct: 36, yPct: 56, val: '$51,200', date: 'Jan 12' },
    { xPct: 55, yPct: 42, val: '$68,500', date: 'Jan 18' },
    { xPct: 74, yPct: 24, val: '$92,400', date: 'Jan 24' },
    { xPct: 100, yPct: 8, val: '$128,450', date: 'Jan 30' }
  ];

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clientX / rect.width));
    
    // Find closest point or interpolate
    const idx = Math.min(points.length - 1, Math.floor(ratio * points.length));
    setHoverData({
      xPct: ratio * 100,
      yPct: points[idx].yPct,
      val: points[idx].val,
      date: points[idx].date
    });
  };

  return (
    <div 
      className="p-5 rounded-2xl bg-[#0B0C10] border border-[#1A1C24] shadow-sm flex flex-col justify-between hover:border-[#282B37] transition-all group relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-[#D1FE17]" />
          {title}
        </span>
        <TrendBadge value={trend} />
      </div>

      {/* Metric Display */}
      <div className="my-3.5 z-10">
        <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          {hoverData ? hoverData.val : value}
        </div>
        <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center justify-between">
          <span>{hoverData ? `Snapshot ${hoverData.date}` : subtitle}</span>
          <span className="text-neutral-400 text-[10px] uppercase font-mono">Real-Time ACH</span>
        </div>
      </div>

      {/* Area Sparkline - NO STATIC DOTS! Pure clean path */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverData(null)}
        className="h-12 w-full mt-2 relative cursor-crosshair"
      >
        <svg 
          viewBox="0 0 200 48" 
          className="w-full h-full overflow-visible" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="revenueCardGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D1FE17" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D1FE17" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d="M 0 38 C 40 34, 70 28, 110 21 C 150 14, 175 9, 200 4 L 200 48 L 0 48 Z"
            fill="url(#revenueCardGrad)"
          />

          {/* Top Stroke Line */}
          <path
            d="M 0 38 C 40 34, 70 28, 110 21 C 150 14, 175 9, 200 4"
            fill="none"
            stroke="#D1FE17"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Dynamic Interactive Dot ONLY on hover */}
          {hoverData && (
            <g>
              <line
                x1={`${hoverData.xPct * 2}`}
                x2={`${hoverData.xPct * 2}`}
                y1={0}
                y2={48}
                stroke="#D1FE17"
                strokeWidth={1}
                strokeDasharray="2 2"
                strokeOpacity={0.6}
              />
              <circle
                cx={`${hoverData.xPct * 2}`}
                cy={`${(hoverData.yPct / 100) * 48}`}
                r={4}
                fill="#D1FE17"
                stroke="#000"
                strokeWidth={1.5}
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// 3. StatCardLine (@bklit/stat-card-line-01) - Active Sessions
// NO STATIC DOTS - Clean line with dynamic interactive scrub
// ============================================================================
export function StatCardLine({
  title = "Active Sessions",
  value = "4,890 Active",
  subtitle = "Real-time creators syncing",
  trend = 18.2
}) {
  const containerRef = useRef(null);
  const [hoverData, setHoverData] = useState(null);

  const points = [
    { xPct: 0, yPct: 65, val: '3,210', time: '10:00 AM' },
    { xPct: 20, yPct: 58, val: '3,640', time: '11:00 AM' },
    { xPct: 40, yPct: 45, val: '4,120', time: '12:00 PM' },
    { xPct: 60, yPct: 48, val: '3,980', time: '01:00 PM' },
    { xPct: 80, yPct: 30, val: '4,550', time: '02:00 PM' },
    { xPct: 100, yPct: 14, val: '4,890', time: '03:00 PM' }
  ];

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clientX / rect.width));
    const idx = Math.min(points.length - 1, Math.floor(ratio * points.length));
    setHoverData({
      xPct: ratio * 100,
      yPct: points[idx].yPct,
      val: points[idx].val,
      time: points[idx].time
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-[#0B0C10] border border-[#1A1C24] shadow-sm flex flex-col justify-between hover:border-[#282B37] transition-all group relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-white" />
          {title}
        </span>
        <TrendBadge value={trend} />
      </div>

      {/* Metric Display */}
      <div className="my-3.5 z-10">
        <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          {hoverData ? `${hoverData.val} Active` : value}
        </div>
        <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center justify-between">
          <span>{hoverData ? `Recorded at ${hoverData.time}` : subtitle}</span>
          <span className="text-[#D1FE17] text-[10px] font-mono font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] inline-block animate-pulse" />
            Live WebSocket
          </span>
        </div>
      </div>

      {/* Line Sparkline - Clean stroke, NO STATIC DOTS */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverData(null)}
        className="h-12 w-full mt-2 relative cursor-crosshair"
      >
        <svg 
          viewBox="0 0 200 48" 
          className="w-full h-full overflow-visible" 
          preserveAspectRatio="none"
        >
          {/* Subtle underlay shadow */}
          <path
            d="M 0 32 C 30 30, 50 24, 80 20 C 110 16, 120 22, 140 18 C 170 12, 185 8, 200 6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Dynamic dot ONLY on hover */}
          {hoverData && (
            <g>
              <line
                x1={`${hoverData.xPct * 2}`}
                x2={`${hoverData.xPct * 2}`}
                y1={0}
                y2={48}
                stroke="#FFFFFF"
                strokeWidth={1}
                strokeDasharray="2 2"
                strokeOpacity={0.5}
              />
              <circle
                cx={`${hoverData.xPct * 2}`}
                cy={`${(hoverData.yPct / 100) * 48}`}
                r={4}
                fill="#FFFFFF"
                stroke="#000"
                strokeWidth={1.5}
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// 4. StatCardChoropleth (@bklit/stat-card-choropleth-01) - Unique Visitors
// NO STATIC DOTS - Clean geographical region map, interactive on hover
// ============================================================================
export function StatCardChoropleth({
  title = "Unique Visitors",
  value = "48.2M",
  subtitle = "Global cross-platform reach",
  trend = 31.4
}) {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  const regions = [
    { id: 'NA', name: 'North America', visitors: '22.8M', share: '47%', path: 'M 15 10 L 45 10 L 55 24 L 40 28 L 22 24 Z' },
    { id: 'EU', name: 'Europe & UK', visitors: '14.2M', share: '29%', path: 'M 75 8 L 115 8 L 110 22 L 80 20 Z' },
    { id: 'AP', name: 'Asia Pacific', visitors: '8.4M', share: '18%', path: 'M 125 10 L 180 12 L 170 28 L 130 24 Z' },
    { id: 'SA', name: 'Latin America', visitors: '2.8M', share: '6%', path: 'M 45 28 L 65 30 L 58 44 L 42 36 Z' }
  ];

  return (
    <div className="p-5 rounded-2xl bg-[#0B0C10] border border-[#1A1C24] shadow-sm flex flex-col justify-between hover:border-[#282B37] transition-all group relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-medium flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#D1FE17]" />
          {title}
        </span>
        <TrendBadge value={trend} />
      </div>

      {/* Metric Display */}
      <div className="my-3.5 z-10">
        <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          {hoveredRegion ? hoveredRegion.visitors : value}
        </div>
        <div className="text-[11px] font-mono text-neutral-500 mt-1 flex items-center justify-between">
          <span>{hoveredRegion ? `${hoveredRegion.name} (${hoveredRegion.share})` : subtitle}</span>
          <span className="text-neutral-400 text-[10px] font-mono">142 Countries</span>
        </div>
      </div>

      {/* Minimalist World Regional Map - Clean vector polygons with hover highlight */}
      <div 
        className="h-12 w-full mt-2 relative flex items-center justify-center cursor-pointer"
        onMouseLeave={() => setHoveredRegion(null)}
      >
        <svg 
          viewBox="0 0 200 48" 
          className="w-full h-full overflow-visible"
        >
          {/* World Regions */}
          {regions.map((region) => {
            const isHovered = hoveredRegion?.id === region.id;
            return (
              <path
                key={region.id}
                d={region.path}
                fill={isHovered ? '#D1FE17' : '#171922'}
                stroke={isHovered ? '#D1FE17' : '#232634'}
                strokeWidth={isHovered ? 1.5 : 1}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredRegion(region)}
              />
            );
          })}

          {/* Minimal flight paths */}
          <path
            d="M 40 18 Q 75 8, 95 14 Q 130 10, 150 18"
            fill="none"
            stroke="#D1FE17"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}
