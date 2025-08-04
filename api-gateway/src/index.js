const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const authMiddleware = require('./middleware/auth.middleware');
const loggingMiddleware = require('./middleware/logging.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Logging
app.use(morgan('combined'));
app.use(loggingMiddleware);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Service routes with proxy
const services = {
  auth: 'http://localhost:3001',
  courses: 'http://localhost:3011',
  users: 'http://localhost:3003',
  payments: 'http://localhost:3032',
  analytics: 'http://localhost:3051'
};

// Authentication routes (no auth required)
app.use('/api/auth', createProxyMiddleware({
  target: services.auth,
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth': '/api/auth'
  },
  onError: (err, req, res) => {
    console.error('Auth service error:', err.message);
    res.status(503).json({ error: 'Authentication service unavailable' });
  }
}));

// Protected routes
app.use('/api/courses', createProxyMiddleware({
  target: services.courses,
  changeOrigin: true,
  pathRewrite: {
    '^/api/courses': '/api/courses'
  },
  onError: (err, req, res) => {
    console.error('Course service error:', err.message);
    res.status(503).json({ error: 'Course service unavailable' });
  }
}));

app.use('/api/users', authMiddleware, createProxyMiddleware({
  target: services.users,
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api/users'
  },
  onError: (err, req, res) => {
    console.error('User service error:', err.message);
    res.status(503).json({ error: 'User service unavailable' });
  }
}));

app.use('/api/payments', authMiddleware, createProxyMiddleware({
  target: services.payments,
  changeOrigin: true,
  pathRewrite: {
    '^/api/payments': '/api/payments'
  },
  onError: (err, req, res) => {
    console.error('Payment service error:', err.message);
    res.status(503).json({ error: 'Payment service unavailable' });
  }
}));

app.use('/api/analytics', authMiddleware, createProxyMiddleware({
  target: services.analytics,
  changeOrigin: true,
  pathRewrite: {
    '^/api/analytics': '/api/analytics'
  },
  onError: (err, req, res) => {
    console.error('Analytics service error:', err.message);
    res.status(503).json({ error: 'Analytics service unavailable' });
  }
}));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Gateway error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/health`);
});

module.exports = app;