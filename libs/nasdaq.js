const logger = require('../initializers/logger'),
    request = require('request-promise-native'),
    cheerio = require('cheerio');

/** 
 * Class representing a nasdaq market. 
 * Incapsulate logic for parsing nasdaq index page.
 * @class
 * @example
 * let data = await Nasdaq.scrape(); // => { timestamp: 1519491287150, value: 7115.43, change: -1.10}
 */
class Nasdaq {
    /**
     * Load and parse nasdaq index page for extracting market activity
     * 
     * @return {number} The x value.
     */
    static scrape() {
        return request('http://www.nasdaq.com')
            .then((body) => this.parse(body))
            .catch(function(err) {
                logger.error(err);                    
            });
    }

    /**
     * Parse html string and extact nasdaq market activity: value and change net
     *
     * @param {string} body - nasdaq index page
     * @return {Object} The x value.
     */
    static parse(body) {        
        let $ = cheerio.load(body);
        let scriptContent = $('#HomeIndexTable script').html();
        let nasdaqDataRaw = scriptContent.split('storeIndexInfo(')[1].split(',');

        return {
            value: parseFloat(nasdaqDataRaw[1].replace(/"/g, '')),
            change: parseFloat(nasdaqDataRaw[2].replace(/"/g, ''))
        };
    }
}

module.exports = Nasdaq;
