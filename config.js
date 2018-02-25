const fs = require('fs'),
  dotenv = require('dotenv');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
for (var k in envConfig) {
  if (!process.env[k]) {
    process.env[k] = envConfig[k];
  }
}

module.exports = {
  environment: process.env.NODE_ENV,
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    db: process.env.REDIS_DB || 0
  },
  express: {
    host: process.env.EXPRESS_HOST || '127.0.0.1',
    port: process.env.EXPRESS_PORT || 3000      
  },
  service: {
    crawler: {
      timeout: process.env.FETCH_INTERVAL || 20
    }
  }
}
