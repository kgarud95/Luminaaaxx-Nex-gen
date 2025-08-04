const rateLimit = require('express-rate-limit');

// Different rate limits for different endpoints
const createRateLimit = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: 'Too many requests',
      message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        message,
        retryAfter: Math.ceil(windowMs / 1000)
      });
    }
  });
};

// General API rate limit
const generalLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later.'
);

// Auth endpoints rate limit (stricter)
const authLimit = createRateLimit(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Too many authentication attempts, please try again later.'
);

// Payment endpoints rate limit (very strict)
const paymentLimit = createRateLimit(
  60 * 60 * 1000, // 1 hour
  10, // limit each IP to 10 requests per windowMs
  'Too many payment requests, please try again later.'
);

// Search endpoints rate limit
const searchLimit = createRateLimit(
  1 * 60 * 1000, // 1 minute
  30, // limit each IP to 30 requests per windowMs
  'Too many search requests, please slow down.'
);

module.exports = {
  generalLimit,
  authLimit,
  paymentLimit,
  searchLimit
};