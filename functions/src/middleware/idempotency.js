/**
 * functions/src/middleware/idempotency.js
 * Items 9 & 10: Prevent Duplicate Submissions and Duplicate Payments
 */

const idempotencyStore = new Map();
const TTL_MS = 10 * 60 * 1000; // 10 minutes cache window

// Periodic cleanup of expired idempotency keys
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of idempotencyStore.entries()) {
    if (now - entry.timestamp > TTL_MS) {
      idempotencyStore.delete(key);
    }
  }
}, 60000);

function idempotencyMiddleware(req, res, next) {
  // Only apply to state-modifying requests
  if (req.method !== 'POST' && req.method !== 'PUT') {
    return next();
  }

  const idempotencyKey = req.get('Idempotency-Key') || req.get('X-Idempotency-Key');

  // If client didn't supply an explicit key, allow normal flow
  if (!idempotencyKey) {
    return next();
  }

  const cacheKey = `${req.user ? req.user.uid : 'anon'}:${req.path}:${idempotencyKey}`;
  const existing = idempotencyStore.get(cacheKey);

  if (existing) {
    if (existing.status === 'in_flight') {
      return res.status(409).json({
        success: false,
        error: 'A request with this Idempotency-Key is currently being processed. Please do not submit twice.',
        code: 'ERR_CONCURRENT_DUPLICATE_REQUEST'
      });
    }

    if (existing.status === 'completed') {
      // Replay previous response without charging or creating duplicate record
      res.setHeader('X-Idempotent-Replay', 'true');
      return res.status(existing.statusCode).json(existing.body);
    }
  }

  // Mark as in-flight
  idempotencyStore.set(cacheKey, { status: 'in_flight', timestamp: Date.now() });

  // Intercept json response
  const originalJson = res.json.bind(res);
  res.json = (body) => {
    idempotencyStore.set(cacheKey, {
      status: 'completed',
      statusCode: res.statusCode,
      body,
      timestamp: Date.now()
    });
    return originalJson(body);
  };

  next();
}

module.exports = idempotencyMiddleware;
