/**
 * functions/src/middleware/errorHandler.js
 * Items 4 & 7: Centralized Error Handling and Failed Request Management
 */

const logger = require('../utils/logger');

// 404 Route Not Found Handler
function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl || req.path}`,
    code: 'ERR_ROUTE_NOT_FOUND'
  });
}

// Global 500 Uncaught Error Handler
function globalErrorHandler(err, req, res, next) {
  const correlationId = req.correlationId || 'unknown';

  logger.error(`Unhandled Exception on ${req.method} ${req.path}: ${err.message}`, {
    correlationId,
    stack: err.stack,
    name: err.name
  });

  // Handle payload too large (Item 15)
  if (err.type === 'entity.too.large' || err.status === 413) {
    return res.status(413).json({
      success: false,
      error: 'Payload Too Large. Maximum allowed upload size is 2MB.',
      code: 'ERR_PAYLOAD_TOO_LARGE'
    });
  }

  // Handle JSON parse errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON payload in request body.',
      code: 'ERR_INVALID_JSON'
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  return res.status(statusCode).json({
    success: false,
    error: isProduction ? 'An unexpected server error occurred. Please try again.' : err.message,
    code: err.code || 'ERR_INTERNAL_SERVER_ERROR',
    correlationId
  });
}

module.exports = {
  notFoundHandler,
  globalErrorHandler
};
