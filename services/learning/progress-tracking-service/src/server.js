const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const progressRoutes = require('./routes/progress.routes');

const app = express();
const PORT = process.env.PORT || 3021;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'progress-tracking-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Routes
app.use('/api/progress', progressRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    service: 'progress-tracking-service'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Progress tracking service error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'progress-tracking-service'
  });
});

app.listen(PORT, () => {
  console.log(`📊 Progress Tracking Service running on port ${PORT}`);
});

module.exports = app;