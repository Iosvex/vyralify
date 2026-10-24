/**
 * Vercel Serverless Function: Reply to an Instagram comment
 * POST /api/meta/reply-comment
 * Body: { commentId, message, accessToken }
 *
 * Uses Media Comments API (requires instagram_business_manage_comments permission)
 * Endpoint: POST https://graph.instagram.com/v19.0/{comment-id}/replies
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { commentId, message, accessToken } = req.body || {};

  if (!commentId || !message || !accessToken) {
    return res.status(400).json({ error: 'Missing: commentId, message, accessToken' });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v19.0/${commentId}/replies`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, access_token: accessToken })
      }
    );
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message, code: data.error.code });
    }

    return res.status(200).json({ success: true, replyId: data.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
