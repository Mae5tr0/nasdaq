const config = require('../config'),
    redis = require('../initializers/redis'),
    server = require('../server'),
    request = require('request-promise-native');

beforeAll(() => {
    redis.flushdb();
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

function getApi(api) {
    return request(`http://${config.express.host}:${config.express.port}/${api}`)
        .then(data => JSON.parse(data));
}

module.exports = {
    config,
    startServer,
    stopServer,
    getApi
}