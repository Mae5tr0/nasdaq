require('../config');
const redis = require("redis");

//for test replace actual redis by redis-mock
module.exports = redis.createClient({
    host: process.env.REDIS_HOST,            
    port: process.env.REDIS_PORT,            
});

