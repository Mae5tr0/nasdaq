require('../environment');
const { createLogger, format, transports } = require('winston'),
    { combine, timestamp, label, printf } = format,
    myFormat = printf(info => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
    });


module.exports = createLogger({
    level: process.env.LOG_LEVEL,
    format: combine(        
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console()
    ]
});