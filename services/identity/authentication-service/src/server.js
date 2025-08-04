const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'authentication-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Routes
app.use('/api/auth', authRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    service: 'authentication-service'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Authentication service error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'authentication-service'
  });
});

app.listen(PORT, () => {
  console.log(`🔐 Authentication Service running on port ${PORT}`);
});

module.exports = app;