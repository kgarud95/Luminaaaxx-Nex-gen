#!/bin/bash

echo "🚀 Starting All LuminaX Microservices"
echo "===================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to start a service
start_service() {
    local service_path=$1
    local service_name=$(basename "$service_path")
    local port=$2
    
    echo -e "${BLUE}Starting $service_name on port $port...${NC}"
    
    cd "$service_path"
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing dependencies for $service_name...${NC}"
        npm install --silent
    fi
    
    # Start the service in background
    PORT=$port npm start > "/tmp/${service_name}.log" 2>&1 &
    local pid=$!
    
    # Wait a moment for service to start
    sleep 2
    
    # Check if service is running
    if kill -0 $pid 2>/dev/null; then
        echo -e "${GREEN}✅ $service_name started successfully (PID: $pid)${NC}"
        echo "$pid" > "/tmp/${service_name}.pid"
    else
        echo -e "${RED}❌ Failed to start $service_name${NC}"
    fi
    
    cd - > /dev/null
}

# Start API Gateway first
echo -e "${BLUE}Starting API Gateway...${NC}"
start_service "api-gateway" 3000

# Start Identity Services
echo -e "\n${BLUE}Starting Identity Services...${NC}"
start_service "services/identity/authentication-service" 3001
start_service "services/identity/authorization-service" 3002
start_service "services/identity/user-profile-service" 3003
start_service "services/identity/session-management-service" 3004
start_service "services/identity/oauth-provider-service" 3005
start_service "services/identity/identity-verification-service" 3006
start_service "services/identity/account-recovery-service" 3007
start_service "services/identity/audit-logging-service" 3008

# Start Content Services
echo -e "\n${BLUE}Starting Content Services...${NC}"
start_service "services/content/course-catalog-service" 3011
start_service "services/content/lesson-content-service" 3012
start_service "services/content/video-processing-service" 3013
start_service "services/content/file-storage-service" 3014
start_service "services/content/content-versioning-service" 3015
start_service "services/content/metadata-service" 3016
start_service "services/content/content-moderation-service" 3017
start_service "services/content/media-streaming-service" 3018
start_service "services/content/content-search-service" 3019
start_service "services/content/content-analytics-service" 3020

# Start Learning Services
echo -e "\n${BLUE}Starting Learning Services...${NC}"
start_service "services/learning/progress-tracking-service" 3021
start_service "services/learning/quiz-engine-service" 3022
start_service "services/learning/certificate-service" 3023
start_service "services/learning/learning-path-service" 3024
start_service "services/learning/gamification-service" 3025
start_service "services/learning/study-analytics-service" 3026
start_service "services/learning/assignment-service" 3027
start_service "services/learning/discussion-forum-service" 3028
start_service "services/learning/live-session-service" 3029

# Start Commerce Services
echo -e "\n${BLUE}Starting Commerce Services...${NC}"
start_service "services/commerce/pricing-service" 3031
start_service "services/commerce/payment-processing-service" 3032
start_service "services/commerce/subscription-service" 3033
start_service "services/commerce/invoice-service" 3034
start_service "services/commerce/refund-service" 3035
start_service "services/commerce/financial-reporting-service" 3036
start_service "services/commerce/coupon-service" 3037
start_service "services/commerce/revenue-analytics-service" 3038

# Start AI Services
echo -e "\n${BLUE}Starting AI Services...${NC}"
start_service "services/ai/recommendation-engine-service" 3041
start_service "services/ai/chatbot-service" 3042
start_service "services/ai/content-analysis-service" 3043
start_service "services/ai/learning-optimization-service" 3044
start_service "services/ai/predictive-analytics-service" 3045
start_service "services/ai/personalization-service" 3046
start_service "services/ai/nlp-processing-service" 3047
start_service "services/ai/skill-assessment-service" 3048
start_service "services/ai/adaptive-learning-service" 3049
start_service "services/ai/ai-content-generator-service" 3050

# Start Analytics Services
echo -e "\n${BLUE}Starting Analytics Services...${NC}"
start_service "services/analytics/user-behavior-analytics-service" 3051
start_service "services/analytics/course-performance-analytics-service" 3052
start_service "services/analytics/business-intelligence-service" 3053
start_service "services/analytics/real-time-metrics-service" 3054
start_service "services/analytics/reporting-service" 3055
start_service "services/analytics/dashboard-service" 3056
start_service "services/analytics/data-pipeline-service" 3057
start_service "services/analytics/metrics-aggregation-service" 3058

# Start Communication Services
echo -e "\n${BLUE}Starting Communication Services...${NC}"
start_service "services/communication/email-service" 3061
start_service "services/communication/push-notification-service" 3062
start_service "services/communication/sms-service" 3063
start_service "services/communication/in-app-messaging-service" 3064
start_service "services/communication/notification-orchestrator-service" 3065
start_service "services/communication/communication-template-service" 3066
start_service "services/communication/delivery-tracking-service" 3067

# Start Platform Services
echo -e "\n${BLUE}Starting Platform Services...${NC}"
start_service "services/platform/api-gateway-service" 3071
start_service "services/platform/service-discovery-service" 3072
start_service "services/platform/configuration-service" 3073
start_service "services/platform/logging-aggregation-service" 3074
start_service "services/platform/monitoring-service" 3075
start_service "services/platform/health-check-service" 3076
start_service "services/platform/backup-service" 3077
start_service "services/platform/admin-panel-service" 3078

echo -e "\n${GREEN}🎉 All services started!${NC}"
echo -e "${YELLOW}Run './scripts/verify-services.sh' to check service health${NC}"
echo -e "${YELLOW}Logs are available in /tmp/*.log${NC}"
echo -e "${YELLOW}PIDs are stored in /tmp/*.pid${NC}"