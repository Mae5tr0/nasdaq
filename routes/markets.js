const TimeData = require('../models/timeData'),
    router = require('express').Router(),
    NotFoundError = require('../errors/notFoundError');
    
const SUPPORTED_MARKETS = ['nasdaq'],
    DEFAULT_LIMIT = 30;

const wrap = fn => (...args) => fn(...args).catch(args[2])

router.get('/markets', function (req, res) {    
    res.json({
        data: SUPPORTED_MARKETS            
    });
});

router.get('/markets/:id', wrap(async function (req, res) {
    if (!SUPPORTED_MARKETS.includes(req.params.id)) {
        throw new NotFoundError('Invalid market');
    }
    
    let data;
    if (!req.query.from && !req.query.to) {
        data = await TimeData.limit(req.params.id, DEFAULT_LIMIT);            
    } else {
        data = await TimeData.find(req.params.id, {from: req.query.from, to: req.query.to});
    }       
    res.json({data: data});
}));

module.exports = router;