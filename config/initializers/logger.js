require('../config');
const winston = require('winston');

module.exports = winston.createLogger({
    level: process.env.LOG_LEVEL,
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});