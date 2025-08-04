const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const paymentRoutes = require('./routes/payment.routes');

const app = express();
const PORT = process.env.PORT || 3032;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'payment-processing-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Routes
app.use('/api/payments', paymentRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    service: 'payment-processing-service'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Payment processing service error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'payment-processing-service'
  });
});

app.listen(PORT, () => {
  console.log(`💳 Payment Processing Service running on port ${PORT}`);
});

module.exports = app;