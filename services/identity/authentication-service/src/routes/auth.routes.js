const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

// Protected route to get current user
router.get('/me', (req, res, next) => {
  // Simple auth middleware for demo
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }
  
  const token = authHeader.split(' ')[1];
  if (token && token.startsWith('mock-token-')) {
    req.user = { id: token.replace('mock-token-', '') };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}, authController.me);

module.exports = router;