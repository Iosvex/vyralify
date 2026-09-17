/**
 * functions/src/utils/logger.js
 * Item 18: Structured Error & Event Logging
 */

const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

function formatLog(level, message, meta = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  });
}

const logger = {
  info: (message, meta) => console.log(formatLog(LOG_LEVELS.INFO, message, meta)),
  warn: (message, meta) => console.warn(formatLog(LOG_LEVELS.WARN, message, meta)),
  error: (message, meta) => console.error(formatLog(LOG_LEVELS.ERROR, message, meta)),
  debug: (message, meta) => console.debug(formatLog(LOG_LEVELS.DEBUG, message, meta)),

  // Express Request Logger Middleware
  requestLogger: (req, res, next) => {
    const start = Date.now();
    const correlationId = req.headers['x-correlation-id'] || `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    req.correlationId = correlationId;
    res.setHeader('X-Correlation-Id', correlationId);

    res.on('finish', () => {
      const durationMs = Date.now() - start;
      const logData = {
        correlationId,
        method: req.method,
        path: req.originalUrl || req.path,
        statusCode: res.statusCode,
        durationMs,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent') || 'unknown',
        uid: req.user ? req.user.uid : null
      };

      if (res.statusCode >= 500) {
        logger.error(`API 5xx Server Error: ${req.method} ${req.path}`, logData);
      } else if (res.statusCode >= 400) {
        logger.warn(`API 4xx Client Warning: ${req.method} ${req.path}`, logData);
      } else {
        logger.info(`API Request Completed: ${req.method} ${req.path}`, logData);
      }
    });

    next();
  }
};

module.exports = logger;
