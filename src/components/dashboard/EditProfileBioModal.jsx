import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Sparkles, 
  Copy, 
  ShieldCheck, 
  Globe, 
  User, 
  FileText, 
  Loader2,
  ExternalLink
} from 'lucide-react';
import { usePage, getSafeAvatarUrl } from '../../context/PageContext';
import { useNotifications } from '../../context/NotificationContext';
import { generateLiveBios } from '../../lib/aiService';

export default function EditProfileBioModal({ isOpen, onClose }) {
  const { activePage, updatePage } = usePage();
  const { addNotification } = useNotifications();

  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState('');
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activePage) {
      setDisplayName(activePage.displayName || `@${activePage.handle}`);
      setBio(activePage.bio || '');
      setWebsite(activePage.website || `https://vyralify.in/@${activePage.handle}`);
      setCategory(activePage.category || 'Creator');
      setAiSuggestions([]);
    }
  }, [activePage, isOpen]);

  if (!isOpen || !activePage) return null;

  const charCount = bio.length;
  const maxChars = 150; // Instagram bio limit

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      updatePage(activePage.id, {
        displayName: displayName.trim(),
        bio: bio.trim(),
        website: website.trim(),
        category: category.trim()
      });

      addNotification({
        title: 'Profile & Bio Updated 🚀',
        message: `Bio for @${activePage.handle} was saved and synced to your cloud account.`,
        type: 'success'
      });

      setIsSaving(false);
      onClose();
    } catch (err) {
      setIsSaving(false);
      addNotification({
        title: 'Save Failed',
        message: err.message || 'Could not save profile changes.',
        type: 'error'
      });
    }
  };

  const handleAiPolish = async () => {
    setIsGeneratingBio(true);
    try {
      const res = await generateLiveBios({
        handle: activePage.handle,
        niche: category || activePage.category || 'Creator',
        subNiche: activePage.subNiche || 'Digital Creator',
        currentBio: bio,
        objective: 'lead_magnet'
      });

      if (res.bios && res.bios.length > 0) {
        setAiSuggestions(res.bios);
        addNotification({
          title: 'AI Bio Suggestions Generated ✨',
          message: 'Click any suggestion below to apply it to your profile.',
          type: 'success'
        });
      }
    } catch (err) {
      console.warn('AI Bio error:', err);
      // High-converting fallback suggestions
      setAiSuggestions([
        `🚀 Helping creators scale to $10k/mo\n👇 Free viral blueprint & presets below:`,
        `💡 Growth, monetization & organic reach\n🔥 Tested frameworks daily\nGet the toolkit 👇`,
        `Digital creator & agency founder\n📈 0 to 100K audience system\nAccess all resources 👇`
      ]);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const handleCopyBio = () => {
    navigator.clipboard.writeText(bio);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
    addNotification({
      title: 'Bio Copied!',
      message: 'Paste directly into your Instagram profile settings.',
      type: 'info'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="w-full max-w-lg bg-white border border-[#E2E8F0] rounded-2xl shadow-2xl overflow-hidden text-[#0F172A] max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-blue-50/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={getSafeAvatarUrl(activePage.avatar, activePage.handle)}
                alt={activePage.handle}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#6366F1]/20 shadow-xs"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-tight text-[#0F172A]">
                  Edit Profile &amp; Bio
                </h3>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-[#64748B]">
                @{activePage.handle} &bull; {activePage.followersCount || '0'} followers
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto flex-1 text-left">
          {/* Display Name */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Display / Creator Name</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Alex Rivera | Creator Growth"
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all"
            />
          </div>

          {/* Bio Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#0F172A] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#6366F1]" />
                <span>Instagram Bio</span>
              </label>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-semibold ${charCount > maxChars ? 'text-red-500' : 'text-[#64748B]'}`}>
                  {charCount}/{maxChars}
                </span>
                <button
                  type="button"
                  onClick={handleAiPolish}
                  disabled={isGeneratingBio}
                  className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {isGeneratingBio ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-purple-600" />
                  )}
                  <span>AI Polish Bio</span>
                </button>
              </div>
            </div>

            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your high-converting Instagram bio here..."
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-normal text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all leading-relaxed"
            />

            {/* AI Bio Suggestions Pill Tray */}
            {aiSuggestions.length > 0 && (
              <div className="mt-2.5 p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-2">
                <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>AI Generated Bio Options (Click to apply)</span>
                </div>
                <div className="space-y-1.5">
                  {aiSuggestions.map((item, idx) => {
                    const text = typeof item === 'string' ? item : item.text || item.bio || '';
                    return (
                      <div
                        key={idx}
                        onClick={() => setBio(text)}
                        className="p-2 rounded-lg bg-white border border-purple-100 hover:border-purple-300 text-[11px] text-[#0F172A] cursor-pointer transition-colors shadow-2xs leading-relaxed"
                      >
                        <pre className="font-sans whitespace-pre-wrap">{text}</pre>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Website / Bio Link */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#6366F1]" />
              <span>Link-in-Bio / Website URL</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://vyralify.in/@username"
                className="w-full pl-3 pr-20 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] transition-all"
              />
              <button
                type="button"
                onClick={() => setWebsite(`https://vyralify.in/@${activePage.handle}`)}
                className="absolute right-2 top-1.5 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[#64748B] text-[10px] font-mono cursor-pointer transition-colors"
                title="Use Vyralify Store Link"
              >
                Store Link
              </button>
            </div>
            <p className="text-[10px] text-[#64748B] mt-1">
              Direct traffic from your Instagram bio to your 1-click Vyralify storefront.
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#0F172A] mb-1">
              Creator Niche / Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Business & Money, Fitness, Tech & AI"
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#6366F1]"
            />
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyBio}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-white text-xs font-semibold text-[#0F172A] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            {copiedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Copy for Instagram</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#067CF9] to-[#6366F1] hover:opacity-95 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5 stroke-[3]" />}
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
