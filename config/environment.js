const fs = require('fs'),
  dotenv = require('dotenv');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
for (var k in envConfig) {
  if (!process.env[k]) {
    process.env[k] = envConfig[k];
  }
}