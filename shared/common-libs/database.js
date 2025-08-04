const { Pool } = require('pg');
const { MongoClient } = require('mongodb');
const redis = require('redis');

// PostgreSQL connection
const pgPool = new Pool({
  user: process.env.POSTGRES_USER || 'luminax',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'luminax',
  password: process.env.POSTGRES_PASSWORD || 'luminax123',
  port: process.env.POSTGRES_PORT || 5432,
});

// MongoDB connection
let mongoClient;
const connectMongo = async () => {
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URL || 'mongodb://luminax:luminax123@localhost:27017/luminax');
    await mongoClient.connect();
  }
  return mongoClient.db();
};

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

module.exports = {
  postgres: pgPool,
  mongodb: connectMongo,
  redis: redisClient
};