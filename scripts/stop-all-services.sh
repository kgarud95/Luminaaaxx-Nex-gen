#!/bin/bash

echo "🛑 Stopping All LuminaX Microservices"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="/tmp/${service_name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if kill -0 $pid 2>/dev/null; then
            echo -e "${YELLOW}Stopping $service_name (PID: $pid)...${NC}"
            kill $pid
            sleep 1
            
            # Force kill if still running
            if kill -0 $pid 2>/dev/null; then
                echo -e "${RED}Force killing $service_name...${NC}"
                kill -9 $pid
            fi
            
            echo -e "${GREEN}✅ $service_name stopped${NC}"
        else
            echo -e "${YELLOW}$service_name was not running${NC}"
        fi
        
        rm -f "$pid_file"
    else
        echo -e "${YELLOW}No PID file found for $service_name${NC}"
    fi
}

# Stop all services
services=(
    "api-gateway"
    "authentication-service"
    "authorization-service"
    "user-profile-service"
    "session-management-service"
    "oauth-provider-service"
    "identity-verification-service"
    "account-recovery-service"
    "audit-logging-service"
    "course-catalog-service"
    "lesson-content-service"
    "video-processing-service"
    "file-storage-service"
    "content-versioning-service"
    "metadata-service"
    "content-moderation-service"
    "media-streaming-service"
    "content-search-service"
    "content-analytics-service"
    "progress-tracking-service"
    "quiz-engine-service"
    "certificate-service"
    "learning-path-service"
    "gamification-service"
    "study-analytics-service"
    "assignment-service"
    "discussion-forum-service"
    "live-session-service"
    "pricing-service"
    "payment-processing-service"
    "subscription-service"
    "invoice-service"
    "refund-service"
    "financial-reporting-service"
    "coupon-service"
    "revenue-analytics-service"
    "recommendation-engine-service"
    "chatbot-service"
    "content-analysis-service"
    "learning-optimization-service"
    "predictive-analytics-service"
    "personalization-service"
    "nlp-processing-service"
    "skill-assessment-service"
    "adaptive-learning-service"
    "ai-content-generator-service"
    "user-behavior-analytics-service"
    "course-performance-analytics-service"
    "business-intelligence-service"
    "real-time-metrics-service"
    "reporting-service"
    "dashboard-service"
    "data-pipeline-service"
    "metrics-aggregation-service"
    "email-service"
    "push-notification-service"
    "sms-service"
    "in-app-messaging-service"
    "notification-orchestrator-service"
    "communication-template-service"
    "delivery-tracking-service"
    "api-gateway-service"
    "service-discovery-service"
    "configuration-service"
    "logging-aggregation-service"
    "monitoring-service"
    "health-check-service"
    "backup-service"
    "admin-panel-service"
)

for service in "${services[@]}"; do
    stop_service "$service"
done

# Clean up log files
echo -e "\n${YELLOW}Cleaning up log files...${NC}"
rm -f /tmp/*.log

echo -e "\n${GREEN}🎉 All services stopped!${NC}"