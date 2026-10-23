/**
 * Vercel Serverless Function: Native Instagram OAuth Callback Redirect Endpoint
 * Location: /api/v1/auth/instagram/callback
 * Handles GET callback from Instagram authorize dialog, returns code/state to client via HTML postMessage or JSON
 */

export default async function handler(req, res) {
  const { code, state, error, error_reason, error_description } = req.query || {};

  // If request is made by browser navigation/redirect
  if (req.method === 'GET') {
    if (error || error_description) {
      const errText = error_description || error_reason || error || 'Instagram OAuth canceled';
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Instagram Auth Failed</title></head>
          <body style="font-family:sans-serif;text-align:center;padding:40px;background:#FFFFFF;color:#0F172A;">
            <h3 style="color:#EF4444;">Instagram Authorization Error</h3>
            <p>${errText}</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'VYRALIFY_META_AUTH', error: "${errText}" }, '*');
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </body>
        </html>
      `);
    }

    if (code) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Instagram Auth Connecting...</title></head>
          <body style="font-family:sans-serif;text-align:center;padding:40px;background:#FFFFFF;color:#0F172A;">
            <div style="max-width:320px;margin:40px auto;padding:24px;border:1px solid #E2E8F0;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
              <div style="width:40px;height:40px;border-radius:50%;background:#067CF9;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;">✓</div>
              <h3 style="margin:0 0 8px 0;font-size:16px;">Instagram Connected</h3>
              <p style="font-size:13px;color:#64748B;margin:0;">Finalizing account ingestion...</p>
            </div>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'VYRALIFY_META_AUTH', code: "${code}", state: "${state || ''}" }, '*');
                setTimeout(() => window.close(), 1000);
              } else {
                window.location.href = '/auth/callback/instagram?code=${code}&state=${state || ''}';
              }
            </script>
          </body>
        </html>
      `);
    }
  }

  // Handle direct API POST forward to exchange engine
  if (req.method === 'POST') {
    return res.status(307).redirect(307, '/api/auth/exchange');
  }

  return res.status(400).json({ error: 'Missing code in Instagram callback' });
}
