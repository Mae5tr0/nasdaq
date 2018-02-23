const logger = require('../../config/initializers/logger');
const Nasdaq = require('../../crawlers/nasdaq');
const NasdaqTimeData = require('../../models/nasdaqTimeData');

setInterval(async function() {
    //TODO: we need use timestamp accordinly to seconds
    let timestamp = Date.now();
    
    let data = await Nasdaq.scrape();
    await NasdaqTimeData.create({
        timestamp: timestamp,
        value: data.value,
        change: data.change
    });
}, process.env.FETCH_INTERVAL * 1000);