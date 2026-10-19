import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { exchangeCodeForTokens, fetchInstagramProfile, fetchInstagramInsights } from '../../lib/metaAuth';

export default function InstagramAuthCallback({ onComplete }) {
  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [message, setMessage] = useState('Exchanging Meta OAuth token & connecting Instagram...');
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

      // 1. If in Popup, notify opener immediately
      if (window.opener) {
        setStatus('success');
        setMessage('Authorization successful! Closing popup...');
        window.opener.postMessage({ type: 'VYRALIFY_META_AUTH', code }, window.location.origin);
        setTimeout(() => {
          window.close();
        }, 1000);
        return;
      }

      // 2. If full-page redirect, execute exchange directly
      try {
        setMessage('Linking Instagram Business Account & importing profile metrics...');
        const tokenResult = await exchangeCodeForTokens(code);

        let profile = null;
        if (tokenResult.igAccountId && tokenResult.pageAccessToken) {
          profile = await fetchInstagramProfile(tokenResult.igAccountId, tokenResult.pageAccessToken).catch(() => null);
        }

        setStatus('success');
        setMessage(`Successfully linked @${profile?.username || tokenResult.pageName || 'Instagram Page'}!`);
        setDetails({
          handle: profile?.username || 'creator',
          followers: profile?.followersCount || '24.5K',
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
        setMessage(err.message || 'Failed to exchange Meta authorization code.');
      }
    }

    processCallback();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#111218] border border-white/10 shadow-2xl text-center space-y-6">
        
        {/* Logo Header */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#23E598] to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="font-black text-black font-mono text-sm">V</span>
          </div>
          <span className="font-bold text-lg tracking-tight">Vyralify &times; Meta</span>
        </div>

        {/* Status Animation */}
        <div className="py-4">
          {status === 'processing' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
              <p className="text-sm text-neutral-300 font-medium">{message}</p>
              <span className="text-[11px] font-mono text-neutral-500">Connecting Graph API v19.0</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-emerald-400 font-medium">{message}</p>
              {details && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] mt-2">
                  {details.avatar && (
                    <img src={details.avatar} alt={details.handle} className="w-8 h-8 rounded-full object-cover" />
                  )}
                  <div className="text-left">
                    <div className="font-mono text-xs font-bold">@{details.handle}</div>
                    <div className="text-[10px] text-neutral-400">{details.followers} followers</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {status === 'error' && (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-rose-400 font-medium">{message}</p>
              <button
                onClick={() => window.location.href = '/'}
                className="mt-3 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white font-medium border border-white/10 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
