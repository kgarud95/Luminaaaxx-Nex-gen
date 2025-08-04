#!/bin/bash

echo "🔍 LuminaX Service Verification Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Service definitions
declare -A SERVICES=(
    ["API Gateway"]="3000"
    ["Authentication Service"]="3001"
    ["Authorization Service"]="3002"
    ["User Profile Service"]="3003"
    ["Session Management Service"]="3004"
    ["OAuth Provider Service"]="3005"
    ["Identity Verification Service"]="3006"
    ["Account Recovery Service"]="3007"
    ["Audit Logging Service"]="3008"
    ["Course Catalog Service"]="3011"
    ["Lesson Content Service"]="3012"
    ["Video Processing Service"]="3013"
    ["File Storage Service"]="3014"
    ["Content Versioning Service"]="3015"
    ["Metadata Service"]="3016"
    ["Content Moderation Service"]="3017"
    ["Media Streaming Service"]="3018"
    ["Content Search Service"]="3019"
    ["Content Analytics Service"]="3020"
    ["Progress Tracking Service"]="3021"
    ["Quiz Engine Service"]="3022"
    ["Certificate Service"]="3023"
    ["Learning Path Service"]="3024"
    ["Gamification Service"]="3025"
    ["Study Analytics Service"]="3026"
    ["Assignment Service"]="3027"
    ["Discussion Forum Service"]="3028"
    ["Live Session Service"]="3029"
    ["Pricing Service"]="3031"
    ["Payment Processing Service"]="3032"
    ["Subscription Service"]="3033"
    ["Invoice Service"]="3034"
    ["Refund Service"]="3035"
    ["Financial Reporting Service"]="3036"
    ["Coupon Service"]="3037"
    ["Revenue Analytics Service"]="3038"
    ["Recommendation Engine Service"]="3041"
    ["Chatbot Service"]="3042"
    ["Content Analysis Service"]="3043"
    ["Learning Optimization Service"]="3044"
    ["Predictive Analytics Service"]="3045"
    ["Personalization Service"]="3046"
    ["NLP Processing Service"]="3047"
    ["Skill Assessment Service"]="3048"
    ["Adaptive Learning Service"]="3049"
    ["AI Content Generator Service"]="3050"
    ["User Behavior Analytics Service"]="3051"
    ["Course Performance Analytics Service"]="3052"
    ["Business Intelligence Service"]="3053"
    ["Real-time Metrics Service"]="3054"
    ["Reporting Service"]="3055"
    ["Dashboard Service"]="3056"
    ["Data Pipeline Service"]="3057"
    ["Metrics Aggregation Service"]="3058"
    ["Email Service"]="3061"
    ["Push Notification Service"]="3062"
    ["SMS Service"]="3063"
    ["In-app Messaging Service"]="3064"
    ["Notification Orchestrator Service"]="3065"
    ["Communication Template Service"]="3066"
    ["Delivery Tracking Service"]="3067"
    ["API Gateway Service"]="3071"
    ["Service Discovery Service"]="3072"
    ["Configuration Service"]="3073"
    ["Logging Aggregation Service"]="3074"
    ["Monitoring Service"]="3075"
    ["Health Check Service"]="3076"
    ["Backup Service"]="3077"
    ["Admin Panel Service"]="3078"
)

# Counters
TOTAL_SERVICES=${#SERVICES[@]}
RUNNING_SERVICES=0
FAILED_SERVICES=0

echo "Total services to check: $TOTAL_SERVICES"
echo ""

# Check each service
for service_name in "${!SERVICES[@]}"; do
    port=${SERVICES[$service_name]}
    
    # Check if port is listening
    if nc -z localhost $port 2>/dev/null; then
        # Try to get health check
        response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/health 2>/dev/null)
        
        if [ "$response" = "200" ]; then
            echo -e "${GREEN}✅ $service_name${NC} (Port $port) - ${GREEN}HEALTHY${NC}"
            ((RUNNING_SERVICES++))
        else
            echo -e "${YELLOW}⚠️  $service_name${NC} (Port $port) - ${YELLOW}RUNNING BUT NO HEALTH CHECK${NC}"
            ((RUNNING_SERVICES++))
        fi
    else
        echo -e "${RED}❌ $service_name${NC} (Port $port) - ${RED}NOT RUNNING${NC}"
        ((FAILED_SERVICES++))
    fi
done

echo ""
echo "======================================"
echo "Service Status Summary:"
echo -e "✅ Running: ${GREEN}$RUNNING_SERVICES${NC}/$TOTAL_SERVICES"
echo -e "❌ Failed: ${RED}$FAILED_SERVICES${NC}/$TOTAL_SERVICES"

if [ $FAILED_SERVICES -eq 0 ]; then
    echo -e "${GREEN}🎉 All services are running successfully!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some services are not running. Check the logs for more details.${NC}"
    exit 1
fi