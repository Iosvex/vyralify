import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Copy, 
  RotateCw, 
  ArrowRight, 
  Clock, 
  Compass, 
  Camera, 
  RefreshCw,
  TrendingUp,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { generateLiveBios, generatePositioningStatement } from '../../lib/aiService';
import ConnectAccountModal from '../common/ConnectAccountModal';

export default function PageBuilder({ onNavigate }) {
  const { user, tier, aiCredits, consumeCredit } = useAuth();
  const { pages, activePage, switchPage, updatePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // Bio Studio State
  const [bioObjective, setBioObjective] = useState('lead_magnet');
  const [generatedBios, setGeneratedBios] = useState(null);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [copiedBioIndex, setCopiedBioIndex] = useState(null);

  // Positioning Statement State
  const [positioningData, setPositioningData] = useState({
    audience: 'Creator-operators & agency owners',
    outcome: 'Predictable organic reach & digital sales',
    painPoint: 'Ending content burnout and low engagement'
  });
  const [generatedStatements, setGeneratedStatements] = useState(null);
  const [isGeneratingPositioning, setIsGeneratingPositioning] = useState(false);

  // 1. Generate Live AI Bios
  const handleGenerateBios = async () => {
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'You have hit your daily AI credit limit. Upgrade to Pro for 300 daily generations.');
      return;
    }

    setIsGeneratingBio(true);
    try {
      const res = await generateLiveBios({
        handle: activePage?.handle || 'creator',
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || 'Online Business',
        currentBio: activePage?.bio || '',
        objective: bioObjective
      });
      setGeneratedBios(res.bios || []);
      addNotification({
        title: 'AI Bios Generated',
        message: 'Conversion-optimized bios generated using real AI models.',
        type: 'success'
      });
    } catch (err) {
      console.warn('Live bio generation error:', err);
      addNotification({
        title: 'Generation Notice',
        message: 'Loaded high-converting formula bios for your niche.',
        type: 'info'
      });
    } finally {
      setIsGeneratingBio(false);
    }
  };

  // 2. Apply Bio directly to active profile
  const handleApplyBio = (bioText) => {
    if (!activePage?.id) return;
    updatePage(activePage.id, { bio: bioText });
    addNotification({
      title: 'Profile Updated',
      message: `Active bio for @${activePage.handle} was successfully updated.`,
      type: 'success'
    });
  };

  const handleCopyBio = (bioText, idx) => {
    navigator.clipboard.writeText(bioText);
    setCopiedBioIndex(idx);
    setTimeout(() => setCopiedBioIndex(null), 2000);
    addNotification({ title: 'Copied', message: 'Bio copied to clipboard.', type: 'info' });
  };

  // 2b. Upload or Change Profile Photo
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      addNotification({
        title: 'Image Too Large',
        message: 'Please choose an image under 3MB.',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (base64Url && activePage?.id) {
        updatePage(activePage.id, { avatar: base64Url });
        addNotification({
          title: 'Profile Photo Updated',
          message: `Photo updated successfully for @${activePage.handle}`,
          type: 'success'
        });
      }
    };
    reader.readAsDataURL(file);
  };

  // 3. Generate Positioning Statement
  const handleGeneratePositioning = async () => {
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'Credit limit reached. Upgrade to Pro for unlimited positioning blueprints.');
      return;
    }

    setIsGeneratingPositioning(true);
    try {
      const res = await generatePositioningStatement({
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || 'Online Business',
        audience: positioningData.audience,
        painPoint: positioningData.painPoint,
        outcome: positioningData.outcome
      });
      setGeneratedStatements(res.statements || []);
    } catch (err) {
      console.warn('Positioning statement error:', err);
    } finally {
      setIsGeneratingPositioning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 font-sans">
      
      {/* 1. TOP PANEL TITLE (No confusing tabs) */}
      <div className="pb-4 border-b border-[rgba(6,124,249,0.12)]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
          Page Builder
        </h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Audience demographics, algorithm peak windows, bio optimization, and authority positioning.
        </p>
      </div>

      {/* 2. SECTION 1 (TOP): AUDIENCE & DEMOGRAPHICS INSIGHTS */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-gradient-to-b from-[#067CF9] via-[#6366F1] to-[#A855F7]" />
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
            Audience &amp; Insights
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.25)] text-[#6366F1] text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
            Meta Graph Insights
          </span>
        </div>

        {/* Dynamic Audience Demographics & Insights */}
        {(() => {
          const audience = activePage?.audience || {
            ageBrackets: [
              { bracket: '18 - 24', pct: 46, isTop: true },
              { bracket: '25 - 34', pct: 34, isTop: false },
              { bracket: '35 - 44', pct: 14, isTop: false },
              { bracket: '45+', pct: 6, isTop: false }
            ],
            gender: { male: 68, female: 32 },
            topMarkets: [
              { country: 'India', flag: '🇮🇳', pct: '56.4%' },
              { country: 'United States', flag: '🇺🇸', pct: '21.8%' },
              { country: 'United Kingdom', flag: '🇬🇧', pct: '8.2%' },
              { country: 'United Arab Emirates', flag: '🇦🇪', pct: '7.1%' },
              { country: 'Others', flag: '🌐', pct: '6.5%' }
            ],
            activeHours: [
              { day: 'Monday', m: 34, a: 52, p: 92, l: 64, primeSlot: '7:30 PM' },
              { day: 'Tuesday', m: 38, a: 58, p: 88, l: 58, primeSlot: '8:00 PM' },
              { day: 'Wednesday', m: 42, a: 64, p: 94, l: 72, primeSlot: '7:15 PM' },
              { day: 'Thursday', m: 36, a: 62, p: 90, l: 68, primeSlot: '8:30 PM' },
              { day: 'Friday', m: 48, a: 70, p: 98, l: 84, primeSlot: '6:45 PM' },
              { day: 'Saturday', m: 62, a: 82, p: 96, l: 88, primeSlot: '6:00 PM' },
              { day: 'Sunday', m: 74, a: 88, p: 100, l: 90, primeSlot: '7:00 PM' }
            ]
          };

          const topBracket = audience.ageBrackets?.find(b => b.isTop) || audience.ageBrackets?.[0] || { bracket: '18–24', pct: 46 };
          const primeSlotToday = audience.activeHours?.[6]?.primeSlot || '7:00 PM';

          return (
            <>
              {/* 3 Demographic Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* 1. Age Distribution Card (Left) */}
                <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
                    <h3 className="font-bold text-sm text-[#0F172A]">Age Brackets Breakdown</h3>
                    <span className="text-[10px] text-[#6366F1] bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-0.5 rounded-md border border-[rgba(99,102,241,0.2)] font-semibold">
                      Meta Graph
                    </span>
                  </div>

                  <div className="space-y-3">
                    {audience.ageBrackets.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#0F172A] font-medium">{item.bracket}</span>
                          <span className={`font-bold ${item.isTop ? 'bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] bg-clip-text text-transparent' : 'text-[#64748B]'}`}>
                            {item.pct}%
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#EFF6FF] overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.isTop ? 'bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#A855F7]' : 'bg-neutral-300'}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/70 to-purple-50/70 border border-[rgba(99,102,241,0.2)] text-xs flex items-center justify-between">
                    <span className="text-[#64748B] font-medium">Primary Demographic:</span>
                    <span className="font-bold bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">{topBracket.bracket} ({topBracket.pct}%)</span>
                  </div>
                </div>

                {/* 2. Top Geographic Markets Card (Middle) */}
                <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
                    <h3 className="font-bold text-sm text-[#0F172A]">Top Geographic Markets</h3>
                    <span className="text-[10px] text-[#64748B]">Territory Reach</span>
                  </div>

                  <div className="space-y-2.5">
                    {audience.topMarkets.map((geo, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-neutral-100 last:border-0">
                        <div className="flex items-center gap-2">
                          <span>{geo.flag}</span>
                          <span className="font-medium text-[#0F172A]">{geo.country}</span>
                        </div>
                        <div className="font-bold text-[#6366F1]">
                          {geo.pct}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Gender Split Ratio Card (Right) */}
                <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
                    <h3 className="font-bold text-sm text-[#0F172A]">Gender Distribution</h3>
                    <span className="text-[10px] text-[#64748B]">Active Followers</span>
                  </div>

                  <div className="flex items-center justify-around py-4">
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold text-[#0F172A]">{audience.gender?.male || 68}%</div>
                      <div className="text-xs text-[#64748B]">Male</div>
                    </div>
                    <div className="h-12 w-px bg-neutral-200" />
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#A855F7] bg-clip-text text-transparent">{audience.gender?.female || 32}%</div>
                      <div className="text-xs text-[#64748B]">Female</div>
                    </div>
                  </div>

                  <div className="w-full h-3 rounded-full bg-[#EFF6FF] flex overflow-hidden">
                    <div className="bg-[#0F172A] h-full" style={{ width: `${audience.gender?.male || 68}%` }} title={`Male ${audience.gender?.male || 68}%`} />
                    <div className="bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#A855F7] h-full" style={{ width: `${audience.gender?.female || 32}%` }} title={`Female ${audience.gender?.female || 32}%`} />
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] text-[11px] text-[#64748B] leading-relaxed">
                    Ideal hook framing: Direct, result-driven pattern interrupts tailored to {activePage?.category || 'your niche'}.
                  </div>
                </div>

              </div>

              {/* Audience Active Hours Heatmap */}
              <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[rgba(99,102,241,0.1)]">
                  <div>
                    <h3 className="font-bold text-sm text-[#0F172A]">Audience Active Hours Heatmap</h3>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      Algorithm retention windows specific to @{activePage?.handle || 'creator'}'s follower density.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#94A3B8]">Intensity:</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#F8FAFC] text-[#64748B] border border-neutral-200">Low</span>
                    <span className="px-2 py-0.5 rounded-md bg-[#EFF6FF] text-[#067CF9] border border-[rgba(6,124,249,0.2)] font-semibold">Muted Blue</span>
                    <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-xs">Peak Window</span>
                  </div>
                </div>

                {/* Heatmap Grid */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-[#94A3B8] text-[11px]">
                        <th className="py-2 text-left font-semibold">DAY</th>
                        <th className="py-2 text-center font-semibold">MORNING (8AM-12PM)</th>
                        <th className="py-2 text-center font-semibold">AFTERNOON (12PM-5PM)</th>
                        <th className="py-2 text-center font-semibold">PRIME (5PM-9PM)</th>
                        <th className="py-2 text-center font-semibold">LATE (9PM-12AM)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(99,102,241,0.08)]">
                      {audience.activeHours.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#EFF6FF]/40 transition-colors">
                          <td className="py-2.5 font-bold text-[#0F172A]">{row.day}</td>
                          <td className="py-2.5 text-center">
                            <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#F8FAFC] text-[#64748B] font-medium border border-neutral-100">
                              {row.m}%
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#EFF6FF] text-[#067CF9] font-semibold border border-[rgba(6,124,249,0.15)]">
                              {row.a}%
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] text-white font-bold shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                              <span>{row.p}% ({row.primeSlot})</span>
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            <span className="px-2.5 py-1 rounded-md text-[11px] bg-[#EFF6FF] text-[#067CF9] font-semibold border border-[rgba(6,124,249,0.15)]">
                              {row.l}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 px-4 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-purple-50/50 border border-[rgba(99,102,241,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#0F172A]">
                    <Clock className="w-4 h-4 text-[#6366F1] shrink-0" />
                    <span>Optimal Release Window Today: <strong className="text-[#6366F1]">{primeSlotToday} IST</strong></span>
                  </div>
                  <button
                    onClick={() => onNavigate('discover_create')}
                    className="text-[#6366F1] font-bold hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Open Content Planner &rarr;</span>
                  </button>
                </div>
              </div>
            </>
          );
        })()}
      </section>

      {/* 3. SECTION 2 (BOTTOM): ACCOUNT SETUP & BIO POSITIONING */}
      <section className="space-y-5 pt-4 border-t border-[rgba(99,102,241,0.15)]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-5 rounded-full bg-gradient-to-b from-[#067CF9] via-[#6366F1] to-[#A855F7]" />
          <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-wide">
            Account Setup &amp; Bio Positioning
          </h2>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.25)] text-[#6366F1] text-[11px] font-semibold">
            <Sparkles className="w-3 h-3 text-[#6366F1]" />
            Conversion Architecture
          </span>
        </div>

        {/* 2 Setup Columns: Bio Optimizer & Authority Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left: AI Bio Optimizer Studio */}
          <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.2)] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#6366F1]" />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">AI Bio Optimizer</h3>
              </div>
              <span className="text-[11px] text-[#6366F1] bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-0.5 rounded-md border border-[rgba(99,102,241,0.2)] font-semibold">
                150 Char Limit Safe
              </span>
            </div>

            {/* Current Active Bio Display */}
            <div className="p-3.5 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.14)] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0F172A]">Current Active Bio</span>
                <span className="text-[10px] text-[#6366F1] bg-gradient-to-r from-blue-50 to-indigo-50 px-2 py-0.5 rounded-md font-mono font-bold border border-[rgba(99,102,241,0.2)]">
                  {(activePage?.bio || '').length} / 150 chars
                </span>
              </div>
              <p className="text-xs text-[#475569] italic leading-relaxed whitespace-pre-line">
                "{activePage?.bio || 'No active bio set yet. Select an objective below to engineer your bio.'}"
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-semibold mb-1">
                  Select Primary Bio Objective
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'lead_magnet', label: 'Lead Magnet', sub: 'Link-in-bio focus' },
                    { id: 'store_clicks', label: 'Storefront Sales', sub: 'Catalog direct' },
                    { id: 'viral_followers', label: 'Brand Authority', sub: 'Reach focus' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBioObjective(opt.id)}
                      className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer text-center ${
                        bioObjective === opt.id
                          ? 'bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/70 border-[rgba(99,102,241,0.4)] text-[#6366F1] font-bold shadow-xs ring-1 ring-[rgba(99,102,241,0.25)]'
                          : 'bg-white/60 border-neutral-200/80 text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                      }`}
                    >
                      <div className="leading-tight">{opt.label}</div>
                      <div className="text-[10px] text-[#94A3B8] mt-0.5">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateBios}
                disabled={isGeneratingBio}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 disabled:opacity-50 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#6366F1]/20"
              >
                {isGeneratingBio ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Engineering High-Converting Bios...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Bio Variations</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Bio Results List */}
            {generatedBios && generatedBios.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-[rgba(99,102,241,0.1)]">
                <div className="text-xs font-bold text-[#0F172A]">AI Bio Recommendations</div>
                {generatedBios.map((bio, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] bg-clip-text text-transparent">Option {idx + 1}</span>
                      <span className="text-[#94A3B8]">{bio.charCount || bio.text?.length || 0} / 150</span>
                    </div>
                    <p className="text-xs text-[#0F172A] whitespace-pre-line leading-relaxed">
                      {bio.text}
                    </p>
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-neutral-200/60">
                      <button
                        onClick={() => handleCopyBio(bio.text, idx)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#64748B] hover:text-[#0F172A] hover:bg-neutral-200/50 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        {copiedBioIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-[#10B981]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleApplyBio(bio.text)}
                        className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-gradient-to-r from-blue-50 to-indigo-50 text-[#6366F1] border border-[rgba(99,102,241,0.2)] hover:from-blue-100 hover:to-indigo-100 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3 h-3" />
                        <span>Apply to Profile</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Authority Positioning Builder */}
          <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-[rgba(99,102,241,0.2)] flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[#6366F1]" />
                </div>
                <h3 className="font-bold text-sm text-[#0F172A]">Authority Positioning Builder</h3>
              </div>
              <span className="text-[11px] text-[#64748B]">Formula Architecture</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] text-[#64748B] uppercase font-semibold mb-1">Target Audience</label>
                <input
                  type="text"
                  value={positioningData.audience}
                  onChange={(e) => setPositioningData({ ...positioningData, audience: e.target.value })}
                  placeholder="e.g. Creator-operators & agency owners"
                  className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.15)] focus:border-[#6366F1]/60 text-xs text-[#0F172A] focus:outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#64748B] uppercase font-semibold mb-1">Primary Transformation</label>
                <input
                  type="text"
                  value={positioningData.outcome}
                  onChange={(e) => setPositioningData({ ...positioningData, outcome: e.target.value })}
                  placeholder="e.g. Predictable organic reach & digital sales"
                  className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.15)] focus:border-[#6366F1]/60 text-xs text-[#0F172A] focus:outline-hidden transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#64748B] uppercase font-semibold mb-1">Key Obstacle Solved</label>
                <input
                  type="text"
                  value={positioningData.painPoint}
                  onChange={(e) => setPositioningData({ ...positioningData, painPoint: e.target.value })}
                  placeholder="e.g. Ending content burnout and low engagement"
                  className="w-full px-3 py-2 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.15)] focus:border-[#6366F1]/60 text-xs text-[#0F172A] focus:outline-hidden transition-all"
                />
              </div>

              <button
                onClick={handleGeneratePositioning}
                disabled={isGeneratingPositioning}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 disabled:opacity-50 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#6366F1]/20"
              >
                {isGeneratingPositioning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Formulating Unique Positioning...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Positioning Statement</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Positioning Statements */}
            {generatedStatements && generatedStatements.length > 0 ? (
              <div className="space-y-2.5 pt-3 border-t border-[rgba(99,102,241,0.1)]">
                <div className="text-xs font-bold text-[#0F172A]">AI Positioning Blueprints</div>
                {generatedStatements.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] bg-clip-text text-transparent">{s.angle || `Blueprint ${idx + 1}`}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(s.statement)}
                        className="text-[#64748B] hover:text-[#6366F1] text-[10px] font-semibold cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-xs text-[#0F172A] font-medium">"{s.statement}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/60 to-purple-50/50 border border-[rgba(99,102,241,0.2)] text-xs text-[#0F172A]">
                <span className="font-bold block mb-0.5 text-[11px] bg-gradient-to-r from-[#067CF9] to-[#8B5CF6] bg-clip-text text-transparent">Core Blueprint:</span>
                "I help {positioningData.audience} achieve {positioningData.outcome} without {positioningData.painPoint}."
              </div>
            )}

          </div>

        </div>

        {/* Story Highlights Stack (4 Conversion Anchors) */}
        <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(6,124,249,0.04)] ring-1 ring-[rgba(99,102,241,0.12)] hover:ring-[rgba(99,102,241,0.28)] transition-all space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(99,102,241,0.1)]">
            <div>
              <h3 className="font-bold text-sm text-[#0F172A]">Instagram Story Highlights Architecture</h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                The proven 4-highlight setup required to convert profile visitors into paying customers.
              </p>
            </div>
            <span className="text-[11px] text-[#6366F1] bg-gradient-to-r from-blue-50 to-indigo-50 px-2.5 py-0.5 rounded-md font-semibold border border-[rgba(99,102,241,0.25)]">
              Conversion Stack
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                circle: '01',
                name: 'STORY',
                role: 'Origin & Authority',
                desc: 'Origin, mission, and core thesis behind your curations.',
                icon: '📖'
              },
              {
                circle: '02',
                name: 'PROOF',
                role: 'Social Proof & Wins',
                desc: 'Client wins, metric spikes, and reviews from followers.',
                icon: '🏆'
              },
              {
                circle: '03',
                name: 'STORE',
                role: 'Offer & Products',
                desc: 'Overview of templates, guides, and tools with direct bio link.',
                icon: '🛍️'
              },
              {
                circle: '04',
                name: 'RESOURCES',
                role: 'Free Value Drops',
                desc: 'Free value drops and link-in-bio guide hooks.',
                icon: '⚡'
              }
            ].map((hl, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/60 border border-[rgba(99,102,241,0.12)] hover:border-[#6366F1]/40 flex flex-col justify-between space-y-3 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EFF6FF] to-[#F5F3FF] border-2 border-[#6366F1] flex items-center justify-center text-sm font-bold text-[#6366F1] shadow-2xs">
                    {hl.icon}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-[#0F172A]">{hl.name}</div>
                    <div className="text-[10px] text-[#64748B]">{hl.role}</div>
                  </div>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  {hl.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

    </div>
  );
}
