/**
 * Vyralify Meta & Instagram Graph API Service
 *
 * Uses the OFFICIAL Instagram Login for Business (Native Instagram OAuth)
 * App ID: 2568931813529253
 * Redirect URI: https://vyralify.in/auth/callback/instagram
 *
 * Scopes:
 *   instagram_business_basic
 *   instagram_business_manage_messages
 *   instagram_business_manage_comments
 *   instagram_business_content_publish
 *   instagram_business_manage_insights
 */

// ── App Credentials ─────────────────────────────────────────────────────────
const INSTAGRAM_APP_ID =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INSTAGRAM_APP_ID) ||
  '2568931813529253';

const INSTAGRAM_APP_SECRET =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_INSTAGRAM_APP_SECRET) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_META_APP_SECRET) ||
  '';

// Fixed production redirect URI (must match exactly what's registered in Meta App settings)
const PRODUCTION_REDIRECT_URI = 'https://vyralify.in/auth/callback/instagram';

// ── Required OAuth Scopes ────────────────────────────────────────────────────
export const REQUIRED_SCOPES = [
  'instagram_business_basic',
  'instagram_business_manage_messages',
  'instagram_business_manage_comments',
  'instagram_business_content_publish',
  'instagram_business_manage_insights'
];

// ── Redirect URI ─────────────────────────────────────────────────────────────
/**
 * Returns the correct redirect URI.
 * On production (vyralify.in): fixed URI that matches what's registered in Meta.
 * On dev: local callback for testing (requires adding localhost to Meta app settings).
 */
export function getRedirectUri() {
  if (typeof window !== 'undefined') {
    const isProduction = window.location.hostname === 'vyralify.in' ||
      window.location.hostname === 'www.vyralify.in';
    if (isProduction) return PRODUCTION_REDIRECT_URI;
    // Dev: use same path but with current origin
    return `${window.location.origin}/auth/callback/instagram`;
  }
  return PRODUCTION_REDIRECT_URI;
}

// ── OAuth URL Generator ───────────────────────────────────────────────────────
/**
 * Generates the official Instagram Login for Business OAuth URL.
 * Uses https://www.instagram.com/oauth/authorize (native Instagram, not Facebook dialog)
 */
export function getInstagramOAuthUrl(state = 'vyralify_oauth_state') {
  const redirectUri = getRedirectUri();
  const scopeString = REQUIRED_SCOPES.join(',');
  // Exact URL format as provided by Meta Partner:
  return `https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopeString)}&state=${state}`;
}

// ── OAuth Popup Handler ───────────────────────────────────────────────────────
/**
 * Open the Instagram OAuth dialog in a popup.
 * Handles postMessage from InstagramAuthCallback and URL polling.
 */
export function openInstagramOAuthPopup({ onCodeReceived, onTokenReceived, onError }) {
  const url = getInstagramOAuthUrl();
  const width = 580;
  const height = 740;
  const left = Math.round(window.screen.width / 2 - width / 2);
  const top = Math.round(window.screen.height / 2 - height / 2);

  const popup = window.open(
    url,
    'InstagramBusinessLogin',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );

  if (!popup) {
    if (onError) onError('Popup blocked. Please allow popups for this site.');
    return null;
  }

  // 1. Listen for postMessage from callback page
  const handleMessage = (event) => {
    // Accept messages from any origin matching vyralify.in or current origin
    const isAllowedOrigin =
      event.origin === window.location.origin ||
      event.origin === 'https://vyralify.in' ||
      event.origin === 'https://www.vyralify.in';
    if (!isAllowedOrigin) return;

    if (event.data?.type === 'VYRALIFY_META_AUTH') {
      window.removeEventListener('message', handleMessage);
      clearInterval(pollInterval);
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

  // 2. Poll the popup URL for the authorization code (fallback)
  const pollInterval = setInterval(() => {
    try {
      if (!popup || popup.closed) {
        clearInterval(pollInterval);
        window.removeEventListener('message', handleMessage);
        return;
      }

      const href = popup.location.href;
      if (
        href.includes('/auth/callback') ||
        href.includes('code=') ||
        href.includes('error=')
      ) {
        const urlParams = new URLSearchParams(popup.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error_description') || urlParams.get('error');

        popup.close();
        clearInterval(pollInterval);
        window.removeEventListener('message', handleMessage);

        if (code && onCodeReceived) {
          onCodeReceived(code);
        } else if (error && onError) {
          onError(error);
        }
      }
    } catch (e) {
      // Cross-origin access is expected while on instagram.com — ignore silently
    }
  }, 600);

  return popup;
}

// ── Token Exchange ────────────────────────────────────────────────────────────
/**
 * Exchange authorization code for long-lived token.
 * Tries the Vercel serverless endpoint first, then falls back to direct exchange.
 */
export async function exchangeCodeForTokens(code, redirectUri = getRedirectUri()) {
  // Try the backend token exchange API (Vercel serverless or Cloud Function)
  const apiEndpoints = [
    '/api/auth/exchange',
    `${(typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''}/auth/instagram/exchange`
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, redirectUri })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success || data.longLivedToken || data.access_token) {
          return {
            success: true,
            userAccessToken: data.longLivedToken || data.access_token,
            longLivedToken: data.longLivedToken || data.access_token,
            instagramUserId: data.instagramUserId || data.user_id || null,
            igAccountId: data.instagramUserId || data.user_id || null,
            pageAccessToken: data.longLivedToken || data.access_token,
            expiresIn: data.expiresIn || 5184000,
            profile: data.profile || null,
            reels: data.reels || [],
            insights: data.insights || null,
            activeHours: data.activeHours || null,
            noInstagramLinked: data.noInstagramLinked || false
          };
        }
      }
    } catch (err) {
      console.warn(`Backend exchange attempt failed (${endpoint}):`, err.message);
    }
  }

  // Direct client-side exchange (Instagram native token)
  const formData = new URLSearchParams();
  formData.append('client_id', INSTAGRAM_APP_ID);
  formData.append('client_secret', INSTAGRAM_APP_SECRET);
  formData.append('grant_type', 'authorization_code');
  formData.append('redirect_uri', redirectUri);
  formData.append('code', code);

  let shortLivedToken = null;
  let igUserId = null;

  try {
    const shortRes = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });
    const shortData = await shortRes.json();
    if (shortData.access_token) {
      shortLivedToken = shortData.access_token;
      igUserId = shortData.user_id ? shortData.user_id.toString() : null;
    } else if (shortData.error) {
      console.warn('Instagram token exchange error:', shortData.error);
    }
  } catch (e) {
    console.warn('Direct Instagram token exchange error:', e);
  }

  if (!shortLivedToken) {
    throw new Error('Instagram token exchange failed. Please ensure the redirect URI is correctly registered in the Instagram App settings.');
  }

  // Upgrade to 60-day Long-Lived Token
  let longLivedToken = shortLivedToken;
  try {
    const upgradeRes = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${encodeURIComponent(INSTAGRAM_APP_SECRET)}&access_token=${encodeURIComponent(shortLivedToken)}`
    );
    const upgradeData = await upgradeRes.json();
    if (upgradeData.access_token) {
      longLivedToken = upgradeData.access_token;
    }
  } catch (e) {
    console.warn('Token upgrade warning (using short-lived):', e);
  }

  return {
    success: true,
    userAccessToken: longLivedToken,
    longLivedToken,
    instagramUserId: igUserId,
    igAccountId: igUserId,
    pageAccessToken: longLivedToken,
    expiresIn: 5184000,
    profile: null,
    reels: [],
    insights: null,
    activeHours: null
  };
}

// ── Profile Fetching ─────────────────────────────────────────────────────────
/**
 * Fetch Instagram Business Profile Node
 * GET https://graph.instagram.com/v19.0/me?fields=...
 */
export async function fetchInstagramProfile(igAccountId, accessToken) {
  if (!accessToken) throw new Error('Missing access token for Instagram profile query.');

  const fields = 'id,username,name,profile_picture_url,followers_count,follows_count,media_count,biography,website';

  const endpoints = [
    `https://graph.instagram.com/v19.0/me?fields=${fields}&access_token=${accessToken}`,
    igAccountId
      ? `https://graph.facebook.com/v19.0/${igAccountId}?fields=${fields}&access_token=${accessToken}`
      : null
  ].filter(Boolean);

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && !data.error && (data.username || data.id)) {
        return {
          id: data.id || igAccountId,
          username: data.username || '',
          name: data.name || data.username || 'Creator',
          profilePictureUrl: data.profile_picture_url || null,
          followersCount: data.followers_count || 0,
          followsCount: data.follows_count || 0,
          mediaCount: data.media_count || 0,
          biography: data.biography || '',
          website: data.website || ''
        };
      }
    } catch (e) {
      console.warn('Profile endpoint attempt failed:', e.message);
    }
  }
  return null;
}

// ── Media / Reels ─────────────────────────────────────────────────────────────
/**
 * Fetch Instagram media (reels, posts) with engagement metrics
 */
export async function fetchInstagramMedia(igAccountId, accessToken, limit = 20) {
  if (!accessToken) return [];

  const fields =
    'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,insights.metric(plays,reach,saved,shares,total_interactions)';

  try {
    const url = `https://graph.instagram.com/v19.0/me/media?fields=${encodeURIComponent(fields)}&limit=${limit}&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.data && Array.isArray(data.data)) {
      return data.data.map((item) => {
        const metrics = item.insights?.data || [];
        const plays = metrics.find((m) => m.name === 'plays')?.values?.[0]?.value || 0;
        const reach = metrics.find((m) => m.name === 'reach')?.values?.[0]?.value || 0;
        const saved = metrics.find((m) => m.name === 'saved')?.values?.[0]?.value || 0;
        const shares = metrics.find((m) => m.name === 'shares')?.values?.[0]?.value || 0;

        return {
          id: item.id,
          caption: item.caption || '',
          mediaType: item.media_type,
          mediaUrl: item.media_url || item.thumbnail_url || '',
          thumbnail: item.thumbnail_url || item.media_url || '',
          permalink: item.permalink,
          publishedAt: item.timestamp,
          plays,
          reach,
          likes: item.like_count || 0,
          comments: item.comments_count || 0,
          saved,
          shares
        };
      });
    }
  } catch (e) {
    console.warn('Media fetch failed:', e.message);
  }
  return [];
}

// ── Comments ─────────────────────────────────────────────────────────────────
/**
 * Fetch comments for a specific media post
 */
export async function fetchMediaComments(mediaId, accessToken) {
  if (!accessToken || !mediaId) return [];
  try {
    const url = `https://graph.instagram.com/v19.0/${mediaId}/comments?fields=id,text,username,timestamp&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data || [];
  } catch (e) {
    console.warn('Comments fetch failed:', e.message);
    return [];
  }
}

/**
 * Reply to a comment publicly
 */
export async function replyToComment(commentId, message, accessToken) {
  if (!accessToken || !commentId) throw new Error('Missing commentId or accessToken');
  const res = await fetch(
    `https://graph.instagram.com/v19.0/${commentId}/replies`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, access_token: accessToken })
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'Failed to reply to comment');
  return data;
}

// ── Direct Messages ───────────────────────────────────────────────────────────
/**
 * Send a Direct Message to a user via Instagram Messaging API
 * Requires: instagram_business_manage_messages permission
 * recipientId: User's PSID (Page-Scoped ID) from webhook event
 */
export async function sendInstagramDM(recipientId, messageText, accessToken) {
  if (!accessToken || !recipientId) throw new Error('Missing recipientId or accessToken');

  // Try via backend proxy first (avoids CORS)
  try {
    const res = await fetch('/api/meta/send-dm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipientId, message: messageText, accessToken })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) return data;
    }
  } catch (e) {
    console.warn('Backend DM proxy unavailable, trying direct:', e.message);
  }

  // Direct Meta Messaging API call
  const res = await fetch(
    `https://graph.instagram.com/v19.0/me/messages?access_token=${accessToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: messageText }
      })
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || 'Failed to send DM');
  return { success: true, messageId: data.message_id, recipientId: data.recipient_id };
}

// ── Insights ──────────────────────────────────────────────────────────────────
/**
 * Fetch account-level insights (reach, impressions, follower growth)
 */
export async function fetchInstagramInsights(igAccountId, accessToken) {
  if (!accessToken || !igAccountId) return null;
  try {
    const url = `https://graph.instagram.com/v19.0/${igAccountId}/insights?metric=reach,impressions,follower_count&period=day&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.data) return data.data;
  } catch (e) {
    console.warn('Insights fetch failed:', e.message);
  }
  return null;
}

/**
 * Fetch follower demographics and online hours
 */
export async function fetchInstagramDemographics(igAccountId, accessToken) {
  if (!accessToken || !igAccountId) return null;
  try {
    const url = `https://graph.instagram.com/v19.0/${igAccountId}/insights?metric=follower_demographics,online_followers&period=lifetime&metric_type=time_series&access_token=${accessToken}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.data) return { rawInsights: data.data };
  } catch (e) {
    console.warn('Demographics fetch failed:', e.message);
  }
  return null;
}

// ── Content Publishing ────────────────────────────────────────────────────────
/**
 * Publish a media container (image/reel) to Instagram
 * Step 1: Create container
 * Step 2: Publish container
 * Requires: instagram_business_content_publish permission
 */
export async function publishInstagramMedia({ imageUrl, videoUrl, caption, accessToken }) {
  if (!accessToken) throw new Error('Missing access token for content publishing.');

  // Step 1: Create media container
  const containerBody = {
    caption,
    access_token: accessToken
  };
  if (videoUrl) {
    containerBody.media_type = 'REELS';
    containerBody.video_url = videoUrl;
  } else if (imageUrl) {
    containerBody.image_url = imageUrl;
  }

  const containerRes = await fetch('https://graph.instagram.com/v19.0/me/media', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(containerBody)
  });
  const containerData = await containerRes.json();
  if (containerData.error) throw new Error(containerData.error.message || 'Failed to create media container');

  const containerId = containerData.id;

  // Wait for container to be ready
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Step 2: Publish the container
  const publishRes = await fetch('https://graph.instagram.com/v19.0/me/media_publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: containerId, access_token: accessToken })
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(publishData.error.message || 'Failed to publish media');

  return { success: true, mediaId: publishData.id };
}

// ── Export App Constants ───────────────────────────────────────────────────────
export { INSTAGRAM_APP_ID };
