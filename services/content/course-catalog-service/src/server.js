const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const courseRoutes = require('./routes/course.routes');

const app = express();
const PORT = process.env.PORT || 3011;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'course-catalog-service',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Routes
app.use('/api/courses', courseRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    service: 'course-catalog-service'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Course catalog service error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: 'course-catalog-service'
  });
});

app.listen(PORT, () => {
  console.log(`📚 Course Catalog Service running on port ${PORT}`);
});

module.exports = app;