const config = require('../config'),
      logger = require('../initializers/logger'),
      Nasdaq = require('../libs/nasdaq'),
      TimeData = require('../models/timeData');

setInterval(async function() {
    logger.debug("Start fetching data from nasdaq");
    // truncate time to seconds
    let timestamp = new Date().setMilliseconds(0);
    
    try {
        let data = await Nasdaq.scrape();
        await TimeData.create('nasdaq', {
            timestamp: timestamp,
            value: data.value,
            change: data.change
        });
    } catch (err) {
        logger.error(err);
    }    
}, config.service.crawler.timeout * 1000);