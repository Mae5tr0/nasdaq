const support = require('../support'),
    request = require('request-promise-native'),   
    TimeData = require('../../models/timeData'),
    { getApi } = support;

beforeAll(() => {
    support.startServer();
}) 
    
afterAll(() => {
    support.stopServer();
});

describe('Markets', () => {
    describe('/markets', () => {
        test('return supported markets', async () => {
            let data = await getApi('markets');
            expect(data).toEqual({data:['nasdaq']});
        });
    })
    
    describe('/markets/:id', () => {
        test('return stored values', async () => {
            let storedData1 = {value: 100, change: 1, timestamp: 10};
            let storedData2 = {value: 200, change: 2, timestamp: 20};
    
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

        test('return last 20 values if from and to not specified', async () => {               
            // let data = await getApi('markets/nasdaq');
            // expect(data).toEqual({data:[storedData2, storedData3]});
        });

        test('returns 404 is market not supported', async () => {
            try {
                await getApi('markets/unknown');
            } catch (err) {
                expect(err.statusCode).toBe(404);
                expect(JSON.parse(err.error)).toEqual({message: "Invalid market"})                                                     
            }
        });
    });    
});