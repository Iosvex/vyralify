import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Lock,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Grid, 
  Area, 
  XAxis, 
  ChartTooltip 
} from './charts/AreaChart';
import { 
  StatCardArea, 
  StatCardLine, 
  StatCardChoropleth 
} from './charts/BklitStatCards';
import { CaseStudyFlipStack } from './ui/case-study-flip-stack';
import { curveMonotoneX } from '@visx/curve';

export default function SocialProof() {
  const [showRevenue, setShowRevenue] = useState(true);
  const [showCosts, setShowCosts] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  // Compounding 30-day ledger curve with authentic creator economy growth
  const chartData = useMemo(() => Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // Compounding growth curve: starting at ~$24K and scaling up to ~$148K with realistic volatility
    const growthFactor = Math.pow(day / 30, 1.45);
    const baseRevenue = 22000 + growthFactor * 122000;
    const revNoise = Math.sin(day * 1.5) * 4500 + Math.cos(day * 2.7) * 2200;
    const revenue = Math.round(baseRevenue + revNoise);

    // Lean platform escrow costs: $7,500 -> $17,200
    const baseCost = 7500 + (day / 30) * 9700;
    const costNoise = Math.cos(day * 1.3) * 600;
    const costs = Math.round(baseCost + costNoise);

    return {
      date: new Date(2024, 0, day),
      revenue,
      costs,
    };
  }), []);

  const livePayouts = [
    { creator: "@arjun_vfx", amount: "₹42,500.00", campaign: "PodClip Alpha", time: "2m ago", tx: "0x8f...4e21" },
    { creator: "@neha_reels", amount: "₹89,100.00", campaign: "SaaS Launch Bounty", time: "8m ago", tx: "0x3c...19a0" },
    { creator: "@karan_media", amount: "₹1,20,000.00", campaign: "FinTech 1M Sprint", time: "14m ago", tx: "0x7d...88b2" },
    { creator: "@priya_shorts", amount: "₹65,400.00", campaign: "Founder Series #04", time: "22m ago", tx: "0x1a...90f4" },
  ];

  return (
    <section id="social-proof" className="relative py-20 lg:py-28 bg-white dark:bg-black text-neutral-900 dark:text-white border-t border-neutral-200 dark:border-[#1C1C20] transition-colors duration-200 overflow-x-clip">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D1FE17]/[0.02] blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-neutral-100 dark:bg-[#121214] border border-neutral-300 dark:border-[#242426] text-neutral-700 dark:text-neutral-300 text-xs font-mono font-medium tracking-wider uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1FE17] animate-pulse" />
            <span>VERIFIED TRUST PROTOCOL // 04</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-5">
            Can I trust it? <br />
            <span className="text-black dark:text-white">Look at the ledger.</span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg leading-relaxed">
            Zero vanity metrics. Institutional-grade escrow settlement infrastructure engineered for elite short-form creators, clippers, and media agencies.
          </p>
        </div>

        {/* BKLIT 3-CARD STATISTICAL DATA ROW (@bklit/stat-card-area-01, line-01, choropleth-01) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCardArea
            title="Total Creator Volume"
            value="$128,450.00"
            subtitle="Verified net payout this cycle"
            trend={24.8}
          />
          <StatCardLine
            title="Active Creator Sync"
            value="4,890 Active"
            subtitle="Real-time synchronized clippers"
            trend={14.2}
          />
          <StatCardChoropleth
            title="Unique Global Reach"
            value="14.2M Reach"
            subtitle="Tri-platform organic views tracked"
            trend={31.4}
          />
        </div>

        {/* INTERACTIVE BKLIT AREA CHART: REVENUE VS COSTS VELOCITY */}
        <div className="rounded-2xl p-5 sm:p-8 bg-[#0B0C10] border border-[#1A1C24] shadow-xl mb-12 relative overflow-hidden">
          {/* Top specular glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D1FE17]/50 to-transparent" />

          {/* Chart Header Console */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1A1C24] mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                <Lock className="w-3.5 h-3.5 text-[#D1FE17]" />
                <span>Audited Escrow Velocity // 30-Day Cycle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Creator Revenue vs. Campaign Costs
              </h3>
            </div>

            {/* Interactive Series Toggles & Segment Reset */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => setShowRevenue(!showRevenue)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
                  showRevenue 
                    ? 'bg-[#14230E] border-[#223B17] text-[#D1FE17] font-semibold' 
                    : 'bg-[#12131A] border-[#202330] text-neutral-500'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${showRevenue ? 'bg-[#D1FE17]' : 'bg-neutral-600'}`} />
                <span>Revenue</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCosts(!showCosts)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
                  showCosts 
                    ? 'bg-[#181A24] border-[#2B2F42] text-white font-semibold' 
                    : 'bg-[#12131A] border-[#202330] text-neutral-500'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${showCosts ? 'bg-white' : 'bg-neutral-600'}`} />
                <span>Costs</span>
              </button>

              <button
                type="button"
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 cursor-pointer ${
                  autoPlay 
                    ? 'bg-[#12200D] border-[#223B17] text-[#D1FE17]' 
                    : 'bg-[#12131A] border-[#202330] text-neutral-400 hover:text-white'
                }`}
                title="Toggle automated telemetry scanning"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${autoPlay ? 'bg-[#D1FE17] animate-pulse' : 'bg-neutral-600'}`} />
                <span>{autoPlay ? 'Auto-Scan: ON' : 'Auto: PAUSED'}</span>
              </button>

              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10121A] border border-[#1E212E] text-neutral-400 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Latency: 14ms</span>
              </div>
            </div>
          </div>

          {/* Area Chart Component with @visx/curve MonotoneX */}
          <div className="w-full relative">
            <AreaChart 
              aspectRatio="4 / 1" 
              data={chartData} 
              autoPlay={autoPlay}
            >
              <Grid horizontal />
              {showRevenue && (
                <Area 
                  curve={curveMonotoneX} 
                  dataKey="revenue" 
                  fill="var(--chart-line-primary, #D1FE17)" 
                  fillOpacity={0.20} 
                  stroke="#D1FE17"
                  strokeWidth={2} 
                />
              )}
              {showCosts && (
                <Area 
                  curve={curveMonotoneX} 
                  dataKey="costs" 
                  fill="var(--chart-line-secondary, #FFFFFF)" 
                  fillOpacity={0.08} 
                  stroke="#9CA3AF"
                  strokeWidth={1.5} 
                />
              )}
              <XAxis />
              <ChartTooltip />
            </AreaChart>
          </div>

          {/* Clean Institutional Telemetry Ledger Status Bar */}
          <div className="mt-5 pt-4 border-t border-[#161822] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">30D Cumulative Ledger</span>
              <span className="text-white font-bold text-sm">
                $2,842,900 <span className="text-[#D1FE17] text-xs font-normal">+28.4%</span>
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">Avg Clipper RPM</span>
              <span className="text-white font-bold text-sm">
                $8.40 <span className="text-neutral-400 text-xs font-normal">/ 1k views</span>
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">Escrow Settlement</span>
              <span className="text-emerald-400 font-bold text-sm">&lt; 90 seconds</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-neutral-500 text-[10px] uppercase tracking-wider">Counterparty Risk</span>
              <span className="text-[#D1FE17] font-bold text-sm">
                0.00% <span className="text-neutral-500 text-[10px] font-normal">(Smart Escrow)</span>
              </span>
            </div>
          </div>
        </div>

        {/* EDITORIAL SCROLL-DRIVEN CASE STUDY FLIP STACK (@componentry/case-study-flip-stack) */}
        <div className="mt-8 mb-4 -mx-4 sm:-mx-6 lg:-mx-8">
          <CaseStudyFlipStack 
            hint="Scroll Down to Flip"
            heading="Verified Creator Case Studies."
            endLabel="The Ledger Never Lies."
          />
        </div>

        {/* Live Automated Settlement Stream & Verified Trust Ratings */}
        <div className="rounded-2xl p-6 sm:p-8 bg-neutral-50 dark:bg-[#0B0C10] border border-neutral-200 dark:border-[#1C1F2B] shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-neutral-200 dark:border-[#1A1C24] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h4 className="text-base font-semibold text-neutral-900 dark:text-white">Live Automated Settlement Stream</h4>
                <p className="text-xs font-mono text-neutral-500">Autonomous smart contract distribution nodes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#D1FE17]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-mono text-neutral-400">
                <strong className="text-neutral-900 dark:text-white">4.96 / 5.0</strong> (1,480+ clippers)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {livePayouts.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-white dark:bg-[#12141C] border border-neutral-200 dark:border-[#202330] flex flex-col justify-between shadow-xs transition-all hover:border-[#D1FE17]/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold text-neutral-900 dark:text-white">{item.creator}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold">{item.time}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 font-mono mb-3 truncate">
                    {item.campaign}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 dark:border-[#1A1D27] flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-black dark:text-[#D1FE17]">{item.amount}</span>
                  <span className="text-[9px] font-mono text-neutral-500">{item.tx}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
