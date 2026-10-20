import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Users, 
  ArrowUpRight,
  Clock,
  Zap,
  Target
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CHART_DATA = {
  '7D': [
    { label: 'Oct 14', reach: 18200, views: 24500, followers: 160, rate: 72 },
    { label: 'Oct 15', reach: 24800, views: 31200, followers: 220, rate: 76 },
    { label: 'Oct 16', reach: 38500, views: 49800, followers: 380, rate: 84 },
    { label: 'Oct 17', reach: 31200, views: 41000, followers: 290, rate: 79 },
    { label: 'Oct 18', reach: 45600, views: 58200, followers: 440, rate: 83 },
    { label: 'Oct 19', reach: 68400, views: 89400, followers: 690, rate: 89 },
    { label: 'Oct 20', reach: 84200, views: 112400, followers: 850, rate: 92 }
  ],
  '30D': [
    { label: 'Sep 21', reach: 112000, views: 148000, followers: 1120, rate: 74 },
    { label: 'Sep 26', reach: 145000, views: 195000, followers: 1540, rate: 77 },
    { label: 'Oct 01', reach: 198000, views: 260000, followers: 2100, rate: 80 },
    { label: 'Oct 06', reach: 254000, views: 345000, followers: 2750, rate: 84 },
    { label: 'Oct 11', reach: 320000, views: 440000, followers: 3500, rate: 87 },
    { label: 'Oct 16', reach: 410000, views: 565000, followers: 4420, rate: 90 },
    { label: 'Oct 20', reach: 489000, views: 682000, followers: 5410, rate: 93 }
  ],
  '90D': [
    { label: 'Jul 25', reach: 380000, views: 512000, followers: 3900, rate: 71 },
    { label: 'Aug 08', reach: 520000, views: 710000, followers: 5300, rate: 75 },
    { label: 'Aug 22', reach: 690000, views: 950000, followers: 7200, rate: 79 },
    { label: 'Sep 05', reach: 880000, views: 1200000, followers: 9600, rate: 83 },
    { label: 'Sep 19', reach: 1080000, views: 1480000, followers: 12100, rate: 86 },
    { label: 'Oct 03', reach: 1290000, views: 1780000, followers: 14600, rate: 89 },
    { label: 'Oct 20', reach: 1480000, views: 2040000, followers: 16900, rate: 92 }
  ]
};

export default function AnalyticsCharts() {
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
  
  const rawMax = Math.max(...values);
  const maxValue = rawMax * 1.15;
  const minValue = 0;

  // SVG Chart Geometry
  const width = 640;
  const height = 210;
  const paddingLeft = 52; // Left margin for Y-Axis labels
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 28; // Bottom margin for X-Axis date labels
  const chartW = width - paddingLeft - paddingRight;
  const chartH = height - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const val = metricTab === 'reach' ? d.reach : metricTab === 'followers' ? d.followers : d.rate;
    const x = paddingLeft + (i / (data.length - 1)) * chartW;
    const y = height - paddingBottom - ((val - minValue) / (maxValue - minValue)) * chartH;
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

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingBottom} L ${points[0].x},${height - paddingBottom} Z`;

  const avgRetentionCurrent = Math.round(data.reduce((acc, d) => acc + d.rate, 0) / data.length);

  // Format Y-Axis value label
  const formatYLabel = (val) => {
    if (metricTab === 'retention') return `${Math.round(val)}%`;
    if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val / 1000)}K`;
    return Math.round(val).toString();
  };

  const yTicks = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
      
      {/* 1. Header with Title, Clean Subtitle, and Unified Right-Aligned Toolbar per Section 2.3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.05]">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
            Performance Trends
          </h3>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
            How your page is trending.
          </p>
        </div>

        {/* Combined Unified Toolbar: Metric Selector stacked immediately left of Date-Range Selector per 2.3 */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          
          {/* Metric Selector (Reach / Followers / Retention) */}
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

          {/* Date-Range Selector (7D / 30D / 90D) */}
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

      {/* 2. Main Two-Column Structure per Section 2.3: Left Numbers Table (~25-30%) + Right Line Chart (~70-75%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Left Column (~25-30% width): Static 3-row numbers table (Reach, Followers, Retention) */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5 lg:border-r border-neutral-200/80 dark:border-white/[0.06] lg:pr-5 py-1">
          
          {/* Row 1: Reach */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04]">
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Reach</span>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">128.4K</span>
              <span className="ml-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">+38.4%</span>
            </div>
          </div>

          {/* Row 2: Followers */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04]">
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Followers</span>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">48.2K</span>
              <span className="ml-2 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">+1.2K</span>
            </div>
          </div>

          {/* Row 3: Retention */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04]">
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Retention</span>
            <div className="text-right">
              <span className="text-sm font-bold font-mono text-neutral-900 dark:text-white">82%</span>
              <span className="ml-2 text-xs font-mono font-medium text-neutral-400 dark:text-neutral-400">Target 70%</span>
            </div>
          </div>

        </div>

        {/* Right Column (~70-75% width): Line Chart with Y-Axis scale and Real Dates on X-Axis */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="relative w-full aspect-[20/9] sm:aspect-[22/9] min-h-[190px]">
            <svg 
              viewBox={`0 0 ${width} ${height}`} 
              className="w-full h-full overflow-visible"
            >
              <defs>
                <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Y-Axis Horizontal Grid Lines and Scale Numbers */}
              {yTicks.map((ratio, idx) => {
                const y = height - paddingBottom - ratio * chartH;
                const tickVal = minValue + ratio * (maxValue - minValue);
                return (
                  <g key={idx}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={width - paddingRight}
                      y2={y}
                      stroke={isDark ? "#1A1D27" : "#F1F5F9"}
                      strokeWidth="1"
                    />
                    <text
                      x={paddingLeft - 8}
                      y={y + 3}
                      fill={isDark ? "#71717A" : "#94A3B8"}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="end"
                      className="select-none font-medium"
                    >
                      {formatYLabel(tickVal)}
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              <path d={areaD} fill="url(#performanceGradient)" />

              {/* Clean Brand Green Stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="#10B981"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points and X-Axis Real Calendar Date Labels */}
              {points.map((p, i) => {
                const isHovered = hoveredIndex === i;
                return (
                  <g key={i}>
                    {isHovered && (
                      <line
                        x1={p.x}
                        y1={paddingTop}
                        x2={p.x}
                        y2={height - paddingBottom}
                        stroke={isDark ? "#2A2E3D" : "#E2E8F0"}
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                    )}

                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 5 : 3.5}
                      fill={isHovered ? '#10B981' : (isDark ? '#0C0D12' : '#FFFFFF')}
                      stroke="#10B981"
                      strokeWidth="2"
                      className="transition-all cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />

                    {/* X-Axis Real Date Label (e.g. Oct 14, Oct 15...) */}
                    <text
                      x={p.x}
                      y={height - 8}
                      fill={isHovered ? '#10B981' : (isDark ? '#8A8F9E' : '#64748B')}
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

            {/* Hover Tooltip */}
            {hoveredIndex !== null && points[hoveredIndex] && (
              <div 
                className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2"
                style={{
                  left: `${(points[hoveredIndex].x / width) * 100}%`,
                  top: `${(points[hoveredIndex].y / height) * 100}%`
                }}
              >
                <div className="bg-white dark:bg-[#121520] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 shadow-xl text-xs space-y-0.5">
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
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {points[hoveredIndex].data.rate}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 3. Detail Row Below Chart (Velocity, Avg Watch Completion, Peak Posting Window) Restyled to Match Top 4 Cards per Section 2.3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-200/80 dark:border-white/[0.05]">
        
        {/* Chip 1: Velocity */}
        <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium flex items-center justify-between">
            <span>Velocity</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
              +38.4%
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              vs last period benchmark
            </div>
          </div>
        </div>

        {/* Chip 2: Avg Watch Completion */}
        <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium flex items-center justify-between">
            <span>Avg Watch Completion</span>
            <Target className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 dark:text-white tracking-tight">
              {avgRetentionCurrent}%
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              Target: 70% retention loop
            </div>
          </div>
        </div>

        {/* Chip 3: Peak Posting Window */}
        <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.04] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1 font-medium flex items-center justify-between">
            <span>Peak Posting Window</span>
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold font-mono text-neutral-900 dark:text-white tracking-tight">
              Sun 7:00 PM &ndash; 9:30 PM
            </div>
            <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
              Highest algorithmic distribution
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
