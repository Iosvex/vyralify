/**
 * Vyralify Meta / Instagram Graph API Service
 * Implements the 5-Phase Meta Integration Blueprint:
 * 1. OAuth Scopes & Trigger Handshake
 * 2. Token Exchange (Code -> Long-Lived Page Access Token)
 * 3. Linked IG Business Account Discovery
 * 4. Dynamic Profile & Analytics Data Fetch
 * 5. DM & Comment Automation (Graph API Messaging)
 */

const META_APP_ID = import.meta.env.VITE_META_APP_ID || '2269459297171981';
const META_APP_SECRET = import.meta.env.VITE_META_APP_SECRET || '234e80539dd2d9c45f144a632af4b67d';
const API_URL = import.meta.env.VITE_API_URL || 'https://us-central1-vyralifyin1.cloudfunctions.net/api';

export const REQUIRED_SCOPES = [
  'instagram_basic',
  'instagram_manage_insights',
  'instagram_manage_messages',
  'pages_show_list',
  'pages_read_engagement',
  'pages_manage_metadata'
];

/**
 * Get dynamic redirect URI based on current window origin
 */
export function getRedirectUri() {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback/instagram`;
  }
  return 'http://localhost:3000/auth/callback/instagram';
}

/**
 * Phase 2: Generate official Meta OAuth dialog URL for Instagram Creators
 */
export function getInstagramOAuthUrl(state = 'vyralify_oauth_state') {
  const scopeString = REQUIRED_SCOPES.join(',');
  const redirectUri = getRedirectUri();
  return `https://www.facebook.com/v19.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopeString)}&response_type=code&state=${state}`;
}

/**
 * Open Meta OAuth in a popup window with postMessage & polling support
 */
export function openInstagramOAuthPopup({ onCodeReceived, onTokenReceived, onError }) {
  const redirectUri = getRedirectUri();
  const url = getInstagramOAuthUrl();
  const width = 600;
  const height = 720;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const popup = window.open(
    url,
    'Instagram Meta OAuth',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
  );

  // 1. Listen for postMessage from /auth/callback/instagram
  const handleMessage = (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === 'VYRALIFY_META_AUTH') {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
      if (popup && !popup.closed) popup.close();

      if (event.data.code && onCodeReceived) {
        onCodeReceived(event.data.code);
      } else if (event.data.accessToken && onTokenReceived) {
        onTokenReceived(event.data.accessToken);
      } else if (event.data.error && onError) {
        onError(event.data.error);
      }
    }
  };
  window.addEventListener('message', handleMessage);

  // 2. Fallback polling for redirect URL in popup
  const interval = setInterval(() => {
    try {
      if (!popup || popup.closed) {
        clearInterval(interval);
        window.removeEventListener('message', handleMessage);
        return;
      }

      if (popup.location.href.includes('/auth/callback')) {
        const urlParams = new URLSearchParams(popup.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error_description') || urlParams.get('error');

        popup.close();
        clearInterval(interval);
        window.removeEventListener('message', handleMessage);

        if (code && onCodeReceived) {
          onCodeReceived(code);
        } else if (error && onError) {
          onError(error);
        }
      }
    } catch (e) {
      // Cross-origin access while on facebook.com domain is expected until redirect
    }
  }, 500);

  return popup;
}

/**
 * Phase 3: Token Exchange
 * Converts OAuth code to Long-Lived Token & fetches target Facebook Page and IG Account
 */
export async function exchangeCodeForTokens(code, redirectUri = getRedirectUri()) {
  // First attempt via Backend / Serverless API
  try {
    const res = await fetch('/api/auth/exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, redirectUri })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch (err) {
    console.warn('Backend exchange route unavailable, trying direct Meta Graph fallback:', err);
  }

  // Fallback: Direct Meta Graph API Token Exchange
  const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&client_secret=${META_APP_SECRET}&code=${code}`;

  const tokenRes = await fetch(tokenUrl);
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    throw new Error(tokenData.error.message || 'Meta token exchange failed.');
  }

  const userAccessToken = tokenData.access_token;

  // Retrieve User Accounts / Pages
  const accountsRes = await fetch(
    `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${userAccessToken}`
  );
  const accountsData = await accountsRes.json();

  if (accountsData.error) {
    throw new Error(accountsData.error.message || 'Failed to fetch linked Facebook Pages.');
  }

  const pages = accountsData.data || [];
  const targetPage = pages.find(p => p.instagram_business_account?.id) || pages[0];

  if (!targetPage) {
    throw new Error('No Facebook Page found with a linked Instagram Business or Creator account.');
  }

  const igAccountId = targetPage.instagram_business_account?.id;
  const pageAccessToken = targetPage.access_token;

  return {
    success: true,
    userAccessToken,
    pageAccessToken,
    pageId: targetPage.id,
    pageName: targetPage.name,
    igAccountId
  };
}

/**
 * Phase 4: Fetch Dynamic Profile Data
 * Name, Username, Profile Picture URL, Followers Count, Media Count, Biography
 */
export async function fetchInstagramProfile(igAccountId, accessToken) {
  const fields = 'name,username,profile_picture_url,followers_count,media_count,biography';
  const url = `https://graph.facebook.com/v19.0/${igAccountId}?fields=${fields}&access_token=${accessToken}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || 'Could not fetch Instagram profile.');
  }

  return {
    name: data.name,
    username: data.username,
    profilePictureUrl: data.profile_picture_url,
    followersCount: data.followers_count || 0,
    mediaCount: data.media_count || 0,
    biography: data.biography || ''
  };
}

/**
 * Phase 4b: Fetch Account Insights (Reach, Impressions, Profile Views)
 */
export async function fetchInstagramInsights(igAccountId, accessToken) {
  const metrics = 'impressions,reach,profile_views';
  const url = `https://graph.facebook.com/v19.0/${igAccountId}/insights?metric=${metrics}&period=day&access_token=${accessToken}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      console.warn('Insights query notice:', data.error.message);
      return null;
    }
    return data.data || [];
  } catch (e) {
    console.warn('Failed to query Instagram insights:', e);
    return null;
  }
}

/**
 * Phase 5: DM & Comment Automation (Auto-Reply Engine)
 * Sends instant DM reply to user via Meta Graph Messaging API
 */
export async function sendInstagramDMReply({ recipientId, text, pageAccessToken }) {
  if (!recipientId || !text || !pageAccessToken) {
    throw new Error('Missing recipientId, text, or pageAccessToken.');
  }

  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${pageAccessToken}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text }
    })
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.message || 'Failed to dispatch Instagram DM.');
  }
  return data;
}
