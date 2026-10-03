/**
 * Vyralify Meta / Instagram Graph API OAuth Service
 * Configured with App ID: 2269459297171981
 */

const META_APP_ID = import.meta.env.VITE_META_APP_ID || '2269459297171981';
const REDIRECT_URI = typeof window !== 'undefined' 
  ? `${window.location.origin}/auth/callback/instagram`
  : 'http://localhost:3000/auth/callback/instagram';

const REQUIRED_SCOPES = [
  'instagram_basic',
  'pages_show_list',
  'pages_read_engagement',
  'instagram_manage_comments',
  'instagram_manage_messages'
];

/**
 * Generate official Meta OAuth dialog URL for Instagram Creators
 */
export function getInstagramOAuthUrl(state = 'vyralify_oauth_state') {
  const scopeString = REQUIRED_SCOPES.join(',');
  return `https://www.facebook.com/v21.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${scopeString}&response_type=code&state=${state}`;
}

/**
 * Open Meta OAuth in a popup window
 */
export function openInstagramOAuthPopup({ onCodeReceived, onError }) {
  const url = getInstagramOAuthUrl();
  const width = 600;
  const height = 700;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;

  const popup = window.open(
    url,
    'Instagram OAuth',
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
  );

  // Poll popup url for authorization code
  const interval = setInterval(() => {
    try {
      if (!popup || popup.closed) {
        clearInterval(interval);
        return;
      }

      if (popup.location.href.includes(REDIRECT_URI)) {
        const urlParams = new URLSearchParams(popup.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error_description') || urlParams.get('error');

        popup.close();
        clearInterval(interval);

        if (code) {
          onCodeReceived(code);
        } else if (error) {
          onError(error);
        }
      }
    } catch (e) {
      // Cross-origin access while on facebook.com domain is expected until redirect
    }
  }, 500);

  return popup;
}
