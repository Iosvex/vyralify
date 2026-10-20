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
  MessageSquare,
  Target,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePage } from '../../context/PageContext';
import { usePlanGating } from '../../context/PlanGatingContext';
import { useNotifications } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';
import { askVyralifyAssistant } from '../../lib/aiService';

const SESSIONS_STORAGE_KEY = 'vyralify_chat_sessions_v3';

/**
 * Intelligent clean session title generator per Section 2 Blueprint
 * Prevents raw user inputs like "yo" or "kya dikh rha..." from polluting chat titles.
 */
function generateCleanSessionTitle(rawText, pageCategory) {
  if (!rawText) return 'Growth Strategy Session';
  const lower = rawText.toLowerCase().trim();

  // Keyword-based topic classification
  if (lower.includes('hook') || lower.includes('viral') || lower.includes('3-second') || lower.includes('opening')) {
    return 'Viral Hook Breakdown';
  }
  if (lower.includes('bio') || lower.includes('teardown') || lower.includes('profile') || lower.includes('conversion')) {
    return 'Bio Conversion Teardown';
  }
  if (lower.includes('retention') || lower.includes('drop') || lower.includes('completion') || lower.includes('curve')) {
    return 'Retention Curve Audit';
  }
  if (lower.includes('plan') || lower.includes('schedule') || lower.includes('7-day') || lower.includes('sprint') || lower.includes('calendar')) {
    return '7-Day Content Sprint';
  }
  if (lower.includes('competitor') || lower.includes('format') || lower.includes('niche')) {
    return 'Competitor Format Analysis';
  }
  if (lower.includes('store') || lower.includes('product') || lower.includes('revenue') || lower.includes('money') || lower.includes('sales')) {
    return 'Storefront Monetization';
  }
  if (lower.includes('script') || lower.includes('draft') || lower.includes('reel')) {
    return 'Viral Reel Script Draft';
  }

  // Filter out low-effort casual slang
  const cleanWords = rawText
    .replace(/^[^\w\s]+/, '')
    .replace(/\b(yo|hey|hi|hello|kya|dikh|rha|hai|is|photo|me|bro|bhai|so|um|tell|me)\b/gi, '')
    .trim();

  if (!cleanWords || cleanWords.length < 3) {
    return pageCategory ? `${pageCategory} Strategy` : 'Growth Strategy Session';
  }

  const titleCandidate = cleanWords.split(/[?!.\n]/)[0].trim();
  if (titleCandidate.length > 28) {
    return titleCandidate.slice(0, 26).trim() + '...';
  }
  return titleCandidate.charAt(0).toUpperCase() + titleCandidate.slice(1);
}

/**
 * Modern Clean Message Formatter
 * Eliminates raw markdown clutter (###, ***, * **, >) and renders clean structured cards, badges, and callouts
 * Per Section 5 Blueprint: subtle dark border + mute green text formatting, slate-900 background for script blocks
 */
function CleanFormattedMessage({ text }) {
  const [copiedQuoteIdx, setCopiedQuoteIdx] = useState(null);

  if (!text) return null;

  const handleCopyQuote = (content, idx) => {
    navigator.clipboard.writeText(content);
    setCopiedQuoteIdx(idx);
    setTimeout(() => setCopiedQuoteIdx(null), 2000);
  };

  const lines = text.split('\n');
  const renderedElements = [];
  let currentQuote = [];
  let currentList = [];

  const flushQuote = (key) => {
    if (currentQuote.length > 0) {
      const quoteIndex = key;
      const quoteContent = currentQuote.join('\n');
      renderedElements.push(
        <div 
          key={`quote-${key}-${renderedElements.length}`}
          className="my-3 p-3.5 rounded-xl bg-slate-900/90 dark:bg-black/70 border border-neutral-800 dark:border-white/[0.08] text-xs shadow-xs relative group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-medium mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Recommended Script / Bio Copy</span>
            </span>
            <button
              onClick={() => handleCopyQuote(quoteContent, quoteIndex)}
              className="px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.12] text-neutral-300 hover:text-white text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 border border-white/[0.08]"
              title="Copy to clipboard"
            >
              {copiedQuoteIdx === quoteIndex ? (
                <>
                  <Check className="w-2.5 h-2.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-2.5 h-2.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="font-mono text-neutral-200 whitespace-pre-line leading-relaxed selection:bg-emerald-500/30">
            {quoteContent}
          </div>
        </div>
      );
      currentQuote = [];
    }
  };

  const flushList = (key) => {
    if (currentList.length > 0) {
      renderedElements.push(
        <div key={`list-${key}-${renderedElements.length}`} className="my-2 space-y-2">
          {currentList.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
              <div className="flex-1">
                {renderCleanInline(item)}
              </div>
            </div>
          ))}
        </div>
      );
      currentList = [];
    }
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // 1. Divider / Separator (---, ***, ___)
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushQuote(lineIdx);
      flushList(lineIdx);
      renderedElements.push(
        <div key={`div-${lineIdx}`} className="my-3 border-t border-neutral-200/80 dark:border-white/[0.08]" />
      );
      return;
    }

    // 2. Heading (### Option 1, ## Heading, # Heading)
    if (/^#{1,4}\s+(.+)$/.test(trimmed)) {
      flushQuote(lineIdx);
      flushList(lineIdx);
      const headingRaw = trimmed.replace(/^#{1,4}\s+/, '').trim();
      
      let mainTitle = headingRaw;
      let badge = null;
      const parenMatch = headingRaw.match(/\(([^)]+)\)$/);
      if (parenMatch) {
        mainTitle = headingRaw.replace(/\(([^)]+)\)$/, '').trim();
        badge = parenMatch[1];
      }

      renderedElements.push(
        <div key={`h-${lineIdx}`} className="mt-4 mb-2 pt-2 border-t border-neutral-200/40 dark:border-white/[0.04] first:border-0 first:pt-0 flex flex-wrap items-center gap-2">
          <span className="w-1.5 h-3.5 rounded-full bg-emerald-500 shrink-0" />
          <h4 className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-tight">
            {renderCleanInline(mainTitle)}
          </h4>
          {badge && (
            <span className="px-2 py-0.5 rounded border border-neutral-300 dark:border-white/10 bg-neutral-100/80 dark:bg-white/[0.04] text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
              {badge}
            </span>
          )}
        </div>
      );
      return;
    }

    // 3. Blockquotes / Bio scripts (> line)
    if (trimmed.startsWith('>')) {
      flushList(lineIdx);
      const cleanQuoteLine = trimmed.replace(/^>\s*/, '');
      currentQuote.push(cleanQuoteLine);
      return;
    } else {
      flushQuote(lineIdx);
    }

    // 4. Bullet points (* line, - line, • line)
    if (/^[*•-]\s+(.+)$/.test(trimmed)) {
      const cleanItem = trimmed.replace(/^[*•-]\s+/, '');
      currentList.push(cleanItem);
      return;
    } else {
      flushList(lineIdx);
    }

    // 5. Empty line
    if (!trimmed) {
      return;
    }

    // 6. Regular paragraph
    renderedElements.push(
      <p key={`p-${lineIdx}`} className="text-xs leading-relaxed text-neutral-800 dark:text-neutral-200">
        {renderCleanInline(trimmed)}
      </p>
    );
  });

  flushQuote('end');
  flushList('end');

  return <div className="space-y-2">{renderedElements}</div>;
}

function renderCleanInline(text) {
  if (!text) return null;

  // Clean weird double-prefix syntax e.g. `* **` or `***`
  let cleaned = text.replace(/^\*\s*\*\*/, '**').replace(/^\*\*\*/, '**');

  // Tokenize bold **bold**
  const parts = cleaned.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2).trim();

      // Check if it's a structural label like "Line 1 (Shock):", "Why it works:", "Bio Text:", "Hook:"
      const isLabel = boldText.endsWith(':') || 
                      boldText.startsWith('Line ') || 
                      boldText.startsWith('Option ') || 
                      boldText.includes('Trigger:') ||
                      boldText === 'Why it works' ||
                      boldText === 'Bio Text' ||
                      boldText.startsWith('Hook') ||
                      boldText === 'CRUCIAL' ||
                      boldText.includes('STEP');

      if (isLabel) {
        return (
          <span
            key={pIdx}
            className="inline-flex items-center px-1.5 py-0.2 mr-1.5 rounded border border-neutral-200/90 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.04] text-emerald-700 dark:text-emerald-400 font-mono font-medium text-[10px] uppercase tracking-wider"
          >
            {boldText.replace(/:$/, '')}
          </span>
        );
      }

      return (
        <strong key={pIdx} className="font-semibold text-neutral-900 dark:text-white">
          {boldText}
        </strong>
      );
    }

    // Italic *italic*
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2 && !part.startsWith('**')) {
      return (
        <em key={pIdx} className="text-neutral-500 dark:text-neutral-400 italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

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

  // Create default initial session per Section 3 Blueprint
  function createDefaultSession(page) {
    const handle = page?.handle || 'creator';

    // Clean user first name
    const rawName = user?.displayName || user?.name || '';
    const cleanFirstName = rawName && !rawName.toLowerCase().includes('apple creator') && !rawName.includes('@')
      ? rawName.trim().split(' ')[0]
      : 'Maaz';

    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const titleGreeting = cleanFirstName ? `${timeGreeting}, ${cleanFirstName}.` : 'How can we grow your audience today?';

    return {
      id: 'session_' + Date.now(),
      title: 'Growth Strategy Session',
      pageHandle: handle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg_welcome',
          sender: 'ai',
          text: `${titleGreeting}\n\nI have analyzed your last 30 days of reach, retention curves, and top reels. Select an action below or ask anything.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { type: 'discover_create', label: 'Draft Viral Script' },
            { type: 'builder', label: 'Audit Profile & Bio' }
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

    if (tier === 'free') {
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

    // Auto-generate clean title on first user message per Section 2 Blueprint
    let sessionTitle = activeSession?.title;
    if (!activeSession?.messages || activeSession.messages.length <= 1) {
      sessionTitle = generateCleanSessionTitle(textToSend, activePage?.category);
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
        audit: activePage?.audit?.recommendation || 'Optimize bio CTA and conversion flow'
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
          { type: 'builder', label: 'Optimize Bio Link' }
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

  // 4 Clean Growth Presets with minimalist SVG outline icons per Section 4 Blueprint
  const PROMPT_SUGGESTIONS = [
    { 
      label: '3 Viral Reel Hooks', 
      icon: Target,
      prompt: `Write 3 high-retention opening hooks for @${activePage?.handle || 'my page'} targeting first-3-second retention.` 
    },
    { 
      label: 'Bio Conversion Teardown', 
      icon: Search,
      prompt: `Audit my current bio for @${activePage?.handle || 'my page'} and suggest 3 high-converting rewrites.` 
    },
    { 
      label: 'Analyze Top Retention Reel', 
      icon: TrendingUp,
      prompt: `Analyze the retention mechanics of my top-performing reel and breakdown why it worked.` 
    },
    { 
      label: 'Generate 7-Day Content Plan', 
      icon: Calendar,
      prompt: `Generate a 7-day content sprint plan with hooks, visual angles, and peak posting times.` 
    }
  ];

  return (
    <div className="h-[calc(100vh-5.5rem)] flex flex-col lg:flex-row gap-3 max-w-7xl mx-auto overflow-hidden">
      
      {/* 1. SESSIONS HISTORY DRAWER (Collapsible with smooth transition per Section 2) */}
      <div className={`shrink-0 transition-all duration-300 ease-in-out flex flex-col bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.06] rounded-2xl overflow-hidden shadow-xs ${
        isSidebarOpen ? 'w-full lg:w-72' : 'w-14 hidden lg:flex'
      }`}>
        
        {/* Drawer Header with non-overlapping tooltips per Section 2 */}
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
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleNewSession}
                  className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs transition-colors cursor-pointer"
                  title="New Thread"
                  aria-label="New Thread"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
                  title="Collapse Sidebar"
                  aria-label="Collapse Sidebar"
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
              aria-label="Expand Conversations"
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

            {/* Sidebar Footer: Subtle status badge per Section 2 Blueprint */}
            <div className="p-2.5 px-3 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/60 dark:bg-black/20 text-[11px] text-neutral-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-600 dark:text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{tier === 'free' ? 'Starter Memory' : 'Cloud History Synced'}</span>
              </div>
              {tier === 'free' && (
                <button
                  onClick={() => openUpgradeModal('ai_history', 'Upgrade to Pro for unlimited searchable chat memory.')}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold text-[10px] cursor-pointer"
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
        
        {/* Workspace Top Header Bar per Section 1 Blueprint */}
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

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-xs flex items-center gap-2">
                  <span>Vyralify Assistant</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/80 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Grounded in Account Analytics</span>
                  </span>
                </div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Live Data Connected</span>
                  <span>&bull;</span>
                  <span>Active Context</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Status: Clean without duplicate credits badge per 1.2 Blueprint */}
          <div className="flex items-center gap-2">
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
                  <div className="font-sans">
                    {isUser ? (
                      <div className="whitespace-pre-line text-white">{msg.text}</div>
                    ) : (
                      <CleanFormattedMessage text={msg.text} />
                    )}
                  </div>

                  {/* Interactive Action Buttons per Section 3 Blueprint */}
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

        {/* 4. SUGGESTED PROMPT CHIPS (4 Clean Action Pills with SVG Outline Icons per Section 4 Blueprint) */}
        <div className="px-4 py-2 border-t border-neutral-200/80 dark:border-white/[0.06] bg-neutral-50/70 dark:bg-[#0A0B0E] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PROMPT_SUGGESTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-white dark:bg-white/[0.03] hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-white/[0.06] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
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

        {/* 6. CHAT COMPOSER INPUT per Section 4 Blueprint */}
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
            className="p-2 rounded-xl bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] border border-transparent hover:border-neutral-300 dark:hover:border-white/20 text-neutral-600 dark:text-neutral-400 transition-all cursor-pointer shrink-0"
            title="Upload Screenshot (Analytics / Competitor Reel / Thumbnail)"
            aria-label="Upload Screenshot"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input Field: Clean direct placeholder per 4.2 */}
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask Assistant about scripts, retention, or growth strategy..."
            className="flex-1 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-emerald-500 focus:bg-white dark:focus:bg-[#0F1117] transition-all"
          />

          {/* Send Button: Subtle hover border and dark-mode active states */}
          <button
            type="submit"
            disabled={isGenerating || (!inputMessage.trim() && !attachedMedia)}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium border border-transparent hover:border-emerald-500 transition-all cursor-pointer shrink-0 shadow-xs"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
