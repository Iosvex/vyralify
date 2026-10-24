/**
 * Vercel Serverless Function: Send Instagram Direct Message
 * POST /api/meta/send-dm
 * Body: { recipientId, message, accessToken, igAccountId? }
 *
 * Uses Meta Messaging API (requires instagram_business_manage_messages permission)
 * Endpoint: POST https://graph.instagram.com/v19.0/me/messages
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { recipientId, message, accessToken, igAccountId } = req.body || {};

  if (!recipientId || !message || !accessToken) {
    return res.status(400).json({
      error: 'Missing required fields: recipientId, message, accessToken'
    });
  }

  // Sanitize message – replace {username} template tokens server-side
  const sanitizedMessage = message.replace(/\{username\}/g, '');

  try {
    // Meta Messaging API endpoint
    const endpoint = igAccountId
      ? `https://graph.instagram.com/v19.0/${igAccountId}/messages`
      : `https://graph.instagram.com/v19.0/me/messages`;

    const response = await fetch(`${endpoint}?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: sanitizedMessage }
      })
    });

    const data = await response.json();

    if (data.error) {
      console.error('[send-dm] Meta API error:', data.error);
      return res.status(400).json({
        error: data.error.message || 'Meta API error',
        code: data.error.code,
        type: data.error.type
      });
    }

    return res.status(200).json({
      success: true,
      messageId: data.message_id,
      recipientId: data.recipient_id
    });
  } catch (err) {
    console.error('[send-dm] Unexpected error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
