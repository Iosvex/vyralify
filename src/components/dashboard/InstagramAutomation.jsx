import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Lock, 
  Plus, 
  Check, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  Clock, 
  Download, 
  TrendingUp, 
  AlertCircle, 
  Sliders, 
  RefreshCw, 
  Pause, 
  Play, 
  ExternalLink,
  MessageCircle,
  CornerDownRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import SoftLockWrapper from '../common/SoftLockWrapper';

export default function InstagramAutomation({ onNavigate }) {
  const { user, tier } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Active Sub-Tab: 'triggers' | 'leads' | 'inbox' | 'analytics'
  const [activeTab, setActiveTab] = useState('triggers');

  // Triggers List State
  const [triggers, setTriggers] = useState([
    {
      id: 'trig_1',
      name: 'Reel Comment "BLUEPRINT" Lead Magnet',
      type: 'comment',
      keyword: 'BLUEPRINT',
      status: 'active',
      dmsSent: 384,
      conversionRate: '34.2%',
      publicReplies: [
        'Sent to your DM! Check your requests 📥',
        'Just messaged you the link! 🔥',
        'Check your inbox, blueprint is ready ⚡'
      ],
      dmMessage: `Hey {username}! Here is the private blueprint link you requested:\n\n🔗 vyralify.me/${activePage?.handle || 'creator'}/blueprint\n\nLet me know if you have any questions!`,
      delaySeconds: 12
    },
    {
      id: 'trig_2',
      name: 'Story Reply "VAULT" Auto-Responder',
      type: 'story',
      keyword: 'VAULT',
      status: 'active',
      dmsSent: 192,
      conversionRate: '41.8%',
      publicReplies: [],
      dmMessage: `Appreciate you replying to my story! Here is exclusive access to the 2026 Resource Vault:\n\n👉 vyralify.me/${activePage?.handle || 'creator'}/vault`,
      delaySeconds: 5
    },
    {
      id: 'trig_3',
      name: 'DM Keyword "START" Consultation Funnel',
      type: 'dm',
      keyword: 'START',
      status: 'paused',
      dmsSent: 86,
      conversionRate: '28.0%',
      publicReplies: [],
      dmMessage: `Welcome! Let's get your theme page dialed in. What niche are you launching in? (1) Business (2) Fitness (3) Lifestyle`,
      delaySeconds: 0
    }
  ]);

  // Create Trigger Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState({
    name: '',
    type: 'comment',
    keyword: '',
    publicReply: 'Sent to your DM! Check requests 📥',
    dmMessage: `Hey {username}! Here is your download link: vyralify.me/${activePage?.handle || 'creator'}`,
    delaySeconds: 10
  });

  // Leads CRM Table State
  const [leads, setLeads] = useState([
    { id: 'lead_1', handle: '@vikram.growth', trigger: 'BLUEPRINT', timestamp: '12 mins ago', status: 'Converted', source: 'Reel #42' },
    { id: 'lead_2', handle: '@sara_creates', trigger: 'VAULT', timestamp: '45 mins ago', status: 'Link Clicked', source: 'Story #18' },
    { id: 'lead_3', handle: '@rohit_saas', trigger: 'BLUEPRINT', timestamp: '2 hours ago', status: 'DM Sent', source: 'Reel #42' },
    { id: 'lead_4', handle: '@aarav.visuals', trigger: 'START', timestamp: '5 hours ago', status: 'Converted', source: 'Direct DM' },
    { id: 'lead_5', handle: '@priya_fitness', trigger: 'VAULT', timestamp: '1 day ago', status: 'Link Clicked', source: 'Story #17' }
  ]);

  // AI Inbox Simulation State
  const [activeConversation, setActiveConversation] = useState({
    userHandle: '@vikram.growth',
    humanOverride: false,
    messages: [
      { sender: 'user', text: 'BLUEPRINT', time: '14:20' },
      { sender: 'bot', text: 'Hey Vikram! Here is the private blueprint link you requested: vyralify.me/creator/blueprint', time: '14:20' },
      { sender: 'user', text: 'Thanks! Does this work for beginners with under 1,000 followers?', time: '14:22' },
      { sender: 'bot', text: 'Yes, absolutely. The first module is specifically designed for 0 to 10K follower scaling without needing your face on camera.', time: '14:23' }
    ]
  });

  // Toggle trigger active / paused
  const handleToggleTrigger = (id) => {
    setTriggers(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'active' ? 'paused' : 'active';
        addNotification({
          title: `Trigger ${nextStatus === 'active' ? 'Activated' : 'Paused'}`,
          message: `${t.name} is now ${nextStatus}.`,
          type: nextStatus === 'active' ? 'success' : 'info'
        });
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  // Add new trigger
  const handleSaveNewTrigger = (e) => {
    e.preventDefault();
    if (!newTrigger.keyword.trim() || !newTrigger.name.trim()) return;

    // Check Plan Limits
    // Free: 0 (locked), Pro: 3 triggers, Elite: Unlimited
    if (tier === 'pro' && triggers.length >= 3) {
      openUpgradeModal('instagram_automation', 'Pro plan includes 3 active automations. Upgrade to Elite for unlimited triggers.');
      return;
    }

    const created = {
      id: 'trig_' + Date.now(),
      name: newTrigger.name,
      type: newTrigger.type,
      keyword: newTrigger.keyword.toUpperCase().trim(),
      status: 'active',
      dmsSent: 0,
      conversionRate: '0.0%',
      publicReplies: newTrigger.publicReply ? [newTrigger.publicReply] : [],
      dmMessage: newTrigger.dmMessage,
      delaySeconds: Number(newTrigger.delaySeconds) || 10
    };

    setTriggers([created, ...triggers]);
    setIsCreateModalOpen(false);
    setNewTrigger({
      name: '',
      type: 'comment',
      keyword: '',
      publicReply: 'Sent to your DM! Check requests 📥',
      dmMessage: `Hey {username}! Here is your download link: vyralify.me/${activePage?.handle || 'creator'}`,
      delaySeconds: 10
    });
    addNotification({
      title: 'Trigger Created',
      message: `Automated funnel for keyword "${created.keyword}" is now live.`,
      type: 'success'
    });
  };

  // Export Leads to CSV
  const handleExportLeadsCsv = () => {
    const headers = 'Handle,Trigger,Source,Status,Timestamp\n';
    const rows = leads.map(l => `${l.handle},${l.trigger},${l.source},${l.status},${l.timestamp}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_leads_${activePage?.handle || 'creator'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Leads Exported',
      message: 'Downloaded CSV file with all captured contacts.',
      type: 'success'
    });
  };

  return (
    <SoftLockWrapper featureKey="instagram_automation" minTier="pro">
      <div className="space-y-6 max-w-7xl mx-auto pb-16">
        
        {/* 1. MODULE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mb-2 font-medium">
              <Bot className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Phase 6 &bull; Instagram Automation & Lead Conversion Engine</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Instagram Automations</span>
              <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-[10px] font-mono text-neutral-600 dark:text-neutral-300 font-normal">
                Meta Graph Active &bull; @{activePage?.handle || 'creator'}
              </span>
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">
              Turn reel comments, story replies, and inbound DMs into qualified leads and digital storefront customers 24/7.
            </p>
          </div>

          {/* Sub-Tab Navigation Bar & Action */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white dark:bg-[#0C0D12] p-1 rounded-xl border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
              {[
                { id: 'triggers', label: 'Triggers', icon: Zap },
                { id: 'leads', label: 'Leads CRM', icon: Users },
                { id: 'inbox', label: 'AI Inbox', icon: MessageSquare },
                { id: 'analytics', label: 'Safety & Rate Limits', icon: ShieldCheck }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Trigger</span>
            </button>
          </div>
        </div>

        {/* 2. SUB-TAB: TRIGGERS BUILDER LIST */}
        {activeTab === 'triggers' && (
          <div className="space-y-4">
            
            {/* KPI Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Total DMs Delivered</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">662 DMs</div>
                <span className="text-[10px] text-emerald-600 font-mono mt-1 block font-semibold">+24% vs last week</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Average Conversion</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">36.4%</div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Industry avg: 14.8%</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Active Automations</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                  {triggers.filter(t => t.status === 'active').length} / {tier === 'pro' ? '3 (Pro Limit)' : 'Unlimited'}
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Meta Graph Verified</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Safety Guard Score</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Safe</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Human Delay Active</span>
              </div>
            </div>

            {/* Triggers Cards List */}
            <div className="space-y-3.5">
              {triggers.map(trig => {
                const isActive = trig.status === 'active';

                return (
                  <div
                    key={trig.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                          isActive 
                            ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' 
                            : 'bg-neutral-100 dark:bg-white/[0.05] text-neutral-400'
                        }`}>
                          <Zap className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                              {trig.name}
                            </h3>
                            <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-semibold uppercase ${
                              isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-100 text-neutral-500'
                            }`}>
                              {trig.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 font-mono mt-0.5">
                            Trigger Type: {trig.type.toUpperCase()} &bull; Keyword: <span className="font-bold text-emerald-600">"{trig.keyword}"</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="text-right mr-2 hidden sm:block">
                          <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white block">{trig.dmsSent} sent</span>
                          <span className="text-[10px] text-emerald-600 font-mono">{trig.conversionRate} CTR</span>
                        </div>
                        <button
                          onClick={() => handleToggleTrigger(trig.id)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                            isActive
                              ? 'bg-neutral-50 dark:bg-white/[0.04] border-neutral-200 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100'
                              : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          }`}
                        >
                          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          <span>{isActive ? 'Pause' : 'Activate'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Funnel Flow Visual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {trig.publicReplies.length > 0 && (
                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 block font-semibold">1. Public Comment Reply (Randomized):</span>
                          <p className="text-neutral-700 dark:text-neutral-300 italic text-[11px]">"{trig.publicReplies[0]}"</p>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1 md:col-span-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                          <span className="font-semibold">2. Automated Direct Message ({trig.delaySeconds}s delay):</span>
                          <span className="text-emerald-600">Meta Compliant</span>
                        </div>
                        <p className="text-neutral-800 dark:text-neutral-200 text-[11px] whitespace-pre-line leading-relaxed">
                          "{trig.dmMessage}"
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 3. SUB-TAB: LEADS CRM TABLE */}
        {activeTab === 'leads' && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Lead Collector & Audience CRM</h3>
                <p className="text-xs text-neutral-500">Every follower who triggered an automation captured into an exportable database.</p>
              </div>

              <button
                onClick={handleExportLeadsCsv}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to CSV</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200/80 dark:border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                    <th className="pb-2.5 font-medium">Follower</th>
                    <th className="pb-2.5 font-medium">Trigger Keyword</th>
                    <th className="pb-2.5 font-medium">Source Post</th>
                    <th className="pb-2.5 font-medium">Status</th>
                    <th className="pb-2.5 font-medium text-right">Captured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200/60 dark:divide-white/[0.04]">
                  {leads.map(lead => (
                    <tr key={lead.id} className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.02]">
                      <td className="py-3 font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-white/[0.05] dark:text-white flex items-center justify-center text-[10px]">
                          @
                        </div>
                        <span>{lead.handle}</span>
                      </td>
                      <td className="py-3 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                        "{lead.trigger}"
                      </td>
                      <td className="py-3 text-neutral-500 font-mono">
                        {lead.source}
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          lead.status === 'Converted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                          lead.status === 'Link Clicked' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                          'bg-neutral-100 text-neutral-600'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-neutral-400 font-mono text-[11px]">
                        {lead.timestamp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SUB-TAB: AI INBOX AUTO-CONVERSATION */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Contacts list */}
            <div className="lg:col-span-4 p-4 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-2">
              <span className="text-xs font-mono text-neutral-400 block mb-2 font-semibold">Live Follower Chats</span>
              {[
                { handle: '@vikram.growth', lastMsg: 'Does this work for beginners?', unread: true },
                { handle: '@sara_creates', lastMsg: 'Link clicked 45m ago', unread: false },
                { handle: '@rohit_saas', lastMsg: 'BLUEPRINT delivered', unread: false }
              ].map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveConversation(prev => ({ ...prev, userHandle: c.handle }))}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeConversation.userHandle === c.handle
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/40 text-neutral-900 dark:text-white font-medium'
                      : 'bg-transparent border-transparent hover:bg-neutral-50 dark:hover:bg-white/[0.02] text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{c.handle}</span>
                    {c.unread && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <p className="text-[11px] text-neutral-400 truncate mt-0.5">{c.lastMsg}</p>
                </div>
              ))}
            </div>

            {/* Simulated Live Thread */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs flex flex-col justify-between h-[480px]">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    @
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 dark:text-white text-xs">{activeConversation.userHandle}</h4>
                    <span className="text-[10px] text-emerald-600 font-mono">AI Qualifying Agent Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveConversation(prev => ({ ...prev, humanOverride: !prev.humanOverride }));
                      addNotification({
                        title: activeConversation.humanOverride ? 'AI Resumed' : 'Human Override Active',
                        message: activeConversation.humanOverride ? 'AI auto-conversations resumed.' : 'AI paused for this user. Human can respond manually.',
                        type: 'info'
                      });
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeConversation.humanOverride
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-neutral-100 dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {activeConversation.humanOverride ? '👤 Manual Takeover Active' : '🤖 AI Auto-Chat'}
                  </button>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {activeConversation.messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-neutral-100 dark:bg-white/[0.05] text-neutral-900 dark:text-white rounded-tl-xs'
                        : 'bg-emerald-600 text-white font-medium rounded-tr-xs shadow-xs'
                    }`}>
                      {m.text}
                      <span className="text-[9px] opacity-70 block text-right mt-1 font-mono">{m.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input placeholder */}
              <div className="pt-3 border-t border-neutral-200/80 dark:border-white/[0.06] text-center text-xs text-neutral-400 font-mono">
                AI is monitoring in real-time. Click "Manual Takeover" to message directly via Meta API.
              </div>
            </div>

          </div>
        )}

        {/* 5. SUB-TAB: SAFETY & RATE LIMITS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Meta Graph Rate-Limit Safeguards</span>
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Vyralify enforces Instagram's official messaging throttle rules to prevent shadowbans and spam flags.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-1">
                    <span>Hourly DM Queue Capacity</span>
                    <span className="text-emerald-600 font-semibold">28 / 200 DMs/hr</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-white/[0.05] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '14%' }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
                  <span className="font-semibold block font-mono text-[11px]">Active Protective Measures:</span>
                  <p>&bull; Randomized 5s to 20s delays between outbound messages</p>
                  <p>&bull; 3 randomized public comment variations</p>
                  <p>&bull; Automatic human takeover when aggressive spam detected</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                Connected Meta App Credentials
              </h3>
              <p className="text-xs text-neutral-500">
                Official Facebook Graph API integration running on Vyralify v3.1 webhook engine.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">App ID:</span>
                  <span className="text-neutral-900 dark:text-white">2269459297171981</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">Webhook Status:</span>
                  <span className="text-emerald-600 font-semibold">Online (Active)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">Permissions:</span>
                  <span className="text-neutral-900 dark:text-white">instagram_manage_messages, pages_messaging</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. CREATE TRIGGER MODAL */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200 dark:border-white/[0.08] shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Create New Trigger Automation</h3>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600 text-sm cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveNewTrigger} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Automation Name</label>
                  <input
                    type="text"
                    required
                    value={newTrigger.name}
                    onChange={(e) => setNewTrigger({ ...newTrigger, name: e.target.value })}
                    placeholder="e.g. Reel Comment VAULT Guide Funnel"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-neutral-500 font-medium">Trigger Source</label>
                    <select
                      value={newTrigger.type}
                      onChange={(e) => setNewTrigger({ ...newTrigger, type: e.target.value })}
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                    >
                      <option value="comment">Reel Comment Keyword</option>
                      <option value="story">Story Reply</option>
                      <option value="dm">Inbound DM Keyword</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-neutral-500 font-medium">Trigger Keyword</label>
                    <input
                      type="text"
                      required
                      value={newTrigger.keyword}
                      onChange={(e) => setNewTrigger({ ...newTrigger, keyword: e.target.value })}
                      placeholder="e.g. VAULT"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs uppercase font-mono font-bold text-emerald-600"
                    />
                  </div>
                </div>

                {newTrigger.type === 'comment' && (
                  <div className="space-y-1">
                    <label className="font-mono text-neutral-500 font-medium">Public Comment Reply</label>
                    <input
                      type="text"
                      value={newTrigger.publicReply}
                      onChange={(e) => setNewTrigger({ ...newTrigger, publicReply: e.target.value })}
                      placeholder="Sent to your DM! Check requests 📥"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Automated Direct Message</label>
                  <textarea
                    rows={3}
                    required
                    value={newTrigger.dmMessage}
                    onChange={(e) => setNewTrigger({ ...newTrigger, dmMessage: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl p-3 text-xs text-neutral-900 dark:text-white"
                  />
                  <span className="text-[10px] text-neutral-400 font-mono">Use {'{username}'} to personalize.</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-200/80 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-3 py-1.5 rounded-xl text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer shadow-xs"
                  >
                    Launch Automation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </SoftLockWrapper>
  );
}
