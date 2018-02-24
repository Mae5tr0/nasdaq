require('../../config/environment');

const redis = require('../../config/initializers/redis');

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
