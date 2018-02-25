const express = require('express'),
    config = require('./config'),
    logger = require('./initializers/logger'),
    morgan = require('morgan'),
    BaseError = require('./errors/baseError'),
    NotFoundError = require('./errors/notFoundError');

const app = express();

if (config.environment !== 'test') {
    app.use(morgan('combined'));
}

app.use('/', require('./routes/markets'));

// catch 404 and forwarding to error handler
app.use(function(req, res) {
    throw new NotFoundError("Route doesn't exist");
});

app.use(function (err, req, res, next) {
    if (err instanceof BaseError) {
        res.status(err.statusCode);
        res.json({
            message: err.message            
        });
        return;
    }
    logger.error(err);
    res.status(500);
    res.json({
        message: "Error"            
    });
});

module.exports = app;