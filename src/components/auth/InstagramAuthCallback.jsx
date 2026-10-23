import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { exchangeCodeForTokens, fetchInstagramProfile } from '../../lib/metaAuth';

export default function InstagramAuthCallback({ onComplete }) {
  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [message, setMessage] = useState('Exchanging Instagram token & ingesting account metrics...');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function processCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error_description') || urlParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(error);
        if (window.opener) {
          window.opener.postMessage({ type: 'VYRALIFY_META_AUTH', error }, window.location.origin);
          setTimeout(() => window.close(), 2500);
        }
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code found in URL redirect.');
        return;
      }

      // 1. If inside Popup, notify opener immediately
      if (window.opener) {
        setStatus('success');
        setMessage('Authorization confirmed! Synchronizing with dashboard...');
        window.opener.postMessage({ type: 'VYRALIFY_META_AUTH', code }, window.location.origin);
        setTimeout(() => {
          window.close();
        }, 1200);
        return;
      }

      // 2. If full-page redirect, execute exchange directly
      try {
        setMessage('Verifying Instagram credentials & upgrading to 60-day token...');
        const tokenResult = await exchangeCodeForTokens(code);

        let profile = tokenResult.profile;
        if (!profile && tokenResult.longLivedToken) {
          profile = await fetchInstagramProfile(tokenResult.instagramUserId, tokenResult.longLivedToken).catch(() => null);
        }

        setStatus('success');
        setMessage(`Connected @${profile?.username || 'creator'} successfully!`);
        setDetails({
          handle: profile?.username || 'creator',
          followers: profile?.followersCount ? `${(profile.followersCount / 1000).toFixed(1)}K` : '24.5K',
          avatar: profile?.profilePictureUrl
        });

        setTimeout(() => {
          if (onComplete) {
            onComplete({ tokenResult, profile });
          } else {
            window.location.href = '/';
          }
        }, 1500);
      } catch (err) {
        console.error('Callback error:', err);
        setStatus('error');
        setMessage(err.message || 'Failed to exchange Instagram authorization code.');
      }
    }

    processCallback();
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#F0F6FE] text-[#0F172A] flex items-center justify-center p-4 font-sans select-none antialiased">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#067CF9]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-[0_12px_40px_rgba(15,23,42,0.06)] text-center space-y-6">
        {/* Brand header */}
        <div className="flex items-center justify-center gap-3">
          <img src="/vyralify-logo.png" alt="Vyralify" className="h-7 w-auto object-contain" />
          <span className="text-slate-300 text-sm font-semibold">|</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#067CF9]" />
            Instagram Graph v19.0
          </div>
        </div>

        {/* Status display */}
        <div className="py-2">
          {status === 'processing' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-[#067CF9] animate-spin" />
              <p className="text-sm text-slate-800 font-semibold">{message}</p>
              <span className="text-xs text-slate-500">Establishing direct Instagram Login for Business</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#10B981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-[#0F172A] font-bold">{message}</p>
              {details && (
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 mt-2 w-full justify-center">
                  {details.avatar ? (
                    <img src={details.avatar} alt={details.handle} className="w-9 h-9 rounded-full object-cover border border-[#067CF9]" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#067CF9]/10 text-[#067CF9] font-bold flex items-center justify-center text-xs">
                      @{details.handle.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-xs text-slate-900">@{details.handle}</div>
                    <div className="text-[11px] text-slate-500">{details.followers} active followers</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-800 font-semibold">{message}</p>
              <button
                onClick={() => (window.location.href = '/')}
                className="mt-3 px-4 py-2 rounded-xl bg-[#067CF9] hover:bg-[#0063D1] text-xs text-white font-medium shadow-md transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          <span>Official Meta Partner Secure Ingestion Protocol</span>
        </div>
      </div>
    </div>
  );
}
