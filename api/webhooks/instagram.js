/**
 * Vercel Serverless Function: Meta / Instagram Webhook Handler
 * Phase 5: Webhook Challenge Verification (GET) & DM/Comment Auto-Reply Engine (POST)
 */

export default async function handler(req, res) {
  const VERIFY_TOKEN = process.env.VITE_META_WEBHOOK_VERIFY_TOKEN || process.env.META_WEBHOOK_VERIFY_TOKEN || 'vyralify_meta_verify_2026';

  // 1. Webhook Verification (Meta Challenge)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Meta Webhook verified successfully!');
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden: Token mismatch');
  }

  // 2. Incoming Event Listener (Auto-Reply Engine)
  if (req.method === 'POST') {
    const body = req.body;

    // Verify it is a Page or Instagram subscription
    if (body.object === 'page' || body.object === 'instagram') {
      const entry = body.entry?.[0];
      const messagingEvent = entry?.messaging?.[0];

      if (messagingEvent && messagingEvent.message && !messagingEvent.message.is_echo) {
        const senderId = messagingEvent.sender?.id;
        const textReceived = messagingEvent.message?.text?.toLowerCase() || '';

        console.log(`Received message from ${senderId}: "${textReceived}"`);

        // Trigger keyword matching logic (e.g., 'vyralify', 'link', 'price', 'guide', 'blueprint')
        if (
          textReceived.includes('vyralify') || 
          textReceived.includes('link') || 
          textReceived.includes('price') ||
          textReceived.includes('blueprint') ||
          textReceived.includes('free')
        ) {
          const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || process.env.VITE_PAGE_ACCESS_TOKEN;
          if (PAGE_ACCESS_TOKEN) {
            try {
              await fetch(`https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  recipient: { id: senderId },
                  message: { 
                    text: 'Hey! Here is your exclusive link to scale your page on Instagram: https://vyralify.in 🚀' 
                  }
                })
              });
            } catch (err) {
              console.error('Failed to send auto-reply DM:', err);
            }
          }
        }
      }

      return res.status(200).json({ status: 'EVENT_RECEIVED' });
    }

    return res.status(404).send('Not Found');
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
