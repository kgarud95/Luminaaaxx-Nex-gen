#!/bin/bash

echo "🚀 Creating Missing LuminaX Services"
echo "===================================="

# Function to create a basic service
create_service() {
    local domain=$1
    local service_name=$2
    local port=$3
    local service_dir="services/$domain/$service_name"
    
    echo "Creating $service_name on port $port..."
    
    # Create directory structure
    mkdir -p "$service_dir/src/controllers"
    mkdir -p "$service_dir/src/models"
    mkdir -p "$service_dir/src/routes"
    mkdir -p "$service_dir/src/middleware"
    mkdir -p "$service_dir/tests"
    
    # Create package.json
    cat > "$service_dir/package.json" << EOF
{
  "name": "$service_name",
  "version": "1.0.0",
  "description": "$service_name for LuminaX",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "joi": "^17.9.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.2"
  }
}
EOF

    # Create server.js
    cat > "$service_dir/src/server.js" << EOF
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || $port;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    service: '$service_name',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Basic route
app.get('/api/${service_name//-//}', (req, res) => {
  res.status(200).json({
    service: '$service_name',
    message: 'Service is running',
    endpoints: ['/health', '/api/${service_name//-//}']
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    service: '$service_name'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('$service_name error:', err);
  res.status(500).json({
    error: 'Internal server error',
    service: '$service_name'
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 $service_name running on port \${PORT}\`);
});

module.exports = app;
EOF

    # Create Dockerfile
    cat > "$service_dir/Dockerfile" << EOF
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE $port

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:$port/health || exit 1

# Start the application
CMD ["npm", "start"]
EOF

    echo "✅ Created $service_name"
}

# Identity Domain Services
create_service "identity" "user-profile-service" 3003
create_service "identity" "session-management-service" 3004
create_service "identity" "oauth-provider-service" 3005
create_service "identity" "identity-verification-service" 3006
create_service "identity" "account-recovery-service" 3007
create_service "identity" "audit-logging-service" 3008

# Content Domain Services
create_service "content" "lesson-content-service" 3012
create_service "content" "video-processing-service" 3013
create_service "content" "file-storage-service" 3014
create_service "content" "content-versioning-service" 3015
create_service "content" "metadata-service" 3016
create_service "content" "content-moderation-service" 3017
create_service "content" "media-streaming-service" 3018
create_service "content" "content-search-service" 3019
create_service "content" "content-analytics-service" 3020

# Learning Domain Services
create_service "learning" "quiz-engine-service" 3022
create_service "learning" "certificate-service" 3023
create_service "learning" "learning-path-service" 3024
create_service "learning" "gamification-service" 3025
create_service "learning" "study-analytics-service" 3026
create_service "learning" "assignment-service" 3027
create_service "learning" "discussion-forum-service" 3028
create_service "learning" "live-session-service" 3029

# Commerce Domain Services
create_service "commerce" "pricing-service" 3031
create_service "commerce" "subscription-service" 3033
create_service "commerce" "invoice-service" 3034
create_service "commerce" "refund-service" 3035
create_service "commerce" "financial-reporting-service" 3036
create_service "commerce" "coupon-service" 3037
create_service "commerce" "revenue-analytics-service" 3038

# AI Domain Services
create_service "ai" "recommendation-engine-service" 3041
create_service "ai" "chatbot-service" 3042
create_service "ai" "content-analysis-service" 3043
create_service "ai" "learning-optimization-service" 3044
create_service "ai" "predictive-analytics-service" 3045
create_service "ai" "personalization-service" 3046
create_service "ai" "nlp-processing-service" 3047
create_service "ai" "skill-assessment-service" 3048
create_service "ai" "adaptive-learning-service" 3049
create_service "ai" "ai-content-generator-service" 3050

# Analytics Domain Services
create_service "analytics" "user-behavior-analytics-service" 3051
create_service "analytics" "course-performance-analytics-service" 3052
create_service "analytics" "business-intelligence-service" 3053
create_service "analytics" "real-time-metrics-service" 3054
create_service "analytics" "reporting-service" 3055
create_service "analytics" "dashboard-service" 3056
create_service "analytics" "data-pipeline-service" 3057
create_service "analytics" "metrics-aggregation-service" 3058

# Communication Domain Services
create_service "communication" "email-service" 3061
create_service "communication" "push-notification-service" 3062
create_service "communication" "sms-service" 3063
create_service "communication" "in-app-messaging-service" 3064
create_service "communication" "notification-orchestrator-service" 3065
create_service "communication" "communication-template-service" 3066
create_service "communication" "delivery-tracking-service" 3067

# Platform Domain Services
create_service "platform" "api-gateway-service" 3071
create_service "platform" "service-discovery-service" 3072
create_service "platform" "configuration-service" 3073
create_service "platform" "logging-aggregation-service" 3074
create_service "platform" "monitoring-service" 3075
create_service "platform" "health-check-service" 3076
create_service "platform" "backup-service" 3077
create_service "platform" "admin-panel-service" 3078

echo ""
echo "🎉 All missing services have been created!"
echo "Run 'npm install' in each service directory to install dependencies."