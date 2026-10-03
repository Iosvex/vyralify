import React, { useState } from 'react';
import { 
  Rocket, 
  Sparkles, 
  Search, 
  Bot, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Zap, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  Layers, 
  MessageSquare, 
  Send, 
  Sliders, 
  Eye, 
  ExternalLink,
  Lock,
  ArrowRight,
  RefreshCw,
  Copy,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import SoftLockWrapper from '../common/SoftLockWrapper';

export default function PlaceholderModule({ moduleId, onNavigate }) {
  const { user, tier, updateTier, aiCredits, consumeCredit } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();

  // Assistant state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello ${user?.displayName || 'Creator'}. I am your Vyralify Operating Assistant. I can generate viral Reel hooks, optimize your bio, plan your 7-day calendar, or audit competitor structures. What would you like to build?`,
      time: 'Just now'
    }
  ]);

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal('ai_credits', 'You have reached your daily AI credit limit. Upgrade to Pro for 300 credits/day or Elite for unlimited.');
      return;
    }
    const userMsg = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: 'Now' }]);
    setChatInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `Hook tailored for @${activePage?.handle || 'your page'}:\n\n"98% of people in ${activePage?.category || 'this niche'} make this 1 rookie mistake—here is the exact 3-step playbook top 1% creators use instead:"\n\nCall-To-Action: "Comment 'BLUEPRINT' and our system will DM you the template instantly."`,
          time: 'Just now' 
        }
      ]);
    }, 500);
  };

  // 1. PAGE BUILDER
  if (moduleId === 'builder') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mb-2 font-medium">
              <Rocket className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Page Builder & Niche Intelligence</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Page Builder & Intelligence
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
              Active Scope: <span className="text-neutral-800 dark:text-neutral-200 font-mono font-medium">@{activePage?.handle || 'creator'}</span> ({activePage?.category || 'Theme Page'})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('discover_create')}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.04] hover:bg-neutral-50 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/[0.08] text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Explore Content Engine</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Profile Card & Audit Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img src={activePage?.avatar} alt={activePage?.handle} className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20" />
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">@{activePage?.handle}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">{activePage?.category} &bull; {activePage?.followersCount} Followers</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] text-xs text-neutral-700 dark:text-neutral-300 italic">
              "{activePage?.bio}"
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05]">
                <div className="text-[10px] text-neutral-400 font-mono font-medium">Connection</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> Meta Graph Active
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05]">
                <div className="text-[10px] text-neutral-400 font-mono font-medium">Engagement</div>
                <div className="font-bold text-neutral-900 dark:text-white mt-0.5 text-xs font-mono">{activePage?.engagementRate || '4.2%'}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-400" />
                <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">Automated Page Audit</h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                Health Score: {activePage?.audit?.overallScore || 82}/100
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1.5">
                <div className="font-semibold text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> Profile Strengths
                </div>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-300 text-[11px]">
                  {(activePage?.audit?.strengths || ['Clear value proposition in bio', 'Consistent visual styling']).map((s, idx) => (
                    <li key={idx}>&bull; {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50/70 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1.5">
                <div className="font-semibold text-amber-700 dark:text-amber-400 text-xs flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> Optimization Gaps
                </div>
                <ul className="space-y-1 text-neutral-600 dark:text-neutral-300 text-[11px]">
                  {(activePage?.audit?.gaps || ['No automated DM keywords setup', 'Missing link-in-bio digital storefront']).map((g, idx) => (
                    <li key={idx}>&bull; {g}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-white/[0.02] border border-emerald-200/80 dark:border-white/[0.06] flex items-start gap-2.5">
              <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-neutral-700 dark:text-neutral-300">
                <span className="font-semibold text-neutral-900 dark:text-white">Recommended Action: </span>
                {activePage?.audit?.recommendation || 'Launch an automated DM keyword on your highest-retention post to capture warm leads directly.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. AI ASSISTANT
  if (moduleId === 'assistant') {
    return (
      <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-sm overflow-hidden">
        {/* Assistant Header */}
        <div className="p-3.5 px-4 border-b border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-white/[0.05] border border-emerald-200 dark:border-white/[0.08] flex items-center justify-center text-emerald-700 dark:text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white text-xs flex items-center gap-1.5">
                <span>Vyralify Assistant</span>
                <span className="px-1.5 py-0.2 rounded bg-neutral-200/70 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-400 text-[9px] font-mono font-medium">v3.1 Flash</span>
              </div>
              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                @{activePage?.handle} &bull; {aiCredits.limit > 90000 ? 'Unlimited credits' : `${aiCredits.limit - aiCredits.usedToday} credits left`}
              </p>
            </div>
          </div>
          {tier === 'free' && (
            <button
              onClick={() => openUpgradeModal('ai_credits', 'Unlock 300 daily AI credits with Pro.')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              Get More Credits
            </button>
          )}
        </div>

        {/* Chat message thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-xs shadow-xs'
                  : 'bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-neutral-800 dark:text-neutral-300 rounded-tl-xs whitespace-pre-line'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Preset quick actions */}
        <div className="px-4 py-2 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-neutral-400 font-mono font-medium shrink-0">Prompts:</span>
          {[
            'Write 3 viral hooks for my niche',
            'Audit my bio for conversions',
            'Generate a 7-day content schedule',
            'Create a high-converting DM script'
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setChatInput(prompt)}
              className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 border border-neutral-200 dark:border-white/[0.05] text-[11px] transition-colors cursor-pointer shadow-xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input form */}
        <form onSubmit={handleSendChat} className="p-3 border-t border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0C0D12] flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Ask Vyralify Assistant about @${activePage?.handle || 'your page'}...`}
            className="flex-1 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors cursor-pointer shrink-0 shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    );
  }

  // 3. DISCOVER & CREATE
  if (moduleId === 'discover_create') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-white/[0.04] border border-emerald-200 dark:border-white/[0.08] text-emerald-700 dark:text-neutral-300 text-[11px] font-mono mb-2 font-medium">
              <Search className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
              <span>Viral Discovery & Script Engine</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Discover & Create
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
              Curated viral reels, hook formulas, and structured script generation for {activePage?.category}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Planner Limit: <span className="text-neutral-900 dark:text-white font-semibold">{tier === 'free' ? '7 Days (Free)' : '30 Days (Pro)'}</span>
            </span>
          </div>
        </div>

        {/* Hook Library */}
        <div className="space-y-3">
          <h3 className="font-semibold text-neutral-900 dark:text-white text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-neutral-400" />
            <span>High-Performing Hook Formulas for {activePage?.category}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              {
                hook: 'Stop doing [Common Mistake] if you want [Desired Outcome] in 2026.',
                type: 'Negative Framing',
                score: '98% Retention',
                engagement: '2.4M Avg Views'
              },
              {
                hook: 'I tested [Strategy A] vs [Strategy B] for 30 days. Here is what happened:',
                type: 'Case Study / Proof',
                score: '94% Retention',
                engagement: '1.8M Avg Views'
              },
              {
                hook: '3 things I wish I knew before starting [Niche] that cost me thousands:',
                type: 'Curiosity Gap',
                score: '96% Retention',
                engagement: '3.1M Avg Views'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                    <span className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 font-medium">{item.type}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.score}</span>
                  </div>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed">
                    "{item.hook}"
                  </p>
                </div>
                <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.05] flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 font-mono">{item.engagement}</span>
                  <button 
                    onClick={() => onNavigate('assistant')}
                    className="text-emerald-600 hover:underline font-semibold text-xs cursor-pointer flex items-center gap-1"
                  >
                    Use in AI Script &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. INSTAGRAM AUTOMATION (Gated by SoftLockWrapper)
  if (moduleId === 'automation') {
    return (
      <SoftLockWrapper featureKey="instagram_automation" minTier="pro">
        <div className="space-y-6 max-w-6xl mx-auto pb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-white/[0.04] border border-emerald-200 dark:border-white/[0.08] text-emerald-700 dark:text-neutral-300 text-[11px] font-mono mb-2 font-medium">
                <Bot className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
                <span>DM Automation & Lead Qualifiers</span>
              </div>
              <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                Instagram Automation Workflows
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
                Convert reel comments, story mentions, and inbound DMs into paying customers automatically.
              </p>
            </div>
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Trigger</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                  Active (342 DMs sent)
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Conversion: 28.4%</span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">Comment Keyword: "BLUEPRINT"</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Trigger: User comments "BLUEPRINT" on any recent Reel &rarr; Auto DM sent within 12 seconds with link to free guide.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                  Active (189 Leads captured)
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Conversion: 41.2%</span>
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">Story Reply Auto-Responder</h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Trigger: Inbound story reply &rarr; AI qualifies intent and offers custom link to Store checkout.
              </p>
            </div>
          </div>
        </div>
      </SoftLockWrapper>
    );
  }

  // 5. STORE & COMMERCE
  if (moduleId === 'store') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-white/[0.04] border border-emerald-200 dark:border-white/[0.08] text-emerald-700 dark:text-neutral-300 text-[11px] font-mono mb-2 font-medium">
              <ShoppingBag className="w-3 h-3 text-emerald-600 dark:text-neutral-400" />
              <span>Link-in-Bio Store & Digital Commerce</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Creator Store & Monetization
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
              Storefront URL: <span className="text-emerald-700 dark:text-neutral-200 font-mono font-medium">vyralify.me/{activePage?.handle || 'store'}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">Total Net Revenue</div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono mt-1">₹42,850</div>
            <div className="text-[10px] text-emerald-600 font-mono mt-1 font-semibold">+18.4% this month</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">Total Orders</div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono mt-1">118 sales</div>
            <div className="text-[10px] text-neutral-400 font-mono mt-1">Average order: ₹363</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">Active Products</div>
            <div className="text-2xl font-bold text-neutral-900 dark:text-white font-mono mt-1">2 / {tier === 'free' ? '1 (Free Limit)' : 'Unlimited'}</div>
            <div className="text-[10px] text-neutral-500 font-mono mt-1">
              {tier === 'free' ? 'Upgrade to Pro for unlimited products' : 'All products live'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. SETTINGS & FOUNDER CONTROLS
  if (moduleId === 'settings') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        <div className="pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 text-[11px] font-mono mb-2 font-medium">
            <Settings className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
            <span>Workspace Settings</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Settings & Subscription
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
            Manage your plan, Meta authorization tokens, and AI data consent.
          </p>
        </div>

        {/* Plan Switcher for Quick Testing */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-xs">Active Subscription Plan</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Switch tiers below to preview gating and quota limits:</p>
            </div>
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase border ${
              tier === 'elite' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              tier === 'pro' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              'bg-neutral-100 text-neutral-600 border-neutral-200'
            }`}>
              {tier.toUpperCase()} TIER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'free', name: 'Free (Starter)', price: '₹0/mo', desc: '1 Page, 20 AI credits/day, 7-day planner, 1 product' },
              { id: 'pro', name: 'Pro Creator', price: '₹499/mo', desc: '3 Pages, 300 AI credits/day, 30-day planner, Automation, Unlim products' },
              { id: 'elite', name: 'Elite Agency', price: '₹1,499/mo', desc: 'Unlimited pages, Unlimited AI, Priority support, White-label assistant' }
            ].map(p => (
              <button
                key={p.id}
                onClick={() => updateTier(p.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  tier === p.id 
                    ? 'bg-emerald-50/70 border-emerald-500 text-neutral-900 dark:text-white shadow-xs' 
                    : 'bg-neutral-50/70 dark:bg-white/[0.02] border-neutral-200/80 dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-white">{p.name}</span>
                  {tier === p.id && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="font-mono text-xs text-emerald-700 dark:text-neutral-200 my-1 font-semibold">{p.price}</div>
                <div className="text-[10px] text-neutral-500 leading-normal">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
          <h3 className="font-semibold text-neutral-900 dark:text-white text-xs">Account Credentials & Data Consent</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] text-neutral-400 font-mono font-medium">User Name</label>
              <div className="mt-1 p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] text-neutral-900 dark:text-white font-medium">
                {user?.displayName || 'Creator'}
              </div>
            </div>
            <div>
              <label className="text-[10px] text-neutral-400 font-mono font-medium">Email Address</label>
              <div className="mt-1 p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] text-neutral-900 dark:text-white font-medium">
                {user?.email || 'user@vyralify.in'}
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-white/[0.02] border border-emerald-200/80 dark:border-white/[0.05] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Data Processing Consent Accepted</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 font-semibold">Active &bull; GDPR/DPDP Compliant</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
