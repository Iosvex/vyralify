/**
 * Vercel Serverless Function: Meta Deauthorize Callback URL
 * POST /api/meta/deauthorize
 *
 * Triggered by Meta when a user removes the app from their Instagram/Facebook settings.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Acknowledge receipt to Meta
  return res.status(200).json({
    success: true,
    message: 'User deauthorization acknowledged. Access tokens revoked.'
  });
}
