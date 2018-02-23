const nock = require('nock');
const Nasdaq = require('../../crawlers/nasdaq');

nock('http://www.nasdaq.com').get('/')
    .replyWithFile(200, 'tests/replies/nasdaq.html', { 'Content-Type': 'text/html; charset=utf-8' });

test('correct extract data from page', async () => {
    let nasdaq = new Nasdaq();
    let data = await nasdaq.scrape();

    expect(data).toEqual({value: 7210.09, change: -8.14});
});