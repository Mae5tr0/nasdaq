const redis = require('../config/initializers/redis');
const { promisify } = require('util');
const zaddAsync = promisify(redis.zadd).bind(redis);
const zrangeAsync = promisify(redis.zrange).bind(redis);

module.exports = class NasdaqTimeData {
    static create(values = {}) {
        let data = {
            v: values.value, 
            c: values.change, 
            t: values.timestamp
        };        
        return zaddAsync('nasdaq', values.timestamp, JSON.stringify(data));  
    }

    static find(options = {}) {
        let from = options.from || 0;
        let to = options.to || Number.MAX_SAFE_INTEGER;

        return zrangeAsync('nasdaq', from, to)
            .then(data => {
                return data.map(rawEntry => {
                    let entry = JSON.parse(rawEntry);

                    return {
                        value: entry.v,
                        change: entry.c,
                        timestamp: entry.t     
                    };          
                });
            });
    }
}