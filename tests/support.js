const config = require('../../config'),
    redis = require('../../initializers/redis'),
    server = require('../server');

let app;

beforeAll(() => {
    redis.flushDB();
});

afterEach(() => {
    redis.flushdb();
});

afterAll(() => {
    redis.quit();
});

let app; 

function startServer() {
    app = server.listen(config.express.port, config.express.host);
}

function stopServer() {
    if (app) {
        app.close();
    }
}

module.exports = {
    config,
    startServer,
    stopServer
}