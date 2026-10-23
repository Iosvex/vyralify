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
import Tesseract from 'tesseract.js';

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
 * Modern Executive ChatGPT-Style Message Formatter
 * Natural hierarchy, dark bold headings, clean bullet points, numbered steps,
 * and elegant markdown without artificial blue badges or cheap styling.
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
          className="my-3 p-3.5 rounded-xl bg-slate-50/90 border border-slate-200 text-xs shadow-2xs relative group"
        >
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
            <span>Copy / Template</span>
            <button
              onClick={() => handleCopyQuote(quoteContent, quoteIndex)}
              className="px-2 py-0.5 rounded-md bg-white hover:bg-slate-100 text-slate-700 text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 border border-slate-200 shadow-2xs"
              title="Copy to clipboard"
            >
              {copiedQuoteIdx === quoteIndex ? (
                <>
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
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
          <div className="text-[#0F172A] whitespace-pre-line leading-relaxed font-normal">
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
        <div key={`list-${key}-${renderedElements.length}`} className="my-2.5 space-y-1.5">
          {currentList.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#1E293B]">
              {item.type === 'ordered' ? (
                <span className="font-semibold text-slate-700 shrink-0 select-none min-w-[18px]">
                  {item.number}.
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
              )}
              <div className="flex-1 font-normal">
                {renderCleanInline(item.text)}
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

    // 2. Headings (#, ##, ###, ####)
    if (/^#{1,4}\s+(.+)$/.test(trimmed)) {
      flushQuote(lineIdx);
      flushList(lineIdx);
      const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
      const level = headingMatch ? headingMatch[1].length : 3;
      const headingText = headingMatch ? headingMatch[2].trim() : trimmed;

      if (level === 1) {
        renderedElements.push(
          <h2 key={`h-${lineIdx}`} className="text-base font-bold text-[#0F172A] mt-4 mb-2 first:mt-0 tracking-tight">
            {renderCleanInline(headingText)}
          </h2>
        );
      } else if (level === 2) {
        renderedElements.push(
          <h3 key={`h-${lineIdx}`} className="text-sm font-bold text-[#0F172A] mt-3.5 mb-1.5 tracking-tight">
            {renderCleanInline(headingText)}
          </h3>
        );
      } else {
        renderedElements.push(
          <h4 key={`h-${lineIdx}`} className="text-xs font-bold text-[#0F172A] mt-3 mb-1 uppercase tracking-wide">
            {renderCleanInline(headingText)}
          </h4>
        );
      }
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

    // 4. Ordered List (1. line, 2. line)
    const orderedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (orderedMatch) {
      currentList.push({
        type: 'ordered',
        number: orderedMatch[1],
        text: orderedMatch[2]
      });
      return;
    }

    // 5. Bullet List (* line, - line, • line)
    if (/^[*•-]\s+(.+)$/.test(trimmed)) {
      const cleanItem = trimmed.replace(/^[*•-]\s+/, '');
      currentList.push({
        type: 'bullet',
        text: cleanItem
      });
      return;
    } else {
      flushList(lineIdx);
    }

    // 6. Empty line
    if (!trimmed) {
      return;
    }

    // 7. Regular paragraph
    renderedElements.push(
      <p key={`p-${lineIdx}`} className="text-xs leading-relaxed text-[#1E293B]">
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

  // Split by inline code `...` and bold **...** and italic *...*
  const parts = text.split(/(`[^`]+`|\*\*.*?\*\*|\*[^*]+?\*)/g);

  return parts.map((part, pIdx) => {
    if (!part) return null;

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={pIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 text-[11px] font-mono border border-slate-200">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold text: **bold** (Clean dark bold text without blue badges)
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2).trim();
      return (
        <strong key={pIdx} className="font-semibold text-[#0F172A]">
          {boldText}
        </strong>
      );
    }

    // Italic text: *italic*
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={pIdx} className="text-slate-600 italic">
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

  const creditsLimit = aiCredits?.limit || (tier === 'pro' ? 300 : tier === 'elite' ? 99999 : 20);
  const creditsUsed = aiCredits?.usedToday || 0;
  const creditsRemaining = Math.max(0, creditsLimit - creditsUsed);
  const isNearLimit = tier === 'free' && creditsRemaining <= 4 && creditsRemaining > 0;

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
      const activeStored = localStorage.getItem('vyralify_active_session_id');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          const targetId = (activeStored && parsed.some(s => s.id === activeStored)) ? activeStored : parsed[0].id;
          setActiveSessionId(targetId);
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
    const handleSessionChange = (e) => {
      if (e.detail) {
        setActiveSessionId(e.detail);
      }
    };
    const handleNewChat = () => {
      handleNewSession();
    };
    const handleChatUpdated = () => {
      try {
        const stored = localStorage.getItem(SESSIONS_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSessions(parsed);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('vyralify_session_changed', handleSessionChange);
    window.addEventListener('vyralify_new_chat', handleNewChat);
    window.addEventListener('vyralify_chat_updated', handleChatUpdated);

    return () => {
      window.removeEventListener('vyralify_session_changed', handleSessionChange);
      window.removeEventListener('vyralify_new_chat', handleNewChat);
      window.removeEventListener('vyralify_chat_updated', handleChatUpdated);
    };
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
        window.dispatchEvent(new CustomEvent('vyralify_chat_updated'));
      } catch (e) {}
    }
  }, [sessions]);

  useEffect(() => {
    if (activeSessionId) {
      localStorage.setItem('vyralify_active_session_id', activeSessionId);
      window.dispatchEvent(new CustomEvent('vyralify_active_session_changed', { detail: activeSessionId }));
    }
  }, [activeSessionId]);

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
      const mediaItem = {
        name: file.name,
        mimeType: file.type,
        base64: base64String,
        previewUrl: URL.createObjectURL(file),
        ocrText: '',
        ocrPromise: null
      };

      // Background client-side OCR extraction
      mediaItem.ocrPromise = Tesseract.recognize(base64String, 'eng', {
        logger: () => {}
      }).then(({ data: { text } }) => {
        mediaItem.ocrText = text;
        return text;
      }).catch(err => {
        console.warn('Multimodal OCR notice:', err.message);
        return '';
      });

      setAttachedMedia(mediaItem);
      addNotification({
        title: 'Screenshot Attached',
        message: 'Visual OCR & multimodal retention analysis ready.',
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

    // 1. Quota Check & Credit Deduction
    const creditGranted = consumeCredit(1);
    if (!creditGranted) {
      addNotification({
        title: 'Daily AI Credits Exhausted',
        message: 'You have reached your daily limit of 20 credits. Claim bonus credits or upgrade to Pro to continue.',
        type: 'warning'
      });
      return;
    }

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

      // If media attached, ensure OCR has extracted text before dispatch
      if (mediaForRequest && !mediaForRequest.ocrText) {
        try {
          if (mediaForRequest.ocrPromise) {
            const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(''), 3500));
            const extracted = await Promise.race([mediaForRequest.ocrPromise, timeoutPromise]);
            if (extracted) mediaForRequest.ocrText = extracted;
          } else if (mediaForRequest.base64) {
            const { data: { text } } = await Tesseract.recognize(mediaForRequest.base64, 'eng');
            mediaForRequest.ocrText = text;
          }
        } catch (ocrErr) {
          console.warn('Multimodal OCR extraction notice:', ocrErr.message);
        }
      }

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
    <div className="h-[calc(100vh-5.5rem)] flex flex-col max-w-6xl mx-auto overflow-hidden">
      
      {/* MAIN CONVERSATION WORKSPACE (Clean Frosted White Container) */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs relative">
        
        {/* Workspace Top Header Bar */}
        <div className="p-3 px-5 border-b border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#067CF9] to-[#6366F1] text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-[#0F172A] text-sm tracking-tight">
                  Vyralify Assistant
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              </div>
              <p className="text-[11px] text-[#64748B]">
                Active Page Context: <strong className="text-[#0F172A]">@{activePage?.handle || 'creator'}</strong> &bull; {activeSession?.title || 'Growth Strategy Session'}
              </p>
            </div>
          </div>

          {/* Right Header Status */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNewSession}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-[#0F172A] font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Start a new chat thread"
            >
              <Plus className="w-3.5 h-3.5 text-[#067CF9]" />
              <span>New Thread</span>
            </button>

            {tier === 'free' && (
              <button
                onClick={() => openUpgradeModal('ai_credits', 'Unlock 300 daily generations & vision critiques with Pro.')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#067CF9] via-[#6366F1] to-[#8B5CF6] hover:opacity-95 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs"
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
                      <div className="p-1.5 bg-[#0F172A] text-white text-[10px] font-sans px-2 truncate">
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
                    <div className="flex items-center justify-between gap-3 mb-2 pb-2 border-b border-slate-100 text-[10px] font-sans text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#067CF9]" />
                        <span className="font-semibold text-slate-700">Vyralify Assistant</span>
                        {msg.provider && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-slate-100 text-slate-500 font-sans">
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
                      <span className="text-[10px] font-sans text-slate-400 mr-1">Recommended:</span>
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
                  <span className="text-[10px] font-sans text-slate-400 mt-1 mr-1">
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
                <span className="text-[10px] text-[#067CF9] block font-sans">Multimodal Vision Critique Ready</span>
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
