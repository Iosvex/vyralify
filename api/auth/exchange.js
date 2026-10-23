/**
 * Vercel Serverless Function: Native Instagram Login & Meta Graph API v19.0+ Token Exchange
 * Implements Section 2 of Vyralify Master Engineering Specification:
 * - Step 1: Receives authorization code from native Instagram OAuth
 * - Step 2: Exchanges code for short-lived token via https://api.instagram.com/oauth/access_token
 * - Step 3: Upgrades to 60-day long-lived access token via https://graph.instagram.com/access_token
 * - Step 4: Ingests Profile Node (/me), Reels Performance (/me/media), and Audience Online Followers Insights
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, redirectUri } = req.body || {};

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID || process.env.VITE_META_APP_ID || process.env.META_APP_ID || '2269459297171981';
  const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET || process.env.VITE_META_APP_SECRET || process.env.META_APP_SECRET || '234e80539dd2d9c45f144a632af4b67d';
  const cleanRedirectUri = redirectUri || 'https://api.vyralify.com/api/v1/auth/instagram/callback';

  try {
    let longLivedToken = null;
    let instagramUserId = null;
    let expiresIn = 5184000; // 60 days default
    let exchangeType = 'native_instagram';

    // -------------------------------------------------------------
    // ATTEMPT 1: Native Instagram Graph API Token Exchange (Blueprint Section 2.3)
    // -------------------------------------------------------------
    try {
      const formData = new URLSearchParams();
      formData.append('client_id', INSTAGRAM_APP_ID);
      formData.append('client_secret', INSTAGRAM_APP_SECRET);
      formData.append('grant_type', 'authorization_code');
      formData.append('redirect_uri', cleanRedirectUri);
      formData.append('code', code);

      const shortLivedRes = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      const shortLivedData = await shortLivedRes.json();

      if (shortLivedData.access_token && shortLivedData.user_id) {
        instagramUserId = shortLivedData.user_id.toString();
        const shortToken = shortLivedData.access_token;

        // Upgrade Short-Lived Token to 60-Day Long-Lived Access Token
        const longLivedUrl = `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${encodeURIComponent(
          INSTAGRAM_APP_SECRET
        )}&access_token=${encodeURIComponent(shortToken)}`;

        const longLivedRes = await fetch(longLivedUrl);
        const longLivedData = await longLivedRes.json();

        if (longLivedData.access_token) {
          longLivedToken = longLivedData.access_token;
          expiresIn = longLivedData.expires_in || 5184000;
        } else {
          longLivedToken = shortToken;
        }
      }
    } catch (nativeErr) {
      console.warn('Native Instagram token exchange attempt notice:', nativeErr?.message);
    }

    // -------------------------------------------------------------
    // ATTEMPT 2: Fallback to Meta Graph API Exchange if native was bypassed
    // -------------------------------------------------------------
    if (!longLivedToken) {
      exchangeType = 'facebook_graph_fallback';
      const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${encodeURIComponent(
        cleanRedirectUri
      )}&client_secret=${INSTAGRAM_APP_SECRET}&code=${code}`;

      const tokenRes = await fetch(tokenUrl);
      const tokenData = await tokenRes.json();

      if (tokenData.error) {
        return res.status(400).json({ 
          error: tokenData.error.message || 'Instagram OAuth token exchange failed' 
        });
      }

      const userAccessToken = tokenData.access_token;

      // Upgrade to long lived
      try {
        const fbUpgradeUrl = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${INSTAGRAM_APP_ID}&client_secret=${INSTAGRAM_APP_SECRET}&fb_exchange_token=${userAccessToken}`;
        const upgradeRes = await fetch(fbUpgradeUrl);
        const upgradeData = await upgradeRes.json();
        longLivedToken = upgradeData.access_token || userAccessToken;
      } catch (e) {
        longLivedToken = userAccessToken;
      }

      // Query linked accounts
      const accountsRes = await fetch(
        `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${longLivedToken}`
      );
      const accountsData = await accountsRes.json();
      const targetPage = accountsData.data?.find((p) => p.instagram_business_account?.id) || accountsData.data?.[0];
      if (targetPage?.instagram_business_account?.id) {
        instagramUserId = targetPage.instagram_business_account.id;
      }
    }

    if (!longLivedToken) {
      return res.status(400).json({ error: 'Could not obtain long-lived Instagram access token.' });
    }

    // -------------------------------------------------------------
    // Step 4: Primary Data Fetching Endpoints (Blueprint Section 2.3)
    // -------------------------------------------------------------
    let profileData = null;
    let reelsData = [];
    let insightsData = null;
    let activeHours = null;

    // A. Profile Node Specification
    try {
      const profileUrl = `https://graph.instagram.com/v19.0/me?fields=id,username,name,profile_picture_url,followers_count,follows_count,media_count&access_token=${longLivedToken}`;
      const pRes = await fetch(profileUrl);
      const pJson = await pRes.json();
      if (!pJson.error) {
        profileData = pJson;
        if (!instagramUserId && pJson.id) instagramUserId = pJson.id;
      }
    } catch (e) {
      console.warn('Profile node fetch notice:', e.message);
    }

    // B. Reels Media Performance Node Specification
    try {
      const mediaUrl = `https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count,insights.metric(plays,reach,saved,shares,total_interactions)&access_token=${longLivedToken}`;
      const mRes = await fetch(mediaUrl);
      const mJson = await mRes.json();
      if (mJson.data && Array.isArray(mJson.data)) {
        reelsData = mJson.data.map((item) => {
          const metrics = item.insights?.data || [];
          const plays = metrics.find((m) => m.name === 'plays')?.values?.[0]?.value || 0;
          const reach = metrics.find((m) => m.name === 'reach')?.values?.[0]?.value || 0;
          const saved = metrics.find((m) => m.name === 'saved')?.values?.[0]?.value || 0;
          const shares = metrics.find((m) => m.name === 'shares')?.values?.[0]?.value || 0;
          const likes = item.like_count || 0;
          const comments = item.comments_count || 0;

          // Recalculate virality score (Formula from blueprint Section 3)
          const followerBase = profileData?.followers_count || 10000;
          const viralityRaw = ((plays * 0.4) + (shares * 0.3) + (saved * 0.2) + (comments * 0.1)) / (followerBase / 1000);
          const viralityScore = parseFloat(Math.min(9.9, Math.max(1.2, viralityRaw > 0 ? (Math.log10(viralityRaw + 1) * 3.2).toFixed(1) : 7.4)));

          return {
            id: item.id,
            caption: item.caption || '',
            mediaType: item.media_type,
            mediaUrl: item.media_url || item.thumbnail_url || '',
            permalink: item.permalink,
            publishedAt: item.timestamp,
            playsCount: plays,
            reachCount: reach,
            likesCount: likes,
            commentsCount: comments,
            savesCount: saved,
            sharesCount: shares,
            viralityScore
          };
        });
      }
    } catch (e) {
      console.warn('Reels performance node fetch notice:', e.message);
    }

    // C. Audience Demographics & Online Followers Matrix Node Specification
    if (instagramUserId) {
      try {
        const demographicsUrl = `https://graph.instagram.com/v19.0/${instagramUserId}/insights?metric=follower_demographics,online_followers&period=lifetime&metric_type=time_series&access_token=${longLivedToken}`;
        const dRes = await fetch(demographicsUrl);
        const dJson = await dRes.json();
        if (dJson.data && Array.isArray(dJson.data)) {
          insightsData = dJson.data;
          const onlineItem = dJson.data.find((m) => m.name === 'online_followers');
          if (onlineItem?.values?.[0]?.value) {
            activeHours = onlineItem.values[0].value;
          }
        }
      } catch (e) {
        console.warn('Demographics node fetch notice:', e.message);
      }
    }

    return res.status(200).json({
      success: true,
      exchangeType,
      longLivedToken,
      instagramUserId: instagramUserId || profileData?.id,
      expiresIn,
      tokenExpiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
      profile: profileData,
      reels: reelsData,
      insights: insightsData,
      activeHours
    });
  } catch (error) {
    console.error('Meta/Instagram token exchange error:', error);
    return res.status(500).json({ 
      error: error.message || 'Internal server error during Instagram token exchange' 
    });
  }
}
