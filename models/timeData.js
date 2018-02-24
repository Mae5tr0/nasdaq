const redis = require('../config/initializers/redis'),
    { promisify } = require('util'),
    zaddAsync = promisify(redis.zadd).bind(redis),
    zrangebyscoreAsync = promisify(redis.zrangebyscore).bind(redis);

module.exports = class TimeData {
    static create(key, values = {}) {
        return zaddAsync(key, values.timestamp, `${values.timestamp}:${values.value}:${values.change}`);  
    }

    static find(key, options = {}) {
        let from = options.from || 0;
        let to = options.to || Number.MAX_SAFE_INTEGER;

        return zrangebyscoreAsync(key, from, to)
            .then(data => {
                return data.map(rawEntry => {
                    let values = rawEntry.split(':');                    

                    return {
                        timestamp: parseInt(values[0]), 
                        value: parseFloat(values[1]),
                        change: parseFloat(values[2])    
                    };          
                });
            });
    }
}