/**
 * functions/src/middleware/cacheMiddleware.js
 * Item 16: Cache Repeat Requests
 */

const memoryCache = new Map();

function cacheMiddleware(ttlSeconds = 300) {
  return (req, res, next) => {
    // Only cache safe GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const cacheKey = req.originalUrl || req.url;
    const now = Date.now();
    const cached = memoryCache.get(cacheKey);

    if (cached && (now - cached.timestamp < ttlSeconds * 1000)) {
      res.setHeader('X-Cache-Status', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=60`);
      return res.status(cached.statusCode).json(cached.data);
    }

    res.setHeader('X-Cache-Status', 'MISS');
    res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=60`);

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      // Only cache successful 200 responses
      if (res.statusCode === 200) {
        memoryCache.set(cacheKey, {
          data,
          statusCode: res.statusCode,
          timestamp: Date.now()
        });
      }
      return originalJson(data);
    };

    next();
  };
}

module.exports = cacheMiddleware;
