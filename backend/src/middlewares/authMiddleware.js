const jwt = require('jsonwebtoken');
const config = require('../config/env');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Incorrect role' });
    }
    next();
  };
};

module.exports = { verifyToken, requireRole };