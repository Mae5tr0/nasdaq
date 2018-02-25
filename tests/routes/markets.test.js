const support = require('../support'),
    request = require('request-promise-native'),   
    TimeData = require('../../models/timeData'),
    config = require('../../config'),
    { getApi } = support;

beforeAll(() => {
    support.startServer();
}) 
    
afterAll(() => {
    support.stopServer();
});

function timestampBack(i) {
    return (Date.now() - config.service.crawler.timeout * 1000 * i);
}

describe('Markets', () => {
    describe('/markets', () => {
        test('return supported markets', async () => {
            let data = await getApi('markets');
            expect(data).toEqual({data:['nasdaq']});
        });
    })
    
    describe('/markets/:id', () => {
        test('return stored values', async () => {
            let storedData1 = {value: 100, change: 1, timestamp: timestampBack(1)};
            let storedData2 = {value: 200, change: 2, timestamp: timestampBack(0)};
    
            await TimeData.create('nasdaq', storedData1);                    
            await TimeData.create('nasdaq', storedData2);                                       
    
            let data = await getApi('markets/nasdaq');
            expect(data).toEqual({data:[storedData1, storedData2]});
        });
    
        test('support from and to parameters', async () => {
            let storedData1 = {value: 100, change: 1, timestamp: 10};
            let storedData2 = {value: 200, change: 2, timestamp: 20};
            let storedData3 = {value: 300, change: 3, timestamp: 30};
            let storedData4 = {value: 400, change: 4, timestamp: 40};
    
            await TimeData.create('nasdaq', storedData1);                    
            await TimeData.create('nasdaq', storedData2);                    
            await TimeData.create('nasdaq', storedData3);                    
            await TimeData.create('nasdaq', storedData4);                    
    
            let data = await getApi('markets/nasdaq?from=20&to=30');
            expect(data).toEqual({data:[storedData2, storedData3]});
        });

        test('return last n values if from and to not specified', async () => {
            let data = [];
            
            for (let i=40;i>0;i--) {
                let storedData = {value: i, change: 1, timestamp: timestampBack(i)};
                await TimeData.create('nasdaq', storedData);
                data.push(storedData);                    
            }

            let receivedData = await getApi('markets/nasdaq');
            
            expect(receivedData.data.length).toBe(30);
            expect(receivedData).toEqual({data: data.slice(-30)});
        });

        test('returns 404 if market not supported', async () => {
            try {
                await getApi('markets/unknown');
            } catch (err) {
                expect(err.statusCode).toBe(404);
                expect(JSON.parse(err.error)).toEqual({message: "Invalid market"})                                                     
            }
        });
    });    
});