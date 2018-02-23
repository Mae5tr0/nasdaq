const redis = require('../../config/initializers/redis');
const logger = require('../../config/initializers/logger');
const Nasdaq = require('../../crawlers/nasdaq');

setIntervala(async function() {
    logger.debug("Start fetching data");
    //we need use timestamp accordinly to seconds
    let timestamp = Date.now();

    let nasdaq = new Nasdaq();
    let data = await nasdaq.scratch();

    //store data
    // TODO -> TimeData.create(data).save();
    data = {v:value, c:change, t:timestamp};
    //process callback
    redis.zadd('nasdaq', timestamp, JSON.stringify(data));

    logger.debug("Data stored: " + JSON.stringify(data));
}, process.env.FETCH_INTERVAL * 1000);