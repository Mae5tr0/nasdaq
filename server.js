const express = require('express'),
    logger = require('./config/initializers/logger'),
    morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use('/', require('./routes/markets'));

module.exports = app;