/**
 * functions/src/middleware/timeoutHandler.js
 * Item 8: Handle API Timeouts
 */

function timeoutHandler(timeoutMs = 25000) {
  return (req, res, next) => {
    // Skip timeout for streaming endpoints if any
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({
          success: false,
          error: 'Gateway Timeout. The upstream server took too long to respond.',
          code: 'ERR_GATEWAY_TIMEOUT',
          timeoutMs
        });
      }
    }, timeoutMs);

    // Clear timer when response finishes
    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));

    next();
  };
}

module.exports = timeoutHandler;
