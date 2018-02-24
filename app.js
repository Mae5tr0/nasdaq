const express = require('express'),
    logger = require('./config/initializers/logger'),
    morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

app.use('/', require('./routes/markets'));

const port = process.env.EXPRESS_PORT || 3000,
    ip = process.env.EXPRESS_IP || '127.0.0.1';
    
app.listen(port, ip, function (error) {
    if (error) {
        logger.error('Unable to listen for connections', error)
        process.exit(10)
    }
    logger.info(`Server is listening on http://${ip}:${port}`);
});

module.exports = app;
