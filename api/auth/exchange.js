/**
 * Vercel Serverless Function: Meta OAuth Token Exchange
 * Converts temporary OAuth code to Page Access Token & fetches linked Instagram Account
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, redirectUri } = req.body || {};

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const APP_ID = process.env.VITE_META_APP_ID || process.env.META_APP_ID || '2269459297171981';
  const APP_SECRET = process.env.VITE_META_APP_SECRET || process.env.META_APP_SECRET || '234e80539dd2d9c45f144a632af4b67d';
  const cleanRedirectUri = redirectUri || 'https://vyralify.in/auth/callback/instagram';

  try {
    // 1. Exchange code for Short-Lived User Access Token
    const tokenUrl = `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${APP_ID}&redirect_uri=${encodeURIComponent(
      cleanRedirectUri
    )}&client_secret=${APP_SECRET}&code=${code}`;

    const tokenRes = await fetch(tokenUrl);
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error.message || 'Meta token exchange failed' });
    }

    const userAccessToken = tokenData.access_token;

    // 2. Fetch User's Linked Facebook Pages & Instagram Accounts
    const accountsRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=${userAccessToken}`
    );
    const accountsData = await accountsRes.json();

    if (accountsData.error) {
      return res.status(400).json({ error: accountsData.error.message || 'Failed to fetch accounts' });
    }

    const pages = accountsData.data || [];
    const targetPage = pages.find(p => p.instagram_business_account?.id) || pages[0];

    if (!targetPage) {
      return res.status(404).json({
        error: 'No Facebook Page with linked Instagram Business Account found. Please verify your Facebook Page settings.'
      });
    }

    const igAccountId = targetPage.instagram_business_account?.id;
    const pageAccessToken = targetPage.access_token;

    // 3. Fetch Real Profile Data if IG Account is linked
    let profileData = null;
    let insightsData = null;

    if (igAccountId && pageAccessToken) {
      try {
        const profileRes = await fetch(
          `https://graph.facebook.com/v19.0/${igAccountId}?fields=name,username,profile_picture_url,followers_count,media_count,biography&access_token=${pageAccessToken}`
        );
        profileData = await profileRes.json();

        const insightsRes = await fetch(
          `https://graph.facebook.com/v19.0/${igAccountId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${pageAccessToken}`
        );
        const ins = await insightsRes.json();
        insightsData = ins.data || null;
      } catch (e) {
        console.warn('Profile/insights fetch warning:', e);
      }
    }

    return res.status(200).json({
      success: true,
      userAccessToken,
      pageAccessToken,
      pageId: targetPage.id,
      pageName: targetPage.name,
      igAccountId,
      profile: profileData,
      insights: insightsData
    });
  } catch (error) {
    console.error('Meta exchange endpoint error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error during Meta exchange' });
  }
}
