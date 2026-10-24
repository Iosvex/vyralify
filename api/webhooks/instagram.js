/**
 * Vercel Serverless Function: Instagram Webhook Handler
 * GET  /api/webhooks/instagram — Meta challenge verification
 * POST /api/webhooks/instagram — Live comment & DM trigger engine
 *
 * Supports:
 *  - Comment keyword triggers → public reply + auto-DM
 *  - Story reply keyword triggers → auto-DM
 *  - Inbound DM keyword triggers → auto-DM response
 *  - Per-account trigger configurations (read from Firestore via REST)
 *  - Human delay (randomized 5-20s) for Meta compliance
 *  - Duplicate DM prevention (in-memory 10-min dedup window)
 */

const VERIFY_TOKEN =
  process.env.VITE_META_WEBHOOK_VERIFY_TOKEN ||
  process.env.META_WEBHOOK_VERIFY_TOKEN ||
  'vyralify_meta_verify_2026';

// In-memory dedup set: "igAccountId_recipientId_keyword" → timestamp
const recentDMs = new Map();
const DEDUP_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isDuplicate(igAccountId, recipientId, keyword) {
  const key = `${igAccountId}_${recipientId}_${keyword}`;
  const last = recentDMs.get(key);
  if (last && Date.now() - last < DEDUP_WINDOW_MS) return true;
  recentDMs.set(key, Date.now());
  // Clean up stale entries
  if (recentDMs.size > 1000) {
    for (const [k, t] of recentDMs.entries()) {
      if (Date.now() - t > DEDUP_WINDOW_MS) recentDMs.delete(k);
    }
  }
  return false;
}

function randomDelay(minMs = 5000, maxMs = 20000) {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs)
  );
}

/**
 * Fetch active triggers from Firestore REST API for a given igAccountId.
 * Falls back to env-configured triggers if Firestore is unavailable.
 */
async function getTriggersForAccount(igAccountId) {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'vyralifyin1';
  const firestoreKey = process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;

  if (firestoreKey) {
    try {
      const collectionUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/instagramTriggers/${igAccountId}/triggers?key=${firestoreKey}`;
      const res = await fetch(collectionUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.documents && Array.isArray(data.documents)) {
          return data.documents
            .map((doc) => {
              const f = doc.fields || {};
              return {
                id: doc.name.split('/').pop(),
                keyword: f.keyword?.stringValue?.toUpperCase() || '',
                type: f.type?.stringValue || 'comment',
                status: f.status?.stringValue || 'paused',
                publicReplies: f.publicReplies?.arrayValue?.values?.map((v) => v.stringValue) || [],
                dmMessage: f.dmMessage?.stringValue || '',
                delaySeconds: parseInt(f.delaySeconds?.integerValue || f.delaySeconds?.doubleValue || '10', 10),
                accessToken: f.accessToken?.stringValue || null
              };
            })
            .filter((t) => t.status === 'active' && t.keyword && t.dmMessage);
        }
      }
    } catch (err) {
      console.warn('[webhook] Firestore trigger fetch failed:', err.message);
    }
  }

  // Env-var fallback (for simple deployments)
  const envToken = process.env.PAGE_ACCESS_TOKEN || process.env.INSTAGRAM_PAGE_TOKEN;
  const envKeyword = process.env.TRIGGER_KEYWORD_1 || 'LINK';
  const envDm = process.env.TRIGGER_DM_1 || 'Hey! Here is your exclusive link: https://vyralify.in 🚀';
  if (envToken) {
    return [
      { id: 'env_1', keyword: envKeyword.toUpperCase(), type: 'comment', status: 'active', publicReplies: [], dmMessage: envDm, delaySeconds: 10, accessToken: envToken }
    ];
  }

  return [];
}

/**
 * Fetch access token for a specific IG account from Firestore
 */
async function getAccountToken(igAccountId) {
  const projectId = process.env.FIREBASE_PROJECT_ID || 'vyralifyin1';
  const firestoreKey = process.env.FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY;

  if (firestoreKey) {
    try {
      const docUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/instagramPages/${igAccountId}?key=${firestoreKey}`;
      const res = await fetch(docUrl);
      if (res.ok) {
        const data = await res.json();
        return data.fields?.accessToken?.stringValue || null;
      }
    } catch (err) {
      console.warn('[webhook] Token fetch failed:', err.message);
    }
  }
  return process.env.PAGE_ACCESS_TOKEN || null;
}

async function sendDM(recipientId, message, accessToken) {
  const endpoint = `https://graph.instagram.com/v19.0/me/messages?access_token=${encodeURIComponent(accessToken)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: message }
    })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

async function replyToComment(commentId, message, accessToken) {
  const response = await fetch(`https://graph.instagram.com/v19.0/${commentId}/replies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, access_token: accessToken })
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data;
}

function personalizeMessage(template, username) {
  return template
    .replace(/\{username\}/g, username || 'there')
    .replace(/\{name\}/g, username || 'there');
}

export default async function handler(req, res) {
  // ── 1. GET: Meta Webhook Verification ──────────────────────────────────────
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('[webhook] Meta webhook verified successfully');
      return res.status(200).send(challenge);
    }
    console.warn('[webhook] Verification failed — token mismatch');
    return res.status(403).send('Forbidden: Token mismatch');
  }

  // ── 2. POST: Live Event Processing ─────────────────────────────────────────
  if (req.method === 'POST') {
    const body = req.body;
    console.log('[webhook] Received event object:', body?.object, 'entries:', body?.entry?.length);

    if (body.object !== 'instagram' && body.object !== 'page') {
      return res.status(200).json({ status: 'IGNORED', reason: 'Not instagram/page object' });
    }

    const entries = body.entry || [];

    for (const entry of entries) {
      const igAccountId = entry.id;

      // ── A. Comment Trigger ────────────────────────────────────────────────
      const changes = entry.changes || [];
      for (const change of changes) {
        if (change.field === 'comments') {
          const val = change.value || {};
          const commentText = (val.text || '').toUpperCase().trim();
          const commenterId = val.from?.id;
          const commenterUsername = val.from?.username || '';
          const commentId = val.id;
          const mediaId = val.media?.id;

          if (!commentText || !commenterId || !commentId) continue;

          try {
            const triggers = await getTriggersForAccount(igAccountId);
            const accessToken = await getAccountToken(igAccountId);
            if (!accessToken) continue;

            for (const trigger of triggers) {
              if (trigger.type !== 'comment') continue;
              if (!commentText.includes(trigger.keyword)) continue;
              if (isDuplicate(igAccountId, commenterId, trigger.keyword)) {
                console.log(`[webhook] Dedup skip: ${commenterUsername} already triggered "${trigger.keyword}"`);
                continue;
              }

              console.log(`[webhook] Comment trigger "${trigger.keyword}" by @${commenterUsername}`);

              // Public reply (fire-and-forget, no delay)
              if (trigger.publicReplies && trigger.publicReplies.length > 0) {
                const publicReply = trigger.publicReplies[Math.floor(Math.random() * trigger.publicReplies.length)];
                try {
                  await replyToComment(commentId, publicReply, accessToken);
                  console.log(`[webhook] Public reply sent to comment ${commentId}`);
                } catch (replyErr) {
                  console.warn('[webhook] Public reply failed:', replyErr.message);
                }
              }

              // DM with human-like delay
              const delayMs = trigger.delaySeconds > 0
                ? trigger.delaySeconds * 1000
                : Math.floor(Math.random() * 15000) + 5000;
              await randomDelay(delayMs, delayMs + 5000);

              const dmText = personalizeMessage(trigger.dmMessage, commenterUsername);
              try {
                await sendDM(commenterId, dmText, trigger.accessToken || accessToken);
                console.log(`[webhook] DM sent to ${commenterUsername} (${commenterId})`);
              } catch (dmErr) {
                console.error('[webhook] DM failed:', dmErr.message);
              }
            }
          } catch (err) {
            console.error('[webhook] Comment handler error:', err.message);
          }
        }
      }

      // ── B. Direct Message Trigger ─────────────────────────────────────────
      const messagingEvents = entry.messaging || [];
      for (const event of messagingEvents) {
        if (event.message?.is_echo) continue; // Skip bot's own messages
        if (!event.message?.text) continue;

        const senderId = event.sender?.id;
        const senderUsername = event.sender?.username || '';
        const receivedText = (event.message.text || '').toUpperCase().trim();

        if (!senderId || !receivedText) continue;

        try {
          const triggers = await getTriggersForAccount(igAccountId);
          const accessToken = await getAccountToken(igAccountId);
          if (!accessToken) continue;

          for (const trigger of triggers) {
            if (trigger.type !== 'dm') continue;
            if (!receivedText.includes(trigger.keyword)) continue;
            if (isDuplicate(igAccountId, senderId, trigger.keyword)) continue;

            console.log(`[webhook] DM trigger "${trigger.keyword}" from @${senderUsername}`);
            await randomDelay(3000, 8000);

            const dmText = personalizeMessage(trigger.dmMessage, senderUsername);
            try {
              await sendDM(senderId, dmText, trigger.accessToken || accessToken);
              console.log(`[webhook] Auto-reply DM sent to ${senderId}`);
            } catch (dmErr) {
              console.error('[webhook] Auto-reply DM failed:', dmErr.message);
            }
          }
        } catch (err) {
          console.error('[webhook] DM handler error:', err.message);
        }
      }
    }

    return res.status(200).json({ status: 'EVENT_RECEIVED' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
