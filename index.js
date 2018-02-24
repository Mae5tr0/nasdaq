const server = require('./server'),
    logger = require('./config/initializers/logger');

const port = process.env.EXPRESS_PORT || 3000,
    ip = process.env.EXPRESS_IP || '127.0.0.1';

server.listen(port, ip, function (error) {
    if (error) {
        logger.error('Unable to listen for connections', error)
        process.exit(10)
    }
    logger.info(`Server is listening on http://${ip}:${port}`);
});
