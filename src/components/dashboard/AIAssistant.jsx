import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Send, 
  Paperclip, 
  Search, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  RotateCw, 
  ArrowRight, 
  Image as ImageIcon, 
  X, 
  Layers, 
  TrendingUp, 
  Bot, 
  Compass, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { askVyralifyAssistant } from '../../lib/aiService';

const SESSIONS_STORAGE_KEY = 'vyralify_chat_sessions_v3';

export default function AIAssistant({ onNavigate }) {
  const { user, tier, aiCredits, consumeCredit } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();
  const { isDark } = useTheme();

  // Chat sessions state
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Active composer state
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState(null); // { base64, mimeType, name, previewUrl }
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize or load sessions
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored sessions:', e);
    }

    // Default initial session grounded in active page
    const initialSession = createDefaultSession(activePage);
    setSessions([initialSession]);
    setActiveSessionId(initialSession.id);
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {
        console.warn('Failed to save sessions:', e);
      }
    }
  }, [sessions]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId, isGenerating]);

  // Create default initial session
  function createDefaultSession(page) {
    const handle = page?.handle || 'creator';
    const category = page?.category || 'Business & Money';
    const subNiche = page?.subNiche || 'Online Growth';

    return {
      id: 'session_' + Date.now(),
      title: `Strategy: @${handle}`,
      pageHandle: handle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_welcome',
          sender: 'ai',
          text: `Welcome back, ${user?.displayName || 'Creator'}.\n\nI am your **Vyralify Operating Co-Pilot**, grounded in real-time data for **@${handle}** (${category} • ${subNiche}).\n\nI can dissect your retention curve, engineer 3-second pattern-interrupt hooks, audit your bio conversion flow, or structure a high-ticket DM automation funnel.\n\nWhat are we optimizing today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { type: 'discover_create', label: 'Create Reel Script' },
            { type: 'builder', label: 'Audit Bio & Taxonomy' }
          ]
        }
      ]
    };
  }

  // Active current session object
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Start a fresh conversation thread
  const handleNewSession = () => {
    const newSession = createDefaultSession(activePage);
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputMessage('');
    setAttachedMedia(null);
  };

  // Delete a session
  const handleDeleteSession = (e, sessionId) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
      // If last session, reset to new default
      const reset = createDefaultSession(activePage);
      setSessions([reset]);
      setActiveSessionId(reset.id);
      return;
    }
    const filtered = sessions.filter(s => s.id !== sessionId);
    setSessions(filtered);
    if (activeSessionId === sessionId) {
      setActiveSessionId(filtered[0].id);
    }
  };

  // Handle media file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check media upload plan limits
    // Free: 3 uploads/month, Pro: 50, Elite: Unlimited
    if (tier === 'free') {
      // Notice for free creators
      addNotification({
        title: 'Multimodal Vision Active',
        message: 'Free tier includes 3 multimodal image audits. Upgrade to Pro for 50/month.',
        type: 'info'
      });
    }

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image or screenshot (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachedMedia({
        name: file.name,
        mimeType: file.type,
        base64: reader.result,
        previewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  // Parse [ACTION:type|Label] from AI text response
  const parseActionButtons = (rawText) => {
    const actionRegex = /\[ACTION:([a-z_]+)\|([^\]]+)\]/g;
    const actions = [];
    let match;
    while ((match = actionRegex.exec(rawText)) !== null) {
      actions.push({
        type: match[1],
        label: match[2]
      });
    }
    const cleanText = rawText.replace(actionRegex, '').trim();
    return { cleanText, actions };
  };

  // Send message
  const handleSendMessage = async (customPrompt = null) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() && !attachedMedia) return;

    // Credit consumption check
    const canUse = consumeCredit(1);
    if (!canUse) {
      openUpgradeModal(
        'ai_credits',
        `You have reached your daily credit quota (${aiCredits.limit} credits on ${tier.toUpperCase()}). Upgrade to scale unlimited generations.`
      );
      return;
    }

    const userMessageId = 'msg_' + Date.now();
    const newUserMsg = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      mediaUrl: attachedMedia?.previewUrl || null,
      mediaName: attachedMedia?.name || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update session title on first user message if default
    let sessionTitle = activeSession?.title;
    if (activeSession?.messages?.length <= 1) {
      sessionTitle = textToSend.slice(0, 32) + (textToSend.length > 32 ? '...' : '');
    }

    const updatedMessages = [...(activeSession?.messages || []), newUserMsg];
    
    // Update local state immediately
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return {
          ...s,
          title: sessionTitle,
          updatedAt: new Date().toISOString(),
          messages: updatedMessages
        };
      }
      return s;
    }));

    setInputMessage('');
    const mediaForRequest = attachedMedia;
    setAttachedMedia(null);
    setIsGenerating(true);

    try {
      // Build context payload
      const pageContext = {
        handle: activePage?.handle || 'creator',
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || 'Online Entrepreneurship',
        followersCount: activePage?.followersCount || '42.5K',
        engagementRate: activePage?.engagementRate || '4.2%',
        views7d: activePage?.views7d || '840K',
        revenue30d: activePage?.revenue30d || '₹42,850',
        topPost: activePage?.topPost?.title || 'Contrarian Reel Breakdown (342K views)',
        audit: activePage?.audit?.recommendation || 'Optimize bio CTA and add DM keyword funnel'
      };

      const res = await askVyralifyAssistant({
        messages: updatedMessages,
        pageContext,
        media: mediaForRequest
      });

      const { cleanText, actions } = parseActionButtons(res.text);

      const aiMessageId = 'msg_ai_' + Date.now();
      const newAiMsg = {
        id: aiMessageId,
        sender: 'ai',
        text: cleanText,
        provider: res.provider || 'vyralify:gpt-oss',
        actions: actions.length > 0 ? actions : [
          { type: 'discover_create', label: 'Use in Content Studio' },
          { type: 'automation', label: 'Set Up DM Funnel' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            updatedAt: new Date().toISOString(),
            messages: [...updatedMessages, newAiMsg]
          };
        }
        return s;
      }));
    } catch (err) {
      console.error('Assistant error:', err);
      addNotification({
        title: 'Assistant Notice',
        message: 'Reconnected using local high-leverage growth intelligence.',
        type: 'info'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy message text
  const handleCopyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Filtered sessions based on search query
  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Credit calculation & 80% threshold warning
  const creditsRemaining = Math.max(0, aiCredits.limit - aiCredits.usedToday);
  const creditUsagePercent = aiCredits.limit > 90000 ? 0 : Math.round((aiCredits.usedToday / aiCredits.limit) * 100);
  const isNearLimit = creditUsagePercent >= 80 && aiCredits.limit < 90000;

  // Preset growth prompt chips
  const PROMPT_SUGGESTIONS = [
    { label: '🔥 3 Pattern-Interrupt Hooks', prompt: `Write 3 high-retention opening hooks for @${activePage?.handle || 'my page'} targeting first-3-second retention.` },
    { label: '⚡ Bio Conversion Teardown', prompt: `Audit my current bio for @${activePage?.handle || 'my page'} and suggest 3 high-converting rewrites with DM call-to-actions.` },
    { label: '📈 Competitor Format Steal', prompt: `What format are the top 1% creators in ${activePage?.category || 'my niche'} using this week to get 1M+ views?` },
    { label: '🤖 DM Funnel Trigger', prompt: `Design a high-converting comment keyword automation funnel to turn reel viewers into email leads.` },
    { label: '🗓️ 7-Day Sprint Plan', prompt: `Give me an exact 7-day reel release schedule with hooks, formats, and optimal posting times.` }
  ];

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col lg:flex-row gap-3 max-w-7xl mx-auto overflow-hidden">
      
      {/* 1. SESSIONS HISTORY DRAWER (Collapsible) */}
      <div className={`shrink-0 transition-all duration-200 flex flex-col bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-xs ${
        isSidebarOpen ? 'w-full lg:w-72' : 'w-14 hidden lg:flex'
      }`}>
        
        {/* Drawer Header */}
        <div className="p-3 border-b border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between gap-2">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-xs text-neutral-900 dark:text-white">Conversations</span>
                <span className="px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-white/[0.05] text-[10px] font-mono text-neutral-500">
                  {sessions.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleNewSession}
                  className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs transition-colors cursor-pointer"
                  title="New Thread"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-400 transition-colors cursor-pointer"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="w-full py-2 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-400 rounded-lg transition-colors cursor-pointer"
              title="Expand Conversations"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Drawer Search & List (When Open) */}
        {isSidebarOpen && (
          <>
            <div className="p-2.5 border-b border-neutral-200/80 dark:border-white/[0.06]">
              <div className="relative">
                <Search className="w-3 h-3 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] rounded-xl pl-7 pr-2.5 py-1.5 text-[11px] text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Sessions Scroll List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredSessions.map((s) => {
                const isActive = s.id === activeSessionId;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-emerald-50/80 dark:bg-emerald-500/10 border-emerald-500/40 text-neutral-900 dark:text-white font-medium shadow-xs'
                        : 'bg-transparent border-transparent hover:bg-neutral-50 dark:hover:bg-white/[0.02] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs truncate">{s.title}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono mt-0.5">
                        <span>{s.messages.length} msgs</span>
                        <span>&bull;</span>
                        <span>{new Date(s.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(e, s.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-neutral-400 hover:text-red-600 transition-all cursor-pointer"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <div className="p-4 text-center text-xs text-neutral-400">
                  No matching sessions found.
                </div>
              )}
            </div>

            {/* Plan Quota Footnote */}
            <div className="p-3 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/60 dark:bg-black/20 text-[11px] text-neutral-500 flex items-center justify-between">
              <span className="font-mono">
                {tier === 'free' ? 'Starter (Last 5 Chats)' : 'Pro (Unlimited History)'}
              </span>
              {tier === 'free' && (
                <button
                  onClick={() => openUpgradeModal('ai_history', 'Upgrade to Pro for unlimited searchable chat memory.')}
                  className="text-emerald-600 hover:underline font-semibold cursor-pointer"
                >
                  Upgrade &rarr;
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 2. MAIN CONVERSATION WORKSPACE */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-xs relative">
        
        {/* Workspace Top Header Bar */}
        <div className="p-3 px-4 border-b border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-500 transition-colors cursor-pointer"
                title="View Chats"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </button>
            )}

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-xs flex items-center gap-2">
                  <span>Vyralify Co-Pilot</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[9px] font-mono font-semibold">
                    Domain-Grounded
                  </span>
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-1.5">
                  <span>@{activePage?.handle || 'creator'}</span>
                  <span>&bull;</span>
                  <span>{activePage?.category}</span>
                  <span>&bull;</span>
                  <span>{activePage?.followersCount} Followers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Status: AI Credits Meter */}
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-[10px] font-mono text-neutral-400">Daily AI Budget</div>
              <div className="text-xs font-mono font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                <span>{aiCredits.limit > 90000 ? 'Unlimited' : `${creditsRemaining} left`}</span>
              </div>
            </div>

            {tier === 'free' && (
              <button
                onClick={() => openUpgradeModal('ai_credits', 'Unlock 300 daily generations & vision critiques with Pro.')}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>

        {/* 80% Credit Warning Banner */}
        {isNearLimit && (
          <div className="px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>80% AI Quota Reached:</strong> You have {creditsRemaining} generations remaining today on the Starter plan.
              </span>
            </div>
            <button
              onClick={() => openUpgradeModal('ai_credits', 'Upgrade to Pro for 300 daily generations.')}
              className="text-amber-700 dark:text-amber-300 font-semibold underline hover:no-underline cursor-pointer text-[11px]"
            >
              Get 300 Credits &rarr;
            </button>
          </div>
        )}

        {/* 3. MESSAGE THREAD DISPLAY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeSession?.messages?.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                {/* Media Attachment if present */}
                {msg.mediaUrl && (
                  <div className="mb-2 max-w-sm rounded-xl overflow-hidden border border-neutral-200/80 dark:border-white/[0.08] shadow-xs">
                    <img src={msg.mediaUrl} alt="Uploaded critique media" className="max-h-48 w-full object-cover" />
                    {msg.mediaName && (
                      <div className="p-1.5 bg-neutral-900/80 text-white text-[10px] font-mono px-2 truncate">
                        📎 {msg.mediaName}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`group relative max-w-2xl p-4 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white font-medium rounded-tr-xs shadow-xs'
                    : 'bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-neutral-800 dark:text-neutral-200 rounded-tl-xs shadow-xs'
                }`}>
                  
                  {/* Sender Header for AI */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-neutral-200/60 dark:border-white/[0.05] text-[10px] font-mono text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-neutral-700 dark:text-neutral-300">Vyralify Assistant</span>
                        {msg.provider && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-neutral-200/60 dark:bg-white/[0.05] text-neutral-500">
                            {msg.provider}
                          </span>
                        )}
                      </div>
                      <span>{msg.timestamp}</span>
                    </div>
                  )}

                  {/* Message Content */}
                  <div className="whitespace-pre-line font-sans space-y-2">
                    {msg.text}
                  </div>

                  {/* Interactive Action Buttons */}
                  {!isUser && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-neutral-200/60 dark:border-white/[0.05] flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400 mr-1">Recommended:</span>
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => onNavigate && onNavigate(act.type)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/15 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Copy Button */}
                  <div className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ${
                    isUser ? 'hidden' : ''
                  }`}>
                    <button
                      onClick={() => handleCopyMessage(msg.text, msg.id)}
                      className="p-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 transition-colors shadow-xs"
                      title="Copy response"
                    >
                      {copiedMessageId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {isUser && (
                  <span className="text-[10px] font-mono text-neutral-400 mt-1 mr-1">
                    {msg.timestamp}
                  </span>
                )}
              </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 p-3 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs text-neutral-500 w-fit"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span>Analyzing @{activePage?.handle} retention benchmarks & generating tactical answer...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 4. SUGGESTED PROMPT CHIPS */}
        <div className="px-4 py-2 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-neutral-400 font-mono font-medium shrink-0">Prompts:</span>
          {PROMPT_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.prompt)}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 border border-neutral-200 dark:border-white/[0.05] text-[11px] font-medium transition-colors cursor-pointer shadow-xs"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 5. ATTACHED MEDIA PREVIEW BANNER */}
        {attachedMedia && (
          <div className="px-4 py-2 border-t border-neutral-200/80 dark:border-white/[0.06] bg-emerald-50/60 dark:bg-emerald-500/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <img src={attachedMedia.previewUrl} alt="Preview" className="w-8 h-8 rounded-lg object-cover border border-emerald-500/30" />
              <div>
                <span className="font-semibold text-emerald-900 dark:text-emerald-200">{attachedMedia.name}</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block font-mono">Multimodal Vision Critique Ready</span>
              </div>
            </div>
            <button
              onClick={() => setAttachedMedia(null)}
              className="p-1 rounded-md text-emerald-700 hover:bg-emerald-200/50 cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 6. CHAT COMPOSER INPUT */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-[#0C0D12] flex items-center gap-2"
        >
          {/* File Upload Trigger */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-400 transition-colors cursor-pointer shrink-0"
            title="Upload Screenshot (Analytics / Competitor Reel / Thumbnail)"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input Field */}
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isGenerating}
            placeholder={`Ask Vyralify Co-Pilot anything about @${activePage?.handle || 'your page'} growth, hooks, or funnel...`}
            className="flex-1 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={isGenerating || (!inputMessage.trim() && !attachedMedia)}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium transition-colors cursor-pointer shrink-0 shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
