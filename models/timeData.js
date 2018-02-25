const redis = require('../initializers/redis'),
    { promisify } = require('util'),
    zaddAsync = promisify(redis.zadd).bind(redis),
    zrangebyscoreAsync = promisify(redis.zrangebyscore).bind(redis),
    zrangeAsync = promisify(redis.zrange).bind(redis);
    
/** 
 * Class representing a time data. Provide easy way to store and find values
 * @class
 * @example
 * await TimeData.create('market', {timestamp: 1519491287150, value: 1000, change: 10}); // store data to db
 * let data = await TimeData.find('market', {from: 1519491287150, to: 1519491297150}); // load data between from and to
 */
module.exports = class TimeData {
    /**
     * Store time data to database
     *
     * @param {string} key - market name
     * @param {Object} values - market info
     * @param {number} values.timestamp - timestamp 
     * @param {number} values.value - value market
     * @param {number} values.change - change net for market   
     * @return {Promise} 
     */
    static create(key, values = {}) {        
        return zaddAsync(key, values.timestamp, `${values.timestamp}:${values.value}:${values.change}`);  
    }

    /**
     * Find values in database
     *
     * @param {string} key - market name
     * @param {Object} options - search params
     * @param {number} values.from - timestamp 
     * @param {number} values.to - timestamp 
     * @return {Promise} 
     */
    static find(key, options = {}) {
        let from = options.from || 0;
        let to = options.to || Number.MAX_SAFE_INTEGER;

        return zrangebyscoreAsync(key, from, to).then(this.parseResponse);
    }

    /**
     * Return n last values
     *
     * @param {string} key - market name
     * @param {number} n - entries count
     * @return {Promise} 
     */
    static limit(key, n = 50) {
        return zrangeAsync(key, -n, -1).then(this.parseResponse);
    }

    /**
     * Parse response from redis
     *
     * @param {Object} data - raw response from redis
     * @return {Object} parse response
     */
    static parseResponse(data) {
        return data.map(rawEntry => {
            let values = rawEntry.split(':');                    

            return {
                timestamp: parseInt(values[0]), 
                value: parseFloat(values[1]),
                change: parseFloat(values[2])    
            };          
        });
    }
};