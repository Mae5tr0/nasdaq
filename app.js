const Nasdaq = require('./crawlers/nasdaq')

async function test() {
    let nasdaq = new Nasdaq();
    let data = await nasdaq.scrape();

    console.log(data);
}

test();