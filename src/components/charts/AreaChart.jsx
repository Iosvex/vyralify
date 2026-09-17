import React, { 
  useState, 
  useRef, 
  useMemo, 
  useCallback,
  useEffect
} from 'react';
import { curveMonotoneX } from '@visx/curve';
import { AreaClosed, LinePath } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { ChartContext, useChartContext } from './ChartContext';

// ============================================================================
// 2. Main AreaChart Container Component
// ============================================================================
export function AreaChart({
  data = [],
  aspectRatio = '4 / 1',
  margin = { top: 20, right: 20, bottom: 32, left: 20 },
  className = '',
  style = {},
  autoPlay = true,
  children
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 260 });

  // Interactive Hover State & Auto Play
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [autoIndex, setAutoIndex] = useState(data.length - 1);

  // Auto-scan cycle when user is not manually hovering
  useEffect(() => {
    if (!autoPlay || isHovering || !data.length) return;
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % data.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [autoPlay, isHovering, data.length]);

  // Keep autoIndex valid if data changes
  useEffect(() => {
    if (data.length) {
      setAutoIndex(data.length - 1);
    }
  }, [data.length]);

  // Resize observer
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth || 900;
        const [wRatio, hRatio] = aspectRatio.split('/').map(s => parseFloat(s.trim()));
        const calculatedHeight = Math.max(220, Math.round(width / (wRatio / (hRatio || 1))));
        setDimensions({ width, height: calculatedHeight });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [aspectRatio]);

  const { width, height } = dimensions;
  const innerWidth = Math.max(10, width - margin.left - margin.right);
  const innerHeight = Math.max(10, height - margin.top - margin.bottom);

  // Scales
  const { xScale, yScale, yMax } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        xScale: () => 0,
        yScale: () => 0,
        yMax: 100
      };
    }

    const minDate = data[0].date instanceof Date ? data[0].date : new Date(data[0].date);
    const maxDate = data[data.length - 1].date instanceof Date 
      ? data[data.length - 1].date 
      : new Date(data[data.length - 1].date);

    let maxValue = 0;
    data.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'date' && typeof item[key] === 'number') {
          if (item[key] > maxValue) maxValue = item[key];
        }
      });
    });

    const paddedYMax = Math.ceil((maxValue * 1.15) / 1000) * 1000 || 160000;

    const x = scaleTime({
      range: [0, innerWidth],
      domain: [minDate, maxDate]
    });

    const y = scaleLinear({
      range: [innerHeight, 0],
      domain: [0, paddedYMax],
      nice: true
    });

    return { xScale: x, yScale: y, yMax: paddedYMax };
  }, [data, innerWidth, innerHeight]);

  // Pointer move handler to scrub along the timeline
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current || !data.length) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left - margin.left;
    const clampedX = Math.max(0, Math.min(innerWidth, clientX));
    const ratio = clampedX / innerWidth;
    const index = Math.round(ratio * (data.length - 1));
    const safeIndex = Math.max(0, Math.min(data.length - 1, index));
    setHoverIndex(safeIndex);
    setIsHovering(true);
  }, [data.length, innerWidth, margin.left]);

  const handlePointerLeave = useCallback(() => {
    setIsHovering(false);
    setHoverIndex(null);
  }, []);

  const activeIndex = isHovering 
    ? (hoverIndex !== null ? hoverIndex : data.length - 1)
    : autoIndex;

  const contextValue = useMemo(() => ({
    data,
    width,
    height,
    innerWidth,
    innerHeight,
    margin,
    xScale,
    yScale,
    yMax,
    activeIndex,
    hoverIndex,
    isHovering,
    autoPlay,
    hoveredItem: data[activeIndex] || data[data.length - 1]
  }), [
    data,
    width,
    height,
    innerWidth,
    innerHeight,
    margin,
    xScale,
    yScale,
    yMax,
    activeIndex,
    hoverIndex,
    isHovering,
    autoPlay
  ]);

  return (
    <ChartContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative w-full select-none cursor-crosshair ${className}`}
        style={{
          '--chart-line-primary': '#D1FE17',
          '--chart-line-secondary': '#FFFFFF',
          touchAction: 'none',
          ...style
        }}
      >
        <svg
          width={width}
          height={height}
          className="overflow-visible block"
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {children}
          </g>
        </svg>

        {/* Dynamic HTML Tooltip Layer on Top */}
        <ChartTooltipOverlay />
      </div>
    </ChartContext.Provider>
  );
}

// ============================================================================
// 3. Grid Component
// ============================================================================
export function Grid({ horizontal = true, vertical = false, numTicks = 4 }) {
  const { innerWidth, yScale, yMax } = useChartContext();

  const yTicks = useMemo(() => {
    const ticks = [];
    for (let i = 0; i <= numTicks; i++) {
      const val = (yMax / numTicks) * i;
      ticks.push({ val, y: yScale(val) });
    }
    return ticks;
  }, [numTicks, yMax, yScale]);

  return (
    <g className="chart-grid pointer-events-none opacity-30">
      {horizontal &&
        yTicks.map(({ val, y }, idx) => (
          <line
            key={`h-grid-${idx}`}
            x1={0}
            x2={innerWidth}
            y1={y}
            y2={y}
            stroke="#262838"
            strokeWidth={1}
            strokeDasharray={idx === 0 ? undefined : "3 3"}
          />
        ))}
    </g>
  );
}

// ============================================================================
// 4. Area Component (Visx Curve Monotone)
// NO STATIC DOTS - Clean gradient fill and crisp stroke line
// ============================================================================
export function Area({
  dataKey,
  curve = curveMonotoneX,
  fill = 'var(--chart-line-primary)',
  fillOpacity = 0.25,
  strokeWidth = 2,
  stroke
}) {
  const { data, xScale, yScale, isHovering, autoPlay, hoveredItem } = useChartContext();
  const gradId = `area-grad-${dataKey}`;

  const resolvedStroke = stroke || (fill.includes('primary') ? '#D1FE17' : '#FFFFFF');

  if (!data || data.length === 0) return null;

  return (
    <g className={`chart-series-${dataKey}`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={resolvedStroke} stopOpacity={fillOpacity} />
          <stop offset="65%" stopColor={resolvedStroke} stopOpacity={fillOpacity * 0.2} />
          <stop offset="100%" stopColor={resolvedStroke} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Visx AreaClosed gradient fill */}
      <AreaClosed
        data={data}
        x={(d) => xScale(d.date instanceof Date ? d.date : new Date(d.date))}
        y={(d) => yScale(d[dataKey] || 0)}
        yScale={yScale}
        curve={curve}
        fill={`url(#${gradId})`}
      />

      {/* Visx LinePath stroke */}
      <LinePath
        data={data}
        x={(d) => xScale(d.date instanceof Date ? d.date : new Date(d.date))}
        y={(d) => yScale(d[dataKey] || 0)}
        curve={curve}
        stroke={resolvedStroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Dynamic single dot on active position (auto-scan or hover) - ZERO static dots */}
      {(isHovering || autoPlay) && hoveredItem && hoveredItem[dataKey] != null && (
        <g>
          {resolvedStroke === '#D1FE17' && (
            <circle
              cx={xScale(hoveredItem.date instanceof Date ? hoveredItem.date : new Date(hoveredItem.date))}
              cy={yScale(hoveredItem[dataKey])}
              r={9}
              fill="#D1FE17"
              fillOpacity={0.15}
            />
          )}
          <circle
            cx={xScale(hoveredItem.date instanceof Date ? hoveredItem.date : new Date(hoveredItem.date))}
            cy={yScale(hoveredItem[dataKey])}
            r={5}
            fill={resolvedStroke}
            fillOpacity={0.25}
          />
          <circle
            cx={xScale(hoveredItem.date instanceof Date ? hoveredItem.date : new Date(hoveredItem.date))}
            cy={yScale(hoveredItem[dataKey])}
            r={3.5}
            fill={resolvedStroke}
            stroke="#000000"
            strokeWidth={1.5}
          />
        </g>
      )}
    </g>
  );
}

// ============================================================================
// 5. Segment Components (Simplified / Neutralized - Return null)
// Removed all dashed yellow lines and bounding box clutter
// ============================================================================
export function SegmentBackground() {
  return null;
}

export function SegmentLineFrom() {
  return null;
}

export function SegmentLineTo() {
  return null;
}

// ============================================================================
// 6. X-Axis Component
// ============================================================================
export function XAxis({ numTicks = 6 }) {
  const { data, innerWidth, innerHeight, xScale } = useChartContext();

  const ticks = useMemo(() => {
    if (!data.length) return [];
    const step = Math.max(1, Math.floor((data.length - 1) / (numTicks - 1)));
    const result = [];
    for (let i = 0; i < data.length; i += step) {
      const item = data[i];
      const d = item.date instanceof Date ? item.date : new Date(item.date);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      result.push({
        index: i,
        x: xScale(d),
        label
      });
    }
    const lastItem = data[data.length - 1];
    const lastD = lastItem.date instanceof Date ? lastItem.date : new Date(lastItem.date);
    const lastX = xScale(lastD);
    if (!result.some(t => Math.abs(t.x - lastX) < 35)) {
      result.push({
        index: data.length - 1,
        x: lastX,
        label: lastD.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    return result;
  }, [data, numTicks, xScale]);

  return (
    <g className="chart-x-axis pointer-events-none">
      <line
        x1={0}
        x2={innerWidth}
        y1={innerHeight}
        y2={innerHeight}
        stroke="#1E202B"
        strokeWidth={1}
      />
      {ticks.map((t, idx) => (
        <text
          key={`xtick-${idx}`}
          x={t.x}
          y={innerHeight + 18}
          textAnchor={idx === 0 ? 'start' : idx === ticks.length - 1 ? 'end' : 'middle'}
          fill="#6B7280"
          fontSize={10}
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
        >
          {t.label}
        </text>
      ))}
    </g>
  );
}

// ============================================================================
// 7. ChartTooltip & HTML Floating Overlay
// Rendered smoothly on top of the chart with ZERO SVG foreignObject glitches
// ============================================================================
export function ChartTooltip() {
  const { isHovering, autoPlay, hoveredItem, xScale, innerHeight } = useChartContext();

  if ((!isHovering && !autoPlay) || !hoveredItem) return null;

  const date = hoveredItem.date instanceof Date ? hoveredItem.date : new Date(hoveredItem.date);
  const x = xScale(date);

  return (
    <g className="chart-crosshair pointer-events-none">
      {/* Vertical Crosshair Line */}
      <line
        x1={x}
        x2={x}
        y1={0}
        y2={innerHeight}
        stroke="#D1FE17"
        strokeWidth={1.5}
        strokeDasharray="3 3"
        strokeOpacity={isHovering ? 0.8 : 0.4}
      />
    </g>
  );
}

function ChartTooltipOverlay() {
  const { 
    isHovering, 
    autoPlay,
    hoveredItem, 
    xScale, 
    innerWidth, 
    innerHeight,
    margin 
  } = useChartContext();

  if ((!isHovering && !autoPlay) || !hoveredItem) return null;

  const date = hoveredItem.date instanceof Date ? hoveredItem.date : new Date(hoveredItem.date);
  const x = xScale(date) + margin.left;
  const rev = hoveredItem.revenue;
  const cost = hoveredItem.costs;
  const netMargin = rev != null && cost != null ? rev - cost : null;
  const marginPct = rev ? Math.round((netMargin / rev) * 100) : 0;

  const tooltipWidth = 200;
  const isRightSide = x > innerWidth + margin.left - tooltipWidth - 20;
  const leftPos = isRightSide ? x - tooltipWidth - 16 : x + 16;
  const topPos = Math.max(margin.top, Math.min(innerHeight + margin.top - 100, 26));

  return (
    <div
      className="absolute pointer-events-none z-30"
      style={{
        left: `${leftPos}px`,
        top: `${topPos}px`,
        transition: isHovering ? 'none' : 'left 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div className="bg-[#0B0C11]/95 backdrop-blur-md border border-[#222533] rounded-xl p-3 shadow-2xl font-mono text-left w-[200px]">
        <div className="text-[10px] text-neutral-400 font-semibold mb-2 border-b border-[#1A1D2A] pb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${isHovering ? 'bg-cyan-400' : 'bg-[#D1FE17] animate-pulse'}`} />
            <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isHovering ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-800/50' : 'bg-[#18260B] text-[#D1FE17] border border-[#273F13]'}`}>
            {isHovering ? 'MANUAL' : 'AUTO-SCAN'}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17]" />
              <span>Revenue</span>
            </div>
            <span className="text-white font-bold">${rev?.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span>Costs</span>
            </div>
            <span className="text-neutral-300 font-semibold">${cost?.toLocaleString()}</span>
          </div>

          {netMargin !== null && (
            <div className="pt-1.5 mt-1 border-t border-[#1A1D2A] flex items-center justify-between text-[10px]">
              <span className="text-neutral-500">Gross Margin</span>
              <span className="text-[#D1FE17] font-bold">
                +${netMargin.toLocaleString()} ({marginPct}%)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AreaChart;
