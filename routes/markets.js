const TimeData = require('../models/timeData'),
    router = require('express').Router();

const SUPPORTED_MARKETS = ['nasdaq'];

router.get('/markets', function (req, res) {    
    res.json({
        data: SUPPORTED_MARKETS            
    });
});

router.get('/markets/:id', async function (req, res) {
    //TODO 404 if not support market
    let data = await TimeData.find(req.params.id, {from: req.params.from, to: req.params.to});
    res.json({data: data});
});

module.exports = router;