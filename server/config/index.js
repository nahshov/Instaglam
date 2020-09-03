const production = require('./production');
const development = require('./development');

let config = development;

if (process.env.NODE_ENV === 'production') {
  config = production;
}

module.exports = config;
