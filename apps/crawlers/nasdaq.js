const redis = require('../../config/initializers/redis');
const logger = require('../../config/initializers/logger');
const request = require('request');
const cheerio = require('cheerio');

function errorLogger(err) {
    if (err) {
        logger.error(`nasdaq: ${err}`);
    }
}

redis.on("error", errorLogger);
 
setInterval(function() {
    logger.debug("Start fetching data");
    //we need use timestamp accordinly to seconds
    let timestamp = Date.now();

    //fetch data, TODO promise or generators
    request('http://www.nasdaq.com', function(err, response, body) {
        if (err) {
            logger.err(`nasdaq:${err}`);
            return;
        }

        //parse data
        let $ = cheerio.load(body);
        let scriptContent = $('#HomeIndexTable script').html();
        let nasdaqDataRaw = scriptContent.split('storeIndexInfo(')[1].split(',');
        let value = nasdaqDataRaw[1].replace(/"/g, '');
        let change = nasdaqDataRaw[2].replace(/"/g, '');

        //store data
        data = {v:value, c:change, t:timestamp};
        //process callback
        redis.zadd('nasdaq', timestamp, JSON.stringify(data), errorLogger);

        logger.debug("Data stored: " + JSON.stringify(data));
    });
}, process.env.FETCH_INTERVAL * 1000);