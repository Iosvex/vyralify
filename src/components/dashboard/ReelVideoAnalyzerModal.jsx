import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  Play, 
  TrendingUp, 
  Share2, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Copy, 
  Check, 
  Zap, 
  ArrowRight, 
  Bot, 
  Film, 
  BarChart2, 
  Volume2, 
  Sliders, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { analyzeReelVideo } from '../../lib/aiService';
import { useNotifications } from '../../context/NotificationContext';
import { usePage } from '../../context/PageContext';

export default function ReelVideoAnalyzerModal({ 
  isOpen, 
  onClose, 
  initialReel = null, 
  onDeployTrigger = null 
}) {
  const { activePage } = usePage();
  const { addNotification } = useNotifications();

  // Input states
  const [reelInputType, setReelInputType] = useState(initialReel ? 'selected' : 'custom'); // 'selected' | 'link' | 'custom'
  const [selectedReel, setSelectedReel] = useState(initialReel || null);
  const [reelUrl, setReelUrl] = useState('');
  const [videoHook, setVideoHook] = useState(initialReel?.caption || initialReel?.title || '');
  const [videoCaption, setVideoCaption] = useState(initialReel?.caption || '');
  const [estimatedDuration, setEstimatedDuration] = useState('30s');

  // Execution & results state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeTab, setActiveTab] = useState('diagnostics'); // 'diagnostics' | 'remix'
  const [isCopied, setIsCopied] = useState(false);

  // If initialReel changes when modal opens
  React.useEffect(() => {
    if (initialReel) {
      setSelectedReel(initialReel);
      setVideoHook(initialReel.caption || initialReel.title || '');
      setVideoCaption(initialReel.caption || '');
      setReelInputType('selected');
    }
  }, [initialReel]);

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    const hookToAnalyze = videoHook || selectedReel?.caption || selectedReel?.title || reelUrl;
    if (!hookToAnalyze.trim()) {
      addNotification({
        title: 'Input Required',
        message: 'Please select a reel, enter a hook, or paste a video URL to analyze.',
        type: 'warning'
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeReelVideo({
        title: selectedReel?.title || hookToAnalyze,
        caption: videoCaption || selectedReel?.caption || '',
        hook: hookToAnalyze,
        niche: activePage?.category || 'Business & Money',
        subNiche: activePage?.subNiche || '',
        videoUrl: reelUrl,
        reelUrl: reelUrl || selectedReel?.permalink || '',
        views: selectedReel?.views || '12.4K',
        retention: selectedReel?.retention || '68%',
        shares: selectedReel?.shares || '142',
        duration: estimatedDuration
      });

      setAnalysisResult(result);
      addNotification({
        title: 'Reel Analysis Complete ⚡',
        message: `Retention score: ${result.hookScore}/100. AI Remix script ready.`,
        type: 'success'
      });
    } catch (err) {
      console.error('Reel analysis error:', err);
      addNotification({
        title: 'Analysis Notice',
        message: 'Failed to complete full AI analysis. Please try again.',
        type: 'error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyRemixScript = () => {
    if (!analysisResult?.aiRemixScript) return;
    const s = analysisResult.aiRemixScript;
    const text = `🎬 AI VIRAL REMIX SCRIPT: ${s.title}\n\n🔥 Spoken Hook:\n"${s.improvedHook}"\n\n👀 Visual Pattern Interrupt:\n${s.visualPatternInterrupt}\n\n🎵 Recommended Audio:\n${s.audioRecommendation}\n\n⏱️ Scene-by-Scene Pacing:\n${s.remixedScenes.map(sc => `• [${sc.second}] Visual: ${sc.visual}\n  Audio: "${sc.audio}"`).join('\n\n')}\n\n💬 Comment-to-DM Trigger Keyword: "${s.ctaTriggerKeyword}"\n\n📝 Optimized Caption:\n${s.optimizedCaption}`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    addNotification({
      title: 'Script Copied!',
      message: 'Full scene-by-scene viral script copied to clipboard.',
      type: 'success'
    });
  };

  const availableReels = (activePage?.topReels && activePage.topReels.length > 0)
    ? activePage.topReels
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-md overflow-y-auto font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl bg-white dark:bg-[#0C0D12] border border-neutral-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between bg-gradient-to-r from-neutral-50 to-white dark:from-[#0F1117] dark:to-[#0C0D12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] text-white flex items-center justify-center shadow-md shadow-pink-500/20 shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                  AI Video &amp; Reel Performance Analyzer
                </h2>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-mono font-semibold">
                  2026 Retention Math
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Analyze 3-second hook drop-off, shares:likes leverage, and engineer a viral AI remix.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Top Selector: Choose Reel from Account OR Paste URL/Concept */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-500" />
                <span>Select Content to Analyze</span>
              </label>

              <div className="flex items-center gap-1 bg-white dark:bg-[#14161F] p-0.5 rounded-lg border border-neutral-200 dark:border-white/[0.06]">
                {availableReels.length > 0 && (
                  <button
                    onClick={() => setReelInputType('selected')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      reelInputType === 'selected'
                        ? 'bg-purple-600 text-white'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    Synced Reels ({availableReels.length})
                  </button>
                )}
                <button
                  onClick={() => setReelInputType('link')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    reelInputType === 'link'
                      ? 'bg-purple-600 text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  Instagram Link
                </button>
                <button
                  onClick={() => setReelInputType('custom')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    reelInputType === 'custom'
                      ? 'bg-purple-600 text-white'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  Custom Concept / Hook
                </button>
              </div>
            </div>

            {/* Sub-View: Select from Synced Reels */}
            {reelInputType === 'selected' && availableReels.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {availableReels.map((reel) => {
                  const isChosen = selectedReel?.id === reel.id;
                  return (
                    <button
                      key={reel.id}
                      onClick={() => {
                        setSelectedReel(reel);
                        setVideoHook(reel.caption || reel.title);
                        setVideoCaption(reel.caption || '');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isChosen
                          ? 'bg-purple-50 dark:bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/20'
                          : 'bg-white dark:bg-[#0E1017] border-neutral-200/80 dark:border-white/[0.06] hover:border-purple-300'
                      }`}
                    >
                      <img
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-10 h-10 rounded-lg object-cover ring-1 ring-black/5 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-neutral-900 dark:text-white truncate text-[11px]">
                          {reel.title}
                        </div>
                        <div className="text-[10px] text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mt-0.5">
                          <span>{reel.views} views</span>
                          <span>&bull;</span>
                          <span className="text-emerald-600 font-medium">{reel.retention || '68%'} ret</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sub-View: Paste Instagram Link */}
            {reelInputType === 'link' && (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  placeholder="https://www.instagram.com/reel/C7xP9..."
                  value={reelUrl}
                  onChange={(e) => setReelUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0E1017] border border-neutral-200 dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-xs"
                />
                <p className="text-[11px] text-neutral-500">
                  Paste any public Instagram reel or video URL. Our AI extracts hook cadence and pattern dynamics.
                </p>
              </div>
            )}

            {/* Sub-View: Custom Concept / Hook */}
            {reelInputType === 'custom' && (
              <div className="space-y-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. Stop selling $20 courses in 2026. Here is the high-ticket micro-offer model:"
                  value={videoHook}
                  onChange={(e) => setVideoHook(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#0E1017] border border-neutral-200 dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-xs"
                />
                <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                  <span>Duration:</span>
                  {['15s', '30s', '45s', '60s'].map(d => (
                    <button
                      key={d}
                      onClick={() => setEstimatedDuration(d)}
                      className={`px-2 py-0.5 rounded cursor-pointer ${
                        estimatedDuration === d
                          ? 'bg-purple-600 text-white font-semibold'
                          : 'bg-neutral-200 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Run Button */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deconstructing 3-Second Retention Math...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Retention Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Analysis Results Display */}
          {analysisResult && (
            <div className="space-y-5 animate-in fade-in duration-300">
              
              {/* Result Header & 4 Key Score Gauges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Gauge 1: Hook Score */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Hook Score</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-2xl font-black ${
                      analysisResult.hookScore >= 80 ? 'text-emerald-500' : analysisResult.hookScore >= 60 ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {analysisResult.hookScore}
                    </span>
                    <span className="text-neutral-400 text-xs font-bold">/100</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium truncate">
                    {analysisResult.hookVerdict}
                  </div>
                </div>

                {/* Gauge 2: 3-Second Retention */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">3s Retention</div>
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400">
                    {analysisResult.retentionPrediction3s}
                  </div>
                  <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    <span>70%+ Goal</span>
                  </div>
                </div>

                {/* Gauge 3: Share:Like Leverage */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Share Leverage</div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white pt-1">
                    {analysisResult.shareVelocity}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    5x explore weight
                  </div>
                </div>

                {/* Gauge 4: Drop-Off Risk Second */}
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                  <div className="text-[10px] uppercase font-mono text-neutral-500 tracking-wider">Stall Point</div>
                  <div className="text-2xl font-black text-rose-500">
                    {analysisResult.criticalDropOffSecond}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Pattern interrupt required
                  </div>
                </div>

              </div>

              {/* Sub-Tab Navigation inside Results: Diagnostics vs AI Remix Script */}
              <div className="flex items-center gap-2 border-b border-neutral-200/80 dark:border-white/[0.06] pb-2">
                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'diagnostics'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  <span>Retention Curve &amp; Drop-off Timeline</span>
                </button>
                <button
                  onClick={() => setActiveTab('remix')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'remix'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Viral Remix Script (2x Views)</span>
                </button>
              </div>

              {/* Tab 1: Diagnostics Timeline */}
              {activeTab === 'diagnostics' && (
                <div className="space-y-4">
                  
                  {/* Timeline Stages */}
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      <span>Timestamp Retention Curve &amp; Friction Points</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {analysisResult.dropOffTimeline?.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white dark:bg-[#0E1017] border border-neutral-200/80 dark:border-white/[0.06] space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-neutral-900 dark:text-white">
                              {item.time} &bull; {item.phase}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.status === 'Strong'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : item.status === 'Drop-off Risk'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                            }`}>
                              {item.status} ({item.retentionPct}%)
                            </span>
                          </div>
                          <div className="w-full bg-neutral-100 dark:bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.retentionPct >= 75 ? 'bg-emerald-500' : item.retentionPct >= 65 ? 'bg-purple-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${item.retentionPct}%` }}
                            />
                          </div>
                          <p className="text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed">
                            {item.critique}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Gaps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 space-y-2">
                      <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Algorithmic Advantages</span>
                      </div>
                      <ul className="space-y-1 text-emerald-900 dark:text-emerald-300 text-[11px]">
                        {analysisResult.strengths?.map((st, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">&bull;</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 space-y-2">
                      <div className="font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Retention Drop-Off Leaks</span>
                      </div>
                      <ul className="space-y-1 text-amber-900 dark:text-amber-300 text-[11px]">
                        {analysisResult.gaps?.map((gap, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-500 mt-0.5">&bull;</span>
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: AI Remix Script */}
              {activeTab === 'remix' && analysisResult.aiRemixScript && (
                <div className="space-y-4">
                  
                  {/* Top Bar with Copy Button */}
                  <div className="flex items-center justify-between pb-1">
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white text-sm">
                        {analysisResult.aiRemixScript.title}
                      </h4>
                      <p className="text-neutral-500 text-[11px]">
                        Paced for 70%+ 3-second retention and automated comment-to-DM lead capture.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyRemixScript}
                        className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/[0.06] hover:bg-neutral-200 dark:hover:bg-white/[0.1] text-neutral-800 dark:text-white font-medium transition-colors flex items-center gap-1.5 cursor-pointer text-xs"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Full Script</span>
                          </>
                        )}
                      </button>

                      {onDeployTrigger && (
                        <button
                          onClick={() => {
                            onClose();
                            onDeployTrigger(analysisResult.aiRemixScript.ctaTriggerKeyword || 'VAULT');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors flex items-center gap-1.5 cursor-pointer text-xs shadow-xs"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Deploy Auto-DM Trigger ("{analysisResult.aiRemixScript.ctaTriggerKeyword || 'VAULT'}")</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Improved Hook Callout */}
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 space-y-1">
                    <div className="text-[10px] font-mono uppercase text-purple-600 dark:text-purple-400 font-bold">
                      Re-engineered Spoken Hook (0.0s - 2.5s)
                    </div>
                    <div className="text-sm font-extrabold text-neutral-900 dark:text-white">
                      "{analysisResult.aiRemixScript.improvedHook}"
                    </div>
                    <div className="text-[11px] text-neutral-600 dark:text-neutral-400 pt-1">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">Visual Cue: </span>
                      {analysisResult.aiRemixScript.visualPatternInterrupt}
                    </div>
                  </div>

                  {/* Scene-by-Scene Pacing Timeline */}
                  <div className="space-y-2">
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      Scene-by-Scene Execution Blueprint
                    </div>

                    <div className="space-y-2">
                      {analysisResult.aiRemixScript.remixedScenes?.map((sc, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-white dark:bg-[#0E1017] border border-neutral-200/80 dark:border-white/[0.06] flex items-start gap-3"
                        >
                          <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/[0.05] font-mono text-[10px] font-bold text-neutral-700 dark:text-neutral-300 shrink-0">
                            {sc.second}
                          </span>
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                              Visual: {sc.visual}
                            </div>
                            <div className="text-neutral-900 dark:text-white font-medium text-xs">
                              "{sc.audio}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optimized Caption & Audio */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                      <div className="text-[10px] font-mono uppercase text-neutral-500 font-bold">Audio Track Match</div>
                      <div className="text-neutral-900 dark:text-white font-semibold flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-purple-500" />
                        <span>{analysisResult.aiRemixScript.audioRecommendation}</span>
                      </div>
                      <div className="text-[10px] text-neutral-500 pt-0.5">
                        Pacing: {analysisResult.aiRemixScript.pacingCutGuide}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/[0.06] space-y-1">
                      <div className="text-[10px] font-mono uppercase text-neutral-500 font-bold">High-Converting Caption</div>
                      <p className="text-neutral-700 dark:text-neutral-300 text-[11px] whitespace-pre-line line-clamp-3">
                        {analysisResult.aiRemixScript.optimizedCaption}
                      </p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between bg-neutral-50/50 dark:bg-[#0E1017]">
          <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-purple-500" />
            <span>Grounded in @{activePage?.handle || 'creator'}'s profile metrics and short-form algorithms</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-200 dark:bg-white/[0.08] hover:bg-neutral-300 text-neutral-800 dark:text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </motion.div>
    </div>
  );
}
