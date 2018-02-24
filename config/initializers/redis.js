require('../environment');
const logger = require("./logger"),
    redis = require("redis");
    
const client = redis.createClient({
    host: process.env.REDIS_HOST,            
    port: process.env.REDIS_PORT,
    db: process.env.REDIS_DB          
});

client.on("error", function errorLogger(err) {
    logger.error(`redis: ${err}`);
});

module.exports = client;