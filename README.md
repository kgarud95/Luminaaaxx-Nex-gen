# LuminaX - Complete Enterprise Learning Platform

![LuminaX Logo](https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop)

## 🚀 Overview

LuminaX is a comprehensive enterprise-scale online learning platform built with a modern microservices architecture. It provides a scalable, modular solution for online education with advanced features like AI-powered recommendations, real-time analytics, and seamless payment processing.

## 🏗️ Complete Microservices Architecture

### Microservices Overview

LuminaX is organized into 8 domain-specific service groups with 68 total microservices:

1. **Identity Domain (8 services)**: Authentication, authorization, user management
2. **Content Domain (10 services)**: Course catalog, media processing, content management
3. **Learning Domain (9 services)**: Progress tracking, assessments, gamification
4. **Commerce Domain (8 services)**: Payments, subscriptions, financial reporting
5. **AI Domain (10 services)**: Recommendations, chatbot, personalization
6. **Analytics Domain (8 services)**: User behavior, performance metrics, reporting
7. **Communication Domain (7 services)**: Email, notifications, messaging
8. **Platform Domain (8 services)**: Infrastructure, monitoring, admin tools

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, TypeScript
- **Databases**: PostgreSQL, MongoDB, Redis, Elasticsearch
- **Authentication**: JWT tokens
- **Payments**: Stripe integration
- **Containerization**: Docker
- **API Documentation**: OpenAPI/Swagger

## 🎯 Key Features

### For Students
- **Course Discovery**: Advanced search and filtering
- **Learning Dashboard**: Progress tracking and personalized recommendations
- **Interactive Learning**: Video lessons, quizzes, assignments
- **Certificates**: Digital certificates upon course completion
- **Community**: Discussion forums and peer interaction

### For Instructors
- **Course Creation**: Comprehensive course authoring tools
- **Analytics**: Detailed student performance insights
- **Revenue Tracking**: Earnings and payout management
- **Live Sessions**: Virtual classroom capabilities

### For Administrators
- **Platform Management**: User and course management
- **Analytics Dashboard**: Business intelligence and reporting
- **Financial Oversight**: Revenue tracking and financial reports
- **System Monitoring**: Health checks and performance metrics

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Option 2: Individual Services

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd luminax
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development environment**
   ```bash
   # Start all services with Docker Compose
   docker-compose up -d
   
   # Or start individual services for development
   npm run dev
   ```

4. **Verify installation**
   ```bash
   # Run health check on all services
   npm run health-check
   ```

5. **Start all 68 microservices**
   ```bash
   # Start all services individually
   ./scripts/start-all-services.sh
   
   # Verify all services are running
   ./scripts/verify-services.sh
   
   # Stop all services when done
   ./scripts/stop-all-services.sh
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API Gateway: http://localhost:3000
   - API Documentation: http://localhost:3000/docs

### Demo Accounts

Use these pre-configured accounts to explore the platform:

**Student Account**
- Email: `student@luminax.com`
- Password: `password123`

**Instructor Account**
- Email: `instructor@luminax.com`
- Password: `password123`

**Admin Account**
- Email: `admin@luminax.com`
- Password: `password123`

## 📊 Service Architecture

### Complete Service List (68 Total)

**Identity Domain (8 services)**: Ports 3001-3008
**Content Domain (10 services)**: Ports 3011-3020  
**Learning Domain (9 services)**: Ports 3021-3029
**Commerce Domain (8 services)**: Ports 3031-3038
**AI Domain (10 services)**: Ports 3041-3050
**Analytics Domain (8 services)**: Ports 3051-3058
**Communication Domain (7 services)**: Ports 3061-3067
**Platform Domain (8 services)**: Ports 3071-3078

All services include health check endpoints, proper error handling, and Docker configuration.


### API Gateway (Port 3000)
Central entry point for all client requests with:
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and CORS handling
- Request/response logging

### Core Services

#### Identity Services (Ports 3001-3008)
- **Authentication Service (3001)**: Login, registration, JWT management
- **Authorization Service (3002)**: Role-based access control
- **User Profile Service (3003)**: Profile management and preferences
- **Session Management Service (3004)**: Session handling and security
- **OAuth Provider Service (3005)**: Third-party authentication
- **Identity Verification Service (3006)**: KYC and verification
- **Account Recovery Service (3007)**: Password reset and recovery
- **Audit Logging Service (3008)**: Security event logging

#### Content Services (Ports 3011-3020)
- **Course Catalog Service (3011)**: Course discovery and metadata
- **Lesson Content Service (3012)**: Learning material management
- **Video Processing Service (3013)**: Media encoding and streaming
- **File Storage Service (3014)**: Asset management and CDN
- **Content Versioning Service (3015)**: Version control for courses
- **Metadata Service (3016)**: SEO and content tagging
- **Content Moderation Service (3017)**: Quality assurance
- **Media Streaming Service (3018)**: Video delivery optimization
- **Content Search Service (3019)**: Full-text search capabilities
- **Content Analytics Service (3020)**: Usage analytics

## 🔧 Development

### Project Structure

```
luminax/
├── frontend/                    # React frontend application
├── api-gateway/                # Central API gateway
├── services/                   # Microservices organized by domain
│   ├── identity/              # Authentication and user management
│   ├── content/               # Course and content management
│   ├── learning/              # Learning experience services
│   ├── commerce/              # Payment and billing services
│   ├── ai/                    # AI and ML services
│   ├── analytics/             # Analytics and reporting
│   ├── communication/         # Messaging and notifications
│   └── platform/              # Infrastructure services
├── shared/                    # Shared libraries and utilities
├── infrastructure/            # Database and infrastructure configs
├── scripts/                   # Automation and utility scripts
└── k8s/                      # Kubernetes deployment configs
```

### Running Individual Services

```bash
# Start API Gateway
cd api-gateway && npm run dev

# Start Authentication Service
cd services/identity/authentication-service && npm run dev

# Start Course Catalog Service
cd services/content/course-catalog-service && npm run dev
```

### Running All Services

```bash
# Start all 68 microservices
./scripts/start-all-services.sh

# Check service health
./scripts/verify-services.sh
```

### Health Monitoring

```bash
# Check all service health
node scripts/health-check.js

# Check specific service
curl http://localhost:3001/health
```

### Service Management

```bash
# Create any missing services
./scripts/create-missing-services.sh
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests for specific service
cd services/identity/authentication-service && npm test

# Run integration tests
npm run test:integration
```

## 📈 Monitoring and Analytics

### Built-in Monitoring
- Health check endpoints for all services
- Request/response logging
- Performance metrics collection
- Error tracking and alerting

### Analytics Features
- User behavior tracking
- Course performance metrics
- Revenue analytics
- Real-time dashboards

## 🔒 Security

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- OAuth 2.0 integration
- Session management

### Data Protection
- Password encryption with bcrypt
- HTTPS enforcement
- CORS protection
- Input validation and sanitization
- Rate limiting

### Compliance
- GDPR compliance features
- Data retention policies
- Audit logging
- Privacy controls

## 💳 Payment Integration

### Supported Payment Methods
- Credit/Debit cards via Stripe
- PayPal integration
- Bank transfers
- Cryptocurrency (coming soon)

### Features
- Secure payment processing
- Subscription management
- Refund handling
- Invoice generation
- Financial reporting

## 🌐 Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
# Build for production
npm run build

# Deploy to Kubernetes
kubectl apply -f k8s/
```

### Environment Variables

Create a `.env` file with the following variables:

```env
# API Gateway
PORT=3000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your-super-secure-jwt-secret

# Database
POSTGRES_URL=postgresql://luminax:luminax123@localhost:5432/luminax
MONGODB_URL=mongodb://luminax:luminax123@localhost:27017/luminax
REDIS_URL=redis://localhost:6379
ELASTICSEARCH_URL=http://localhost:9200

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation
- Ensure all services pass health checks

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET  /api/auth/me
POST /api/auth/logout
```

### Course Endpoints
```
GET  /api/courses              # Get all courses
GET  /api/courses/:id          # Get course by ID
POST /api/courses              # Create course (instructor/admin)
PUT  /api/courses/:id          # Update course (instructor/admin)
DELETE /api/courses/:id        # Delete course (admin)
GET  /api/courses/popular      # Get popular courses
GET  /api/courses/featured     # Get featured courses
```

### User Endpoints
```
GET  /api/users/profile        # Get user profile
PUT  /api/users/profile        # Update user profile
GET  /api/users/enrollments    # Get user enrollments
POST /api/users/enroll         # Enroll in course
```

## 🆘 Troubleshooting

### Common Issues

**Services not starting:**
```bash
# Check Docker status
docker-compose ps

# View service logs
docker-compose logs <service-name>

# Restart specific service
docker-compose restart <service-name>
```

**Individual services not starting:**
```bash
# Check service logs
tail -f /tmp/<service-name>.log

# Check if port is in use
lsof -i :3001

# Restart individual service
./scripts/stop-all-services.sh
./scripts/start-all-services.sh
```

**Database connection issues:**
```bash
# Check database containers
docker-compose ps postgres mongodb redis elasticsearch

# Reset databases
docker-compose down -v
docker-compose up -d
```

**Frontend not loading:**
```bash
# Clear browser cache
# Check console for errors
# Verify API Gateway is running on port 3000
```

**Service verification:**
```bash
# Run comprehensive service check
./scripts/verify-services.sh
```

## 📞 Support

- **Documentation**: [Wiki](./wiki)
- **Issues**: [GitHub Issues](./issues)
- **Discord**: [Community Server](https://discord.gg/luminax)
- **Email**: support@luminax.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React and the amazing React community
- Node.js and Express.js teams
- All the open-source contributors
- Our beta testers and early adopters

---

**Built with ❤️ by the LuminaX Team**

*Empowering the future of online education through innovative technology*