/**
 * functions/src/middleware/rateLimiter.js
 * Items 1 & 2: Rate Limiting and API Limits
 */

const rateLimit = require('express-rate-limit');

// 1. Global API rate limiter (150 requests per 15 minutes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
    code: 'ERR_RATE_LIMIT_EXCEEDED',
    retryAfterMinutes: 15
  }
});

// 2. High-cost AI endpoint limiter (12 requests per minute)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => (req.user ? req.user.uid : req.ip),
  message: {
    success: false,
    error: 'AI generation rate limit reached. Please wait a minute before requesting another prompt.',
    code: 'ERR_AI_RATE_LIMIT_EXCEEDED',
    retryAfterSeconds: 60
  }
});

// 3. Sensitive financial / checkout limiter (25 requests per 15 minutes)
const authCheckoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => (req.user ? req.user.uid : req.ip),
  message: {
    success: false,
    error: 'Too many checkout or withdrawal requests. Please try again in 15 minutes.',
    code: 'ERR_CHECKOUT_RATE_LIMIT_EXCEEDED',
    retryAfterMinutes: 15
  }
});

module.exports = {
  globalLimiter,
  aiLimiter,
  authCheckoutLimiter
};
