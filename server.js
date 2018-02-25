const express = require('express'),
    config = require('./config'),
    logger = require('./initializers/logger'),
    morgan = require('morgan');

const app = express();

if (config.environment !== 'test') {
    app.use(morgan('combined'));
}

app.use('/', require('./routes/markets'));

module.exports = app;