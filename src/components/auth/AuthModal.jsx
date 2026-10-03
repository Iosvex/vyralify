import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User, Shield, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onSuccess }) {
  const { login, signup, loginWithGoogle, loginWithApple, resetPassword, isLockedOut } = useAuth();
  
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);
  const [aiConsentAccepted, setAiConsentAccepted] = useState(false);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');

    if (mode === 'forgot') {
      if (!email) {
        setError('Please enter your email address.');
        return;
      }
      setLoading(true);
      try {
        await resetPassword(email);
        setInfoMessage('Password reset link sent to your email.');
      } catch (err) {
        setError(err.message || 'Failed to send reset link.');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup') {
      if (!tosAccepted) {
        setError('You must accept the Terms of Service & Privacy Policy.');
        return;
      }
      if (!aiConsentAccepted) {
        setError('You must accept the AI data processing consent to continue.');
        return;
      }
      setLoading(true);
      try {
        await signup(email, password, displayName, aiConsentAccepted);
        if (onSuccess) onSuccess('signup');
        onClose();
      } catch (err) {
        setError(err.message || 'Signup failed.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Login mode
    setLoading(true);
    try {
      await login(email, password);
      if (onSuccess) onSuccess('login');
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid credentials or failed login.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    setError('');
    setLoading(true);
    try {
      if (provider === 'google') await loginWithGoogle();
      if (provider === 'apple') await loginWithApple();
      if (onSuccess) onSuccess('social');
      onClose();
    } catch (err) {
      setError('Social authentication canceled or failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.18 }}
          className="relative w-full max-w-sm bg-white dark:bg-[#0C0D12] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-2xl text-neutral-900 dark:text-white z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo & Headline */}
          <div className="text-center mb-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <img src="/vyralify-logo.png" alt="Vyralify" className="h-5 w-auto object-contain" />
              <span className="font-bold text-base text-neutral-900 dark:text-white tracking-tight">Vyralify</span>
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Your Account' : 'Reset Password'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {mode === 'login' ? 'Log in to your creator workspace' : mode === 'signup' ? 'Launch your theme page ecosystem' : 'Enter your email to receive recovery instructions'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          {mode !== 'forgot' && (
            <div className="flex p-0.5 rounded-xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] mb-4">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'login' ? 'bg-white text-emerald-700 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  mode === 'signup' ? 'bg-white text-emerald-700 shadow-xs' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Errors / Warnings */}
          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 mb-3">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {isLockedOut && (
            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs mb-3">
              Account locked for 30s due to repeated failed attempts.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="block text-[11px] font-mono text-neutral-500 mb-1 font-medium">Your Name</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Creator Name"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-neutral-500 mb-1 font-medium">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@vyralify.in"
                  className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono text-neutral-500 font-medium">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-emerald-600 hover:underline cursor-pointer font-medium"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Signup Checkboxes: ToS & AI Consent */}
            {mode === 'signup' && (
              <div className="space-y-1.5 pt-1 text-[11px] text-neutral-500">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tosAccepted}
                    onChange={(e) => setTosAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-0"
                  />
                  <span>
                    I agree to the <strong className="text-neutral-800 dark:text-neutral-200">Terms</strong> and <strong className="text-neutral-800 dark:text-neutral-200">Privacy Policy</strong>.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiConsentAccepted}
                    onChange={(e) => setAiConsentAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 text-emerald-600 focus:ring-0"
                  />
                  <span>
                    I consent to Vyralify processing connected Instagram analytics.
                  </span>
                </label>
              </div>
            )}

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading || isLockedOut}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 mt-3 cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <span>
                {loading 
                  ? 'Please wait...' 
                  : mode === 'login' 
                  ? 'Log In' 
                  : mode === 'signup' 
                  ? 'Create Free Account' 
                  : 'Send Reset Link'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social Auth Providers */}
          {mode !== 'forgot' && (
            <>
              <div className="relative my-3.5 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200 dark:border-white/[0.06]" /></div>
                <span className="relative bg-white dark:bg-[#0C0D12] px-2 text-[10px] font-mono text-neutral-400 uppercase">OR</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('google')}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"/></svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('apple')}
                  className="py-2 px-3 rounded-xl bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] hover:bg-neutral-50 dark:hover:bg-white/[0.05] text-xs text-neutral-700 dark:text-neutral-300 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.8 1.1-1.92.98-3.04-1 .04-2.17.67-2.83 1.46-.58.68-1.1 1.8-1.01 2.92 1.14.09 2.21-.54 2.86-1.34z"/></svg>
                  <span>Apple</span>
                </button>
              </div>
            </>
          )}

          {mode === 'forgot' && (
            <div className="text-center mt-3">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-emerald-600 hover:underline cursor-pointer font-medium"
              >
                Back to Login
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
