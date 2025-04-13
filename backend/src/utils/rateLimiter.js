const rateLimit = require('express-rate-limit');

// General rate limiter for routes that don't need specific limits
const generalLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 15, // Limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP. Please try again after 15 minutes.',
});

// Login-specific rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // Limit each IP to 20 login attempts per windowMs
  message: 'Too many login attempts. Please try again later.',
});

// Registration-specific rate limiter
const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // Limit registration attempts to 5 per windowMs
  message: 'Too many registration attempts. Please try again later.',
});


module.exports = {
  generalLimiter,
  loginLimiter,
  registrationLimiter,
};
