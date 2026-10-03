import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CHART_DATA = {
  '7D': [
    { label: 'Mon', reach: 14200, views: 18900, followers: 120, rate: 71 },
    { label: 'Tue', reach: 19800, views: 24500, followers: 185, rate: 76 },
    { label: 'Wed', reach: 31200, views: 42100, followers: 340, rate: 84 },
    { label: 'Thu', reach: 24500, views: 32000, followers: 210, rate: 78 },
    { label: 'Fri', reach: 28900, views: 39400, followers: 290, rate: 81 },
    { label: 'Sat', reach: 38400, views: 51200, followers: 430, rate: 89 },
    { label: 'Sun', reach: 45200, views: 61800, followers: 510, rate: 92 }
  ],
  '30D': [
    { label: 'W1', reach: 84200, views: 112000, followers: 820, rate: 74 },
    { label: 'W2', reach: 124000, views: 168000, followers: 1340, rate: 79 },
    { label: 'W3', reach: 198000, views: 274000, followers: 2410, rate: 86 },
    { label: 'W4', reach: 248500, views: 342000, followers: 3120, rate: 91 }
  ],
  '90D': [
    { label: 'M1', reach: 284000, views: 389000, followers: 2840, rate: 73 },
    { label: 'M2', reach: 492000, views: 681000, followers: 5490, rate: 82 },
    { label: 'M3', reach: 812000, views: 1124000, followers: 9840, rate: 88 }
  ]
};

export default function AnalyticsCharts({ activePageHandle = 'growth.mindset' }) {
  const { isDark } = useTheme();
  const [timeframe, setTimeframe] = useState('7D');
  const [metricTab, setMetricTab] = useState('reach');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = CHART_DATA[timeframe] || CHART_DATA['7D'];

  const values = data.map(d => {
    if (metricTab === 'reach') return d.reach;
    if (metricTab === 'followers') return d.followers;
    return d.rate;
  });
  const maxValue = Math.max(...values) * 1.12;
  const minValue = Math.min(...values) * 0.88;

  const width = 800;
  const height = 230;
  const paddingX = 35;
  const paddingY = 25;
  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const points = data.map((d, i) => {
    const val = metricTab === 'reach' ? d.reach : metricTab === 'followers' ? d.followers : d.rate;
    const x = paddingX + (i / (data.length - 1)) * chartW;
    const y = height - paddingY - ((val - minValue) / (maxValue - minValue)) * chartH;
    return { x, y, data: d, val };
  });

  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${p.x},${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  const avgRetentionCurrent = Math.round(data.reduce((acc, d) => acc + d.rate, 0) / data.length);

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
      
      {/* 1. Header with Metric Tabs and Timeframe Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
            Performance Trends
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            Algorithm analytics for <span className="text-neutral-800 dark:text-neutral-300 font-mono font-medium">@{activePageHandle}</span>
          </p>
        </div>

        {/* Controls: Metric Tabs + Timeframe */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Metric Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs">
            {[
              { id: 'reach', label: 'Reach' },
              { id: 'followers', label: 'Followers' },
              { id: 'retention', label: 'Retention' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMetricTab(tab.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                  metricTab === tab.id 
                    ? 'bg-white dark:bg-white/[0.08] text-emerald-700 dark:text-white font-semibold shadow-xs' 
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timeframe Pill */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs font-mono">
            {['7D', '30D', '90D'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 rounded-md text-[10px] transition-colors cursor-pointer ${
                  timeframe === tf 
                    ? 'bg-white dark:bg-white/[0.08] text-neutral-900 dark:text-white font-semibold shadow-xs' 
                    : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 2. Refined SVG Chart */}
      <div className="relative w-full aspect-[21/9] sm:aspect-[24/8] min-h-[190px]">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Gentle emerald gradient fill */}
            <linearGradient id="minimalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16A34A" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#16A34A" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((ratio, idx) => {
            const y = height - paddingY - ratio * chartH;
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke={isDark ? "#181A22" : "#F1F5F9"}
                strokeWidth="1"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#minimalGradient)" />

          {/* Clean Thin Green Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((p, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g key={i}>
                {isHovered && (
                  <line
                    x1={p.x}
                    y1={paddingY}
                    x2={p.x}
                    y2={height - paddingY}
                    stroke={isDark ? "#272A35" : "#E2E8F0"}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                )}

                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 5 : 3}
                  fill={isHovered ? '#16A34A' : (isDark ? '#0C0D12' : '#FFFFFF')}
                  stroke="#16A34A"
                  strokeWidth="2"
                  className="transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                <text
                  x={p.x}
                  y={height - 8}
                  fill={isHovered ? '#16A34A' : (isDark ? '#71717A' : '#94A3B8')}
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="select-none font-medium"
                >
                  {p.data.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Minimal Tooltip */}
        {hoveredIndex !== null && points[hoveredIndex] && (
          <div 
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
              top: `${(points[hoveredIndex].y / height) * 100}%`
            }}
          >
            <div className="bg-white dark:bg-[#141620] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 shadow-lg text-xs space-y-0.5">
              <div className="text-[10px] font-mono text-neutral-400 font-semibold">
                {points[hoveredIndex].data.label}
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-neutral-500 dark:text-neutral-400">Reach:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {points[hoveredIndex].data.reach.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-neutral-500 dark:text-neutral-400">Retention:</span>
                <span className="text-emerald-600 font-semibold">
                  {points[hoveredIndex].data.rate}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Subtle Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-neutral-200/80 dark:border-white/[0.05] text-xs">
        <div className="p-2.5 rounded-lg bg-neutral-50/80 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04]">
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-mono">Velocity</div>
          <div className="text-xs font-semibold text-neutral-900 dark:text-white font-mono mt-0.5 flex items-center gap-1.5">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+38.4%</span>
            <span className="text-[10px] text-neutral-400 font-normal">vs last period</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-50/80 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04]">
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-mono">Avg Watch Completion</div>
          <div className="text-xs font-semibold text-neutral-900 dark:text-white font-mono mt-0.5">
            {avgRetentionCurrent}% <span className="text-[10px] text-neutral-400 font-normal">(Target: 70%)</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-50/80 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04]">
          <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase font-mono">Peak Posting Window</div>
          <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-300 font-mono mt-0.5">
            Sun 7:00 PM – 9:30 PM
          </div>
        </div>
      </div>

    </div>
  );
}
