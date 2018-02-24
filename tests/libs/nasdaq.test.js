require('../../config/environment');
const nock = require('nock'),
    Nasdaq = require('../../libs/nasdaq');

describe('Nasdaq crawler', () => {
    test('correct extract data from page', async () => {
        nock('http://www.nasdaq.com').get('/')
            .replyWithFile(200, 'tests/replies/nasdaq.html', { 'Content-Type': 'text/html; charset=utf-8' });
        
        let data = await Nasdaq.scrape();
        
        expect(data).toEqual({value: 7210.09, change: -8.57});
    });
});