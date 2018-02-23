const logger = require('../config/initializers/logger');
const request = require('request-promise-native');
const cheerio = require('cheerio');

class Nasdaq {
    static scrape() {
        return request('http://www.nasdaq.com')
            .then((body) => this.parse(body))
            .catch(function(err) {
                logger.error(err);                    
            })
    }

    static parse(body) {        
        let $ = cheerio.load(body);
        let scriptContent = $('#HomeIndexTable script').html();
        let nasdaqDataRaw = scriptContent.split('storeIndexInfo(')[1].split(',');

        return {
            value: parseFloat(nasdaqDataRaw[1].replace(/"/g, '')),
            change: parseFloat(nasdaqDataRaw[2].replace(/"/g, ''))
        }
    }
}

module.exports = Nasdaq;
