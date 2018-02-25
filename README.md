# Assignment notes

## Installation

App required Redis 4.0.8 and node 9.5.0 (at least this versions used for development)

* Install dependencies `npm i`

## Run

* Start crawler `npm run crawler` (periodicaly parse nasdaq index page and store data to Redis)
* Start server `npm run server` (start server to provide API)

## Test

!!!ATTENTION!!!

This command will flush the database 1 in Redis

* Run all test suit `npm test` 

## Implementation notes

App logically devided on 2 independed parts - **crawler** and **server**. Crawler is responsible for parsing nasdaq and storing parsed values to Redis. Server provide convient interface for stored data.
Sometimes graphs required different dimensions like 1 sec, 1 hour, 1 day. For solving this problem I guess we should run crawler with minimum required inteval (for this example it will be 1 sec) and denormalize data to different table for other dimensions (in our example we can store data under another key like 'nasdaq:hour'). When client request data it can specify required dimension in request.

Also I decided use async/await and not provide any transpiling, because assignment hasn't any requirements about platform versions.
I didn't add **gulp** because I dont' see tasks for it.