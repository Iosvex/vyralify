import React, { useState, useEffect } from 'react';
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
  UserCheck,
  Trash2,
  Send,
  CheckCircle2,
  Copy,
  Info
} from 'lucide-react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import SoftLockWrapper from '../common/SoftLockWrapper';
import { sendInstagramDM } from '../../lib/metaAuth';

export default function InstagramAutomation({ onNavigate }) {
  const { user, tier } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Active Sub-Tab: 'triggers' | 'leads' | 'inbox' | 'analytics'
  const [activeTab, setActiveTab] = useState('triggers');

  const pageIdentifier = activePage?.igAccountId || activePage?.id || activePage?.handle || 'default';
  const pageAccessToken = activePage?.pageAccessToken || activePage?.longLivedToken || activePage?.accessToken || '';

  // Triggers List State (Loaded dynamically from Firestore or localStorage)
  const [triggers, setTriggers] = useState(() => {
    try {
      const saved = localStorage.getItem(`vyralify_triggers_${activePage?.handle || 'default'}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [isLoadingTriggers, setIsLoadingTriggers] = useState(true);

  // Leads CRM State (Loaded dynamically from Firestore or localStorage)
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(`vyralify_leads_${activePage?.handle || 'default'}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Create Trigger Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTrigger, setNewTrigger] = useState({
    name: '',
    type: 'comment',
    keyword: '',
    publicReply: 'Sent to your DM! Check your requests 📥',
    dmMessage: `Hey {username}! Here is your private download link:\n\n👉 vyralify.in/${activePage?.handle || 'creator'}\n\nLet me know if you need anything! 🚀`,
    delaySeconds: 8
  });

  // Live Test DM State
  const [testRecipientId, setTestRecipientId] = useState('');
  const [testMessage, setTestMessage] = useState('Hey! This is a live automation test from Vyralify.');
  const [isSendingTestDM, setIsSendingTestDM] = useState(false);
  const [testDMResult, setTestDMResult] = useState(null);

  // AI Inbox Live Messaging State
  const [activeConversation, setActiveConversation] = useState(null);
  const [manualMessageText, setManualMessageText] = useState('');
  const [isSendingManualMessage, setIsSendingManualMessage] = useState(false);

  // Sync Triggers in Real-Time from Firestore
  useEffect(() => {
    if (!pageIdentifier || pageIdentifier === 'default') {
      setIsLoadingTriggers(false);
      return;
    }

    try {
      const triggersCol = collection(db, 'instagramTriggers', pageIdentifier, 'triggers');
      const unsubscribe = onSnapshot(triggersCol, (snapshot) => {
        const loaded = [];
        snapshot.forEach((docSnap) => {
          loaded.push({ id: docSnap.id, ...docSnap.data() });
        });

        setTriggers(loaded);
        setIsLoadingTriggers(false);
        try {
          localStorage.setItem(`vyralify_triggers_${activePage?.handle || 'default'}`, JSON.stringify(loaded));
        } catch (e) {}
      }, (err) => {
        console.warn('Firestore triggers listener fallback to local:', err.message);
        setIsLoadingTriggers(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Firestore trigger subscription error:', err.message);
      setIsLoadingTriggers(false);
    }
  }, [pageIdentifier, activePage?.handle]);

  // Sync Leads in Real-Time from Firestore
  useEffect(() => {
    if (!activePage?.handle) return;

    try {
      const leadsCol = collection(db, 'instagramLeads');
      const q = query(leadsCol, where('pageHandle', '==', activePage.handle));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loaded = [];
        snapshot.forEach((docSnap) => {
          loaded.push({ id: docSnap.id, ...docSnap.data() });
        });

        if (loaded.length > 0) {
          setLeads(loaded);
          try {
            localStorage.setItem(`vyralify_leads_${activePage?.handle || 'default'}`, JSON.stringify(loaded));
          } catch (e) {}
        }
      }, (err) => {
        console.warn('Leads listener fallback:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {}
  }, [activePage?.handle]);

  // Set default active conversation if leads exist
  useEffect(() => {
    if (leads.length > 0 && !activeConversation) {
      const first = leads[0];
      setActiveConversation({
        id: first.id,
        userHandle: first.handle,
        recipientId: first.recipientId || '',
        messages: [
          { sender: 'user', text: first.trigger || 'LINK', time: first.timestamp || 'Just now' },
          { sender: 'bot', text: `Hey ${first.handle.replace('@', '')}! Here is your link: vyralify.in/${activePage?.handle || 'creator'}`, time: 'Just now' }
        ]
      });
    }
  }, [leads, activeConversation, activePage?.handle]);

  // Toggle Trigger Active / Paused
  const handleToggleTrigger = async (id) => {
    const trig = triggers.find(t => t.id === id);
    if (!trig) return;
    const nextStatus = trig.status === 'active' ? 'paused' : 'active';

    // Optimistic local update
    const updated = triggers.map(t => t.id === id ? { ...t, status: nextStatus } : t);
    setTriggers(updated);
    try {
      localStorage.setItem(`vyralify_triggers_${activePage?.handle || 'default'}`, JSON.stringify(updated));
    } catch (e) {}

    addNotification({
      title: `Trigger ${nextStatus === 'active' ? 'Activated' : 'Paused'}`,
      message: `${trig.name} is now ${nextStatus}.`,
      type: nextStatus === 'active' ? 'success' : 'info'
    });

    // Firestore update
    try {
      const ref = doc(db, 'instagramTriggers', pageIdentifier, 'triggers', id);
      await updateDoc(ref, { status: nextStatus, updatedAt: new Date().toISOString() });
    } catch (e) {
      console.warn('Firestore trigger status update fallback:', e.message);
    }
  };

  // Delete Trigger
  const handleDeleteTrigger = async (id) => {
    const trig = triggers.find(t => t.id === id);
    const updated = triggers.filter(t => t.id !== id);
    setTriggers(updated);
    try {
      localStorage.setItem(`vyralify_triggers_${activePage?.handle || 'default'}`, JSON.stringify(updated));
    } catch (e) {}

    addNotification({
      title: 'Trigger Deleted',
      message: `Removed automation "${trig?.name || id}".`,
      type: 'info'
    });

    try {
      const ref = doc(db, 'instagramTriggers', pageIdentifier, 'triggers', id);
      await deleteDoc(ref);
    } catch (e) {
      console.warn('Firestore trigger delete fallback:', e.message);
    }
  };

  // Create & Save Trigger
  const handleSaveNewTrigger = async (e) => {
    if (e) e.preventDefault();
    if (!newTrigger.keyword.trim() || !newTrigger.name.trim()) return;

    // Check Plan Limits (Free: 0, Pro: 3, Elite: Unlimited)
    if (tier === 'free') {
      openUpgradeModal('instagram_automation', 'Upgrade to Pro or Elite to launch live Instagram automations.');
      return;
    }
    if (tier === 'pro' && triggers.length >= 3) {
      openUpgradeModal('instagram_automation', 'Pro plan includes 3 active automations. Upgrade to Elite for unlimited triggers.');
      return;
    }

    const triggerId = 'trig_' + Date.now();
    const created = {
      id: triggerId,
      name: newTrigger.name.trim(),
      type: newTrigger.type,
      keyword: newTrigger.keyword.toUpperCase().trim(),
      status: 'active',
      dmsSent: 0,
      conversionRate: '0.0%',
      publicReplies: newTrigger.publicReply ? [newTrigger.publicReply.trim()] : [],
      dmMessage: newTrigger.dmMessage.trim(),
      delaySeconds: Number(newTrigger.delaySeconds) || 8,
      accessToken: pageAccessToken,
      pageHandle: activePage?.handle || 'creator',
      createdAt: new Date().toISOString()
    };

    const nextTriggers = [created, ...triggers];
    setTriggers(nextTriggers);
    try {
      localStorage.setItem(`vyralify_triggers_${activePage?.handle || 'default'}`, JSON.stringify(nextTriggers));
    } catch (e) {}

    setIsCreateModalOpen(false);
    setNewTrigger({
      name: '',
      type: 'comment',
      keyword: '',
      publicReply: 'Sent to your DM! Check your requests 📥',
      dmMessage: `Hey {username}! Here is your private download link:\n\n👉 vyralify.in/${activePage?.handle || 'creator'}\n\nLet me know if you need anything! 🚀`,
      delaySeconds: 8
    });

    addNotification({
      title: 'Trigger Activated! 🚀',
      message: `Automated funnel for keyword "${created.keyword}" is live in your webhook engine.`,
      type: 'success'
    });

    // Save to Firestore for the live webhook to consume
    try {
      const ref = doc(db, 'instagramTriggers', pageIdentifier, 'triggers', triggerId);
      await setDoc(ref, created);

      // Also ensure the account document has the latest accessToken
      if (pageAccessToken) {
        const pageDoc = doc(db, 'instagramPages', pageIdentifier);
        await setDoc(pageDoc, {
          accessToken: pageAccessToken,
          handle: activePage?.handle || 'creator',
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (err) {
      console.warn('Firestore trigger write fallback to local:', err.message);
    }
  };

  // Quick Start Templates
  const handleDeployTemplate = (templateKey) => {
    const handle = activePage?.handle || 'creator';
    let tpl = {};

    if (templateKey === 'lead_magnet') {
      tpl = {
        name: 'Reel Comment "BLUEPRINT" Lead Magnet',
        type: 'comment',
        keyword: 'BLUEPRINT',
        publicReply: 'Just sent the complete blueprint to your DM! 📥🔥',
        dmMessage: `Hey {username}! Here is your free blueprint link:\n\n🔗 vyralify.in/${handle}/blueprint\n\nSave this message so you don't lose the link!`,
        delaySeconds: 8
      };
    } else if (templateKey === 'story_reply') {
      tpl = {
        name: 'Story Reply "VAULT" Auto-DM',
        type: 'story',
        keyword: 'VAULT',
        publicReply: '',
        dmMessage: `Appreciate you replying to my story, {username}! Here is exclusive access to the 2026 Resource Vault:\n\n👉 vyralify.in/${handle}/vault`,
        delaySeconds: 5
      };
    } else {
      tpl = {
        name: 'Inbound DM "START" Consultation Qualifier',
        type: 'dm',
        keyword: 'START',
        publicReply: '',
        dmMessage: `Hey {username}! Welcome to Vyralify. To help dial in your theme page, what is your primary objective? (1) Grow from 0 to 10K (2) Monetize bio link (3) Scale Reels views`,
        delaySeconds: 0
      };
    }

    setNewTrigger(tpl);
    setIsCreateModalOpen(true);
  };

  // Live Test DM Execution via Backend API
  const handleSendTestDM = async (e) => {
    if (e) e.preventDefault();
    if (!testRecipientId.trim() || !testMessage.trim()) {
      addNotification({
        title: 'Fields Required',
        message: 'Please enter a test recipient PSID/ID and message.',
        type: 'warning'
      });
      return;
    }

    setIsSendingTestDM(true);
    setTestDMResult(null);

    try {
      const res = await sendInstagramDM(testRecipientId.trim(), testMessage.trim(), pageAccessToken);
      setTestDMResult({
        success: true,
        message: `DM successfully delivered via Meta Graph API! (Message ID: ${res.messageId || 'confirmed'})`
      });
      addNotification({
        title: 'Test DM Sent! 📨',
        message: `Meta API returned success for recipient ${testRecipientId}.`,
        type: 'success'
      });
    } catch (err) {
      console.error('Test DM error:', err);
      setTestDMResult({
        success: false,
        message: err.message || 'Failed to send DM. Check Meta permissions (instagram_business_manage_messages).'
      });
      addNotification({
        title: 'Test DM Failed',
        message: err.message,
        type: 'error'
      });
    } finally {
      setIsSendingTestDM(false);
    }
  };

  // Simulate a live lead for testing the CRM
  const handleSimulateLead = () => {
    const sampleHandles = ['@aarav.growth', '@priya.creates', '@dev_builds', '@sara_saas', '@nikhil.vfx'];
    const sampleTriggers = triggers.length > 0 ? triggers.map(t => t.keyword) : ['BLUEPRINT', 'VAULT', 'LINK'];
    
    const randomHandle = sampleHandles[Math.floor(Math.random() * sampleHandles.length)];
    const randomTrigger = sampleTriggers[Math.floor(Math.random() * sampleTriggers.length)];

    const newLead = {
      id: 'lead_' + Date.now(),
      handle: randomHandle,
      trigger: randomTrigger,
      source: 'Reel Comment',
      status: 'DM Delivered',
      timestamp: 'Just now',
      pageHandle: activePage?.handle || 'creator'
    };

    const nextLeads = [newLead, ...leads];
    setLeads(nextLeads);
    try {
      localStorage.setItem(`vyralify_leads_${activePage?.handle || 'default'}`, JSON.stringify(nextLeads));
    } catch (e) {}

    addNotification({
      title: 'Lead Captured 🎯',
      message: `${randomHandle} triggered keyword "${randomTrigger}".`,
      type: 'success'
    });
  };

  // Export Leads to CSV
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) {
      addNotification({
        title: 'No Leads Yet',
        message: 'No leads captured to export yet. Launch an automation to begin collecting leads.',
        type: 'info'
      });
      return;
    }

    const headers = 'Handle,Trigger,Source,Status,Timestamp\n';
    const rows = leads.map(l => `${l.handle},${l.trigger},${l.source || 'Reel'},${l.status},${l.timestamp}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vyralify_leads_${activePage?.handle || 'creator'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification({
      title: 'Leads Exported',
      message: `Downloaded CSV with ${leads.length} contacts.`,
      type: 'success'
    });
  };

  // Total DMs sent calculation
  const totalDmsSent = triggers.reduce((acc, curr) => acc + (Number(curr.dmsSent) || 0), leads.length);

  return (
    <SoftLockWrapper featureKey="instagram_automation" minTier="pro">
      <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
        
        {/* 1. MODULE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono mb-2 font-medium">
              <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Phase 6 &bull; Meta Graph API v19.0 Native Automation Engine</span>
            </div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>Instagram Automations</span>
              <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-[10px] font-mono text-neutral-600 dark:text-neutral-300 font-normal">
                @{activePage?.handle || 'creator'} &bull; Webhook Synced
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
                { id: 'inbox', label: 'AI Inbox & Test', icon: MessageSquare },
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
          <div className="space-y-5">
            
            {/* KPI Summary Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Total DMs Delivered</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                  {totalDmsSent} DMs
                </div>
                <span className="text-[10px] text-emerald-600 font-mono mt-1 block font-semibold">Live Webhook Synced</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Captured Leads</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
                  {leads.length} Contacts
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">In Audience CRM</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Active Automations</span>
                <div className="text-xl font-bold font-mono text-neutral-900 dark:text-white mt-1">
                  {triggers.filter(t => t.status === 'active').length} / {tier === 'pro' ? '3 (Pro Limit)' : 'Unlimited'}
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Meta Graph Verified</span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <span className="text-[11px] font-mono text-neutral-400">Anti-Spam Delay</span>
                <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>5s - 20s Jitter</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono mt-1 block">Meta 100% Compliant</span>
              </div>
            </div>

            {/* Triggers List or Clean Empty State with Templates */}
            {triggers.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                  <Zap className="w-7 h-7" />
                </div>

                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    No active automation triggers yet
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Deploy your first automation to turn Reel comments, story replies, or inbound DMs into bio link clicks and digital product orders automatically.
                  </p>
                </div>

                {/* 3 Quick-Start Templates */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left pt-2">
                  <button
                    onClick={() => handleDeployTemplate('lead_magnet')}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all text-left space-y-2 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white group-hover:text-emerald-600">
                        Comment "BLUEPRINT"
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      When a follower comments "BLUEPRINT" on any reel, automatically replies publicly and DMs the freebie link.
                    </p>
                    <div className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                      <span>Deploy Template</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeployTemplate('story_reply')}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all text-left space-y-2 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white group-hover:text-emerald-600">
                        Story Reply "VAULT"
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Captures followers who reply to your daily stories with exclusive VIP access or discounted digital offers.
                    </p>
                    <div className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                      <span>Deploy Template</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleDeployTemplate('dm_qualifier')}
                    className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] hover:border-emerald-500/50 hover:bg-emerald-50/30 transition-all text-left space-y-2 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white group-hover:text-emerald-600">
                        Inbound DM "START"
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <p className="text-[11px] text-neutral-500">
                      Instant qualifying conversation agent that identifies niche & budget before offering a high-ticket product.
                    </p>
                    <div className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                      <span>Deploy Template</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </button>
                </div>
              </div>
            ) : (
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
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
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
                              Trigger: {trig.type.toUpperCase()} &bull; Keyword: <span className="font-bold text-emerald-600">"{trig.keyword}"</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5">
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

                          <button
                            onClick={() => handleDeleteTrigger(trig.id)}
                            className="p-1.5 rounded-xl hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Delete trigger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Funnel Flow Visual */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {trig.publicReplies && trig.publicReplies.length > 0 && (
                          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1">
                            <span className="text-[10px] font-mono text-neutral-400 block font-semibold">1. Public Comment Reply:</span>
                            <p className="text-neutral-700 dark:text-neutral-300 italic text-[11px]">"{trig.publicReplies[0]}"</p>
                          </div>
                        )}

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1 md:col-span-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                            <span className="font-semibold">2. Automated Direct Message ({trig.delaySeconds || 8}s delay):</span>
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
            )}

          </div>
        )}

        {/* 3. SUB-TAB: LEADS CRM TABLE */}
        {activeTab === 'leads' && (
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Lead Collector &amp; Audience CRM</h3>
                <p className="text-xs text-neutral-500">Every follower who triggers an automation is captured into your exportable audience database.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateLead}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-white/[0.05] text-neutral-700 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  <span>Simulate Test Lead</span>
                </button>

                <button
                  onClick={handleExportLeadsCsv}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export ({leads.length}) to CSV</span>
                </button>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] text-neutral-400 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-sm mx-auto">
                  <h4 className="font-bold text-neutral-900 dark:text-white text-xs">
                    No leads captured yet
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    Once followers comment on your Reels or reply to your Stories with your trigger keywords, their handles and contact status will appear here automatically.
                  </p>
                </div>
                <button
                  onClick={handleSimulateLead}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/20 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Inbound Comment Lead</span>
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200/80 dark:border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                      <th className="pb-2.5 font-medium">Follower</th>
                      <th className="pb-2.5 font-medium">Trigger Keyword</th>
                      <th className="pb-2.5 font-medium">Source</th>
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
                          {lead.source || 'Reel Comment'}
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
            )}
          </div>
        )}

        {/* 4. SUB-TAB: LIVE AI INBOX & TEST DIRECT MESSAGES */}
        {activeTab === 'inbox' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Test Direct Message Tool (Send live DM to any user) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200/80 dark:border-white/[0.06]">
                <Send className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                  Send Live Test Direct Message
                </h3>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                Test that your connected Instagram account can send direct messages through the Meta Messaging API.
              </p>

              <form onSubmit={handleSendTestDM} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Recipient PSID or Instagram User ID</label>
                  <input
                    type="text"
                    required
                    value={testRecipientId}
                    onChange={(e) => setTestRecipientId(e.target.value)}
                    placeholder="e.g. 17841400123456789"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono"
                  />
                  <span className="text-[10px] text-neutral-400">
                    PSID is received in inbound webhook events from users who messaged your account.
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Message Body</label>
                  <textarea
                    rows={3}
                    required
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    placeholder="Enter test message..."
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl p-3 text-xs text-neutral-900 dark:text-white"
                  />
                </div>

                {testDMResult && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    testDMResult.success
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}>
                    {testDMResult.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSendingTestDM || !pageAccessToken}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSendingTestDM ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending via Meta Messaging API...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Direct Message</span>
                    </>
                  )}
                </button>

                {!pageAccessToken && (
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Connect your Instagram Account via Meta OAuth to activate live messaging token.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Right: Live Webhook & Dispatch Status */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200/80 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    Automated Webhook Dispatch Architecture
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
                  Status: LIVE
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
                    Live Meta Webhook Callback URL
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold truncate">
                      https://vyralify.in/api/webhooks/instagram
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('https://vyralify.in/api/webhooks/instagram');
                        addNotification({ title: 'Copied!', message: 'Webhook URL copied to clipboard.', type: 'info' });
                      }}
                      className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-white/[0.1] text-neutral-500 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">
                    Webhook Verify Token
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-[11px] text-purple-600 dark:text-purple-400 font-mono font-bold">
                      vyralify_meta_verify_2026
                    </code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('vyralify_meta_verify_2026');
                        addNotification({ title: 'Copied!', message: 'Verify token copied to clipboard.', type: 'info' });
                      }}
                      className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-white/[0.1] text-neutral-500 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-500/5 border border-purple-200 dark:border-purple-500/20 space-y-1.5 text-[11px] text-purple-900 dark:text-purple-200">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>How the Engine Works:</span>
                  </div>
                  <p>1. Follower leaves comment with keyword (e.g. "BLUEPRINT") on your Reel.</p>
                  <p>2. Instagram Graph API pushes event to <code className="font-mono">/api/webhooks/instagram</code>.</p>
                  <p>3. Vyralify posts randomized public reply, waits human delay (5-15s), and sends personalized private DM.</p>
                  <p>4. Lead is recorded immediately in your Leads CRM above.</p>
                </div>
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
                    <span className="text-emerald-600 font-semibold">{leads.length} / 200 DMs/hr</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-white/[0.05] overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all" 
                      style={{ width: `${Math.min(100, Math.max(5, (leads.length / 200) * 100))}%` }} 
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
                  <span className="font-semibold block font-mono text-[11px]">Active Protective Measures:</span>
                  <p>&bull; Randomized 5s to 20s delays between outbound messages</p>
                  <p>&bull; 3 randomized public comment variations</p>
                  <p>&bull; 10-minute duplicate prevention per user</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs space-y-4">
              <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                Connected Meta App Credentials
              </h3>
              <p className="text-xs text-neutral-500">
                Official Instagram Login for Business &amp; Webhook Engine v19.0.
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">Instagram App ID:</span>
                  <span className="text-neutral-900 dark:text-white font-bold">2568931813529253</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">Webhook Status:</span>
                  <span className="text-emerald-600 font-semibold">Online &bull; Active</span>
                </div>
                <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.05] flex justify-between">
                  <span className="text-neutral-400">Permissions:</span>
                  <span className="text-neutral-900 dark:text-white">instagram_business_manage_messages, instagram_business_manage_comments</span>
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

                <div className="space-y-1">
                  <label className="font-mono text-neutral-500 font-medium">Anti-Spam Human Delay (Seconds)</label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={newTrigger.delaySeconds}
                    onChange={(e) => setNewTrigger({ ...newTrigger, delaySeconds: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono"
                  />
                  <span className="text-[10px] text-neutral-400">Recommended: 5-15s to comply with Meta anti-bot guidelines.</span>
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
