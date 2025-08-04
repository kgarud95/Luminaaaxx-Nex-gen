#!/usr/bin/env node

const http = require('http');

const services = [
  { name: 'API Gateway', url: 'http://localhost:3000/health' },
  { name: 'Authentication Service', url: 'http://localhost:3001/health' },
  { name: 'Course Catalog Service', url: 'http://localhost:3011/health' }
];

async function checkService(service) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const req = http.get(service.url, (res) => {
      const responseTime = Date.now() - startTime;
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({
            name: service.name,
            status: res.statusCode === 200 ? 'healthy' : 'unhealthy',
            responseTime: `${responseTime}ms`,
            details: response
          });
        } catch (error) {
          resolve({
            name: service.name,
            status: 'unhealthy',
            responseTime: `${responseTime}ms`,
            error: 'Invalid JSON response'
          });
        }
      });
    });
    
    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      resolve({
        name: service.name,
        status: 'unhealthy',
        responseTime: `${responseTime}ms`,
        error: error.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        name: service.name,
        status: 'timeout',
        responseTime: '5000ms+',
        error: 'Request timeout'
      });
    });
  });
}

async function checkAllServices() {
  console.log('🏥 LuminaX Health Check Report');
  console.log('================================');
  console.log(`Timestamp: ${new Date().toISOString()}\n`);
  
  const results = await Promise.all(services.map(checkService));
  
  let healthyCount = 0;
  let totalCount = results.length;
  
  results.forEach((result) => {
    const statusIcon = result.status === 'healthy' ? '✅' : '❌';
    console.log(`${statusIcon} ${result.name}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Response Time: ${result.responseTime}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    } else if (result.details) {
      console.log(`   Service: ${result.details.service || 'Unknown'}`);
      console.log(`   Port: ${result.details.port || 'Unknown'}`);
    }
    
    console.log('');
    
    if (result.status === 'healthy') {
      healthyCount++;
    }
  });
  
  console.log('================================');
  console.log(`Overall Status: ${healthyCount}/${totalCount} services healthy`);
  
  if (healthyCount === totalCount) {
    console.log('🎉 All services are running perfectly!');
    process.exit(0);
  } else {
    console.log('⚠️  Some services need attention');
    process.exit(1);
  }
}

// Run the health check
checkAllServices().catch((error) => {
  console.error('Health check failed:', error);
  process.exit(1);
});