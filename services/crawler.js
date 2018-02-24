const config = require('../config/environment'),
      logger = require('../config/initializers/logger'),
      Nasdaq = require('../libs/nasdaq'),
      TimeData = require('../models/timeData');

setInterval(async function() {
    logger.debug("Scrape nasdaq");
    //TODO: we need use timestamp accordinly to seconds
    let timestamp = Date.now();
    
    let data = await Nasdaq.scrape();
    await TimeData.create('nasdaq', {
        timestamp: timestamp,
        value: data.value,
        change: data.change
    });
}, process.env.FETCH_INTERVAL * 1000);