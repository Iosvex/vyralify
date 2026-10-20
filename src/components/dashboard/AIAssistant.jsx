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
  ArrowRight, 
  X, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
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
import { askVyralifyAssistant } from '../../lib/aiService';

const SESSIONS_STORAGE_KEY = 'vyralify_chat_sessions_v4';

/**
 * Intelligent clean session title generator
 */
function generateCleanSessionTitle(rawText, pageCategory) {
  if (!rawText) return 'Growth Strategy Session';
  const lower = rawText.toLowerCase().trim();

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
 * Modern Clean Message Formatter - Strict Electric Light Blueprint
 * Uses White (#FFFFFF), Obsidian Navy (#0F172A), Slate (#64748B), and Electric Blue (#067CF9)
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
          className="my-3 p-3.5 rounded-xl bg-white border border-[rgba(6,124,249,0.18)] text-xs shadow-2xs relative group"
        >
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#067CF9] font-bold mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9] animate-pulse" />
              <span>Recommended Script / Copy</span>
            </span>
            <button
              onClick={() => handleCopyQuote(quoteContent, quoteIndex)}
              className="px-2 py-0.5 rounded-md bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] text-[10px] font-mono transition-colors cursor-pointer flex items-center gap-1 border border-[#067CF9]/30 shadow-2xs"
              title="Copy to clipboard"
            >
              {copiedQuoteIdx === quoteIndex ? (
                <>
                  <Check className="w-2.5 h-2.5 text-[#067CF9]" />
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
          <div className="font-mono text-[#0F172A] whitespace-pre-line leading-relaxed selection:bg-[#067CF9]/20 font-medium">
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
            <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#0F172A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9] mt-2 shrink-0" />
              <div className="flex-1 font-normal">
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

    // 1. Divider / Separator
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushQuote(lineIdx);
      flushList(lineIdx);
      renderedElements.push(
        <div key={`div-${lineIdx}`} className="my-3 border-t border-slate-200" />
      );
      return;
    }

    // 2. Heading
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
        <div key={`h-${lineIdx}`} className="mt-4 mb-2 pt-2 border-t border-slate-100 first:border-0 first:pt-0 flex flex-wrap items-center gap-2">
          <span className="w-1.5 h-3.5 rounded-full bg-[#067CF9] shrink-0" />
          <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-tight font-headline">
            {renderCleanInline(mainTitle)}
          </h4>
          {badge && (
            <span className="px-2 py-0.5 rounded border border-[#067CF9]/20 bg-[#EFF6FF] text-[#067CF9] text-[10px] font-mono font-semibold">
              {badge}
            </span>
          )}
        </div>
      );
      return;
    }

    // 3. Blockquotes (> line)
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
      <p key={`p-${lineIdx}`} className="text-xs leading-relaxed text-[#0F172A]">
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

  let cleaned = text.replace(/^\*\s*\*\*/, '**').replace(/^\*\*\*/, '**');
  const parts = cleaned.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, pIdx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2).trim();

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
            className="inline-flex items-center px-1.5 py-0.2 mr-1.5 rounded border border-[#067CF9]/25 bg-[#EFF6FF] text-[#067CF9] font-mono font-bold text-[10px] uppercase tracking-wider"
          >
            {boldText.replace(/:$/, '')}
          </span>
        );
      }

      return (
        <strong key={pIdx} className="font-bold text-[#0F172A]">
          {boldText}
        </strong>
      );
    }

    if (part.startsWith('*') && part.endsWith('*') && part.length > 2 && !part.startsWith('**')) {
      return (
        <em key={pIdx} className="text-slate-500 italic">
          {part.slice(1, -1)}
        </em>
      );
    }

    return part;
  });
}

export default function AIAssistant({ onNavigate }) {
  const { user, tier, aiCredits } = useAuth();
  const { activePage } = usePage();
  const { openUpgradeModal } = usePlanGating();
  const { addNotification } = useNotifications();

  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState(null);
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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

    const initialSession = createDefaultSession(activePage);
    setSessions([initialSession]);
    setActiveSessionId(initialSession.id);
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {}
    }
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId, isGenerating]);

  function createDefaultSession(page) {
    const handle = page?.handle || 'creator';
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

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const handleNewSession = () => {
    const newSession = createDefaultSession(activePage);
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputMessage('');
    setAttachedMedia(null);
  };

  const handleDeleteSession = (e, sessionId) => {
    e.stopPropagation();
    if (sessions.length <= 1) {
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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addNotification({
        title: 'Unsupported File',
        message: 'Please upload an image screenshot of your Instagram page or reel.',
        type: 'warning'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addNotification({
        title: 'File Too Large',
        message: 'Max image size is 5MB for multimodal critique.',
        type: 'warning'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target?.result;
      setAttachedMedia({
        name: file.name,
        mimeType: file.type,
        base64: base64String,
        previewUrl: URL.createObjectURL(file)
      });
      addNotification({
        title: 'Screenshot Attached',
        message: 'Ready for multimodal vision retention critique.',
        type: 'info'
      });
    };
    reader.readAsDataURL(file);
  };

  const parseActionButtons = (aiText) => {
    const actions = [];
    let cleanText = aiText;

    const actionRegex = /\[ACTION:\s*([a-zA-Z0-9_]+)\s*\|\s*([^\]]+)\]/g;
    let match;
    while ((match = actionRegex.exec(aiText)) !== null) {
      actions.push({
        type: match[1],
        label: match[2].trim()
      });
    }

    cleanText = cleanText.replace(actionRegex, '').trim();
    return { cleanText, actions };
  };

  const handleSendMessage = async (textOverride = null) => {
    const textToSend = textOverride || inputMessage;
    if (!textToSend.trim() && !attachedMedia) return;

    const userMessageId = 'msg_user_' + Date.now();
    const newUserMsg = {
      id: userMessageId,
      sender: 'user',
      text: textToSend.trim(),
      mediaUrl: attachedMedia?.previewUrl || null,
      mediaName: attachedMedia?.name || null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    let sessionTitle = activeSession?.title;
    if (!activeSession?.messages || activeSession.messages.length <= 1) {
      sessionTitle = generateCleanSessionTitle(textToSend, activePage?.category);
    }

    const updatedMessages = [...(activeSession?.messages || []), newUserMsg];
    
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

  const handleCopyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const filteredSessions = sessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.messages.some(m => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const creditsRemaining = Math.max(0, (aiCredits?.limit || 20) - (aiCredits?.usedToday || 0));
  const creditUsagePercent = (aiCredits?.limit || 20) > 90000 ? 0 : Math.round(((aiCredits?.usedToday || 0) / (aiCredits?.limit || 20)) * 100);
  const isNearLimit = creditUsagePercent >= 80 && (aiCredits?.limit || 20) < 90000;

  const PROMPT_SUGGESTIONS = [
    { 
      label: '3 Viral Reel Hooks', 
      icon: Target,
      prompt: `Write 3 high-retention opening hooks for @${activePage?.handle || 'my page'} targeting first-3-second retention.` 
    },
    { 
      label: 'Bio Conversion Teardown', 
      icon: Search,
      prompt: `Audit my current bio for @${activePage?.handle || 'my page'} and suggest 3 high-converting rewrites with DM call-to-actions.` 
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
      
      {/* 1. SESSIONS HISTORY DRAWER (Clean Frosted White Container) */}
      <div className={`shrink-0 transition-all duration-300 ease-in-out flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs ${
        isSidebarOpen ? 'w-full lg:w-72' : 'w-14 hidden lg:flex'
      }`}>
        
        {/* Drawer Header */}
        <div className="p-3 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
          {isSidebarOpen ? (
            <>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#067CF9]" />
                <span className="font-semibold text-xs text-[#0F172A]">Conversations</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-50 text-[10px] font-mono text-[#067CF9] font-semibold">
                  {sessions.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleNewSession}
                  className="p-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] text-xs transition-colors cursor-pointer shadow-2xs"
                  title="New Thread"
                  aria-label="New Thread"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
              className="w-full py-2 flex items-center justify-center hover:bg-slate-100 text-slate-400 rounded-lg transition-colors cursor-pointer"
              title="Expand Conversations"
              aria-label="Expand Conversations"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Drawer Search & List */}
        {isSidebarOpen && (
          <>
            <div className="p-2.5 border-b border-slate-100">
              <div className="relative">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search chats..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl pl-7 pr-2.5 py-1.5 text-[11px] text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-[#067CF9] focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Sessions Scroll List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 bg-white">
              {filteredSessions.map((s) => {
                const isActive = s.id === activeSessionId;
                return (
                  <div
                    key={s.id}
                    onClick={() => setActiveSessionId(s.id)}
                    className={`group relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-[#EFF6FF] border-[#067CF9]/40 text-[#067CF9] font-semibold shadow-2xs'
                        : 'bg-transparent border-transparent hover:bg-slate-50 text-slate-600 hover:text-[#0F172A]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs truncate">{s.title}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                        <span>{s.messages.length} msgs</span>
                        <span>&bull;</span>
                        <span>{new Date(s.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(e, s.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all cursor-pointer"
                      title="Delete Thread"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-400">
                  No matching sessions found.
                </div>
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="p-2.5 px-3 border-t border-slate-100 bg-slate-50/70 text-[11px] text-slate-500 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9]" />
                <span>{tier === 'free' ? 'Starter Memory' : 'Cloud History Synced'}</span>
              </div>
              {tier === 'free' && (
                <button
                  onClick={() => openUpgradeModal('ai_history', 'Upgrade to Pro for unlimited searchable chat memory.')}
                  className="text-[#067CF9] hover:underline font-semibold text-[10px] cursor-pointer"
                >
                  Upgrade &rarr;
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* 2. MAIN CONVERSATION WORKSPACE (Clean Frosted White Container) */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs relative">
        
        {/* Workspace Top Header Bar */}
        <div className="p-3 px-4 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
                title="View Chats"
              >
                <MessageSquare className="w-4 h-4 text-[#067CF9]" />
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#067CF9] text-white flex items-center justify-center font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-[#0F172A] text-xs flex items-center gap-2 font-headline">
                  <span>Vyralify Assistant</span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#EFF6FF] border border-[#067CF9]/20 text-[#067CF9] text-[10px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9] animate-pulse" />
                    <span>Grounded in Account Analytics</span>
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#067CF9] font-semibold">Live Data Connected</span>
                  <span>&bull;</span>
                  <span>Active Context</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Header Status */}
          <div className="flex items-center gap-2">
            {tier === 'free' && (
              <button
                onClick={() => openUpgradeModal('ai_credits', 'Unlock 300 daily generations & vision critiques with Pro.')}
                className="px-3 py-1.5 rounded-xl bg-[#067CF9] hover:bg-[#056ad6] text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Upgrade to Pro
              </button>
            )}
          </div>
        </div>

        {/* 80% Credit Warning Banner */}
        {isNearLimit && (
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>80% AI Quota Reached:</strong> You have {creditsRemaining} generations remaining today on the Starter plan.
              </span>
            </div>
            <button
              onClick={() => openUpgradeModal('ai_credits', 'Upgrade to Pro for 300 daily generations.')}
              className="text-amber-700 font-semibold underline hover:no-underline cursor-pointer text-[11px]"
            >
              Get 300 Credits &rarr;
            </button>
          </div>
        )}

        {/* 3. MESSAGE THREAD DISPLAY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F8FAFC]">
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
                {/* Media Attachment */}
                {msg.mediaUrl && (
                  <div className="mb-2 max-w-sm rounded-xl overflow-hidden border border-blue-200 shadow-xs">
                    <img src={msg.mediaUrl} alt="Uploaded critique media" className="max-h-48 w-full object-cover" />
                    {msg.mediaName && (
                      <div className="p-1.5 bg-[#0F172A] text-white text-[10px] font-mono px-2 truncate">
                        📎 {msg.mediaName}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble */}
                <div className={`group relative max-w-2xl p-4 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#067CF9] text-white font-medium rounded-tr-xs shadow-md shadow-blue-500/20'
                    : 'bg-white border border-slate-200/90 text-[#0F172A] rounded-tl-xs shadow-xs'
                }`}>
                  
                  {/* Sender Header for AI */}
                  {!isUser && (
                    <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-100 text-[10px] font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9]" />
                        <span className="font-semibold text-slate-700">Vyralify Assistant</span>
                        {msg.provider && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-500 font-mono">
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

                  {/* Interactive Action Buttons */}
                  {!isUser && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 mr-1">Recommended:</span>
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => onNavigate && onNavigate(act.type)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#EFF6FF] hover:bg-[#067CF9] hover:text-white text-[#067CF9] border border-[#067CF9]/30 font-semibold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
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
                      className="p-1 rounded-md bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors shadow-2xs"
                      title="Copy response"
                    >
                      {copiedMessageId === msg.id ? (
                        <Check className="w-3 h-3 text-[#067CF9]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {isUser && (
                  <span className="text-[10px] font-mono text-slate-400 mt-1 mr-1">
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
              className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 w-fit shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#067CF9] animate-spin" />
              <span>Analyzing @{activePage?.handle || 'page'} benchmarks &amp; generating tactical answer...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 4. SUGGESTED PROMPT CHIPS */}
        <div className="px-4 py-2.5 border-t border-slate-200 bg-white flex items-center gap-2 overflow-x-auto no-scrollbar">
          {PROMPT_SUGGESTIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.prompt)}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#067CF9] border border-[#067CF9]/30 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <Icon className="w-3.5 h-3.5 text-[#067CF9] shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5. ATTACHED MEDIA PREVIEW BANNER */}
        {attachedMedia && (
          <div className="px-4 py-2 border-t border-blue-100 bg-[#EFF6FF] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <img src={attachedMedia.previewUrl} alt="Preview" className="w-8 h-8 rounded-lg object-cover border border-[#067CF9]/30" />
              <div>
                <span className="font-semibold text-[#0F172A]">{attachedMedia.name}</span>
                <span className="text-[10px] text-[#067CF9] block font-mono">Multimodal Vision Critique Ready</span>
              </div>
            </div>
            <button
              onClick={() => setAttachedMedia(null)}
              className="p-1 rounded-md text-[#067CF9] hover:bg-[#DBEAFE] cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 6. CHAT COMPOSER INPUT: Light gray input bar #F8FAFC with Electric Blue send button */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-slate-200 bg-white flex items-center gap-2"
        >
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
            className="p-2.5 rounded-xl bg-[#F8FAFC] hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-[#0F172A] transition-all cursor-pointer shrink-0"
            title="Upload Screenshot"
            aria-label="Upload Screenshot"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask Assistant about scripts, retention, or growth strategy..."
            className="flex-1 bg-[#F8FAFC] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-hidden focus:border-[#067CF9] focus:bg-white transition-all font-medium"
          />

          <button
            type="submit"
            disabled={isGenerating || (!inputMessage.trim() && !attachedMedia)}
            className="p-2.5 rounded-xl bg-[#067CF9] hover:bg-[#056AD6] disabled:opacity-40 text-white font-medium transition-all cursor-pointer shrink-0 shadow-md shadow-blue-500/20"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
}
