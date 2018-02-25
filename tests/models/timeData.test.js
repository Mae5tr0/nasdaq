const support = require('../support'),
    nock = require('nock'),
    Nasdaq = require('../../libs/nasdaq'),
    TimeData = require('../../models/timeData');

let storedData1 = {value: 100, change: 1, timestamp: 10};
let storedData2 = {value: 200, change: 2, timestamp: 20};
let storedData3 = {value: 300, change: 3, timestamp: 30};
let storedData4 = {value: 400, change: 4, timestamp: 40};

describe('Time Data', () => {
    test('correct save and extract data from redis', async () => {
        await TimeData.create('market', storedData1);
        await TimeData.create('market', storedData2);
        let receivedData = await TimeData.find('market');
        
        expect(receivedData).toEqual([storedData1, storedData2]);
    });

    test('should support specific boundaries', async () => {
        await TimeData.create('market', storedData1);
        await TimeData.create('market', storedData2);
        await TimeData.create('market', storedData3);
        await TimeData.create('market', storedData4);
        let receivedData = await TimeData.find('market', {from: 20, to: 30});
        
        expect(receivedData).toEqual([storedData2, storedData3]);
    });
});
