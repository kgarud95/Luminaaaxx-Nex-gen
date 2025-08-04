#!/bin/bash

echo "🏥 LuminaX Health Check"
echo "======================"

# Function to check service health
check_service() {
    local name=$1
    local port=$2
    
    if curl -s -f "http://localhost:$port/health" > /dev/null; then
        echo "✅ $name (Port $port) - HEALTHY"
        return 0
    else
        echo "❌ $name (Port $port) - UNHEALTHY"
        return 1
    fi
}

# Check core services
echo "Checking Core Services..."
check_service "API Gateway" 3000
check_service "Authentication Service" 3001
check_service "Course Catalog Service" 3011
check_service "Payment Processing Service" 3032
check_service "Progress Tracking Service" 3021

echo ""
echo "Checking Infrastructure..."
# Check databases
if nc -z localhost 5432; then
    echo "✅ PostgreSQL - RUNNING"
else
    echo "❌ PostgreSQL - NOT RUNNING"
fi

if nc -z localhost 27017; then
    echo "✅ MongoDB - RUNNING"
else
    echo "❌ MongoDB - NOT RUNNING"
fi

if nc -z localhost 6379; then
    echo "✅ Redis - RUNNING"
else
    echo "❌ Redis - NOT RUNNING"
fi

echo ""
echo "Health check complete!"