const server = require('./server'),
    config = require('./config'),
    logger = require('./initializers/logger');

server.listen(config.express.port, config.express.host, function (error) {
    if (error) {
        logger.error('Unable to listen for connections', error);
        process.exit(10);
    }
    logger.info(`Server is listening on http://${config.express.host}:${config.express.port}`);
});
