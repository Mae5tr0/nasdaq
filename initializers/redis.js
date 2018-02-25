const config = require('../../config'),
    logger = require("./logger"),
    redis = require("redis");
    
const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    db: config.redis.db
});

client.on("error", function errorLogger(err) {
    logger.error(`redis: ${err}`);
});

module.exports = client;