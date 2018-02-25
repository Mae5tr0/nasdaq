const support = require('../support'),
    request = require('request-promise-native'),   
    TimeData = require('../../models/timeData');

beforeAll(() => {
    support.startServer();
}) 
    
afterAll(() => {
    support.stopServer();
});

describe('Markets', () => {
    test('/markets', async () => {
        let data = await request('http://127.0.0.1:3000/markets').then(data => JSON.parse(data));
        expect(data).toEqual({data:['nasdaq']});
    });

    test('/markets/:id', async () => {
        let storedData1 = {value: 100, change: 1, timestamp: 10};
        let storedData2 = {value: 200, change: 2, timestamp: 20};

        await TimeData.create('nasdaq', storedData1);                    
        await TimeData.create('nasdaq', storedData2);                    

        let data = await request('http://127.0.0.1:3000/markets/nasdaq').then(data => JSON.parse(data));
        expect(data).toEqual({data:[storedData1, storedData2]});
    });
});